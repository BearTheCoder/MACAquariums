let root = document.documentElement;
let button = document.getElementById("submitColorsButton");
let colorSelectors = document.getElementsByClassName("color");

button.onclick = () => {
  root.style.setProperty("--accent-color", colorSelectors[0].value);
  root.style.setProperty("--border-color", colorSelectors[1].value);
  root.style.setProperty("--background-color", colorSelectors[2].value);
  root.style.setProperty("--hover-color", colorSelectors[3].value);
  root.style.setProperty("--post-color", colorSelectors[4].value);
  root.style.setProperty("--postHover-color", colorSelectors[5].value);
  root.style.setProperty("--accentFont-color", colorSelectors[6].value);
  root.style.setProperty("--font-color", colorSelectors[7].value);
};
