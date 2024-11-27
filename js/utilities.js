let isOtherGenderSelected;
let isOtherGenderSelectedOnModal;

export function getUpdatedData() {
    return {
        fullName: document.querySelector("#modalBody #fullName").value,
        gender: isOtherGenderSelectedOnModal
            ? document.querySelector("#modalBody #otherGender").value
            : document.querySelector("#modalBody #gender").value,
        birthDay: document.querySelector("#modalBody #birthDay").value,
        occupation: document.querySelector("#modalBody #occupation").value,
    };
}

export function getFormInputs() {
    // validate this using validateFormInput before returning
    return {
        fullName: document.getElementById("fullName").value.trim(),
        gender: isOtherGenderSelected
            ? document.getElementById("otherGender").value.trim()
            : document.getElementById("gender").value.trim(),
        birthDay: document.getElementById("birthDay").value.trim(),
        occupation: document.getElementById("occupation").value.trim(),
    };
}