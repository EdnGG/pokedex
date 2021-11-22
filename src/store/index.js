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
    urlId: {}

  },
  mutations: {
    setPokemons(state, payload) {
      
      state.pokemons = payload.results
      state.urlId = payload.Id
    },
    setUser(state, user) {
      state.user = user
    },
    setError(state, error) {
      state.error = error
    }
  },
  actions: {
    async getPockemons({ commit }) {
    try {    
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
      const data = await res.json()
      const results = data.results
      const id = results.reduce((acc, cur, inx)=> acc = {...acc, [cur.name]: inx + 1}, {})
      const pokemosRes = {
        results,
        id
      }
      commit('setPokemons', pokemosRes)
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
        .then( res => {
          console.log(res)
          const userCreated = {
            email: res.user.email,
            uid: res.user.uid
          } 
          commit('setUser', userCreated)
          router.push('/')
        })
        .catch( error => {
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
    userActive({commit}, user) {
      commit('setUser', user)
    }
  },
  getters: {
    userIsActive(state) {
      // return state.user !== null
      if(state.user === null) {
        return false
      } else {
        return true
      }
    }
  },
  modules: {
  }
})
