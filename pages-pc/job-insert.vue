<template>
  <div>
    <div>
      <input v-model="pay" class="jelly-text" />
      <input v-model="job_name" class="jelly-text" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import { axiosForm } from '~/config/util'

export default {
  layout: 'default-pc',
  data() {
    return {
      params: {},
      pay: 0,
      job_name: '',
    }
  },

  computed: {
    ...mapState(['LOGIN']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_TEACHER']),
  },
  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },
  mounted() {
    //   DATA INIT
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_TEACHER
    this.params.type = 'joblistTable'
    // this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations([]),

    // EVENT
    onClickTodoDetail(idx) {
      const FORM_DATA = new FormData()
      FORM_DATA.append('type', 'register')
      axiosForm(FORM_DATA, '/teacher.php')
      axiosForm()
    },
  },
}
</script>

<style lang="scss"></style>
