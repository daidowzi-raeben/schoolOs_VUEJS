<template>
  <div id="school-content" refs="contentLoad">
    <div class="p-3 jelly-tab">
      <ul class="flex">
        <li class=""><nuxt-link to="/community-list">우리끼리</nuxt-link></li>
        <li class="is_active">선생님께</li>
      </ul>
    </div>
    <b-icon
      v-show="topBtn"
      icon="caret-up"
      animation="cylon-vertical"
      class="border rounded p-2 topBtn"
    ></b-icon>
    <div id="target" class="content">
      <div
        v-if="
          GET_AXIOS_CALLBACK_GETTER &&
          GET_AXIOS_CALLBACK_GETTER.auth_read === 'Y'
        "
        class="content__body m-t-1 h60"
      >
        <div class="account flex">
          <h3 class="m-t-2">선생님께</h3>
          <div class="flex-right">
            <!-- <nuxt-link to="/parttime-write"> -->
            <button
              v-if="GET_AXIOS_CALLBACK_GETTER.auth_create === 'Y'"
              class="jelly-btn jelly-btn--default"
              @click="onClickWrite"
            >
              글쓰기
            </button>
            <!-- </nuxt-link> -->
          </div>
        </div>

        <!-- <div class="quest__content m-t-3">
          <div class="p-5 text-center font-14">커뮤니티 페이지 설명</div>
        </div> -->
        <div
          v-if="
            communityList &&
            communityList[0] &&
            communityList[0].list &&
            communityList[0].list.length > 0
          "
        >
          <div v-for="(k, e) in communityList" :key="'index' + e">
            <div v-if="e === 0">
              <div
                v-for="(v, i) in communityList[0].bestList"
                :key="i"
                class="quest__content m-t-3"
                @click="onClickDetail(v.idx)"
              >
                <!-- 뱃지영역 -->

                <div class="box quest m-b-3">
                  <div class="badge-wrap flex m-t-0">
                    <b-badge
                      variant="danger"
                      class="flex-right badge-txt--white"
                      >BEST</b-badge
                    >
                  </div>
                  <div class="flex">
                    <div class="flex-full">
                      <div class="flex m-t-0">
                        <div class="txt">
                          <p class="bold ellipsis-list flex-shrink">
                            {{ v.subject }}
                          </p>
                          <span>{{ v.datetime }}</span>
                        </div>
                      </div>
                      <div class="m-t-2 flex flex-full">
                        <div class="font-15">
                          조회수
                          <strong class="bold font-15 m-l-1"
                            ><em>
                              {{ Number(v.hit) > 99 ? '99+' : v.hit }}
                            </em></strong
                          >
                          <span>회</span>
                        </div>
                        <div class="pay text-right flex-right">
                          <div class="font-12 p-l-1 l-h-28">
                            {{ v.reg_name }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-for="(v, i) in communityList[e].list"
              :key="'list' + i"
              class="quest__content m-t-3"
              @click="onClickDetail(v.idx)"
            >
              <!-- 뱃지영역 -->

              <div class="box quest m-b-3">
                <div class="badge-wrap flex m-t-0">
                  <b-badge
                    v-if="Number(v.hit) > 10"
                    variant="warning"
                    class="flex-right badge-txt--black"
                    >인기글</b-badge
                  >
                </div>
                <div class="flex">
                  <div class="flex-full">
                    <div class="flex m-t-0">
                      <div class="txt">
                        <p class="bold ellipsis-list flex-shrink">
                          {{ v.subject }}
                        </p>
                        <span>{{ v.datetime }}</span>
                      </div>
                    </div>
                    <div class="m-t-2 flex flex-full">
                      <div class="font-15">
                        조회수
                        <strong class="bold font-15 m-l-1"
                          ><em>
                            {{ Number(v.hit) > 99 ? '99+' : v.hit }}
                          </em></strong
                        >
                        <span>회</span>
                      </div>
                      <div class="pay text-right flex-right">
                        <div class="font-12 p-l-1 l-h-28">{{ v.reg_name }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <h3 class="text-center">아직 작성된 글이 없어요</h3>
        </div>

        <!-- <div class="account">
          <h3>종료된 활동</h3>
        </div> -->
      </div>
      <div v-else class="text-center">
        <h3>지금은 이용할 수 없어요</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  layout: 'default-mo',
  data() {
    return {
      scrollPostion: true,
      params: {
        page: 1,
      },
      communityList: [],
      topBtn: false,
      paramsAuth: {},
    }
  },

  computed: {
    ...mapState(['LOGIN']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_STUDENT']),
  },
  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },

  mounted() {
    //   DATA INIT
    // console.log(this.$nuxt, this.$config, this.rangeCalendar)
    // DATA INIT
    this.LOGIN_CONFIG = JSON.parse(localStorage.getItem('STUDENT'))
    console.log(this.$nuxt, this.$config, this.LOGIN_CONFIG)
    this.params = this.LOGIN_CONFIG
    this.params.type = 'communityList'
    this.params.page = 1
    this.scrollLoadData(this.params)
    // 게시판 권한
    this.paramsAuth.smt_idx = this.LOGIN_CONFIG.smt_idx
    this.paramsAuth.type = 'communityAuth'
    this.GET_AXIOS(this.paramsAuth)
    // console.log('this.params.page', this.params)
    // this.$nextTick(() => {
    //   // window.addEventListener('scroll', this.scrollLoad('asd'))
    // })
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT
    handleScroll() {
      const documentHeight = document.body.scrollHeight
      // console.log(documentHeight, window.scrollY, this.params.page)
      if (documentHeight - 1000 < window.scrollY) {
        this.scrollPostion === true
          ? this.scrollAddLoad(documentHeight)
          : console.log('LoadStop')
      }
      if (window.scrollY < 900) {
        this.topBtn = false
      }
    },
    scrollAddLoad(e) {
      console.log('Loading...........', this.params)
      this.scrollPostion = false
      console.log(e)
      this.params = this.LOGIN_CONFIG
      this.params.type = 'communityList'
      this.params.page = this.params.page + 1
      this.scrollLoadData(this.params)
      // window.removeEventListener('scroll', this.handleScroll)
    },
    scrollLoadData(params) {
      this.params.cate = 'T'

      // 2페이지부터 탑버튼 생성
      console.log('params.page', params.page)
      Number(params.page) > 1 ? (this.topBtn = true) : (this.topBtn = false)
      this.$axios
        .get('http://api.school-os.net' + '/student.php', { params })
        .then((res) => {
          console.log('scrollLoadData', res, params)
          this.communityList.push(res.data)
          console.log('communityList', this.communityList)
          this.scrollPostion = true
        })
        .catch((res) => {
          console.error('scrollLoadDataFaile', res)
        })
    },
    onClickDetail(e) {
      this.$router.push(`/community-detail/${e}`)
    },
    onClickWrite() {
      console.log('TRUE')
      this.$router.push('/community-write?mode=T')
    },
    comma(str) {
      str = String(str)
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
    },
  },
}
</script>

<style lang="scss">
.ellipsis-list {
  max-width: 25rem;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.l-h-28 {
  line-height: 1.8rem;
}
.badge-txt {
  &span {
    margin-top: 0 !important;
  }
  &--black {
    color: #212529 !important;
  }
  &--white {
    color: #fff !important;
  }
}
.topBtn {
  position: fixed;
  z-index: 9999;
  bottom: 85px;
  right: 20px;
  font-size: 40px;
  background: #fff;
}
</style>
