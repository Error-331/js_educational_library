// external imports

// internal imports

// implementation
enum CivitAIImagesQueryTypeParameters {
    Image = 'image',
    Video = 'video',
    Audio = 'audio',
}

enum CivitAIImagesQuerySortParameters {
    MostReactions = 'Most Reactions',
    MostComments = 'Most Comments',
    MostCollected = 'Most Collected',
    Newest = 'Newest',
    Oldest = 'Oldest',
    Random = 'Random',
}

enum CivitAIImagesQueryPeriodParameters {
    AllTime = 'AllTime',
    Year = 'Year',
    Month = 'Month',
    Week = 'Week',
    Day = 'Day',
}

type CivitAIImagesQueryParameters = {
    limit?: number;
    page?: number;
    cursor?: string;

    postId?: number;
    modelId?: number;
    modelVersionId?: number;
    imageId?: number;

    username?: string;
    userId?: number;

    period?: CivitAIImagesQueryPeriodParameters;
    sort?: CivitAIImagesQuerySortParameters;

    browsingLevel?: number;
    tags?: number[];
    type?: CivitAIImagesQueryTypeParameters;
    baseModels?: string[];

    withMeta?: boolean;
    withTags?: boolean;
}

type CivitAIImageStats = {
    cryCount?: number;
    laughCount?: number;
    likeCount?: number;
    dislikeCount?: number;
    heartCount?: number;
    commentCount?: number;
}

type CivitAIImageTag = {
    id: number;
    name: string;
}

type CivitAIImageEntity = {
    id: number;
    url: string;
    hash: string;

    width: number;
    height: number;

    type: string;
    nsfw: boolean;
    nsfwLevel: string;
    browsingLevel: number;

    createdAt: string;
    postId: number;
    username: string;

    baseModel: string;
    modelVersionIds: number[];

    stats?: CivitAIImageStats;
    meta?: null;
    tags?: CivitAIImageTag[];
}

type CivitAIAPIImagesResponse = {
    items: CivitAIImageEntity[],
    metadata: {
        totalItems?: number;

        currentPage?: number;
        pageSize?: number;
        totalPages?: number;

        nextCursor?: string;
        nextPage?: string;
    }
}

// exports
export type {
    CivitAIImagesQueryParameters,

    CivitAIImageStats,
    CivitAIImageTag,
    CivitAIImageEntity,

    CivitAIAPIImagesResponse,
}

export {
    CivitAIImagesQueryTypeParameters,
    CivitAIImagesQuerySortParameters,
    CivitAIImagesQueryPeriodParameters,
}