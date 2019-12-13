export default class Client {
    name: string;
    surname: string;
    email: string;
    phone: string;

    constructor(name: string, surname: string, email: string, phone: string) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
    }
}
