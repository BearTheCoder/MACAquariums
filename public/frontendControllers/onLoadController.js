import { importCollection } from "../exports/firebaseConfigExports.js";
import { defaultRGB } from "../exports/elementsExports.js";
import { showSlides, registerButtons } from "../exports/elementsExports.js";

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

let galleryDiv = ``;
importCollection("Gallery Images")
  .then(col => {
    let index = 0;
    col.forEach((el) => {
      galleryDiv += `
      <div class="mySlides addFlex imageContainer">
        <img class="mainImage addFlex" src="${el.data().URL}">
      </div>
      `;
      index++;
    });
    galleryDiv += `
    <a id="leftButton" class="galleryButton accentColor">&#10094;</a>
    <a id="rightButton" class="galleryButton accentColor">&#10095;</a>
    `;
    document.getElementById("gallery").innerHTML = galleryDiv;
    showSlides(1, 1);
    const leftButton = document.getElementById("leftButton");
    const rightButton = document.getElementById("rightButton");
    registerButtons(leftButton, rightButton);
  });

let categoryDiv = [``, ``, ``,];
let categoryData = [];
importCollection("Category Images")
  .then(col => {
    col.forEach(element => {
      categoryData.push(element.data());
    });
    categoryData.forEach((data, index) => {
      categoryDiv[index % 3] += `
      <div class="addBorder borderColor postBG categoryPost">
        <img src="${data.URL}" class="categoryImage">
        <h4 class="fontColor categoryTitle">${data.title}</h4>
      </div>
      `;
    });
    categoryDiv.forEach((el, index) => {
      document.getElementById(`categoryGallery_${index}`).innerHTML = el;
    });
  });