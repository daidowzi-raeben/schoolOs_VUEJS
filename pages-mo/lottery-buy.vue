<template>
  <div id="school-content">
    <div v-if="LOADING" id="LOADING">
      <img src="~/static/img/loading.gif" />
    </div>
    <div class="historyBack m-l-3 m-b-5 flex">
      <b-icon icon="arrow-left" onclick="history.back()"></b-icon>
      <nuxt-link
        to="/lottery-winning"
        class="flex-right"
        style="margin-top: -10px"
      >
        <span
          class="jelly-point jelly-background--type4 font-12 m-r-3"
          style="padding: 6px 8px"
        >
          당첨자 발표
        </span>
      </nuxt-link>
    </div>
    <div v-if="lottoView">
      <div class="p-l-3 p-r-3 text-center">
        젤리복권 {{ enterResult.th }}회차
        <div class="font-14">
          구매가격 : {{ enterResult.pay | comma }}
          <span v-if="LOGIN_CONFIG.t_reg_pay_unit">{{
            LOGIN_CONFIG.t_reg_pay_unit
          }}</span>
          <span
            v-if="isBuy === false"
            class="jelly-point m-t-0 jelly-background--type3 m-l-2 font-12"
            >구매가능</span
          >
          <span
            v-if="isBuy === true"
            class="jelly-point m-t-0 jelly-background--type1 m-l-2 font-12"
            >구매불가</span
          >
        </div>
        <div v-if="isBuy === false" class="p-l-3 p-r-3 font-12 m-t-2">
          구매가능일 {{ enterResult.start_day }} ~ {{ enterResult.end_day }}
        </div>
        <div v-if="nextDate !== ''" class="p-l-3 p-r-3 font-12 m-t-2">
          <div>당첨자 발표 {{ enterResult.end_day }}</div>
          <div>다음 구매 가능 일 {{ nextDate }}</div>
        </div>
      </div>
      <div id="lotto" class="clb p-3">
        <div v-for="item in 30" :key="item" class="number">
          <input
            :ref="`checkbox${item}`"
            type="checkbox"
            :value="item"
            style="
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              opacity: 0;
            "
            @click="onClickToggleClass($event, item)"
          />

          {{ item }}
        </div>
      </div>
      <div v-if="isBuy === false" class="text-center flex m-l-3 m-r-3">
        <button
          class="jelly-btn flex-full jelly-btn--default"
          @click="onClickRandNumber"
        >
          번호 자동선택
        </button>
        <button
          class="jelly-btn flex-full jelly-btn--pink m-l-2"
          @click="onSubmit"
        >
          구매하기
        </button>
      </div>
    </div>
    <div v-else>
      <div v-if="firstLotto === true" class="text-center">
        다음주 월요일 9시부터 <br />
        젤리복권을 구매할 수 있어요.
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      cnt: 0,
      lottoNumber: [],
      LOGIN_CONFIG: {},
      params: {},
      lottoView: false,
      randNumber: [],
      LOADING: true,
      lottoIdx: '',
      enterResult: [],
      isBuy: false,
      nextDate: '',
      firstLotto: false,
    }
  },
  mounted() {
    this.LOADING_TRUE()
    this.LOGIN_CONFIG = JSON.parse(localStorage.getItem('STUDENT'))
    this.nextDate = ''
    console.log(this.$nuxt, this.$config, this.LOGIN_CONFIG)
    this.params = this.LOGIN_CONFIG
    const frm = new FormData()
    frm.append('mode', 'enter')
    frm.append('sms_idx', this.LOGIN_CONFIG.sms_idx)
    frm.append('smt_idx', this.LOGIN_CONFIG.smt_idx)
    this.$axios
      .post(process.env.VUE_APP_API + '/lotto.php', frm)
      .then((res) => {
        if (res.data.result) {
          this.lottoIdx = res.data.result.idx
          this.lottoView = true
          this.enterResult = res.data.result
          this.enterResult.th = res.data.query
          if (res.data.myNumbers) {
            this.nextDate = res.data.next
            this.isBuy = true
            this.$nextTick(() => {
              this.lottoNumber = []
              console.log(res.data.myNumbers.num1)

              this.lottoNumber.push(res.data.myNumbers.num1)
              this.lottoNumber.push(res.data.myNumbers.num2)
              this.lottoNumber.push(res.data.myNumbers.num3)
              this.lottoNumber.push(res.data.myNumbers.num4)
              this.lottoNumber.push(res.data.myNumbers.num5)

              this.$refs[
                `checkbox${res.data.myNumbers.num1}`
              ][0].parentElement.classList.toggle('is_active')

              this.$refs[`checkbox${res.data.myNumbers.num1}`][0].checked = true

              this.$refs[
                `checkbox${res.data.myNumbers.num2}`
              ][0].parentElement.classList.toggle('is_active')

              this.$refs[`checkbox${res.data.myNumbers.num2}`][0].checked = true

              this.$refs[
                `checkbox${res.data.myNumbers.num3}`
              ][0].parentElement.classList.toggle('is_active')

              this.$refs[`checkbox${res.data.myNumbers.num3}`][0].checked = true

              this.$refs[
                `checkbox${res.data.myNumbers.num4}`
              ][0].parentElement.classList.toggle('is_active')

              this.$refs[`checkbox${res.data.myNumbers.num4}`][0].checked = true

              this.$refs[
                `checkbox${res.data.myNumbers.num5}`
              ][0].parentElement.classList.toggle('is_active')

              this.$refs[`checkbox${res.data.myNumbers.num5}`][0].checked = true
            })
          }
        } else {
          // alert('불량')
          this.firstLotto = true
        }
        console.log(res.data)
        this.LOADING = false
      })
      .catch((res) => {
        console.log('AXIOS FALSE', res)
        this.LOADING = false
      })
  },
  methods: {
    ...mapMutations(['LOADING_INIT', 'LOADING_TRUE']),
    onClickToggleClass(e, number) {
      if (e.target.checked === true && this.cnt >= 5) {
        e.target.checked = false
        return alert('stop')
      }
      if (e.target.checked === true) {
        this.cnt++
        this.lottoNumber.push(number)
      } else {
        this.cnt--
        const numArry = this.lottoNumber
        this.lottoNumber = []
        for (let n = 0; n < numArry.length; n++) {
          if (number !== numArry[n]) {
            this.lottoNumber.push(numArry[n])
          }
        }
      }
      e.target.parentElement.classList.toggle('is_active')
      console.log(this.cnt, this.lottoNumber)
      // console.log(e)
    },
    onClickRandNumber() {
      this.LOADING_TRUE()
      this.LOADING = true
      const frm = new FormData()
      frm.append('mode', 'rand')
      frm.append('sms_idx', this.LOGIN_CONFIG.sms_idx)
      frm.append('smt_idx', this.LOGIN_CONFIG.smt_idx)
      this.$axios
        .post(process.env.VUE_APP_API + '/lotto.php', frm)
        .then((res) => {
          console.log(res)
          const numArry = this.lottoNumber
          for (let n = 0; n < numArry.length; n++) {
            this.$refs[
              `checkbox${this.lottoNumber[n]}`
            ][0].parentElement.classList.toggle('is_active')
            this.$refs[`checkbox${this.lottoNumber[n]}`][0].checked = false
          }
          this.cnt = 0
          this.lottoNumber = []
          for (let i = 0; i < 5; i++) {
            this.lottoNumber.push(res.data.result[i])
            this.$refs[
              `checkbox${res.data.result[i]}`
            ][0].parentElement.classList.toggle('is_active')
            this.$refs[`checkbox${res.data.result[i]}`][0].checked = true
          }
          this.cnt = 5
          console.log(this.lottoNumber)
          this.LOADING = false
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
          this.LOADING = false
        })
    },
    onSubmit() {
      if (this.lottoNumber.length === 5 && this.cnt === 5) {
        if (confirm('구매할까요?')) {
          console.log('SUCCESS', this.cnt, this.lottoNumber)
          this.LOADING = true
          const frm = new FormData()
          frm.append('mode', 'buy')
          frm.append('numbers', this.lottoNumber)
          frm.append('sms_idx', this.LOGIN_CONFIG.sms_idx)
          frm.append('smt_idx', this.LOGIN_CONFIG.smt_idx)
          frm.append('sl_idx', this.lottoIdx)
          frm.append('pay', this.enterResult.pay)
          this.$axios
            .post(process.env.VUE_APP_API + '/lotto.php', frm)
            .then((res) => {
              console.log(res.data)
              if (res.data.success === 'FALSE') {
                console.log(res)
                alert('구매금액이 부족해요')
                this.LOADING = false

                return
              }
              this.isBuy = true
              this.LOADING = false
              alert(
                `젤리복권을 구매했어요. 당첨자 발표는 ${this.enterResult.end_day} 입니다.`
              )
            })
            .catch((res) => {
              console.log('AXIOS FALSE', res)
              this.LOADING = false
            })
        }
      } else {
        alert('5개의 번호가 모두 선택되어야 해요.')
      }
    },
  },
}
</script>

<style></style>
