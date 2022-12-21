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

export function pullURLandDeleteImage (collectionName, documentName) {
  const docRef = doc(db, collectionName, documentName);
  getDoc(docRef).then((querySnapshot) => {
    const url = querySnapshot.data().imageURL;
    const imageRef = ref(storage, url);
    deleteObject(imageRef);
  })
    .catch(err => { console.log(err); });
}

export function uploadImageAndAddToDatabase (imageBlob, collectionName, documentName) {
  const randomIdentifier = Math.floor(Math.random() * 10000000);
  const imageReference = ref(storage, `image_${randomIdentifier}`);
  imageBlob.files[0].arrayBuffer()
    .then(byteData => uploadBytes(imageReference, byteData))
    .then(() => getDownloadURL(imageReference))
    .then(url => {
      const categoryDoc = doc(db, collectionName, documentName);
      return setDoc(categoryDoc, {
        imageURL: url
      });
    })
    .catch(error => console.log(error));
}

export function uploadMultipleImagesAndAddToDatabase (imageArray, collectionName) {
  return new Promise(resolved => {
    uploadMultipleImages(imageArray)
      .then(() => {
        urls.forEach(el => {
          const randomIdentifier = Math.floor(Math.random() * 10000000);
          const categoryDoc = doc(db, collectionName, `image_${randomIdentifier}`);
          setDoc(categoryDoc, {
            imageURL: el
          });
        });
        alert("Images uploaded to database.");
        clearInterval(interval);
        resolved();
      });
  });
}

function uploadMultipleImages (imageArray) {
  return new Promise(resolved => {
    let urls = [];
    imageArray.forEach(element => {
      const randomIdentifier = Math.floor(Math.random() * 10000000);
      const imageReference = ref(storage, `image_${randomIdentifier}`);
      element.arrayBuffer()
        .then(byteData => uploadBytes(imageReference, byteData))
        .then(() => getDownloadURL(imageReference))
        .then(url => urls.push(url))
        .catch(error => console.log(error));
    });
    resolved();
  });
}