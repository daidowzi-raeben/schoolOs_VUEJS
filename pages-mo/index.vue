<template>
  <div v-if="MAIN_NOTICE" id="school-content">
    <div class="content">
      <div class="content__top">
        <div class="content__top--notice flex">
          <p>
            [알림장]
            {{ MAIN_NOTICE.bd_subject }}
          </p>
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
                <strong>홍길동</strong>
                <p>LV <em class="bold">10</em></p>
              </div>
            </div>
          </div>
          <div class="status flex-right">
            <ul class="flex">
              <li class="">
                <div class="stat" style="height: calc(50% - 18px)"></div>
                <p class="bold">지능</p>
                <span>{{
                  getDataStatus.intellect ? getDataStatus.intellect : 0
                }}</span>
              </li>
              <li>
                <div class="stat"></div>
                <p class="bold">노력</p>
                <span>{{
                  getDataStatus.effort ? getDataStatus.effort : 0
                }}</span>
              </li>
              <li>
                <div class="stat"></div>
                <p class="bold">건강</p>
                <span>{{
                  getDataStatus.health ? getDataStatus.health : 0
                }}</span>
              </li>
              <li>
                <div class="stat"></div>
                <p class="bold">예절</p>
                <span>{{
                  getDataStatus.etiquette ? getDataStatus.etiquette : 0
                }}</span>
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
          <div class="quest__content">
            <div v-for="item in 3" :key="item" class="flex">
              <div class="label blue">봉사</div>
              <div class="txt m-l-2">
                <p>2021년 1월 봉사활동</p>
                <span>2021.01.23 ~ 2021.01.27</span>
              </div>
              <div class="pay text-right flex-right">
                <p>7루피</p>
                <span>3일남음</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import NuxtLogo from '~/components-pc/NuxtLogo'
// import VuetifyLogo from '~/components-pc/VuetifyLogo'
// import { store } from "./store/index.js";
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'IndexPage',
  components: {},
  layout: 'default-mo',
  data() {
    return {
      params: {
        type: 'main',
        smt_idx: '1',
        sms_idx: '1',
      },
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
    ...mapState(['getMainState']),
    ...mapGetters(['MAIN_NOTICE']),
  },
  created() {
    console.log('[created]')
  },
  mounted() {
    console.log('[ENV]', process.env.VUE_APP_STR)
    console.log('[ENV]', process.env.DB_URL)
    console.log('[ENV]', process.env.VUE_APP_API)
    console.log('[mounted]')

    // ACTIONS PARAMS
    this.getMain(this.params)
    // STATE INIT
    this.$nextTick(function () {
      console.log('MAIN_NOTICE', this.MAIN_NOTICE)
    })
  },
  methods: {
    ...mapActions(['getMain']),
    getStatusHeight() {
      const totalStatus =
        this.getDataStatus.effort +
        this.getDataStatus.etiquette +
        this.getDataStatus.health +
        this.getDataStatus.intellect
      console.log(totalStatus)
    },
  },
}
</script>

<style lang="scss">
@import '~/assets-mo/common.scss';
</style>
