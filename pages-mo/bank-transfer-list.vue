<template>
  <div id="school-content">
    <div class="historyBack m-l-3 m-b-5">
      <b-icon icon="arrow-left" onclick="history.back()"></b-icon>
    </div>
    <div v-if="GET_AXIOS_CALLBACK_GETTER.monthDate" class="content p-l-3 p-r-3">
      <div class="">
        <p>시작일</p>
        <b-form-datepicker
          v-model="start_day"
          class="jelly-text jelly-text--h wd-full flex-full m-t-2"
          placeholder="시작일"
        ></b-form-datepicker>
      </div>
      <div class="m-t-3">
        <p>종료일</p>
        <b-form-datepicker
          v-model="end_day"
          class="jelly-text jelly-text--h wd-full flex-full m-t-2"
          placeholder="종료일"
        ></b-form-datepicker>
      </div>
      <div class="m-t-3 text-center">
        <button class="jelly-btn jelly-btn--pink wd-full" @click="onSubmit">
          조회하기
        </button>
      </div>
    </div>
    <div class="m-t-5 content">
      <div class="content__body">
        <div
          v-if="GET_AXIOS_CALLBACK_GETTER.bankTransferList"
          class="quest__content m-t-3"
        >
          <div
            v-for="(v, index) in GET_AXIOS_CALLBACK_GETTER.bankTransferList"
            :key="index"
            class="box quest m-b-3"
          >
            <div class="flex m-t-0">
              <div class="flex-full m-l-2">
                <div class="m-t-0">
                  <div class="txt flex">
                    <p class="">
                      <span v-if="v.status === '1'" class="jelly-color--type4"
                        >[출금]</span
                      >
                      <span v-if="v.status === '0'">[입금]</span>
                      <em v-if="v.case_result === '출금'" style="color: #111">
                        {{ v.send_sms_name }} 에게 출금
                      </em>
                      <em v-if="v.case_result === '입금'" style="color: #111">
                        {{ v.send_sms_name }} 으로부터 입금
                      </em>
                      <em v-if="v.case_result === '쇼핑'" style="color: #111">
                        {{ v.buy_item_name }} 구입
                      </em>
                      <em v-if="v.case_result === '보상'"
                        >{{ v.quest_name }} 보상</em
                      >
                      <em v-if="v.case_result === '기타'" style="color: #111">{{
                        v.etc_memo
                      }}</em>
                      <em
                        v-if="v.case_result === '대출'"
                        style="color: #111"
                      ></em>
                      <em v-if="v.case_result === '벌금'" style="color: #111">{{
                        v.penalty_memo
                      }}</em>
                      <em v-if="v.case_result === '주급'" style="color: #111"
                        >주급지급</em
                      >
                      <em
                        v-if="v.case_result === '에러'"
                        style="color: #111"
                      ></em>
                    </p>
                    <div
                      class="flex-right text-right m-t-1"
                      :class="v.status === '1' ? 'jelly-color--type4' : ''"
                    >
                      <span v-if="v.status === '1'">-</span>
                      {{ v.pay | comma }}
                    </div>
                  </div>
                  <p class="m-t-2">
                    <span>{{ v.datetime | moment('YY.MM.DD') }}</span>
                  </p>
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

export default {
  data() {
    return {
      params: {},
      paramsPost: {},
      start_day: '',
      end_day: '',
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
    console.log(this.$nuxt, this.$config, this.rangeCalendar)
    this.params = this.LOGIN_STUDENT
    this.params.type = 'bankTransferList'
    this.GET_AXIOS(this.params)

    setTimeout(() => {
      this.start_day = this.GET_AXIOS_CALLBACK_GETTER.monthDate.start_day
      this.end_day = this.GET_AXIOS_CALLBACK_GETTER.monthDate.end_day
      // this.rangeCalendar = this.GET_AXIOS_CALLBACK_GETTER.monthDate
    }, 1000)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations([]),

    // EVENT
    onClickTodoDetail(idx) {
      this.$router.push('/todo-detail/' + idx)
    },
    onSubmit() {
      this.params = this.LOGIN_STUDENT
      this.params.start_day = this.start_day
      this.params.end_day = this.end_day
      this.params.type = 'bankTransferList'
      this.GET_AXIOS(this.params)

      setTimeout(() => {
        this.start_day = this.GET_AXIOS_CALLBACK_GETTER.monthDate.start_day
        this.end_day = this.GET_AXIOS_CALLBACK_GETTER.monthDate.end_day
        // this.rangeCalendar = this.GET_AXIOS_CALLBACK_GETTER.monthDate
      }, 1000)
    },
  },
}
</script>

<style lang="scss"></style>
