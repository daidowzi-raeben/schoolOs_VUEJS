<template>
  <div v-if="GET_AXIOS_CALLBACK_GETTER" id="school-content">
    <div class="content">
      <div class="content__top">
        <div v-b-modal.ModalNotice class="content__top--notice flex">
          <p v-if="GET_AXIOS_CALLBACK_GETTER.notice">
            [알림장]
            {{ GET_AXIOS_CALLBACK_GETTER.notice.bd_subject }}
            <b-modal
              id="ModalNotice"
              :title="GET_AXIOS_CALLBACK_GETTER.notice.bd_subject"
            >
              <div v-html="GET_AXIOS_CALLBACK_GETTER.notice.bd_content"></div>
            </b-modal>
          </p>
          <p v-else>새로운 알림장이 없습니다</p>
          <b-icon icon="chevron-right" class="flex-right"></b-icon>
        </div>
        <div class="content__top--level flex">
          <div class="profile">
            <div class="profile__avatar flex">
              <div class="photo">
                <img
                  src="http://news.kbs.co.kr/data/news/2019/06/20/4226019_130.jpg"
                />
              </div>
              <div class="name">
                <strong>
                  {{ LOGIN_CONFIG.reg_name }}
                </strong>
                <p>
                  LV
                  <em v-if="GET_AXIOS_CALLBACK_GETTER.status" class="bold">
                    {{ Math.floor(GET_AXIOS_CALLBACK_GETTER.status.total / 4) }}
                  </em>
                </p>
              </div>
            </div>
          </div>
          <div class="status flex-right">
            <ul v-if="GET_AXIOS_CALLBACK_GETTER.status" class="flex">
              <li class="">
                <div
                  class="stat"
                  :style="
                    'height: calc(' +
                    (GET_AXIOS_CALLBACK_GETTER.status.intellect /
                      GET_AXIOS_CALLBACK_GETTER.status.total) *
                      100 +
                    '% - 0px)'
                  "
                ></div>
                <p class="bold">지능</p>
                <span>{{ GET_AXIOS_CALLBACK_GETTER.status.intellect }}</span>
              </li>
              <li>
                <div
                  class="stat"
                  :style="
                    'height: calc(' +
                    (GET_AXIOS_CALLBACK_GETTER.status.effort /
                      GET_AXIOS_CALLBACK_GETTER.status.total) *
                      100 +
                    '% - 0px)'
                  "
                ></div>
                <p class="bold">노력</p>
                <span>{{ GET_AXIOS_CALLBACK_GETTER.status.effort }}</span>
              </li>
              <li>
                <div
                  class="stat"
                  :style="
                    'height: calc(' +
                    (GET_AXIOS_CALLBACK_GETTER.status.health /
                      GET_AXIOS_CALLBACK_GETTER.status.total) *
                      100 +
                    '% - 0px)'
                  "
                ></div>
                <p class="bold">건강</p>
                <span>{{ GET_AXIOS_CALLBACK_GETTER.status.health }}</span>
              </li>
              <li>
                <div
                  class="stat"
                  :style="
                    'height: calc(' +
                    (GET_AXIOS_CALLBACK_GETTER.status.etiquette /
                      GET_AXIOS_CALLBACK_GETTER.status.total) *
                      100 +
                    '% - 0px)'
                  "
                ></div>
                <p class="bold">예절</p>
                <span>{{ GET_AXIOS_CALLBACK_GETTER.status.etiquette }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="content__body">
        <div class="box quest">
          <div class="quest__title flex">
            <h3>나의 퀘스트</h3>
            <b-icon class="m-l-1" icon="chevron-right"></b-icon>
          </div>
          <div v-if="GET_AXIOS_CALLBACK_GETTER.quest" class="quest__content">
            <div
              v-for="(v, index) in GET_AXIOS_CALLBACK_GETTER.quest"
              :key="index"
              class="flex"
            >
              <div class="label blue">{{ v.subject_cate }}</div>
              <div class="txt m-l-2">
                <p>{{ v.subject }}</p>
                <span>{{ v.start_day }} ~ {{ v.end_day }}</span>
              </div>
              <div class="pay text-right flex-right">
                <p>
                  <em class="bold">
                    {{ v.price }}
                  </em>
                  루피
                </p>
                <span>{{ v.d_day }}일남음</span>
              </div>
            </div>
          </div>
        </div>
        <div class="account m-t-4">
          <h3>나의 통장</h3>
        </div>
        <div
          v-if="GET_AXIOS_CALLBACK_GETTER.account"
          class="box account-area m-t-2"
        >
          <div class="flex">
            <div>
              <p>{{ GET_AXIOS_CALLBACK_GETTER.account.account_number }}</p>
              <span class="jelly-color--gray font-12">{{
                GET_AXIOS_CALLBACK_GETTER.account.nick_name
              }}</span>
            </div>
            <div class="flex-right">
              <strong class="font-18 bold"
                ><em>{{
                  GET_AXIOS_CALLBACK_GETTER.account.PtotalAccount
                }}</em></strong
              >
              <span>루피</span>
            </div>
          </div>
          <div class="flex m-t-3">
            <button class="jelly-btn jelly-btn--gray wd-full">이체</button>
            <button class="jelly-btn jelly-btn--default wd-full m-l-2">
              이체내역
            </button>
          </div>
        </div>
        <div class="box account-area m-t-3 dotted text-center">
          <b-icon v-b-toggle.notification icon="plus" class="font-30"></b-icon>
          <p>새로운 통장을 만들어보세요</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import NuxtLogo from '~/components-pc/NuxtLogo'
// import VuetifyLogo from '~/components-pc/VuetifyLogo'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'IndexPage',
  components: {},
  layout: 'default-mo',
  data() {
    return {
      LOGIN_CONFIG: {},
      params: {},
      statusHeight: {
        effort: 0,
        etiquette: 0,
        health: 0,
        intellect: 0,
      },
      getDataNotice: {
        bd_content: '111',
      },
      getDataStatus: [],
      test: '',
    }
  },
  computed: {
    ...mapState(['LOGIN']),
    ...mapGetters([
      'POST_AXIOS_CALLBACK_GETTER',
      'GET_AXIOS_CALLBACK_GETTER',
      'LOGIN_STUDENT',
    ]),
  },
  created() {
    console.log('[created]')
  },
  mounted() {
    console.log('[ENV]', process.env.VUE_APP_STR)
    console.log('[ENV]', process.env.DB_URL)
    console.log('[ENV]', process.env.VUE_APP_API)
    console.log('[mounted]')

    // DATA INIT
    this.LOGIN_CONFIG = JSON.parse(localStorage.getItem('STUDENT'))
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_STUDENT
    this.params.type = 'main'
    this.GET_AXIOS(this.params)

    // EVENT
    // console.log('GET', this.GET_AXIOS_CALLBACK_GETTER)
    this.$nextTick(function () {})
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations([]),

    // EVENT
  },
}
</script>

<style lang="scss">
@import '~/assets-mo/common.scss';
</style>
