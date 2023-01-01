import { setDoc, doc, db, deleteDoc, importCollection, getDoc, ref, storage, deleteObject, pullURLandDeleteImage } from "../exports/firebaseConfigExports.js";
import { hideLoadingScreen, returnRenameInputContainer, showLoadingScreen } from "../exports/elementsExports.js";

const newCategoryDescription = document.getElementById("addCategoryDescription").value;
const newCategoryName = document.getElementById("addCategoryInput").value;
const addCategoryButton = document.getElementById("addCategoryButton");
const editCategoryInput = document.getElementById("editCategoryInput");
const deleteButton = document.getElementById("deleteCategoryButton");
const editButton = document.getElementById("editCategoryButton");
const editCategoryContainer = document.getElementById("editCategoryContainer");

addCategoryButton.onclick = () => {
  addCategoryButton.disabled = true;
  showLoadingScreen();
  addCategory(newCategoryName, newCategoryDescription)
    .then(() => {
      hideLoadingScreen();
      location.reload();
    });
};

deleteButton.onclick = () => {
  showLoadingScreen();
  deleteButton.disabled = true;
  const deleteCategory = editCategoryInput.value;
  const deleteCategoryPromise = deleteDoc(doc(db, "Categories", deleteCategory));
  importCollection(deleteCategory)
    .then(importedCollection => {
      if (importedCollection.size === 0) {
        deleteCategoryPromise.then(() => {
          hideLoadingScreen();
          location.reload();
        });
      }
      deleteEverythingInCategory(importedCollection, deleteCategory);
    });

  importCollection("Category Images")
    .then(importedCollection => {
      if (importedCollection.size === 0) {
        deleteCategoryPromise.then(() => {
          hideLoadingScreen();
          location.reload();
        });
      }
      importedCollection.forEach(importedDocument => {
        if (importedDocument.id === deleteCategory) {
          deleteDoc(doc(db, "Category Images", deleteCategory));
        }
      });
    });
};

function deleteEverythingInCategory (importedCollection, deleteCategory) {
  let counter = 0;
  importedCollection.forEach((document) => {
    const docRef = doc(db, deleteCategory, document.id);
    pullURLandDeleteImage(deleteCategory, document.id)
      .then(() => deleteDoc(docRef))
      .then(() => {
        counter++;
        if (counter === importedCollection.size) {
          hideLoadingScreen();
          location.reload();
        }
      });
  });
}

editButton.onclick = () => {
  if (editCategoryInput.value === "") alert("Please select a category to rename!");
  getDoc(doc(db, "Categories", editCategoryInput.value))
    .then(data => {
      editCategoryContainer.innerHTML = returnRenameInputContainer(data.data());
      listenForRenameSubmit(editCategoryInput.value);
    });
};

function listenForRenameSubmit (oldCategoryName) {
  const newCategoryName = document.getElementById("editCategoryName");
  const newCategoryDescription = document.getElementById("editCategoryDescription");
  const submitEditButton = document.getElementById("editCategorySubmit");
  submitEditButton.onclick = () => {
    submitEditButton.disabled = true;
    showLoadingScreen();
    importCollection(oldCategoryName)
      .then(importedCollection => {
        let counter = 0;
        importedCollection.forEach(importedDocument => {
          createNewPost_DeleteOld(oldCategoryName, newCategoryName, importedDocument);
        });
        setInterval(() => {
          if (counter === importedCollection.size) {
            renameCategory(newCategoryName.value, newCategoryName.value, newCategoryDescription.value);
          }
        }, 500);
      });
  };
}

function renameCategory (newValue, oldValue, newDescription) {
  addCategory(newValue, newDescription)
    .then(() => {
      if (oldValue !== newValue) deleteDoc(doc(db, "Categories", oldValue));
      alert("Category edited.");
      hideLoadingScreen();
      location.reload();
    });
}

function addCategory (newCategoryValue, newCategoryDescription) {
  addCategoryButton.disabled = true;
  const categoryDoc = doc(db, "Categories", newCategoryValue);
  return setDoc(categoryDoc, { category: newCategoryValue, description: newCategoryDescription, });
}

function createNewPost_DeleteOld (oldCategoryName, newCategoryName, importedDocument) {
  const oldDocRef = doc(db, oldCategoryName, importedDocument.id);
  const newDocRef = doc(db, newCategoryName.value, importedDocument.id);
  getDoc(oldDocRef)
    .then(querySnapshot => {
      return setDoc(newDocRef, {
        title: querySnapshot.data().title,
        description: querySnapshot.data().description,
        category: newCategoryName.value,
        price: querySnapshot.data().price,
        importance: querySnapshot.data().importance,
        URL: querySnapshot.data().URL,
      });
    })
    .then(() => {
      deleteDoc(oldDocRef);
      counter++;
    });
}