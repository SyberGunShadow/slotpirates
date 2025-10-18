import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'TUO_API_KEY',
  authDomain: 'TUO_DOMINIO.firebaseapp.com',
  projectId: 'TUO_PROJECT_ID',
  storageBucket: 'TUO_BUCKET.appspot.com',
  messagingSenderId: 'TUO_SENDER_ID',
  appId: 'TUO_APP_ID',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
