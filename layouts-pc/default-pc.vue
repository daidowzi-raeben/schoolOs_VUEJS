<template>
  <div id="jellyAdmin">
    <div v-if="LOADING" id="LOADING">
      <img src="~/static/img/loading.gif" />
    </div>
    <div class="jelly-admin">
      <div class="">
        <div class="gnb" style="">
          <!-- 36465D -->
          <h1 style="cursor: pointer" @click="onClickLinkTo($event, '')">
            SCHOOL OS
          </h1>
          <ul>
            <li>
              <div v-b-toggle.gnbSetupToggle class="flex">
                <b-icon icon="gear" class="m-r-2"></b-icon> 환경설정
                <b-icon icon="chevron-down" class="flex-right"></b-icon>
              </div>
              <div>
                <b-collapse
                  id="gnbSetupToggle"
                  :visible="
                    GET_AXIOS_CALLBACK_GETTER_LAYOUT.jobCnt === '0' &&
                    GET_AXIOS_CALLBACK_GETTER_LAYOUT.ruleCnt === '0' &&
                    GET_AXIOS_CALLBACK_GETTER_LAYOUT.studentApplyCnt === '0'
                      ? true
                      : false
                  "
                >
                  <ul>
                    <li @click="onClickLinkTo($event, 'job-list')">
                      직업설정
                      <b-badge
                        v-if="GET_AXIOS_CALLBACK_GETTER_LAYOUT.jobCnt === '0'"
                        variant="warning"
                        class="m-l-1"
                        >설정 전</b-badge
                      >
                    </li>
                    <li @click="onClickLinkTo($event, 'rule-detail')">
                      규칙설정
                      <b-badge
                        v-if="GET_AXIOS_CALLBACK_GETTER_LAYOUT.ruleCnt === '0'"
                        variant="warning"
                        class="m-l-1"
                        >설정 전</b-badge
                      >
                    </li>
                    <li @click="onClickLinkTo($event, 'qr-code')">가입코드</li>
                    <li @click="onClickLinkTo($event, 'student-insert')">
                      학생등록
                    </li>
                    <!-- <li @click="onClickLinkTo($event, 'student-apply')">
                      회원승인
                      <b-badge
                        v-if="
                          GET_AXIOS_CALLBACK_GETTER_LAYOUT.studentApplyCnt !==
                          '0'
                        "
                        variant="warning"
                        class="m-l-1"
                        >{{
                          GET_AXIOS_CALLBACK_GETTER_LAYOUT.studentApplyCnt
                        }}</b-badge
                      >
                    </li> -->
                    <li onclick="alert('준비중')">학생정보관리</li>
                  </ul>
                </b-collapse>
              </div>
            </li>
            <li
              style="cursor: pointer"
              @click="onClickLinkTo($event, 'todo-list')"
            >
              <b-icon icon="card-list" class="m-r-2"></b-icon>
              {{ LOGIN_CONFIG.todo_name }} 관리
              <b-badge
                v-if="GET_AXIOS_CALLBACK_GETTER_LAYOUT.questCnt !== 0"
                variant="warning"
                class="m-l-1"
                >{{ GET_AXIOS_CALLBACK_GETTER_LAYOUT.questCnt }}</b-badge
              >
            </li>
            <li
              style="cursor: pointer"
              @click="onClickLinkTo($event, 'notice-list')"
            >
              <b-icon icon="clipboard-check" class="m-r-2"></b-icon> 알림장 관리
              <b-badge
                v-if="GET_AXIOS_CALLBACK_GETTER_LAYOUT.todayNotice === '0'"
                variant="warning"
                class="m-l-1"
                >오늘 미등록</b-badge
              >
            </li>
            <li>
              <b-icon icon="house" class="m-r-2"></b-icon> 학급관리
              <div>
                <ul>
                  <li @click="onClickLinkTo($event, 'pay-loan')">
                    대출관리
                    <b-badge
                      v-if="GET_AXIOS_CALLBACK_GETTER_LAYOUT.loanCnt === '0'"
                      variant="warning"
                      class="m-l-1"
                      >첫 대출받기</b-badge
                    >
                  </li>
                  <li @click="onClickLinkTo($event, 'teacher-setting')">
                    세율설정
                  </li>
                  <li @click="onClickLinkTo($event, 'bill-list')">SOC 납부</li>
                  <li @click="onClickLinkTo($event, 'bill-student')">
                    세금고지서관리
                  </li>
                  <!-- <li @click="onClickLinkTo($event, 'bill-student')"> -->

                  <li
                    v-if="LOGIN_CONFIG"
                    @click="onClickLinkTo($event, 'pay-list')"
                  >
                    {{ LOGIN_CONFIG.reg_country }}
                    통장
                  </li>
                  <li @click="onClickLinkTo($event, 'lottery-list')">
                    복권구매내역
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <b-icon icon="person" class="m-r-2"></b-icon> 학생관리
              <div>
                <ul>
                  <li @click="onClickLinkTo($event, 'student-list')">
                    학생관리
                  </li>
                  <li @click="onClickLinkTo($event, 'sue-list')">
                    신고관리
                    <b-badge
                      v-if="GET_AXIOS_CALLBACK_GETTER_LAYOUT.sueCnt !== '0'"
                      variant="warning"
                      class="m-l-1"
                      >{{ GET_AXIOS_CALLBACK_GETTER_LAYOUT.sueCnt }}</b-badge
                    >
                  </li>
                  <li onclick="alert('준비중')">벌금고지서관리</li>
                </ul>
              </div>
            </li>
            <li>
              <b-icon icon="shop" class="m-r-2"></b-icon> 마켓관리
              <div>
                <ul>
                  <li @click="onClickLinkTo($event, 'shop-list')">상점관리</li>
                  <li @click="onClickLinkTo($event, 'parttime-list')">
                    알바관리
                  </li>
                </ul>
              </div>
            </li>

            <li
              style="cursor: pointer"
              onclick="window.open('https://open.kakao.com/o/sf8I8jxe')"
            >
              <b-icon icon="question-square" class="m-r-2"></b-icon> 카카오 문의
            </li>
            <li
              style="cursor: pointer"
              @click="onClickLinkTo($event, 'member/sign-out')"
            >
              <b-icon icon="door-open" class="m-r-2"></b-icon> 로그아웃
            </li>

            <!-- <li @click="onClickLinkTo($event,'member/sign-out')">로그아웃</li> -->
          </ul>
        </div>
      </div>
      <div class="content">
        <div class="content__body"><Nuxt /></div>
      </div>
    </div>
    <!-- <div id="jellyAdminheader">
      <div class="requestAdmin" @click="onClickRequest">피드백</div> -->
    <!-- <nav>
        <div class="menu" @click="menuActiveNav">
          <span id="menu-top" class="menu-global menu-top"></span>
          <span id="menu-middle" class="menu-global menu-middle"></span>
          <span id="menu-bottom" class="menu-global menu-bottom"></span>
        </div>
        <div id="adminGnb" class="adminGnb">
          <div class="gnb">
            <ul>
              <li @click="onClickLinkTo($event,'')">처음으로</li>
              <li @click="onClickLinkTo($event,'qr-code')">가입코드</li>
              <li @click="onClickLinkTo($event,'pay-loan')">대출받기</li>
              <li @click="onClickLinkTo($event,'job-list')">직업관리</li>
              <li @click="onClickLinkTo($event,'student-list')">학생관리</li>
              <li @click="onClickLinkTo($event,'parttime-list')">알바관리</li>
              <li @click="onClickLinkTo($event,'shop-list')">상점관리</li>
              <li @click="onClickLinkTo($event,'bill-list')">세금관리</li>
              <li @click="onClickLinkTo($event,'sue-list')">신고관리</li>
              <li @click="onClickLinkTo($event,'bill-student')">고지서관리</li>
              <li @click="onClickLinkTo($event,'todo-list')">
                {{ LOGIN_CONFIG.todo_name }} 관리
              </li>
              <li @click="onClickLinkTo($event,'notice-list')">알림장 관리</li>
              <li @click="onClickLinkTo($event,'rule-detail')">규칙관리</li>
              <li @click="onClickLinkTo($event,'teacher-setting')">환경설정</li>
              <li @click="onClickLinkTo($event,'member/sign-out')">로그아웃</li>
            </ul>
          </div>
        </div>
      </nav> -->
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

    <!-- </div>
    </div> -->
    <!-- <div id="liveChat">asd</div> -->
    <!-- </div> -->
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
      gnbNew: {},
      frmLayout: {
        type: 'layoutNew',
      },
    }
  },
  computed: {
    ...mapState(['LOGIN', 'adminMainBG', 'LOADING']),
    ...mapGetters([
      'GET_AXIOS_CALLBACK_GETTER',
      'LOGIN_TEACHER',
      'GET_AXIOS_CALLBACK_GETTER_LAYOUT',
    ]),
  },
  watch: {
    '$route.path': {
      handler(value) {
        this.$nextTick(() => {
          console.log('================>', value, this.LOGIN_CONFIG.smt_idx)
          this.frmLayout.smt_idx = this.LOGIN_CONFIG.smt_idx
          this.GET_AXIOS_LAYOUT(this.frmLayout)
          console.log('this.frmLayout', this.frmLayout)
        })
      },
      immediate: true,
    },
  },
  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },
  mounted() {
    console.log('$router.', this.$router, this.$route.path)
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
    // this.GET_API_BG_PIXABAY('가을')
    // setTimeout(() => {
    //   console.log('this.adminMainBG', this.adminMainBG)
    // }, 1000)
  },
  methods: {
    // init
    ...mapActions([
      'POST_AXIOS',
      'GET_AXIOS',
      'GET_API_BG_PIXABAY',
      'GET_AXIOS_LAYOUT',
    ]),
    ...mapMutations(['ADMIN_MAIN_BG_MUTATIONS']),
    // menuActiveNav() {
    //   document.getElementById('menu-top').classList.toggle('menu-top-click')
    //   document
    //     .getElementById('menu-middle')
    //     .classList.toggle('menu-middle-click')
    //   document
    //     .getElementById('menu-bottom')
    //     .classList.toggle('menu-bottom-click')
    //   document.getElementById('adminGnb').classList.toggle('is_active')
    // },
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
    onClickLinkTo(v, e) {
      this.$router.push(`/${e}`)
      // this.menuActiveNav()
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
  // background-color: #000 !important;
  // color: rgba(94, 86, 105, 0.68);
}
@import '~/assets-pc/var.scss';
@import '~/assets-pc/style.scss';
@import '~/assets-pc/reset.scss';
@import '~/assets-pc/layout.scss';
</style>
