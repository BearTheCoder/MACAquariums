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
    .then(() => {
      alert("New category added...");
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
          alert("Nothing in category, deleted...");
          location.reload();
        });
      }
      deleteEverythingInCategory(importedCollection, deleteCategory, deleteCategoryPromise);
    });


};

function deleteEverythingInCategory (importedCollection, deleteCategory, deleteCategoryPromise) {
  importedCollection.forEach((document) => {
    const docRef = doc(db, deleteCategory, document.id);
    pullURLandDeleteImage(deleteCategory, document.id)
      .then(() => deleteDoc(docRef))
      .then(() => deleteCategoryImage(deleteCategoryPromise, deleteCategory));
  });
}

function deleteCategoryImage (deleteCategoryPromise, deleteCategory) {
  importCollection("Category Images")
    .then(importedCollection => {
      if (importedCollection.size === 0) {
        deleteCategoryPromise.then(() => {
          hideLoadingScreen();
          alert("No category image, category deleted...");
          location.reload();
        });
      }
      importedCollection.forEach(importedDocument => {
        if (importedDocument.id === deleteCategory) {
          pullURLandDeleteImage("Category Images", importedDocument.id)
            .then(() => {
              deleteDoc(doc(db, "Category Images", deleteCategory))
                .then(() => {
                  hideLoadingScreen();
                  alert("Category and associated images deleted...");
                  location.reload();
                });
            });
        }
      });
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
    submitEditButton.disabled = true;
    const newCategoryName = document.getElementById("editCategoryName").value;
    const newCategoryDescription = document.getElementById("editCategoryDescription").value;
    showLoadingScreen();
    importCollection(oldCategoryName)
      .then(importedCollection => {
        let counter = 0;
        if (importedCollection.size === 0) renameCategory(newCategoryName, oldCategoryName, newCategoryDescription);
        importedCollection.forEach(importedDocument => {
          console.log("asdasd");
          createNewPost_DeleteOld(oldCategoryName, newCategoryName, importedDocument)
            .then(() => {
              console.log("here 3");
              counter++;
              if (counter === importedCollection.size) renameCategory(newCategoryName, oldCategoryName, newCategoryDescription);
            });
        });
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

function addCategory (addCategoryValue, newCategoryDescription) {
  addCategoryButton.disabled = true;
  const categoryDoc = doc(db, "Categories", addCategoryValue);
  return globalSetDoc(categoryDoc, { category: addCategoryValue, description: newCategoryDescription, });
}

function createNewPost_DeleteOld (oldCategoryName, newCategoryName, importedDocument) {
  if (oldCategoryName === newCategoryName) {
    return Promise.resolve();
  }
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
      .then(() => {
        console.log("here 2");
        return deleteDoc(oldDocRef);
      })
      .then(() => {
        fulfilled("");
      });
  });

}