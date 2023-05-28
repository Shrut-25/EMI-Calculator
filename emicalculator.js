const loanAmountInput = document.querySelector(".Loan-Amount");
const interestRateInput = document.querySelector(".Interest-amount");
const loanTenureInput = document.querySelector(".year");

const loanEMIValue = document.querySelector(".loan-emi .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalAmountValue = document.querySelector(".total-amount .value");

const calculateBtn = document.querySelector(".calculate-btn");

let loanAmount = parseFloat(loanAmountInput.value);
let interestRate = parseFloat(interestRateInput.value);
let loanTenure = parseFloat(loanTenureInput.value);

let interest = interestRate / 12 / 100;
let tenure = loanTenure * 12;

let myChart;

const displayChart = (totalInterestPayableValue) => {
  const ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "polarArea",
    data: {
      labels: ["Total Interest", "Principal Loan Amount"],
      datasets: [
        {
          data: [totalInterestPayableValue, loanAmount],
          backgroundColor: ["#e63946", "#14213d"],
          borderWidth: 0,
        },
      ],
    },
  });
};

const updateChart = (totalInterestPayableValue) => {
  myChart.data.datasets[0].data[0] = totalInterestPayableValue;
  myChart.data.datasets[0].data[1] = loanAmount;
  myChart.update();
};

const calculateEMI = () => {
  let emi =
    loanAmount *
    interest *
    (Math.pow(1 + interest, tenure) /
      (Math.pow(1 + interest, tenure) - 1));

  return emi;
};

const updateData = (emi) => {
  loanEMIValue.innerHTML = Math.round(emi);

  let totalAmount = Math.round(tenure * emi);
  totalAmountValue.innerHTML = totalAmount;

  let totalInterestPayable = Math.round(totalAmount - loanAmount);
  totalInterestValue.innerHTML = totalInterestPayable;

  if (myChart) {
    updateChart(totalInterestPayable);
  } else {
    displayChart(totalInterestPayable);
  }
};

const refreshInputValues = () => {
  loanAmount = parseFloat(loanAmountInput.value);
  interestRate = parseFloat(interestRateInput.value);
  loanTenure = parseFloat(loanTenureInput.value);
  interest = interestRate / 12 / 100;
  tenure = loanTenure * 12;
};

const init = () => {
  refreshInputValues();
  let emi = calculateEMI();
  updateData(emi);
};

init();

calculateBtn.addEventListener("click", init);
function CalcLoan()
{
     var principal = new Number(document.getElementById("loanlabel").value); //get loan amount or principal

     var intrate = new Number(document.getElementById("ratelabel").value)/100 / 12; //get interest rate

     var term = new Number(document.getElementById("termlabel").value)*12; //get the term of loan

     var x = Math.pow(1 + intrate, term); //interest

     var monthlypay = (principal*x*intrate)/(x-1); //calculate monthly payment


     document.getElementById("MonthlyPayment").innerHTML = "Monthly Payment = " + "Rs. " + monthlypay.toFixed(2);  //display the monthly payment in a label


     var balance = new Number(document.getElementById("loanlabel").value);



      var results = "<table><tr><th>Months  </th><th>Beginning Amount  </th><th>Paid to Principal  </th><th>Paid to Interest  </th><th>End Amount</th></tr>";  //Create a table header 



     for (var count=0; count < term; count++)
     {

     var interestForMonth = balance * intrate;

     var principalForMonth = monthlypay - interestForMonth;

     balance = balance - principalForMonth;

     var endamt = balance - principalForMonth;

     if (endamt <= 0)
    {
        endamt = 0.00;
    }


     results += "<tr><td>" + (count + 1) + "</td><td>" + "Rs. " + balance.toFixed(2) + "</td><td>" + "Rs. " + principalForMonth.toFixed(2) + "</td><td>" + "Rs. " + interestForMonth.toFixed(2) + "</td><td>" + "Rs. " + endamt.toFixed(2)+ "</td></tr>";  //Create Table rows



     document.getElementById("ATable").innerHTML = results;
     }

     results += "</table>";





}
