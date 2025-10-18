import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const saveGameState = async (userId, data) => {
  await setDoc(doc(db, 'games', userId), {
    ...data,
    lastActive: new Date(),
  });
};

export const loadGameState = async (userId) => {
  const docSnap = await getDoc(doc(db, 'games', userId));
  return docSnap.exists() ? docSnap.data() : null;
};
