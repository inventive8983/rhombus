(this.webpackJsonpemilus=this.webpackJsonpemilus||[]).push([[20],{332:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return r}));var a="https://rhombusedu.herokuapp.com/api",r="https://rhombusedu.herokuapp.com/"},526:function(e,t,n){"use strict";var a=n(337),r=n.n(a),i=n(332),c={getGallery:function(e){return new Promise((function(t,n){r.a.get("".concat(i.a,"/general/media/").concat(e.folder)).then((function(e){t(e.data)})).catch((function(e){console.log(e),n(e)}))}))},delete:function(e){return new Promise((function(t,n){r.a.delete("".concat(i.a,"/general/media/").concat(e.folder,"/").concat(e.filename)).then((function(e){t(e.data)})).catch((function(e){console.log(e),n(e)}))}))}};t.a=c},672:function(e,t,n){"use strict";n.r(t);var a=n(12),r=n.n(a),i=n(81),c=n(73),l=n(74),o=n(90),u=n(89),s=n(193),f=n(552),d=n(686),m=n(662),p=n(684),h=n(130),v=n(0),g=n.n(v),w=n(554),b=n(332),y=n(526);function E(e){return new Promise((function(t,n){var a=new FileReader;a.readAsDataURL(e),a.onload=function(){return t(a.result)},a.onerror=function(e){return n(e)}}))}var C=function(e){Object(o.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,l=new Array(a),o=0;o<a;o++)l[o]=arguments[o];return(e=t.call.apply(t,[this].concat(l))).state={previewVisible:!1,previewImage:"",fileList:[]},e.componentDidMount=function(){y.a.getGallery({folder:"gallery"}).then((function(t){t=t.map((function(e,t){return{uid:t,name:e,status:"done",url:"".concat(b.b,"media/gallery/").concat(e)}})),console.log(t),e.setState({fileList:t})}))},e.handleCancel=function(){return e.setState({previewVisible:!1})},e.handleDelete=function(e){y.a.delete({folder:"gallery",filename:e.name}).then((function(e){s.b.success("Successfully deleted")})).catch((function(e){s.b.error("Some error occured")}))},e.handlePreview=function(){var t=Object(i.a)(r.a.mark((function t(n){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.url||n.preview){t.next=4;break}return t.next=3,E(n.originFileObj);case 3:n.preview=t.sent;case 4:e.setState({previewImage:n.url||n.preview,previewVisible:!0});case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.handleChange=function(t){var n=t.fileList;return e.setState({fileList:n})},e}return Object(l.a)(n,[{key:"render",value:function(){var e=this.state,t=e.previewVisible,n=e.previewImage,a=e.fileList,r=g.a.createElement("div",null,g.a.createElement(w.a,null),g.a.createElement("div",{className:"ant-upload-text"},"Upload"));return g.a.createElement(g.a.Fragment,null,g.a.createElement(h.a,{className:"p-3",alignItems:"center",justifyContent:"between"},g.a.createElement(f.a.Title,{strong:!0},"Gallery")),g.a.createElement(d.a,null,g.a.createElement("div",{className:"clearfix"},g.a.createElement(m.a,{action:"".concat(b.a,"/upload/image/gallery"),listType:"picture-card",fileList:a,onPreview:this.handlePreview,onChange:this.handleChange,onRemove:this.handleDelete},r),g.a.createElement(p.a,{visible:t,footer:null,onCancel:this.handleCancel},g.a.createElement("img",{alt:"example",style:{width:"100%"},src:n})))))}}]),n}(g.a.Component);t.default=C}}]);
//# sourceMappingURL=20.8f7fab9d.chunk.js.map