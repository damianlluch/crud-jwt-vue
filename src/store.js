import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {}
  },
  mutations: {
  	auth_success(state, token, user){
    	state.status = 'success'
    	state.token = token
    	state.user = user
  	},
  auth_request(state, token, user){
		  state.status = 'loading'
	  },
  	auth_error(state){
    	state.status = 'error'
  	},
  	logout(state){
    	state.status = ''
    	state.token = ''
  	}
  },
  actions: {
  	login({commit}, user){
    	return new Promise((resolve, reject) => {
      		commit('auth_request')
      		axios({url: 'http://localhost:8000/api/login', params: { email: user.email, password: user.password }, method: 'POST' })
      		.then(resp => {
        		const token = "Bearer "+resp.data.success.token
        		const user = resp.data.user
        		localStorage.setItem('token', token)
        		axios.defaults.headers.common['Authorization'] = token
        		commit('auth_success', token, user)
        		resolve(resp)
      		})
      		.catch(err => {
        		commit('auth_error')
        		localStorage.removeItem('token')
        		reject(err)
      		})
    	})
	},

	logout({commit}){
  		return new Promise((resolve, reject) => {
    		commit('logout')
    		localStorage.removeItem('token')
    		delete axios.defaults.headers.common['Authorization']
    		resolve()
  		})
	}


  },
  getters : {
  	isLoggedIn: state => !!state.token,
  	authStatus: state => state.status
  }
})
