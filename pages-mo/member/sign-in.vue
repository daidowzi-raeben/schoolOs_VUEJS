<template>
  <div class="sos-login">
    <div class="header">WELCOME</div>
    <div class="sos-login__content">
      <form @submit.prevent="onClickLogin">
        <div>
          <input
            type="text"
            class="jelly-text wd-full"
            placeholder="아이디"
            @input="loginID($event)"
          />
        </div>
        <div class="m-t-2">
          <input
            type="password"
            class="jelly-text wd-full"
            placeholder="패스워드"
            @input="loginPW($event)"
          />
        </div>
        <div class="m-t-4">
          <button
            type="submit"
            class="jelly-btn jelly-btn--pink wd-full md"
            :disabled="disabled === true"
          >
            로그인
          </button>
        </div>
        <div class="m-t-4 text-center">
          아이디가 없다면 <br />선생님에게 QR코드를 요청하세요
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {
      params: {
        type: 'login',
        user_id: '',
        user_pw: '',
      },
      disabled: true,
    }
  },

  computed: {
    ...mapState(['POST_AXIOS_CALLBACK_DATA']),
    ...mapGetters(['POST_AXIOS_CALLBACK_GETTER', 'LOGIN_LOCALSTORAGE']),
  },
  watch: {},
  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },
  mounted() {
    console.log(this.$nuxt)
    const loginCheck = localStorage.getItem('STUDENT')
    setTimeout(() => {
      if (loginCheck) {
        this.$router.push('/')
      }
    }, 1000)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    loginID(event) {
      this.params.user_id = event.target.value
      !!this.params.user_pw && !!this.params.user_id
        ? (this.disabled = false)
        : (this.disabled = true)
    },
    loginPW(event) {
      this.params.user_pw = event.target.value
      !!this.params.user_pw && !!this.params.user_id
        ? (this.disabled = false)
        : (this.disabled = true)
    },
    onClickLogin() {
      this.params.type = 'login'
      console.log('this.params', this.params)
      this.POST_AXIOS(this.params)
      setTimeout(() => {
        const loginCheck = localStorage.getItem('STUDENT')
        if (loginCheck) {
          this.$router.push('/')
        }
      }, 1000)
    },
  },
}
</script>

<style lang="scss">
@import '~/assets-mo/common.scss';
</style>
