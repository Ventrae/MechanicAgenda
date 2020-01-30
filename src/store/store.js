import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        transactions: [],
        cars: [],
        users: [],
        allServices: [],
        clients: [],
        currentUser: {}
    },
    getters: {
        getTransactions: state => {
            return state.transactions;
        },
        getCars: state => {
            return state.cars;
        },
        getUsers: state => {
            return state.users;
        },
        getServices: state => {
            return state.allServices;
        },
        getClients: state => {
            return state.clients;
        }
    }
});
