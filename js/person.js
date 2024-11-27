export class Person {
    #id;
    #fullName;
    #gender;
    #birthDay;
    #age;
    #occupation;

    constructor(personalDetails) {
        const { fullName, gender, birthDay, occupation } = personalDetails;
        this.#id = Person.generateID(personalDetails);
        this.#fullName = fullName;
        this.#gender = gender;
        this.#birthDay = birthDay;
        this.#age = Person.calculateAge(birthDay);
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
        const { fullName, gender, birthDay, occupation } = personalDetails;
        this.#fullName = fullName;
        this.#gender = gender;
        this.#birthDay = birthDay;
        this.#age = Person.calculateAge(birthDay);
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
            occupation: this.#occupation,
        };
    }

    // Calculate the age based on the birthday
    static calculateAge(dateInput) {
        // Input validation
        if (!dateInput) {
            throw new Error("Date input is required");
        }

        // Parse the date, return the string if it is a date object, if not, create a new date object
        const birthDate = dateInput instanceof Date ? dateInput : new Date(dateInput);

        // Validate parsed date
        if (isNaN(birthDate.getTime())) {
            throw new Error("Invalid date format");
        }

        // Validate date is not in the future
        const today = new Date();
        if (birthDate > today) {
            throw new Error("Birth date cannot be in the future");
        }

        // Calculate age
        let age = today.getFullYear() - birthDate.getFullYear();

        // Validate if birthday has occurred
        const birthMonth = birthDate.getMonth();
        const birthDay = birthDate.getDate();
        const hasBirthdayOccurred =
            today.getMonth() > birthMonth || (today.getMonth() === birthMonth && today.getDate() >= birthDay);

        // Adjust age if birthday hasn't occurred this year
        if (!hasBirthdayOccurred) {
            age--;
        }

        // Validate calculated age is reasonable
        if (age > 150) {
            throw new Error("Calculated age exceeds maximum reasonable age");
        }

        return age;
    }

    // Generate a unique hash for each person
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
