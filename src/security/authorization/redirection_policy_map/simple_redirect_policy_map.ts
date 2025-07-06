// external imports

// internal imports
import {
    SimpleRedirectPolicyRule,
    SimpleRedirectPolicyRules,
} from '../../../declarations/security/authorization/redirection_policy_map/simple_redirect_policy_map_types';

import { sanitizeURLPathPartFromRoot } from '../../../utils/net/uri_utils';
import { isObjectOfType } from '../../../utils/primitives/object_utils';
import { isNil, isBoolean, isString, isArray, isObject, isFunction } from '../../../utils/misc/logic_utils';

// implementation
class SimpleRedirectPolicyMap<PossibleStateNames extends string> {
    protected redirectPolicyRules: SimpleRedirectPolicyRules<PossibleStateNames> = {};

    constructor(rulesMap?: SimpleRedirectPolicyRules<PossibleStateNames>) {
        if (isNil(rulesMap)) {
            return;
        }

        const newRulesKeys = Object.keys(rulesMap);
        newRulesKeys.forEach((ruleKey) => this.addRule(ruleKey, rulesMap[ruleKey]));
    }

    protected getRuleByPath(currentPath: string): SimpleRedirectPolicyRule<PossibleStateNames> | null {
        if (!isString(currentPath)) {
            throw new RangeError('Cannot find redirect policy rule - specified path must be a string');
        }

        const preparedPath = sanitizeURLPathPartFromRoot(currentPath);
        const rule = this.redirectPolicyRules[preparedPath];

        return isNil(rule) ? null : rule;
    }

    public addRule(path: string, rule: SimpleRedirectPolicyRule<PossibleStateNames>): void {
        const preparedPath = sanitizeURLPathPartFromRoot(path);

        if (!isNil(this.redirectPolicyRules[preparedPath])) {
            throw new Error(`Cannot add redirect policy rule - rule for path "${preparedPath}" already exists`);
        }

        const isValidRule = isObjectOfType<SimpleRedirectPolicyRule<PossibleStateNames>>(rule, {
            allowed:  (valueToCheck: unknown) => isString(valueToCheck) || isArray<PossibleStateNames>(valueToCheck),
            fallback: (valueToCheck: unknown) => isNil(valueToCheck) || isString(valueToCheck) || isObject(valueToCheck) || isFunction(valueToCheck)
        });

        if (!isValidRule) {
            throw new RangeError(`Cannot add redirect policy rule - invalid rule data object provided for path "${preparedPath}"`)
        }

        if (isFunction(rule.fallback) || isString(rule.fallback)) {
            this.redirectPolicyRules[preparedPath] = rule;
            return;
        }

        if (isObject(rule.fallback) ) {
            for (const fallbackKey in rule.fallback) {
                const fallbackValue = rule.fallback[fallbackKey];

                if (!isString(fallbackValue) && !isFunction(fallbackValue)) {
                    throw new RangeError(`Cannot add redirect policy rule - invalid fallback (object) value provided for path "${preparedPath}"`);
                }
            }
        }

        this.redirectPolicyRules[preparedPath] = rule;
    }

    public async isAllowed(currentPath: string, currentState: PossibleStateNames): Promise<boolean> {
        if (!isString(currentState)) {
            throw new RangeError('Cannot check redirect policy rule - specified state name must be a string');
        }

        const rule = this.getRuleByPath(currentPath);
        const isAllowed = isNil(rule) ? false : (isArray(rule.allowed) ? rule.allowed.includes(currentState) : rule.allowed === currentState);

        if (!isAllowed || isNil(rule.guard)) {
            return isAllowed;
        }

        const guardResult = await rule.guard(currentPath, currentState);
        return isBoolean(guardResult) ? guardResult : !isNil(guardResult);
    }

    public async getFallback(currentPath: string, currentState: PossibleStateNames): Promise<string | null> {
        if (!isString(currentState)) {
            throw new RangeError('Cannot retrieve redirect policy rule fallback - specified state name must be a string');
        }

        const rule = this.getRuleByPath(currentPath);

        if (isNil(rule)) {
            return null;
        }

        if (isString(rule.fallback)) {
            return rule.fallback;
        } else if (isFunction(rule.fallback)) {
            return await rule.fallback(currentPath, currentState);
        } else if (isObject(rule.fallback)) {
            const fallbackSubValue = rule.fallback[currentState];

            if (isString(fallbackSubValue)) {
                return fallbackSubValue;
            } else if (isFunction(fallbackSubValue)) {
                return await fallbackSubValue(currentPath, currentState);
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}

// exports
export default SimpleRedirectPolicyMap