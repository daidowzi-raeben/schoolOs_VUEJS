<template>
  <div id="school-content">
    <select v-if="GET_AXIOS_CALLBACK_GETTER" @change="onChangeStudent($event)">
      <option
        v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER"
        :key="i"
        :value="v.idx"
      >
        {{ v.reg_name }}
      </option>
    </select>
    <b-calendar
      v-model="sueDate"
      locale="ko"
      :hide-header="false"
      block
      @context="onContext"
    ></b-calendar>
    <p>
      Value: <b>'{{ sueDate }}'</b>
    </p>
    <input v-model="sueSubject" />
    <p class="mb-0">Context:</p>
    <pre class="small">{{ context }}</pre>
    <textarea v-model="sueContent"></textarea>
    <div>
      <button @click="onSubmit">전송</button>
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
      this.paramsPost.status = '1'
      this.paramsPost.sue_date = this.sueDate
      this.POST_AXIOS(this.paramsPost)
    },
  },
}
</script>

<style></style>
