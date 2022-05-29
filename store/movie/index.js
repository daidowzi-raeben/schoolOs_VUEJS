// import { fetchMovie } from '@/api'

// const movie = {
//   namespaced: true, // 모듈이 등록될 때, 해당 모듈의 모든 getter, 액션/변이는 자동으로 등록된 모듈의 경로를 기반으로 네임스페이스가 지정됩니다.
//   state: () => ({
//     mainMovie: {},
//   }),
//   getters: {},
//   mutations: {
//     SET_MAIN_MOVIE(state, mainMovie) {
//       state.mainMovie = mainMovie
//     },
//   },
//   actions: {
//     async FETCH_MAIN_MOVIE({ commit }, id) {
//       try {
//         const { data } = await fetchMovie(id)
//         commit('SET_MAIN_MOVIE', data)
//         return data
//       } catch (error) {
//         console.warn(error)
//       } finally {
//         console.log('finally')
//       }
//     },
//   },
// }
// export default movie
