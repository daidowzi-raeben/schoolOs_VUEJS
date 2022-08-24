<template>
  <div>
    <!-- <div>
      <input v-model="pay" class="jelly-text" />
      <button @click="onSubmit">빌리기</button>
    </div> -->
    <div class="">
      <div class="flex">
        <h4 v-if="LOGIN_TEACHER">규칙관리</h4>
        <div class="flex-right">
          <button
            v-if="!GET_AXIOS_CALLBACK_GETTER.rules"
            class="jelly-btn jelly-btn--default"
            @click="onClickAutoRule"
          >
            벌칙 자동 생성
          </button>
          <button class="jelly-btn jelly-btn--default">카테고리 추가</button>
        </div>
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
          <span v-if="GET_AXIOS_CALLBACK_GETTER.rulesCate">
            <span
              v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.rulesCate"
              :key="`cate${i}`"
              class="spanBox m-r-2"
              :class="queryCate == v.idx ? 'is_active' : ''"
              @click="onClickCategory(v.idx)"
            >
              {{ v.content }}
            </span>
          </span>
        </div>
      </div>
      <div class="student form">
        <div class="student__list">
          <div class="flex m-t-3">
            <table class="jelly-table">
              <col style="width: 80px" />
              <col style="width: auto" />
              <col style="width: 80px" />
              <col style="width: 200px" />
              <col style="width: 170px" />
              <tr>
                <th>번호</th>
                <th>규칙</th>
                <th>벌금</th>
                <th>벌칙</th>
                <th>관리</th>
              </tr>
              <tr>
                <td class="text-center">
                  <input
                    v-model="ruleNum[0]"
                    type="text"
                    class="jelly-text wd-full"
                    style="color: #000"
                  />
                </td>
                <td>
                  <input
                    v-model="ruleSubject[0]"
                    type="text"
                    class="jelly-text wd-full"
                    style="color: #000"
                  />
                </td>
                <td>
                  <input
                    v-model="rulePay[0]"
                    type="text"
                    class="jelly-text wd-full text-right"
                    style="color: #000"
                  />
                </td>
                <td>
                  <input
                    v-model="rulePenalty[0]"
                    type="text"
                    class="jelly-text wd-full"
                    style="color: #000"
                  />
                </td>
                <td>
                  <button
                    class="jelly-btn jelly-btn--pink wd-full"
                    @click="onSubmit"
                  >
                    등록
                  </button>
                </td>
              </tr>
              <tr v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.rules" :key="i">
                <td class="text-center" style="display: none">
                  <input
                    :ref="`sort${i + 1}`"
                    type="text"
                    class="jelly-text wd-full"
                    style="color: #000"
                    :value="v.sort"
                    @input="inputRuleNum($event, i + 1)"
                  />
                </td>
                <td colspan="2">
                  <input
                    :ref="`subject${i + 1}`"
                    type="text"
                    class="jelly-text wd-full"
                    style="color: #000"
                    :value="v.subject"
                    @input="inputRuleSubject($event, i + 1)"
                  />
                </td>
                <td>
                  <input
                    :ref="`penalty${i + 1}`"
                    type="text"
                    class="jelly-text wd-full text-right"
                    style="color: #000"
                    :value="v.penalty"
                    @input="inputRulePay($event, i + 1)"
                  />
                </td>
                <td>
                  <input
                    :ref="`penalty_etc${i + 1}`"
                    type="text"
                    class="jelly-text wd-full"
                    style="color: #000"
                    :value="v.penalty_etc"
                    @input="inputRulePenalty($event, i + 1)"
                  />
                </td>
                <td>
                  <button
                    class="jelly-btn jelly-btn--default"
                    @click="onSubmitDelete(i + 1, v.idx)"
                  >
                    삭제
                  </button>
                  <button
                    class="jelly-btn jelly-btn--default"
                    @click="onSubmitEdit(i + 1, v.idx)"
                  >
                    수정
                  </button>
                </td>
              </tr>
            </table>
            <!-- <vue-editor v-model="ruleContent"> </vue-editor>
                <div class="text-center m-t-5">
                  <button
                    class="jelly-btn jelly-btn--pink lg"
                    @click="onSubmit"
                  >
                    등록하기
                  </button>
                </div> -->
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
      ruleContent: '',
      params: {},
      paramsPost: {},
      ruleLength: 1,
      ruleNum: [],
      ruleSubject: [],
      rulePay: [],
      rulePenalty: [],
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
        this.params.type = 'rule'

        if (value) {
          this.queryCate = value
          this.params = this.LOGIN_TEACHER
          this.params.queryCate = value
          this.params.type = 'rule'
          this.GET_AXIOS(this.params)
        } else {
          this.params.queryCate = null
          this.queryCate = null
          this.params = this.LOGIN_TEACHER
          this.params.type = 'rule'
          this.GET_AXIOS(this.params)
        }
      },
      immediate: false,
    },
  },
  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },
  mounted() {
    //   DATA INIT
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_TEACHER
    this.params.type = 'rule'
    this.GET_AXIOS(this.params)
    // setTimeout(() => {
    //   this.ruleContent = this.GET_AXIOS_CALLBACK_GETTER.content
    // }, 1000)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // event
    onSubmit() {
      this.paramsPost = this.LOGIN_TEACHER
      this.paramsPost.type = 'rule'
      this.paramsPost.subject = this.ruleSubject[0]
      this.paramsPost.penalty = this.rulePay[0]
      this.paramsPost.penalty_etc = this.rulePenalty[0]
      this.paramsPost.sort = this.ruleNum[0]
      this.POST_AXIOS(this.paramsPost)
      setTimeout(() => {
        alert('저장되었습니다.')
        this.params = this.LOGIN_TEACHER
        this.params.type = 'rule'
        this.GET_AXIOS(this.params)
      }, 1500)
    },
    onClickRuleAdd() {
      this.ruleLength++
    },
    inputRuleNum(e, i) {
      console.log(e.target.value, i, this.$refs[`subject${i}`][0].value)
    },
    inputRuleSubject(e, i) {
      console.log(e.target.value, i)
    },
    inputRulePay(e, i) {
      console.log(e.target.value, i)
    },
    inputRulePenalty(e, i) {
      console.log(e.target.value, i)
    },
    onSubmitDelete(i, idx) {
      if (confirm('삭제하시겠습니까?')) {
        this.paramsPost = this.LOGIN_TEACHER
        this.paramsPost.type = 'ruleDel'
        this.paramsPost.idx = idx
        this.POST_AXIOS(this.paramsPost)
        setTimeout(() => {
          alert('삭제되었습니다.')
          this.params = this.LOGIN_TEACHER
          this.params.type = 'rule'
          this.GET_AXIOS(this.params)
        }, 1500)
      } else {
        return false
      }
    },
    onSubmitEdit(i, idx) {
      if (confirm('수정하시겠습니까?')) {
        this.paramsPost = this.LOGIN_TEACHER
        this.paramsPost.type = 'ruleEdit'
        this.paramsPost.idx = idx
        this.paramsPost.subject = this.$refs[`subject${i}`][0].value
        this.paramsPost.penalty = this.$refs[`penalty${i}`][0].value
        this.paramsPost.penalty_etc = this.$refs[`penalty_etc${i}`][0].value
        this.paramsPost.sort = this.$refs[`sort${i}`][0].value
        this.POST_AXIOS(this.paramsPost)
        setTimeout(() => {
          alert('수정되었습니다.')
          this.params = this.LOGIN_TEACHER
          this.params.type = 'rule'
          this.GET_AXIOS(this.params)
        }, 1500)
      } else {
        return false
      }
    },
    onClickAutoRule() {
      this.LOADING_TRUE()
      const frm = new FormData()
      frm.append('smt_idx', this.LOGIN_TEACHER.smt_idx)
      frm.append('type', 'ruleAuto')

      this.$axios
        .post(process.env.VUE_APP_API + '/teacher.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res)
          setTimeout(() => {
            this.params = this.LOGIN_TEACHER
            this.params.type = 'rule'
            this.GET_AXIOS(this.params)
          })
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },
    onClickCategory(e) {
      if (e) {
        this.$router.push(`/rule-detail?cate=${e}`)
      } else {
        this.queryCate = null
        this.$router.push(`/rule-detail`)
      }
    },
  },
}
</script>

<style scoped>
.quillWrapper {
  color: unset !important;
}
</style>
