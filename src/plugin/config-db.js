// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAPCQVK_5MGbs0W2C_GdHsOp9LPy5oIb6g",
  authDomain: "foth-project.firebaseapp.com",
  projectId: "foth-project",
  storageBucket: "foth-project.appspot.com",
  messagingSenderId: "685018585976",
  appId: "1:685018585976:web:fa4f6d0b7e2f8fec7f868d",
  measurementId: "G-GDZJXYB7P9"
});

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
export { db, auth};
