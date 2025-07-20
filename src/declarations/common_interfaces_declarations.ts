// external imports

// internal imports

// implementation
interface Serializable<SerializedType> {
    serialize: () => SerializedType;
}

// exports
export {
    Serializable,
}