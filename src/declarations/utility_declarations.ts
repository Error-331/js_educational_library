// external imports

// internal imports

// implementation
type PartialShallow<ObjectType> = {
    [ObjectKeyType in keyof ObjectType]?: ObjectType[ObjectKeyType] extends object ? object : ObjectType[ObjectKeyType]
};

type AtLeast<ObjectType, ObjectKeysType extends keyof ObjectType> = Partial<ObjectType> & Pick<ObjectType, ObjectKeysType>;

type ComparatorType<InputDataType> = (first: InputDataType, second: InputDataType) => number;
type GenericMixinConstructor<InstanceType = {}> = new (...args: any[]) => InstanceType;

// exports
export type {
    PartialShallow,
    AtLeast,

    ComparatorType,
    GenericMixinConstructor,
}