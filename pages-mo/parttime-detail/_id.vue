<template>
  <div id="school-content">
    <div v-if="LOADING" id="LOADING">
      <img src="~/static/img/loading.gif" />
    </div>
    <div class="historyBack m-l-3 m-b-5">
      <b-icon icon="arrow-left" onclick="history.back()"></b-icon>
    </div>
    <div class="content">
      <div class="m-t-1 h60">
        <div class="account">
          <div
            v-if="GET_AXIOS_CALLBACK_GETTER.albaDetail"
            class="quest__content m-t-3"
          >
            <div class="box quest m-b-3">
              <div class="flex">
                <div class="label blue">
                  <!-- {{ GET_AXIOS_CALLBACK_GETTER.albaDetail.subject }} -->
                </div>
                <div class="flex-full m-l-3 m-r-3">
                  <div class="flex m-t-0">
                    <div class="txt">
                      <p class="bold">
                        {{ GET_AXIOS_CALLBACK_GETTER.albaDetail.subject }}
                      </p>
                      <span
                        >{{
                          GET_AXIOS_CALLBACK_GETTER.albaDetail.start_day
                            | moment('YY.MM.DD')
                        }}
                        ~
                        {{
                          GET_AXIOS_CALLBACK_GETTER.albaDetail.end_day
                            | moment('YY.MM.DD')
                        }}</span
                      >
                    </div>
                    <div class="pay text-right flex-right">
                      <!-- <button class="jelly-btn jelly-btn--default">
                      자세히 보기
                    </button> -->
                    </div>
                  </div>
                  <!-- <div class="m-t-2 jelly-color--888 limit limit-3">
                    {{
                      GET_AXIOS_CALLBACK_GETTER.contents.replaceAll(
                        /\!\[|\].*.[)]/g,
                        ''
                      )
                    }}
                  </div> -->
                  <div class="m-t-2 flex flex-full">
                    <div>
                      알바비
                      <strong class="bold font-18 m-l-1"
                        ><em>{{
                          GET_AXIOS_CALLBACK_GETTER.albaDetail.pay | comma
                        }}</em></strong
                      >
                      <span v-if="LOGIN_STUDENT.t_reg_pay_unit">{{
                        LOGIN_STUDENT.t_reg_pay_unit
                      }}</span>
                    </div>
                    <div class="flex-right">
                      <span
                        class="jelly-point m-t-0 jelly-background--type2 m-l-1 font-12"
                        >모집인원
                        <strong>{{
                          GET_AXIOS_CALLBACK_GETTER.albaDetail.personnel
                        }}</strong>
                        명</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="GET_AXIOS_CALLBACK_GETTER.albaDetail.content"
              style="
                background-color: #f2f3f5;
                padding: 10px;
                border-radius: 10px;
                white-space: pre-line;
              "
              class="m-l-3 m-r-3 img-full m-t-5"
              v-html="GET_AXIOS_CALLBACK_GETTER.albaDetail.content"
            ></div>
            <div v-if="GET_AXIOS_CALLBACK_GETTER.albaDetail && LOGIN_STUDENT">
              <div
                v-if="
                  GET_AXIOS_CALLBACK_GETTER.albaDetail.sms_idx ==
                  LOGIN_STUDENT.sms_idx
                "
                class="m-l-3 m-r-3 m-t-5"
              >
                <div
                  v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.albApplyList"
                  :key="i"
                  class="m-b-5"
                >
                  <div class="flex">
                    <div>
                      <p>
                        {{ v.reg_name }}
                      </p>
                      <span class="font-12 jelly-color--gray">
                        {{ v.datetime | moment('YY.MM.DD') }}
                      </span>
                    </div>
                    <div class="flex-right">
                      <button
                        v-if="v.status === '0'"
                        class="jelly-btn jelly-btn--default"
                        @click="onSubmitApproval(v.idx)"
                      >
                        채용하기
                      </button>
                      <button
                        v-if="v.status === '2'"
                        class="jelly-btn jelly-btn--gray"
                        style="min-width: 89.84px"
                      >
                        취소됨
                      </button>
                      <button
                        v-if="v.status === '1'"
                        class="jelly-btn jelly-btn--pink"
                        style="min-width: 89.84px"
                        @click="onSubmitApprovalPay(v.idx)"
                      >
                        지급하기
                      </button>
                      <button
                        v-if="v.status === '3'"
                        class="jelly-btn jelly-btn--gray"
                        style="min-width: 89.84px"
                      >
                        지급완료
                      </button>
                    </div>
                  </div>
                  <div
                    style="
                      border: 1px solid #f2f3f5;
                      padding: 10px;
                      border-radius: 10px;
                      white-space: pre-line;
                    "
                    class="m-t-2"
                    v-html="v.memo"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="GET_AXIOS_CALLBACK_GETTER.albaDetail && LOGIN_STUDENT">
      <div
        v-if="
          GET_AXIOS_CALLBACK_GETTER.albaDetail.sms_idx != LOGIN_STUDENT.sms_idx
        "
      >
        <div
          v-if="GET_AXIOS_CALLBACK_GETTER.is_end === 'END'"
          class="quest-fixed"
        >
          <button class="jelly-btn jelly-btn--gray">
            기간이 종료되었습니다.
          </button>
        </div>
        <div
          v-if="GET_AXIOS_CALLBACK_GETTER.albaDetail"
          class="quest-fixed flex"
        >
          <!-- 0:신청,1:수락,2:취소,3:완료 -->
          <!-- 0:공고중,1:모집완료,2:지급완료,3:모집취소 -->
          <button
            v-if="
              GET_AXIOS_CALLBACK_GETTER.albaDetail.status === '0' &&
              !GET_AXIOS_CALLBACK_GETTER.albaDetail.my_status
            "
            class="jelly-btn jelly-btn--pink"
            @click="$bvModal.show('applyAlbago')"
          >
            신청하기
          </button>
          <button
            v-if="
              GET_AXIOS_CALLBACK_GETTER.albaDetail.status === '0' &&
              GET_AXIOS_CALLBACK_GETTER.albaDetail.my_status === '0'
            "
            class="jelly-btn jelly-btn--default"
            @click="onSubmitCancel"
          >
            취소하기
          </button>
          <button
            v-if="
              GET_AXIOS_CALLBACK_GETTER.albaDetail.status === '0' &&
              GET_AXIOS_CALLBACK_GETTER.albaDetail.my_status === '1'
            "
            class="jelly-btn jelly-btn--pink"
          >
            채용되었어요! <br />알바 완료 후 고용주에게 요청하세요.
          </button>
          <button
            v-if="
              GET_AXIOS_CALLBACK_GETTER.albaDetail.status === '0' &&
              GET_AXIOS_CALLBACK_GETTER.albaDetail.my_status === '2'
            "
            class="jelly-btn jelly-btn--gray"
          >
            취소된 알바 입니다.
          </button>
          <button
            v-if="
              GET_AXIOS_CALLBACK_GETTER.albaDetail.status === '0' &&
              GET_AXIOS_CALLBACK_GETTER.albaDetail.my_status === '3'
            "
            class="jelly-btn jelly-btn--gray"
          >
            알바비가 지급되었어요
          </button>
          <button
            v-if="
              GET_AXIOS_CALLBACK_GETTER.albaDetail.status === '1' ||
              GET_AXIOS_CALLBACK_GETTER.albaDetail.status === '2'
            "
            class="jelly-btn jelly-btn--default"
          >
            모집이 완료되었어요.
          </button>
          <button
            v-if="GET_AXIOS_CALLBACK_GETTER.albaDetail.status === '3'"
            class="jelly-btn jelly-btn--pink"
            @click="$bvModal.show('completeFile')"
          >
            취소된 공고입니다.
          </button>
        </div>
      </div>
      <div v-else class="quest-fixed">
        <button
          v-if="GET_AXIOS_CALLBACK_GETTER.albaDetail.status === '0'"
          class="jelly-btn jelly-btn--default"
          @click="onSubmitCEOCancel"
        >
          모집 마감하기
        </button>
        <button
          v-if="GET_AXIOS_CALLBACK_GETTER.albaDetail.status === '1'"
          class="jelly-btn jelly-btn--gray"
          @click="onSubmitCEOCancel"
        >
          마감되었어요
        </button>
      </div>
    </div>
    <b-modal id="applyAlbago" size="lg" hide-footer hide-header>
      <div>
        <p>왜 알바를 신청하나요?</p>
        <textarea
          v-model="albaMemo"
          class="jelly-text wd-full"
          style="height: 200px"
        ></textarea>
      </div>
      <div class="m-t-5 flex">
        <button
          class="jelly-btn jelly-btn--default"
          style="width: 30%; border-radius: 0"
          @click="$bvModal.hide('applyAlbago')"
        >
          취소하기
        </button>
        <button
          class="jelly-btn jelly-btn--pink flex-full"
          style="border-radius: 0"
          @click="onSubmitComplete()"
        >
          신청하기
        </button>
      </div>
    </b-modal>
  </div>
  <!-- <div v-if="GET_AXIOS_CALLBACK_GETTER">
    <h1>{{ GET_AXIOS_CALLBACK_GETTER.bd_subject }}</h1>
    <button
      v-if="
        !GET_AXIOS_CALLBACK_GETTER.is_apply &&
        !GET_AXIOS_CALLBACK_GETTER.is_complete &&
        !GET_AXIOS_CALLBACK_GETTER.is_confirm
      "
      @click="onSubmitApply"
    >
      수락
    </button>
    <button
      v-if="
        GET_AXIOS_CALLBACK_GETTER.is_apply &&
        !GET_AXIOS_CALLBACK_GETTER.is_complete &&
        !GET_AXIOS_CALLBACK_GETTER.is_confirm
      "
      @click="onSubmitComplete"
    >
      진행중
    </button>
    <button
      v-if="
        !GET_AXIOS_CALLBACK_GETTER.is_apply &&
        GET_AXIOS_CALLBACK_GETTER.is_complete &&
        !GET_AXIOS_CALLBACK_GETTER.is_confirm
      "
    >
      완료
    </button>
    <button v-if="GET_AXIOS_CALLBACK_GETTER.is_confirm">보상지급완료</button>

    <form>
      <input id="photo" type="file" name="photo" multiple />
      <input id="photo2" type="text" name="photo2" />
    </form>
  </div> -->
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import { historyBack } from '~/config/util'

export default {
  // layout: 'default-mo',

  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  asyncData({ params }) {
    console.log(params)
    return {
      idx: params.id,
    }
  },
  data() {
    return {
      params: {},
      paramsPost: {},
      paramsPostApply: {},
      a: 100000000,
      albaMemo: '',
    }
  },
  computed: {
    ...mapState(['LOGIN', 'LOADING']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_STUDENT']),
  },
  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },
  mounted() {
    //   DATA INIT
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_STUDENT
    this.params.type = 'albaView'
    this.params.idx = this.idx
    this.GET_AXIOS(this.params)
    historyBack()
    // this.LOADING_TRUE()
    // console.log('LOADING', this.LOADING)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS', 'POST_AXIOS_FORM']),
    ...mapMutations(['LOADING_TRUE']),

    // 퀘스트 수락
    onSubmitApply() {
      //   this.LOADING_TRUE()
      //   this.paramsPostApply.type = 'questApply'
      //   this.paramsPostApply.idx = this.idx
      //   this.paramsPostApply.sms_idx = this.LOGIN_STUDENT.sms_idx
      //   this.POST_AXIOS(this.paramsPostApply)
      //   setTimeout(() => {
      //     this.params = this.LOGIN_STUDENT
      //     this.params.type = 'questView'
      //     this.params.idx = this.idx
      //     this.GET_AXIOS(this.params)
      //   }, 1000)
    },
    onSubmitCancel() {
      if (
        confirm(
          '취소하면 이 알바는 다시 신청할 수 없어요\n정말 알바 신청을 취소하나요?'
        )
      ) {
        this.LOADING_TRUE()
        const frm = new FormData()
        frm.append('type', 'albaCancel')
        frm.append('idx', this.params.idx)
        frm.append('sms_idx', this.params.sms_idx)
        console.log(frm)
        // axiosForm(frm, '/student.php')
        this.$axios
          .post(process.env.VUE_APP_API + '/student.php', frm, {
            header: {
              'Context-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log(res.data)
            alert('알바 신청이 취소 되었어요')
            this.$bvModal.hide('applyAlbago')
            setTimeout(() => {
              this.params = this.LOGIN_STUDENT
              this.params.type = 'albaView'
              this.params.idx = this.idx
              this.GET_AXIOS(this.params)
            })
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      } else {
        return false
      }
    },
    onSubmitApprovalPay(idx) {
      if (
        confirm(
          '알바비를 지급하면 취소할 수 없어요?\n알바는 잘 마무리 되었나요?\n알바비를 지급할까요?'
        )
      ) {
        this.LOADING_TRUE()
        const frm = new FormData()
        frm.append('type', 'albaApprovalPay')
        frm.append('idx', idx)
        console.log(frm)
        // axiosForm(frm, '/student.php')
        this.$axios
          .post(process.env.VUE_APP_API + '/student.php', frm, {
            header: {
              'Context-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log(res.data)
            alert('알바비가 지급되었어요')
            this.$bvModal.hide('applyAlbago')
            setTimeout(() => {
              this.params = this.LOGIN_STUDENT
              this.params.type = 'albaView'
              this.params.idx = this.idx
              this.GET_AXIOS(this.params)
            })
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      } else {
        return false
      }
    },
    onSubmitApproval(idx) {
      if (confirm('채용 후에는 변경이 안돼요\n채용할까요?')) {
        this.LOADING_TRUE()
        const frm = new FormData()
        frm.append('type', 'albaApproval')
        frm.append('idx', idx)
        console.log(frm)
        // axiosForm(frm, '/student.php')
        this.$axios
          .post(process.env.VUE_APP_API + '/student.php', frm, {
            header: {
              'Context-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log(res.data)
            alert('채용되었습니다.')
            this.$bvModal.hide('applyAlbago')
            setTimeout(() => {
              this.params = this.LOGIN_STUDENT
              this.params.type = 'albaView'
              this.params.idx = this.idx
              this.GET_AXIOS(this.params)
            })
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      } else {
        return false
      }
    },
    onSubmitApplyPay(idx) {
      if (
        confirm(
          '알바를 고용한 사람까지 완료해야 알바비를 받을 수 있어요.\n알바를 정말 완료했나요?'
        )
      ) {
        this.LOADING_TRUE()
        const frm = new FormData()
        frm.append('type', 'albaApplyPay')
        frm.append('idx', idx)
        console.log(frm)
        // axiosForm(frm, '/student.php')
        this.$axios
          .post(process.env.VUE_APP_API + '/student.php', frm, {
            header: {
              'Context-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log(res.data)
            alert('채용되었습니다.')
            this.$bvModal.hide('applyAlbago')
            setTimeout(() => {
              this.params = this.LOGIN_STUDENT
              this.params.type = 'albaView'
              this.params.idx = this.idx
              this.GET_AXIOS(this.params)
            })
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      } else {
        return false
      }
    },
    onSubmitComplete() {
      this.LOADING_TRUE()
      const frm = new FormData()
      frm.append('type', 'albaApply')
      frm.append('idx', this.params.idx)
      frm.append('sms_idx', this.params.sms_idx)
      frm.append('smt_idx', this.LOGIN_STUDENT.smt_idx)
      frm.append('memo', this.albaMemo)
      console.log(frm)
      // axiosForm(frm, '/student.php')
      this.$axios
        .post(process.env.VUE_APP_API + '/student.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res.data)
          alert('알바 신청이 완료되었어요')
          this.$bvModal.hide('applyAlbago')
          setTimeout(() => {
            this.params = this.LOGIN_STUDENT
            this.params.type = 'albaView'
            this.params.idx = this.idx
            this.GET_AXIOS(this.params)
          })
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },
    onSubmitCEOCancel() {
      if (
        confirm(
          '모집을 마감하면 채용공고를 다시 올려야 해요\n모집을 마감할까요?'
        )
      ) {
        this.LOADING_TRUE()
        const frm = new FormData()
        frm.append('type', 'albaApplyCEOCancel')
        frm.append('idx', this.params.idx)
        console.log(frm)
        // axiosForm(frm, '/student.php')
        this.$axios
          .post(process.env.VUE_APP_API + '/student.php', frm, {
            header: {
              'Context-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log(res.data)
            alert('모집이 마감되었어요.')
            this.$bvModal.hide('applyAlbago')
            setTimeout(() => {
              this.params = this.LOGIN_STUDENT
              this.params.type = 'albaView'
              this.params.idx = this.idx
              this.GET_AXIOS(this.params)
            })
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      } else {
        return false
      }
    },
    // onClickComplete() {
    //   this.$bvModal.show('itemInsert')
    // }
  },
}
</script>

<style lang="scss"></style>
