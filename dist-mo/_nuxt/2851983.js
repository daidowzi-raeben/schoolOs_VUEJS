(window.webpackJsonp = window.webpackJsonp || []).push([[10], { 453: function (t, _, e) { "use strict"; e.r(_); e(51), e(43), e(50), e(23), e(67), e(44), e(68); var l = e(27), n = (e(60), e(277), e(45)); function o(object, t) { var _ = Object.keys(object); if (Object.getOwnPropertySymbols) { var e = Object.getOwnPropertySymbols(object); t && (e = e.filter((function (t) { return Object.getOwnPropertyDescriptor(object, t).enumerable }))), _.push.apply(_, e) } return _ } function c(t) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? o(Object(source), !0).forEach((function (_) { Object(l.a)(t, _, source[_]) })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(source)) : o(Object(source)).forEach((function (_) { Object.defineProperty(t, _, Object.getOwnPropertyDescriptor(source, _)) })) } return t } var A = { name: "IndexPage", components: {}, layout: "default-mo", data: function () { return { LOGIN_CONFIG: {}, params: {}, statusHeight: { effort: 0, etiquette: 0, health: 0, intellect: 0 }, getDataNotice: { bd_content: "111" }, getDataStatus: [], test: "", paramsPost: {}, detailIdx: "", detailPay: "", profile: "" } }, computed: c(c({}, Object(n.f)(["LOGIN", "GET_AXIOS_CALLBACK_DATA_MAIN"])), Object(n.d)(["POST_AXIOS_CALLBACK_GETTER", "GET_AXIOS_CALLBACK_GETTER_MAIN", "LOGIN_STUDENT"])), created: function () { console.log("[created]") }, mounted: function () { var t = this; console.log("[ENV]", "TEST_CONFIG"), console.log("[ENV]", "xxx.com"), console.log("[ENV]", "http://localhost:3095"), console.log("[mounted]"), setTimeout((function () { t.LOGIN_CONFIG = JSON.parse(localStorage.getItem("STUDENT")), console.log(t.$nuxt, t.$config, t.LOGIN_CONFIG), t.params = t.LOGIN_CONFIG, t.params.type = "main", t.GET_AXIOS(t.params) })), this.$nextTick((function () { })) }, methods: c(c(c({}, Object(n.c)(["POST_AXIOS", "GET_AXIOS"])), Object(n.e)(["LOADING_INIT", "LOADING_TRUE"])), {}, { onClickTodoDetail: function (t) { this.$router.push("/todo-detail/" + t) }, onClickBillDetail: function (t, _) { this.detailIdx = t, this.detailPay = _; var e = Number(this.GET_AXIOS_CALLBACK_DATA_MAIN.account.PtotalAccount) - Number(this.GET_AXIOS_CALLBACK_DATA_MAIN.account.MtotalAccount); this.detailPay > e ? alert("납부할 수 있는 금액이 부족해요") : this.$bvModal.show("billDetail") }, onSubmit: function () { var t = this; console.log(this.detailIdx), this.$bvModal.hide("billDetail"), this.paramsPost.type = "billListStudent", this.paramsPost.idx = this.detailIdx, this.paramsPost.sms_idx = this.LOGIN_CONFIG.sms_idx, this.paramsPost.smt_idx = this.LOGIN_CONFIG.smt_idx, this.POST_AXIOS(this.paramsPost), setTimeout((function () { t.params = t.LOGIN_CONFIG, t.params.type = "main", t.GET_AXIOS(t.params), alert("정상적으로 납부되었습니다.") }), 1e3) }, onSubmitProfile: function () { var t = this; if (!this.$refs.reg_photo.value) return alert("사진을 먼저 업로드 해주세요"); this.LOADING_TRUE(), this.$bvModal.hide("profileImage"); var _ = new FormData, e = document.getElementById("reg_photo"); _.append("reg_photo", e.files[0]), _.append("type", "profileImage"), _.append("sms_idx", this.LOGIN_CONFIG.sms_idx), _.append("reg_id", this.LOGIN_CONFIG.reg_id), this.$axios.post("http://localhost:3095/student.php", _, { header: { "Context-Type": "multipart/form-data" } }).then((function (_) { console.log(_.data), t.LOGIN_CONFIG.reg_photo = _.data, setTimeout((function () { localStorage.setItem("STUDENT", JSON.stringify(t.LOGIN_CONFIG)), t.LOADING_INIT() })) })).catch((function (t) { console.log("AXIOS FALSE", t) })) } }) }, r = e(59), component = Object(r.a)(A, (function () { var t = this, _ = t.$createElement, e = t._self._c || _; return t.LOGIN_CONFIG && t.GET_AXIOS_CALLBACK_GETTER_MAIN ? e("div", { attrs: { id: "school-content" } }, [e("div", { staticClass: "content" }, [e("div", { staticClass: "content__top" }, [e("div", { directives: [{ name: "b-modal", rawName: "v-b-modal.ModalNotice", modifiers: { ModalNotice: !0 } }], staticClass: "content__top--notice flex" }, [t.GET_AXIOS_CALLBACK_DATA_MAIN.rules && t.LOGIN_CONFIG.t_reg_country ? e("p", [t._v("\n          " + t._s(t.LOGIN_CONFIG.t_reg_country) + " 규칙 확인하기\n          "), e("b-modal", { attrs: { id: "ModalNotice", "hide-footer": "" } }, [e("div", { staticClass: "img-full" }, [e("ul", t._l(t.GET_AXIOS_CALLBACK_DATA_MAIN.rules, (function (_, i) { return e("li", { key: i, staticClass: "m-b-2 p-b-2", staticStyle: { "border-bottom": "1px solid #eee" } }, [e("div", { staticClass: "font-16 bold" }, [t._v("\n                    " + t._s(i + 1) + "조. " + t._s(_.content) + "\n                  ")]), t._v(" "), t._l(_.ruleContent, (function (_, l) { return e("div", { key: _.idx, staticStyle: { padding: "10px" } }, [e("div", { staticClass: "font-14" }, [t._v(t._s(l + 1) + "항. " + t._s(_.subject))]), t._v(" "), t.LOGIN_CONFIG ? e("div", { staticClass: "m-t-1 jelly-color--888 font-12" }, [t._v("\n                      " + t._s(_.penalty + t.LOGIN_CONFIG.t_reg_pay_unit) + "\n                      " + t._s(_.penalty_etc ? " / " + _.penalty_etc : _.penalty_etc) + "\n                    ")]) : t._e()]) }))], 2) })), 0)]), t._v(" "), e("div", { staticClass: "m-t-3" }, [e("button", { staticClass: "jelly-btn jelly-btn--default wd-full", on: { click: function (_) { return t.$bvModal.hide("ModalNotice") } } }, [t._v("\n                닫기\n              ")])])])], 1) : e("p", [t._v("아직 규칙이 정해지지 않았어요")]), t._v(" "), e("b-icon", { staticClass: "flex-right", attrs: { icon: "chevron-right" } })], 1), t._v(" "), e("div", { staticClass: "content__top--level" }, [e("div", { staticClass: "flex m-t-3" }, [e("div", { staticClass: "profile" }, [e("div", { staticClass: "profile__avatar flex" }, [t.LOGIN_CONFIG ? e("div", { directives: [{ name: "b-modal", rawName: "v-b-modal.profileImage", modifiers: { profileImage: !0 } }], staticClass: "photo" }, [t.LOGIN_CONFIG.reg_photo ? t._e() : e("img", { attrs: { src: "https://api.school-os.net/data/student/profile/default.png" } }), t._v(" "), t.LOGIN_CONFIG.reg_photo ? e("img", { attrs: { src: "https://api.school-os.net/data/student/profile/thumb/" + t.LOGIN_CONFIG.reg_photo } }) : t._e()]) : t._e(), t._v(" "), e("div", { staticClass: "name" }, [e("div", { staticClass: "flex" }, [e("nuxt-link", { attrs: { to: "/name-style" } }, [t.GET_AXIOS_CALLBACK_DATA_MAIN.student ? e("em", { staticClass: "font-12", staticStyle: { "line-height": "15px" } }, [t.GET_AXIOS_CALLBACK_DATA_MAIN.student.name_style ? e("p", [t._v("\n                        " + t._s(t.GET_AXIOS_CALLBACK_DATA_MAIN.student.name_style.split("|")[0]) + "\n                      ")]) : t._e(), t._v(" "), t.GET_AXIOS_CALLBACK_DATA_MAIN.student.name_style ? e("p", [t._v("\n                        " + t._s(t.GET_AXIOS_CALLBACK_DATA_MAIN.student.name_style.split("|")[1]) + "\n                      ")]) : t._e(), t._v(" "), t.GET_AXIOS_CALLBACK_DATA_MAIN.student.name_style ? t._e() : e("em", { staticClass: "font-12" }, [t._v("\n                        칭호 설정하기\n                      ")])]) : t._e()])], 1), t._v(" "), e("strong", [t._v("\n                  " + t._s(t.LOGIN_CONFIG.reg_name) + "\n                ")]), t._v(" "), e("p", [t._v("\n                  LV\n                  "), t.GET_AXIOS_CALLBACK_DATA_MAIN.status ? e("em", { staticClass: "bold" }, [t._v("\n                    " + t._s(t.GET_AXIOS_CALLBACK_DATA_MAIN.status.total ? Math.floor(t.GET_AXIOS_CALLBACK_DATA_MAIN.status.total / 4) : 0) + "\n                  ")]) : t._e()])])])]), t._v(" "), e("div", { staticClass: "status flex-right" }, [t.GET_AXIOS_CALLBACK_DATA_MAIN.status ? e("ul", { staticClass: "flex" }, [e("li", {}, [e("div", { staticClass: "stat", style: "height: calc(" + t.GET_AXIOS_CALLBACK_DATA_MAIN.status.intellect / t.GET_AXIOS_CALLBACK_DATA_MAIN.status.total * 100 + "% - 0px)" }), t._v(" "), e("p", { staticClass: "bold" }, [t._v("지혜")]), t._v(" "), e("span", [t._v(t._s(t.GET_AXIOS_CALLBACK_DATA_MAIN.status.intellect))])]), t._v(" "), e("li", [e("div", { staticClass: "stat", style: "height: calc(" + t.GET_AXIOS_CALLBACK_DATA_MAIN.status.effort / t.GET_AXIOS_CALLBACK_DATA_MAIN.status.total * 100 + "% - 0px)" }), t._v(" "), e("p", { staticClass: "bold" }, [t._v("노력")]), t._v(" "), e("span", [t._v(t._s(t.GET_AXIOS_CALLBACK_DATA_MAIN.status.effort))])]), t._v(" "), e("li", [e("div", { staticClass: "stat", style: "height: calc(" + t.GET_AXIOS_CALLBACK_DATA_MAIN.status.health / t.GET_AXIOS_CALLBACK_DATA_MAIN.status.total * 100 + "% - 0px)" }), t._v(" "), e("p", { staticClass: "bold" }, [t._v("건강")]), t._v(" "), e("span", [t._v(t._s(t.GET_AXIOS_CALLBACK_DATA_MAIN.status.health))])]), t._v(" "), e("li", [e("div", { staticClass: "stat", style: "height: calc(" + t.GET_AXIOS_CALLBACK_DATA_MAIN.status.etiquette / t.GET_AXIOS_CALLBACK_DATA_MAIN.status.total * 100 + "% - 0px)" }), t._v(" "), e("p", { staticClass: "bold" }, [t._v("예절")]), t._v(" "), e("span", [t._v(t._s(t.GET_AXIOS_CALLBACK_DATA_MAIN.status.etiquette))])])]) : t._e()])])])]), t._v(" "), e("div", { staticClass: "content__body" }, [t.GET_AXIOS_CALLBACK_DATA_MAIN.billNon && t.GET_AXIOS_CALLBACK_DATA_MAIN.billNon.length > 0 ? e("div", { staticClass: "box quest m-b-5" }, [t.LOGIN_CONFIG ? e("div", { staticClass: "quest__title flex" }, [t.LOGIN_CONFIG.t_todo_name ? e("h3", [t._v("나의 고지서")]) : t._e()]) : t._e(), t._v(" "), t.GET_AXIOS_CALLBACK_DATA_MAIN.billNon ? e("div", { staticClass: "quest__content" }, t._l(t.GET_AXIOS_CALLBACK_DATA_MAIN.billNon, (function (_, l) { return e("div", { key: l, staticClass: "m-t-3", on: { click: function (e) { return t.onClickBillDetail(_.idx, _.over_day ? _.over_day : _.pay) } } }, [e("div", { staticClass: "flex" }, [e("div", { staticClass: "txt m-l-2" }, [e("p", [t._v(t._s(_.subject))]), t._v(" "), e("span", [t._v(t._s(_.code))])]), t._v(" "), e("div", { staticClass: "pay text-right flex-right", staticStyle: { "flex-shrink": "0" } }, [e("p", [e("em", { staticClass: "bold" }, [t._v("\n                    " + t._s(t._f("comma")(_.over_day ? _.over_day : _.pay)) + "\n                  ")]), t._v(" "), t.LOGIN_CONFIG.t_reg_pay_unit ? e("span", [t._v(t._s(t.LOGIN_CONFIG.t_reg_pay_unit))]) : t._e()])])]), t._v(" "), _.end_day && _.add_pay ? e("div", { staticClass: "font-12 text-center m-t-1" }, [e("em", [t._v("\n                " + t._s(t._f("moment")(_.end_day, "YY.MM.DD")) + " 까지 미납 시\n                " + t._s(_.add_pay)), t.LOGIN_CONFIG.t_reg_pay_unit ? e("span", [t._v(t._s(t.LOGIN_CONFIG.t_reg_pay_unit))]) : t._e(), t._v("씩 미납 연체금 추가\n              ")])]) : t._e(), t._v(" "), e("div", { staticClass: "m-t-2 font-12", staticStyle: { background: "#f8f8f8", padding: "10px" } }, [t._v("\n              " + t._s(_.content) + "\n            ")])]) })), 0) : t._e()]) : t._e(), t._v(" "), e("div", { staticClass: "box quest m-b-3" }, [e("div", { staticClass: "quest__title flex" }, [t.LOGIN_CONFIG ? e("nuxt-link", { attrs: { to: "/todo-my-list/0" } }, [t.LOGIN_CONFIG.t_todo_name ? e("h3", [t._v("\n              새로 등록된 " + t._s(t.LOGIN_CONFIG.t_todo_name) + "\n            ")]) : t._e()]) : t._e(), t._v(" "), e("b-icon", { staticClass: "m-l-1", staticStyle: { "margin-top": "2px" }, attrs: { icon: "chevron-right" } })], 1), t._v(" "), t.GET_AXIOS_CALLBACK_DATA_MAIN.questListMain ? e("div", { staticClass: "quest__content" }, t._l(t.GET_AXIOS_CALLBACK_DATA_MAIN.questListMain, (function (_, l) { return e("div", { key: l, staticClass: "flex m-t-3", on: { click: function (e) { return t.onClickTodoDetail(_.idx) } } }, [e("div", { staticClass: "label blue" }, [t._v(t._s(_.subject_cate))]), t._v(" "), e("div", { staticClass: "txt m-l-2" }, [e("p", [t._v(t._s(_.subject))]), t._v(" "), e("span", [t._v(t._s(_.start_day) + " ~ " + t._s(_.end_day))])]), t._v(" "), e("div", { staticClass: "pay text-right flex-right", staticStyle: { "flex-shrink": "0" } }, [e("p", [e("em", { staticClass: "bold" }, [t._v("\n                  " + t._s(t._f("comma")(_.price)) + "\n                ")]), t._v(" "), t.LOGIN_CONFIG.t_reg_pay_unit ? e("span", [t._v(t._s(t.LOGIN_CONFIG.t_reg_pay_unit))]) : t._e()]), t._v(" "), e("span", [t._v(t._s(_.d_day) + "일남음")])])]) })), 0) : t._e()]), t._v(" "), e("div", { staticClass: "box quest" }, [e("div", { staticClass: "quest__title flex" }, [t.LOGIN_CONFIG ? e("nuxt-link", { attrs: { to: "/todo-my-list/0" } }, [t.LOGIN_CONFIG.t_todo_name ? e("h3", [t._v("\n              나의 " + t._s(t.LOGIN_CONFIG.t_todo_name) + "\n            ")]) : t._e()]) : t._e(), t._v(" "), e("b-icon", { staticClass: "m-l-1", staticStyle: { "margin-top": "2px" }, attrs: { icon: "chevron-right" } })], 1), t._v(" "), t.GET_AXIOS_CALLBACK_DATA_MAIN.quest ? e("div", { staticClass: "quest__content" }, [0 === t.GET_AXIOS_CALLBACK_DATA_MAIN.quest.length ? e("div", { staticClass: "p-3 text-center font-14" }, [e("nuxt-link", { attrs: { to: "/todo-list/0" } }, [e("em", [t._v("\n                아직 수락한 일이 없어요."), e("br"), t._v("여기를 터치하여 할 수 있는 일을\n                찾아보세요\n              ")])])], 1) : t._e(), t._v(" "), t._l(t.GET_AXIOS_CALLBACK_DATA_MAIN.quest, (function (_, l) { return e("div", { key: l, staticClass: "flex m-t-3", on: { click: function (e) { return t.onClickTodoDetail(_.idx) } } }, [e("div", { staticClass: "label blue", staticStyle: { "flex-shrink": "0" } }, [t._v("\n              " + t._s(_.subject_cate) + "\n            ")]), t._v(" "), e("div", { staticClass: "txt m-l-2" }, [e("p", [t._v(t._s(_.subject))]), t._v(" "), e("span", [t._v(t._s(_.start_day) + " ~ " + t._s(_.end_day))])]), t._v(" "), e("div", { staticClass: "pay text-right flex-right", staticStyle: { "flex-shrink": "0" } }, [e("p", [e("em", { staticClass: "bold" }, [t._v("\n                  " + t._s(t._f("comma")(_.price)) + "\n                ")]), t._v(" "), t.LOGIN_CONFIG.t_reg_pay_unit ? e("span", [t._v(t._s(t.LOGIN_CONFIG.t_reg_pay_unit))]) : t._e()]), t._v(" "), e("span", [t._v(t._s(_.d_day) + "일남음")])])]) }))], 2) : t._e()]), t._v(" "), e("div", { staticClass: "account m-t-4" }), t._v(" "), t.GET_AXIOS_CALLBACK_DATA_MAIN.account ? e("div", { staticClass: "box account-area m-t-2" }, [e("nuxt-link", { attrs: { to: "/bank-transfer-list" } }, [e("h3", [t._v("\n            나의 통장\n            "), e("b-icon", { staticClass: "m-l-1", staticStyle: { "margin-top": "2px" }, attrs: { icon: "chevron-right" } })], 1)]), t._v(" "), e("nuxt-link", { staticClass: "wd-full", attrs: { to: "/bank-transfer-list" } }, [e("div", { staticClass: "flex m-t-2" }, [e("div", [e("p", [t._v("\n                " + t._s(t.GET_AXIOS_CALLBACK_DATA_MAIN.account.account_number) + "\n              ")]), t._v(" "), e("span", { staticClass: "jelly-color--gray font-12" }, [t._v(t._s(t.GET_AXIOS_CALLBACK_DATA_MAIN.account.nick_name))])]), t._v(" "), e("div", { staticClass: "flex-right" }, [e("strong", { staticClass: "font-18 bold" }, [e("em", [t._v(t._s(t._f("comma")(t.GET_AXIOS_CALLBACK_DATA_MAIN.account.PtotalAccount || t.GET_AXIOS_CALLBACK_DATA_MAIN.account.MtotalAccount ? t.GET_AXIOS_CALLBACK_DATA_MAIN.account.PtotalAccount - t.GET_AXIOS_CALLBACK_DATA_MAIN.account.MtotalAccount : 0)))])]), t._v(" "), t.LOGIN_CONFIG.t_reg_pay_unit ? e("span", [t._v(t._s(t.LOGIN_CONFIG.t_reg_pay_unit))]) : t._e()])])]), t._v(" "), t.GET_AXIOS_CALLBACK_DATA_MAIN.student && "1" !== t.GET_AXIOS_CALLBACK_DATA_MAIN.student.deposit ? e("div", { staticClass: "flex m-t-3" }, [e("nuxt-link", { staticClass: "wd-full", attrs: { to: "/bank-transfer" } }, [e("button", { staticClass: "jelly-btn jelly-btn--gray wd-full" }, [t._v("이체")])]), t._v(" "), e("nuxt-link", { staticClass: "wd-full", attrs: { to: "/bank-transfer-cash" } }, [e("button", { staticClass: "jelly-btn jelly-btn--default wd-full m-l-2" }, [t._v("\n              출금\n            ")])])], 1) : t._e()], 1) : t._e(), t._v(" "), t.GET_AXIOS_CALLBACK_DATA_MAIN.teacher && "Y" === t.GET_AXIOS_CALLBACK_DATA_MAIN.teacher.inflation ? e("div", { staticClass: "box account-area m-t-2" }, [e("nuxt-link", { staticClass: "flex", attrs: { to: "/bank-country-list" } }, [e("h3", [t._v("\n            국고 통장\n            "), e("b-icon", { staticClass: "m-l-1", staticStyle: { "margin-top": "2px" }, attrs: { icon: "chevron-right" } })], 1), t._v(" "), "Y" === t.GET_AXIOS_CALLBACK_DATA_MAIN.teacher.inflation ? e("div", { staticClass: "flex-right" }, [e("strong", { staticClass: "font-18 bold" }, [e("em", [t._v(t._s(t._f("comma")(t.GET_AXIOS_CALLBACK_DATA_MAIN.teacher.total_pay)))])]), t._v(" "), t.LOGIN_CONFIG.t_reg_pay_unit ? e("span", [t._v(t._s(t.LOGIN_CONFIG.t_reg_pay_unit))]) : t._e()]) : t._e()])], 1) : t._e(), t._v(" "), e("div", { staticClass: "box account-area m-t-3 dotted text-center", attrs: { onclick: "alert('아직 준비중이에요')" } }, [e("b-icon", { directives: [{ name: "b-toggle", rawName: "v-b-toggle.notification", modifiers: { notification: !0 } }], staticClass: "font-30", attrs: { icon: "plus" } }), t._v(" "), e("p", [t._v("새로운 통장을 만들어보세요")])], 1)])]), t._v(" "), e("b-modal", { attrs: { id: "billDetail", size: "lg", "hide-footer": "", "hide-header": "" } }, [e("h4", { staticStyle: { "font-size": "16px" } }, [t._v("고지서 금액만큼 납부 할까요?")]), t._v(" "), e("div", { staticClass: "m-t-5 flex text-center" }, [e("button", { staticClass: "jelly-btn jelly-btn--default flex-full m-r-1", on: { click: function (_) { return t.$bvModal.hide("billDetail") } } }, [t._v("\n        취소\n      ")]), t._v(" "), e("button", { staticClass: "jelly-btn jelly-btn--pink flex-full m-l-1", on: { click: t.onSubmit } }, [t._v("\n        납부\n      ")])])]), t._v(" "), e("b-modal", { attrs: { id: "profileImage", size: "sm", "hide-footer": "", "hide-header": "" } }, [t.LOGIN_CONFIG ? e("div", [t.LOGIN_CONFIG.reg_photo ? t._e() : e("img", { attrs: { src: "https://api.school-os.net/data/student/profile/default.png", width: "100%" } }), t._v(" "), t.LOGIN_CONFIG.reg_photo ? e("img", { attrs: { src: "https://api.school-os.net/data/student/profile/" + t.LOGIN_CONFIG.reg_photo, width: "100%" } }) : t._e()]) : t._e(), t._v(" "), e("div", { staticClass: "m-t-3" }, [e("p", [t._v("프로필 수정")]), t._v(" "), e("input", { ref: "reg_photo", staticClass: "jelly-text jelly-text--h flex-full", attrs: { id: "reg_photo", type: "file" } })]), t._v(" "), e("div", { staticClass: "m-t-5 flex text-center" }, [e("button", { staticClass: "jelly-btn jelly-btn--default flex-full m-r-1", on: { click: function (_) { return t.$bvModal.hide("profileImage") } } }, [t._v("\n        닫기\n      ")]), t._v(" "), e("button", { staticClass: "jelly-btn jelly-btn--pink flex-full m-l-1", on: { click: t.onSubmitProfile } }, [t._v("\n        업로드\n      ")])])])], 1) : t._e() }), [], !1, null, null, null); _.default = component.exports } }]);