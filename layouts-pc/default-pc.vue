<template>
  <div id="jellyAdmin">
    <div v-if="LOADING" id="LOADING">
      <img src="~/static/img/loading.gif" />
    </div>
    <div id="jellyAdminheader">
      <div
        id="jellyAdminBG"
        class="jellyAdminBG"
        :style="`background-image:url(${adminBackgroundImage}); `"
      ></div>
      <div class="requestAdmin" @click="onClickRequest">피드백</div>
      <nav>
        <div class="menu" @click="menuActiveNav">
          <span id="menu-top" class="menu-global menu-top"></span>
          <span id="menu-middle" class="menu-global menu-middle"></span>
          <span id="menu-bottom" class="menu-global menu-bottom"></span>
        </div>
        <div id="adminGnb" class="adminGnb">
          <div class="gnb">
            <ul>
              <li @click="onClickLinkTo('')">처음으로</li>
              <li @click="onClickLinkTo('qr-code')">가입코드</li>
              <li @click="onClickLinkTo('pay-loan')">대출받기</li>
              <li @click="onClickLinkTo('job-list')">직업관리</li>
              <li @click="onClickLinkTo('student-list')">학생관리</li>
              <li @click="onClickLinkTo('parttime-list')">알바관리</li>
              <li @click="onClickLinkTo('shop-list')">상점관리</li>
              <li @click="onClickLinkTo('bill-list')">세금관리</li>
              <li @click="onClickLinkTo('sue-list')">신고관리</li>
              <li @click="onClickLinkTo('bill-student')">고지서관리</li>
              <li @click="onClickLinkTo('todo-list')">
                {{ LOGIN_CONFIG.todo_name }} 관리
              </li>
              <li @click="onClickLinkTo('notice-list')">알림장 관리</li>
              <li @click="onClickLinkTo('rule-detail')">규칙관리</li>
              <li @click="onClickLinkTo('teacher-setting')">환경설정</li>
              <li @click="onClickLinkTo('member/sign-out')">로그아웃</li>
            </ul>
          </div>
        </div>
      </nav>
      <!-- <div class="jelly-admin flex">
      <div class="gnb">
        <h1>LOGO</h1>
        <nav class="m-t-5">
          <ul>
            <li v-for="item in 5" :key="item">
              <nuxt-link to="/" :class="item === 1 ? 'is_active' : ''">
                <b-icon icon="bag" class="m-r-1"></b-icon>
                gnb0{{ item }}
              </nuxt-link>
            </li>
          </ul>
        </nav>
        <nav class="hr">
          <span class="font-12">1px solid rgba(94,86,105,.14)</span>
        </nav>
      </div>
      <div class="flex-full m-l-2 content"> -->
      <div class="content__body"><Nuxt /></div>
      <!-- </div>
    </div> -->
      <!-- <div id="liveChat">asd</div> -->
    </div>
    <b-modal id="requestModal" size="lg" hide-footer hide-header>
      <div class="m-t-5">
        <p>제목</p>
        <input
          v-model="request.subject"
          type="text"
          class="jelly-text jelly-text--h wd-full"
        />
      </div>

      <div class="m-t-5">
        <vue-editor v-model="request.content"> </vue-editor>
      </div>
      <div class="m-t-5 text-center">
        <button
          class="jelly-btn jelly-btn--default"
          @click="$bvModal.hide('requestModal')"
        >
          닫기
        </button>
        <button class="jelly-btn jelly-btn--pink" @click="onSubmitRequest">
          등록하기
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  name: 'DefaultLayoutPC',
  data() {
    return {
      LOGIN_CONFIG: {},
      adminBackgroundImage: '/pc/img/bg/london-bridge-by-sunny.jpg',
      request: {
        subject: null,
        content: null,
        url: '',
      },
    }
  },
  computed: {
    ...mapState(['LOGIN', 'adminMainBG', 'LOADING']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_TEACHER']),
  },
  watch: {
    adminMainBG: {
      handler(value) {
        console.log('================>', value)
        this.adminBackgroundImage = value
      },
      immediate: true,
    },
  },
  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },
  mounted() {
    console.log(
      '========= router =========',
      this.$router.currentRoute.fullPath
    )
    const loginCheck = localStorage.getItem('TEACHER')
    if (!loginCheck) {
      this.$router.push(`/member/sign-in`)
    }

    // document.getElementById(
    //   'jellyAdminBG'
    // ).style.backgroundImage = `url(${this.adminMainBG})`

    // pixabay api load
    this.LOGIN_CONFIG = JSON.parse(localStorage.getItem('TEACHER'))
    this.GET_API_BG_PIXABAY('가을')
    // setTimeout(() => {
    //   console.log('this.adminMainBG', this.adminMainBG)
    // }, 1000)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS', 'GET_API_BG_PIXABAY']),
    ...mapMutations(['ADMIN_MAIN_BG_MUTATIONS']),
    menuActiveNav() {
      document.getElementById('menu-top').classList.toggle('menu-top-click')
      document
        .getElementById('menu-middle')
        .classList.toggle('menu-middle-click')
      document
        .getElementById('menu-bottom')
        .classList.toggle('menu-bottom-click')
      document.getElementById('adminGnb').classList.toggle('is_active')
    },
    onSubmitRequest() {
      this.request.url = this.$router.currentRoute.fullPath
      const frm = new FormData()
      frm.append('type', 'request')
      frm.append('smt_idx', this.LOGIN_CONFIG.smt_idx)
      frm.append('subject', this.request.subject)
      frm.append('content', this.request.content)
      frm.append('url', this.request.url)
      console.log('frm', frm)
      this.$axios
        .post(process.env.VUE_APP_API + '/teacher.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res.data)
          alert('접수되었습니다.')
          this.$bvModal.hide('requestModal')
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },
    onClickLinkTo(e) {
      this.$router.push(`/${e}`)
      this.menuActiveNav()
    },
    onClickRequest(e) {
      // this.noticeIdx = e
      // this.paramsDetail = this.LOGIN_TEACHER
      // this.paramsDetail.type = 'noticeList'
      // this.paramsDetail.noticeIdx = e
      // console.log(e)
      // this.GET_AXIOS(this.paramsDetail)
      // setTimeout(() => {
      //   this.noticeSubject =
      //     this.GET_AXIOS_CALLBACK_GETTER.noticeView[0].bd_subject
      //   this.noticeContent =
      //     this.GET_AXIOS_CALLBACK_GETTER.noticeView[0].bd_content
      // }, 1500)
      this.$bvModal.show('requestModal')
    },
  },
}
</script>

<style lang="scss">
body {
  background-color: #000 !important;
  color: rgba(94, 86, 105, 0.68);
}
@import '~/assets-pc/var.scss';
@import '~/assets-pc/style.scss';
@import '~/assets-pc/reset.scss';
@import '~/assets-pc/layout.scss';
</style>
