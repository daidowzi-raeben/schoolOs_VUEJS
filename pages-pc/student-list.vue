<template>
  <div>
    <div class="">
      <div class="flex">
        <h4 v-if="LOGIN_TEACHER">학생관리</h4>
        <div class="flex-right">
          <button v-b-modal.studentInsert class="jelly-btn jelly-btn--default">
            학생 추가
          </button>
          <button
            class="jelly-btn jelly-btn--default m-l-1"
            @click="onClickWeeklyPay"
          >
            주급지급하기 (최근 지급일 :
            <span
              v-if="
                GET_AXIOS_CALLBACK_GETTER && GET_AXIOS_CALLBACK_GETTER.lastWeek
              "
              style="font-size: 12px"
            >
              {{ GET_AXIOS_CALLBACK_GETTER.lastWeek.lastWeek }} </span
            >)
          </button>
        </div>
      </div>
      <div id="jellyAdminheader" style="padding-top: 0vh">
        <div class="student form">
          <div class="student__list">
            <div class="m-t-3">
              <table
                v-if="GET_AXIOS_CALLBACK_GETTER.studentList"
                class="jelly-table"
              >
                <tr>
                  <th>이름</th>
                  <th>레벨</th>
                  <th>지혜</th>
                  <th>노력</th>
                  <th>건강</th>
                  <th>예절</th>
                  <th>자산</th>
                  <th>관리</th>
                </tr>
                <tr
                  v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.studentList"
                  :key="i"
                >
                  <td>
                    <div class="flex">
                      <b-avatar
                        variant="success"
                        class="m-r-2"
                        icon="people-fill"
                        :src="`http://api.school-os.net/data/student/profile/thumb/${v.reg_photo}`"
                      ></b-avatar>
                      <div>
                        {{ v.reg_name }}
                        <br />
                        {{ v.reg_id }}
                      </div>
                    </div>
                  </td>
                  <td>
                    LV.{{
                      Math.floor(
                        (Number(v.effort) +
                          Number(v.health) +
                          Number(v.etiquette) +
                          Number(v.intellect)) /
                          4
                      )
                    }}
                  </td>
                  <td class="text-right">{{ v.intellect }}</td>
                  <td class="text-right">{{ v.effort }}</td>
                  <td class="text-right">{{ v.health }}</td>
                  <td class="text-right">{{ v.etiquette }}</td>
                  <td class="text-right">
                    {{
                      (Number(v.PtotalAccount) - Number(v.MtotalAccount))
                        | comma
                    }}
                    {{ LOGIN_TEACHER.reg_pay_unit }}
                  </td>
                  <td>
                    <div class="flex">
                      <button
                        class="flex-full jelly-btn jelly-btn--default m-r-1"
                        @click="onClickAttendanceDetail(v.sms_idx)"
                      >
                        벌칙관리
                      </button>
                      <button
                        class="flex-full jelly-btn jelly-btn--default m-l-1"
                        @click="onClickStudentDetail(v.sms_idx)"
                      >
                        정보확인
                      </button>
                    </div>
                  </td>
                </tr>
              </table>
              <div v-else class="m-t-3">
                <div class="item text-center wd-full" style="width: 100%">
                  등록된 학생이 없습니다.
                </div>
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
              <p>출석번호</p>
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
              <p>지혜</p>
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
          <button class="jelly-btn jelly-btn--gray m-r-8" @click="onSubmitDel">
            삭제하기
          </button>
          <button
            class="jelly-btn jelly-btn--default"
            @click="$bvModal.hide('studentDetail')"
          >
            닫기
          </button>
          <button class="jelly-btn jelly-btn--default" @click="loginStudent">
            학생로그인
          </button>
          <button class="jelly-btn jelly-btn--pink" @click="onSubmit">
            수정하기
          </button>
        </div>
        <div
          class="m-t-5 text-center"
          style="max-height: 40vh; overflow-y: scroll"
        >
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
                <td v-if="v.case_result === '출금'" style="color: #111">
                  {{ v.send_sms_name }} 에게 출금
                </td>
                <td v-if="v.case_result === '입금'" style="color: #111">
                  {{ v.send_sms_name }} 으로부터 입금
                </td>
                <td v-if="v.case_result === '쇼핑'" style="color: #111">
                  {{ v.buy_item_name }} 구입
                </td>
                <td v-if="v.case_result === '보상'">
                  {{ v.quest_name }}
                  <span v-if="v.status === '0'">보상</span>
                  <span v-if="v.status === '1'">차감</span>
                </td>
                <td v-if="v.case_result === '기타'" style="color: #111">
                  {{ v.etc_memo }}
                </td>
                <td v-if="v.case_result === '대출'" style="color: #111"></td>
                <td v-if="v.case_result === '벌금'" style="color: #111">
                  {{ v.penalty_memo }}
                </td>
                <td v-if="v.case_result === '주급'" style="color: #111">
                  주급 지급
                </td>
                <td v-if="v.case_result === '현금'" style="color: #111">
                  현금 출금
                </td>
                <td v-if="v.case_result === '알림장'" style="color: #111">
                  알림장 읽음 보상
                </td>
                <td v-if="v.case_result === '세금'" style="color: #111">
                  {{ v.tax_name }}
                </td>
                <td v-if="v.case_result === '알바비지급'" style="color: #111">
                  [{{ v.alba_name }}] {{ v.alba_reg_name }}에게 지급
                </td>
                <td v-if="v.case_result === '알바비'" style="color: #111">
                  {{ v.alba_name }}
                </td>
                <td v-if="v.case_result === '에러'" style="color: #111"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </b-modal>
    <b-modal id="studentAttendance" size="xl" hide-footer hide-header>
      <div>
        <div class="">
          <h3
            v-if="
              GET_AXIOS_CALLBACK_DATA_SUB && GET_AXIOS_CALLBACK_DATA_SUB.total
            "
          >
            벌칙 관리
            <em class="font-14">{{ GET_AXIOS_CALLBACK_DATA_SUB.total }}건</em>
          </h3>
          <h3 v-else>신고내역이 없습니다.</h3>
          <div class="m-t-5">
            <table
              v-if="
                GET_AXIOS_CALLBACK_DATA_SUB &&
                GET_AXIOS_CALLBACK_DATA_SUB.rulesCate
              "
              class="jelly-table"
            >
              <tr>
                <th>날짜</th>
                <th>신고자</th>
                <th>제목</th>
                <th>내용</th>
                <th>벌금</th>
                <th>결과</th>
              </tr>
              <tr
                v-for="(v, i) in GET_AXIOS_CALLBACK_DATA_SUB.rulesCate"
                :key="i"
              >
                <td>
                  {{ v.sue_date }}
                </td>
                <td>{{ v.reg_name_to }} ({{ v.reg_id_to }})</td>
                <td>
                  {{ v.rule ? v.rule : v.subject }}
                </td>
                <td>
                  {{ v.content }}
                </td>
                <td>
                  {{ v.status_bill === '0' ? '' : '벌금부과' }}
                </td>
                <td>
                  <span v-if="v.status === '1'">신고접수</span>
                  <span v-if="v.status === '2'">신고확인</span>
                  <span v-if="v.status === '3'">신고취소</span>
                  <span v-if="v.status === '4'">벌칙처리</span>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal id="studentInsert" size="xl" hide-footer hide-header>
      <div class="">
        <div class="flex">
          <div class="flex-full">
            <p>이름</p>
            <input
              v-model="studentInsert.reg_name"
              type="text"
              class="jelly-text wd-full"
            />
          </div>
          <div class="flex-full m-l-2 m-r-2">
            <p>아이디</p>
            <input
              v-model="studentInsert.reg_id"
              type="text"
              class="jelly-text wd-full"
            />
          </div>
          <div class="flex-full">
            <p>패스워드 변경</p>
            <input
              v-model="studentInsert.reg_pw"
              type="text"
              class="jelly-text wd-full"
            />
          </div>
        </div>
      </div>
      <div class="m-t-5">
        <div class="flex">
          <div class="flex-full">
            <p>출석번호</p>
            <input
              v-model="studentInsert.class_number"
              type="text"
              class="jelly-text wd-full"
            />
          </div>
          <div class="flex-full m-l-2 m-r-2">
            <p>직업</p>
            <select
              v-if="GET_AXIOS_CALLBACK_GETTER.jobList2"
              v-model="studentInsert.job"
              class="jelly-text wd-full"
            >
              <option :value="null">선택하세요</option>
              <option
                v-for="v in GET_AXIOS_CALLBACK_GETTER.jobList2"
                :key="v.idx"
                :value="v.idx"
              >
                {{ v.job_name }}
              </option>
            </select>
          </div>
          <div class="flex-full"></div>
        </div>
        <div class="m-t-5 text-center">
          <button
            class="jelly-btn jelly-btn--default"
            @click="$bvModal.hide('studentInsert')"
          >
            닫기
          </button>
          <button class="jelly-btn jelly-btn--pink" @click="onSubmitInsert">
            저장
          </button>
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
      studentInsert: {
        class_number: '',
        reg_id: '',
        reg_pw: '',
        reg_name: '',
        job: null,
        reg_code: '',
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
  beforeDestroy() {
    this.params = []
    console.log('beforeCreate', this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT
    onClickAttendanceDetail(idx) {
      this.paramsAttendance = this.attendance
      this.paramsAttendance.type = 'ruleStudent'
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
      if (confirm('주급을 지급하겠습니까?')) {
        this.paramsPost = this.LOGIN_TEACHER
        this.paramsPost.type = 'weeklyPay'
        console.log('paramsPost', this.paramsPost)
        this.POST_AXIOS(this.paramsPost)
        setTimeout(() => {
          alert('주급이 지급되었습니다.')
          this.params = this.LOGIN_TEACHER
          this.params.type = 'studentList'
          this.GET_AXIOS(this.params)
        }, 1500)
      }
    },
    onSubmitInsert() {
      this.LOADING_TRUE()
      const frm = new FormData()
      frm.append('reg_code', this.LOGIN_TEACHER.reg_code)
      frm.append('reg_id', this.studentInsert.reg_id)
      frm.append('class_number', this.studentInsert.class_number)
      frm.append('reg_pw', this.studentInsert.reg_pw)
      frm.append('reg_name', this.studentInsert.reg_name)
      frm.append('job', this.studentInsert.job)
      frm.append('type', 'register')

      this.$axios
        .post(process.env.VUE_APP_API + '/student.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          this.LOADING_TRUE()
          console.log(res.data)
          alert('학생이 추가되었습니다.')
          this.$bvModal.hide('studentInsert')
          setTimeout(() => {
            this.params = this.LOGIN_TEACHER
            this.params.type = 'studentList'
            this.GET_AXIOS(this.params)
          })
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },
    onSubmitDel() {
      console.log('this.student.sms_idx', this.student.sms_idx)
      if (confirm('학생을 삭제하시겠습니까?')) {
        this.LOADING_TRUE()
        const frm = new FormData()
        frm.append('sms_idx', this.student.sms_idx)
        frm.append('type', 'studentDel')
        this.$axios
          .post(process.env.VUE_APP_API + '/teacher.php', frm, {
            header: {
              'Context-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            this.LOADING_TRUE()
            console.log(res.data)
            alert('학생이 삭제되었습니다.')
            this.$bvModal.hide('studentDetail')
            setTimeout(() => {
              this.params = this.LOGIN_TEACHER
              this.params.type = 'studentList'
              this.GET_AXIOS(this.params)
            })
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      }
    },
    loginStudent() {
      const url = 'https://app.school-os.net/member/master-login?sms_idx='
      window.open(url + this.student.sms_idx)
    },
  },
}
</script>

<style lang="scss"></style>
