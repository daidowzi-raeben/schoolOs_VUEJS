(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{447:function(e,t,n){"use strict";n.r(t);n(48),n(23),n(44);var r=n(391),l={data:function(){return{studentList:{classNumber:[],name:[]}}},methods:{readFile:function(e){var t=this;if(this.file=e.target.files?e.target.files[0]:null,this.file){var n=new FileReader;this.studentList.classNumber=[],this.studentList.name=[],n.onload=function(e){var n=e.target.result,l=r.a(n,{type:"binary"}),o=l.SheetNames[0],c=l.Sheets[o];r.b.sheet_to_json(c,{header:1}).forEach((function(element,e){2===element.length&&0!==e&&(t.studentList.classNumber.push(element[0]),t.studentList.name.push(element[1]))})),console.log(t.studentList)},n.readAsBinaryString(this.file)}}}},o=n(84),component=Object(o.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("input",{attrs:{type:"file",accept:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},on:{change:e.readFile}}),e._v(" "),n("div",[e._v("\n    "+e._s(e.studentList)+"\n  ")])])}),[],!1,null,null,null);t.default=component.exports}}]);