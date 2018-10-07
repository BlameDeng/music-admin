import Song from '@/helpers/song.js'
const state = {
    allSongs: []
}

const getters = {}

const mutations = {
    setAllSongs(state, payload) {
        state.allSongs = payload;
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
                array.push({ id, createdAt, updatedAt, ...attributes });
            });
        })
        commit('setAllSongs', array);
        return Promise.resolve(array);
    }
}

const song = { state, getters, mutations, actions }

export default song