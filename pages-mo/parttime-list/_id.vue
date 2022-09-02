<template>
  <div id="school-content">
    <div class="p-3 jelly-tab">
      <ul v-if="LOGIN_STUDENT" class="flex">
        <li v-if="LOGIN_STUDENT.t_todo_name" class="is_active">알바고</li>
        <li v-if="LOGIN_STUDENT.t_todo_name">
          <nuxt-link to="/parttime-my-list/0">나의 알바고</nuxt-link>
        </li>
      </ul>
    </div>
    <div v-if="GET_AXIOS_CALLBACK_GETTER.questCate" class="p-l-3 p-r-3 p-b-3">
      <nuxt-link to="/todo-list/0">
        <span
          :class="
            idx == 0
              ? 'jelly-badge m-r-1 m-b-2 is_active'
              : 'jelly-badge m-r-1 m-b-2'
          "
          >전체</span
        >
      </nuxt-link>
      <nuxt-link
        v-for="(v, index) in GET_AXIOS_CALLBACK_GETTER.questCate"
        :key="index"
        :to="'/todo-list/' + v.idx"
      >
        <span
          :class="
            v.idx == idx
              ? 'is_active jelly-badge m-r-1 m-b-2'
              : 'jelly-badge m-r-1 m-b-2'
          "
          >{{ v.subject }}</span
        >
      </nuxt-link>
    </div>
    <div class="content">
      <div class="content__body m-t-1 h60">
        <div class="account flex">
          <h3 class="m-t-2">진행중인 알바</h3>
          <div class="flex-right">
            <nuxt-link to="/parttime-write">
              <button
                v-if="
                  GET_AXIOS_CALLBACK_GETTER.student &&
                  GET_AXIOS_CALLBACK_GETTER.student.deposit !== '1'
                "
                class="jelly-btn jelly-btn--default"
              >
                공고등록
              </button>
            </nuxt-link>
          </div>
        </div>
        <div
          v-if="!GET_AXIOS_CALLBACK_GETTER.albaList"
          class="quest__content m-t-3"
        >
          <div class="p-5 text-center font-14">
            아직 할 수 있는 일이 없어요.
          </div>
        </div>
        <div
          v-if="GET_AXIOS_CALLBACK_GETTER.albaList"
          class="quest__content m-t-3"
        >
          <div
            v-for="(v, index) in GET_AXIOS_CALLBACK_GETTER.albaList"
            :key="index"
            class="box quest m-b-3"
            @click="onClickTodoDetail(v.idx)"
          >
            <div class="flex">
              <!-- 0:공고중,1:모집완료,2:지급완료,3:모집취소 -->
              <div v-if="v.status === '3'" class="label gray">취소</div>
              <div v-if="v.status === '2'" class="label gray">완료</div>
              <div v-if="v.status === '1'" class="label blue">종료</div>
              <div v-if="v.status === '0'" class="label blue">모집</div>
              <div class="flex-full m-l-2">
                <div class="flex m-t-0">
                  <div class="txt">
                    <p class="bold">{{ v.subject }}</p>
                    <span
                      >{{ v.start_day | moment('YY.MM.DD') }} ~
                      {{ v.end_day | moment('YY.MM.DD') }}</span
                    >
                  </div>
                  <div class="pay text-right flex-right">
                    <!-- <button class="jelly-btn jelly-btn--default">
                      자세히 보기
                    </button> -->
                  </div>
                </div>

                <div class="m-t-2 flex flex-full">
                  <div>
                    알바비
                    <strong class="bold font-18 m-l-1"
                      ><em>{{ v.pay | comma }}</em></strong
                    >
                    <span v-if="LOGIN_STUDENT.t_reg_pay_unit">{{
                      LOGIN_STUDENT.t_reg_pay_unit
                    }}</span>
                  </div>
                  <div class="flex-right">
                    <div v-if="v.reg_name" class="font-12 p-l-1 m-b-1">
                      {{ v.reg_name }}
                    </div>
                    <div v-if="!v.reg_name" class="font-12 p-l-1 m-b-1">
                      선생님
                    </div>
                    <span
                      class="jelly-point m-t-0 jelly-background--type2 m-l-1"
                      >모집인원 <strong>{{ v.personnel }}</strong> 명</span
                    >
                  </div>
                  <!-- <div class="flex-right">
                    <div class="flex m-t-0">
                      <span
                        class="jelly-point m-t-0 jelly-background--type1 m-l-1"
                        >{{ v.intellect }}</span
                      >
                      <span
                        class="jelly-point m-t-0 jelly-background--type2 m-l-1"
                        >{{ v.effort }}</span
                      >
                      <span
                        class="jelly-point m-t-0 jelly-background--type3 m-l-1"
                        >{{ v.health }}</span
                      >
                      <span
                        class="jelly-point m-t-0 jelly-background--type4 m-l-1"
                        >{{ v.etiquette }}</span
                      >
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="LOGIN_STUDENT && GET_AXIOS_CALLBACK_GETTER.questListSub"
          class="account"
        >
          <h3
            v-if="
              LOGIN_STUDENT.t_todo_name &&
              GET_AXIOS_CALLBACK_GETTER.questListSub
            "
          >
            종료된 {{ LOGIN_STUDENT.t_todo_name }}
          </h3>
        </div>

        <div
          v-if="GET_AXIOS_CALLBACK_GETTER.questListSub"
          class="quest__content m-t-3"
        >
          <div
            v-for="(v, index) in GET_AXIOS_CALLBACK_GETTER.questListSub"
            :key="index"
            class="box quest m-b-3"
            @click="onClickTodoDetail(v.idx)"
          >
            <div class="flex">
              <div class="label blue">{{ v.cate_subject }}</div>
              <div class="flex-full m-l-2">
                <div class="flex m-t-0">
                  <div class="txt">
                    <p class="bold">{{ v.subject }}</p>
                    <span
                      >{{ v.start_day | moment('YY.MM.DD') }} ~
                      {{ v.end_day | moment('YY.MM.DD') }}</span
                    >
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
                    <strong class="bold font-18 m-l-1"
                      ><em>{{ v.price }}</em></strong
                    >
                    <span v-if="LOGIN_STUDENT.t_reg_pay_unit">{{
                      LOGIN_STUDENT.t_reg_pay_unit
                    }}</span>
                  </div>
                  <div class="flex-right">
                    <div class="flex m-t-0">
                      <span
                        class="jelly-point m-t-0 jelly-background--type1 m-l-1"
                        >{{ v.intellect }}</span
                      >
                      <span
                        class="jelly-point m-t-0 jelly-background--type2 m-l-1"
                        >{{ v.effort }}</span
                      >
                      <span
                        class="jelly-point m-t-0 jelly-background--type3 m-l-1"
                        >{{ v.health }}</span
                      >
                      <span
                        class="jelly-point m-t-0 jelly-background--type4 m-l-1"
                        >{{ v.etiquette }}</span
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
  layout: 'default-mo',
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
    this.params.type = 'albaList'
    this.params.cate_idx = this.idx
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT
    onClickTodoDetail(idx) {
      this.$router.push('/parttime-detail/' + idx)
    },
  },
}
</script>

<style lang="scss"></style>
