/****** Global Vars ******/
var loginForm = document.querySelector("#login");
var createAccountForm = document.querySelector("#createAccount");

var registeredAccounts = getFromLocal();

/******  Form success and error messages ******/
function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");
    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

/****** Local Storage ******/

function addToLocal() {
    localStorage.setItem("Accounts", JSON.stringify(registeredAccounts));
}
function getFromLocal() {
    var accounts = JSON.parse(localStorage.getItem("Accounts"));
    return (accounts == null) ? [] : accounts;
}

/******  DOMContentLoaded ******/
document.addEventListener("DOMContentLoaded", () => {
    // Login Form
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        onLoginSubmit()
    });

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    // Register Form
    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();
        onRegisterSubmit();
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    // All Fields
    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 6) {
                setInputError(inputElement, "Username must be at least 6 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });

});

/******  Registration Logic ******/
function onRegisterSubmit() {
    // Get input elements
    var signupUsernameInput = document.querySelector("#signupUsername");
    var signupPasswordInput = document.querySelector('#signupPassword');
    var signupEmailInput = document.querySelector("#signupEmail");

    // Get input values
    var signupUsernameValue = signupUsernameInput.value;
    var signupPasswordValue = signupPasswordInput.value;
    var signupEmailValue = signupEmailInput.value;

    // Return if validation fails
    if (!validateRegistrationFormValues(signupUsernameValue, signupPasswordValue, signupEmailValue))
        return;

    // Return if Email Exists
    if (isEmailAlreadyExisting(signupEmailValue)) {
        setFormMessage(createAccountForm, "error", "Email already found!");
        return;
    }

    // Save Data to Local
    var accountInfo = {
        name: signupUsernameValue,
        password: signupPasswordValue,
        email: signupEmailValue,
    }
    addAccount(accountInfo)

    // Show success message
    setFormMessage(createAccountForm, "success", "Your account has been created successfully!");
}

function validateRegistrationFormValues(userName, password, email) {
    // Check if either one of the values is empty
    if (!userName || !password || !email) {
        setFormMessage(createAccountForm, "error", "All inputs are required");
        return false;
    }
    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setInputError(document.querySelector("#signupEmail"), "Invalid Email");
        return false;
    }

    return true;
}

function isEmailAlreadyExisting(email) {
    for (i = 0; i < registeredAccounts.length; i++) {
        var acc = registeredAccounts[i];
        if (acc.email === email)
            return true;
    }
    return false;
}

function addAccount(accountInfo) {
    registeredAccounts.push(accountInfo);
    addToLocal();
}

/******  Login Logic ******/
function onLoginSubmit() {
    var loginPasswordInput = document.querySelector('#loginPassword');
    var loginEmailInput = document.querySelector("#loginEmail");

    // Get input values
    var loginPasswordValue = loginPasswordInput.value;
    var loginEmailValue = loginEmailInput.value;

    // Return if validation fails
    if (!validateLoginFormValues(loginPasswordValue, loginEmailValue))
        return;

    // Return if incorrect Email or Pawwrod
    var account = findAccountByEmailAndPassword(loginEmailValue, loginPasswordValue)
    if (account == null) {
        setFormMessage(loginForm, "error", "Incorrect email or password!");
        return;
    }

    // Navigate to HomePage
    setFormMessage(loginForm, "success", "Welcome, " + account.name)
}

function validateLoginFormValues(password, email) {
    // Check if either one of the values is empty
    if (!password || !email) {
        setFormMessage(loginForm, "error", "All inputs are required");
        return false;
    }
    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setInputError(document.querySelector("#loginEmail"), "Invalid Email");
        return false;
    }
    return true;
}

function findAccountByEmailAndPassword(email, password) {
    for (i = 0; i < registeredAccounts.length; i++) {
        var acc = registeredAccounts[i];
        if (acc.email === email && acc.password === password)
            return acc;
    }
    return null;
}