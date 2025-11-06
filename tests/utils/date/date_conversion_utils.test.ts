// external imports

// internal imports
import { convertSecondsToTimeArray } from '../../../src/utils/date/date_conversion_utils';

// implementation
describe('Date conversion utilities tests...', () => {
    describe('convertSecondsToTimeArray() function tests...', () => {
        test('Should return [0, 0, 0] for 0 seconds', () => {
            expect(convertSecondsToTimeArray(0)).toEqual([0, 0, 0]);
        });

        test('Should convert seconds to hours, minutes, and seconds correctly', () => {
            expect(convertSecondsToTimeArray(3661)).toEqual([1, 1, 1]); // 1 hour, 1 minute, 1 second
            expect(convertSecondsToTimeArray(7322)).toEqual([2, 2, 2]); // 2 hours, 2 minutes, 2 seconds
        });

        test('Should return the correct array even for less than a minute', () => {
            expect(convertSecondsToTimeArray(45)).toEqual([0, 0, 45]);  // 45 seconds
        });

        test('Should return the correct array for less than an hour but more than a minute', () => {
            expect(convertSecondsToTimeArray(122)).toEqual([0, 2, 2]);  // 2 minutes, 2 seconds
        });

        test('Should handle larger values correctly', () => {
            expect(convertSecondsToTimeArray(86461)).toEqual([24, 1, 1]); // 24 hours, 1 minute, 1 second (beyond 24 hours)
        });

        test('Should handle edge cases like exactly 1 minute, 1 hour, etc.', () => {
            expect(convertSecondsToTimeArray(60)).toEqual([0, 1, 0]); // 1 minute
            expect(convertSecondsToTimeArray(3600)).toEqual([1, 0, 0]); // 1 hour
            expect(convertSecondsToTimeArray(3660)).toEqual([1, 1, 0]); // 1 hour, 1 minute
        });
    });
});

// exports