const nameInput = document.getElementById("name")
const usernameInput = document.getElementById("user");
const passwordInput = document.getElementById("password");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");

/**
 * 
 * VALIDATORS
 *  
 */

function isValidName(name) {
  return /^[a-zA-Z]+\s[a-zA-Z][a-zA-Z]+\s[a-zA-Z\.-\s]+$/.test(name)
};

 function isValidUsername(user) {
  return /^[a-z]+$/.test(user)
};
//The ^$ wrap the RegEx. If these were not present, the func would return true if there was a single lowercase letter.
//We want ONLY lowercase so we want the .test() to return falsy if it finds a single upper case letter.

function isValidPassword(password) {
  return /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password);
};
//No if statement needed. .test() returns truthy values
//The ^$+ are not needed. We don't care if they use additional symbols. We want MORE specificity and not less.
//Above is my solution. "/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/" is another, more complicated solution using lookaheads.

// The telephone number must be in the format of (555) 555-5555
function isValidPhone(phone) {
  return /^\D*\d{3}\D*\d{3}\D*\d{4}\D*$/.test(phone);
  // \D* is used to allow any non-numeric group of characters but allow the groups of numbers to stay valid
  // "1234567890"   "(123) 123-1374"   "(123)  123-1374"   "( 123 ) 123 - 1374"   "sdf(123) 123sdf-1374asd" will all now pass but "( 123 ) 123 - 13sd74" won't
  // http://regexpal.com.s3-website-us-east-1.amazonaws.com/
};

// Must be a valid email address
function isValidEmail(email) {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email)
};
//Anything that is not an @ sym;
//Have it disregard case

/**
 * 
 * FORMATTING FUNCTIONS
 * 
 */

function formatPhone(text) {
  const regex = /^\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*$/
  return text.replace(regex, '($1) $2-$3');
}

function formatName(text) {
  const regex = /^([a-zA-Z]+)\s([a-zA-Z])[a-zA-Z]+(\s[a-zA-Z\.-\s]+)$/
  return text.replace(regex, '$3, $1 $2.');
}

/**
 * 
 * SET UP EVENTS
 * 
 */

function showOrHideTip(show, element) {
  // show element when show is true, hide when false
  if (show) {
    element.style.display = "inherit";
  } else {
    element.style.display = "none";
  }
}

function createListener(validator) {
  return e => {
    const text = e.target.value;
    const valid = validator(text);
    const showTip = text !== "" && !valid;
    const tooltip = e.target.nextElementSibling;
    showOrHideTip(showTip, tooltip);
  };
}

nameInput.addEventListener("input", createListener(isValidName));

nameInput.addEventListener("blur", e => {
  e.target.value = formatName(e.target.value);
});

usernameInput.addEventListener("input", createListener(isValidUsername));

passwordInput.addEventListener("input", createListener(isValidPassword));

phoneInput.addEventListener("input", createListener(isValidPhone));

phoneInput.addEventListener("blur", e => {
  e.target.value = formatPhone(e.target.value);
});

emailInput.addEventListener("input", createListener(isValidEmail));
