<template>
  <div id="school-content">
    <div v-if="GET_AXIOS_CALLBACK_GETTER.cate">
      <ul class="flex">
        <li v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.cate" :key="i">
          <nuxt-link :to="'/market-list/' + v.idx">
            {{ v.cate_name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div v-if="GET_AXIOS_CALLBACK_GETTER.item">
      <ul class="flex">
        <li v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.item" :key="i">
          {{ v.item_name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  layout: 'default-mo',
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
    this.params.type = 'shopList'
    this.params.ssc_idx = this.idx
    this.params.page = 1
    this.GET_AXIOS(this.params)
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
