<template>
  <div>
    <div class="box">asdsa</div>
    <div class="box">asdsa</div>
    <div class="box">asdsa</div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  components: {},
  layout: 'default-pc',
  mounted() {
    console.log('[ENV]', process.env.VUE_APP_STR)
    console.log('[ENV]', process.env.DB_URL)
    console.log('asdasd')
  },
}
</script>
