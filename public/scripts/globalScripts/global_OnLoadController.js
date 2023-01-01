import { getDoc, db, doc } from "../exports/firebaseConfigExports.js";
import { defaultRGB } from "../exports/elementsExports.js";

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
