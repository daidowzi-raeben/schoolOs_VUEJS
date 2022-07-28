<template>
  <div id="school-content">
    <div class="p-3 jelly-tab">
      <ul v-if="LOGIN_STUDENT.t_todo_name" class="flex">
        <li>
          <nuxt-link to="/todo-list/0"
            >전체 {{ LOGIN_STUDENT.t_todo_name }}</nuxt-link
          >
        </li>
        <li class="is_active">나의 {{ LOGIN_STUDENT.t_todo_name }}</li>
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
        :to="'/todo-my-list/' + v.idx"
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
        <div v-if="LOGIN_STUDENT" class="account">
          <h3 v-if="LOGIN_STUDENT.t_todo_name">
            진행중인 나의 {{ LOGIN_STUDENT.t_todo_name }}
          </h3>
        </div>
        <!-- <div
          v-if="!GET_AXIOS_CALLBACK_GETTER.questListMy"
          class="loading h20"
        >
          <img src="~/static/mo/loading/loading.gif" />
        </div> -->
        <div
          v-if="!GET_AXIOS_CALLBACK_GETTER.questListMy"
          class="quest__content m-t-3"
        >
          <div class="p-5 text-center font-14">
            할 수 있는 일을 찾아 '수락' 버튼을 눌러보세요.
          </div>
        </div>
        <div
          v-if="GET_AXIOS_CALLBACK_GETTER.questListMy"
          class="quest__content m-t-3"
        >
          <div
            v-for="(v, index) in GET_AXIOS_CALLBACK_GETTER.questListMy"
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
      <div
        v-if="GET_AXIOS_CALLBACK_GETTER.questListMyComplete"
        class="content__body m-t-1 h60"
      >
        <div class="account">
          <h3>완료</h3>
        </div>
        <!-- <div
          v-if="!GET_AXIOS_CALLBACK_GETTER.questListMy"
          class="loading h20"
        >
          <img src="~/static/mo/loading/loading.gif" />
        </div> -->

        <div
          v-if="GET_AXIOS_CALLBACK_GETTER.questListMyComplete"
          class="quest__content m-t-3"
        >
          <div
            v-for="(v, index) in GET_AXIOS_CALLBACK_GETTER.questListMyComplete"
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
  name: 'TodoList',
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
    this.params.type = 'questList'
    this.params.cate_idx = this.idx
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT
    onClickTodoDetail(idx) {
      this.$router.push('/todo-detail/' + idx)
    },
  },
}
</script>

<style lang="scss"></style>
