import { ref, storage, uploadBytes, getDownloadURL, setDoc, doc, db, importCollection } from "../exports/firebaseConfigExports.js";
import { uploadFormElements } from "../exports/elementsExports.js";

const uploadButton = document.getElementById("uploadButton");

uploadButton.onclick = () => {

  uploadButton.disabled = true;

  for (const prop in uploadFormElements) {
    if (uploadFormElements[prop].value.length !== 0) continue;
    alert("Please fill out all fields in the form.");
    uploadButton.disabled = false;
    return;
  };

  let canUpdate = true;
  importCollection(uploadFormElements.category.value)
    .then(col => {
      col.forEach(doc => {
        if (doc.id === uploadFormElements.title.value) canUpdate = false;
      });
      if (!canUpdate) {
        alert("Duplicate title, must be unique for new posts.");
        resetForm(uploadFormElements);
        return;
      }
      const imageArray = Array.from(uploadFormElements.images.files);
      upload(imageArray, uploadFormElements);
    });
};

function upload (imageArray, uploadFormElements) {
  let urls = [];
  imageArray.forEach(element => {
    const imageReference = ref(storage, element.name);
    element.arrayBuffer()
      .then(byteData => uploadBytes(imageReference, byteData))
      .then(() => getDownloadURL(imageReference))
      .then(url => urls.push(url))
      .catch(error => console.log(error));
  });

  const interval = setInterval(() => {
    if (imageArray.length !== urls.length) return;
    sendToDB(uploadFormElements, urls)
      .then(() => resetForm(uploadFormElements));
    alert("Post uploaded to database.");
    clearInterval(interval);
  }, 500);
}

function sendToDB (uploadFormElements, urls) {
  const categoryDoc = doc(db, uploadFormElements.category.value, uploadFormElements.title.value);
  return setDoc(categoryDoc, {
    title: uploadFormElements.title.value,
    description: uploadFormElements.desc.value,
    category: uploadFormElements.category.value,
    price: uploadFormElements.price.value,
    importance: uploadFormElements.importance.value,
    imageURLS: urls
  });
}

function resetForm (uploadFormElements) {
  for (const prop in uploadFormElements) uploadFormElements[prop].value = "";
  uploadButton.disabled = false;
}
