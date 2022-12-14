import { importCollection } from "../exports/firebaseConfigExports.js";

let fishCategories = [];

importCollection("Categories")
 .then((col) => {
  col.forEach((element) => {
   fishCategories.push(element.id);
  });
  let categoryInput = Array.from(document.getElementsByClassName("categoryInput"));
  categoryInput.forEach(element => {
   element.innerHTML = `<option value="">Choose a Category</option>`;
   fishCategories.forEach((category) => {
    element.innerHTML += `<option value=${category}>${category}</option>`;
   });
  });
 });


