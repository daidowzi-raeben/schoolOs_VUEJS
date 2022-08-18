<template>
  <div>
    <div class="">
      <div class="flex">
        <h4 v-if="LOGIN_TEACHER">고지서 관리</h4>
        <div class="flex-right">
          <button
            class="jelly-btn jelly-btn--default"
            @click="onClickBillInsert"
          >
            고지서 추가
          </button>
        </div>
      </div>
      <div id="jellyAdminheader" style="padding-top: 0vh">
        <div>
          <div class="m-t-5">
            <span
              class="spanBox m-r-2"
              :class="queryCate ? '' : 'is_active'"
              @click="onClickCategory('')"
              >전체</span
            >
            <span
              class="spanBox m-r-2"
              :class="queryCate === '1' ? 'is_active' : ''"
              @click="onClickCategory('1')"
              >미납</span
            >
          </div>
        </div>
        <div class="student form">
          <div class="student__list">
            <div v-if="GET_AXIOS_CALLBACK_GETTER.billList" class="m-t-3">
              <table class="jelly-table">
                <tr>
                  <th>상태</th>
                  <th>이름</th>
                  <th>고지서 번호</th>
                  <th>금액</th>
                  <th>제목</th>
                  <th>내용</th>
                </tr>
                <tr
                  v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.billList"
                  :key="i"
                >
                  <td>
                    <span v-if="v.status === '0'">[납부전]</span>
                    <span v-if="v.status === '1'" class="jelly-color--type4"
                      >[납부완료]</span
                    >
                  </td>
                  <td>{{ v.reg_name }}</td>
                  <td>{{ v.code }}</td>
                  <td>{{ v.pay | comma }} {{ LOGIN_TEACHER.reg_pay_unit }}</td>
                  <td>{{ v.subject }}</td>
                  <td style="background: #ffffcc">{{ v.content }}</td>
                </tr>
              </table>
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
              <p>학생선택</p>
              <select
                v-if="GET_AXIOS_CALLBACK_GETTER.studentList"
                v-model="billStudent"
                class="jelly-text wd-full"
              >
                <option value="all">전체발송</option>
                <option
                  v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.studentList"
                  :key="i"
                  :value="v.idx"
                >
                  {{ v.reg_name }}
                </option>
              </select>
            </div>
            <div class="flex-full m-r-1">
              <p>제목</p>
              <input
                v-model="billSubject"
                type="text"
                class="jelly-text wd-full"
              />
            </div>
            <div class="flex-full m-r-1">
              <p>금액</p>
              <input v-model="billPay" type="text" class="jelly-text wd-full" />
            </div>
          </div>
        </div>
        <div class="m-t-5">
          <div class="flex-full m-l-1">
            <p>내용</p>
            <textarea
              v-model="billContent"
              class="jelly-text wd-full"
              style="height: 150px"
              placeholder="간결하게 작성해 주세요"
            ></textarea>
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
            발송하기
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
      billStudent: 'all',
      billPay: 0,
      billSubject: '',
      billContent: '',
      queryCate: null,
    }
  },

  computed: {
    ...mapState(['LOGIN']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_TEACHER']),
  },
  watch: {
    '$route.query.cate': {
      handler(value) {
        console.log(value)
        this.queryCate = value
        this.params.type = 'billListStudent'
        this.params.queryCate = value
        if (this.queryCate) {
          this.params = this.LOGIN_TEACHER
          this.GET_AXIOS(this.params)
        } else {
          this.params = this.LOGIN_TEACHER
          this.GET_AXIOS(this.params)
        }
      },
      immediate: true,
    },
  },
  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },
  mounted() {
    //   DATA INIT
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_TEACHER
    this.params.type = 'billListStudent'
    this.GET_AXIOS(this.params)
    // billCateList
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT
    onClickBillInsert() {
      this.billCateList = null
      this.billPay = 0
      this.billSubject = ''
      this.$bvModal.show('billInsert')
    },
    onSubmit() {
      this.paramsPost = this.LOGIN_TEACHER
      this.paramsPost.type = 'billListStudent'
      this.paramsPost.billStudent = this.billStudent
      this.paramsPost.billPay = this.billPay
      this.paramsPost.billSubject = this.billSubject
      this.paramsPost.billContent = this.billContent
      this.POST_AXIOS(this.paramsPost)

      setTimeout(() => {
        this.params = this.LOGIN_TEACHER
        this.params.type = 'billListStudent'
        this.GET_AXIOS(this.params)
        this.$bvModal.hide('billInsert')
      }, 1500)
    },
    onClickCategory(e) {
      if (e) {
        this.$router.push(`/bill-student?cate=${e}`)
      } else {
        this.queryCate = null
        this.$router.push(`/bill-student`)
      }
    },
  },
}
</script>

<style lang="scss"></style>
