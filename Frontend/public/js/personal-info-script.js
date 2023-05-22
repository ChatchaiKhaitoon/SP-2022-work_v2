let form = document.querySelector("form");
let nextBtn = form.querySelector(".nextBtn");
let backBtn = form.querySelector(".backBtn");
let allInput = form.querySelectorAll(".first input");

nextBtn.addEventListener("click", () => {
  allInput.forEach((input) => {
    if (input.value != "") {
      form.classList.add("secActive");
      //Yeah, I know. but I'm lazy to fix it.
      fetch(`http://localhost:3000/api/get-user/${userId}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.length > 0) {
            incomePerMonth.value = userInfo.User_income_per_month;
            expensePerMonth.value = userInfo.User_expense_per_month;
            fixedCost.value = userInfo.User_fixed_cost;
            asset.value = userInfo.User_asset;
            liability.value = userInfo.User_liabilities;
            saving.value = userInfo.User_saving;
          }
        });
    } else {
      form.classList.remove("secActive");
    }
  });
});

backBtn.addEventListener("click", () => form.classList.remove("secActive"));
