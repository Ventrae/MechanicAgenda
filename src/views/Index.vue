<template>
    <div class="page login container" id="login-page">
        <form class="card border-gray mx-auto my-5" @submit.prevent="login()">
            <div class="card-body">
                <h3 class="card-title">Malinowa Car Mechanic</h3>
                <hr/>
                <div class="card-text">
                    <input type="email" v-model="email" class="form-control my-2" placeholder="Nazwa użytkownika"/>
                    <input type="password" v-model="password" class="form-control my-2"
                           placeholder="Hasło użytkownika"/>
                    <button class="btn btn-red btn-block" type="submit">Zaloguj</button>
                </div>
                <!--              <div>-->
                <!--                <button type="button" @click="logOut" class="btn-block btn-primary">Log Out!</button>-->
                <!--              </div>-->
            </div>
        </form>
    </div>
</template>
<script>
    import firebase from 'firebase';

    export default {
        name: "Login",
        data() {
            return {
                email: '',
                password: '',
                user: '',
                uid: ''
            }
        },
        methods: {

            login() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                    (user) => {
                        console.log(user.user.getIdToken());
                        // alert('Well done! You are now connected!')
                        user = firebase.auth().currentUser;
                        this.uid = user.uid;
                        console.log(this.uid);
                        localStorage.uid = this.uid;
                        //this.$store.state.currentUser=this.getOneUser(this.uid);
                        console.log(this.$store.state.currentUser);
                        this.$router.push({name: 'agenda'});
                    },
                    (err) => {
                        alert('Opps something went wrong: ' + err.message)
                    }
                );
            }
        }
    }
</script>
<style scoped>
    form {
        width: 25em;
    }
</style>