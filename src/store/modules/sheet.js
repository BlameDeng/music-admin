import Sheet from '@/helpers/sheet.js'
import formatDate from '@/helpers/formatDate.js'
import Vue from 'vue'
const state = {
    allSheets: null,
    editingSheet: null
}

const getters = {}

const mutations = {
    setAllSheets(state, payload) {
        state.allSheets = payload;
    },
    setEditingSheet(state, payload) {
        payload > -1 ? state.editingSheet = state.allSheets[payload] : state.editingSheet = null;
    },
}

const actions = {
    async createSheet({ commit }, data) {
        let res = await Sheet.createSheet(data);
        return res;
    },

    async fetchAllSheets({ commit }) {
        let res = await Sheet.fetchAllSheets();
        let array = [];
        res.forEach(sheet => {
            let { id, createdAt, updatedAt, attributes } = sheet;
            createdAt = formatDate(createdAt);
            updatedAt = formatDate(updatedAt);
            array.push({ id, createdAt, updatedAt, ...attributes });
        });
        commit('setAllSheets', array);
        return Promise.resolve(array);
    }
}

export default { state, getters, mutations, actions }