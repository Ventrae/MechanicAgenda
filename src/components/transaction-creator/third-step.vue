<template>
    <div>
        <form novalidate class="md-layout" @submit.prevent="validateTransaction">
            <md-card class="md-layout-item">

                <md-card-header>
                    <div class="md-title"><h2>Podsumowanie</h2></div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <md-field :class="getValidationClass('transactionName')">
                                <label for="transName">Nazwa zlecenia</label>
                                <md-input name="transName" id="transName" v-model="form.transactionName"
                                          :disabled="sending"/>
                                <span class="md-error" v-if="!$v.form.transactionName.required">Nazwa zlecenia jest wymagana</span>
                                <span class="md-error" v-else-if="!$v.form.transactionName.minLength">Nieprawidłowa nazwa</span>
                            </md-field>
                        </div>

                        <div class="md-layout-item">
                            <md-field :class="getValidationClass('transactionDate')">
                                <label for="transDate">Data przyjęcia zlecenia</label>
                                <md-input id="transDate" name="transDate"
                                          v-model="form.transactionDate" :disabled="sending"/>
                                <span class="md-error"
                                      v-if="!$v.form.transactionDate.required">Data jest wymagana</span>
                            </md-field>
                        </div>
                    </div>

                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <md-field :class="getValidationClass('transactionComment')">
                                <label for="transComment">Dodatkowy komentarz</label>
                                <md-input name="transComment" id="transComment" v-model="form.transactionComment"
                                          :disabled="sending"/>
                                <span class="md-error"
                                      v-if="!$v.form.transactionComment.minLength">Nieprawidłowy komentarz</span>
                            </md-field>
                        </div>
                    </div>

                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <md-field>
                                <label>Koszt</label>
                                <md-input id="transTotalPrice" name="transTotalPrice"
                                          v-model="totalPrice" readonly/>
                                pln
                            </md-field>
                        </div>

                        <div class="md-layout-item">
                            <md-field>
                                <label>Token zlecenia</label>
                                <md-input name="transToken" id="transToken" v-model="token" readonly/>
                            </md-field>
                        </div>
                    </div>
                </md-card-content>

                <md-snackbar :md-active.sync="transactionSaved">Transaction {{ enteredTransaction }} was saved with
                    success!
                </md-snackbar>
                <md-progress-bar md-mode="indeterminate" class="bg-warning" v-if="sending"/>

                <md-card-actions style="display: flex; align-items: center; justify-content: space-evenly">
                    <md-button class="md-icon-button" @click="goBack()">
                        <md-icon>arrow_back_ios</md-icon>
                    </md-button>
                    <md-button type="submit" class="md-icon-button btn-outline-danger" :disabled="sending">
                        <md-icon>done_outline</md-icon>
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

    export default {
        name: "third-step",
        mixins: [validationMixin],
        data: () => ({
            form: {
                transactionName: null,
                transactionComment: null,
                transactionDate: null,
            },
            transactionSaved: false,
            sending: false,
            enteredTransaction: null
        }),
        validations: {
            form: {
                transactionName: {
                    required,
                    minLength: minLength(3)
                },
                transactionComment: {
                    minLength: minLength(10)
                },
                transactionDate: {
                    required
                }
            }
        },
        computed: {
            token() {
                return this.generateToken();
            }
        },
        props: {
            totalPrice: {
                type: Number,
                required: true
            }
        },
        methods: {
            generateToken() {
                let token = "";
                let chars = "ABCDEEFGHIJKLMNOPRSTUWXYZ";
                let digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

                for (let i = 0; i < 4; i++) {
                    token += (chars.charAt(Math.floor(Math.random() * chars.length)))
                }
                for (let i = 0; i < 4; i++) {
                    token += (digits[Math.floor(Math.random() * digits.length)])
                }
                console.log(token);
                return token;
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
                this.form.transactionName = null
                this.form.transactionComment = null
                this.form.transactionDate = null
            },
            confirmTransaction() {
                this.sending = true

                window.setTimeout(() => {
                    this.enteredTransaction = {
                        'name': this.form.transactionName,
                        'comment': this.form.transactionComment,
                        'date': this.form.transactionDate,
                        'total': this.totalPrice,
                        'token': this.token
                    }
                    this.transactionSaved = true
                    this.$emit('summary', this.enteredTransaction)
                    this.sending = false
                    this.clearForm()
                }, 1000)
            },
            validateTransaction() {
                this.$v.$touch()

                if (!this.$v.$invalid) {
                    this.confirmTransaction()
                }
            },
            goBack() {
                this.$emit('back', 'second')
            }
        },
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
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        background: rgba(230, 230, 230, 100);
    }
</style>
