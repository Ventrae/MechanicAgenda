export default class User {
    name: string;
    password: string;
    isOwner: boolean;
    constructor(name: string, password: string, isOwner: boolean) {
        this.name = name;
        this.password = password;
        this.isOwner = isOwner;
    }
}
