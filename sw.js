if(!self.define){let e,s={};const r=(r,i)=>(r=new URL(r+".js",i).href,s[r]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=s,document.head.appendChild(e)}else e=r,importScripts(r),s()})).then((()=>{let e=s[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(i,t)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let o={};const d=e=>r(e,a),n={module:{uri:a},exports:o,require:d};s[a]=Promise.all(i.map((e=>n[e]||d(e)))).then((e=>(t(...e),o)))}}define(["./workbox-e1498109"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"artifacts/console.html",revision:"730809097d08a156c49f9a75cde2add4"},{url:"artifacts/module_test.html",revision:"4fbbc34be294a3d5a6678ffc1a3e28a6"},{url:"artifacts/module_webworker_dev.js",revision:"47f448ff27475f98304b5cddcaff2060"},{url:"artifacts/pyodide.asm.js",revision:"0f0c5178d4575464c88230d18064c122"},{url:"artifacts/pyodide.asm.wasm",revision:"3b315e78ca4291f495d266dfa9312d4e"},{url:"artifacts/pyodide.js",revision:"73aa7ad9a864b13a9b1ae7b18d6e1b3f"},{url:"artifacts/test.html",revision:"c4d0515a38d9efcb79feffbbf85b6082"},{url:"artifacts/webworker_dev.js",revision:"36e0357f37475273a6d36a496f6d7920"},{url:"artifacts/webworker.js",revision:"36e0357f37475273a6d36a496f6d7920"},{url:"assets/__vite-browser-external-CIEyP2s7.js",revision:null},{url:"assets/index-B489Fav_.js",revision:null},{url:"assets/index-BqIgW0tA.js",revision:null},{url:"assets/pyodide-worker-B4ROPMFB.js",revision:null},{url:"index.html",revision:"683896a2c2702704559eab852a86269c"},{url:"registerSW.js",revision:"956178ca7002772fcde2084da99b9044"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
