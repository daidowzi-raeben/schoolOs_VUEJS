<template>
  <div>
    <div id="jellyAdminBG" class="jellyAdminBG"></div>
    <div id="jellyAdminheader">
      <nav>
        <div class="menu" @click="menuActiveNav">
          <span id="menu-top" class="menu-global menu-top"></span>
          <span id="menu-middle" class="menu-global menu-middle"></span>
          <span id="menu-bottom" class="menu-global menu-bottom"></span>
        </div>
      </nav>
      <span>{{ today }}</span>
      <h1>
        써니제국
        <span v-b-tooltip.hover title="오늘의 환율" class="spanBox">
          <b-icon icon="currency-dollar"></b-icon>1,000</span
        >
      </h1>
      <div class="p-l-5 m-t-5 m-b-5"></div>
      <div class="student">
        <div class="student__list">
          <h3>출결 현황</h3>
          <div class="flex m-t-3">
            <div class="item">
              <p class="title">정우성</p>
              <div class="flex">
                <div class="list">
                  <p>미인정 결석</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="student">
        <div class="student__list">
          <h3 v-b-modal.mainNotice title="일어나">
            알림장 미확인 ({{ studentName.length }})
          </h3>
          <div class="m-t-3 clb">
            <div v-for="(item, index) in studentName" :key="index" class="item">
              <div class="flex">
                <p class="title">{{ item }} [LV.5]</p>
                <div class="plant-area">
                  <div class="plant flex-right">
                    <div class="plant__leaves"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="student">
        <div class="student__list">
          <h3>진행중인 퀘스트 ({{ studentName.length }})</h3>
          <div class="m-t-3 clb">
            <div
              v-for="(item, index) in studentName"
              :key="index"
              class="item"
              style="min-width: calc((100% / 5) - 20px)"
            >
              <div class="">
                <p class="title">
                  <span class="jelly-point m-t-0 jelly-background--type1 m-l-1"
                    >M</span
                  >
                  이거슨 퀘스트
                </p>
                <span class="jelly-point m-t-0 jelly-background--type1 m-l-1"
                  >5</span
                >
                <span class="jelly-point m-t-0 jelly-background--type2 m-l-1"
                  >5</span
                >
                <span class="jelly-point m-t-0 jelly-background--type3 m-l-1"
                  >5</span
                >
                <span class="jelly-point m-t-0 jelly-background--type4 m-l-1"
                  >5</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="mainNotice"> 알림장이당아아아아아아아아ㅡ앙 </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  name: 'IndexPage',
  components: {},
  layout: 'default-pc',
  data() {
    return {
      studentName: [
        '민준',
        '서준',
        '도윤',
        '예준',
        '시우',
        '하준',
        '주원',
        '지호',
      ],
      today: '',
    }
  },
  computed: {
    ...mapState(['LOGIN', 'adminMainBG']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_STUDENT']),
  },
  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },
  mounted() {
    //   DATA INIT
    // console.log(this.$nuxt, this.$config)

    // pixabay api load
    this.GET_API_BG_PIXABAY('나무')

    setTimeout(() => {
      const randNum = Math.floor(Math.random() * 9)
      let imgUrl = this.adminMainBG.hits[randNum].largeImageURL
      imgUrl
        ? (imgUrl = this.adminMainBG.hits[randNum].largeImageURL)
        : (imgUrl = '/pc/img/bg/london-bridge-by-sunny.jpg')
      document.getElementById(
        'jellyAdminBG'
      ).style.backgroundImage = `url(${imgUrl})`

      console.log(this.adminMainBG.hits[randNum].largeImageURL)
    })
    this.today = this.getToday()
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS', 'GET_API_BG_PIXABAY']),
    ...mapMutations(['ADMIN_MAIN_BG_MUTATIONS']),

    getToday() {
      const date = new Date()
      const year = date.getFullYear()
      const month = ('0' + (1 + date.getMonth())).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      return year + '.' + month + '.' + day
    },
    menuActiveNav() {
      document.getElementById('menu-top').classList.toggle('menu-top-click')
      document
        .getElementById('menu-middle')
        .classList.toggle('menu-middle-click')
      document
        .getElementById('menu-bottom')
        .classList.toggle('menu-bottom-click')
    },
  },
}
</script>
