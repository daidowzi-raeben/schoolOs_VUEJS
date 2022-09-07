<template>
  <div>
    <div class="">
      <h4 v-if="LOGIN_TEACHER">신고관리</h4>

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
                <col width="140" />
                <tr>
                  <th>신고자</th>
                  <th>신고대상</th>
                  <th>제목</th>
                  <th>사건 발생일</th>
                  <th>관리</th>
                </tr>
                <tr v-for="(v, i) in STATE_TEACHER_SUE.sue" :key="i">
                  <td>{{ v.sms_name }}</td>
                  <td>{{ v.sms_name_to }}</td>
                  <td>{{ v.new_subject }}</td>
                  <td class="text-center">
                    {{ v.sue_date | moment('YY.MM.DD') }}
                  </td>
                  <td>
                    <button
                      class="jelly-btn jelly-btn--default"
                      @click="onClickItemDetail(v.idx)"
                    >
                      자세히 보기
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
            <p>신고자</p>
            {{ STATE_TEACHER_SUE.detail.sms_name }}
          </div>
          <div class="flex-full m-l-1">
            <p>신고 대상</p>
            {{ STATE_TEACHER_SUE.detail.sms_name_to }}
          </div>
          <div class="flex-full m-l-1">
            <p>사건 발생일</p>
            {{ STATE_TEACHER_SUE.detail.sue_date }}
          </div>
          <div
            v-if="Number(STATE_TEACHER_SUE.detail.rule_pay) > 0"
            class="flex-full m-l-1"
          >
            <p>벌금</p>
            {{ Number(STATE_TEACHER_SUE.detail.rule_pay) | comma }}
          </div>
        </div>
        <div class="m-t-5 flex">
          <div class="flex-full m-r-1">
            {{ STATE_TEACHER_SUE.detail.new_subject }}
          </div>
        </div>
        <div class="m-t-5 flex">
          <div class="flex-full m-r-1">
            {{ STATE_TEACHER_SUE.detail.content }}
          </div>
        </div>
        <div class="m-t-5 text-center">
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
          <button
            v-if="
              Number(STATE_TEACHER_SUE.detail.rule_pay) > 0 &&
              STATE_TEACHER_SUE.detail.status_bill === '0'
            "
            class="jelly-btn jelly-btn--pink"
            @click="onSubmitBill"
          >
            고지서 발송
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
    onSubmit(e) {
      this.LOADING_TRUE()
      const frm = new FormData()
      frm.append('type', 'sueList')
      frm.append('idx', this.idx)
      frm.append('status', e)
      this.$axios
        .post(process.env.VUE_APP_API + '/teacher.php', frm, {
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
      FORM_DATA.append(
        'billStudent',
        this.ACTIONS_TEACHER_CALLBACK_GETTER.detail.rule_pay
      )
      FORM_DATA.append(
        'sms_idx',
        this.ACTIONS_TEACHER_CALLBACK_GETTER.detail.sms_idx_to
      )
      FORM_DATA.append('smt_idx', this.LOGIN_TEACHER.smt_idx)
      FORM_DATA.append('billSubject', '규칙위반')
      FORM_DATA.append(
        'billContent',
        this.ACTIONS_TEACHER_CALLBACK_GETTER.detail.new_subject
      )
      FORM_DATA.append(
        'billPay',
        this.ACTIONS_TEACHER_CALLBACK_GETTER.detail.rule_pay
      )
      console.log('FORM_DATA', FORM_DATA)
      this.$axios
        .post(process.env.VUE_APP_API + '/teacher.php', FORM_DATA, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res)
          setTimeout(() => {
            alert('고지서가 발송되었습니다.')

            this.$bvModal.hide('itemInsert')
            this.LOADING_INIT()
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
      this.idx = e
      this.params.idx = e
      this.params = this.LOGIN_TEACHER
      this.params.type = 'sueList'
      this.ACTIONS_TEACHER(this.params)
      setTimeout(() => {
        this.$bvModal.show('itemInsert')
      })
      //   setTimeout(() => {
      //     this.noticeSubject = this.ACTIONS_TEACHER_CALLBACK_GETTER.detil.subject
      //     this.noticeContent = this.ACTIONS_TEACHER_CALLBACK_GETTER.detil.content
      //   }, 1500)
    },

    //
  },
}
</script>

<style lang="scss"></style>
