import { createPerson } from "./person.js";

let isOtherGenderSelected;


export function handleSubmitDetails() {
    const personalDetails = fetchFormInputs();

    createPerson(personalDetails);
}

function fetchFormInputs() {
    return {
        fullName: document.getElementById("fullName").value,
        gender: isOtherGenderSelected
            ? document.getElementById("otherGender").value
            : document.getElementById("gender").value,
        birthDay: document.getElementById("birthDay").value,
        age: document.getElementById("age").value,
        occupation: document.getElementById("occupation").value,
    };
}

// 
document.getElementById("gender").addEventListener("change", (e) => {
    const otherGenderField = document.getElementById("otherGenderField");
    const otherGenderInput = document.getElementById("otherGender");

    if (e.target.value === "other") {
        otherGenderField.style.display = "block";
        otherGenderInput.setAttribute("required", true);
        isOtherGenderSelected = true;
    } else {
        otherGenderField.style.display = "none";
        otherGenderInput.removeAttribute("required");
        isOtherGenderSelected = false;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const inputForm = document.getElementById("inputForm");
    inputForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form submission refreshing the page because its annoying

        // Use the built in validity functions to check validity of the inputs in form
        if (!inputForm.checkValidity()) {
            inputForm.reportValidity(); // Shows validation errors in the UI
            return;
        }

        handleSubmitDetails();
    });

});