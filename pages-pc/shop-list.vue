<template>
  <div>
    <div class="">
      <div class="flex">
        <h4 v-if="LOGIN_TEACHER" class="is_active">상점 관리</h4>
        <div class="flex-right">
          <button
            v-if="!GET_AXIOS_CALLBACK_GETTER.shopCate"
            class="jelly-btn jelly-btn--default"
            @click="onClickAutoCate"
          >
            카테고리 자동생성
          </button>
          <button
            class="jelly-btn jelly-btn--default"
            @click="onClickItemInsert"
          >
            상품 추가
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
        <div>
          <div class="m-t-5">
            <span
              class="spanBox m-r-2"
              :class="queryCate === '' ? 'is_active' : ''"
              @click="onClickCategory('')"
              >전체</span
            >
            <span v-if="GET_AXIOS_CALLBACK_GETTER.shopCate">
              <span
                v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.shopCate"
                :key="`cate${i}`"
                class="spanBox m-r-2"
                :class="queryCate == v.idx ? 'is_active' : ''"
                @click="onClickCategory(v.idx)"
              >
                {{ v.cate_name }}
              </span>
            </span>
          </div>
        </div>
        <div class="student form">
          <div class="student__list">
            <div class="m-t-3">
              <table class="jelly-table">
                <tr>
                  <th>상품이미지</th>
                  <th>상품명</th>
                  <th>가격</th>
                </tr>
                <tr
                  v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.shopItem"
                  :key="`shopItem${i}`"
                  style="cursor: pointer"
                  @click="onClickItemDetail(v.idx)"
                >
                  <td>
                    <img
                      :src="`http://api.school-os.net/data/teacher/shop/${v.item_thumb}`"
                      width="100"
                      height="100"
                    />
                  </td>
                  <td>{{ v.item_name }}</td>
                  <td class="text-right">{{ v.item_price | comma }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal id="itemInsert" size="lg" hide-footer hide-header>
      <div class="">
        <p>카테고리</p>
        <span v-if="!GET_AXIOS_CALLBACK_GETTER.shopCate">
          <strong><em>카테고리를 먼저 등록해주세요</em></strong>
        </span>
        <select
          v-if="GET_AXIOS_CALLBACK_GETTER.shopCate"
          v-model="cateIdx"
          class="jelly-text wd-full jelly-text--h"
        >
          <option :value="null">선택하세요 {{ cateIdx }}</option>
          <option
            v-for="v in GET_AXIOS_CALLBACK_GETTER.shopCate"
            :key="v.idx"
            :value="v.idx"
            :selected="cateIdx == v.idx ? true : false"
          >
            {{ v.cate_name }}
          </option>
        </select>
      </div>
      <div class="m-t-5">
        <p>상품명</p>
        <input
          v-model="itemName"
          type="text"
          class="jelly-text jelly-text--h wd-full"
        />
      </div>
      <div class="m-t-5 flex">
        <div class="flex-full">
          <p>재고</p>
          <div class="flex">
            <input
              v-model="itemInt"
              type="text"
              class="jelly-text jelly-text--h wd-full text-right m-r-1"
            />
            <span v-if="LOGIN_TEACHER" class="m-t-2 m-l-1 m-r-1"> 개 </span>
          </div>
        </div>
        <div class="flex-full">
          <p>물가상승금액</p>
          <div class="flex">
            <input
              v-model="item_price_inp"
              readonly
              type="text"
              style="background: #eee"
              class="jelly-text jelly-text--h wd-full text-right m-r-1 m-l-1"
            />
            <span v-if="LOGIN_TEACHER" class="m-t-2 m-l-1 flex-0">
              {{ LOGIN_TEACHER.reg_pay_unit }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex m-t-5">
        <div class="flex-full">
          <p>소비자가</p>
          <div class="flex">
            <input
              v-model="price2"
              type="text"
              class="jelly-text jelly-text--h wd-full text-right m-r-1"
              @click="resetInput($event)"
              @input="priceKrw($event)"
            />
            <span v-if="LOGIN_TEACHER" class="m-t-2 m-l-1 m-r-1"> 원 </span>
          </div>
        </div>
        <div class="flex-full">
          <p>상품가격</p>
          <div class="flex">
            <input
              v-model="itemPrice"
              type="text"
              class="jelly-text jelly-text--h wd-full text-right m-r-1 m-l-1"
              @click="resetInput($event)"
              @input="priceCustom($event)"
            />
            <span v-if="LOGIN_TEACHER" class="m-t-2 m-l-1 flex-0">
              {{ LOGIN_TEACHER.reg_pay_unit }}
            </span>
          </div>
        </div>
      </div>
      <div class="m-t-5">
        <div class="flex">
          <div class="flex-full m-r-1 relative">
            <p>판매종료일</p>
            <div class="relative">
              <b-form-datepicker
                v-model="calendarSales"
                class="jelly-text jelly-text--h wd-full"
                @context="onClickCalendarSales"
              ></b-form-datepicker>
            </div>
            <!-- <v-date-picker
              v-model="calendarSales"
              :masks="masks.input"
              class="notAnime"
            >
              <template #default="{ inputValue, inputEvents }">
                <div>
                  <input
                    class="jelly-text jelly-text--h wd-full"
                    :value="inputValue"
                    v-on="inputEvents"
                  />
                </div>
              </template>
            </v-date-picker> -->
          </div>
          <div class="flex-full m-l-1 wd-full">
            <!-- <p>상품가격</p>
            <input
              v-model="itemPrice"
              type="text"
              class="jelly-text jelly-text--h wd-full text-right"
            /> -->
          </div>
        </div>
      </div>
      <div class="m-t-5">
        <div class="flex">
          <div class="flex-full m-r-1 relative">
            <p>할인 종료일</p>
            <div>
              <b-form-datepicker
                v-model="calendarDiscountSales"
                type="date"
                class="jelly-text jelly-text--h wd-full"
                @context="onClickCalendarDiscountSales"
              ></b-form-datepicker>
            </div>
            <!--             
            <v-date-picker
              v-model="calendarDiscountSales"
              :masks="masks"
              class="notAnime"
            >
              <template #default="{ inputValue, inputEvents }">
                <input
                  class="jelly-text jelly-text--h wd-full"
                  :value="inputValue"
                  v-on="inputEvents"
                />
              </template>
            </v-date-picker> -->
          </div>
          <div class="flex-full m-l-1">
            <p>할인가격</p>
            <input
              v-model="itemPriceDiscount"
              type="text"
              class="jelly-text jelly-text--h wd-full text-right"
              @input="payComma($event)"
              @click="resetInput($event)"
            />
          </div>
          <span v-if="LOGIN_TEACHER" class="m-t-9">
            {{ LOGIN_TEACHER.reg_pay_unit }}
          </span>
        </div>
      </div>
      <div class="m-t-5">
        <p>상품 이미지</p>
        <input
          id="itemThumb"
          type="file"
          class="jelly-text jelly-text--h wd-full"
        />
      </div>
      <div class="m-t-5">
        <vue-editor v-model="itemContent"> </vue-editor>
      </div>
      <div class="m-t-5 text-center">
        <button
          class="jelly-btn jelly-btn--default"
          @click="$bvModal.hide('itemInsert')"
        >
          닫기
        </button>
        <button
          v-if="params && !params.detailIdx"
          class="jelly-btn jelly-btn--pink"
          @click="onSubmitItem"
        >
          등록하기
        </button>
        <button
          v-if="params && params.detailIdx"
          class="jelly-btn jelly-btn--pink"
          @click="onSubmitItemEdit"
        >
          수정하기
        </button>
        <div>
          <div v-if="GET_AXIOS_CALLBACK_GETTER.buyStudent" class="m-t-3">
            <table class="jelly-table">
              <tr>
                <th>구매자</th>
                <th>금액</th>
                <th>구매일</th>
                <th>사용여부</th>
              </tr>
              <tr
                v-for="(v, i) in GET_AXIOS_CALLBACK_GETTER.buyStudent"
                :key="i"
              >
                <td>{{ v.reg_name }}({{ v.reg_id }})</td>
                <td>{{ v.price | comma }}</td>
                <td>{{ v.datetime | moment('YY.MM.DD') }}</td>
                <td>{{ v.use_yn === '0' ? '미사용' : '사용' }}</td>
              </tr>
            </table>
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
        <input
          v-model="cate_name"
          type="text"
          class="jelly-text wd-full"
          @keyup.enter="onSubmit"
        />
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
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import { axiosForm } from '~/config/util'

export default {
  layout: 'default-pc',
  data() {
    return {
      price: 0,
      price2: 0,
      params: { type: '' },
      paramsForm: { type: '' },
      calendarSales: null,
      calendarDiscountSales: null,
      calendarSalesDate: null,
      calendarDiscountSalesDate: null,
      cate_name: '',
      context: null,
      cateIdx: '',
      itemPrice: 0,
      item_price_inp: 0,
      itemPriceDiscount: 0,
      itemContent: '',
      itemInt: '',
      masks: {
        input: 'YYYY-MM-DD',
      },
      itemName: '',
      queryCate: '',
      test: {
        a: 0,
        b: 1,
        c: 3,
      },
      // inputValue: new Date(),
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
        this.params.type = 'shopList'
        if (value) {
          this.queryCate = value
          this.params = this.LOGIN_TEACHER
          this.params.queryCate = value
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
    this.params.type = 'shopList'
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
      this.paramsForm = this.LOGIN_TEACHER
      this.paramsForm.type = 'cateInsert'
      this.paramsForm.cate_name = this.cate_name
      this.POST_AXIOS(this.paramsForm)
      setTimeout(() => {
        this.params = this.LOGIN_TEACHER
        this.params.type = 'shopList'
        this.GET_AXIOS(this.params)
      }, 1000)
      this.$bvModal.hide('cateInsert')
    },
    onSubmitItem() {
      const itemThumb = document.getElementById('itemThumb')

      if (!this.cateIdx) {
        return alert('카테고리를 입력하세요')
      }
      if (!this.itemName) {
        return alert('상품명을 입력하세요')
      }
      if (!this.itemInt) {
        return alert('재고를 입력하세요')
      }
      if (!this.itemPrice) {
        return alert('상품가격을 입력하세요')
      }
      if (!this.calendarSales) {
        return alert('판매종료일을 입력하세요')
      }
      if (!this.calendarDiscountSales) {
        return alert(
          '할인종료일을 입력하세요\n할인을 하지 않을 경우 어제 날짜로 설정해 주세요'
        )
      }
      if (!this.itemPriceDiscount) {
        return alert('할인가격을 입력하세요')
      }
      if (!itemThumb.files[0]) {
        return alert('상품 이미지를 업로드 해주세요')
      }
      if (!this.itemContent) {
        return alert('내용을 입력하세요')
      }
      this.LOADING_TRUE()
      const FORM_DATA = new FormData()
      Object.entries(this.LOGIN_TEACHER).forEach((v, i) => {
        FORM_DATA.append(v[0], v[1])
      })
      FORM_DATA.append('type', 'itemInsert')
      FORM_DATA.append('calendarSales', this.calendarSalesDate.activeYMD)
      FORM_DATA.append(
        'calendarDiscountSales',
        this.calendarDiscountSalesDate.activeYMD
      )
      FORM_DATA.append('itemInt', this.itemInt)
      FORM_DATA.append('cateIdx', this.cateIdx)
      FORM_DATA.append('itemPrice', this.uncomma(this.itemPrice))
      FORM_DATA.append('itemContent', this.itemContent)
      FORM_DATA.append('itemName', this.itemName)
      FORM_DATA.append('itemThumb', itemThumb.files[0])
      FORM_DATA.append(
        'itemPriceDiscount',
        this.uncomma(this.itemPriceDiscount)
      )
      axiosForm(FORM_DATA, '/teacher.php')

      //   this.paramsForm = this.LOGIN_TEACHER
      //   this.paramsForm.type = 'itemInsert'
      //   this.paramsForm.calendarSales = this.calendarSales
      //   this.paramsForm. = this.calendarDiscountSales
      //   this.paramsForm. = this.cateIdx
      //   this.paramsForm. = this.itemPrice
      //   this.paramsForm. = this.itemContent
      //   this.paramsForm. = this.itemName
      //   this.paramsForm.itemPriceDiscount = this.
      //   this.POST_AXIOS(this.paramsForm)
      setTimeout(() => {
        this.params = this.LOGIN_TEACHER
        this.params.type = 'shopList'
        this.GET_AXIOS(this.params)
      }, 2000)
      this.$bvModal.hide('itemInsert')
    },
    onSubmitItemEdit() {
      const itemThumb = document.getElementById('itemThumb')
      const FORM_DATA = new FormData()
      Object.entries(this.LOGIN_TEACHER).forEach((v, i) => {
        FORM_DATA.append(v[0], v[1])
      })
      FORM_DATA.append('type', 'itemEdit')
      FORM_DATA.append('calendarSales', this.calendarSalesDate.activeYMD)
      FORM_DATA.append(
        'calendarDiscountSales',
        this.calendarDiscountSalesDate.activeYMD
      )
      FORM_DATA.append('itemInt', this.itemInt)
      FORM_DATA.append('cateIdx', this.cateIdx)
      FORM_DATA.append('idx', this.params.detailIdx)
      FORM_DATA.append('itemPrice', this.uncomma(this.itemPrice))
      FORM_DATA.append('itemContent', this.itemContent)
      FORM_DATA.append('itemName', this.itemName)
      FORM_DATA.append('itemThumb', itemThumb.files[0])
      FORM_DATA.append(
        'itemPriceDiscount',
        this.uncomma(this.itemPriceDiscount)
      )
      axiosForm(FORM_DATA, '/teacher.php')

      //   this.paramsForm = this.LOGIN_TEACHER
      //   this.paramsForm.type = 'itemInsert'
      //   this.paramsForm.calendarSales = this.calendarSales
      //   this.paramsForm. = this.calendarDiscountSales
      //   this.paramsForm. = this.cateIdx
      //   this.paramsForm. = this.itemPrice
      //   this.paramsForm. = this.itemContent
      //   this.paramsForm. = this.itemName
      //   this.paramsForm.itemPriceDiscount = this.
      //   this.POST_AXIOS(this.paramsForm)
      setTimeout(() => {
        this.params = this.LOGIN_TEACHER
        this.params.type = 'shopList'
        this.GET_AXIOS(this.params)
      }, 2000)
      this.$bvModal.hide('itemInsert')
    },
    isActiveCalendar(e) {
      this.$refs[e].classList.toggle('is_active')
    },
    onClickCalendarSales(ctx) {
      this.calendarSalesDate = ctx
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    },
    onClickCalendarDiscountSales(ctx) {
      this.calendarDiscountSalesDate = ctx
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    },
    onClickCategory(e) {
      if (e) {
        this.$router.push(`/shop-list?cate=${e}`)
      } else {
        this.params.queryCate = ''
        this.queryCate = ''
        this.$router.push(`/shop-list`)
        this.params = this.LOGIN_TEACHER
        this.params.type = 'shopList'
        this.GET_AXIOS(this.params)
      }
    },
    onClickItemDetail(e) {
      this.params = this.LOGIN_TEACHER
      this.params.type = 'shopList'
      this.params.detailIdx = e
      console.log(e)
      this.GET_AXIOS(this.params)
      setTimeout(() => {
        const rate = 200 / this.LOGIN_TEACHER.reg_pay_rate
        this.price2 = this.comma(
          this.uncomma(
            this.GET_AXIOS_CALLBACK_GETTER.shopDetail.item_price * rate
          )
        )
        this.calendarSales = this.GET_AXIOS_CALLBACK_GETTER.shopDetail.end_day
        this.calendarDiscountSales =
          this.GET_AXIOS_CALLBACK_GETTER.shopDetail.item_dis_date
        this.cateIdx = this.GET_AXIOS_CALLBACK_GETTER.shopDetail.ssc_idx
        this.itemPrice = this.comma(
          this.GET_AXIOS_CALLBACK_GETTER.shopDetail.item_price
        )
        this.itemContent =
          this.GET_AXIOS_CALLBACK_GETTER.shopDetail.item_content
        this.itemName = this.GET_AXIOS_CALLBACK_GETTER.shopDetail.item_name
        this.itemInt = this.GET_AXIOS_CALLBACK_GETTER.shopDetail.item_int
        this.itemPriceDiscount = this.comma(
          this.GET_AXIOS_CALLBACK_GETTER.shopDetail.item_dis_price
        )
        this.item_price_inp = this.comma(
          this.GET_AXIOS_CALLBACK_GETTER.shopDetail.item_price_inp
        )
      }, 3000)
      this.$bvModal.show('itemInsert')
    },
    onClickAutoCate() {
      this.LOADING_TRUE()
      const frm = new FormData()
      frm.append('smt_idx', this.LOGIN_TEACHER.smt_idx)
      frm.append('type', 'shopAuto')

      this.$axios
        .post(process.env.VUE_APP_API + '/teacher.php', frm, {
          header: {
            'Context-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res)
          setTimeout(() => {
            this.params = this.LOGIN_TEACHER
            this.params.type = 'shopList'
            this.params.queryCate = null
            this.GET_AXIOS(this.params)
          })
        })
        .catch((res) => {
          console.log('AXIOS FALSE', res)
        })
    },
    onClickItemInsert() {
      this.params.detailIdx = ''
      this.GET_AXIOS_CALLBACK_GETTER.shopDetail = ''
      this.GET_AXIOS_CALLBACK_GETTER.buyStudent = ''
      this.calendarSales = ''
      this.calendarDiscountSales = ''
      this.cateIdx = ''
      this.itemInt = 0
      this.itemPrice = 0
      this.price2 = 0
      this.item_price_inp = 0
      this.itemContent = ''
      this.itemName = ''
      this.itemPriceDiscount = 0
      this.$bvModal.show('itemInsert')
    },
    priceCustom(e) {
      const rate = 200 / this.LOGIN_TEACHER.reg_pay_rate
      this.price2 = this.comma(this.uncomma(Math.round(e.target.value * rate)))
    },
    priceKrw(e) {
      const rate = this.LOGIN_TEACHER.reg_pay_rate / 200
      this.itemPrice = this.comma(
        this.uncomma(Math.round(e.target.value * rate))
      )
    },
    payComma(e) {
      this.itemPriceDiscount = this.comma(this.uncomma(e.target.value))
    },
    comma(str) {
      str = String(str)
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
    },
    uncomma(str) {
      str = String(str)
      return str.replace(/[^\d]+/g, '')
    },
    resetInput(e) {
      e.target.value = ''
    },

    //
  },
}
</script>

<style lang="scss">
.b-form-btn-label-control.form-control > .form-control {
  height: 40px;
}
</style>
