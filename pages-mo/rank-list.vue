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
              <div class="rankProfile" @click="profileDetail(v.reg_photo)">
                <img
                  v-if="!v.reg_photo"
                  src="https://api.school-os.net/data/student/profile/default.png"
                />
                <img
                  v-if="v.reg_photo"
                  :src="`https://api.school-os.net/data/student/profile/thumb/${v.reg_photo}`"
                />
              </div>
              <div class="flex-full m-l-2">
                <div class="flex m-t-0">
                  <div class="txt m-t-1">
                    <p style="position: absolute; margin-top: -15px">
                      <em
                        v-if="
                          v.albaCnt === v.albaStudentCnt &&
                          Number(v.albaCnt) > 0
                        "
                      >
                        <b-icon
                          icon="star-fill"
                          animation="fade"
                          font-scale="1"
                          variant="warning"
                        ></b-icon>
                      </em>
                    </p>
                    <p class="m-t-1">
                      <em
                        v-if="v.name_style"
                        class="font-12"
                        style="line-height: 15px"
                      >
                        <p>
                          {{ v.name_style.split('|')[0] }}
                        </p>
                        <p style="margin-top: 5px">
                          {{ v.name_style.split('|')[1] }}
                        </p>
                      </em>
                    </p>
                    <p class="bold m-t-2">{{ v.reg_name }}</p>
                    <p class="m-t-2">LV.{{ Number(v.reg_level) }}</p>
                    <span>
                      {{ v.job_name }}
                    </span>
                  </div>

                  <div class="flex-right">
                    <div class="flex m-t-4">
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
    <b-modal id="profileImage" size="sm" hide-footer hide-header>
      <div>
        <img :src="profileDetailImage" width="100%" />
      </div>
      <div class="m-t-5 flex text-center">
        <button
          class="jelly-btn jelly-btn--default flex-full wd-full m-r-1"
          @click="$bvModal.hide('profileImage')"
        >
          닫기
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      params: { type: 'studentRank' },
      paramsPost: {},
      start_day: '',
      end_day: '',
      isHistory: '',
      profileDetailImage: '',
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
    ...mapMutations(['LOADING_TRUE']),

    // EVENT
    profileDetail(image) {
      this.profileDetailImage = ''
      if (!image) {
        return false
      }
      this.profileDetailImage = `https://api.school-os.net/data/student/profile/${image}`
      this.$bvModal.show('profileImage')
    },
  },
}
</script>

<style lang="scss"></style>
