import { uploadDataToDatabase } from "../exports/firebaseConfigExports.js";
import { hideLoadingScreen, showLoadingScreen } from "../exports/elementsExports.js";

const updateButton = document.getElementById("updateContactButton");

updateButton.onclick = () => {
  showLoadingScreen();
  updateButton.disabled = true;
  const phoneNumber = document.getElementById("phoneInput").value;
  const email = document.getElementById("emailInput").value;
  const bio = document.getElementById("bioInput").value;
  uploadDataToDatabase({ phoneNumber, email, bio, }, "Contact Page", "Contact Page")
    .then(() => {
      alert("Contact info updated...");
      updateButton.disabled = false;
      hideLoadingScreen();
    });
};