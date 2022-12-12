import { deleteDoc, doc, db, ref, storage, deleteObject, getDoc, uploadFormElements } from "./config.js";

export function loadButtonsToArray () {
 const deleteButtonArray = Array.from(document.getElementsByClassName("deleteButton"));
 const editButtonArray = Array.from(document.getElementsByClassName("editButton"));
 const category = document.getElementById("importCategoryInput").value;

 deleteButtonArray.forEach((element) => {
  element.onclick = () => {

   const docRef = doc(db, category, element.name);

   getDoc(docRef).then((querySnapshot) => {
    const url = querySnapshot.data().imageURLS[0];

    const imageRef = ref(storage, url);
    deleteObject(imageRef);

    const elementRef = doc(db, category, element.name);
    deleteDoc(elementRef);
   });
   element.parentElement.parentElement.remove();
  };
 });

 editButtonArray.forEach((element) => {
  element.onclick = () => {
   getDoc(docRef).then((querySnapshot) => {
    const data = querySnapshot.data();
    let counter = 0;
    for (const property in data) {
     property.value = data[counter];
    }
   });
  };
 });



}


