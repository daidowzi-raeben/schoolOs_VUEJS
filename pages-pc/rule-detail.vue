<template>
  <div>
    <!-- <div>
      <input v-model="pay" class="jelly-text" />
      <button @click="onSubmit">빌리기</button>
    </div> -->
    <div class="">
      <div class="flex">
        <h4 v-if="LOGIN_TEACHER" class="is_active">규칙설정</h4>
        <div class="flex-right">
          <button
            class="jelly-btn jelly-btn--default"
            @click="$bvModal.show('ModalNotice')"
          >
            규칙 전체 보기
          </button>
          <button
            v-if="!GET_AXIOS_CALLBACK_GETTER.rules"
            class="jelly-btn jelly-btn--default"
            @click="onClickAutoRule"
          >
            규칙 자동 생성
          </button>
          <button v-b-modal.cateInsert class="jelly-btn jelly-btn--default">
            카테고리 추가
          </button>
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
              <col style="width: 150px" />
              <col style="width: auto" />
              <col style="width: 80px" />
              <col style="width: 200px" />
              <col style="width: 170px" />
              <tr>
                <th>번호</th>
                <th>구분</th>
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
                <td class="text-center">
                  <!-- <input
                    v-model="ruleCate[0]"
                    type="text"
                    class="jelly-text wd-full"
                    style="color: #000"
                  /> -->
                  <select
                    v-if="GET_AXIOS_CALLBACK_GETTER.rulesCate"
                    ref="ruleCate"
                    class="jelly-text wd-full"
                  >
                    <option
                      v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.rulesCate"
                      :key="i"
                      :value="v.idx"
                    >
                      {{ v.content }}
                    </option>
                  </select>
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
                <td class="text-center">
                  <!-- <input
                    v-model="ruleCate[0]"
                    type="text"
                    class="jelly-text wd-full"
                    style="color: #000"
                  /> -->
                  <select
                    v-if="GET_AXIOS_CALLBACK_GETTER.rulesCate"
                    :ref="`cate${i + 1}`"
                    class="jelly-text wd-full"
                  >
                    <option
                      v-for="z in GET_AXIOS_CALLBACK_GETTER.rulesCate"
                      :key="z.idx"
                      :value="z.idx"
                      :selected="v.src_idx == z.idx"
                    >
                      {{ z.content }}
                    </option>
                  </select>
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
    <b-modal id="ModalNotice" size="lg" hide-footer hide-header>
      <div class="img-full">
        <ul>
          <li
            v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.rulesAll"
            :key="i"
            class="m-b-2 p-b-2"
            style="border-bottom: 1px solid #eee"
          >
            <div class="font-16 bold">{{ i + 1 }}조. {{ v.content }}</div>
            <div
              v-for="(k, e) in v.ruleContentAll"
              :key="k.idx"
              style="padding: 10px"
            >
              <div class="font-14">{{ e + 1 }}항. {{ k.subject }}</div>
              <div v-if="LOGIN_TEACHER" class="m-t-1 jelly-color--888 font-12">
                {{ k.penalty | comma }}
                {{ LOGIN_TEACHER.t_reg_pay_unit }}
                {{ k.penalty_etc ? ' / ' + k.penalty_etc : '' }}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="m-t-3">
        <button
          class="jelly-btn jelly-btn--default wd-full"
          @click="$bvModal.hide('ModalNotice')"
        >
          닫기
        </button>
      </div>
    </b-modal>
    <b-modal
      id="cateInsert"
      ref="ref-cateInsert"
      size="lg"
      hide-footer
      hide-header
    >
      <div class="">
        <p>카테고리 이름</p>
        <input v-model="cate_name" type="text" class="jelly-text wd-full" />
      </div>
      <div class="m-t-5 text-center">
        <button
          class="jelly-btn jelly-btn--default"
          @click="$bvModal.hide('cateInsert')"
        >
          닫기
        </button>
        <button class="jelly-btn jelly-btn--pink" @click="onSubmitCate">
          등록하기
        </button>
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
      ruleContent: '',
      params: {},
      paramsPost: {
        penalty_etc: '',
        penalty: 0,
        sort: 1,
      },
      ruleLength: 1,
      ruleNum: [],
      ruleCate: [],
      ruleSubject: [],
      rulePay: [],
      rulePenalty: [],
      queryCate: null,
      cate_name: '',
      cateForm: {},
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
    // this.ruleCate[0] = 7
    this.initAxios()
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
      this.ruleCate[0] = this.$refs.ruleCate.value
      this.paramsPost.type = 'rule'
      this.paramsPost.subject = this.ruleSubject[0]
      if (this.rulePay[0]) {
        this.paramsPost.penalty = this.rulePay[0]
      } else {
        // return alert('벌금을 입력하세요')
        this.paramsPost.penalty = 0
      }
      if (this.rulePenalty[0]) {
        this.paramsPost.penalty_etc = this.rulePenalty[0]
      } else {
        this.paramsPost.penalty_etc = ''
      }
      if (this.ruleNum[0]) {
        this.paramsPost.sort = this.ruleNum[0]
      } else {
        // return alert('번호를 입력하세요')
        this.paramsPost.sort = 1
      }
      this.paramsPost.ruleCate = this.ruleCate[0]
      console.log('::::::::', this.paramsPost)
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
        this.paramsPost.cate = this.$refs[`cate${i}`][0].value
        console.log(';;;;;;;', this.paramsPost)
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
        this.params.queryCate = null
        this.queryCate = ''
        this.$router.push(`/rule-detail`)
        this.initAxios()
      }
    },

    onSubmitCate() {
      this.cateForm.subject = this.cate_name
      this.cateForm.smt_idx = this.LOGIN_TEACHER.smt_idx
      this.cateForm.type = 'cateRuleWrite'
      this.POST_AXIOS(this.cateForm)

      this.$bvModal.hide('cateInsert')
      setTimeout(() => {
        this.initAxios()
      }, 1000)
    },
    async initAxios() {
      this.params = this.LOGIN_TEACHER
      this.params.type = 'rule'
      await this.GET_AXIOS(this.params)
    },
  },
}
</script>

<style scoped>
.quillWrapper {
  color: unset !important;
}
</style>
