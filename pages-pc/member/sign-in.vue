<template>
  <div class="sos-login">
    <div>
      <div class="header">School OS</div>
      <div class="sos-login__content">
        <form @submit.prevent="onClickLogin">
          <div>
            <input
              type="text"
              class="jelly-text wd-full jelly-text--h"
              placeholder="아이디"
              @input="loginID($event)"
            />
          </div>
          <div class="m-t-2">
            <input
              type="password"
              class="jelly-text wd-full jelly-text--h"
              placeholder="패스워드"
              @input="loginPW($event)"
            />
          </div>
          <div class="m-t-4">
            <button
              type="submit"
              class="jelly-btn jelly-btn--pink jelly-text--h wd-full"
              :disabled="disabled === true"
            >
              로그인
            </button>
          </div>
          <!-- <div class="m-t-4 text-center">
            <Nuxt-link to="/member/sign-up"> 아직 회원이 아닌가요? </Nuxt-link>
          </div> -->
        </form>
      </div>
    </div>
    <div class="m-t-3 text-center">
      <Nuxt-link to="/member/sign-up"> 아직 회원이 아닌가요? </Nuxt-link>
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
      this.POST_AXIOS(this.params)
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss">
@import '~/assets-pc/common.scss';
.sos-login {
}
</style>
