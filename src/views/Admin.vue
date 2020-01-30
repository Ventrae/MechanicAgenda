<template>
    <div>
        <div class="container">

            <div class="btn-group-vertical my-5">
                <button type="button" class="btn btn-danger text-left my-1" data-toggle="modal" data-target="#exampleModal">
                    Dodaj Pracownika
                </button>

                <button type="button" class="btn btn-danger text-left" data-toggle="modal" data-target="#serviceModal">
                    Dodaj Serwis
                </button>
            </div>


            <div class="row">

                <div class="table-responsive col-md-7">
                    <table class="table ">
                        <thead class="thead-light">
                        <tr>
                            <th scope="col">#</th>

                            <th scope="col">Imie</th>
                            <th scope="col">Nazwisko</th>
                            <th scope="col">Email</th>
                            <th scope="col">Własciciel?</th>
                            <th  scope="col">Usun</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(user, index) in users" >
                            <th scope="row">{{index + 1}}</th>
                            <td>{{user.name}}</td>
                            <td>{{user.surname}}</td>
                            <td>{{user.email}}</td>
                            <td v-if="user.isOwner==false" >Nie</td>
                            <td v-else>Tak</td>
                            <th class="delete__pointer" @click="deleteUser(user.id)" scope="col">&times;</th>

                        </tr>
                        </tbody>
                    </table>
                </div>


                <div class="table-responsive col-md-5">
                    <table class="table ">
                        <thead class="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Opis</th>
                            <th scope="col">Cena</th>
                            <th scope="col">Usun</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(service, index) in services" >
                            <th scope="row">{{index + 1}}</th>
                            <td>{{service.description}}</td>
                            <td>{{service.price}}</td>
                            <td class="delete__pointer" @click="deleteService(service.id)">&times;</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <hr>
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Uzupełnij dane</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div class="modal-body">
                            <div class="row centered-form">
                                <div class="col-11 mx-auto">
                                    <div class="panel panel-default">
                                        <div class="panel-heading">
                                            <h3 class="panel-title"> Dodaj pracownika</h3>
                                        </div>
                                        <div class="panel-body">
                                            <form role="form" @submit="addUserToAuthAndDb()">
                                                <div class="row">
                                                    <div class="col-xs-6 col-sm-6 col-md-6">
                                                        <div class="form-group">
                                                            <input v-model="imie" type="text" id="first_name"
                                                                   class="form-control input-sm" placeholder="Imie">
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6 col-sm-6 col-md-6">
                                                        <div class="form-group">
                                                            <input v-model="nazwisko" type="text" id="last_name"
                                                                   class="form-control input-sm" placeholder="Nazwisko">
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="form-group">
                                                    <input v-model="email" type="email" id="email" class="form-control input-sm"
                                                           placeholder="Email">
                                                </div>
                                                <div class="row">
                                                    <div class="col-xs-6 col-sm-6 col-md-6">
                                                        <div class="form-group">
                                                            <input v-model="haslo" type="password"  id="password"
                                                                   class="form-control input-sm" placeholder="Hasło">
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-6 col-sm-6 col-md-6">
                                                        <div class="form-group">
                                                            <input type="password"
                                                                   id="password_confirmation" class="form-control input-sm"
                                                                   placeholder="Potwierdź hasło">
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Anuluj</button>
                                                <button  type="submit" class="btn btn-primary">Dodaj Pracownika</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">

                        </div>
                    </div>
                </div>
            </div>

<!--######################################################################################################################################################3-->


            <div class="modal fade" id="serviceModal" tabindex="-1" role="dialog" aria-labelledby="serviceModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="serviceModalLabel">Uzupełnij dane</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div class="modal-body">
                            <div class="row centered-form">
                                <div class="col-11 mx-auto">
                                    <div class="panel panel-default">
                                        <div class="panel-heading">
                                            <h3 class="panel-title"> Dodaj serwis</h3>
                                        </div>
                                        <div class="panel-body">
                                            <form role="form" @submit="addService()">
                                                <div class="row">
                                                    <div class="col-xs-6 col-sm-6 col-md-6">
                                                        <div class="form-group">
                                                            <span class="float-left">Cena</span>
                                                            <input v-model="servicePrice" type="text" id="servicePrice"
                                                                   class="form-control input-sm" placeholder="Cena">
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="form-group">
                                                    <input v-model="serviceDescription" type="text" id="serviceDescription" class="form-control input-sm"
                                                           placeholder="Opis">
                                                </div>


                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Anuluj</button>
                                                <button  type="submit" class="btn btn-primary">Dodaj Serwis</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">

                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
    import firebase from "firebase";
    import {firestore} from "@/main";
    import {firestoreRequests} from "@/mixins/firestoreRequests";



    function addItem(uid, email, password, name, lastname) {
        console.log('uid: '+ uid);
        console.log('email: '+ email);
        console.log('name: '+ name);

        const ref = firebase.firestore().collection('Users');

        ref.doc(uid).set({
            email: email,
            password: password,
            isOwner: false,
            name: name,
            surname: lastname
        });
    location.reload();
    }

    export default {
        name: "Admin",
        data(){
            return {
                users: [],
                transactions: [],
                servicesOfTransactions: [],
                imie: '',
                nazwisko: '',
                email: '',
                haslo: '',
                uid: '',
                services: [],
                servicePrice: 0,
                serviceDescription: ''
            }
        },
        methods: {

            register(password, name, lastname) {
                firebase.auth().createUserWithEmailAndPassword(this.email, this.haslo)
                    .then(function success(userData){
                        firebase.auth().onAuthStateChanged(function (user) {

                            let uid;
                            uid = user.uid;

                            console.log(uid);
                            addItem(uid, user.email, password, name, lastname);
                        });
                    }).catch(function failure(error) {

                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode + " " + errorMessage);

                });
            },

            addUserToAuthAndDb(){
                console.log(this.haslo);
                this.register(this.haslo, this.imie, this.nazwisko);
            },
            deleteUser(userId){
                const ref = firebase.firestore().collection('Users');

                ref.doc(userId).delete();
                location.reload();

            },
            deleteService(serviceId){
                const ref = firebase.firestore().collection('Services');
                ref.doc(serviceId).delete();
                location.reload();

            },
            addService(){
                const ref = firebase.firestore().collection('Services');
                ref.add({
                    'description': this.serviceDescription,
                    'price': this.servicePrice
                });
                location.reload();
            },
            getNumberOfTransactions(){
                const ref = firebase.firestore().collection('Services');

            }
        },
        mixins:[firestoreRequests],
        mounted() {
            this.users=this.getUsers();
            this.services = this.getServices();
        }
    }
</script>
<style scoped>
    body{
        background-color: #525252;
    }
    .centered-form{
        margin-top: 10px;
    }

    .delete__pointer{
        cursor: pointer;
    }


</style>
