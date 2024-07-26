<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    localStorage.clear()
    const frm = new FormData()
    frm.append('type', 'logoutChk')
    frm.append('sms_idx', this.$route.query.sms_idx)
    this.$axios
      .post('https://api.school-os.net' + '/student.php', frm, {
        header: {
          'Context-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log('[LOGOUT]', res.data)
        setTimeout(() => {
          if (res.data === 'OK') {
            this.$router.push(`/member/sign-in`)
          }
        })
      })
      .catch((res) => {
        console.log('AXIOS FALSE', res)
      })

    // this.$router.push('/member/sign-in')
  },
}
</script>
