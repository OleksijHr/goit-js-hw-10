import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as s}from"./assets/vendor-77e16229.js";const r=document.querySelector(".form");r.addEventListener("submit",e=>{e.preventDefault();const o=Number(r.delay.value),t=r.state.value;i(o,t).then(n).catch(l)});function i(e,o){return new Promise((t,c)=>{setTimeout(()=>{o==="fulfilled"?t(e):c(e)},e)})}function n(e){console.log(`Promise resolved after ${e}ms`),s.success({title:"OK",message:`Promise resolved after ${e}ms`,closeOnClick:"true",position:"topLeft",backgroundColor:"green"})}function l(e){console.log(`Promise rejected after ${e}ms`),s.error({title:"Error",message:`Promise rejected after ${e}ms`,backgroundColor:"red",closeOnClick:"true",position:"topLeft"})}
//# sourceMappingURL=commonHelpers2.js.map
