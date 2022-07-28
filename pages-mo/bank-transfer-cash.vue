<template>
  <div id="school-content">
    <div class="historyBack m-l-3 m-b-5">
      <b-icon icon="arrow-left" onclick="history.back()"></b-icon>
    </div>
    <div class="content">
      <div class="m-t-1 h60">
        <div class="account">
          <div
            v-if="GET_AXIOS_CALLBACK_GETTER.account && LOGIN_STUDENT"
            class="quest__content m-t-3 m-l-3 m-r-3"
          >
            <div class="box quest m-b-3">
              <span class="jelly-color--888"> 총 </span>
              <span class="bold" style="font-size: 20px">
                {{
                  Number(
                    GET_AXIOS_CALLBACK_GETTER.account.PtotalAccount -
                      GET_AXIOS_CALLBACK_GETTER.account.MtotalAccount
                  ) | comma
                }}
              </span>
              <span class="jelly-color--888">
                {{ LOGIN_STUDENT.t_reg_pay_unit }}
              </span>
            </div>
            <div><em>출금 담당자와 함께 출금하세요!</em></div>
            <div class="m-t-2 relative">
              <input
                :value="accountPrice"
                type="tel"
                class="jelly-text jelly-text--h wd-full text-right p-r-10"
                placeholder="얼마를 출금할까요?"
                @input="payComma($event)"
                @click="resetInput($event)"
              />
              <span
                v-if="LOGIN_STUDENT.t_reg_pay_unit"
                style="position: absolute; right: 10px; top: 11px"
                >{{ LOGIN_STUDENT.t_reg_pay_unit }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="quest-fixed">
        <button class="jelly-btn jelly-btn--pink" @click="onClickSendModal">
          출금하기
        </button>
      </div>
    </div>
    <b-modal id="completeFile" size="lg" hide-footer hide-header>
      <div>
        <p>출금 확인 버튼은 담당자가 눌러야 해요!</p>
        <p>출금 확인 후 담당자에게 출금 금액만큼 화폐를 꼭 받아가세요!</p>
      </div>
      <div class="m-t-5 flex">
        <button
          class="jelly-btn jelly-btn--default m-r-1 flex-full"
          style="border-radius: 0"
          @click="$bvModal.hide('completeFile')"
        >
          취소하기
        </button>
        <button
          class="jelly-btn jelly-btn--pink flex-full m-l-1"
          style="border-radius: 0"
          @click="onSubmit()"
        >
          출금하기
        </button>
      </div>
    </b-modal>
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
    this.params.type = 'bankTransferCash'
    this.params.page = 1
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT

    onClickSendModal() {
      const myPrice = Number(
        this.GET_AXIOS_CALLBACK_GETTER.account.PtotalAccount -
          this.GET_AXIOS_CALLBACK_GETTER.account.MtotalAccount
      )

      if (this.accountPrice <= 0) {
        alert('금액을 다시 입력해주세요')
        return false
      }
      if (this.accountPrice > myPrice) {
        alert('잔액이 부족해요')
        return false
      } else {
        this.$bvModal.show('completeFile')
      }
    },
    onSubmit() {
      // alert('send_sms_idx')
      this.paramsPost = this.LOGIN_STUDENT
      this.paramsPost.type = 'bankTransferCash'
      this.paramsPost.pay = this.uncomma(this.accountPrice)
      console.log(this.paramsPost.send_sms_idx)
      this.POST_AXIOS(this.paramsPost)
      this.$bvModal.hide('completeFile')
      setTimeout(() => {
        alert('출금이 완료되었습니다. 꼭 화폐를 지급받으세요')
        this.$router.push(`/bank-transfer-list?history=home`)
      }, 1500)
    },
    payComma(e) {
      this.accountPrice = this.comma(this.uncomma(e.target.value))
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
