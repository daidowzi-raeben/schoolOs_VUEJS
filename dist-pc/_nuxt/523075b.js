(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{426:function(t,e,l){"use strict";l.r(e);l(53),l(45),l(52),l(23),l(69),l(44),l(70);var n=l(29),r=(l(271),l(75),l(41),l(71),l(54));function o(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(object);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,l)}return e}function c(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var _={layout:"default-pc",data:function(){return{params:{type:"billList"},paramsPost:{},billCateList:null,billPay:0,billSubject:"",queryCate:null}},computed:c(c({},Object(r.f)(["LOGIN"])),Object(r.d)(["GET_AXIOS_CALLBACK_GETTER","LOGIN_TEACHER"])),watch:{"$route.query.cate":{handler:function(t){console.log(t),this.params.type="billList",t?(this.queryCate=t,this.params=this.LOGIN_TEACHER,this.params.queryCate=t,this.params.type="billList",this.GET_AXIOS(this.params)):(this.params.queryCate=null,this.queryCate=null,this.params=this.LOGIN_TEACHER,this.params.type="billList",this.GET_AXIOS(this.params))},immediate:!1}},beforeCreate:function(){},mounted:function(){console.log("----------------------------",this.queryCate,this.params.queryCate),console.log(this.$nuxt,this.$config),this.params=this.LOGIN_TEACHER,this.params.type="billList",this.params.queryCate=null,console.log("===========================",this.params),this.GET_AXIOS(this.params),this.params.type=""},methods:c(c(c({},Object(r.c)(["POST_AXIOS","GET_AXIOS"])),Object(r.e)(["LOADING_TRUE"])),{},{onClickBillInsert:function(){this.billCateList=null,this.billPay=0,this.billSubject="",this.$bvModal.show("billInsert")},onSubmit:function(){var t=this;if(Number(this.uncomma(this.billPay))>Number(this.GET_AXIOS_CALLBACK_GETTER.teacher.total_pay)&&"Y"===this.GET_AXIOS_CALLBACK_GETTER.teacher.inflation)return alert("잔액이 부족합니다. 대출 후 진행해 주세요.");this.LOADING_TRUE();var e=new FormData;e.append("smt_idx",this.LOGIN_TEACHER.smt_idx),e.append("type","billList"),e.append("billCateList",this.billCateList),e.append("billPay",this.uncomma(this.billPay)),e.append("billSubject",this.billSubject),this.$axios.post("http://localhost:3095/teacher.php",e,{header:{"Context-Type":"multipart/form-data"}}).then((function(e){console.log(e),t.$bvModal.hide("billInsert"),setTimeout((function(){t.params=t.LOGIN_TEACHER,t.params.type="billList",t.GET_AXIOS(t.params)}))})).catch((function(t){console.log("AXIOS FALSE",t)}))},payComma:function(t){this.billPay=this.comma(this.uncomma(t.target.value))},comma:function(t){return(t=String(t)).replace(/(\d)(?=(?:\d{3})+(?!\d))/g,"$1,")},uncomma:function(t){return(t=String(t)).replace(/[^\d]+/g,"")},resetInput:function(t){t.target.value=""},onClickCategory:function(t){t?this.$router.push("/bill-list?cate=".concat(t)):(this.queryCate=null,this.$router.push("/bill-list"))}})},v=l(84),component=Object(v.a)(_,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",[l("div",{},[l("div",{staticClass:"flex"},[t.LOGIN_TEACHER?l("h4",{staticClass:"is_active"},[t._v("SOC납부")]):t._e(),t._v(" "),l("div",{staticClass:"flex-right"},[l("button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticClass:"jelly-btn jelly-btn--default",attrs:{title:"학생에게 세금에 필요한 지도를 위해 전기세, 수도세 등 공과금을 납부할 수 있습니다."},on:{click:t.onClickBillInsert}},[t._v("\n          세금 추가\n        ")])])]),t._v(" "),l("div",{staticStyle:{"padding-top":"0vh"},attrs:{id:"jellyAdminheader"}},[l("div",[l("div",{staticClass:"m-t-5"},[l("span",{staticClass:"spanBox m-r-2",class:t.queryCate?"":"is_active",on:{click:function(e){return t.onClickCategory("")}}},[t._v("전체")]),t._v(" "),t.GET_AXIOS_CALLBACK_GETTER.billCateList?l("span",t._l(t.GET_AXIOS_CALLBACK_GETTER.billCateList,(function(e,i){return l("span",{key:"cate"+i,staticClass:"spanBox m-r-2",class:t.queryCate==e.idx?"is_active":"",on:{click:function(l){return t.onClickCategory(e.idx)}}},[t._v("\n              "+t._s(e.subject)+"\n            ")])})),0):t._e()])]),t._v(" "),l("div",{staticClass:"student form"},[l("div",{staticClass:"student__list"},[l("div",{staticClass:"m-t-3"},[t.GET_AXIOS_CALLBACK_GETTER.billList?l("table",{staticClass:"jelly-table"},[t._m(0),t._v(" "),t._l(t.GET_AXIOS_CALLBACK_GETTER.billList,(function(e,i){return l("tr",{key:i},[l("td",[t._v("납부완료")]),t._v(" "),l("td",[t._v(t._s(e.cate_name))]),t._v(" "),l("td",[t._v(t._s(e.subject))]),t._v(" "),l("td",[t._v(t._s(e.code))]),t._v(" "),l("td",{staticClass:"text-right"},[t._v("\n                  "+t._s(t._f("comma")(e.pay))+" "+t._s(t.LOGIN_TEACHER.reg_pay_unit)+"\n                ")])])}))],2):t._e()])])])])]),t._v(" "),l("b-modal",{attrs:{id:"billInsert",size:"lg","hide-footer":"","hide-header":""}},[l("div",[l("div",{},[l("div",{staticClass:"flex"},[l("div",{staticClass:"flex-full m-r-1"},[l("p",[t._v("구분")]),t._v(" "),t.GET_AXIOS_CALLBACK_GETTER.billCateList?l("select",{directives:[{name:"model",rawName:"v-model",value:t.billCateList,expression:"billCateList"}],staticClass:"jelly-text wd-full",on:{change:function(e){var l=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.billCateList=e.target.multiple?l:l[0]}}},[l("option",{domProps:{value:null}},[t._v("선택하세요")]),t._v(" "),t._l(t.GET_AXIOS_CALLBACK_GETTER.billCateList,(function(e,i){return l("option",{key:i,domProps:{value:e.idx}},[t._v("\n                "+t._s(e.subject)+"\n              ")])}))],2):t._e()]),t._v(" "),l("div",{staticClass:"flex-full m-l-1"},[l("p",[t._v("제목")]),t._v(" "),l("input",{directives:[{name:"model",rawName:"v-model",value:t.billSubject,expression:"billSubject"}],staticClass:"jelly-text wd-full",attrs:{type:"text"},domProps:{value:t.billSubject},on:{input:function(e){e.target.composing||(t.billSubject=e.target.value)}}})])])]),t._v(" "),l("div",{staticClass:"m-t-5"},[l("div",{staticClass:"flex-full m-l-1"},[l("p",[t._v("금액")]),t._v(" "),l("input",{staticClass:"jelly-text wd-full",attrs:{type:"text"},domProps:{value:t.billPay},on:{input:function(e){return t.payComma(e)},click:function(e){return t.resetInput(e)}}})])]),t._v(" "),l("div",{staticClass:"m-t-5 text-center"},[l("button",{staticClass:"jelly-btn jelly-btn--default",on:{click:function(e){return t.$bvModal.hide("billInsert")}}},[t._v("\n          닫기\n        ")]),t._v(" "),l("button",{staticClass:"jelly-btn jelly-btn--pink",on:{click:t.onSubmit}},[t._v("\n          납부하기\n        ")])])])])],1)}),[function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("tr",[l("th",[t._v("상태")]),t._v(" "),l("th",[t._v("구분")]),t._v(" "),l("th",[t._v("제목")]),t._v(" "),l("th",[t._v("고지서 번호")]),t._v(" "),l("th",[t._v("금액")])])}],!1,null,null,null);e.default=component.exports}}]);