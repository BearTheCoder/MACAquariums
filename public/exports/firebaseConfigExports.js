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

/** 
* @param {string} category
* @returns {Promise<QuerySnapshot<T>} Promise with collection data.
*/
export function importCollection (category) {
  let col = collection(db, category);
  return getDocs(col);
}

/** 
* Querys the database, pulls the url, and deletes the image from storage.
* @param {string} collectionName
* @param {string} documentName
*/
export function pullURLandDeleteImage (collectionName, documentName) {
  try {
    const docRef = doc(db, collectionName, documentName);
    getDoc(docRef)
      .then((querySnapshot) => {
        const url = querySnapshot.data().URL;
        const imageRef = ref(storage, url);
        deleteObject(imageRef);
      })
      .catch(err => { });
  }
  //Throws error if category image and database doc doesn't exist
  catch (err) { }
}

/** 
* Returns an empty array if fileList is empty.
* @param {object} fileList
* @returns {Promise<any[]>} Array of URLS
*/
export function uploadImagesToStorage (fileList) {
  return new Promise(resolved => {
    const imageArray = Array.from(fileList);
    if (imageArray.length === 0) resolved([]);
    let urls = [];
    imageArray.forEach(element => {
      const randomIdentifier = Math.floor(Math.random() * 10000000);
      const imageReference = ref(storage, `image_${randomIdentifier}`);
      element.arrayBuffer()
        .then(byteData => uploadBytes(imageReference, byteData))
        .then(() => getDownloadURL(imageReference))
        .then(url => {
          urls.push(url);
          if (fileList.length === urls.length) resolved(urls);
        })
        .catch(error => console.log(error));
    });
  });
}

/** 
* @param {object} data *must have property named URL*
* @param {string} collectionName
* @param {string} documentName
* @returns {Promise<void>} Empty promise
*/
export function uploadDataToDatabase (data, collectionName, documentName) {
  const categoryDoc = doc(db, collectionName, documentName);
  return setDoc(categoryDoc, data);
}