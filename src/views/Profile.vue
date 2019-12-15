<template>
    <div>
        Test ściągania jednej transakcji:<br/>
        [ {{ tran.name }} - {{ tran.date }} ]
    </div>
</template>

<script>
    import {firestoreRequests} from "@/mixins/firestoreRequests";

    export default {
        name: "Profile",
        data(){
            return {
                tran: undefined
            }
        },
        mixins: [ firestoreRequests ],
        created() {
            console.log(this.getOneTransaction('WRMtYIamcPWv6pu1AIEr'));
            this.tran = this.getOneTransaction('WRMtYIamcPWv6pu1AIEr');
        }
    }
</script>

<style scoped>

</style>
