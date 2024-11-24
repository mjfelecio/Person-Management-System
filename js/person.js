
let personList = new Map;
let person;

export function createPerson(personalDetails) {
    const { fullName, gender, birthDay, age, occupation } = personalDetails;
    person = { fullName, gender, birthDay, age, occupation };

    const personID = generateUniqueID(person);
    addPersonToList(personID, person);
}

export function editPerson(personalDetails) {
    const { fullName, gender, birthDay, age, occupation } = personalDetails;
    person.fullName = fullName;
    person.gender = gender;
    person.birthDay = birthDay;
    person.age = age;
    person.occupation = occupation;
}   

export function deletePerson() {
    person = null;
}

export function getPersonalDetails() {
    return person;
}

export function addPersonToList(personID, person) {
    if (!personList.has(personID)) {
        personList.set(personID, person);
        console.log(personList);
    } else {
        console.log("That person is already in the list.");
    }
}

export function isPersonOnList(person) {
    const personID = generateUniqueID(person);

    return personList.has(personID);
}

export function generateUniqueID(person) {
    const { fullName, gender, birthDay, age, occupation } = person;

    const combinedString = `${fullName}${gender}${birthDay}${age}${occupation}`;

    // A simple hash function I stole from geeksforgeeks
    let hash = 0;
    for (let i = 0; i < combinedString.length; i++) {
        const charCode = combinedString.charCodeAt(i);
        hash = (hash << 5) - hash + charCode;
        hash = hash & hash;
    }

    return Math.abs(hash).toString(); // Ensure positive value and return as string
}