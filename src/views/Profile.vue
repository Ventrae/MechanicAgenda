<template>
    <div class="container">
            <user-data></user-data>
    </div>
</template>

<script>
    import userData from "@/components/page-profile/user-data";

    export default {
        name: "Profile",
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


