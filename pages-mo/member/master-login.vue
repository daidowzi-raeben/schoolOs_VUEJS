<template>
  <div class="sos-login"></div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

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
    localStorage.clear()
    const frm = new FormData()
    frm.append('type', 'login')
    frm.append('master', 'true')
    frm.append('sms_idx', this.$route.query.sms_idx)
    this.$axios
      .post('http://api.school-os.net' + '/student.php', frm, {
        header: {
          'Context-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log('[MASTER LOGIN]', res.data)
        localStorage.setItem('STUDENT', JSON.stringify(res.data))
        setTimeout(() => {
          this.$router.push(`/`)
        }, 1500)
      })
      .catch((res) => {
        console.log('AXIOS FALSE', res)
      })
  },
}
</script>

<style lang="scss">
@import '~/assets-mo/common.scss';
</style>
