<template>
  <div id="school-content">
    <div v-if="GET_AXIOS_CALLBACK_GETTER.newNotice">
      <ul class="flex">
        <li v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.newNotice" :key="i">
          <nuxt-link :to="'/notice-detail/' + v.idx">
            {{ v.bd_subject }}
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div v-if="GET_AXIOS_CALLBACK_GETTER.notice">
      <ul class="flex">
        <li v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.notice" :key="i">
          <nuxt-link :to="'/notice-detail/' + v.idx">
            {{ v.bd_subject }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  layout: 'default-mo',
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  asyncData({ params }) {
    console.log(params)
    return {
      idx: params.id,
    }
  },
  data() {
    return {
      params: {},
    }
  },

  computed: {
    ...mapState(['LOGIN']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_STUDENT']),
  },
  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },
  mounted() {
    //   DATA INIT
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_STUDENT
    this.params.type = 'noticelist'
    this.params.page = this.idx
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations([]),

    // EVENT
    onClickTodoDetail(idx) {
      this.$router.push('/todo-detail/' + idx)
    },
  },
}
</script>

<style lang="scss"></style>
