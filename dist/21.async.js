(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[21],{dzOB:function(e,t,a){"use strict";var n=a("TqRt"),u=a("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("/zsF");var l=n(a("PArb"));a("DZo9");var s=n(a("8z0m"));a("+L6B");var r=n(a("2/Rp"));a("Pwec");var i=n(a("CtXQ"));a("miYZ");var o,d,c=n(a("tsqr")),f=n(a("lwsE")),p=n(a("W8MJ")),v=n(a("a1gu")),g=n(a("Nsbk")),m=n(a("7W2i")),w=u(a("q1tI")),b=a("LLXN"),h=a("MuoO"),E=n(a("gJV7")),y=function(e){return"/api/upload/rsa/".concat(e)},V=(o=(0,h.connect)(function(e){var t=e.user;return{currentUser:t.currentUser}}),o(d=function(e){function t(){var e,a;(0,f.default)(this,t);for(var n=arguments.length,u=new Array(n),l=0;l<n;l++)u[l]=arguments[l];return a=(0,v.default)(this,(e=(0,g.default)(t)).call.apply(e,[this].concat(u))),a.uploadProps=function(e){return{name:"file",action:y(e),showUploadList:!1,onChange:function(t){if("done"===t.file.status){c.default.success("".concat(t.file.name," file uploaded successfully"));var n=a.props.dispatch;n({type:"user/updateRSA",payload:e})}else"error"===t.file.status&&c.default.error("".concat(t.file.name," file upload failed."))}}},a.getViewDom=function(e){a.view=e},a}return(0,m.default)(t,e),(0,p.default)(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return w.default.createElement("div",{className:E.default.baseView,ref:this.getViewDom},w.default.createElement("div",{className:E.default.left},w.default.createElement(s.default,this.uploadProps("pre"),w.default.createElement(r.default,null,w.default.createElement(i.default,{type:"upload"})," ",(0,b.formatMessage)({id:"app.settings.rsa.pre"}))),w.default.createElement(l.default,null),w.default.createElement(s.default,this.uploadProps("pub"),w.default.createElement(r.default,null,w.default.createElement(i.default,{type:"upload"})," ",(0,b.formatMessage)({id:"app.settings.rsa.pub"})))),w.default.createElement("div",{className:E.default.right}))}}]),t}(w.Component))||d),M=V;t.default=M},gJV7:function(e,t,a){e.exports={baseView:"antd-pro-pages-account-settings-base-view-baseView",left:"antd-pro-pages-account-settings-base-view-left",right:"antd-pro-pages-account-settings-base-view-right",avatar_title:"antd-pro-pages-account-settings-base-view-avatar_title",avatar:"antd-pro-pages-account-settings-base-view-avatar",button_view:"antd-pro-pages-account-settings-base-view-button_view"}}}]);