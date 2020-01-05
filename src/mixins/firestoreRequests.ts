import Transaction from "@/models/Transaction";
import User from "@/models/User";
import Service from "@/models/Service";
import Client from "@/models/Client";
import Car from "@/models/Car";
import {firestore} from "@/main";
import {arrayTools} from "@/mixins/arrayTools";

export const firestoreRequests = {
    mixins: [ arrayTools ],
    methods: {
        getTransactions(): Array<Transaction> {
            let y: Transaction[] = [];
            firestore.collection("Transactions")
                .get()
                .then((transactions) => {
                    transactions.forEach((transaction) => {

                        let services = [];
                        transaction.data().services.forEach(s => {
                            firestore.doc(s.path).get().then(service_data => {
                                let service = new Service(
                                    service_data.id,
                                    service_data.data().description,
                                    service_data.data().price
                                );
                                services.push(service)
                            });
                        });

                        /*
                        let client = null;
                        firestore.doc(transaction.data().client.path).get().then(client_data => {
                            console.log(client_data);
                            client = new Client(
                                client_data.id,
                                client_data.data().name,
                                client_data.data().surname,
                                client_data.data().email,
                                client_data.data().phone,
                            );
                        });
                        */

                        let client = new Client(
                            'mock-client-id',
                            'mock-client-name',
                            'mock-client-surname',
                            'mock-client-email',
                            'mock-client-phone'
                        );

                        let x = new Transaction(
                            transaction.id,
                            transaction.data().name,
                            transaction.data().date,
                            transaction.data().comment,
                            services,
                            client,
                            new Car('mockid', "Mock", "Car", "GS12345"),
                            transaction.data().token,
                            new User('mockid', 'mockname', 'mockpass', false, []),
                            transaction.data().total
                        );

                        y.push(x);

                    });

                    y.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    return y;

                });
            return y;
        },
        getUsers():Array<User> {
            let y:User[] = [];
            firestore.collection("Users")
                .get()
                .then((users)=>{
                    users.forEach((user)=>{
                        let x = new User(
                            user.id,
                            user.data().name,
                            user.data().password,
                            user.data().isOwner,
                            user.data().transactions
                        );
                        y.push(x);
                    });
                    y.sort((a,b)=>(a.name > b.name) ? 1 : -1);
                    return y;
                });
            return y;
        },
        getCars():Array<Car>{
            let y:Car[] = [];
            firestore.collection("Cars")
                .get()
                .then((cars)=>{
                    cars.forEach((car)=>{
                        let x = new Car(
                            car.id,
                            car.data().brand,
                            car.data().model,
                            car.data().plates
                        );
                        y.push(x);
                    });
                    y.sort((a,b)=>(a.brand > b.brand) ? 1 : -1);
                    return y;
                });
            return y;
        },
        getClients():Array<Client>{
            let y:Client[] = [];
            firestore.collection("Clients")
                .get()
                .then((clients)=>{
                    clients.forEach((client)=>{
                        let x = new Client(
                            client.id,
                            client.data().name,
                            client.data().surname,
                            client.data().email,
                            client.data().phone
                        );
                        y.push(x);
                    });
                    y.sort((a,b)=>(a.surname > b.surname) ? 1 : -1);
                    return y;
                });
            return y;
        },
        getServices():Array<Service>{
            let y:Service[] = [];
            firestore.collection("Services")
                .get()
                .then((services)=>{
                    services.forEach((service)=>{
                        let x = new Service(
                            service.id,
                            service.data().description,
                            service.data().price,
                        );
                        y.push(x);
                    });
                    y.sort((a,b)=>(a.description > b.description) ? 1 : -1);
                    return y;
                });
            return y;
        },
        getOneTransaction(id: string){
            return this.getItemById(this.$store.state.transactions, id);
        },
        getOneUser(id: string){
            return this.getItemById(this.$store.state.users, id);
        },
        getOneCar(id: string){
            return this.getItemById(this.$store.state.cars, id);
        },
        getOneClient(id: string){
            return this.getItemById(this.$store.state.clients, id);
        },
        getOneService(id: string){
            return this.getItemById(this.$store.state.allServices, id);
        }
    }
};