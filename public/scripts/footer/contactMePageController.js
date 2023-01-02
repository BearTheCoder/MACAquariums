import { getDoc, db, doc } from "../exports/firebaseConfigExports.js";

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