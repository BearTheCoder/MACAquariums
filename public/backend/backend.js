/*

     *****     Entity TOO LARGE?????     *****

     Heres the issue, I need to send the image to the database and storage, but I do not 
     want to expose sensitive data to the client.

     Hence I was trying to parse the data to bytes and send the bytes to the server in order 
     to send the bytes to the database.

     Though, a 1.3mb image turns into a 8mb json string.

     This is obviously an issue.

     There are two solutions that I can think of, compression?

     Or maybe, I think I read somewhere that having Firebase config information public does not
     produce any risks for the data base and I may be able to skip serverside rendering all together.

     Just did the research, Firebase config does not need to be hidden, showing the config object client side is safe.
     

*/



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
    const test = new Int32Array(byteData);
    data.imageData = JSON.stringify(test);
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
