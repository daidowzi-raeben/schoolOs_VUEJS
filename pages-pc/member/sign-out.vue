<template>
  <div></div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {},
  mounted() {
    this.LOGOUT_INIT()
    localStorage.clear()
    this.$router.push('/member/sign-in')
  },
  methods: {
    // init
    ...mapMutations(['LOGOUT_INIT']),
  },
}
</script>
