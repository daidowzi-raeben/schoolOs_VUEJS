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
              <table v-if="GET_AXIOS_CALLBACK_GETTER.sue" class="jelly-table">
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
                  <th>관리 {{ queryCate }}</th>
                </tr>
                <tr v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.sue" :key="i">
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
        <button class="jelly-btn jelly-btn--default" @click="onSubmit(4)">
          벌금처리
        </button>
        <button class="jelly-btn jelly-btn--default" @click="onSubmit(3)">
          취소하기
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
        this.params.type = 'sueList'
        if (this.queryCate) {
          this.params.queryCate = value
          this.queryCate = value
          this.params = this.LOGIN_TEACHER
          this.GET_AXIOS(this.params)
        } else {
          this.queryCate = value
          this.params.queryCate = value

          this.params = this.LOGIN_TEACHER
          this.GET_AXIOS(this.params)
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
    this.params.type = 'sueList'
    this.params.queryCate = null
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT
    onSubmit(e) {
      this.paramsForm.idx = this.idx
      this.paramsForm.status = e
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

    onClickCategory(e) {
      if (e) {
        this.$router.push(`/sue-list?cate=${e}`)
      } else {
        this.queryCate = null
        this.$router.push(`/sue-list`)
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

    //
  },
}
</script>

<style lang="scss"></style>
