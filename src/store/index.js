import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import song from './modules/song.js'
import sheet from './modules/sheet.js'

const store = new Vuex.Store({
    modules: { song, sheet }
});
export default store;