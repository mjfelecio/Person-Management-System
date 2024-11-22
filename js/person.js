
let personList;
let person;

export function createPerson(fullName, gender, birthDay, age, occupation) {
    person = { fullName, gender, birthDay, age, occupation };
}

export function editPerson(name, gender, birthDay, age, occupation) {
    person.fullName = name;
    person.gender = gender;
    person.birthDay = birthDay;
    person.age = age;
    person.occupation = occupation;
}   

export function deletePerson() {
    person = null;
}
