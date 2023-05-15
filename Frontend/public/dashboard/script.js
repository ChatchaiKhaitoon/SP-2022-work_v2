// function calculate() {
//     // Get user input values
//     const monthlyIncome = parseFloat(document.getElementById("monthly-income").value);
//     const monthlyExpenses = parseFloat(document.getElementById("monthly-expenses").value);
//     const savings = parseFloat(document.getElementById("savings").value);
//     const fixedCost = parseFloat(document.getElementById("fixed-cost").value);
//     const assets = parseFloat(document.getElementById("assets").value);
//     const liabilities = parseFloat(document.getElementById("liabilities").value);

//     // Calculate Money Index indicators
//     // Saving Ratio = (Saving/income) * 100
//     const savingRatio = ((savings / monthlyIncome) * 100).toFixed(2);

//     // Debt Ratio = Fixed cost/income
//     const debtRatio = (fixedCost / monthlyIncome).toFixed(2);

//     // Emergency Fund Ratio = Asset / Monthly Expenses
//     const emergencyFundRatio = (assets / monthlyExpenses).toFixed(2);

//     // Net Worth = Assets - Liabilities
//     const netWorth = (assets - liabilities).toFixed(2);

//     // Display the result
//     const resultElement = document.getElementById("result");
//     resultElement.innerHTML = `Saving Ratio: ${savingRatio}%<br>
//                                Debt Ratio: ${debtRatio}<br>
//                                Emergency Fund Ratio: ${emergencyFundRatio}<br>
//                                Net Worth: ${netWorth}`;
//   }
function calculate() {
  // Get user input values
  const monthlyIncome = parseFloat(
    document.getElementById("monthly-income").value
  );
  const monthlyExpenses = parseFloat(
    document.getElementById("monthly-expenses").value
  );
  const savings = parseFloat(document.getElementById("savings").value);
  const fixedCost = parseFloat(document.getElementById("fixed-cost").value);
  const assets = parseFloat(document.getElementById("assets").value);
  const liabilities = parseFloat(document.getElementById("liabilities").value);

  // Calculate Money Index indicators
  // Saving Ratio = (Saving/income) * 100
  const savingRatio = ((savings / monthlyIncome) * 100).toFixed(2);
  console.log("savingRatioeeeeeeee" + savingRatio);
  // Debt Ratio = Fixed cost/income
  const debtRatio = (fixedCost / monthlyIncome).toFixed(2);
  console.log("debtRatioeeeeeeee" + debtRatio);
  // Emergency Fund Ratio = Asset / Monthly Expenses
  const emergencyFundRatio = (assets / monthlyExpenses).toFixed(2);
  console.log("EmerRatioeeeeeeee" + emergencyFundRatio);
  // Net Worth = Assets - Liabilities
  const netWorth = (assets - liabilities).toFixed(2);
  console.log("nw" + netWorth);
  // Determine the money level based on the Money Index indicators
  let moneyLevel;
  if (
    savingRatio <= 9 &&
    debtRatio >= 40 &&
    emergencyFundRatio <= 0 &&
    netWorth <= 0
  ) {
    moneyLevel = "LV.1";
  } else if (
    savingRatio <= 10 &&
    debtRatio <= 50 &&
    emergencyFundRatio <= 0 &&
    netWorth <= 0
  ) {
    moneyLevel = "LV.2";
  } else if (
    savingRatio >= 10 &&
    debtRatio <= 40 &&
    emergencyFundRatio >= 1 &&
    emergencyFundRatio <= 6 &&
    netWorth > 0
  ) {
    moneyLevel = "LV.3";
  } else if (
    savingRatio >= 10 &&
    debtRatio <= 40 &&
    emergencyFundRatio >= 6 &&
    emergencyFundRatio <= 12 &&
    netWorth > 0
  ) {
    moneyLevel = "LV.4";
  } else if (
    savingRatio >= 10 &&
    debtRatio <= 40 &&
    emergencyFundRatio >= 12 &&
    netWorth > 0
  ) {
    moneyLevel = "LV.5";
  } else if (
    savingRatio >= 10 &&
    debtRatio < 40 &&
    emergencyFundRatio >= 12 &&
    netWorth > 0
  ) {
    moneyLevel = "LV.6";
  } else if (
    savingRatio >= 15 &&
    debtRatio < 40 &&
    emergencyFundRatio > 12 &&
    netWorth > 0
  ) {
    moneyLevel = "LV.7";
  } else if (
    savingRatio >= 20 &&
    debtRatio < 40 &&
    emergencyFundRatio > 12 &&
    netWorth > 0
  ) {
    moneyLevel = "LV.8";
  } else {
    moneyLevel = "Lv.1";
  }

  // Display the result
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = `
      <div class="card">
        <h2>ผลการประเมินสุขภาพการเงินของคุณ</h2>
        <p>อัตราส่วนการออมและการลงทุนSaving Ratio: ${savingRatio}%</p>
        <p>อัตราส่วนเงินชำระหนี้ต่อรายได้Debt Ratio: ${debtRatio}</p>
        <p>อัตราส่วนเงินสำรองEmergency Fund Ratio: ${emergencyFundRatio}</p>
        <p>ความมั่งคั่งสุทธิNet Worth: ${netWorth}</p>
        <h3>สุขภาพการเงินของคุณอยู่ที่ ${moneyLevel}</h3>
      </div>
    `;
}

//   // Retrieve previous grading data from local storage (if available)
// let gradingHistory = JSON.parse(localStorage.getItem('gradingHistory')) || [];

// // Get current grading level (assumes the Money Index calculation and level determination has already been performed)
// let currentLevel = getLevelFromMoneyIndex(moneyIndex);

// // Add the current grading to the history
// gradingHistory.push({
//   date: new Date().toLocaleDateString(),
//   previousLevel: gradingHistory.length > 0 ? gradingHistory[gradingHistory.length - 1].currentLevel : '-',
//   currentLevel: currentLevel
// });

// // Update local storage with the new grading history
// localStorage.setItem('gradingHistory', JSON.stringify(gradingHistory));

// // Populate history table with data
// let historyTable = document.getElementById('history-table');
// for (let i = gradingHistory.length - 1; i >= 0; i--) {
//   let row = historyTable.insertRow();
//   let dateCell = row.insertCell();
//   let previousLevelCell = row.insertCell();
//   let currentLevelCell = row.insertCell();

//   dateCell.innerHTML = gradingHistory[i].date;
//   previousLevelCell.innerHTML = gradingHistory[i].previousLevel;
//   currentLevelCell.innerHTML = gradingHistory[i].currentLevel;
// }
