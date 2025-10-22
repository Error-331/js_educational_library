// external imports
import { protos } from '@google-cloud/video-transcoder';

// internal imports
import { convertEnumToKeyToStringKeyEnum } from '../../../../utils/type/enum_utils';

// implementation
import GoogleCloudTranscoderV1Types = protos.google.cloud.video.transcoder.v1;

type GCPJobProcessingStateEnumType = { [key in keyof typeof GoogleCloudTranscoderV1Types.Job.ProcessingState]: string };

const GCPInstanceStatusEnum: GCPJobProcessingStateEnumType = convertEnumToKeyToStringKeyEnum<
    typeof GoogleCloudTranscoderV1Types.Job.ProcessingState,
    GCPJobProcessingStateEnumType
>(GoogleCloudTranscoderV1Types.Job.ProcessingState);

// exports
export {
    GoogleCloudTranscoderV1Types,

    GCPJobProcessingStateEnumType,
    GCPInstanceStatusEnum,
}