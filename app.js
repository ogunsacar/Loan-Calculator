// listen for submit

document.getElementById("loan-form").addEventListener("submit", function (e) {
  // hide result
  document.getElementById("results").style.display = "none";

  // Show loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);


  e.preventDefault();
})

//creating calculate result function

function calculateResults() {

  console.log("calc");

  // UI Vars

  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) { // number is sınırlı or not 
    monthlyPayment.value = monthly.toFixed(2); // decimal sayısı
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // show results 
    document.getElementById("results").style.display = "block";

    // hide loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check your numbers!");
  }

}

// creating showerror func

function showError(error) {

  // hide result
  document.getElementById("results").style.display = "none";

  // Show loader
  document.getElementById("loading").style.display = "none";

  // create a div

  const errorDiv = document.createElement("div");

  //get element
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // add class

  errorDiv.className = "alert alert-danger";

  // add tect

  errorDiv.appendChild(document.createTextNode(error));


  // insert error above heading

  card.insertBefore(errorDiv, heading);


  // clear error after 3 seconds

  setTimeout(clearError, 3000) // first parameter is a function, milisecond
}

// creating clear error function

function clearError() {
  document.querySelector(".alert").remove();
}

