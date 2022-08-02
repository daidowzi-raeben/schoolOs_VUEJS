<template>
  <div id="school-content">
    <div class="historyBack m-l-3 m-b-5">
      <b-icon icon="arrow-left" onclick="history.back()"></b-icon>
    </div>
    <div
      ref="animationElement"
      class="animation coinAnimeText"
      style="position: fixed"
    ></div>
    <div
      v-if="GET_AXIOS_CALLBACK_GETTER.noticePay && isCoinView === true"
      class="text-center font-12"
      style="border-bottom: 1px solid #eee; padding-bottom: 10px"
    >
      새로운 알림장을 읽어서 <br />
      <em class="font-14 bold" style="font-size: 16px">
        {{ GET_AXIOS_CALLBACK_GETTER.noticePay.notice_pay }}
      </em>
      <span v-if="LOGIN_STUDENT.t_reg_pay_unit">{{
        LOGIN_STUDENT.t_reg_pay_unit
      }}</span>
      가 지급됐어요
    </div>
    <div v-if="GET_AXIOS_CALLBACK_GETTER.noticeDetail" class="content">
      <div class="m-t-1 h60">
        <div class="account">
          <div
            v-if="GET_AXIOS_CALLBACK_GETTER.noticeDetail.bd_subject"
            class="quest__content m-t-3 m-l-3 m-r-3"
          >
            <div class="box quest m-b-3">
              <div class="">
                <div class="jelly-color--888" style="font-size: 12px">
                  {{
                    GET_AXIOS_CALLBACK_GETTER.noticeDetail.datetime
                      | moment('YY.MM.DD')
                  }}
                </div>
              </div>
              <p class="bold" style="font-size: 20px">
                {{ GET_AXIOS_CALLBACK_GETTER.noticeDetail.bd_subject }}
              </p>
            </div>

            <div
              v-if="GET_AXIOS_CALLBACK_GETTER.noticeDetail.bd_content"
              style="
                background-color: #f2f3f5;
                padding: 10px;
                border-radius: 10px;
                white-space: pre-line;
              "
              class="img-full"
              v-html="GET_AXIOS_CALLBACK_GETTER.noticeDetail.bd_content"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div v-if="GET_AXIOS_CALLBACK_GETTER">
    <h1>{{ GET_AXIOS_CALLBACK_GETTER.noticeDetail.bd_subject }}</h1>
    <p>User ID : {{ idx }} {{ a | comma }}</p>
  </div> -->
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import { historyBack } from '~/config/util'

export default {
  name: 'NoticeDetail',
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  asyncData({ params }) {
    console.log(params)
    return {
      idx: params.id,
    }
  },
  data() {
    return {
      params: {},
      a: 100000000,
      isCoinView: false,
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
    //   DATA INIT
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_STUDENT
    this.params.type = 'noticeView'
    this.params.idx = this.idx
    this.GET_AXIOS(this.params)
    historyBack()

    setTimeout(() => {
      this.studentCoin()
    }, 1500)

    // setTimeout(() => {
    //   this.isCoinView = true
    //   this.$lottie.loadAnimation({
    //     container: this.$refs.animationElement, // the dom element that will contain the animation
    //     loop: false,
    //     autoplay: true,
    //     path: '/img/coin.json', // the path to the animation json
    //   })
    // })
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT
    studentCoin() {
      if (this.GET_AXIOS_CALLBACK_GETTER.isCoin === 'Y') {
        this.isCoinView = true
      } else {
        this.isCoinView = false
        return false
      }
      this.$lottie.loadAnimation({
        container: this.$refs.animationElement, // the dom element that will contain the animation
        loop: false,
        autoplay: this.isCoinView,
        // autoplay: true,
        path: '/img/coin.json', // the path to the animation json
      })
      setTimeout(() => {
        // this.isCoinView = false
        this.$refs.animationElement.style.display = 'none'
      }, 1500)
    },
  },
}
</script>

<style lang="scss"></style>
