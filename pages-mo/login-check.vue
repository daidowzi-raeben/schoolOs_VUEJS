<template>
  <div id="LOADING">
    <img src="~/static/img/loading.gif" />
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.LOGIN_CONFIG = JSON.parse(localStorage.getItem('STUDENT'))
      this.$router.push(`/`)
    }, 500)
  },
}
</script>

<style></style>
