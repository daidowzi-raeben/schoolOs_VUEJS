<template>
  <div id="school-content">
    <div v-if="mySchoolInformation.RESULT">ㅁㄴㅇㅁㄴㅇ</div>
    <div v-else-if="mySchoolInformation.mealServiceDietInfo">
      {{ mySchoolInformation.mealServiceDietInfo[1].row[0].DDISH_NM }}
    </div>
    <div v-else>데이터 조회중</div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      params: {},
      paramsSchool: {},
      lunchData: {},
    }
  },
  computed: {
    ...mapState(['LOGIN', 'mySchoolInformation']),
    ...mapGetters([
      'GET_AXIOS_CALLBACK_GETTER',
      'LOGIN_STUDENT',
      'GET_API_MY_SCHOOL_SUCCESS',
    ]),
  },
  mounted() {
    //   DATA INIT
    console.log(this.$nuxt, this.$config, this.LOGIN_STUDENT.smt_idx)
    this.params = this.LOGIN_STUDENT
    this.params.type = 'studentList'
    this.paramsSchool.type = 'mySchoolInformation'
    this.paramsSchool.smt_idx = this.LOGIN_STUDENT.smt_idx
    this.GET_AXIOS(this.params)
    this.GET_API_MY_SCHOOL(this.paramsSchool)

    setTimeout(() => {
      console.log(this.mySchoolInformation)
      if (this.mySchoolInformation.mealServiceDietInfo) {
        this.lunchData = this.mySchoolInformation.mealServiceDietInfo[1].row[0]
      }
    })
  },
  methods: {
    ...mapActions(['POST_AXIOS', 'GET_AXIOS', 'GET_API_MY_SCHOOL']),
    ...mapMutations([]),
  },
}
</script>

<style></style>
