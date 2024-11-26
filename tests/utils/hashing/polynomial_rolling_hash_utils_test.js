'use strict';

// external imports
import { test } from 'node:test';
import assert from 'node:assert/strict';

// internal imports
import { HASHING_M_PRIME_NUMBER1, HASHING_P_PRIME_NUMBER_ALPHABETIC1 } from './../../../src/constants/hash_constants.js';
import { polynomialRollingHash } from './../../../src/utils/hashing/polynomial_rolling_hash_utils.js';

// implementation
test('Hashing utilities tests...', async (t) => {
    await t.test('polynomialRollingHash() function tests...', async (t) => {
        const stringToHash1 = 'geeksforgeeks';
        const stringToHash2 = 'aaaaaaaaaaaaa';
        const stringToHash3 = 'test1';

        const caseInsensitiveHashResult1 = 609871790;
        const caseInsensitiveHashResult2 = 217407325;
        const caseInsensitiveHashResult3 = -42791233;

        const caseSensitiveHashResult1 = 480974843;
        const caseSensitiveHashResult2 = 88510378;
        const caseSensitiveHashResult3 = 48822047;

        await t.test('case case-insensitive alphanumeric hash calculation tests...', async (t) => {
            await t.test('Should turn string into a hash - case 1...', async () => {
                const hash = polynomialRollingHash( false, HASHING_P_PRIME_NUMBER_ALPHABETIC1, HASHING_M_PRIME_NUMBER1, stringToHash1);
                assert.strictEqual(hash, caseInsensitiveHashResult1);
            });

            await t.test('Should turn string into a hash - case 2...', async () => {
                const hash = polynomialRollingHash( false, HASHING_P_PRIME_NUMBER_ALPHABETIC1, HASHING_M_PRIME_NUMBER1, stringToHash2);
                assert.strictEqual(hash, caseInsensitiveHashResult2);
            });

            await t.test('Should turn string into a hash - case 3...', async () => {
                const hash = polynomialRollingHash( false, HASHING_P_PRIME_NUMBER_ALPHABETIC1, HASHING_M_PRIME_NUMBER1, stringToHash3);
                assert.strictEqual(hash, caseInsensitiveHashResult3);
            });
        });

        await t.test('case case-sensitive alphanumeric hash calculation tests...', async (t) => {
            await t.test('Should turn string into a hash - case 1...', async () => {
                const hash = polynomialRollingHash( true, HASHING_P_PRIME_NUMBER_ALPHABETIC1, HASHING_M_PRIME_NUMBER1, stringToHash1);
                assert.strictEqual(hash, caseSensitiveHashResult1);
            });

            await t.test('Should turn string into a hash - case 2...', async () => {
                const hash = polynomialRollingHash( true, HASHING_P_PRIME_NUMBER_ALPHABETIC1, HASHING_M_PRIME_NUMBER1, stringToHash2);
                assert.strictEqual(hash, caseSensitiveHashResult2);
            });

            await t.test('Should turn string into a hash - case 3...', async () => {
                const hash = polynomialRollingHash( true, HASHING_P_PRIME_NUMBER_ALPHABETIC1, HASHING_M_PRIME_NUMBER1, stringToHash3);
                assert.strictEqual(hash, caseSensitiveHashResult3);
            });
        });





    });
});