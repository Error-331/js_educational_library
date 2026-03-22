// external imports
import { CloudQuotasClient as GoogleCloudQuotasClient } from '@google-cloud/cloudquotas';
import * as protos from '@google-cloud/cloudquotas/build/protos/protos';

// internal imports
import type { EnumLikeObjectType } from '../../../../declarations/collection_declarations';
import { GCPCloudQuotaParentScope, GCPCloudQuotaUpdateFailCode } from '../../../../declarations/net/api/gcp/gcp_cloud_quotas_declarations';

import FirebaseAdminRegistry from '../../../../registers/firebase/firebase_admin_registry';
import { isNil, isNull, isString, isNullOrEmpty } from '../../../../utils/misc/logic_utils';

// implementation
/**
 * Wrapper class around GCP cloud quotas API.
 */
class GCPCloudQuotasFacade {
    /**
     * A project name / project number / organization name / folder name (QuotaPreference resources)
     */
    protected parent: string;

    /**
     * Instance of the Google quota client
     */
    protected cloudQuotasClient: GoogleCloudQuotasClient;

    constructor(parent?: string) {
        this.parent = isNullOrEmpty(parent) ? FirebaseAdminRegistry.getInstance().projectId : parent;

        const serviceAccountCredentials = FirebaseAdminRegistry.loadServiceAccountCredentials();
        this.cloudQuotasClient = new GoogleCloudQuotasClient(serviceAccountCredentials);
    }

    /**
     * Generates new quota preference ID (@see {@link https://cloud.google.com/docs/quotas/api-overview}).
     *
     * @param {string} serviceName - service name ('firebasehosting.googleapis.com', 'firestore.googleapis.com', etc.)
     * @param {string} quotaId - unique quota ID (example: 'DatabasesPerProject') - use {@link loadQuotaInfoList} to find find all possible quota IDs
     * @param {EnumLikeObjectType} dimensions - quota dimensions (@see {@link loadQuotaInfo})
     *
     * @returns {string} - new quota preference ID
     *
     */

    protected generateQuotaPreferenceID(serviceName: string, quotaId: string, dimensions: EnumLikeObjectType | null): string {
        let dimensionsSuffix = '';

        if (!isNil(dimensions)) {
            if (!isNil(dimensions['region'])) {
                dimensionsSuffix += `_${dimensions['region']}`
            } else if (!isNil(dimensions['zone'])) {
                dimensionsSuffix += `_${dimensions['zone']}`
            } else {
                dimensionsSuffix += '_region-global';
            }

            for (const dimensionName in dimensions) {
                if (dimensionName === 'region' || dimensionName === 'zone') {
                    continue
                }

                dimensionsSuffix += `_${dimensionName}-${dimensions[dimensionName]}`;
            }
        } else {
            dimensionsSuffix += '_region-global';
        }

        const namePrefix = serviceName
            .split('.')
            .map((serviceNamePart: string) => serviceNamePart.charAt(0).toUpperCase() + serviceNamePart.substring(1))
            .join('');

        return `${namePrefix}_${quotaId}${dimensionsSuffix}`;
    }

    protected filterDimensions(dimensions: string[], dimensionsValues: EnumLikeObjectType): EnumLikeObjectType {
        return dimensions.reduce((filteredDimensionsValues: EnumLikeObjectType, dimension: string) => {
            if (!isNil(dimensionsValues[dimension])) {
                filteredDimensionsValues[dimension] = dimensionsValues[dimension];
            }

            return filteredDimensionsValues;
        }, {});
    }

    protected prepareQuotaPreferenceFilter(service: string, quotaId: string, dimensions: EnumLikeObjectType | null): string {
        let filterStr = `service="${service}" AND quotaId="${quotaId}"`;

        if (!isNil(dimensions)) {
            for (const dimensionKey in dimensions) {
                filterStr += ` AND dimensions.${dimensionKey}="${dimensions[dimensionKey]}"`
            }
        }

        return filterStr;
    }

    protected async updateOrCreateQuotaPreference(
        service: string,
        quotaId: string,
        parentScope: GCPCloudQuotaParentScope,
        userValue: number | string | null,
        dimensions: EnumLikeObjectType | null,
        preferenceId?: string
    ): Promise<string> {
        const filter = this.prepareQuotaPreferenceFilter(service, quotaId, dimensions);
        const existingQuotaPreference = await this.loadQuotaPreferences(parentScope, filter);

        const quotaPreferenceID = !isNil(preferenceId) ? preferenceId : this.generateQuotaPreferenceID(service, quotaId, dimensions);
        let name = `${parentScope}/${this.parent}/locations/global/quotaPreferences/${quotaPreferenceID}`;

        if (existingQuotaPreference.length > 0) {
            const filteredQuotaPreference = this.findDimensionInfoByDimensionsValues<protos.google.api.cloudquotas.v1.IQuotaPreference>(existingQuotaPreference, dimensions || {});

            if (filteredQuotaPreference && filteredQuotaPreference.name) {
                name = filteredQuotaPreference.name;
            }
        }

        let quotaPreference: protos.google.api.cloudquotas.v1.IQuotaPreference = {
            quotaId: quotaId,
            service: service,
            name,

            quotaConfig: {
                preferredValue: userValue
            }
        };

        if (!isNil(dimensions) && Object.keys(dimensions).length > 0) {
            quotaPreference = {
                ...quotaPreference,
                dimensions
            }
        }

        await this.cloudQuotasClient.updateQuotaPreference({
            allowMissing: true,
            // validateOnly: true,
            quotaPreference,
        });

        const nameParts = name.split('/');
        return nameParts[nameParts.length - 1];
    }

    protected findDimensionInfoByDimensionsValues<DimensionsInfoType extends { dimensions?: EnumLikeObjectType | null }>(
        dimensionsInfos: DimensionsInfoType[],
        customDimensionsValues: EnumLikeObjectType
    ): DimensionsInfoType | null {
        return dimensionsInfos.find((dimensionInfo) => {
            if (isNil(dimensionInfo.dimensions)) {
                return false;
            }

            const dimensionInfoKeysLength = Object.keys(dimensionInfo.dimensions).length;
            const customDimensionKeysLength = Object.keys(customDimensionsValues).length;

            if (dimensionInfoKeysLength === customDimensionKeysLength) {
                if (dimensionInfoKeysLength === 0) {
                    return true;
                } else {
                    for (const customDimensionKey in customDimensionsValues) {
                        const customDimensionValue = customDimensionsValues[customDimensionKey];
                        const dimensionValue = dimensionInfo.dimensions[customDimensionKey];

                        if (customDimensionValue !== dimensionValue) {
                            return false;
                        }
                    }

                    return true;
                }
            } else {
                return false;
            }
        }) || null;
    }

    protected findDimensionInfoByQuotaInfo(
        quotaInfo: protos.google.api.cloudquotas.v1.IQuotaInfo,
        customDimensionsValues?: EnumLikeObjectType,
    ): protos.google.api.cloudquotas.v1.IDimensionsInfo | null {
        const { dimensions, dimensionsInfos } = quotaInfo;

        if (!dimensionsInfos || dimensionsInfos.length === 0) {
            return null;
        }

        if (isNil(dimensions) || dimensions?.length === 0) {
            return dimensionsInfos[0] || null;
        } else {
            return this.findDimensionInfoByDimensionsValues<protos.google.api.cloudquotas.v1.IDimensionsInfo>(dimensionsInfos, customDimensionsValues || {});
        }
    }

    protected determineQuotaAdjustmentInabilityReason(
        quotaInfo: protos.google.api.cloudquotas.v1.IQuotaInfo,
        dimensionInfo: protos.google.api.cloudquotas.v1.IDimensionsInfo,
        newQuotaValue: number | string | null
    ): null | GCPCloudQuotaUpdateFailCode {
        if (isNil(dimensionInfo.details?.value)) {
            if (isNull(newQuotaValue)) {
                return GCPCloudQuotaUpdateFailCode.sameValueNull;
            } else {
                if (quotaInfo.quotaIncreaseEligibility?.isEligible === true) {
                    return null;
                } else {
                    return GCPCloudQuotaUpdateFailCode.cannotBeIncreased;
                }
            }
        } else {
            if (isString(dimensionInfo.details.value)) {
                if (newQuotaValue === null) {
                    return null;
                } else {
                    return dimensionInfo.details.value === newQuotaValue.toString() ? GCPCloudQuotaUpdateFailCode.sameValue : null;
                }
            } else {
                if (isNull(newQuotaValue)) {
                    return null;
                } else {
                    if (dimensionInfo.details.value === newQuotaValue) {
                        return GCPCloudQuotaUpdateFailCode.sameValue;
                    } else if (dimensionInfo.details.value < newQuotaValue && quotaInfo.quotaIncreaseEligibility?.isEligible !== true) {
                        return GCPCloudQuotaUpdateFailCode.cannotBeIncreased;
                    } else {
                        return null;
                    }
                }
            }
        }
    }

    /**
     * Loads existing quota preferences for specific scope, parent and specific filer (if provided).
     *
     * @param {string} parentScope - scope of the quota (@see {@link GCPCloudQuotaParentScope})
     * @param {string} filter - filter for scope preferences, example: 'service="firebasehosting.googleapis.com" AND quotaId="DatabasesPerProject"' (@see {@link prepareQuotaPreferenceFilter})
     *
     * @return {Promise<protos.google.api.cloudquotas.v1.IQuotaPreference[]>>} - quota preferences list
     */

    public async loadQuotaPreferences(parentScope: GCPCloudQuotaParentScope, filter?: string):Promise<protos.google.api.cloudquotas.v1.IQuotaPreference[]> {
        const parent = `${parentScope}/${this.parent}/locations/global`;
        const request = {
            parent,
            filter,
        };

        const [ data ] = await this.cloudQuotasClient.listQuotaPreferences(request);
        return data;
    }

    /**
     * Loads specific quota information related to the specific service.
     *
     * @param {string} parentScope - scope of the quota (@see {@link GCPCloudQuotaParentScope})
     * @param {string} cloudServiceName - service name
     * @param {string} quotaId - quota Id
     *
     * @return {Promise<protos.google.api.cloudquotas.v1.IQuotaInfo>>} - quota data object
     */

    public async loadQuotaInfo(parentScope: GCPCloudQuotaParentScope, cloudServiceName: string, quotaId: string): Promise<protos.google.api.cloudquotas.v1.IQuotaInfo> {
        const name = `${parentScope}/${this.parent}/locations/global/services/${cloudServiceName}/quotaInfos/${quotaId}`;
        const request = {
            name,
        };

        const [ data ] =  await this.cloudQuotasClient.getQuotaInfo(request);
        return data;
    }

    /**
     * Loads quota information for specific service.
     *
     * @param {string} parentScope - scope of the quota (@see {@link GCPCloudQuotaParentScope})
     * @param {string} service - service name (@see {@link APINameToGoogleCloudService})
     *
     * @return {Promise<protos.google.api.cloudquotas.v1.IQuotaInfo[]>>} - quota info array
     */

    public async loadQuotaInfoList(parentScope: GCPCloudQuotaParentScope, service: string): Promise<protos.google.api.cloudquotas.v1.IQuotaInfo[]> {
        const parent = `${parentScope}/${this.parent}/locations/global/services/${service}`;
        const request = {
            parent,
        };

        const [ data ] = await this.cloudQuotasClient.listQuotaInfos(request);
        return data;
    }

    /**
     * Creates or updates specified quota preference for specified service.
     *
     * Method will return a code value (@see {@link GCPCloudQuotaUpdateFailCode}) which indicates the result of the quota udjustment.
     *
     * @param {string} service - service name ('firebasehosting.googleapis.com', 'firestore.googleapis.com', etc.)
     * @param {string} quotaId - quota Id
     * @param {string} parentScope - quota scope (@see {@link GCPCloudQuotaParentScope})
     * @param {number | string | null} newQuotaValue - new value for the quota
     * @param {EnumLikeObjectType} customDimensionsValues - quota dimensions
     * @param {string} preferenceID - custom preference Id (will be generated automatically if not set)
     *
     * @returns {string | GCPCloudQuotaUpdateFailCode} - new or existing preference Id or code which indicated inability to create or update quota preference
     */

    public async updateOrCreateQuota(
        service: string,
        quotaId: string,
        parentScope: GCPCloudQuotaParentScope,
        newQuotaValue: number | string | null,
        customDimensionsValues?: EnumLikeObjectType,
        preferenceID?: string
    ): Promise<string | GCPCloudQuotaUpdateFailCode> {
        const quotaInfo = await this.loadQuotaInfo(parentScope, service, quotaId);

        if (quotaInfo.isFixed) {
            return GCPCloudQuotaUpdateFailCode.fixed;
        }

        let preparedDimensionsValues: EnumLikeObjectType;

        if (!isNil(quotaInfo.dimensions) && quotaInfo.dimensions.length > 0) {
            preparedDimensionsValues = this.filterDimensions(quotaInfo.dimensions, customDimensionsValues || {});
        } else {
            preparedDimensionsValues = {};
        }

        const dimensionInfo = this.findDimensionInfoByQuotaInfo(quotaInfo, preparedDimensionsValues);
        if (isNil(dimensionInfo)) {
            return await this.updateOrCreateQuotaPreference(
                service,
                quotaId,
                parentScope,
                newQuotaValue,
                preparedDimensionsValues,
                preferenceID
            );
        } else {
            if (!!dimensionInfo.details?.rolloutInfo?.ongoingRollout) {
                return GCPCloudQuotaUpdateFailCode.rollingOut;
            }

            const adjustmentInabilityReason = this.determineQuotaAdjustmentInabilityReason(quotaInfo, dimensionInfo, newQuotaValue);

            if (isNil(adjustmentInabilityReason)) {
                return await this.updateOrCreateQuotaPreference(
                    service,
                    quotaId,
                    parentScope,
                    newQuotaValue,
                    preparedDimensionsValues,
                    preferenceID
                );
            } else {
                return adjustmentInabilityReason;
            }
        }
    }
}

// exports
export default GCPCloudQuotasFacade;