<template>
  <div>
    <div v-if="GET_AXIOS_CALLBACK_GETTER.interest">
      총액 {{ GET_AXIOS_CALLBACK_GETTER.interest.loan }} <br />
      이자율 {{ GET_AXIOS_CALLBACK_GETTER.interest.month_interest }}% <br />
      이자 {{ GET_AXIOS_CALLBACK_GETTER.interest.total_interest }} <br />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  layout: 'default-pc',
  data() {
    return {
      params: {},
      paramsForm: {},
    }
  },

  computed: {
    ...mapState(['LOGIN']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_TEACHER']),
  },

  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },

  mounted() {
    //   DATA INIT
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_TEACHER
    this.params.type = 'interestPurveyance'
    this.GET_AXIOS(this.params)
  },

  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT
    onSubmit() {
      console.log('onSubmit')
      this.paramsForm = this.LOGIN_TEACHER
    },
  },
}
</script>

<style lang="scss"></style>
