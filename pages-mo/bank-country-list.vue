<template>
  <div id="school-content">
    <div class="flex">
      <div v-if="$route.query.history" class="historyBack m-l-3 m-b-5">
        <nuxt-link to="/">
          <b-icon icon="arrow-left"></b-icon>
        </nuxt-link>
      </div>
      <div v-if="!$route.query.history" class="historyBack m-l-3 m-b-5">
        <b-icon icon="arrow-left" onclick="history.back()"></b-icon>
      </div>
      <div
        v-if="
          totalPay &&
          totalPay.list &&
          totalPay.list.length > 0 &&
          totalPay.teacher &&
          totalPay.teacher.inflation === 'Y'
        "
        class="text-center flex-full p-r-6 m-t-2 font-12"
      >
        총
        <strong class="font-18"
          ><em>{{
            totalPay.list[0].total_pay ? totalPay.list[0].total_pay : 0 | comma
          }}</em></strong
        >
        <span v-if="LOGIN_STUDENT">{{ LOGIN_STUDENT.t_reg_pay_unit }}</span>
      </div>
      <div v-else class="text-center flex-full p-r-6 m-t-2 font-12"></div>
    </div>
    <!-- 
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
      <div class="m-t-3">
        <p>종료일</p>
        <select
          v-model="status"
          class="jelly-text jelly-text--h wd-full flex-full m-t-2"
        >
          <option :value="null">전체</option>
          <option value="0">입금</option>
          <option value="1">출금</option>
        </select>
      </div>
      <div class="m-t-3 text-center">
        <button class="jelly-btn jelly-btn--pink wd-full" @click="onSubmit">
          조회하기
        </button>
      </div>
    </div> -->
    <div class="m-t-5 content">
      <div class="content__body">
        <div v-if="totalPay.list" class="quest__content m-t-3">
          <div
            v-for="(v, index) in totalPay.list"
            :key="index"
            class="box quest m-b-3"
          >
            <div class="flex m-t-0">
              <div class="flex-full m-l-2">
                <div class="m-t-0">
                  <div class="txt flex">
                    <p class="">
                      <span v-if="v.status === '0'">대출</span>
                      <span v-if="v.status === '1'">급여</span>
                      <span v-if="v.status === '2'">이자</span>
                      <span v-if="v.status === '3'">기타</span>
                      <span v-if="v.status === '4'">수수료</span>
                      <span v-if="v.status === '5'">세금</span>
                      <span v-if="v.status === '6'">정부마켓</span>
                      <span v-if="v.status === '7'">마켓</span>
                      <span v-if="v.status === '8'">가입</span>
                      <span v-if="v.status === '9'">알바고</span>
                      <br />
                      <em v-if="v.status === '0'">{{ v.bank_memo }} 대출</em>
                      <em v-if="v.status === '1'"
                        >{{ v.student_memo }} 급여 지급</em
                      >
                      <em v-if="v.status === '2'">{{ v.bank_memo }} 이자</em>
                      <em v-if="v.status === '3'">
                        {{ v.student_memo }} 에게 입금 <br />{{
                          v.etc_memo
                        }}</em
                      >
                      <em v-if="v.status === '4'"
                        >{{ v.item_memo }} 상품판매수수료</em
                      >
                      <em v-if="v.status === '5'">{{ v.student_memo }} 세금</em>
                      <em v-if="v.status === '6'">
                        {{ v.bill_memo }} {{ v.bill_memo2 }}
                      </em>
                      <em v-if="v.status === '7'">{{ v.item_memo }} 판매</em>
                      <em v-if="v.status === '8'">가입</em>
                      <em v-if="v.status === '9'"
                        >{{ v.alba_name }} 알바비 지급</em
                      >
                    </p>
                    <div
                      class="flex-right text-right flex-shrink m-t-5"
                      :class="v.status === '1' ? 'jelly-color--type4' : ''"
                    >
                      <!-- <span v-if="v.status === '1'">-</span> -->
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
        <div v-else class="quest__content m-t-3 text-center p-5">
          아직 내역이 없어요
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
      isHistory: '',
      status: null,
      totalPay: {
        list: {},
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
    console.log(this.$nuxt, this.$config, this.rangeCalendar)
    this.params = this.LOGIN_STUDENT
    const frm = new FormData()
    frm.append('type', 'teacherPayList')
    frm.append('smt_idx', this.LOGIN_STUDENT.smt_idx)
    this.$axios
      .post('http://api.school-os.net' + '/student.php', frm, {
        header: {
          'Context-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res)
        this.totalPay.list = res.data.teacherPayList
        this.totalPay.teacher = res.data.teacher
        this.$bvModal.show('teacherPayList')
      })
      .catch((res) => {
        console.log('AXIOS FALSE', res)
      })
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT
    onClickTodoDetail(idx) {
      this.$router.push('/todo-detail/' + idx)
    },
    onSubmit() {
      this.LOADING_TRUE()
      this.params = this.LOGIN_STUDENT
      this.params.start_day = this.start_day
      this.params.end_day = this.end_day
      this.params.status = this.status
      this.params.type = 'bankTransferList'
      this.GET_AXIOS(this.params)

      setTimeout(() => {
        // this.start_day = this.GET_AXIOS_CALLBACK_GETTER.monthDate.start_day
        // this.end_day = this.GET_AXIOS_CALLBACK_GETTER.monthDate.end_day
        // this.status = this.GET_AXIOS_CALLBACK_GETTER.status
      }, 1000)
    },
  },
}
</script>

<style lang="scss"></style>
