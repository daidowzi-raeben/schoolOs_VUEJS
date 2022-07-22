<template>
  <div>
    <div class="">
      <div id="jellyAdminheader" style="padding-top: 0vh">
        <!-- <span>{{ today }}</span> -->
        <h1 v-if="LOGIN_TEACHER" class="">
          학생관리
          <span
            class="spanBox m-l-2"
            style="color: #fff; font-size: 12px"
            @click="onClickWeeklyPay"
          >
            주급지급하기 (최근 지급일 :
            <span
              v-if="GET_AXIOS_CALLBACK_GETTER.lastWeek"
              style="font-size: 12px"
            >
              {{ GET_AXIOS_CALLBACK_GETTER.lastWeek.lastWeek }} </span
            >)
          </span>
        </h1>
        <div class="student form">
          <div class="student__list">
            <div v-if="GET_AXIOS_CALLBACK_GETTER.studentList" class="m-t-3">
              <div
                v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.studentList"
                :key="i"
                class="item"
              >
                <div class="flex">
                  <p class="title">
                    {{ v.reg_name }} [LV.{{
                      Math.floor(
                        (Number(v.effort) +
                          Number(v.health) +
                          Number(v.etiquette) +
                          Number(v.intellect)) /
                          4
                      )
                    }}]
                  </p>
                  <div class="plant-area">
                    <div class="plant flex-right">
                      <div class="plant__leaves"></div>
                    </div>
                  </div>
                </div>
                <div>
                  {{
                    (Number(v.PtotalAccount) - Number(v.MtotalAccount)) | comma
                  }}
                  {{ LOGIN_TEACHER.reg_pay_unit }}
                </div>
                <div class="flex m-t-3">
                  <button
                    class="flex-full jelly-btn jelly-btn--default m-r-1"
                    @click="onClickAttendanceDetail(v.sms_idx)"
                  >
                    출결관리
                  </button>
                  <button
                    class="flex-full jelly-btn jelly-btn--default m-l-1"
                    @click="onClickStudentDetail(v.sms_idx)"
                  >
                    정보확인
                  </button>
                </div>
              </div>
            </div>
            <div v-else class="m-t-3">
              <div class="item text-center wd-full" style="width: 100%">
                등록된 학생이 없습니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="studentDetail" size="xl" hide-footer hide-header>
      <div v-if="GET_AXIOS_CALLBACK_GETTER.studentDetail">
        <div class="">
          <div class="flex">
            <div class="flex-full">
              <p>이름</p>
              <input
                v-model="student.reg_name"
                type="text"
                class="jelly-text wd-full"
              />
            </div>
            <div class="flex-full m-l-2 m-r-2">
              <p>아이디</p>
              <input
                v-model="student.reg_id"
                type="text"
                class="jelly-text wd-full"
                readonly
                disabled
              />
            </div>
            <div class="flex-full">
              <p>패스워드 변경</p>
              <input
                v-model="student.reg_pw"
                type="text"
                class="jelly-text wd-full"
                placeholder="학생의 비밀번호를 변경할 수 있습니다."
              />
            </div>
          </div>
        </div>
        <div class="m-t-5">
          <div class="flex">
            <div class="flex-full">
              <p>학급번호</p>
              <input
                v-model="student.classNumber"
                type="text"
                class="jelly-text wd-full"
              />
            </div>
            <div class="flex-full m-l-2 m-r-2">
              <p>직업</p>
              <select
                v-if="GET_AXIOS_CALLBACK_GETTER.jobList"
                v-model="student.job"
                class="jelly-text wd-full"
              >
                <option
                  v-for="v in GET_AXIOS_CALLBACK_GETTER.jobList"
                  :key="v.idx"
                  :value="v.idx"
                  :selected="
                    GET_AXIOS_CALLBACK_GETTER.studentDetail.reg_job == v.idx
                      ? true
                      : false
                  "
                >
                  {{ v.job_name }}
                </option>
              </select>
            </div>
            <div class="flex-full">
              <p>총 재산</p>
              <input
                v-model="student.total_pay"
                type="text"
                class="jelly-text wd-full"
                readonly
                disabled
              />
            </div>
          </div>
        </div>
        <div class="m-t-5">
          <div class="flex">
            <div class="flex-full">
              <p>지능</p>
              <input
                v-model="student.intellect"
                type="text"
                class="jelly-text wd-full"
                readonly
                disabled
              />
            </div>
            <div class="flex-full m-l-2 m-r-2">
              <p>노력</p>
              <input
                v-model="student.effort"
                type="text"
                class="jelly-text wd-full"
                readonly
                disabled
              />
            </div>
            <div class="flex-full m-l-2 m-r-2">
              <p>건강</p>
              <input
                v-model="student.health"
                type="text"
                class="jelly-text wd-full"
                readonly
                disabled
              />
            </div>
            <div class="flex-full">
              <p>예절</p>
              <input
                v-model="student.etiquette"
                type="text"
                class="jelly-text wd-full"
                readonly
                disabled
              />
            </div>
          </div>
        </div>
        <div class="m-t-5 text-center">
          <button
            class="jelly-btn jelly-btn--default"
            @click="$bvModal.hide('studentDetail')"
          >
            닫기
          </button>
          <button class="jelly-btn jelly-btn--pink" @click="onSubmit">
            수정하기
          </button>
        </div>
        <div class="m-t-5 text-center">
          <table class="jelly-table">
            <thead>
              <tr>
                <th>일시</th>
                <th>구분</th>
                <th>금액</th>
                <th>내용</th>
              </tr>
            </thead>
            <tbody v-if="GET_AXIOS_CALLBACK_GETTER.bankTransferList">
              <tr
                v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.bankTransferList"
                :key="`table${i}`"
              >
                <td>{{ v.datetime }}</td>
                <td>{{ v.case_result }}</td>
                <td :class="v.status === '1' ? 'jelly-color--type4' : ''">
                  {{ v.pay | comma }}
                </td>
                <td v-if="v.case_result === '출금'">
                  {{ v.send_sms_name }} 에게 출금
                </td>
                <td v-if="v.case_result === '입금'">
                  {{ v.send_sms_name }} 에게 입금
                </td>
                <td v-if="v.case_result === '쇼핑'">
                  {{ v.buy_item_name }} 구입
                </td>
                <td v-if="v.case_result === '보상'">{{ v.quest_name }} 보상</td>
                <td v-if="v.case_result === '기타'">{{ v.etc_memo }}</td>
                <td v-if="v.case_result === '대출'"></td>
                <td v-if="v.case_result === '벌금'">{{ v.penalty_memo }}</td>
                <td v-if="v.case_result === '주급'">주급지급</td>
                <td v-if="v.case_result === '에러'"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </b-modal>
    <b-modal id="studentAttendance" size="xl" hide-footer hide-header>
      <div>
        <div class="">
          <div class="flex">
            <div class="flex-full">
              <p>출결날짜</p>
              <b-form-datepicker
                v-model="attendanceInsert.smsa_date"
                type="date"
                class="jelly-text jelly-text--h wd-full"
              ></b-form-datepicker>
            </div>
            <div class="flex-full m-l-2 m-r-2">
              <p>구분</p>
              <input
                v-model="attendanceInsert.subject"
                type="text"
                class="jelly-text wd-full"
                placeholder="미인정 출석"
              />
            </div>
            <div class="flex-full">
              <p>사유</p>
              <input
                v-model="attendanceInsert.content"
                type="text"
                class="jelly-text wd-full"
                placeholder=""
              />
            </div>
          </div>
          <div class="m-t-3 text-center">
            <button
              class="jelly-btn jelly-btn--default"
              @click="$bvModal.hide('studentAttendance')"
            >
              닫기
            </button>
            <button
              class="jelly-btn jelly-btn--default"
              @click="onSubmitAttendanceDetail"
            >
              저장
            </button>
          </div>
          <div class="m-t-5">
            <table v-if="GET_AXIOS_CALLBACK_DATA_SUB" class="jelly-table">
              <tr>
                <th>날짜</th>
                <th>구분</th>
                <th>사유</th>
              </tr>
              <tr v-for="(v, i) in GET_AXIOS_CALLBACK_DATA_SUB" :key="i">
                <td>
                  {{ v.smsa_date }}
                </td>
                <td>
                  {{ v.subject }}
                </td>
                <td>
                  {{ v.content }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  layout: 'default-pc',
  // validate({ params }) {
  //   return /^\d+$/.test(params.id)
  // },
  // asyncData({ params }) {
  //   console.log(params)
  //   return {
  //     idx: params.id,
  //   }
  // },
  data() {
    return {
      params: {},
      paramsPost: {},
      paramsPostWeek: {},
      paramsAttendance: {},
      paramsPostAttendance: {},
      student: {
        class_number: '',
        reg_id: '',
        reg_pw: '',
        reg_name: '',
        health: '',
        etiquette: '',
        effort: '',
        intellect: '',
        total_pay: 0,
        classNumber: '',
        job: '',
        sms_idx: '',
      },
      attendance: {
        type: 'attendance',
      },
      attendanceInsert: {
        smsa_date: '',
      },
    }
  },

  computed: {
    ...mapState(['LOGIN', 'GET_AXIOS_CALLBACK_DATA_SUB']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_TEACHER']),
  },
  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },
  mounted() {
    //   DATA INIT
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_TEACHER
    this.params.type = 'studentList'
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations([]),

    // EVENT
    onClickAttendanceDetail(idx) {
      this.paramsAttendance = this.attendance
      this.paramsAttendance.type = 'attendance'
      this.paramsAttendance.sms_idx = idx
      console.log(this.paramsAttendance)
      this.GET_AXIOS(this.paramsAttendance)
      this.$bvModal.show('studentAttendance')
    },
    onSubmitAttendanceDetail() {
      this.paramsPostAttendance.type = 'attendance'
      this.paramsPostAttendance.sms_idx = this.paramsAttendance.sms_idx
      this.paramsPostAttendance.smt_idx = this.LOGIN_TEACHER.smt_idx
      this.paramsPostAttendance.smsa_date = this.attendanceInsert.smsa_date
      this.paramsPostAttendance.subject = this.attendanceInsert.subject
      this.paramsPostAttendance.content = this.attendanceInsert.content
      this.POST_AXIOS(this.paramsPostAttendance)
      setTimeout(() => {
        this.GET_AXIOS(this.paramsPostAttendance)
        console.log(this.paramsAttendance)
      }, 1000)
    },
    onClickStudentDetail(e) {
      this.params = this.LOGIN_TEACHER
      this.params.type = 'studentList'
      this.params.smsIdx = e
      this.GET_AXIOS(this.params)

      this.$bvModal.show('studentDetail')
      setTimeout(() => {
        this.student.reg_id =
          this.GET_AXIOS_CALLBACK_GETTER.studentDetail.reg_id
        this.student.reg_pw = ''
        this.student.reg_name =
          this.GET_AXIOS_CALLBACK_GETTER.studentDetail.reg_name
        this.student.health =
          this.GET_AXIOS_CALLBACK_GETTER.studentDetail.health
        this.student.etiquette =
          this.GET_AXIOS_CALLBACK_GETTER.studentDetail.etiquette
        this.student.effort =
          this.GET_AXIOS_CALLBACK_GETTER.studentDetail.effort
        this.student.intellect =
          this.GET_AXIOS_CALLBACK_GETTER.studentDetail.intellect
        this.student.total_pay =
          Number(this.GET_AXIOS_CALLBACK_GETTER.studentDetail.PtotalAccount) -
          Number(this.GET_AXIOS_CALLBACK_GETTER.studentDetail.MtotalAccount)
        this.student.classNumber =
          this.GET_AXIOS_CALLBACK_GETTER.studentDetail.class_number
        this.student.job = this.GET_AXIOS_CALLBACK_GETTER.studentDetail.reg_job
        this.student.sms_idx =
          this.GET_AXIOS_CALLBACK_GETTER.studentDetail.sms_idx
      }, 1000)
    },
    onSubmit(e) {
      this.paramsPost = this.LOGIN_TEACHER
      this.paramsPost = this.student
      this.paramsPost.type = 'studentDetail'
      this.POST_AXIOS(this.paramsPost)
    },
    onClickWeeklyPay() {
      this.paramsPost = this.LOGIN_TEACHER
      this.paramsPost.type = 'weeklyPay'
      console.log('paramsPost', this.paramsPost)
      this.POST_AXIOS(this.paramsPost)
      setTimeout(() => {
        alert('주급이 지급되었습니다.')
      }, 500)
    },
  },
}
</script>

<style lang="scss"></style>
