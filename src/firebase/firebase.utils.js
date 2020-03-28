import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

import config from '../config';

export const createUserProfileDoc = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get() // check if user exists
    
    if(!snapShot.exists) {  // created user if user does not exist
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({ 
                displayName,
                email,
                createdAt,
                ...additionalData
            })


        } catch(err) {
            console.log('error creating user', err.message);
        }
    }

    return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    // we need to batch so that the doc won't stop halfway when saving perharp due to bad internet connection
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc(); // set a new empty doc with a UID
        batch.set(newDocRef, obj)
    });
    return await batch.commit(); //this would return null if its successful
}

export const convertCollectionSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })
    
    console.log(transformedCollection)
    // assign keys to each object
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator
    }, {})
}
 
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
