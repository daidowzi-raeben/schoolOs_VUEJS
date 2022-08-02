<template>
  <div class="jelly-header">
    <!-- <v-overlay :value="loading" z-index="10000">
      <v-progress-circular
        indeterminate
        size="64"
        color="primary"
      ></v-progress-circular>
    </v-overlay> -->
    <header>
      <div class="flex">
        <h1>JELLY</h1>
        <div class="flex-right notification">
          <div class="flex">
            <nuxt-link
              to="/market-list/0"
              style="margin-top: 2px"
              class="m-r-1"
            >
              <b-icon icon="bag"></b-icon>
            </nuxt-link>
            <nuxt-link to="/rank-list">
              <!-- <b-icon icon="upc-scan"></b-icon> -->
              <img src="~/static/mo/icon/ic_rank_top.jpg" width="30" />
            </nuxt-link>
            <!-- <div v-if="isTeacherChat && chatURL" id="teacherChat">
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
          </div> -->
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {},
}
</script>

<style lang="scss"></style>
