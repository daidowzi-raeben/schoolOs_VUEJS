<template>
  <div>
    <!-- <div>
      <input v-model="pay" class="jelly-text" />
      <button @click="onSubmit">빌리기</button>
    </div> -->
    <div class="">
      <div class="">
        <h4 v-if="LOGIN_TEACHER && STATE_TEACHER_PAY_LOAN.total_pay">
          대출관리
          <em v-b-tooltip.hover title="현재 재산" class="m-l-2 font-14">
            {{ STATE_TEACHER_PAY_LOAN.total_pay.total_pay | comma }}
            {{ LOGIN_TEACHER.reg_pay_unit }}
          </em>
        </h4>
      </div>
      <div id="jellyAdminheader" style="padding-top: 0vh">
        <div class="student form">
          <div class="student__list">
            <div class="flex m-t-3">
              <div class="item" style="width: 100%">
                <p>
                  필요한 액수를 입력하세요 (현재 금리
                  <span v-if="STATE_TEACHER_PAY_LOAN.total_pay"
                    >{{ STATE_TEACHER_PAY_LOAN.total_pay.interest }}%</span
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
                    title="인플레이션 모드 사용 시 대출 금액이 많아질 수록 물가가 상승합니다."
                    class="jelly-btn jelly-btn--pink m-l-5"
                    @click="onSubmit('l')"
                  >
                    빌리기
                  </button>
                  <button
                    v-b-tooltip.hover
                    title="인플레이션 모드 사용 시 원금을 갚아 물가를 조정할 수 있습니다."
                    class="jelly-btn jelly-btn--blue m-l-5"
                    @click="onSubmit('r')"
                  >
                    갚기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="student">
          <div class="student__list">
            <h3>대출 현황</h3>
            <div class="m-t-3">
              <table v-if="STATE_TEACHER_PAY_LOAN.loanList" class="jelly-table">
                <tr>
                  <th>일시</th>
                  <th>대출액</th>
                </tr>
                <tr v-for="(v, i) in STATE_TEACHER_PAY_LOAN.loanList" :key="i">
                  <td>{{ v.datetime | moment('YYYY-MM-DD') }}</td>
                  <td class="text-right">{{ v.pay | comma }}</td>
                </tr>
              </table>
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
    ...mapState(['LOGIN', 'STATE_TEACHER_PAY_LOAN']),
    ...mapGetters(['ACTIONS_TEACHER_CALLBACK_GETTER', 'LOGIN_TEACHER']),
  },
  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },
  mounted() {
    //   DATA INIT
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_TEACHER
    this.params.type = 'loanList'
    this.ACTIONS_TEACHER(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'ACTIONS_TEACHER']),
    ...mapMutations(['LOADING_TRUE', 'MUTATIONS_TEACHER_PAY_LOAN']),

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
        this.ACTIONS_TEACHER(this.params)
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
