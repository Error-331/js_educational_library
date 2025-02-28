// external imports

// internal imports

// implementation
type PartialShallow<ObjectType> = {
    [ObjectKeyType in keyof ObjectType]?: ObjectType[ObjectKeyType] extends object ? object : ObjectType[ObjectKeyType]
};

type AtLeast<ObjectType, ObjectKeysType extends keyof ObjectType> = Partial<ObjectType> & Pick<ObjectType, ObjectKeysType>;

// exports
export type {
    PartialShallow,
    AtLeast,
}