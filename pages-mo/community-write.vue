<template>
  <div id="school-content">
    <!-- <div v-if="LOADING" id="LOADING">
        <img src="~/static/img/loading.gif" />
      </div> -->
    <div class="historyBack m-l-3 m-b-5">
      <b-icon icon="arrow-left" onclick="history.back()"></b-icon>
    </div>
    <div class="content">
      <div class="m-t-1 h60">
        <div class="account">
          <div class="quest__content m-t-3">
            <div class="box quest m-b-3">
            <div class="m-l-3 m-r-3 m-t-5">
                <p>항목 선택</p>
                <select
                    class="jelly-text jelly-text--h wd-full m-t-2"
                >
                    <option>우리끼리</option>
                    <option>선생님께</option>
                </select>
                <p class="m-t-3">제목</p>
                <input
                class="jelly-text jelly-text--h wd-full m-t-2"
                />
                <p class="m-t-3">내용</p>
                <textarea
                    class="jelly-text m-t-2 jelly-text--h wd-full"
                    style="height: 150px"
                ></textarea>
                <div class="m-t-3">
                    <p class="m-t-3">글을 작성하려면 <em>80</em> 잼을 지불해야 해요</p>
                </div>
                <div class="m-t-3">
                    <button
                    class="jelly-btn jelly-btn--pink wd-full"
                    :disabled="is_write"
                    >
                    {{ mode === 'w' ? '작성하기' : '수정하기' }}
                    </button>
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
import Park from '~/components-mo/test/TestStyle.vue'
// import { historyBack } from '~/config/util'

export default {
  components: {
    Park,
  },
  data() {
    return {
      params: {},
      paramsPost: {},
      value: 4,
      is_write: false,
      mode : 'w',
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
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    onClick() {
      console.log(0)
    },
  },
}
</script>

<style lang="scss"></style>
