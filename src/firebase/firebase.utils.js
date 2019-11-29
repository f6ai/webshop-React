import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// trigger google auth popup when we wanna sign in
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    // console.log(snapShot);

    // if user doesnt exist we want to create that user (this goes for logging in with Google)
    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName, 
                email, 
                createdAt, 
                ...additionalData
            });
        } catch (err) {
            console.log('error creating user', err.message);
        }
    }
    return userRef;
}
export default firebase;