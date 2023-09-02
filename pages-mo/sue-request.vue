<template>
  <div id="school-content">
    <div class="content">
      <!-- <div class="content__top">
        <div v-b-modal.ModalNotice class="content__top--notice flex">
          <p
            v-if="GET_AXIOS_CALLBACK_GETTER.rule && LOGIN_STUDENT.t_reg_country"
          >
            {{ LOGIN_STUDENT.t_reg_country }} 규칙 확인하기
          </p>
          <p v-else>아직 규칙이 정해지지 않았어요</p>
          <b-icon icon="chevron-right" class="flex-right"></b-icon>
        </div>
      </div> -->
    </div>
    <div class="content p-3">
      <p>친구 선택</p>
      <select
        v-if="GET_AXIOS_CALLBACK_GETTER.studentList"
        v-model="sms_idx_to"
        class="jelly-text jelly-text--h wd-full m-t-2"
        @change="onChangeStudent($event)"
      >
        <option :value="null">선택하세요</option>
        <option
          v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.studentList"
          :key="i"
          :value="v.idx"
        >
          {{ v.reg_name }}
        </option>
      </select>
      <p class="m-t-3">사건 발생일</p>
      <b-form-datepicker
        v-model="sueDate"
        type="date"
        class="jelly-text jelly-text--h wd-full m-t-2"
        placeholder="날짜를 선택하세요"
      ></b-form-datepicker>
      <p class="m-t-3">
        잘못한 일
        <!-- <span
          v-if="GET_AXIOS_CALLBACK_GETTER.rule && LOGIN_STUDENT.t_reg_country"
          v-b-modal.ModalNotice
          class="jelly-point m-t-0 jelly-background--type2 m-l-1"
        >
          {{ LOGIN_STUDENT.t_reg_country }} 규칙 확인하기</span
        > -->
      </p>
      <!-- <input
        v-model="sueSubject"
        class="jelly-text jelly-text--h wd-full m-t-2"
      /> -->
      <select
        v-if="GET_AXIOS_CALLBACK_GETTER.ruleDetail"
        v-model="sueSubject"
        class="jelly-text jelly-text--h wd-full m-t-2"
      >
        <option :value="null">선택하세요</option>
        <option
          v-for="v in GET_AXIOS_CALLBACK_GETTER.ruleDetail"
          :key="v.idx"
          :value="v.idx"
        >
          {{ v.subject }}
        </option>
        <option value="etc">직접 입력</option>
      </select>
      <input
        v-if="sueSubject === 'etc'"
        v-model="sueSubjectEtc"
        class="jelly-text jelly-text--h wd-full m-t-2"
      />
      <p class="m-t-3">증거사진</p>
      <input
        id="photo"
        type="file"
        class="jelly-text m-t-2 jelly-text--h wd-full"
        multiple
      />
      <p class="m-t-3">증명할 물건이나 사람이 있나요?</p>

      <textarea
        v-model="sueContentEvidence"
        class="jelly-text m-t-2 jelly-text--h wd-full"
        style="height: 150px"
      ></textarea>
      <p class="m-t-3">자세한 내용을 알려주세요</p>

      <textarea
        v-model="sueContent"
        class="jelly-text m-t-2 jelly-text--h wd-full"
        style="height: 150px"
      ></textarea>
      <div class="m-t-3">
        <button
          class="jelly-btn jelly-btn--pink wd-full"
          :disabled="isDisabled"
          @click="onSubmit"
        >
          전송
        </button>
      </div>
    </div>
    <b-modal id="ModalNotice" hide-footer>
      <div class="img-full"></div>
      <div class="m-t-3">
        <button
          class="jelly-btn jelly-btn--default wd-full"
          @click="$bvModal.hide('ModalNotice')"
        >
          닫기
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  layout: 'default-mo',

  data() {
    return {
      sueDate: '',
      context: null,
      params: {},
      paramsPost: {},
      sueSubject: null,
      sueContent: '',
      sms_idx_to: null,
      sueSubjectEtc: null,
      isDisabled: false,
      sueContentEvidence: '',
    }
  },
  computed: {
    ...mapState(['LOGIN']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_STUDENT']),
  },
  mounted() {
    //   DATA INIT
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_STUDENT
    this.params.type = 'sueList'
    this.GET_AXIOS(this.params)
  },
  methods: {
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),
    onContext(ctx) {
      this.context = ctx
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    },
    onChangeStudent(e) {
      console.log('==============================', e.target.value)
    },
    onSubmit() {
      if (
        !this.sueSubject ||
        !this.sueContent ||
        !this.sueDate ||
        !this.sms_idx_to
      ) {
        alert('모든 내용을 입력해 주세요.')
        return false
      }
      this.LOADING_TRUE()
      const frm = new FormData()
      const photoFile = document.getElementById('photo')
      for (let i = 0; i < photoFile.files.length; i++) {
        frm.append(`photo[${i}]`, photoFile.files[i])
      }
      frm.append('type', 'sueInsert')
      if (this.sueSubject === 'etc') {
        frm.append('subject', this.sueSubjectEtc)
      } else {
        frm.append('subject', this.sueSubject)
      }
      frm.append('sms_idx_to', this.sms_idx_to)
      frm.append('content', this.sueContent)
      frm.append('evidence', this.sueContentEvidence)
      frm.append('sue_date', this.sueDate)
      frm.append('sms_idx', this.LOGIN_STUDENT.sms_idx)
      frm.append('smt_idx', this.LOGIN_STUDENT.smt_idx)
      frm.append('status', 1)
      this.isDisabled = true
      this.$axios
        .post('http://api.school-os.net' + '/student.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log('[onSubmitComplete]', res.data)
          this.$bvModal.hide('completeFile')
          setTimeout(() => {
            alert('선생님께 안전하게 전달했어요!')
            this.$router.push('/')
          })
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },
  },
}
</script>

<style></style>
