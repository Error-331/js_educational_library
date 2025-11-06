// external imports

// internal imports
import { convertFloatSecondsToTimePosition } from '../../../src/utils/vendor/ffmpeg_utils';

// implementation
describe('ffmpeg utils tests....', () => {
    describe('convertFloatSecondsToTimePosition() function tests...', () => {
        test('Should return correct time position for integer seconds', () => {
            const result = convertFloatSecondsToTimePosition(65);
            expect(result).toBe('00:01:05.000');
        });

        test('Should return correct time position for float seconds', () => {
            const result = convertFloatSecondsToTimePosition(125.678);
            expect(result).toBe('00:02:05.678');
        });

        test('Should handle edge case of zero seconds', () => {
            const result = convertFloatSecondsToTimePosition(0);
            expect(result).toBe('00:00:00.000');
        });

        test('Should handle negative float seconds (edge case)', () => {
            const result = convertFloatSecondsToTimePosition(-10.345);
            expect(result).toBe('-00:00:10.345');
        });

        test('Should return correct time for exact hour, minute, and second', () => {
            const result = convertFloatSecondsToTimePosition(3600);
            expect(result).toBe('01:00:00.000');
        });

        test('Should format time for large input values - multiple hours', () => {
            const result = convertFloatSecondsToTimePosition(7265);
            expect(result).toBe('02:01:05.000');
        });

        test('Should handle input with milliseconds close to rounding margins', () => {
            const result = convertFloatSecondsToTimePosition(59.999);
            expect(result).toBe('00:00:59.999');
        });
    });
});

// exports

