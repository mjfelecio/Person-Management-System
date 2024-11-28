// ==================================
//  User Feedback Functions
// ==================================

// Function to create success alert
function createSuccessAlert(message) {
    message = "✔&nbsp;" + message;

    const alertDiv = document.createElement("div");
    alertDiv.className = "alert alert-success alert-dismissible fade show";
    alertDiv.setAttribute("role", "alert");

    const content = `
        <div class="d-flex align-items-center gap-3">
            <div>${message}</div>
            <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    alertDiv.innerHTML = content;
    return alertDiv;
}

// Function to create danger alert
function createDangerAlert(title, message) {
    title = "⚠&nbsp;" + title;
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert alert-danger alert-dismissible fade show";
    alertDiv.setAttribute("role", "alert");

    const content = `
        <div class="d-flex align-items-start gap-3">
            <div class="d-flex flex-column">
                ${title ? `<h6 class="mb-1">${title}</h6>` : ""}
                <p class="mb-0">${message}</p>
            </div>
            <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    alertDiv.innerHTML = content;
    return alertDiv;
}

// Function to show alert in a container
export function showAlert(type, message, title = "") {
    const alertElement = type === "success" ? createSuccessAlert(message) : createDangerAlert(title, message);
    const container = document.getElementById("alertContainer");

    // Add the new alert
    container.appendChild(alertElement);

    setTimeout(() => {
        const alert = bootstrap.Alert.getOrCreateInstance(alertElement);
        alert.close();
    }, 3000);
}

// ==================================
//  Validation Functions
// ==================================

export function validateForm(formData) {
    const isNameValid = validateName(formData.fullName);
    const isGenderValid = validateGender(formData.gender);
    const isBirthdayValid = validateBirthday(formData.birthDay);
    const isOccupationValid = validateOccupation(formData.occupation);

    return isNameValid && isGenderValid && isBirthdayValid && isOccupationValid;
}

// Validate full name
function validateName(name) {
    let errorMessage;

    if (!name || name.trim().length === 0) {
        errorMessage = "Name is required";
    } else {
        const nameRegex = /^[a-zA-Z\s.\-']+$/;
        if (!nameRegex.test(name)) {
            errorMessage = "Name contains invalid characters";
        }
    }

    if (errorMessage) {
        showAlert('error', errorMessage, "Invalid Name");
        return false;
    } else {
        return true;
    }
}

// Validate gender
function validateGender(gender) {
    let errorMessage;

    if (!gender || gender.trim().length === 0 || gender === "Select their gender") {
        errorMessage = "Gender is required";
    } else {
        const otherGenderRegex = /^[a-zA-Z\s.\-']+$/;
        if (!otherGenderRegex.test(gender)) {
            errorMessage = "Gender contains invalid characters";
        }
    }

    if (errorMessage) {
        showAlert('error', errorMessage, "Invalid Gender");
        return false;
    } else {
        return true;
    }
}

// Validate birthday
function validateBirthday(birthday) {
    let errorMessage;

    if (!birthday) {
        errorMessage = "Birthday is required";
    } else {
        const birthDate = new Date(birthday);
        const today = new Date();

        if (isNaN(birthDate.getTime())) {
            errorMessage = "Invalid date format";
        } else if (birthDate > today) {
            errorMessage = "Birthday cannot be in the future";
        } else {
            const age = today.getFullYear() - birthDate.getFullYear();
            if (age < 0 || age > 150) {
                errorMessage = "Invalid age range";
            }
        }
    }

    if (errorMessage) {
        showAlert('error', errorMessage, "Invalid Birthday");
        return false;
    } else {
        return true;
    }
}

// Validate occupation
function validateOccupation(occupation) {
    let errorMessage;

    if (!occupation || occupation.trim().length === 0) {
        errorMessage = "Occupation is required";
    } else {
        const occupationRegex = /^[a-zA-Z0-9\s\-&()]+$/;
        if (!occupationRegex.test(occupation)) {
            errorMessage = "Occupation contains invalid characters";
        }
    }

    if (errorMessage) {
        showAlert('error', errorMessage, "Invalid Occupation");
        return false;
    } else {
        return true;
    }
}

