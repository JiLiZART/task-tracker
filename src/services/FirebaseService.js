import * as fb from "firebase";
import * as config from "../config";

export class FirebaseService {

  /**
   *
   * @param firebaseApp {firebase.app.App}
   */
  constructor(firebaseApp) {
    this.app = firebaseApp;
  }

  /**
   *
   * @returns {firebase.auth.Auth}
   */
  auth() {
    return this.app.auth();
  }
}

export const firebase = new FirebaseService(fb.initializeApp(config.firebase));
