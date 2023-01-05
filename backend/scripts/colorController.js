import { hideLoadingScreen, showLoadingScreen } from "../../scripts/exports/elementsExports.js";
import { doc, db, globalSetDoc } from "../../scripts/exports/firebaseConfigExports.js";

let root = document.documentElement;
let testColorButton = document.getElementById("testColorButton");
let submitButton = document.getElementById("submitColorsButton");
let colorSelectors = document.getElementsByClassName("color");

testColorButton.onclick = () => {
  root.style.setProperty("--accentColor", colorSelectors[0].value);
  root.style.setProperty("--borderColor", colorSelectors[1].value);
  root.style.setProperty("--backgroundColor", colorSelectors[2].value);
  root.style.setProperty("--hoverColor", colorSelectors[3].value);
  root.style.setProperty("--postColor", colorSelectors[4].value);
  root.style.setProperty("--postHoverColor", colorSelectors[5].value);
  root.style.setProperty("--accentFontColor", colorSelectors[6].value);
  root.style.setProperty("--fontColor", colorSelectors[7].value);
};

submitButton.onclick = () => {
  submitButton.disabled = true;
  showLoadingScreen();
  const categoryDoc = doc(db, "colors", "colors");
  globalSetDoc(categoryDoc, {
    0: { name: "--accentColor", value: colorSelectors[0].value },
    1: { name: "--borderColor", value: colorSelectors[1].value },
    2: { name: "--backgroundColor", value: colorSelectors[2].value },
    3: { name: "--hoverColor", value: colorSelectors[3].value },
    4: { name: "--postColor", value: colorSelectors[4].value },
    5: { name: "--postHoverColor", value: colorSelectors[5].value },
    6: { name: "--accentFontColor", value: colorSelectors[6].value },
    7: { name: "--fontColor", value: colorSelectors[7].value },
  })
    .then(() => {
      submitButton.disabled = false;
      hideLoadingScreen();
      alert("Default website colors updated.");
    });
};
