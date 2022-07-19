<template>
  <!-- <div>
    <div>
      <input v-model="pay" class="jelly-text" />
      <input v-model="job_name" class="jelly-text" />
      <button @click="onSubmit">생성</button>
    </div>
    <div v-if="GET_AXIOS_CALLBACK_GETTER">
      <div v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER" :key="i">
        {{ v.job_name }}
      </div>
    </div>
  </div> -->
  <div class="">
    <div id="jellyAdminheader" style="padding-top: 0vh">
      <!-- <span>{{ today }}</span> -->
      <h1 v-if="LOGIN_TEACHER" class="">
        직업관리
        <span
          class="spanBox m-l-2"
          style="color: #fff; font-size: 12px"
          @click="onClickJobInsert"
        >
          +
        </span>
        <span
          v-if="GET_AXIOS_CALLBACK_GETTER.length === 0"
          class="spanBox m-l-2"
          style="color: #fff; font-size: 12px"
          @click="onClickAutoInsert"
        >
          직업 자동생성
        </span>
        <!-- {{ LOGIN_TEACHER.reg_country }} 규칙 -->
        <!-- <span v-b-tooltip.hover title="현재 재산" class="spanBox">
            ㅁㄴㅇ
          </span> -->
      </h1>
      <div class="student form">
        <div class="student__list">
          <div class="m-t-3">
            <div
              v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER"
              :key="i"
              class="item"
              @click="onClickJobDetail(v.idx)"
            >
              <p class="title">{{ v.job_name }}</p>
              주급 : {{ v.pay | comma }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="jobInsert" size="lg" hide-footer hide-header>
      <div class="">
        <p>직업명</p>
        <input v-model="job_name" type="text" class="jelly-text wd-full" />
      </div>
      <div class="m-t-5">
        <p>주급</p>
        <input v-model="pay" type="text" class="jelly-text wd-full" />
      </div>
      <div class="m-t-5 text-center">
        <button
          class="jelly-btn jelly-btn--default"
          @click="$bvModal.hide('jobInsert')"
        >
          닫기
        </button>
        <button class="jelly-btn jelly-btn--pink" @click="onSubmit">
          등록하기
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import { axiosForm } from '~/config/util'

export default {
  layout: 'default-pc',
  data() {
    return {
      params: {},
      paramsPost: {},
      pay: 0,
      job_name: '',
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
    this.params.type = 'joblistTable'
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations([]),

    // EVENT
    onSubmit() {
      const FORM_DATA = new FormData()
      FORM_DATA.append('type', 'joblist')
      FORM_DATA.append('pay', this.pay)
      FORM_DATA.append('job_name', this.job_name)
      FORM_DATA.append('smt_idx', this.LOGIN_TEACHER.smt_idx)
      axiosForm(FORM_DATA, '/teacher.php')
      this.$bvModal.hide('jobInsert')
      setTimeout(() => {
        this.GET_AXIOS(this.params)
      }, 1000)
    },
    onClickAutoInsert() {
      this.paramsPost = this.LOGIN_TEACHER
      this.paramsPost.type = 'jobDefault'
      this.POST_AXIOS(this.paramsPost)
      setTimeout(() => {
        this.params = this.LOGIN_TEACHER
        this.params.type = 'joblistTable'
        this.GET_AXIOS(this.params)
      }, 1500)
    },
    onClickJobDetail(e) {
      this.params = this.LOGIN_TEACHER
      this.params.type = 'joblistTable'
      this.params.jobIdx = e
      this.GET_AXIOS(this.params)
      // jobIdx
      setTimeout(() => {
        this.job_name = this.GET_AXIOS_CALLBACK_GETTER.jobDetail.job_name
        this.pay = this.GET_AXIOS_CALLBACK_GETTER.jobDetail.pay
      }, 1000)
      this.$bvModal.show('jobInsert')
    },
    onClickJobInsert() {
      this.job_name = ''
      this.pay = ''
      this.$bvModal.show('jobInsert')
    },
  },
}
</script>

<style lang="scss"></style>
