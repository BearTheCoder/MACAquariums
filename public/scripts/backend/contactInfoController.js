import { uploadDataToDatabase } from "../exports/firebaseConfigExports.js";
import { hideLoadingScreen, showLoadingScreen } from "../exports/elementsExports.js";

const updateButton = document.getElementById("updateContactButton");

updateButton.onclick = () => {
  showLoadingScreen();
  updateButton.disabled = true;
  const phoneNumber = document.getElementById("phoneInput").value;
  const email = document.getElementById("emailInput").value;
  uploadDataToDatabase({ phoneNumber, email }, "Contact Info", "Contact Info")
    .then(() => {
      alert("Contact info updated...");
      updateButton.disabled = false;
      hideLoadingScreen();
    });
};