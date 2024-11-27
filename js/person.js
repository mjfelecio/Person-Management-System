export class Person {
    #id;
    #fullName;
    #gender;
    #birthDay;
    #age;
    #occupation;

    constructor(personalDetails) {
        const { fullName, gender, birthDay, age, occupation } = personalDetails;
        this.#id = Person.generateID(personalDetails);
        this.#fullName = fullName;
        this.#gender = gender;
        this.#birthDay = birthDay;
        this.#age = age;
        this.#occupation = occupation;
    }

    // Getters
    get id() { return this.#id; }
    get fullName() { return this.#fullName; }
    get gender() { return this.#gender; }
    get birthDay() { return this.#birthDay; }
    get age() { return this.#age; }
    get occupation() { return this.#occupation; }

    // Update method
    update(personalDetails) {
        const { fullName, gender, birthDay, age, occupation } = personalDetails;
        this.#fullName = fullName;
        this.#gender = gender;
        this.#birthDay = birthDay;
        this.#age = age;
        this.#occupation = occupation;
    }

    // Get all details as an object
    getDetails() {
        return {
            id: this.#id,
            fullName: this.#fullName,
            gender: this.#gender,
            birthDay: this.#birthDay,
            age: this.#age,
            occupation: this.#occupation
        };
    }

    // Static method for ID generation
    static generateID(personalDetails) {
        const { fullName, gender, birthDay, age, occupation } = personalDetails;
        const combinedString = `${fullName}${gender}${birthDay}${age}${occupation}`;
        let hash = 0;
        for (let i = 0; i < combinedString.length; i++) {
            const charCode = combinedString.charCodeAt(i);
            hash = (hash << 5) - hash + charCode;
            hash = hash & hash;
        }
        return Math.abs(hash).toString();
    }
}