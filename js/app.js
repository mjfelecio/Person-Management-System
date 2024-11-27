import { PersonManager } from "./personManager.js";

let isOtherGenderSelected;
let isOtherGenderSelectedOnModal;
const manager = new PersonManager();

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
    const personID = modalBody.dataset.editingPersonID;

    const updatedData = {
        fullName: document.querySelector("#modalBody #fullName").value,
        gender: isOtherGenderSelectedOnModal
            ? document.querySelector("#modalBody #otherGender").value
            : document.querySelector("#modalBody #gender").value,
        birthDay: document.querySelector("#modalBody #birthDay").value,
        occupation: document.querySelector("#modalBody #occupation").value,
    };

    try {
        const updatedPerson = manager.updatePerson(personID, updatedData);
        editPersonDataOnTable(personID, updatedPerson.getDetails());

        const editModal = bootstrap.Modal.getInstance(
            document.getElementById("editModal")
        );
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

function getFormInputs() {
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

function editPersonDataOnTable(personID, updatedData) {
    // Find the specific row with the matching personID
    const targetRow = document.querySelector(
        `tr[data-row-reference-id="${personID}"]`
    );
    console.log(personID + " ha");

    if (!targetRow) {
        console.error("Row not found");
        return;
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

function openEditModal(personID) {
    const editCard = initializeEditCard(); // Prepare the editCard before inserting it into the modal
    const populatedEditCard = populateEditForm(editCard, personID); // Fills the form inside the card with the persons details

    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = "";

    modalBody.dataset.editingPersonID = personID;

    modalBody.appendChild(populatedEditCard);

    const editModal = new bootstrap.Modal(document.getElementById("editModal"));
    editModal.show();
}

function initializeEditCard() {
    const inputDetailsCard = document.getElementById("inputDetailsCard");
    const editCard = inputDetailsCard.cloneNode(true);
    const genderSelector = editCard.querySelector("#gender");
    const otherGenderContainerInModal = editCard.querySelector(
        "#otherGenderContainer"
    );
    const otherGenderInputInModal = editCard.querySelector("#otherGender");
    const inputForm = editCard.querySelector("#inputForm");

    inputForm.reset(); // Clear the cloned form inputs
    inputForm.addEventListener("submit", (e) => e.preventDefault()); // Prevent the form refreshing the page

    editCard.classList.value = ""; // Clear the classlist to remove bootstrap classes

    // Hide unnecessary elements
    editCard.querySelector("#detailsCardHeader").style.display = "none";
    editCard.querySelector("#headerSeparator").style.display = "none";
    editCard.querySelector("#submitButton").style.display = "none";

    genderSelector.addEventListener("change", (e) => {
        if (e.target.value === "other") {
            otherGenderContainerInModal.style.display = "block";
            otherGenderInputInModal.setAttribute("required", true);
            isOtherGenderSelectedOnModal = true;
        } else {
            otherGenderContainerInModal.style.display = "none";
            otherGenderInputInModal.removeAttribute("required");
            isOtherGenderSelectedOnModal = false;
        }
    });

    return editCard;
}

function populateEditForm(editCard, personID) {
    const form = editCard.querySelector("#inputForm");
    const otherGenderInput = form.querySelector("#otherGender");

    try {
        const person = manager.getPerson(personID);
        const { fullName, gender, birthDay, age, occupation } =
            person.getDetails();
        let selectedGender;

        if (gender === "male") {
            selectedGender = "male";
        } else if (gender === "female") {
            selectedGender = "female";
        } else {
            selectedGender = "other";
            otherGenderInput.value = gender;
        }

        form.querySelector("#fullName").value = fullName;
        form.querySelector("#birthDay").value = birthDay;
        form.querySelector("#occupation").value = occupation;
        form.querySelector("#gender").value = selectedGender;

        return editCard;
    } catch (error) {
        console.error("Error populating form:", error.message);
        return editCard;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("inputForm").addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form submission refreshing the page because its annoying

        // Use the built in validity functions to check validity of the inputs in form
        if (!inputForm.checkValidity()) {
            inputForm.reportValidity(); // Shows validation errors in the UI
            return;
        }

        handleCreatePerson();
    });

    document.getElementById("gender").addEventListener("change", (e) => {
        const otherGenderContainer = document.getElementById(
            "otherGenderContainer"
        );
        const otherGenderInput = document.getElementById("otherGender");

        if (e.target.value === "other") {
            otherGenderContainer.style.display = "block";
            otherGenderInput.setAttribute("required", true);
            isOtherGenderSelected = true;
        } else {
            otherGenderContainer.style.display = "none";
            otherGenderInput.removeAttribute("required");
            isOtherGenderSelected = false;
        }
    });

    document
        .getElementById("submitEditButton")
        .addEventListener("click", (e) => {
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
