(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{427:function(t,e,c){"use strict";c.r(e);c(51),c(43),c(50),c(23),c(67),c(44),c(68);var n=c(27),o=c(45);function r(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(object);t&&(c=c.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,c)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?r(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):r(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var O={data:function(){return{qrData:""}},computed:l(l({},Object(o.f)(["LOGIN"])),Object(o.d)(["GET_AXIOS_CALLBACK_GETTER","LOGIN_STUDENT"])),beforeCreate:function(){},mounted:function(){console.log(this.$nuxt,this.$config)},methods:l(l(l({},Object(o.c)(["POST_AXIOS","GET_AXIOS"])),Object(o.e)(["LOADING_TRUE"])),{},{onDecode:function(t){console.log(t),this.$router.push(t)}})},f=c(59),component=Object(f.a)(O,(function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("div",{attrs:{id:"school-content"}},[c("div",{staticClass:"historyBack m-l-3 m-b-5"},[c("b-icon",{attrs:{icon:"arrow-left",onclick:"history.back()"}})],1),t._v(" "),c("div",{staticClass:"content"},[c("div",{staticClass:"content__body m-t-1 h60 relative"},[c("qrcode-stream",{staticStyle:{width:"calc(100% - 32px)",height:"calc(100% - 32px)",position:"absolute"},on:{decode:t.onDecode}})],1),t._v(" "),c("div",{staticClass:"text-center m-t-5"},[t._v("\n      선생님의 QR코드를 통해 가입할 수 있습니다.\n    ")])])])}),[],!1,null,null,null);e.default=component.exports}}]);