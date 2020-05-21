import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    phones: [{number: 12345}, {number: 67890}]
  },
  mutations: {
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

  },
  getters: {
    getPhones(state) {
      return state.phones
    }
  }
})
