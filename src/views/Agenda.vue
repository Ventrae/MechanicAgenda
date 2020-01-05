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
    import {firestoreRequests} from "@/mixins/firestoreRequests";

    export default {
        name: 'Agenda',
        mixins: [ firestoreRequests ],
        components: {QueueView},
        computed: {
            transactions(){
                return this.$store.state.transactions;
            }
        },
        mounted() {
            this.updateVuexState();
        }
    }
</script>
