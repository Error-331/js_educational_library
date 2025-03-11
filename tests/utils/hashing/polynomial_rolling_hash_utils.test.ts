// external imports

// internal imports
import { HASHING_M_PRIME_NUMBER1, HASHING_P_PRIME_NUMBER_ALPHABETIC1 } from '../../../src/constants/hash_constants';
import {
    calcPolynomialRollingHashPowerOfP,
    calcPolynomialRollingHashData,
    calcPolynomialRollingHash,
    calcSubstringPolynomialRollingHash
} from '../../../src/utils/hashing/polynomial_rolling_hash_utils';

// implementation
describe('Hashing utilities tests...', () => {
   // await t.test('calcPolynomialRollingHash() function tests...', async (t) => {
        /*const stringToHash1 = 'geeksforgeeks';
        const stringToHash2 = 'aaaaaaaaaaaaa';
        const stringToHash3 = 'test1';

        const caseInsensitiveHashResult1 = 609871790;
        const caseInsensitiveHashResult2 = 217407325;
        const caseInsensitiveHashResult3 = -42791233;

        const caseSensitiveHashResult1 = 480974843;
        const caseSensitiveHashResult2 = 88510378;
        const caseSensitiveHashResult3 = 48822047;*/

        /*await t.test('case case-insensitive alphanumeric hash calculation tests...', async (t) => {
        });

        await t.test('case case-sensitive alphanumeric hash calculation tests...', async (t) => {
            await t.test('Should turn string into a hash - case 1...', async () => {
                const hash = calcPolynomialRollingHash( true, HASHING_P_PRIME_NUMBER_ALPHABETIC1, HASHING_M_PRIME_NUMBER1, stringToHash1);
                assert.strictEqual(hash, caseSensitiveHashResult1);
            });

            await t.test('Should turn string into a hash - case 2...', async () => {
                const hash = calcPolynomialRollingHash( true, HASHING_P_PRIME_NUMBER_ALPHABETIC1, HASHING_M_PRIME_NUMBER1, stringToHash2);
                assert.strictEqual(hash, caseSensitiveHashResult2);
            });

            await t.test('Should turn string into a hash - case 3...', async () => {
                const hash = calcPolynomialRollingHash( true, HASHING_P_PRIME_NUMBER_ALPHABETIC1, HASHING_M_PRIME_NUMBER1, stringToHash3);
                assert.strictEqual(hash, caseSensitiveHashResult3);
            });
        });*/

        /*await t.test('tests...', async (t) => {
                const fullHash = calcPolynomialRollingHash(false, HASHING_P_PRIME_NUMBER_ALPHABETIC1, HASHING_M_PRIME_NUMBER1, 'bangtesta');
                const parthash = calcPolynomialRollingHash(false, HASHING_P_PRIME_NUMBER_ALPHABETIC1, HASHING_M_PRIME_NUMBER1, 'ban');
                const g = calcPolynomialRollingHashData(false, HASHING_P_PRIME_NUMBER_ALPHABETIC1, HASHING_M_PRIME_NUMBER1, 'bangtesta');
console.log('bangtesta'[0], 'bangtesta'[2])
                const t1 = calcSubstringPolynomialRollingHash(HASHING_M_PRIME_NUMBER1, 0, 2, g.hashes, g.powersOfP);
// 891031477

                console.log(g, parthash, t1);
        });*/



   // });
});