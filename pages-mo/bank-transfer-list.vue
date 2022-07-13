<template>
  <div id="school-content">
    <div>
      <v-date-picker v-model="rangeCalendar" color="purple" is-range />
    </div>
    <div v-if="rangeCalendar">
      {{ rangeCalendar.start | moment('YYYY-MM-DD') }}
      {{ rangeCalendar.end | moment('YYYY-MM-DD') }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  layout: 'default-mo',
  data() {
    return {
      params: {},
      rangeCalendar: null,
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
    this.params.type = 'bankTransferList'
    this.GET_AXIOS(this.params)

    setTimeout(() => {
      // this.rangeCalendar = this.GET_AXIOS_CALLBACK_GETTER.monthDate
    })
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations([]),

    // EVENT
    onClickTodoDetail(idx) {
      this.$router.push('/todo-detail/' + idx)
    },
  },
}
</script>

<style lang="scss"></style>
