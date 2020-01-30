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
        currentUser: {
            name: "Mockname",
            surname: "Mocksurname",
            email: "mock@mock.com",
            password: "lol123",
            transactions: [],
            isOwner: false
        }
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
        getAllServices: state => {
            return state.allServices;
        },
        getClients: state => {
            return state.clients;
        }
    }
});