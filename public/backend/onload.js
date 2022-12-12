const fishCategories = [
 "Red",
 "Blue",
 "Yellow",
 "Green",
 "Purple",
 "Pink",
 "White",
 "Black",
 "Orange",
];

let categoryInput = Array.from(document.getElementsByClassName("categoryInput"));
categoryInput.forEach(element => {
 element.innerHTML = `<option value="">Choose a Category</option>`;
 fishCategories.forEach((category) => {
  element.innerHTML += `<option value=${category}>${category}</option>`;
 });
});