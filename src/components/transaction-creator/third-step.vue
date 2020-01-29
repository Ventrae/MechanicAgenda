<template>
    <div>
        <form novalidate class="md-layout" @submit.prevent="validateTransaction">
            <md-card class="md-layout-item">

                <md-card-header>
                    <div class="md-title"><h2>Summary</h2></div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <md-field :class="getValidationClass('transactionName')">
                                <label for="transName">Transaction name</label>
                                <md-input name="transName" id="transName" v-model="form.transactionName"
                                          :disabled="sending"/>
                                <span class="md-error" v-if="!$v.form.transactionName.required">Transaction name is required</span>
                                <span class="md-error" v-else-if="!$v.form.transactionName.minLength">Invalid transaction name</span>
                            </md-field>
                        </div>

                        <div class="md-layout-item">
                            <md-field :class="getValidationClass('transactionDate')">
                                <label for="transDate">Transaction date</label>
                                <md-input id="transDate" name="transDate"
                                          v-model="form.transactionDate" :disabled="sending"/>
                                <span class="md-error" v-if="!$v.form.transactionDate.required">Date of admission is required</span>
                                <!--<span class="md-error" v-else-if="!$v.form.transactionDate.">Invalid date</span>-->
                            </md-field>
                        </div>
                    </div>

                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <md-field :class="getValidationClass('transactionComment')">
                                <label for="transComment">Additional comment</label>
                                <md-input name="transComment" id="transComment" v-model="form.transactionComment"
                                          :disabled="sending"/>
                                <span class="md-error"
                                      v-if="!$v.form.transactionComment.minLength">Invalid comment</span>
                            </md-field>
                        </div>
                    </div>

                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <md-field :class="getValidationClass('transactionTotalPrice')">
                                <label for="transTotalPrice">Total price</label>
                                <md-input type="number" id="transTotalPrice" name="transTotalPrice"
                                          v-model="form.transactionTotalPrice" :disabled="sending"/>
                                <span class="md-error" v-if="!$v.form.transactionTotalPrice.required">Total price is required</span>
                            </md-field>
                        </div>

                        <div class="md-layout-item">
                            <md-field :class="getValidationClass('transactionToken')">
                                <label for="transToken">Transaction token</label>
                                <md-input name="transToken" id="transToken" v-model="form.transactionToken"
                                          :disabled="sending"/>
                                <span class="md-error" v-if="!$v.form.transactionToken.required">Transaction token is required</span>
                                <span class="md-error"
                                      v-else-if="!$v.form.transactionToken.minLength">Invalid token</span>
                            </md-field>
                        </div>
                    </div>
                </md-card-content>

                <md-snackbar :md-active.sync="transactionSaved">Transaction {{ enteredTransaction }} was saved with
                    success!
                </md-snackbar>
                <md-progress-bar md-mode="indeterminate" class="bg-warning" v-if="sending"/>

                <md-card-actions>
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
<!--Transaction: date, Fname, Fcomment, token, Ftotal, user-->
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
                transactionTotalPrice: null,
                transactionToken: null
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
                },
                transactionTotalPrice: {
                    required
                },
                transactionToken: {
                    required,
                    minLength: minLength(3)
                }
            }
        },
        methods: {
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
                this.form.transactionTotalPrice = null
                this.form.transactionToken = null
            },
            confirmTransaction() {
                this.sending = true

                window.setTimeout(() => {
                    this.enteredTransaction = {
                        'name': this.form.transactionName,
                        'comment': this.form.transactionComment,
                        'date': this.form.transactionDate,
                        'total': this.form.transactionTotalPrice,
                        'token': this.form.transactionToken
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
        }
    }
</script>

<style scoped>
    .md-card {
        border: solid 2px;
        border-color: indianred;
        border-radius: 10px;
    }

    .md-card-header {
        color: floralwhite;
        background-color: indianred;
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
