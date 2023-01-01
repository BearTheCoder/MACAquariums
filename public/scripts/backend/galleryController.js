import { hideLoadingScreen, showLoadingScreen } from "../exports/elementsExports.js";
import { pullURLandDeleteImage, uploadImagesToStorage, uploadDataToDatabase } from "../exports/firebaseConfigExports.js";

const galleryImageSubmitButton = document.getElementById("galleryImageSubmitButton");
const catergoryImageSubmitButton = document.getElementById("catergoryImageSubmitButton");

galleryImageSubmitButton.onclick = () => {
  galleryImageSubmitButton.disabled = true;
  showLoadingScreen();
  uploadImagesToStorage(document.getElementById("galleryImageInput").files)
    .then(urls => {
      if (urls.length === 0) return Promise.reject();
      let promiseArray = [];
      urls.forEach((el, index) => {
        const documentName = `image_${Math.floor(Math.random() * 10000000)}`;
        promiseArray.push(uploadDataToDatabase({ URL: el, }, "Gallery Images", documentName));
      });
      return Promise.all(promiseArray);
    })
    .then(() => {
      alert("Images uploaded to database");
      hideLoadingScreen();
      location.reload();
    })
    .catch((err) => {
      alert("Please select at least one image.");
      galleryImageSubmitButton.disabled = false;
    });
};

catergoryImageSubmitButton.onclick = () => {
  catergoryImageSubmitButton.disabled = true;
  showLoadingScreen();
  const categoryGallerySelect = document.getElementById("categoryGallerySelect").value;
  const categoryImageInput = document.getElementById("categoryImageInput");

  if (categoryGallerySelect === "" || categoryImageInput.files.length === 0) {
    alert("Please select an image and select a category.");
    hideLoadingScreen();
    catergoryImageSubmitButton.disabled = false;
    return;
  }

  pullURLandDeleteImage("Category Images", categoryGallerySelect);
  uploadImagesToStorage(categoryImageInput.files)
    .then(urls => { uploadDataToDatabase({ URL: urls[0], title: categoryGallerySelect, }, "Category Images", categoryGallerySelect); })
    .then(() => {
      alert("Category image updated...");
      hideLoadingScreen();
      location.reload();
    });
};