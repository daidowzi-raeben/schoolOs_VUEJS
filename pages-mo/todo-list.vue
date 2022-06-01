<template>
  <div id="school-content">
    <div class="p-3 jelly-tab">
      <ul class="flex">
        <li class="is_active">전체 퀘스트</li>
        <li><nuxt-link to="/todo-my-list">나의 퀘스트</nuxt-link></li>
      </ul>
    </div>
    <div class="p-l-3 p-r-3 p-b-3">
      <span class="jelly-badge m-r-1 m-b-2 is_active">전체</span>
      <nuxt-link v-for="item in 8" :key="item" to="/todo-list?id=1">
        <span class="jelly-badge m-r-1 m-b-2">봉사</span>
      </nuxt-link>
    </div>
    <div class="content">
      <div class="content__body m-t-1 h60">
        <div class="account">
          <h3>중요퀘스트</h3>
        </div>
        <div
          v-if="GET_AXIOS_CALLBACK_GETTER.questListMain"
          class="quest__content m-t-3"
        >
          <div
            v-for="(v, index) in GET_AXIOS_CALLBACK_GETTER.questListMain"
            :key="index"
            class="box quest m-b-2"
          >
            <div class="flex">
              <div class="label blue">{{ v.subject_cate }}</div>
              <div class="flex-full m-l-2">
                <div class="flex m-t-0">
                  <div class="txt">
                    <p class="bold">{{ v.subject }}</p>
                    <span>{{ v.start_day }} ~ {{ v.end_day }}</span>
                  </div>
                  <div class="pay text-right flex-right">
                    <p>
                      <em class="bold">
                        {{ v.price }}
                      </em>
                      루피
                    </p>
                  </div>
                </div>
                <div class="m-t-2">asdasd</div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    this.params.type = 'questList'
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
