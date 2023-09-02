<template>
  <div id="school-content">
    <!-- <div v-if="LOADING" id="LOADING">
      <img src="~/static/img/loading.gif" />
    </div> -->
    <div class="historyBack m-l-3 m-b-5">
      <b-icon icon="arrow-left" onclick="history.back()"></b-icon>
    </div>
    <div v-if="GET_AXIOS_CALLBACK_GETTER" class="content">
      <div class="m-t-1 h60">
        <div class="account">
          <div class="quest__content m-t-3">
            <div class="box quest m-b-3">
              <div class="flex">
                <div class="label blue">
                  <!-- {{ GET_AXIOS_CALLBACK_GETTER.albaDetail.subject }} -->
                </div>
                <div class="flex-full m-l-3 m-r-3">
                  <div class="flex m-t-0">
                    <div class="txt">
                      <p class="bold">
                        {{ GET_AXIOS_CALLBACK_GETTER.subject }}
                      </p>
                      <span class="font-12">
                        {{
                          GET_AXIOS_CALLBACK_GETTER.reg_datetime
                            | moment('YY.MM.DD')
                        }}
                      </span>
                    </div>
                    <div class="pay text-right flex-right">
                      <!-- <button class="jelly-btn jelly-btn--default">
                      자세히 보기
                    </button> -->
                    </div>
                  </div>
                  <!-- <div class="m-t-2 jelly-color--888 limit limit-3">
                    {{
                      GET_AXIOS_CALLBACK_GETTER.contents.replaceAll(
                        /\!\[|\].*.[)]/g,
                        ''
                      )
                    }}
                  </div> -->
                  <div class="m-t-2 flex flex-full">
                    <div class="font-15">
                      조회수
                      <strong class="bold font-15 m-l-1"
                        ><em>
                          {{ GET_AXIOS_CALLBACK_GETTER.hit | comma }}
                        </em></strong
                      >
                      <span>회</span>
                    </div>
                    <!-- <div class="font-15 m-l-3">
                      좋아요
                      <strong class="bold font-15 m-l-1"><em>99+</em></strong>
                      <span>회</span>
                    </div> -->
                    <div class="flex-right">
                      <div class="font-12 p-l-1 l-h-28">
                        {{ GET_AXIOS_CALLBACK_GETTER.reg_name }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style="
                background-color: #f2f3f5;
                padding: 0px 10px 10px;
                border-radius: 10px;
                white-space: pre-line;
              "
              class="m-l-3 m-r-3 img-full m-t-5"
            >
              {{ GET_AXIOS_CALLBACK_GETTER.content }}
            </div>
            <div class="flex">
              <div>
                <button>삭제</button>
              </div>
              <div><button>수정</button></div>
            </div>
            <div
              v-if="
                GET_AXIOS_CALLBACK_GETTER &&
                GET_AXIOS_CALLBACK_GETTER.category === 'S'
              "
              class="emoji-box"
              @click="onClickToggle($event)"
            >
              <div class="title-area flex">
                <p class="bold mr-2">
                  이 게시글을 추천해요
                  {{ tempData }}
                </p>
                <div class="flex-right">
                  <b-icon icon="chevron-up" font-scale="1" />
                </div>
              </div>
              <ul v-show="tempData" class="face flex">
                <li
                  class="face--like"
                  :class="
                    (emotion === true &&
                      !GET_AXIOS_CALLBACK_GETTER.is_emotion) ||
                    GET_AXIOS_CALLBACK_GETTER.is_emotion === '1'
                      ? ''
                      : 'is_disabled'
                  "
                  @click="onClickLike(1, $event)"
                >
                  <img
                    src="../../static/mo/emoji/emoji_like.svg"
                    alt="좋아요 표시 아이콘"
                    class="asd"
                  />
                  <p class="bold name">좋아요</p>
                  <p class="rating">
                    <em
                      >{{ GET_AXIOS_CALLBACK_GETTER.emotion1_cnt | comma }}
                    </em>
                  </p>
                </li>
                <li
                  class="face--fun"
                  :class="
                    (emotion === true &&
                      !GET_AXIOS_CALLBACK_GETTER.is_emotion) ||
                    GET_AXIOS_CALLBACK_GETTER.is_emotion === '2'
                      ? ''
                      : 'is_disabled'
                  "
                  @click="onClickLike(2, $event)"
                >
                  <img
                    src="../../static/mo/emoji/emoji_fun.svg"
                    alt="재밌어요 표시 아이콘"
                  />
                  <p class="bold name">재밌어요</p>
                  <p class="rating">
                    <em>{{
                      GET_AXIOS_CALLBACK_GETTER.emotion2_cnt | comma
                    }}</em>
                  </p>
                </li>
                <li
                  class="face--cheer"
                  :class="
                    (emotion === true &&
                      !GET_AXIOS_CALLBACK_GETTER.is_emotion) ||
                    GET_AXIOS_CALLBACK_GETTER.is_emotion === '3'
                      ? ''
                      : 'is_disabled'
                  "
                  @click="onClickLike(3, $event)"
                >
                  <img
                    src="../../static/mo/emoji/emoji_cheer.svg"
                    alt="힘내요 표시 아이콘"
                  />
                  <p class="bold name">힘내요</p>
                  <p class="rating">
                    <em>{{
                      GET_AXIOS_CALLBACK_GETTER.emotion3_cnt | comma
                    }}</em>
                  </p>
                </li>
                <li
                  class="face--study"
                  :class="
                    (emotion === true &&
                      !GET_AXIOS_CALLBACK_GETTER.is_emotion) ||
                    GET_AXIOS_CALLBACK_GETTER.is_emotion === '4'
                      ? ''
                      : 'is_disabled'
                  "
                  @click="onClickLike(4, $event)"
                >
                  <img
                    src="../../static/mo/emoji/emoji_study.svg"
                    alt="유익해요 표시 아이콘"
                  />
                  <p class="bold name">유익해요</p>
                  <p class="rating">
                    <em>{{
                      GET_AXIOS_CALLBACK_GETTER.emotion4_cnt | comma
                    }}</em>
                  </p>
                </li>
                <li
                  class="face--wow"
                  :class="
                    (emotion === true &&
                      !GET_AXIOS_CALLBACK_GETTER.is_emotion) ||
                    GET_AXIOS_CALLBACK_GETTER.is_emotion === '5'
                      ? ''
                      : 'is_disabled'
                  "
                  @click="onClickLike(5, $event)"
                >
                  <img
                    src="../../static/mo/emoji/emoji_wow.svg"
                    alt="놀라워요 표시 아이콘"
                  />
                  <p class="bold name">놀라워요</p>
                  <p class="rating">
                    <em>{{
                      GET_AXIOS_CALLBACK_GETTER.emotion5_cnt | comma
                    }}</em>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
// import Park from '~/components-mo/test/TestStyle.vue'
// import { historyBack } from '~/config/util'

export default {
  components: {
    // Park,
  },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  asyncData({ params }) {
    console.log(params)
    return {
      idx: params.id,
    }
  },
  data() {
    return {
      params: {},
      paramsPost: {},
      value: 4,
      emotion: true,
      tempData: true,
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
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_STUDENT
    console.log(this.idx)
    this.params.type = 'communityView'
    this.params.idx = this.idx
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    onClick() {
      console.log(0)
    },
    onClickLike(e, t) {
      if (this.emotion === true && !this.GET_AXIOS_CALLBACK_GETTER.is_emotion) {
        console.log('????????')
        this.emotion = false
        this.LOADING_TRUE()
        const frm = new FormData()
        frm.append('type', 'communityLike')
        frm.append('emotion', e)
        frm.append('idx', this.idx)
        frm.append('sms_idx', this.LOGIN_STUDENT.sms_idx)
        console.log(frm)
        // axiosForm(frm, '/student.php')
        this.$axios
          .post('http://api.school-os.net' + '/student.php', frm, {
            header: {
              'Context-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log('onClickLike', res.data)
            this.params.type = 'communityView'
            this.params.idx = this.idx
            this.GET_AXIOS(this.params)
            this.$nextTick(() => {
              t.target.parentElement.classList.remove('is_disabled')
            })
          })
          .catch((res) => {
            console.error('AXIOS FALSE', res)
          })
      } else {
        return false
      }
    },
    onClickToggle(e) {
      console.log(e.target)
      this.tempData === true ? (this.tempData = false) : (this.tempData = true)
    },
  },
}
</script>

<style lang="scss">
.emoji-box {
  position: fixed;
  width: 100%;
  background-color: #fff;
  bottom: 0;
  left: 0;
  border-top: 1px solid #eee;
  .title-area {
    padding: 20px;
    border-bottom: 1px solid #f2f2f2;
  }
  .face {
    justify-content: space-evenly;
    width: 100%;
    margin-bottom: 0 !important;
    padding: 20px;
    li {
      width: 20%;
      text-align: center;
      img {
        width: 35px;
        height: 35px;
        margin-bottom: 10px;
      }
      p {
        &.name {
          font-size: 14px;
        }
        &.rating {
          font-size: 12px;
        }
      }
      &.is_disabled {
        img {
          opacity: 0.5;
        }
        p {
          color: #888;
          em {
            color: #888;
          }
        }
      }
    }
  }
}
</style>
