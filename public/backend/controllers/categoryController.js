import { setDoc, doc, db, deleteDoc, importCollection, getDoc, ref, storage, deleteObject } from "../exports/firebaseConfigExports.js";

const addCategoryButton = document.getElementById("addCategoryButton");
addCategoryButton.onclick = () => {
  addCategoryButton.disabled = true;
  let newCategory = document.getElementById("addCategoryInput");
  const categoryDoc = doc(db, "Categories", newCategory.value);
  setDoc(categoryDoc, { category: newCategory.value, })
    .then(() => location.reload());
};

const deleteButton = document.getElementById("deleteCategoryButton");
deleteButton.onclick = () => {
  deleteButton.disabled = true;
  let deleteCategory = document.getElementById("editCategoryInput").value;
  const catRef = doc(db, "Categories", deleteCategory);
  deleteDoc(catRef);
  importCollection(deleteCategory)
    .then(col => {
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