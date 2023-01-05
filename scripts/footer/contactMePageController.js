import { getDoc, db, doc, uploadDataToDatabase } from "../exports/firebaseConfigExports.js";
import { hideLoadingScreen, showLoadingScreen } from "../exports/elementsExports.js";

let contactEmail = "";
getDoc(doc(db, "Contact Page", "Contact Page"))
  .then(importedDocument => {
    const data = importedDocument.data();
    contactEmail = data.email;
    document.getElementById("contactNumber").innerText = data.phoneNumber;
    document.getElementById("contactBio").innerText = data.bio;
  });

document.getElementById("emailMeButton").onclick = () => {
  const subject = document.getElementById("devContactSubject").value;
  const body = document.getElementById("devContactBody").value;
  document.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
};

document.getElementById("copyMyEmailButton").onclick = () => {
  navigator.clipboard.writeText(contactEmail);
  alert("Email copied to clipboard!");
};
const messageMeButton = document.getElementById("messageMeButton");
messageMeButton.onclick = () => {
  const subject = document.getElementById("devContactSubject");
  const body = document.getElementById("devContactBody");
  if (subject.value === "" || body.value === "") {
    alert("Please add a subject and a message before trying to send! Thank you!");
    return;
  }
  showLoadingScreen();
  messageMeButton.disabled = true;
  uploadDataToDatabase({ subject: subject.value, body: body.value }, "Messages", `Message_${Math.ceil(Math.random() * 10000000)}`, "private")
    .then(() => {
      alert("Message sent!");
      messageMeButton.disabled = false;
      hideLoadingScreen();
      subject.value = "";
      body.value = "";
    });
};