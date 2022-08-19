<template>
  <div>
    <div id="calendarList" style="width: 700px">
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
    <div id="studentList" style="width: 700px">
      <table class="jelly-table font-14">
        <colgroup>
          <col style="width: 100px" />
          <col style="width: auto" />
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
            <div v-if="v.attendance">
              <div
                v-for="(e, k) in v.attendance"
                :key="`attendance${k}`"
                class="attendance"
              >
                {{ e.subject }}
              </div>
            </div>
          </td>
          <td>
            <div v-if="v.attendance">
              <div
                v-for="(e, k) in v.attendance"
                :key="`attendance${k}`"
                class="attendance"
              >
                {{ e.content }}
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
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
        this.LOADING_INIT()
        this.onLoadStudent()
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
          this.LOADING_INIT()
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
      this.onLoadStudent(e.target.value)
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
    background: #f6f6f6;
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
