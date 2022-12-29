import { importCollection } from "../exports/firebaseConfigExports.js";
import { defaultRGB } from "../exports/elementsExports.js";

importCollection("colors")
  .then(col => {
    let root = document.documentElement;
    let colors = null;
    col.forEach(el => {
      colors = el.data();
    });
    for (const prop in colors) {
      root.style.setProperty(colors[prop].name, colors[prop].value);
    }
  })
  .catch(err => {
    let root = document.documentElement;
    for (const prop in defaultRGB) {
      root.style.setProperty(defaultRGB[prop].name, defaultRGB[prop].value);
    }
  });
