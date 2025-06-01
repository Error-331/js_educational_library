// external imports
import { protos } from '@google-cloud/compute';

// internal imports
import { AtLeast } from '../../../utility_declarations';
import { convertEnumToKeyToStringKeyEnum } from '../../../../utils/type/enum_utils';

// implementation
import GoogleCloudComputeV1Types = protos.google.cloud.compute.v1;

type GCPVMExternalIP = {
    type: string;
    ip?: string;
};

type GCPVMExternalIPs = Array<GCPVMExternalIP>;
type GCPVMMinimalData = Pick<GoogleCloudComputeV1Types.IInstance, 'id' | 'name' | 'machineType' | 'status' | 'zone'> & {
    externalIPs: GCPVMExternalIPs;
};

type GCPVMInstanceRequest = {
    instance: string;
    zone: string;
    project: string;
};

type GCPVMInstanceChangeStatusRequest = AtLeast<GCPVMInstanceRequest, 'instance' | 'zone'>;

type GCPInstanceRequestOperation = {
    name?: string;
    done?: boolean;
};

type GCPInstanceStatusEnumType = { [key in keyof typeof GoogleCloudComputeV1Types.Instance.Status]: string };

const GCPInstanceStatusEnum: GCPInstanceStatusEnumType = convertEnumToKeyToStringKeyEnum<
    typeof GoogleCloudComputeV1Types.Instance.Status,
    GCPInstanceStatusEnumType
>(GoogleCloudComputeV1Types.Instance.Status);

// exports
export {
    GoogleCloudComputeV1Types,

    GCPVMExternalIP,
    GCPVMExternalIPs,

    GCPVMMinimalData,

    GCPVMInstanceRequest,
    GCPVMInstanceChangeStatusRequest,

    GCPInstanceRequestOperation,

    GCPInstanceStatusEnumType,
    GCPInstanceStatusEnum,
}