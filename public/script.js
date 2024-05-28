setTimeout(function () {
  var logoutMessageElement = document.getElementById("logoutMessage");
  if (logoutMessageElement) {
    logoutMessageElement.style.display = "none";
  }
}, 2000);

setTimeout(function () {
  var errorMessageElement = document.getElementById("errorMessage");
  if (errorMessageElement) {
    errorMessageElement.style.display = "none";
  }
}, 3000);

//form validation

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("submit-form");
  const username = document.querySelector('input[name="name"]');
  const email = document.querySelector('input[name="email"]');
  const number = document.querySelector('input[name="mno"]');
  const password = document.querySelector('input[name="password"]');

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateInputs()) {
      form.submit();
    }
  });

  const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerText = message;

    inputControl.classList.remove("success");
  };

  const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
  };

  const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const numberValue = number.value.trim();

    let isValid = true;

    if (usernameValue === "") {
      setError(username, "Name required");
      isValid = false;
    } else if (!isValidName(usernameValue)) {
      setError(username, "Only alphabets are allowed");
      isValid = false;
    } else if (usernameValue.length < 5) {
      setError(username, "Minimum of 5 characters");
      isValid = false;
    } else {
      setSuccess(username);
    }

    if (emailValue === "") {
      setError(email, "Email required");
      isValid = false;
    } else if (!isValidEmail(emailValue)) {
      setError(email, "Invalid email format");
      isValid = false;
    } else {
      setSuccess(email);
    }

    if (numberValue === "") {
      setError(number, "Phone number required");
      isValid = false;
    } else if (!isValidPhoneNumber(numberValue)) {
      setError(number, "Invalid phone number format");
      isValid = false;
    } else {
      setSuccess(number);
    }

    if (passwordValue === "") {
      setError(password, "password required");
    } else {
      setSuccess(password);
    }

    return isValid;
  };

  const isValidName = (name) => {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isValidPhoneNumber = (number) => {
    const regex = /^\d{10}$/;
    return regex.test(number);
  };
});

//loginform validation

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form");

  const email = document.querySelector('input[name="email"]');
  const password = document.querySelector('input[name="password"]');

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateInputs()) {
      form.submit();
    }
  });

  const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerText = message;

    inputControl.classList.remove("success");
  };

  const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
  };

  const validateInputs = () => {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    let isValid = true;

    if (emailValue === "") {
      setError(email, "Email required");
      isValid = false;
    } else if (!isValidEmail(emailValue)) {
      setError(email, "Invalid email format");
      isValid = false;
    } else {
      setSuccess(email);
    }

    if (passwordValue == "") {
      setError(password, "password required");
    } else {
      setSuccess(password);
    }

    return isValid;
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
});
