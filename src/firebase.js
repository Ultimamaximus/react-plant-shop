import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {

};
  
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const functionsInstance = getFunctions(app);
