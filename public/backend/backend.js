function backendSubmitButtonClick () {
  const imageFiles = document.getElementById("imageInput").files; //array
  const price = document.getElementById("priceInput").value;
  const title = document.getElementById("titleInput").value;
  const desc = document.getElementById("descInput").value;

  let data = {
    imageData: null,
    imageNames: [],
    title,
    desc,
    price,
  };

  imageFiles[0].arrayBuffer().then((byteData) => {
    const test = new BigInt64Array(byteData);
    data.imageData = test;
    data.imageNames.push(imageFiles[0].name);

    console.log(data.imageData);

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

    console.log(options);

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
  });
}
