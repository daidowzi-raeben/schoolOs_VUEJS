<template>
  <div>
    <h1>User</h1>
    <p>User ID : {{ idx }} {{ a | comma }}</p>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  name: 'TodoDetail',
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  asyncData({ params }) {
    console.log(params)
    return {
      idx: params.id,
    }
  },
  data() {
    return {
      params: {},
      a: 100000000,
    }
  },
  computed: {
    ...mapState(['LOGIN']),
    ...mapGetters(['POST_AXIOS_CALLBACK_GETTER', 'LOGIN_STUDENT']),
  },
  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },
  mounted() {
    //   DATA INIT
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_STUDENT
    this.params.type = 'questView'
    this.params.idx = this.idx
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations([]),
  },
}
</script>

<style lang="scss">
@import '~/assets-mo/common.scss';
</style>
