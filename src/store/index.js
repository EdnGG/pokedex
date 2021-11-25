import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

import { auth } from '../firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    pokemons: [],
    prev: "",
    next: "",
    urlId: {}

  },
  mutations: {
    updateSetPokemons(state, payload) {
      console.log('payload mutations ', payload)
      // state.pokemons = state.pokemons.push(payload.newPokemons)
      state.pokemons = payload.newPokemons
      // state.prev = payload.prev
      // state.next = payload.next
    },
    setPokemons(state, payload) {

      state.pokemons = payload.results
      state.urlId = payload.Id
      state.prev = payload.prev
      state.next = payload.next
    },
    setUser(state, user) {
      state.user = user
    },
    setError(state, error) {
      state.error = error
    }
  },
  actions: {
    updateGetPockemons({ commit }, payload) {
      console.log('payload actions: ', payload)
      commit('updateSetPokemons', payload)
    },
    async getPockemons({ commit }, payload) {

      try {
        console.log('payload: ', payload)
        if (payload) {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${payload.offset}&limit=${payload.limit}`)
          const data = await response.json()
          const results = data.results
          console.log('data results: ', results)
          const id = results.reduce((acc, cur, inx) => acc = { ...acc, [cur.name]: inx + 1 }, {})
          const pokemosRes1 = {
            results,
            id
          }
          commit('setPokemons', pokemosRes1)

        } else {
          const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
          const data = await res.json()
          const results = data.results
          const prev = data.prev
          const next = data.next
          console.log('data : ', data.next)
          const id = results.reduce((acc, cur, inx) => acc = { ...acc, [cur.name]: inx + 1 }, {})
          const pokemosRes = {
            results,
            id,
            prev,
            next
          }
          commit('setPokemons', pokemosRes)
        }
      } catch (error) {

        commit('setError', error)
      }
    },
    loginUser({ commit }, user) {
      auth.signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const userLoged = {
            email: res.user.email,
            uid: res.user.uid
          }
          commit('setUser', userLoged)
          router.push('/')
        },
          error => {
            commit('setError', error)
          }
        )
    },
    createUser({ commit }, user) {
      auth.createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          console.log(res)
          const userCreated = {
            email: res.user.email,
            uid: res.user.uid
          }
          commit('setUser', userCreated)
          router.push('/')
        })
        .catch(error => {
          console.log(error)
          commit('setError', error)
        })
    },
    logoutUser({ commit }) {
      auth.signOut()
        .then(() => {
          commit('setUser', null)
          router.push('/login')
        })
    },
    userActive({ commit }, user) {
      commit('setUser', user)
    }
  },
  getters: {
    userIsActive(state) {
      // return state.user !== null
      if (state.user === null) {
        return false
      } else {
        return true
      }
    }
  },
  modules: {
  }
})
