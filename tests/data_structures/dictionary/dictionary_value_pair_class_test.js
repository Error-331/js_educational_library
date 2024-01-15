'use strict';

// external imports
import test from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import DictionaryValuePairClass from './../../../src/data_structures/dictionary/dictionary_value_pair_class.js';

import {
    checkValuePair
} from './../../../src/utils/testing/data_structures/dictionary/dictionary_value_pair_class_test_utils.js';

// implementation
test('DictionaryValuePairClass tests...', async (t) => {
    await t.test('Should successfully create dictionary key value pair - case 1', () => {
        let valuePair = null;

        const key = 'test_string_key1';
        const value = 'test_string_value1';

        try {
            valuePair = new DictionaryValuePairClass(key, value);
        } catch (error) {
            assert.fail(`Cannot create a value pair; ${error.message}`);
        }

        checkValuePair(valuePair, key, value, '[#test_string_key1: test_string_value1]');
    });

    await t.test('Should successfully create dictionary key value pair - case 2', () => {
        let valuePair = null;

        const key = 52;
        const value = 37;

        try {
            valuePair = new DictionaryValuePairClass(key, value);
        } catch (error) {
            assert.fail(`Cannot create a value pair; ${error.message}`);
        }

        checkValuePair(valuePair, key, value, '[#52: 37]');
    });

    await t.test('Should successfully create dictionary key value pair - case 3', () => {
        let valuePair = null;

        const key = null;
        const value = true;

        try {
            valuePair = new DictionaryValuePairClass(key, value);
        } catch (error) {
            assert.fail(`Cannot create a value pair; ${error.message}`);
        }

        checkValuePair(valuePair, key, value, '[#null: true]');
    });

    await t.test('Should successfully create dictionary key value pair - case 4', () => {
        let valuePair = null;

        const key = { tempParam1: 'tempVal1' };
        const value = undefined;

        try {
            valuePair = new DictionaryValuePairClass(key, value);
        } catch (error) {
            assert.fail(`Cannot create a value pair; ${error.message}`);
        }

        checkValuePair(valuePair, key, value, '[#[object Object]: undefined]');
    });
});

// exports