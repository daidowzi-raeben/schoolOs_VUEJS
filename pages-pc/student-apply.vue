<template>
  <div>
    <div class="">
      <div class="flex">
        <h4 v-if="LOGIN_TEACHER" class="is_active">회원승인</h4>
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
                  <th>출석번호</th>
                  <th>아이디</th>
                  <th>이름</th>
                  <th>가입일</th>
                  <th>관리</th>
                </tr>
                <tr
                  v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.studentList"
                  :key="i"
                >
                  <td>{{ v.class_number }}</td>
                  <td>{{ v.reg_id }}</td>
                  <td>{{ v.reg_name }}</td>
                  <td>{{ v.reg_datetime }}</td>

                  <td>
                    <div class="flex">
                      <button
                        class="flex-full jelly-btn jelly-btn--default m-r-1"
                        @click="onSubmit(v.idx)"
                      >
                        승인
                      </button>
                    </div>
                  </td>
                </tr>
              </table>
              <div v-else class="m-t-3">
                <div class="item text-center wd-full" style="width: 100%">
                  승인 요청중인 학생이 없습니다.
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
    this.params.type = 'studentApply'
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    onSubmit(e) {
      this.paramsPost.sms_idx = e
      this.paramsPost.type = 'studentApply'
      this.POST_AXIOS(this.paramsPost)
      setTimeout(() => {
        this.params = this.LOGIN_TEACHER
        this.params.type = 'studentApply'
        this.GET_AXIOS(this.params)
      }, 1000)
    },
  },
}
</script>

<style lang="scss"></style>
