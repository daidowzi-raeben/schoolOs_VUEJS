<template>
  <div>
    <div
      id="jellyAdminBG"
      class="jellyAdminBG"
      :style="`background-image:url(${adminBackgroundImage});position:fixed;width:100%;height:100%;background-size:100% 100%; top:0; left:0; opacity:.5`"
    ></div>
    <div v-if="!queryStep">
      <h1>Hellow, Jelly Word</h1>
      <div>
        스쿨오에스 젤리는 학급의 사회 문화와 경제학에 도움을 주며 무료로 사용할
        수 있습니다.
        <br />
        주 거래 은행을 통해 대출을 받아 이자를 상환하고, 학생들에게 직업을
        부여하며 주급을 지급할 수 있습니다.
        <br />
        또한 부랴부랴 설명
      </div>
      <div>
        <input
          v-model="reg_country"
          type="text"
          class="jelly-text"
          placeholder="학급 이름"
        />
      </div>
      <div><button @click="onClickNextStep">다음</button></div>
    </div>
    <div v-if="queryStep == '1'">
      <h1>회원가입을 시작합니다</h1>
      <div>기본정보를 입력해 주세요</div>
      <div>
        <div>
          <input
            v-model="reg_id"
            type="text"
            class="jelly-text"
            placeholder="아이디"
          />
        </div>
        <div>
          <input
            v-model="reg_pw"
            type="text"
            class="jelly-text"
            placeholder="패스워드"
          />
        </div>
        <div>
          <input
            v-model="reg_pw2"
            type="text"
            class="jelly-text"
            placeholder="패스워드"
          />
        </div>
        <div>
          <input
            v-model="reg_name"
            type="text"
            class="jelly-text"
            placeholder="이름"
          />
        </div>
        <div>
          <input
            v-model="reg_email"
            type="text"
            class="jelly-text"
            placeholder="이메일"
          />
        </div>
        <div>
          <input
            v-model="reg_phone"
            type="text"
            class="jelly-text"
            placeholder="연락처"
          />
        </div>
        <div>
          <input
            v-model="reg_pay_unit"
            type="text"
            class="jelly-text"
            placeholder="화폐이름"
          />
        </div>
        <div>
          <input
            v-model="todo_name"
            type="text"
            class="jelly-text"
            placeholder="TODO LIST 이름 ex)퀘스트, 할일 등"
          />
        </div>
        <div>
          <!-- <input id="reg_photo" type="file" /> -->
        </div>
      </div>
      <div><button @click="onClickNextStep(2)">다음</button></div>
    </div>
    <div v-if="queryStep == '2'">
      <h1>학교를 검색하세요</h1>
      <div>
        <div>
          <input v-model="searchSchool" class="jelly-text" type="text" />
          <button @click="onClickSchoolSearch">검색</button>
          <div>
            학교리스트
            <div v-if="GET_AXIOS_CALLBACK_GETTER.schoolList">
              <div
                v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.schoolList"
                :key="i"
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
      <h1>학년과 학급을 알려주세요</h1>
      <div>
        <input v-model="reg_level" type="text" class="jelly-text" />학년
        <input v-model="reg_class" type="text" class="jelly-text" />반
      </div>
      <div><button @click="onClickNextStep(4)">다음</button></div>
    </div>
    <div v-if="queryStep == '4'">
      <h1>주 거래 은행을 선택합니다.</h1>
      <div>
        주 거래 은행에 따라 금리가 다르며, 변동금리는 이용자 및 대출 금액에 따라
        금리변동 폭이 클수도 적을수도 있습니다.<br />
        주 거래 은행은 변경할 수 없으니 신중히 선택해 주시기 바랍니다.
      </div>
      <div v-if="GET_AXIOS_CALLBACK_GETTER.bankList">
        <div
          v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.bankList"
          :key="`bank${i}`"
          @click="onClickSchoolBank(v.idx)"
        >
          {{ v.sb_name }}
          <span v-if="v.interest_type === '0'">변동</span>
          <span v-else>고정</span>
          {{ v.interest_total }}%
        </div>
      </div>
    </div>
    <div v-if="queryStep == '5'">
      <h1>인플레이션 모드를 사용하시겠습니까?</h1>
      <div>
        인플레이션 모드는 학급이 주 거래 은행을 통해 대출을 받을때마다 화폐의
        가치가 떨어지며, 상점에서 구입 가능한 상품들에 인플레이션이 적용됩니다.
        <br />
        운영에 따라 파산을 해야하는 경우가 발생할 수 있으니 신중히 운영하시기
        바랍니다.
      </div>
      <select v-model="inflation" class="jelly-text">
        <option value="Y">사용</option>
        <option value="N">미사용</option>
      </select>
      <div><button @click="onClickNextStep">가입하기</button></div>
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
        })
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
* {
  color: #fff;
}
body {
  background-color: #fff;
}
</style>
