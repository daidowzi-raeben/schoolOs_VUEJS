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
          <b-icon icon="bell" @click="teacherChat"></b-icon>
          <div v-if="isTeacherChat && chatURL" id="teacherChat">
            <div class="teacherChat-header" @click="teacherChat"></div>
            <iframe
              :src="
                chatURL +
                '?reg_name=' +
                LOGIN.reg_name +
                '&mode=S&smt_idx=' +
                LOGIN.smt_idx +
                '&sms_idx=' +
                LOGIN.sms_idx
              "
              class="isTeacherChat"
              scrolling="no"
            ></iframe>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      loading: true,
      isTeacherChat: false,
    }
  },
  computed: {
    ...mapState(['LOGIN', 'chatURL']),
  },
  mounted() {
    // console.log(this.LOGIN, this.chatURL)
    this.finish()
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
    teacherChat() {
      this.isTeacherChat === false
        ? (this.isTeacherChat = true)
        : (this.isTeacherChat = false)
    },
  },
}
</script>

<style lang="scss"></style>
