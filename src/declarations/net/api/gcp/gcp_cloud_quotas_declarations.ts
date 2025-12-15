// external imports

// internal imports

// implementation
enum GCPCloudQuotaParentScope {
    folders = 'folders',
    projects = 'projects',
    organizations = 'organizations',
}

enum GCPCloudQuotaUpdateFailCode {
    fixed = 0,
    rollingOut = 1,
    sameValue = 2,
    sameValueNull = 3,
    cannotBeIncreased = 4,
}

// exports
export {
    GCPCloudQuotaParentScope,
    GCPCloudQuotaUpdateFailCode,
}