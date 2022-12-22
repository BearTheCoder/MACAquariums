import { pullURLandDeleteImage, uploadImagesToStorage, uploadDataToDatabase } from "../../exports/firebaseConfigExports.js";

const galleryImageSubmitButton = document.getElementById("galleryImageSubmitButton");
const catergoryImageSubmitButton = document.getElementById("catergoryImageSubmitButton");

galleryImageSubmitButton.onclick = () => {
  galleryImageSubmitButton.disabled = true;
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
      location.reload();
    })
    .catch((err) => {
      alert("Please select at least one image.");
      galleryImageSubmitButton.disabled = false;
    });
};

catergoryImageSubmitButton.onclick = () => {
  catergoryImageSubmitButton.disabled = true;
  const categoryGallerySelect = document.getElementById("categoryGallerySelect").value;
  const categoryImageInput = document.getElementById("categoryImageInput");
  pullURLandDeleteImage("Category Images", categoryGallerySelect.value);
  uploadImagesToStorage(categoryImageInput.files)
    .then(urls => {
      if (urls.length === 0) return Promise.reject();
      return uploadDataToDatabase({ URL: urls[0], }, "Category Images", categoryGallerySelect);
    })
    .then(() => {
      alert("Category image updated...");
      location.reload();
    })
    .catch((err) => {
      alert("Please select an image and select a category.");
      catergoryImageSubmitButton.disabled = false;
    });
};