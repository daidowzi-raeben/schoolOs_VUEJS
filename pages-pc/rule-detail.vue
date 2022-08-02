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
                <div class="text-right">
                  <span @click="onClickRuleAdd">+</span>
                  <span @click="onClickRuleRemove">-</span>
                </div>
                <table class="jelly-table">
                  <col style="width: 80px" />
                  <col style="width: auto" />
                  <col style="width: 100px" />
                  <col style="width: auto" />
                  <tr>
                    <th>번호</th>
                    <th>규칙</th>
                    <th>벌금</th>
                    <th>벌칙</th>
                  </tr>
                  <tr v-for="(v, i) in ruleLength" :key="i" :ref="`rule${i}`">
                    <td class="text-center">{{ i + 1 }}</td>
                    <td>
                      <input
                        v-model="ruleSubject[i]"
                        type="text"
                        class="jelly-text wd-full"
                        style="color: #000"
                      />
                    </td>
                    <td>
                      <input
                        v-model="rulePay[i]"
                        type="text"
                        class="jelly-text wd-full text-right"
                        style="color: #000"
                      />
                    </td>
                    <td>
                      <input
                        v-model="rulePenalty[i]"
                        type="text"
                        class="jelly-text wd-full"
                        style="color: #000"
                      />
                    </td>
                  </tr>
                </table>
                {{ ruleSubject }}
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
    setTimeout(() => {
      this.ruleContent = this.GET_AXIOS_CALLBACK_GETTER.content
    }, 1000)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // event
    onSubmit() {
      this.paramsPost = this.LOGIN_TEACHER
      this.paramsPost.type = 'rule'
      this.paramsPost.bd_content = this.ruleContent
      this.POST_AXIOS(this.paramsPost)
      setTimeout(() => {
        alert('저장되었습니다.')
      })
    },
    onClickRuleAdd() {
      this.ruleLength++
    },
    onClickRuleRemove(i) {
      this.ruleLength--
    },
  },
}
</script>

<style scoped>
.quillWrapper {
  color: unset !important;
}
</style>
