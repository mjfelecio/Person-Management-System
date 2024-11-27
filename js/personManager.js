import { Person } from "./person.js";

export class PersonManager {
    #persons = new Map();

    // Create and add a new person
    createPerson(personalDetails) {
        const person = new Person(personalDetails);
        if (!this.isPersonInList(personalDetails)) {
            this.#persons.set(person.id, person);
            return person;
        }
        throw new Error("This person already exists in the list.");
    }

    // Get a person by their ID
    getPerson(id) {
        const person = this.#persons.get(id);
        if (!person) {
            throw new Error("Person not found");
        }
        return person;
    }

    // Update existing person
    updatePerson(id, personalDetails) {
        const person = this.getPerson(id);
        person.update(personalDetails);
        return person;
    }

    // Delete a person
    deletePerson(id) {
        if (!this.#persons.has(id)) {
            throw new Error("Person not found");
        }
        return this.#persons.delete(id);
    }

    // Check if a person exists
    isPersonInList(personalDetails) {
        const id = Person.generateID(personalDetails);
        return this.#persons.has(id);
    }

    // Get all persons
    getAllPersons() {
        return Array.from(this.#persons.values());
    }

    // Get count of persons
    get count() {
        return this.#persons.size;
    }
}
