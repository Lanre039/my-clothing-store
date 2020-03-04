import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyClSjnMjFgJwHE-YMSsqDEg6qF_eykE2CE",
    authDomain: "clothing-app-9b49f.firebaseapp.com",
    databaseURL: "https://clothing-app-9b49f.firebaseio.com",
    projectId: "clothing-app-9b49f",
    storageBucket: "clothing-app-9b49f.appspot.com",
    messagingSenderId: "117825684858",
    appId: "1:117825684858:web:704a0de5e532897c2c42c3"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;