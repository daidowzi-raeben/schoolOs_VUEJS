<template>
  <div v-if="GET_AXIOS_CALLBACK_GETTER">
    <h1>{{ GET_AXIOS_CALLBACK_GETTER.bd_subject }}</h1>
    <!-- <p>User ID : {{ idx }} {{ a | comma }}</p> -->
    <button
      v-if="
        !GET_AXIOS_CALLBACK_GETTER.is_apply &&
        !GET_AXIOS_CALLBACK_GETTER.is_complete &&
        !GET_AXIOS_CALLBACK_GETTER.is_confirm
      "
      @click="onSubmitApply"
    >
      수락
    </button>
    <button
      v-if="
        GET_AXIOS_CALLBACK_GETTER.is_apply &&
        !GET_AXIOS_CALLBACK_GETTER.is_complete &&
        !GET_AXIOS_CALLBACK_GETTER.is_confirm
      "
      @click="onSubmitComplete"
    >
      진행중
    </button>
    <button
      v-if="
        !GET_AXIOS_CALLBACK_GETTER.is_apply &&
        GET_AXIOS_CALLBACK_GETTER.is_complete &&
        !GET_AXIOS_CALLBACK_GETTER.is_confirm
      "
    >
      완료
    </button>
    <button v-if="GET_AXIOS_CALLBACK_GETTER.is_confirm">보상지급완료</button>

    <form>
      <input id="photo" type="file" name="photo" multiple />
      <input id="photo2" type="text" name="photo2" />
    </form>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import { historyBack, axiosForm } from '~/config/util'

export default {
  name: 'TodoDetail',
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  asyncData({ params }) {
    console.log(params)
    return {
      idx: params.id,
    }
  },
  data() {
    return {
      params: {},
      paramsPost: {},
      a: 100000000,
    }
  },
  computed: {
    ...mapState(['LOGIN']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_STUDENT']),
  },
  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },
  mounted() {
    //   DATA INIT
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_STUDENT
    this.params.type = 'questView'
    this.params.idx = this.idx
    this.GET_AXIOS(this.params)
    historyBack()
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS', 'POST_AXIOS_FORM']),
    ...mapMutations([]),

    // 퀘스트 수락
    onSubmitApply() {
      this.params.type = 'questApply'
      this.GET_AXIOS(this.params)
    },
    onSubmitComplete() {
      const frm = new FormData()
      const photoFile = document.getElementById('photo')

      console.log(photoFile.files)
      for (let i = 0; i < photoFile.files.length; i++) {
        frm.append(`photo[${i}]`, photoFile.files[i])
      }
      frm.append('type', 'questApply')
      frm.append('idx', this.params.idx)
      frm.append('sms_idx', this.params.sms_idx)
      console.log(frm)
      axiosForm(frm, '/student.php')
    },
  },
}
</script>

<style lang="scss"></style>
