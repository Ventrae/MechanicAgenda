import Transaction from "@/models/Transaction";

export default class User {
    id: string;
    name: string;
    password: string;
    isOwner: boolean;
    transactions: Array<Transaction>;

    constructor(id: string, name: string, password: string, isOwner: boolean, transactions: Array<Transaction>) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.isOwner = isOwner;
        this.transactions = transactions;
    }
}
