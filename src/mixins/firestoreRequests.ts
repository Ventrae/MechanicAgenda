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
        getTransactions: async function () {
            let y: Transaction[] = [];
            return await firestore.collection("Transactions")
                .get()
                .then((transactions) => {
                    transactions.forEach((transaction) => {

                        // let services:any = async () => {
                        //     return await firestore.collection('Services')
                        //         .doc(transaction.data().services).get()
                        //         .then(services=>{
                        //             return services;
                        //         })
                        // };
                        // services = services().then(s => {
                        //     services = s;
                        // });

                        let services = [];
                        let car = new Car("","","","");
                        let user = new User("","","",false,[]);

                        let client = async () => {
                            return await firestore.collection('Clients')
                                .doc(transaction.data().client).get()
                                .then(client => {
                                    client.data();
                                })
                        };

                        // let car:any = async () => {
                        //     return await firestore.collection('Cars')
                        //         .doc(transaction.data().car).get()
                        //         .then(car => {
                        //             return car;
                        //         })
                        // };
                        // car = car().then(c => {
                        //     car = c;
                        // });
                        // let user:any = async () => {
                        //     return await firestore.collection('Users')
                        //         .doc(transaction.data().user).get()
                        //         .then(user => {
                        //             return user;
                        //         })
                        // };
                        // user = user().then(u => {
                        //     user = u;
                        // });

                        let x = new Transaction(
                            transaction.id,
                            transaction.data().name,
                            transaction.data().date,
                            transaction.data().comment,
                            services,
                            new Client(client().id, client().name, client().surname, client().email, client().phone),
                            car,
                            transaction.data().token,
                            user,
                            transaction.data().total
                        );
                        y.push(x);

                        // Promise.all([client]).then(value => {
                        //
                        // });

                    });
                    y.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    return y;
                });
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
