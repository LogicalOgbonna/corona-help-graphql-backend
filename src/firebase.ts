import firebase from "firebase";

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: "corona-hospital-help",
    storageBucket: "corona-hospital-help.appspot.com",
    messagingSenderId: "423434005418",
    appId: process.env.FIREBASE_APP_ID
};

firebase.initializeApp(config);

export const db = firebase.firestore();

interface User {
    id: string
}

export const getUser = async ({ id }: User) => {
    const userRef = await db.doc(`users/${id}`).get();
    return { ...userRef.data(), id: userRef.id }
}


export const getUsers = async () => {
    const userCollectRef = await db.collection("users").get();
    return userCollectRef.docs.map(value => ({ ...value.data(), id: value.id }))
}

export default firebase;