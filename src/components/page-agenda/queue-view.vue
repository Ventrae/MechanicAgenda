<template>

    <div class="row">
        <transaction-thumbnail
            v-for="transaction in transactions"
            :transaction="transaction"
        />

    </div>
</template>

<script>
    import TransactionThumbnail from "./transaction-thumbnail";
    import firebase from "firebase";
    export default {
        name: "queue-view",
        components: {TransactionThumbnail},
        props: {
            transactions: {
                type: Array | undefined,
                required: true
            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
