import {firebase} from "./FirebaseService";
import {AuthUser} from "../models/AuthUser";

export class AuthService {
  /**
   *
   * @param fbAuth {firebase.auth.Auth}
   */
  constructor(fbAuth) {
    this.fbAuth = fbAuth;
  }

  onAuthChange(callback) {
    this.fbAuth.onAuthStateChanged(function (user) {
      callback(new AuthUser(user));
    });
  }

  signInAnonymously() {
    this.fbAuth.signInAnonymously().catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/operation-not-allowed') {
        throw new Error('You must enable Anonymous auth in the Firebase Console.')
      } else {
        console.error(error);
      }
    });
  }
}

export const auth = new AuthService(firebase.auth());
