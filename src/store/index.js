import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import song from './modules/song.js'
import sheet from './modules/sheet.js'
import singer from './modules/singer.js'
import album from './modules/album.js'
import todo from './modules/todo.js'
import message from './modules/message.js'

const store = new Vuex.Store({
    modules: { song, sheet, singer, album, todo, message },
    state: { isLogin: false, searchResults: null },
    mutations: {
        setLogin(state) {
            state.isLogin = true;
        },
        logout(state) {
            state.isLogin = false;
        },
        setSearchResults(state, payload) {
            state.searchResults = payload;
        }
    }
});
export default store;