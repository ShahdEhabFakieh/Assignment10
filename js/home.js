document.addEventListener("DOMContentLoaded", () => {

    var acc = getCurrentAccount();

    // Return if there's no current account and navigate to index (Login)
    if (acc == null) {
        window.location.href = "index.html";
        return;
    }

    document.getElementById("welcomeText").innerHTML = "welcome, " + acc.name;
});

function resetCurrentAccount() {
    localStorage.setItem("CurrentAccount", null);
    window.location.href = "index.html";
}

function getCurrentAccount() {
    return JSON.parse(localStorage.getItem("CurrentAccount"));
}