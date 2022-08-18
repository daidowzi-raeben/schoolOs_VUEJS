<template>
  <div>
    <div class="">
      <div class="flex">
        <h4 v-if="LOGIN_TEACHER">세금관리</h4>
        <div class="flex-right">
          <button
            v-b-tooltip.hover
            title="학생에게 세금에 필요한 지도를 위해 전기세, 수도세 등 공과금을 납부할 수 있습니다."
            class="jelly-btn jelly-btn--default"
            @click="onClickBillInsert"
          >
            세금 추가
          </button>
        </div>
      </div>
      <div id="jellyAdminheader" style="padding-top: 0vh">
        <div class="student form">
          <div class="student__list">
            <div class="m-t-3">
              <table
                v-if="GET_AXIOS_CALLBACK_GETTER.billList"
                class="jelly-table"
              >
                <tr>
                  <th>상태</th>
                  <th>구분</th>
                  <th>제목</th>
                  <th>고지서 번호</th>
                  <th>금액</th>
                </tr>
                <tr
                  v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.billList"
                  :key="i"
                >
                  <td>납부완료</td>
                  <td>{{ v.cate_name }}</td>
                  <td>{{ v.subject }}</td>
                  <td>{{ v.code }}</td>
                  <td class="text-right">
                    {{ v.pay | comma }} {{ LOGIN_TEACHER.reg_pay_unit }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="billInsert" size="lg" hide-footer hide-header>
      <div>
        <div class="">
          <div class="flex">
            <div class="flex-full m-r-1">
              <p>구분</p>
              <select
                v-if="GET_AXIOS_CALLBACK_GETTER.billCateList"
                v-model="billCateList"
                class="jelly-text wd-full"
              >
                <option :value="null">선택하세요</option>
                <option
                  v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.billCateList"
                  :key="i"
                  :value="v.idx"
                >
                  {{ v.subject }}
                </option>
              </select>
            </div>
            <div class="flex-full m-l-1">
              <p>제목</p>
              <input
                v-model="billSubject"
                type="text"
                class="jelly-text wd-full"
              />
            </div>
          </div>
        </div>
        <div class="m-t-5">
          <div class="flex-full m-l-1">
            <p>금액</p>
            <input
              :value="billPay"
              type="text"
              class="jelly-text wd-full"
              @input="payComma($event)"
              @click="resetInput($event)"
            />
          </div>
        </div>
        <div class="m-t-5 text-center">
          <button
            class="jelly-btn jelly-btn--default"
            @click="$bvModal.hide('billInsert')"
          >
            닫기
          </button>
          <button class="jelly-btn jelly-btn--pink" @click="onSubmit">
            납부하기
          </button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  layout: 'default-pc',
  data() {
    return {
      params: {},
      paramsPost: {},
      billCateList: null,
      billPay: 0,
      billSubject: '',
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
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_TEACHER
    this.params.type = 'billList'
    this.GET_AXIOS(this.params)
    // billCateList
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT
    onClickBillInsert() {
      this.billCateList = null
      this.billPay = 0
      this.billSubject = ''
      this.$bvModal.show('billInsert')
    },
    onSubmit() {
      if (
        Number(this.uncomma(this.billPay)) >
          Number(this.GET_AXIOS_CALLBACK_GETTER.teacher.total_pay) &&
        this.GET_AXIOS_CALLBACK_GETTER.teacher.inflation === 'Y'
      ) {
        return alert('잔액이 부족합니다. 대출 후 진행해 주세요.')
      }
      this.LOADING_TRUE()
      const frm = new FormData()
      frm.append('smt_idx', this.LOGIN_TEACHER.smt_idx)
      frm.append('type', 'billList')
      frm.append('billCateList', this.billCateList)
      frm.append('billPay', this.uncomma(this.billPay))
      frm.append('billSubject', this.billSubject)

      this.$axios
        .post(process.env.VUE_APP_API + '/teacher.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res)
          this.$bvModal.hide('billInsert')
          setTimeout(() => {
            this.params = this.LOGIN_TEACHER
            this.params.type = 'billList'
            this.GET_AXIOS(this.params)
          })
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },
    payComma(e) {
      this.billPay = this.comma(this.uncomma(e.target.value))
    },
    comma(str) {
      str = String(str)
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
    },
    uncomma(str) {
      str = String(str)
      return str.replace(/[^\d]+/g, '')
    },
    resetInput(e) {
      e.target.value = ''
    },
  },
}
</script>

<style lang="scss"></style>
