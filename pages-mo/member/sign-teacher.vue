<template>
  <div id="school-content">
    <div class="historyBack m-l-3 m-b-5">
      <b-icon icon="arrow-left" onclick="history.back()"></b-icon>
    </div>
    <div class="p-3">
      <form @submit.prevent="onClickTeacher">
        <div>
          <p>학교이름을 알려주세요</p>
          <div class="relative">
            <input
              v-model="params.school"
              type="text"
              class="jelly-text jelly-text--h wd-full m-t-2 text-right"
              style="padding-right: 90px"
              required
            />
            <span style="position: absolute; right: 20px; top: 23px"
              >초등학교</span
            >
          </div>
        </div>
        <div class="m-t-4">
          <p>학년과 반을 알려주세요</p>
          <div class="flex relative">
            <input
              v-model="params.level"
              type="tel"
              class="jelly-text jelly-text--h wd-full m-t-2 m-r-1 p-r-10 text-right"
              required
            />
            <span class="inputLevel">학년</span>
            <input
              v-model="params.class"
              type="tel"
              class="jelly-text jelly-text--h wd-full m-t-2 m-l-1 text-right p-r-6"
              required
            />
            <span class="inputClass">반</span>
          </div>
        </div>
        <button
          type="submit"
          class="jelly-btn jelly-text--h jelly-btn--pink wd-full m-t-5"
        >
          선생님 찾기
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      params: {
        class: null,
        level: null,
        school: null,
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
    ...mapMutations(['LOADING_TRUE']),

    onClickTeacher() {
      // profileImage
      this.LOADING_TRUE()
      const frm = new FormData()
      frm.append('type', 'searchTeacher')
      frm.append('class', this.params.class)
      frm.append('level', this.params.level)
      frm.append('school', this.params.school)
      this.$axios
        .post('https://api.school-os.net' + '/student.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res.data)
          if (confirm(`${res.data.reg_name} 선생님이 담임선생님인가요?`)) {
            this.$router.push(`/member/sign-up?reg_code=${res.data.reg_code}`)
          } else {
            console.log('B')
          }
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
      //   alert('가입이 완료되었어요.')
    },
  },
}
</script>

<style lang="scss">
@import '~/assets-mo/common.scss';
.inputLevel {
  position: absolute;
  left: 50%;
  margin-left: -46px;
  top: 39%;
}
.inputClass {
  position: absolute;
  right: 3%;
  margin-left: -75px;
  top: 39%;
}
</style>
