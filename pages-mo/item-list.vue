<template>
  <div id="school-content">
    <div v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.item" :key="i">
      <nuxt-link :to="'/item-detail/' + v.idx">
        {{ v.item_name }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      params: {},
    }
  },
  computed: {
    ...mapState(['LOGIN']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_STUDENT']),
  },
  mounted() {
    //   DATA INIT
    console.log(this.$nuxt, this.$config, this.LOGIN_STUDENT.smt_idx)
    this.params = this.LOGIN_STUDENT
    this.params.type = 'itemList'
    this.GET_AXIOS(this.params)
  },
  methods: {
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations([]),
  },
}
</script>

<style></style>
