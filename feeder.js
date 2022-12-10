require('dotenv').config; //process.env.VARIABLE used for Railway deployment

const express = require("express");
const app = express();
const { initializeApp } = require("firebase/app"); // npm i firebase
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage"); // npm i firebase
const fs = require('fs');

const firebaseConfig = {
 apiKey: process.env.FB_API_KEY,
 authDomain: process.env.FB_DOMAIN,
 projectId: process.env.PRO_ID,
 storageBucket: process.env.FB_BUCKET,
 messagingSenderId: process.env.FB_SENDER_ID,
 appId: process.env.FB_APP_ID,
};

const app_fb = initializeApp(firebaseConfig);
const storage = getStorage(app_fb);


app.listen(process.env.PORT, () => console.log("listening..."));
app.use(express.static('public'));
app.use(express.json());

app.post('/upload', (postRequest, postResponse) => {

 //Create new object from postrequest
 let requestData = {
  images: postRequest.body.imageFiles,
  title: postRequest.body.title,
  desc: postRequest.body.desc,
  price: postRequest.body.price,
  urls: [],
 };


 for (const prop in requestData.images) {
  const imageReference = ref(storage, prop.name);
  const imageData = fs.readFileSync(prop.name);
  uploadBytes(imageReference, imageData)
   .then(() => {
    return getDownloadURL(imageReference);
   })
   .then((url) => {
    // SAVE URL LINK AND ASSOCIATED DATA TO DATABASE HERE
    requestData.urls.push(url);
    console.log(url);
   })
   .catch((error) => {
    // Handle any errors
   });
 }
});
