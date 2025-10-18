import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const saveGameState = async (userId, state) => {
  await setDoc(doc(db, 'games', userId), state);
};

export const loadGameState = async (userId) => {
  const docSnap = await getDoc(doc(db, 'games', userId));
  return docSnap.exists() ? docSnap.data() : null;
};
