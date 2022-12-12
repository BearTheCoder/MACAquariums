import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js';
import { getFirestore, doc, setDoc, getDoc, getDocs, collection, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

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

export function returnPostDiv (data) {
 return `
     <div class="post">
      <img src="${data.imageURLS[0]}" width="100%">
      <h4>${data.title}</h4>
      <hr>
      <p>${data.description}</p>
      <br>
      <div class="postFooter">
        <p>Price: ${data.price}</p>
        <p>Importance: ${data.importance}</p>
        <p>Category: ${data.category}</p>
      </div>
      <br>
      <div class="postButtonFooter">
        <button name="${data.title}" class="editButton" width="100">Edit</button>
        <button name="${data.title}" class="deleteButton" width="100">Delete</button>
      </div>
    </div>
     `;
}

export const uploadFormElements = {
 title: document.getElementById("titleInput"),
 desc: document.getElementById("descInput"),
 category: document.getElementById("uploadCategoryInput"),
 price: document.getElementById("priceInput"),
 importance: document.getElementById("importance"),
 images: document.getElementById("imageInput"),
};

export {
 initializeApp,
 ref,
 uploadBytes,
 getDownloadURL,
 doc,
 setDoc,
 getDoc,
 getDocs,
 collection,
 deleteDoc,
 deleteObject,
};