<template>
  <div id="school-content">
    <div class="p-3 jelly-tab">
      <ul class="flex">
        <li class="is_active">커뮤니티</li>
        <li>
          <nuxt-link to="/parttime-list/0">커뮤니티</nuxt-link>
        </li>
      </ul>
    </div>

    <div class="content">
      <div class="content__body m-t-1 h60">
        <div class="account">
          <h3>재잘재잘(임시)</h3>
        </div>

        <!-- <div class="quest__content m-t-3">
          <div class="p-5 text-center font-14">커뮤니티 페이지 설명</div>
        </div> -->

        <div v-for="item in 1" :key="item" class="quest__content m-t-3">
          <!-- 뱃지영역 -->

          <div class="box quest m-b-3">
            <div class="badge-wrap">
              <b-badge variant="danger">BEST</b-badge>
            </div>
            <div class="flex">
              <div class="flex-full">
                <div class="flex m-t-0">
                  <div class="txt">
                    <p class="bold ellipsis-list flex-shrink">
                      제목은최대두줄까지만노출제목은최대두줄까지만노출제목은최대두줄까지만노출제목은최대두줄까지만노출제목은최대두줄까지만노출
                    </p>
                    <span>22.22.22</span>
                  </div>
                </div>
                <div class="m-t-2 flex flex-full">
                  <div class="font-15">
                    조회수
                    <strong class="bold font-15 m-l-1"><em>99+</em></strong>
                    <span>회</span>
                  </div>
                  <div class="pay text-right flex-right">
                    <div class="font-12 p-l-1 l-h-28">김학생</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
           <div v-for="item in 1" :key="item" class="quest__content m-t-3">
          <!-- 뱃지영역 -->

          <div class="box quest m-b-3">
            <div class="badge-wrap">
              <b-badge variant="warning">인기글</b-badge>
            </div>
            <div class="flex">
              <div class="flex-full">
                <div class="flex m-t-0">
                  <div class="txt">
                    <p class="bold ellipsis-list flex-shrink">
                      제목은최대두줄까지만노출제목은최대두줄까지만노출제목은최대두줄까지만노출제목은최대두줄까지만노출제목은최대두줄까지만노출
                    </p>
                    <span>22.22.22</span>
                  </div>
                </div>
                <div class="m-t-2 flex flex-full">
                  <div class="font-15">
                    조회수
                    <strong class="bold font-15 m-l-1"><em>99+</em></strong>
                    <span>회</span>
                  </div>
                  <div class="pay text-right flex-right">
                    <div class="font-12 p-l-1 l-h-28">김학생</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="account">
          <h3>종료된 활동</h3>
        </div> -->

        <div class="quest__content m-t-3">
          <div
            v-for="(v, index) in GET_AXIOS_CALLBACK_GETTER.questListSub"
            :key="index"
            class="box quest m-b-3"
          >
            <div class="flex">
              <div class="label blue">fff</div>

              <div class="flex-full m-l-2">
                <div class="flex m-t-0">
                  <div class="txt">
                    <p class="bold">ffff</p>

                    <span>22.22.22 ~ 22.22.22</span>
                  </div>

                  <div class="pay text-right flex-right">
                    <!-- <button class="jelly-btn jelly-btn--default">
                    자세히 보기
                  </button> -->
                  </div>
                </div>
                <div class="m-t-2 flex flex-full">
                  <div>
                    보상
                    <strong class="bold font-18 m-l-1"><em>99+</em></strong>
                    <span>테스트</span>
                  </div>
                  <div class="flex-right">
                    <div class="flex m-t-0">
                      <span
                        class="jelly-point m-t-0 jelly-background--type1 m-l-1"
                        >ㅇㅇ</span
                      >
                      <span
                        class="jelly-point m-t-0 jelly-background--type2 m-l-1"
                        >ㅇㅇ</span
                      >
                      <span
                        class="jelly-point m-t-0 jelly-background--type3 m-l-1"
                        >ㅇㅇ</span
                      >
                      <span
                        class="jelly-point m-t-0 jelly-background--type4 m-l-1"
                        >ㅇㅇ</span
                      >
                    </div>
                  </div>
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

export default {
  data() {
    return {}
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
    console.log(this.$nuxt, this.$config, this.rangeCalendar)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT
  },
}
</script>

<style lang="scss">
.ellipsis-list {
  max-width: 25rem;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.l-h-28 {
  line-height: 1.8rem;
}
.badge-wrap {
  display: flex;
  justify-content: end;
}
</style>