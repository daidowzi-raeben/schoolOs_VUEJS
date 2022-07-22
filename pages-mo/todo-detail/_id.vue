<template>
  <div id="school-content">
    <div class="historyBack m-l-3 m-b-5">
      <b-icon icon="arrow-left" onclick="history.back()"></b-icon>
    </div>
    <div class="content">
      <div class="m-t-1 h60">
        <div class="account">
          <div
            v-if="GET_AXIOS_CALLBACK_GETTER.subject"
            class="quest__content m-t-3"
          >
            <div class="box quest m-b-3">
              <div class="flex">
                <div class="label blue">
                  {{ GET_AXIOS_CALLBACK_GETTER.cate_subject }}
                </div>
                <div class="flex-full m-l-3 m-r-3">
                  <div class="flex m-t-0">
                    <div class="txt">
                      <p class="bold">
                        {{ GET_AXIOS_CALLBACK_GETTER.subject }}
                      </p>
                      <span
                        >{{
                          GET_AXIOS_CALLBACK_GETTER.start_day
                            | moment('YY.MM.DD')
                        }}
                        ~
                        {{
                          GET_AXIOS_CALLBACK_GETTER.end_day | moment('YY.MM.DD')
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
                      보상
                      <strong class="bold font-18 m-l-1"
                        ><em>{{ GET_AXIOS_CALLBACK_GETTER.price }}</em></strong
                      >
                      <span v-if="LOGIN_STUDENT.t_reg_pay_unit">{{
                        LOGIN_STUDENT.t_reg_pay_unit
                      }}</span>
                    </div>
                    <div class="flex-right">
                      <div class="flex m-t-0">
                        <span
                          class="jelly-point m-t-0 jelly-background--type1 m-l-1"
                          >{{ GET_AXIOS_CALLBACK_GETTER.intellect }}</span
                        >
                        <span
                          class="jelly-point m-t-0 jelly-background--type2 m-l-1"
                          >{{ GET_AXIOS_CALLBACK_GETTER.effort }}</span
                        >
                        <span
                          class="jelly-point m-t-0 jelly-background--type3 m-l-1"
                          >{{ GET_AXIOS_CALLBACK_GETTER.health }}</span
                        >
                        <span
                          class="jelly-point m-t-0 jelly-background--type4 m-l-1"
                          >{{ GET_AXIOS_CALLBACK_GETTER.etiquette }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="GET_AXIOS_CALLBACK_GETTER.contents"
              style="
                background-color: #f2f3f5;
                padding: 10px;
                border-radius: 10px;
              "
              class="m-l-3 m-r-3"
              v-html="GET_AXIOS_CALLBACK_GETTER.contents"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="GET_AXIOS_CALLBACK_GETTER.is_end === 'END'" class="quest-fixed">
      <button class="jelly-btn jelly-btn--gray">기간이 종료되었습니다.</button>
    </div>
    <div
      v-if="GET_AXIOS_CALLBACK_GETTER.is_end !== 'END'"
      class="quest-fixed flex"
    >
      <button
        v-if="
          !GET_AXIOS_CALLBACK_GETTER.is_apply &&
          !GET_AXIOS_CALLBACK_GETTER.is_complete &&
          !GET_AXIOS_CALLBACK_GETTER.is_confirm
        "
        class="jelly-btn jelly-btn--pink"
        @click="onSubmitApply"
      >
        수락하기
      </button>
      <button
        v-if="
          GET_AXIOS_CALLBACK_GETTER.is_apply &&
          !GET_AXIOS_CALLBACK_GETTER.is_complete &&
          !GET_AXIOS_CALLBACK_GETTER.is_confirm
        "
        class="jelly-btn jelly-btn--default"
        style="width: 30%"
        @click="onSubmitApply"
      >
        취소하기
      </button>
      <button
        v-if="
          GET_AXIOS_CALLBACK_GETTER.is_apply &&
          !GET_AXIOS_CALLBACK_GETTER.is_complete &&
          !GET_AXIOS_CALLBACK_GETTER.is_confirm
        "
        class="jelly-btn jelly-btn--pink"
        @click="$bvModal.show('completeFile')"
      >
        완료하기
      </button>

      <button
        v-if="
          !GET_AXIOS_CALLBACK_GETTER.is_apply &&
          GET_AXIOS_CALLBACK_GETTER.is_complete &&
          !GET_AXIOS_CALLBACK_GETTER.is_confirm
        "
        class="jelly-btn jelly-btn--default"
      >
        선생님이 검사중이에요!
      </button>
      <button
        v-if="GET_AXIOS_CALLBACK_GETTER.is_confirm"
        class="jelly-btn jelly-btn--blue"
      >
        보상지급완료
      </button>
    </div>
    <b-modal id="completeFile" size="lg" hide-footer hide-header>
      <div>
        <p>인증샷을 등록해 주세요!</p>
        <input
          id="photo"
          type="file"
          class="wd-full jelly-text jelly-text--h"
          name="photo"
          multiple
        />
      </div>
      <div class="m-t-5 flex">
        <button
          class="jelly-btn jelly-btn--default"
          style="width: 30%; border-radius: 0"
          @click="$bvModal.hide('completeFile')"
        >
          취소하기
        </button>
        <button
          class="jelly-btn jelly-btn--pink flex-full"
          style="border-radius: 0"
          @click="onSubmitComplete()"
        >
          제출하기
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
import { historyBack, axiosForm } from '~/config/util'

export default {
  name: 'TodoDetail',
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
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_STUDENT
    this.params.type = 'questView'
    this.params.idx = this.idx
    this.GET_AXIOS(this.params)
    historyBack()
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS', 'POST_AXIOS_FORM']),
    ...mapMutations([]),

    // 퀘스트 수락
    onSubmitApply() {
      this.paramsPostApply.type = 'questApply'
      this.paramsPostApply.idx = this.idx
      this.paramsPostApply.sms_idx = this.LOGIN_STUDENT.sms_idx
      this.POST_AXIOS(this.paramsPostApply)

      setTimeout(() => {
        this.params = this.LOGIN_STUDENT
        this.params.type = 'questView'
        this.params.idx = this.idx
        this.GET_AXIOS(this.params)
      }, 1000)
    },
    onSubmitComplete() {
      const frm = new FormData()
      const photoFile = document.getElementById('photo')

      console.log(photoFile.files)
      for (let i = 0; i < photoFile.files.length; i++) {
        frm.append(`photo[${i}]`, photoFile.files[i])
      }
      frm.append('type', 'questCopleteOn')
      frm.append('idx', this.params.idx)
      frm.append('sms_idx', this.params.sms_idx)
      frm.append('smt_idx', this.LOGIN_STUDENT.smt_idx)
      console.log(frm)
      axiosForm(frm, '/student.php')
      this.$bvModal.hide('completeFile')
      setTimeout(() => {
        this.params = this.LOGIN_STUDENT
        this.params.type = 'questView'
        this.params.idx = this.idx
        this.GET_AXIOS(this.params)
      }, 1000)
    },
    // onClickComplete() {
    //   this.$bvModal.show('itemInsert')
    // }
  },
}
</script>

<style lang="scss"></style>
