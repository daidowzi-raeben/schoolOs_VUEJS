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
    <div class="content">
      <div class="content__body m-t-1">
        <div v-if="LOGIN_STUDENT" class="account">
          <h3 v-if="LOGIN_STUDENT.t_reg_country">
            {{ LOGIN_STUDENT.t_reg_country }} Rank
          </h3>
        </div>
        <div
          v-if="!GET_AXIOS_CALLBACK_GETTER.studentRank"
          class="quest__content m-t-3"
        >
          <div class="p-5 text-center font-14"></div>
        </div>
        <div
          v-if="GET_AXIOS_CALLBACK_GETTER.studentRank"
          class="quest__content m-t-3"
        >
          <div
            v-for="(v, index) in GET_AXIOS_CALLBACK_GETTER.studentRank"
            :key="index"
            class="box quest m-b-3"
          >
            <div class="flex">
              <div class="label blue">LV.{{ Number(v.reg_level) }}</div>
              <div class="flex-full m-l-2">
                <div class="flex m-t-0">
                  <div class="txt">
                    <p class="bold">{{ v.reg_name }}</p>
                    <span>
                      {{ v.job_name }}
                    </span>
                  </div>

                  <div class="flex-right">
                    <div class="flex m-t-0">
                      <span
                        class="jelly-point m-t-0 jelly-background--type1 m-l-1"
                        >{{ Number(v.intellect) }}</span
                      >
                      <span
                        class="jelly-point m-t-0 jelly-background--type2 m-l-1"
                        >{{ Number(v.effort) }}</span
                      >
                      <span
                        class="jelly-point m-t-0 jelly-background--type3 m-l-1"
                        >{{ Number(v.health) }}</span
                      >
                      <span
                        class="jelly-point m-t-0 jelly-background--type4 m-l-1"
                        >{{ Number(v.etiquette) }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      params: {},
      paramsPost: {},
      start_day: '',
      end_day: '',
      isHistory: '',
    }
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
    this.params = this.LOGIN_STUDENT
    this.params.type = 'studentRank'
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations([]),

    // EVENT
  },
}
</script>

<style lang="scss"></style>
