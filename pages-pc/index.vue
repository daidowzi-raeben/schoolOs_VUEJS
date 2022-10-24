<template>
  <div>
    <div v-if="GET_AXIOS_CALLBACK_DATA_MAIN.emergency > 0" class="Emergency">
      Emergency 모드가 활성화되어 입출금 및 알바고 기능이 중지됩니다.
    </div>
    <div>
      <div class="">
        <!-- <div v-if="GET_AXIOS_CALLBACK_DATA_MAIN.meal">
          <span
            v-for="(v, i) in GET_AXIOS_CALLBACK_DATA_MAIN.meal"
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
      <div class="m-t-3 flex">
        <h4 class="is_active">신규 소식</h4>
        <button
          class="jelly-btn flex-right"
          :class="
            GET_AXIOS_CALLBACK_DATA_MAIN.emergency > 0
              ? 'jelly-btn--default'
              : 'jelly-btn--pink'
          "
          @click="onClickEmergency"
        >
          {{
            GET_AXIOS_CALLBACK_DATA_MAIN.emergency > 0
              ? '입출금복구'
              : 'Emergency'
          }}
        </button>
      </div>
      <div class="flex m-t-3">
        <div class="student__list flex">
          <div class="item" style="width: 150px">
            <nuxt-link to="/todo-list">
              <p class="title" style="color: #111">미 검사</p>
              <div class="text-right" style="color: #111">
                <strong
                  v-if="GET_AXIOS_CALLBACK_DATA_MAIN.questConfirmCNT"
                  class="font-20"
                >
                  <em>{{ GET_AXIOS_CALLBACK_DATA_MAIN.questConfirmCNT }}</em>
                </strong>
                <strong v-else class="font-20">
                  <em>0</em>
                </strong>
                건
              </div>
            </nuxt-link>
          </div>
          <div class="item" style="width: 150px">
            <nuxt-link to="/sue-list">
              <p class="title" style="color: #111">신고접수</p>
              <div class="text-right" style="color: #111">
                <strong
                  v-if="GET_AXIOS_CALLBACK_DATA_MAIN.sueListCNT"
                  class="font-20"
                >
                  <em>{{ GET_AXIOS_CALLBACK_DATA_MAIN.sueListCNT }}</em>
                </strong>
                건
              </div>
            </nuxt-link>
          </div>
          <div class="item" style="width: 150px">
            <p class="title" style="color: #111">현재자산</p>
            <div class="text-right" style="color: #111">
              <strong
                v-if="GET_AXIOS_CALLBACK_DATA_MAIN.total_pay"
                class="font-20"
              >
                <em>{{
                  GET_AXIOS_CALLBACK_DATA_MAIN.total_pay.total_pay | comma
                }}</em>
              </strong>
              <span v-if="LOGIN_TEACHER">
                {{ LOGIN_TEACHER.reg_pay_unit }}
              </span>
            </div>
          </div>
          <div class="item" style="width: 150px">
            <p class="title" style="color: #111">미납 고지서</p>
            <div class="text-right" style="color: #111">
              <strong
                v-if="GET_AXIOS_CALLBACK_DATA_MAIN.billCNT"
                class="font-20"
              >
                <em>{{ GET_AXIOS_CALLBACK_DATA_MAIN.billCNT | comma }}</em>
              </strong>
              건
            </div>
          </div>
          <div class="item" style="width: 200px">
            <p class="title" style="color: #111">환율</p>
            <div class="text-right" style="color: #111">
              <strong
                v-if="GET_AXIOS_CALLBACK_DATA_MAIN.teacher"
                class="font-20"
              >
                1,000<span class="font-12">(KRW)</span> =
                <em>
                  {{
                    Math.round(
                      (GET_AXIOS_CALLBACK_DATA_MAIN.teacher.reg_pay_rate /
                        200) *
                        1000
                    )
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
    ...mapState(['LOGIN', 'GET_AXIOS_CALLBACK_DATA_MAIN']),
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
    onClickEmergency() {
      const frm = new FormData()
      frm.append('smt_idx', this.LOGIN_CONFIG.smt_idx)
      frm.append('type', 'emergency')
      if (this.GET_AXIOS_CALLBACK_DATA_MAIN.emergency > 0) {
        frm.append('mode', '1')
      } else {
        frm.append('mode', '0')
      }
      this.$axios
        .post(process.env.VUE_APP_API + '/teacher.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res)
          setTimeout(() => {
            this.params = this.LOGIN_CONFIG
            this.params.type = 'main'
            this.GET_AXIOS(this.params)
          })
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
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
.Emergency {
  position: fixed;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background: red;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
}
</style>
