<template>
  <div id="school-content">
    <div v-if="$route.query.history" class="historyBack m-l-3 m-b-5">
      <nuxt-link to="/">
        <b-icon icon="arrow-left"></b-icon>
      </nuxt-link>
    </div>
    <div v-if="!$route.query.history" class="historyBack m-l-3 m-b-5">
      <b-icon icon="arrow-left" onclick="history.back()"></b-icon>
    </div>
    <div class="content p-l-3 p-r-3">컨텐츠</div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {}
  },

  computed: {
    ...mapState(['LOGIN']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_STUDENT']),
  },
  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },
  mounted() {
    //   DATA INIT
    console.log(this.$nuxt, this.$config, this.rangeCalendar)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT
  },
}
</script>

<style lang="scss"></style>
