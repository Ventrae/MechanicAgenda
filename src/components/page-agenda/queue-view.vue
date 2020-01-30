<template>
    <div class="single-row border-red d-flex flex-column my-4 px-5 text-left">
        <h3>{{ user.name }}:</h3>
        <div class="row">
            <transaction-thumbnail
                    v-for="transaction in transactions"
                    :transaction="transaction"
            />

        </div>
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
            },
            user: {
                type: Object,
                required: true
            }
        },
        methods: {}
    }
</script>

<style scoped>

</style>