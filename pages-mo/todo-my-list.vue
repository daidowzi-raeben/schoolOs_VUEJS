<template>
  <div>
    <div class="p-3 jelly-tab">
      <ul class="flex">
        <li><nuxt-link to="/todo-list">전체 퀘스트</nuxt-link></li>
        <li class="is_active">
          <nuxt-link to="/todo-my-list">나의 퀘스트</nuxt-link>
        </li>
      </ul>
    </div>
    <div class="p-l-3 p-r-3 p-b-3">
      <span class="jelly-badge m-r-1 is_active">전체</span>
      <nuxt-link to="/todo-list?id=1">
        <span class="jelly-badge m-r-1">봉사</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  layout: 'default-mo',
  data() {
    return {
      params: {},
    }
  },

  computed: {
    ...mapState(['LOGIN']),
    ...mapGetters(['POST_AXIOS_CALLBACK_GETTER', 'LOGIN_STUDENT']),
  },
  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },
  mounted() {
    //   DATA INIT
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_STUDENT
    this.params.type = 'questList'
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations([]),
  },
}
</script>

<style lang="scss">
@import '~/assets-mo/common.scss';
</style>
