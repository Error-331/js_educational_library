// external imports

// internal imports
import { EnumLikeObjectType } from '../../declarations/collection_declarations';

// implementation
function isEnumContainsValue<EnumType>(enumObject: object, enumValue: unknown): enumValue is EnumType {
    return Object.values(enumObject).includes(enumValue);
}

function checkKeyToStringKeyEnumType<OriginalEnumType extends EnumLikeObjectType<string>>(enumToCheck: EnumLikeObjectType, keys: string[]): enumToCheck is OriginalEnumType  {
    for (const key of keys) {
        const currentValue = enumToCheck[key];
        if (currentValue === undefined || currentValue !== key) {
            return false;
        }
    }

    return true;
}

function convertEnumToKeyToStringKeyEnum<OriginalEnumType, NewEnumType extends EnumLikeObjectType>(originalEnum: OriginalEnumType): NewEnumType {
    const originalEnumKeys = Object.keys(originalEnum);
    const newEnum: EnumLikeObjectType = originalEnumKeys.reduce<EnumLikeObjectType>((acc: EnumLikeObjectType, key: string) => {
        acc[key] = key;
        return acc;
    }, {});

    if (!checkKeyToStringKeyEnumType<NewEnumType>(newEnum, originalEnumKeys)) {
        throw new Error('Cannot convert enum to string/key enum - converted enum check fail');
    }

    return newEnum;
}

// exports
export {
    isEnumContainsValue,

    checkKeyToStringKeyEnumType,
    convertEnumToKeyToStringKeyEnum,
}