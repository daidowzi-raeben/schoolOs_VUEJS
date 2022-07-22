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
                        {{ GET_AXIOS_CALLBACK_GETTER.item_price | comma }}
                      </p>
                      <span style="font-size: 12px" class="jelly-color--888">
                        <!-- {{
                          GET_AXIOS_CALLBACK_GETTER.start_day
                            | moment('YY.MM.DD')
                        }}
                        ~ -->
                        {{
                          GET_AXIOS_CALLBACK_GETTER.end_day | moment('YY.MM.DD')
                        }}
                        까지만 구매할 수 있어요.
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
                  <div
                    v-if="GET_AXIOS_CALLBACK_GETTER.item_content"
                    style="
                      background-color: #f2f3f5;
                      padding: 10px;
                      border-radius: 10px;
                    "
                    class="m-t-5 img-full"
                    v-html="GET_AXIOS_CALLBACK_GETTER.item_content"
                  ></div>
                </div>
              </div>
            </div>
            <div
              v-if="GET_AXIOS_CALLBACK_GETTER.contents"
              style="
                background-color: #f2f3f5;
                padding: 10px;
                border-radius: 10px;
              "
              class="m-l-3 m-r-3"
              v-html="GET_AXIOS_CALLBACK_GETTER.contents"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="GET_AXIOS_CALLBACK_GETTER.is_end === 'N'" class="quest-fixed">
      <button
        class="jelly-btn jelly-btn--pink"
        @click="$bvModal.show('completeFile')"
      >
        구매하기
      </button>
    </div>
    <div v-if="GET_AXIOS_CALLBACK_GETTER.is_end === 'Y'" class="quest-fixed">
      <button class="jelly-btn jelly-btn--gray">기간이 종료되었습니다.</button>
    </div>
    <b-modal id="completeFile" size="lg" hide-footer hide-header>
      <div>
        <p>상품을 구매하시겠습니까?</p>
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
          구매하기
        </button>
      </div>
    </b-modal>
  </div>
  <!-- <div v-if="GET_AXIOS_CALLBACK_GETTER">
    <h1>{{ GET_AXIOS_CALLBACK_GETTER.item_name }}</h1>
    <p>User ID : {{ idx }} {{ a | comma }}</p>
    <div>
      <button @click="onSubmit">전송</button>
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
    this.params.type = 'shopView'
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
      this.paramsPost.itemPrice = this.GET_AXIOS_CALLBACK_GETTER.discount
      this.paramsPost.type = 'shopBuy'
      this.POST_AXIOS(this.paramsPost)

      console.log(this.paramsPost)
      alert(
        this.GET_AXIOS_CALLBACK_GETTER.item_name +
          ' 상품을 구매했습니다. 나의 구매내역에서 확인할 수 있어요.'
      )
      this.$bvModal.hide('completeFile')
      // POST_AXIOS
    },
  },
}
</script>

<style lang="scss"></style>
