<template>
  <div id="schoolOS">
    <div v-show="LOADING">asdasd</div>
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
  methods() {
    console.log('[LOADING_INIT]', this.LOADING_INIT())
  },
}
</script>

<style lang="scss">
@import '~/assets-mo/layout.scss';
@import '~/assets-mo/common.scss';
</style>
