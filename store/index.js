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
      GET_AXIOS_CALLBACK_DATA_MAIN: [],
      GET_AXIOS_CALLBACK_DATA_SUB: [],
      LOGIN: [],
      GET_AXIOS_CALLBACK_DATA_BILL: [],
      GET_AXIOS_CALLBACK_DATA_LAYOUT: [],
      GET_AXIOS_CALLBACK_DATA_LAYOUT_STUDENT: [],
      GET_AXIOS_CALLBACK_DATA_PW: [],
      studentIdMSG: '',
      // STUDENT
      STATE_STUDENT_ALBA: [],
      // TEACHER
      STATE_TEACHER_PAY_LOAN: [], // 대출관리
      STATE_TEACHER_BILL: [],
      STATE_TEACHER_BILL_STUDENT: [],
      STATE_TEACHER_INDEX: [],
      STATE_TEACHER_JOB: [],
      STATE_TEACHER_LOTTERY: [],
      STATE_TEACHER_NOTICE: [],
      STATE_TEACHER_PARTTIME: [],
      STATE_TEACHER_PAY_LIST: [],
      STATE_TEACHER_RULE: [],
      STATE_TEACHER_SHOP: [],
      STATE_TEACHER_APPLY: [],
      STATE_TEACHER_STUDENT: [],
      STATE_TEACHER_SUE: [],
      STATE_TEACHER_SETTING: [],
      STATE_TEACHER_TODO: [],
      STATE_TEACHER_TODO_END: [],

      //  ---------------------------------[admin]

      //  ---------------------------------[chat]
      chatURL: 'http://localhost:9000',

      //  ---------------------------------[output api]
      adminMainBG: '/pc/img/bg/london-bridge-by-sunny.jpg',
      mySchoolInformation: [],
    },
    getters: {
      // 대출관리
      // GETTER_TEACHER_ALBA(state) {
      //   state.LOADING = false
      //   return state.STATE_TEACHER_PAY_LOAN ? state.STATE_TEACHER_PAY_LOAN : ''
      // },
      GETTER_STUDENT_ALBA(state) {
        state.LOADING = false
        return state.STATE_STUDENT_ALBA ? state.STATE_STUDENT_ALBA : ''
      },
      POST_AXIOS_CALLBACK_GETTER(state) {
        state.LOADING = false
        return state.POST_AXIOS_CALLBACK_DATA
          ? state.POST_AXIOS_CALLBACK_DATA
          : ''
      },
      GET_AXIOS_CALLBACK_GETTER(state) {
        // state.LOADING = false
        return state.GET_AXIOS_CALLBACK_DATA
          ? state.GET_AXIOS_CALLBACK_DATA
          : ''
      },
      GET_AXIOS_CALLBACK_GETTER_MAIN(state) {
        state.LOADING = false
        return state.GET_AXIOS_CALLBACK_DATA_MAIN
          ? state.GET_AXIOS_CALLBACK_DATA_MAIN
          : ''
      },
      GET_AXIOS_CALLBACK_GETTER_LAYOUT(state) {
        // state.LOADING = false
        return state.GET_AXIOS_CALLBACK_DATA_LAYOUT
          ? state.GET_AXIOS_CALLBACK_DATA_LAYOUT
          : ''
      },
      GET_AXIOS_CALLBACK_GETTER_LAYOUT_STUDENT(state) {
        state.LOADING = false
        return state.GET_AXIOS_CALLBACK_DATA_LAYOUT_STUDENT
          ? state.GET_AXIOS_CALLBACK_DATA_LAYOUT_STUDENT
          : ''
      },
      GET_AXIOS_CALLBACK_GETTER_PW(state) {
        state.LOADING = false
        return state.GET_AXIOS_CALLBACK_DATA_PW
          ? state.GET_AXIOS_CALLBACK_DATA_PW
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
      STUDENT_ID_CHECK(state) {
        return state.studentIdMSG
      },
    },
    mutations: {
      // // 초기화
      // MUTATIONS_TEACHER_INIT(state, payload) {
      //   state.STATE_TEACHER_PAY_LOAN = payload
      //   console.log('PAYLOAD', state.STATE_TEACHER_PAY_LOAN)
      // },
      // 대출관리
      MUTATIONS_TEACHER_PAY_LOAN(state, payload) {
        state.STATE_TEACHER_PAY_LOAN = payload
        console.log('MUTATIONS_TEACHER_PAY_LOAN', state.STATE_TEACHER_PAY_LOAN)
      },
      // SOC
      MUTATIONS_TEACHER_BILL(state, payload) {
        state.STATE_TEACHER_BILL = payload
        console.log('MUTATIONS_TEACHER_BILL', state.STATE_TEACHER_BILL)
      },
      // 고지서
      MUTATIONS_TEACHER_BILL_STUDENT(state, payload) {
        state.STATE_TEACHER_BILL_STUDENT = payload
        console.log(
          'MUTATIONS_TEACHER_BILL_STUDENT',
          state.STATE_TEACHER_BILL_STUDENT
        )
      },
      // 메인
      MUTATIONS_TEACHER_INDEX(state, payload) {
        state.STATE_TEACHER_INDEX = payload
        console.log('MUTATIONS_TEACHER_INDEX', state.STATE_TEACHER_INDEX)
      },
      // 직업관리
      MUTATIONS_TEACHER_JOB(state, payload) {
        state.STATE_TEACHER_JOB = payload
        console.log('MUTATIONS_TEACHER_JOB', state.STATE_TEACHER_JOB)
      },
      // 로또
      MUTATIONS_TEACHER_LOTTERY(state, payload) {
        state.STATE_TEACHER_LOTTERY = payload
        console.log('MUTATIONS_TEACHER_LOTTERY', state.STATE_TEACHER_LOTTERY)
      },
      // 알림장
      MUTATIONS_TEACHER_NOTICE(state, payload) {
        state.STATE_TEACHER_NOTICE = payload
        console.log('PAYLOAD', state.STATE_TEACHER_NOTICE)
      },
      // 알바
      MUTATIONS_TEACHER_PARTTIME(state, payload) {
        state.STATE_TEACHER_PARTTIME = payload
        console.log('PAYLOAD', state.STATE_TEACHER_PARTTIME)
      },
      // 국고통장
      MUTATIONS_TEACHER_PAY_LIST(state, payload) {
        state.STATE_TEACHER_PAY_LIST = payload
        console.log('PAYLOAD', state.STATE_TEACHER_PAY_LIST)
      },
      // 규칙관리
      MUTATIONS_TEACHER_RULE(state, payload) {
        state.STATE_TEACHER_RULE = payload
        console.log('PAYLOAD', state.STATE_TEACHER_RULE)
      },
      // 상점관리
      MUTATIONS_TEACHER_SHOP(state, payload) {
        state.STATE_TEACHER_SHOP = payload
        console.log('PAYLOAD', state.STATE_TEACHER_SHOP)
      },
      // 회원신청
      MUTATIONS_TEACHER_APPLY(state, payload) {
        state.STATE_TEACHER_APPLY = payload
        console.log('PAYLOAD', state.STATE_TEACHER_APPLY)
      },
      // 학생관리
      MUTATIONS_TEACHER_STUDENT(state, payload) {
        state.STATE_TEACHER_STUDENT = payload
        console.log('PAYLOAD', state.STATE_TEACHER_STUDENT)
      },
      // 신고관리
      MUTATIONS_TEACHER_SUE(state, payload) {
        state.STATE_TEACHER_SUE = payload
        console.log('STATE_TEACHER_SUE', state.STATE_TEACHER_SUE)
      },
      // 환경설정
      MUTATIONS_TEACHER_SETTING(state, payload) {
        state.STATE_TEACHER_SETTING = payload
        console.log('PAYLOAD', state.STATE_TEACHER_SETTING)
      },
      // TODO
      MUTATIONS_TEACHER_TODO(state, payload) {
        state.STATE_TEACHER_TODO = payload
        console.log('PAYLOAD', state.STATE_TEACHER_TODO)
      },
      // TODO_END
      MUTATIONS_TEACHER_TODO_END(state, payload) {
        state.STATE_TEACHER_TODO_END = payload
        console.log('PAYLOAD', state.STATE_TEACHER_TODO_END)
      },
      // 학생알바
      MUTATIONS_STUDENT_ALBA(state, payload) {
        state.STATE_STUDENT_ALBA = payload
        console.log('PAYLOAD', state.STATE_STUDENT_ALBA)
      },
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
      GET_AXIOS_CALLBACK_DATA_SUCCESS_MAIN(state, payload) {
        // state.LOADING = true
        state.GET_AXIOS_CALLBACK_DATA_MAIN = payload
      },
      GET_AXIOS_CALLBACK_DATA_SUCCESS_LAYOUT(state, payload) {
        // state.LOADING = true
        state.GET_AXIOS_CALLBACK_DATA_LAYOUT = payload
      },
      GET_AXIOS_CALLBACK_DATA_SUCCESS_LAYOUT_STUDENT(state, payload) {
        // state.LOADING = true
        state.GET_AXIOS_CALLBACK_DATA_LAYOUT_STUDENT = payload
      },
      GET_AXIOS_CALLBACK_DATA_SUCCESS_PW(state, payload) {
        // state.LOADING = true
        state.GET_AXIOS_CALLBACK_DATA_PW = payload
      },
      GET_AXIOS_CALLBACK_DATA_SUCCESS_BILL(state, payload) {
        // state.LOADING = true
        state.GET_AXIOS_CALLBACK_DATA_BILL = payload
      },
      GET_AXIOS_CALLBACK_DATA_SUCCESS_SUB(state, payload) {
        state.GET_AXIOS_CALLBACK_DATA_SUB = payload
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
        state.LOADING = false
      },
      LOADING_TRUE(state) {
        state.LOADING = true
      },
      LOGOUT_INIT(state) {
        state.GET_MAIN_STATE = null
        state.POST_AXIOS_CALLBACK_DATA = null
        state.GET_AXIOS_CALLBACK_DATA = null
        state.GET_AXIOS_CALLBACK_DATA_SUB = null
        state.LOGIN = null
        state.GET_AXIOS_CALLBACK_DATA_BILL = null
      },
      //  ---------------------------------[admin]
      ADMIN_MAIN_BG_MUTATIONS(state, payload) {
        state.adminMainBG = payload
      },
      ADMIN_MAIN_BG_FALSE_MUTATIONS(state, payload) {
        state.adminMainBG = payload
      },
      GET_API_MY_SCHOOL_SUCCESS(state, payload) {
        state.mySchoolInformation = payload
      },
      GET_STUDENT_ID_SUCCESS(state, payload) {
        state.studentIdMSG = payload
      },
    },
    actions: {
      // -------------------교사 통합
      ACTIONS_TEACHER({ commit }, params) {
        commit('LOADING_TRUE')
        console.log('ACTIONS_TEACHER_PARAMS', params)
        axios
          .get(process.env.VUE_APP_API + '/teacher.php', { params })
          .then((res) => {
            // // 고지서
            // commit('MUTATIONS_TEACHER_BILL_STUDENT', res.data)
            // // 메인
            // commit('MUTATIONS_TEACHER_INDEX', res.data)
            // // 직업관리
            // commit('MUTATIONS_TEACHER_JOB', res.data)
            // // 로또
            // commit('MUTATIONS_TEACHER_LOTTERY', res.data)
            // // 알림장
            // commit('MUTATIONS_TEACHER_NOTICE', res.data)
            // // 알바
            // commit('MUTATIONS_TEACHER_PARTTIME', res.data)
            // // 국고통장
            // commit('MUTATIONS_TEACHER_PAY_LIST', res.data)
            // // 규칙관리
            // commit('MUTATIONS_TEACHER_RULE', res.data)
            // // 상점관리
            // commit('MUTATIONS_TEACHER_SHOP', res.data)
            // // 회원신청
            // commit('MUTATIONS_TEACHER_APPLY', res.data)
            // // 학생관리
            // commit('MUTATIONS_TEACHER_STUDENT', res.data)

            // // TODO
            // commit('MUTATIONS_TEACHER_TODO', res.data)
            // // TODO_END
            // commit('MUTATIONS_TEACHER_TODO_END', res.data)
            console.log('ACTIONS_TEACHER', res, params)
            switch (params && params.type) {
              case 'loanList':
                commit('MUTATIONS_TEACHER_PAY_LOAN', res.data)
                break
              case 'teacherTax':
                commit('MUTATIONS_TEACHER_SETTING', res.data)
                break
              case 'billList':
                // SOC
                commit('MUTATIONS_TEACHER_BILL', res.data)
                break
              case 'sueList':
                // 신고관리
                commit('MUTATIONS_TEACHER_SUE', res.data)
                break
              default:
                console.error('ERROR', res)
                break
            }
            // commit('MUTATIONS_TEACHER_PAY_LOAN', res.data)
            commit('LOADING_INIT')
          })
          .catch((res) => {
            console.error('ACTIONS_TEACHER_FALSE', res)
          })
      },
      ACTIONS_TEACHER_SUE({ commit }, params) {
        commit('LOADING_TRUE')
        console.log('ACTIONS_TEACHER_SUE_PARAMS', params)
        axios
          .get(process.env.VUE_APP_API + '/teacher.php', { params })
          .then((res) => {
            console.log('ACTIONS_TEACHER_SUE', res, params)

            commit('MUTATIONS_TEACHER_SUE', res.data)

            commit('LOADING_INIT')
          })
          .catch((res) => {
            console.error('ACTIONS_TEACHER_FALSE', res)
          })
      },
      // -------------------알바
      ACTIONS_STUDENT_ALBA({ commit }, params) {
        commit('LOADING_TRUE')
        console.log('params', params)
        let URL_TYPE = ''
        process.env.DEVICE === 'mo'
          ? (URL_TYPE = 'student')
          : (URL_TYPE = 'teacher')
        axios
          .get(process.env.VUE_APP_API + '/' + URL_TYPE + '.php', { params })
          .then((res) => {
            console.log('ACTIONS_STUDENT_ALBA', res, params)
            commit('MUTATIONS_STUDENT_ALBA', res.data)
            commit('LOADING_INIT')
            params = ''
          })
          .catch((res) => {
            console.error('GET_AXIOS_CALLBACK_DATA_FALIE', res)
            console.log('URL_TYPE', URL_TYPE)
          })
      },
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
            commit('LOADING_INIT')
          })
          .catch((res) => {
            commit('getMainFails', res)
            console.log('false', res)
          })
      },
      POST_AXIOS({ commit }, params, state) {
        commit('LOADING_TRUE')
        console.log('params', params)
        let URL_TYPE = ''
        console.log(process.env.DEVICE, process.env.DEVICE, process.env.DEVICE)
        console.log(
          process.env.VUE_APP_API,
          process.env.DEVICE,
          process.env.DEVICE
        )
        process.env.DEVICE === 'mo'
          ? (URL_TYPE = 'student')
          : (URL_TYPE = 'teacher')
        const FORM_DATA = new FormData()
        Object.entries(params).forEach((v, k, i) => {
          FORM_DATA.append(v[0], v[1])
        })
        axios
          .post(process.env.VUE_APP_API + '/' + URL_TYPE + '.php', FORM_DATA, {
            header: {
              'Context-Type': 'multipart/form-data',
            },
          })
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
            commit('LOADING_INIT')
          })
          .catch((res) => {
            if (params.type === 'login') {
              const loginData = false
              commit('LOGIN_LOCALSTORAGE', loginData)
            }
            console.log('POST_AXIOS_CALLBACK_DATA_FALIE', res)
          })
      },
      POST_AXIOS_FORM({ commit }, params, state) {
        commit('LOADING_TRUE')
        console.log('params', params)
        let URL_TYPE = ''
        process.env.DEVICE === 'mo'
          ? (URL_TYPE = 'student')
          : (URL_TYPE = 'teacher')
        axios
          .post(process.env.VUE_APP_API + '/' + URL_TYPE + '.php', params, {
            header: {
              'Context-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            commit('POST_AXIOS_CALLBACK_DATA_SUCCESS', res.data)
            console.log('POST_AXIOS_CALLBACK_DATA_SUCCESS', res.data)
            commit('LOADING_INIT')
            params = ''
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
        commit('LOADING_TRUE')
        console.log('params', params)
        let URL_TYPE = ''
        process.env.DEVICE === 'mo'
          ? (URL_TYPE = 'student')
          : (URL_TYPE = 'teacher')
        axios
          .get(process.env.VUE_APP_API + '/' + URL_TYPE + '.php', { params })
          .then((res) => {
            // 메인 데이터 합계
            if (
              params &&
              params.type === 'main' &&
              process.env.DEVICE === 'mo' &&
              res.data.status
            ) {
              const total =
                res.data.status.intellect +
                res.data.status.effort +
                res.data.status.health +
                res.data.status.etiquette
              res.data.status.total = total
            }
            if (params && params.type === 'billStudentCnt') {
              commit('GET_AXIOS_CALLBACK_DATA_SUCCESS_BILL', res.data.cnt)
            } else if (params && params.type === 'ruleStudent') {
              commit('GET_AXIOS_CALLBACK_DATA_SUCCESS_SUB', res.data)
            } else if (params && params.type === 'main') {
              commit('GET_AXIOS_CALLBACK_DATA_SUCCESS_MAIN', res.data)
            } else {
              commit('GET_AXIOS_CALLBACK_DATA_SUCCESS', res.data)
            }
            console.log('GET_AXIOS_CALLBACK_DATA_SUCCESS_LOG', res, params)
            setTimeout(() => {
              commit('LOADING_INIT')
            }, 1000)
            params = ''
          })
          .catch((res) => {
            console.error('GET_AXIOS_CALLBACK_DATA_FALIE', res)
            console.log('URL_TYPE', URL_TYPE)
          })
      },
      GET_AXIOS_LAYOUT({ commit }, params) {
        console.log('LAYOUT params', params)
        axios
          .get(process.env.VUE_APP_API + '/teacher.php', { params })
          .then((res) => {
            console.log('GET_AXIOS_CALLBACK_DATA_SUCCESS_LAYOUT', res)
            commit('GET_AXIOS_CALLBACK_DATA_SUCCESS_LAYOUT', res.data)
          })
          .catch((res) => {
            console.error('GET_AXIOS_CALLBACK_DATA_FALIE', res)
          })
      },
      GET_AXIOS_LAYOUT_STUDENT({ commit }, params) {
        console.log('LAYOUT params', params)
        axios
          .get(process.env.VUE_APP_API + '/student.php', { params })
          .then((res) => {
            console.log('GET_AXIOS_CALLBACK_DATA_SUCCESS_LAYOUT_STUDENT', res)
            commit('GET_AXIOS_CALLBACK_DATA_SUCCESS_LAYOUT_STUDENT', res.data)
          })
          .catch((res) => {
            console.error('GET_AXIOS_CALLBACK_DATA_FALIE_STUDENT', res)
          })
      },
      GET_AXIOS_PW({ commit }, params) {
        console.log('LAYOUT params', params)
        axios
          .get(process.env.VUE_APP_API + '/student.php', { params })
          .then((res) => {
            console.log('GET_AXIOS_CALLBACK_DATA_SUCCESS_PW', res)
            commit('GET_AXIOS_CALLBACK_DATA_SUCCESS_PW', res.data)
          })
          .catch((res) => {
            console.error('GET_AXIOS_CALLBACK_DATA_FALIE', res)
          })
      },
      GET_API_BG_PIXABAY({ commit }, params) {
        const URL = `https://pixabay.com/api/?key=28223619-acf2f7347a14ed8608f2c4939&image_type=photo&pretty=true&lang=ko&safesearch=true&per_page=10&page=1&q=${params}`
        axios
          .get(URL)
          .then((res) => {
            // 메인 데이터 합계
            const randNum = Math.floor(Math.random() * 9)
            const imgUrl = res.data.hits[randNum].largeImageURL
            if (imgUrl) {
              commit('ADMIN_MAIN_BG_MUTATIONS', imgUrl)
            }
            console.log(
              'ADMIN_MAIN_BG_MUTATIONS',
              res.data,
              randNum,
              res.data.hits[2].largeImageURL,
              res.data.hits
            )
            commit('LOADING_INIT')
          })
          .catch((res) => {
            commit(
              'ADMIN_MAIN_BG_FALSE_MUTATIONS',
              '/pc/img/bg/london-bridge-by-sunny.jpg'
            )
            console.log('ADMIN_MAIN_BG_MUTATIONS', res)
          })
      },
      GET_API_MY_SCHOOL({ commit }, params) {
        commit('LOADING_TRUE')

        axios
          .get(process.env.VUE_APP_API + '/student.php', { params })
          .then((res) => {
            commit('GET_API_MY_SCHOOL_SUCCESS', JSON.parse(res.data))
            commit('LOADING_INIT')
            console.log('GET_API_MY_SCHOOL_SUCCESS', JSON.parse(res.data))
          })
          .catch((res) => {
            console.error('GET_API_MY_SCHOOL_FALSE', res)
          })
      },
      GET_STUDENT_ID({ commit }, params) {
        commit('LOADING_TRUE')
        axios
          .get(process.env.VUE_APP_API + '/student.php', { params })
          .then((res) => {
            commit('GET_STUDENT_ID_SUCCESS', res.data)
            commit('LOADING_INIT')
            console.log('GET_STUDENT_ID_SUCCESS', res)
          })
          .catch((res) => {
            console.error('GET_API_MY_SCHOOL_FALSE', res)
          })
      },
    },
  })
}

export default createStore
