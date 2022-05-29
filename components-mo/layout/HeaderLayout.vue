<template>
  <div class="jelly-header">
    <v-overlay :value="loading" z-index="10000">
      <v-progress-circular
        indeterminate
        size="64"
        color="primary"
      ></v-progress-circular>
    </v-overlay>
    <header>
      <div class="flex">
        <h1>JELLY</h1>
        <div class="flex-right notification">
          <b-icon v-b-toggle.notification icon="bell"></b-icon>
          <b-collapse id="notification">공지사항</b-collapse>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>

<style lang="scss">
@import '~/assets-mo/layout.scss';
</style>
