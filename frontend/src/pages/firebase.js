import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDyfruw68Q9RWfbE3yuNx8qivrXfJrSVe0",
  authDomain: "stephenmajor-c7b6a.firebaseapp.com",
  projectId: "stephenmajor-c7b6a",
  storageBucket: "stephenmajor-c7b6a.appspot.com",
  messagingSenderId: "69988973267",
  appId: "1:69988973267:web:c07bb3b372aaa14b9f7226",
  measurementId: "G-H0VQYM3JEN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

// Firebase Firestore
const db = getFirestore(app);

// Firebase Storage
const storage = getStorage(app);

// Optional: Firebase Analytics (for web apps)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);  // Initialize only on client-side
}

export { auth, provider, analytics, db, storage };
