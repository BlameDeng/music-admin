import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import song from './modules/song.js'

const store = new Vuex.Store({
    modules: { song }
});
export default store;