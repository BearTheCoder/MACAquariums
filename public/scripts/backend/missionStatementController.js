import { hideLoadingScreen, showLoadingScreen } from "../exports/elementsExports.js";
import { uploadDataToDatabase } from "../exports/firebaseConfigExports.js";

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
      hideLoadingScreen();
      updateMissionButton.disabled = false;
    });

}

