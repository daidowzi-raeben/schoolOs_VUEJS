<template>
  <div>
    <div>
      <div class="">
        <h4>신규 소식</h4>
      </div>
      <div class="flex">
        <div class="student__list flex">
          <div class="item">
            <p class="title" style="color: #111">미 검사</p>
            <div class="text-right">
              <strong class="font-20">
                <em>00</em>
              </strong>
              건
            </div>
          </div>
          <div class="item">
            <p class="title" style="color: #111">신고접수</p>
            <div class="text-right">
              <strong class="font-20">
                <em>00</em>
              </strong>
              건
            </div>
          </div>
          <div class="item">
            <p class="title" style="color: #111">현재자산</p>
            <div class="text-right">
              <strong class="font-20">
                <em>123,123</em>
              </strong>
              루피
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-t-10">
      <div class="">
        <h4>출결관리</h4>
      </div>
      <MainCalendar />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import MainCalendar from '~/components-pc/MainCalendar'
export default {
  name: 'IndexPage',
  components: { MainCalendar },
  layout: 'default-pc',
  data() {
    return {
      LOGIN_CONFIG: {},
      params: {},
      studentName: [
        '민준',
        '서준',
        '도윤',
        '예준',
        '시우',
        '하준',
        '주원',
        '지호',
      ],
      today: '',
      isReadLength: 0,
      totalPay: {
        list: {},
      },
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
    // console.log(this.$nuxt, this.$config)
    this.LOGIN_CONFIG = JSON.parse(localStorage.getItem('TEACHER'))
    console.log(this.$nuxt, this.$config, this.LOGIN_CONFIG)
    this.params = this.LOGIN_CONFIG
    this.params.type = 'main'
    this.GET_AXIOS(this.params)

    this.today = this.getToday()
    // console.log('================', this.isNoticeLength())
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    // ...mapMutations(),

    getToday() {
      const date = new Date()
      const year = date.getFullYear()
      const month = ('0' + (1 + date.getMonth())).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      return year + '.' + month + '.' + day
    },

    // isNoticeLength() {
    //   setTimeout(() => {
    //     const data = this.GET_AXIOS_CALLBACK_GETTER.notice
    //     data.forEach((element) => {
    //       console.log(element)
    //     })
    //   })
    // },
    onClickTeacherPayList() {
      const frm = new FormData()
      frm.append('type', 'teacherPayList')
      frm.append('smt_idx', this.LOGIN_CONFIG.smt_idx)
      this.$axios
        .post(process.env.VUE_APP_API + '/teacher.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res.data)
          this.totalPay.list = res.data.teacherPayList
          this.$bvModal.show('teacherPayList')
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },
  },
}
</script>

<style lang="scss"></style>
