<template>
  <div>
    <div>
      <div class="">
        <div v-if="GET_AXIOS_CALLBACK_GETTER.meal">
          <span
            v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.meal"
            :key="i"
            class="mealSpan"
          >
            #{{ v }}
          </span>
        </div>
      </div>
      <div class="m-t-3">
        <h4>신규 소식</h4>
      </div>
      <div class="flex">
        <div class="student__list flex">
          <div class="item">
            <p class="title" style="color: #111">미 검사</p>
            <div class="text-right" style="color: #111">
              <strong
                v-if="GET_AXIOS_CALLBACK_GETTER.questConfirmCNT"
                class="font-20"
              >
                <em>{{ GET_AXIOS_CALLBACK_GETTER.questConfirmCNT }}</em>
              </strong>
              건
            </div>
          </div>
          <div class="item">
            <nuxt-link to="/sue-list">
              <p class="title" style="color: #111">신고접수</p>
              <div class="text-right" style="color: #111">
                <strong
                  v-if="GET_AXIOS_CALLBACK_GETTER.sueListCNT"
                  class="font-20"
                >
                  <em>{{ GET_AXIOS_CALLBACK_GETTER.sueListCNT }}</em>
                </strong>
                건
              </div>
            </nuxt-link>
          </div>
          <div class="item">
            <p class="title" style="color: #111">현재자산</p>
            <div class="text-right" style="color: #111">
              <strong
                v-if="GET_AXIOS_CALLBACK_GETTER.total_pay"
                class="font-20"
              >
                <em>{{
                  GET_AXIOS_CALLBACK_GETTER.total_pay.total_pay | comma
                }}</em>
              </strong>
              <span v-if="LOGIN_TEACHER">
                {{ LOGIN_TEACHER.reg_pay_unit }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-t-10">
      <div class="">
        <h4>출결관리</h4>
      </div>
      <MainCalendar />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import MainCalendar from '~/components-pc/MainCalendar'
export default {
  name: 'IndexPage',
  components: { MainCalendar },
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
      totalPay: {
        list: {},
      },
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

    // console.log('================', this.isNoticeLength())
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    // ...mapMutations(),
  },
}
</script>

<style lang="scss">
.mealSpan {
  padding: 5px 10px;
  margin: 5px;
  display: inline-block;
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 50px;
}
</style>
