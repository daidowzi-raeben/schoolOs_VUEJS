<template>
  <!-- <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/"> Home page </NuxtLink>
  </v-app> -->
  <div style="width: 340px; margin: 0 auto">
    <div
      ref="animationElement"
      class="animation coinAnimeText"
      style="margin-top: 70%"
    ></div>
    <div class="text-center m-t-10">
      새로고침 후 다시 시도하거나 <br /><NuxtLink to="/">여기</NuxtLink>를
      클릭하세요
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
  mounted() {
    this.$lottie.loadAnimation({
      container: this.$refs.animationElement, // the dom element that will contain the animation
      loop: false,
      autoplay: true,
      // autoplay: true,
      path: '/img/cat.json', // the path to the animation json
    })
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
