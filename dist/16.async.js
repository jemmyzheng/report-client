(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[16],{i7Sf:function(e,t,a){"use strict";var l=a("TqRt"),d=a("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("IzEo");var n=l(a("bx4M"));a("2qtc");var r=l(a("kLXV"));a("+L6B");var i=l(a("2/Rp"));a("/zsF");var o=l(a("PArb"));a("+BJd");var f=l(a("mr32"));a("P2fV");var u=l(a("NJEC"));a("Pwec");var c=l(a("CtXQ")),s=l(a("MVZn")),p=l(a("lwsE")),m=l(a("W8MJ")),y=l(a("a1gu")),h=l(a("Nsbk")),v=l(a("7W2i"));a("OaEy");var E=l(a("2fM7"));a("y8nQ");var g,F,k,w=l(a("Vl3Y")),I=d(a("q1tI")),M=a("MuoO"),D=l(a("wd/R")),b=l(a("+kNj")),C=l(a("zHco")),O=b.default.Description,Y=w.default.Item,T=E.default.Option,S={Daily:"\u65e5\u62a5\u8868",Weekly:"\u5468\u62a5\u8868",Monthly:"\u6708\u62a5\u8868"},q={"01":"\u4e00","02":"\u4e8c","03":"\u4e09","04":"\u56db","05":"\u4e94","06":"\u516d","07":"\u65e5"},A=(g=(0,M.connect)(function(e){var t=e.report,a=e.dept,l=e.field,d=e.loading;return{detail:t.target,depts:a.list,fields:l.list,loading:d.effects["report/detail"],deleting:d.effects["report/rmField"]}}),F=w.default.create(),g(k=F(k=function(e){function t(){var e,a;(0,p.default)(this,t);for(var l=arguments.length,d=new Array(l),n=0;n<l;n++)d[n]=arguments[n];return a=(0,y.default)(this,(e=(0,h.default)(t)).call.apply(e,[this].concat(d))),a.state={addField:!1},a.handleDeleteField=function(e,t){var l=a.props.dispatch;l({type:"report/rmField",payload:{reportId:e,fieldId:t}})},a.handleSetFields=function(){var e=a.props,t=e.form.validateFields,l=e.detail,d=e.dispatch;t(function(e,t){e||(d({type:"report/setFields",payload:(0,s.default)({reportId:l.id},t)}),setTimeout(function(){a.setState({addField:!1})},100))})},a.handleAddItem=function(){a.setState({addField:!0})},a.renderFieldOptions=function(){var e=a.props,t=e.detail,l=e.fields;return l.filter(function(e){return!t.fields.find(function(t){return t.id===e.id})}).map(function(e){return I.default.createElement(T,{key:e.id,value:e.id},e.name)})},a.renderFieldTag=function(){var e=a.props,t=e.detail,l=e.deleting;return t.fields.map(function(e){return I.default.createElement(f.default,{key:e.id},e.name,"\xa0",l?I.default.createElement(c.default,{type:"loading"}):I.default.createElement(u.default,{title:"\u5220\u9664\u5b57\u6bb5\u4f1a\u5bfc\u81f4\u5df2\u5b58\u5728\u8be5\u5b57\u6bb5\u6570\u636e\u4e5f\u5168\u90e8\u5220\u9664\uff0c\u786e\u5b9a\uff1f",onConfirm:function(){return a.handleDeleteField(t.id,e.id)}},I.default.createElement(c.default,{type:"close"})))})},a}return(0,v.default)(t,e),(0,m.default)(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.dispatch,a=e.match,l=e.depts,d=e.fields,n=a.params.reportId;t({type:"report/detail",payload:parseInt(n,10)}),l.length||t({type:"dept/queryAll"}),d.length||t({type:"field/queryAll"})}},{key:"render",value:function(){var e=this,t=this.props,a=t.detail,l=t.loading,d=t.depts,f=t.form.getFieldDecorator,u=this.state.addField,c=d.find(function(e){return e.id===a.deptId}),s="";if(a.deadline){var p=a.deadline.split("-"),m=a.type;"Daily"===m&&(s="\u6bcf\u5929".concat(p[3],"\u70b9").concat(p[4],"\u5206\u524d")),"Weekly"===m&&(s="\u6bcf\u5468".concat(q[p[1]]).concat(p[3],"\u70b9").concat(p[4],"\u5206\u524d")),"Monthly"===m&&(s="\u6bcf\u6708".concat(p[2],"\u65e5").concat(p[3],"\u70b9").concat(p[4],"\u5206\u524d"))}return I.default.createElement(C.default,{title:"\u62a5\u8868\u8be6\u60c5"},I.default.createElement(n.default,{loading:l,bordered:!1},I.default.createElement(b.default,{size:"large",title:"\u57fa\u672c\u4fe1\u606f",style:{marginBottom:32}},I.default.createElement(O,{term:"\u540d\u79f0"},a.name),I.default.createElement(O,{term:"ID"},a.id),I.default.createElement(O,{term:"\u6240\u5c5e\u90e8\u95e8"},c&&c.name),I.default.createElement(O,{term:"\u7c7b\u578b"},S[a.type]),I.default.createElement(O,{term:"\u586b\u62a5\u671f\u9650"},s),I.default.createElement(O,{term:"\u6dfb\u52a0\u65f6\u95f4"},a.addTime&&(0,D.default)(a.addTime).format("YYYY-MM-DD")),I.default.createElement(O,{term:"\u6700\u8fd1\u4fee\u6539\u65f6\u95f4"},a.modifyTime&&(0,D.default)(a.modifyTime).format("YYYY-MM-DD"))),I.default.createElement(o.default,{style:{marginBottom:32}}),I.default.createElement("div",null,I.default.createElement("h4",null,"\u62a5\u8868\u5b57\u6bb5"),a.fields&&this.renderFieldTag(),I.default.createElement(i.default,{size:"small",onClick:this.handleAddItem,icon:"plus"})),a.fields&&I.default.createElement(r.default,{title:"\u6dfb\u52a0\u5b57\u6bb5",visible:u,destroyOnClose:!0,maskClosable:!1,onOk:this.handleSetFields,onCancel:function(){e.setState({addField:!1})}},I.default.createElement(w.default,null,I.default.createElement(Y,{label:"\u5b57\u6bb5"},f("fieldIds",{rules:[{required:!0,message:"\u81f3\u5c11\u8981\u9009\u4e00\u4e2a\u5b57\u6bb5!",type:"array"}]})(I.default.createElement(E.default,{showSearch:!0,mode:"multiple",filterOption:function(e,t){return t.props.children.toLowerCase().indexOf(e.toLowerCase())>=0}},this.renderFieldOptions())))))))}}]),t}(I.Component))||k)||k),z=A;t.default=z}}]);