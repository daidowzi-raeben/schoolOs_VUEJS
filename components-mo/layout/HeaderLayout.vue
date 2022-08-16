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
        <h1 @click="onClickEasterEgg">JELLY</h1>
        <div class="flex-right notification">
          <div class="flex">
            <!-- <nuxt-link
              to="/market-list/0"
              style="margin-top: 2px"
              class="m-r-1"
            >
              <b-icon icon="bag"></b-icon>
            </nuxt-link> -->
            <nuxt-link to="/market-list/0" class="m-r-2">
              <!-- <b-icon icon="upc-scan"></b-icon> -->
              <img src="~/static/mo/icon/store.png" width="30" />
            </nuxt-link>
            <nuxt-link
              v-if="teacher && teacher.jb_mode === 'Y'"
              to="/lottery-buy"
              class="m-r-2"
            >
              <!-- <b-icon icon="upc-scan"></b-icon> -->
              <img src="~/static/mo/icon/gambling.png" width="30" />
            </nuxt-link>
            <nuxt-link to="/rank-list">
              <!-- <b-icon icon="upc-scan"></b-icon> -->
              <img src="~/static/mo/icon/top-three.png" width="28" />
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
    return {
      egg: 0,
      LOGIN_CONFIG: {},
      teacher: {},
    }
  },
  computed: {},
  mounted() {
    this.LOGIN_CONFIG = JSON.parse(localStorage.getItem('STUDENT'))
    this.LOADING = true
    const frm = new FormData()
    frm.append('type', 'teacher_chk')
    frm.append('smt_idx', this.LOGIN_CONFIG.smt_idx)
    this.$axios
      .post(process.env.VUE_APP_API + '/student.php', frm)
      .then((res) => {
        console.log('================', res.data)
        this.teacher = res.data
      })
      .catch((res) => {
        console.log('AXIOS FALSE', res)
        this.LOADING = false
      })
  },
  methods: {
    onClickEasterEgg() {
      this.egg++
      console.log(this.egg)
      if (this.egg === 10) {
        alert('그만눌러')
      }
    },
  },
}
</script>

<style lang="scss"></style>
