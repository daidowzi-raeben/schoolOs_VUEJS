(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{452:function(t,e,l){"use strict";l.r(e);l(51),l(43),l(50),l(23),l(67),l(44),l(68);var _=l(27),n=(l(41),l(45));function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(object);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,l)}return e}function o(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(_.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var r={name:"TodoList",layout:"default-mo",validate:function(t){var e=t.params;return/^\d+$/.test(e.id)},asyncData:function(t){var e=t.params;return console.log(e),{idx:e.id}},data:function(){return{params:{}}},computed:o(o({},Object(n.f)(["LOGIN"])),Object(n.d)(["GET_AXIOS_CALLBACK_GETTER","LOGIN_STUDENT"])),beforeCreate:function(){},mounted:function(){console.log(this.$nuxt,this.$config),this.params=this.LOGIN_STUDENT,this.params.type="questList",this.params.cate_idx=this.idx,this.GET_AXIOS(this.params)},methods:o(o(o({},Object(n.c)(["POST_AXIOS","GET_AXIOS"])),Object(n.e)(["LOADING_TRUE"])),{},{onClickTodoDetail:function(t){this.$router.push("/todo-detail/"+t)}})},v=l(59),component=Object(v.a)(r,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{attrs:{id:"school-content"}},[l("div",{staticClass:"p-3 jelly-tab"},[t.LOGIN_STUDENT&&t.LOGIN_STUDENT.t_todo_name?l("ul",{staticClass:"flex"},[l("li",[l("nuxt-link",{attrs:{to:"/todo-list/0"}},[t._v("전체 "+t._s(t.LOGIN_STUDENT.t_todo_name))])],1),t._v(" "),l("li",{staticClass:"is_active"},[t._v("나의 "+t._s(t.LOGIN_STUDENT.t_todo_name))])]):t._e()]),t._v(" "),t.GET_AXIOS_CALLBACK_GETTER.questCate?l("div",{staticClass:"p-l-3 p-r-3 p-b-3"},[l("nuxt-link",{attrs:{to:"/todo-my-list/0"}},[l("span",{class:0==t.idx?"jelly-badge m-r-1 m-b-2 is_active":"jelly-badge m-r-1 m-b-2"},[t._v("전체")])]),t._v(" "),t._l(t.GET_AXIOS_CALLBACK_GETTER.questCate,(function(e,_){return l("nuxt-link",{key:_,attrs:{to:"/todo-my-list/"+e.idx}},[l("span",{class:e.idx==t.idx?"is_active jelly-badge m-r-1 m-b-2":"jelly-badge m-r-1 m-b-2"},[t._v(t._s(e.subject))])])}))],2):t._e(),t._v(" "),l("div",{staticClass:"content"},[l("div",{staticClass:"content__body m-t-1"},[t.LOGIN_STUDENT?l("div",{staticClass:"account"},[t.LOGIN_STUDENT.t_todo_name?l("h3",[t._v("\n          진행중인 나의 "+t._s(t.LOGIN_STUDENT.t_todo_name)+"\n        ")]):t._e()]):t._e(),t._v(" "),t.GET_AXIOS_CALLBACK_GETTER.questListMy?t._e():l("div",{staticClass:"quest__content m-t-3"},[l("div",{staticClass:"text-center font-14 p-t-10 p-b-10"},[t._v("\n          할 수 있는 일을 찾아 '수락' 버튼을 눌러보세요.\n        ")])]),t._v(" "),t.GET_AXIOS_CALLBACK_GETTER.questListMy?l("div",{staticClass:"quest__content m-t-3"},t._l(t.GET_AXIOS_CALLBACK_GETTER.questListMy,(function(e,_){return l("div",{key:_,staticClass:"box quest m-b-3",on:{click:function(l){return t.onClickTodoDetail(e.idx)}}},[l("div",{staticClass:"flex"},[l("div",{staticClass:"label blue"},[t._v(t._s(e.cate_subject))]),t._v(" "),l("div",{staticClass:"flex-full m-l-2"},[l("div",{staticClass:"flex m-t-0"},[l("div",{staticClass:"txt"},[l("p",{staticClass:"bold"},[t._v(t._s(e.subject))]),t._v(" "),l("span",[t._v(t._s(t._f("moment")(e.start_day,"YY.MM.DD"))+" ~\n                    "+t._s(t._f("moment")(e.end_day,"YY.MM.DD")))])]),t._v(" "),l("div",{staticClass:"pay text-right flex-right"})]),t._v(" "),l("div",{staticClass:"m-t-2 flex flex-full"},[l("div",[t._v("\n                  보상\n                  "),l("strong",{staticClass:"bold font-18 m-l-1"},[l("em",[t._v(t._s(e.price))])]),t._v(" "),t.LOGIN_STUDENT.t_reg_pay_unit?l("span",[t._v(t._s(t.LOGIN_STUDENT.t_reg_pay_unit))]):t._e()]),t._v(" "),l("div",{staticClass:"flex-right"},[l("div",{staticClass:"flex m-t-0"},[l("span",{staticClass:"jelly-point m-t-0 jelly-background--type1 m-l-1"},[t._v(t._s(e.intellect))]),t._v(" "),l("span",{staticClass:"jelly-point m-t-0 jelly-background--type2 m-l-1"},[t._v(t._s(e.effort))]),t._v(" "),l("span",{staticClass:"jelly-point m-t-0 jelly-background--type3 m-l-1"},[t._v(t._s(e.health))]),t._v(" "),l("span",{staticClass:"jelly-point m-t-0 jelly-background--type4 m-l-1"},[t._v(t._s(e.etiquette))])])])])])])])})),0):t._e()]),t._v(" "),t.GET_AXIOS_CALLBACK_GETTER.questListMyComplete?l("div",{staticClass:"content__body m-t-1 h60"},[t._m(0),t._v(" "),t.GET_AXIOS_CALLBACK_GETTER.questListMyComplete?l("div",{staticClass:"quest__content m-t-3"},t._l(t.GET_AXIOS_CALLBACK_GETTER.questListMyComplete,(function(e,_){return l("div",{key:_,staticClass:"box quest m-b-3",on:{click:function(l){return t.onClickTodoDetail(e.idx)}}},[l("div",{staticClass:"flex"},[l("div",{staticClass:"label blue"},[t._v(t._s(e.cate_subject))]),t._v(" "),l("div",{staticClass:"flex-full m-l-2"},[l("div",{staticClass:"flex m-t-0"},[l("div",{staticClass:"txt"},[l("p",{staticClass:"bold"},[t._v(t._s(e.subject))]),t._v(" "),l("span",[t._v(t._s(t._f("moment")(e.start_day,"YY.MM.DD"))+" ~\n                    "+t._s(t._f("moment")(e.end_day,"YY.MM.DD")))])]),t._v(" "),l("div",{staticClass:"pay text-right flex-right"})]),t._v(" "),l("div",{staticClass:"m-t-2 flex flex-full"},[l("div",[t._v("\n                  보상\n                  "),l("strong",{staticClass:"bold font-18 m-l-1"},[l("em",[t._v(t._s(e.price))])]),t._v(" "),t.LOGIN_STUDENT.t_reg_pay_unit?l("span",[t._v(t._s(t.LOGIN_STUDENT.t_reg_pay_unit))]):t._e()]),t._v(" "),l("div",{staticClass:"flex-right"},[l("div",{staticClass:"flex m-t-0"},[l("span",{staticClass:"jelly-point m-t-0 jelly-background--type1 m-l-1"},[t._v(t._s(e.intellect))]),t._v(" "),l("span",{staticClass:"jelly-point m-t-0 jelly-background--type2 m-l-1"},[t._v(t._s(e.effort))]),t._v(" "),l("span",{staticClass:"jelly-point m-t-0 jelly-background--type3 m-l-1"},[t._v(t._s(e.health))]),t._v(" "),l("span",{staticClass:"jelly-point m-t-0 jelly-background--type4 m-l-1"},[t._v(t._s(e.etiquette))])])])])])])])})),0):t._e()]):t._e()])])}),[function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"account"},[l("h3",[t._v("완료")])])}],!1,null,null,null);e.default=component.exports}}]);