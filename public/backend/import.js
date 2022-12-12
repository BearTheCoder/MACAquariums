import { getDocs, collection, db, returnPostDiv } from "./config.js";
import { loadButtonsToArray } from "./postEditing.js";

export function importCollection (category) {
  let col = collection(db, category);
  return getDocs(col);
}

document.getElementById("importButton").onclick = category => {
  const categoryValue = document.getElementById("importCategoryInput");
  const postContainer = document.getElementById("postContainer");
  postContainer.innerHTML = "";
  importCollection(categoryValue.value)
    .then(col => {
      col.forEach(el => {
        const data = el.data();
        console.log(data);
        postContainer.innerHTML += returnPostDiv(data);
      });
      loadButtonsToArray();
    });
};
