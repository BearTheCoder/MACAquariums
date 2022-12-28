import { setDoc, doc, db, deleteDoc, importCollection, getDoc, ref, storage, deleteObject, pullURLandDeleteImage } from "../../exports/firebaseConfigExports.js";
import { hideLoadingScreen, returnRenameInputContainer, showLoadingScreen } from "../../exports/elementsExports.js";

const addCategoryButton = document.getElementById("addCategoryButton");
const deleteButton = document.getElementById("deleteCategoryButton");
const renameButton = document.getElementById("renameCategoryButton");
const renameInputContainer = document.getElementById("renameInputContainer");
const editCategoryInput = document.getElementById("editCategoryInput");

addCategoryButton.onclick = () => {
  addCategoryButton.disabled = true;
  showLoadingScreen();
  addCategory(document.getElementById("addCategoryInput").value)
    .then(() => {
      hideLoadingScreen();
      location.reload();
    });
};

deleteButton.onclick = () => {
  showLoadingScreen();
  deleteButton.disabled = true;
  let deleteCategory = document.getElementById("editCategoryInput").value;

  const deleteCategoryPromise = deleteDoc(doc(db, "Categories", deleteCategory));
  importCollection(deleteCategory)
    .then(col => {
      if (col.size === 0) {
        deleteCategoryPromise.then(() => {
          hideLoadingScreen();
          location.reload();
        });
      }
      deleteEverythingInCategory(col, deleteCategory);
    });

  importCollection("Category Images")
    .then(col => {
      if (col.size === 0) {
        deleteCategoryPromise.then(() => {
          hideLoadingScreen();
          location.reload();
        });
      }
      col.forEach(el => {
        if (el.id === deleteCategory) {
          deleteDoc(doc(db, "Category Images", deleteCategory));
        }
      });
    });
};

function deleteEverythingInCategory (col, deleteCategory) {
  let counter = 0;
  col.forEach((document) => {
    const docRef = doc(db, deleteCategory, document.id);
    pullURLandDeleteImage(deleteCategory, document.id)
      .then(() => deleteDoc(docRef))
      .then(() => {
        counter++;
        if (counter === col.size) {
          hideLoadingScreen();
          location.reload();
        }
      });
  });
}

renameButton.onclick = () => {
  if (editCategoryInput.value === "") alert("Please select a category to rename!");
  renameInputContainer.innerHTML = returnRenameInputContainer(editCategoryInput.value);
  listenForRenameSubmit(editCategoryInput.value);
};

// I don't know how to refactor this function yet, but it needs to be done.
function listenForRenameSubmit (editCategoryInputValue) {
  const renameCategoryInput = document.getElementById("renameCategoryInput");
  const submitRenameButton = document.getElementById("renameCategorySubmit");
  submitRenameButton.onclick = () => {
    submitRenameButton.disabled = true;
    showLoadingScreen();
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
                URL: querySnapshot.data().URL,
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
      alert("Category renamed.");
      hideLoadingScreen();
      location.reload();
    });
}

function addCategory (newCategoryValue) {
  addCategoryButton.disabled = true;
  const categoryDoc = doc(db, "Categories", newCategoryValue);
  return setDoc(categoryDoc, { category: newCategoryValue, });
}