/*      *****     IMPORTS     *****       */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js';
import { getFirestore, doc, setDoc, getDoc, getDocs, collection, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
export { initializeApp, ref, uploadBytes, getDownloadURL, doc, setDoc, getDoc, getDocs, collection, deleteDoc, deleteObject };

/*      *****     CONSTANTS     *****       */
export const firebaseConfig = {
  apiKey: "AIzaSyAtsvkP-si-K-2JhnWhfUU1GN4UTWJFcRc",
  authDomain: "btc-db-97c7e.firebaseapp.com",
  projectId: "btc-db-97c7e",
  storageBucket: "btc-db-97c7e.appspot.com",
  messagingSenderId: "964621763508",
  appId: "1:964621763508:web:148199c048b486828e28e1"
};

export const app_fb = initializeApp(firebaseConfig);
export const storage = getStorage(app_fb);
export const db = getFirestore(app_fb);

/*      *****     FUNCTIONS     *****       */
export function importCollection (category) {
  let col = collection(db, category);
  return getDocs(col);
}

