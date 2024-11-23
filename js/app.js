import { createPerson, getPersonalDetails } from "./person.js";

let isOtherGenderSelected;

export function handleSubmitDetails() {
    const personalDetails = getFormInputs();

    // validateInputs();

    createPerson(personalDetails);
    addPersonToTable();
}

function getFormInputs() {
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

function addPersonToTable() {
    const { fullName, gender, birthDay, age, occupation } = getPersonalDetails();
    const tableBody = document.getElementById("tableBody");

    let row = tableBody.innerHTML;
    row += `<tr>
        <td>${fullName}</td>
        <td>${gender}</td>
        <td>${birthDay}</td>
        <td>${age}</td>
        <td>${occupation}</td>
        <td>
            <button class="btn btn-primary"">Edit</button>
            <button class="btn btn-danger">Delete</button>
        </td>
    </tr>`;
    tableBody.innerHTML = row;
}

function generateUniqueID(person) {
    const { fullName, gender, birthDay, age, occupation } = person;

    const combinedString = `${fullName}${gender}${birthDay}${age}${occupation}`;

    // A simple hash function I stole from geeksforgeeks
    let hash = 0;
    for (let i = 0; i < combinedString.length; i++) {
        const charCode = combinedString.charCodeAt(i);
        hash = (hash << 5) - hash + charCode;
        hash = hash & hash;
    }

    return Math.abs(hash).toString(); // Ensure positive value and return as string
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("inputForm").addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form submission refreshing the page because its annoying

        // Use the built in validity functions to check validity of the inputs in form
        if (!inputForm.checkValidity()) {
            inputForm.reportValidity(); // Shows validation errors in the UI
            return;
        }

        handleSubmitDetails();
    });

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
});
