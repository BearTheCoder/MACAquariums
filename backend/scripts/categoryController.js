import { doc, db, deleteDoc, importCollection, getDoc, pullURLandDeleteImage, globalSetDoc } from "../../scripts/exports/firebaseConfigExports.js";
import { hideLoadingScreen, returnRenameInputContainer, showLoadingScreen } from "../../scripts/exports/elementsExports.js";

const newCategoryDescription = document.getElementById("addCategoryDescription");
const addCategoryName = document.getElementById("addCategoryInput");
const addCategoryButton = document.getElementById("addCategoryButton");
const editCategoryInput = document.getElementById("editCategoryInput");
const deleteButton = document.getElementById("deleteCategoryButton");
const editButton = document.getElementById("editCategoryButton");
const editCategoryContainer = document.getElementById("editCategoryContainer");

addCategoryButton.onclick = () => {
  addCategoryButton.disabled = true;
  showLoadingScreen();
  addCategory(addCategoryName.value, newCategoryDescription.value)
    .then(() => sendMessageAndReload("New category added..."));
};

function addCategory (addCategoryValue, newCategoryDescription) {
  const categoryDoc = doc(db, "Categories", addCategoryValue);
  return globalSetDoc(categoryDoc, { category: addCategoryValue, description: newCategoryDescription, });
}

deleteButton.onclick = () => {
  showLoadingScreen();
  deleteButton.disabled = true;
  const deleteCategory = editCategoryInput.value;
  const deleteCategoryPromise = deleteDoc(doc(db, "Categories", deleteCategory));
  importCollection(deleteCategory)
    .then(importedCollection => {
      if (importedCollection.size === 0) deleteCategoryImage(deleteCategoryPromise, deleteCategory);
      deleteEverythingInCategory(importedCollection, deleteCategory, deleteCategoryPromise);
    });
};

function deleteCategoryImage (deleteCategoryPromise, deleteCategory) {
  importCollection("Category Images")
    .then(importedCollection => {
      if (importedCollection.size === 0) {
        deleteCategoryPromise
          .then(() => sendMessageAndReload("No category image, category deleted..."));
      }
      importedCollection.forEach(importedDocument => {
        if (importedDocument.id === deleteCategory) {
          pullURLandDeleteImage("Category Images", deleteCategory)
            .then(() => deleteDoc(doc(db, "Category Images", deleteCategory)))
            .then(() => sendMessageAndReload("Category and associated images deleted..."));
        }
      });
    });
}

function deleteEverythingInCategory (importedCollection, deleteCategory, deleteCategoryPromise) {
  importedCollection.forEach(importedDocument => {
    const docRef = doc(db, deleteCategory, importedDocument.id);
    pullURLandDeleteImage(deleteCategory, importedDocument.id)
      .then(() => deleteDoc(docRef))
      .then(() => deleteCategoryImage(deleteCategoryPromise, deleteCategory));
  });
}

editButton.onclick = () => {
  if (editCategoryInput.value === "") alert("Please select a category to rename!");
  getDoc(doc(db, "Categories", editCategoryInput.value))
    .then(importedDocument => {
      editCategoryContainer.innerHTML = returnRenameInputContainer(importedDocument.data());
      listenForRenameSubmit(editCategoryInput.value);
    });
};

function listenForRenameSubmit (oldCategoryName) {
  const submitEditButton = document.getElementById("editCategorySubmit");
  submitEditButton.onclick = () => {
    const newCategoryName = document.getElementById("editCategoryName").value;
    const newCategoryDescription = document.getElementById("editCategoryDescription").value;
    submitEditButton.disabled = true;
    showLoadingScreen();
    importCollection(oldCategoryName)
      .then(importedCollection => {
        if (importedCollection.size === 0) renameCategory(newCategoryName, oldCategoryName, newCategoryDescription);
        else {
          let counter = 0;
          importedCollection.forEach(importedDocument => {
            createNewPost_DeleteOld(oldCategoryName, newCategoryName, importedDocument)
              .then(() => {
                counter++;
                if (counter === importedCollection.size) renameCategory(newCategoryName, oldCategoryName, newCategoryDescription);
              });
          });
        }
      });
  };
}

function renameCategory (newValue, oldValue, newDescription) {
  addCategory(newValue, newDescription)
    .then(() => {
      if (oldValue === newValue) sendMessageAndReload("Same category name, description updated...");
      createNewCategoryImage(oldValue, newValue)
        .then(() => deleteDoc(doc(db, "Categories", oldValue)))
        .then(() => sendMessageAndReload("Category edited..."));
    });
}

function createNewPost_DeleteOld (oldCategoryName, newCategoryName, importedDocument) {
  if (oldCategoryName === newCategoryName) return Promise.resolve();
  return new Promise(fulfilled => {
    const oldDocRef = doc(db, oldCategoryName, importedDocument.id);
    const newDocRef = doc(db, newCategoryName, importedDocument.id);
    getDoc(oldDocRef)
      .then(querySnapshot => {
        return globalSetDoc(newDocRef, {
          title: querySnapshot.data().title,
          description: querySnapshot.data().description,
          category: newCategoryName,
          price: querySnapshot.data().price,
          importance: querySnapshot.data().importance,
          URL: querySnapshot.data().URL,
        });
      })
      .then(() => deleteDoc(oldDocRef))
      .then(() => fulfilled(""));
  });
}

function createNewCategoryImage (oldCategory, newCategory) {
  return new Promise(fulfilled => {
    const oldRef = doc(db, "Category Images", oldCategory);
    const newRef = doc(db, "Category Images", newCategory);
    getDoc(oldRef)
      .then(querySnapshot => {
        return globalSetDoc(newRef, {
          URL: querySnapshot.data().URL,
          title: newCategory,
          visibility: querySnapshot.data().visibility,
        });
      })
      .then(() => deleteDoc(oldRef))
      .then(() => fulfilled(""));
  });

}

function sendMessageAndReload (message) {
  alert(message);
  hideLoadingScreen();
  location.reload();
}