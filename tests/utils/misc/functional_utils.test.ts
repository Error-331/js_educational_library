// external imports

// internal imports
import { curry, defaultTo, defaultToNull, chain } from '../../../src/utils/misc/functional_utils';
import { isString } from '../../../src/utils/misc/logic_utils';

// implementation
describe('Functional utilities tests...', () => {
    describe('curry() function tests...', () => {
        test('Should correctly return curried function - case 1', async () => {
            const testFunc = (testArg1: number, testArg2: number) => testArg1 + testArg2;

            const curriedFunction = curry(testFunc);
            expect(typeof curriedFunction).toStrictEqual('function');

            const partialFunc1 = curriedFunction(1);
            expect(typeof partialFunc1).toStrictEqual('function');

            const result = partialFunc1(3);
            expect(result).toStrictEqual(4);
        });

        test('Should correctly return curried function - case 2', async () => {
            const testFunc = (testArg1: number, testArg2: number, testArg3: number) => testArg1 + testArg2 - testArg3;

            const curriedFunction = curry(testFunc);
            expect(typeof curriedFunction).toStrictEqual('function');

            const partialFunc1 = curriedFunction(1);
            expect(typeof partialFunc1).toStrictEqual('function');

            const partialFunc2 =  partialFunc1(3);
            expect(typeof partialFunc2).toStrictEqual('function');

            const result = partialFunc2(4);
            expect(result).toStrictEqual(0);
        });

        test('Should correctly return curried function - case 3', async () => {
            const testFunc = (testArg1: number, testArg2: number, testArg3: number, testArg4: number) => (testArg1 + testArg2 - testArg3) * testArg4;

            const curriedFunction = curry(testFunc);
            expect(typeof curriedFunction).toStrictEqual('function');

            const partialFunc1 = curriedFunction(1);
            expect(typeof partialFunc1).toStrictEqual('function');

            const partialFunc2 =  partialFunc1(3);
            expect(typeof partialFunc2).toStrictEqual('function');

            const partialFunc3 =  partialFunc2(1);
            expect(typeof partialFunc3).toStrictEqual('function');

            const result = partialFunc3(4);
            expect(result).toStrictEqual(12);
        });
    });

    describe('defaultTo() function tests...', () => {
        test('Should correctly return default value - case 1', () => {
            const func = defaultTo(4);
            expect(func(null)).toStrictEqual(4);
        });

        test('Should correctly return default value - case 2', () => {
            const func = defaultTo([1, 'a', null]);
            expect(func(null)).toStrictEqual([1, 'a', null]);
        });

        test('Should correctly return default value - case 3', () => {
            const func = defaultTo({ testProp1: 1, testProp2: 'a', testProp3: [1, 'a', null] });
            expect(func(null)).toStrictEqual({ testProp1: 1, testProp2: 'a', testProp3: [1, 'a', null] });
        });

        test('Should not return default value - case 1', () => {
            const func = defaultTo(4);

            expect(func(5)).toStrictEqual(5);
        });

        test('Should not return default value - case 2', () => {
            const func = defaultTo([1, 'a', null]);

            expect(func([2, 'b', undefined])).toStrictEqual([2, 'b', undefined]);
        });

        test('Should not return default value - case 3', () => {
            const func = defaultTo({ testProp1: 1, testProp2: 'a', testProp3: [1, 'a', null], });

            expect(func({ testProp1: 2, testProp2: 'b', testProp3: [2, 'b', undefined] })).toStrictEqual({ testProp1: 2, testProp2: 'b', testProp3: [2, 'b', undefined] });
        });
    });

    describe('defaultToNull() function tests...', () => {
        test('Should correctly return default null - case 1', () => {
            expect(defaultToNull(undefined)).toStrictEqual(null);
        });

        test('Should correctly return default null - case 2', () => {
            expect(defaultToNull(null)).toStrictEqual(null);
        });


        test('Should not return default value - case 1', () => {
            expect(defaultToNull(5)).toStrictEqual(5);
        });

       test('Should not return default value - case 2', () => {
            expect(defaultToNull([2, 'b', undefined])).toStrictEqual([2, 'b', undefined]);
        });

        test('Should not return default value - case 3', () => {
            expect(defaultToNull({ testProp1: 2, testProp2: 'b', testProp3: [2, 'b', undefined] })).toStrictEqual({ testProp1: 2, testProp2: 'b', testProp3: [2, 'b', undefined] });
        });
    });

    describe('chain() function tests...', () => {
        describe('Basic functions tests...', () => {
            test('Should return correct result from a chain of functions - case 1', async () => {
                const result = await chain<number>(
                    () => '3',
                    (prevVal: string) => prevVal + '4',
                    (prevVal: string) => parseInt(prevVal) + 5,
                )();
                expect(result).toBe(39);
            });

            test('Should return correct result from a chain of functions - case 2', async () => {
                const result = await chain<string>(
                    (prevVal: number) => prevVal + 10,
                    (prevVal: number) => `0.${prevVal}`,
                    (prevVal: string) => parseFloat(prevVal) + 53,
                    (prevVal: number) => `rest - ${prevVal}`,
                )(23);
                expect(result).toBe(`rest - 53.33`);
            });

            test('Should return correct result from a chain of functions - case 3', async () => {
                const result = await chain<string>(
                    (prevVal: string) => prevVal + '_temp',
                    () => null,
                    (prevVal: unknown) => `${prevVal}`,
                    (prevVal: string) => `temp_${prevVal}`,
                )('test_val1');
                expect(result).toBe(`temp_null`);
            });
        });

        describe('Async functions tests...', () => {
            test('Should return correct result from a chain of functions - case 1', async () => {
                const result = await chain<Promise<string>>(
                    async (prevVal1: string, prevVal2: number) => `${prevVal1}#${prevVal2}`,
                    (prevVal: string) => Promise.resolve(`prefix_${prevVal}`),
                    (prevVal: string) => new Promise((resolve) => setTimeout(() => { resolve(`${prevVal}_postfix`) }, 100)),
                )('test', 5);
                expect(result).toBe('prefix_test#5_postfix');
            });
        });

        describe('Functional utils tests...', () => {
            test('Should return correct result from a chain of functions - case 1', async () => {
                const result = await chain<string>(
                    defaultTo(15),
                    isString,
                    curry((prefix: string, prevVal) => `${prefix}${prevVal}`)('prefix_'),
                )(null);
                expect(result).toBe('prefix_false');
            });
        });
    });
});