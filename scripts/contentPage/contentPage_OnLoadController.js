import { doc, importCollection, db, getDoc } from "../exports/firebaseConfigExports.js";

const selectedCategory = location.href.split("category=")[1];

getDoc(doc(db, "Categories", selectedCategory))
  .then((categoryData) => {
    document.getElementById("contentHeaderDesc").innerText = categoryData.data().description;
    document.getElementById("contentHeaderTitle").innerHTML = categoryData.data().category;
  });

let postGalleryDiv = [``, ``, ``, ``,];
let postData = [];
importCollection(selectedCategory)
  .then(col => {
    col.forEach(element => {
      postData.push(element.data());
    });
    const sortedArray = postData.sort((a, b) => a.importance - b.importance);

    sortedArray.forEach((data, index) => {
      postGalleryDiv[index % 4] += `
      <div class="postBG contentPost addBorder borderColor addDropShadow">
        <img src="${data.URL}" class="contentPostImage">
        <div class="contentPostFooter w100p">
          <div class="webHeader addFlex padding5p">
            <h4 class="fontColor categoryTitle">${data.title}</h4>
            <h4 class="fontColor">$${data.price}</h4>
          </div>
          <p class="fontColor postDescription addFlex w100p padding5p">${data.description}</p>
        </div>
      </div>
      `;
    });
    postGalleryDiv.forEach((el, index) => {
      document.getElementById(`postGallery_${index}`).innerHTML = el;
    });
  });

