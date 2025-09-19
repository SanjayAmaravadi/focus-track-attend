import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAeLa_6-Z-IhBl9R41kJV8RGgPWXH8Doto",
  authDomain: "hexalto.firebaseapp.com",
  projectId: "hexalto",
  storageBucket: "hexalto.firebasestorage.app",
  messagingSenderId: "62159072846",
  appId: "1:62159072846:web:385492b8f1916b718d1d1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;