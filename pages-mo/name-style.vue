<template>
  <div id="school-content">
    <div v-if="LOADING" id="LOADING">
      <img src="~/static/img/loading.gif" />
    </div>
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
        <span v-if="LOGIN_CONFIG">{{ LOGIN_CONFIG.t_reg_pay_unit }}</span>
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
        <div
          v-if="GET_AXIOS_CALLBACK_GETTER.nameStyle"
          class="quest__content m-t-3"
        >
          <div
            v-for="(v, index) in GET_AXIOS_CALLBACK_GETTER.nameStyle"
            :key="index"
            class="box quest m-b-3"
          >
            <div class="flex m-t-0">
              <div class="flex-full m-l-2">
                <div class="m-t-0">
                  <div class="txt">
                    <p>
                      {{ v.title }}
                      {{ v.names }}
                    </p>
                    <p
                      v-if="GET_AXIOS_CALLBACK_GETTER.myNamePoint"
                      class="m-t-2 font-888 font-12"
                    >
                      <span v-if="v.discription === '알바'">
                        선생님이 올린 알바고 <br />
                        {{
                          GET_AXIOS_CALLBACK_GETTER.myNamePoint.alba
                            ? GET_AXIOS_CALLBACK_GETTER.myNamePoint.alba
                            : 0
                        }}
                        / {{ Number(v.sa_term) * Number(v.sac_term) }} 회
                      </span>
                      <span v-if="v.discription === '퀘스트' && LOGIN_CONFIG">
                        {{ LOGIN_CONFIG.t_todo_name }} <br />
                        {{
                          GET_AXIOS_CALLBACK_GETTER.myNamePoint.quest
                            ? GET_AXIOS_CALLBACK_GETTER.myNamePoint.quest
                            : 0
                        }}
                        / {{ Number(v.sa_term) * Number(v.sac_term) }} 회
                      </span>
                      <span v-if="v.discription === '비밀'">
                        히든 칭호입니다. <br />
                        <!-- {{
                          GET_AXIOS_CALLBACK_GETTER.myNamePoint.sue
                            ? GET_AXIOS_CALLBACK_GETTER.myNamePoint.sue
                            : 0
                        }}
                        / -->
                        <!-- {{ Number(v.sa_term) * Number(v.sac_term) }} 회 -->
                      </span>
                      <span v-if="v.discription === '상점구매'">
                        마켓에서 상품 구매 <br />
                        {{
                          GET_AXIOS_CALLBACK_GETTER.myNamePoint.shop
                            ? GET_AXIOS_CALLBACK_GETTER.myNamePoint.shop
                            : 0
                        }}
                        / {{ Number(v.sa_term) * Number(v.sac_term) }} 회
                      </span>
                      <span v-if="v.discription === '지혜'">
                        지혜 <br />
                        {{
                          GET_AXIOS_CALLBACK_GETTER.myNamePoint.intellect
                            ? GET_AXIOS_CALLBACK_GETTER.myNamePoint.intellect
                            : 0
                        }}
                        / {{ Number(v.sa_term) * Number(v.sac_term) }} 달성
                      </span>
                      <span v-if="v.discription === '건강'">
                        건강 <br />
                        {{
                          GET_AXIOS_CALLBACK_GETTER.myNamePoint.health
                            ? GET_AXIOS_CALLBACK_GETTER.myNamePoint.health
                            : 0
                        }}
                        / {{ Number(v.sa_term) * Number(v.sac_term) }} 달성
                      </span>
                      <span v-if="v.discription === '노력'">
                        노력 <br />
                        {{
                          GET_AXIOS_CALLBACK_GETTER.myNamePoint.effort
                            ? GET_AXIOS_CALLBACK_GETTER.myNamePoint.effort
                            : 0
                        }}
                        / {{ Number(v.sa_term) * Number(v.sac_term) }} 달성
                      </span>
                      <span v-if="v.discription === '예절'">
                        예절 <br />
                        {{
                          GET_AXIOS_CALLBACK_GETTER.myNamePoint.etiquette
                            ? GET_AXIOS_CALLBACK_GETTER.myNamePoint.etiquette
                            : 0
                        }}
                        / {{ Number(v.sa_term) * Number(v.sac_term) }} 달성
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex-right m-t-2">
                <button
                  v-if="
                    v.discription === '알바' &&
                    Number(GET_AXIOS_CALLBACK_GETTER.myNamePoint.alba) >=
                      Number(v.sa_term) * Number(v.sac_term)
                  "
                  class="jelly-btn"
                  :class="
                    GET_AXIOS_CALLBACK_GETTER.myNameStyle.name_style ===
                    `${v.title}|${v.names}`
                      ? 'jelly-btn--pink'
                      : 'jelly-btn--default'
                  "
                  @click="
                    onClickMyName(v.sa_idx, v.sac_idx, `${v.title}|${v.names}`)
                  "
                >
                  {{
                    GET_AXIOS_CALLBACK_GETTER.myNameStyle.name_style ===
                    `${v.title}|${v.names}`
                      ? '사용 중'
                      : '사용하기'
                  }}
                </button>
                <button
                  v-if="
                    v.discription === '퀘스트' &&
                    Number(GET_AXIOS_CALLBACK_GETTER.myNamePoint.quest) >=
                      Number(v.sa_term) * Number(v.sac_term)
                  "
                  class="jelly-btn"
                  :class="
                    GET_AXIOS_CALLBACK_GETTER.myNameStyle.name_style ===
                    `${v.title}|${v.names}`
                      ? 'jelly-btn--pink'
                      : 'jelly-btn--default'
                  "
                  @click="
                    onClickMyName(v.sa_idx, v.sac_idx, `${v.title}|${v.names}`)
                  "
                >
                  {{
                    GET_AXIOS_CALLBACK_GETTER.myNameStyle.name_style ===
                    `${v.title}|${v.names}`
                      ? '사용 중'
                      : '사용하기'
                  }}
                </button>
                <button
                  v-if="
                    v.discription === '비밀' &&
                    Number(GET_AXIOS_CALLBACK_GETTER.myNamePoint.sue) >=
                      Number(v.sa_term) * Number(v.sac_term)
                  "
                  class="jelly-btn"
                  :class="
                    GET_AXIOS_CALLBACK_GETTER.myNameStyle.name_style ===
                    `${v.title}|${v.names}`
                      ? 'jelly-btn--pink'
                      : 'jelly-btn--default'
                  "
                  @click="
                    onClickMyName(v.sa_idx, v.sac_idx, `${v.title}|${v.names}`)
                  "
                >
                  {{
                    GET_AXIOS_CALLBACK_GETTER.myNameStyle.name_style ===
                    `${v.title}|${v.names}`
                      ? '사용 중'
                      : '사용하기'
                  }}
                </button>
                <button
                  v-if="
                    v.discription === '상점구매' &&
                    Number(GET_AXIOS_CALLBACK_GETTER.myNamePoint.shop) >=
                      Number(v.sa_term) * Number(v.sac_term)
                  "
                  class="jelly-btn"
                  :class="
                    GET_AXIOS_CALLBACK_GETTER.myNameStyle.name_style ===
                    `${v.title}|${v.names}`
                      ? 'jelly-btn--pink'
                      : 'jelly-btn--default'
                  "
                  @click="
                    onClickMyName(v.sa_idx, v.sac_idx, `${v.title}|${v.names}`)
                  "
                >
                  {{
                    GET_AXIOS_CALLBACK_GETTER.myNameStyle.name_style ===
                    `${v.title}|${v.names}`
                      ? '사용 중'
                      : '사용하기'
                  }}
                </button>
                <button
                  v-if="
                    v.discription === '지혜' &&
                    Number(GET_AXIOS_CALLBACK_GETTER.myNamePoint.intellect) >=
                      Number(v.sa_term) * Number(v.sac_term)
                  "
                  class="jelly-btn"
                  :class="
                    GET_AXIOS_CALLBACK_GETTER.myNameStyle.name_style ===
                    `${v.title}|${v.names}`
                      ? 'jelly-btn--pink'
                      : 'jelly-btn--default'
                  "
                  @click="
                    onClickMyName(v.sa_idx, v.sac_idx, `${v.title}|${v.names}`)
                  "
                >
                  {{
                    GET_AXIOS_CALLBACK_GETTER.myNameStyle.name_style ===
                    `${v.title}|${v.names}`
                      ? '사용 중'
                      : '사용하기'
                  }}
                </button>
                <button
                  v-if="
                    v.discription === '건강' &&
                    Number(GET_AXIOS_CALLBACK_GETTER.myNamePoint.health) >=
                      Number(v.sa_term) * Number(v.sac_term)
                  "
                  class="jelly-btn"
                  :class="
                    GET_AXIOS_CALLBACK_GETTER.myNameStyle.name_style ===
                    `${v.title}|${v.names}`
                      ? 'jelly-btn--pink'
                      : 'jelly-btn--default'
                  "
                  @click="
                    onClickMyName(v.sa_idx, v.sac_idx, `${v.title}|${v.names}`)
                  "
                >
                  {{
                    GET_AXIOS_CALLBACK_GETTER.myNameStyle.name_style ===
                    `${v.title}|${v.names}`
                      ? '사용 중'
                      : '사용하기'
                  }}
                </button>
                <button
                  v-if="
                    v.discription === '노력' &&
                    Number(GET_AXIOS_CALLBACK_GETTER.myNamePoint.effort) >=
                      Number(v.sa_term) * Number(v.sac_term)
                  "
                  class="jelly-btn"
                  :class="
                    GET_AXIOS_CALLBACK_GETTER.myNameStyle.name_style ===
                    `${v.title}|${v.names}`
                      ? 'jelly-btn--pink'
                      : 'jelly-btn--default'
                  "
                  @click="
                    onClickMyName(v.sa_idx, v.sac_idx, `${v.title}|${v.names}`)
                  "
                >
                  {{
                    GET_AXIOS_CALLBACK_GETTER.myNameStyle.name_style ===
                    `${v.title}|${v.names}`
                      ? '사용 중'
                      : '사용하기'
                  }}
                </button>
                <button
                  v-if="
                    v.discription === '예절' &&
                    Number(GET_AXIOS_CALLBACK_GETTER.myNamePoint.etiquette) >=
                      Number(v.sa_term) * Number(v.sac_term)
                  "
                  class="jelly-btn"
                  :class="
                    GET_AXIOS_CALLBACK_GETTER.myNameStyle.name_style ===
                    `${v.title}|${v.names}`
                      ? 'jelly-btn--pink'
                      : 'jelly-btn--default'
                  "
                  @click="
                    onClickMyName(v.sa_idx, v.sac_idx, `${v.title}|${v.names}`)
                  "
                >
                  {{
                    GET_AXIOS_CALLBACK_GETTER.myNameStyle.name_style ===
                    `${v.title}|${v.names}`
                      ? '사용 중'
                      : '사용하기'
                  }}
                </button>
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
      params: {
        type: 'nameStyle',
      },
      paramsPost: {},
      LOGIN_CONFIG: {},
      start_day: '',
      end_day: '',
      isHistory: '',
      status: null,
      LOADING: true,
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
    this.LOADING_TRUE()

    //   DATA INIT
    // console.log(this.$nuxt, this.$config, this.rangeCalendar)
    // this.params = this.LOGIN_CONFIG
    // const frm = new FormData()
    // frm.append('type', 'teacherPayList')
    // frm.append('smt_idx', this.LOGIN_CONFIG.smt_idx)
    // this.$axios
    //   .post('https://api.school-os.net' + '/student.php', frm, {
    //     header: {
    //       'Context-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res)
    //     this.totalPay.list = res.data.teacherPayList
    //     this.totalPay.teacher = res.data.teacher
    //     this.$bvModal.show('teacherPayList')
    //   })
    //   .catch((res) => {
    //     console.log('AXIOS FALSE', res)
    //   })
    this.LOGIN_CONFIG = JSON.parse(localStorage.getItem('STUDENT'))
    this.params = this.LOGIN_CONFIG
    this.params.type = 'nameStyle'
    this.GET_AXIOS(this.params)

    this.LOADING = false
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_INIT', 'LOADING_TRUE']),

    // EVENT
    onClickTodoDetail(idx) {
      this.$router.push('/todo-detail/' + idx)
    },
    onClickMyName(e, v, c) {
      console.log(e, v, c)
      this.LOADING = true
      const frm = new FormData()
      frm.append('type', 'myNameChange')
      frm.append('name_style', c)
      frm.append('sms_idx', this.LOGIN_CONFIG.sms_idx)
      this.$axios
        .post('https://api.school-os.net' + '/student.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res.data)
          setTimeout(() => {
            this.params = this.LOGIN_CONFIG
            this.params.type = 'nameStyle'
            this.GET_AXIOS(this.params)
            this.LOADING = false
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
