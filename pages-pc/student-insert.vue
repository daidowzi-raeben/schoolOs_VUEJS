<template>
  <div>
    <div class="">
      <div class="flex">
        <h4 v-if="LOGIN_TEACHER" class="is_active">학생등록</h4>
        <button
          class="jelly-btn jelly-btn--default flex-right"
          onclick="window.open('/pc/sample.xlsx')"
        >
          엑셀 샘플 다운로드
        </button>
      </div>
      <div id="jellyAdminheader" style="padding-top: 0vh">
        <!-- <span>{{ today }}</span> -->
        <!-- <h1 v-if="LOGIN_TEACHER" class="">가입코드</h1> -->
        <div class=" ">
          <div class="">
            <div class="m-t-5">
              <p>
                우측 상단 다운로드를 통해 학생이름을 나열하여 업로드 해주세요
              </p>
              <div class="item wd-full flex" style="width: 100%">
                <input
                  type="file"
                  class="jelly-text jelly-text--h"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  @change="readFile"
                />
                <button
                  v-if="!GET_AXIOS_CALLBACK_GETTER.studentList"
                  class="jelly-btn jelly-btn--pink jelly-text--h m-l-2"
                  :disabled="isBtnActive"
                  @click="onSubmit"
                >
                  저장하기
                </button>
              </div>
              <div class="m-t-5">
                <div>
                  <p>
                    학생 목록을 확인 후 <em class="bold">저장하기</em>를
                    눌러주세요
                    <br />
                    저장하기를 누르시면 아이디와 패스워드가 자동 생성됩니다.
                  </p>
                  <table
                    v-if="!GET_AXIOS_CALLBACK_GETTER.studentList"
                    class="jelly-table wd-full"
                  >
                    <col style="width: 100px" />
                    <col style="width: 150px" />
                    <col style="width: auto" />
                    <col style="width: auto" />
                    <tr>
                      <th>출석번호</th>
                      <th>이름</th>
                      <th>아이디</th>
                      <th>비밀번호</th>
                    </tr>
                    <tr v-for="(v, i) in studentList.name" :key="i">
                      <td>
                        {{ studentList.classNumber[i] }}
                      </td>
                      <td>
                        {{ v }}
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                  </table>
                  <table
                    v-if="GET_AXIOS_CALLBACK_GETTER.studentList"
                    class="jelly-table wd-full"
                  >
                    <col style="width: 100px" />
                    <col style="width: 150px" />
                    <col style="width: auto" />
                    <col style="width: auto" />
                    <tr>
                      <th>출석번호</th>
                      <th>이름</th>
                      <th>아이디</th>
                      <th>비밀번호</th>
                    </tr>
                    <tr
                      v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.studentList"
                      :key="i"
                    >
                      <td>
                        {{ v.classNumber }}
                      </td>
                      <td>
                        {{ v.reg_name }}
                      </td>
                      <td>
                        {{ v.reg_id }}
                      </td>
                      <td>
                        {{ v.reg_pw }}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import * as XLSX from 'xlsx'

export default {
  layout: 'default-pc',
  data() {
    return {
      params: {},
      isBtnActive: true,
      studentList: {
        classNumber: [],
        name: [],
      },
      getStudent: {
        id: [],
        pw: [],
        name: [],
        classNumber: [],
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
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_TEACHER
    this.params.type = 'studentAll'
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    readFile(event) {
      this.file = event.target.files ? event.target.files[0] : null
      if (this.file) {
        const reader = new FileReader()
        this.studentList.classNumber = []
        this.studentList.name = []

        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result
          const wb = XLSX.read(bstr, { type: 'binary' })
          /* Get first worksheet */
          const wsname = wb.SheetNames[0]
          const ws = wb.Sheets[wsname]
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, { header: 1 })
          // console.log(data)
          data.forEach((element, key) => {
            if (element.length === 2 && key !== 0) {
              this.studentList.classNumber.push(element[0])
              this.studentList.name.push(element[1])
              // console.log(element)
            }
          })
          console.log(this.studentList)
          if (this.studentList.name.length === 0) {
            return alert('잘못된 파일 입니다.')
          } else {
            this.isBtnActive = false
            // studentAllInsert
          }
        }

        reader.readAsBinaryString(this.file)
      }
    },
    onSubmit() {
      this.LOADING_TRUE()
      const frm = new FormData()
      frm.append('smt_idx', this.LOGIN_TEACHER.smt_idx)
      frm.append('classNumber', this.studentList.classNumber)
      frm.append('studentName', this.studentList.name)
      frm.append('type', 'studentAllInsert')

      this.$axios
        .post('https://api.school-os.net' + '/teacher.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res)
          setTimeout(() => {
            this.params = this.LOGIN_TEACHER
            this.params.type = 'studentAll'
            this.GET_AXIOS(this.params)
          })
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },

    // EVENT
  },
}
</script>
