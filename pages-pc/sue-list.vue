<template>
  <div>
    <div class="">
      <h4 v-if="LOGIN_TEACHER" class="is_active">신고관리</h4>

      <div id="jellyAdminheader" style="padding-top: 0vh">
        <div class="m-t-5">
          <span
            class="spanBox m-r-2"
            :class="queryCate ? '' : 'is_active'"
            @click="onClickCategory('')"
            >신고접수</span
          >
          <span
            class="spanBox m-r-2"
            :class="queryCate === '5' ? 'is_active' : ''"
            @click="onClickCategory('5')"
            >완료 처리</span
          >
          <span
            class="spanBox m-r-2"
            :class="queryCate === '1' ? 'is_active' : ''"
            @click="onClickCategory('1')"
            >고지서 발송</span
          >
          <span
            class="spanBox m-r-2"
            :class="queryCate === '2' ? 'is_active' : ''"
            @click="onClickCategory('2')"
            >벌칙 처리</span
          >

          <span
            class="spanBox m-r-2"
            :class="queryCate === '3' ? 'is_active' : ''"
            @click="onClickCategory('3')"
            >취소</span
          >
        </div>
        <div class="student form">
          <div class="student__list">
            <div class="m-t-3">
              <table
                v-if="STATE_TEACHER_SUE && STATE_TEACHER_SUE.sue"
                class="jelly-table"
              >
                <col width="80" />
                <col width="100" />
                <col width="*" />
                <col width="110" />
                <col width="100" />
                <col width="240" />
                <tr>
                  <th>신고자</th>
                  <th>신고대상</th>
                  <th>제목</th>
                  <th>사건 발생일</th>
                  <th>고지서</th>
                  <th>관리</th>
                </tr>
                <tr v-for="(v, i) in STATE_TEACHER_SUE.sue" :key="i">
                  <td>{{ v.sms_name }}</td>
                  <td>{{ v.sms_name_to }}</td>
                  <td>{{ v.new_subject }}</td>
                  <td class="text-center">
                    {{ v.sue_date | moment('YY.MM.DD') }}
                  </td>
                  <td class="text-center">
                    {{ v.status_bill === '0' ? '미발송' : '발송' }}
                  </td>
                  <td>
                    <button
                      class="jelly-btn jelly-btn--default"
                      @click="onClickItemDetail(v.idx)"
                    >
                      자세히 보기
                    </button>
                    <button
                      v-if="!$route.query.cate"
                      class="jelly-btn jelly-btn--default"
                      @click="onSubmitList(5, v.idx)"
                    >
                      완료처리
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="itemInsert" size="lg" hide-footer hide-header>
      <div v-if="STATE_TEACHER_SUE.detail">
        <div class="m-t-5 flex">
          <div class="flex-full m-r-1">
            <p class="bold">신고자</p>
            {{ STATE_TEACHER_SUE.detail.sms_name }}
          </div>
          <div class="flex-full m-l-1">
            <p class="bold">신고 대상</p>
            {{ STATE_TEACHER_SUE.detail.sms_name_to }}
          </div>
          <div class="flex-full m-l-1">
            <p class="bold">사건 발생일</p>
            {{ STATE_TEACHER_SUE.detail.sue_date }}
          </div>
          <div
            v-if="Number(STATE_TEACHER_SUE.detail.rule_pay) > 0"
            class="flex-full m-l-1"
          >
            <p class="bold">벌금</p>
            <em>{{ Number(STATE_TEACHER_SUE.detail.rule_pay) | comma }}</em>
          </div>
        </div>
        <div class="m-t-5">
          <p class="bold">잘못한 일</p>
          <div class="flex-full m-r-1">
            {{ STATE_TEACHER_SUE.detail.new_subject }}
          </div>
        </div>
        <div v-if="STATE_TEACHER_SUE.detail.evidence" class="m-t-8">
          <p class="bold">증인 또는 증거</p>
          <div class="flex-full m-r-1">
            {{ STATE_TEACHER_SUE.detail.evidence }}
          </div>
        </div>
        <div class="m-t-8">
          <p class="bold">상세 내용</p>
          <div class="flex-full m-r-1">
            {{ STATE_TEACHER_SUE.detail.content }}
          </div>
        </div>
        <div class="m-t-8">
          <p class="bold">벌금 고지서 발송</p>
          <div
            v-if="
              Number(STATE_TEACHER_SUE.detail.rule_pay) > 0 &&
              STATE_TEACHER_SUE.detail.status_bill === '0'
            "
            class="flex-full m-r-1"
          >
            <input
              type="text"
              class="jelly-text text-right"
              style="width: 120px"
              refs="refsBillPay"
              :value="STATE_TEACHER_SUE.detail.rule_pay"
              @input="payComma($event)"
            />
            <span v-if="LOGIN_TEACHER">
              {{ LOGIN_TEACHER.reg_pay_unit }}
            </span>
            <button
              class="jelly-btn jelly-btn--pink m-l-2"
              @click="onSubmitBill"
            >
              고지서 발송
            </button>
          </div>
          <div v-else>
            <em v-if="STATE_TEACHER_SUE.detail.status_bill === '0'"
              >벌금이 지정되지 않았습니다</em
            >
            <em v-else>고지서가 이미 발송되었습니다.</em>
          </div>
          <div v-if="STATE_TEACHER_SUE.photo" class="m-t-8">
            <p class="bold">증거사진</p>
            <div>
              <b-carousel
                id="carousel-1"
                v-model="slide"
                :interval="4000"
                controls
                indicators
                background="#ababab"
                img-width="1024"
                img-height="480"
                style="text-shadow: 1px 1px 2px #333"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
              >
                <!-- Slides with image only -->
                <b-carousel-slide
                  v-for="(v, i) in STATE_TEACHER_SUE.photo"
                  :key="i"
                  :img-src="`http://api.school-os.net/data/student/sue/${v.file_name}`"
                ></b-carousel-slide>
              </b-carousel>
            </div>
          </div>
        </div>
        <div class="m-t-8 text-center">
          <button
            class="jelly-btn jelly-btn--default"
            @click="$bvModal.hide('itemInsert')"
          >
            닫기
          </button>
          <button class="jelly-btn jelly-btn--default" @click="onSubmit(4)">
            벌칙처리
          </button>
          <button class="jelly-btn jelly-btn--default" @click="onSubmit(5)">
            완료처리
          </button>
          <button class="jelly-btn jelly-btn--default" @click="onSubmit(3)">
            취소하기
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
      params: {
        type: 'sueList',
      },
      paramsForm: {},
      paramsDetail: {},
      billPay: 0,
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
      slide: 0,
      sliding: null,
    }
  },

  computed: {
    ...mapState(['LOGIN', 'STATE_TEACHER_SUE']),
    ...mapGetters(['LOGIN_TEACHER']),
  },
  watch: {
    '$route.query.cate': {
      handler(value) {
        console.log(value)
        this.params.type = 'sueList'
        if (value) {
          console.log('=====================')
          this.params.type = 'sueList'

          this.params.queryCate = value
          this.queryCate = value
          this.params = this.LOGIN_TEACHER
          this.ACTIONS_TEACHER(this.params)
        }
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
    this.$nextTick(() => {
      this.params.type = 'sueList'
      this.params.queryCate = null
      this.ACTIONS_TEACHER(this.params)
    })
  },
  beforeDestroy() {
    console.log(this.params.type)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'ACTIONS_TEACHER']),
    ...mapMutations(['LOADING_INIT', 'LOADING_TRUE']),

    // EVENT
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    onSubmit(e) {
      this.LOADING_TRUE()
      const frm = new FormData()
      frm.append('type', 'sueList')
      frm.append('idx', this.idx)
      frm.append('status', e)
      this.$axios
        .post('http://api.school-os.net' + '/teacher.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res)
          setTimeout(() => {
            this.params = this.LOGIN_TEACHER
            this.params.type = 'sueList'
            this.ACTIONS_TEACHER(this.params)
            this.$bvModal.hide('itemInsert')
            this.LOADING_INIT()
          })
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },
    onSubmitList(e, idx) {
      this.LOADING_TRUE()
      const frm = new FormData()
      frm.append('type', 'sueList')
      frm.append('idx', idx)
      frm.append('status', e)
      this.$axios
        .post('http://api.school-os.net' + '/teacher.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res)
          setTimeout(() => {
            this.params = this.LOGIN_TEACHER
            this.params.type = 'sueList'
            this.ACTIONS_TEACHER(this.params)
            this.$bvModal.hide('itemInsert')
            this.LOADING_INIT()
          })
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },

    onSubmitBill() {
      this.LOADING_TRUE()
      const FORM_DATA = new FormData()
      console.log(this.idx)
      FORM_DATA.append('type', 'billListStudentSue')
      FORM_DATA.append('sueIdx', this.idx)
      FORM_DATA.append('billStudent', this.STATE_TEACHER_SUE.detail.rule_pay)
      FORM_DATA.append('sms_idx', this.STATE_TEACHER_SUE.detail.sms_idx_to)
      FORM_DATA.append('smt_idx', this.LOGIN_TEACHER.smt_idx)
      FORM_DATA.append('billSubject', '규칙위반')
      FORM_DATA.append('billContent', this.STATE_TEACHER_SUE.detail.new_subject)
      if (this.billPay === 0) {
        FORM_DATA.append('billPay', this.STATE_TEACHER_SUE.detail.rule_pay)
      } else {
        FORM_DATA.append('billPay', this.billPay)
      }
      console.log('FORM_DATA', FORM_DATA)
      this.$axios
        .post('http://api.school-os.net' + '/teacher.php', FORM_DATA, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res)
          setTimeout(() => {
            alert('고지서가 발송되었습니다.')

            this.$bvModal.hide('itemInsert')
            // this.LOADING_INIT()
            this.params = this.LOGIN_TEACHER
            this.$nextTick(() => {
              this.params.type = 'sueList'
              if (this.$route.query.cate) {
                this.params.queryCate = this.$route.query.cate
              } else {
                this.params.queryCate = null
              }
              this.ACTIONS_TEACHER(this.params)
            })
          })
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },

    onClickCategory(e) {
      if (e) {
        this.$router.push(`/sue-list?cate=${e}`)
      } else {
        this.queryCate = null
        this.$router.push(`/sue-list`)
        this.$nextTick(() => {
          this.params.type = 'sueList'
          this.params.queryCate = null
          this.ACTIONS_TEACHER(this.params)
        })
      }
    },
    onClickItemDetail(e) {
      this.billPay = 0
      this.idx = e
      this.params.idx = e
      this.params = this.LOGIN_TEACHER
      this.params.type = 'sueList'
      this.ACTIONS_TEACHER(this.params)
      setTimeout(() => {
        this.$bvModal.show('itemInsert')
      })
      //   setTimeout(() => {
      //     this.noticeSubject = this.STATE_TEACHER_SUE.detil.subject
      //     this.noticeContent = this.STATE_TEACHER_SUE.detil.content
      //   }, 1500)
    },
    payComma(e) {
      e.target.value = this.comma(this.uncomma(e.target.value))
      this.billPay = this.uncomma(e.target.value)
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

    //
  },
}
</script>

<style lang="scss"></style>
