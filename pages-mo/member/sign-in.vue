<template>
  <div>
    <div class="flex">
      <form @submit.prevent="onClickLogin">
        <input type="text" class="jelly-text" @input="loginID($event)" />
        <input type="password" class="jelly-text" @input="loginPW($event)" />
        <button type="submit" class="jelly-btn jelly-btn--default">
          SIGN IN
        </button>
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
    }
  },

  computed: {
    ...mapState(['POST_AXIOS_CALLBACK_DATA']),
    ...mapGetters(['POST_AXIOS_CALLBACK_GETTER', 'LOGIN_LOCALSTORAGE']),
  },
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
      console.log(event)
      this.params.user_id = event.target.value
    },
    loginPW(event) {
      console.log(event)
      this.params.user_pw = event.target.value
    },
    onClickLogin() {
      this.POST_AXIOS(this.params)
      // this.$router.push('/')
    },
  },
}
</script>

<style lang="scss">
@import '~/assets-mo/common.scss';
</style>
