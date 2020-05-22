import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    phones: []
  },
  mutations: {
    updatePhones(state, phones) {
      state.phones = phones
    },
    addNewPhone(state, phone) {
      state.phones.push(phone)
    },
    deleteNewPhone(state, i) {
      state.phones.splice(i, 1)
    },
    editNewPhone(state, phone) {
      state.phones.splice(phone.key, 1, {number: phone.number})
    }
  },
  actions: {
    async fetchPhones(context) {
      const res = await fetch('/phones')
      const phones = await res.json()
      console.log(phones);
      context.commit('updatePhones', phones.response)
    }
  },
  getters: {
    getPhones(state) {
      return state.phones
    }
  }
})
