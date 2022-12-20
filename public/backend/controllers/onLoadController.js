import { defaultRGB } from "../../exports/elementsExports.js";
import { importCollection } from "../../exports/firebaseConfigExports.js";
import { information } from "../../exports/informationExports.js";

importCollection("Categories")
  .then((col) => {
    let categories = [];
    col.forEach(element => categories.push(element.id));
    let categoryInput = Array.from(document.getElementsByClassName("categoryInput"));
    categoryInput.forEach(element => {
      element.innerHTML = `<option value="">Choose a Category</option>`;
      categories.forEach(category => {
        element.innerHTML += `<option value="${category}">${category}</option>`;
      });
    });
  });

importCollection("colors")
  .then(col => {
    let root = document.documentElement;
    let colorSelectors = document.getElementsByClassName("color");
    let colors = null;
    col.forEach(el => {
      if (colors !== null) return;
      colors = el.data();
    });
    for (let i = 0; i < colorSelectors.length; i++) {
      root.style.setProperty(colors[i].name, colors[i].value);
      colorSelectors[i].value = colors[i].value;
    }
  })
  .catch(err => {
    let root = document.documentElement;
    for (const prop in defaultRGB) {
      root.style.setProperty(defaultRGB[prop].name, defaultRGB[prop].value);
    }
  });

let options = `<option>Select a Topic</option>`;
information.forEach((el) => {
  options += `<option>${el.name}</option>`;
});
document.getElementById("infoSelectInput").innerHTML = options;

