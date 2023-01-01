import { getDoc, importCollection, doc, db } from "../exports/firebaseConfigExports.js";
import { information } from "../exports/informationExports.js";
import { defaultRGB } from "../exports/elementsExports.js";

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

const root = document.documentElement;
const colorSelectors = document.getElementsByClassName("color");
getDoc(doc(db, "colors", "colors"))
  .then(importedDocument => {
    let colors = importedDocument.data();
    for (let i = 0; i < colorSelectors.length; i++) {
      root.style.setProperty(colors[i].name, colors[i].value);
      colorSelectors[i].value = colors[i].value;
    }
  })
  .catch(err => {
    console.log(err);
    for (let i = 0; i < colorSelectors.length; i++) {
      root.style.setProperty(defaultRGB[i].name, defaultRGB[i].value);
      colorSelectors[i].value = defaultRGB[i].value;
    }
  });

getDoc(doc(db, "Mission Statement", "Mission Statement"))
  .then(importedDocument => {
    const data = importedDocument.data();
    document.getElementById("missionStatementTitle").value = data.missionTitle;
    document.getElementById("missionStatementDescription").value = data.missionDescription;
  });

let options = `<option>Select a Topic</option>`;
information.forEach((el) => {
  options += `<option>${el.name}</option>`;
});
document.getElementById("infoSelectInput").innerHTML = options;

