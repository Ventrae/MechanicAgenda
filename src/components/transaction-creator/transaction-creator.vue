<template>
    <div class="md-stepper">

        <md-steppers autofocus md-alternative md-dynamic-height :md-active-step.sync="active" md-linear>

            <md-step id="first" md-label="Klient" :md-done.sync="first">
                <first-step @first="addClient($event), setDone('first', 'second')"></first-step>
            </md-step>

            <md-step id="second" md-label="Usługi" :md-done.sync="second">
                <second-step @second="addCarServices($event), setDone('second', 'third')" @back="goBack($event)"></second-step>
            </md-step>

            <md-step id="third" md-label="Podsumowanie" :md-done.sync="third">
                <third-step :total-price="transaction.total" @summary="addSummary($event), setDone('third')" @back="goBack($event)"></third-step>
            </md-step>

        </md-steppers>

    </div>
</template>

<script>
    import {firestore} from "@/main.ts"
    import FirstStep from "@/components/transaction-creator/first-step";
    import SecondStep from "@/components/transaction-creator/second-step";
    import ThirdStep from "@/components/transaction-creator/third-step";
    export default {
        name: "transaction-creator",
        components: {ThirdStep, SecondStep, FirstStep},
        data: () => ({
            active: 'first',
            first: true,
            second: true,
            third: true,
            secondStepError: null,

            transaction: {
                client: null,
                car: null,
                services: [],
                name: null,
                comment: null,
                date: null,
                token: null,
                total: 0,
                user: null
            }
        }),
        methods: {
            setDone (id, index) {
                this[id] = true;

                this.secondStepError = null;

                if (index) {
                    this.active = index
                }
                else {
                    this.sendTransaction(this.transaction)
                }
            },
            goBack($event) {
                this.active = $event;
            },
            addClient($event) {
                this.transaction.client = $event
                console.log('Client added', this.transaction)
            },
            addCarServices($event) {
                this.transaction.car = $event.car
                this.transaction.services = $event.services
                this.transaction.total = $event.total
                console.log('Car Services added', this.transaction)
            },
            addSummary($event) {
                this.transaction.name = $event.name
                this.transaction.comment = $event.comment
                this.transaction.date = $event.date
                this.transaction.token = $event.token
                console.log('Summary added', this.transaction)
            },
            sendTransaction(data) {
                firestore.collection("Transactions").add(data)
                this.$emit('done', )
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import '~vue-material/dist/vue-material.min.css';

/*    .md-steppers {
        border: solid 2px;
        border-color: crimson;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
    }*/
</style>
