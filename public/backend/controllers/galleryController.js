import { ref, storage, uploadBytes, getDownloadURL, setDoc, doc, db, pullURLandDeleteImage, uploadImageAndAddToDatabase, uploadMultipleImagesAndAddToDatabase } from "../../exports/firebaseConfigExports.js";

const galleryImageSubmitButton = document.getElementById("galleryImageSubmitButton");
const catergoryImageSubmitButton = document.getElementById("catergoryImageSubmitButton");

galleryImageSubmitButton.onclick = () => {
  const imageArray = Array.from(document.getElementById("galleryImageInput").files);
  if (imageArray.length === 0) {
    alert("Please select a file.");
    return;
  }
  galleryImageSubmitButton.disabled = true;
  uploadMultipleImagesAndAddToDatabase(imageArray, "Gallery Images")
    .then(() => location.reload());
};

catergoryImageSubmitButton.onclick = () => {
  const categoryGallerySelect = document.getElementById("categoryGallerySelect");
  const categoryImageInput = document.getElementById("categoryImageInput");
  if (categoryGallerySelect.value === "" || categoryImageInput.value === "") {
    alert("Please ensure you have both a category and an image selected.");
    return;
  }
  catergoryImageSubmitButton.disabled = true;
  pullURLandDeleteImage("Category Images", categoryGallerySelect.value);
  uploadImageAndAddToDatabase(categoryImageInput, "Category Images", categoryGallerySelect.value)
    .then(data => {
      alert("Category image updated...");
      catergoryImageSubmitButton.disabled = false;
      categoryGallerySelect.value = "";
      categoryImageInput.value = "";
    });
};