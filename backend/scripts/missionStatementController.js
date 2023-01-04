import { hideLoadingScreen, showLoadingScreen } from "../../scripts/exports/elementsExports.js";
import { uploadDataToDatabase } from "../../scripts/exports/firebaseConfigExports.js";

const missionStatementTitle = document.getElementById("missionStatementTitle");
const missionStatementDescription = document.getElementById("missionStatementDescription");
const updateMissionButton = document.getElementById("updateStatementButton");
updateMissionButton.onclick = () => {

  showLoadingScreen();
  updateMissionButton.disabled = true;

  const missionStatement = {
    missionTitle: missionStatementTitle.value,
    missionDescription: missionStatementDescription.value,
  };

  uploadDataToDatabase(missionStatement, "Mission Statement", "Mission Statement")
    .then(() => {
      alert("Mission statement updated...");
      hideLoadingScreen();
      updateMissionButton.disabled = false;
    });

}

