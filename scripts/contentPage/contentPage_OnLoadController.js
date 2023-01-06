import { doc, importCollection, db, getDoc } from "../exports/firebaseConfigExports.js";
import { contentPagePostDiv } from "../exports/elementsExports.js";

const categoryPreFilter = location.href.split("category=")[1];
const selectedCategory = categoryPreFilter.replace(/\+/g, " ");

getDoc(doc(db, "Categories", selectedCategory))
  .then((categoryData) => {
    document.getElementById("contentHeaderDesc").innerText = categoryData.data().description;
    document.getElementById("contentHeaderTitle").innerHTML = categoryData.data().category;
  });

let postGalleryDiv = [``, ``, ``, ``,];
let postData = [];
importCollection(selectedCategory)
  .then(col => {
    col.forEach(element => postData.push(element.data()));
    const sortedArray = postData.sort((a, b) => a.importance - b.importance);
    sortedArray.forEach((data, index) => postGalleryDiv[index % 4] += contentPagePostDiv(data));
    postGalleryDiv.forEach((el, index) => document.getElementById(`postGallery_${index}`).innerHTML = el);
  });

