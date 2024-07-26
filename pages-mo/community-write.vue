<template>
  <div id="school-content">
    <!-- <div v-if="LOADING" id="LOADING">
        <img src="~/static/img/loading.gif" />
      </div> -->
    <div class="historyBack m-l-3 m-b-5">
      <b-icon icon="arrow-left" onclick="history.back()"></b-icon>
    </div>
    {{ params }}
    <div class="content">
      <div class="m-t-1 h60">
        <div class="account">
          <div class="quest__content m-t-3">
            <div class="box quest m-b-3">
              <div class="m-l-3 m-r-3 m-t-5">
                <p>항목 선택</p>
                <select
                  refs="communityCategory"
                  class="jelly-text jelly-text--h wd-full m-t-2"
                >
                  <option
                    v-for="(v, i) in category"
                    :key="i"
                    :value="v.code"
                    :selected="v.code === cateCode ? true : false"
                  >
                    {{ v.title }}
                  </option>
                </select>
                {{ category.title }}
                <p class="m-t-3">제목</p>
                <input
                  v-model="params.subject"
                  class="jelly-text jelly-text--h wd-full m-t-2"
                />
                <p class="m-t-3">내용</p>
                <textarea
                  v-model="params.content"
                  class="jelly-text m-t-2 jelly-text--h wd-full"
                  style="height: 150px"
                ></textarea>
                <div v-if="cateCode === 'S'" class="m-t-3">
                  <p v-if="LOGIN_STUDENT" class="m-t-3">
                    글을 작성하려면
                    <em v-if="GET_AXIOS_CALLBACK_GETTER">
                      {{ GET_AXIOS_CALLBACK_GETTER.pay | comma }} </em
                    >{{ LOGIN_STUDENT.t_reg_pay_unit }} 만큼 지불해야 해요
                  </p>
                </div>
                <div class="m-t-3">
                  <button
                    class="jelly-btn jelly-btn--pink wd-full"
                    :disabled="is_write"
                    @click="onClickSubmit"
                  >
                    {{ mode === 'w' ? '작성하기' : '수정하기' }}
                  </button>
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
// import { historyBack } from '~/config/util'

export default {
  components: {},
  data() {
    return {
      params: {
        categoty: 'S',
        subject: '',
        content: '',
      },
      paramsPost: {},
      value: 4,
      is_write: false,
      mode: 'w',
      category: [
        { title: '우리끼리', code: 'S' },
        { title: '선생님께', code: 'T' },
      ],
      cateCode: 'S',
      paramsAuth: {},
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
    this.LOGIN_CONFIG = JSON.parse(localStorage.getItem('STUDENT'))
    console.log(this.$nuxt, this.$config)
    console.log(this.$route.query.mode)
    this.$route.query.mode === 'T'
      ? (this.cateCode = 'T')
      : (this.cateCode = 'S')
    console.log('this.cateCode', this.cateCode)
    this.params = this.LOGIN_STUDENT
    this.paramsAuth.smt_idx = this.LOGIN_STUDENT.smt_idx
    this.paramsAuth.type = 'communityAuth'
    this.GET_AXIOS(this.paramsAuth)
    this.params.subject = ''
    this.params.content = ''
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    onClick() {
      console.log(0)
    },
    onClickSubmit() {
      if (confirm('등록할까요?')) {
        this.LOADING_TRUE()
        const frm = new FormData()
        frm.append('type', 'communityInsert')
        frm.append('subject', this.params.subject)
        frm.append('content', this.params.content)
        frm.append('category', this.cateCode)
        frm.append('sc_idx', this.GET_AXIOS_CALLBACK_GETTER.idx)
        frm.append('sms_idx', this.LOGIN_STUDENT.sms_idx)
        console.log(frm)
        // axiosForm(frm, '/student.php')
        this.$axios
          .post('https://api.school-os.net' + '/student.php', frm, {
            header: {
              'Context-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            alert('등록되었어요')
            this.$route.query.mode === 'T'
              ? this.$router.push('/community-teacher-list')
              : this.$router.push('/community-list')

            console.log(res.data)
          })
          .catch((res) => {
            console.error('AXIOS FALSE', res)
          })
      } else {
        console.log(this.GET_AXIOS_CALLBACK_GETTER.idx)
        return false
      }
    },
  },
}
</script>

<style lang="scss"></style>
