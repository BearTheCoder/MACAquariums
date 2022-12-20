import { ref, storage, uploadBytes, getDownloadURL, setDoc, doc, db } from "../../exports/firebaseConfigExports.js";

const galleryImageSubmitButton = document.getElementById("galleryImageSubmitButton");
const catergoryImageSubmitButton = document.getElementById("catergoryImageSubmitButton");

galleryImageSubmitButton.onclick = () => {
  const imageArray = Array.from(document.getElementById("galleryImageInput").files);
  if (imageArray.length === 0) {
    alert("Please select a file.");
    return;
  }
  galleryImageSubmitButton.disabled = true;
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
    //Upload each image individually
    urls.forEach(el => {
      const randomIdentifier = Math.floor(Math.random() * 1000000);
      const categoryDoc = doc(db, "Gallery Images", `galleryImage_${randomIdentifier}`);
      setDoc(categoryDoc, {
        imageURL: el
      });
    });
    alert("Images uploaded to database.");
    clearInterval(interval);
    galleryImageSubmitButton.disabled = false;
    document.getElementById("galleryImageInput").value = "";
  }, 500);
};

catergoryImageSubmitButton.onclick = () => {
  const categoryGallerySelect = document.getElementById("categoryGallerySelect");
  const categoryImageInput = document.getElementById("categoryImageInput");
  if (categoryGallerySelect.value === "" || categoryImageInput.value === "") {
    alert("Please ensure you have both a category and an image selected.");
    return;
  }
  catergoryImageSubmitButton.disabled = true;
  const imageReference = ref(storage, categoryImageInput.files[0].name);
  categoryImageInput.files[0].arrayBuffer()
    .then(byteData => uploadBytes(imageReference, byteData))
    .then(() => getDownloadURL(imageReference))
    .then(url => {
      const categoryDoc = doc(db, "Category Images", categoryGallerySelect.value);
      setDoc(categoryDoc, {
        imageURL: url
      }).then(data => {
        alert("Image uploaded to database.");
        catergoryImageSubmitButton.disabled = false;
        categoryGallerySelect.value = "";
        categoryImageInput.value = "";
      });
    })
    .catch(error => console.log(error));
};