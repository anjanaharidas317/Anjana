
let nameInput = document.getElementById("name-field");
let emailInput = document.getElementById("email-field");
let subjectInput = document.getElementById("subject-field");
let messageInput = document.getElementById("message-field");

function validateForm() {
    let isValid = true;

    // Validate Name
    if (nameInput.value.trim() == "") {
        document.getElementById("errorName").innerHTML = "Name is required";
        isValid = false;
    } else if (nameInput.value.length < 3) {
        document.getElementById("errorName").innerHTML = "Name should have at least 3 characters";
        isValid = false;
    } else {
        document.getElementById("errorName").innerHTML = "";
    }

    // Validate Email
    if (emailInput.value.trim() === "") {
        document.getElementById("errorEmail").innerHTML = "Email is required";
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        document.getElementById("errorEmail").innerHTML = "Please enter a valid email address";
        isValid = false;
    } else {
        document.getElementById("errorEmail").innerHTML = "";
    }

    // Validate Subject
    if (subjectInput.value.trim() === "") {
        document.getElementById("errorSubject").innerHTML = "Subject is required";
        isValid = false;
    } else if (subjectInput.value.length < 10) {
        document.getElementById("errorSubject").innerHTML = "Subject should have at least 10 characters";
        isValid = false;
    } else {
        document.getElementById("errorSubject").innerHTML = "";
    }

    // Validate Message
    if (messageInput.value.trim() === "") {
        document.getElementById("errorMessage").innerHTML = "Message is required";
        isValid = false;
    } else if (messageInput.value.length < 10) {
        document.getElementById("errorMessage").innerHTML = "Message should have at least 10 characters";
        isValid = false;
    } else {
        document.getElementById("errorMessage").innerHTML = "";
    }

    return isValid;
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validateForm()) {
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        result.innerHTML = "Please wait...";

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.innerHTML = "Form submitted successfully";
                } else {
                    console.log(response);
                    result.innerHTML = json.message;
                }
            })
            .catch(error => {
                console.log(error);
                result.innerHTML = "Something went wrong!";
            })
            .then(function () {
                form.reset();
                setTimeout(() => {
                    result.style.display = "none";
                }, 3000);
            });
    }
});
