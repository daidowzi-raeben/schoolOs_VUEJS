<template>
  <div id="school-content">
    <div class="p-3 jelly-tab">
      <ul class="flex">
        <li class="is_active">마켓</li>
        <li><nuxt-link to="/item-list/0">나의 구매</nuxt-link></li>
      </ul>
    </div>
    <div v-if="GET_AXIOS_CALLBACK_GETTER.cate" class="p-l-3 p-r-3 p-b-3">
      <nuxt-link to="/market-list/0">
        <span
          :class="
            idx == 0
              ? 'jelly-badge m-r-1 m-b-2 is_active'
              : 'jelly-badge m-r-1 m-b-2'
          "
          >전체</span
        >
      </nuxt-link>
      <nuxt-link
        v-for="(v, index) in GET_AXIOS_CALLBACK_GETTER.cate"
        :key="index"
        :to="'/market-list/' + v.idx"
      >
        <span
          :class="
            v.idx == idx
              ? 'is_active jelly-badge m-r-1 m-b-2'
              : 'jelly-badge m-r-1 m-b-2'
          "
          >{{ v.cate_name }}</span
        >
      </nuxt-link>
    </div>
    <div class="matketItem m-l-3 m-r-3">
      <ul v-if="GET_AXIOS_CALLBACK_GETTER.item">
        <li v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.item" :key="i">
          <nuxt-link :to="'/market-detail/' + v.idx">
            <div class="image">
              <img
                v-if="v.item_thumb"
                :src="`http://api.school-os.net/data/teacher/shop/${v.item_thumb}`"
              />
              <div v-if="!v.item_thumb">
                <b-icon icon="flower2"></b-icon>
              </div>
            </div>
            <strong class="m-t-2" style="display: block">{{
              v.item_name
            }}</strong>
            <p class="m-t-1">{{ v.item_price | comma }}</p>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <!-- <div v-if="GET_AXIOS_CALLBACK_GETTER.item">
      <ul class="flex">
        <li v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.item" :key="i">
          <nuxt-link :to="'/market-detail/' + v.idx">
            {{ v.item_name }}
          </nuxt-link>
        </li>
      </ul>
    </div> -->
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
