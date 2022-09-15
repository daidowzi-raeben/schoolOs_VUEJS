<template>
  <div class="jelly-header">
    <!-- <v-overlay :value="loading" z-index="10000">
      <v-progress-circular
        indeterminate
        size="64"
        color="primary"
      ></v-progress-circular>
    </v-overlay> -->
    <div
      ref="animationElement"
      style="position: absolute; width: 100%; margin-top: 10%; z-index: 99"
      class="text-center"
    ></div>
    <div v-if="student && student.apply === '0'">
      <div
        style="
          position: fixed;
          width: 100%;
          height: 100%;
          background: #fff;
          top: 0;
          left: 0;
          z-index: 99;
          opacity: 0.9;
        "
      ></div>
      <div
        style="
          position: absolute;
          color: #000;
          z-index: 100;
          width: 100%;
          padding-top: 45%;
          height: 100%;
        "
        class="text-center"
      >
        아직 승인되지 않은 아이디에요.<br />
        선생님께 승인을 요청해 보세요.<br />
        <em>선생님이 승인해야 사용할 수 있어요</em>
      </div>
    </div>
    <div v-if="student && student.del === 'Y'">
      <div
        style="
          position: fixed;
          width: 100%;
          height: 100%;
          background: #fff;
          top: 0;
          left: 0;
          z-index: 99;
          opacity: 0.9;
        "
      ></div>
      <div
        style="
          position: absolute;
          color: #000;
          z-index: 100;
          width: 100%;
          padding-top: 45%;
          height: 100%;
        "
        class="text-center"
      >
        사용할 수 없는 아이디에요<br />
        <nuxt-link to="/member/sign-out/">
          <em>다른 아이디로 로그인 하기 </em>
        </nuxt-link>
      </div>
    </div>
    <header>
      <div class="flex">
        <h1 class="relative" @click="onClickEasterEgg">
          JELLY
          <div ref="animationElementMoon" class="logoBack"></div>
        </h1>

        <div class="flex-right notification">
          <div class="flex">
            <!-- <nuxt-link
              to="/market-list/0"
              style="margin-top: 2px"
              class="m-r-1"
            >
              <b-icon icon="bag"></b-icon>
            </nuxt-link> -->
            <nuxt-link to="/market-list/0" class="m-r-2">
              <!-- <b-icon icon="upc-scan"></b-icon> -->
              <img src="~/static/mo/icon/store.png" width="30" />
            </nuxt-link>
            <nuxt-link
              v-if="teacher && teacher.jb_mode === 'Y'"
              to="/lottery-buy"
              class="m-r-2"
            >
              <!-- <b-icon icon="upc-scan"></b-icon> -->
              <img src="~/static/mo/icon/gambling.png" width="30" />
            </nuxt-link>
            <nuxt-link to="/rank-list">
              <!-- <b-icon icon="upc-scan"></b-icon> -->
              <img src="~/static/mo/icon/top-three.png" width="28" />
            </nuxt-link>
            <!-- <div v-if="isTeacherChat && chatURL" id="teacherChat">
            <div class="teacherChat-header" @click="teacherChat"></div>
            <iframe
              :src="
                chatURL +
                '?reg_name=' +
                LOGIN.reg_name +
                '&mode=S&smt_idx=' +
                LOGIN.smt_idx +
                '&sms_idx=' +
                LOGIN.sms_idx
              "
              class="isTeacherChat"
              scrolling="no"
            ></iframe>
          </div> -->
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      egg: 0,
      LOGIN_CONFIG: {},
      teacher: {},
      student: {},
    }
  },
  computed: {},
  mounted() {
    this.LOGIN_CONFIG = JSON.parse(localStorage.getItem('STUDENT'))
    this.LOADING = true
    const frm = new FormData()
    frm.append('type', 'teacher_chk')
    frm.append('smt_idx', this.LOGIN_CONFIG.smt_idx)
    frm.append('sms_idx', this.LOGIN_CONFIG.sms_idx)
    this.$axios
      .post(process.env.VUE_APP_API + '/student.php', frm)
      .then((res) => {
        console.log('================', res.data)
        this.teacher = res.data.teacher
        this.student = res.data.student
        // this.chuseok()
      })
      .catch((res) => {
        console.log('AXIOS FALSE', res)
        this.LOADING = false
      })
  },
  methods: {
    onClickEasterEgg() {
      this.egg++
      console.log(this.egg)
      if (this.egg === 10) {
        // alert('그만눌러')
        this.logoClick()
      }
    },
    logoClick() {
      this.$lottie.loadAnimation({
        container: this.$refs.animationElement, // the dom element that will contain the animation
        loop: true,
        autoplay: true,
        // autoplay: true,
        path: '/img/logo.json', // the path to the animation json
      })
      setTimeout(() => {
        this.$refs.animationElement.style.display = 'none'
      }, 5000)
    },
    chuseok() {
      this.$lottie.loadAnimation({
        container: this.$refs.animationElementMoon, // the dom element that will contain the animation
        loop: true,
        autoplay: true,
        // autoplay: true,
        path: '/img/moon.json', // the path to the animation json
      })
    },
  },
}
</script>

<style lang="scss">
.logoBack {
  position: absolute;
  top: -16px;
  margin-left: 43px;
  width: 100px;
}
</style>
