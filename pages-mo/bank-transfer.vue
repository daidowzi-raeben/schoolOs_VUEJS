<template>
  <div id="school-content">
    <div>
      <div class="">
        <select v-if="GET_AXIOS_CALLBACK_GETTER.studentList" ref="sendStudent">
          <option
            v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.studentList"
            :key="i"
            :value="v.idx"
          >
            {{ v.reg_name }}
          </option>
        </select>
      </div>
      <div>
        <div v-if="GET_AXIOS_CALLBACK_GETTER.account">
          {{
            Number(
              GET_AXIOS_CALLBACK_GETTER.account.PtotalAccount -
                GET_AXIOS_CALLBACK_GETTER.account.MtotalAccount
            ) | comma
          }}
        </div>
        <input v-model="accountPrice" type="tel" class="jelly-text" />
        <Span>{{ accountPrice | comma }}</Span>
      </div>
      <button @click="onSubmit">전송</button>
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
      paramsPost: {},
      accountPrice: 0,
      accountNumber: '',
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
    this.params.type = 'bankTransfer'
    this.params.page = 1
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations([]),

    // EVENT
    onSubmit() {
      const myPrice = Number(
        this.GET_AXIOS_CALLBACK_GETTER.account.PtotalAccount -
          this.GET_AXIOS_CALLBACK_GETTER.account.MtotalAccount
      )
      if (this.accountPrice > myPrice) {
        alert('?????????')
      } else {
        alert('send_sms_idx')
        this.paramsPost = this.LOGIN_STUDENT
        this.paramsPost.type = 'bankTransfer'
        this.paramsPost.send_sms_idx = this.$refs.sendStudent.value
        this.paramsPost.pay = this.accountPrice
        console.log(this.paramsPost.send_sms_idx)
        this.POST_AXIOS(this.paramsPost)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
