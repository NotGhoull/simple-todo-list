import{Y as q,ae as E,a2 as m,af as B,C as R,ag as C,ah as z,N as $,ai as S,y as x,aj as G,ak as J,al as L,Q as b,B as O,D as Q,x as h,am as U,an as F,ao as K,ap as X,aq as Z,ar as ee,z as te,q as re,p as ne,w as N,a as ae,h as oe,ac as se,n as V,J as ie,i as ue}from"./runtime.Dfy4l44N.js";import{b as ce}from"./disclose-version.DFkdkE43.js";import{s as fe}from"./utils.CH606ZQr.js";function Ee(e,t){if(t){const n=document.body;e.autofocus=!0,q(()=>{document.activeElement===n&&e.focus()})}}let M=!1;function le(){M||(M=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var t;if(!e.defaultPrevented)for(const n of e.target.elements)(t=n.__on_r)==null||t.call(n)})},{capture:!0}))}function P(e){var t=B,n=R;E(null),m(null);try{return e()}finally{E(t),m(n)}}function me(e,t,n,a=n){e.addEventListener(t,()=>P(n));const o=e.__on_r;o?e.__on_r=()=>{o(),a()}:e.__on_r=a,le()}const W=new Set,k=new Set;function de(e,t,n,a){function o(r){if(a.capture||y.call(t,r),!r.cancelBubble)return P(()=>n.call(this,r))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?q(()=>{t.addEventListener(e,o,a)}):t.addEventListener(e,o,a),o}function Te(e,t,n,a,o){var r={capture:a,passive:o},u=de(e,t,n,r);(t===document.body||t===window||t===document)&&C(()=>{t.removeEventListener(e,u,r)})}function Le(e){for(var t=0;t<e.length;t++)W.add(e[t]);for(var n of k)n(e)}function y(e){var I;var t=this,n=t.ownerDocument,a=e.type,o=((I=e.composedPath)==null?void 0:I.call(e))||[],r=o[0]||e.target,u=0,p=e.__root;if(p){var l=o.indexOf(p);if(l!==-1&&(t===document||t===window)){e.__root=t;return}var d=o.indexOf(t);if(d===-1)return;l<=d&&(u=l)}if(r=o[u]||e.target,r!==t){z(e,"currentTarget",{configurable:!0,get(){return r||n}});var T=B,c=R;E(null),m(null);try{for(var s,i=[];r!==null;){var f=r.assignedSlot||r.parentNode||r.host||null;try{var _=r["__"+a];if(_!==void 0&&!r.disabled)if($(_)){var[j,...H]=_;j.apply(r,[e,...H])}else _.call(r,e)}catch(g){s?i.push(g):s=g}if(e.cancelBubble||f===t||f===null)break;r=f}if(s){for(let g of i)queueMicrotask(()=>{throw g});throw s}}finally{e.__root=t,delete e.currentTarget,E(T),m(c)}}}function Se(e){return e.endsWith("capture")&&e!=="gotpointercapture"&&e!=="lostpointercapture"}const _e=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function Ne(e){return _e.includes(e)}const pe={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"};function ke(e){return e=e.toLowerCase(),pe[e]??e}const ve=["touchstart","touchmove"];function he(e){return ve.includes(e)}let A=!0;function Ae(e){A=e}function De(e,t){var n=t==null?"":typeof t=="object"?t+"":t;n!==(e.__t??(e.__t=e.nodeValue))&&(e.__t=n,e.nodeValue=n==null?"":n+"")}function ye(e,t){return Y(e,t)}function Re(e,t){S(),t.intro=t.intro??!1;const n=t.target,a=N,o=h;try{for(var r=x(n);r&&(r.nodeType!==8||r.data!==G);)r=J(r);if(!r)throw L;b(!0),O(r),Q();const u=Y(e,{...t,anchor:r});if(h===null||h.nodeType!==8||h.data!==U)throw F(),L;return b(!1),u}catch(u){if(u===L)return t.recover===!1&&K(),S(),X(n),b(!1),ye(e,t);throw u}finally{b(a),O(o)}}const v=new Map;function Y(e,{target:t,anchor:n,props:a={},events:o,context:r,intro:u=!0}){S();var p=new Set,l=c=>{for(var s=0;s<c.length;s++){var i=c[s];if(!p.has(i)){p.add(i);var f=he(i);t.addEventListener(i,y,{passive:f});var _=v.get(i);_===void 0?(document.addEventListener(i,y,{passive:f}),v.set(i,1)):v.set(i,_+1)}}};l(Z(W)),k.add(l);var d=void 0,T=ee(()=>{var c=n??t.appendChild(te());return re(()=>{if(r){ne({});var s=oe;s.c=r}o&&(a.$$events=o),N&&ce(c,null),A=u,d=e(c,a)||{},A=!0,N&&(R.nodes_end=h),r&&ae()}),()=>{var f;for(var s of p){t.removeEventListener(s,y);var i=v.get(s);--i===0?(document.removeEventListener(s,y),v.delete(s)):v.set(s,i)}k.delete(l),D.delete(d),c!==n&&((f=c.parentNode)==null||f.removeChild(c))}});return D.set(d,T),d}let D=new WeakMap;function Ie(e){const t=D.get(e);t&&t()}let w=!1;function Oe(e,t,n){const a=n[t]??(n[t]={store:null,source:se(void 0),unsubscribe:V});if(a.store!==e)if(a.unsubscribe(),a.store=e??null,e==null)a.source.v=void 0,a.unsubscribe=V;else{var o=!0;a.unsubscribe=fe(e,r=>{o?a.source.v=r:ie(a.source,r)}),o=!1}return ue(a.source)}function Ve(){const e={};return C(()=>{for(var t in e)e[t].unsubscribe()}),e}function Me(e){var t=w;try{return w=!1,[e(),w]}finally{w=t}}export{De as a,Oe as b,Me as c,Ae as d,le as e,de as f,Le as g,Re as h,Se as i,Ee as j,Ne as k,A as l,ye as m,ke as n,me as o,Te as p,Ve as s,Ie as u};
