// external imports

// internal imports
import {
    reverseStringFormatter,

    stringByLineBreakFormatter,
    trimStringFormatterFP,
    addPrefixStringFormatterFP,
    addPostfixStringFormatterFP,

    cleanCapitalizedListItemStringFormatter,
} from '../../../../src/utils/primitives/string/basic_string_formatting_utils';
import { chain } from '../../../../src/utils/misc/functional_utils';

// implementation
describe('Basic string formatting utilities tests....', () => {
    const testMultilineString1 = `
        vISA.
        mastercard.
        mIR.
        maestro.
        amEX.
        unionPay.
    `

    const testMultilineString2 = `
        Static ISP — from $20 for 10 ISP addresses to $200 for 100 ISP addresses
        Unlimited Residential Proxy — from $300 per day to $2800 per month
        Residential Proxy — from $4.5 per GB to $300 per 100 GB
        Server Proxies — from $10 per day to $135 per month
        IPv6 — from $10 per day to $110 per month
        `;

    const testMultilineStringFormattedResult1 = `- VISA;
- Mastercard;
- MIR;
- Maestro;
- AmEX;
- UnionPay;`

    const testMultilineStringFormattedResult2 = `- Static ISP — from $20 for 10 ISP addresses to $200 for 100 ISP addresses;
- Unlimited Residential Proxy — from $300 per day to $2800 per month;
- Residential Proxy — from $4.5 per GB to $300 per 100 GB;
- Server Proxies — from $10 per day to $135 per month;
- IPv6 — from $10 per day to $110 per month;`;
    

    describe('reverseStringFormatter() function tests...', () => {
        test('Should correctly reverse a string string - case 1', async () => {
            const result = reverseStringFormatter('- Unlimited Residential Proxy — from $300 per day to $2800 per month;');
            expect(result).toBe(';htnom rep 0082$ ot yad rep 003$ morf — yxorP laitnediseR detimilnU -');
        });
    });

    describe('stringByLineBreakFormatter() function tests...', () => {
        test('Should correctly format provided multiline string - case 1', async () => {
            const formattersChain = chain(trimStringFormatterFP, cleanCapitalizedListItemStringFormatter)
            const result = await stringByLineBreakFormatter(formattersChain, '\n', trimStringFormatterFP(testMultilineString1));

            expect(result).toBe(testMultilineStringFormattedResult1);
        });

        test('Should correctly format provided multiline string - case 2', async () => {
            const formattersChain = chain(trimStringFormatterFP, addPrefixStringFormatterFP('- '), addPostfixStringFormatterFP(';'))
            const result = await stringByLineBreakFormatter(formattersChain, '\n', trimStringFormatterFP(testMultilineString2));

            expect(result).toBe(testMultilineStringFormattedResult2);
        });
    });
});

// exports