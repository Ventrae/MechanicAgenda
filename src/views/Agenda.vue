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
    import Transaction from "@/models/Transaction";
    import Service from "@/models/Service";
    import Client from "@/models/Client";
    import Car from "@/models/Car";
    import QueueView from "@/components/page-agenda/queue-view";
    import {firestore} from "@/main";

    export default {
        name: 'Agenda',
      components: {QueueView},
      data() {
            return {
                transactions: []
            }
        },
        methods: {
            downloadTransactions() {
                alert('ściągam transakcje z firestore\'a');
                this.transactions = [];
                firestore.collection("Transactions")
                        .get()
                        .then((transactions)=>{
                          transactions.forEach((transaction)=>{
                            let x = new Transaction(
                                    transaction.data().name,
                                    transaction.data().date,
                                    transaction.data().comment,
                                    [
                                      new Service("To tylko mock serwisów", 1200),
                                      new Service("Ogarnąć relacje w firestore", 100)
                                    ],
                                    new Client("Mock", "Klienta", "mock@gmail.com", "123456789"),
                                    new Car("Mock", "Car", "GS12345"),
                                    transaction.data().token,
                                    transaction.data().total
                            );
                            this.transactions.push(x);
                          });
                          this.transactions.sort((a,b)=>(a.name > b.name) ? 1 : -1);
                        });

            }
        },
        mounted() {
            this.downloadTransactions();
        }
    }
</script>
