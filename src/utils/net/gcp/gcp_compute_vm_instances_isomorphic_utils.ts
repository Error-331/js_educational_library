// external imports

// internal imports
import { GCPInstanceSimplifiedStatus } from '../../../declarations/net/api/gcp/gcp_compute_isomorphic_declarations';

// implementation
function getInstanceSimplifiedStatusByStatus(status: string): GCPInstanceSimplifiedStatus {
    switch (status) {
        case 'RUNNING':
            return GCPInstanceSimplifiedStatus.Running;

        case 'TERMINATED':
        case 'SUSPENDED':
            return GCPInstanceSimplifiedStatus.Stopped;

        case 'PROVISIONING':
        case 'SUSPENDING':
        case 'REPAIRING':
            return GCPInstanceSimplifiedStatus.Transiting;

        default:
            return GCPInstanceSimplifiedStatus.Unknown;
    }
}

// exports
export {
    getInstanceSimplifiedStatusByStatus,
}