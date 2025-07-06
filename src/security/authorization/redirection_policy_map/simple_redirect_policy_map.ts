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
/**
 * Represents a map of simple redirect policy rules, enabling the management of redirection policies
 * based on defined paths and associated rules.
 *
 * The `SimpleRedirectPolicyMap` class allows for defining, validating, and enforcing redirect policies
 * for various paths, enabling structured control of state transitions and fallbacks within an application.
 *
 * @template PossibleStateNames - A string type representing possible state names used in the rules.
 *
 */

class SimpleRedirectPolicyMap<PossibleStateNames extends string> {
    protected redirectPolicyRules: SimpleRedirectPolicyRules<PossibleStateNames> = {};

    constructor(rulesMap?: SimpleRedirectPolicyRules<PossibleStateNames>) {
        if (isNil(rulesMap)) {
            return;
        }

        const newRulesKeys = Object.keys(rulesMap);
        newRulesKeys.forEach((ruleKey) => this.addRule(ruleKey, rulesMap[ruleKey]));
    }


    /**
     * Retrieves the redirect policy rule associated with the specified path.
     *
     * @template PossibleStateNames - A string type representing possible state names.
     *
     * @throws {RangeError} - If the provided `currentPath` is not a string.
     *
     * @param {string} currentPath - The path for which the redirect policy rule should be retrieved.
     *
     * @returns {SimpleRedirectPolicyRule<PossibleStateNames> | null} - The redirect policy rule associated
     * with the given path if one exists; otherwise, `null`.
     *
     */

    protected getRuleByPath(currentPath: string): SimpleRedirectPolicyRule<PossibleStateNames> | null {
        if (!isString(currentPath)) {
            throw new RangeError('Cannot find redirect policy rule - specified path must be a string');
        }

        const preparedPath = sanitizeURLPathPartFromRoot(currentPath);
        const rule = this.redirectPolicyRules[preparedPath];

        return isNil(rule) ? null : rule;
    }


    /**
     * Adds a redirect policy rule for a given path.
     *
     * @template PossibleStateNames - A string type representing possible state names.
     *
     * @param {string} path - The path for which the redirect policy rule is being added.
     * @param {SimpleRedirectPolicyRule<PossibleStateNames>} rule - The redirect policy rule to add.
     *
     * @throws {Error} If a rule for the specified path already exists.
     * @throws {RangeError} If the provided rule object is not valid.
     *
     * The rule object must adhere to the required structure:
     * - `allowed`: Must be either a single state name (string) or an array of state names (string[]).
     * - `fallback`: Can be `null`, a string, an object mapping states to fallback destinations, or a function.
     * - For `fallback` objects, all values must be strings or functions. Otherwise, a `RangeError` is thrown.
     *
     * The method ensures that the rule is valid and does not conflict with existing rules before storing it.
     *
     */

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

    /**
     * Determines whether the specified state is allowed for the given path according to the redirect policy rules.
     *
     * @template PossibleStateNames - A string type representing possible state names.
     *
     * @param {string} currentPath - The current path for which the rule should be checked.
     * @param {PossibleStateNames} currentState - The current state name to evaluate against the policy rule.
     *
     * @throws {RangeError} If the provided `currentState` is not a string.
     *
     * @returns {Promise<boolean>} Resolves to:
     * - `true` if the state is allowed by the policy rule.
     * - `false` if the state is not allowed, no rule exists for the path, or the guard function denies access.
     *
     */

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
    
    /**
     * Retrieves the fallback redirect path or computation function for the provided path and state.
     *
     * @template PossibleStateNames - A string type representing possible state names.
     *
     * @param {string} currentPath - The current path to look up the associated redirect policy rule.
     * @param {PossibleStateNames} currentState - The current state name to evaluate against the policy rule.
     *
     * @throws {RangeError} If the provided `currentState` is not a string.
     *
     * @returns {Promise<string | null>} Resolves to:
     * - A string representing the fallback redirect destination if set directly.
     * - The result of executing the fallback function if it exists and evaluates successfully.
     * - `null` if there is no fallback.
     *
     */

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
export default SimpleRedirectPolicyMap;