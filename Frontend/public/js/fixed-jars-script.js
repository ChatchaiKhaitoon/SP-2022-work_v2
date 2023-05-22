document.addEventListener("DOMContentLoaded", function () {
  const jars = document.querySelectorAll(".jar");

  jars.forEach((jar) => {
    const progressBar = jar.querySelector(".progress");
    const increaseButton = jar.querySelector(".increase");
    const decreaseButton = jar.querySelector(".decrease");
    const percentage = jar.getAttribute("data-percentage");
    // progressBar.style.width = percentage + "%";
    // progressBar.style.backgroundColor = percentage >= 50 ? "green" : "red";

    increaseButton.addEventListener("click", function () {
      increasePercentage(jar, progressBar);
      document.getElementById("save").click();
    });

    decreaseButton.addEventListener("click", function () {
      decreasePercentage(jar, progressBar);
      document.getElementById("save").click();
    });
  });
});

function increasePercentage(jar, progressBar) {
  let percentage = parseInt(jar.getAttribute("data-percentage"));
  if (percentage < 100) {
    percentage += 5;
    jar.setAttribute("data-percentage", percentage);
    // progressBar.style.width = percentage + "%";
    // progressBar.style.backgroundColor = percentage >= 50 ? "green" : "red";
  }
}

function decreasePercentage(jar, progressBar) {
  let percentage = parseInt(jar.getAttribute("data-percentage"));
  if (percentage > 0) {
    percentage -= 5;
    jar.setAttribute("data-percentage", percentage);

    // progressBar.style.width = percentage + "%";
    // progressBar.style.backgroundColor = percentage >= 50 ? "green" : "red";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const jars = document.querySelectorAll(".jar");

  jars.forEach((jar) => {
    const progressBar = jar.querySelector(".progress");
    const percentageDisplay = jar.querySelector(".percentage-display");
    const increaseButton = jar.querySelector(".increase");
    const decreaseButton = jar.querySelector(".decrease");
    const percentage = jar.getAttribute("data-percentage");

    // progressBar.style.width = percentage + "%";
    // progressBar.style.backgroundColor = percentage >= 50 ? "green" : "red";
    percentageDisplay.innerText = percentage + "%";

    increaseButton.addEventListener("click", function () {
      increasePercentage(jar, progressBar, percentageDisplay);
    });

    decreaseButton.addEventListener("click", function () {
      decreasePercentage(jar, progressBar, percentageDisplay);
    });
  });
});

function increasePercentage(jar, progressBar, percentageDisplay) {
  let percentage = parseInt(jar.getAttribute("data-percentage"));
  if (percentage < 100) {
    percentage += 5;
    jar.setAttribute("data-percentage", percentage);
    // progressBar.style.width = percentage + "%";
    // progressBar.style.backgroundColor = percentage >= 50 ? "green" : "red";
    if (percentageDisplay) percentageDisplay.innerText = percentage + "%";
  }
}

function decreasePercentage(jar, progressBar, percentageDisplay) {
  let percentage = parseInt(jar.getAttribute("data-percentage"));
  console.log(percentage);

  if (percentage >= 0) {
    percentage -= 5;
    if (percentage < 0) percentage = 0;
    jar.setAttribute("data-percentage", percentage);
    // progressBar.style.width = percentage + "%";
    // progressBar.style.backgroundColor = percentage >= 50 ? "green" : "red";
    if (percentageDisplay) percentageDisplay.innerHTML = percentage + "%";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const jars = document.querySelectorAll(".jar");
  const monthlyIncomeInput = document.getElementById("monthly-income");
  const saveButton = document.getElementById("save");
  const resultsContainer = document.querySelector(".results");
  const resultsList = document.getElementById("results-list");

  jars.forEach((jar) => {
    // ... (existing code)
  });

  saveButton.addEventListener("click", function () {
    const monthlyIncome = parseFloat(monthlyIncomeInput.value);

    if (isNaN(monthlyIncome) || monthlyIncome <= 0) {
      alert("Please enter a valid monthly income.");
      return;
    }

    resultsList.innerHTML = "";
    resultsContainer.style.display = "block";

    jars.forEach((jar) => {
      const jarName = jar.querySelector("h3").textContent;
      const percentage = parseInt(jar.getAttribute("data-percentage"));
      const amount = (monthlyIncome * (percentage / 100)).toFixed(2);

      const listItem = document.createElement("li");
      listItem.textContent = `${jarName}: $${amount}`;
      resultsList.appendChild(listItem);
    });
  });
});

// Progress bar เก่า
// function updateProgressBar() {
//     const total = 100; // the total amount that each jar can hold
//     const necessity = parseInt(document.getElementById("necessity").value);
//     const education = parseInt(document.getElementById("education").value);
//     const play = parseInt(document.getElementById("play").value);
//     const giving = parseInt(document.getElementById("giving").value);
//     const emergency = parseInt(document.getElementById("emergency").value);
//     const retirement = parseInt(document.getElementById("retirement").value);
//     const insurance = parseInt(document.getElementById("insurance").value);
//     const freedom = parseInt(document.getElementById("freedom").value);
//     const debt = parseInt(document.getElementById("debt").value);
//     const totalAmount = necessity + education + play + giving + emergency + retirement + insurance + freedom + debt;
//     const progressValue = document.querySelector(".progress-value");
//     const progress = document.querySelector(".progress-bar");
//     const progressPercent = Math.floor((totalAmount / total) * 100);

//     progressValue.innerHTML = progressPercent + "%";
//     progress.style.transform = `rotate(${progressPercent / 100 * 360}deg)`;

//     if (progressPercent <= 40) {
//       progress.style.background = "conic-gradient(#ff7878 0 100%)";
//     } else if (progressPercent > 40 && progressPercent < 70) {
//       progress.style.background = "conic-gradient(#f9d71c 0 100%)";
//     } else {
//       progress.style.background = "conic-gradient(#90ee90 0 100%)";
//     }
//   }

//   const inputFields = document.querySelectorAll(".jar input[type='number']");
//   inputFields.forEach((inputField) => {
//     inputField.addEventListener("input", updateProgressBar);
//   });
