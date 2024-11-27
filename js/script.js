import { PersonManager } from "./personManager.js";

const manager = new PersonManager();

// ==================================
//  Main Functions
// ==================================

function handleCreatePerson() {
    const personalDetails = getFormInputs();

    try {
        const person = manager.createPerson(personalDetails);
        addPersonToTable(person.getDetails());
        document.getElementById("inputForm").reset();
    } catch (error) {
        console.error("Error creating person:", error.message); //TODO: Show this to the UI later
    }
}

function handleEditPerson() {
    const modalBody = document.getElementById("modalBody");
    const personID = modalBody.dataset.editingPersonID; // Gets the id of the person getting edited 

    const updatedData = getUpdatedData();

    try {
        const updatedPerson = manager.updatePerson(personID, updatedData);
        refreshTableData(personID, updatedPerson.getDetails());

        const editModal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
        editModal.hide();
    } catch (error) {
        console.error("Error updating person:", error.message);
    }
}

function handleDeletePerson(personID) {
    try {
        manager.deletePerson(personID);
        const row = document.querySelector(`tr[data-row-reference-id="${personID}"]`);
        if (row) {
            row.remove();
        }
    } catch (error) {
        console.error("Error deleting person:", error.message);
    }
}

// ==================================
//  Form Functions
// ==================================

function getFormInputs() {
    return {
        fullName: document.getElementById("fullName").value.trim(),
        gender: document.getElementById("gender").value === "Other"
            ? document.getElementById("otherGender").value.trim()
            : document.getElementById("gender").value.trim(),
        birthDay: document.getElementById("birthDay").value.trim(),
        occupation: document.getElementById("occupation").value.trim(),
    };
}

function getUpdatedData() {
    return {
        fullName: document.querySelector("#modalBody #fullName").value,
        gender: document.querySelector("#modalBody #gender").value === "Other"
            ? document.querySelector("#modalBody #otherGender").value
            : document.querySelector("#modalBody #gender").value,
        birthDay: document.querySelector("#modalBody #birthDay").value,
        occupation: document.querySelector("#modalBody #occupation").value,
    };
}

// ==================================
//  Modal Functions
// ==================================

function openEditModal(personID) {
    const modalBody = document.getElementById("modalBody");
    const editCard = initializeEditCard(personID); // Prepare the editCard before inserting it into the modal

    modalBody.innerHTML = "";
    modalBody.dataset.editingPersonID = personID; // Stores the id of the person getting edited
    modalBody.appendChild(editCard);

    const editModal = new bootstrap.Modal(document.getElementById("editModal"));
    editModal.show();
}

function initializeEditCard(personID) {
    const inputDetailsCard = document.getElementById("inputDetailsCard");
    const editCard = inputDetailsCard.cloneNode(true);

    const editForm = editCard.querySelector("#inputForm");
    populateEditForm(editForm, personID); // Fills the form inside the card with the persons details

    setupGenderSelectorOnModal(editCard);
    
    // Hide unnecessary elements
    editCard.className = ""; // Clear the classlist to remove bootstrap classes
    editCard.querySelector("#detailsCardHeader").style.display = "none";
    editCard.querySelector("#headerSeparator").style.display = "none";
    editCard.querySelector("#submitButton").style.display = "none";

    return editCard;
}

function populateEditForm(editForm, personID) {
    try {
        const person = manager.getPerson(personID);
        if (!person) throw new Error(`Person with ID ${personID} not found.`);

        const { fullName, gender, birthDay, occupation } = person.getDetails();
        const otherGenderInput = editForm.querySelector("#otherGender");

        editForm.reset();
        editForm.addEventListener("submit", (e) => e.preventDefault());

        // Populate form fields
        editForm.querySelector("#fullName").value = fullName || "";
        editForm.querySelector("#birthDay").value = birthDay || "";
        editForm.querySelector("#occupation").value = occupation || "";
        editForm.querySelector("#gender").value = gender === "Male" || gender === "Female" ? gender : "Other";

        // If gender is "Other," show the other input
        if (gender !== "Male" && gender !== "Female") {
            if (otherGenderInput) {
                otherGenderInput.value = gender;
                otherGenderInput.style.display = "block";
            }
        }
    } catch (error) {
        console.error("Error populating form:", error.message);
    }
}

function setupGenderSelectorOnModal(editCard) {
    const genderSelector = editCard.querySelector("#gender");
    const otherGenderContainer = editCard.querySelector("#otherGenderContainer");
    const otherGender = editCard.querySelector("#otherGender");

    genderSelector.addEventListener("change", (e) => {
        if (e.target.value === "Other") {
            otherGenderContainer.style.display = "block";
            otherGender.setAttribute("required", true);
        } else {
            otherGenderContainer.style.display = "none";
            otherGender.removeAttribute("required");
        }
    });
}

// ==================================
//  Table Functions
// ==================================

function addPersonToTable(personDetails) {
    const { id, fullName, gender, birthDay, age, occupation } = personDetails;
    const tableBody = document.getElementById("tableBody");

    let row = tableBody.innerHTML;
    row += `<tr class="t-row" data-row-reference-id="${id}">
        <td class="align-middle">${fullName}</td>
        <td class="align-middle">${gender}</td>
        <td class="align-middle">${birthDay}</td>
        <td class="align-middle">${age}</td>
        <td class="align-middle">${occupation}</td>
        <td class="align-middle">
            <button class="editButton btn btn-primary btn-sm" data-person-id="${id}">&nbsp;&nbsp;Edit&nbsp;&nbsp;</button>
            <button class="deleteButton btn btn-danger btn-sm" data-person-id="${id}">Delete</button>
        </td>
    </tr>`;
    tableBody.innerHTML = row;
    attachActionButtonHandlers();
}

function refreshTableData(personID, updatedData) {
    // Find the specific row with the matching personID
    const targetRow = document.querySelector(`tr[data-row-reference-id="${personID}"]`);

    if (!targetRow) {
        throw new Error("Could not find the person's row in the table");
    }

    if (!updatedData) {
        throw new Error("No update data provided");
    }
    // Get all data cells (except the actions cell with the edit and delete buttons)
    const cells = targetRow.querySelectorAll("td:not(:last-child)");

    // Map the data to match the order of cells
    const newValues = [
        updatedData.fullName,
        updatedData.gender,
        updatedData.birthDay,
        updatedData.age,
        updatedData.occupation,
    ];

    // Update each cell's content
    cells.forEach((cell, index) => {
        cell.textContent = newValues[index];
    });
}

// ==================================
//  Event Handlers
// ==================================

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("inputForm").addEventListener("submit", (e) => {
        e.preventDefault();

        // Use the built in validity functions to check validity of the inputs in form
        if (!inputForm.checkValidity()) {
            inputForm.reportValidity(); // Shows validation errors in the UI
            return;
        }
        handleCreatePerson();
    });

    document.getElementById("gender").addEventListener("change", (e) => {
        const otherGenderContainer = document.getElementById("otherGenderContainer");
        const otherGenderInput = document.getElementById("otherGender");

        if (e.target.value === "Other") {
            otherGenderContainer.style.display = "block";
            otherGenderInput.setAttribute("required", true);
            isOtherGenderSelected = true;
        } else {
            otherGenderContainer.style.display = "none";
            otherGenderInput.removeAttribute("required");
            isOtherGenderSelected = false;
        }
    });

    document.getElementById("submitEditButton").addEventListener("click", (e) => {
        e.preventDefault();
        handleEditPerson();
    });
});

function attachActionButtonHandlers() {
    document.querySelectorAll(".editButton").forEach((button) => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            let personID = this.dataset.personId;

            openEditModal(personID);
        });
    });

    document.querySelectorAll(".deleteButton").forEach((button) => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            let personID = this.dataset.personId;

            handleDeletePerson(personID);
        });
    });
}
