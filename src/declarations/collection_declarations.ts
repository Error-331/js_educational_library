// external imports

// internal imports

// implementation
type ArrayIteratorFunction<ArrayValueType, IteratorResultType> = (value: ArrayValueType, index: number, collection: ArrayLike<ArrayValueType>) => IteratorResultType;
type ArrayIterator<ArrayValueType, IteratorResultType> = ArrayIteratorFunction<ArrayValueType, IteratorResultType>;

type CollectionIteratorFunction<CollectionType, IteratorResultType> = (value: CollectionType[keyof CollectionType], key: string | number, collection: CollectionType) => IteratorResultType;
type CollectionIterator<CollectionType, IteratorResultType> = CollectionIteratorFunction<CollectionType, IteratorResultType>;

// exports
export {
    ArrayIteratorFunction,
    ArrayIterator,

    CollectionIteratorFunction,
    CollectionIterator,
}