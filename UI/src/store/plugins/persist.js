import VuexPersist from 'vuex-persist';
const vuexLocalStorage = new VuexPersist({
    storage: window.localStorage,
    key: 'vuex',
    reducer: state => {
        return {
            key: {token: state.token, decodedUserDetails: state.decodedUserDetails}
        };
    }
});
export default vuexLocalStorage;
