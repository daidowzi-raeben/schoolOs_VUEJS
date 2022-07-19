<template>
  <div>
    <div class="">
      <div id="jellyAdminheader" style="padding-top: 0vh">
        <!-- <span>{{ today }}</span> -->
        <h1 v-if="LOGIN_TEACHER">
          알림장관리

          <span
            class="spanBox m-l-2"
            style="color: #fff; font-size: 12px"
            @click="onClickItemInsert"
          >
            +
          </span>
        </h1>
        <div class="m-t-15 m-l-4"></div>
        <div class="student form">
          <div class="student__list">
            <div v-if="GET_AXIOS_CALLBACK_GETTER.noticeList" class="m-t-3">
              <div
                v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.noticeList"
                :key="`noticeList${i}`"
                class="item"
                style="width: 32%"
                @click="onClickItemDetail(v.idx)"
              >
                <p class="title">
                  {{ v.bd_subject }}
                </p>
                {{ v.datetime2 }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="itemInsert" size="lg" hide-footer hide-header>
      <div class="m-t-5">
        <p>제목</p>
        <input
          v-model="noticeSubject"
          type="text"
          class="jelly-text jelly-text--h wd-full"
        />
      </div>
      <!-- <div class="m-t-5">
        <p>첨부파일</p>
        <input
          id="itemThumb"
          type="file"
          class="jelly-text jelly-text--h wd-full"
        />
      </div> -->
      <div class="m-t-5">
        <vue-editor v-model="noticeContent"> </vue-editor>
      </div>
      <div class="m-t-5 text-center">
        <button
          class="jelly-btn jelly-btn--default"
          @click="$bvModal.hide('itemInsert')"
        >
          닫기
        </button>
        <button
          v-if="noticeIdx"
          class="jelly-btn jelly-btn--pink"
          @click="onSubmitItem"
        >
          수정하기
        </button>
        <button
          v-if="!noticeIdx"
          class="jelly-btn jelly-btn--pink"
          @click="onSubmit"
        >
          등록하기
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
    this.params.type = 'noticeList'
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations([]),

    // EVENT
    onSubmit() {
      this.paramsForm = this.LOGIN_TEACHER
      this.paramsForm.type = 'noticeWrite'
      this.paramsForm.bd_subject = this.noticeSubject
      this.paramsForm.bd_content = this.noticeContent
      this.paramsForm.bd_photo = 0
      this.POST_AXIOS(this.paramsForm)
      setTimeout(() => {
        this.params = this.LOGIN_TEACHER
        this.params.type = 'noticeList'
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
        this.params.type = 'noticeList'
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
      this.noticeIdx = e
      this.paramsDetail = this.LOGIN_TEACHER
      this.paramsDetail.type = 'noticeList'
      this.paramsDetail.noticeIdx = e
      console.log(e)
      this.GET_AXIOS(this.paramsDetail)
      setTimeout(() => {
        this.noticeSubject =
          this.GET_AXIOS_CALLBACK_GETTER.noticeView[0].bd_subject
        this.noticeContent =
          this.GET_AXIOS_CALLBACK_GETTER.noticeView[0].bd_content
      }, 1500)
      this.$bvModal.show('itemInsert')
    },
    onClickItemInsert() {
      this.noticeIdx = null
      this.noticeSubject = ''
      this.noticeContent = ''
      this.$bvModal.show('itemInsert')
    },
    //
  },
}
</script>

<style lang="scss"></style>
