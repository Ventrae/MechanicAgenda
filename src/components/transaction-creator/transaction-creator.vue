<template>
    <div class="md-stepper">

        <md-steppers autofocus md-alternative md-dynamic-height :md-active-step.sync="active" md-linear>

            <md-step id="first" md-label="Client Details" :md-done.sync="first">
                <first-step @first="logEvent($event), setDone('first', 'second')"></first-step>
            </md-step>

            <md-step id="second" md-label="Car Services Details" :md-done.sync="second">
                <second-step @second="logEvent($event), setDone('second', 'third')" @back="goBack($event)"></second-step>
            </md-step>

            <md-step id="third" md-label="Summary" :md-done.sync="third">
                <third-step @summary="logEvent($event), setDone('third')" @back="goBack($event)"></third-step>
            </md-step>

        </md-steppers>

    </div>
</template>

<script>

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
            secondStepError: null
        }),
        methods: {
            setDone (id, index) {
                this[id] = true;

                this.secondStepError = null;

                if (index) {
                    this.active = index
                }
            },
            goBack($event) {
                this.active = $event;
            },
            logEvent($event) {
                console.log($event)
            }
        }
    }

</script>

<style lang="scss" scoped>
    @import '~vue-material/dist/vue-material.min.css';

    .md-steppers {
        border: solid 2px;
        border-color: crimson;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
    }
</style>
