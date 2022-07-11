<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    localStorage.clear()
    this.$router.push('/member/sign-in')
  },
}
</script>
