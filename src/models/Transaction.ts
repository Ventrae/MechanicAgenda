import Car from "@/models/Car";
import Client from "@/models/Client";
import Service from "@/models/Service";
import User from "@/models/User";

export default class Transaction {

    id: string;
    name: string;
    date: string;
    comment: string;
    services: Array<Service>;
    client: Client;
    car: Car;
    token: string;
    user: User;
    total: number;

    constructor(id: string, name: string, date: string, comment: string, services: Array<Service>, client: Client, car: Car, token: string, user: User, total: number) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.comment = comment;
        this.services = services;
        this.client = client;
        this.car = car;
        this.token = token;
        this.user = user;
        this.total = total;
    }

}
