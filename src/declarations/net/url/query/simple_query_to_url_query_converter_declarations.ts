// external imports

// internal imports

// implementation
enum SimpleQueryEntryType {
    Filter = 'filter',
    Order = 'order',
}

enum SimpleQueryValueType {
    Number = 'number',
    String = 'string',
    ArrayString = 'array_string',
}

enum SimpleQueryEntryOperator {
    GreaterThanOrEqual = 'gte',
    LessThanOrEqual = 'lte',
    In = 'in',
    Contains = 'contains'
}

type SimpleQueryEntry = {
    type: SimpleQueryEntryType;
    field: string;
    valueType: SimpleQueryValueType;
    value: string | number | string[];
    operator: SimpleQueryEntryOperator;
}

// exports
export {
    SimpleQueryEntryType,
    SimpleQueryValueType,
    SimpleQueryEntryOperator,
}

export type {
    SimpleQueryEntry,
}