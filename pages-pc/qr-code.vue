<template>
  <div>
    <div class="">
      <div id="jellyAdminheader" style="padding-top: 0vh">
        <!-- <span>{{ today }}</span> -->
        <h1 v-if="LOGIN_TEACHER" class="">가입코드</h1>
        <div class="student form">
          <div class="student__list">
            <div class="m-t-3">
              <div class="item" style="width: 100%">
                <div v-if="GET_AXIOS_CALLBACK_GETTER" class="text-center">
                  <img :src="GET_AXIOS_CALLBACK_GETTER.image" width="200" />
                </div>
                <div class="m-t-10 text-center">
                  위 QR코드 또는 아래 유알엘을 통해 학생들 회원가입이
                  가능합니다.
                </div>
                <div
                  v-if="GET_AXIOS_CALLBACK_GETTER"
                  class="m-t-10 text-center font-16"
                >
                  https://app.school-os.net/member/sign-up?reg_code={{
                    GET_AXIOS_CALLBACK_GETTER.subtitle
                  }}
                </div>
                <textarea id="visitCodeUrk">
https://app.school-os.net/member/sign-up?reg_code={{
                    GET_AXIOS_CALLBACK_GETTER.subtitle
                  }}</textarea
                >
                <div class="text-center m-t-4">
                  <button
                    class="jelly-btn jelly-btn--pink"
                    @click="onClickCopyText('visitCodeUrk')"
                  >
                    가입 주소 복사하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import { axiosForm } from '~/config/util'

export default {
  layout: 'default-pc',
  data() {
    return {
      params: {},
    }
  },

  computed: {
    ...mapState(['LOGIN']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_TEACHER']),
  },
  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },
  mounted() {
    //   DATA INIT
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_TEACHER
    this.params.type = 'qrcode'
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT
    onClickTodoDetail(idx) {
      const FORM_DATA = new FormData()
      FORM_DATA.append('type', 'register')
      axiosForm(FORM_DATA, '/teacher.php')
      axiosForm()
    },
    onClickCopyText(id) {
      const content = document.getElementById(id)
      content.select()
      document.execCommand('copy')

      alert('Copied!')
    },
  },
}
</script>

<style lang="scss">
#visitCodeUrk {
  position: absolute;
  top: -500%;
}
</style>
