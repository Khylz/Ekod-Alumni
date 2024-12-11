import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "votre-api-key",
  authDomain: "votre-auth-domain",
  projectId: "votre-project-id",
  storageBucket: "votre-storage-bucket",
  messagingSenderId: "votre-messaging-sender-id",
  appId: "votre-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);