import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgvlA_Qpm8-BZVZHBz5UtcamLgUKSMVHk",
  authDomain: "fir-database-firestore.firebaseapp.com",
  projectId: "fir-database-firestore",
  storageBucket: "fir-database-firestore.appspot.com",
  messagingSenderId: "893918774107",
  appId: "1:893918774107:web:a0c816fa95dfb47c3a107e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };