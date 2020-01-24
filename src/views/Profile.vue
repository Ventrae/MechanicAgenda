<template>
    <div class="container">
            <user-data></user-data>
    </div>
</template>

<script>
    import {firestoreRequests} from "@/mixins/firestoreRequests";
    import userData from "@/components/page-profile/user-data";

    export default {
        name: "Profile",
        mixins: [ firestoreRequests ],
        computed: {
            car(){
                return this.getOneCar('IdkZcEBGD5y6WeU8cGRY');
            }
        },
        components: {
            userData
        },
        mounted() {
            this.updateVuexState();
        }
    }
</script>

<style scoped>

</style>


