<template>
  <div id="school-content">
    <div class="historyBack m-l-3 m-b-5">
      <b-icon icon="arrow-left" onclick="history.back()"></b-icon>
    </div>
    <div
      v-if="
        GET_AXIOS_CALLBACK_GETTER.student &&
        GET_AXIOS_CALLBACK_GETTER.student.deposit === '1'
      "
      class="text-center"
    >
      <h5>지금은 이용할 수 없어요</h5>
    </div>
    <div v-else class="content">
      <div class="m-t-1 h60">
        <div class="account">
          <div
            v-if="GET_AXIOS_CALLBACK_GETTER.account && LOGIN_STUDENT"
            class="quest__content m-t-3 m-l-3 m-r-3"
          >
            <div class="box quest m-b-3">
              <span class="bold" style="font-size: 20px">
                알바고 등록하기
              </span>
            </div>

            <div class="m-t-4">
              <p>제목</p>
              <input
                v-model="alba.subject"
                type="text"
                class="jelly-text jelly-text--h wd-full m-t-1"
                placeholder="무슨일을 하나요?"
              />
            </div>
            <div class="m-t-3 relative">
              <p>알바비</p>
              <input
                :value="alba.pay"
                type="tel"
                class="jelly-text jelly-text--h wd-full text-right p-r-10 m-t-1"
                placeholder="한명당 알바비는 얼마인가요?"
                @input="payComma($event)"
              />
              <span
                v-if="LOGIN_STUDENT.t_reg_pay_unit"
                style="position: absolute; right: 10px; top: 35px"
                >{{ LOGIN_STUDENT.t_reg_pay_unit }}</span
              >
            </div>
            <div class="m-t-3 relative">
              <p>인원</p>
              <input
                v-model="alba.personnel"
                type="tel"
                class="jelly-text jelly-text--h wd-full text-right p-r-10 m-t-1"
                placeholder="몇명이 할 수 있는 일인가요?"
              />
              <span style="position: absolute; right: 10px; top: 35px">명</span>
            </div>
            <div class="m-t-3">
              <p>알바 시작일</p>
              <b-form-datepicker
                v-model="alba.start_day"
                class="jelly-text jelly-text--h wd-full flex-full m-t-1"
                placeholder="시작일"
              ></b-form-datepicker>
            </div>
            <div class="m-t-3">
              <p>알바 종료일</p>
              <b-form-datepicker
                v-model="alba.end_day"
                class="jelly-text jelly-text--h wd-full flex-full m-t-1"
                placeholder="종료일"
              ></b-form-datepicker>
            </div>
            <div class="m-t-3">
              <p>무슨 일을 하나요?</p>
              <textarea
                v-model="alba.content"
                style="height: 300px"
                class="jelly-text jelly-text--h wd-full flex-full m-t-1"
                placeholder="무슨 일을 하는지, 알바를 하며 주의해야 하는 점, 규칙 등을 자세하게 써주세요!"
              ></textarea>
            </div>
            <div class="m-t-3">
              <button
                class="jelly-btn jelly-btn--pink wd-full"
                @click="onSubmit"
              >
                등록하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div id="school-content">
    <div>
      <div class="">
        <select v-if="GET_AXIOS_CALLBACK_GETTER.studentList" ref="sendStudent">
          <option
            v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.studentList"
            :key="i"
            :value="v.idx"
          >
            {{ v.reg_name }}
          </option>
        </select>
      </div>
      <div>
        <div v-if="GET_AXIOS_CALLBACK_GETTER.account">
          {{
            Number(
              GET_AXIOS_CALLBACK_GETTER.account.PtotalAccount -
                GET_AXIOS_CALLBACK_GETTER.account.MtotalAccount
            ) | comma
          }}
        </div>
        <input v-model="accountPrice" type="tel" class="jelly-text" />
        <Span>{{ accountPrice | comma }}</Span>
      </div>
      <button @click="onSubmit">전송</button>
    </div>
  </div> -->
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  // layout: 'default-mo',
  data() {
    return {
      params: {},
      paramsPost: {},
      accountPrice: null,
      accountNumber: '',
      alba: {
        subject: '',
        pay: '',
        start_day: '',
        end_day: '',
        content: '',
        personnel: '',
      },
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
    this.params.type = 'bankTransfer'
    this.params.page = 1
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT

    onSubmit() {
      if (
        !this.alba.subject ||
        !this.alba.content ||
        !this.alba.pay ||
        !this.alba.personnel ||
        !this.alba.start_day ||
        !this.alba.end_day
      ) {
        return alert('모든 항목을 입력해 주세요')
      }
      if (Number(this.alba.personnel) < 1) {
        return alert('인원은 최소 1명부터 가능합니다.')
      }
      if (confirm('등록할까요?')) {
        this.LOADING_TRUE()
        const frm = new FormData()
        frm.append('type', 'albaWrite')
        frm.append('subject', this.alba.subject)
        frm.append('content', this.alba.content)
        frm.append('pay', this.uncomma(this.alba.pay))
        frm.append('start_day', this.alba.start_day)
        frm.append('end_day', this.alba.end_day)
        frm.append('personnel', this.alba.personnel)
        frm.append('sms_idx', this.LOGIN_STUDENT.sms_idx)
        frm.append('smt_idx', this.LOGIN_STUDENT.smt_idx)
        console.log(frm)
        // axiosForm(frm, '/student.php')
        this.$axios
          .post(process.env.VUE_APP_API + '/student.php', frm, {
            header: {
              'Context-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            alert('등록되었어요')
            this.$router.push('/parttime-list/0')
            console.log(res.data)
          })
          .catch((res) => {
            console.error('AXIOS FALSE', res)
          })
      } else {
        return false
      }
    },
    payComma(e) {
      this.alba.pay = this.comma(this.uncomma(e.target.value))
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

<style lang="scss" scoped></style>
