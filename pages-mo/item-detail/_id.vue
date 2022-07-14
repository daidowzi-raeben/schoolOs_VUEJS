<template>
  <div v-if="GET_AXIOS_CALLBACK_GETTER.item">
    <h1>{{ GET_AXIOS_CALLBACK_GETTER.item.item_name }}</h1>
    <!-- <p>User ID : {{ idx }} {{ a | comma }}</p> -->
    <div>
      <button
        v-if="GET_AXIOS_CALLBACK_GETTER.item.use_yn === '0'"
        @click="onSubmit"
      >
        전송
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import { historyBack } from '~/config/util'

export default {
  name: 'ShopDetail',
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
      paramsPost: {},
      a: 100000000,
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
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_STUDENT
    this.params.type = 'itemView'
    this.params.idx = this.idx
    this.GET_AXIOS(this.params)
    console.log(this.params)
    historyBack()
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations([]),
    onSubmit() {
      this.paramsPost = this.LOGIN_STUDENT
      this.paramsPost.idx = this.params.idx
      this.paramsPost.type = 'itemView'
      this.POST_AXIOS(this.params)
      console.log(this.paramsPost)
      // POST_AXIOS
    },
  },
}
</script>

<style lang="scss"></style>
