<template>
  <div>
    <div>
      <div class="">
        <!-- <div v-if="GET_AXIOS_CALLBACK_GETTER.meal">
          <span
            v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.meal"
            :key="i"
            class="mealSpan"
          >
            #{{ v }}
          </span>
        </div> -->
        <!-- <div
          style="
            background: #eee;
            width: 100%;
            padding: 10px;
            height: 60px;
            line-height: 60px;
            border-radius: 5px;
          "
          class="m-b-3"
        ></div> -->
      </div>
      <div class="m-t-3">
        <h4>신규 소식</h4>
      </div>
      <div class="flex">
        <div class="student__list flex">
          <div class="item" style="width: 200px">
            <p class="title" style="color: #111">미 검사</p>
            <div class="text-right" style="color: #111">
              <strong
                v-if="GET_AXIOS_CALLBACK_GETTER.questConfirmCNT"
                class="font-20"
              >
                <em>{{ GET_AXIOS_CALLBACK_GETTER.questConfirmCNT }}</em>
              </strong>
              <strong v-else class="font-20">
                <em>0</em>
              </strong>
              건
            </div>
          </div>
          <div class="item" style="width: 200px">
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
          <div class="item" style="width: 200px">
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
          <div class="item" style="width: 200px">
            <p class="title" style="color: #111">환율</p>
            <div class="text-right" style="color: #111">
              <strong v-if="GET_AXIOS_CALLBACK_GETTER.teacher" class="font-20">
                1<span class="font-12">(KRW)</span> :
                <em>
                  {{
                    Math.round(
                      (GET_AXIOS_CALLBACK_GETTER.teacher.reg_pay_rate / 200) *
                        100
                    ) / 100
                  }}</em
                >
                <span v-if="LOGIN_TEACHER" class="font-12">
                  ({{ LOGIN_TEACHER.reg_pay_unit }})
                </span>
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-t-10">
      <div class="flex">
        <h4 class="is_active">출결관리</h4>
        <h4 class="m-l-4">교무수첩</h4>
        <div class="flex-right m-t-1">
          <b-icon
            v-if="isShow === true"
            v-b-toggle.MainCalendar
            icon="chevron-up"
            @click="onClickToggleArrow()"
          ></b-icon>
          <b-icon
            v-if="isShow === false"
            v-b-toggle.MainCalendar
            icon="chevron-down"
            @click="onClickToggleArrow()"
          ></b-icon>
        </div>
      </div>
      <b-collapse id="MainCalendar" visible>
        <MainCalendar />
      </b-collapse>
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
      isShow: true,
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
    onClickToggleArrow() {
      this.isShow === true ? (this.isShow = false) : (this.isShow = true)
    },
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
