<template>
    <div class="transaction-thumbnail card mx-auto">
        <h5 class="card-header">
            {{ transaction.name}}
        </h5>
        <article class="card-body">
            <div class="card-text mb-3">
                <div>Data: {{ transaction.date }}r.</div>
                <div v-if="transaction.name">Komentarz: "{{ transaction.comment }}"</div>
            </div>
            <a href="#" class="btn btn-red" @click="details = !details">Szczegóły</a>
        </article>
        <transition name="fade">
            <transaction-details
                    v-if="details"
                    :transaction="this.transaction"
                    @closed="closeDetails($event)"
            />
        </transition>
    </div>
</template>

<script>
    import TransactionDetails from "./transaction-details";
    import Transaction from "../../models/Transaction";

    export default {
        name: "transaction-thumbnail",
        components: {TransactionDetails},
        data(){
            return {
                details: false
            }
        },
        props: {
            transaction: {
                type: Transaction,
                required: true
            }
        },
        methods: {
            closeDetails($event){
               this.details = $event;
            }
        }
    }
</script>

<style scoped>
    .card {
        min-width: 20em;
    }
    .fade-enter {
        opacity: 0;
    }
    .fade-enter-active {
        transition: opacity .3s .05s ease-in-out;
    }
    .fade-leave {

    }
    .fade-leave-active {
        opacity: 0;
        transition: opacity .3s .05s ease-in-out;
    }
</style>