<template>
  <div>
    <div class="">
      <div class="flex">
        <h4 v-if="LOGIN_TEACHER" class="is_active">알바고 관리</h4>
        <div class="flex-right">
          <button
            class="jelly-btn jelly-btn--default"
            @click="onclickInsertItemNew"
          >
            알바고 추가
          </button>
        </div>
      </div>
      <div id="jellyAdminheader" style="padding-top: 0vh">
        <div>
          <div class="m-t-5">
            <span
              class="spanBox m-r-2"
              :class="queryCate ? '' : 'is_active'"
              @click="onClickCategory('')"
              >전체</span
            >
            <span>
              <span
                class="spanBox m-r-2"
                :class="queryCate === '1' ? 'is_active' : ''"
                @click="onClickCategory(1)"
              >
                선생님 알바고
              </span>
            </span>
          </div>
        </div>
        <div class="student form">
          <div class="student__list">
            <div class="m-t-3">
              <table
                v-if="GET_AXIOS_CALLBACK_GETTER.albaList"
                class="jelly-table"
              >
                <tr>
                  <th>작성자</th>
                  <th>알바명</th>
                  <th>기간</th>
                  <th>알바비</th>
                </tr>
                <tr
                  v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.albaList"
                  :key="`albaList${i}`"
                  style="cursor: pointer"
                  @click="onClickItemDetail(v.idx)"
                >
                  <td>{{ v.reg_name ? v.reg_name : '선생님' }}</td>
                  <td>{{ v.subject }}</td>
                  <td>{{ v.start_day }} ~ {{ v.end_day }}</td>
                  <td class="text-right">{{ v.pay }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="itemInsert" size="lg" hide-footer hide-header>
      <div v-if="GET_AXIOS_CALLBACK_GETTER.albaDetail">
        <table class="jelly-table">
          <tr>
            <th>작성자</th>
            <td>
              {{
                GET_AXIOS_CALLBACK_GETTER.albaDetail.reg_name
                  ? GET_AXIOS_CALLBACK_GETTER.albaDetail.reg_name
                  : '선생님'
              }}
            </td>
            <th>알바비</th>
            <td>{{ GET_AXIOS_CALLBACK_GETTER.albaDetail.pay }}</td>
            <th>기간</th>
            <td>
              {{ GET_AXIOS_CALLBACK_GETTER.albaDetail.start_day }} ~
              {{ GET_AXIOS_CALLBACK_GETTER.albaDetail.end_day }}
            </td>
          </tr>
          <tr>
            <th>제목</th>
            <td colspan="5">
              {{ GET_AXIOS_CALLBACK_GETTER.albaDetail.subject }}
            </td>
          </tr>
          <tr>
            <td colspan="6">
              {{ GET_AXIOS_CALLBACK_GETTER.albaDetail.content }}
            </td>
          </tr>
        </table>
        <!-- <div class="m-t-5">
        <p>첨부파일</p>
        <input
          id="itemThumb"
          type="file"
          class="jelly-text jelly-text--h wd-full"
        />
      </div> -->
        <div class="m-t-5">
          <table
            v-if="GET_AXIOS_CALLBACK_GETTER.albaDetail"
            class="jelly-table"
          >
            <col style="width: 100px" />
            <col style="width: 100px" />
            <col style="width: auto" />
            <col
              v-if="!GET_AXIOS_CALLBACK_GETTER.albaDetail.sms_idx"
              style="width: 100px"
            />
            <tr>
              <th>지원자</th>
              <th>상태</th>
              <th>남긴말</th>
              <th v-if="!GET_AXIOS_CALLBACK_GETTER.albaDetail.sms_idx">관리</th>
            </tr>
            <tr
              v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.albApplyList"
              :key="i"
            >
              <td>{{ v.reg_name }}</td>
              <td v-if="v.status === '0'">신청중</td>
              <td v-if="v.status === '1'">알바중</td>
              <td v-if="v.status === '2'">취소</td>
              <td v-if="v.status === '3'">알바완료</td>
              <td>{{ v.memo }}</td>
              <td v-if="!GET_AXIOS_CALLBACK_GETTER.albaDetail.sms_idx">
                <button
                  v-if="v.status === '0'"
                  class="jelly-btn jelly-btn--default"
                  @click="onSubmitApproval(v.idx)"
                >
                  채용
                </button>
                <button
                  v-if="v.status === '1'"
                  class="jelly-btn jelly-btn--pink"
                  @click="onSubmitApprovalPay(v.idx)"
                >
                  지급
                </button>
              </td>
            </tr>
          </table>
        </div>
        <div class="m-t-5 text-center">
          <button
            class="jelly-btn jelly-btn--default"
            @click="$bvModal.hide('itemInsert')"
          >
            닫기
          </button>
          <button class="jelly-btn jelly-btn--pink" @click="onSubmitDelete">
            삭제하기
          </button>
        </div>
      </div>
    </b-modal>
    <b-modal id="itemInsertSubmit" size="lg" hide-footer hide-header>
      <div>
        <div class="flex-full">
          <p class="m-b-0">제목</p>
          <input
            v-model="alba.subject"
            type="text"
            class="jelly-text jelly-text--h wd-full m-t-1"
          />
        </div>
        <div class="flex-full flex m-t-3">
          <div class="relative flex-full m-r-3">
            <p class="m-b-0">알바비</p>
            <input
              :value="alba.pay"
              type="tel"
              class="jelly-text jelly-text--h wd-full text-right p-r-10 m-t-1"
              placeholder="한명당 알바비는 얼마인가요?"
              @input="payComma($event)"
              @click="
                ($event) => {
                  $event.target.value = ''
                }
              "
            />
            <span
              v-if="LOGIN_TEACHER && LOGIN_TEACHER.reg_pay_unit"
              style="position: absolute; right: 10px; top: 36px"
              >{{ LOGIN_TEACHER.reg_pay_unit }}</span
            >
          </div>
          <div class="relative flex-full">
            <p class="m-b-0">인원</p>
            <input
              v-model="alba.personnel"
              type="tel"
              class="jelly-text jelly-text--h wd-full text-right p-r-10 m-t-1"
              placeholder="몇명이 할 수 있는 일인가요?"
              @click="
                ($event) => {
                  $event.target.value = ''
                }
              "
            />
            <span style="position: absolute; right: 10px; top: 36px">명</span>
          </div>
        </div>
        <div class="flex m-t-3">
          <div class="m-r-3 flex-full">
            <p class="m-b-0">알바 시작일</p>
            <b-form-datepicker
              v-model="alba.start_day"
              class="jelly-text jelly-text--h wd-full flex-full m-t-1"
              placeholder="시작일"
            ></b-form-datepicker>
          </div>
          <div class="flex-full">
            <p class="m-b-0">알바 종료일</p>
            <b-form-datepicker
              v-model="alba.end_day"
              class="jelly-text jelly-text--h wd-full flex-full m-t-1"
              placeholder="종료일"
            ></b-form-datepicker>
          </div>
        </div>
        <div class="m-t-3">
          <p class="m-b-0">무슨 일을 하나요?</p>
          <vue-editor
            v-model="alba.content"
            class="m-t-1"
            placeholder="무슨 일을 하는지, 알바를 하며 주의해야 하는 점, 규칙 등을 자세하게 써주세요!"
          >
          </vue-editor>
        </div>
        <div class="m-t-5 text-center">
          <button
            class="jelly-btn jelly-btn--default"
            @click="$bvModal.hide('itemInsertSubmit')"
          >
            닫기
          </button>
          <button class="jelly-btn jelly-btn--pink" @click="onSubmit">
            저장
          </button>
        </div>
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
      alba: {
        subject: '',
        pay: 0,
        personnel: 0,
        content: '',
        start_day: '',
        end_day: '',
      },
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
    }
  },

  computed: {
    ...mapState(['LOGIN']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_TEACHER']),
  },
  watch: {
    'params.type': {
      handler(value) {
        if (value === 'shopList') {
          this.params = this.LOGIN_TEACHER
          this.params.type = 'albaList'
          this.GET_AXIOS(this.params)
        }
      },
    },
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
    this.params.type = 'albaList'
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT
    onSubmit() {
      if (confirm('등록할까요?')) {
        this.LOADING_TRUE()
        const frm = new FormData()
        frm.append('type', 'albaWrite')
        frm.append('subject', this.alba.subject)
        frm.append('content', this.alba.content)
        frm.append('pay', this.uncomma(this.alba.pay))
        frm.append('start_day', this.alba.start_day)
        frm.append('end_day', this.alba.end_day)
        frm.append('personnel', this.alba.personnel)
        frm.append('smt_idx', this.LOGIN_TEACHER.smt_idx)
        console.log(frm)
        // axiosForm(frm, '/student.php')
        this.$axios
          .post(process.env.VUE_APP_API + '/teacher.php', frm, {
            header: {
              'Context-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            this.$bvModal.hide('itemInsertSubmit')
            this.params = this.LOGIN_TEACHER
            this.params.type = 'albaList'
            this.GET_AXIOS(this.params)
          })
          .catch((res) => {
            console.error('AXIOS FALSE', res)
          })
      } else {
        return false
      }
      this.$bvModal.hide('itemInsert')
    },
    onclickInsertItemNew() {
      const today = new Date()

      const year = today.getFullYear()
      const month = ('0' + (today.getMonth() + 1)).slice(-2)
      const day = ('0' + today.getDate()).slice(-2)

      const dateString = year + '-' + month + '-' + day
      console.log(dateString)
      this.alba.start_day = dateString
      this.alba.end_day = dateString
      this.$bvModal.show('itemInsertSubmit')
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
        this.params.type = 'noticeList'
        this.GET_AXIOS(this.params)
      }, 1000)
      this.$bvModal.hide('itemInsert')
    },
    isActiveCalendar(e) {
      this.$refs[e].classList.toggle('is_active')
    },
    onClickCategory(e) {
      console.log('this.params.cate', this.params.cate)
      if (e) {
        this.$router.push(`/parttime-list?cate=${e}`)
        this.params = this.LOGIN_TEACHER
        this.params.type = 'albaList'
        this.params.cate = e
        this.GET_AXIOS(this.params)
      } else {
        this.$router.push(`/parttime-list`)
        this.$nextTick(() => {
          this.params = this.LOGIN_TEACHER
          this.params.cate = ''
          this.params.type = 'albaList'
          this.GET_AXIOS(this.params)
        })
      }
    },
    onClickItemDetail(e) {
      this.noticeIdx = e
      this.paramsDetail = this.LOGIN_TEACHER
      this.paramsDetail.type = 'albaList'
      this.paramsDetail.albaIdx = e
      console.log(this.paramsDetail)
      this.GET_AXIOS(this.paramsDetail)
      this.$bvModal.show('itemInsert')
    },
    onClickItemInsert() {
      this.noticeIdx = null
      this.noticeSubject = this.GET_AXIOS_CALLBACK_GETTER.week
      this.noticeContent = ''
      this.$bvModal.show('itemInsert')
    },
    onSubmitDelete() {
      if (confirm('삭제하시겠습니까?')) {
        this.LOADING_TRUE()
        const frm = new FormData()
        frm.append('type', 'albadel')
        frm.append('idx', this.noticeIdx)
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
              this.params.type = 'albaList'
              this.GET_AXIOS(this.params)
              this.$bvModal.hide('itemInsert')
            })
          })
          .catch((res) => {
            console.error('AXIOS FALSE', res)
          })
      }
    },
    payComma(e) {
      this.alba.pay = this.comma(this.uncomma(e.target.value))
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
    onSubmitApproval(idx) {
      if (confirm('채용 후에는 변경이 불가합니다.\n채용할까요?')) {
        this.LOADING_TRUE()
        const frm = new FormData()
        frm.append('type', 'albaApproval')
        frm.append('idx', idx)
        console.log(frm)
        // axiosForm(frm, '/student.php')
        this.$axios
          .post(process.env.VUE_APP_API + '/teacher.php', frm, {
            header: {
              'Context-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log(res.data)
            alert('채용되었습니다.')
            setTimeout(() => {
              //   this.$bvModal.hide('itemInsert')
              this.params = this.LOGIN_TEACHER
              this.params.type = 'albaList'
              this.params.idx = this.noticeIdx
              this.GET_AXIOS(this.params)
            })
          })
          .catch((res) => {
            console.error('AXIOS FALSE', res)
          })
      } else {
        return false
      }
    },
    onSubmitApprovalPay(idx) {
      if (
        confirm(
          '알바비를 지급하면 취소할 수 없어요?\n알바는 잘 마무리 되었나요?\n알바비를 지급할까요?'
        )
      ) {
        this.LOADING_TRUE()
        const frm = new FormData()
        frm.append('type', 'albaApprovalPay')
        frm.append('idx', idx)
        console.log(frm)
        // axiosForm(frm, '/student.php')
        this.$axios
          .post(process.env.VUE_APP_API + '/teacher.php', frm, {
            header: {
              'Context-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log(res.data)
            alert('알바비가 지급되었어요')
            this.$bvModal.hide('applyAlbago')
            setTimeout(() => {
              //   this.$bvModal.hide('itemInsert')
              this.params = this.LOGIN_TEACHER
              this.params.type = 'albaList'
              this.params.idx = this.noticeIdx
              this.GET_AXIOS(this.params)
            })
          })
          .catch((res) => {
            console.error('AXIOS FALSE', res)
          })
      } else {
        return false
      }
    },
    //
  },
}
</script>

<style lang="scss"></style>
