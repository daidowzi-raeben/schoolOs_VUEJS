import axios from 'axios'
import Vue from 'vue'
import Vuex, { Store } from 'vuex'
Vue.use(Vuex)
// const apiUrl = {
//   apiMain: '/student.php?type=main&smt_idx=1&sms_idx=1',
// }
const createStore = () => {
  return new Store({
    state: {
      getMainState: [],
    },
    mutations: {
      getMainSuccess(state, payload) {
        state.getMainState = payload
        console.log('PAYLOAD', state.getMainState)
      },
      getMainFails(state, payload) {
        console.log(payload)
      },
    },
    actions: {
      // -------------------메인 컨텐츠
      getMain({ commit }, params) {
        console.log(params)
        axios
          // .get(process.env.VUE_APP_API + apiUrl.apiMain)
          .get(
            process.env.VUE_APP_API +
              '/student.php?type=' +
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
    },
  })
}

export default createStore
