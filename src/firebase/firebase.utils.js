import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDwv5u4aG9dUhODzYTzJcvGYLsFNDng6y4",
  authDomain: "udemy-react-webshop.firebaseapp.com",
  databaseURL: "https://udemy-react-webshop.firebaseio.com",
  projectId: "udemy-react-webshop",
  storageBucket: "",
  messagingSenderId: "565202129715",
  appId: "1:565202129715:web:b00b7ade1f459ec9"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  // console.log(snapShot);

  // if user doesnt exist we want to create that user (this goes for logging in with Google)
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }
  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  // group all calls to 1 batch, if any fails, we know that something went wrong
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    // create a new collection and generate an ID for it
    const newDocRef = collectionRef.doc();
    // set the collection obj e.g. jackets to the new document reference
    batch.set(newDocRef, obj);
  });
  // fire off batch calls -> batch.commit() returns a promise
  return await batch.commit();
};

// convert the firestore collection data to include the routename also
export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      // encodeURI is a JS method, pass it a string, creates a allowed url string
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  // create the final collections obj, where the keys are the titles for the 5 collections
  // reduce 2. parameter is an empty obj, we initialize the function with it
  return transformedCollection.reduce((accumulator, collection) => {
    // we set the first collection property's key as the title e.g. hats, and set the corresponding collection to it
    accumulator[collection.title.toLowerCase()] = collection;
    // returns the first obj, then goes to the second obj
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  // we have to return a promise which the sagas can yield for
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// trigger google auth popup when we wanna sign in
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
