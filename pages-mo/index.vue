<template>
  <div v-if="LOGIN_CONFIG && GET_AXIOS_CALLBACK_GETTER" id="school-content">
    <div class="content">
      <div class="content__top">
        <!-- <div>용신 초등학교 6학년 5반</div> -->
        <div v-b-modal.ModalNotice class="content__top--notice flex">
          <p
            v-if="GET_AXIOS_CALLBACK_GETTER.rules && LOGIN_CONFIG.t_reg_country"
          >
            {{ LOGIN_CONFIG.t_reg_country }} 규칙 확인하기
            <b-modal id="ModalNotice" hide-footer>
              <div class="img-full">
                <ul>
                  <li
                    v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.rules"
                    :key="i"
                    class="m-b-2 p-b-2"
                    style="border-bottom: 1px solid #eee"
                  >
                    <div class="font-16 bold">
                      {{ i + 1 }}조. {{ v.content }}
                    </div>
                    <div
                      v-for="(k, e) in v.ruleContent"
                      :key="k.idx"
                      style="padding: 10px"
                    >
                      <div class="font-14">{{ e + 1 }}항. {{ k.subject }}</div>
                      <div
                        v-if="LOGIN_CONFIG"
                        class="m-t-1 jelly-color--888 font-12"
                      >
                        {{ k.penalty + LOGIN_CONFIG.t_reg_pay_unit }}
                        {{
                          k.penalty_etc ? ' / ' + k.penalty_etc : k.penalty_etc
                        }}
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
          </p>
          <p v-else>아직 규칙이 정해지지 않았어요</p>
          <b-icon icon="chevron-right" class="flex-right"></b-icon>
        </div>
        <div class="content__top--level">
          <div class="flex m-t-3">
            <div class="profile">
              <div class="profile__avatar flex">
                <div v-if="LOGIN_CONFIG" v-b-modal.profileImage class="photo">
                  <img
                    v-if="!LOGIN_CONFIG.reg_photo"
                    src="http://api.school-os.net/data/student/profile/default.png"
                  />
                  <img
                    v-if="LOGIN_CONFIG.reg_photo"
                    :src="`http://api.school-os.net/data/student/profile/thumb/${LOGIN_CONFIG.reg_photo}`"
                  />
                  <!-- <img
                  v-if="
                    Math.floor(GET_AXIOS_CALLBACK_GETTER.status.total / 4) < 19
                  "
                  src="~/static/mo/plant/level_1.jpg"
                />
                <img
                  v-if="
                    Math.floor(GET_AXIOS_CALLBACK_GETTER.status.total / 4) >
                      19 &&
                    Math.floor(GET_AXIOS_CALLBACK_GETTER.status.total / 4) < 29
                  "
                  src="~/static/mo/plant/level_2.jpg"
                />
                <img
                  v-if="
                    Math.floor(GET_AXIOS_CALLBACK_GETTER.status.total / 4) >
                      29 &&
                    Math.floor(GET_AXIOS_CALLBACK_GETTER.status.total / 4) < 39
                  "
                  src="~/static/mo/plant/level_3.jpg"
                />
                <img
                  v-if="
                    Math.floor(GET_AXIOS_CALLBACK_GETTER.status.total / 4) >
                      39 &&
                    Math.floor(GET_AXIOS_CALLBACK_GETTER.status.total / 4) < 49
                  "
                  src="~/static/mo/plant/level_4.jpg"
                />
                <img
                  v-if="
                    Math.floor(GET_AXIOS_CALLBACK_GETTER.status.total / 4) > 49
                  "
                  src="~/static/mo/plant/level_5.jpg"
                /> -->
                </div>
                <div class="name">
                  <strong>
                    {{ LOGIN_CONFIG.reg_name }}
                  </strong>
                  <p>
                    LV
                    <em v-if="GET_AXIOS_CALLBACK_GETTER.status" class="bold">
                      {{
                        GET_AXIOS_CALLBACK_GETTER.status.total
                          ? Math.floor(
                              GET_AXIOS_CALLBACK_GETTER.status.total / 4
                            )
                          : 0
                      }}
                    </em>
                  </p>
                </div>
              </div>
            </div>
            <div class="status flex-right">
              <ul v-if="GET_AXIOS_CALLBACK_GETTER.status" class="flex">
                <li class="">
                  <div
                    class="stat"
                    :style="
                      'height: calc(' +
                      (GET_AXIOS_CALLBACK_GETTER.status.intellect /
                        GET_AXIOS_CALLBACK_GETTER.status.total) *
                        100 +
                      '% - 0px)'
                    "
                  ></div>
                  <p class="bold">지혜</p>
                  <span>{{ GET_AXIOS_CALLBACK_GETTER.status.intellect }}</span>
                </li>
                <li>
                  <div
                    class="stat"
                    :style="
                      'height: calc(' +
                      (GET_AXIOS_CALLBACK_GETTER.status.effort /
                        GET_AXIOS_CALLBACK_GETTER.status.total) *
                        100 +
                      '% - 0px)'
                    "
                  ></div>
                  <p class="bold">노력</p>
                  <span>{{ GET_AXIOS_CALLBACK_GETTER.status.effort }}</span>
                </li>
                <li>
                  <div
                    class="stat"
                    :style="
                      'height: calc(' +
                      (GET_AXIOS_CALLBACK_GETTER.status.health /
                        GET_AXIOS_CALLBACK_GETTER.status.total) *
                        100 +
                      '% - 0px)'
                    "
                  ></div>
                  <p class="bold">건강</p>
                  <span>{{ GET_AXIOS_CALLBACK_GETTER.status.health }}</span>
                </li>
                <li>
                  <div
                    class="stat"
                    :style="
                      'height: calc(' +
                      (GET_AXIOS_CALLBACK_GETTER.status.etiquette /
                        GET_AXIOS_CALLBACK_GETTER.status.total) *
                        100 +
                      '% - 0px)'
                    "
                  ></div>
                  <p class="bold">예절</p>
                  <span>{{ GET_AXIOS_CALLBACK_GETTER.status.etiquette }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="content__body">
        <div
          v-if="
            GET_AXIOS_CALLBACK_GETTER.billNon &&
            GET_AXIOS_CALLBACK_GETTER.billNon.length > 0
          "
          class="box quest m-b-5"
        >
          <div v-if="LOGIN_CONFIG" class="quest__title flex">
            <h3 v-if="LOGIN_CONFIG.t_todo_name">나의 고지서</h3>

            <!-- <b-icon
              class="m-l-1"
              icon="chevron-right"
              style="margin-top: 2px"
            ></b-icon> -->
          </div>
          <div v-if="GET_AXIOS_CALLBACK_GETTER.billNon" class="quest__content">
            <div
              v-for="(v, index) in GET_AXIOS_CALLBACK_GETTER.billNon"
              :key="index"
              class="m-t-3"
              @click="onClickBillDetail(v.idx, v.pay)"
            >
              <div class="flex">
                <div class="txt m-l-2">
                  <p>{{ v.subject }}</p>
                  <span>{{ v.code }}</span>
                </div>
                <div class="pay text-right flex-right">
                  <p>
                    <em class="bold">
                      {{ v.pay | comma }}
                    </em>
                    <span v-if="LOGIN_CONFIG.t_reg_pay_unit">{{
                      LOGIN_CONFIG.t_reg_pay_unit
                    }}</span>
                  </p>
                </div>
              </div>
              <div
                class="m-t-2 font-12"
                style="background: #f8f8f8; padding: 10px"
              >
                {{ v.content }}
              </div>
            </div>
          </div>
        </div>
        <div class="box quest">
          <div class="quest__title flex">
            <nuxt-link v-if="LOGIN_CONFIG" to="/todo-my-list/0">
              <h3 v-if="LOGIN_CONFIG.t_todo_name">
                나의 {{ LOGIN_CONFIG.t_todo_name }}
              </h3>
            </nuxt-link>
            <b-icon
              class="m-l-1"
              icon="chevron-right"
              style="margin-top: 2px"
            ></b-icon>
          </div>
          <div v-if="GET_AXIOS_CALLBACK_GETTER.quest" class="quest__content">
            <div
              v-if="GET_AXIOS_CALLBACK_GETTER.quest.length === 0"
              class="p-3 text-center font-14"
            >
              <nuxt-link to="/todo-list/0">
                <em>
                  아직 수락한 일이 없어요.<br />여기를 터치하여 할 수 있는 일을
                  찾아보세요
                </em></nuxt-link
              >
            </div>
            <div
              v-for="(v, index) in GET_AXIOS_CALLBACK_GETTER.quest"
              :key="index"
              class="flex m-t-3"
              @click="onClickTodoDetail(v.idx)"
            >
              <div class="label blue">{{ v.subject_cate }}</div>
              <div class="txt m-l-2">
                <p>{{ v.subject }}</p>
                <span>{{ v.start_day }} ~ {{ v.end_day }}</span>
              </div>
              <div class="pay text-right flex-right">
                <p>
                  <em class="bold">
                    {{ v.price | comma }}
                  </em>
                  <span v-if="LOGIN_CONFIG.t_reg_pay_unit">{{
                    LOGIN_CONFIG.t_reg_pay_unit
                  }}</span>
                </p>
                <span>{{ v.d_day }}일남음</span>
              </div>
            </div>
          </div>
        </div>
        <div class="account m-t-4"></div>
        <div
          v-if="GET_AXIOS_CALLBACK_GETTER.account"
          class="box account-area m-t-2"
        >
          <nuxt-link to="/bank-transfer-list">
            <h3>
              나의 통장
              <b-icon
                class="m-l-1"
                icon="chevron-right"
                style="margin-top: 2px"
              ></b-icon>
            </h3>
          </nuxt-link>
          <nuxt-link to="/bank-transfer-list" class="wd-full">
            <div class="flex m-t-2">
              <div>
                <p>{{ GET_AXIOS_CALLBACK_GETTER.account.account_number }}</p>
                <span class="jelly-color--gray font-12">{{
                  GET_AXIOS_CALLBACK_GETTER.account.nick_name
                }}</span>
              </div>
              <div class="flex-right">
                <strong class="font-18 bold"
                  ><em>{{
                    (GET_AXIOS_CALLBACK_GETTER.account.PtotalAccount ||
                    GET_AXIOS_CALLBACK_GETTER.account.MtotalAccount
                      ? GET_AXIOS_CALLBACK_GETTER.account.PtotalAccount -
                        GET_AXIOS_CALLBACK_GETTER.account.MtotalAccount
                      : 0) | comma
                  }}</em></strong
                >
                <span v-if="LOGIN_CONFIG.t_reg_pay_unit">{{
                  LOGIN_CONFIG.t_reg_pay_unit
                }}</span>
              </div>
            </div>
          </nuxt-link>
          <div
            v-if="
              GET_AXIOS_CALLBACK_GETTER.student &&
              GET_AXIOS_CALLBACK_GETTER.student.deposit !== '1'
            "
            class="flex m-t-3"
          >
            <nuxt-link to="/bank-transfer" class="wd-full">
              <button class="jelly-btn jelly-btn--gray wd-full">이체</button>
            </nuxt-link>
            <nuxt-link to="/bank-transfer-cash" class="wd-full">
              <button class="jelly-btn jelly-btn--default wd-full m-l-2">
                출금
              </button>
            </nuxt-link>
          </div>
        </div>
        <div
          v-if="
            GET_AXIOS_CALLBACK_GETTER.teacher &&
            GET_AXIOS_CALLBACK_GETTER.teacher.inflation === 'Y'
          "
          class="box account-area m-t-2"
        >
          <nuxt-link to="/bank-country-list" class="flex">
            <h3>
              국고 통장
              <b-icon
                class="m-l-1"
                icon="chevron-right"
                style="margin-top: 2px"
              ></b-icon>
            </h3>
            <div
              v-if="GET_AXIOS_CALLBACK_GETTER.teacher.inflation === 'Y'"
              class="flex-right"
            >
              <strong class="font-18 bold"
                ><em>{{
                  GET_AXIOS_CALLBACK_GETTER.teacher.total_pay | comma
                }}</em></strong
              >
              <span v-if="LOGIN_CONFIG.t_reg_pay_unit">{{
                LOGIN_CONFIG.t_reg_pay_unit
              }}</span>
            </div>
          </nuxt-link>
        </div>
        <div
          class="box account-area m-t-3 dotted text-center"
          onclick="alert('아직 준비중이에요')"
        >
          <b-icon v-b-toggle.notification icon="plus" class="font-30"></b-icon>
          <p>새로운 통장을 만들어보세요</p>
        </div>
      </div>
    </div>
    <b-modal id="billDetail" size="lg" hide-footer hide-header>
      <h4 style="font-size: 16px">고지서 금액만큼 납부 할까요?</h4>
      <div class="m-t-5 flex text-center">
        <button
          class="jelly-btn jelly-btn--default flex-full m-r-1"
          @click="$bvModal.hide('billDetail')"
        >
          취소
        </button>
        <button
          class="jelly-btn jelly-btn--pink flex-full m-l-1"
          @click="onSubmit"
        >
          납부
        </button>
      </div>
    </b-modal>
    <b-modal id="profileImage" size="sm" hide-footer hide-header>
      <div v-if="LOGIN_CONFIG">
        <img
          v-if="!LOGIN_CONFIG.reg_photo"
          src="http://api.school-os.net/data/student/profile/default.png"
          width="100%"
        />
        <img
          v-if="LOGIN_CONFIG.reg_photo"
          :src="`http://api.school-os.net/data/student/profile/${LOGIN_CONFIG.reg_photo}`"
          width="100%"
        />
      </div>
      <div class="m-t-3">
        <p>프로필 수정</p>
        <input
          id="reg_photo"
          ref="reg_photo"
          type="file"
          class="jelly-text jelly-text--h flex-full"
        />
      </div>
      <div class="m-t-5 flex text-center">
        <button
          class="jelly-btn jelly-btn--default flex-full m-r-1"
          @click="$bvModal.hide('profileImage')"
        >
          닫기
        </button>
        <button
          class="jelly-btn jelly-btn--pink flex-full m-l-1"
          @click="onSubmitProfile"
        >
          업로드
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
// import NuxtLogo from '~/components-pc/NuxtLogo'
// import VuetifyLogo from '~/components-mo/modal/'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'IndexPage',
  components: {},
  layout: 'default-mo',
  data() {
    return {
      LOGIN_CONFIG: {},
      params: {},
      statusHeight: {
        effort: 0,
        etiquette: 0,
        health: 0,
        intellect: 0,
      },
      getDataNotice: {
        bd_content: '111',
      },
      getDataStatus: [],
      test: '',
      paramsPost: {},
      detailIdx: '',
      detailPay: '',
      profile: '',
    }
  },
  computed: {
    ...mapState(['LOGIN']),
    ...mapGetters([
      'POST_AXIOS_CALLBACK_GETTER',
      'GET_AXIOS_CALLBACK_GETTER',
      'LOGIN_STUDENT',
    ]),
  },
  created() {
    console.log('[created]')
  },
  mounted() {
    console.log('[ENV]', process.env.VUE_APP_STR)
    console.log('[ENV]', process.env.DB_URL)
    console.log('[ENV]', process.env.VUE_APP_API)
    console.log('[mounted]')

    // DATA INIT
    setTimeout(() => {
      this.LOGIN_CONFIG = JSON.parse(localStorage.getItem('STUDENT'))
      console.log(this.$nuxt, this.$config, this.LOGIN_CONFIG)
      this.params = this.LOGIN_CONFIG
      this.params.type = 'main'
      this.GET_AXIOS(this.params)
    })

    // EVENT
    // console.log('GET', this.GET_AXIOS_CALLBACK_GETTER)
    this.$nextTick(function () {})
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_INIT', 'LOADING_TRUE']),

    // EVENT
    onClickTodoDetail(idx) {
      this.$router.push('/todo-detail/' + idx)
    },
    onClickBillDetail(idx, pay) {
      this.detailIdx = idx
      this.detailPay = pay
      const totalPay =
        Number(this.GET_AXIOS_CALLBACK_GETTER.account.PtotalAccount) -
        Number(this.GET_AXIOS_CALLBACK_GETTER.account.MtotalAccount)
      if (this.detailPay > totalPay) {
        alert('납부할 수 있는 금액이 부족해요')
      } else {
        this.$bvModal.show('billDetail')
      }
    },
    onSubmit() {
      console.log(this.detailIdx)

      this.paramsPost.type = 'billListStudent'
      this.paramsPost.idx = this.detailIdx
      this.paramsPost.sms_idx = this.LOGIN_CONFIG.sms_idx
      this.paramsPost.smt_idx = this.LOGIN_CONFIG.smt_idx
      this.POST_AXIOS(this.paramsPost)
      setTimeout(() => {
        this.params = this.LOGIN_CONFIG
        this.params.type = 'main'
        this.GET_AXIOS(this.params)
        alert('정상적으로 납부되었습니다.')
        this.$bvModal.hide('billDetail')
      }, 1000)
    },
    onSubmitProfile() {
      if (!this.$refs.reg_photo.value) {
        return alert('사진을 먼저 업로드 해주세요')
      }

      // profileImage
      this.LOADING_TRUE()
      this.$bvModal.hide('profileImage')
      const frm = new FormData()
      const photoFile = document.getElementById('reg_photo')

      frm.append('reg_photo', photoFile.files[0])
      frm.append('type', 'profileImage')
      frm.append('sms_idx', this.LOGIN_CONFIG.sms_idx)
      frm.append('reg_id', this.LOGIN_CONFIG.reg_id)
      this.$axios
        .post(process.env.VUE_APP_API + '/student.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res.data)
          this.LOGIN_CONFIG.reg_photo = res.data
          setTimeout(() => {
            localStorage.setItem('STUDENT', JSON.stringify(this.LOGIN_CONFIG))
            this.LOADING_INIT()
          })
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },
  },
}
</script>

<style lang="scss"></style>