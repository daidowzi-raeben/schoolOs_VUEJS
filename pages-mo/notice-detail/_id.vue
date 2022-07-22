<template>
  <div id="school-content">
    <div class="historyBack m-l-3 m-b-5">
      <b-icon icon="arrow-left" onclick="history.back()"></b-icon>
    </div>
    <div class="content">
      <div class="m-t-1 h60">
        <div class="account">
          <div
            v-if="GET_AXIOS_CALLBACK_GETTER.bd_subject"
            class="quest__content m-t-3 m-l-3 m-r-3"
          >
            <div class="box quest m-b-3">
              <div class="">
                <div class="jelly-color--888" style="font-size: 12px">
                  {{ GET_AXIOS_CALLBACK_GETTER.datetime | moment('YY.MM.DD') }}
                </div>
              </div>
              <p class="bold" style="font-size: 20px">
                {{ GET_AXIOS_CALLBACK_GETTER.bd_subject }}
              </p>
            </div>

            <div
              v-if="GET_AXIOS_CALLBACK_GETTER.bd_content"
              style="
                background-color: #f2f3f5;
                padding: 10px;
                border-radius: 10px;
              "
              class=""
              v-html="GET_AXIOS_CALLBACK_GETTER.bd_content"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div v-if="GET_AXIOS_CALLBACK_GETTER">
    <h1>{{ GET_AXIOS_CALLBACK_GETTER.bd_subject }}</h1>
    <p>User ID : {{ idx }} {{ a | comma }}</p>
  </div> -->
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import { historyBack } from '~/config/util'

export default {
  name: 'NoticeDetail',
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
    this.params.type = 'noticeView'
    this.params.idx = this.idx
    this.GET_AXIOS(this.params)
    historyBack()
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations([]),
  },
}
</script>

<style lang="scss"></style>
