<template>
  <div id="school-content">
    <div v-if="LOADING" id="LOADING">
      <img src="~/static/img/loading.gif" />
    </div>
    <div class="historyBack m-l-3 m-b-5 flex">
      <b-icon icon="arrow-left" onclick="history.back()"></b-icon>
    </div>
    <!-- <div class="p-3 jelly-tab m-l-3 m-r-3">
      <ul class="flex">
        <li class="is_active">asd</li>
        <li>
          <nuxt-link to="/item-list/0" style="color: #111">asd</nuxt-link>
        </li>
      </ul>
    </div> -->
    <div v-if="lotto.lotto && lotto.lotto.status === '0'" class="m-b-4">
      <div class="text-center">
        당첨 발표일은 {{ lotto.lotto.end_day }} 입니다
      </div>
    </div>
    <div v-if="lotto.lotto.status === '1'" class="relative">
      <div
        ref="animationTitle"
        style="
          width: 100px;
          position: absolute;
          left: 50%;
          margin-left: 10px;
          margin-top: -20px;
        "
      ></div>
      <div v-if="myNum && myNum.cnt > 2">
        <div class="text-center bold" style="font-size: 40px">
          <em v-if="myNum.cnt === '2'">4등</em>
          <em v-if="myNum.cnt === '3'">3등</em>
          <em v-if="myNum.cnt === '4'">2등</em>
          <em v-if="myNum.cnt === '5'">1등</em>
        </div>
        <div class="text-center font-14 m-t-1">축하합니다.</div>
        <div class="text-center m-t-3">
          <span class="font-14">당첨금 : </span>
          <strong style="font-size: 30px"><em>123,123</em></strong>
        </div>
      </div>
      <div v-else>
        <div class="text-center font-14 m-t-1">
          {{ lotto.query }}회차 젤리복권
        </div>
      </div>
      <div class="flex flex-center m-t-3">
        <span
          class="lottoNumber"
          :class="
            apiNum[0] ? 'jelly-background--type1' : 'jelly-background--gray'
          "
        >
          {{ myNum.num1 }}
        </span>
        <span
          class="lottoNumber"
          :class="
            apiNum[1] ? 'jelly-background--type2' : 'jelly-background--gray'
          "
        >
          {{ myNum.num2 }}
        </span>
        <span
          class="lottoNumber"
          :class="
            apiNum[2] ? 'jelly-background--type3' : 'jelly-background--gray'
          "
        >
          {{ myNum.num3 }}
        </span>
        <span
          class="lottoNumber"
          :class="
            apiNum[3] ? 'jelly-background--type4' : 'jelly-background--gray'
          "
        >
          {{ myNum.num4 }}
        </span>
        <span
          class="lottoNumber"
          :class="
            apiNum[4] ? 'jelly-background--type5' : 'jelly-background--gray'
          "
        >
          {{ myNum.num5 }}
        </span>
      </div>
    </div>
    <div class="content">
      <div
        class="content__body h60"
        :class="myNum && myNum.cnt > 2 ? 'm-t-5' : 'm-t-3'"
      >
        <div>
          <div v-for="(v, i) in lotto.list" :key="i" class="flex m-b-4">
            <div style="line-height: 24px; min-width: 70px">
              {{ lotto.query - i }} 회차
            </div>
            <span class="lottoNumber sm jelly-background--type1">{{
              v.num1
            }}</span>
            <span class="lottoNumber sm jelly-background--type2">{{
              v.num2
            }}</span>
            <span class="lottoNumber sm jelly-background--type3">{{
              v.num3
            }}</span>
            <span class="lottoNumber sm jelly-background--type4">{{
              v.num4
            }}</span>
            <span class="lottoNumber sm jelly-background--type5">{{
              v.num5
            }}</span>
            <div class="flex-right font-12" style="line-height: 24px">
              총 <em class="font-16 bold">{{ v.total_pay | comma }}</em>
              <span v-if="LOGIN_CONFIG.t_reg_pay_unit">{{
                LOGIN_CONFIG.t_reg_pay_unit
              }}</span>
            </div>
          </div>
        </div>
        <div v-if="!lotto.list">
          <div class="text-center">아직 당첨 발표 내역이 없어요.</div>
        </div>
      </div>
    </div>
    <div ref="animationElement" class="animationElement"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      LOADING: false,
      LOGIN_CONFIG: {},
      myNum: {},
      apiNum: {},
      lotto: {
        list: {},
        query: '',
        lotto: {},
      },
    }
  },
  mounted() {
    // // 감자

    this.LOGIN_CONFIG = JSON.parse(localStorage.getItem('STUDENT'))

    this.LOADING = true
    const frm = new FormData()
    frm.append('mode', 'winning')
    frm.append('sms_idx', this.LOGIN_CONFIG.sms_idx)
    frm.append('smt_idx', this.LOGIN_CONFIG.smt_idx)
    this.$axios
      .post(process.env.VUE_APP_API + '/lotto.php', frm)
      .then((res) => {
        console.log(res.data)
        this.myNum = res.data.myNumber
        this.apiNum = res.data.apiNum
        this.lotto.list = res.data.lottoList
        this.lotto.query = res.data.query
        this.lotto.lotto = res.data.lotto
        this.LOADING = false
        // console.log('this.myNum.cnt', this.myNum.cnt)
        // if (Number(this.myNum.cnt) > 2) {
        //   this.winningTitle()
        //   this.winningStudent()
        // }
        if (this.myNum && this.myNum.cnt > 2 && this.lotto.list) {
          this.$nextTick(() => {
            this.winningTitle()
            this.winningStudent()
          })
        }
      })
      .catch((res) => {
        console.log('AXIOS FALSE', res)
        this.LOADING = false
      })
  },
  methods: {
    // french-fries
    winningTitle() {
      this.$lottie.loadAnimation({
        container: this.$refs.animationTitle, // the dom element that will contain the animation
        loop: true,
        autoplay: true,
        // autoplay: true,
        path: '/img/french-fries.json', // the path to the animation json
      })
    },
    winningStudent() {
      this.$lottie.loadAnimation({
        container: this.$refs.animationElement, // the dom element that will contain the animation
        loop: false,
        autoplay: true,
        // autoplay: true,
        path: '/img/congratulations_3.json', // the path to the animation json
      })
      setTimeout(() => {
        this.$refs.animationElement.style.display = 'none'
      }, 1000)
    },
  },
}
</script>

<style lang="scss">
span.lottoNumber {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  text-align: center;
  line-height: 38px;
  font-size: 20px;
  color: #fff;
  margin-right: 5px;
  &:last-child {
    margin-right: 0;
  }
  &.sm {
    width: 25px;
    height: 25px;
    font-size: 13px;
    line-height: 24px;
  }
}
.animationElement {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}
</style>
