import {
    createPerson,
    generateUniqueID,
    getPersonalDetails,
    getPersonByID,
    isPersonOnList,
} from "./person.js";

let isOtherGenderSelected;

export function handleSubmitDetails() {
    const personalDetails = getFormInputs();

    // validateInputs();

    if (!isPersonOnList(personalDetails)) {
        createPerson(personalDetails);
        addPersonToTable();
    } else {
        console.log("This person already exists.");
        return;
    }
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
    const { fullName, gender, birthDay, age, occupation } =
        getPersonalDetails();
    const person = getPersonalDetails();
    const personID = generateUniqueID(person);
    const tableBody = document.getElementById("tableBody");

    let row = tableBody.innerHTML;
    row += `<tr>
        <td>${fullName}</td>
        <td>${gender}</td>
        <td>${birthDay}</td>
        <td>${age}</td>
        <td>${occupation}</td>
        <td>
            <button class="btn btn-primary" data-person-id="${personID}">Edit</button>
            <button class="btn btn-danger" data-person-id="${personID}">Delete</button>
        </td>
    </tr>`;
    tableBody.innerHTML = row;
}

function handleEditPerson(personID) {
    /*
        Intended function:
        When I click the edit button it opens an edit modal
        Before that edit modal opens, I fetch the persons details using their personID
        Then I put the detaild into the edit modal
    */
    // Create a new high level function above this named "handleEditPerson" that handles this
    // And rename this function to showEditModal
    // Fetch the persons details
    // Add the details into the modal
    // Show the modal

    const editCard = initializeEditCard(); // Prepare the editCard before inserting it into the modal
    const populatedEditCard = populateEditForm(personID); // Fills the form inside the card with the persons details

    showEditModal();
}

function showEditModal(editCard) {
    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = "";
    modalBody.appendChild(editCard);

    const editModal = new bootstrap.Modal(document.getElementById("editModal"));
    editModal.show();
}

function initializeEditCard() {
    const inputDetailsCard = document.getElementById("inputDetailsCard");
    const editCard = inputDetailsCard.cloneNode(true);
    let isOtherGenderSelected;

    editCard.querySelector("#inputForm").reset(); // Clear the cloned form inputs
    editCard.classList.value = ""; // Clear the classlist to remove bootstrap classes
    editCard.querySelector("#detailsCardHeader").style.display = "none";
    editCard.querySelector("#headerSeparator").style.display = "none";
    editCard.querySelector("#submitButton").style.display = "none";

    const clonedGenderField = editCard.querySelector("#gender");
    const clonedOtherGenderField = editCard.querySelector("#otherGenderField");
    const clonedOtherGenderInput = editCard.querySelector("#otherGender");

    clonedGenderField.addEventListener("change", (e) => {
        if (e.target.value === "other") {
            clonedOtherGenderField.style.display = "block";
            clonedOtherGenderInput.setAttribute("required", true);
            isOtherGenderSelected = true;
        } else {
            clonedOtherGenderField.style.display = "none";
            clonedOtherGenderInput.removeAttribute("required");
            isOtherGenderSelected = false;
        }
    });

    return editCard;
}

function populateEditForm(personID) {
    const form = editCard.querySelector("#inputForm");
    const otherGenderField = form.querySelector("otherGenderField");
    const { fullName, gender, birthDay, age, occupation } =
        getPersonByID(personID);

    form.querySelector("fullName").innerHTML = fullName;
    form.querySelector("birthDay").innerHTML = birthDay;
    form.querySelector("age").innerHTML = age;
    form.querySelector("occupation").innerHTML = occupation;

    let selectedGender;
    if (gender === "male") {
        selectedGender = "male";
    } else if (gender === "female") {
        selectedGender = "female";
    } else {
        selectedGender = "other";
        otherGenderField.innerHTML = gender;
    }

    form.querySelector("gender").value = selectedGender;
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

    document.getElementById("edit-test").addEventListener("click", (e) => {
        let personID = generateUniqueID(getPersonalDetails());
        // let personID = this.dataset.personId;

        handleEditPerson(personID);
    });
});
