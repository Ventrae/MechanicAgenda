<template>
    <div class="modal d-block md-alignment-center-space-around">
        <div class="modal-dialog">

            <div class="modal-content text-center">
                <div class="modal-header">
                    <h5 class="modal-title text-center">Nowe zlecenie</h5>
                    <md-button class="md-icon-button" data-dismiss="modal" @click="close()">
                        <md-icon>close</md-icon>
                    </md-button>
                </div>
                <div class="modal-body text-center">
                    <transaction-creator v-if="creatingState" @done="onDone()"></transaction-creator>
                    <md-card-content v-if="!creatingState">
                        <h1>Dodano zlecenie!</h1>
                    </md-card-content>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import TransactionCreator from "../components/transaction-creator/transaction-creator";
    import Vue from 'vue';
    import VueMaterial from 'vue-material';
/*    import { MdButton, MdDialog, MdSteppers, MdIcon, MdCard, MdDatepicker, MdDivider,
        MdField,MdRadio, MdSwitch, MdAutocomplete, MdCheckbox} from 'vue-material/dist/components';
    Vue.use(MdButton);
    Vue.use(MdDialog);
    Vue.use(MdSteppers);
    Vue.use(MdIcon);
    Vue.use(MdField);*/
    Vue.use(VueMaterial);

    export default {
        name: "CreateTransaction",
        components: {TransactionCreator},
        data: () => ({
            active: true,
            creatingState: true
        }),
        methods: {
            onDone() {
                this.creatingState = false
                setTimeout(() => {
                    this.close()
                }, 1500)
            },
            close() {
                this.$emit('close', false);
            }
        }
    }
</script>

<style scoped>
    @import '~vue-material/dist/vue-material.min.css';

    .modal {
        background: rgba(100, 100, 100, 0.2);
    }
    .modal-dialog {
        min-width: min-content;
    }
    .modal-content {
        border-radius: 25px;
    }

</style>
