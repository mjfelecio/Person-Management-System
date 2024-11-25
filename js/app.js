import {
    createPerson,
    generateUniqueID,
    getPersonalDetails,
    getPersonByID,
    isPersonOnList,
} from "./person.js";

let isOtherGenderSelected;

function handleCreatePerson() {
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
        <td class="align-middle">${fullName}</td>
        <td class="align-middle">${gender}</td>
        <td class="align-middle">${birthDay}</td>
        <td class="align-middle">${age}</td>
        <td class="align-middle">${occupation}</td>
        <td class="align-middle">
            <button class="editButton btn btn-primary btn-sm" data-person-id="${personID}">&nbsp;&nbsp;Edit&nbsp;&nbsp;</button>
            <button class="deleteButton btn btn-danger btn-sm" data-person-id="${personID}">Delete</button>
        </td>
    </tr>`;
    tableBody.innerHTML = row;
    attachButtonHandlers();
}

function openEditModal(personID) {
    const editCard = initializeEditCard(); // Prepare the editCard before inserting it into the modal
    const populatedEditCard = populateEditForm(editCard, personID); // Fills the form inside the card with the persons details

    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = "";
    modalBody.appendChild(populatedEditCard);

    const editModal = new bootstrap.Modal(document.getElementById("editModal"));
    editModal.show();
}

function initializeEditCard() {
    const inputDetailsCard = document.getElementById("inputDetailsCard");
    const editCard = inputDetailsCard.cloneNode(true);
    const genderSelector = editCard.querySelector("#gender");
    const otherGenderContainerInModal = editCard.querySelector("#otherGenderContainer");
    const otherGenderInputInModal = editCard.querySelector("#otherGender");
    let isOtherGenderSelected;

    editCard.querySelector("#inputForm").reset(); // Clear the cloned form inputs
    editCard.classList.value = ""; // Clear the classlist to remove bootstrap classes

    // Hide unnecessary elements
    editCard.querySelector("#detailsCardHeader").style.display = "none";
    editCard.querySelector("#headerSeparator").style.display = "none";
    editCard.querySelector("#submitButton").style.display = "none";

    genderSelector.addEventListener("change", (e) => {
        if (e.target.value === "other") {
            otherGenderContainerInModal.style.display = "block";
            otherGenderInputInModal.setAttribute("required", true);
            isOtherGenderSelected = true;
        } else {
            otherGenderContainerInModal.style.display = "none";
            otherGenderInputInModal.removeAttribute("required");
            isOtherGenderSelected = false;
        }
    });

    return editCard;
}

function populateEditForm(editCard, personID) {
    const form = editCard.querySelector("#inputForm");
    const otherGenderInput = form.querySelector("#otherGender");
    const { fullName, gender, birthDay, age, occupation } = getPersonByID(personID);
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
    form.querySelector("#age").value = age;
    form.querySelector("#occupation").value = occupation;
    form.querySelector("#gender").value = selectedGender;

    return editCard;
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
        const otherGenderContainer = document.getElementById("otherGenderContainer");
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
});

function attachButtonHandlers() {
    document.querySelectorAll(".editButton").forEach((button) => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            let personID = this.dataset.personId;

            openEditModal(personID);
        });
    });
}
