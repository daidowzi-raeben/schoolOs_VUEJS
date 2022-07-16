<template>
  <div>
    <div v-if="GET_AXIOS_CALLBACK_GETTER">
      <img :src="GET_AXIOS_CALLBACK_GETTER.image" />
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
    this.params.type = 'qrcode'
    this.GET_AXIOS(this.params)
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
