import formatDate from '@/helpers/formatDate.js'
import Vue from 'vue'

let today = new Date();
let time = today.getTime();
let tomorrow = new Date(time + 1000 * 60 * 60 * 24);
let str = `${tomorrow.getFullYear()}年${tomorrow.getMonth()+1}月${tomorrow.getDate()}日`;
let yesterday = new Date(time - 1000 * 60 * 60 * 24);
let messageTime = formatDate(yesterday);
const messages = [
    { content: `【系统通知】系统版本号为 0.0.1`, time: messageTime },
    { content: `【系统通知】系统将于${str}凌晨2点到6点进行日常维护`, time: messageTime },
    { content: `【系统通知】系统暂只支持MP3格式音乐文件`, time: messageTime }
]

const state = {
    unread: messages,
    read: null,
    trash: null
}

const getters = {}

const mutations = {
    moveToRead(state, payload) {
        state.read = state.read || [];
        let index = state.unread.indexOf(payload);
        state.unread.splice(index, 1);
        state.read.push(payload);
    },
    moveToTrash(state, payload) {
        state.trash = state.trash || [];
        let index = state.read.indexOf(payload);
        state.read.splice(index, 1);
        state.trash.push(payload);
    },
    backToRead(state, payload) {
        state.read = state.read || [];
        let index = state.trash.indexOf(payload);
        state.trash.splice(index, 1);
        state.read.push(payload);
    },
    destroy(state, payload) {
        let index = state.trash.indexOf(payload);
        state.trash.splice(index, 1);
    }
}

const actions = {}

export default { state, getters, mutations, actions }