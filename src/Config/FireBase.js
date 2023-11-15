// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDTknhBRDCD15xHyGW45jDmtho46sVQsxM",
  authDomain: "fir-test-b3aec.firebaseapp.com",
  projectId: "fir-test-b3aec",
  storageBucket: "fir-test-b3aec.appspot.com",
  messagingSenderId: "211908981581",
  appId: "1:211908981581:web:a07808805763688288bd04",
  measurementId: "G-KXTXTH8TNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth (app)
export const googleProvider = new GoogleAuthProvider ();
export const db = getFirestore (app)
export const storage = getStorage (app)

