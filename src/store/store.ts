import Vue from 'vue';
import Vuex from 'vuex';
import Transaction from "@/models/Transaction";
import Car from "@/models/Car";
import User from "@/models/User";
import Service from "@/models/Service";
import Client from "@/models/Client";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        transactions: [Transaction],
        cars: [Car],
        users: [User],
        allServices: [Service],
        clients: [Client],
        currentUser: null
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
