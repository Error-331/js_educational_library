// external imports

// internal imports
import { StringFormatterFunction } from '../../../declarations/string_related_declarations';

import { curry } from '../../misc/functional_utils';
import { isNil, isString, isFunction } from '../../misc/logic_utils';

// implementation
function trimStringFormatter(strPart: string): string {
    if (!isString(strPart)) {
        throw new RangeError('Cannot trim a string part - provided string part is not a string');
    }

    return strPart.trim();
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

async function stringByLineBreakFormatter(formatterFunction: StringFormatterFunction, lineBreak = '\n', strToFormat: string): Promise<string> {
    if (!isString(strToFormat)) {
        throw new RangeError('Cannot format string by line break - provided value is not a string');
    }

    let lineBreakCopy = '\n';

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
const addPrefixStringFormatterFP = curry(addPrefixStringFormatter);
const addPostfixStringFormatterFP = curry(addPostfixStringFormatter);

// exports
export {
    trimStringFormatter,
    addPrefixStringFormatter,
    addPostfixStringFormatter,

    stringByLineBreakFormatter,

    trimStringFormatterFP,
    addPrefixStringFormatterFP,
    addPostfixStringFormatterFP,
}