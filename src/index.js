import "./style.css";
// Need email, country, zip, password

// Get email, country, zip, password, confirm, button, and error elements
const email = document.getElementById("email");
const emailError = email.nextElementSibling;

const country = document.getElementById("country");
const countryError = country.nextElementSibling;

const zip = document.getElementById("zip");
const zipError = zip.nextElementSibling;

const password = document.getElementById("password");
const passwordError = password.nextElementSibling;

const confirmPass = document.getElementById("confirm");
const confirmPassError = confirmPass.nextElementSibling;

const form = document.querySelector("form");

/* Functions for error handling */

// Submit handler

// Email handler
function showEmailError() {
  if (email.validity.valueMissing) {
    emailError.textContent = "You need to enter an email address";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Email needs to follow the format xxxxxxx@xxx";
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email address must be at least 8 characters, you entered;
           ${email.value.length}`;
  }
}

// Country handler
function showCountryError() {
  const uppercaseRegex = /^(?:[A-Z]{3})$/;
  const fullnameRegex = /^(?:[A-Za-z ']+)$/;

  if (country.validity.tooShort) {
    countryError.textContent =
      "Too Short: Country must either be 3-letter code or full name";
  } else if (!fullnameRegex.test(country.value)) {
    countryError.textContent =
      "Country cannot contain numbers or special characters(except ')";
  } else if (!uppercaseRegex.test(country.value)) {
    countryError.textContent = "Country code must be all uppercase";
  }
}

// Zip handler
function showZipError() {
  zipError.textContent = "Zip code must be 5 digits";
}

// Password handler
function showPassError() {
  const lowercaseRegex = /^(?=.*[a-z]).*$/;
  const uppercaseRegex = /^(?=.*[A-Z]).*$/;
  const numberRegex = /^(?=.*\d).*$/;
  const specialCharRegex = /^(?=.*[!@#$%^&*()_+]).*$/;

  if (password.validity.tooShort) {
    passwordError.textContent = "Password must be at least 10 Characters";
  } else if (!lowercaseRegex.test(password.value)) {
    passwordError.textContent =
      "Password must contain at least one lowercase letter";
  } else if (!uppercaseRegex.test(password.value)) {
    passwordError.textContent =
      "Password must contain at least one uppercase letter";
  } else if (!numberRegex.test(password.value)) {
    passwordError.textContent = "Password must contain at lest one number";
  } else if (!specialCharRegex.test(password.value)) {
    passwordError.textContent =
      "Password must contain at least one special character (!@#$%^&*()_+.)";
  } else {
    passwordError.textContent = "We should not be here";
  }
}

// Confirm password handler
// Only if passwords don't match
function showConfirmPassError() {
  confirmPassError.textContent = "Passwords must match";
}

/* Event Listeners */

// Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = true;
  const errorDisplay = ["Could not submit because: "];

  if (!email.validity.valid) {
    errorDisplay.push("Invalid Email");
    valid = false;
  }
  if (!country.validity.valid) {
    errorDisplay.push("Invalid Country");
    valid = false;
  }
  if (!zip.validity.valid) {
    errorDisplay.push("Invalid Zip");
    valid = false;
  }
  if (!password.validity.valid) {
    errorDisplay.push("Invalid Password");
    valid = false;
  }
  if (!confirmPass.validity.valid) {
    errorDisplay.push("Passwords must match");
    valid = false;
  }

  if (valid) {
    alert("Congrats, you entered everything correct!!!");
  } else {
    alert(errorDisplay.join("\n"));
  }
});

// Email
email.addEventListener("input", () => {
  email.setCustomValidity("");
  if (email.validity.valid) {
    emailError.textContent = "";
  } else {
    showEmailError();
    email.setCustomValidity("Invalid");
  }
});

// Country
country.addEventListener("input", () => {
  // Regex for 3-letter country code or spelled out name
  const regex = /^(?:[A-Z]{3}|[a-zA-Z ']{4,})$/;

  // validity only checks for min length so we are OK to compare here
  country.setCustomValidity("");
  if (regex.test(country.value) && country.validity.valid) {
    countryError.textContent = "";
  } else {
    showCountryError();
    country.setCustomValidity("Invalid");
  }
});

// Zip
zip.addEventListener("input", () => {
  zip.setCustomValidity("");
  if (zip.value.length === 5) {
    zipError.textContent = "";
  } else {
    showZipError();
    zip.setCustomValidity("Invalid");
  }
});

// Password
password.addEventListener("input", () => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+.])[a-zA-Z\d!@#$%^&*()_+.]*$/;
  password.setCustomValidity("");
  if (password.validity.valid && regex.test(password.value)) {
    passwordError.textContent = "";
  } else {
    showPassError(0);
    password.setCustomValidity("Invalid");
  }
});

// Confirm Password
confirmPass.addEventListener("input", () => {
  if (confirmPass.value === password.value) {
    confirmPassError.textContent = "";
    confirmPass.setCustomValidity("");
  } else {
    showConfirmPassError();
    confirmPass.setCustomValidity("Invalid");
  }
});
