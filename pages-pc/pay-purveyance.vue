<template>
  <div>
    <div>
      <select v-model="status">
        <option value="0">지급</option>
        <option value="1">차감</option>
      </select>
      <select v-if="GET_AXIOS_CALLBACK_GETTER" v-model="paySmsIdx">
        <option>선택</option>
        <option
          v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER"
          :key="i"
          :value="v.sms_idx"
        >
          {{ v.reg_name }}
        </option>
      </select>
    </div>
    <input v-model="pay" type="tel" class="jelly-text" />
    <input
      v-model="payContent"
      type="tel"
      class="jelly-text"
      placeholder="메모"
    />
    <button @click="onSubmit">전송</button>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  layout: 'default-pc',
  data() {
    return {
      params: {},
      paramsForm: {},
      status: 0,
      pay: 0,
      paySmsIdx: 0,
      payContent: '',
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
    this.params.type = 'studentList'
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT
    onSubmit() {
      this.paramsForm = this.LOGIN_TEACHER
      this.paramsForm.type = 'payPurveyanceEtc'
      this.paramsForm.paySmsIdx = this.paySmsIdx
      this.paramsForm.pay = this.pay
      this.paramsForm.status = this.status
      this.paramsForm.payContent = this.payContent
      console.log('onSubmit', this.paramsForm)
      this.POST_AXIOS(this.paramsForm)
    },
  },
}
</script>

<style lang="scss" scoped>
* {
  color: #ccc;
}
</style>
