<template>
  <div>
    <div id="calendarList" class="m-t-3">
      <div v-if="calendar.calendar" class="text-center" style="padding: 8px">
        {{ calendar.calendar[0].year }}년 {{ calendar.calendar[0].month }}월
      </div>
      <ul class="flex">
        <li class="prev p-t-1" @click="onClickCalendarArrow('prev')">
          <b-icon icon="chevron-left"></b-icon>
        </li>
        <li v-for="(v, i) in calendar.calendar" :key="i">
          <div
            class="week text-center jelly-color--888 font-12"
            :class="isWeek(v.week)"
          >
            {{ v.week }}
          </div>
          <div class="days text-center font-14" :class="isWeek(v.week)">
            <input
              type="radio"
              name="days"
              class="daysRadio"
              :value="`${v.year}-${v.month}-${v.day}`"
              :checked="
                `${v.year}-${v.month}-${v.day}` ===
                  `${calendar.today.year}-${calendar.today.month}-${calendar.today.day}` &&
                isChecked === 0
              "
              @click="onClickDays($event)"
            />
            <hr />
            {{ v.day }}
            <span v-if="v.row.data.idx" class="dot"></span>
          </div>
        </li>
        <li class="next p-t-1" @click="onClickCalendarArrow('next')">
          <b-icon icon="chevron-right"></b-icon>
        </li>
      </ul>
    </div>
    <div id="studentList" class="m-t-3">
      <table class="jelly-table font-14">
        <colgroup>
          <col style="width: 100px" />
          <col style="width: 420px" />
          <col style="width: auto" />
        </colgroup>
        <tr>
          <th>이름</th>
          <th>출결사항</th>
          <th>특이사항</th>
        </tr>
        <tr v-for="(v, i) in student.student" :key="i">
          <td>{{ v.list.reg_name }}</td>
          <td>
            <div>
              <button
                class="jelly-btn"
                :class="
                  v.attendance && v.attendance[0].type === '0'
                    ? 'jelly-btn--pink'
                    : 'jelly-btn--default'
                "
                @click="
                  onClickPrivat(
                    v.list.idx,
                    0,
                    v.attendance ? v.attendance[0].idx : null
                  )
                "
              >
                질병♡
              </button>
              <button
                class="jelly-btn"
                :class="
                  v.attendance && v.attendance[0].type === '1'
                    ? 'jelly-btn--pink'
                    : 'jelly-btn--default'
                "
                @click="
                  onClickPrivat(
                    v.list.idx,
                    1,
                    v.attendance ? v.attendance[0].idx : null
                  )
                "
              >
                미인정♥︎
              </button>
              <button
                class="jelly-btn"
                :class="
                  v.attendance && v.attendance[0].type === '2'
                    ? 'jelly-btn--pink'
                    : 'jelly-btn--default'
                "
                @click="
                  onClickPrivat(
                    v.list.idx,
                    2,
                    v.attendance ? v.attendance[0].idx : null
                  )
                "
              >
                기타▲
              </button>
              <button
                class="jelly-btn"
                :class="
                  v.attendance && v.attendance[0].type === '3'
                    ? 'jelly-btn--pink'
                    : 'jelly-btn--default'
                "
                @click="
                  onClickPrivat(
                    v.list.idx,
                    3,
                    v.attendance ? v.attendance[0].idx : null
                  )
                "
              >
                출석인정△
              </button>
            </div>
            <div v-if="v.attendance && v.attendance[0].type_etc" class="m-t-2">
              {{ v.attendance[0].type_etc }}
            </div>
          </td>
          <td>
            <!-- ㅍ지각 조퇴 결과 -->
            <div>
              <button
                class="jelly-btn"
                :class="
                  v.attendance2 && v.attendance2[0].type2 === '0'
                    ? 'jelly-btn--pink'
                    : 'jelly-btn--default'
                "
                @click="
                  onClickPrivatEtc(
                    v.list.idx,
                    0,
                    v.attendance2 ? v.attendance2[0].idx : null
                  )
                "
              >
                지각
              </button>
              <button
                class="jelly-btn"
                :class="
                  v.attendance2 && v.attendance2[0].type2 === '1'
                    ? 'jelly-btn--pink'
                    : 'jelly-btn--default'
                "
                @click="
                  onClickPrivatEtc(
                    v.list.idx,
                    1,
                    v.attendance2 ? v.attendance2[0].idx : null
                  )
                "
              >
                조퇴
              </button>
              <button
                class="jelly-btn"
                :class="
                  v.attendance2 && v.attendance2[0].type2 === '2'
                    ? 'jelly-btn--pink'
                    : 'jelly-btn--default'
                "
                @click="
                  onClickPrivatEtc(
                    v.list.idx,
                    2,
                    v.attendance2 ? v.attendance2[0].idx : null
                  )
                "
              >
                결과
              </button>
              <button
                class="jelly-btn"
                :class="
                  v.attendance2 && v.attendance2[0].type2 === '3'
                    ? 'jelly-btn--pink'
                    : 'jelly-btn--default'
                "
                @click="onClickPrivatEtc(v.list.idx, 3)"
              >
                기타
              </button>
            </div>
            <div
              v-if="v.attendance2 && v.attendance2[0].type_etc2"
              class="m-t-2"
            >
              {{ v.attendance2[0].type_etc2 }}
            </div>
          </td>
        </tr>
      </table>
    </div>
    <b-modal
      id="studentContent"
      ref="ref-cateInsert"
      size="lg"
      hide-footer
      hide-header
    >
      <div class="">
        <input
          v-model="studentContent"
          type="text"
          class="jelly-text wd-full"
          placeholder="사유를 작성해 주세요"
          @keyup.enter="onSubmitContent"
        />
      </div>
      <div class="m-t-5 text-center">
        <button
          class="jelly-btn jelly-btn--default"
          @click="$bvModal.hide('studentContent')"
        >
          닫기
        </button>
        <button class="jelly-btn jelly-btn--pink" @click="onSubmitContent">
          저장
        </button>
      </div>
    </b-modal>

    <!-- 출결 type_etc -->
    <b-modal id="studentContentTypeEtc" size="lg" hide-footer hide-header>
      <div class="">
        <input
          v-model="btnData.type_etc"
          type="text"
          class="jelly-text wd-full"
          placeholder="사유를 작성해 주세요"
          @keyup.enter="onClickAttendeance"
        />
      </div>
      <div class="m-t-5 text-center">
        <button
          class="jelly-btn jelly-btn--default"
          @click="$bvModal.hide('studentContentTypeEtc')"
        >
          닫기
        </button>
        <button class="jelly-btn jelly-btn--pink" @click="onClickAttendeance">
          저장
        </button>
      </div>
    </b-modal>

    <!-- 출결 type_etc2 -->
    <b-modal id="studentContentTypeEtc2" size="lg" hide-footer hide-header>
      <div class="">
        <input
          v-model="btnData2.type_etc2"
          type="text"
          class="jelly-text wd-full"
          placeholder="사유를 작성해 주세요"
        />
      </div>
      <div class="m-t-5 text-center">
        <button
          class="jelly-btn jelly-btn--default"
          @click="$bvModal.hide('studentContentTypeEtc2')"
        >
          닫기
        </button>
        <button class="jelly-btn jelly-btn--pink" @click="onClickAttendeance2">
          저장
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      LOGIN_CONFIG: {},
      params: {},
      calendar: {},
      student: {},
      isChecked: 0,
      studentContent: '',
      studentContentData: {},
      nowDate: null,
      nowIdx: '',
      btnData: {
        type_etc: null,
      },
      btnData2: {
        type_etc2: null,
      },
    }
  },
  computed: {
    ...mapState(['LOGIN']),
    ...mapGetters([
      'POST_AXIOS_CALLBACK_GETTER',
      'GET_AXIOS_CALLBACK_GETTER',
      'LOGIN_TEACHER',
    ]),
  },
  mounted() {
    this.LOADING_TRUE()
    this.LOGIN_CONFIG = JSON.parse(localStorage.getItem('TEACHER'))
    console.log(this.$nuxt, this.$config, this.LOGIN_CONFIG)
    this.params = this.LOGIN_CONFIG
    // this.$bvModal.hide('profileImage')
    const frm = new FormData()
    frm.append('type', 'calendar')
    frm.append('smt_idx', this.LOGIN_CONFIG.smt_idx)
    this.$axios
      .post(process.env.VUE_APP_API + '/teacher.php', frm, {
        header: {
          'Context-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res.data)
        this.calendar = res.data
        this.nowDate = `${res.data.today.year}-${res.data.today.month}-${res.data.today.day}`
        this.onLoadStudent(this.nowDate)
      })
      .catch((res) => {
        console.log('AXIOS FALSE', res)
      })
  },
  methods: {
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_INIT', 'LOADING_TRUE']),

    isWeek(e) {
      if (e === '토') {
        return 'sat'
      } else if (e === '일') {
        return 'sun'
      } else {
        return ''
      }
    },
    onClickCalendarArrow(e) {
      this.isChecked++
      let postYear = ''
      let postMonth = ''
      if (e === 'next') {
        postYear = this.calendar.next.year
        postMonth = this.calendar.next.month
      } else {
        postYear = this.calendar.prev.year
        postMonth = this.calendar.prev.month
      }

      console.log(postYear, postMonth)
      this.LOADING_TRUE()
      const frm = new FormData()
      frm.append('type', 'calendar')
      frm.append('smt_idx', this.LOGIN_CONFIG.smt_idx)
      frm.append('y', postYear)
      frm.append('m', postMonth)
      this.$axios
        .post(process.env.VUE_APP_API + '/teacher.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res.data)
          this.calendar = res.data
          this.nowDate = `${postYear}-${postMonth}-01`
          this.onLoadStudent(`${postYear}-${postMonth}-01`)
          document.querySelector('.daysRadio').checked = true
          // console.log($('.days'))
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },
    onClickDays(e) {
      console.log(e.target.value)
      this.nowDate = e.target.value
      this.onLoadStudent(e.target.value)
    },

    // 출결버튼
    onClickPrivat(e, type, idx) {
      this.btnData.type_etc = ''
      this.btnData.e = e
      this.btnData.type = type
      this.btnData.idx = idx
      this.$bvModal.show('studentContentTypeEtc')
    },

    // 출결버튼
    onClickPrivatEtc(e, type, idx) {
      this.btnData2.type_etc2 = ''
      this.btnData2.e = e
      this.btnData2.idx = idx
      this.btnData2.type = type
      this.$bvModal.show('studentContentTypeEtc2')
    },

    // 출결전송
    onClickAttendeance(e, type) {
      //   e.target.classList.toggle = 'jelly-btn--default'
      //   e.target.classList.toggle = 'jelly-btn--pink'
      console.log(this.nowDate, e, type)
      console.log(this.btnData.idx, this.btnData.idx, this.btnData.idx)
      this.LOADING_TRUE()
      const frm = new FormData()
      frm.append('type', 'attendanceBtn')
      frm.append('smt_idx', this.LOGIN_CONFIG.smt_idx)
      frm.append('sms_idx', this.btnData.e)
      if (this.btnData.idx) frm.append('idx', this.btnData.idx)
      if (this.btnData.type) frm.append('typeStat', this.btnData.type)
      if (this.btnData.type_etc) frm.append('type_etc', this.btnData.type_etc)
      frm.append('ymd', this.nowDate)
      console.log(this.btnData.type, this.btnData.type, this.btnData.type)
      this.$axios
        .post(process.env.VUE_APP_API + '/teacher.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log('==========>>>>>>>>>>', res.data)
          this.student = res.data
          // this.LOADING_INIT()
          this.$bvModal.hide('studentContentTypeEtc')
          this.onLoadStudent(this.nowDate)
          this.btnData.e = null
          this.btnData.type = null
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },
    // 특이사항
    onClickAttendeance2(e, type) {
      //   e.target.classList.toggle = 'jelly-btn--default'
      //   e.target.classList.toggle = 'jelly-btn--pink'
      console.log(this.nowDate, e, type)
      this.LOADING_TRUE()
      const frm = new FormData()
      frm.append('type', 'attendanceBtn')
      frm.append('smt_idx', this.LOGIN_CONFIG.smt_idx)
      frm.append('sms_idx', this.btnData2.e)
      if (this.btnData2.idx) frm.append('idx', this.btnData2.idx)
      frm.append('typeStat2', this.btnData2.type)
      if (this.btnData2.type_etc2)
        frm.append('type_etc2', this.btnData2.type_etc2)
      frm.append('ymd', this.nowDate)
      this.$axios
        .post(process.env.VUE_APP_API + '/teacher.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log('==========>>>>>>>>>>', res.data)
          this.student = res.data
          // this.LOADING_INIT()
          this.$bvModal.hide('studentContentTypeEtc2')
          this.onLoadStudent(this.nowDate)
          this.btnData.e = null
          this.btnData.type = null
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },
    //   특이사항
    onClickEtcWrite(v, e) {
      this.studentContent = ''
      // attendanceContent
      this.nowSmsIdx = e
      if (v === null) {
        console.log(null)
        this.nowIdx = null
        this.$bvModal.show('studentContent')
      } else {
        this.nowIdx = v
        this.LOADING_TRUE()
        const frm = new FormData()
        frm.append('type', 'attendanceContent')
        frm.append('idx', v)
        frm.append('sms_idx', e)
        frm.append('ymd', this.nowDate)
        this.$axios
          .post(process.env.VUE_APP_API + '/teacher.php', frm, {
            header: {
              'Context-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log('==========', res.data)
            this.studentContent = res.data.content
            this.$bvModal.show('studentContent')
            this.LOADING_INIT()
          })
          .catch((res) => {
            console.error('AXIOS FALSE', res)
          })
      }
    },
    onSubmitContent() {
      this.LOADING_TRUE()
      const frm = new FormData()
      console.log(this.nowIdx)
      frm.append('type', 'attendanceContentSubmit')
      if (this.nowIdx) {
        frm.append('idx', this.nowIdx)
      }
      frm.append('sms_idx', this.nowSmsIdx)
      frm.append('content', this.studentContent)
      frm.append('smt_idx', this.LOGIN_CONFIG.smt_idx)
      frm.append('ymd', this.nowDate)
      console.log(frm)
      this.$axios
        .post(process.env.VUE_APP_API + '/teacher.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log('==========', res.data)
          this.$bvModal.hide('studentContent')
          this.onLoadStudent(this.nowDate)
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },
    onLoadStudent(e) {
      this.LOADING_TRUE()
      const frm = new FormData()
      frm.append('type', 'calendarStudent')
      frm.append('smt_idx', this.LOGIN_CONFIG.smt_idx)
      frm.append('ymd', e)
      this.$axios
        .post(process.env.VUE_APP_API + '/teacher.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log('==========', res.data)
          this.student = res.data
          this.LOADING_INIT()
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },
  },
}
</script>

<style lang="scss">
#studentList {
  .attendance {
    padding: 10px;
    // background: #f6f6f6;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
#calendarList {
  ul {
    justify-content: space-between;
    .sat {
      color: #0075c8;
    }
    .sun {
      color: #ce0707;
    }
    .days {
      position: relative;
      .dot {
        position: absolute;
        right: -7px;
        top: 0;
        background: #ce0707;
        width: 5px;
        height: 5px;
        border-radius: 100%;
      }
      hr {
        display: none;
      }
      input[type='radio'] {
        position: absolute;
        width: 130%;
        height: 130%;
        // transform: translate(-50%, -50%);
        cursor: pointer;
        opacity: 0;
        z-index: 9;
        &:checked {
          & + hr {
            height: 2px;
            width: 100%;
            left: 0;
            bottom: -21px;
            background: #6830bd;
            position: absolute;
            display: block;
          }
        }
      }
    }
    li {
      cursor: pointer;
    }
  }
}
</style>
