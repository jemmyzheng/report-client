(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[22],{a4KE:function(e,t,a){"use strict";var s=a("284h"),n=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("Mwp2");var r=n(a("VXEj")),l=n(a("lwsE")),u=n(a("W8MJ")),d=n(a("a1gu")),i=n(a("Nsbk")),o=n(a("7W2i")),c=s(a("q1tI")),f=a("LLXN"),m={strong:c.default.createElement("font",{className:"strong"},c.default.createElement(f.FormattedMessage,{id:"app.settings.security.strong",defaultMessage:"Strong"})),medium:c.default.createElement("font",{className:"medium"},c.default.createElement(f.FormattedMessage,{id:"app.settings.security.medium",defaultMessage:"Medium"})),weak:c.default.createElement("font",{className:"weak"},c.default.createElement(f.FormattedMessage,{id:"app.settings.security.weak",defaultMessage:"Weak"}),"Weak")},p=function(e){function t(){var e,a;(0,l.default)(this,t);for(var s=arguments.length,n=new Array(s),r=0;r<s;r++)n[r]=arguments[r];return a=(0,d.default)(this,(e=(0,i.default)(t)).call.apply(e,[this].concat(n))),a.getData=function(){return[{title:(0,f.formatMessage)({id:"app.settings.security.password"},{}),description:c.default.createElement(c.Fragment,null,(0,f.formatMessage)({id:"app.settings.security.password-description"}),"\uff1a",m.strong),actions:[c.default.createElement("a",null,c.default.createElement(f.FormattedMessage,{id:"app.settings.security.modify",defaultMessage:"Modify"}))]}]},a}return(0,o.default)(t,e),(0,u.default)(t,[{key:"render",value:function(){return c.default.createElement(c.Fragment,null,c.default.createElement(r.default,{itemLayout:"horizontal",dataSource:this.getData(),renderItem:function(e){return c.default.createElement(r.default.Item,{actions:e.actions},c.default.createElement(r.default.Item.Meta,{title:e.title,description:e.description}))}}))}}]),t}(c.Component),g=p;t.default=g}}]);