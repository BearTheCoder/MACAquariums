import { getDoc, db, doc, importCollection } from "../exports/firebaseConfigExports.js";
import { defaultRGB, loadMenu } from "../exports/elementsExports.js";

const root = document.documentElement;
getDoc(doc(db, "colors", "colors"))
  .then(importedDocument => {
    let colors = importedDocument.data();
    if (colors === undefined) new Promise.reject();
    for (const prop in colors) {
      root.style.setProperty(colors[prop].name, colors[prop].value);
    }
  })
  .catch(err => {
    for (const prop in defaultRGB) {
      root.style.setProperty(defaultRGB[prop].name, defaultRGB[prop].value);
    }
  });

let catergoryNames = [];
importCollection("Categories")
  .then(importedCollection => {
    importedCollection.forEach(document => {
      catergoryNames.push(document.id);
    });
    const menu = document.getElementById("menu");
    menu.innerHTML += loadMenu(catergoryNames);
    menu.style.right = `0px`;
    menu.style.top = `44px`;
  });

let menuShown = false;
document.getElementById("menuIcon").onclick = () => {
  if (!menuShown) {
    menu.style.display = "block";
    document.getElementById("menuIcon").style.opacity = "0.5";
  }

  else {
    menu.style.display = "none";
    document.getElementById("menuIcon").style.opacity = "1";
  }
  menuShown = !menuShown;
};
