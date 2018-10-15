import Leancloud from '@/helpers/leancloud.js'
const Sheet = new Leancloud('Sheet');
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
    addSheet(state, payload) {
        state.allSheets = state.allSheets || [];
        payload.tags ? payload.tags = payload.tags.join('/') : ''; //数组转字符串
        state.allSheets.push(payload);
    },
    patchSheet(state, payload) {
        let array = state.allSheets;
        payload.tags ? payload.tags = payload.tags.join('/') : ''; //数组转字符串
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
        data.tags ? data.tags = data.tags.split('/').filter(v => v) : ''; //字符串转数组
        let res = await Sheet.create(data);
        let { id, createdAt, updatedAt, attributes } = res;
        createdAt = formatDate(createdAt);
        updatedAt = formatDate(updatedAt);
        let payload = { id, createdAt, updatedAt, ...attributes };
        commit('addSheet', payload);
        return res;
    },
    async fetchAllSheets({ commit }) {
        let res = await Sheet.fetchAll();
        let array = [];
        res.forEach(sheet => {
            let { id, createdAt, updatedAt, attributes } = sheet;
            createdAt = formatDate(createdAt);
            updatedAt = formatDate(updatedAt);
            sheet.attributes.tags ? sheet.attributes.tags = sheet.attributes.tags.join('/') : ''; //数组转字符串
            array.push({ id, createdAt, updatedAt, ...attributes });
        });
        commit('setAllSheets', array);
        return Promise.resolve(array);
    },
    async updateSheet({ commit }, data) {
        let { name, tags, cover, id, createdAt, summary, songs } = data;
        tags = tags.split('/').filter(v => v); //字符串转数组
        let res = await Sheet.update({ name, tags, cover, summary, songs }, id);
        let { updatedAt } = res;
        updatedAt = formatDate(updatedAt);
        let payload = { name, tags, cover, id, createdAt, summary, songs, updatedAt };
        commit('patchSheet', payload);
        return res;
    },
    async destroySheet({ commit }, id) {
        let res = await Sheet.destroy(id);
        commit('deleteSheet', id);
        return res;
    }
}

export default { state, getters, mutations, actions }