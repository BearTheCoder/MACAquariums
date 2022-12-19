import { setDoc, doc, db, deleteDoc, importCollection, getDoc, ref, storage, deleteObject } from "../../exports/firebaseConfigExports.js";
import { returnRenameInputContainer } from "../../exports/elementsExports.js";

const addCategoryButton = document.getElementById("addCategoryButton");
const deleteButton = document.getElementById("deleteCategoryButton");
const renameButton = document.getElementById("renameCategoryButton");
const renameInputContainer = document.getElementById("renameInputContainer");
const editCategoryInput = document.getElementById("editCategoryInput");

addCategoryButton.onclick = () => {
  addCategory(document.getElementById("addCategoryInput").value).then(() => location.reload());
};

deleteButton.onclick = () => {
  deleteButton.disabled = true;
  let deleteCategory = document.getElementById("editCategoryInput").value;
  const catRef = doc(db, "Categories", deleteCategory);
  deleteDoc(catRef);
  importCollection(deleteCategory).then(col => {
    let counter = 0;
    col.forEach((document) => {
      const docRef = doc(db, deleteCategory, document.id);
      getDoc(docRef).then((querySnapshot) => {
        const url = querySnapshot.data().imageURLS[0];
        const imageRef = ref(storage, url);
        deleteObject(imageRef);
        deleteDoc(docRef);
        counter++;
      });
    });
    setInterval(() => {
      if (counter === col.size) location.reload();
    }, 500);
  });
};

renameButton.onclick = () => {
  if (editCategoryInput.value === "") alert("Please select a category to rename!");
  renameInputContainer.innerHTML = returnRenameInputContainer(editCategoryInput.value);
  listenForRenameSubmit(editCategoryInput.value);
};

function listenForRenameSubmit (editCategoryInputValue) {
  const renameCategoryInput = document.getElementById("renameCategoryInput");
  document.getElementById("renameCategorySubmit").onclick = () => {
    importCollection(editCategoryInputValue).then(col => {
      if (col.size === 0) renameCategory(renameCategoryInput.value, editCategoryInputValue);
      let counter = 0;
      col.forEach((document) => {
        const oldDocRef = doc(db, editCategoryInputValue, document.id);
        const newDocRef = doc(db, renameCategoryInput.value, document.id);
        getDoc(oldDocRef).then((querySnapshot) => {
          return setDoc(newDocRef, {
            title: querySnapshot.data().title,
            description: querySnapshot.data().description,
            category: renameCategoryInput.value,
            price: querySnapshot.data().price,
            importance: querySnapshot.data().importance,
            imageURLS: querySnapshot.data().imageURLS,
          });
        }).then(() => {
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
  addCategory(newValue, oldValue).then(() => {
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