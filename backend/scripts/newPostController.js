import { importCollection, uploadDataToDatabase, uploadImagesToStorage } from "../../scripts/exports/firebaseConfigExports.js";
import { hideLoadingScreen, showLoadingScreen, uploadFormElements } from "../../scripts/exports/elementsExports.js";

const uploadButton = document.getElementById("uploadButton");

uploadButton.onclick = () => {
  showLoadingScreen();
  uploadButton.disabled = true;
  for (const prop in uploadFormElements) {
    if (uploadFormElements[prop].value.length !== 0) continue;
    alert("Please fill out all fields in the form.");
    uploadButton.disabled = false;
    hideLoadingScreen();
    return;
  };

  importCollection(uploadFormElements.category.value)
    .then(col => {
      let canUpdate = true;
      col.forEach(doc => {
        if (doc.id === uploadFormElements.title.value) canUpdate = false;
      });
      if (!canUpdate) {
        alert("Duplicate title, must be unique for new posts.");
        return;
      }
      return Promise.resolve();
    })
    .then(() => uploadImagesToStorage(uploadFormElements.images.files))
    .then(urls => {
      const data = {
        title: uploadFormElements.title.value,
        description: uploadFormElements.desc.value,
        category: uploadFormElements.category.value,
        price: uploadFormElements.price.value,
        importance: uploadFormElements.importance.value,
        URL: urls[0],
      };
      return uploadDataToDatabase(data, data.category, data.title);
    })
    .then(() => {
      alert("Post uploaded to database.");
      hideLoadingScreen();
      location.reload();
    });
};