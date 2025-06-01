// external imports

// internal imports
import { AtLeast } from '../../../utility_declarations';

// implementation
type GCPVMExternalIP = {
    type: string;
    ip?: string;
};

type GCPVMExternalIPs = Array<GCPVMExternalIP>;

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

type GCPInstanceRequestOperationExtended = GCPVMInstanceChangeStatusRequest & GCPInstanceRequestOperation & {
    nextStatus: string;
}

type GCPInstanceCheckOperation = {
    operation: string;
    project: string;
    zone: string;
};

enum GCPInstanceSimplifiedStatus {
    'Running' = 'Running',
    'Stopped' = 'Stopped',
    'Transiting' = 'Transiting',
    'Unknown' = 'Unknown',
}

// exports
export {
    GCPVMExternalIP,
    GCPVMExternalIPs,

    GCPVMInstanceRequest,
    GCPVMInstanceChangeStatusRequest,

    GCPInstanceRequestOperation,
    GCPInstanceRequestOperationExtended,
    GCPInstanceCheckOperation,

    GCPInstanceSimplifiedStatus,
}