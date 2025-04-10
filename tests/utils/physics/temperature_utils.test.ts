// external imports

// internal imports
import { convertCelsiusToFahrenheit } from '../../../src/utils/physics/temperature_utils';

// implementation
describe('Temperature (physics) utilities tests....', () => {
    const celsiusValue1 = 0;
    const celsiusValue2 = -10;
    const celsiusValue3 = 10;

    const fahrenheitValue1 = 32;
    const fahrenheitValue2 = 14;
    const fahrenheitValue3 = 50;

    describe('convertCelsiusToFahrenheit() function tests...', () => {
        test('Should correctly convert Celsius to Fahrenheit value - case 1', async () => {
            expect(convertCelsiusToFahrenheit(celsiusValue1)).toBe(fahrenheitValue1);
        });

        test('Should correctly convert Celsius to Fahrenheit value - case 2', async () => {
            expect(convertCelsiusToFahrenheit(celsiusValue2)).toBe(fahrenheitValue2);
        });

        test('Should correctly convert Celsius to Fahrenheit value - case 2', async () => {
            expect(convertCelsiusToFahrenheit(celsiusValue3)).toBe(fahrenheitValue3);
        });
    });
});

// exports