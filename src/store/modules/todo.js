import Todo from '@/helpers/todo.js'
import formatDate from '@/helpers/formatDate.js'
import Vue from 'vue'
const state = {
    allTodos: null
}

const getters = {}

const mutations = {
    setAllTodos(state, payload) {
        state.allTodos = payload;
    },
    addTodo(state, payload) {
        state.allTodos = state.allTodos || [];
        state.allTodos.push(payload);
    },
    patchTodo(state, payload) {
        let array = state.allTodos;
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === payload.id) {
                Vue.set(array, i, payload);
                break;
            }
        }
    },
    deleteTodo(state, payload) {
        state.allTodos = state.allTodos.filter(todo => todo.id !== payload);
    }
}

const actions = {
    async createTodo({ commit }, data) {
        let res = await Todo.createTodo(data);
        let { id, createdAt, updatedAt, attributes } = res;
        createdAt = formatDate(createdAt);
        updatedAt = formatDate(updatedAt);
        let payload = { id, createdAt, updatedAt, ...attributes };
        commit('addTodo', payload);
        return res;
    },

    async fetchAllTodos({ commit }) {
        let array = [];
        let res = await Todo.fetchAllTodos();
        res.forEach(todo => {
            let { id, createdAt, updatedAt, attributes } = todo;
            createdAt = formatDate(createdAt);
            updatedAt = formatDate(updatedAt);
            array.push({ id, createdAt, updatedAt, ...attributes });
        });
        commit('setAllTodos', array);
        return Promise.resolve(array);
    },

    async updateTodo({ commit }, data) {
        let { content, done, id, createdAt } = data;
        let res = await Todo.updateTodo({ content, done }, id);
        let { updatedAt } = res;
        updatedAt = formatDate(updatedAt);
        let payload = { content, done, id, createdAt, updatedAt };
        commit('patchTodo', payload);
        return res;
    },

    async destroyTodo({ commit }, id) {
        let res = await Todo.destroyTodo(id);
        commit('deleteTodo', id);
        return res;
    }
}

const todo = { state, getters, mutations, actions }

export default todo