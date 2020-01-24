<template>
    <div class="page agenda" id="agenda">

        <div class="single-row border-red d-flex flex-column my-4 px-5 text-left">
            <h3>Kolejka zleceń:</h3>
            <queue-view
                    :transactions="transactions"
            />
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
    import { firestore } from "@/main";

    export default {
        name: 'Agenda',
        components: {QueueView},
        data(){
            return {
                transactions: []
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
