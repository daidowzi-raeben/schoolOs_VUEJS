<template>
  <div>
    <!-- <div>
      <input v-model="pay" class="jelly-text" />
      <button @click="onSubmit">빌리기</button>
    </div> -->
    <div class="">
      <div class="">
        <h4 v-if="LOGIN_TEACHER">
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
                GET_AXIOS_CALLBACK_GETTER.teacherPayList[0].total_pay
                  ? GET_AXIOS_CALLBACK_GETTER.teacherPayList[0].total_pay
                  : '0' | comma
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
                  GET_AXIOS_CALLBACK_GETTER.teacherPayList[0].total_pay
                    ? Number(
                        GET_AXIOS_CALLBACK_GETTER.teacherPayList[0].total_pay
                      ) -
                      Number(
                        GET_AXIOS_CALLBACK_GETTER.teacherPayList[0].total_pay_m
                      )
                    : '0' | comma
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
                    ? GET_AXIOS_CALLBACK_GETTER.teacherPayList[0].total_pay_m
                    : '0' | comma
                }}
                {{ LOGIN_TEACHER.reg_pay_unit }}</span
              >
            </span>
          </div>
        </div>
        <div class="m-t-3">
          <div class="flex" style="padding: 20px">
            <div class="m-r-1">
              <select
                v-if="GET_AXIOS_CALLBACK_GETTER.studentList"
                ref="inputStudent"
                class="jelly-text"
                style="width: 150px"
                required
              >
                <option
                  v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.studentList"
                  :key="v.idx"
                  :value="v.idx"
                  :selected="i === 0"
                >
                  {{ v.reg_name }}
                </option>
              </select>
            </div>
            <div>
              <input
                ref="inputPay"
                class="jelly-text text-right"
                required
                style="width: 80px"
                @input="payComma"
              />
            </div>
            <div v-if="LOGIN_TEACHER" class="m-l-1 m-t-2">
              {{ LOGIN_TEACHER.reg_pay_unit }}
            </div>
            <div class="flex-full m-r-2 m-l-3">
              <input
                ref="inputMemo"
                class="jelly-text wd-full"
                required
                placeholder="메모를 입력하세요"
              />
            </div>
            <div>
              <button
                class="jelly-btn jelly-btn--default"
                @click="onSubmitInputStudent"
              >
                지급하기
              </button>
            </div>
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
                    <td v-if="v.status === '3'">
                      {{ v.student_memo }} 에게 입금 <br />{{ v.etc_memo }}
                    </td>
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
      params: {
        queryCate: null,
      },
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
    payComma({ target }) {
      this.$refs.inputPay.value = this.comma(this.uncomma(target.value))
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
    onSubmitInputStudent() {
      this.LOADING_TRUE()
      const frm = new FormData()
      frm.append('smt_idx', this.LOGIN_TEACHER.smt_idx)
      frm.append('sms_idx', this.$refs.inputStudent.value)
      frm.append('pay', this.uncomma(this.$refs.inputPay.value))
      frm.append('memo', this.$refs.inputMemo.value)
      frm.append('type', 'pay_etc_insert')

      this.$axios
        .post(process.env.VUE_APP_API + '/teacher.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          this.LOADING_TRUE()
          console.log(res.data)
          setTimeout(() => {
            this.params = this.LOGIN_TEACHER
            this.params.type = 'teacherPayList'
            this.GET_AXIOS(this.params)
          })
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },
  },
}
</script>

<style lang="scss"></style>
