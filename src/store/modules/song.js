import Leancloud from '@/helpers/leancloud.js'
const Song = new Leancloud('Song');
import formatDate from '@/helpers/formatDate.js'
import Vue from 'vue'
const state = {
    allSongs: null
}

const getters = {
    getSongsByArray: state => queryArray => {
        let array = [];
        state.allSongs = state.allSongs || [];
        state.allSongs.forEach(song => {
            queryArray.indexOf(song.id) > -1 ? array.push(song) : '';
        });
        return array;
    },
    getSongById: state => id => state.allSongs && state.allSongs.find(song => song.id === id)
}

const mutations = {
    setAllSongs(state, payload) {
        state.allSongs = payload;
    },
    patchSong(state, payload) {
        let array = state.allSongs;
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === payload.id) {
                Vue.set(array, i, payload);
                break;
            }
        }
    },
    deleteSong(state, payload) {
        state.allSongs = state.allSongs.filter(song => song.id !== payload);
    }
}

const actions = {
    async createSong({ commit }, data) {
        let res = await Song.create(data);
        return res;
    },
    async fetchAllSongs({ commit }) {
        let array = [];
        let res = await Song.fetchAll();
        res.forEach(song => {
            let { id, createdAt, updatedAt, attributes } = song;
            createdAt = formatDate(createdAt);
            updatedAt = formatDate(updatedAt);
            array.push({ id, createdAt, updatedAt, ...attributes });
        });
        commit('setAllSongs', array);
        return Promise.resolve(array);
    },
    async updateSong({ commit }, data) {
        let { name, singer, url, cover, lrc, id, createdAt } = data;
        let res = await Song.update({ name, singer, url, cover, lrc }, id);
        let { updatedAt } = res;
        updatedAt = formatDate(updatedAt);
        let payload = { name, singer, url, cover, lrc, id, createdAt, updatedAt };
        commit('patchSong', payload);
        return res;
    },
    async destroySong({ commit }, id) {
        let res = await Song.destroy(id);
        commit('deleteSong', id);
        return res;
    }
}

const song = { state, getters, mutations, actions }

export default song