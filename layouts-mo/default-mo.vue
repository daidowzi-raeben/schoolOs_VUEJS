<template>
  <div id="schoolOS">
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
    return {}
  },
  computed: {
    ...mapMutations(['LOADING_INIT']),
    ...mapState(['LOADING']),
  },
  mounted() {
    const loginCheck = localStorage.getItem('STUDENT')
    if (!loginCheck) {
      this.$router.push(`/member/sign-in`)
    }
    console.log('[LOADING_INIT]', this.LOADING_INIT)
    if (!localStorage.getItem('STUDENT')) {
      // return this.$router.push('/member/sign-in')
    }
  },
}
</script>

<style lang="scss">
body {
  // background-color: transparent !important;
}
</style>
