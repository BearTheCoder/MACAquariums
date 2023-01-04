import { getDoc, importCollection, doc, db, deleteDoc, loggedInUser, signOut, loggedAuth, uploadDataToDatabase } from "../../scripts/exports/firebaseConfigExports.js";
import { information } from "../../scripts/exports/informationExports.js";
import { defaultRGB, showLoadingScreen, hideLoadingScreen, messageDiv, signedInBackendDiv, signedOutBackendDiv, } from "../../scripts/exports/elementsExports.js";

const buttonArray = Array.from(document.querySelectorAll('button'));
buttonArray.forEach(button => {
  if (button.id === "signInButton") return;
  button.disabled = true;
});

importCollection("Categories")
  .then((col) => {
    let categories = [];
    col.forEach(element => categories.push(element.id));
    let categoryInput = Array.from(document.getElementsByClassName("categoryInput"));
    categoryInput.forEach(element => {
      element.innerHTML = `<option value="">Choose a Category</option>`;
      categories.forEach(category => {
        element.innerHTML += `<option value="${category}">${category}</option>`;
      });
    });
  });

const root = document.documentElement;
const colorSelectors = document.getElementsByClassName("color");
getDoc(doc(db, "colors", "colors"))
  .then(importedDocument => {
    let colors = importedDocument.data();
    for (let i = 0; i < colorSelectors.length; i++) {
      root.style.setProperty(colors[i].name, colors[i].value);
      colorSelectors[i].value = colors[i].value;
    }
  })
  .catch(err => {
    console.log(err);
    for (let i = 0; i < colorSelectors.length; i++) {
      root.style.setProperty(defaultRGB[i].name, defaultRGB[i].value);
      colorSelectors[i].value = defaultRGB[i].value;
    }
  });

getDoc(doc(db, "Mission Statement", "Mission Statement"))
  .then(importedDocument => {
    const data = importedDocument.data();
    document.getElementById("missionStatementTitle").value = data.missionTitle;
    document.getElementById("missionStatementDescription").value = data.missionDescription;
    document.getElementById("characterCount").innerText = `Character count: ${missionStatementArea.value.length}`;
  });

getDoc(doc(db, "Contact Page", "Contact Page"))
  .then(importedDocument => {
    const data = importedDocument.data();
    document.getElementById("phoneInput").value = data.phoneNumber;
    document.getElementById("emailInput").value = data.email;
    document.getElementById("bioInput").value = data.bio;
  });

let options = `<option> Select a Topic</option > `;
information.forEach((el) => {
  options += `<option> ${el.name}</option>`;
});
document.getElementById("infoSelectInput").innerHTML = options;

const missionStatementArea = document.getElementById("missionStatementDescription");

missionStatementArea.addEventListener("input", () => {
  document.getElementById("characterCount").innerText = `Character count: ${missionStatementArea.value.length}`;
});

const messageContainer = document.getElementById("messageContainer");
importCollection("Messages")
  .then(importedCollection => {
    importedCollection.forEach(importedDocument => messageContainer.innerHTML += messageDiv(importedDocument));
    const messageButtons = Array.from(document.getElementsByClassName("messageButton"));
    messageButtons.forEach(button => {
      button.onclick = () => {
        button.disabled = true;
        showLoadingScreen();
        deleteDoc(doc(db, "Messages", button.id))
          .then(() => {
            button.parentNode.parentNode.remove();
            hideLoadingScreen();
          });
      };
    });
  });

document.addEventListener("loggedIn", () => {
  if (loggedInUser !== null) {
    const date = new Date();
    const docName = `log_${date.getMonth()}_${date.getDay()}_${date.getHours()}_${date.getMinutes()}`;
    uploadDataToDatabase({ user: loggedInUser.displayName, }, "Logs", docName)
      .then(() => {
        const authContainer = document.getElementById("authContainer");
        authContainer.innerHTML = signedInBackendDiv(loggedInUser);
        document.getElementById("signOutButton").onclick = () => {
          signOut(loggedAuth);
          authContainer.innerHTML = signedOutBackendDiv();
        };
        buttonArray.forEach(button => button.disabled = false);
      })
      .catch(err => {
        signOut(loggedAuth);
        alert("Please log into an authorized user account to use the backend modules. If you believe this to be an error, please contact the developer using the information in the footer.");
        location.reload();
      });
  }
});

document.getElementById("signInButton").onclick = () => {
  location.href = location.origin + "/googleLogin.html";
}

