(this["webpackJsonpbros-front"]=this["webpackJsonpbros-front"]||[]).push([[0],{68:function(e,t,r){},70:function(e,t,r){},81:function(e,t,r){},82:function(e,t,r){},83:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),c=r(10),s=r.n(c),o=(r(68),r(12)),i=r.n(o),u=r(20),l=r(28),b=r(114),j=r(118),f=r(121),h=r(85),p=r(119),d=r(120),v=r(122),O=(r(70),r.p+"static/media/logo.70f9324f.svg"),x=r(29),g=r(23),k=r(24),m=function(){function e(){Object(g.a)(this,e)}return Object(k.a)(e,null,[{key:"saveState",value:function(e){this.localStorage.setItem("store",JSON.stringify(e))}},{key:"getState",value:function(){try{var e=this.localStorage.getItem("store");return e?JSON.parse(e):(console.error("No state found in local storage"),null)}catch(t){return console.error("Parsing of state failed"),null}}},{key:"resetState",value:function(){this.localStorage.removeItem("store")}}]),e}();m.localStorage=window.localStorage;var y=function(){function e(){Object(g.a)(this,e)}return Object(k.a)(e,null,[{key:"post",value:function(){var e=Object(u.a)(i.a.mark((function e(t,r){var n,a,c,s,o,u=arguments;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=!(u.length>2&&void 0!==u[2])||u[2],a={method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)},n&&(a.headers=Object(x.a)(Object(x.a)({},a.headers),{},{Authorization:null!==(c=null===(s=m.getState())||void 0===s?void 0:s.token)&&void 0!==c?c:""})),e.next=5,fetch(this.BASE_URL+t,a);case 5:return o=e.sent,e.abrupt("return",this.handleResponse(o));case 7:case"end":return e.stop()}}),e,this)})));return function(t,r){return e.apply(this,arguments)}}()},{key:"get",value:function(){var e=Object(u.a)(i.a.mark((function e(t){var r,n,a,c,s,o=arguments;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=!(o.length>1&&void 0!==o[1])||o[1],n={method:"GET",mode:"cors"},r&&(n.headers={Authorization:null!==(a=null===(c=m.getState())||void 0===c?void 0:c.token)&&void 0!==a?a:""}),e.next=5,fetch(this.BASE_URL+t,n);case 5:return s=e.sent,e.abrupt("return",this.handleResponse(s));case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"handleResponse",value:function(){var e=Object(u.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t.status>=400)){e.next=6;break}return e.next=3,t.json();case 3:throw e.sent;case 6:return e.next=8,t.json();case 8:return e.abrupt("return",e.sent);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}]),e}();y.BASE_URL="https://bros-back-end.herokuapp.com";var w=r(11),S=r(5);function C(e){var t=Object(n.useState)({error:!1,errorText:null,value:null}),r=Object(l.a)(t,2),a=r[0],c=r[1],s=Object(n.useState)({error:!1,errorText:null,value:null}),o=Object(l.a)(s,2),x=o[0],g=o[1],k=Object(w.f)(),C=Object(n.useCallback)((function(e,t){e.target.value?t({error:!1,errorText:null,value:e.target.value}):t({error:!0,errorText:"Required",value:null})}),[]),T=Object(n.useCallback)(Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.post("/auth/signin",{email:a.value,password:x.value},!1);case 3:t=e.sent,m.saveState({token:t.token}),k.push(A),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.error(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])}))),[a.value,x.value,k]),B=Object(n.useCallback)((function(e){e.preventDefault(),k.push(I)}),[k]);return Object(S.jsx)("div",{className:"login-component",children:Object(S.jsxs)(b.a,{children:[Object(S.jsxs)(j.a,{children:[Object(S.jsx)("div",{className:"logo-wrapper",children:Object(S.jsx)("img",{src:O,alt:"bros and beers logo"})}),Object(S.jsxs)("form",{autoComplete:"off",children:[Object(S.jsx)(f.a,{onChange:function(e){return C(e,c)},error:a.error,helperText:a.errorText,label:"Email",variant:"outlined"}),Object(S.jsx)(f.a,{onChange:function(e){return C(e,g)},type:"password",error:x.error,helperText:x.errorText,label:"Password",variant:"outlined"}),Object(S.jsxs)(h.a,{children:["Don't have an account ?",Object(S.jsx)("span",{className:"register-link",children:Object(S.jsx)(p.a,{href:"#",onClick:B,children:"Register now !"})})]})]})]}),Object(S.jsx)(d.a,{children:Object(S.jsx)(v.a,{onClick:T,disabled:a.error||x.error,variant:"contained",color:"primary",children:"Login"})})]})})}var T=r(47),B=function(){function e(){Object(g.a)(this,e)}return Object(k.a)(e,null,[{key:"getProfile",value:function(){var e=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.get("/profile");case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}]),e}();r(81);function E(e){var t=Object(n.useState)(),r=Object(l.a)(t,2),a=r[0],c=r[1];Object(n.useEffect)((function(){a||function(){var e=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,B.getProfile();case 2:t=e.sent,c(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}));var s=Object(n.useCallback)(Object(u.a)(i.a.mark((function e(){var t,r,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Notification.requestPermission();case 2:if("granted"!==e.sent){e.next=21;break}return e.next=6,navigator.serviceWorker.ready;case 6:return t=e.sent,e.next=9,t.pushManager.getSubscription();case 9:if(e.sent){e.next=21;break}return"BPUUeqOwwaXk7DEMrQyE4de6BORpvyYus0RS0hs5iwJHEcRcelf0CxM6xKMt3IBSakymvGJ3sSEEZXLvpZnmye4",e.next=14,t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:"BPUUeqOwwaXk7DEMrQyE4de6BORpvyYus0RS0hs5iwJHEcRcelf0CxM6xKMt3IBSakymvGJ3sSEEZXLvpZnmye4"});case 14:return r=e.sent,e.next=17,y.post("/subscriptions",r);case 17:n=e.sent,console.log(n),e.next=21;break;case 21:case"end":return e.stop()}}),e)}))),[]);return Object(S.jsx)("div",{className:"profile-component",children:Object(S.jsx)(b.a,{children:Object(S.jsxs)(j.a,{children:[Object(S.jsx)("p",{children:"This is a profile"}),Object(S.jsx)(v.a,{onClick:s,variant:"contained",color:"primary",children:"Permissions"})]})})})}var R=r(124),N=(r(82),function(){function e(){Object(g.a)(this,e)}return Object(k.a)(e,null,[{key:"arrayBufferToBase64",value:function(e){for(var t="",r=new Uint8Array(e),n=r.byteLength,a=0;a<n;a++)t+=String.fromCharCode(r[a]);return window.btoa(t)}},{key:"stringToUInt8ArrayBuffer",value:function(e){return Uint8Array.from(e,(function(e){return e.charCodeAt(0)}))}}]),e}());function U(e){var t=Object(n.useState)({error:!1,errorText:null,value:null}),r=Object(l.a)(t,2),a=r[0],c=r[1],s=Object(n.useState)(!1),o=Object(l.a)(s,2),g=o[0],k=o[1],m=Object(w.f)(),C=Object(n.useCallback)((function(e,t){"clickaway"!==t&&k(!1)}),[]),T=Object(n.useCallback)((function(e,t){e.target.value?t({error:!1,errorText:null,value:e.target.value}):t({error:!0,errorText:"Required",value:null})}),[]),B=Object(n.useCallback)((function(e){e.preventDefault(),m.push("")}),[m]),E=Object(n.useCallback)(Object(u.a)(i.a.mark((function e(){var t,r,n,c,s,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.post("/auth/register",{email:a.value});case 3:return t=e.sent,r=t.credentialCreationOptions,n=Object(x.a)(Object(x.a)({},r),{},{challenge:N.stringToUInt8ArrayBuffer(r.challenge),user:Object(x.a)(Object(x.a)({},r.user),{},{id:N.stringToUInt8ArrayBuffer(r.user.id)})}),e.next=8,navigator.credentials.create({publicKey:n});case 8:return c=e.sent,s={publicKeyCredential:{id:c.id,rawId:N.arrayBufferToBase64(c.rawId),response:{attestationObject:N.arrayBufferToBase64(c.response.attestationObject),clientDataJSON:N.arrayBufferToBase64(c.response.clientDataJSON)}}},e.next=12,y.post("/auth/signup",s);case 12:o=e.sent,console.log(o),k(!0),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(0),console.error(e.t0);case 20:case"end":return e.stop()}}),e,null,[[0,17]])}))),[a.value]);return Object(S.jsxs)("div",{className:"register-component",children:[Object(S.jsxs)(b.a,{children:[Object(S.jsxs)(j.a,{children:[Object(S.jsx)("div",{className:"logo-wrapper",children:Object(S.jsx)("img",{src:O,alt:"bros and beers logo"})}),Object(S.jsxs)("form",{autoComplete:"off",children:[Object(S.jsx)(f.a,{onChange:function(e){return T(e,c)},error:a.error,helperText:a.errorText,label:"Email",variant:"outlined"}),Object(S.jsxs)(h.a,{children:["Already have an account ?",Object(S.jsx)("span",{className:"register-link",children:Object(S.jsx)(p.a,{href:"#",onClick:B,children:"Login now !"})})]})]})]}),Object(S.jsx)(d.a,{children:Object(S.jsx)(v.a,{onClick:E,disabled:a.error,variant:"contained",color:"primary",children:"Register"})})]}),Object(S.jsx)(R.a,{anchorOrigin:{vertical:"bottom",horizontal:"center"},open:g,autoHideDuration:6e3,onClose:C,message:"Biometric data sent to Kim Jong-Un"})]})}var A="/profile",I="/register";var J=function(){return Object(S.jsx)(T.a,{children:Object(S.jsxs)(w.c,{children:[Object(S.jsx)(w.a,{path:A,children:Object(S.jsx)(E,{})}),Object(S.jsx)(w.a,{path:I,children:Object(S.jsx)(U,{})}),Object(S.jsx)(w.a,{path:"/",children:Object(S.jsx)(C,{})})]})})},P=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,125)).then((function(t){var r=t.getCLS,n=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;r(e),n(e),a(e),c(e),s(e)}))};s.a.render(Object(S.jsx)(a.a.StrictMode,{children:Object(S.jsx)(J,{})}),document.getElementById("root")),navigator.serviceWorker&&navigator.serviceWorker.register("".concat("","/service-worker.js")),P()}},[[83,1,2]]]);
//# sourceMappingURL=main.c9bcb3ec.chunk.js.map