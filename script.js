const emailInput = document.querySelector("#user-email");
const phoneNumber = document.querySelector("#phone-number");
const password1 = document.querySelector("#user-password");
const password2 = document.querySelector("#confirm-password");
const firstName = document.querySelector("#user-first-name");
const lastName = document.querySelector("#user-last-name");
const resetPage = document.querySelector(".create-account");

resetPage.addEventListener('click', () => {
    location.reload(); // refresh the page
})

function changeRedColor(...elements) {
    for(const element of elements) {
        element.style.cssText = "border: 1px solid red;";
        element.previousElementSibling.style.cssText = "color: red";
    }
}

function changeGreenColor(...elements) {
    for(const element of elements) {
        element.style.cssText = "border: 1px solid green;";
        element.previousElementSibling.style.cssText = "color: green";
    }
}

function testRegExp(regExpPattern, inputValue, element) {
    const regExp = new RegExp(regExpPattern);
    !regExp.test(inputValue) ? changeRedColor(element) : changeGreenColor(element);
}

function verify(element, inputValue, inputName) {
    switch (inputName) {
        case "email":
            testRegExp(/@\w*\.(com|ca|org)/, inputValue, element);
            return;
        case "name":
            testRegExp(/(.*[a-z]){3}/i, inputValue, element); // at least 3 characters
            return;
        case "phone":
            testRegExp(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, inputValue, element);
            return;
        case "password":
            testRegExp(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, inputValue, element); // at least 8 characters, 1 lower case, 1 uppercase, 1 number, 1 symbol
    }
}

function verifyInput(element, type) {
    element.addEventListener('input', () => {
        let inputValue = element.value;
        verify(element, inputValue, type);
    })
}

function checkPasswords() {
    const password2Value = password2.value;
    const password1Value = password1.value;

    if(!password2Value) {
        changeGreenColor(password1);
        return;
    }

    if(password1Value != password2Value) {
        changeRedColor(password1, password2);
        return;
    }

    changeGreenColor(password1, password2);
}

password1.addEventListener('input', checkPasswords);
password2.addEventListener('input', checkPasswords);
verifyInput(firstName, "name");
verifyInput(lastName, "name");
verifyInput(emailInput, "email");
verifyInput(phoneNumber, "phone");
verifyInput(password1, "password");
