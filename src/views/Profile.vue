<template>
    <div>
        Test ściągania jednego auta:<br/>
        {{ car ? car.model : '' }}
    </div>
</template>

<script>
    import {firestoreRequests} from "@/mixins/firestoreRequests";
    import {firestore} from "@/main";

    export default {
        name: "Profile",
        data(){
            return {
                car: 1
            }
        },
        mixins: [ firestoreRequests ],
        mounted() {
            this.car = this.getOneCar('IdkZcEBGD5y6WeU8cGRY');
        }
    }
</script>

<style scoped>

</style>
