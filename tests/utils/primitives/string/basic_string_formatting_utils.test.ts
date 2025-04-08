// external imports

// internal imports
import {
    stringByLineBreakFormatter,
    trimStringFormatterFP,
    addPrefixStringFormatterFP,
    addPostfixStringFormatterFP,
} from '../../../../src/utils/primitives/string/basic_string_formatting_utils';
import { chain } from '../../../../src/utils/misc/functional_utils';

// implementation
describe('Basic string formatting utilities tests....', () => {
    const testMultilineString2 = `
        Static ISP — from $20 for 10 ISP addresses to $200 for 100 ISP addresses
        Unlimited Residential Proxy — from $300 per day to $2800 per month
        Residential Proxy — from $4.5 per GB to $300 per 100 GB
        Server Proxies — from $10 per day to $135 per month
        IPv6 — from $10 per day to $110 per month
        `;

    const testMultilineStringFormattedResult2 = `- Static ISP — from $20 for 10 ISP addresses to $200 for 100 ISP addresses;
- Unlimited Residential Proxy — from $300 per day to $2800 per month;
- Residential Proxy — from $4.5 per GB to $300 per 100 GB;
- Server Proxies — from $10 per day to $135 per month;
- IPv6 — from $10 per day to $110 per month;`;

    describe('formatStringByLineBreak() function tests...', () => {
        test('Should correctly format... - case 2', async () => {
            const formattersChain = chain(trimStringFormatterFP, addPrefixStringFormatterFP('- '), addPostfixStringFormatterFP(';'))
            const result = await stringByLineBreakFormatter(formattersChain, '\n', trimStringFormatterFP(testMultilineString2));

            expect(result).toBe(testMultilineStringFormattedResult2);
        });
    });
});

// exports