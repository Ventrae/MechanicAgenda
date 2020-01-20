<template>
    <div>
        <form novalidate class="md-layout" @submit.prevent="validateCarServices">
            <md-card class="md-layout-item">

                <md-card-header>
                    <div class="md-title">Car Services</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <md-field :class="getValidationClass('carBrand')">
                                <label for="carBrand">Car brand</label>
                                <md-input name="carBrand" id="carBrand" v-model="form.carBrand" :disabled="sending" />
                                <span class="md-error" v-if="!$v.form.carBrand.required">Car brand is required</span>
                                <span class="md-error" v-else-if="!$v.form.carBrand.minLength">Invalid brand name</span>
                            </md-field>
                        </div>

                        <div class="md-layout-item">
                            <md-field :class="getValidationClass('carModel')">
                                <label for="carModel">Car model</label>
                                <md-input name="carModel" id="carModel" v-model="form.carModel" :disabled="sending" />
                                <span class="md-error" v-if="!$v.form.carModel.required">Car model is required</span>
                                <span class="md-error" v-else-if="!$v.form.carModel.minLength">Invalid model name</span>
                            </md-field>
                        </div>

                        <div class="md-layout-item">
                            <md-field :class="getValidationClass('carPlates')">
                                <label for="carPlates">Car plates</label>
                                <md-input id="carPlates" name="carPlates" v-model="form.carPlates" :disabled="sending" />
                                <span class="md-error" v-if="!$v.form.carPlates.required">Car plates are required</span>
                                <span class="md-error" v-else-if="!$v.form.carPlates.minLength">Invalid car plates</span>
                                <span class="md-error" v-else-if="!$v.form.carPlates.maxLength">Invalid car plates</span>
                            </md-field>
                        </div>
                    </div>

                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <md-field :class="getValidationClass('serviceDescription')">
                                <label for="serviceDescription">Service description</label>
                                <md-input name="serviceDescription" id="serviceDescription" v-model="form.serviceDescription" :disabled="sending" />
                                <span class="md-error" v-if="!$v.form.serviceDescription.required">Service description is required</span>
                                <span class="md-error" v-else-if="!$v.form.serviceDescription.minLength">Invalid service description</span>
                            </md-field>
                        </div>

                        <div class="md-layout-item">
                            <md-field :class="getValidationClass('servicePrice')">
                                <label for="servicePrice">Service price</label>
                                <md-input type="number" name="servicePrice" id="servicePrice" v-model="form.servicePrice" :disabled="sending" />
                                <span class="md-error" v-if="!$v.form.servicePrice.required">Service price is required</span>
                            </md-field>
                        </div>
                    </div>

                        <md-chips v-model="form.services" md-placeholder="To serve..."></md-chips>

                </md-card-content>

                <md-snackbar :md-active.sync="carServicesSaved">Car services {{ enteredCarServices }} was saved with success!</md-snackbar>
                <md-progress-bar md-mode="indeterminate" class="bg-warning" v-if="sending" />

                <md-card-actions>
                    <md-button class="md-icon-button" @click="goBack()"><md-icon>arrow_back_ios</md-icon></md-button>
                    <md-button type="submit" class="md-icon-button" :disabled="sending"><md-icon>arrow_forward_ios</md-icon></md-button>
                </md-card-actions>

            </md-card>
        </form>
    </div>
</template>

<script>
    import { validationMixin } from 'vuelidate'
    import {
        required,
        minLength,
        maxLength
    } from 'vuelidate/lib/validators'

    export default {
        name: "second-step",
        mixins: [validationMixin],
        data: () => ({
            form: {
                carBrand: null,
                carModel: null,
                carPlates: null,

                service: {
                    serviceDescription: null,
                    servicePrice: null
                    },
                services: []
            },
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
                    maxLength: maxLength(7)
                },
                serviceDescription: {
                    required,
                    minLength: minLength(10)
                },
                servicePrice: {
                    required,
                }
            }
        },
        methods: {
            getValidationClass (fieldName) {
                const field = this.$v.form[fieldName]

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
            clearForm () {
                this.$v.$reset()
                this.form.carBrand = null
                this.form.carModel = null
                this.form.carPlates = null
                this.form.serviceDescription = null
                this.form.servicePrice = null
                this.services = []
            },
            confirmCarServices () {
                this.sending = true

                window.setTimeout(() => {
                    this.enteredCarServices = {

                    }
                    this.carServicesSaved = true
                    this.$emit('second', this.enteredCarServices)
                    this.sending = false
                    // this.clearForm()
                }, 1500)
            },
            validateCarServices () {
                this.$v.$touch()

                if (!this.$v.$invalid) {
                    this.confirmCarServices()
                }
            },
            goBack() {
                this.$emit('back', 'first')
            }
        }
    }
</script>

<style scoped>
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
    }
    .md-progress-bar {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
    }
    .md-snackbar {
        background: rgba(230, 230, 230,  100);
    }
</style>
