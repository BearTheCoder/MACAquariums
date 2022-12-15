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
        <p>Price: ${data.price}</p>
        <p>Importance: ${data.importance}</p>
        <p>Category: ${data.category}</p>
      </div>
      <br>
      <div class="postButtonFooter">
        <button name="${data.title}" class="editButton postButton" width="100">Edit</button>
        <button name="${data.title}" class="deleteButton postButton" width="100">Delete</button>
      </div>
    </div>
     `;
}