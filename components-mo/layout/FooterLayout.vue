<template>
  <div class="jelly-footer">
    <footer>
      <div class="nav">
        <nav class="m-t-1">
          <ul class="flex flex-space m-l-2 m-r-2">
            <li :class="$nuxt._route.name === 'index' ? 'is_active' : ''">
              <nuxt-link to="/">
                <b-icon icon="house"></b-icon>
                <p>홈</p>
              </nuxt-link>
            </li>
            <li
              :class="
                $nuxt._route.name === 'todo-list-id' ||
                $route.name === 'todo-my-list-id'
                  ? 'is_active'
                  : ''
              "
            >
              <b-badge
                v-if="
                  GET_AXIOS_CALLBACK_DATA_LAYOUT_STUDENT &&
                  Number(GET_AXIOS_CALLBACK_DATA_LAYOUT_STUDENT.questCnt) > 0
                "
                variant="danger"
                class="b-badge--footer"
                >{{ GET_AXIOS_CALLBACK_DATA_LAYOUT_STUDENT.questCnt }}</b-badge
              >
              <nuxt-link to="/todo-list/0">
                <b-icon icon="controller"></b-icon>
                <p v-if="LOGIN_CONFIG">
                  {{ LOGIN_CONFIG.t_todo_name }}
                </p>
              </nuxt-link>
            </li>
            <li
              :class="
                $nuxt._route.name === 'parttime-list-id' ||
                $nuxt._route.name === 'parttime-my-list-id'
                  ? 'is_active'
                  : ''
              "
            >
              <!-- <b-badge variant="danger" class="b-badge--footer">2</b-badge> -->
              <nuxt-link to="/parttime-list/0">
                <!-- <b-icon icon="bag"></b-icon> -->
                <b-icon icon="phone-vibrate"></b-icon>
                <p>알바고</p>
              </nuxt-link>
            </li>
            <li
              :class="
                $nuxt._route.name === 'notice-list-id' ||
                $nuxt._route.name === 'notice-read-list-id' ||
                $route.name === 'notice-detail-id'
                  ? 'is_active'
                  : ''
              "
            >
              <b-badge
                v-if="
                  GET_AXIOS_CALLBACK_DATA_LAYOUT_STUDENT &&
                  Number(GET_AXIOS_CALLBACK_DATA_LAYOUT_STUDENT.noticeCnt) > 0
                "
                variant="danger"
                class="b-badge--footer"
                >{{ GET_AXIOS_CALLBACK_DATA_LAYOUT_STUDENT.noticeCnt }}</b-badge
              >
              <nuxt-link to="/notice-list/1">
                <b-icon icon="alarm"></b-icon>
                <p>알림장</p>
              </nuxt-link>
            </li>
            <!-- <li>
              <nuxt-link to="/bill-list">
                <b-icon icon="percent"></b-icon>
                <p>
                  벌금카드
                  <span v-if="GET_AXIOS_CALLBACK_DATA_BILL" class="badge">{{
                    GET_AXIOS_CALLBACK_DATA_BILL
                  }}</span>
                </p>
              </nuxt-link>
            </li> -->
            <!-- <li :class="$nuxt._route.name === 'sue-request' ? 'is_active' : ''">
              <nuxt-link to="/sue-request">
                <b-icon icon="exclamation-triangle"></b-icon>
                <p>신고</p>
              </nuxt-link> -->
            <li>
              <a v-b-toggle href="#footerGnbMore" @click.prevent>
                <b-icon icon="plus-square"></b-icon>
                <p>더보기</p>
              </a>
            </li>
          </ul>
        </nav>
        <b-sidebar id="footerGnbMore" shadow right visible>
          <div class="m-t-3 p-l-3">
            <ul>
              <li>
                <nuxt-link to="/sue-request" class="flex">
                  <!-- <b-icon icon="upc-scan"></b-icon> -->
                  <img src="~/static/mo/icon/attention.png" width="25" />
                  <span class="m-l-2 m-t-1">신고</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/market-list/0" class="flex m-t-4">
                  <!-- <b-icon icon="upc-scan"></b-icon> -->
                  <img src="~/static/mo/icon/store.png" width="25" />
                  <span class="m-l-2 m-t-1">마켓</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/lottery-buy" class="flex m-t-4">
                  <!-- <b-icon icon="upc-scan"></b-icon> -->
                  <img src="~/static/mo/icon/gambling.png" width="25" />
                  <span class="m-l-2 m-t-1">젤리복권</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/rank-list" class="flex m-t-4">
                  <!-- <b-icon icon="upc-scan"></b-icon> -->
                  <img src="~/static/mo/icon/top-three.png" width="25" />
                  <span class="m-l-2 m-t-1">랭킹</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/member/sign-out" class="flex m-t-15">
                  <!-- <b-icon icon="upc-scan"></b-icon> -->
                  <img src="~/static/mo/icon/power-off.png" width="25" />
                  <span class="m-l-2 m-t-1">로그아웃</span>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </b-sidebar>
      </div>
    </footer>
    <div v-if="GET_AXIOS_CALLBACK_GETTER_PW">
      <div v-if="GET_AXIOS_CALLBACK_GETTER_PW.chk === 'C'" class="pwChk">
        <div class="pwChk-warp">
          <h6>비밀번호를 변경 후 <br />이용할 수 있습니다.</h6>
          <div class="input m-t-3">
            <input
              v-model="pw"
              type="password"
              class="jelly-text jelly-text--h wd-full"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div class="input m-t-3">
            <input
              v-model="pw2"
              type="password"
              class="jelly-text jelly-text--h wd-full"
              placeholder="비밀번호를 다시 입력하세요"
            />
          </div>
          <div class="input m-t-3">
            <button
              class="jelly-btn jelly-btn--pink jelly-text--h wd-full"
              @click="onSubmitPw"
            >
              변경하기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  name: 'DefaultLayoutFooter',
  data() {
    return {
      paramsBill: {},
      LOGIN_CONFIG: {},
      pw: '',
      pw2: '',
      params: {
        type: 'pwChk',
      },
      frmLayout: {
        type: 'newLatest',
      },
    }
  },
  computed: {
    ...mapState([
      'LOGIN',
      'GET_AXIOS_CALLBACK_DATA_BILL',
      'GET_AXIOS_CALLBACK_DATA_LAYOUT_STUDENT',
    ]),
    ...mapGetters([
      'GET_AXIOS_CALLBACK_GETTER_PW',
      'LOGIN_STUDENT',
      'GET_AXIOS_CALLBACK_GETTER_LAYOUT_STUDENT',
    ]),
  },
  watch: {
    '$route.path': {
      handler(value) {
        this.$nextTick(() => {
          console.log(
            '+++++++++++++++++++++++++',
            value,
            this.LOGIN_CONFIG.sms_idx
          )
          this.frmLayout.sms_idx = this.LOGIN_CONFIG.sms_idx
          this.frmLayout.smt_idx = this.LOGIN_CONFIG.smt_idx
          this.GET_AXIOS_LAYOUT_STUDENT(this.frmLayout)
          console.log('this.frmLayout', this.frmLayout)
        })
      },
      immediate: true,
    },
  },
  mounted() {
    console.log('FOOTER', this.$nuxt._route.name)
    this.LOGIN_CONFIG = JSON.parse(localStorage.getItem('STUDENT'))
    console.log('FOOTER==========', this.LOGIN_CONFIG)

    this.params = this.LOGIN_CONFIG
    this.params.type = 'pwChk'
    this.GET_AXIOS_PW(this.params)
  },
  methods: {
    ...mapActions(['POST_AXIOS', 'GET_AXIOS_PW', 'GET_AXIOS_LAYOUT_STUDENT']),
    ...mapMutations(['LOADING_TRUE']),

    onSubmitPw() {
      if (!this.pw) {
        return alert('비밀번호를 입력하세요')
      }
      if (!this.pw2) {
        return alert('비밀번호를 입력하세요')
      }
      if (this.pw !== this.pw2) {
        return alert('비밀번호가 다르게 입력되었어요')
      }

      this.LOADING_TRUE()
      const frm = new FormData()
      frm.append('sms_idx', this.LOGIN_CONFIG.sms_idx)
      frm.append('pw', this.pw)
      frm.append('type', 'pwChk')

      this.$axios
        .post(process.env.VUE_APP_API + '/student.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res)
          if (res.data === true) {
            setTimeout(() => {
              alert('비밀번호가 변경되었어요.')
              this.params = this.LOGIN_CONFIG
              this.params.type = 'pwChk'
              this.GET_AXIOS_PW(this.params)
            })
          } else {
            alert('오류가 발생했습니다. 다시 시도해주세요')
          }
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },
  },
}
</script>

<style lang="scss">
@import '~/assets-mo/layout.scss';
@import '~/assets-mo/common.scss';
.b-sidebar.b-sidebar-right > .b-sidebar-header .close {
  margin-right: unset !important;
  margin-left: auto;
}
</style>
