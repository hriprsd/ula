import Vue from 'vue';
import Vuex from 'vuex';
import persist from './plugins/persist';
// Import the necessary dependencies

// Use Vuex
Vue.use(Vuex);

// Create a new Vuex store
const store = new Vuex.Store({
    state: {
        token: null,
        decodedUserDetails:'',
        trip_type:'' // Initialize the token as null
    },
    mutations: {
        setToken(state, token) {
            state.token = token; // Update the token in the store
        },
        setDecodedUserDetails(state, decodedUserDetails) {
            state.decodedUserDetails = decodedUserDetails; // Update the decodedUserDetails in the store
        },
        setTripType(state, trip_type) {
            state.trip_type = trip_type; // Update the trip_type in the store
        },
    },
    actions: {
        setToken({ commit }, token) {
            commit('setToken', token);
            // Call the mutation to set the token
            
            // Decode the JWT and set it to decodedUserDetails
            const decodedToken = JSON.parse(atob(token.split('.')[1]))
            commit('setDecodedUserDetails', decodedToken);
        },
        setTripType({ commit }, trip_type) {
            commit('setTripType', trip_type);
            // Call the mutation to set the trip_type
        }
    },
    getters: {
        getToken(state) {
            return state.token; // Get the token from the store
        },
    },
    plugins: [persist.plugin]
});

export default store;