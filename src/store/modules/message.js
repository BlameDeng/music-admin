import formatDate from '@/helpers/formatDate.js'

let today = new Date();
let time = today.getTime();
let tomorrow = new Date(time + 1000 * 60 * 60 * 24);
let str = `${tomorrow.getFullYear()}年${tomorrow.getMonth()+1}月${tomorrow.getDate()}日`;
let yesterday = new Date(time - 1000 * 60 * 60 * 24);
let messageTime = formatDate(yesterday);
let messages = [
    { content: `【系统通知】系统版本号 0.0.1`, time: messageTime },
    { content: `【系统通知】只支持上传小于2M的MP3格式音乐文件（最好别上传）`, time: messageTime },
    { content: `【系统通知】对已有歌曲、歌手、专辑、歌单的编辑和删除都将被拦截，但你新增的信息可以随意编辑和删除`, time: messageTime },
    { content: `【系统通知】系统将于${str}凌晨4点到6点进行日常维护`, time: messageTime }
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
        state.unread = state.unread.filter(item => item.content !== payload.content);
        state.read.push(payload);
    },
    moveToTrash(state, payload) {
        state.trash = state.trash || [];
        state.read = state.read.filter(item => item.content !== payload.content);
        state.trash.push(payload);
    },
    backToRead(state, payload) {
        state.read = state.read || [];
        state.trash = state.trash.filter(item => item.content !== payload.content);
        state.read.push(payload);
    },
    destroy(state, payload) {
        state.trash = state.trash.filter(item => item.content !== payload.content);
    }
}

const actions = {}

export default { state, getters, mutations, actions }