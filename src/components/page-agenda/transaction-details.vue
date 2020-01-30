<template>
    <div class="modal d-block" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ transaction.name }}</h5>
                    <button type="button" class="close" @click="close()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <ul>
                        <li>Data: {{ transaction.date }}</li>
                        <li>Komentarz: "{{ transaction.name }}"</li>
                        <hr/>
                        <li>
                            Usługi:
                            <ul>
                                <li v-for="service in transaction.services">"{{ service.description }}" - {{ service.price }}zł</li>
                            </ul>
                        </li>
                        <hr/>
                        <li>Klient: {{ transaction.client.name + ' ' + transaction.client.surname }}</li>
                        <li>Kontakt do klienta: {{ transaction.client.phone + ' / ' + transaction.client.email }}</li>
                        <hr/>
                        <li>Samochód: {{ transaction.car.brand + ' ' + transaction.car.model + ' ' }}</li>
                        <li>Nr rejestracyjne: {{ transaction.car.plates }}</li>
                        <hr/>
                        <li>Token odbioru: {{ transaction.token }}</li>
                        <li>Cena łącznie: {{ transaction.total }}zł</li>
                    </ul>
                </div>
                <div class="modal-footer d-flex flex-column">
                    <div class="d-flex w-100">
                        <a href="#" class="btn btn-red" @click="finishTransaction()">Finalizuj zlecenie</a>
                        <a href="#" class="ml-2 btn btn-outline-red" @click="cancelTransaction()">Anuluj zlecenie</a>
                    </div>
                    <div class="d-flex w-100">
                    <button class="btn btn-red" @click="assignToYourself()" data-dismiss="modal">Przypisz do siebie</button>
                    <button class="ml-2 btn btn-outline-red" @click="close()">Zamknij</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Transaction from "../../models/Transaction";
    import {firestore} from "@/main";

    export default {
        name: "transaction-details",
        methods: {
            assignToYourself(){
                let t = this.transaction;
                t.user = localStorage.uid;
                firestore.collection('Transactions').doc(this.transaction.id).set(this.transaction);
                this.$emit('closed', false);
            },
            finishTransaction(){
                alert('Transakcja sfinalizowana!');
                firestore.collection('Transactions').doc(this.transaction.id).delete();
                this.$emit('closed', false);
            },
            cancelTransaction(){
                alert('Transakcja odwołana!');
                firestore.collection('Transactions').doc(this.transaction.id).delete();
                this.$emit('closed', false);
            },
            close() {
                this.$emit('closed', false);
            }
        },
        props: {
            transaction: {
                type: Transaction | Object,
                required: true
            }
        }
    }
</script>

<style scoped>
    ul {
        text-align: left;
    }
    .modal {
        background: rgba(100, 100, 100, 0.5);
    }
    .close {
        outline: none;
    }
</style>
