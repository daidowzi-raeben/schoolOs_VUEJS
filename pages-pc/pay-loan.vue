<template>
  <div>
    <!-- <div>
      <input v-model="pay" class="jelly-text" />
      <button @click="onSubmit">빌리기</button>
    </div> -->
    <div class="">
      <div id="jellyAdminheader" style="padding-top: 0vh">
        <!-- <span>{{ today }}</span> -->
        <h1 v-if="LOGIN_TEACHER && GET_AXIOS_CALLBACK_GETTER.total_pay">
          대출 받기
          <span v-b-tooltip.hover title="현재 재산" class="spanBox">
            {{ GET_AXIOS_CALLBACK_GETTER.total_pay.total_pay | comma }}
            {{ LOGIN_TEACHER.reg_pay_unit }}
          </span>
        </h1>
        <div class="student form">
          <div class="student__list">
            <div class="flex m-t-3">
              <div class="item" style="width: 100%">
                <p>
                  필요한 액수를 입력하세요 (현재 금리
                  <span v-if="GET_AXIOS_CALLBACK_GETTER.total_pay"
                    >{{ GET_AXIOS_CALLBACK_GETTER.total_pay.interest }}%</span
                  >)
                </p>
                <div class="d-flex">
                  <input
                    :value="pay"
                    class="jelly-text jelly-text--under text-right"
                    @input="payComma($event)"
                    @click="resetInput($event)"
                  />
                  <span v-if="LOGIN_TEACHER" class="input-focus m-t-1 m-l-2">
                    {{ LOGIN_TEACHER.reg_pay_unit }}
                  </span>
                  <button
                    v-b-tooltip.hover
                    title="인플레이션 모드 사용 시 원금을 갚아 물가를 조정할 수 있습니다."
                    class="jelly-btn jelly-btn--blue m-l-5"
                    @click="onSubmit('r')"
                  >
                    갚기
                  </button>
                  <button
                    v-b-tooltip.hover
                    title="인플레이션 모드 사용 시 대출 금액이 많아질 수록 물가가 상승합니다."
                    class="jelly-btn jelly-btn--pink m-l-5"
                    @click="onSubmit('l')"
                  >
                    빌리기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="GET_AXIOS_CALLBACK_GETTER.loanList" class="student">
          <div class="student__list">
            <h3>대출 현황</h3>
            <div class="m-t-3">
              <div
                v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.loanList"
                :key="i"
                class="item"
              >
                <p class="title">
                  {{ v.pay | comma }}
                </p>
                <div class="flex">
                  <div class="list">
                    <p>{{ v.datetime | moment('YYYY-MM-DD') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
// import { axiosForm } from '~/config/util'

export default {
  layout: 'default-pc',
  data() {
    return {
      params: {},
      paramsForm: {},
      pay: 0,
      payWon: '',
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
    this.params.type = 'loanList'
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT
    onSubmit(m) {
      this.paramsForm = this.LOGIN_TEACHER
      this.paramsForm.type = 'loanList'
      this.paramsForm.mode = m
      this.paramsForm.pay = this.uncomma(this.pay)
      this.POST_AXIOS(this.paramsForm)
      setTimeout(() => {
        this.params = this.LOGIN_TEACHER
        this.params.type = 'loanList'
        this.GET_AXIOS(this.params)
      }, 1000)
    },
    payComma(e) {
      this.pay = this.comma(this.uncomma(e.target.value))
    },
    comma(str) {
      str = String(str)
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
    },
    uncomma(str) {
      str = String(str)
      return str.replace(/[^\d]+/g, '')
    },
    resetInput(e) {
      e.target.value = ''
    },
  },
}
</script>

<style lang="scss"></style>
