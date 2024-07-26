<template>
  <div id="schoolOS">
    <div v-if="LOADING" id="LOADING">
      <img src="~/static/img/loading.gif" />
    </div>
    <!-- <div v-show="LOADING">asdasd</div> -->
    <div class="schoolOS-content">
      <HeaderLayout />
      <Nuxt />
      <FooterLayout />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import HeaderLayout from '~/components-mo/layout/HeaderLayout.vue'
import FooterLayout from '~/components-mo/layout/FooterLayout.vue'
export default {
  name: 'DefaultLayout',
  components: {
    HeaderLayout,
    FooterLayout,
  },

  data() {
    return {
      loginCheck: {},
    }
  },
  computed: {
    ...mapState(['LOADING']),
  },
  mounted() {
    this.loginCheck = localStorage.getItem('STUDENT')
    if (!this.loginCheck) {
      this.$router.push(`/member/sign-in`)
    }
    console.log('[LOADING_INIT]', this.LOADING_INIT)
    if (!localStorage.getItem('STUDENT')) {
      // return this.$router.push('/member/sign-in')
    }

    // 캐시 지우기용
    const logChk = JSON.parse(this.loginCheck)
    const frm = new FormData()
    frm.append('type', 'logout')
    frm.append('sms_idx', logChk.sms_idx)
    this.$axios
      .post('https://api.school-os.net' + '/student.php', frm, {
        header: {
          'Context-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log('[LOGOUT]', res.data)
        setTimeout(() => {
          if (res.data != '1') {
            this.$router.push(`/member/sign-out?sms_idx=${logChk.sms_idx}`)
          }
        })
      })
      .catch((res) => {
        console.log('AXIOS FALSE', res)
      })
  },
  methods: {
    ...mapMutations(['LOADING_INIT']),
  },
}
</script>

<style lang="scss">
body {
  // background-color: transparent !important;
}
</style>
