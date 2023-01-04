document.getElementById("emailDeveloperButton").onclick = () => {
  const subject = document.getElementById("devContactSubject").value;
  const body = document.getElementById("devContactBody").value;
  document.location.href = `mailto:mail.aaronadkins@gmail.com?subject=${subject}&body=${body}`;
};

document.getElementById("copyEmailButton").onclick = () => {
  navigator.clipboard.writeText("mail.aaronadkins@gmail.com");
  alert("Email copied to clipboard!");
};