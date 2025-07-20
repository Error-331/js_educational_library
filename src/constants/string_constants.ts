// external imports

// internal imports

// implementation
const NUMERIC_CHARACTERS = '0123456789';
const LOWERCASE_LETTERS_EN = 'abcdefghijklmnopqrstuvwxyz';
const ALPHANUMERIC_LETTERS_36_EN_ALL = `${LOWERCASE_LETTERS_EN}${NUMERIC_CHARACTERS}`;
const ALPHANUMERIC_LETTERS_62_EN_ALL = `ABCDEFGHIJKLMNOPQRSTUVWXYZ${LOWERCASE_LETTERS_EN}${NUMERIC_CHARACTERS}`;

const LINUX_LINE_BREAK_STRING = '\n';
const WINDOWS_LINE_BREAK_STRING = '\r\n';

const BASIC_SPECIAL_SYMBOLS = [
    '!', '@', '#', '$', '%', '^', '(', ')', '/', '\\', ':', ';', '*', '?', '\'', '"', '<', '>', '|',
    '&', '№', '~', '`', '-', '_', '.', ',', '+', '¶', '§', '[', ']', '{', '}', '^',
];

// exports
export {
    NUMERIC_CHARACTERS,
    LOWERCASE_LETTERS_EN,
    ALPHANUMERIC_LETTERS_36_EN_ALL,
    ALPHANUMERIC_LETTERS_62_EN_ALL,

    LINUX_LINE_BREAK_STRING,
    WINDOWS_LINE_BREAK_STRING,

    BASIC_SPECIAL_SYMBOLS,
}
