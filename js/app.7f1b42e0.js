(function(){"use strict";var t={8306:function(t,e,a){var r=a(144),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},o=[],s=a(1001),i={},l=(0,s.Z)(i,n,o,!1,null,null,null),c=l.exports,u=a(9132);r.Z.use(u.Z);var v=new u.Z({}),d=a(8345),p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("HomePage")],1)},m=[],f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{attrs:{id:"inspire"}},[a("v-navigation-drawer",{attrs:{app:"",temporary:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[a("v-list",{attrs:{nav:""}},[a("v-list-item-group",{model:{value:t.group,callback:function(e){t.group=e},expression:"group"}},t._l(t.menuItems,(function(e,r){return a("v-list-item",{key:r,attrs:{link:"",to:e.route}},[a("v-list-item-title",[t._v(t._s(e.title))])],1)})),1)],1)],1),a("v-app-bar",{attrs:{app:""}},[a("v-app-bar-nav-icon",{on:{click:function(e){t.drawer=!t.drawer}}}),a("v-toolbar-title",[t._v("Asset Manager System")]),a("v-spacer"),a("v-btn",{attrs:{icon:""}},[a("v-icon",[t._v("mdi-qrcode-scan")])],1)],1),a("v-main",[a("router-view")],1)],1)},b=[],h={data:()=>({menuItems:[{title:"財產清單",route:"/assets"},{title:"待購清單",route:"/toBuy"}],drawer:null,group:null}),watch:{group(){this.drawer=!1}}},x=h,Z=a(3453),V=a.n(Z),_=a(7524),g=a(8320),k=a(5206),y=a(680),w=a(6428),C=a(6816),T=a(7620),S=a(3249),I=a(6944),O=a(7877),B=a(3347),D=a(9762),P=a(7921),j=(0,s.Z)(x,f,b,!1,null,null,null),E=j.exports;V()(j,{VApp:_.Z,VAppBar:g.Z,VAppBarNavIcon:k.Z,VBtn:y.Z,VIcon:w.Z,VList:C.Z,VListItem:T.Z,VListItemGroup:S.Z,VListItemTitle:I.V9,VMain:O.Z,VNavigationDrawer:B.Z,VSpacer:D.Z,VToolbarTitle:P.qW});var $={name:"HomeView",components:{HomePage:E}},A=$,N=(0,s.Z)(A,p,m,!1,null,null,null),L=N.exports,M=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-data-table",{attrs:{headers:t.headers,items:t.assets,search:t.search,"mobile-breakpoint":"0"},scopedSlots:t._u([{key:"top",fn:function(){return[a("v-toolbar",{attrs:{flat:""}},[a("v-toolbar-title",[t._v("財產清單")]),a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),a("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),a("v-spacer"),a("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,n=e.attrs;return[a("v-btn",t._g(t._b({staticClass:"mb-2",attrs:{color:"primary",dark:""}},"v-btn",n,!1),r),[t._v(" + ")])]}}])},[a("v-card",[a("v-card-title",[a("span",{staticClass:"text-h5"},[t._v("test")])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"Dessert name"},model:{value:t.assets.id,callback:function(e){t.$set(t.assets,"id",e)},expression:"assets.id"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""}},[t._v(" Cancel ")]),a("v-btn",{attrs:{color:"blue darken-1",text:""}},[t._v(" Save ")])],1)],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function(e){var r=e.item;return[a("v-icon",{on:{click:function(e){return t.editItem(r)}}},[t._v(" mdi-pencil ")]),a("v-icon",{on:{click:function(e){return t.editItem(r)}}},[t._v(" mdi-delete ")])]}},{key:"item.status",fn:function(e){var r=e.item;return[""===r.status?a("v-btn",[t._v(" 借用 ")]):a("div",[t._v(" "+t._s(r.status)+" ")])]}}],null,!0),model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}})},q=[],F={data:()=>({search:"",selected:[],headers:[{text:"ID",align:"start",value:"id"},{text:"Name",value:"name"},{text:"Location",value:"location"},{text:"Status",value:"status"},{text:"Actions",value:"actions",sortable:!1}],assets:[{id:"001",name:"keyboard",location:"1623",status:"Peter"},{id:"002",name:"mouse",location:"1421",status:""}]}),methods:{editItem(t){return console.log(t),null}}},H=F,W=a(3237),R=a(7118),G=a(2102),z=a(9846),J=a(8410),K=a(4497),Q=a(1418),U=a(2877),X=a(5978),Y=a(6656),tt=(0,s.Z)(H,M,q,!1,null,null,null),et=tt.exports;V()(tt,{VBtn:y.Z,VCard:W.Z,VCardActions:R.h7,VCardText:R.ZB,VCardTitle:R.EB,VCol:G.Z,VContainer:z.Z,VDataTable:J.Z,VDialog:K.Z,VDivider:Q.Z,VIcon:w.Z,VRow:U.Z,VSpacer:D.Z,VTextField:X.Z,VToolbar:Y.Z,VToolbarTitle:P.qW});var at=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-data-table",{attrs:{headers:t.headers,items:t.assets,search:t.search,"mobile-breakpoint":"0"},scopedSlots:t._u([{key:"top",fn:function(){return[a("v-toolbar",{attrs:{flat:""}},[a("v-toolbar-title",[t._v("待購清單")]),a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),a("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),a("v-spacer"),a("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,n=e.attrs;return[a("v-btn",t._g(t._b({staticClass:"mb-2",attrs:{color:"primary",dark:""}},"v-btn",n,!1),r),[t._v(" + ")])]}}])},[a("v-card",[a("v-card-title",[a("span",{staticClass:"text-h5"},[t._v("test")])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"Dessert name"},model:{value:t.assets.id,callback:function(e){t.$set(t.assets,"id",e)},expression:"assets.id"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""}},[t._v(" Cancel ")]),a("v-btn",{attrs:{color:"blue darken-1",text:""}},[t._v(" Save ")])],1)],1)],1)],1)]},proxy:!0}]),model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}})},rt=[],nt={data:()=>({search:"",selected:[],headers:[{text:"學號",value:"studentId"},{text:"姓名",value:"applicant"},{text:"產品名稱",value:"productName"},{text:"產品網址連結",value:"link"},{text:"單價",value:"price"},{text:"數量",value:"amount"},{text:"總價",value:"totalPrice"},{text:"備註",value:"comment"}],assets:[{studentId:"",applicant:"",productName:"",link:"",price:"",amount:"",totalPrice:"",comment:""},{studentId:"001",applicant:"peter",productName:"computer",link:"https://123",price:"10000",amount:"2",totalPrice:"0000",comment:"none"}]}),methods:{editItem(t){return console.log(t),null}}},ot=nt,st=(0,s.Z)(ot,at,rt,!1,null,null,null),it=st.exports;V()(st,{VBtn:y.Z,VCard:W.Z,VCardActions:R.h7,VCardText:R.ZB,VCardTitle:R.EB,VCol:G.Z,VContainer:z.Z,VDataTable:J.Z,VDialog:K.Z,VDivider:Q.Z,VRow:U.Z,VSpacer:D.Z,VTextField:X.Z,VToolbar:Y.Z,VToolbarTitle:P.qW}),r.Z.use(d.Z);const lt=[{path:"",name:"home",component:L,redirect:"/assets",children:[{path:"/assets",name:"assets",component:et},{path:"/toBuy",name:"toBuy",component:it}]}],ct=new d.Z({routes:lt});var ut=ct;r.Z.config.productionTip=!1,new r.Z({vuetify:v,router:ut,render:t=>t(c)}).$mount("#app")}},e={};function a(r){var n=e[r];if(void 0!==n)return n.exports;var o=e[r]={exports:{}};return t[r](o,o.exports,a),o.exports}a.m=t,function(){var t=[];a.O=function(e,r,n,o){if(!r){var s=1/0;for(u=0;u<t.length;u++){r=t[u][0],n=t[u][1],o=t[u][2];for(var i=!0,l=0;l<r.length;l++)(!1&o||s>=o)&&Object.keys(a.O).every((function(t){return a.O[t](r[l])}))?r.splice(l--,1):(i=!1,o<s&&(s=o));if(i){t.splice(u--,1);var c=n();void 0!==c&&(e=c)}}return e}o=o||0;for(var u=t.length;u>0&&t[u-1][2]>o;u--)t[u]=t[u-1];t[u]=[r,n,o]}}(),function(){a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,{a:e}),e}}(),function(){a.d=function(t,e){for(var r in e)a.o(e,r)&&!a.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={143:0};a.O.j=function(e){return 0===t[e]};var e=function(e,r){var n,o,s=r[0],i=r[1],l=r[2],c=0;if(s.some((function(e){return 0!==t[e]}))){for(n in i)a.o(i,n)&&(a.m[n]=i[n]);if(l)var u=l(a)}for(e&&e(r);c<s.length;c++)o=s[c],a.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return a.O(u)},r=self["webpackChunkams_client"]=self["webpackChunkams_client"]||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var r=a.O(void 0,[998],(function(){return a(8306)}));r=a.O(r)})();
//# sourceMappingURL=app.7f1b42e0.js.map