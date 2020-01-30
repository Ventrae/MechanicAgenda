<template>
    <div class="page agenda" id="agenda">

        <queue-view
                :user="{name: 'Kolejka zleceń'}"
                :transactions="filterTransactions(transactions, { id: null})"
        />

        <queue-view
                v-for="user in users"
                :user="{name: user.name}"
                :transactions="filterTransactions(transactions, user)"
        />

        <md-button class="md-fab md-fab-bottom-right btn-red md-fixed" @click="showCreator=!showCreator">
            <!--fab to open creator-->
            <md-icon>add</md-icon>
        </md-button>
        <transition name="fade"><!--modal with transaction creator-->
            <create-transaction v-if="showCreator" @close="closeCreator($event)"></create-transaction>
        </transition>

    </div>
</template>

<script>
    import QueueView from "@/components/page-agenda/queue-view";
    import {firestoreRequests} from "@/mixins/firestoreRequests";
    import {firestore} from "@/main";
    import CreateTransaction from "@/views/CreateTransaction";

    export default {
        name: 'Agenda',
        mixins: [firestoreRequests],
        components: {CreateTransaction, QueueView},
        data() {
            return {
                users: [],
                transactions: [],
                showCreator: false
            }
        },
        methods: {
            closeCreator($event) {
                this.showCreator = $event;
            },
            filterTransactions(transactions, user){
                let result = [];
                for(let transaction of transactions){
                    if(transaction.user === user.id){
                        result.push(transaction);
                    }
                }
                return result;
            }
        },
        updated(){

        },
        mounted() {

            firestore.collection('Users').get()
                .then(users => {
                    users.forEach(user => {
                        this.users.push({
                            id: user.id,
                            name: user.data().name
                        })
                    });
                });

            firestore.collection('Transactions').get()
                .then(transactions => {
                    transactions.forEach(doc => {

                        const serviceFunction = async () => {
                            let services = [];
                            for (let s of doc.data().services) {
                                firestore.collection('Services').doc(s).get()
                                    .then(service => {
                                        services.push({
                                            description: service.data().description,
                                            price: service.data().price
                                        });
                                    });
                            }
                            return services;
                        };

                        serviceFunction().then(serv => {
                            this.transactions.push({
                                id: doc.id,
                                name: doc.data().name,
                                date: doc.data().date,
                                comment: doc.data().comment,
                                client: {
                                    name: doc.data().client.name,
                                    surname: doc.data().client.surname,
                                    email: doc.data().client.name,
                                    phone: doc.data().client.phone
                                },
                                car: {
                                    brand: doc.data().car.brand,
                                    model: doc.data().car.model,
                                    plates: doc.data().car.plates,
                                },
                                token: doc.data().token,
                                total: doc.data().total,
                                services: serv,
                                user: doc.data().user
                            })
                        });
                    });


                })
        }
    }
</script>
