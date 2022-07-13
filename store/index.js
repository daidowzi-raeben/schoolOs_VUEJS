import axios from 'axios'
import Vue from 'vue'
import Vuex, { Store } from 'vuex'
Vue.use(Vuex)
// const apiUrl = {
//   apiMain: '/student.php?type=main&smt_idx=1&sms_idx=1',
// }
// const LOCALSTORAGE = localStorage.getItem('STUDENT')
// console.log('LOCALSTORAGE', LOCALSTORAGE)
const createStore = () => {
  return new Store({
    state: {
      LOADING: true,
      GET_MAIN_STATE: [],
      POST_AXIOS_CALLBACK_DATA: [],
      GET_AXIOS_CALLBACK_DATA: [],
      LOGIN: [],

      //  ---------------------------------[admin]

      //  ---------------------------------[chat]
      chatURL: 'http://localhost:9000',

      //  ---------------------------------[output api]
      adminMainBG: [],
      mySchoolInformation: [],
    },
    getters: {
      POST_AXIOS_CALLBACK_GETTER(state) {
        state.LOADING = false
        return state.POST_AXIOS_CALLBACK_DATA
          ? state.POST_AXIOS_CALLBACK_DATA
          : ''
      },
      GET_AXIOS_CALLBACK_GETTER(state) {
        state.LOADING = false
        return state.GET_AXIOS_CALLBACK_DATA
          ? state.GET_AXIOS_CALLBACK_DATA
          : ''
      },
      LOGIN_STUDENT(state) {
        if (typeof window !== 'undefined') {
          return localStorage.getItem('STUDENT')
            ? (state.LOGIN = JSON.parse(localStorage.getItem('STUDENT')))
            : (state.LOGIN = '')
        }
      },
      LOGIN_TEACHER(state) {
        if (typeof window !== 'undefined') {
          return localStorage.getItem('TEACHER')
            ? (state.LOGIN = JSON.parse(localStorage.getItem('TEACHER')))
            : (state.LOGIN = '')
        }
      },
    },
    mutations: {
      getMainSuccess(state, payload) {
        state.GET_MAIN_STATE = payload
        console.log('PAYLOAD', state.GET_MAIN_STATE)
      },
      getMainFails(state, payload) {
        console.log(payload)
      },
      POST_AXIOS_CALLBACK_DATA_SUCCESS(state, payload) {
        // state.LOADING = true
        state.POST_AXIOS_CALLBACK_DATA = payload
      },
      GET_AXIOS_CALLBACK_DATA_SUCCESS(state, payload) {
        // state.LOADING = true
        state.GET_AXIOS_CALLBACK_DATA = payload
      },
      LOGIN_LOCALSTORAGE(state, payload) {
        if (payload === false) {
          return alert('아이디 및 패스워드를 확인해 주세요')
        }
        if (!payload) {
          return alert('아이디 및 패스워드를 확인해 주세요')
        }
        console.log('LOGIN_LOCALSTORAGE')
        localStorage.clear()
        if (process.env.DEVICE === 'mo') {
          localStorage.setItem('STUDENT', JSON.stringify(payload))
        } else {
          localStorage.setItem('TEACHER', JSON.stringify(payload))
        }
      },
      LOADING_INIT(state) {
        state.LOADING = true
      },
      //  ---------------------------------[admin]
      ADMIN_MAIN_BG_MUTATIONS(state, payload) {
        state.adminMainBG = payload
      },
      GET_API_MY_SCHOOL_SUCCESS(state, payload) {
        state.mySchoolInformation = payload
      },
    },
    actions: {
      // -------------------메인 컨텐츠
      getMain({ commit }, params) {
        let URL_TYPE = ''
        process.env.DEVICE === 'mo'
          ? (URL_TYPE = 'student')
          : (URL_TYPE = 'teacher')
        axios
          // .get(process.env.VUE_APP_API + apiUrl.apiMain)
          .get(
            process.env.VUE_APP_API +
              '/' +
              URL_TYPE +
              '.php?type=' +
              params.type +
              '&smt_idx=' +
              params.smt_idx +
              '&sms_idx=' +
              params.sms_idx
          )
          .then((res) => {
            commit('getMainSuccess', res.data)
            console.log('get', res.data)
          })
          .catch((res) => {
            commit('getMainFails', res)
            console.log('false', res)
          })
      },
      POST_AXIOS({ commit }, params, state) {
        let URL_TYPE = ''
        process.env.DEVICE === 'mo'
          ? (URL_TYPE = 'student')
          : (URL_TYPE = 'teacher')
        const FORM_DATA = new FormData()
        Object.entries(params).forEach((v, k, i) => {
          FORM_DATA.append(v[0], v[1])
        })
        axios
          .post(process.env.VUE_APP_API + '/' + URL_TYPE + '.php', FORM_DATA)
          .then((res) => {
            commit('POST_AXIOS_CALLBACK_DATA_SUCCESS', res.data)
            if (params.type === 'login') {
              const loginData = res.data
              process.env.DEVICE === 'mo'
                ? (loginData.sms_idx = res.data.idx)
                : (loginData.smt_idx = res.data.idx)
              commit('LOGIN_LOCALSTORAGE', loginData)
            }
            console.log('POST_AXIOS_CALLBACK_DATA_SUCCESS', res.data)
          })
          .catch((res) => {
            if (params.type === 'login') {
              const loginData = false
              commit('LOGIN_LOCALSTORAGE', loginData)
            }
            console.log('POST_AXIOS_CALLBACK_DATA_FALIE', res)
          })
      },
      GET_AXIOS({ commit }, params) {
        let URL_TYPE = ''
        process.env.DEVICE === 'mo'
          ? (URL_TYPE = 'student')
          : (URL_TYPE = 'teacher')
        axios
          .get(process.env.VUE_APP_API + '/' + URL_TYPE + '.php', { params })
          .then((res) => {
            // 메인 데이터 합계
            if (params.type === 'main' && process.env.DEVICE === 'mo') {
              const total =
                res.data.status.intellect +
                res.data.status.effort +
                res.data.status.health +
                res.data.status.etiquette
              res.data.status.total = total
            }
            commit('GET_AXIOS_CALLBACK_DATA_SUCCESS', res.data)
            console.log('GET_AXIOS_CALLBACK_DATA_SUCCESS', res.data)
          })
          .catch((res) => {
            console.log('GET_AXIOS_CALLBACK_DATA_FALIE', res)
            console.log('URL_TYPE', URL_TYPE)
          })
      },
      GET_API_BG_PIXABAY({ commit }, params) {
        const URL = `https://pixabay.com/api/?key=28223619-acf2f7347a14ed8608f2c4939&image_type=photo&pretty=true&lang=ko&safesearch=true&per_page=10&page=1&q=${params}`
        axios
          .get(URL)
          .then((res) => {
            // 메인 데이터 합계
            commit('ADMIN_MAIN_BG_MUTATIONS', res.data)
            console.log('ADMIN_MAIN_BG_MUTATIONS', res.data)
          })
          .catch((res) => {
            console.log('ADMIN_MAIN_BG_MUTATIONS', res)
          })
      },
      GET_API_MY_SCHOOL({ commit }, params) {
        axios
          .get(process.env.VUE_APP_API + '/student.php', { params })
          .then((res) => {
            commit('GET_API_MY_SCHOOL_SUCCESS', JSON.parse(res.data))
            console.log('GET_API_MY_SCHOOL_SUCCESS', JSON.parse(res.data))
          })
          .catch((res) => {
            console.log('GET_API_MY_SCHOOL_FALSE', res)
          })
      },
    },
  })
}

export default createStore
