<template>
    <div class="page agenda" id="agenda">

        <div class="single-row border-red d-flex flex-column my-4 px-5 text-left">
            <h3>Kolejka zleceń:</h3>
            <queue-view
                    :transactions="transactions"
            />
            <md-button class="md-fab md-fab-bottom-right btn-red" @click="showCreator=!showCreator">
                <!--fab to open creator-->
                <md-icon>add</md-icon>
            </md-button>
            <transition name="fade"><!--modal with transaction creator-->
                <create-transaction v-if="showCreator" @close="closeCreator($event)"></create-transaction>
            </transition>
        </div>

        <div class="single-row border-red d-flex flex-column my-4 px-5 text-left">
            <h3>Filip:</h3>
            <queue-view
                    :transactions="transactions"
            />
        </div>

        <div class="single-row border-red d-flex flex-column my-4 px-5 text-left">
            <h3>Damian:</h3>
            <queue-view
                    :transactions="transactions"
            />
        </div>

        <div class="single-row border-red d-flex flex-column my-4 px-5 text-left">
            <h3>Jeremi:</h3>
            <queue-view
                    :transactions="transactions"
            />
        </div>

        <div class="single-row border-red d-flex flex-column my-4 px-5 text-left">
            <h3>Tomek:</h3>
            <queue-view
                    :transactions="transactions"
            />
        </div>

    </div>
</template>

<script>
    import QueueView from "@/components/page-agenda/queue-view";
    import {firestoreRequests} from "@/mixins/firestoreRequests";
    import CreateTransaction from "@/views/CreateTransaction";

    export default {
        name: 'Agenda',
        mixins: [firestoreRequests],
        components: {CreateTransaction, QueueView},
        data() {
            return {
                showCreator: false
            }
        },
        methods: {
            closeCreator($event) {
                this.showCreator = $event;
            }
        },
        computed: {
            transactions() {
                return this.$store.state.transactions;
            }
        },
        mounted() {
            firestore.collection('Transactions').get()
                .then(transactions => {
                    transactions.forEach(doc => {




                       this.transactions.push({
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
                           services: []
                       })
                    });
                })
        }
    }
</script>
