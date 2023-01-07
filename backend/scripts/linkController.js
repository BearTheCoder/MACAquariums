import { hideLoadingScreen, showLoadingScreen } from "../../scripts/exports/elementsExports.js";
import { doc, db, globalSetDoc, getDoc, deleteDoc } from "../../scripts/exports/firebaseConfigExports.js";

const links = Array.from(document.getElementsByClassName("link"));
const linksButton = document.getElementById("updateLinksButton");

linksButton.onclick = () => {
  linksButton.disabled = true;
  showLoadingScreen;
  let canContinue = true;
  let promises = [];
  links.forEach((el, index) => {
    if (canContinue) {
      const titleValue = el.children[0].value;
      const URLValue = el.children[1].value;
      if (titleValue === "" && URLValue === "") {
        promises.push(deleteDoc(doc(db, "Links", `Link_${index}`)));
        return;
      }
      else if (titleValue === "" || URLValue === "") {
        alert("Update failed, please ensure title AND link are filled...");
        canContinue = false;
        location.reload();
      }
      promises.push(globalSetDoc(doc(db, "Links", `Link_${index}`), {
        title: titleValue,
        URL: URLValue,
      }));
    }
  });
  Promise.all(promises)
    .then(() => {
      location.reload();
    });
};
