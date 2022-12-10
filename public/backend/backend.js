let fs = null;

console.log("here");

const loadOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
};

fetch('/load', loadOptions) //post
  .then(promise => promise.json())
  .then(jsonResponse => {
    fs = jsonResponse.fs;
    console.log("Retrieved...", fs);
  });


function backendSubmitButtonClick () {
  const imageFiles = document.getElementById("imageInput").files; //array
  const price = document.getElementById("priceInput").value;
  const title = document.getElementById("titleInput").value;
  const desc = document.getElementById("descInput").value;

  let data = {
    imageData: [],
    imageNames: [],
    title,
    desc,
    price,
  };

  imageArray = Array.from(imageFiles);

  if (imageArray.length === 0) {
    alert("Please add images...");
    return;
  }

  imageArray.forEach((element) => {
    data.imageData.push(fs.readFileSync(element.name));
    data.imageNames.push(element.name);
  });

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
