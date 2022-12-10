function backendSubmitButtonClick () {
 const imageFiles = document.getElementById("imageInput").files; //array
 const price = document.getElementById("priceInput").value;
 const title = document.getElementById("titleInput").value;
 const desc = document.getElementById("descInput").value;

 const data = {
  imageFiles,
  title,
  desc,
  price,
 };

 for (const prop in data) {
  if (data[prop].length === 0) {
   alert("Please fill out all fields in form.");
   return;
  }
 }

 const options = {
  method: 'POST',
  headers: {
   'Content-Type': 'application/json'
  },
  body: JSON.stringify(data),
 };

 fetch('/upload', options) //post
  .then(promise => promise.json())
  .then(jsonResponse => {
   if (jsonResponse.status === "success") {
    alert("Upload successful.");
   }
   else if (jsonResponse.status === "failure") {
    alert("There was an error uploading. If this continues, please contact your admin.");
   }
  });

}
