<template>
  <div id="school-content">
    <div class="p-3 jelly-tab">
      <ul class="flex">
        <li class="is_active">새로운 알림장</li>
        <li><nuxt-link to="/notice-read-list/0">모든 알림장</nuxt-link></li>
      </ul>
    </div>
    <div class="content">
      <div class="content__body m-t-1 h60">
        <div
          v-if="!GET_AXIOS_CALLBACK_GETTER.newNotice"
          class="quest__content m-t-3 p-t-5 text-center"
        >
          새로운 알림장이 없어요 :D
        </div>
        <div
          v-if="GET_AXIOS_CALLBACK_GETTER.newNotice"
          class="quest__content m-t-3"
        >
          <div
            v-for="(v, index) in GET_AXIOS_CALLBACK_GETTER.newNotice"
            :key="index"
            class="box quest m-b-3"
            @click="onClickBillDetail(v.idx)"
          >
            <div class="flex">
              <div class="flex-full m-l-2">
                <div class="flex m-t-0">
                  <div class="txt">
                    <p class="bold">{{ v.bd_subject }}</p>
                    <p class="m-t-2">
                      <span>{{ v.datetime | moment('YY.MM.DD') }}</span>
                    </p>
                  </div>
                </div>
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
    this.params.type = 'noticelist'
    this.params.page = this.idx
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations([]),

    // EVENT
    onClickBillDetail(idx) {
      this.$router.push('/notice-detail/' + idx)
    },
  },
}
</script>

<style lang="scss"></style>
