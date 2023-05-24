export const calculate = (
  monthlyIncome,
  monthlyExpenses,
  savings,
  fixedCost,
  assets,
  liabilities
) => {
  // Calculate Money Index indicators
  // Saving Ratio = (Saving/income) * 100
  const savingRatio = ((savings / monthlyIncome) * 100).toFixed(2);
  // Debt Ratio = Fixed cost/income
  const debtRatio = (fixedCost / monthlyIncome).toFixed(2);
  // Emergency Fund Ratio = Asset / Monthly Expenses
  const emergencyFundRatio = (assets / monthlyExpenses).toFixed(2);
  // Net Worth = Assets - Liabilities
  const netWorth = (assets - liabilities).toFixed(2);
  // Determine the money level based on the Money Index indicators
  let moneyLevel= "LV.0";
  if (
    savingRatio <= 9 &&
    debtRatio >= 40 &&
    emergencyFundRatio <= 0 &&
    netWorth <= 0 &&
    liabilities > savings
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
  } 
  

  return { moneyLevel, savingRatio, debtRatio, emergencyFundRatio, netWorth };
};
