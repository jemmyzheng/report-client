(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[14],{"/swK":function(e,t,a){"use strict";var l=a("TqRt"),n=a("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("IzEo");var d=l(a("bx4M"));a("2qtc");var r=l(a("kLXV"));a("5NDa");var o=l(a("5rEg"));a("g9YV");var i=l(a("wCAj"));a("+L6B");var u=l(a("2/Rp")),s=l(a("MVZn")),c=l(a("lwsE")),f=l(a("W8MJ")),p=l(a("a1gu")),m=l(a("Nsbk")),h=l(a("7W2i"));a("y8nQ");var v,w,g,y=l(a("Vl3Y")),E=n(a("q1tI")),M=a("MuoO"),b=l(a("zHco")),k=l(a("B9tY")),I=y.default.Item,C=(v=(0,M.connect)(function(e){var t=e.airport,a=e.loading;return{airports:t.list,loading:a.models.dept}}),w=y.default.create(),v(g=w(g=function(e){function t(){var e,a;(0,c.default)(this,t);for(var l=arguments.length,n=new Array(l),d=0;d<l;d++)n[d]=arguments[d];return a=(0,p.default)(this,(e=(0,m.default)(t)).call.apply(e,[this].concat(n))),a.state={target:null,showModal:!1},a.handleAddItem=function(){a.setState({target:null,showModal:!0})},a.handleEditItem=function(e){a.setState({target:e,showModal:!0})},a.OKHandler=function(){var e=a.props,t=e.form.validateFields,l=e.dispatch,n=a.state.target;t(function(e,t){e||(l(n?{type:"airport/edit",payload:(0,s.default)({},n,t)}:{type:"airport/add",payload:(0,s.default)({},t)}),setTimeout(function(){a.setState({showModal:!1})},100))})},a}return(0,h.default)(t,e),(0,f.default)(t,[{key:"componentDidMount",value:function(){var e=this.props.dispatch;e({type:"airport/queryAll"})}},{key:"render",value:function(){var e=this,t=this.props,a=t.airports,l=t.loading,n=t.form.getFieldDecorator,s=this.state,c=s.target,f=s.showModal,p=[{title:"\u673a\u573aID",dataIndex:"id"},{title:"\u540d\u79f0",dataIndex:"name"},{title:"\u64cd\u4f5c",render:function(t){return t&&E.default.createElement("a",{onClick:function(){e.handleEditItem(t)}},"\u7f16\u8f91")}}];return E.default.createElement(b.default,{title:"\u673a\u573a\u6570\u636e"},E.default.createElement(d.default,{bordered:!1},E.default.createElement(u.default,{type:"dashed",onClick:this.handleAddItem,style:{width:"100%",marginBottom:8},icon:"plus"},"\u6dfb\u52a0\u65b0\u673a\u573a"),E.default.createElement("div",{className:k.default.tableList},E.default.createElement(i.default,{rowKey:"id",loading:l,columns:p,dataSource:a})),E.default.createElement(r.default,{title:c?"\u7f16\u8f91\u673a\u573a\u4fe1\u606f":"\u6dfb\u52a0\u65b0\u673a\u573a",visible:f,destroyOnClose:!0,maskClosable:!1,onOk:this.OKHandler,onCancel:function(){e.setState({showModal:!1})}},E.default.createElement(y.default,null,E.default.createElement(I,{label:"\u540d\u79f0"},n("name",{initialValue:c?c.name:"",rules:[{required:!0,message:"\u5fc5\u586b\u9879"}]})(E.default.createElement(o.default,null)))))))}}]),t}(E.PureComponent))||g)||g),O=C;t.default=O}}]);