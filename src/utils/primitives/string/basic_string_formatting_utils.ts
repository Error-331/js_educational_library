// external imports

// internal imports
import { StringFormatterFunction } from '../../../declarations/string_related_declarations';
import { LINUX_LINE_BREAK_STRING, BASIC_SPECIAL_SYMBOLS } from '../../../constants/string_constants';

import { curry, chain, } from '../../misc/functional_utils';
import { isNil, isString, isArray, isFunction } from '../../misc/logic_utils';

// implementation
function trimStringFormatter(strPart: string): string {
    if (!isString(strPart)) {
        throw new RangeError('Cannot trim a string part - provided string part is not a string');
    }

    return strPart.trim();
}

function removeLastLetterStringFormatter(strPart: string): string {
    if (!isString(strPart)) {
        throw new RangeError('Cannot remove last letter - provided string part is not a string');
    }

    return strPart.slice(0, -1);
}

function addPrefixStringFormatter(prefix: string, strPart: string): string {
    if (!isString(prefix)) {
        throw new RangeError('Cannot add prefix to a string part - provided prefix value is not a string');
    }

    if (!isString(strPart)) {
        throw new RangeError('Cannot add prefix to a string part - provided string part is not a string');
    }

    return `${prefix}${strPart}`;
}

function addPostfixStringFormatter(postfix: string, strPart: string): string {
    if (!isString(postfix)) {
        throw new RangeError('Cannot add postfix to a string part - provided postfix value is not a string');
    }

    if (!isString(strPart)) {
        throw new RangeError('Cannot add postfix to a string part - provided string part is not a string');
    }

    return `${strPart}${postfix}`;
}

function capitalizeFirstLetterStringFormatter(strPart: string): string {
    if (!isString(strPart)) {
        throw new RangeError('Cannot capitalize first letter of the string - provided string part is not a string');
    }

    return strPart.charAt(0).toUpperCase() + String(strPart).slice(1);
}

function removeLastSpecialSymbolStringFormatter(specialSymbols: string | string[], strPart: string): string {
    let specialSymbolsCopy = specialSymbols;

    if (isString(specialSymbolsCopy)) {
        specialSymbolsCopy = [specialSymbolsCopy];
    }

    if (!isArray(specialSymbolsCopy)) {
        throw new RangeError('Cannot remove last special symbol of the string - provided special symbols list is not an array');
    }

    if (!isString(strPart)) {
        throw new RangeError('Cannot remove last special symbol of the string - provided string part is not a string');
    }

    const firstSymbol = strPart[strPart.length - 1];

    if (specialSymbols.includes(firstSymbol)) {
        return removeLastLetterStringFormatter(strPart);
    }

    return strPart;
}

async function stringByLineBreakFormatter(formatterFunction: StringFormatterFunction, lineBreak: string, strToFormat: string): Promise<string> {
    if (!isString(strToFormat)) {
        throw new RangeError('Cannot format string by line break - provided value is not a string');
    }

    let lineBreakCopy = LINUX_LINE_BREAK_STRING;

    if (!isNil(lineBreak)) {
        if (!isString(lineBreak)) {
            throw new RangeError('Cannot format string by line break - provided line break value is not a string');
        } else {
            lineBreakCopy = lineBreak;
        }
    }

    if (!isFunction(formatterFunction)) {
        throw new RangeError('Cannot format string by line break - provided formatter is not a function');
    }

    return (await Promise.all(strToFormat.split(lineBreakCopy).map(formatterFunction))).join(lineBreak);
}


const trimStringFormatterFP = curry(trimStringFormatter);
const removeLastLetterStringFormatterFP = curry(removeLastLetterStringFormatter);
const addPrefixStringFormatterFP = curry(addPrefixStringFormatter);
const addPostfixStringFormatterFP = curry(addPostfixStringFormatter);

const capitalizeFirstLetterStringFormatterFP = curry(capitalizeFirstLetterStringFormatter);
const removeLastSpecialSymbolStringFormatterFP = curry(removeLastSpecialSymbolStringFormatter);

const cleanCapitalizedListItemStringFormatter = chain(
    trimStringFormatterFP,
    removeLastSpecialSymbolStringFormatterFP(BASIC_SPECIAL_SYMBOLS),
    capitalizeFirstLetterStringFormatterFP,
    addPrefixStringFormatterFP('- '),
    addPostfixStringFormatterFP(';')
);


// exports
export {
    trimStringFormatter,
    removeLastLetterStringFormatter,
    addPrefixStringFormatter,
    addPostfixStringFormatter,

    capitalizeFirstLetterStringFormatter,
    removeLastSpecialSymbolStringFormatter,

    stringByLineBreakFormatter,

    trimStringFormatterFP,
    removeLastLetterStringFormatterFP,
    addPrefixStringFormatterFP,
    addPostfixStringFormatterFP,

    capitalizeFirstLetterStringFormatterFP,
    removeLastSpecialSymbolStringFormatterFP,

    cleanCapitalizedListItemStringFormatter,
}