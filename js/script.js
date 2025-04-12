// script.js
document.getElementById("membershipForm").addEventListener("submit", function (e) {
  e.preventDefault();
  
  // Clear any previous errors
  let errors = [];
  
  // Get trimmed values from form fields
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const dob = document.getElementById("dob").value.trim();
  const monthlyPayment = document.getElementById("monthlyPayment").value.trim();
  
  // Check for missing fields
  if (!firstName) {
    errors.push("Name");
  }
  if (!lastName) {
    errors.push("Surname");
  }
  if (!dob) {
    errors.push("Date of Birth");
  }
  if (!monthlyPayment) {
    errors.push("Monthly Payment");
  }
  
  if (errors.length) {
    alert("Please complete the following field(s): " + errors.join(", "));
    return;
  }

  // Validate Name and Surname (letters only)
  const nameRegex = /^[A-Za-z]+$/;
  if (!nameRegex.test(firstName)) {
    alert("Name must contain only letters.");
    return;
  }
  if (!nameRegex.test(lastName)) {
    alert("Surname must contain only letters.");
    return;
  }

  // Validate Date of Birth format and validity (DD/MM/YYYY)
  const dateFormatRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = dob.match(dateFormatRegex);
  if (!match) {
    alert("invalid date");
    return;
  }
  
  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);
  
  // Check if month is valid (1-12)
  if (month < 1 || month > 12) {
    alert("invalid date");
    return;
  }
  
  // Set maximum days for each month, handling leap years for February
  let maxDays;
  switch(month) {
    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
      maxDays = 31;
      break;
    case 4: case 6: case 9: case 11:
      maxDays = 30;
      break;
    case 2:
      if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        maxDays = 29;
      } else {
        maxDays = 28;
      }
      break;
    default:
      maxDays = 31;
  }
  
  if (day < 1 || day > maxDays) {
    alert("invalid date");
    return;
  }

  // Validate Monthly Payment: ensure only numeric input, no letters, and at least £5.
  const paymentRegex = /^\d+(\.\d+)?$/;
  if (!paymentRegex.test(monthlyPayment)) {
    alert("Monthly Payment must be a valid number without letters.");
    return;
  }
  
  const paymentVal = parseFloat(monthlyPayment);
  if (isNaN(paymentVal) || paymentVal < 5) {
    alert("Monthly Payment must be at least £5.");
    return;
  }

  // If all validations pass, inform the user of a successful submission.
  alert("Membership form completed successfully.");
});

