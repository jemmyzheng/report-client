(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{AcjU:function(e,t,a){"use strict";var n=a("284h"),l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=l(a("pVnL")),r=l(a("lSNA")),o=l(a("RIqP")),d=l(a("lwsE")),i=l(a("W8MJ")),c=l(a("a1gu")),s=l(a("Nsbk")),f=l(a("7W2i"));a("B9cy");var p=l(a("Ol7k")),m=n(a("q1tI")),h=l(a("TSYQ")),g=l(a("mOP9")),v=l(a("mR0u")),y=l(a("xqX8")),M=a("pMM0"),E=m.default.lazy(function(){return Promise.resolve().then(a.t.bind(null,"oFg3",7))}),b=p.default.Sider,x=function(e){function t(e){var a;return(0,d.default)(this,t),a=(0,c.default)(this,(0,s.default)(t).call(this,e)),a.isMainMenu=function(e){var t=a.props.menuData;return t.some(function(t){return!!e&&(t.key===e||t.path===e)})},a.handleOpenChange=function(e){var t=e.filter(function(e){return a.isMainMenu(e)}).length>1;a.setState({openKeys:t?[e.pop()]:(0,o.default)(e)})},a.state={openKeys:(0,M.getDefaultCollapsedSubMenus)(e)},a}return(0,f.default)(t,e),(0,i.default)(t,[{key:"render",value:function(){var e,t=this.props,a=t.logo,n=t.collapsed,l=t.onCollapse,o=t.fixSiderbar,d=t.theme,i=this.state.openKeys,c=n?{}:{openKeys:i},s=(0,h.default)(v.default.sider,(e={},(0,r.default)(e,v.default.fixSiderbar,o),(0,r.default)(e,v.default.light,"light"===d),e));return m.default.createElement(b,{trigger:null,collapsible:!0,collapsed:n,breakpoint:"lg",onCollapse:l,width:256,theme:d,className:s},m.default.createElement("div",{className:v.default.logo,id:"logo"},m.default.createElement(g.default,{to:"/"},m.default.createElement("img",{src:a,alt:"logo"}),m.default.createElement("h1",null,"\u751f\u4ea7\u6570\u636e\u62a5\u9001\u7cfb\u7edf"))),m.default.createElement(m.Suspense,{fallback:m.default.createElement(y.default,null)},m.default.createElement(E,(0,u.default)({},this.props,{mode:"inline",handleOpenChange:this.handleOpenChange,onOpenChange:this.handleOpenChange,style:{padding:"16px 0",width:"100%"}},c))))}}],[{key:"getDerivedStateFromProps",value:function(e,t){var a=t.pathname;return e.location.pathname!==a?{pathname:e.location.pathname,openKeys:(0,M.getDefaultCollapsedSubMenus)(e)}:null}}]),t}(m.PureComponent);t.default=x},IGtV:function(e,t,a){e.exports={fixedHeader:"antd-pro-layouts-header-fixedHeader"}},IamK:function(e,t,a){"use strict";var n=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("bbsP");var l=n(a("/wGt")),u=n(a("pVnL")),r=n(a("q1tI")),o=n(a("AcjU")),d=a("pMM0"),i=r.default.memo(function(e){var t=e.isMobile,a=e.menuData,n=e.collapsed,i=e.onCollapse,c=(0,d.getFlatMenuKeys)(a);return t?r.default.createElement(l.default,{visible:!n,placement:"left",onClose:function(){return i(!0)},style:{padding:0,height:"100vh"}},r.default.createElement(o.default,(0,u.default)({},e,{flatMenuKeys:c,collapsed:!t&&n}))):r.default.createElement(o.default,(0,u.default)({},e,{flatMenuKeys:c}))}),c=i;t.default=c},JwhZ:function(e,t,a){e.exports={head:"antd-pro-components-top-nav-header-index-head",light:"antd-pro-components-top-nav-header-index-light",main:"antd-pro-components-top-nav-header-index-main",wide:"antd-pro-components-top-nav-header-index-wide",left:"antd-pro-components-top-nav-header-index-left",right:"antd-pro-components-top-nav-header-index-right",logo:"antd-pro-components-top-nav-header-index-logo",menu:"antd-pro-components-top-nav-header-index-menu"}},NtFa:function(e,t,a){"use strict";var n=a("TqRt"),l=a("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("Pwec");var u,r,o=n(a("CtXQ")),d=n(a("lwsE")),i=n(a("W8MJ")),c=n(a("a1gu")),s=n(a("Nsbk")),f=n(a("7W2i")),p=n(a("U+yc")),m=l(a("q1tI")),h=n(a("mOP9")),g=n(a("fqkP")),v=n(a("h3zL")),y=n(a("X5mu")),M=(u=(0,g.default)(600),r=function(e){function t(){var e,a;(0,d.default)(this,t);for(var n=arguments.length,l=new Array(n),u=0;u<n;u++)l[u]=arguments[u];return a=(0,c.default)(this,(e=(0,s.default)(t)).call.apply(e,[this].concat(l))),a.toggle=function(){var e=a.props,t=e.collapsed,n=e.onCollapse;n(!t),a.triggerResizeEvent()},a}return(0,f.default)(t,e),(0,i.default)(t,[{key:"componentWillUnmount",value:function(){this.triggerResizeEvent.cancel()}},{key:"triggerResizeEvent",value:function(){var e=document.createEvent("HTMLEvents");e.initEvent("resize",!0,!1),window.dispatchEvent(e)}},{key:"render",value:function(){var e=this.props,t=e.collapsed,a=e.isMobile,n=e.logo;return m.default.createElement("div",{className:v.default.header},a&&m.default.createElement(h.default,{to:"/",className:v.default.logo,key:"logo"},m.default.createElement("img",{src:n,alt:"logo",width:"32"})),m.default.createElement("span",{className:v.default.trigger,onClick:this.toggle},m.default.createElement(o.default,{type:t?"menu-unfold":"menu-fold"})),m.default.createElement(y.default,this.props))}}]),t}(m.PureComponent),(0,p.default)(r.prototype,"triggerResizeEvent",[u],Object.getOwnPropertyDescriptor(r.prototype,"triggerResizeEvent"),r.prototype),r);t.default=M},W660:function(e,t,a){e.exports={content:"antd-pro-layouts-basic-layout-content"}},X5mu:function(e,t,a){"use strict";var n=a("284h"),l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("T2oS");var u=l(a("W9HT"));a("qVdP");var r=l(a("jsC+"));a("Telt");var o=l(a("Tckk"));a("lUTK");var d=l(a("BvKs"));a("Pwec");var i=l(a("CtXQ")),c=l(a("lwsE")),s=l(a("W8MJ")),f=l(a("a1gu")),p=l(a("Nsbk")),m=l(a("7W2i")),h=n(a("q1tI")),g=a("LLXN"),v=l(a("TY4/")),y=l(a("h3zL")),M=function(e){function t(){return(0,c.default)(this,t),(0,f.default)(this,(0,p.default)(t).apply(this,arguments))}return(0,m.default)(t,e),(0,s.default)(t,[{key:"render",value:function(){var e=this.props,t=e.currentUser,a=e.onMenuClick,n=e.theme,l=h.default.createElement(d.default,{className:y.default.menu,selectedKeys:[],onClick:a},h.default.createElement(d.default.Item,{key:"userinfo"},h.default.createElement(i.default,{type:"setting"}),h.default.createElement(g.FormattedMessage,{id:"menu.account.settings",defaultMessage:"account settings"})),h.default.createElement(d.default.Divider,null),h.default.createElement(d.default.Item,{key:"logout"},h.default.createElement(i.default,{type:"logout"}),h.default.createElement(g.FormattedMessage,{id:"menu.account.logout",defaultMessage:"logout"}))),c=y.default.right;return"dark"===n&&(c="".concat(y.default.right,"  ").concat(y.default.dark)),h.default.createElement("div",{className:c},t.name?h.default.createElement(r.default,{overlay:l},h.default.createElement("span",{className:"".concat(y.default.action," ").concat(y.default.account)},h.default.createElement(o.default,{size:"small",className:y.default.avatar,src:v.default,alt:"avatar"}),h.default.createElement("span",{className:y.default.name},t.deptName),"-",h.default.createElement("span",{className:y.default.name},t.name))):h.default.createElement(u.default,{size:"small",style:{marginLeft:8,marginRight:8}}))}}]),t}(h.PureComponent);t.default=M},ctiy:function(e,t,a){"use strict";var n=a("284h"),l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=l(a("pVnL")),r=l(a("lwsE")),o=l(a("W8MJ")),d=l(a("a1gu")),i=l(a("Nsbk")),c=l(a("7W2i"));a("B9cy");var s=l(a("Ol7k")),f=n(a("q1tI")),p=l(a("MFj2")),m=a("MuoO"),h=l(a("usdK")),g=l(a("NtFa")),v=l(a("wWO0")),y=l(a("IGtV")),M=s.default.Header,E=function(e){function t(){var e,a;(0,r.default)(this,t);for(var n=arguments.length,l=new Array(n),u=0;u<n;u++)l[u]=arguments[u];return a=(0,d.default)(this,(e=(0,i.default)(t)).call.apply(e,[this].concat(l))),a.state={visible:!0},a.getHeadWidth=function(){var e=a.props,t=e.isMobile,n=e.collapsed,l=e.setting,u=l.fixedHeader,r=l.layout;return t||!u||"topmenu"===r?"100%":n?"calc(100% - 80px)":"calc(100% - 256px)"},a.handleMenuClick=function(e){var t=e.key,n=a.props.dispatch;"logout"===t&&n({type:"login/logout"}),"userinfo"===t&&h.default.push("/account/settings/base")},a.handScroll=function(){var e=a.props.autoHideHeader,t=a.state.visible;if(e){var n=document.body.scrollTop+document.documentElement.scrollTop;a.ticking||(a.ticking=!0,requestAnimationFrame(function(){a.oldScrollTop>n?a.setState({visible:!0}):n>300&&t?a.setState({visible:!1}):n<300&&!t&&a.setState({visible:!0}),a.oldScrollTop=n,a.ticking=!1}))}},a}return(0,c.default)(t,e),(0,o.default)(t,[{key:"componentDidMount",value:function(){document.addEventListener("scroll",this.handScroll,{passive:!0})}},{key:"componentWillUnmount",value:function(){document.removeEventListener("scroll",this.handScroll)}},{key:"render",value:function(){var e=this.props,t=e.isMobile,a=e.handleMenuCollapse,n=e.setting,l=n.navTheme,r=n.layout,o=n.fixedHeader,d=this.state.visible,i="topmenu"===r,c=this.getHeadWidth(),s=d?f.default.createElement(M,{style:{padding:0,width:c},className:o?y.default.fixedHeader:""},i&&!t?f.default.createElement(v.default,(0,u.default)({theme:l,mode:"horizontal",onCollapse:a,onMenuClick:this.handleMenuClick},this.props)):f.default.createElement(g.default,(0,u.default)({onCollapse:a,onMenuClick:this.handleMenuClick},this.props))):null;return f.default.createElement(p.default,{component:"",transitionName:"fade"},s)}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.autoHideHeader||t.visible?null:{visible:!0}}}]),t}(f.PureComponent),b=(0,m.connect)(function(e){var t=e.user,a=e.global,n=e.setting;return{currentUser:t.currentUser,collapsed:a.collapsed,setting:n}})(E);t.default=b},gJ0l:function(e,t,a){"use strict";var n=a("284h"),l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("Pwec");var u=l(a("CtXQ"));a("B9cy");var r=l(a("Ol7k")),o=n(a("q1tI")),d=l(a("ggcP")),i=r.default.Footer,c=function(){return o.default.createElement(i,{style:{padding:0}},o.default.createElement(d.default,{copyright:o.default.createElement(o.Fragment,null,"Copyright ",o.default.createElement(u.default,{type:"copyright"})," 2019 \u6e56\u5357\u7a7a\u6e2f\u5b9e\u4e1a\u80a1\u4efd\u6709\u9650\u516c\u53f8 .")}))},s=c;t.default=s},h3zL:function(e,t,a){e.exports={header:"antd-pro-components-global-header-index-header",logo:"antd-pro-components-global-header-index-logo",menu:"antd-pro-components-global-header-index-menu",trigger:"antd-pro-components-global-header-index-trigger",right:"antd-pro-components-global-header-index-right",action:"antd-pro-components-global-header-index-action",search:"antd-pro-components-global-header-index-search",account:"antd-pro-components-global-header-index-account",avatar:"antd-pro-components-global-header-index-avatar",dark:"antd-pro-components-global-header-index-dark",name:"antd-pro-components-global-header-index-name"}},m8Tn:function(e,t,a){"use strict";var n=a("284h"),l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=l(a("MVZn")),r=l(a("pVnL")),o=l(a("lwsE")),d=l(a("W8MJ")),i=l(a("a1gu")),c=l(a("Nsbk")),s=l(a("7W2i"));a("B9cy");var f=l(a("Ol7k")),p=n(a("q1tI")),m=l(a("ZFw/")),h=l(a("Y+p1")),g=l(a("Wwog")),v=a("MuoO"),y=a("E6Dt"),M=l(a("TSYQ")),E=l(a("bALw")),b=l(a("lU33")),x=l(a("HZnN")),k=l(a("zwU1")),P=l(a("gJ0l")),C=l(a("ctiy")),w=l(a("R1Dz")),N=l(a("wOmh")),S=l(a("xqX8")),W=l(a("IamK")),O=l(a("W660")),T=(p.default.lazy(function(){return Promise.all([a.e(0),a.e(24)]).then(a.t.bind(null,"PceP",7))}),f.default.Content),K={"screen-xs":{maxWidth:575},"screen-sm":{minWidth:576,maxWidth:767},"screen-md":{minWidth:768,maxWidth:991},"screen-lg":{minWidth:992,maxWidth:1199},"screen-xl":{minWidth:1200,maxWidth:1599},"screen-xxl":{minWidth:1600}},q=function(e){function t(e){var a;return(0,o.default)(this,t),a=(0,i.default)(this,(0,c.default)(t).call(this,e)),a.matchParamsPath=function(e,t){var a=Object.keys(t).find(function(t){return(0,E.default)(t).test(e)});return t[a]},a.getPageTitle=function(e,t){var n=a.matchParamsPath(e,t);if(!n)return"\u751f\u4ea7\u6570\u636e\u62a5\u9001\u7cfb\u7edf";var l=n.name;return"".concat(l," - \u751f\u4ea7\u6570\u636e\u62a5\u9001\u7cfb\u7edf")},a.getLayoutStyle=function(){var e=a.props,t=e.fixSiderbar,n=e.isMobile,l=e.collapsed,u=e.layout;return t&&"topmenu"!==u&&!n?{paddingLeft:l?"80px":"256px"}:null},a.handleMenuCollapse=function(e){var t=a.props.dispatch;t({type:"global/changeLayoutCollapsed",payload:e})},a.renderSettingDrawer=function(){return null},a.getPageTitle=(0,g.default)(a.getPageTitle),a.matchParamsPath=(0,g.default)(a.matchParamsPath,h.default),a}return(0,s.default)(t,e),(0,d.default)(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.dispatch,a=e.route,n=a.routes,l=a.authority;t({type:"user/fetchCurrent"}),t({type:"setting/getSetting"}),t({type:"menu/getMenuData",payload:{routes:n,authority:l}})}},{key:"componentDidUpdate",value:function(e){var t=this.props,a=t.collapsed,n=t.isMobile;!n||e.isMobile||a||this.handleMenuCollapse(!1)}},{key:"getContext",value:function(){var e=this.props,t=e.location,a=e.breadcrumbNameMap;return{location:t,breadcrumbNameMap:a}}},{key:"getBreadcrumbNameMap",value:function(){var e={},t=this.props.menuData,a=function t(a){a.forEach(function(a){a.children&&t(a.children),e[a.path]=a})};return a(t),e}},{key:"render",value:function(){var e=this,t=this.props,a=t.navTheme,n=t.layout,l=t.children,o=t.location.pathname,d=t.isMobile,i=t.menuData,c=t.breadcrumbNameMap,s=t.fixedHeader,h="topmenu"===n,g=this.matchParamsPath(o,c),v=s?{}:{paddingTop:0},E=p.default.createElement(f.default,null,h&&!d?null:p.default.createElement(W.default,(0,r.default)({logo:k.default,theme:a,onCollapse:this.handleMenuCollapse,menuData:i,isMobile:d},this.props)),p.default.createElement(f.default,{style:(0,u.default)({},this.getLayoutStyle(),{minHeight:"100vh"})},p.default.createElement(C.default,(0,r.default)({menuData:i,handleMenuCollapse:this.handleMenuCollapse,logo:k.default,isMobile:d},this.props)),p.default.createElement(T,{className:O.default.content,style:v},p.default.createElement(x.default,{authority:g&&g.authority,noMatch:p.default.createElement(N.default,null)},l)),p.default.createElement(P.default,null)));return p.default.createElement(p.default.Fragment,null,p.default.createElement(m.default,{title:this.getPageTitle(o,c)},p.default.createElement(y.ContainerQuery,{query:K},function(t){return p.default.createElement(w.default.Provider,{value:e.getContext()},p.default.createElement("div",{className:(0,M.default)(t)},E))})),p.default.createElement(p.Suspense,{fallback:p.default.createElement(S.default,null)},this.renderSettingDrawer()))}}]),t}(p.default.PureComponent),D=(0,v.connect)(function(e){var t=e.global,a=e.setting,n=e.menu;return(0,u.default)({collapsed:t.collapsed,layout:a.layout,menuData:n.menuData,breadcrumbNameMap:n.breadcrumbNameMap},a)})(function(e){return p.default.createElement(b.default,{query:"(max-width: 599px)"},function(t){return p.default.createElement(q,(0,r.default)({},e,{isMobile:t}))})});t.default=D},mR0u:function(e,t,a){e.exports={logo:"antd-pro-components-sider-menu-index-logo",sider:"antd-pro-components-sider-menu-index-sider",fixSiderbar:"antd-pro-components-sider-menu-index-fixSiderbar",light:"antd-pro-components-sider-menu-index-light",icon:"antd-pro-components-sider-menu-index-icon"}},oFg3:function(e,t,a){"use strict";var n=a("284h"),l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=l(a("pVnL")),r=l(a("lwsE")),o=l(a("W8MJ")),d=l(a("a1gu")),i=l(a("Nsbk")),c=l(a("7W2i"));a("Pwec");var s=l(a("CtXQ"));a("lUTK");var f=l(a("BvKs")),p=n(a("q1tI")),m=l(a("TSYQ")),h=l(a("mOP9")),g=l(a("Y+p1")),v=l(a("Wwog")),y=a("S/9j"),M=a("pMM0"),E=a("+n12"),b=l(a("mR0u")),x=f.default.SubMenu,k=function(e){return"string"===typeof e&&(0,E.isUrl)(e)?p.default.createElement("img",{src:e,alt:"icon",className:b.default.icon}):"string"===typeof e?p.default.createElement(s.default,{type:e}):e},P=function(e){function t(e){var a;return(0,r.default)(this,t),a=(0,d.default)(this,(0,i.default)(t).call(this,e)),a.getNavMenuItems=function(e,t){return e?e.filter(function(e){return e.name&&!e.hideInMenu}).map(function(e){return a.getSubMenuOrItem(e,t)}).filter(function(e){return e}):[]},a.getSelectedMenuKeys=function(e){var t=a.props.flatMenuKeys;return(0,y.urlToList)(e).map(function(e){return(0,M.getMenuMatches)(t,e).pop()})},a.getSubMenuOrItem=function(e){if(e.children&&!e.hideChildrenInMenu&&e.children.some(function(e){return e.name})){var t=e.name;return p.default.createElement(x,{title:e.icon?p.default.createElement("span",null,k(e.icon),p.default.createElement("span",null,t)):t,key:e.path},a.getNavMenuItems(e.children))}return p.default.createElement(f.default.Item,{key:e.path},a.getMenuItemPath(e))},a.getMenuItemPath=function(e){var t=e.name,n=a.conversionPath(e.path),l=k(e.icon),u=e.target;if(/^https?:\/\//.test(n))return p.default.createElement("a",{href:n,target:u},l,p.default.createElement("span",null,t));var r=a.props,o=r.location,d=r.isMobile,i=r.onCollapse;return p.default.createElement(h.default,{to:n,target:u,replace:n===o.pathname,onClick:d?function(){i(!0)}:void 0},l,p.default.createElement("span",null,t))},a.conversionPath=function(e){return e&&0===e.indexOf("http")?e:"/".concat(e||"").replace(/\/+/g,"/")},a.getSelectedMenuKeys=(0,v.default)(a.getSelectedMenuKeys,g.default),a}return(0,c.default)(t,e),(0,o.default)(t,[{key:"render",value:function(){var e=this.props,t=e.openKeys,a=e.theme,n=e.mode,l=e.location.pathname,r=e.className,o=this.getSelectedMenuKeys(l);!o.length&&t&&(o=[t[t.length-1]]);var d={};t&&(d={openKeys:t});var i=this.props,c=i.handleOpenChange,s=i.style,h=i.menuData,g=(0,m.default)(r,{"top-nav-menu":"horizontal"===n});return p.default.createElement(f.default,(0,u.default)({key:"Menu",mode:n,theme:a,onOpenChange:c,selectedKeys:o,style:s,className:g},d),this.getNavMenuItems(h))}}]),t}(p.PureComponent);t.default=P},pMM0:function(e,t,a){"use strict";var n=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.getDefaultCollapsedSubMenus=t.getMenuMatches=t.getFlatMenuKeys=void 0;var l=n(a("bALw")),u=a("S/9j"),r=function e(t){var a=[];return t.forEach(function(t){a.push(t.path),t.children&&(a=a.concat(e(t.children)))}),a};t.getFlatMenuKeys=r;var o=function(e,t){return e.filter(function(e){return!!e&&(0,l.default)(e).test(t)})};t.getMenuMatches=o;var d=function(e){var t=e.location.pathname,a=e.flatMenuKeys;return(0,u.urlToList)(t).map(function(e){return o(a,e)[0]}).filter(function(e){return e})};t.getDefaultCollapsedSubMenus=d},wWO0:function(e,t,a){"use strict";var n=a("284h"),l=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=l(a("pVnL")),r=l(a("lwsE")),o=l(a("W8MJ")),d=l(a("a1gu")),i=l(a("Nsbk")),c=l(a("7W2i")),s=n(a("q1tI")),f=l(a("mOP9")),p=l(a("X5mu")),m=l(a("oFg3")),h=a("pMM0"),g=l(a("JwhZ")),v=function(e){function t(){var e,a;(0,r.default)(this,t);for(var n=arguments.length,l=new Array(n),u=0;u<n;u++)l[u]=arguments[u];return a=(0,d.default)(this,(e=(0,i.default)(t)).call.apply(e,[this].concat(l))),a.state={maxWidth:void 0},a}return(0,c.default)(t,e),(0,o.default)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.theme,n=t.contentWidth,l=t.menuData,r=t.logo,o=this.state.maxWidth,d=(0,h.getFlatMenuKeys)(l);return s.default.createElement("div",{className:"".concat(g.default.head," ").concat("light"===a?g.default.light:"")},s.default.createElement("div",{ref:function(t){e.maim=t},className:"".concat(g.default.main," ").concat("Fixed"===n?g.default.wide:"")},s.default.createElement("div",{className:g.default.left},s.default.createElement("div",{className:g.default.logo,key:"logo",id:"logo"},s.default.createElement(f.default,{to:"/"},s.default.createElement("img",{src:r,alt:"logo"}),s.default.createElement("h1",null,"\u751f\u4ea7\u6570\u636e\u62a5\u9001\u7cfb\u7edf"))),s.default.createElement("div",{style:{maxWidth:o}},s.default.createElement(m.default,(0,u.default)({},this.props,{flatMenuKeys:d,className:g.default.menu})))),s.default.createElement(p.default,this.props)))}}],[{key:"getDerivedStateFromProps",value:function(e){return{maxWidth:("Fixed"===e.contentWidth?1200:window.innerWidth)-280-165-40}}}]),t}(s.PureComponent);t.default=v},zwU1:function(e,t,a){e.exports=a.p+"static/logo.d137748c.png"}}]);