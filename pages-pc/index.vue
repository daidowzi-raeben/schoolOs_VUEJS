<template>
  <div v-if="LOGIN_CONFIG && GET_AXIOS_CALLBACK_GETTER.total_pay">
    <div class="">
      <div id="jellyAdminheader">
        <span>{{ today }}</span>
        <h1 v-if="LOGIN_CONFIG && GET_AXIOS_CALLBACK_GETTER.total_pay">
          {{ LOGIN_CONFIG.reg_country }}
          <span v-b-tooltip.hover title="현재 재산" class="spanBox">
            {{ GET_AXIOS_CALLBACK_GETTER.total_pay.total_pay | comma }}
            {{ LOGIN_CONFIG.reg_pay_unit }}
          </span>
        </h1>

        <div v-if="GET_AXIOS_CALLBACK_GETTER.teacher" class="student">
          <div class="student__list clb">
            <h3>환경 설정</h3>
            <div class="m-t-3">
              <div
                v-if="GET_AXIOS_CALLBACK_GETTER.teacher.rule_cnt === '0'"
                class="item"
              >
                <nuxt-link to="job-list">
                  <p class="title">규칙설정 &gt;</p>
                  <div class="flex">
                    <div class="list">
                      <p style="color: #ffffcc">
                        학생들이 지켜야 할 규칙을 작성해 주세요
                      </p>
                    </div>
                  </div>
                </nuxt-link>
              </div>
              <div
                v-if="GET_AXIOS_CALLBACK_GETTER.teacher.job_cnt === '0'"
                class="item"
              >
                <nuxt-link to="job-list">
                  <p class="title">직업설정 &gt;</p>
                  <div class="flex">
                    <div class="list">
                      <p style="color: #ffffcc">
                        학생들의 직업과 주급을 지정해 주세요
                      </p>
                    </div>
                  </div>
                </nuxt-link>
              </div>
              <div
                v-if="!GET_AXIOS_CALLBACK_GETTER.teacher.jb_mode"
                class="item"
              >
                <nuxt-link to="teacher-setting">
                  <p class="title">젤리복권 &gt;</p>
                  <div class="flex">
                    <div class="list">
                      <p style="color: #ffffcc">
                        젤리복권 사용여부와 판매금액을 설정해 주세요
                      </p>
                    </div>
                  </div>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>

        <div v-if="GET_AXIOS_CALLBACK_GETTER.attendance" class="student">
          <div class="student__list clb">
            <h3>출결 현황</h3>
            <div class="m-t-3">
              <div
                v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.attendance"
                :key="i"
                class="item"
              >
                <p class="title">{{ v.reg_name }}</p>
                <div class="flex">
                  <div class="list">
                    <p>{{ v.smsa_date }}</p>
                    <p>{{ v.subject }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="GET_AXIOS_CALLBACK_GETTER.quest" class="student">
        <div class="student__list">
          <h3 v-if="LOGIN_CONFIG">
            진행중인 {{ LOGIN_CONFIG.todo_name }}
            <!-- ({{ studentName.length }}) -->
          </h3>
          <div class="m-t-3 clb">
            <div
              v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.quest"
              :key="i"
              class="item"
              style="min-width: calc((100% / 2) - 20px)"
            >
              <div class="">
                <p class="title">
                  <!-- <span class="jelly-point m-t-0 jelly-background--type1 m-l-1">
                    {{ v.cate === 1 ? 'M' : 'S' }}
                  </span> -->
                  {{ v.subject }}
                </p>
                <span class="jelly-point m-t-0 jelly-background--type1 m-l-1">
                  {{ v.intellect }}</span
                >
                <span class="jelly-point m-t-0 jelly-background--type2 m-l-1">{{
                  v.effort
                }}</span>
                <span class="jelly-point m-t-0 jelly-background--type3 m-l-1">{{
                  v.health
                }}</span>
                <span class="jelly-point m-t-0 jelly-background--type4 m-l-1">{{
                  v.etiquette
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="student"></div>
    </div>
    <!-- <b-modal id="mainNotice"> 알림장이당아아아아아아아아ㅡ앙 </b-modal> -->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'IndexPage',
  components: {},
  layout: 'default-pc',
  data() {
    return {
      LOGIN_CONFIG: {},
      params: {},
      studentName: [
        '민준',
        '서준',
        '도윤',
        '예준',
        '시우',
        '하준',
        '주원',
        '지호',
      ],
      today: '',
      isReadLength: 0,
    }
  },
  computed: {
    ...mapState(['LOGIN']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_TEACHER']),
  },
  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },
  mounted() {
    //   DATA INIT
    // console.log(this.$nuxt, this.$config)
    this.LOGIN_CONFIG = JSON.parse(localStorage.getItem('TEACHER'))
    console.log(this.$nuxt, this.$config, this.LOGIN_CONFIG)
    this.params = this.LOGIN_CONFIG
    this.params.type = 'main'
    this.GET_AXIOS(this.params)

    this.today = this.getToday()
    // console.log('================', this.isNoticeLength())
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    // ...mapMutations(),

    getToday() {
      const date = new Date()
      const year = date.getFullYear()
      const month = ('0' + (1 + date.getMonth())).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      return year + '.' + month + '.' + day
    },

    // isNoticeLength() {
    //   setTimeout(() => {
    //     const data = this.GET_AXIOS_CALLBACK_GETTER.notice
    //     data.forEach((element) => {
    //       console.log(element)
    //     })
    //   })
    // },
  },
}
</script>

<style lang="scss"></style>
