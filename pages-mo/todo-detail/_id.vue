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
        <div class="account" v-if="GET_AXIOS_CALLBACK_GETTER.view">
          <div
            v-if="GET_AXIOS_CALLBACK_GETTER.view.subject"
            class="quest__content m-t-3"
          >
            <div class="box quest m-b-3">
              <div class="flex">
                <div class="label blue">
                  {{ GET_AXIOS_CALLBACK_GETTER.view.cate_subject }}
                </div>
                <div class="flex-full m-l-3 m-r-3">
                  <div class="flex m-t-0">
                    <div class="txt">
                      <p class="bold">
                        {{ GET_AXIOS_CALLBACK_GETTER.view.subject }}
                      </p>
                      <span
                        >{{
                          GET_AXIOS_CALLBACK_GETTER.view.start_day
                            | moment('YY.MM.DD')
                        }}
                        ~
                        {{
                          GET_AXIOS_CALLBACK_GETTER.view.end_day
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
                      GET_AXIOS_CALLBACK_GETTER.view.contents.replaceAll(
                        /\!\[|\].*.[)]/g,
                        ''
                      )
                    }}
                  </div> -->
                  <h4 class="m-t-5 font-14">성공하면 보상을 받을 수 있어요</h4>
                  <div class="m-t-2 flex flex-full">
                    <div>
                      보상
                      <strong class="bold font-18 m-l-1"
                        ><em>{{
                          GET_AXIOS_CALLBACK_GETTER.view.price
                        }}</em></strong
                      >
                      <span v-if="LOGIN_STUDENT.t_reg_pay_unit">{{
                        LOGIN_STUDENT.t_reg_pay_unit
                      }}</span>
                    </div>
                    <div class="flex-right">
                      <div class="flex m-t-0">
                        <span
                          class="
                            jelly-point
                            m-t-0
                            jelly-background--type1
                            m-l-1
                          "
                          >{{ GET_AXIOS_CALLBACK_GETTER.view.intellect }}</span
                        >
                        <span
                          class="
                            jelly-point
                            m-t-0
                            jelly-background--type2
                            m-l-1
                          "
                          >{{ GET_AXIOS_CALLBACK_GETTER.view.effort }}</span
                        >
                        <span
                          class="
                            jelly-point
                            m-t-0
                            jelly-background--type3
                            m-l-1
                          "
                          >{{ GET_AXIOS_CALLBACK_GETTER.view.health }}</span
                        >
                        <span
                          class="
                            jelly-point
                            m-t-0
                            jelly-background--type4
                            m-l-1
                          "
                          >{{ GET_AXIOS_CALLBACK_GETTER.view.etiquette }}</span
                        >
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="
                      GET_AXIOS_CALLBACK_GETTER.view.m_price != '0' ||
                      GET_AXIOS_CALLBACK_GETTER.view.m_intellect != '0' ||
                      GET_AXIOS_CALLBACK_GETTER.view.m_effort != '0' ||
                      GET_AXIOS_CALLBACK_GETTER.view.m_health != '0' ||
                      GET_AXIOS_CALLBACK_GETTER.view.m_etiquette != '0'
                    "
                  >
                    <h4
                      class="m-t-3 p-t-3 font-14"
                      style="border-top: 1px solid #f1f1f1"
                    >
                      실패하면 패널티가 적용되요
                    </h4>
                    <div class="m-t-2 flex flex-full">
                      <div>
                        패널티
                        <strong class="bold font-18 m-l-1"
                          ><em>{{
                            GET_AXIOS_CALLBACK_GETTER.view.m_price
                          }}</em></strong
                        >
                        <span v-if="LOGIN_STUDENT.t_reg_pay_unit">{{
                          LOGIN_STUDENT.t_reg_pay_unit
                        }}</span>
                      </div>
                      <div class="flex-right">
                        <div class="flex m-t-0">
                          <span
                            class="
                              jelly-point
                              m-t-0
                              jelly-background--type1
                              m-l-1
                            "
                            >{{
                              GET_AXIOS_CALLBACK_GETTER.view.m_intellect
                            }}</span
                          >
                          <span
                            class="
                              jelly-point
                              m-t-0
                              jelly-background--type2
                              m-l-1
                            "
                            >{{ GET_AXIOS_CALLBACK_GETTER.view.m_effort }}</span
                          >
                          <span
                            class="
                              jelly-point
                              m-t-0
                              jelly-background--type3
                              m-l-1
                            "
                            >{{ GET_AXIOS_CALLBACK_GETTER.view.m_health }}</span
                          >
                          <span
                            class="
                              jelly-point
                              m-t-0
                              jelly-background--type4
                              m-l-1
                            "
                            >{{
                              GET_AXIOS_CALLBACK_GETTER.view.m_etiquette
                            }}</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="GET_AXIOS_CALLBACK_GETTER.view.contents"
              style="
                background-color: #f2f3f5;
                padding: 10px;
                border-radius: 10px;
                white-space: pre-line;
              "
              class="m-l-3 m-r-3 img-full m-t-5"
              v-html="GET_AXIOS_CALLBACK_GETTER.view.contents"
            ></div>
            <div class="m-t-5 flex p-3">
              <button
                class="jelly-btn jelly-btn--default wd-full m-r-1"
                :disabled="GET_AXIOS_CALLBACK_GETTER.content ? false : true"
                @click="$bvModal.show('myContent')"
              >
                내가 남긴 말
              </button>
              <button
                class="jelly-btn jelly-btn--default wd-full m-l-1"
                :disabled="GET_AXIOS_CALLBACK_GETTER.files ? false : true"
                @click="$bvModal.show('myFiles')"
              >
                나의 인증샷
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="
        GET_AXIOS_CALLBACK_GETTER.view &&
        GET_AXIOS_CALLBACK_GETTER.view.is_end === 'END'
      "
      class="quest-fixed"
    >
      <button class="jelly-btn jelly-btn--gray">기간이 종료되었습니다.</button>
    </div>
    <div
      v-if="
        GET_AXIOS_CALLBACK_GETTER.view &&
        GET_AXIOS_CALLBACK_GETTER.view.is_end !== 'END'
      "
      class="quest-fixed flex"
    >
      <button
        v-if="
          !GET_AXIOS_CALLBACK_GETTER.view.is_apply &&
          !GET_AXIOS_CALLBACK_GETTER.view.is_complete &&
          !GET_AXIOS_CALLBACK_GETTER.view.is_confirm
        "
        class="jelly-btn jelly-btn--pink"
        :disabled="btn.onSubmitApply"
        @click="onSubmitApply"
      >
        수락하기
      </button>
      <button
        v-if="
          GET_AXIOS_CALLBACK_GETTER.view.is_apply &&
          !GET_AXIOS_CALLBACK_GETTER.view.is_complete &&
          !GET_AXIOS_CALLBACK_GETTER.view.is_confirm &&
          GET_AXIOS_CALLBACK_GETTER.view.mandatory !== '1'
        "
        class="jelly-btn jelly-btn--default"
        style="width: 30%"
        @click="onSubmitApply"
      >
        취소하기
      </button>
      <button
        v-if="
          GET_AXIOS_CALLBACK_GETTER.view.is_apply &&
          !GET_AXIOS_CALLBACK_GETTER.view.is_complete &&
          !GET_AXIOS_CALLBACK_GETTER.view.is_confirm
        "
        class="jelly-btn jelly-btn--pink"
        @click="$bvModal.show('completeFile')"
      >
        제출하기
      </button>

      <button
        v-if="
          !GET_AXIOS_CALLBACK_GETTER.view.is_apply &&
          GET_AXIOS_CALLBACK_GETTER.view.is_complete &&
          !GET_AXIOS_CALLBACK_GETTER.view.is_confirm
        "
        class="jelly-btn jelly-btn--default"
      >
        선생님이 검사중이에요!
      </button>
      <button
        v-if="GET_AXIOS_CALLBACK_GETTER.view.is_confirm"
        class="jelly-btn jelly-btn--blue"
      >
        보상지급완료
      </button>
    </div>
    <b-modal id="completeFile" size="lg" hide-footer hide-header>
      <div>
        <p>선생님께 남길 말이 있나요?</p>
        <textarea
          v-model="completeContent"
          class="jelly-text wd-full"
          style="height: 200px; padding: 10px"
        ></textarea>
      </div>
      <div class="m-t-5">
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
          @click="onClickCompleteModal"
        >
          <!-- $bvModal.hide('completeFile') -->
          취소하기
        </button>
        <button
          class="jelly-btn jelly-btn--pink flex-full"
          style="border-radius: 0"
          @click="onSubmitComplete()"
        >
          완료하기
        </button>
      </div>
    </b-modal>
    <b-modal id="myContent" size="lg" hide-footer hide-header>
      <div>
        <p>내가 남길 말</p>
      </div>
      <div v-if="GET_AXIOS_CALLBACK_GETTER.content" class="m-t-5">
        {{ GET_AXIOS_CALLBACK_GETTER.content.content }}
      </div>
      <div class="m-t-5 text-center">
        <button
          class="jelly-btn jelly-btn--default"
          style="width: 30%; border-radius: 0"
          @click="$bvModal.hide('myContent')"
        >
          <!-- $bvModal.hide('completeFile') -->
          닫기
        </button>
      </div>
    </b-modal>
    <b-modal id="myFiles" size="lg" hide-footer hide-header>
      <div class="m-t-5">
        <div v-if="GET_AXIOS_CALLBACK_GETTER.files">
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <!-- Slides with image only -->
            <b-carousel-slide
              v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.files"
              :key="i"
              :img-src="`http://api.school-os.net/data/student/quest/${v.file_name}`"
            ></b-carousel-slide>
          </b-carousel>
        </div>
      </div>
      <div class="m-t-5 text-center">
        <button
          class="jelly-btn jelly-btn--default"
          style="width: 30%; border-radius: 0"
          @click="$bvModal.hide('myFiles')"
        >
          <!-- $bvModal.hide('completeFile') -->
          닫기
        </button>
      </div>
    </b-modal>
  </div>
  <!-- <div v-if="GET_AXIOS_CALLBACK_GETTER">
    <h1>{{ GET_AXIOS_CALLBACK_GETTER.view.bd_subject }}</h1>
    <button
      v-if="
        !GET_AXIOS_CALLBACK_GETTER.view.is_apply &&
        !GET_AXIOS_CALLBACK_GETTER.view.is_complete &&
        !GET_AXIOS_CALLBACK_GETTER.view.is_confirm
      "
      @click="onSubmitApply"
    >
      수락
    </button>
    <button
      v-if="
        GET_AXIOS_CALLBACK_GETTER.view.is_apply &&
        !GET_AXIOS_CALLBACK_GETTER.view.is_complete &&
        !GET_AXIOS_CALLBACK_GETTER.view.is_confirm
      "
      @click="onSubmitComplete"
    >
      진행중
    </button>
    <button
      v-if="
        !GET_AXIOS_CALLBACK_GETTER.view.is_apply &&
        GET_AXIOS_CALLBACK_GETTER.view.is_complete &&
        !GET_AXIOS_CALLBACK_GETTER.view.is_confirm
      "
    >
      완료
    </button>
    <button v-if="GET_AXIOS_CALLBACK_GETTER.view.is_confirm">보상지급완료</button>

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
      completeContent: '',
      slide: 0,
      sliding: null,
      btn: {
        onSubmitApply: false,
        onSubmitComplete: false,
      },
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
    this.params.type = 'questView'
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
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    // 퀘스트 수락
    onSubmitApply() {
      this.btn.onSubmitApply = true
      this.LOADING_TRUE()
      const frm = new FormData()
      frm.append('type', 'questApply')
      frm.append('idx', this.idx)
      frm.append('sms_idx', this.LOGIN_STUDENT.sms_idx)
      this.$axios
        .post(process.env.VUE_APP_API + '/student.php', frm)
        .then((res) => {
          this.params = this.LOGIN_STUDENT
          this.params.type = 'questView'
          this.params.idx = this.idx
          this.GET_AXIOS(this.params)
          this.btn.onSubmitApply = false
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
          this.LOADING = false
        })
    },
    onClickCompleteModal() {
      this.completeContent = ''
      this.$bvModal.hide('completeFile')
    },
    onSubmitComplete() {
      this.btn.onSubmitComplete = true
      const frm = new FormData()
      const photoFile = document.getElementById('photo')

      if (photoFile.files.length === 0) {
        if (
          confirm(
            '인증샷이 등록되지 않았어요\n인증샷 없이 선생님에게 제출할까요?'
          )
        ) {
          console.log('OK')
        } else {
          return
        }
      }

      console.log(photoFile.files)
      for (let i = 0; i < photoFile.files.length; i++) {
        frm.append(`photo[${i}]`, photoFile.files[i])
      }
      frm.append('type', 'questCopleteOn')
      frm.append('idx', this.params.idx)
      if (this.completeContent) {
        frm.append('content', this.completeContent)
      }
      frm.append('sms_idx', this.params.sms_idx)
      frm.append('smt_idx', this.LOGIN_STUDENT.smt_idx)
      console.log(frm)
      this.LOADING_TRUE()
      // axiosForm(frm, '/student.php')
      this.$axios
        .post(process.env.VUE_APP_API + '/student.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log('[onSubmitComplete]', res.data)
          this.$bvModal.hide('completeFile')
          setTimeout(() => {
            this.params = this.LOGIN_STUDENT
            this.params.type = 'questView'
            this.params.idx = this.idx
            this.GET_AXIOS(this.params)
            this.btn.onSubmitComplete = false
          })
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },
    // onClickComplete() {
    //   this.$bvModal.show('itemInsert')
    // }
  },
}
</script>

<style lang="scss"></style>
