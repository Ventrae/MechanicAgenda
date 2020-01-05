<template>
    <div>

        Test ściągania jednego auta:<br/>
        {{ car ? car.brand + ' ' + car.model : ' '}}

    </div>
</template>

<script>
    import {firestoreRequests} from "@/mixins/firestoreRequests";

    export default {
        name: "Profile",
        mixins: [ firestoreRequests ],
        computed: {
            car(){
                return this.getOneCar('IdkZcEBGD5y6WeU8cGRY');
            }
        },
        mounted() {
            this.updateVuexState();
        }
    }
</script>

<style scoped>

</style>


