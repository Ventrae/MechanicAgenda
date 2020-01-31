<template>
    <div>
        <form novalidate class="md-layout" @submit.prevent="validateCarServices">
            <md-card class="md-layout-item">

                <md-card-header>
                    <div class="md-title"><h2>Usługi do wykonania</h2></div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <md-field :class="getValidationClass('carBrand')">
                                <label for="carBrand">Marka samochodu</label>
                                <md-input name="carBrand" id="carBrand" v-model="form.carBrand" :disabled="sending"/>
                                <span class="md-error"
                                      v-if="!$v.form.carBrand.required">Marka samochodu jest wymagana</span>
                                <span class="md-error" v-else-if="!$v.form.carBrand.minLength">Nieprawidłowa marka samochodu</span>
                            </md-field>
                        </div>

                        <div class="md-layout-item">
                            <md-field :class="getValidationClass('carModel')">
                                <label for="carModel">Model samochodu</label>
                                <md-input name="carModel" id="carModel" v-model="form.carModel" :disabled="sending"/>
                                <span class="md-error"
                                      v-if="!$v.form.carModel.required">Model samochodu jest wymagany</span>
                                <span class="md-error" v-else-if="!$v.form.carModel.minLength">Nieprawidłowy model samochodu</span>
                            </md-field>
                        </div>

                        <div class="md-layout-item">
                            <md-field :class="getValidationClass('carPlates')">
                                <label for="carPlates">Tablice rejestracyjne</label>
                                <md-input id="carPlates" name="carPlates" v-model="form.carPlates" :disabled="sending"/>
                                <span class="md-error" v-if="!$v.form.carPlates.required">Tablice są wymagane</span>
                                <span class="md-error"
                                      v-else-if="!$v.form.carPlates.minLength">Nieprawidłowe numery</span>
                                <span class="md-error"
                                      v-else-if="!$v.form.carPlates.maxLength">Nieprawidłowe numery</span>
                            </md-field>
                        </div>
                    </div>

                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <label for="services">Dostępne usługi:</label>
                            <select multiple v-model="form.services"
                                    class="form-control" id="services">
                                <option v-for="service in availableServices" :value="service.id">
                                    {{service.description}} - {{service.price}}
                                </option>
                            </select>
                            <div>
                                <br>
                                Wybrane:
                                {{form.services}}
                                <!--                                <md-chips v-model="form.services"></md-chips>-->
                            </div>
                        </div>
                    </div>
                </md-card-content>

                <md-snackbar :md-active.sync="carServicesSaved">Dodano {{ enteredCarServices }}
                </md-snackbar>
                <md-progress-bar md-mode="indeterminate" class="bg-warning" v-if="sending"/>

                <md-card-actions style="display: flex; align-items: center; justify-content: space-evenly">
                    <md-button class="md-icon-button" @click="goBack()">
                        <md-icon>arrow_back_ios</md-icon>
                    </md-button>
                    <md-button type="submit" class="md-icon-button" :disabled="sending">
                        <md-icon>arrow_forward_ios</md-icon>
                    </md-button>
                </md-card-actions>

            </md-card>
        </form>
    </div>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {
        required,
        minLength,
        maxLength
    } from 'vuelidate/lib/validators'
    import {firestore} from "@/main";

    export default {
        name: "second-step",
        mixins: [validationMixin],
        data: () => ({
            form: {
                carBrand: null,
                carModel: null,
                carPlates: null,
                services: []
            },
            servicesTotalPrice: 0,
            availableServices: [],
            carServicesSaved: false,
            sending: false,
            enteredCarServices: null
        }),
        validations: {
            form: {
                carBrand: {
                    required,
                    minLength: minLength(3)
                },
                carModel: {
                    required,
                    minLength: minLength(3)
                },
                carPlates: {
                    required,
                    minLength: minLength(5),
                    maxLength: maxLength(8)
                }
            }
        },
        methods: {
            computeTotalPrice() {
                this.form.services.forEach(service => {
                     this.availableServices.filter(avservice => {
                        if(avservice.id === service){
                            this.servicesTotalPrice += parseInt(avservice.price)
                        }
                    });
                    console.log(this.servicesTotalPrice);
                })
            },
            getAvailableServices() {
                firestore.collection('Services').get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.availableServices.push(
                            {id: doc.id, description: doc.data().description, price: doc.data().price});
                    });
                });
            },
            getValidationClass(fieldName) {
                const field = this.$v.form[fieldName]

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
            clearForm() {
                this.$v.$reset()
                this.form.carBrand = null
                this.form.carModel = null
                this.form.carPlates = null
                this.form.services = []
            },
            confirmCarServices() {
                this.sending = true
                this.computeTotalPrice()

                window.setTimeout(() => {
                    this.enteredCarServices = {
                        'car': {
                            'brand': this.form.carBrand,
                            'model': this.form.carModel,
                            'plates': this.form.carPlates
                        },
                        'services': this.form.services,
                        'total': this.servicesTotalPrice
                    }
                    this.carServicesSaved = true
                    this.$emit('second', this.enteredCarServices)
                    this.sending = false
                    this.clearForm()
                }, 800)
            },
            validateCarServices() {
                this.$v.$touch()

                if (!this.$v.$invalid) {
                    this.confirmCarServices()
                }
            },
            goBack() {
                this.$emit('back', 'first')
            }
        },
        mounted() {
            this.getAvailableServices();
        }
    }
</script>

<style scoped>
    .md-card {
        border: solid 2px;
        border-color: firebrick;
        border-radius: 10px;
    }

    .md-card-header {
        color: floralwhite;
        background-color: firebrick;
    }

    label {
        padding-left: 10px;
    }

    input.md-input {
        border-bottom: solid 1px;
        border-color: palevioletred;
        border-radius: 5px;
        padding-left: 10px;
    }

    input.md-input:focus {
        border-bottom: solid 2px;
        border-color: mediumvioletred;
    }

    .md-error {
        color: mediumpurple;
    }

    .md-chips {
        margin: 0;
        font-weight: bold;
        color: crimson;
    }

    .md-progress-bar {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
    }

    .md-snackbar {
        background: rgba(230, 230, 230, 100);
    }
</style>
