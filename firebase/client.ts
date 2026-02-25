// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCybCSHjXEUkdJyFBabxg2vwQAGPVv7ngQ",
  authDomain: "prepwise-4aeaa.firebaseapp.com",
  projectId: "prepwise-4aeaa",
  storageBucket: "prepwise-4aeaa.firebasestorage.app",
  messagingSenderId: "606103506803",
  appId: "1:606103506803:web:da50f010cfbe6f29d17f06",
  measurementId: "G-29TLMND0R1"
};

// Initialize Firebase
const app = !getApps.length? initializeApp(firebaseConfig):getApp();

export const auth=getAuth(app)

export const db=getFirestore(app);
