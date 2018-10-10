import Sheet from '@/helpers/sheet.js'
import formatDate from '@/helpers/formatDate.js'
import Vue from 'vue'
const state = {
    allSheets: null
}

const getters = {
    getSheetById: state => id => state.allSheets && state.allSheets.find(sheet => sheet.id === id)
}

const mutations = {
    setAllSheets(state, payload) {
        state.allSheets = payload;
    },
    patchSheet(state, payload) {
        let array = state.allSheets;
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === payload.id) {
                Vue.set(array, i, payload);
                break;
            }
        }
    },
    deleteSheet(state, payload) {
        state.allSheets = state.allSheets.filter(sheet => sheet.id !== payload);
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
    },

    async updateSheet({ commit }, data) {
        let { name, tag1, tag2, tag3, cover, id, createdAt, summary, songs } = data;
        let res = await Sheet.updateSheet({ name, tag1, tag2, tag3, cover, summary, songs }, id);
        let { updatedAt } = res;
        updatedAt = formatDate(updatedAt);
        let payload = { name, tag1, tag2, tag3, cover, id, createdAt, summary, songs, updatedAt };
        commit('patchSheet', payload);
        return res;
    },

    async destroySheet({ commit }, id) {
        let res = await Sheet.destroySheet(id);
        commit('deleteSheet', id);
        return res;
    }
}

export default { state, getters, mutations, actions }