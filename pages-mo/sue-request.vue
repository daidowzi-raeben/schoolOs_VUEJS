<template>
  <div id="school-content">
    <div class="content p-3">
      <p>친구 선택</p>
      <select
        v-if="GET_AXIOS_CALLBACK_GETTER"
        v-model="sms_idx_to"
        class="jelly-text jelly-text--h wd-full m-t-2"
        @change="onChangeStudent($event)"
      >
        <option :value="null">선택하세요</option>
        <option
          v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER"
          :key="i"
          :value="v.idx"
        >
          {{ v.reg_name }}
        </option>
      </select>
      <p class="m-t-3">신고일</p>
      <b-form-datepicker
        v-model="sueDate"
        type="date"
        class="jelly-text jelly-text--h wd-full m-t-2"
      ></b-form-datepicker>
      <p class="m-t-3">잘못한 일</p>
      <input
        v-model="sueSubject"
        class="jelly-text jelly-text--h wd-full m-t-2"
      />
      <p class="m-t-3">자세한 내용</p>

      <textarea
        v-model="sueContent"
        class="jelly-text m-t-2 jelly-text--h wd-full"
        style="height: 150px"
      ></textarea>
      <div class="m-t-3">
        <button class="jelly-btn jelly-btn--pink wd-full" @click="onSubmit">
          전송
        </button>
      </div>
    </div>
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
      sueSubject: '',
      sueContent: '',
      sms_idx_to: null,
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
    this.params.type = 'studentList'
    this.GET_AXIOS(this.params)
  },
  methods: {
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations([]),
    onContext(ctx) {
      this.context = ctx
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    },
    onChangeStudent(e) {
      console.log('==============================', e.target.value)
    },
    onSubmit() {
      this.paramsPost = this.LOGIN_STUDENT
      this.paramsPost.type = 'sueInsert'
      this.paramsPost.subject = this.sueSubject
      this.paramsPost.content = this.sueContent
      this.paramsPost.sms_idx_to = this.sms_idx_to
      this.paramsPost.status = '1'
      this.paramsPost.sue_date = this.sueDate
      this.POST_AXIOS(this.paramsPost)
    },
  },
}
</script>

<style></style>
