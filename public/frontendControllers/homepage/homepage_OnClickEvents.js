function loadContentPage (e) {
  document.getElementById("categorySelector").value = e.srcElement.parentNode.querySelector("h4").innerText;
  document.getElementById("categorySelectorButton").click();
}