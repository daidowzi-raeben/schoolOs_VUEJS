<template>
  <div>
    <div class="">
      <div class="flex">
        <h4 v-if="LOGIN_TEACHER" class="is_active">
          진행중 {{ LOGIN_TEACHER.todo_name }}
        </h4>
        <h4
          v-if="LOGIN_TEACHER"
          class="m-l-3"
          style="cursor: pointer"
          @click="$router.push('/todo-list-end')"
        >
          완료 {{ LOGIN_TEACHER.todo_name }}
        </h4>
        <div class="flex-right">
          <button
            v-if="LOGIN_TEACHER"
            class="jelly-btn jelly-btn--default"
            @click="onClickitemInsertTodo"
          >
            {{ LOGIN_TEACHER.todo_name }} 추가
          </button>
          <button
            v-b-modal.cateInsert
            class="jelly-btn jelly-btn--default m-l-1"
          >
            카테고리 추가
          </button>
        </div>
      </div>
      <div id="jellyAdminheader" style="padding-top: 0vh">
        <div class="m-t-5">
          <span
            class="spanBox m-r-2"
            :class="queryCate ? '' : 'is_active'"
            @click="onClickCategory('')"
            >전체</span
          >
          <span v-if="GET_AXIOS_CALLBACK_GETTER.questCate">
            <span
              v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.questCate"
              :key="`cate${i}`"
              class="spanBox m-r-2"
              :class="queryCate == v.idx ? 'is_active' : ''"
              @click="onClickCategory(v.idx)"
            >
              {{ v.subject }}
            </span>
          </span>
        </div>
        <div class="student form">
          <div class="student__list">
            <div class="m-t-3">
              <table
                v-if="GET_AXIOS_CALLBACK_GETTER.questListEnd"
                class="jelly-table"
              >
                <tr>
                  <th>제목</th>
                  <th>보상</th>
                  <th>지능</th>
                  <th>노력</th>
                  <th>건강</th>
                  <th>예절</th>
                  <th>기간</th>
                  <th>관리</th>
                </tr>
                <tr
                  v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.questListEnd"
                  :key="`shopItem${i}`"
                  style="curosr: pointer"
                >
                  <td @click="onClickItemDetail(v.idx)">{{ v.subject }}</td>
                  <td @click="onClickItemDetail(v.idx)">
                    {{ v.price | comma }}
                  </td>
                  <td @click="onClickItemDetail(v.idx)">{{ v.intellect }}</td>
                  <td @click="onClickItemDetail(v.idx)">{{ v.effort }}</td>
                  <td @click="onClickItemDetail(v.idx)">{{ v.health }}</td>
                  <td @click="onClickItemDetail(v.idx)">{{ v.etiquette }}</td>
                  <td @click="onClickItemDetail(v.idx)">
                    {{ v.start_day }} ~ {{ v.end_day }}
                  </td>
                  <td>
                    <div class="flex">
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
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="m-t-15 m-l-4"></div>
      </div>
    </div>
    <b-modal id="itemInsertTodo" size="lg" hide-footer hide-header>
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
        <div class="flex-full m-r-1">
          <p>보상금</p>
          <input
            v-model="quest.price"
            type="text"
            class="jelly-text jelly-text--h wd-full"
          />
        </div>
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
      <div class="m-t-5">실패 시 패널티 사용</div>
      <span>- 부호를 사용하지 않고 작성해 주세요</span>
      <div class="flex m-t-2">
        <div class="flex-full m-r-1">
          <p>보상금</p>
          <input
            v-model="quest.m_price"
            type="text"
            class="jelly-text jelly-text--h wd-full"
          />
        </div>
        <div class="flex-full">
          <p>지능</p>
          <input
            v-model="quest.m_intellect"
            type="text"
            class="jelly-text jelly-text--h wd-full"
          />
        </div>
        <div class="flex-full m-r-1 m-l-1">
          <p>노력</p>
          <input
            v-model="quest.m_effort"
            type="text"
            class="jelly-text jelly-text--h wd-full"
          />
        </div>
        <div class="flex-full m-r-1">
          <p>건강</p>
          <input
            v-model="quest.m_health"
            type="text"
            class="jelly-text jelly-text--h wd-full"
          />
        </div>
        <div class="flex-full">
          <p>예절</p>
          <input
            v-model="quest.m_etiquette"
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
          @click="$bvModal.hide('itemInsertTodo')"
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
        <button class="jelly-btn jelly-btn--pink" @click="onSubmitCate">
          등록하기
        </button>
      </div>
    </b-modal>
    <b-modal id="fileDataSlide" size="lg" hide-footer hide-header>
      <div v-if="GET_AXIOS_CALLBACK_GETTER.participationFile">
        <swiper :options="swiperOption">
          <swiper-slide
            v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.participationFile"
            :key="i"
          >
            <img
              :src="`http://api.school-os.net/data/student/quest/${v.file_name}`"
              width="100%"
            />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
    </b-modal>
    <b-modal id="questConfirm" size="lg" hide-footer hide-header>
      <div class="">
        <!-- <p>검사</p> -->
      </div>
      <div>
        <table
          v-if="GET_AXIOS_CALLBACK_GETTER.participation"
          class="jelly-table"
        >
          <thead>
            <tr>
              <th><input v-model="selectAll" type="checkbox" /></th>
              <th>이름</th>
              <th>읽음여부</th>
              <th>수락여부</th>
              <th>제출여부</th>
              <th>인증샷</th>
              <th>관리</th>
            </tr>
          </thead>
          <tr
            v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.participation"
            :key="i"
            class="text-center"
            :class="v.is_confirm === 'Y' ? 'is_active' : ''"
          >
            <th>
              <input
                v-if="v.is_read === 'Y' && v.is_confirm !== 'Y'"
                :id="`checked${v.sq_idx}`"
                :key="i"
                v-model="checked"
                type="checkbox"
                :value="v.sqm_idx"
              />
            </th>
            <td>{{ v.reg_name }}</td>
            <td>{{ v.is_read === 'Y' ? '읽음' : '안읽음' }}</td>
            <td>{{ v.is_status === 'Y' ? '수락' : '미수락' }}</td>
            <td v-if="v.is_confirm === 'N'">
              {{ v.is_complete === 'Y' ? '제출' : '미제출' }}
            </td>
            <td v-if="v.is_confirm === 'R'">다시 제출</td>
            <td v-if="!v.is_confirm">미제출</td>
            <td v-if="v.is_confirm === 'Y'">완료</td>
            <td v-if="v.is_confirm === 'F'">실패</td>
            <td>
              <button
                class="jelly-btn jelly-btn--default"
                @click="onClickFileDetail(v.sq_idx, v.sms_idx)"
              >
                확인하기
              </button>
            </td>
            <td class="text-left">
              <button
                v-if="v.is_confirm !== 'F'"
                class="jelly-btn jelly-btn--default"
                @click="onSubmitConfirm('F', v.sq_idx, v.idx, '')"
              >
                실패
              </button>
              <button
                v-if="v.is_complete && v.is_confirm !== 'R'"
                class="jelly-btn jelly-btn--default"
                @click="onSubmitConfirm('R', v.sq_idx, v.idx, '')"
              >
                다시 제출
              </button>
              <button
                v-if="v.is_complete && v.is_confirm !== 'Y'"
                class="jelly-btn jelly-btn--pink"
                @click="onSubmitConfirm('Y', v.sq_idx, v.idx, '')"
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
        <button
          v-if="checked.length > 0"
          class="jelly-btn jelly-btn--pink"
          @click="onSubmitConfirm('Y', noticeIdx, noticeIdx, 'all')"
        >
          일괄 완료 처리
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
      allCheck: false,
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      params: {
        type: '',
      },
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
        m_price: '0',
        m_intellect: '0',
        m_effort: '0',
        m_health: '0',
        m_etiquette: '0',
        start_day: '',
        end_day: '',
        type: '',
      },
      confirm: {},
      fileData: {},
      cateForm: {},
      checked: [],
      checkedTF: false,
    }
  },

  computed: {
    ...mapState(['LOGIN']),
    ...mapGetters(['GET_AXIOS_CALLBACK_GETTER', 'LOGIN_TEACHER']),
    selectAll: {
      get() {
        return this.GET_AXIOS_CALLBACK_GETTER.participation
          ? this.checked
            ? this.checked.length ===
              this.GET_AXIOS_CALLBACK_GETTER.participation.length
            : false
          : false
      },
      set(value) {
        const selected = []

        if (value) {
          this.GET_AXIOS_CALLBACK_GETTER.participation.forEach((com) => {
            selected.push(com.sqm_idx)
          })
        }

        this.checked = selected
      },
    },
  },
  watch: {
    'params.type': {
      handler(value) {
        if (value === 'shopList') {
          this.params = this.LOGIN_TEACHER
          this.params.type = 'questList'
          this.params.queryCate = null
          this.GET_AXIOS(this.params)
          this.params.type = ''
        }
      },
    },
    '$route.query.cate': {
      handler(value) {
        console.log(value)
        if (value) {
          this.queryCate = value
          this.params.type = 'questList'
          this.params = this.LOGIN_TEACHER
          this.params.queryCate = value
          this.GET_AXIOS(this.params)
        } else {
          console.log('쿼리 없음')
          this.params.type = 'questList'
          this.params.queryCate = null
          this.params = this.LOGIN_TEACHER
          this.GET_AXIOS(this.params)
        }
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
    this.params.queryCate = null
    this.GET_AXIOS(this.params)
    this.params.type = ''
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),

    // EVENT
    onSubmit() {
      this.LOADING_TRUE()
      const frm = new FormData()
      frm.append('type', 'questWrite')
      frm.append('smt_idx', this.LOGIN_TEACHER.smt_idx)
      frm.append('subject', this.quest.subject)
      frm.append('contents', this.quest.contents)
      frm.append('cate', this.quest.cate)
      frm.append('price', this.quest.price)
      frm.append('intellect', this.quest.intellect)
      frm.append('effort', this.quest.effort)
      frm.append('health', this.quest.health)
      frm.append('etiquette', this.quest.etiquette)
      frm.append('m_price', this.quest.m_price)
      frm.append('m_intellect', this.quest.m_intellect)
      frm.append('m_effort', this.quest.m_effort)
      frm.append('m_health', this.quest.m_health)
      frm.append('m_etiquette', this.quest.m_etiquette)
      frm.append('start_day', this.quest.start_day)
      frm.append('end_day', this.quest.end_day)
      console.log(frm)
      // axiosForm(frm, '/student.php')
      this.$axios
        .post(process.env.VUE_APP_API + '/teacher.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          setTimeout(() => {
            //   this.$bvModal.hide('itemInsert')
            this.params = this.LOGIN_TEACHER
            this.params.type = 'questList'
            this.GET_AXIOS(this.params)
            this.$bvModal.hide('itemInsertTodo')
          })
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
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
      }, 1500)
      this.$bvModal.hide('itemInsertTodo')
    },
    isActiveCalendar(e) {
      this.$refs[e].classList.toggle('is_active')
    },
    onClickCategory(e) {
      if (e) {
        this.$router.push(`/todo-list?cate=${e}`)
      } else {
        this.$router.push(`/todo-list`)
      }
    },
    onSubmitCate() {
      this.cateForm.subject = this.cate_name
      this.cateForm.smt_idx = this.LOGIN_TEACHER.smt_idx
      this.cateForm.type = 'cateWrite'
      this.POST_AXIOS(this.cateForm)

      this.$bvModal.hide('cateInsert')
      setTimeout(() => {
        this.params = this.LOGIN_TEACHER
        this.params.type = 'questList'
        this.GET_AXIOS(this.params)
      }, 1000)
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
        this.quest = this.GET_AXIOS_CALLBACK_GETTER.view
        this.$bvModal.show('itemInsertTodo')
      }, 1500)
    },
    onClickItemDetailConfirm(e) {
      this.checked = []
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
        console.log(this.GET_AXIOS_CALLBACK_GETTER.participationFile)
      }, 1500)
      this.$bvModal.show('questConfirm')
    },
    onClickitemInsertTodo() {
      this.noticeIdx = null
      this.noticeSubject = ''
      this.noticeContent = ''
      this.$bvModal.show('itemInsertTodo')
    },
    onSubmitConfirm(isStatus, sqIdx, smsIdx, mode) {
      this.confirm.type = 'questconfirm'
      this.confirm.sms_idx = smsIdx
      this.confirm.idx = sqIdx
      this.confirm.status = isStatus
      this.confirm.checked = this.checked
      mode === 'all' ? (this.confirm.mode = 'all') : (this.confirm.mode = null)
      this.POST_AXIOS(this.confirm)
      setTimeout(() => {
        this.noticeIdx = sqIdx
        this.paramsDetail = this.LOGIN_TEACHER
        this.paramsDetail.type = 'questList'
        this.paramsDetail.idx = this.noticeIdx
        console.log(sqIdx)
        this.GET_AXIOS(this.paramsDetail)
      }, 1500)
    },
    onClickFileDetail(idx, sms) {
      this.fileData = this.LOGIN_TEACHER
      this.fileData.type = 'questList'
      this.fileData.idx = idx
      this.fileData.sms_idx = sms
      this.GET_AXIOS(this.fileData)
      this.$bvModal.show('fileDataSlide')
    },
    // onClickCheckbox(e, idx, i) {
    //   this.checked[i] = idx
    // },
    //
  },
}
</script>

<style lang="scss"></style>
