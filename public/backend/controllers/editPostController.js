import { returnPostDiv, returnEditPostDiv } from "../../exports/elementsExports.js";
import { deleteDoc, setDoc, doc, db, ref, storage, deleteObject, getDoc, importCollection } from "../../exports/firebaseConfigExports.js";

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
  deleteButtonArray.forEach(buttonElement => buttonElement.onclick = () => deleteButtonOnClick(category, buttonElement));
  editButtonArray.forEach(buttonElement => buttonElement.onclick = () => editButtonOnClick(category, buttonElement));
}

function deleteButtonOnClick (category, element) {
  const docRef = doc(db, category, element.name);
  getDoc(docRef)
    .then((querySnapshot) => {
      const url = querySnapshot.data().imageURLS[0];
      const imageRef = ref(storage, url);
      deleteObject(imageRef);
      deleteDoc(docRef);
      element.parentElement.parentElement.remove();
    });
}

// I don't know how to refactor this function yet, but it needs to be done.
function editButtonOnClick (category, buttonElement) {
  const docRef = doc(db, category, buttonElement.name);
  getDoc(docRef)
    .then((querySnapshot) => {
      const data = querySnapshot.data();
      importCollection("Categories")
        .then((col) => {
          let categories = [];
          let selected = -1;
          let index = 0;
          col.forEach(element => {
            categories.push(element.id);
            if (element.id === data.category) selected = index;
            index++;
          });
          const newDiv = returnEditPostDiv(data, { categories, selected });
          document.getElementById("primaryPostContainer").innerHTML = newDiv;
          document.getElementById("newUploadButton").onclick = () => {
            let newTitle = document.getElementById("newTitleInput").value;
            let newCategory = document.getElementById("newUploadCategoryInput").value;
            const categoryDoc = doc(db, newCategory, newTitle);
            setDoc(categoryDoc, {
              title: newTitle,
              description: document.getElementById("newDescInput").value,
              category: newCategory,
              price: document.getElementById("newPriceInput").value,
              importance: document.getElementById("newImportance").value,
              imageURLS: data.imageURLS
            })
              .then(() => {
                if (data.title !== newTitle || data.category !== newCategory) {
                  deleteDoc(docRef);
                }
                location.reload();
              });
          };
        });
    });
}