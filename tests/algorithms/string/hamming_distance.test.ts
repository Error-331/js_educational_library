// external imports

// internal imports
import { hammingDistanceCaseSensitive, hammingDistanceCaseInsensitive } from '../../../src/algorithms/string/hamming_distance';

// implementation
describe('Hamming distance calculation tests...', () => {
    const firstString1 = '1010001';
    const firstString2 = '00110011';
    const firstString3 = '1010110010';

    const firstString4 = 'aabcdcza';
    const firstString5 = 'xd36dscaaa';
    const firstString6 = 'xxdd0zcca';

    const firstString7 = 'AAsdGzd53gH';
    const firstString8 = 'bbE5gfEThdsFGf';
    const firstString9 = '7gUYRd4RYhd';
    const firstString10 = '65sgfGFDfD1';

    const secondString1 = '1011110';
    const secondString2 = '11001100';
    const secondString3 = '1011000001';

    const secondString4 = 'aaccaczg';
    const secondString5 = 'zh38dscaga';
    const secondString6 = 'xxdd0zcca';

    const secondString7 = 'aaSDgZD53Gh';
    const secondString8 = 'aBEcEfETHdsFVf';
    const secondString9 = '7GzYrd5RyHD';
    const secondString10 ='65mGfzcafD1';

    describe('hammingDistanceCaseSensitive() function tests...', () => {
        test('Should correctly calculate Hamming distance - case 1...', async () => {
            const distance = hammingDistanceCaseSensitive(firstString1, secondString1);
            expect(distance).toStrictEqual(4);
        });

        test('Should correctly calculate Hamming distance - case 2...', async () => {
            const distance = hammingDistanceCaseSensitive(firstString2, secondString2);
            expect(distance).toStrictEqual(8);
        });

        test('Should correctly calculate Hamming distance - case 3...', async () => {
            const distance = hammingDistanceCaseSensitive(firstString3, secondString3);
            expect(distance).toStrictEqual(5);
        });

        test('Should correctly calculate Hamming distance - case 4...', async () => {
            const distance = hammingDistanceCaseSensitive(firstString4, secondString4);
            expect(distance).toStrictEqual(3);
        });

        test('Should correctly calculate Hamming distance - case 5...', async () => {
            const distance = hammingDistanceCaseSensitive(firstString5, secondString5);
            expect(distance).toStrictEqual(4);
        });

        test('Should correctly calculate Hamming distance - case 6...', async () => {
            const distance = hammingDistanceCaseSensitive(firstString6, secondString6);
            expect(distance).toStrictEqual(0);
        });

        test('Should correctly calculate Hamming distance - case 7...', async () => {
            const distance = hammingDistanceCaseSensitive(firstString7, secondString7);
            expect(distance).toStrictEqual(9);
        });

        test('Should correctly calculate Hamming distance - case 8...', async () => {
            const distance = hammingDistanceCaseSensitive(firstString8, secondString8);
            expect(distance).toStrictEqual(6);
        });

        test('Should correctly calculate Hamming distance - case 9...', async () => {
            const distance = hammingDistanceCaseSensitive(firstString9, secondString9);
            expect(distance).toStrictEqual(7);
        });

        test('Should correctly calculate Hamming distance - case 10...', async () => {
            const distance = hammingDistanceCaseSensitive(firstString10, secondString10);
            expect(distance).toStrictEqual(5);
        });
    });

    describe('hammingDistanceCaseInsensitive() function tests...', () => {
        test('Should correctly calculate Hamming distance - case 1...', async () => {
            const distance = hammingDistanceCaseInsensitive(firstString1, secondString1);
            expect(distance).toStrictEqual(4);
        });

        test('Should correctly calculate Hamming distance - case 2...', async () => {
            const distance = hammingDistanceCaseInsensitive(firstString2, secondString2);
            expect(distance).toStrictEqual(8);
        });

        test('Should correctly calculate Hamming distance - case 3...', async () => {
            const distance = hammingDistanceCaseInsensitive(firstString3, secondString3);
            expect(distance).toStrictEqual(5);
        });

        test('Should correctly calculate Hamming distance - case 4...', async () => {
            const distance = hammingDistanceCaseInsensitive(firstString4, secondString4);
            expect(distance).toStrictEqual(3);
        });

        test('Should correctly calculate Hamming distance - case 5...', async () => {
            const distance = hammingDistanceCaseInsensitive(firstString5, secondString5);
            expect(distance).toStrictEqual(4);
        });

        test('Should correctly calculate Hamming distance - case 6...', async () => {
            const distance = hammingDistanceCaseInsensitive(firstString6, secondString6);
            expect(distance).toStrictEqual(0);
        });

        test('Should correctly calculate Hamming distance - case 7...', async () => {
            const distance = hammingDistanceCaseInsensitive(firstString7, secondString7);
            expect(distance).toStrictEqual(0);
        });

        test('Should correctly calculate Hamming distance - case 8...', async () => {
            const distance = hammingDistanceCaseInsensitive(firstString8, secondString8);
            expect(distance).toStrictEqual(4);
        });

        test('Should correctly calculate Hamming distance - case 9...', async () => {
            const distance = hammingDistanceCaseInsensitive(firstString9, secondString9);
            expect(distance).toStrictEqual(2);
        });

        test('Should correctly calculate Hamming distance - case 10...', async () => {
            const distance = hammingDistanceCaseInsensitive(firstString10, secondString10);
            expect(distance).toStrictEqual(4);
        });
    });
});

// exports