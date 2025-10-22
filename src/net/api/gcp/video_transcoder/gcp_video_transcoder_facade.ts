// external imports
import { TranscoderServiceClient, protos } from '@google-cloud/video-transcoder';

// internal imports
import {
    GCPPresetName,
    GCPInstanceStatusEnum,
    GCPVideoTranscoderJobConfiguration
} from '../../../../declarations/net/api/gcp/gcp_video_transcoder_declarations';

import {
    GCP_OPERATION_CHECK_RETRIES_COUNT,
    GCP_OPERATION_CHECK_TIMEOUT,
    GCP_OPERATION_CHECK_DELAY,
} from '../../../../constants/net/api/gcp/gcp_common_constants';

import {
    DEFAULT_VIDEO_STREAM_KEY,
    DEFAULT_AUDIO_STREAM_KEY,

    FACEBOOK_REEL_VIDEO_STREAM_HD_PRESET,
    TIKTOK_VIDEO_STREAM_HD_PRESET,

    FACEBOOK_REEL_AUDIO_STREAM_PRESET,
    TIKTOK_AUDIO_STREAM_PRESET,

    FACEBOOK_REEL_EDIT_ATOM_PRESET,
    TIKTOK_REEL_EDIT_ATOM_PRESET,
} from '../../../../constants/net/api/gcp/gcp_video_transcoder/gcp_video_transcoder_presets_constants';

import FirebaseAdminRegistry from '../../../../registers/firebase/firebase_admin_registry';
import { promiseRetry } from '../../../../utils/async/promise_utils';
import { cloneDeep } from '../../../../utils/primitives/object_utils';
import { isNil, isBoolean, isString, isNullOrEmpty } from '../../../../utils/misc/logic_utils';

// implementation
import GoogleCloudTranscoderV1Types = protos.google.cloud.video.transcoder.v1;

class GCPVideoTranscoderFacade {
    private static instance: GCPVideoTranscoderFacade;

    private transcoderServiceClient: TranscoderServiceClient;

    public static getInstance(): GCPVideoTranscoderFacade {
        if (!GCPVideoTranscoderFacade.instance) {
            GCPVideoTranscoderFacade.instance = new GCPVideoTranscoderFacade();
        }

        return GCPVideoTranscoderFacade.instance;
    }

    public async init(): Promise<void> {
        if (isNil(this.transcoderServiceClient)) {
            const serviceAccountCredentials = FirebaseAdminRegistry.loadServiceAccountCredentials();
            this.transcoderServiceClient = new TranscoderServiceClient(serviceAccountCredentials);
        }
    }

    public async createJobFromPreset(config: GCPVideoTranscoderJobConfiguration) {
        let videoStream: GoogleCloudTranscoderV1Types.ElementaryStream = {};
        let audioStream: GoogleCloudTranscoderV1Types.ElementaryStream  = {};

        let editAtom: GoogleCloudTranscoderV1Types.EditAtom = {};

        switch(config.presetName) {
            case GCPPresetName.FacebookReelHD:
                videoStream = cloneDeep(FACEBOOK_REEL_VIDEO_STREAM_HD_PRESET);
                audioStream = cloneDeep(FACEBOOK_REEL_AUDIO_STREAM_PRESET);

                editAtom = cloneDeep(FACEBOOK_REEL_EDIT_ATOM_PRESET);
                break;
            case GCPPresetName.TikTokHD:
                videoStream = cloneDeep(TIKTOK_VIDEO_STREAM_HD_PRESET);
                audioStream = cloneDeep(TIKTOK_AUDIO_STREAM_PRESET);

                editAtom = cloneDeep(TIKTOK_REEL_EDIT_ATOM_PRESET);
                break;
            default:
                throw new RangeError(`Can not create GCP video transcoding job - unknown preset name "${config.presetName}"`);
        }

        await this.init();

        const streams = [videoStream];
        const streamsMux = [DEFAULT_VIDEO_STREAM_KEY]

        if (isBoolean(config.hasSound) && config.hasSound === true) {
            streams.push(audioStream);
            streamsMux.push(DEFAULT_AUDIO_STREAM_KEY);
        }

        let editList;

        // TODO: move to separate function and take into account that duration can be like '90s'
        if (!isNil(config.duration)) {
            let duration = isString(config.duration) ? parseFloat(config.duration) : config.duration;

            if (duration < editAtom.endTimeOffset.seconds) {
                editAtom.endTimeOffset.seconds = duration;
            }

            editList = [editAtom];
        }

        const request = {
            // TODO: need to select a region properly (not hardcode)
            parent: this.transcoderServiceClient.locationPath(FirebaseAdminRegistry.getInstance().projectId, 'us-central1'),
            job: {
                inputUri: config.storageSourceFileURL,
                outputUri: config.storageDestFolderURL,

                config: {
                    elementaryStreams: streams,
                    muxStreams: [
                        {
                            key: 'sd',
                            container: 'mp4',
                            elementaryStreams: streamsMux,
                        },
                    ],

                    editList,
                },
            },
        };

        const [response] = await this.transcoderServiceClient.createJob(request);
        return response.name;
    }

    public async checkJobStatus(jobName: string) {
        if (isNullOrEmpty(jobName)) {
            throw new RangeError('Cannot check GCP transcoder job - job name is not specified');
        }

        await this.init();
        const request = {
            name: jobName,
        };

        const [response] = await this.transcoderServiceClient.getJob(request);
        return response;
    }

    public async waitUntilJobSucceed(jobName: string): Promise<boolean> {
        return promiseRetry<boolean>(async (jobName: string) => {
            const response = await this.checkJobStatus(jobName);

            if (response.state === GCPInstanceStatusEnum.SUCCEEDED) {
                return true;
            } else {
                return Promise.reject(`Job "${jobName}" is not finished yet (${response.state})`);
            }

            },
            GCP_OPERATION_CHECK_RETRIES_COUNT,
            GCP_OPERATION_CHECK_TIMEOUT,
            GCP_OPERATION_CHECK_DELAY,
            () => {},
            jobName
        );
    }
}

// exports
export default GCPVideoTranscoderFacade;