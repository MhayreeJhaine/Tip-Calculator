const billInput = document.getElementById("bill");
const tipBtns = document.querySelectorAll(".tipBtn");
const customTip = document.getElementById("customTip");
const numOfPeople = document.getElementById("numOfPeople");
const billErr = document.getElementById("billErr");
const numErr = document.getElementById("numErr");

const tipPerPerson = document.getElementById("tipAmt");
const totalPerPerson = document.getElementById("total");
const resetBtn = document.getElementById("resetBtn");

const isNaNErr = "Enter a valid number";
const isZeroErr = "Can't be zero";

let tipPercentage = null;

billInput.addEventListener("input", () => {
  validateBill();
  calculate();
});

numOfPeople.addEventListener("input", () => {
  validatePeople();
  calculate();
});

//  Tip buttons
tipBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    tipPercentage = parseFloat(button.value) / 100;
    customTip.value = "";
    tipBtns.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    calculate();
  });
});
customTip.addEventListener("input", (e) => {
  tipPercentage = parseFloat(e.target.value) / 100;
  tipBtns.forEach((btn) => btn.classList.remove("active"));
  calculate();
});

// Reset
resetBtn.addEventListener("click", () => {
  billInput.value = "";
  numOfPeople.value = "";
  customTip.value = "";
  tipPercentage = null;
  billErr.textContent = "";
  numErr.textContent = "";
  tipPerPerson.textContent = "0.00";
  totalPerPerson.textContent = "0.00";
  tipBtns.forEach((button) => {
    button.classList.remove("active");
  });
});

function validateBill() {
  const bill = parseFloat(billInput.value);
  if (isNaN(bill)) {
    billErr.textContent = isNaNErr;
    return false;
  } else if (bill <= 0) {
    billErr.textContent = isZeroErr;
    return false;
  } else {
    billErr.textContent = "";
    return true;
  }
}

function validatePeople() {
  const people = parseFloat(numOfPeople.value);
  if (isNaN(people)) {
    numErr.textContent = isNaNErr;
    return false;
  } else if (people <= 0) {
    numErr.textContent = isZeroErr;
    return false;
  } else {
    numErr.textContent = "";
    return true;
  }
}

function calculate() {
  const bill = parseFloat(billInput.value);
  const people = parseFloat(numOfPeople.value);

  const isBillValid = validateBill();
  const isPeopleValid = validatePeople();

  // Don't calculate unless all input are present and valid
  if (!isBillValid || !isPeopleValid || !tipPercentage) {
    tipPerPerson.textContent = "0.00";
    totalPerPerson.textContent = "0.00";
    return;
  }

  const tipAmount = (bill * tipPercentage) / people;
  const totalAmount = bill / people + tipAmount;

  tipPerPerson.textContent = tipAmount.toFixed(2);
  totalPerPerson.textContent = totalAmount.toFixed(2);
}
