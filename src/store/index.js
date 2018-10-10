import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import song from './modules/song.js'
import sheet from './modules/sheet.js'
import singer from './modules/singer.js'

const store = new Vuex.Store({
    modules: { song, sheet, singer }
});
export default store;