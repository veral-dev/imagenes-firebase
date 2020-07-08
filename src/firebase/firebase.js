import app from "firebase/app";
import firebaseConfig from "./config";
import 'firebase/auth';
import "firebase/firestore"
import "firebase/storage"
import "firebase/database"

class Firebase {
    constructor() {
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig)
        }
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
        this.database = app.database();
        this.authReauthenticate = app.auth;

    }
}

const firebase = new Firebase();

export default firebase;