// external imports

// internal imports

// implementation
type GenericObject<DataType = unknown> = { [key: string | number]: DataType };
type EnumLikeObjectType<ValueType = string> = { [key: string]: ValueType };

type ArrayIteratorFunction<ArrayValueType, IteratorResultType> = (value: ArrayValueType, index: number, collection: ArrayLike<ArrayValueType>) => IteratorResultType;
type ArrayIterator<ArrayValueType, IteratorResultType> = ArrayIteratorFunction<ArrayValueType, IteratorResultType>;

type CollectionIteratorFunction<CollectionType, IteratorResultType> = (value: CollectionType[keyof CollectionType], key: string | number, collection: CollectionType) => IteratorResultType;
type CollectionIterator<CollectionType, IteratorResultType> = CollectionIteratorFunction<CollectionType, IteratorResultType>;

type IterableMapLikeEntity<ValueType> = {
    entries(): MapIterator<[string, ValueType]>;
};

// exports
export {
    GenericObject,
    EnumLikeObjectType,

    ArrayIteratorFunction,
    ArrayIterator,

    CollectionIteratorFunction,
    CollectionIterator,

    IterableMapLikeEntity,
}