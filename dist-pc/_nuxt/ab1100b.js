(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{383:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var o=n(40),c=n.n(o),r=function(t,e){c.a.post("http://localhost:3095"+e,t,{header:{"Context-Type":"multipart/form-data"}}).then((function(t){console.log("axiosForm",t.data)})).catch((function(t){console.log("AXIOS FALSE",t)}))}},434:function(t,e,n){"use strict";n.r(e);n(53),n(45),n(52),n(69),n(70);var o=n(29),c=(n(75),n(23),n(44),n(164),n(54)),r=n(383);function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var _={layout:"default-pc",data:function(){return{params:{},paramsForm:{},paramsDetail:{},noticeSubject:"",noticeContent:"",noticeIdx:"",calendarSales:null,calendarDiscountSales:null,cate_name:"",cateIdx:"",itemPrice:0,itemPriceDiscount:0,itemContent:"",masks:{input:"YYYY-MM-DD"},itemName:"",queryCate:null}},computed:d(d({},Object(c.f)(["LOGIN"])),Object(c.d)(["GET_AXIOS_CALLBACK_GETTER","LOGIN_TEACHER"])),watch:{"$route.query.cate":{handler:function(t){console.log(t),this.queryCate=t},immediate:!0}},beforeCreate:function(){},mounted:function(){console.log(this.$nuxt,this.$config),this.params=this.LOGIN_TEACHER,this.params.type="noticeList",this.GET_AXIOS(this.params)},methods:d(d(d({},Object(c.c)(["POST_AXIOS","GET_AXIOS"])),Object(c.e)(["LOADING_TRUE"])),{},{onSubmit:function(){var t=this;this.paramsForm=this.LOGIN_TEACHER,this.paramsForm.type="noticeWrite",this.paramsForm.bd_subject=this.noticeSubject,this.paramsForm.bd_content=this.noticeContent,this.paramsForm.bd_photo=0,this.POST_AXIOS(this.paramsForm),setTimeout((function(){t.params=t.LOGIN_TEACHER,t.params.type="noticeList",t.GET_AXIOS(t.params)}),1e3),this.$bvModal.hide("itemInsert")},onSubmitItem:function(){var t=this,e=new FormData;Object.entries(this.LOGIN_TEACHER).forEach((function(t,i){e.append(t[0],t[1])})),e.append("type","noticeEdit"),e.append("noticeSubject",this.noticeSubject),e.append("noticeContent",this.noticeContent),e.append("noticeIdx",this.noticeIdx),Object(r.a)(e,"/teacher.php"),setTimeout((function(){t.params=t.LOGIN_TEACHER,t.params.type="noticeList",t.GET_AXIOS(t.params)}),1e3),this.$bvModal.hide("itemInsert")},isActiveCalendar:function(t){this.$refs[t].classList.toggle("is_active")},onClickCategory:function(t){t?this.$router.push("/shop-list?cate=".concat(t)):this.$router.push("/shop-list")},onClickItemDetail:function(t){var e=this;this.noticeIdx=t,this.paramsDetail=this.LOGIN_TEACHER,this.paramsDetail.type="noticeList",this.paramsDetail.noticeIdx=t,console.log(t),this.GET_AXIOS(this.paramsDetail),setTimeout((function(){e.noticeSubject=e.GET_AXIOS_CALLBACK_GETTER.noticeView[0].bd_subject,e.noticeContent=e.GET_AXIOS_CALLBACK_GETTER.noticeView[0].bd_content}),1500),this.$bvModal.show("itemInsert")},onClickItemInsert:function(){this.noticeIdx=null,this.noticeSubject=this.GET_AXIOS_CALLBACK_GETTER.week,this.noticeContent="",this.$bvModal.show("itemInsert")}})},m=n(84),component=Object(m.a)(_,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{},[n("div",{staticClass:"flex"},[t.LOGIN_TEACHER?n("h4",{staticClass:"is_active"},[t._v("알림장관리")]):t._e(),t._v(" "),n("div",{staticClass:"flex-right"},[n("button",{staticClass:"jelly-btn jelly-btn--default",on:{click:t.onClickItemInsert}},[t._v("\n          알림장 추가\n        ")])])]),t._v(" "),n("div",{staticStyle:{"padding-top":"0vh"},attrs:{id:"jellyAdminheader"}},[n("div",{staticClass:"student form"},[n("div",{staticClass:"student__list"},[t.GET_AXIOS_CALLBACK_GETTER.noticeList?n("div",{staticClass:"m-t-3"},[n("table",{staticClass:"jelly-table"},[t._m(0),t._v(" "),t._l(t.GET_AXIOS_CALLBACK_GETTER.noticeList,(function(e,i){return n("tr",{key:"noticeList"+i,staticStyle:{cursor:"pointer"},on:{click:function(n){return t.onClickItemDetail(e.idx)}}},[n("td",{staticClass:"relative"},[n("div",{staticClass:"progressRead",staticStyle:{background:"#007bff",top:"0",left:"0",height:"2px",position:"absolute"},style:"width:"+(e.progress?e.progress:0)+"%"}),t._v("\n                  "+t._s(e.bd_subject)+"\n                ")]),t._v(" "),n("td",[t._v(t._s(e.datetime2))])])}))],2)]):t._e()])])])]),t._v(" "),n("b-modal",{attrs:{id:"itemInsert",size:"lg","hide-footer":"","hide-header":""}},[t.GET_AXIOS_CALLBACK_GETTER.noticeRead&&t.noticeIdx?n("div",{staticClass:"m-t-5"},[n("p",[t._v("읽지않음")]),t._v(" "),t._l(t.GET_AXIOS_CALLBACK_GETTER.noticeRead,(function(e,i){return n("span",{key:i,staticClass:"m-r-2"},[t._v("\n        "+t._s(e.reg_name)+"\n      ")])}))],2):t._e(),t._v(" "),n("div",{staticClass:"m-t-5"},[n("p",[t._v("제목")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.noticeSubject,expression:"noticeSubject"}],staticClass:"jelly-text jelly-text--h wd-full",attrs:{type:"text"},domProps:{value:t.noticeSubject},on:{input:function(e){e.target.composing||(t.noticeSubject=e.target.value)}}})]),t._v(" "),n("div",{staticClass:"m-t-5"},[n("vue-editor",{model:{value:t.noticeContent,callback:function(e){t.noticeContent=e},expression:"noticeContent"}})],1),t._v(" "),n("div",{staticClass:"m-t-5 text-center"},[n("button",{staticClass:"jelly-btn jelly-btn--default",on:{click:function(e){return t.$bvModal.hide("itemInsert")}}},[t._v("\n        닫기\n      ")]),t._v(" "),t.noticeIdx?n("button",{staticClass:"jelly-btn jelly-btn--pink",on:{click:t.onSubmitItem}},[t._v("\n        수정하기\n      ")]):t._e(),t._v(" "),t.noticeIdx?t._e():n("button",{staticClass:"jelly-btn jelly-btn--pink",on:{click:t.onSubmit}},[t._v("\n        등록하기\n      ")])])])],1)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tr",[n("th",[t._v("제목")]),t._v(" "),n("th",[t._v("작성일")])])}],!1,null,null,null);e.default=component.exports}}]);