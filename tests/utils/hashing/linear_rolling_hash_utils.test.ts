// external imports

// internal imports
import { HASHING_M_PRIME_NUMBER1, HASHING_M_PRIME_NUMBER2, HASHING_P_PRIME_NUMBER_ALPHABETIC1 } from '../../../src/constants/hash_constants';
import { calcLinearHash, calcLinearRollingHash } from '../../../src/utils/hashing/linear_rolling_hash_utils';

// implementation
describe('Linear hashing utils tests...', () => {
    const stringToHash1 = 'geeksforgeeks';
    const stringToHash2 = 'aaaaaaaaaaaaa';
    const stringToHash3 = 'test1';
    const stringToHash4 = 'opengenus';

    const caseInsensitiveHashResult1 = 609871790; // p = HASHING_P_PRIME_NUMBER_ALPHABETIC1, m = HASHING_M_PRIME_NUMBER1
    const caseInsensitiveHashResult2 = 217407325; // p = HASHING_P_PRIME_NUMBER_ALPHABETIC1, m = HASHING_M_PRIME_NUMBER1
    const caseInsensitiveHashResult3 = -42791233; // p = HASHING_P_PRIME_NUMBER_ALPHABETIC1, m = HASHING_M_PRIME_NUMBER1
    const caseInsensitiveHashResult4 = 183060;    // p = 3, m = HASHING_M_PRIME_NUMBER2

    const caseSensitiveHashResult1 = 480974843;   // p = HASHING_P_PRIME_NUMBER_ALPHABETIC1, m = HASHING_M_PRIME_NUMBER1
    const caseSensitiveHashResult2 = 88510378;    // p = HASHING_P_PRIME_NUMBER_ALPHABETIC1, m = HASHING_M_PRIME_NUMBER1
    const caseSensitiveHashResult3 = 48822047;    // p = HASHING_P_PRIME_NUMBER_ALPHABETIC1, m = HASHING_M_PRIME_NUMBER1
    const caseSensitiveHashResult4 = 1127796;     // p = 3, m = HASHING_M_PRIME_NUMBER2

    describe('calcLinearHashData() function tests...', () => {
        describe('Case case-insensitive alphanumeric hash calculation tests...', () => {
            test('Should correctly calculate hash of the string - case 1...', () => {
                expect(calcLinearHash(false, HASHING_P_PRIME_NUMBER_ALPHABETIC1, HASHING_M_PRIME_NUMBER1, stringToHash1)).toEqual(caseInsensitiveHashResult1);
            });

            test('Should correctly calculate hash of the string - case 2...', () => {
                expect(calcLinearHash(false, HASHING_P_PRIME_NUMBER_ALPHABETIC1, HASHING_M_PRIME_NUMBER1, stringToHash2)).toEqual(caseInsensitiveHashResult2);
            });

            test('Should correctly calculate hash of the string - case 3...', () => {
                expect(calcLinearHash(false, HASHING_P_PRIME_NUMBER_ALPHABETIC1, HASHING_M_PRIME_NUMBER1, stringToHash3)).toEqual(caseInsensitiveHashResult3);
            });

            test('Should correctly calculate hash of the string - case 4...', () => {
                expect(calcLinearHash(false, 3, HASHING_M_PRIME_NUMBER2, stringToHash4)).toEqual(caseInsensitiveHashResult4);
            });
        });

        describe('Case case-sensitive alphanumeric hash calculation tests...', () => {
            test('Should correctly calculate hash of the string - case 1...', async () => {
                expect(calcLinearHash(true, HASHING_P_PRIME_NUMBER_ALPHABETIC1, HASHING_M_PRIME_NUMBER1, stringToHash1)).toEqual(caseSensitiveHashResult1);
            });

            test('Should correctly calculate hash of the string - case 2...', async () => {
                expect(calcLinearHash(true, HASHING_P_PRIME_NUMBER_ALPHABETIC1, HASHING_M_PRIME_NUMBER1, stringToHash2)).toEqual(caseSensitiveHashResult2);
            });

            test('Should correctly calculate hash of the string - case 3...', async () => {
                expect(calcLinearHash(true, HASHING_P_PRIME_NUMBER_ALPHABETIC1, HASHING_M_PRIME_NUMBER1, stringToHash3)).toEqual(caseSensitiveHashResult3);
            });

            test('Should correctly calculate hash of the string - case 4...', async () => {
                expect(calcLinearHash(true, 3, HASHING_M_PRIME_NUMBER2, stringToHash4)).toEqual(caseSensitiveHashResult4);
            });
        });
    });

    describe('calcLinearRollingHash() function tests...', () => {
        test('Should ...', async () => {
            const h = calcLinearRollingHash(true, 5, HASHING_M_PRIME_NUMBER2, 'abc','d');
            const g = calcLinearHash(true, 5, HASHING_M_PRIME_NUMBER2, 'bcd');
            const t = calcLinearHash(true, 5, HASHING_M_PRIME_NUMBER2, 'abc');
            const z = calcLinearHash(true, 5, HASHING_M_PRIME_NUMBER2, 'abcd');

            console.log('res', h, g, t, z);
            //expect(calcLinearRollingHash(true, 3, HASHING_M_PRIME_NUMBER2, stringToHash4)).toEqual(caseSensitiveHashResult4);
        });
    });
});

// exports