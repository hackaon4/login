import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyCW853OW6RJqJKZ8mdBrOuLVUAoUKKoJMA",
  authDomain: "learn-79f89.firebaseapp.com",
  projectId: "learn-79f89",
  storageBucket: "learn-79f89.firebasestorage.app",
  messagingSenderId: "130902290534",
  appId: "1:130902290534:web:e5910c48fde83cd0ffbda7",
  measurementId: "G-FQTWK5MW0W"};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

auth.onAuthStateChanged(user => {
    if (user) {
      // User is signed in
      window.location.href = "index.html";
    } else {
      // No user is signed in
      alert("pls sign in to continue")
    }
});

