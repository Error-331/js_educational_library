// external imports
import jwt from 'jsonwebtoken';

// internal imports
import {
    AuthenticationProvider,
    AuthenticationSignInStrategy,
    AuthenticationVendor,
    UserAuthenticationStateInfo
} from '../../../../../declarations/security/authentication/general_authentication_declarations';

import type {
    CommonUIDCustomJWTServerUserData,
    CommonUIDCustomJWTServerAuthenticationStateInfo,
} from '../../../../../declarations/security/authentication/common_authentication_declarations';

import AbstractAuthenticationStrategy from "../../abstract/abstract_authentication_strategy";

import { formatPemKey } from '../../../../../utils/primitives/string/pem_key_utils';
import { isObjectOfType } from '../../../../../utils/primitives/object_utils';
import { isNil, isString } from '../../../../../utils/misc/logic_utils';

// implementation
class CommonUIDCustomJWTAuthenticationStrategy
    extends AbstractAuthenticationStrategy<CommonUIDCustomJWTServerUserData>
    implements AuthenticationSignInStrategy<CommonUIDCustomJWTServerUserData, void, CommonUIDCustomJWTServerUserData> {

    protected async verifyToken(authHeader: string): Promise<CommonUIDCustomJWTServerUserData> {
        return new Promise(async (resolve, reject) => {
            try {
                // retrieve JWT token
                const jwtValue: null | string = this.extractJWTTokenFromAuthHeader(authHeader);

                // prepare pem key
                const key = formatPemKey(process.env.JSEL_COMMON_PRIVATE_KEY);

                // decode jwt token
                jwt.verify(jwtValue, key, { algorithms: ['RS256'] }, function (error: unknown, payload: CommonUIDCustomJWTServerUserData) {
                    if (!isNil(error)) {
                        reject(error);
                    } else {
                        if (!isObjectOfType<CommonUIDCustomJWTServerUserData>(payload, { uid: isString, serviceName: isString })) {
                            reject(new Error('Cannot verify token - necessary fields are missing or of wrong type'))
                        } else {
                            resolve(payload);
                        }
                    }
                });
            } catch(error: unknown) {
                reject(error)
            }
        });
    }
    public async getUserAuthenticationStateInfo(authHeader?: string): Promise<UserAuthenticationStateInfo> {
        // prepare state info template
        let stateInfo: UserAuthenticationStateInfo = {
            authenticated: false,
            vendor: AuthenticationVendor.Unknown,
            provider: AuthenticationProvider.Unknown,
        }

        try {
            // verify JWT token
            const isVerified = await this.verifyUser(authHeader);
            if (!isVerified) {
                return stateInfo;
            }

            // add authentication strategy info
            stateInfo = {
                authenticated: true,
                vendor: AuthenticationVendor.Common,
                provider: AuthenticationProvider.UIDByCustomJWT,
            }

            // return the result
            return stateInfo;
        } catch (error: unknown) {
            // return "empty" state info if error occurred during JWT token verification
            return stateInfo;
        }
    }

    public async verifyUser(authHeader: string): Promise<boolean> {
        const token = await this.verifyToken(authHeader);
        return !isNil(token);
    }

    public async getUserData(authHeader: string): Promise<CommonUIDCustomJWTServerUserData> {
        return this.verifyToken(authHeader);
    }

    public async signIn(signInParams: CommonUIDCustomJWTServerUserData): Promise<CommonUIDCustomJWTServerAuthenticationStateInfo> {
        if (!isObjectOfType<CommonUIDCustomJWTServerUserData>(signInParams, { uid: isString, serviceName: isString })) {
            throw new RangeError('Cannot sign in user - sign in params are of wrong types');
        }

        const key = formatPemKey(process.env.JSEL_COMMON_PRIVATE_KEY);

        return new Promise((resolve, reject) => {
            jwt.sign(signInParams, key, { algorithm: 'RS256' }, function(error: unknown, customAuthToken: string) {
                if (!isNil(error)) {
                    reject(error);
                    return;
                }

                resolve({
                    customAuthToken,
                    authenticated: true,
                    vendor: AuthenticationVendor.Common,
                    provider: AuthenticationProvider.UIDByCustomJWT,
                })
            });
        });
    }

    public async signUp(): Promise<void> {
        return;
    }

    public async signOut(): Promise<void> {
        return;
    }
}

// exports
export default CommonUIDCustomJWTAuthenticationStrategy;