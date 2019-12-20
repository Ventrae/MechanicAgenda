import Transaction from "@/models/Transaction";
import User from "@/models/User";
import Service from "@/models/Service";
import Client from "@/models/Client";
import Car from "@/models/Car";
import {firestore} from "@/main";

export const firestoreRequests = {
    methods: {
        getTransactions():Array<Transaction> {
            let y:Transaction[] = [];
            firestore.collection("Transactions")
                .get()
                .then((transactions)=>{
                    transactions.forEach((transaction)=>{
                        let x = new Transaction(
                            transaction.id,
                            transaction.data().name,
                            transaction.data().date,
                            transaction.data().comment,
                            [
                                new Service('mockid',"To tylko mock serwisów", 1200),
                                new Service('mockid',"Ogarnąć relacje w firestore", 100)
                            ],
                            new Client('mockid',"Mock", "Klienta", "mock@gmail.com", "123456789"),
                            new Car('mockid',"Mock", "Car", "GS12345"),
                            transaction.data().token,
                            new User('mockid', 'mockname', 'mockpass', false, []),
                            transaction.data().total
                        );
                        y.push(x);
                    });
                    y.sort((a,b)=>(a.name > b.name) ? 1 : -1);
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
            let x = null;
            firestore.collection("Transactions").doc(id)
                .get()
                .then((transaction)=>{
                    return new Promise((resolve, reject) =>{
                        if(transaction.exists){
                            x = new Transaction(
                                transaction.id,
                                transaction.data().name,
                                transaction.data().date,
                                transaction.data().comment,
                                [
                                    new Service('mockid',"To tylko mock serwisów", 1200),
                                    new Service('mockid',"Ogarnąć relacje w firestore", 100)
                                ],
                                new Client('mockid',"Mock", "Klienta", "mock@gmail.com", "123456789"),
                                new Car('mockid',"Mock", "Car", "GS12345"),
                                transaction.data().token,
                                new User('mockid', 'mockname', 'mockpass', false, []),
                                transaction.data().total
                            );
                            resolve(x);
                        }
                        else {
                            console.log('Document with this ID doesn\'t exist');
                            x = null;
                            reject(x);
                        }
                    });
                })
                .then(data => {
                        console.log(data);
                        return data;
                    }
                );
        },
        getOneUser(id: string){

        },
        getOneCar(id: string){
            const docRef = firestore.collection("Cars").doc(id);
            var vm = this; //creating the reference to the Vue VM.
            let result = new Car('','', '', '');
            docRef.get().then(
                function(doc){
                    if(doc.exists){
                        console.log(doc.data());
                        let x = new Car(doc.id, doc.data().brand, doc.data().model, doc.data().plates);
                        console.log(x); // x jest ok
                        result = x;
                    } else {
                        console.log(`Doc data is undefined`);
                    }
                    return result;
                }).catch(function(err){
                console.log(`Oops: ${err.message}`);
            });
        },
        getOneClient(id: string){

        },
        getOneService(id: string){

        }
    }
};