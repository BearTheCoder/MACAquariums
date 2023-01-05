import { getDoc, db, doc, importCollection } from "../exports/firebaseConfigExports.js";
import { defaultRGB, loadMenu } from "../exports/elementsExports.js";

document.getElementById("menuForm").setAttribute("action", `${location.origin}/html/contentPage.html`);

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
    menu.style.right = `30px`;
    menu.style.top = `40px`;
    registerMenuOnClick();

  });

function registerMenuOnClick () {
  const menuItemArray = Array.from(document.getElementsByClassName("menuItem"));
  menuItemArray.forEach(item => {
    item.onclick = () => {
      if (item.innerText === "Contact Me") {
        location = `${location.origin}/html/contactMe.html`;
      }
      else {
        document.getElementById("categorySelector").value = item.innerText;
        document.getElementById("categorySelectorButton").click();
      }
    };
  });
}

let menuShown = false;
document.getElementById("menuIcon").onclick = () => {
  let menuIcon = document.getElementById("menuIcon");;
  menuShown ? menuIcon.style.opacity = "1" : menuIcon.style.opacity = "0.5";
  menuShown ? menu.style.display = "none" : menu.style.display = "block";
  menuShown = !menuShown;
};

