// ==================================
//  Validation Functions
// ==================================
// Validate full name
function validateName(name) {
    if (!name || name.trim().length === 0) {
        throw new Error("Name is required");
    }
    
    if (name.trim().length < 2) {
        throw new Error("Name must be at least 2 characters long");
    }

    // Check if name contains only letters, spaces, and common special characters
    const nameRegex = /^[a-zA-Z\s.\-']+$/;
    if (!nameRegex.test(name)) {
        throw new Error("Name contains invalid characters");
    }
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

    if (occupation.trim().length < 2) {
        throw new Error("Occupation must be at least 2 characters long");
    }

    // Check if occupation contains only letters, numbers, spaces, and common special characters
    const occupationRegex = /^[a-zA-Z0-9\s\-&()]+$/;
    if (!occupationRegex.test(occupation)) {
        throw new Error("Occupation contains invalid characters");
    }
}
















// ==================================
//  User Utilities
// ==================================