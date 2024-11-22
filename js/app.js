import { createPerson } from "./person";

const isOtherGenderSelected = false;


export function handleSubmitDetails() {
    const personalDetails = fetchFormInputs();

    createPerson(personalDetails);
}

function fetchFormInputs() {
    return formInputs = {
        fullName: document.getElementById("fullName").value,
        gender: isOtherGenderSelected
            ? document.getElementById("otherGender").value
            : document.getElementById("gender").value,
        birthDate: document.getElementById("birthdate").value,
        age: document.getElementById("age").value,
        occupation: document.getElementById("occupation").value,
    };
}

