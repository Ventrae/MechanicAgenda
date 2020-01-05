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
    export default {
        name: "queue-view",
        components: {TransactionThumbnail},
        props: {
            transactions: {
                type: Array | undefined,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>