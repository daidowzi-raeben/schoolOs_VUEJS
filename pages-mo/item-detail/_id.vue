<template>
  <div id="school-content">
    <div class="historyBack m-l-3 m-b-5">
      <b-icon icon="arrow-left" onclick="history.back()"></b-icon>
    </div>
    <div
      v-if="GET_AXIOS_CALLBACK_GETTER"
      class="content"
      style="padding-bottom: 100px"
    >
      <div class="m-t-1 h60">
        <div class="account">
          <div
            v-if="GET_AXIOS_CALLBACK_GETTER.item_name"
            class="quest__content m-t-3"
          >
            <p class="bold m-l-3 m-r-3" style="font-size: 20px">
              {{ GET_AXIOS_CALLBACK_GETTER.item_name }}
            </p>
            <div class="shopDetailImage">
              <img
                v-if="GET_AXIOS_CALLBACK_GETTER.item_thumb"
                :src="`http://api.school-os.net/data/teacher/shop/${GET_AXIOS_CALLBACK_GETTER.item_thumb}`"
              />
              <div v-if="!GET_AXIOS_CALLBACK_GETTER.item_thumb">
                <b-icon icon="flower2"></b-icon>
              </div>
            </div>
            <div class="box quest m-b-3 m-l-3 m-r-3">
              <div class="flex">
                <div class="flex-full m-l-3 m-r-3">
                  <div class="flex m-t-0">
                    <div class="txt">
                      <p class="bold">
                        {{ GET_AXIOS_CALLBACK_GETTER.item_name }} 상품을
                        사용하고 싶다면 선생님에게 보여주세요!
                      </p>
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
                  <div
                    v-if="GET_AXIOS_CALLBACK_GETTER.item_content"
                    style="
                      background-color: #f2f3f5;
                      padding: 10px;
                      border-radius: 10px;
                      white-space: pre-line;
                    "
                    class="m-t-5 img-full"
                    v-html="GET_AXIOS_CALLBACK_GETTER.item_content"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="GET_AXIOS_CALLBACK_GETTER.use_yn === '0'" class="quest-fixed">
      <button
        class="jelly-btn jelly-btn--pink"
        @click="$bvModal.show('completeFile')"
      >
        사용하기
      </button>
    </div>
    <div v-if="GET_AXIOS_CALLBACK_GETTER.use_yn === '1'" class="quest-fixed">
      <button class="jelly-btn jelly-btn--gray">
        이미 사용된 상품 입니다.
      </button>
    </div>
    <b-modal id="completeFile" size="lg" hide-footer hide-header>
      <div>
        <p>선생님은 아래 사용하기 버튼을 눌러주세요.</p>
        <p class="jelly-color--type4">
          아래 사용하기 버튼을 누르면 이 상품은 더 이상 사용할 수 없어요!
        </p>
      </div>
      <div class="m-t-5 flex">
        <button
          class="jelly-btn jelly-btn--default m-r-1 flex-full"
          style="border-radius: 0"
          @click="$bvModal.hide('completeFile')"
        >
          취소하기
        </button>
        <button
          class="jelly-btn jelly-btn--pink flex-full m-l-1"
          style="border-radius: 0"
          @click="onSubmit()"
        >
          사용하기
        </button>
      </div>
    </b-modal>
  </div>
  <!-- <div v-if="GET_AXIOS_CALLBACK_GETTER.item">
    <h1>{{ GET_AXIOS_CALLBACK_GETTER.item.item_name }}</h1>
    <p>User ID : {{ idx }} {{ a | comma }}</p>
    <div>
      <button
        v-if="GET_AXIOS_CALLBACK_GETTER.item.use_yn === '0'"
        @click="onSubmit"
      >
        전송
      </button>
    </div>
  </div> -->
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import { historyBack } from '~/config/util'

export default {
  name: 'ShopDetail',
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
      a: 100000000,
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
    this.params.type = 'itemView'
    this.params.idx = this.idx
    this.GET_AXIOS(this.params)
    console.log(this.params)
    historyBack()
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations([]),
    onSubmit() {
      this.paramsPost = this.LOGIN_STUDENT
      this.paramsPost.idx = this.params.idx
      this.paramsPost.type = 'itemView'
      this.POST_AXIOS(this.params)
      console.log(this.paramsPost)
      // POST_AXIOS
      this.$bvModal.hide('completeFile')
      setTimeout(() => {
        this.params = this.LOGIN_STUDENT
        this.params.type = 'itemView'
        this.params.idx = this.idx
        this.GET_AXIOS(this.params)
      }, 1000)
    },
  },
}
</script>

<style lang="scss"></style>
