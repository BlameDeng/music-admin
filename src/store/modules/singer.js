import Singer from '@/helpers/singer.js'
import formatDate from '@/helpers/formatDate.js'
import Vue from 'vue'

const state = {
    allSinger: null,
    editingSinger: null
}

const getters = {}

const mutations = {
    setAllSingers(state, payload) {
        state.allSingers = payload;
    },
    setEditingSinger(state, payload) {
        if (typeof payload === 'object') {
            state.editingSinger = payload;
        } else {
            payload > -1 ? state.editingSinger = state.allSingers[payload] : state.editingSinger = null;
        }
    },
    patchSinger(state, payload) {
        let array = state.allSingers;
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === payload.id) {
                Vue.set(array, i, payload);
                break;
            }
        }
    },
    updateCover(state, payload) {
        state.editingSinger = payload;
    },
    deleteSinger(state, payload) {
        state.allSingers = state.allSingers.filter(singer => singer.id !== payload);
    },
}

const actions = {
    async createSinger({ commit }, data) {
        let res = await Singer.createSinger(data);
        return res;
    },

    async fetchAllSingers({ commit }) {
        let res = await Singer.fetchAllSingers();
        let array = [];
        res.forEach(Singer => {
            let { id, createdAt, updatedAt, attributes } = Singer;
            createdAt = formatDate(createdAt);
            updatedAt = formatDate(updatedAt);
            array.push({ id, createdAt, updatedAt, ...attributes });
        });
        commit('setAllSingers', array);
        return Promise.resolve(array);
    },

    async updateSinger({ commit }, data) {
        let { name, ename, lang, type, id, createdAt, summary, avatar } = data;
        let res = await Singer.updateSinger({ name, ename, lang, type, summary, avatar }, id);
        let { updatedAt } = res;
        updatedAt = formatDate(updatedAt);
        let payload = { name, ename, lang, type, id, createdAt, summary, updatedAt, avatar };
        commit('patchSinger', payload);
        commit('setEditingSinger', payload);
        return res;
    },

    async destroySinger({ commit }, id) {
        let res = await Singer.destroySinger(id);
        commit('deleteSinger', id);
        return res;
    }
}

export default { state, getters, mutations, actions }