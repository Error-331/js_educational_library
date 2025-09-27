// external imports
import { InstancesClient, ZoneOperationsClient } from '@google-cloud/compute';
import { protos } from '@google-cloud/compute';

// internal imports
import {
    GCPVMExternalIPs,

    GCPVMInstanceChangeStatusRequest,
    GCPInstanceRequestOperationExtended,
    GCPInstanceCheckOperation,
} from '../../../../declarations/net/api/gcp/gcp_compute_isomorphic_declarations';
import { GCPVMMinimalData, GCPInstanceStatusEnum } from '../../../../declarations/net/api/gcp/gcp_compute_server_declarations';

import { GCP_MAX_AGGREGATED_RESULTS_PER_PAGE } from '../../../../constants/net/api/gcp/gcp_common_constants';
import FirebaseAdminRegistry from '../../../../registers/firebase/firebase_admin_registry';

import { removePrefixStringFormatter } from '../../../../utils/primitives/string/basic_string_formatting_utils';
import { cloneDeep, pick } from '../../../../utils/primitives/object_utils';
import { isNil } from '../../../../utils/misc/logic_utils';

import GoogleCloudComputeV1Types = protos.google.cloud.compute.v1;

// implementation
// https://cloud.google.com/compute/docs/reference/rest/v1
// https://cloud.google.com/compute/docs/reference/rest/v1/instances/
class GCPComputeVMInstancesFacade {
    private static instance: GCPComputeVMInstancesFacade;

    private instancesClient: InstancesClient;
    private zoneOperationClient: ZoneOperationsClient;

    private constructor() {}

    protected extractExternalIPsFromVMInstances(
        instance: GoogleCloudComputeV1Types.IInstance,
        accessConfigTypes: GoogleCloudComputeV1Types.AccessConfig.Type[] = [GoogleCloudComputeV1Types.AccessConfig.Type.ONE_TO_ONE_NAT],
    ): GCPVMExternalIPs {
        const externalIPs: GCPVMExternalIPs = [];
        const accessTypes = accessConfigTypes.map(accessConfigType => GCPComputeVMInstancesFacade.getAccessConfigTypeNameByValue(accessConfigType));

        for (const networkInterface of instance.networkInterfaces) {
            for (const accessConfig of networkInterface.accessConfigs) {
                if (!accessTypes.includes(accessConfig.type)) {
                    continue;
                }

                switch (accessConfig.type) {
                    case 'ONE_TO_ONE_NAT':
                        externalIPs.push({
                            type: 'ONE_TO_ONE_NAT',
                            ip: accessConfig.natIP,
                        });
                }
            }
        }

        return externalIPs;
    }

    public static getInstance(): GCPComputeVMInstancesFacade {
        if (!GCPComputeVMInstancesFacade.instance) {
            GCPComputeVMInstancesFacade.instance = new GCPComputeVMInstancesFacade();
        }

        return GCPComputeVMInstancesFacade.instance;
    }

    public static getAccessConfigTypeNameByValue(accessConfigType: GoogleCloudComputeV1Types.AccessConfig.Type): string {
        return GoogleCloudComputeV1Types.AccessConfig.Type[accessConfigType];
    }

    // TODO: refactor
    public async init(): Promise<void> {
        const serviceAccountCredentials = FirebaseAdminRegistry.loadServiceAccountCredentials();

        if (isNil(this.instancesClient)) {
            this.instancesClient = new InstancesClient(serviceAccountCredentials);
            await this.instancesClient.initialize();
        }

        if (isNil(this.zoneOperationClient)) {
            this.zoneOperationClient = new ZoneOperationsClient(serviceAccountCredentials);
            await this.zoneOperationClient.initialize();
        }
    }

    public async checkOperationStatus(request: GCPInstanceCheckOperation) {
        return this.zoneOperationClient.get(request);
    }

    public async startInstance(request: GCPVMInstanceChangeStatusRequest): Promise<GCPInstanceRequestOperationExtended> {
        await this.init();
        const requestCopy = cloneDeep(request);

        if (isNil(requestCopy.project)) {
            requestCopy.project = this.projectId;
        }

        const [operation] = await this.instancesClient.start(requestCopy);
        return {
            ...pick<typeof operation, 'name' | 'done'>(operation, ['done', 'name']),
            ...request,
            nextStatus:  GCPInstanceStatusEnum.RUNNING,
        };
    }

    public async stopInstance(request: GCPVMInstanceChangeStatusRequest): Promise<GCPInstanceRequestOperationExtended> {
        await this.init();
        const requestCopy = cloneDeep(request);

        if (isNil(requestCopy.project)) {
            requestCopy.project = this.projectId;
        }

        const [operation] = await this.instancesClient.start(requestCopy);
        return {
            ...pick<typeof operation, 'name' | 'done'>(operation, ['done', 'name']),
            ...request,
            nextStatus:  GCPInstanceStatusEnum.TERMINATED,
        };
    }

    public async loadVMInstancesCompactList(): Promise<GCPVMMinimalData[]> {
        await this.init();

        const aggListRequest = this.instancesClient.aggregatedListAsync({
            project: this.projectId,
            maxResults: GCP_MAX_AGGREGATED_RESULTS_PER_PAGE,
        });

        const vmInstancesList = [];
        for await (const [zone, instancesObject] of aggListRequest) {
            const instances = instancesObject.instances;

            if (instances && instances.length > 0) {
                for (const instance of instances) {
                    const externalIPs = this.extractExternalIPsFromVMInstances(instance);

                    // status: PROVISIONING, STAGING, RUNNING, STOPPING, SUSPENDING, SUSPENDED, REPAIRING, and TERMINATED
                    vmInstancesList.push({
                        ...pick(instance, ['id', 'name', 'machineType', 'status']),
                        zone: removePrefixStringFormatter('zones/', zone),
                        externalIPs,
                    });
                }
            }
        }

        return vmInstancesList;
    }

    get projectId(): string {
        return FirebaseAdminRegistry.getInstance().projectId;
    }
}

// exports
export default GCPComputeVMInstancesFacade;