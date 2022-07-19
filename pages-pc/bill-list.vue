<template>
  <div>
    <div class="">
      <div id="jellyAdminheader" style="padding-top: 0vh">
        <!-- <span>{{ today }}</span> -->
        <h1 v-if="LOGIN_TEACHER" class="">
          세금관리
          <span
            class="spanBox m-l-2"
            style="color: #fff; font-size: 12px"
            @click="onClickBillInsert"
          >
            +
          </span>
        </h1>
        <div class="student form">
          <div class="student__list">
            <div v-if="GET_AXIOS_CALLBACK_GETTER.billList" class="m-t-3">
              <div
                v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.billList"
                :key="i"
                class="item"
                style="width: 33%"
              >
                <div class="">
                  <span style="font-size: 12px">
                    [납부완료] {{ v.cate_name }}
                  </span>
                  <p class="title">
                    {{ v.subject }}
                  </p>
                </div>
                <div>{{ v.code }}</div>
                <div
                  class="m-t-3 text-right"
                  style="font-size: 20px; font-weight: bold"
                >
                  {{ v.pay | comma }} {{ LOGIN_TEACHER.reg_pay_unit }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="billInsert" size="lg" hide-footer hide-header>
      <div>
        <div class="">
          <div class="flex">
            <div class="flex-full m-r-1">
              <p>구분</p>
              <select
                v-if="GET_AXIOS_CALLBACK_GETTER.billCateList"
                v-model="billCateList"
                class="jelly-text wd-full"
              >
                <option :value="null">선택하세요</option>
                <option
                  v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.billCateList"
                  :key="i"
                  :value="v.idx"
                >
                  {{ v.subject }}
                </option>
              </select>
            </div>
            <div class="flex-full m-l-1">
              <p>제목</p>
              <input
                v-model="billSubject"
                type="text"
                class="jelly-text wd-full"
              />
            </div>
          </div>
        </div>
        <div class="m-t-5">
          <div class="flex-full m-l-1">
            <p>금액</p>
            <input v-model="billPay" type="text" class="jelly-text wd-full" />
          </div>
        </div>
        <div class="m-t-5 text-center">
          <button
            class="jelly-btn jelly-btn--default"
            @click="$bvModal.hide('billInsert')"
          >
            닫기
          </button>
          <button class="jelly-btn jelly-btn--pink" @click="onSubmit">
            납부하기
          </button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  layout: 'default-pc',
  data() {
    return {
      params: {},
      paramsPost: {},
      billCateList: null,
      billPay: 0,
      billSubject: '',
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
    this.params.type = 'billList'
    this.GET_AXIOS(this.params)
    // billCateList
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations([]),

    // EVENT
    onClickBillInsert() {
      this.billCateList = null
      this.billPay = 0
      this.billSubject = ''
      this.$bvModal.show('billInsert')
    },
    onSubmit() {
      this.paramsPost = this.LOGIN_TEACHER
      this.paramsPost.type = 'billList'
      this.paramsPost.billCateList = this.billCateList
      this.paramsPost.billPay = this.billPay
      this.paramsPost.billSubject = this.billSubject
      this.POST_AXIOS(this.paramsPost)

      setTimeout(() => {
        this.params = this.LOGIN_TEACHER
        this.params.type = 'billList'
        this.GET_AXIOS(this.params)
        this.$bvModal.hide('billInsert')
      }, 1500)
    },
  },
}
</script>

<style lang="scss"></style>
