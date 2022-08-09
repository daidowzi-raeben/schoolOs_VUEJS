<template>
  <div>
    <div
      id="jellyAdminBG"
      class="jellyAdminBG"
      :style="`background-image:url(${adminBackgroundImage});position:fixed;width:100%;height:100%;background-size:100% 100%; top:0; left:0; opacity:.5`"
    ></div>
    <div style="width: 1200px; margin: 50px auto" class="text-white">
      <div v-if="!queryStep">
        <h1 class="text-white" style="font-size: 50px">Hello, Jelly Word</h1>
        <div class="font-20 m-t-10 text-white" style="line-height: 30px">
          스쿨오에스 젤리는 학급의 사회 문화와 경제학에 도움을 주며 무료로
          사용할 수 있습니다.
          <br />
          주 거래 은행을 통해 대출을 받아 이자를 상환하고, 학생들에게 직업을
          부여하며 주급을 지급할 수 있습니다.
          <br />
          우리 학급의 이름을 알려주세요.
        </div>
        <div class="m-t-10">
          <input
            v-model="reg_country"
            type="text"
            class="jelly-text"
            style="background: #fff; color: #000; height: 50px; width: 300px"
            placeholder="학급 이름"
          />
        </div>
        <div>
          <button
            class="jelly-btn jelly-btn--default m-t-10"
            @click="onClickNextStep"
          >
            다음 >
          </button>
        </div>
      </div>
      <div v-if="queryStep == '1'">
        <h1 class="text-white" style="font-size: 50px">
          회원가입을 시작합니다
        </h1>
        <div class="font-20 m-t-10 text-white" style="line-height: 30px">
          기본정보를 입력해 주세요
        </div>
        <div class="m-t-10">
          <div>
            <input
              v-model="reg_id"
              type="text"
              class="jelly-text"
              style="background: #fff; color: #000; height: 50px; width: 300px"
              placeholder="아이디"
            />
          </div>
          <div class="m-t-5">
            <input
              v-model="reg_pw"
              type="password"
              class="jelly-text"
              style="background: #fff; color: #000; height: 50px; width: 300px"
              placeholder="패스워드"
            />
          </div>
          <div class="m-t-5">
            <input
              v-model="reg_pw2"
              type="password"
              class="jelly-text"
              style="background: #fff; color: #000; height: 50px; width: 300px"
              placeholder="패스워드"
            />
          </div>
          <div class="m-t-5">
            <input
              v-model="reg_name"
              type="text"
              class="jelly-text"
              style="background: #fff; color: #000; height: 50px; width: 300px"
              placeholder="이름"
            />
          </div>
          <div class="m-t-5">
            <input
              v-model="reg_email"
              type="text"
              class="jelly-text"
              style="background: #fff; color: #000; height: 50px; width: 300px"
              placeholder="이메일"
            />
          </div>
          <div class="m-t-5">
            <input
              v-model="reg_phone"
              type="text"
              class="jelly-text"
              style="background: #fff; color: #000; height: 50px; width: 300px"
              placeholder="연락처"
            />
          </div>
          <div class="m-t-5">
            <input
              v-model="reg_pay_unit"
              type="text"
              class="jelly-text"
              style="background: #fff; color: #000; height: 50px; width: 300px"
              placeholder="화폐이름"
            />
          </div>
          <div class="m-t-5">
            <input
              v-model="todo_name"
              type="text"
              class="jelly-text"
              style="background: #fff; color: #000; height: 50px; width: 300px"
              placeholder="TODO LIST 이름 ex)퀘스트, 할일 등"
            />
          </div>
          <div>
            <!-- <input id="reg_photo" type="file" /> -->
          </div>
        </div>
        <div>
          <button
            class="jelly-btn jelly-btn--default m-t-10"
            @click="onClickNextStep(2)"
          >
            다음 >
          </button>
        </div>
      </div>
      <div v-if="queryStep == '2'">
        <h1 class="text-white" style="font-size: 50px">학교를 검색하세요</h1>
        <div>
          <div>
            <input
              v-model="searchSchool"
              class="jelly-text"
              style="background: #fff; color: #000; height: 50px; width: 300px"
              type="text"
            />
            <button
              class="jelly-btn jelly-btn--default m-t-10"
              style="height: 50px"
              @click="onClickSchoolSearch"
            >
              검색
            </button>
            <div>
              <!-- 학교리스트 -->
              <div v-if="GET_AXIOS_CALLBACK_GETTER.schoolList" class="m-t-5">
                <div
                  v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.schoolList"
                  :key="i"
                  style="
                    border-bottom: 1px solid #ddd;
                    margin: 10px 0;
                    padding: 10px;
                  "
                  @click="onClickSchoolSelect(v.idx)"
                >
                  {{ v.school }}
                  {{ v.addr }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="queryStep == '3'">
        <h1 class="text-white" style="font-size: 50px">
          학년과 학급을 알려주세요
        </h1>
        <div class="m-t-10">
          <input
            v-model="reg_level"
            type="text"
            class="jelly-text"
            style="background: #fff; color: #000; height: 50px; width: 300px"
          />학년
          <input
            v-model="reg_class"
            type="text"
            class="jelly-text m-l-3"
            style="background: #fff; color: #000; height: 50px; width: 300px"
          />반
        </div>
        <div>
          <button
            class="jelly-btn jelly-btn--default m-t-10"
            @click="onClickNextStep(4)"
          >
            다음
          </button>
        </div>
      </div>
      <div v-if="queryStep == '4'">
        <h1 class="text-white" style="font-size: 50px">
          주 거래 은행을 선택합니다.
        </h1>
        <div class="m-t-10 text-white" style="line-height: 30px">
          주 거래 은행에 따라 금리가 다르며, 변동금리는 이용자 및 대출 금액에
          따라 금리변동 폭이 클수도 적을수도 있습니다.<br />
          주 거래 은행은 변경할 수 없으니 신중히 선택해 주시기 바랍니다.
        </div>
        <div v-if="GET_AXIOS_CALLBACK_GETTER.bankList" class="m-t-10">
          <div
            v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.bankList"
            :key="`bank${i}`"
            style="border-bottom: 1px solid #ddd; margin: 10px 0; padding: 10px"
            @click="onClickSchoolBank(v.idx)"
          >
            {{ v.sb_name }}
            <span v-if="v.interest_type === '0'">변동금리</span>
            <span v-else>고정금리</span>
            {{ v.interest_total }}%
          </div>
        </div>
      </div>
      <div v-if="queryStep == '5'">
        <h1 class="text-white" style="font-size: 50px">
          인플레이션 모드를 사용하시겠습니까?
        </h1>
        <div class="m-t-10 text-white" style="line-height: 30px">
          인플레이션 모드는 학급이 주 거래 은행을 통해 대출을 받을때마다 화폐의
          가치가 떨어지며, 상점에서 구입 가능한 상품들에 인플레이션이
          적용됩니다.
          <br />
          운영에 따라 파산을 해야하는 경우가 발생할 수 있으니 신중히 운영하시기
          바랍니다.
        </div>
        <select
          v-model="inflation"
          class="jelly-text m-t-10"
          style="background: #fff; color: #000; height: 50px; width: 300px"
        >
          <option :value="null">선택</option>
          <option value="Y">사용</option>
          <option value="N">미사용</option>
        </select>
        <div>
          <button
            class="jelly-btn jelly-btn--default m-t-10"
            @click="onClickNextStep"
          >
            가입하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import { axiosForm } from '~/config/util'

export default {
  name: 'SignUpIndex',
  data() {
    return {
      params: {},
      queryStep: '',
      reg_id: '',
      reg_pw: '',
      reg_pw2: '',
      reg_name: '',
      reg_email: '',
      reg_phone: '',
      reg_pay_unit: '',
      todo_name: '',
      searchSchool: '',
      reg_level: '',
      reg_class: '',
      reg_country: '',
      inflation: 'Y',
      adminBackgroundImage: '/pc/img/bg/london-bridge-by-sunny.jpg',
    }
  },
  computed: {
    ...mapState(['LOGIN', 'adminMainBG']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_TEACHER']),
  },
  watch: {
    '$route.query.step': {
      handler(value) {
        console.log(value)
        this.queryStep = value
        this.getAxios()
      },
      immediate: true,
    },
    adminMainBG: {
      handler(value) {
        console.log('================>', value)
        this.adminBackgroundImage = value
      },
      immediate: true,
    },
  },
  created() {
    // this.queryStep = this.$route.query.step
  },
  mounted() {
    this.GET_API_BG_PIXABAY('여름')
    console.log('query', this.$route.query)
    this.getAxios()
  },
  methods: {
    ...mapActions(['POST_AXIOS', 'GET_AXIOS', 'GET_API_BG_PIXABAY']),
    ...mapMutations(['ADMIN_MAIN_BG_MUTATIONS']),

    getAxios() {
      if (this.queryStep === '4') {
        this.params.type = 'bankList'
        setTimeout(() => {
          this.GET_AXIOS(this.params)
        }, 1000)
      }
    },
    onClickNextStep(e) {
      if (!this.queryStep) {
        sessionStorage.setItem('reg_country', this.reg_country)
      }
      if (this.queryStep === '1') {
        sessionStorage.setItem('reg_id', this.reg_id)
        sessionStorage.setItem('reg_pw', this.reg_pw)
        sessionStorage.setItem('reg_name', this.reg_name)
        sessionStorage.setItem('reg_email', this.reg_email)
        sessionStorage.setItem('reg_phone', this.reg_phone)
        sessionStorage.setItem('reg_pay_unit', this.reg_pay_unit)
        sessionStorage.setItem('todo_name', this.todo_name)
        console.log('=======================')
      }
      if (this.queryStep === '3') {
        sessionStorage.setItem('reg_level', this.reg_level)
        sessionStorage.setItem('reg_class', this.reg_class)
        console.log('=======================')
      }
      if (this.queryStep === '5') {
        sessionStorage.setItem('inflation', this.inflation)
        console.log('+++++++++++++++++ END +++++++++++++++++')
        const sessionPost = sessionStorage
        console.log('sessionPost', sessionPost)
        // register
        const FORM_DATA = new FormData()
        FORM_DATA.append('type', 'register')
        Object.entries(sessionPost).forEach((v, i) => {
          FORM_DATA.append(v[0], v[1])
        })
        axiosForm(FORM_DATA, '/teacher.php')
        alert('가입완료')
        sessionStorage.clear()
        this.$router.push('/member/sign-in')
        return false
      }

      if (!this.queryStep) {
        this.$router.push('/member/sign-up?step=1')
      } else {
        this.$router.push('/member/sign-up?step=' + e)
      }
    },
    onClickSchoolSearch() {
      this.params.type = 'schoolMaster'
      this.params.str = this.searchSchool
      this.GET_AXIOS(this.params)
    },
    onClickSchoolSelect(e) {
      sessionStorage.setItem('reg_school', e)
      this.$router.push('/member/sign-up?step=3')
    },
    onClickSchoolBank(e) {
      sessionStorage.setItem('bank_idx', e)
      this.$router.push('/member/sign-up?step=5')
    },
  },
}
</script>

<style lang="scss">
// * {
//   color: #fff;
// }
body {
  background-color: #fff;
}
</style>
