(window.webpackJsonp = window.webpackJsonp || []).push([[6], { 384: function (t, e, l) { var content = l(398); content.__esModule && (content = content.default), "string" == typeof content && (content = [[t.i, content, ""]]), content.locals && (t.exports = content.locals); (0, l(95).default)("42b160d5", content, !0, { sourceMap: !1 }) }, 397: function (t, e, l) { "use strict"; l(384) }, 398: function (t, e, l) { var n = l(94)(!1); n.push([t.i, ".studentScrollArea{padding:10px;height:300px;border:1px solid #ddd;border-radius:5px;overflow-y:auto}.studentScrollArea>div{border-bottom:1px solid #ddd;padding:7px 0}", ""]), t.exports = n }, 427: function (t, e, l) { "use strict"; l.r(e); l(53), l(45), l(52), l(69), l(70); var n = l(29), c = (l(23), l(44), l(75), l(41), l(71), l(65), l(54)); function r(object, t) { var e = Object.keys(object); if (Object.getOwnPropertySymbols) { var l = Object.getOwnPropertySymbols(object); t && (l = l.filter((function (t) { return Object.getOwnPropertyDescriptor(object, t).enumerable }))), e.push.apply(e, l) } return e } function o(t) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? r(Object(source), !0).forEach((function (e) { Object(n.a)(t, e, source[e]) })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(source)) : r(Object(source)).forEach((function (e) { Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(source, e)) })) } return t } var d = { layout: "default-pc", data: function () { return { params: { type: "billListStudent", queryCate: "" }, paramsPost: {}, billStudent: [], billPay: 0, billPayAdd: 0, billSubject: null, billContent: "", queryCate: null, checked: [], etcInput: !1, end_day: "" } }, computed: o(o(o({}, Object(c.f)(["LOGIN"])), Object(c.d)(["GET_AXIOS_CALLBACK_GETTER", "LOGIN_TEACHER"])), {}, { selectAll: { get: function () { return !!this.GET_AXIOS_CALLBACK_GETTER.studentList && (!!this.billStudent && this.billStudent.length === this.GET_AXIOS_CALLBACK_GETTER.studentList.length) }, set: function (t) { var e = []; t && this.GET_AXIOS_CALLBACK_GETTER.studentList.forEach((function (t) { e.push(t.idx) })), this.billStudent = e } } }), watch: { "$route.query.cate": { handler: function (t) { console.log(t), this.queryCate = t, this.queryCate ? (this.params = this.LOGIN_TEACHER, this.params.queryCate = t, this.params.type = "billListStudent", this.GET_AXIOS(this.params)) : (this.params.queryCate = null, this.params = this.LOGIN_TEACHER, this.params.type = "billListStudent", this.GET_AXIOS(this.params)) } } }, beforeCreate: function () { }, mounted: function () { this.params.queryCate = null, this.queryCate = null, console.log(this.$nuxt, this.$config), this.params = this.LOGIN_TEACHER, this.params.type = "billListStudent", this.params.queryCate = null, this.GET_AXIOS(this.params), this.params.type = "" }, methods: o(o(o({}, Object(c.c)(["POST_AXIOS", "GET_AXIOS"])), Object(c.e)(["LOADING_TRUE"])), {}, { onClickBillInsert: function () { this.billCateList = null, this.billPay = 0, this.billSubject = "", this.$bvModal.show("billInsert") }, onSubmit: function () { var t = this; if (0 === this.billStudent.length) return alert("학생을 선택해 주세요"); this.LOADING_TRUE(); var e = new FormData; e.append("smt_idx", this.LOGIN_TEACHER.smt_idx), e.append("type", "billListStudent"), "etc" === this.billSubject ? e.append("billStudent", this.etcInput) : e.append("billSubject", this.billSubject), e.append("billStudent", this.billStudent), e.append("billPay", this.uncomma(this.billPay)), e.append("billPayAdd", this.uncomma(this.billPayAdd)), e.append("end_day", this.end_day), e.append("billContent", this.billContent), this.$axios.post("http://localhost:3095/teacher.php", e, { header: { "Context-Type": "multipart/form-data" } }).then((function (e) { console.log(e), setTimeout((function () { t.params = t.LOGIN_TEACHER, t.params.type = "billListStudent", t.GET_AXIOS(t.params), t.$bvModal.hide("billInsert") })) })).catch((function (t) { console.log("AXIOS FALSE", t) })) }, onClickCategory: function (t) { t ? this.$router.push("/bill-student?cate=".concat(t)) : (this.queryCate = null, this.$router.push("/bill-student")) }, onSelectETC: function (t) { "etc" === t.target.value ? this.etcInput = !0 : (this.etcInput = !1, this.billSubject = t.target.value) }, onInputETC: function (t) { this.billSubject = t.target.value }, payComma: function (t) { this.billPay = this.comma(this.uncomma(t.target.value)) }, payComma2: function (t) { this.billPayAdd = this.comma(this.uncomma(t.target.value)) }, comma: function (t) { return (t = String(t)).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,") }, uncomma: function (t) { return (t = String(t)).replace(/[^\d]+/g, "") }, resetInput: function (t) { t.target.value = "" }, onChangeEndDate: function (t) { var e = new Date(t) - new Date, l = Math.floor(e / 864e5), n = Math.floor(e / 36e5 % 24), c = Math.floor(e / 6e4 % 60), r = Math.floor(e / 1e3 % 60); console.log("".concat(l, "일 ").concat(n, "시간 ").concat(c, "분 ").concat(r, "초")) } }) }, _ = (l(397), l(84)), component = Object(_.a)(d, (function () { var t = this, e = t.$createElement, l = t._self._c || e; return l("div", [l("div", {}, [l("div", { staticClass: "flex" }, [t.LOGIN_TEACHER ? l("h4", { staticClass: "is_active" }, [t._v("고지서 관리")]) : t._e(), t._v(" "), l("div", { staticClass: "flex-right" }, [l("button", { staticClass: "jelly-btn jelly-btn--default", on: { click: t.onClickBillInsert } }, [t._v("\n          고지서 추가\n        ")])])]), t._v(" "), l("div", { staticStyle: { "padding-top": "0vh" }, attrs: { id: "jellyAdminheader" } }, [l("div", [l("div", { staticClass: "m-t-5" }, [l("span", { staticClass: "spanBox m-r-2", class: t.queryCate ? "" : "is_active", on: { click: function (e) { return t.onClickCategory("") } } }, [t._v("전체")]), t._v(" "), l("span", { staticClass: "spanBox m-r-2", class: "1" === t.queryCate ? "is_active" : "", on: { click: function (e) { return t.onClickCategory("1") } } }, [t._v("미납")])])]), t._v(" "), l("div", { staticClass: "student form" }, [l("div", { staticClass: "student__list" }, [t.GET_AXIOS_CALLBACK_GETTER.billList ? l("div", { staticClass: "m-t-3" }, [l("table", { staticClass: "jelly-table" }, [t._m(0), t._v(" "), t._l(t.GET_AXIOS_CALLBACK_GETTER.billList, (function (e, i) { return l("tr", { key: i }, [l("td", ["0" === e.status ? l("span", [t._v("[납부전]")]) : t._e(), t._v(" "), "1" === e.status ? l("span", { staticClass: "jelly-color--type4" }, [t._v("[납부완료]")]) : t._e()]), t._v(" "), l("td", [t._v(t._s(e.reg_name))]), t._v(" "), l("td", [t._v("\n                  " + t._s(t._f("comma")(e.pay)) + " " + t._s(t.LOGIN_TEACHER.reg_pay_unit) + "\n                  "), l("br"), t._v(t._s(e.add_pay ? "(미납 시 +" + e.add_pay + ")" : "") + "\n                ")]), t._v(" "), l("td", [t._v("\n                  " + t._s(t._f("moment")(e.end_day, "YY.MM.DD")) + "\n                ")]), t._v(" "), l("td", [l("p", { staticClass: "font-12 color-888" }, [t._v(t._s(e.code))]), t._v("\n                  " + t._s(e.subject) + "\n                ")]), t._v(" "), l("td", { staticStyle: { background: "#ffffcc" } }, [t._v(t._s(e.content))])]) }))], 2)]) : t._e()])])])]), t._v(" "), l("b-modal", { attrs: { id: "billInsert", size: "lg", "hide-footer": "", "hide-header": "" } }, [l("div", [l("div", {}, [l("div", { staticClass: "flex" }, [l("div", { staticClass: "flex-full m-r-1" }, [l("p", [t._v("학생선택")]), t._v(" "), l("div", { staticClass: "studentScrollArea" }, [l("div", [l("div", { staticClass: "flex" }, [l("label", { staticClass: "m-l-2 m-t-2" }, [l("input", { directives: [{ name: "model", rawName: "v-model", value: t.selectAll, expression: "selectAll" }], attrs: { type: "checkbox" }, domProps: { checked: Array.isArray(t.selectAll) ? t._i(t.selectAll, null) > -1 : t.selectAll }, on: { change: function (e) { var l = t.selectAll, n = e.target, c = !!n.checked; if (Array.isArray(l)) { var r = t._i(l, null); n.checked ? r < 0 && (t.selectAll = l.concat([null])) : r > -1 && (t.selectAll = l.slice(0, r).concat(l.slice(r + 1))) } else t.selectAll = c } } }), t._v("\n                    전체발송\n                  ")])])]), t._v(" "), t._l(t.GET_AXIOS_CALLBACK_GETTER.studentList, (function (e, i) { return l("div", { key: i }, [l("div", { staticClass: "flex" }, [l("b-avatar", { attrs: { variant: "success", icon: "people-fill", src: "https://api.school-os.net/data/student/profile/thumb/" + e.reg_photo } }), t._v(" "), l("label", { staticClass: "m-l-2 m-t-2" }, [l("input", { directives: [{ name: "model", rawName: "v-model", value: t.billStudent, expression: "billStudent" }], key: i, attrs: { id: "checked" + e.idx, type: "checkbox" }, domProps: { value: e.idx, checked: Array.isArray(t.billStudent) ? t._i(t.billStudent, e.idx) > -1 : t.billStudent }, on: { change: function (l) { var n = t.billStudent, c = l.target, r = !!c.checked; if (Array.isArray(n)) { var o = e.idx, d = t._i(n, o); c.checked ? d < 0 && (t.billStudent = n.concat([o])) : d > -1 && (t.billStudent = n.slice(0, d).concat(n.slice(d + 1))) } else t.billStudent = r } } }), t._v("\n                    " + t._s(e.reg_name) + "\n                    (" + t._s(e.reg_id) + ")\n                  ")]), t._v(" "), l("div", { staticClass: "flex-right m-t-2" }, [e.PtotalAccount ? l("span", [t._v("\n                      " + t._s(t._f("comma")(e.MtotalAccount ? e.PtotalAccount : Number(e.PtotalAccount) - Number(e.MtotalAccount))) + "\n                    ")]) : l("span", [t._v("0")]), t._v(" "), t.LOGIN_TEACHER ? l("span", [t._v("\n                      " + t._s(t.LOGIN_TEACHER.reg_pay_unit) + "\n                    ")]) : t._e()])], 1)]) }))], 2)]), t._v(" "), l("div", { staticClass: "flex-full" }, [l("div", { staticClass: "flex-full m-r-1" }, [l("p", [t._v("제목")]), t._v(" "), l("select", { directives: [{ name: "model", rawName: "v-model", value: t.billSubject, expression: "billSubject" }], staticClass: "jelly-text wd-full", on: { change: [function (e) { var l = Array.prototype.filter.call(e.target.options, (function (t) { return t.selected })).map((function (t) { return "_value" in t ? t._value : t.value })); t.billSubject = e.target.multiple ? l : l[0] }, function (e) { return t.onSelectETC(e) }] } }, [l("option", { domProps: { value: null } }, [t._v("선택하세요")]), t._v(" "), t._l(t.GET_AXIOS_CALLBACK_GETTER.billListSubject, (function (e) { return l("option", { key: e.subject, domProps: { value: e.subject } }, [t._v("\n                  " + t._s(e.subject) + "\n                ")]) })), t._v(" "), l("option", { attrs: { value: "etc" } }, [t._v("직접입력")])], 2), t._v(" "), t.etcInput ? l("input", { staticClass: "jelly-text wd-full m-t-1", attrs: { type: "text" } }) : t._e()]), t._v(" "), l("div", { staticClass: "flex-full m-r-1 m-t-3" }, [l("p", [t._v("금액")]), t._v(" "), l("input", { directives: [{ name: "model", rawName: "v-model", value: t.billPay, expression: "billPay" }], staticClass: "jelly-text wd-full text-right", attrs: { type: "text" }, domProps: { value: t.billPay }, on: { click: function (e) { return t.resetInput(e) }, input: [function (e) { e.target.composing || (t.billPay = e.target.value) }, function (e) { return t.payComma(e) }] } })]), t._v(" "), l("div", { staticClass: "flex-full m-r-1 m-t-3" }, [l("p", [t._v("미납 연체 수수료")]), t._v(" "), l("input", { directives: [{ name: "model", rawName: "v-model", value: t.billPayAdd, expression: "billPayAdd" }], staticClass: "jelly-text wd-full text-right", attrs: { type: "text" }, domProps: { value: t.billPayAdd }, on: { click: function (e) { return t.resetInput(e) }, input: [function (e) { e.target.composing || (t.billPayAdd = e.target.value) }, function (e) { return t.payComma2(e) }] } })]), t._v(" "), l("div", { staticClass: "flex-full m-r-1 m-t-3" }, [l("p", [t._v("납부 기한")]), t._v(" "), l("b-form-datepicker", { staticClass: "jelly-text jelly-text--h wd-full", model: { value: t.end_day, callback: function (e) { t.end_day = e }, expression: "end_day" } })], 1)])])]), t._v(" "), l("div", { staticClass: "m-t-5" }, [l("div", { staticClass: "flex-full m-l-1" }, [l("p", [t._v("내용")]), t._v(" "), l("textarea", { directives: [{ name: "model", rawName: "v-model", value: t.billContent, expression: "billContent" }], staticClass: "jelly-text wd-full", staticStyle: { height: "150px" }, attrs: { placeholder: "간결하게 작성해 주세요" }, domProps: { value: t.billContent }, on: { input: function (e) { e.target.composing || (t.billContent = e.target.value) } } })])]), t._v(" "), l("div", { staticClass: "m-t-5 text-center" }, [l("button", { staticClass: "jelly-btn jelly-btn--default", on: { click: function (e) { return t.$bvModal.hide("billInsert") } } }, [t._v("\n          닫기\n        ")]), t._v(" "), l("button", { staticClass: "jelly-btn jelly-btn--pink", on: { click: t.onSubmit } }, [t._v("\n          발송하기\n        ")])])])])], 1) }), [function () { var t = this, e = t.$createElement, l = t._self._c || e; return l("tr", [l("th", [t._v("상태")]), t._v(" "), l("th", [t._v("이름")]), t._v(" "), l("th", [t._v("금액")]), t._v(" "), l("th", [t._v("납부기한")]), t._v(" "), l("th", [t._v("제목")]), t._v(" "), l("th", [t._v("내용")])]) }], !1, null, null, null); e.default = component.exports } }]);