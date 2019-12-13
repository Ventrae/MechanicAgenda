import Car from "@/models/Car";
import Client from "@/models/Clients";
import Service from "@/models/Service";

export default class Transaction {

    name: string;
    date: string;
    comment: string;
    services: Array<Service>;
    client: Client;
    car: Car;
    token: string;
    total: number;

    constructor(name: string, date: string, comment: string, services: Array<Service>, client: Client, car: Car, token: string, total: number) {
        this.name = name;
        this.date = date;
        this.comment = comment;
        this.services = services;
        this.client = client;
        this.car = car;
        this.token = token;
        this.total = total;
    }

}
