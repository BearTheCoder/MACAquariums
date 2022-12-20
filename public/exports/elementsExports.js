/*      *****     CONSTANTS     *****       */
export const uploadFormElements = {
  title: document.getElementById("titleInput"),
  desc: document.getElementById("descInput"),
  category: document.getElementById("uploadCategoryInput"),
  price: document.getElementById("priceInput"),
  importance: document.getElementById("importance"),
  images: document.getElementById("imageInput"),
};

export const defaultRGB = {
  0: { name: "--accentColor", value: "#71B4D1" },
  1: { name: "--borderColor", value: "#AFAFAF" },
  2: { name: "--backgroundColor", value: "#FAFAFA" },
  3: { name: "--hoverColor", value: "#8CD2BE" },
  4: { name: "--postColor", value: "#FAFAFA" },
  5: { name: "--postHoverColor", value: "#FFFFFF" },
  6: { name: "--accentFontColor", value: "#FFFFFF" },
  7: { name: "--fontColor", value: "#000000" },
};

/*      *****     FUNCTIONS     *****       */
export function returnPostDiv (data) {
  return `
    <div class="post addBorder postBG">
      <img src="${data.imageURLS[0]}" width="100%">
      <h4 class="fontColor">${data.title}</h4>
      <hr class="addBorder accentColorNoHover">
      <p>${data.description}</p>
      <br>
      <div class="postFooter addFlex">
        <p style="font-size: 12px;">Price: ${data.price}</p> 
        <p style="font-size: 15px;">||</p> 
        <p style="font-size: 12px;">Importance: ${data.importance}</p> 
        <p style="font-size: 15px;">||</p> 
        <p style="font-size: 12px;">Category: ${data.category}</p>
      </div>
      <br>
      <div class="postButtonFooter addFlex">
        <button name="${data.title}" class="editButton postButton accentColor addBorder borderColor accentFontColor hoverColor">Edit</button>
        <button name="${data.title}" class="deleteButton postButton accentColor addBorder borderColor accentFontColor hoverColor">Delete</button>
      </div>
    </div>
     `;
}

export function returnRenameInputContainer (value) {
  return `
  <br>
  <input type="text" id="renameCategoryInput" class="formInput w100p" value="${value}"\>
  <button id="renameCategorySubmit" class="h100p">Submit Rename</button>
  `;
}

export function returnEditPostDiv (data, categories) {
  let existingCategoies = createSelectionOptions(categories);
  return `
    <div class="newForm addFlex h100p">
      <label for="newTitleInput" class="formLabel">Title: </label>
      <input type="text" id="newTitleInput" class="formInput" value="${data.title}" \>
      <br>
      <label for="newDescInput" class="formLabel">Description: </label>
      <textarea id="newDescInput" rows="4" >${data.description}</textarea>
      <br>
      <select id="newUploadCategoryInput" class="categoryInput">
      ${existingCategoies}
      </select>
      <br>
      <label for="newPriceInput" class="formLabel">Price: </label>
      <input type="number" id="newPriceInput" class="formInput" value="${data.price}">
      <br>
      <label for="newImportance" class="formLabel">Importance: </label>
      <input type="number" id="newImportance" class="formInput" value="${data.importance}">
      <br>
      <button id="newUploadButton">Submit Changes</button>
    </div>
  `;
}

export function showSlides (slideIndex) {
  let slides = document.getElementsByClassName("mySlides");
  if (slideIndex > slides.length) { slideIndex = 1; }
  if (slideIndex < 1) { slideIndex = slides.length; }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "flex";
  return slideIndex;
}

export function registerButtons (leftButton, rightButton) {
  let slideIndex = 1;
  leftButton.onclick = () => {
    slideIndex = showSlides(slideIndex - 1);
  };
  rightButton.onclick = () => {
    slideIndex = showSlides(slideIndex + 1);
  };
}


/*      *****     INTERNAL FUNCTIONS     *****       */
function createSelectionOptions (categories) {
  let returnedOptions = "";
  categories.categories.forEach((element, index) => {
    if (index != categories.selected) returnedOptions += `<option value="${element}">${element}</option>`;
    else returnedOptions += `<option value="${element}" selected>${element}</option>`;
  });
  return returnedOptions;
}
