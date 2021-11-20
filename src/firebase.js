// import { initializeApp } from "firebase/app";

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDCA7fL5AHKBh_Mq454t8OeD3cDPZG4iPc",
    authDomain: "pockedex-33a4c.firebaseapp.com",
    projectId: "pockedex-33a4c",
    storageBucket: "pockedex-33a4c.appspot.com",
    messagingSenderId: "860521132442",
    appId: "1:860521132442:web:376a2950800f8ecb9cca23"
  };
  
  // Initialize Firebase
//   
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { auth, db }
