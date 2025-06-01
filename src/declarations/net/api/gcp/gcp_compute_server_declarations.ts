// external imports
import { protos } from '@google-cloud/compute';

// internal imports
import { GCPVMExternalIPs } from './gcp_compute_isomorphic_declarations';
import { convertEnumToKeyToStringKeyEnum } from '../../../../utils/type/enum_utils';

// implementation
import GoogleCloudComputeV1Types = protos.google.cloud.compute.v1;

type GCPVMMinimalData = Pick<GoogleCloudComputeV1Types.IInstance, 'id' | 'name' | 'machineType' | 'status' | 'zone'> & {
    externalIPs: GCPVMExternalIPs;
};

type GCPInstanceStatusEnumType = { [key in keyof typeof GoogleCloudComputeV1Types.Instance.Status]: string };

const GCPInstanceStatusEnum: GCPInstanceStatusEnumType = convertEnumToKeyToStringKeyEnum<
    typeof GoogleCloudComputeV1Types.Instance.Status,
    GCPInstanceStatusEnumType
>(GoogleCloudComputeV1Types.Instance.Status);

// exports
export {
    GoogleCloudComputeV1Types,

    GCPVMMinimalData,

    GCPInstanceStatusEnumType,
    GCPInstanceStatusEnum,
}