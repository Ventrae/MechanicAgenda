<template>
    <div class="page agenda" id="agenda">

        <div class="single-row border-red d-flex flex-column my-4 px-5 text-left">
            <h3>Kolejka zleceń:</h3>
            <div class="queue-view-container"> <!--wrapping queue-view in div for proper fab position-->
                <queue-view
                    :transactions="transactions"
                />
                <md-button class="md-fab md-fab-bottom-right btn-danger" @click="showCreator=!showCreator"><!--fab to open creator-->
                    <md-icon>add</md-icon>
                </md-button>
            </div>
            <transition name="fade"><!--modal with transaction creator-->
                <create-transaction v-if="showCreator" @close="closeCreator($event)"></create-transaction>
            </transition>
        </div>

        <div class="single-row border-red d-flex flex-column my-4 px-5 text-left">
            <h3>Filip:</h3>
            <div class="queue-view-container">
                <queue-view
                    :transactions="transactions"
                />
            </div>
        </div>

        <div class="single-row border-red d-flex flex-column my-4 px-5 text-left">
            <h3>Damian:</h3>
            <div class="queue-view-container">
                <queue-view
                    :transactions="transactions"
                />
            </div>
        </div>

        <div class="single-row border-red d-flex flex-column my-4 px-5 text-left">
            <h3>Jeremi:</h3>
            <div class="queue-view-container">
                <queue-view
                    :transactions="transactions"
                />
            </div>
        </div>

        <div class="single-row border-red d-flex flex-column my-4 px-5 text-left">
            <h3>Tomek:</h3>
            <div class="queue-view-container">
                <queue-view
                    :transactions="transactions"
                />
            </div>
        </div>

    </div>
</template>

<script>
    import QueueView from "@/components/page-agenda/queue-view";
    import {firestoreRequests} from "@/mixins/firestoreRequests";
    import CreateTransaction from "@/views/CreateTransaction";

    export default {
        name: 'Agenda',
        mixins: [ firestoreRequests ],
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
            transactions(){
                return this.$store.state.transactions;
            }
        },
        mounted() {
            this.updateVuexState();
        }
    }
</script>
