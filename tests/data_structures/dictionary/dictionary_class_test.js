'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import { checkKeys, checkValues, checkKeyValues } from './../../../src/utils/testing/data_structures/dictionary/dictionary_class_test_utils.js';
import DictionaryClass from './../../../src/data_structures/dictionary/dictionary_class.js';

// implementation
test('DictionaryClass tests...', async (t) => {
    const testKey1 = 'testProp1';
    const testKey2 = 11;
    const testKey3 = { testProp1: 'testVal1' };

    const testValue1 = 1;
    const testValue2 = 'testValue1';
    const testValue3 = null;

    const testKeys1 = [testKey1, testKey2, testKey3];

    const testValues1 = [testValue1, testValue2, testValue3];

    const testKeyValues1 = [
        [testKey1, testValue1],
        [testKey2, testValue2],
        [testKey3, testValue3],
    ];

    await t.test('clear() method tests...', async (t) => {
        await t.test('Should correctly clear dictionary - case 1', () => {
            const dictionary = new DictionaryClass();

            dictionary.set(testKey1, testValue1);
            dictionary.set(testKey2, testValue2);
            dictionary.set(testKey3, testValue3);

            assert.strictEqual(dictionary.isEmpty, false);

            dictionary.clear();
            assert.strictEqual(dictionary.isEmpty, true);
        });
    });

    await t.test('hasKey() method tests...', async (t) => {
        await t.test('Should correctly determine that specific key exists in the dictionary - case 1', () => {
            const dictionary = new DictionaryClass();

            dictionary.set(testKey1, testValue1);
            assert.strictEqual(dictionary.hasKey(testKey1), true);
        });

        await t.test('Should correctly determine that specific key exists in the dictionary - case 2', () => {
            const dictionary = new DictionaryClass();

            dictionary.set(testKey2, testValue2);
            assert.strictEqual(dictionary.hasKey(testKey2), true);
        });

        await t.test('Should correctly determine that specific key exists in the dictionary - case 3', () => {
            const dictionary = new DictionaryClass();

            dictionary.set(testKey3, testValue3);
            assert.strictEqual(dictionary.hasKey(testKey3), true);
        });
    });

    await t.test('get()/set() method tests...', async (t) => {
        await t.test('Should correctly set new key/value in the dictionary - case 1', () => {
            const dictionary = new DictionaryClass();

            dictionary.set(testKey1, testValue1);

            assert.strictEqual(dictionary.hasKey(testKey1), true);

            const value = dictionary.get(testKey1);
            assert.strictEqual(value, testValue1);
        });

        await t.test('Should correctly set new key/value in the dictionary - case 2', () => {
            const dictionary = new DictionaryClass();

            dictionary.set(testKey2, testValue2);

            assert.strictEqual(dictionary.hasKey(testKey2), true);

            const value = dictionary.get(testKey2);
            assert.strictEqual(value, testValue2);
        });

        await t.test('Should correctly set new key/value in the dictionary - case 3', () => {
            const dictionary = new DictionaryClass();

            dictionary.set(testKey3, testValue3);

            assert.strictEqual(dictionary.hasKey(testKey3), true);

            const value = dictionary.get(testKey3);
            assert.strictEqual(value, testValue3);
        });
    });

    await t.test('forEach() method tests...', async (t) => {
        await t.test('Should correctly extract key/value pairs from dictionary - case 1', () => {
            const dictionary = new DictionaryClass();

            dictionary.set(testKey1, testValue1);
            dictionary.set(testKey2, testValue2);
            dictionary.set(testKey3, testValue3);

            const keyValues = [];
            dictionary.forEach((key, value) => keyValues.push({ key, value }));

            checkKeyValues(keyValues, testKeyValues1);
        });
    });

    await t.test('Iterator tests...', async (t) => {
        await t.test('Should correctly iterate through the dictionary - case 1', () => {
            const dictionary = new DictionaryClass();

            dictionary.set(testKey1, testValue1);
            dictionary.set(testKey2, testValue2);
            dictionary.set(testKey3, testValue3);

            const keyValues = [];

            for (const keyValue of dictionary) {
                keyValues.push(keyValue);
            }

            checkKeyValues(keyValues, testKeyValues1);
        });
    });

    await t.test('size() getter tests...', async (t) => {
        await t.test('Should correctly calculate the size of the dictionary - case 1', () => {
            const dictionary = new DictionaryClass();

            dictionary.set(testKey1, testValue1);
            assert.strictEqual(dictionary.size, 1);

            dictionary.set(testKey1, testValue1);
            assert.strictEqual(dictionary.size, 1);

            dictionary.set(testKey2, testValue2);
            assert.strictEqual(dictionary.size, 2);

            dictionary.set(testKey3, testValue3);
            assert.strictEqual(dictionary.size, 3);
        });
    });

    await t.test('isEmpty() getter tests...', async (t) => {
        await t.test('Should correctly determine whether dictionary empty or not - case 1', () => {
            const dictionary = new DictionaryClass();

            assert.strictEqual(dictionary.isEmpty, true);

            dictionary.set(testKey1, testValue1);
            assert.strictEqual(dictionary.size, 1);

            assert.strictEqual(dictionary.isEmpty, false);

            dictionary.set(testKey2, testValue2);
            assert.strictEqual(dictionary.size, 2);

            assert.strictEqual(dictionary.isEmpty, false);

            dictionary.remove(testKey1);
            assert.strictEqual(dictionary.isEmpty, false);

            dictionary.remove(testKey2);
            assert.strictEqual(dictionary.isEmpty, true);
        });
    });

    await t.test('keyValues() getter tests...', async (t) => {
        await t.test('Should correctly return keys/values from the dictionary - case 1', () => {
            const dictionary = new DictionaryClass();

            dictionary.set(testKey1, testValue1);
            dictionary.set(testKey2, testValue2);
            dictionary.set(testKey3, testValue3);

            assert.strictEqual(dictionary.size, 3);

            const keyValues = dictionary.keyValues;
            checkKeyValues(keyValues, testKeyValues1);
        });
    });

    await t.test('keys() getter tests...', async (t) => {
        const dictionary = new DictionaryClass();

        dictionary.set(testKey1, testValue1);
        dictionary.set(testKey2, testValue2);
        dictionary.set(testKey3, testValue3);

        checkKeys(dictionary.keys, testKeys1);
    });

    await t.test('values() getter tests...', async (t) => {
        const dictionary = new DictionaryClass();

        dictionary.set(testKey1, testValue1);
        dictionary.set(testKey2, testValue2);
        dictionary.set(testKey3, testValue3);

        checkValues(dictionary.values, testValues1);
    });

    await t.test('remove() method tests...', async (t) => {
        await t.test('Should correctly remove value by key from the dictionary - case 1', () => {
            const dictionary = new DictionaryClass();

            dictionary.set(testKey1, testValue1);
            dictionary.set(testKey2, testValue2);
            dictionary.set(testKey3, testValue3);

            assert.strictEqual(dictionary.size, 3);

            dictionary.remove(testKey1);
            assert.strictEqual(dictionary.size, 2);

            dictionary.remove(testKey2);
            assert.strictEqual(dictionary.size, 1);

            dictionary.remove(testKey2);
            assert.strictEqual(dictionary.size, 1);

            dictionary.remove(testKey3);
            assert.strictEqual(dictionary.size, 0);
        });
    });
});

// exports