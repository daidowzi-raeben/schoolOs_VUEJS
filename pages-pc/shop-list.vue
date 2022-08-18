<template>
  <div>
    <div class="">
      <div class="flex">
        <h4 v-if="LOGIN_TEACHER">상점 관리</h4>
        <div class="flex-right">
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
              :class="queryCate ? '' : 'is_active'"
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
                  style="curosr: pointer"
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
      <div class="m-t-5">
        <p>재고</p>
        <input v-model="itemInt" type="text" class="jelly-text jelly-text--h" />
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
          <div class="flex-full m-l-1">
            <p>상품가격</p>
            <input
              v-model="itemPrice"
              type="text"
              class="jelly-text jelly-text--h wd-full text-right"
            />
          </div>
          <span v-if="LOGIN_TEACHER" class="m-t-9">
            {{ LOGIN_TEACHER.reg_pay_unit }}
          </span>
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
          v-if="!params.detailIdx"
          class="jelly-btn jelly-btn--pink"
          @click="onSubmitItem"
        >
          등록하기
        </button>
        <button
          v-if="params.detailIdx"
          class="jelly-btn jelly-btn--pink"
          @click="onSubmitItemEdit"
        >
          수정하기
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
      params: {},
      paramsForm: {},
      calendarSales: null,
      calendarDiscountSales: null,
      calendarSalesDate: null,
      calendarDiscountSalesDate: null,
      cate_name: '',
      context: null,
      cateIdx: '',
      itemPrice: 0,
      itemPriceDiscount: 0,
      itemContent: '',
      itemInt: '',
      masks: {
        input: 'YYYY-MM-DD',
      },
      itemName: '',
      queryCate: null,
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
        this.queryCate = value
        if (this.queryCate) {
          this.params = this.LOGIN_TEACHER
          this.params.queryCate = value
          this.params.type = 'shopList'
          this.GET_AXIOS(this.params)
        } else {
          this.params.queryCate = null
          this.params = this.LOGIN_TEACHER
          this.params.type = 'shopList'
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
      FORM_DATA.append('itemPrice', this.itemPrice)
      FORM_DATA.append('itemContent', this.itemContent)
      FORM_DATA.append('itemName', this.itemName)
      FORM_DATA.append('itemThumb', itemThumb.files[0])
      FORM_DATA.append('itemPriceDiscount', this.itemPriceDiscount)
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
      FORM_DATA.append('itemPrice', this.itemPrice)
      FORM_DATA.append('itemContent', this.itemContent)
      FORM_DATA.append('itemName', this.itemName)
      FORM_DATA.append('itemThumb', itemThumb.files[0])
      FORM_DATA.append('itemPriceDiscount', this.itemPriceDiscount)
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
        this.$router.push(`/shop-list`)
      }
    },
    onClickItemDetail(e) {
      this.params = this.LOGIN_TEACHER
      this.params.type = 'shopList'
      this.params.detailIdx = e
      console.log(e)
      this.GET_AXIOS(this.params)
      setTimeout(() => {
        this.calendarSales = this.GET_AXIOS_CALLBACK_GETTER.shopDetail.end_day
        this.calendarDiscountSales =
          this.GET_AXIOS_CALLBACK_GETTER.shopDetail.item_dis_date
        this.cateIdx = this.GET_AXIOS_CALLBACK_GETTER.shopDetail.ssc_idx
        this.itemPrice = this.GET_AXIOS_CALLBACK_GETTER.shopDetail.item_price
        this.itemContent =
          this.GET_AXIOS_CALLBACK_GETTER.shopDetail.item_content
        this.itemName = this.GET_AXIOS_CALLBACK_GETTER.shopDetail.item_name
        this.itemInt = this.GET_AXIOS_CALLBACK_GETTER.shopDetail.item_int
        this.itemPriceDiscount =
          this.GET_AXIOS_CALLBACK_GETTER.shopDetail.item_dis_price
      }, 3000)
      this.$bvModal.show('itemInsert')
    },
    onClickItemInsert() {
      this.calendarSales = ''
      this.calendarDiscountSales = ''
      this.cateIdx = ''
      this.itemPrice = ''
      this.itemContent = ''
      this.itemName = ''
      this.itemPriceDiscount = ''
      this.$bvModal.show('itemInsert')
    },
    //
  },
}
</script>

<style lang="scss"></style>
