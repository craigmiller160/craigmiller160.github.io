import{ad as h,R as l,r as d,a6 as m}from"./index-D8gEYsKr.js";const f=["xxl","xl","lg","md","sm","xs"],x=n=>({xs:`(max-width: ${n.screenXSMax}px)`,sm:`(min-width: ${n.screenSM}px)`,md:`(min-width: ${n.screenMD}px)`,lg:`(min-width: ${n.screenLG}px)`,xl:`(min-width: ${n.screenXL}px)`,xxl:`(min-width: ${n.screenXXL}px)`}),$=n=>{const e=n,t=[].concat(f).reverse();return t.forEach((o,a)=>{const s=o.toUpperCase(),i=`screen${s}Min`,r=`screen${s}`;if(!(e[i]<=e[r]))throw new Error(`${i}<=${r} fails : !(${e[i]}<=${e[r]})`);if(a<t.length-1){const c=`screen${s}Max`;if(!(e[r]<=e[c]))throw new Error(`${r}<=${c} fails : !(${e[r]}<=${e[c]})`);const u=`screen${t[a+1].toUpperCase()}Min`;if(!(e[c]<=e[u]))throw new Error(`${c}<=${u} fails : !(${e[c]}<=${e[u]})`)}}),n};function b(){const[,n]=h(),e=x($(n));return l.useMemo(()=>{const t=new Map;let o=-1,a={};return{matchHandlers:{},dispatch(s){return a=s,t.forEach(i=>i(a)),t.size>=1},subscribe(s){return t.size||this.register(),o+=1,t.set(o,s),s(a),o},unsubscribe(s){t.delete(s),t.size||this.unregister()},unregister(){Object.keys(e).forEach(s=>{const i=e[s],r=this.matchHandlers[i];r==null||r.mql.removeListener(r==null?void 0:r.listener)}),t.clear()},register(){Object.keys(e).forEach(s=>{const i=e[s],r=p=>{let{matches:u}=p;this.dispatch(Object.assign(Object.assign({},a),{[s]:u}))},c=window.matchMedia(i);c.addListener(r),this.matchHandlers[i]={mql:c,listener:r},r(c)})},responsiveMap:e}},[n])}function M(){const[,n]=d.useReducer(e=>e+1,0);return n}function v(){let n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0;const e=d.useRef({}),t=M(),o=b();return m(()=>{const a=o.subscribe(s=>{e.current=s,n&&t()});return()=>o.unsubscribe(a)},[]),e.current}export{b as a,f as r,v as u};
