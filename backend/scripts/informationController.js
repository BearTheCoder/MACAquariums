import { information } from "../../scripts/exports/informationExports.js";

let importInfoButton = document.getElementById("infoSelectButton");

importInfoButton.onclick = () => {
  let infoTopic = document.getElementById("infoSelectInput").value;
  let topic = information.find((el) => { if (el.name === infoTopic) return el; });
  document.getElementById("infoDisplayContainer").innerHTML = `
  <h4>${topic.name}</h4>
  <p>${topic.info}</p>
  `;
};