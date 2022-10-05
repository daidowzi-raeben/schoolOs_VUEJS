<template>
  <div>
    <div class="">
      <div class="flex">
        <h4 v-if="LOGIN_TEACHER" class="is_active">
          {{ LOGIN_TEACHER.todo_name }} 관리
        </h4>
        <!-- <h4
          v-if="LOGIN_TEACHER"
          class="m-l-3"
          style="cursor: pointer"
          @click="$router.push('/todo-list-end')"
        >
          완료 {{ LOGIN_TEACHER.todo_name }}
        </h4> -->
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
          <button v-b-modal.cateEdit class="jelly-btn jelly-btn--default m-l-1">
            카테고리 관리
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
                v-if="GET_AXIOS_CALLBACK_GETTER.questList"
                class="jelly-table"
              >
                <tr>
                  <th>시작일</th>
                  <th>종료일</th>
                  <th>제목</th>
                  <th>읽음</th>
                  <th>수락</th>
                  <th>검사요청</th>
                  <th>관리</th>
                </tr>
                <tr
                  v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.questList"
                  :key="`shopItem${i}`"
                  style="cursor: pointer"
                >
                  <td @click="onClickItemDetail(v.idx)">
                    {{ v.start_day | moment('YY.MM.DD') }}
                  </td>
                  <td @click="onClickItemDetail(v.idx)">
                    {{ v.end_day | moment('YY.MM.DD') }}
                  </td>
                  <td @click="onClickItemDetail(v.idx)">{{ v.subject }}</td>
                  <td @click="onClickItemDetail(v.idx)">
                    {{ v.is_read ? v.is_read : 0 }}
                  </td>
                  <td @click="onClickItemDetail(v.idx)">
                    {{ v.is_read ? v.is_status : 0 }}
                  </td>
                  <td @click="onClickItemDetail(v.idx)">
                    {{ v.is_read ? v.is_confirm : 0 }}
                  </td>

                  <td>
                    <div class="flex">
                      <button
                        class="flex-full jelly-btn jelly-btn--default m-r-1"
                        @click="onClickItemDetailConfirm(v.idx)"
                      >
                        검사
                      </button>
                      <!-- <button
                        class="flex-full jelly-btn jelly-btn--default m-l-1"
                        @click="onClickItemDetail(v.idx)"
                      >
                        수정
                      </button> -->
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
    <b-modal id="itemInsertTodo" size="xl" hide-footer hide-header>
      <div class="flex">
        <div
          class="m-t-5"
          style="
            width: 430px;
            margin-right: 20px;
            padding-right: 20px;
            border-right: 1px solid #eee;
          "
        >
          <p>
            <b-form-checkbox v-model="questChecked" name="check-button" switch>
              필수퀘스트 {{ questChecked }}
            </b-form-checkbox>
          </p>
          <div>
            <div class="studentScrollArea">
              <div>
                <div class="flex">
                  <label class="m-l-2 m-t-2">
                    <input
                      v-model="selectAllStudent"
                      type="checkbox"
                      :disabled="questChecked === false ? true : false"
                    />
                    전체선택
                    <!-- {{ questStudentCheck }} -->
                  </label>
                </div>
              </div>
              <div
                v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.studentList"
                :key="i"
                class="m-t-2"
              >
                <div
                  class="flex"
                  :style="questChecked === false ? 'color:#888' : 'color:#111;'"
                >
                  <b-avatar
                    variant="success"
                    icon="people-fill"
                    :src="`http://api.school-os.net/data/student/profile/thumb/${v.reg_photo}`"
                  ></b-avatar>
                  <label class="m-l-2 m-t-2">
                    <input
                      :id="`checkedStudent${v.idx}`"
                      :ref="`student${v.idx}`"
                      :key="v.idx"
                      v-model="questStudentCheck"
                      type="checkbox"
                      :disabled="questChecked === false ? true : false"
                      :value="v.idx"
                    />
                    {{ v.reg_name }}
                    ({{ v.reg_id }})
                  </label>
                  <div class="flex-right m-t-2">
                    <span v-if="v.PtotalAccount">
                      {{
                        v.MtotalAccount
                          ? v.PtotalAccount
                          : (Number(v.PtotalAccount) - Number(v.MtotalAccount))
                            | comma
                      }}
                    </span>
                    <span v-else>0</span>
                    <span v-if="LOGIN_TEACHER">
                      {{ LOGIN_TEACHER.reg_pay_unit }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="m-t-5 flex">
            <div class="flex-full m-r-1">
              <p>카테고리</p>
              <select
                v-if="GET_AXIOS_CALLBACK_GETTER.questCate"
                v-model="quest.cate"
                class="jelly-text jelly-text--h wd-full"
              >
                <option :value="null">선택하세요</option>
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
          <div class="m-t-5">
            <em>지혜,노력,건강,예절은 1~5정도의 수치가 적당합니다.</em>
          </div>
          <div class="m-t-2 flex">
            <div class="flex-full m-r-1">
              <p>보상금</p>
              <input
                v-model="quest.price"
                type="text"
                class="jelly-text jelly-text--h wd-full"
              />
            </div>
            <div class="flex-full">
              <p>지혜</p>
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
          <span><em>- 부호를 사용하지 않고 작성해 주세요</em></span>
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
              <p>지혜</p>
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
        </div>
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
    <b-modal id="cateEdit" ref="ref-cateEdit" size="lg" hide-footer hide-header>
      <div v-if="GET_AXIOS_CALLBACK_GETTER.questCate" class="">
        <p>카테고리 관리</p>
        <div class="m-t-3">
          <table class="jelly-table">
            <col style="width: auto" />
            <col style="width: 250px" />
            <tr>
              <th>카테고리 이름</th>
              <th>관리</th>
            </tr>
            <tr v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.questCate" :key="i">
              <td>
                <input
                  :ref="`inputCateEdit${i}`"
                  type="text"
                  class="jelly-text wd-full"
                  :value="v.subject"
                />
              </td>
              <td>
                <button
                  class="m-l-1 jelly-btn jelly-btn--default"
                  @click="onSubmitCateDel(v.idx)"
                >
                  삭제하기
                </button>
                <button
                  class="jelly-btn jelly-btn--pink"
                  @click="
                    onSubmitCateEdit(v.idx, $refs[`inputCateEdit${i}`][0].value)
                  "
                >
                  수정하기
                </button>
              </td>
            </tr>
          </table>
        </div>
        <div class="m-t-5 text-center">
          <button
            class="jelly-btn jelly-btn--default"
            @click="$bvModal.hide('cateEdit')"
          >
            닫기
          </button>
        </div>
      </div>
    </b-modal>
    <b-modal id="fileDataSlide" size="lg" hide-footer hide-header>
      <div v-if="GET_AXIOS_CALLBACK_GETTER.participationFile">
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="4000"
          controls
          indicators
          background="#ababab"
          img-width="1024"
          img-height="480"
          style="text-shadow: 1px 1px 2px #333"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <!-- Slides with image only -->
          <b-carousel-slide
            v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.participationFile"
            :key="i"
            :img-src="`http://api.school-os.net/data/student/quest/${v.file_name}`"
          ></b-carousel-slide>
        </b-carousel>
      </div>
    </b-modal>
    <b-modal id="questConfirm" size="xl" hide-footer hide-header>
      <div class="">
        <!-- <p>검사</p> -->
      </div>
      <div style="height: 80vh; overflow-y: auto">
        <div class="text-right">
          <b-icon icon="grid3x3-gap" @click="onClickThumbMode"></b-icon>
          <b-icon icon="list-check"></b-icon>
        </div>
        <table
          v-if="GET_AXIOS_CALLBACK_GETTER.participation"
          class="jelly-table m-t-2"
        >
          <thead>
            <tr>
              <th><input v-model="selectAll" type="checkbox" /></th>
              <th>번호</th>
              <th>이름</th>
              <th>읽음여부</th>
              <th>수락여부</th>
              <th>제출여부</th>
              <th>인증샷</th>
              <th>관리</th>
            </tr>
          </thead>
          <template v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.participation">
            <tr
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
              <td>
                {{ v.class_number }}
              </td>
              <td>{{ v.reg_name }}</td>
              <td :class="v.is_read === 'Y' ? 'is_activeTable' : ''">
                {{ v.is_read === 'Y' ? '읽음' : '안읽음' }}
              </td>
              <td :class="v.is_status === 'Y' ? 'is_activeTable' : ''">
                {{ v.is_status === 'Y' ? '수락' : '미수락' }}
              </td>
              <td
                v-if="v.is_confirm === 'N'"
                :class="v.is_complete === 'Y' ? 'is_activeTable' : ''"
              >
                {{ v.is_complete === 'Y' ? '제출' : '미제출' }}
              </td>
              <td v-if="v.is_confirm === 'R'">다시 제출</td>
              <td v-if="!v.is_confirm">미제출</td>
              <td
                v-if="v.is_confirm === 'Y'"
                :class="v.is_confirm === 'Y' ? 'is_activeTable' : ''"
              >
                완료
              </td>
              <td v-if="v.is_confirm === 'F'">실패</td>
              <td v-if="v.is_confirm === 'C'">취소</td>
              <td>
                <button
                  v-if="v.is_complete === 'Y'"
                  class="jelly-btn jelly-btn--default"
                  @click="onClickFileDetail(v.sq_idx, v.sms_idx)"
                >
                  확인하기
                </button>
              </td>
              <td class="text-left">
                <button
                  v-if="v.is_confirm !== 'F' && v.is_confirm !== 'Y'"
                  class="jelly-btn jelly-btn--default"
                  @click="onSubmitConfirm('F', v.sq_idx, v.idx, '')"
                >
                  실패
                </button>
                <button
                  v-if="
                    v.is_confirm != 'Y' &&
                    v.is_confirm !== 'R' &&
                    v.is_confirm !== 'F'
                  "
                  class="jelly-btn jelly-btn--default"
                  @click="onSubmitConfirm('R', v.sq_idx, v.idx, '')"
                >
                  다시 제출
                </button>
                <button
                  v-if="
                    v.is_complete &&
                    v.is_confirm !== 'Y' &&
                    v.is_confirm !== 'F'
                  "
                  class="jelly-btn jelly-btn--pink"
                  @click="onSubmitConfirm('Y', v.sq_idx, v.idx, '')"
                >
                  성공
                </button>
                <button
                  v-if="
                    (v.is_confirm === 'Y' || v.is_confirm === 'F') &&
                    checked.length === 0
                  "
                  class="jelly-btn jelly-btn--gray"
                  @click="onSubmitConfirm('C', v.sq_idx, v.idx, '')"
                >
                  취소
                </button>
              </td>
            </tr>
            <tr v-if="v.content">
              <td colspan="7" style="white-space: pre-line">
                <p class="bold" style="margin-bottom: 0">
                  {{ v.reg_name }}의 남긴 말
                </p>
                {{ v.content.trim() }}
              </td>
            </tr>
          </template>
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
        loop: false,
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
        type: 'questList',
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
        price: '0',
        intellect: '0',
        smt_idx: '',
        effort: '0',
        health: '0',
        etiquette: '0',
        m_price: '0',
        m_intellect: '0',
        m_effort: '0',
        m_health: '0',
        m_etiquette: '0',
        start_day: '',
        end_day: '',
        type: '',
      },
      fields: [
        {
          key: 'start_day',
          label: '시작일',
          sortable: true,
        },
        {
          key: 'end_day',
          label: '종료일',
          sortable: true,
        },
        {
          key: 'subject',
          label: '제목',
          sortable: true,
        },
        {
          key: 'is_read',
          label: '읽음',
          sortable: true,
        },
        {
          key: 'is_status',
          label: '수락',
          sortable: true,
        },
        {
          key: 'is_status',
          label: '검사요청',
          sortable: true,
        },
        {
          key: 'is_confirm',
          label: '관리',
          sortable: false,
        },
      ],
      items: [
        {
          isActive: true,
          start_day: '',
          end_day: '',
          is_read: '',
          is_status: '',
          is_confirm: '',
        },
        {
          isActive: true,
          start_day: '',
          end_day: '',
          is_read: '',
          is_status: '',
          is_confirm: '',
        },
      ],
      confirm: {},
      fileData: {},
      cateForm: {},
      checked: [],
      checkedTF: false,
      slide: 0,
      sliding: null,
      questChecked: false,
      questStudentCheck: [],
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
    selectAllStudent: {
      get() {
        return this.GET_AXIOS_CALLBACK_GETTER.studentList
          ? this.questStudentCheck
            ? this.questStudentCheck.length ===
              this.GET_AXIOS_CALLBACK_GETTER.studentList.length
            : false
          : false
      },
      set(value) {
        const selectedStudent = []

        if (value) {
          this.GET_AXIOS_CALLBACK_GETTER.studentList.forEach((com) => {
            selectedStudent.push(com.idx)
          })
        }

        this.questStudentCheck = selectedStudent
      },
    },
  },
  watch: {
    'params.type': {
      handler(value) {
        if (value) {
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
    this.params.queryCate = ''
    this.GET_AXIOS(this.params)
    this.params.type = ''
  },
  methods: {
    // init
    ...mapActions(['POST_AXIOS', 'GET_AXIOS']),
    ...mapMutations(['LOADING_TRUE']),
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    // EVENT
    onSubmit() {
      if (this.questChecked === true && this.questStudentCheck.length === 0) {
        return alert('학생을 선택해 주세요')
      }
      if (!this.quest.subject) {
        return alert('제목을 입력하세요')
      }
      if (!this.quest.contents) {
        return alert('내용을 입력하세요')
      }
      if (!this.quest.cate) {
        return alert('카테고리를 선택하세요')
      }
      if (!this.quest.price) {
        return alert('보상 금액을 입력하세요')
      }
      if (!this.quest.start_day) {
        return alert('시작일을 입력하세요')
      }
      if (!this.quest.end_day) {
        return alert('종료일을 입력하세요')
      }
      if (!this.quest.intellect) {
        return alert('보상이 모두 입력되어야 합니다')
      }
      if (!this.quest.effort) {
        return alert('보상이 모두 입력되어야 합니다')
      }
      if (!this.quest.health) {
        return alert('보상이 모두 입력되어야 합니다')
      }
      if (!this.quest.etiquette) {
        return alert('보상이 모두 입력되어야 합니다')
      }

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
      frm.append('studentList', this.questStudentCheck)
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
      // Object.entries(this.LOGIN_TEACHER).forEach((v, i) => {
      //   FORM_DATA.append(v[0], v[1])
      // })
      FORM_DATA.append('type', 'questEdit')
      FORM_DATA.append('smt_idx', this.LOGIN_TEACHER.smt_idx)
      FORM_DATA.append('subject', this.quest.subject)
      FORM_DATA.append('contents', this.quest.contents)
      FORM_DATA.append('cate', this.quest.cate)
      FORM_DATA.append('price', this.quest.price)
      FORM_DATA.append('intellect', this.quest.intellect)
      FORM_DATA.append('effort', this.quest.effort)
      FORM_DATA.append('health', this.quest.health)
      FORM_DATA.append('etiquette', this.quest.etiquette)
      FORM_DATA.append('m_price', this.quest.m_price)
      FORM_DATA.append('m_intellect', this.quest.m_intellect)
      FORM_DATA.append('m_effort', this.quest.m_effort)
      FORM_DATA.append('m_health', this.quest.m_health)
      FORM_DATA.append('m_etiquette', this.quest.m_etiquette)
      FORM_DATA.append('start_day', this.quest.start_day)
      FORM_DATA.append('end_day', this.quest.end_day)
      if (this.questChecked === false) {
        FORM_DATA.append('mandatory', null)
      } else {
        FORM_DATA.append('mandatory', '1')
      }

      console.log('this.questChecked', this.questChecked)
      FORM_DATA.append('idx', this.noticeIdx)
      FORM_DATA.append('studentList', this.questStudentCheck)
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
        this.queryCate = ''
        this.$router.push(`/todo-list`)
        this.params.type = 'questList'
        this.params.queryCate = null
        this.GET_AXIOS(this.params)
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
      // const aa = 283
      // document.getElementById('checkedStudent283').checked = true
      this.questStudentCheck = []
      this.questChecked = false
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
        this.quest.mandatory === '1'
          ? (this.questChecked = true)
          : (this.questChecked = false)

        this.$bvModal.show('itemInsertTodo')
        if (
          this.questChecked === true &&
          this.GET_AXIOS_CALLBACK_GETTER.participation.length > 0
        ) {
          this.$nextTick(() => {
            this.GET_AXIOS_CALLBACK_GETTER.participation.forEach((v, i) => {
              console.log(
                '====================',
                v.idx,
                this.$refs[`student${v.idx}`]
              )
              this.$refs[`student${v.idx}`][0].checked = true
              this.questStudentCheck.push(v.idx)
            })
          })
        }
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
      this.questChecked = false
      this.questStudentCheck = []

      this.quest = {}
      this.quest = {
        m_price: '0',
        m_intellect: '0',
        m_effort: '0',
        m_health: '0',
        m_etiquette: '0',
        price: '0',
        intellect: '0',
        effort: '0',
        health: '0',
        etiquette: '0',
        cate: null,
      }
      if (!this.GET_AXIOS_CALLBACK_GETTER.questCate) {
        return alert('카테고리를 먼저 추가해 주세요')
      }
      const today = new Date()

      const year = today.getFullYear()
      const month = ('0' + (today.getMonth() + 1)).slice(-2)
      const day = ('0' + today.getDate()).slice(-2)
      const dateString = year + '-' + month + '-' + day

      this.quest.start_day = dateString
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
    onSubmitCateEdit(e, v) {
      console.log(e, v)
      const frm = new FormData()
      frm.append('type', 'cateEditQuest')
      frm.append('idx', e)
      frm.append('subject', v)
      frm.append('smt_idx', this.LOGIN_TEACHER.smt_idx)
      console.log(frm)
      this.LOADING_TRUE()
      // axiosForm(frm, '/student.php')
      this.$axios
        .post(process.env.VUE_APP_API + '/teacher.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log('[onSubmitComplete]', res.data)
          this.$bvModal.hide('completeFile')
          setTimeout(() => {
            this.params = this.LOGIN_TEACHER
            this.params.type = 'questList'
            this.params.queryCate = null
            this.GET_AXIOS(this.params)
            this.$bvModal.hide('cateEdit')
          })
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },
    onSubmitCateDel(e) {
      if (
        confirm(
          '카테고리를 삭제하면 포함된 글이 모두 삭제됩니다.\n삭제하시겠습니까?'
        )
      ) {
        console.log('Y')
        const frm = new FormData()
        frm.append('type', 'cateDeltQuest')
        frm.append('idx', e)
        frm.append('smt_idx', this.LOGIN_TEACHER.smt_idx)
        console.log(frm)
        this.LOADING_TRUE()
        // axiosForm(frm, '/student.php')
        this.$axios
          .post(process.env.VUE_APP_API + '/teacher.php', frm, {
            header: {
              'Context-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log('[onSubmitComplete]', res.data)
            this.$bvModal.hide('completeFile')
            setTimeout(() => {
              this.params = this.LOGIN_TEACHER
              this.params.type = 'questList'
              this.params.queryCate = null
              this.GET_AXIOS(this.params)
              this.$bvModal.hide('cateEdit')
            })
          })
          .catch((res) => {
            console.log('AXIOS FALSE', res)
          })
      }
    },
    onClickThumbMode() {
      console.log(this.noticeIdx)
      this.$axios
        .get(
          process.env.VUE_APP_API +
            `/teacher.php?idx=${this.noticeIdx}&type=questThumb`
        )
        .then((res) => {
          console.log('[onClickThumbMode]', res.data)
          setTimeout(() => {})
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },
    // onClickCheckbox(e, idx, i) {
    //   this.checked[i] = idx
    // },
    //
  },
}
</script>

<style lang="scss">
.is_activeTable {
  background: #6830bd !important;
  color: #fff;
}
#fileDataSlide {
  .carousel-indicators {
    bottom: unset;
    top: 0;
  }
}
</style>
