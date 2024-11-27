let isOtherGenderSelected;
let isOtherGenderSelectedOnModal;

export function getFormInputs(isModal = false) {
    if (!isModal) {
        return {
            fullName: document.getElementById("fullName").value.trim(),
            gender: document.getElementById("gender").value === "Other"
                ? document.getElementById("otherGender").value.trim()
                : document.getElementById("gender").value.trim(),
            birthDay: document.getElementById("birthDay").value.trim(),
            occupation: document.getElementById("occupation").value.trim(),
        };
    } else {
        return {
            fullName: document.querySelector("#modalBody #fullName").value,
            gender: document.querySelector("#modalBody #gender").value === "Other"
                ? document.querySelector("#modalBody #otherGender").value
                : document.querySelector("#modalBody #gender").value,
            birthDay: document.querySelector("#modalBody #birthDay").value,
            occupation: document.querySelector("#modalBody #occupation").value,
        };
    }
}
