// ==================================
//  User Feedback Functions
// ==================================

// Function to create success alert
function createSuccessAlert(message) {
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert alert-success alert-dismissible fade show";
    alertDiv.setAttribute("role", "alert");

    const content = `
        <div class="d-flex align-items-center gap-3">
            <i class="fas fa-check-circle fs-4"></i>
            <div>${message}</div>
            <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    alertDiv.innerHTML = content;
    return alertDiv;
}

// Function to create danger alert
function createDangerAlert(title, message) {
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert alert-danger alert-dismissible fade show";
    alertDiv.setAttribute("role", "alert");

    const content = `
        <div class="d-flex align-items-start gap-3">
            <i class="fas fa-exclamation-circle fs-4"></i>
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
    }, 5000);
}

// ==================================
//  Validation Functions
// ==================================

export function validateForm(formData) {
    return (
        validateName(formData.fullName) &&
        validateGender(formData.gender) &&
        validateBirthday(formData.birthDay) &&
        validateOccupation(formData.occupation)
    );
}

// Validate full name
function validateName(name) {
    let errorMessage;
    let isValid = true;

    if (!name || name.trim().length === 0) {
        throw new Error("Name is required");
        isValid = false;
    }

    // Check if name contains only letters, spaces, and common special characters
    const nameRegex = /^[a-zA-Z\s.\-']+$/;
    if (!nameRegex.test(name)) {
        throw new Error("Name contains invalid characters");
    }
    showAlert();

    return isValid;
}

// Validate gender
function validateGender(gender) {
    if (!gender || gender.trim().length === 0) {
        throw new Error("Gender is required");
    }

    // If it's "Other", any non-empty string is valid
    if (gender === "Other") {
        return true;
    }

    // For preset options, check if it's one of the valid values
    const validGenders = ["Male", "Female"];
    if (!validGenders.includes(gender)) {
        throw new Error("Invalid gender selection");
    }
}

// Validate birthday
function validateBirthday(birthday) {
    if (!birthday) {
        throw new Error("Birthday is required");
    }

    const birthDate = new Date(birthday);
    const today = new Date();

    if (isNaN(birthDate.getTime())) {
        throw new Error("Invalid date format");
    }

    if (birthDate > today) {
        throw new Error("Birthday cannot be in the future");
    }

    // Basic age validation (0-150 years)
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age > 150 || age < 0) {
        throw new Error("Invalid age range");
    }
}

// Validate occupation
function validateOccupation(occupation) {
    if (!occupation || occupation.trim().length === 0) {
        throw new Error("Occupation is required");
    }

    // Check if occupation contains only letters, numbers, spaces, and common special characters
    const occupationRegex = /^[a-zA-Z0-9\s\-&()]+$/;
    if (!occupationRegex.test(occupation)) {
        throw new Error("Occupation contains invalid characters");
    }
}
