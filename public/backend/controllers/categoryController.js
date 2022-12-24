import { setDoc, doc, db, deleteDoc, importCollection, getDoc, ref, storage, deleteObject, pullURLandDeleteImage } from "../../exports/firebaseConfigExports.js";
import { returnRenameInputContainer } from "../../exports/elementsExports.js";

const addCategoryButton = document.getElementById("addCategoryButton");
const deleteButton = document.getElementById("deleteCategoryButton");
const renameButton = document.getElementById("renameCategoryButton");
const renameInputContainer = document.getElementById("renameInputContainer");
const editCategoryInput = document.getElementById("editCategoryInput");

addCategoryButton.onclick = () => {
  addCategory(document.getElementById("addCategoryInput").value)
    .then(() => location.reload());
};

deleteButton.onclick = () => {
  deleteButton.disabled = true;
  let deleteCategory = document.getElementById("editCategoryInput").value;
  const catRef = doc(db, "Categories", deleteCategory);
  deleteDoc(catRef);
  importCollection(deleteCategory)
    .then(col => {
      deleteEverythingInCategory(col, deleteCategory);
    });
};

function deleteEverythingInCategory (col, deleteCategory) {
  let counter = 0;
  col.forEach((document) => {
    const docRef = doc(db, deleteCategory, document.id);
    pullURLandDeleteImage(deleteCategory, document.id)
      .then(() => {
        deleteDoc(docRef);
        counter++;
        if (counter === col.size) location.reload();
      });
  });
}

renameButton.onclick = () => {
  if (editCategoryInput.value === "") alert("Please select a category to rename!");
  renameInputContainer.innerHTML = returnRenameInputContainer(editCategoryInput.value);
  listenForRenameSubmit(editCategoryInput.value);
};

function listenForRenameSubmit (editCategoryInputValue) {
  const renameCategoryInput = document.getElementById("renameCategoryInput");
  document.getElementById("renameCategorySubmit").onclick = () => {
    importCollection(editCategoryInputValue)
      .then(col => {
        if (col.size === 0) renameCategory(renameCategoryInput.value, editCategoryInputValue);
        let counter = 0;
        col.forEach((document) => {
          const oldDocRef = doc(db, editCategoryInputValue, document.id);
          const newDocRef = doc(db, renameCategoryInput.value, document.id);
          getDoc(oldDocRef)
            .then((querySnapshot) => {
              return setDoc(newDocRef, {
                title: querySnapshot.data().title,
                description: querySnapshot.data().description,
                category: renameCategoryInput.value,
                price: querySnapshot.data().price,
                importance: querySnapshot.data().importance,
                URL: querySnapshot.data().imageURLS,
              });
            })
            .then(() => {
              deleteDoc(oldDocRef);
              counter++;
            });
        });
        setInterval(() => {
          if (counter === col.size) {
            renameCategory(renameCategoryInput.value, editCategoryInputValue);
          }
        }, 500);
      });
  };
}

function renameCategory (newValue, oldValue) {
  addCategory(newValue, oldValue)
    .then(() => {
      const catRef = doc(db, "Categories", oldValue);
      deleteDoc(catRef);
      location.reload();
    });
}

function addCategory (newCategoryValue) {
  addCategoryButton.disabled = true;
  const categoryDoc = doc(db, "Categories", newCategoryValue);
  return setDoc(categoryDoc, { category: newCategoryValue, });
}