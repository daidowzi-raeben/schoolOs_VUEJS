<template>
  <div>
    <div class="p-3">
      <form @submit.prevent="onClickLogin">
        <div>
          <p>
            아이디
            <span v-if="STUDENT_ID_CHECK" class="font-12">
              <em v-if="STUDENT_ID_CHECK.reg_id !== null"
                >사용할 수 없는 아이디 입니다.</em
              >
            </span>
          </p>
          <input
            v-model="params.reg_id"
            type="text"
            class="jelly-text jelly-text--h wd-full m-t-2"
            required
            @input="loginID($event)"
          />

          <!-- <p
            v-if="!STUDENT_ID_CHECK && STUDENT_ID_CHECK.reg_id !== null"
            class="font-12"
          >
            아이디를 입력하세요
          </p>
          <p v-else class="font-12">사용할 수 있는 아이디 입니다.</p> -->
        </div>
        <div class="m-t-4">
          <p>
            비밀번호
            <span class="font-12">
              <em>{{ pwChk }}</em>
            </span>
          </p>
          <input
            v-model="params.reg_pw"
            type="password"
            class="jelly-text jelly-text--h wd-full m-t-2"
            required
            @input="loginPW($event)"
          />
          <input
            v-model="params.reg_pw2"
            type="password"
            class="jelly-text jelly-text--h wd-full m-t-2"
            required
            placeholder="비밀번호를 한번 더 입력하세요"
            @input="loginPWRE($event)"
          />
        </div>
        <div class="m-t-4">
          <p>이름</p>
          <input
            v-model="params.reg_name"
            type="text"
            class="jelly-text jelly-text--h wd-full m-t-2"
            required
          />
        </div>
        <div class="m-t-4 flex">
          <div class="flex-full">
            <p>출석번호</p>
            <input
              v-model="params.class_number"
              type="tel"
              class="jelly-text jelly-text--h wd-full m-t-2 m-r-2 text-right"
              required
            />
          </div>
          <div class="m-l-2 m-t-8">번</div>
        </div>
        <button
          type="submit"
          class="jelly-btn jelly-text--h jelly-btn--pink wd-full m-t-5"
        >
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
        type: 'teacher_idChk',
        reg_id: '',
        reg_pw: '',
        reg_pw2: '',
        reg_name: '',
        class_number: '',
      },
      pwChk: '',
      formChk: 0,
      paramsPost: {},
    }
  },
  computed: {
    ...mapState(['POST_AXIOS_CALLBACK_DATA', 'studentIdMSG']),
    ...mapGetters(['STUDENT_ID_CHECK', 'LOGIN_LOCALSTORAGE']),
  },
  mounted() {
    console.log(this.$nuxt)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_STUDENT_ID']),
    loginID(event) {
      console.log(event)
      this.params.reg_id = event.target.value
      this.GET_STUDENT_ID(this.params)
      console.log('=====================', this.STUDENT_ID_CHECK)
    },
    loginPW(event) {
      console.log(event)
      this.params.reg_pw = event.target.value
    },
    loginPWRE(event) {
      console.log(event)
      this.params.reg_pw2 = event.target.value

      if (this.params.reg_pw2 !== this.params.reg_pw) {
        this.pwChk = '비밀번호가 일치하지 않아요.'
      } else {
        this.pwChk = ''
      }
    },
    onClickLogin() {
      this.paramsPost.type = 'register'
      this.paramsPost.reg_code = this.$route.query.reg_code
      this.paramsPost.reg_code = this.$route.query.reg_code
      this.paramsPost.reg_id = this.params.reg_id
      this.paramsPost.reg_pw = this.params.reg_pw
      this.paramsPost.reg_name = this.params.reg_name
      this.paramsPost.class_number = this.params.class_number
      this.POST_AXIOS(this.paramsPost)
      alert('가입이 완료되었어요.')
      this.$router.push('/member/sign-in')
    },
  },
}
</script>

<style lang="scss">
@import '~/assets-mo/common.scss';
</style>
