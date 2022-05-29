<template>
<div id="schoolOS">
    <div class="schoolOS-content">
        <HeaderLayout/>
        <Nuxt />
        <FooterLayout/>
    </div>
</div>
</template>

<script>
import HeaderLayout from '~/components-mo/layout/HeaderLayout.vue'
import FooterLayout from '~/components-mo/layout/FooterLayout.vue'
export default {
  name: 'DefaultLayout',
  components: {
      HeaderLayout,
      FooterLayout
  },
  data() {
    return {
      
    }
  },
}
</script>

<style lang="scss">
@import '~/assets-mo/reset.scss';

</style>
