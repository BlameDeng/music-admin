import Song from '@/helpers/song.js'
const state = {}

const getters = {}

const mutations = {}

const actions = {
    async createSong({ commit }, data) {
        let res = await Song.createSong(data);
        return res;
    }
}

const song = { state, getters, mutations, actions }

export default song