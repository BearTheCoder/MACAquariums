/*      *****     CONSTANTS     *****       */
export const uploadFormElements = {
  title: document.getElementById("titleInput"),
  desc: document.getElementById("descInput"),
  category: document.getElementById("uploadCategoryInput"),
  price: document.getElementById("priceInput"),
  importance: document.getElementById("importance"),
  images: document.getElementById("imageInput"),
};

/*      *****     FUNCTIONS     *****       */
export function returnPostDiv (data) {
  return `
    <div class="post addBorder">
      <img src="${data.imageURLS[0]}" width="100%">
      <h4>${data.title}</h4>
      <hr>
      <p>${data.description}</p>
      <br>
      <div class="postFooter">
        <p style="font-size: 12px;">Price: ${data.price}</p> 
        <p style="font-size: 15px;">||</p> 
        <p style="font-size: 12px;">Importance: ${data.importance}</p> 
        <p style="font-size: 15px;">||</p> 
        <p style="font-size: 12px;">Category: ${data.category}</p>
      </div>
      <br>
      <div class="postButtonFooter">
        <button name="${data.title}" class="editButton postButton" width="100">Edit</button>
        <button name="${data.title}" class="deleteButton postButton" width="100">Delete</button>
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
    <div class="newForm">
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

function createSelectionOptions (categories) {
  let returnedOptions = "";
  categories.categories.forEach((element, index) => {
    if (index != categories.selected) returnedOptions += `<option value="${element}">${element}</option>`;
    else returnedOptions += `<option value="${element}" selected>${element}</option>`;
  });
  return returnedOptions;
}