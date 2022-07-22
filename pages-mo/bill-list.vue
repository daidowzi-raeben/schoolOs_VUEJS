<template>
  <div id="school-content">
    <!-- <div class="p-3 jelly-tab">
      <ul class="flex">
        <li class="is_active">전체 퀘스트</li>
        <li><nuxt-link to="/todo-my-list/0">나의 퀘스트</nuxt-link></li>
      </ul>
    </div> -->
    <div class="content">
      <div class="content__body m-t-1 h60">
        <div class="account">
          <h3>미납 고지서</h3>
        </div>
        <div
          v-if="!GET_AXIOS_CALLBACK_GETTER.billNon && LOGIN_STUDENT.t_todo_name"
          class="quest__content m-t-3"
        >
          <div class="text-center p-t-3 p-b-5 jelly-color--type4">
            <strong>내야할 고지서가 없어요</strong>
          </div>
        </div>
        <div
          v-if="GET_AXIOS_CALLBACK_GETTER.billNon"
          class="quest__content m-t-3"
        >
          <div
            v-for="(v, index) in GET_AXIOS_CALLBACK_GETTER.billNon"
            :key="index"
            class="box quest m-b-3"
            @click="onClickBillDetail(v.idx)"
          >
            <div class="flex">
              <div class="label blue">미납</div>
              <div class="flex-full m-l-2">
                <div class="flex m-t-0">
                  <div class="txt">
                    <p class="bold">{{ v.subject }}</p>
                    <span>
                      {{ v.code }}
                    </span>
                    <p class="bold">
                      {{ v.pay }}
                      <span v-if="LOGIN_STUDENT.t_reg_pay_unit">
                        {{ LOGIN_STUDENT.t_reg_pay_unit }}
                      </span>
                    </p>
                  </div>
                  <div class="pay text-right flex-right">
                    <!-- <button class="jelly-btn jelly-btn--default">
                      자세히 보기
                    </button> -->
                  </div>
                </div>
                <div class="m-t-2 jelly-color--888 limit limit-3">
                  {{ v.content }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="account">
          <h3>완납 고지서</h3>
          <div
            v-if="GET_AXIOS_CALLBACK_GETTER.billComplete"
            class="quest__content m-t-3"
          >
            <div
              v-for="(v, index) in GET_AXIOS_CALLBACK_GETTER.billComplete"
              :key="index"
              class="box quest m-b-3"
              @click="onClickBillDetail(v.idx)"
            >
              <div class="flex">
                <div class="label gray">완납</div>
                <div class="flex-full m-l-2">
                  <div class="flex m-t-0">
                    <div class="txt">
                      <p class="bold">{{ v.subject }}</p>
                      <span>
                        {{ v.code }}
                      </span>
                      <p class="bold">
                        {{ v.pay }}
                        <span v-if="LOGIN_STUDENT.t_reg_pay_unit">
                          {{ LOGIN_STUDENT.t_reg_pay_unit }}
                        </span>
                      </p>
                    </div>
                    <div class="pay text-right flex-right">
                      <!-- <button class="jelly-btn jelly-btn--default">
                      자세히 보기
                    </button> -->
                    </div>
                  </div>
                  <div class="m-t-2 jelly-color--888 limit limit-3">
                    {{ v.content }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="billDetail" size="lg" hide-footer hide-header>
      <h4>고지서 금액만큼 납부 할까요?</h4>
      <div class="m-t-5 flex text-center">
        <button
          class="jelly-btn jelly-btn--default flex-full m-r-1"
          @click="$bvModal.hide('billDetail')"
        >
          취소
        </button>
        <button
          class="jelly-btn jelly-btn--pink flex-full m-l-1"
          @click="onSubmit"
        >
          납부
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  name: 'TodoList',
  layout: 'default-mo',
  data() {
    return {
      params: {},
      paramsPost: {},
      detailIdx: '',
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
    this.params.type = 'billListStudent'
    this.params.cate_idx = 2
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations([]),

    // EVENT
    onClickBillDetail(idx) {
      this.detailIdx = idx
      this.$bvModal.show('billDetail')
    },
    onSubmit() {
      console.log(this.detailIdx)
      this.paramsPost.type = 'billListStudent'
      this.paramsPost.idx = this.detailIdx
      this.paramsPost.sms_idx = this.LOGIN_STUDENT.sms_idx
      this.paramsPost.smt_idx = this.LOGIN_STUDENT.smt_idx
      this.POST_AXIOS(this.paramsPost)
      setTimeout(() => {
        this.params = this.LOGIN_STUDENT
        this.params.type = 'billListStudent'
        this.GET_AXIOS(this.params)
        this.$bvModal.hide('billDetail')
      }, 1000)
    },
  },
}
</script>

<style lang="scss"></style>
