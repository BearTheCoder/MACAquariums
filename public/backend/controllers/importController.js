import { returnPostDiv } from "../exports/elementsExports.js";
import { deleteDoc, doc, db, ref, storage, deleteObject, getDoc, importCollection } from "../exports/firebaseConfigExports.js";

document.getElementById("importButton").onclick = () => {
  const categoryValue = document.getElementById("importCategoryInput");
  const postContainer = document.getElementById("postContainer");
  postContainer.innerHTML = "";
  importCollection(categoryValue.value)
    .then(col => {
      col.forEach(el => {
        postContainer.innerHTML += returnPostDiv(el.data());
      });
      loadButtonsToArray();
    });
};

function loadButtonsToArray () {
  const deleteButtonArray = Array.from(document.getElementsByClassName("deleteButton"));
  const editButtonArray = Array.from(document.getElementsByClassName("editButton"));
  const category = document.getElementById("importCategoryInput").value;

  deleteButtonArray.forEach((element) => {
    element.onclick = () => {

      const docRef = doc(db, category, element.name);

      getDoc(docRef).then((querySnapshot) => {
        const url = querySnapshot.data().imageURLS[0];
        const imageRef = ref(storage, url);
        const elementRef = doc(db, category, element.name);
        deleteObject(imageRef);
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
