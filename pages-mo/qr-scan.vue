<template>
  <div id="school-content">
    <div class="historyBack m-l-3 m-b-5">
      <b-icon icon="arrow-left" onclick="history.back()"></b-icon>
    </div>
    <div class="content">
      <div class="content__body m-t-1 h60 relative">
        <qrcode-stream
          style="
            width: calc(100% - 32px);
            height: calc(100% - 32px);
            position: absolute;
          "
          @decode="onDecode"
        ></qrcode-stream>
      </div>
      <div class="text-center m-t-5">
        선생님의 QR코드를 통해 가입할 수 있습니다.
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      qrData: '',
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
    // this.params = this.LOGIN_STUDENT
    // this.params.type = 'billListStudent'
    // this.params.cate_idx = 2
    // this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),
    onDecode(decodedString) {
      console.log(decodedString)
      this.qrData = decodedString.substr(0, 15)
      if (this.qrData !== '/member/sign-up') {
        alert('잘못된 QR CODE 입니다.')
        this.$router.push(`/`)
      } else {
        this.$router.push(this.qrData)
      }
      // /member/sign-up
    },

    // EVENT
  },
}
</script>

<style lang="scss"></style>
