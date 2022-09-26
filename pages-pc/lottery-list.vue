<template>
  <div>
    <div class="">
      <div class="flex">
        <h4 v-if="LOGIN_TEACHER" class="is_active">젤리복권 구매내역</h4>
      </div>
      <div id="jellyAdminheader" style="padding-top: 0vh">
        <div class="student form">
          <div class="student__list">
            <div class="m-t-3">
              <table
                v-if="GET_AXIOS_CALLBACK_GETTER.lottoList"
                class="jelly-table"
              >
                <template v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.lottoList">
                  <tr :key="`list${i}`">
                    <th>
                      {{ Number(GET_AXIOS_CALLBACK_GETTER.total) - i }}회차
                      <!-- {{ i }} -->
                    </th>
                    <th>
                      <span v-if="v.status === '1'">
                        <b-badge pill variant="primary" class="m-r-2">{{
                          v.num1
                        }}</b-badge>
                        <b-badge pill variant="success" class="m-r-2">{{
                          v.num2
                        }}</b-badge>
                        <b-badge pill variant="danger" class="m-r-2">{{
                          v.num3
                        }}</b-badge>
                        <b-badge pill variant="warning" class="m-r-2">{{
                          v.num4
                        }}</b-badge>
                        <b-badge pill variant="info">{{ v.num5 }}</b-badge>
                      </span>
                      <span v-else> {{ v.end_day }} 15시 발표 예정 </span>
                    </th>
                    <th colspan="2">
                      판매기간 {{ v.start_day }} ~ {{ v.end_day }}
                    </th>
                  </tr>
                  <tr
                    v-for="(item, k) in v.lottoStudent"
                    :key="`student${item.idx}`"
                  >
                    <td>{{ item.reg_name }} ({{ item.reg_id }})</td>
                    <td class="text-center">
                      <b-badge pill variant="primary" class="m-r-2">{{
                        item.num1
                      }}</b-badge>
                      <b-badge pill variant="success" class="m-r-2">{{
                        item.num2
                      }}</b-badge>
                      <b-badge pill variant="danger" class="m-r-2">{{
                        item.num3
                      }}</b-badge>
                      <b-badge pill variant="warning" class="m-r-2">{{
                        item.num4
                      }}</b-badge>
                      <b-badge pill variant="info">{{ item.num5 }}</b-badge>
                    </td>
                    <td>{{ item.datetime | moment('YY.MM.DD') }} 구입</td>
                    <td>
                      <span v-if="v.status === '1'">
                        {{ item.cnt === '5' ? '1등' : '' }}
                        {{ item.cnt === '4' ? '2등' : '' }}
                        {{ item.cnt === '3' ? '3등' : '' }}
                        {{ item.cnt === '2' ? '4등' : '' }}
                        {{ item.cnt === '1' ? '낙첨' : '' }}
                        {{ item.cnt === '0' ? '낙첨' : '' }}
                      </span>
                    </td>
                  </tr>
                </template>
              </table>
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
    this.params.type = 'lottoList'
    console.log('===========================', this.params)
    this.GET_AXIOS(this.params)
    // billCateList
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT
    payComma(e) {
      this.billPay = this.comma(this.uncomma(e.target.value))
    },
    comma(str) {
      str = String(str)
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
    },
    uncomma(str) {
      str = String(str)
      return str.replace(/[^\d]+/g, '')
    },
    resetInput(e) {
      e.target.value = ''
    },
  },
}
</script>

<style lang="scss"></style>
