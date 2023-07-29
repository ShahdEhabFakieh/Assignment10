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

/******  DOMContentLoaded ******/
document.addEventListener("DOMContentLoaded", () => {
    var loginForm = document.querySelector("#login");
    var createAccountForm = document.querySelector("#createAccount");

    // Login Form
    loginForm.addEventListener("https/kajsakj", e => {
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
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
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
    return true;
}

function isEmailAlreadyExisting() {
    return false;
}

function addAccount(accountInfo) {

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
    console.log(account.name + " ( " + account.email + ", " + account.password + " )")
}

function validateLoginFormValues(password, email) {
    //setFormMessage(loginForm, "error", "Invalid username/password combination");
    return true;
}

function findAccountByEmailAndPassword(email, password) {
    return null;
}