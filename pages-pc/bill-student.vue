<template>
  <div>
    <div class="">
      <div class="flex">
        <h4 v-if="LOGIN_TEACHER">고지서 관리</h4>
        <div class="flex-right">
          <button
            class="jelly-btn jelly-btn--default"
            @click="onClickBillInsert"
          >
            고지서 추가
          </button>
        </div>
      </div>
      <div id="jellyAdminheader" style="padding-top: 0vh">
        <div>
          <div class="m-t-5">
            <span
              class="spanBox m-r-2"
              :class="queryCate ? '' : 'is_active'"
              @click="onClickCategory('')"
              >전체</span
            >
            <span
              class="spanBox m-r-2"
              :class="queryCate === '1' ? 'is_active' : ''"
              @click="onClickCategory('1')"
              >미납</span
            >
          </div>
        </div>
        <div class="student form">
          <div class="student__list">
            <div v-if="GET_AXIOS_CALLBACK_GETTER.billList" class="m-t-3">
              <table class="jelly-table">
                <tr>
                  <th>상태</th>
                  <th>이름</th>
                  <th>고지서 번호</th>
                  <th>금액</th>
                  <th>제목</th>
                  <th>내용</th>
                </tr>
                <tr
                  v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.billList"
                  :key="i"
                >
                  <td>
                    <span v-if="v.status === '0'">[납부전]</span>
                    <span v-if="v.status === '1'" class="jelly-color--type4"
                      >[납부완료]</span
                    >
                  </td>
                  <td>{{ v.reg_name }}</td>
                  <td>{{ v.code }}</td>
                  <td>{{ v.pay | comma }} {{ LOGIN_TEACHER.reg_pay_unit }}</td>
                  <td>{{ v.subject }}</td>
                  <td style="background: #ffffcc">{{ v.content }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="billInsert" size="lg" hide-footer hide-header>
      <div>
        <div class="">
          <div class="flex">
            <div class="flex-full m-r-1">
              <p>학생선택</p>
              <!-- <select
                v-if="GET_AXIOS_CALLBACK_GETTER.studentList"
                v-model="billStudent"
                class="jelly-text wd-full"
              >
                <option value="all">전체발송</option>
                <option
                  v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.studentList"
                  :key="i"
                  :value="v.idx"
                >
                  {{ v.reg_name }}
                </option>
              </select> -->
              <div class="studentScrollArea">
                <div>
                  <div class="flex">
                    <label class="m-l-2 m-t-2">
                      <input v-model="selectAll" type="checkbox" />
                      전체발송
                    </label>
                  </div>
                </div>
                <div
                  v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.studentList"
                  :key="i"
                >
                  <div class="flex">
                    <b-avatar
                      variant="success"
                      icon="people-fill"
                      :src="`http://api.school-os.net/data/student/profile/thumb/${v.reg_photo}`"
                    ></b-avatar>
                    <label class="m-l-2 m-t-2">
                      <input
                        :id="`checked${v.idx}`"
                        :key="i"
                        v-model="checked"
                        type="checkbox"
                        :value="v.idx"
                      />
                      {{ v.reg_name }}
                      ({{ v.reg_id }})
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-full">
              <div class="flex-full m-r-1">
                <p>제목</p>

                <select
                  v-model="billSubject"
                  class="jelly-text wd-full"
                  @change="onSelectETC($event)"
                >
                  <option :value="null">선택하세요</option>
                  <option
                    v-for="v in GET_AXIOS_CALLBACK_GETTER.billListSubject"
                    :key="v.subject"
                    :value="v.subject"
                  >
                    {{ v.subject }}
                  </option>
                  <option value="etc">직접입력</option>
                </select>
                <input
                  v-if="etcInput"
                  type="text"
                  class="jelly-text wd-full m-t-1"
                />
              </div>
              <div class="flex-full m-r-1 m-t-3">
                <p>금액</p>
                <input
                  v-model="billPay"
                  type="text"
                  class="jelly-text wd-full text-right"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="m-t-5">
          <div class="flex-full m-l-1">
            <p>내용</p>
            <textarea
              v-model="billContent"
              class="jelly-text wd-full"
              style="height: 150px"
              placeholder="간결하게 작성해 주세요"
            ></textarea>
          </div>
        </div>

        <div class="m-t-5 text-center">
          <button
            class="jelly-btn jelly-btn--default"
            @click="$bvModal.hide('billInsert')"
          >
            닫기
          </button>
          <button class="jelly-btn jelly-btn--pink" @click="onSubmit">
            발송하기
          </button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  layout: 'default-pc',
  data() {
    return {
      params: {
        type: '',
        queryCate: '',
      },
      paramsPost: {},
      billStudent: [],
      billPay: 0,
      billSubject: null,
      billContent: '',
      queryCate: null,
      checked: [],
      etcInput: false,
    }
  },

  computed: {
    ...mapState(['LOGIN']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_TEACHER']),
    selectAll: {
      get() {
        return this.GET_AXIOS_CALLBACK_GETTER.studentList
          ? this.checked
            ? this.checked.length ===
              this.GET_AXIOS_CALLBACK_GETTER.studentList.length
            : false
          : false
      },
      set(value) {
        const selected = []

        if (value) {
          this.GET_AXIOS_CALLBACK_GETTER.studentList.forEach((com) => {
            selected.push(com.idx)
          })
        }

        this.checked = selected
        this.billStudent = this.checked
      },
    },
  },
  watch: {
    '$route.query.cate': {
      handler(value) {
        console.log(value)
        this.queryCate = value
        if (this.queryCate) {
          this.params = this.LOGIN_TEACHER
          this.params.queryCate = value
          this.params.type = 'billListStudent'
          this.GET_AXIOS(this.params)
        } else {
          this.params.queryCate = null
          this.params = this.LOGIN_TEACHER
          this.params.type = 'billListStudent'
          this.GET_AXIOS(this.params)
        }
      },
      // immediate: true,
    },
  },
  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },
  mounted() {
    //   DATA INIT
    this.params.queryCate = null
    this.queryCate = null
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_TEACHER
    this.params.type = 'billListStudent'
    this.params.queryCate = null
    this.GET_AXIOS(this.params)
    // billCateList
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT
    onClickBillInsert() {
      this.billCateList = null
      this.billPay = 0
      this.billSubject = ''
      this.$bvModal.show('billInsert')
    },
    onSubmit() {
      this.LOADING_TRUE()
      const frm = new FormData()
      frm.append('smt_idx', this.LOGIN_TEACHER.smt_idx)
      frm.append('type', 'billListStudent')
      if (this.billStudent === 'etc') {
        frm.append('billStudent', this.etcInput)
      } else {
        frm.append('billStudent', this.billStudent)
      }
      frm.append('billPay', this.billPay)
      frm.append('billSubject', this.billSubject)
      frm.append('billContent', this.billContent)

      this.$axios
        .post(process.env.VUE_APP_API + '/teacher.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res)
          setTimeout(() => {
            this.params = this.LOGIN_TEACHER
            this.params.type = 'billListStudent'
            this.GET_AXIOS(this.params)
            this.$bvModal.hide('billInsert')
          })
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },
    onClickCategory(e) {
      if (e) {
        this.$router.push(`/bill-student?cate=${e}`)
      } else {
        this.queryCate = null
        this.$router.push(`/bill-student`)
      }
    },
    onSelectETC(e) {
      if (e.target.value === 'etc') {
        this.etcInput = true
      } else {
        this.etcInput = false
        this.billSubject = e.target.value
      }
    },
    onInputETC(e) {
      this.billSubject = e.target.value
    },
  },
}
</script>

<style lang="scss">
.studentScrollArea {
  padding: 10px;
  height: 300px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow-y: auto;
  > div {
    border-bottom: 1px solid #ddd;
    padding: 7px 0;
  }
}
</style>
