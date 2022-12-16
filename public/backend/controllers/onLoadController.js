import { importCollection } from "../exports/firebaseConfigExports.js";

let categories = [];

importCollection("Categories").then((col) => {
  col.forEach(element => categories.push(element.id));
  let categoryInput = Array.from(document.getElementsByClassName("categoryInput"));
  categoryInput.forEach(element => {
    element.innerHTML = `<option value="">Choose a Category</option>`;
    categories.forEach(category => {
      element.innerHTML += `<option value="${category}">${category}</option>`;
    });
  });
});


