<template>
  <div>
    <!-- <div>
      <input v-model="pay" class="jelly-text" />
      <button @click="onSubmit">빌리기</button>
    </div> -->
    <div class="">
      <div id="jellyAdminheader" style="padding-top: 0vh">
        <!-- <span>{{ today }}</span> -->
        <h1 v-if="LOGIN_TEACHER">상점관리</h1>
        <div v-if="GET_AXIOS_CALLBACK_GETTER.shopCate" class="m-t-15 m-l-4">
          <span
            v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.shopCate"
            :key="`cate${i}`"
            class="spanBox m-r-2"
            style="color: #fff"
          >
            {{ v.cate_name }}
          </span>
          <span v-b-modal.cateInsert class="spanBox m-r-2" style="color: #fff">
            +
          </span>
        </div>
        <div class="student form">
          <div class="student__list">
            <div class="flex m-t-3">
              <div
                v-if="GET_AXIOS_CALLBACK_GETTER.content"
                class="item"
                style="width: 100%; background: #fff; color: #000"
              >
                <vue-editor v-model="ruleContent"> </vue-editor>
                <div class="text-center m-t-5">
                  <button
                    class="jelly-btn jelly-btn--pink lg"
                    @click="onSubmit"
                  >
                    등록하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="cateInsert" size="lg" hide-footer hide-header visible>
      <div class="flex">
        <span>카테고리 이름</span>
        <input type="text" class="jelly-text" />
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
// import { axiosForm } from '~/config/util'

export default {
  layout: 'default-pc',
  data() {
    return {
      params: {},
      paramsForm: {},
      pay: 0,
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
    this.params.type = 'shopList'
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations([]),

    // EVENT
    onSubmit() {
      this.paramsForm = this.LOGIN_TEACHER
      this.paramsForm.type = 'loanList'
      this.paramsForm.pay = this.pay
      this.POST_AXIOS(this.paramsForm)
    },
  },
}
</script>

<style lang="scss"></style>
