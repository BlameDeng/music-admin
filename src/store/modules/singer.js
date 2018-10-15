import Leancloud from '@/helpers/leancloud.js'
const Singer = new Leancloud('Singer');
import formatDate from '@/helpers/formatDate.js'
import Vue from 'vue'
import interceptor from '../../../interceptor.js'
import { Message } from 'iview'

const state = {
    allSingers: null,
}

const getters = {
    getSingerById: state => id => state.allSingers && state.allSingers.find(singer => singer.id === id)
}

const mutations = {
    setAllSingers(state, payload) {
        state.allSingers = payload;
    },
    addSinger(state, payload) {
        state.allSingers = state.allSingers || [];
        state.allSingers.push(payload);
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
    deleteSinger(state, payload) {
        state.allSingers = state.allSingers.filter(singer => singer.id !== payload);
    },
}

const actions = {
    async createSinger({ commit }, data) {
        let res = await Singer.create(data);
        let { id, createdAt, updatedAt, attributes } = res;
        createdAt = formatDate(createdAt);
        updatedAt = formatDate(updatedAt);
        let payload = { id, createdAt, updatedAt, ...attributes };
        commit('addSinger', payload);
        return res;
    },
    async fetchAllSingers({ commit }) {
        let res = await Singer.fetchAll();
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
        let { name, othernames, lang, type, id, createdAt, summary, avatar, firstLetter } = data;
        if (interceptor.singers.indexOf(id) > -1) {
            return
        }
        let res = await Singer.update({ name, othernames, lang, type, summary, avatar }, id);
        let { updatedAt } = res;
        updatedAt = formatDate(updatedAt);
        let payload = { name, othernames, lang, type, id, createdAt, summary, updatedAt, avatar, firstLetter };
        commit('patchSinger', payload);
        return res;
    },
    async destroySinger({ commit }, id) {
        if (interceptor.singers.indexOf(id) > -1) {
            Message.info('操作成功，但是被我拦截了哦~~~请不要删除已有的数据');
            return
        }
        let res = await Singer.destroy(id);
        commit('deleteSinger', id);
        return res;
    }
}

export default { state, getters, mutations, actions }