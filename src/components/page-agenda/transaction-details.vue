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
                <div class="modal-footer">
                    <button class="btn btn-red" @click="assignToYourself()" data-dismiss="modal">Przypisz do siebie</button>
                    <button class="btn btn-outline-red" @click="close()">Zamknij</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Transaction from "../../models/Transaction";

    export default {
        name: "transaction-details",
        methods: {
            assignToYourself(){
                alert('przypisuje zlecenie do Ciebie');
                this.$emit('closed', false);
            },
            close() {
                this.$emit('closed', false);
            }
        },
        props: {
            transaction: {
                type: Transaction,
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
