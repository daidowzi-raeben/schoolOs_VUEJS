<template>
  <div>
    <div id="jellyAdminBG"></div>
    <div style="" class="registor">
      <div v-if="!queryStep">
        <h1 class="dancing" style="font-size: 80px">Hello, Jelly World</h1>
        <div class="font-16 m-t-10" style="line-height: 30px">
          스쿨오에스 젤리는 학급의 사회 문화와 경제교육에 도움을 주며 무료로
          사용할 수 있습니다.
          <br />
          주 거래 은행을 통해 대출을 받아 이자를 상환하고, 학생들에게 직업을
          부여하며 급여를 지급할 수 있습니다.
        </div>
        <div class="m-t-10">
          <p class="discription">우리 학급의 이름을 알려주세요.</p>
          <input
            v-model="reg_country"
            type="text"
            class="jelly-text"
            style="height: 50px; width: 300px"
            placeholder="학급 이름"
            @keyup.enter="onClickNextStep"
          />
        </div>
        <div class="m-t-5">
          <p class="discription">학생들이 수행할 일의 명칭을 알려주세요.</p>
          <input
            v-model="todo_name"
            type="text"
            class="jelly-text"
            style="height: 50px; width: 300px"
            placeholder="TODO LIST 이름 ex)퀘스트, 할일 등"
            @keyup.enter="onClickNextStep(2)"
          />
        </div>
        <div class="m-t-5">
          <p class="discription">사용할 화폐의 이름은 무엇인가요?</p>
          <input
            v-model="reg_pay_unit"
            type="text"
            class="jelly-text"
            style="height: 50px; width: 300px"
            placeholder="화폐이름"
          />
        </div>
        <div class="m-t-5">
          <p v-if="!reg_pay_unit" class="discription">
            이 화폐로 츄파츕스는 얼마인가요?
          </p>
          <p v-if="reg_pay_unit" class="discription">
            {{ reg_pay_unit }}로 츄파츕스를 얼마에 파실건가요?<br />
            입력한 츄파츕스의 금액을 기준으로 환율이 결정됩니다.
          </p>
          <input
            v-model="reg_pay_rate"
            type="text"
            class="jelly-text text-right"
            style="height: 50px; width: 300px"
            placeholder="츄파츕스 가격"
          />
          {{ reg_pay_unit }}
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
        <h1 class="" style="font-size: 50px">회원가입을 시작합니다</h1>
        <div class="font-20 m-t-10" style="line-height: 30px">
          기본정보를 입력해 주세요
        </div>
        <div class="m-t-10">
          <div>
            <input
              v-model="reg_id"
              type="text"
              class="jelly-text"
              style="height: 50px; width: 300px"
              placeholder="아이디"
            />
          </div>
          <div class="m-t-5">
            <input
              v-model="reg_pw"
              type="password"
              class="jelly-text"
              style="height: 50px; width: 300px"
              placeholder="패스워드"
            />
          </div>
          <div class="m-t-5">
            <input
              v-model="reg_pw2"
              type="password"
              class="jelly-text"
              style="height: 50px; width: 300px"
              placeholder="패스워드 확인"
            />
          </div>
          <div class="m-t-5">
            <input
              v-model="reg_name"
              type="text"
              class="jelly-text"
              style="height: 50px; width: 300px"
              placeholder="이름"
            />
          </div>
          <div class="m-t-5">
            <input
              v-model="reg_email"
              type="text"
              class="jelly-text"
              style="height: 50px; width: 300px"
              placeholder="이메일"
            />
          </div>
          <div class="m-t-5">
            <input
              v-model="reg_phone"
              type="text"
              class="jelly-text"
              style="height: 50px; width: 300px"
              placeholder="연락처"
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
        <h1 class="" style="font-size: 50px">근무중인 학교를 검색하세요</h1>
        <div class="m-t-10">
          <div class="flex">
            <input
              v-model="searchSchool"
              class="jelly-text"
              style="height: 50px; width: 300px"
              type="text"
              @keyup.enter="onClickSchoolSearch"
            />
            <button
              class="jelly-btn jelly-btn--default m-l-2"
              style="height: 50px"
              @click="onClickSchoolSearch"
            >
              검색
            </button>
          </div>
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
                  cursor: pointer;
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
      <div v-if="queryStep == '3'">
        <h1 class="" style="font-size: 50px">학년과 학급을 알려주세요</h1>
        <div class="m-t-10">
          <input
            v-model="reg_level"
            type="text"
            class="jelly-text"
            style="height: 50px; width: 300px"
          />학년
          <input
            v-model="reg_class"
            type="text"
            class="jelly-text m-l-3"
            style="height: 50px; width: 300px"
            @keyup.enter="onClickNextStep(4)"
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
        <h1 class="" style="font-size: 50px">주 거래 은행을 선택합니다.</h1>
        <div class="m-t-10" style="line-height: 30px">
          주 거래 은행에 따라 금리가 다르며, 변동금리는 이용자 및 대출 금액에
          따라 금리변동 폭이 클수도 적을수도 있습니다.<br />
          주 거래 은행은 변경할 수 없으니 신중히 선택해 주시기 바랍니다.
        </div>
        <div v-if="GET_AXIOS_CALLBACK_GETTER.bankList" class="m-t-10">
          <div
            v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.bankList"
            :key="`bank${i}`"
            style="
              border-bottom: 1px solid #ddd;
              margin: 10px 0;
              padding: 10px;
              cursor: pointer;
            "
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
        <h1 class="" style="font-size: 50px">
          인플레이션 모드를 사용하시겠습니까?
        </h1>
        <div class="m-t-10" style="line-height: 30px">
          인플레이션 모드는 주거래 은행의 대출을 통한 학급의 통화량에 따라
          화폐의 가치가 변하며, 상점에서 구입 가능한 상품들의 가격이 변동됩니다.
          <br />
          선생님의 운영에 따라 학급에 혼란이 올 수 있으니 신중히 선택하시기
          바랍니다.
          <!-- 
          인플레이션 모드는 학급이 주 거래 은행을 통해 대출을 받을때마다 화폐의
          가치가 떨어지며, 상점에서 구입 가능한 상품들에 인플레이션이
          적용됩니다.
          <br />
          운영에 따라 파산을 해야하는 경우가 발생할 수 있으니 신중히 운영하시기
          바랍니다. -->
        </div>
        <select
          v-model="inflation"
          class="jelly-text m-t-10"
          style="height: 50px; width: 300px"
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
      reg_pay_rate: '',
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
        if (
          !this.reg_country ||
          !this.reg_pay_unit ||
          !this.todo_name ||
          !this.reg_pay_rate
        ) {
          return alert('모든 정보를 입력해 주세요')
        }
        sessionStorage.setItem('reg_country', this.reg_country)
        sessionStorage.setItem('reg_pay_unit', this.reg_pay_unit)
        sessionStorage.setItem('reg_pay_rate', this.reg_pay_rate)
        sessionStorage.setItem('todo_name', this.todo_name)
      }
      if (this.queryStep === '1') {
        if (this.reg_pw !== this.reg_pw2) {
          return alert('패스워드가 일치하지 않습니다')
        }
        if (
          !this.reg_id ||
          !this.reg_pw ||
          !this.reg_name ||
          !this.reg_email ||
          !this.reg_phone
        ) {
          return alert('모든 정보를 입력해 주세요')
        }

        if (this.reg_id) {
          const frm = new FormData()
          frm.append('type', 'teacherId_chk')
          frm.append('reg_id', this.reg_id)
          this.$axios
            .post(process.env.VUE_APP_API + '/teacher.php', frm, {
              header: {
                'Context-Type': 'multipart/form-data',
              },
            })
            .then((res) => {
              console.log(res.data)
              if (res.data != '0') {
                return alert('이미 사용중인 아이디 입니다.')
              } else {
                this.$router.push('/member/sign-up?step=' + e)
              }
            })
            .catch((res) => {
              console.log('AXIOS FALSE', res)
            })
        }
        sessionStorage.setItem('reg_id', this.reg_id)
        sessionStorage.setItem('reg_pw', this.reg_pw)
        sessionStorage.setItem('reg_name', this.reg_name)
        sessionStorage.setItem('reg_email', this.reg_email)
        sessionStorage.setItem('reg_phone', this.reg_phone)

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
        alert('가입완료 되었습니다. 로그인 후 이용가능 합니다.')
        sessionStorage.clear()
        this.$router.push('/member/sign-in')
        return false
      }

      if (!this.queryStep) {
        this.$router.push('/member/sign-up?step=1')
      } else {
        console.log('0')
        if (this.queryStep !== '1') {
          this.$router.push('/member/sign-up?step=' + e)
        }
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
@import '~/assets-pc/common.scss';

// * {
//   color: #111;
// }
body {
  background-color: #f1f1f1;
}
</style>
