<template>
  <div id="school-content">
    <div>asdasdasd</div>
    <b-icon icon="box-arrow-up-right" style="color: blue"></b-icon>
    <!-- <div v-if="LOADING" id="LOADING">
      <img src="~/static/img/loading.gif" />
    </div> -->
    <div class="historyBack m-l-3 m-b-5">
      <b-icon icon="arrow-left" onclick="history.back()"></b-icon>
    </div>
    <div class="content">
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
                      <p class="bold flex-shrink">수정1</p>
                      <span>22.22.22</span>
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
                    <strong class="bold font-15 m-l-1"><em>99+</em></strong>
                    <span>회</span>
                  </div>
                  <div class="font-15 m-l-3">
                    좋아요
                    <strong class="bold font-15 m-l-1"><em>99+</em></strong>
                    <span>회</span>
                  </div>
                    <div class="flex-right">
                      <div class="font-12 p-l-1 l-h-28">김학생</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style="
                background-color: #f2f3f5;
                padding: 10px;
                border-radius: 10px;
                white-space: pre-line;
              "
              class="m-l-3 m-r-3 img-full m-t-5"
            >
              내용
            </div>
            <div>
              <b-form-rating
                v-model="value"
                variant="warning"
                class="mb-2"
              ></b-form-rating>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import Park from '~/components-mo/test/TestStyle.vue'
// import { historyBack } from '~/config/util'

export default {
  components: {
    Park,
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
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    onClick() {
      console.log(0)
    },
  },
}
</script>

<style lang="scss"></style>
