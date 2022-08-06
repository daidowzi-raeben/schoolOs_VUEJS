<template>
  <div>
    <!-- <div>
      <input v-model="pay" class="jelly-text" />
      <button @click="onSubmit">빌리기</button>
    </div> -->
    <div class="">
      <div id="jellyAdminheader" style="padding-top: 0vh">
        <!-- <span>{{ today }}</span> -->
        <h1 v-if="LOGIN_TEACHER">
          <!-- {{ LOGIN_TEACHER.reg_country }} 규칙관리 -->
          <!-- <span v-b-tooltip.hover title="현재 재산" class="spanBox">
            ㅁㄴㅇ
          </span> -->
        </h1>
        <div class="student form">
          <div class="student__list">
            <div class="flex m-t-3">
              <div
                class="item"
                style="width: 100%; background: #fff; color: #000"
              >
                <table class="jelly-table">
                  <col style="width: 80px" />
                  <col style="width: auto" />
                  <col style="width: 100px" />
                  <col style="width: auto" />
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
                  <tr
                    v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.rules"
                    :key="i"
                  >
                    <td class="text-center">
                      <input
                        :ref="`sort${i + 1}`"
                        type="text"
                        class="jelly-text wd-full"
                        style="color: #000"
                        :value="v.sort"
                        @input="inputRuleNum($event, i + 1)"
                      />
                    </td>
                    <td>
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
  },
}
</script>

<style scoped>
.quillWrapper {
  color: unset !important;
}
</style>
