<template>
  <div>
    <!-- <div>
      <input v-model="pay" class="jelly-text" />
      <button @click="onSubmit">빌리기</button>
    </div> -->
    <div class="">
      <div id="jellyAdminheader" style="padding-top: 0vh">
        <!-- <span>{{ today }}</span> -->
        <h1 v-if="LOGIN_TEACHER && GET_AXIOS_CALLBACK_GETTER">환경설정</h1>
        <div class="student form">
          <div class="student__list">
            <div class="flex m-t-3">
              <div
                v-if="GET_AXIOS_CALLBACK_GETTER.tax_semen"
                class="item"
                style="width: 100%"
              >
                <p>
                  기본 세금
                  <span
                    v-b-tooltip.hover
                    title="소득세, 원천징수 등 세금을 이름을 설정하여 주급 지급 시 부과할 수 있습니다."
                  >
                    <b-icon icon="exclamation-circle"></b-icon>
                  </span>
                </p>
                <div class="d-flex">
                  <input
                    v-model="tax.tax_semen_nm"
                    class="jelly-text jelly-text--under"
                  />
                  <input
                    v-model="tax.tax_semen"
                    class="jelly-text jelly-text--under text-right m-l-2"
                  />
                  <span v-if="LOGIN_TEACHER" class="input-focus m-t-1 m-l-2">
                    %
                  </span>
                </div>
                <p class="m-t-5">
                  고정 세금
                  <span
                    v-b-tooltip.hover
                    title="주급 지급 시 비율이 아닌 고정 금액의 세금을 부과할 수 있습니다."
                  >
                    <b-icon icon="exclamation-circle"></b-icon>
                  </span>
                </p>
                <div class="d-flex">
                  <input
                    v-model="tax.tax_dose_nm"
                    class="jelly-text jelly-text--under"
                  />
                  <input
                    v-model="tax.tax_dose"
                    class="jelly-text jelly-text--under text-right m-l-2"
                  />
                  <span v-if="LOGIN_TEACHER" class="input-focus m-t-1 m-l-2">
                    {{ LOGIN_TEACHER.reg_pay_unit }}
                  </span>
                </div>
                <p class="m-t-5">
                  젤리복권
                  <span
                    v-b-tooltip.hover
                    title="매주 월요일 9시부터 금요일 14시까지 판매를 시작하며, 총 구매금액의 60% : 1등, 30%: 2등, 20%: 3등, 구매금액: 4등 으로 추첨합니다. 1,2,3등은 제세공과금 22%가 부과됩니다."
                  >
                    <b-icon icon="exclamation-circle"></b-icon>
                  </span>
                </p>
                <div class="d-flex">
                  <select v-model="tax.jb_mode" class="jelly-text">
                    <option :value="null">선택하세요</option>
                    <option value="Y">사용</option>
                    <option value="N">미사용</option>
                  </select>
                </div>
                <p class="m-t-5">젤리복권 구매가격</p>
                <div class="d-flex">
                  <input
                    v-model="tax.jb_pay"
                    class="jelly-text jelly-text--under text-right m-l-2"
                  />
                  <span v-if="LOGIN_TEACHER" class="input-focus m-t-1 m-l-2">
                    {{ LOGIN_TEACHER.reg_pay_unit }}
                  </span>
                </div>
                <div class="m-t-5 text-center">
                  <button class="jelly-btn jelly-btn--blue" @click="onSubmit">
                    수정
                  </button>
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
// import settingVue from './setting.vue'
// import { axiosForm } from '~/config/util'

export default {
  layout: 'default-pc',
  data() {
    return {
      params: {},
      paramsForm: {},
      pay: 0,
      payWon: '',
      tax: {
        tax_dose: '',
        tax_semen: '',
        tax_dose_nm: '',
        tax_semen_nm: '',
        type: 'teacherTax',
        jb_mode: null,
        jb_pay: 0,
      },
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
    this.params.type = 'teacherTax'
    this.GET_AXIOS(this.params)
    if (this.GET_AXIOS_CALLBACK_GETTER.tax_dose) {
      console.log('=========', this.GET_AXIOS_CALLBACK_GETTER)
    }
    setTimeout(() => {
      this.tax.tax_dose = this.GET_AXIOS_CALLBACK_GETTER.tax_dose
      this.tax.tax_dose_nm = this.GET_AXIOS_CALLBACK_GETTER.tax_dose_nm
      this.tax.tax_semen = this.GET_AXIOS_CALLBACK_GETTER.tax_semen
      this.tax.tax_semen_nm = this.GET_AXIOS_CALLBACK_GETTER.tax_semen_nm
      this.tax.jb_mode = this.GET_AXIOS_CALLBACK_GETTER.teacher.jb_mode
      this.tax.jb_pay = this.GET_AXIOS_CALLBACK_GETTER.teacher.jb_pay
    }, 1500)

    console.log(
      'this.GET_AXIOS_CALLBACK_GETTER',
      this.GET_AXIOS_CALLBACK_GETTER
    )
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT
    onSubmit() {
      this.tax.smt_idx = this.LOGIN_TEACHER.smt_idx
      this.POST_AXIOS(this.tax)
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
