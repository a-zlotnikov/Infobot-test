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
    addPhone(state, phone) {
      state.phones.push({number: phone})
    },
    deletePhone(state, phone) {
      state.phones = state.phones.filter(i => i !== phone)
    },
    editPhone(state, phone) {
      state.phones.splice(phone.key, 1, {number: phone.number})
    }
  },
  actions: {
    async fetchPhones(context) {
      const res = await fetch('/phones')
      const phones = await res.json()
      context.commit('updatePhones', phones.response)
    },
    async addNewPhone(context, phone) {
      let res = await fetch('/phones', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({number: phone})
      })
      const result = await res.json()
      if (result.answer === 'ok') {
        context.commit('addPhone', phone)
      }
    },
    async deleteNewPhone(context, phone) {
      let res = await fetch('/phones', {
        method: 'DELETE',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({number: phone.number})
      })
      const result = await res.json()
      if (result.answer === 'ok') {
        context.commit('deletePhone', phone)
      }
    },
    async editNewPhone(context, phone) {
      let res = await fetch('/phones', {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({phone})
      })
      const result = await res.json()
      if (result.answer === 'ok') {
        context.commit('editPhone', phone.newPhone)
      }
    }
  },
  getters: {
    getPhones(state) {
      return state.phones
    },
    phonesAmount(state) {
      return state.phones.length
    }
  }
})
