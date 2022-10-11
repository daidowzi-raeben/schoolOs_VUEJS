<template>
  <div>
    <!-- <div>
      <input v-model="pay" class="jelly-text" />
      <button @click="onSubmit">빌리기</button>
    </div> -->
    <div class="">
      <div class="">
        <h4 v-if="LOGIN_TEACHER" class="is_active">
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
              >통화량
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
                잔액
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
              <!-- <select
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
              </select> -->
              <div class="studentScrollArea" style="width: 300px">
                <label class="m-l-2 m-t-2">
                  <input v-model="selectAll" type="checkbox" />
                  전체발송
                </label>
                <div
                  v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.studentList"
                  :key="i"
                >
                  <div class="flex">
                    <b-avatar
                      variant="success"
                      icon="people-fill"
                      :src="`http://api.school-os.net/data/student/profile/thumb/${v.reg_photo}`"
                    ></b-avatar>
                    <label class="m-l-2 m-t-2">
                      <input
                        :id="`checked${v.idx}`"
                        :key="i"
                        v-model="inputStudent"
                        type="checkbox"
                        :value="v.idx"
                      />
                      {{ v.reg_name }} ({{ v.reg_id }})
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-full m-l-2">
              <div>
                <p style="line-height: 25px">
                  학생에게 입금할 수 있습니다. 출금을 원하실 경우
                  <em class="bold">고지서</em>를 이용해 주세요.<br />
                  <em class="bold">출금 메모는 학생 통장에 기록</em>됩니다.
                </p>
              </div>
              <div class="flex">
                <div class="flex-full">
                  <input
                    ref="inputPay"
                    class="jelly-text text-right wd-full"
                    required
                    @input="payComma"
                  />
                </div>
                <div v-if="LOGIN_TEACHER" class="m-l-2 m-t-2">
                  {{ LOGIN_TEACHER.reg_pay_unit }}
                </div>
                <div class="m-l-3">
                  <button
                    class="jelly-btn jelly-btn--pink"
                    @click="onSubmitInputStudent"
                  >
                    지급하기
                  </button>
                </div>
              </div>
              <div class="flex-full m-t-3">
                <input
                  ref="inputMemo"
                  class="jelly-text wd-full"
                  required
                  placeholder="메모를 입력하세요"
                />
              </div>
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
                <!-- 0:대출,1:급여,2:이자,3:기타,4:상품등록수수료,5:세금,6:정부마켓,7:마켓,8:가입,9:알바 -->
                <tbody v-if="GET_AXIOS_CALLBACK_GETTER.teacherPayList">
                  <tr
                    v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.teacherPayList"
                    :key="`table${i}`"
                  >
                    <td>{{ v.datetime }}</td>
                    <td v-if="v.status === '0'">대출</td>
                    <td v-if="v.status === '1'">급여</td>
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
                      {{ v.student_memo }} 급여 지급
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
        type: 'teacherPayList',
      },
      paramsForm: {},
      pay: 0,
      payWon: '',
      queryCate: '',
      inputStudent: [],
    }
  },

  computed: {
    ...mapState(['LOGIN']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_TEACHER']),
    selectAll: {
      get() {
        return this.GET_AXIOS_CALLBACK_GETTER.studentList
          ? this.inputStudent
            ? this.inputStudent.length ===
              this.GET_AXIOS_CALLBACK_GETTER.studentList.length
            : false
          : false
      },
      set(value) {
        const selected = []

        if (value) {
          this.GET_AXIOS_CALLBACK_GETTER.studentList.forEach((com) => {
            selected.push(com.idx)
          })
        }

        this.inputStudent = selected
      },
    },
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
        this.$router.push(`/pay-list`)
        this.params.type = 'teacherPayList'
        this.params.queryCate = null
        this.params = this.LOGIN_TEACHER
        this.GET_AXIOS(this.params)
      }
    },
    onSubmitInputStudent() {
      this.LOADING_TRUE()
      const frm = new FormData()
      frm.append('smt_idx', this.LOGIN_TEACHER.smt_idx)
      frm.append('sms_idx', this.inputStudent)
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
            this.$refs.inputMemo.value = ''
            this.$refs.inputPay.value = ''
          })
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },
  },
}
</script>

<style lang="scss">
.studentScrollArea {
  padding: 10px;
  height: 250px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow-y: auto;
  > div {
    border-bottom: 1px solid #ddd;
    padding: 7px 0;
  }
}
</style>
