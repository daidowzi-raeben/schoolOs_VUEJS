<template>
  <div>
    <div class="">
      <div id="jellyAdminheader">
        <span>{{ today }}</span>
        <h1 v-if="LOGIN_TEACHER && GET_AXIOS_CALLBACK_GETTER.total_pay">
          {{ LOGIN_TEACHER.reg_country }}
          <span v-b-tooltip.hover title="현재 재산" class="spanBox">
            {{ GET_AXIOS_CALLBACK_GETTER.total_pay.total_pay | comma }}
            {{ LOGIN_CONFIG.reg_pay_unit }}
          </span>
        </h1>
        <div class="p-l-5 m-t-5 m-b-5"></div>
        <div v-if="GET_AXIOS_CALLBACK_GETTER.attendance" class="student">
          <div class="student__list">
            <div class="flex m-t-3">
              <div
                v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.attendance"
                :key="i"
                class="item"
              >
                <p class="title">이번달 이자</p>
                <div class="flex">
                  <div class="list">
                    <p>{{ v.subject }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="GET_AXIOS_CALLBACK_GETTER.attendance" class="student">
          <div class="student__list">
            <h3>출결 현황</h3>
            <div class="flex m-t-3">
              <div
                v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.attendance"
                :key="i"
                class="item"
              >
                <p class="title">{{ v.reg_name }}</p>
                <div class="flex">
                  <div class="list">
                    <p>{{ v.subject }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="GET_AXIOS_CALLBACK_GETTER.notice" class="student">
        <div class="student__list">
          <h3 v-b-modal.mainNotice title="일어나">
            알림장 미확인 ({{ GET_AXIOS_CALLBACK_GETTER.notice.length }})
          </h3>
          <div class="m-t-3 clb">
            <div
              v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.notice"
              :key="i"
              class="item"
            >
              <template v-if="v.is_read === null">
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
              </template>
            </div>
          </div>
        </div>
      </div>
      <div v-if="GET_AXIOS_CALLBACK_GETTER.quest" class="student">
        <div class="student__list">
          <h3 v-if="LOGIN_TEACHER">
            진행중인 {{ LOGIN_TEACHER.todo_name }} ({{ studentName.length }})
          </h3>
          <div class="m-t-3 clb">
            <swiper>
              <swiper-slide
                v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.quest"
                :key="i"
                class="item"
                style="min-width: calc((100% / 3) - 20px)"
              >
                <div class="">
                  <p class="title">
                    <span
                      class="jelly-point m-t-0 jelly-background--type1 m-l-1"
                    >
                      {{ v.cate === 1 ? 'M' : 'S' }}
                    </span>
                    {{ v.subject }}
                  </p>
                  <span class="jelly-point m-t-0 jelly-background--type1 m-l-1">
                    {{ v.intellect }}</span
                  >
                  <span
                    class="jelly-point m-t-0 jelly-background--type2 m-l-1"
                    >{{ v.effort }}</span
                  >
                  <span
                    class="jelly-point m-t-0 jelly-background--type3 m-l-1"
                    >{{ v.health }}</span
                  >
                  <span
                    class="jelly-point m-t-0 jelly-background--type4 m-l-1"
                    >{{ v.etiquette }}</span
                  >
                </div></swiper-slide
              >
            </swiper>
          </div>
        </div>
      </div>
      <div class="student"></div>
    </div>
    <b-modal id="mainNotice"> 알림장이당아아아아아아아아ㅡ앙 </b-modal>
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
    this.params = this.LOGIN_TEACHER
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
