<template>
  <div>
    <div class="">
      <div id="jellyAdminheader" style="padding-top: 0vh">
        <!-- <span>{{ today }}</span> -->
        <h1 v-if="LOGIN_TEACHER">
          {{ LOGIN_TEACHER.todo_name }} 관리

          <span
            class="spanBox m-l-2"
            style="color: #fff; font-size: 12px"
            @click="onClickItemInsert"
          >
            +
          </span>
        </h1>
        <div class="m-t-15 m-l-4">
          <h3 class="flex" style="color: #fff">
            카테고리 관리
            <span
              v-b-modal.cateInsert
              class="spanBox m-l-2"
              style="color: #fff; font-size: 12px"
            >
              +
            </span>
          </h3>
          <div class="m-t-10">
            <span
              class="spanBox m-r-2"
              :class="queryCate ? '' : 'is_active'"
              style="color: #fff"
              @click="onClickCategory('')"
              >전체</span
            >
            <span v-if="GET_AXIOS_CALLBACK_GETTER.questCate">
              <span
                v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.questCate"
                :key="`cate${i}`"
                class="spanBox m-r-2"
                style="color: #fff"
                :class="queryCate == v.idx ? 'is_active' : ''"
                @click="onClickCategory(v.idx)"
              >
                {{ v.subject }}
              </span>
            </span>
          </div>
        </div>
        <div class="m-t-15 m-l-4"></div>
        <div v-if="GET_AXIOS_CALLBACK_GETTER.questList" class="student form">
          <div class="student__list">
            <h3 v-if="LOGIN_TEACHER">진행중인 {{ LOGIN_TEACHER.todo_name }}</h3>
            <div class="m-t-3 clb">
              <div
                v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.questList"
                :key="i"
                class="item"
                style="width: 32%"
              >
                <div class="">
                  <p class="title">
                    <span
                      class="jelly-point m-t-0 jelly-background--type1 m-l-1"
                    >
                      {{ v.cate === 1 ? 'M' : 'S' }}
                    </span>
                    {{ v.subject }}
                  </p>
                  <span class="jelly-point m-t-0 jelly-background--type1 m-l-1">
                    {{ v.intellect }}</span
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
                <div class="flex m-t-3">
                  <button
                    class="flex-full jelly-btn jelly-btn--default m-r-1"
                    @click="onClickItemDetailConfirm(v.idx)"
                  >
                    검사
                  </button>
                  <button
                    class="flex-full jelly-btn jelly-btn--default m-l-1"
                    @click="onClickItemDetail(v.idx)"
                  >
                    수정
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="m-t-15 m-l-4"></div>
        <div v-if="GET_AXIOS_CALLBACK_GETTER.questListEnd" class="student form">
          <div class="student__list">
            <h3 v-if="LOGIN_TEACHER">종료된 {{ LOGIN_TEACHER.todo_name }}</h3>
            <div class="m-t-3 clb">
              <div
                v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.questListEnd"
                :key="i"
                class="item"
                style="width: 32%"
              >
                <div class="">
                  <p class="title">
                    <span
                      class="jelly-point m-t-0 jelly-background--type1 m-l-1"
                    >
                      {{ v.cate === 1 ? 'M' : 'S' }}
                    </span>
                    {{ v.subject }}
                  </p>
                  <span class="jelly-point m-t-0 jelly-background--type1 m-l-1">
                    {{ v.intellect }}</span
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
                <div class="flex m-t-3">
                  <button
                    class="flex-full jelly-btn jelly-btn--default m-r-1"
                    @click="onClickItemDetailConfirm(v.idx)"
                  >
                    검사
                  </button>
                  <button
                    class="flex-full jelly-btn jelly-btn--default m-l-1"
                    @click="onClickItemDetail(v.idx)"
                  >
                    수정
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="itemInsert" size="lg" hide-footer hide-header>
      <div class="m-t-5 flex">
        <div class="flex-full m-r-1">
          <p>카테고리</p>
          <select
            v-if="GET_AXIOS_CALLBACK_GETTER.questCate"
            v-model="quest.cate"
            class="jelly-text jelly-text--h wd-full"
          >
            <option value="">선택하세요</option>
            <option
              v-for="v in GET_AXIOS_CALLBACK_GETTER.questCate"
              :key="v.idx"
              :value="v.idx"
            >
              {{ v.subject }}
            </option>
          </select>
        </div>
        <div class="flex-full m-l-1">
          <p>제목</p>
          <input
            v-model="quest.subject"
            type="text"
            class="jelly-text jelly-text--h wd-full"
          />
        </div>
      </div>
      <div class="m-t-5 flex">
        <div class="flex-full m-r-1">
          <p>보상</p>
          <input
            v-model="quest.price"
            type="text"
            class="jelly-text jelly-text--h wd-full"
          />
        </div>
        <div class="flex-full m-r-1">
          <p>시작일</p>
          <div>
            <b-form-datepicker
              v-model="quest.start_day"
              class="jelly-text jelly-text--h wd-full"
            ></b-form-datepicker>
          </div>
        </div>
        <div class="flex-full m-l-1">
          <p>종료일</p>
          <div>
            <b-form-datepicker
              v-model="quest.end_day"
              class="jelly-text jelly-text--h wd-full"
            ></b-form-datepicker>
          </div>
        </div>
      </div>
      <div class="m-t-5 flex">
        <div class="flex-full">
          <p>지능</p>
          <input
            v-model="quest.intellect"
            type="text"
            class="jelly-text jelly-text--h wd-full"
          />
        </div>
        <div class="flex-full m-r-1 m-l-1">
          <p>노력</p>
          <input
            v-model="quest.effort"
            type="text"
            class="jelly-text jelly-text--h wd-full"
          />
        </div>
        <div class="flex-full m-r-1">
          <p>건강</p>
          <input
            v-model="quest.health"
            type="text"
            class="jelly-text jelly-text--h wd-full"
          />
        </div>
        <div class="flex-full">
          <p>예절</p>
          <input
            v-model="quest.etiquette"
            type="text"
            class="jelly-text jelly-text--h wd-full"
          />
        </div>
      </div>
      <!-- <div class="m-t-5">
        <p>첨부파일</p>
        <input
          id="itemThumb"
          type="file"
          class="jelly-text jelly-text--h wd-full"
        />
      </div> -->
      <div class="m-t-5">
        <vue-editor v-model="quest.contents"> </vue-editor>
      </div>
      <div class="m-t-5 text-center">
        <button
          class="jelly-btn jelly-btn--default"
          @click="$bvModal.hide('itemInsert')"
        >
          닫기
        </button>
        <button
          v-if="noticeIdx"
          class="jelly-btn jelly-btn--pink"
          @click="onSubmitItem"
        >
          수정하기
        </button>
        <button
          v-if="!noticeIdx"
          class="jelly-btn jelly-btn--pink"
          @click="onSubmit"
        >
          등록하기
        </button>
      </div>
    </b-modal>
    <b-modal
      id="cateInsert"
      ref="ref-cateInsert"
      size="lg"
      hide-footer
      hide-header
    >
      <div class="">
        <p>카테고리 이름</p>
        <input v-model="cate_name" type="text" class="jelly-text wd-full" />
      </div>
      <div class="m-t-5 text-center">
        <button
          class="jelly-btn jelly-btn--default"
          @click="$bvModal.hide('cateInsert')"
        >
          닫기
        </button>
        <button class="jelly-btn jelly-btn--pink" @click="onSubmit">
          등록하기
        </button>
      </div>
    </b-modal>
    <b-modal id="questConfirm" size="lg" hide-footer hide-header>
      <div class="">
        <p>검사</p>
      </div>
      <div>
        <table
          v-if="GET_AXIOS_CALLBACK_GETTER.participation"
          class="jelly-table"
        >
          <thead>
            <tr>
              <th>이름</th>
              <th>읽음여부</th>
              <th>수락여부</th>
              <th>제출여부</th>
              <th>관리</th>
            </tr>
          </thead>
          <tr
            v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.participation"
            :key="i"
            class="text-center"
            :class="v.is_confirm === 'Y' ? 'is_active' : ''"
          >
            <td>{{ v.reg_name }}</td>
            <td>{{ v.is_read }}</td>
            <td>{{ v.is_status }}</td>
            <td>{{ v.is_complete }}</td>
            <td>
              <button
                class="jelly-btn jelly-btn--default"
                @click="onSubmitConfirm('N', v.sq_idx, v.idx)"
              >
                실패
              </button>
              <button
                v-if="v.is_complete"
                class="jelly-btn jelly-btn--pink"
                @click="onSubmitConfirm('Y', v.sq_idx, v.idx)"
              >
                성공
              </button>
            </td>
          </tr>
        </table>
      </div>
      <div class="m-t-5 text-center">
        <button
          class="jelly-btn jelly-btn--default"
          @click="$bvModal.hide('questConfirm')"
        >
          닫기
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
      paramsForm: {},
      paramsDetail: {},
      noticeSubject: '',
      noticeContent: '',
      noticeIdx: '',
      calendarSales: null,
      calendarDiscountSales: null,
      cate_name: '',
      cateIdx: '',
      itemPrice: 0,
      itemPriceDiscount: 0,
      itemContent: '',
      masks: {
        input: 'YYYY-MM-DD',
      },
      itemName: '',
      queryCate: null,
      quest: {
        subject: '',
        contents: '',
        cate: '',
        price: '',
        intellect: '',
        smt_idx: '',
        effort: '',
        health: '',
        etiquette: '',
        start_day: '',
        end_day: '',
        type: '',
      },
      confirm: {},
    }
  },

  computed: {
    ...mapState(['LOGIN']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_TEACHER']),
  },
  watch: {
    '$route.query.cate': {
      handler(value) {
        console.log(value)
        this.queryCate = value
        // if (this.queryCate) {
        //   this.params = this.LOGIN_TEACHER
        //   //   this.params.queryCate = value
        //   this.params.type = 'shopList'
        //   this.GET_AXIOS(this.params)
        // } else {
        //   this.params = this.LOGIN_TEACHER
        //   this.params.type = 'shopList'
        //   this.GET_AXIOS(this.params)
        // }
      },
      immediate: true,
    },
  },
  beforeCreate() {
    // 인스턴스가 초기화 된 직후
  },
  mounted() {
    //   DATA INIT
    console.log(this.$nuxt, this.$config)
    this.params = this.LOGIN_TEACHER
    this.params.type = 'questList'
    this.GET_AXIOS(this.params)
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations([]),

    // EVENT
    onSubmit() {
      this.quest.smt_idx = this.LOGIN_TEACHER.smt_idx
      this.quest.type = 'questWrite'
      this.paramsForm = this.quest
      this.POST_AXIOS(this.paramsForm)
      console.log('this.paramsForm', this.paramsForm)
      setTimeout(() => {
        this.params = this.LOGIN_TEACHER
        this.params.type = 'questList'
        this.GET_AXIOS(this.params)
      }, 1000)
      this.$bvModal.hide('itemInsert')
    },
    onSubmitItem() {
      //   const itemThumb = document.getElementById('itemThumb')
      const FORM_DATA = new FormData()
      Object.entries(this.LOGIN_TEACHER).forEach((v, i) => {
        FORM_DATA.append(v[0], v[1])
      })
      FORM_DATA.append('type', 'noticeEdit')
      FORM_DATA.append('noticeSubject', this.noticeSubject)
      FORM_DATA.append('noticeContent', this.noticeContent)
      FORM_DATA.append('noticeIdx', this.noticeIdx)
      axiosForm(FORM_DATA, '/teacher.php')
      setTimeout(() => {
        this.params = this.LOGIN_TEACHER
        this.params.type = 'questList'
        this.GET_AXIOS(this.params)
      }, 1000)
      this.$bvModal.hide('itemInsert')
    },
    isActiveCalendar(e) {
      this.$refs[e].classList.toggle('is_active')
    },
    onClickCategory(e) {
      if (e) {
        this.$router.push(`/shop-list?cate=${e}`)
      } else {
        this.$router.push(`/shop-list`)
      }
    },
    onClickItemDetail(e) {
      this.noticeIdx = e
      this.paramsDetail = this.LOGIN_TEACHER
      this.paramsDetail.type = 'questList'
      this.paramsDetail.idx = e
      console.log(e)
      this.GET_AXIOS(this.paramsDetail)
      setTimeout(() => {
        this.noticeSubject = this.GET_AXIOS_CALLBACK_GETTER.view.subject
        this.noticeContent = this.GET_AXIOS_CALLBACK_GETTER.view.contents
      }, 1500)
      this.$bvModal.show('itemInsert')
    },
    onClickItemDetailConfirm(e) {
      this.noticeIdx = e
      this.paramsDetail = this.LOGIN_TEACHER
      this.paramsDetail.type = 'questList'
      this.paramsDetail.idx = e
      console.log(e)
      this.GET_AXIOS(this.paramsDetail)
      setTimeout(() => {
        this.noticeSubject = this.GET_AXIOS_CALLBACK_GETTER.view.subject
        this.noticeContent = this.GET_AXIOS_CALLBACK_GETTER.view.contents
        console.log(this.GET_AXIOS_CALLBACK_GETTER.participation)
      }, 1500)
      this.$bvModal.show('questConfirm')
    },
    onClickItemInsert() {
      this.noticeIdx = null
      this.noticeSubject = ''
      this.noticeContent = ''
      this.$bvModal.show('itemInsert')
    },
    onSubmitConfirm(isStatus, sqIdx, smsIdx) {
      this.confirm.type = 'questconfirm'
      this.confirm.sms_idx = smsIdx
      this.confirm.idx = sqIdx
      this.confirm.status = isStatus
      this.POST_AXIOS(this.confirm)
      this.GET_AXIOS(this.paramsDetail)
      setTimeout(() => {
        this.noticeIdx = sqIdx
        this.paramsDetail = this.LOGIN_TEACHER
        this.paramsDetail.type = 'questList'
        this.paramsDetail.idx = sqIdx
        console.log(sqIdx)
        this.GET_AXIOS(this.paramsDetail)
      }, 1500)
    },
    //
  },
}
</script>

<style lang="scss"></style>
