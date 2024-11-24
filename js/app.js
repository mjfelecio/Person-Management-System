import { createPerson, generateUniqueID, getPersonalDetails, isPersonOnList } from "./person.js";

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
    const { fullName, gender, birthDay, age, occupation } = getPersonalDetails();
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

function handleEditPerson() {
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
    showEditModal();
}

function showEditModal() {
    const inputDetailsCard = document.getElementById("inputDetailsCard");
    const clonedInputCard = inputDetailsCard.cloneNode(true);

    // Modify the cloned card before inserting it into the modal
    clonedInputCard.querySelector("#inputForm").reset(); // Clear the cloned form inputs
    clonedInputCard.classList.value = ""; // Clear the classlist to remove the bootstrap classes
    clonedInputCard.querySelector("#detailsCardHeader").style.display = "none";
    clonedInputCard.querySelector("#headerSeparator").style.display = "none";
    clonedInputCard.querySelector("#submitButton").style.display = "none";

    // Attach the gender change listener to the cloned card
    const clonedGenderField = clonedInputCard.querySelector("#gender");
    const clonedOtherGenderField = clonedInputCard.querySelector("#otherGenderField");
    const clonedOtherGenderInput = clonedInputCard.querySelector("#otherGender");

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

    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = "";
    modalBody.appendChild(clonedInputCard);

    const editModal = new bootstrap.Modal(document.getElementById("editModal"));
    editModal.show();
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
        handleEditPerson();
    });
});
