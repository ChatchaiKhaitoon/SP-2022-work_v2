const messageElement = document.getElementById("message");

fetch("http://localhost:3000/")
  .then((response) => response.text())
  .then((data) => {
    messageElement.textContent = data;
  })
  .catch((error) => {
    console.error("Error", error);
  });
