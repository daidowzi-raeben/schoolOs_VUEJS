(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{446:function(t,e,n){"use strict";n.r(e);n(53),n(45),n(52),n(23),n(69),n(44),n(70);var l=n(29),r=(n(41),n(71),n(54));function o(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function _(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(e){Object(l.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var c={layout:"default-pc",data:function(){return{params:{},paramsForm:{},pay:0,payWon:"",tax:{tax_dose:"",tax_semen:"",tax_dose_nm:"",tax_semen_nm:"",type:"teacherTax",jb_mode:null,jb_pay:0,notice_pay:""}}},computed:_(_({},Object(r.f)(["LOGIN","STATE_TEACHER_SETTING"])),Object(r.d)(["","LOGIN_TEACHER"])),beforeCreate:function(){},mounted:function(){console.log(this.$nuxt,this.$config),this.params=this.LOGIN_TEACHER,this.params.type="teacherTax",this.ACTIONS_TEACHER(this.params),this.STATE_TEACHER_SETTING.tax_dose&&console.log("=========")},methods:_(_(_({},Object(r.c)(["POST_AXIOS","ACTIONS_TEACHER"])),Object(r.e)(["LOADING_TRUE"])),{},{onSubmit:function(){this.tax.tax_dose=this.$refs.tax_dose.value,this.tax.tax_dose_nm=this.$refs.tax_dose_nm.value,this.tax.tax_semen=this.$refs.tax_semen.value,this.tax.tax_semen_nm=this.$refs.tax_semen_nm.value,this.tax.jb_mode=this.$refs.jb_mode.value,this.tax.jb_pay=this.$refs.jb_pay.value,this.tax.notice_pay=this.$refs.notice_pay.value,this.tax.smt_idx=this.LOGIN_TEACHER.smt_idx,this.POST_AXIOS(this.tax),alert("저장되었습니다.")},payComma:function(t){this.pay=this.comma(this.uncomma(t.target.value))},comma:function(t){return(t=String(t)).replace(/(\d)(?=(?:\d{3})+(?!\d))/g,"$1,")},uncomma:function(t){return(t=String(t)).replace(/[^\d]+/g,"")},resetInput:function(t){t.target.value=""}})},m=n(84),component=Object(m.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{},[n("div",{staticClass:"flex"},[t.LOGIN_TEACHER?n("h4",{staticClass:"is_active"},[t._v("세율설정")]):t._e()]),t._v(" "),n("div",{staticStyle:{"padding-top":"0vh"},attrs:{id:"jellyAdminheader"}},[n("div",{staticClass:"student form"},[n("div",{staticClass:"student__list"},[n("div",{staticClass:"flex m-t-3"},[t.STATE_TEACHER_SETTING&&t.STATE_TEACHER_SETTING.teacher?n("div",{staticClass:"item",staticStyle:{width:"100%"}},[n("p",[t._v("\n                기본 세금\n                "),n("span",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],attrs:{title:"소득세, 원천징수 등 세금을 이름을 설정하여 급여 지급 시 부과할 수 있습니다."}},[n("b-icon",{attrs:{icon:"exclamation-circle"}})],1)]),t._v(" "),n("div",{staticClass:"d-flex"},[n("input",{ref:"tax_semen_nm",staticClass:"jelly-text jelly-text--under",domProps:{value:t.STATE_TEACHER_SETTING.tax_semen_nm}}),t._v(" "),n("input",{ref:"tax_semen",staticClass:"jelly-text jelly-text--under text-right m-l-2",domProps:{value:t.STATE_TEACHER_SETTING.tax_semen}}),t._v(" "),t.LOGIN_TEACHER?n("span",{staticClass:"input-focus m-t-1 m-l-2"},[t._v("\n                  %\n                ")]):t._e()]),t._v(" "),n("p",{staticClass:"m-t-5"},[t._v("\n                고정 세금\n                "),n("span",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],attrs:{title:"급여 지급 시 비율이 아닌 고정 금액의 세금을 부과할 수 있습니다."}},[n("b-icon",{attrs:{icon:"exclamation-circle"}})],1)]),t._v(" "),n("div",{staticClass:"d-flex"},[n("input",{ref:"tax_dose_nm",staticClass:"jelly-text jelly-text--under",domProps:{value:t.STATE_TEACHER_SETTING.tax_dose_nm}}),t._v(" "),n("input",{ref:"tax_dose",staticClass:"jelly-text jelly-text--under text-right m-l-2",domProps:{value:t.STATE_TEACHER_SETTING.tax_dose}}),t._v(" "),t.LOGIN_TEACHER?n("span",{staticClass:"input-focus m-t-1 m-l-2"},[t._v("\n                  "+t._s(t.LOGIN_TEACHER.reg_pay_unit)+"\n                ")]):t._e()]),t._v(" "),n("p",{staticClass:"m-t-5"},[t._v("\n                젤리복권\n                "),n("span",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],attrs:{title:"매주 월요일 9시부터 금요일 14시까지 판매를 시작하며, 총 구매금액의 50% : 1등, 30%: 2등, 20%: 3등, 구매금액: 4등 으로 추첨합니다."}},[n("b-icon",{attrs:{icon:"exclamation-circle"}})],1)]),t._v(" "),n("div",{staticClass:"d-flex m-t-3"},[n("select",{ref:"jb_mode",staticClass:"jelly-text",staticStyle:{width:"150px"},domProps:{value:t.STATE_TEACHER_SETTING.teacher.jb_mode}},[n("option",{domProps:{value:null}},[t._v("선택하세요")]),t._v(" "),n("option",{attrs:{value:"Y"}},[t._v("사용")]),t._v(" "),n("option",{attrs:{value:"N"}},[t._v("미사용")])])]),t._v(" "),n("p",{staticClass:"m-t-5"},[t._v("젤리복권 구매가격")]),t._v(" "),n("div",{staticClass:"d-flex"},[n("input",{ref:"jb_pay",staticClass:"jelly-text jelly-text--under text-right m-l-2",domProps:{value:t.STATE_TEACHER_SETTING.teacher.jb_pay}}),t._v(" "),t.LOGIN_TEACHER?n("span",{staticClass:"input-focus m-t-1 m-l-2"},[t._v("\n                  "+t._s(t.LOGIN_TEACHER.reg_pay_unit)+"\n                ")]):t._e()]),t._v(" "),n("p",{staticClass:"m-t-5"},[t._v("알림장 읽음 보상")]),t._v(" "),n("div",{staticClass:"d-flex"},[n("input",{ref:"notice_pay",staticClass:"jelly-text jelly-text--under text-right m-l-2",domProps:{value:t.STATE_TEACHER_SETTING.teacher.notice_pay}}),t._v(" "),t.LOGIN_TEACHER?n("span",{staticClass:"input-focus m-t-1 m-l-2"},[t._v("\n                  "+t._s(t.LOGIN_TEACHER.reg_pay_unit)+"\n                ")]):t._e()]),t._v(" "),n("div",{staticClass:"m-t-5 text-center"},[n("button",{staticClass:"jelly-btn jelly-btn--blue",on:{click:t.onSubmit}},[t._v("\n                  저장\n                ")])])]):t._e()])])])])])])}),[],!1,null,null,null);e.default=component.exports}}]);