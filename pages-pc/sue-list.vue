<template>
  <div>
    <div class="">
      <div id="jellyAdminheader" style="padding-top: 0vh">
        <!-- <span>{{ today }}</span> -->
        <!-- <h1 v-if="LOGIN_TEACHER">신고 관리</h1> -->
        <div class="m-t-15 m-l-4"></div>
        <div v-if="GET_AXIOS_CALLBACK_GETTER.sue" class="student form">
          <div class="student__list">
            <h3>확인중인 신고</h3>
            <div class="m-t-3 clb">
              <div
                v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.sue"
                :key="i"
                class="item"
                style="width: 32%"
                @click="onClickItemDetail(v.idx)"
              >
                <div class="">
                  <p class="title">{{ v.new_subject }}</p>
                  <p>
                    신고자 : {{ v.sms_name }} / 신고대상 : {{ v.sms_name_to }}
                  </p>
                  <span class="font-12" style="color: #888"
                    >사건 발생일 : {{ v.sue_date }}</span
                  >
                </div>
                <!-- <div class="flex m-t-3">
                  <button
                    class="flex-full jelly-btn jelly-btn--default m-r-1"
                    @click="onClickItemDetailConfirm(v.idx)"
                  >
                    검사
                  </button>
                  <button
                    class="flex-full jelly-btn jelly-btn--default m-l-1"
                    @click="onClickItemDetail(v.idx)"
                  >
                    수정
                  </button>
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="m-t-15 m-l-4"></div>
        <div v-if="GET_AXIOS_CALLBACK_GETTER.sueComplete" class="student form">
          <div class="student__list">
            <h3>확인 완료된 신고</h3>
            <div class="m-t-3 clb">
              <div
                v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.sueComplete"
                :key="i"
                class="item"
                style="width: 32%"
                @click="onClickItemDetail(v.idx)"
              >
                <div class="">
                  <p class="title">{{ v.new_subject }}</p>
                  <p>
                    신고자 : {{ v.sms_name }} / 신고대상 : {{ v.sms_name_to }}
                  </p>
                  <span class="font-12" style="color: #888"
                    >사건 발생일 : {{ v.sue_date }}</span
                  >
                </div>
                <!-- <div class="flex m-t-3">
                  <button
                    class="flex-full jelly-btn jelly-btn--default m-r-1"
                    @click="onClickItemDetailConfirm(v.idx)"
                  >
                    검사
                  </button>
                  <button
                    class="flex-full jelly-btn jelly-btn--default m-l-1"
                    @click="onClickItemDetail(v.idx)"
                  >
                    수정
                  </button>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      v-if="GET_AXIOS_CALLBACK_GETTER.detail"
      id="itemInsert"
      size="lg"
      hide-footer
      hide-header
    >
      <div class="m-t-5 flex">
        <div class="flex-full m-r-1">
          <p>신고자</p>
          {{ GET_AXIOS_CALLBACK_GETTER.detail.sms_name }}
        </div>
        <div class="flex-full m-l-1">
          <p>신고 대상</p>
          {{ GET_AXIOS_CALLBACK_GETTER.detail.sms_name_to }}
        </div>
        <div class="flex-full m-l-1">
          <p>사건 발생일</p>
          {{ GET_AXIOS_CALLBACK_GETTER.detail.sue_date }}
        </div>
        <div
          v-if="Number(GET_AXIOS_CALLBACK_GETTER.detail.rule_pay) > 0"
          class="flex-full m-l-1"
        >
          <p>벌금</p>
          {{ Number(GET_AXIOS_CALLBACK_GETTER.detail.rule_pay) | comma }}
        </div>
      </div>
      <div class="m-t-5 flex">
        <div class="flex-full m-r-1">
          {{ GET_AXIOS_CALLBACK_GETTER.detail.new_subject }}
        </div>
      </div>
      <div class="m-t-5 flex">
        <div class="flex-full m-r-1">
          {{ GET_AXIOS_CALLBACK_GETTER.detail.content }}
        </div>
      </div>
      <div class="m-t-5 text-center">
        <button
          class="jelly-btn jelly-btn--default"
          @click="$bvModal.hide('itemInsert')"
        >
          닫기
        </button>
        <button class="jelly-btn jelly-btn--default" @click="onSubmit">
          완료하기
        </button>
        <button
          v-if="
            Number(GET_AXIOS_CALLBACK_GETTER.detail.rule_pay) > 0 &&
            GET_AXIOS_CALLBACK_GETTER.detail.status_bill === '0'
          "
          class="jelly-btn jelly-btn--pink"
          @click="onSubmitBill"
        >
          고지서 발송
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import { axiosForm } from '~/config/util'

export default {
  layout: 'default-pc',
  data() {
    return {
      params: {},
      paramsForm: {},
      paramsDetail: {},
      noticeSubject: '',
      noticeContent: '',
      noticeIdx: '',
      calendarSales: null,
      calendarDiscountSales: null,
      cate_name: '',
      cateIdx: '',
      itemPrice: 0,
      itemPriceDiscount: 0,
      itemContent: '',
      masks: {
        input: 'YYYY-MM-DD',
      },
      itemName: '',
      queryCate: null,
      quest: {
        subject: '',
        contents: '',
        cate: '',
        price: '',
        intellect: '',
        smt_idx: '',
        effort: '',
        health: '',
        etiquette: '',
        start_day: '',
        end_day: '',
        type: '',
      },
      confirm: {},
      idx: '',
    }
  },

  computed: {
    ...mapState(['LOGIN']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_TEACHER']),
  },
  watch: {
    '$route.query.cate': {
      handler(value) {
        console.log(value)
        this.queryCate = value
        // if (this.queryCate) {
        //   this.params = this.LOGIN_TEACHER
        //   //   this.params.queryCate = value
        //   this.params.type = 'shopList'
        //   this.GET_AXIOS(this.params)
        // } else {
        //   this.params = this.LOGIN_TEACHER
        //   this.params.type = 'shopList'
        //   this.GET_AXIOS(this.params)
        // }
      },
      immediate: true,
    },
  },
  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },
  mounted() {
    //   DATA INIT
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_TEACHER
    this.params.type = 'sueList'
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT
    onSubmit() {
      this.paramsForm.idx = this.idx
      this.paramsForm.type = 'sueList'
      this.POST_AXIOS(this.paramsForm)
      console.log('this.paramsForm', this.paramsForm)
      setTimeout(() => {
        this.params = this.LOGIN_TEACHER
        this.params.type = 'sueList'
        this.GET_AXIOS(this.params)
      }, 1000)
      this.$bvModal.hide('itemInsert')
    },
    onSubmitItem() {
      //   const itemThumb = document.getElementById('itemThumb')
      const FORM_DATA = new FormData()
      Object.entries(this.LOGIN_TEACHER).forEach((v, i) => {
        FORM_DATA.append(v[0], v[1])
      })
      FORM_DATA.append('type', 'noticeEdit')
      FORM_DATA.append('noticeSubject', this.noticeSubject)
      FORM_DATA.append('noticeContent', this.noticeContent)
      FORM_DATA.append('noticeIdx', this.noticeIdx)
      axiosForm(FORM_DATA, '/teacher.php')
      setTimeout(() => {
        this.params = this.LOGIN_TEACHER
        this.params.type = 'questList'
        this.GET_AXIOS(this.params)
      }, 1000)
      this.$bvModal.hide('itemInsert')
    },
    isActiveCalendar(e) {
      this.$refs[e].classList.toggle('is_active')
    },
    onClickCategory(e) {
      if (e) {
        this.$router.push(`/shop-list?cate=${e}`)
      } else {
        this.$router.push(`/shop-list`)
      }
    },
    onClickItemDetail(e) {
      this.$bvModal.show('itemInsert')
      this.idx = e
      this.params.idx = e
      this.params = this.LOGIN_TEACHER
      this.params.type = 'sueList'
      this.GET_AXIOS(this.params)
      //   setTimeout(() => {
      //     this.noticeSubject = this.GET_AXIOS_CALLBACK_GETTER.detil.subject
      //     this.noticeContent = this.GET_AXIOS_CALLBACK_GETTER.detil.content
      //   }, 1500)
    },
    onClickItemDetailConfirm(e) {
      this.noticeIdx = e
      this.paramsDetail = this.LOGIN_TEACHER
      this.paramsDetail.type = 'questList'
      this.paramsDetail.idx = e
      console.log(e)
      this.GET_AXIOS(this.paramsDetail)
      setTimeout(() => {
        this.noticeSubject = this.GET_AXIOS_CALLBACK_GETTER.view.subject
        this.noticeContent = this.GET_AXIOS_CALLBACK_GETTER.view.contents
        console.log(this.GET_AXIOS_CALLBACK_GETTER.participation)
      }, 1500)
      this.$bvModal.show('questConfirm')
    },
    onClickItemInsert() {
      this.noticeIdx = null
      this.noticeSubject = ''
      this.noticeContent = ''
      this.$bvModal.show('itemInsert')
    },
    onSubmitConfirm(isStatus, sqIdx, smsIdx) {
      this.confirm.type = 'questconfirm'
      this.confirm.sms_idx = smsIdx
      this.confirm.idx = sqIdx
      this.confirm.status = isStatus
      this.POST_AXIOS(this.confirm)
      this.GET_AXIOS(this.paramsDetail)
      setTimeout(() => {
        this.noticeIdx = sqIdx
        this.paramsDetail = this.LOGIN_TEACHER
        this.paramsDetail.type = 'questList'
        this.paramsDetail.idx = sqIdx
        console.log(sqIdx)
        this.GET_AXIOS(this.paramsDetail)
      }, 1500)
    },
    onSubmitBill() {
      // this.noticeIdx
      if (this.GET_AXIOS_CALLBACK_GETTER.detail) {
        const FORM_DATA = new FormData()
        console.log(this.idx)
        FORM_DATA.append('type', 'billListStudent')
        FORM_DATA.append('sueIdx', this.idx)
        FORM_DATA.append(
          'billStudent',
          this.GET_AXIOS_CALLBACK_GETTER.detail.rule_pay
        )
        FORM_DATA.append(
          'smt_idx',
          this.GET_AXIOS_CALLBACK_GETTER.detail.sms_idx_to
        )
        FORM_DATA.append('billSubject', '규칙위반')
        FORM_DATA.append(
          'billContent',
          this.GET_AXIOS_CALLBACK_GETTER.detail.new_subject
        )
        FORM_DATA.append(
          'billPay',
          this.GET_AXIOS_CALLBACK_GETTER.detail.rule_pay
        )
        axiosForm(FORM_DATA, '/teacher.php')

        setTimeout(() => {
          alert('고지서가 발송되었습니다.')

          this.$bvModal.hide('itemInsert')
        }, 1500)
      }
    },
    //
  },
}
</script>

<style lang="scss"></style>
