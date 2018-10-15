import Leancloud from '@/helpers/leancloud.js'
const Album = new Leancloud('Album');
import formatDate from '@/helpers/formatDate.js'
import Vue from 'vue'
import interceptor from '../../../interceptor.js'
import { Message } from 'iview'

const state = {
    allAlbums: null
}

const getters = {
    getAlbumById: state => id => state.allAlbums && state.allAlbums.find(album => album.id === id)
}

const mutations = {
    setAllAlbums(state, payload) {
        state.allAlbums = payload;
    },
    addAlbum(state, payload) {
        state.allAlbums = state.allAlbums || [];
        state.allAlbums.push(payload);
    },
    patchAlbum(state, payload) {
        let array = state.allAlbums;
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === payload.id) {
                Vue.set(array, i, payload);
                break;
            }
        }
    },
    deleteAlbum(state, payload) {
        state.allAlbums = state.allAlbums.filter(album => album.id !== payload);
    },
}

const actions = {
    async createAlbum({ commit }, data) {
        let res = await Album.create(data);
        let { id, createdAt, updatedAt, attributes } = res;
        createdAt = formatDate(createdAt);
        updatedAt = formatDate(updatedAt);
        let payload = { id, createdAt, updatedAt, ...attributes };
        commit('addAlbum', payload);
        return res;
    },
    async fetchAllAlbums({ commit }) {
        let res = await Album.fetchAll();
        let array = [];
        res.forEach(album => {
            let { id, createdAt, updatedAt, attributes } = album;
            createdAt = formatDate(createdAt);
            updatedAt = formatDate(updatedAt);
            array.push({ id, createdAt, updatedAt, ...attributes });
        });
        commit('setAllAlbums', array);
        return Promise.resolve(array);
    },
    async updateAlbum({ commit }, data) {
        let { name, time, cover, singer, summary, songs, id, createdAt } = data;
        if (interceptor.albums.indexOf(id) > -1) {
            return
        }
        let res = await Album.update({ name, time, singer, cover, summary, songs }, id);
        let { updatedAt } = res;
        updatedAt = formatDate(updatedAt);
        let payload = { name, time, cover, singer, summary, songs, id, createdAt, updatedAt };
        commit('patchAlbum', payload);
        return res;

    },
    async destroyAlbum({ commit }, id) {
        if (interceptor.albums.indexOf(id) > -1) {
            Message.info('操作成功，但是被我拦截了哦~~~请不要删除已有的数据');
            return
        }
        let res = await Album.destroy(id);
        commit('deleteAlbum', id);
        return res;
    }
}

export default { state, getters, mutations, actions }