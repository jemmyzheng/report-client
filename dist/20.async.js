(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[20],{"0evu":function(e,t,n){e.exports={main:"antd-pro-pages-account-settings-info-main",leftmenu:"antd-pro-pages-account-settings-info-leftmenu",right:"antd-pro-pages-account-settings-info-right",title:"antd-pro-pages-account-settings-info-title"}},"N01/":function(e,t,n){"use strict";var a=n("TqRt"),i=n("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=a(n("lwsE")),u=a(n("W8MJ")),r=a(n("a1gu")),l=a(n("Nsbk")),c=a(n("7W2i"));n("lUTK");var o,d,f=a(n("BvKs")),m=i(n("q1tI")),p=n("MuoO"),h=a(n("usdK")),v=n("LLXN"),g=a(n("v99g")),y=a(n("0evu")),M=f.default.Item,w=(o=(0,p.connect)(function(e){var t=e.user;return{currentUser:t.currentUser}}),o(d=function(e){function t(e){var n;(0,s.default)(this,t),n=(0,r.default)(this,(0,l.default)(t).call(this,e)),n.getmenu=function(){var e=n.state.menuMap;return Object.keys(e).map(function(t){return m.default.createElement(M,{key:t},e[t])})},n.getRightTitle=function(){var e=n.state,t=e.selectKey,a=e.menuMap;return a[t]},n.selectKey=function(e){var t=e.key;h.default.push("/account/settings/".concat(t)),n.setState({selectKey:t})},n.resize=function(){n.main&&requestAnimationFrame(function(){var e="inline",t=n.main.offsetWidth;n.main.offsetWidth<641&&t>400&&(e="horizontal"),window.innerWidth<768&&t>400&&(e="horizontal"),n.setState({mode:e})})};var a=e.match,i=e.location,u={base:m.default.createElement(v.FormattedMessage,{id:"app.settings.menuMap.basic",defaultMessage:"Basic Settings"}),security:m.default.createElement(v.FormattedMessage,{id:"app.settings.menuMap.security",defaultMessage:"Security Settings"})},c=i.pathname.replace("".concat(a.path,"/"),"");return n.state={mode:"inline",menuMap:u,selectKey:u[c]?c:"base"},n}return(0,c.default)(t,e),(0,u.default)(t,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.resize),this.resize()}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.resize)}},{key:"render",value:function(){var e=this,t=this.props,n=t.children,a=t.currentUser;if(!a.id)return"";var i=this.state,s=i.mode,u=i.selectKey;return m.default.createElement(g.default,null,m.default.createElement("div",{className:y.default.main,ref:function(t){e.main=t}},m.default.createElement("div",{className:y.default.leftmenu},m.default.createElement(f.default,{mode:s,selectedKeys:[u],onClick:this.selectKey},this.getmenu())),m.default.createElement("div",{className:y.default.right},m.default.createElement("div",{className:y.default.title},this.getRightTitle()),n)))}}],[{key:"getDerivedStateFromProps",value:function(e,t){var n=e.match,a=e.location,i=a.pathname.replace("".concat(n.path,"/"),"");return i=t.menuMap[i]?i:"base",i!==t.selectKey?{selectKey:i}:null}}]),t}(m.Component))||d),E=w;t.default=E}}]);