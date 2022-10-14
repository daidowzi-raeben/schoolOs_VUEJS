<template>
  <div id="school-content">
    <div class="content p-3">
      컨텐츠
      <!-- v-b-modal. 뒤에 모달창 아이디 -->
      <button
        class="jelly-btn jelly-btn--default"
        @click="$bvModal.show('ModalNotice')"
      >
        모달 예시
      </button>
    </div>
    <!-- 모달창 시작 -->
    <b-modal id="ModalNotice" hide-footer>
      <div>컨텐츠</div>
      <div class="m-t-3">
        <button
          class="jelly-btn jelly-btn--default wd-full"
          @click="$bvModal.hide('ModalNotice')"
        >
          닫기
        </button>
      </div>
    </b-modal>
    <!-- 모달창 끝 -->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  layout: 'default-mo',

  data() {
    return {}
  },
  computed: {
    ...mapState(['LOGIN']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_STUDENT']),
  },
  mounted() {
    //   DATA INIT
    console.log(this.$nuxt, this.$config)
  },
  methods: {
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),
  },
}
</script>

<style></style>
