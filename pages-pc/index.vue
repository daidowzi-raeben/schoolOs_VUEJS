<template>
  <div v-if="LOGIN_CONFIG && GET_AXIOS_CALLBACK_GETTER.total_pay">
    <div class="">
      <div id="jellyAdminheader">
        <span>{{ today }}</span>
        <h1 v-if="LOGIN_CONFIG && GET_AXIOS_CALLBACK_GETTER.total_pay">
          {{ LOGIN_CONFIG.reg_country }}
          <span
            v-b-tooltip.hover
            title="현재 재산"
            class="spanBox"
            @click="onClickTeacherPayList"
          >
            {{ GET_AXIOS_CALLBACK_GETTER.total_pay.total_pay | comma }}
            {{ LOGIN_CONFIG.reg_pay_unit }}
          </span>
        </h1>

        <div v-if="GET_AXIOS_CALLBACK_GETTER.teacher" class="student">
          <div class="student__list clb">
            <h3>환경 설정</h3>
            <div class="m-t-3">
              <div
                v-if="GET_AXIOS_CALLBACK_GETTER.teacher.rule_cnt === '0'"
                class="item"
              >
                <nuxt-link to="job-list">
                  <p class="title">규칙설정 &gt;</p>
                  <div class="flex">
                    <div class="list">
                      <p style="color: #ffffcc">
                        학생들이 지켜야 할 규칙을 작성해 주세요
                      </p>
                    </div>
                  </div>
                </nuxt-link>
              </div>
              <div
                v-if="GET_AXIOS_CALLBACK_GETTER.teacher.job_cnt === '0'"
                class="item"
              >
                <nuxt-link to="job-list">
                  <p class="title">직업설정 &gt;</p>
                  <div class="flex">
                    <div class="list">
                      <p style="color: #ffffcc">
                        학생들의 직업과 주급을 지정해 주세요
                      </p>
                    </div>
                  </div>
                </nuxt-link>
              </div>
              <div
                v-if="!GET_AXIOS_CALLBACK_GETTER.teacher.jb_mode"
                class="item"
              >
                <nuxt-link to="teacher-setting">
                  <p class="title">젤리복권 &gt;</p>
                  <div class="flex">
                    <div class="list">
                      <p style="color: #ffffcc">
                        젤리복권 사용여부와 판매금액을 설정해 주세요
                      </p>
                    </div>
                  </div>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>

        <div v-if="GET_AXIOS_CALLBACK_GETTER.lotto_list" class="student">
          <div class="student__list clb">
            <h3>이번주 젤리복권 구매 현황</h3>
            <div class="m-t-3">
              <div
                v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.lotto_list"
                :key="i"
                class="item"
              >
                <p class="title">{{ v.reg_name }}</p>
                <div class="flex">
                  <div class="list">
                    <p>{{ v.buy_date }}</p>
                    <p>
                      {{ v.status === '1' ? v.cnt + '개 맞음' : '추첨중' }}
                    </p>
                    <p>
                      {{ v.num1 }}, {{ v.num2 }}, {{ v.num3 }}, {{ v.num4 }},
                      {{ v.num5 }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="GET_AXIOS_CALLBACK_GETTER.attendance" class="student">
          <div class="student__list clb">
            <h3>출결 현황</h3>
            <div class="m-t-3">
              <div
                v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.attendance"
                :key="i"
                class="item"
              >
                <p class="title">{{ v.reg_name }}</p>
                <div class="flex">
                  <div class="list">
                    <p>{{ v.smsa_date }}</p>
                    <p>{{ v.subject }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="GET_AXIOS_CALLBACK_GETTER.quest" class="student">
        <div class="student__list">
          <h3 v-if="LOGIN_CONFIG">
            진행중인 {{ LOGIN_CONFIG.todo_name }}
            <!-- ({{ studentName.length }}) -->
          </h3>
          <div class="m-t-3 clb">
            <div
              v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.quest"
              :key="i"
              class="item"
              style="min-width: calc((100% / 2) - 20px)"
            >
              <div class="">
                <p class="title">
                  <!-- <span class="jelly-point m-t-0 jelly-background--type1 m-l-1">
                    {{ v.cate === 1 ? 'M' : 'S' }}
                  </span> -->
                  {{ v.subject }}
                </p>
                <span class="jelly-point m-t-0 jelly-background--type1 m-l-1">
                  {{ v.intellect }}</span
                >
                <span class="jelly-point m-t-0 jelly-background--type2 m-l-1">{{
                  v.effort
                }}</span>
                <span class="jelly-point m-t-0 jelly-background--type3 m-l-1">{{
                  v.health
                }}</span>
                <span class="jelly-point m-t-0 jelly-background--type4 m-l-1">{{
                  v.etiquette
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="student"></div>
    </div>
    <b-modal id="teacherPayList" size="lg" hide-footer hide-header>
      <div style="max-height: 50vh; overflow-y: auto">
        <table class="jelly-table">
          <thead>
            <tr>
              <th>일시</th>
              <th>구분</th>
              <th>금액</th>
              <th>내용</th>
            </tr>
          </thead>
          <!-- 0:대출,1:주급,2:이자,3:기타,4:상품등록수수료,5:세금,6:정부마켓,7:마켓,8:가입,9:알바 -->
          <tbody v-if="totalPay.list">
            <tr v-for="(v, i) in totalPay.list" :key="`table${i}`">
              <td>{{ v.datetime }}</td>
              <td v-if="v.status === '0'">대출</td>
              <td v-if="v.status === '1'">주급</td>
              <td v-if="v.status === '2'">이자</td>
              <td v-if="v.status === '3'">기타</td>
              <td v-if="v.status === '4'">수수료</td>
              <td v-if="v.status === '5'">세금</td>
              <td v-if="v.status === '6'">정부마켓</td>
              <td v-if="v.status === '7'">마켓</td>
              <td v-if="v.status === '8'">가입</td>
              <td v-if="v.status === '9'">알바고</td>
              <td
                class="text-center"
                :class="Number(v.pay) < 0 ? 'jelly-color--type4' : ''"
              >
                {{ v.pay | comma }}
              </td>
              <td v-if="v.status === '0'">{{ v.bank_memo }} 대출</td>
              <td v-if="v.status === '1'">{{ v.student_memo }} 주급 지급</td>
              <td v-if="v.status === '2'">{{ v.bank_memo }} 이자</td>
              <td v-if="v.status === '3'">기타</td>
              <td v-if="v.status === '4'">{{ v.item_memo }} 상품판매수수료</td>
              <td v-if="v.status === '5'">{{ v.student_memo }} 세금</td>
              <td v-if="v.status === '6'">
                {{ v.bill_memo }}
              </td>
              <td v-if="v.status === '7'">{{ v.item_memo }} 판매</td>
              <td v-if="v.status === '8'">가입</td>
              <td v-if="v.status === '9'">{{ v.alba_name }} 알바비 지급</td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'IndexPage',
  components: {},
  layout: 'default-pc',
  data() {
    return {
      LOGIN_CONFIG: {},
      params: {},
      studentName: [
        '민준',
        '서준',
        '도윤',
        '예준',
        '시우',
        '하준',
        '주원',
        '지호',
      ],
      today: '',
      isReadLength: 0,
      totalPay: {
        list: {},
      },
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
    // console.log(this.$nuxt, this.$config)
    this.LOGIN_CONFIG = JSON.parse(localStorage.getItem('TEACHER'))
    console.log(this.$nuxt, this.$config, this.LOGIN_CONFIG)
    this.params = this.LOGIN_CONFIG
    this.params.type = 'main'
    this.GET_AXIOS(this.params)

    this.today = this.getToday()
    // console.log('================', this.isNoticeLength())
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    // ...mapMutations(),

    getToday() {
      const date = new Date()
      const year = date.getFullYear()
      const month = ('0' + (1 + date.getMonth())).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      return year + '.' + month + '.' + day
    },

    // isNoticeLength() {
    //   setTimeout(() => {
    //     const data = this.GET_AXIOS_CALLBACK_GETTER.notice
    //     data.forEach((element) => {
    //       console.log(element)
    //     })
    //   })
    // },
    onClickTeacherPayList() {
      const frm = new FormData()
      frm.append('type', 'teacherPayList')
      frm.append('smt_idx', this.LOGIN_CONFIG.smt_idx)
      this.$axios
        .post(process.env.VUE_APP_API + '/teacher.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res.data)
          this.totalPay.list = res.data.teacherPayList
          this.$bvModal.show('teacherPayList')
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },
  },
}
</script>

<style lang="scss"></style>
