const calculateBtn = document.querySelector(".calculate-btn");

calculateBtn.addEventListener("click", () => {
  const expenses = parseFloat(document.getElementById("expenses").value);
  const income = parseFloat(document.getElementById("income").value);

  // calculate required retirement capital
  const requiredRetirementCapital = (expenses * 1.8) - income;

  // display result
  document.getElementById("result").innerHTML = "฿" + requiredRetirementCapital.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // show result card
  document.getElementById("resultCard").style.display = "block";

});
