<template>
  <div>
    <!-- <div>
      <input ref="pay" class="jelly-text" />
      <button @click="onSubmit">빌리기</button>
    </div> -->
    <div class="">
      <div class="flex">
        <h4 v-if="LOGIN_TEACHER" class="is_active">세율설정</h4>
      </div>
      <div id="jellyAdminheader" style="padding-top: 0vh">
        <div class="student form">
          <div class="student__list">
            <div class="flex m-t-3">
              <div
                v-if="STATE_TEACHER_SETTING && STATE_TEACHER_SETTING.teacher"
                class="item"
                style="width: 100%"
              >
                <p>
                  기본 세금
                  <span
                    v-b-tooltip.hover
                    title="소득세, 원천징수 등 세금을 이름을 설정하여 급여 지급 시 부과할 수 있습니다."
                  >
                    <b-icon icon="exclamation-circle"></b-icon>
                  </span>
                </p>
                <div class="d-flex">
                  <input
                    ref="tax_semen_nm"
                    class="jelly-text jelly-text--under"
                    :value="STATE_TEACHER_SETTING.tax_semen_nm"
                  />
                  <input
                    ref="tax_semen"
                    class="jelly-text jelly-text--under text-right m-l-2"
                    :value="STATE_TEACHER_SETTING.tax_semen"
                  />
                  <span v-if="LOGIN_TEACHER" class="input-focus m-t-1 m-l-2">
                    %
                  </span>
                </div>
                <p class="m-t-5">
                  고정 세금
                  <span
                    v-b-tooltip.hover
                    title="급여 지급 시 비율이 아닌 고정 금액의 세금을 부과할 수 있습니다."
                  >
                    <b-icon icon="exclamation-circle"></b-icon>
                  </span>
                </p>
                <div class="d-flex">
                  <input
                    ref="tax_dose_nm"
                    class="jelly-text jelly-text--under"
                    :value="STATE_TEACHER_SETTING.tax_dose_nm"
                  />
                  <input
                    ref="tax_dose"
                    class="jelly-text jelly-text--under text-right m-l-2"
                    :value="STATE_TEACHER_SETTING.tax_dose"
                  />
                  <span v-if="LOGIN_TEACHER" class="input-focus m-t-1 m-l-2">
                    {{ LOGIN_TEACHER.reg_pay_unit }}
                  </span>
                </div>
                <p class="m-t-5">
                  젤리복권
                  <span
                    v-b-tooltip.hover
                    title="매주 월요일 9시부터 금요일 14시까지 판매를 시작하며, 총 구매금액의 50% : 1등, 30%: 2등, 20%: 3등, 구매금액: 4등 으로 추첨합니다."
                  >
                    <b-icon icon="exclamation-circle"></b-icon>
                  </span>
                </p>
                <div class="d-flex m-t-3">
                  <select
                    ref="jb_mode"
                    class="jelly-text"
                    style="width: 150px"
                    :value="STATE_TEACHER_SETTING.teacher.jb_mode"
                  >
                    <option :value="null">선택하세요</option>
                    <option value="Y">사용</option>
                    <option value="N">미사용</option>
                  </select>
                </div>
                <p class="m-t-5">젤리복권 구매가격</p>
                <div class="d-flex">
                  <input
                    ref="jb_pay"
                    class="jelly-text jelly-text--under text-right m-l-2"
                    :value="STATE_TEACHER_SETTING.teacher.jb_pay"
                  />
                  <span v-if="LOGIN_TEACHER" class="input-focus m-t-1 m-l-2">
                    {{ LOGIN_TEACHER.reg_pay_unit }}
                  </span>
                </div>
                <p class="m-t-5">알림장 읽음 보상</p>
                <div class="d-flex">
                  <input
                    ref="notice_pay"
                    class="jelly-text jelly-text--under text-right m-l-2"
                    :value="STATE_TEACHER_SETTING.teacher.notice_pay"
                  />
                  <span v-if="LOGIN_TEACHER" class="input-focus m-t-1 m-l-2">
                    {{ LOGIN_TEACHER.reg_pay_unit }}
                  </span>
                </div>
                <div class="m-t-5 text-center">
                  <button class="jelly-btn jelly-btn--blue" @click="onSubmit">
                    저장
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
        notice_pay: '',
      },
    }
  },

  computed: {
    ...mapState(['LOGIN', 'STATE_TEACHER_SETTING']),
    ...mapGetters(['', 'LOGIN_TEACHER']),
  },
  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },
  mounted() {
    //   DATA INIT
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_TEACHER
    this.params.type = 'teacherTax'
    this.ACTIONS_TEACHER(this.params)
    if (this.STATE_TEACHER_SETTING.tax_dose) {
      console.log('=========')
    }
    // this.tax.tax_dose = this.STATE_TEACHER_SETTING.tax_dose
    // this.tax.tax_dose_nm = this.STATE_TEACHER_SETTING.tax_dose_nm
    // this.tax.tax_semen = this.STATE_TEACHER_SETTING.tax_semen
    // this.tax.tax_semen_nm = this.STATE_TEACHER_SETTING.tax_semen_nm
    // this.tax.jb_mode = this.STATE_TEACHER_SETTING.teacher.jb_mode
    // this.tax.jb_pay = this.STATE_TEACHER_SETTING.teacher.jb_pay
    // this.tax.notice_pay = this.STATE_TEACHER_SETTING.teacher.notice_pay
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'ACTIONS_TEACHER']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT
    onSubmit() {
      this.tax.tax_dose = this.$refs.tax_dose.value
      this.tax.tax_dose_nm = this.$refs.tax_dose_nm.value
      this.tax.tax_semen = this.$refs.tax_semen.value
      this.tax.tax_semen_nm = this.$refs.tax_semen_nm.value
      this.tax.jb_mode = this.$refs.jb_mode.value
      this.tax.jb_pay = this.$refs.jb_pay.value
      this.tax.notice_pay = this.$refs.notice_pay.value
      this.tax.smt_idx = this.LOGIN_TEACHER.smt_idx
      this.POST_AXIOS(this.tax)
      alert('저장되었습니다.')
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
