import { importCollection, getDoc, db, doc } from "../exports/firebaseConfigExports.js";
import { showSlides, registerButtons } from "../exports/elementsExports.js";

let galleryDiv = ``;
importCollection("Gallery Images")
  .then(col => {
    col.forEach((el) => {
      galleryDiv += `
      <div class="mySlides addFlex imageContainer addDropShadowNoHover">
        <img class="mainImage addFlex" src="${el.data().URL}">
      </div>
      `;
    });
    galleryDiv += `
    <a id="leftButton" class="galleryButton accentColor">&#10094;</a>
    <a id="rightButton" class="galleryButton accentColor">&#10095;</a>
    `;
    document.getElementById("gallery").innerHTML += galleryDiv;
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
      <div class="addBorder borderColor postBG categoryPost onClickHover addDropShadow" onclick="loadContentPage(event)">
        <img src="${data.URL}" class="categoryImage">
        <h4 class="fontColor categoryTitle">${data.title}</h4>
      </div>
      `;
    });
    categoryDiv.forEach((el, index) => {
      document.getElementById(`categoryGallery_${index}`).innerHTML = el;
    });
  });

getDoc(doc(db, "Mission Statement", "Mission Statement"))
  .then(importedDocument => {
    const data = importedDocument.data();
    document.getElementById("missionTitle").innerText = data.missionTitle;
    document.getElementById("missionDescription").innerText = data.missionDescription;
  });