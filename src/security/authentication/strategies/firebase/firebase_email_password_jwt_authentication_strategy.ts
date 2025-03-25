// external imports
import { UserCredential, signInWithEmailAndPassword } from 'firebase/auth';

// internal imports
import { AuthenticationEmailPasswordSignInStrategy } from '../../../../declarations/security/authentication_declarations';

import FirebaseAbstractJWTAuthenticationStrategy from './firebase_abstract_jwt_authentication_strategy';
import FirebaseClientRegistry from '../../../../registers/firebase/firebase_client_registry';

// implementation
class FirebaseEmailPasswordJWTAuthenticationStrategy extends FirebaseAbstractJWTAuthenticationStrategy implements AuthenticationEmailPasswordSignInStrategy {
    public async signIn(email: string, password: string): Promise<void> {
        const fbClientAuth = FirebaseClientRegistry.getInstance().auth;
        const userCredential: UserCredential = await signInWithEmailAndPassword(fbClientAuth, email, password);

        const idToken = await userCredential.user.getIdToken();
        await this.addSessionCookie(idToken);
    }
}

// exports
export default FirebaseEmailPasswordJWTAuthenticationStrategy;