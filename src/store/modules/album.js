import Leancloud from '@/helpers/leancloud.js'
const Album = new Leancloud('Album');
import formatDate from '@/helpers/formatDate.js'
import Vue from 'vue'

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
        let res = await Album.update({ name, time, singer, cover, summary, songs }, id);
        let { updatedAt } = res;
        updatedAt = formatDate(updatedAt);
        let payload = { name, time, cover, singer, summary, songs, id, createdAt, updatedAt };
        commit('patchAlbum', payload);
        return res;
    },
    async destroyAlbum({ commit }, id) {
        let res = await Album.destroy(id);
        commit('deleteAlbum', id);
        return res;
    }
}

export default { state, getters, mutations, actions }