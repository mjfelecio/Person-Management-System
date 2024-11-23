
let personList;
let person;

export function createPerson(personalDetails) {
    const { fullName, gender, birthDay, age, occupation } = personalDetails;
    person = { fullName, gender, birthDay, age, occupation };
    console.log(person);
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
