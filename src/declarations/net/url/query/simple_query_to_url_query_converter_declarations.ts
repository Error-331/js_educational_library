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
    Object = 'object',
}

enum SimpleQueryEntryOperator {
    Equal = 'eq',
    GreaterThanOrEqual = 'gte',
    LessThanOrEqual = 'lte',
    In = 'in',
    Contains = 'contains'
}

type SimpleQueryEntryValue = string | number | string[] | object;

type SimpleQueryEntry = {
    type: SimpleQueryEntryType;
    field: string;
    valueType: SimpleQueryValueType;
    value: SimpleQueryEntryValue;
    operator: SimpleQueryEntryOperator;
}

// exports
export {
    SimpleQueryEntryType,
    SimpleQueryValueType,
    SimpleQueryEntryOperator,
}

export type {
    SimpleQueryEntryValue,
    SimpleQueryEntry,
}