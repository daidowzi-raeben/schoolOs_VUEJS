<template>
  <div>
    <!-- <div>
      <input v-model="pay" class="jelly-text" />
      <button @click="onSubmit">빌리기</button>
    </div> -->
    <div class="">
      <div class="">
        <h4 v-if="LOGIN_TEACHER && GET_AXIOS_CALLBACK_GETTER.teacherPayList">
          {{ LOGIN_TEACHER.reg_country }}
          통장
        </h4>
      </div>
      <div id="jellyAdminheader" style="padding-top: 0vh">
        <div v-if="GET_AXIOS_CALLBACK_GETTER.teacherPayList">
          <div v-if="LOGIN_TEACHER" class="m-t-5">
            <span
              class="spanBox m-r-2"
              :class="queryCate === '' ? 'is_active' : ''"
              @click="onClickCategory('')"
              >전체
              {{
                GET_AXIOS_CALLBACK_GETTER.teacherPayList[0].total_pay | comma
              }}
              {{ LOGIN_TEACHER.reg_pay_unit }}</span
            >
            <span>
              <span
                class="spanBox m-r-2"
                :class="queryCate === '1' ? 'is_active' : ''"
                @click="onClickCategory('1')"
              >
                입금
                {{
                  (Number(
                    GET_AXIOS_CALLBACK_GETTER.teacherPayList[0].total_pay
                  ) -
                    Number(
                      GET_AXIOS_CALLBACK_GETTER.teacherPayList[0].total_pay_m
                    ))
                    | comma
                }}
                {{ LOGIN_TEACHER.reg_pay_unit }}</span
              >
            </span>
            <span>
              <span
                class="spanBox m-r-2"
                :class="queryCate === '2' ? 'is_active' : ''"
                @click="onClickCategory('2')"
              >
                출금
                {{
                  GET_AXIOS_CALLBACK_GETTER.teacherPayList[0].total_pay_m
                    | comma
                }}
                {{ LOGIN_TEACHER.reg_pay_unit }}</span
              >
            </span>
          </div>
        </div>
        <div class="m-t-3">
          <div class="student">
            <div class="student__list">
              <table class="jelly-table">
                <thead>
                  <tr>
                    <th>일시</th>
                    <th>구분</th>
                    <th>금액</th>
                    <th>내용</th>
                  </tr>
                </thead>
                <!-- 0:대출,1:주급,2:이자,3:기타,4:상품등록수수료,5:세금,6:정부마켓,7:마켓,8:가입,9:알바 -->
                <tbody v-if="GET_AXIOS_CALLBACK_GETTER.teacherPayList">
                  <tr
                    v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.teacherPayList"
                    :key="`table${i}`"
                  >
                    <td>{{ v.datetime }}</td>
                    <td v-if="v.status === '0'">대출</td>
                    <td v-if="v.status === '1'">주급</td>
                    <td v-if="v.status === '2'">이자</td>
                    <td v-if="v.status === '3'">기타</td>
                    <td v-if="v.status === '4'">수수료</td>
                    <td v-if="v.status === '5'">세금</td>
                    <td v-if="v.status === '6'">정부마켓</td>
                    <td v-if="v.status === '7'">마켓</td>
                    <td v-if="v.status === '8'">가입</td>
                    <td v-if="v.status === '9'">알바고</td>
                    <td
                      class="text-center"
                      :class="Number(v.pay) < 0 ? 'jelly-color--type4' : ''"
                    >
                      {{ v.pay | comma }}
                    </td>
                    <td v-if="v.status === '0'">{{ v.bank_memo }} 대출</td>
                    <td v-if="v.status === '1'">
                      {{ v.student_memo }} 주급 지급
                    </td>
                    <td v-if="v.status === '2'">{{ v.bank_memo }} 이자</td>
                    <td v-if="v.status === '3'">기타</td>
                    <td v-if="v.status === '4'">
                      {{ v.item_memo }} 상품판매수수료
                    </td>
                    <td v-if="v.status === '5'">{{ v.student_memo }} 세금</td>
                    <td v-if="v.status === '6'">
                      {{ v.bill_memo }}
                    </td>
                    <td v-if="v.status === '7'">{{ v.item_memo }} 판매</td>
                    <td v-if="v.status === '8'">가입</td>
                    <td v-if="v.status === '9'">
                      {{ v.alba_name }} 알바비 지급
                    </td>
                  </tr>
                </tbody>
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
      queryCate: '',
    }
  },

  computed: {
    ...mapState(['LOGIN']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_TEACHER']),
  },
  watch: {
    '$route.query.cate': {
      handler(value) {
        console.log(value)
        this.params.type = 'teacherPayList'
        if (value) {
          this.params.type = 'teacherPayList'
          this.queryCate = value
          this.params = this.LOGIN_TEACHER
          this.params.queryCate = value
          this.GET_AXIOS(this.params)
        } else {
          this.params.type = 'teacherPayList'
          this.params.queryCate = null
          this.params = this.LOGIN_TEACHER
          this.GET_AXIOS(this.params)
        }
      },
      immediate: true,
    },
  },
  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },
  mounted() {
    //   DATA INIT
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_TEACHER
    this.params.type = 'teacherPayList'
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT
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
    onClickCategory(e) {
      if (e) {
        this.$router.push(`/pay-list?cate=${e}`)
      } else {
        this.queryCate = ''
        this.$router.push(`/pay-list`)
      }
    },
  },
}
</script>

<style lang="scss"></style>
