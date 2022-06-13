import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCntb_-uaSqwdnBBYfhCodGVr-Qd2B-4Fk",
    authDomain: "challenge-132bd.firebaseapp.com",
    projectId: "challenge-132bd",
    storageBucket: "challenge-132bd.appspot.com",
    messagingSenderId: "112085276102",
    appId: "1:112085276102:web:52decf3f8d0ab1a9ae4ec7",
    measurementId: "G-YLRJ6KXMPJ"
  };



  const firebaseApp = firebase.initializeApp(firebaseConfig);


  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth };