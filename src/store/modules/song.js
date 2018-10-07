import Song from '@/helpers/song.js'
import formatDate from '@/helpers/formatDate.js'
const state = {
    allSongs: null,
    editingSong: null
}

const getters = {}

const mutations = {
    setAllSongs(state, payload) {
        state.allSongs = payload;
    },
    setEditingSong(state, payload) {
        payload > -1 ? state.editingSong = state.allSongs[payload] : state.editingSong = null;
    },
    patchSong(state, payload) {
        let array = state.allSongs;
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === payload.id) {
                array[i] = payload;
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
        let res = await Song.createSong(data);
        return res;
    },

    async fetchAllSongs({ commit }) {
        let array = [];
        let res = await Song.fetchAllSongs().then(songs => {
            songs.forEach(song => {
                let { id, createdAt, updatedAt, attributes } = song;
                createdAt = formatDate(createdAt);
                updatedAt = formatDate(updatedAt);
                array.push({ id, createdAt, updatedAt, ...attributes });
            });
        })
        commit('setAllSongs', array);
        return Promise.resolve(array);
    },

    async updateSong({ commit }, data) {
        let { name, singer, url, cover, lrc, id, createdAt } = data;
        let res = await Song.updateSong({ name, singer, url, cover, lrc }, id);
        let { updatedAt } = res;
        let payload = { name, singer, url, cover, lrc, id, createdAt, updatedAt };
        commit('patchSong', payload);
        return res;
    },

    async destroySong({ commit }, id) {
        let res = await Song.destroySong(id);
        commit('deleteSong', id);
        return res;
    }
}

const song = { state, getters, mutations, actions }

export default song