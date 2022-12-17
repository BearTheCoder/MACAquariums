import { information } from "../exports/informationExports.js";

let importInfoButton = document.getElementById("infoSelectButton");

importInfoButton.onclick = () => {
  let infoTopic = document.getElementById("infoSelectInput").value;
  let topic = information.find((el) => { if (el.name === infoTopic) return el; });
  document.getElementById("infoDisplayContainer").innerHTML = `
  <br>
  <h4>${topic.name}</h4>
  <p>${topic.info}</p>
  `;
};