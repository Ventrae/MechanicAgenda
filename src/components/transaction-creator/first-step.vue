<template>
    <div>
        <form novalidate class="md-layout" @submit.prevent="validateClient">
            <md-card class="md-layout-item">

                <md-card-header>
                    <div class="md-title"><h2>Dane klienta</h2></div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <md-field :class="getValidationClass('clientName')">
                                <label for="firstName">Imię</label>
                                <md-input name="firstName" id="firstName" v-model="form.clientName" :disabled="sending" />
                                <span class="md-error" v-if="!$v.form.clientName.required">Imię jest wymagane</span>
                                <span class="md-error" v-else-if="!$v.form.clientName.minlength">Nieprawidłowe imię</span>
                            </md-field>
                        </div>

                        <div class="md-layout-item">
                            <md-field :class="getValidationClass('clientSurname')">
                                <label for="lastName">Nazwisko</label>
                                <md-input name="lastName" id="lastName" v-model="form.clientSurname" :disabled="sending" />
                                <span class="md-error" v-if="!$v.form.clientSurname.required">Nazwisko jest wymagane</span>
                                <span class="md-error" v-else-if="!$v.form.clientSurname.minlength">Nieprawidłowie nazwisko</span>
                            </md-field>
                        </div>
                    </div>

                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <md-field :class="getValidationClass('clientPhone')">
                                <label for="phone">Numer telefonu</label>
                                <md-input type="number" id="phone" name="phone" v-model="form.clientPhone" :disabled="sending" />
                                <span class="md-error" v-if="!$v.form.clientPhone.required">Numer telefonu jest wymagany</span>
                                <span class="md-error" v-else-if="!$v.form.clientPhone.maxlength">Nieprawidłowy numer telefonu</span>
                            </md-field>
                        </div>

                        <div class="md-layout-item">
                            <md-field :class="getValidationClass('clientEmail')">
                                <label for="email">Email</label>
                                <md-input type="email" name="email" id="email" v-model="form.clientEmail" :disabled="sending" />
                                <span class="md-error" v-if="!$v.form.clientEmail.required">Email jest wymagany</span>
                                <span class="md-error" v-else-if="!$v.form.clientEmail.clientEmail">Nieprawidłowy email</span>
                            </md-field>
                        </div>
                    </div>
                </md-card-content>

                <md-snackbar :md-active.sync="clientSaved">Dodano {{ enteredClient }}</md-snackbar>
                <md-progress-bar md-mode="indeterminate" class="bg-warning" v-if="sending" />

                <md-card-actions style="display: flex; align-items: center; justify-content: space-evenly">
                    <md-button type="submit" class="md-icon-button" :disabled="sending">
                        <md-icon>arrow_forward_ios</md-icon></md-button>
                </md-card-actions>

            </md-card>
        </form>
    </div>
</template>

<script>
    import { validationMixin } from 'vuelidate'
    import {
        required,
        email,
        minLength,
        maxLength
    } from 'vuelidate/lib/validators'

    export default {
        name: "first-step",
        mixins: [validationMixin],
        data: () => ({
            form: {
                clientName: null,
                clientSurname: null,
                clientPhone: null,
                clientEmail: null,
            },
            clientSaved: false,
            sending: false,
            enteredClient: null
        }),
        validations: {
            form: {
                clientName: {
                    required,
                    minLength: minLength(3)
                },
                clientSurname: {
                    required,
                    minLength: minLength(3)
                },
                clientPhone: {
                    required,
                    minLength: minLength(9),
                    maxLength: maxLength(9)
                },
                clientEmail: {
                    required,
                    email: email
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
                this.form.clientName = null
                this.form.clientSurname = null
                this.form.clientPhone = null
                this.form.clientEmail = null
            },
            confirmClient () {
                this.sending = true

                window.setTimeout(() => {
                    this.enteredClient = {
                        'name': this.form.clientName,
                        'surname': this.form.clientSurname,
                        'email': this.form.clientEmail,
                        'phone': this.form.clientPhone
                    }
                    this.clientSaved = true
                    this.$emit('first', this.enteredClient)
                    this.sending = false
                    this.clearForm()
                }, 800)
            },
            validateClient () {
                this.$v.$touch()

                if (!this.$v.$invalid) {
                    this.confirmClient()
                }
            }
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
