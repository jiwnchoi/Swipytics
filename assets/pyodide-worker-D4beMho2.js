var Me=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports);var rn=Me((sn,R)=>{/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const z=Symbol("Comlink.proxy"),Se=Symbol("Comlink.endpoint"),xe=Symbol("Comlink.releaseProxy"),O=Symbol("Comlink.finalizer"),M=Symbol("Comlink.thrown"),Y=e=>typeof e=="object"&&e!==null||typeof e=="function",Ee={canHandle:e=>Y(e)&&e[z],serialize(e){const{port1:n,port2:i}=new MessageChannel;return q(e,n),[i,[i]]},deserialize(e){return e.start(),Pe(e)}},Ce={canHandle:e=>Y(e)&&M in e,serialize({value:e}){let n;return e instanceof Error?n={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:n={isError:!1,value:e},[n,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},G=new Map([["proxy",Ee],["throw",Ce]]);function Te(e,n){for(const i of e)if(n===i||i==="*"||i instanceof RegExp&&i.test(n))return!0;return!1}function q(e,n=globalThis,i=["*"]){n.addEventListener("message",function a(s){if(!s||!s.data)return;if(!Te(i,s.origin)){console.warn(`Invalid origin '${s.origin}' for comlink proxy`);return}const{id:r,type:t,path:l}=Object.assign({path:[]},s.data),o=(s.data.argumentList||[]).map(b);let f;try{const d=l.slice(0,-1).reduce((m,u)=>m[u],e),c=l.reduce((m,u)=>m[u],e);switch(t){case"GET":f=c;break;case"SET":d[l.slice(-1)[0]]=b(s.data.value),f=!0;break;case"APPLY":f=c.apply(d,o);break;case"CONSTRUCT":{const m=new c(...o);f=Ie(m)}break;case"ENDPOINT":{const{port1:m,port2:u}=new MessageChannel;q(e,u),f=Ae(m,[m])}break;case"RELEASE":f=void 0;break;default:return}}catch(d){f={value:d,[M]:0}}Promise.resolve(f).catch(d=>({value:d,[M]:0})).then(d=>{const[c,m]=C(d);n.postMessage(Object.assign(Object.assign({},c),{id:r}),m),t==="RELEASE"&&(n.removeEventListener("message",a),K(n),O in e&&typeof e[O]=="function"&&e[O]())}).catch(d=>{const[c,m]=C({value:new TypeError("Unserializable return value"),[M]:0});n.postMessage(Object.assign(Object.assign({},c),{id:r}),m)})}),n.start&&n.start()}function Ne(e){return e.constructor.name==="MessagePort"}function K(e){Ne(e)&&e.close()}function Pe(e,n){return L(e,[],n)}function k(e){if(e)throw new Error("Proxy has been released and is not useable")}function W(e){return v(e,{type:"RELEASE"}).then(()=>{K(e)})}const x=new WeakMap,E="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const n=(x.get(e)||0)-1;x.set(e,n),n===0&&W(e)});function Oe(e,n){const i=(x.get(n)||0)+1;x.set(n,i),E&&E.register(e,n,e)}function De(e){E&&E.unregister(e)}function L(e,n=[],i=function(){}){let a=!1;const s=new Proxy(i,{get(r,t){if(k(a),t===xe)return()=>{De(s),W(e),a=!0};if(t==="then"){if(n.length===0)return{then:()=>s};const l=v(e,{type:"GET",path:n.map(o=>o.toString())}).then(b);return l.then.bind(l)}return L(e,[...n,t])},set(r,t,l){k(a);const[o,f]=C(l);return v(e,{type:"SET",path:[...n,t].map(d=>d.toString()),value:o},f).then(b)},apply(r,t,l){k(a);const o=n[n.length-1];if(o===Se)return v(e,{type:"ENDPOINT"}).then(b);if(o==="bind")return L(e,n.slice(0,-1));const[f,d]=H(l);return v(e,{type:"APPLY",path:n.map(c=>c.toString()),argumentList:f},d).then(b)},construct(r,t){k(a);const[l,o]=H(t);return v(e,{type:"CONSTRUCT",path:n.map(f=>f.toString()),argumentList:l},o).then(b)}});return Oe(s,e),s}function Le(e){return Array.prototype.concat.apply([],e)}function H(e){const n=e.map(C);return[n.map(i=>i[0]),Le(n.map(i=>i[1]))]}const X=new WeakMap;function Ae(e,n){return X.set(e,n),e}function Ie(e){return Object.assign(e,{[z]:!0})}function C(e){for(const[n,i]of G)if(i.canHandle(e)){const[a,s]=i.serialize(e);return[{type:"HANDLER",name:n,value:a},s]}return[{type:"RAW",value:e},X.get(e)||[]]}function b(e){switch(e.type){case"HANDLER":return G.get(e.name).deserialize(e.value);case"RAW":return e.value}}function v(e,n,i){return new Promise(a=>{const s=Re();e.addEventListener("message",function r(t){!t.data||!t.data.id||t.data.id!==s||(e.removeEventListener("message",r),a(t.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:s},n),i)})}function Re(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}var qe=Object.create,j=Object.defineProperty,je=Object.getOwnPropertyDescriptor,$e=Object.getOwnPropertyNames,Ue=Object.getPrototypeOf,Ve=Object.prototype.hasOwnProperty,_=(e,n)=>j(e,"name",{value:n,configurable:!0}),J=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(n,i)=>(typeof require<"u"?require:n)[i]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')}),Q=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports),Be=(e,n,i,a)=>{if(n&&typeof n=="object"||typeof n=="function")for(let s of $e(n))!Ve.call(e,s)&&s!==i&&j(e,s,{get:()=>n[s],enumerable:!(a=je(n,s))||a.enumerable});return e},He=(e,n,i)=>(i=e!=null?qe(Ue(e)):{},Be(!e||!e.__esModule?j(i,"default",{value:e,enumerable:!0}):i,e)),ze=Q((e,n)=>{(function(i,a){typeof define=="function"&&define.amd?define("stackframe",[],a):typeof e=="object"?n.exports=a():i.StackFrame=a()})(e,function(){function i(p){return!isNaN(parseFloat(p))&&isFinite(p)}_(i,"_isNumber");function a(p){return p.charAt(0).toUpperCase()+p.substring(1)}_(a,"_capitalize");function s(p){return function(){return this[p]}}_(s,"_getter");var r=["isConstructor","isEval","isNative","isToplevel"],t=["columnNumber","lineNumber"],l=["fileName","functionName","source"],o=["args"],f=["evalOrigin"],d=r.concat(t,l,o,f);function c(p){if(p)for(var h=0;h<d.length;h++)p[d[h]]!==void 0&&this["set"+a(d[h])](p[d[h]])}_(c,"StackFrame"),c.prototype={getArgs:function(){return this.args},setArgs:function(p){if(Object.prototype.toString.call(p)!=="[object Array]")throw new TypeError("Args must be an Array");this.args=p},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(p){if(p instanceof c)this.evalOrigin=p;else if(p instanceof Object)this.evalOrigin=new c(p);else throw new TypeError("Eval Origin must be an Object or StackFrame")},toString:function(){var p=this.getFileName()||"",h=this.getLineNumber()||"",w=this.getColumnNumber()||"",F=this.getFunctionName()||"";return this.getIsEval()?p?"[eval] ("+p+":"+h+":"+w+")":"[eval]:"+h+":"+w:F?F+" ("+p+":"+h+":"+w+")":p+":"+h+":"+w}},c.fromString=_(function(p){var h=p.indexOf("("),w=p.lastIndexOf(")"),F=p.substring(0,h),be=p.substring(h+1,w).split(","),B=p.substring(w+1);if(B.indexOf("@")===0)var P=/@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(B,""),ve=P[1],Fe=P[2],ke=P[3];return new c({functionName:F,args:be||void 0,fileName:ve,lineNumber:Fe||void 0,columnNumber:ke||void 0})},"StackFrame$$fromString");for(var m=0;m<r.length;m++)c.prototype["get"+a(r[m])]=s(r[m]),c.prototype["set"+a(r[m])]=function(p){return function(h){this[p]=!!h}}(r[m]);for(var u=0;u<t.length;u++)c.prototype["get"+a(t[u])]=s(t[u]),c.prototype["set"+a(t[u])]=function(p){return function(h){if(!i(h))throw new TypeError(p+" must be a Number");this[p]=Number(h)}}(t[u]);for(var y=0;y<l.length;y++)c.prototype["get"+a(l[y])]=s(l[y]),c.prototype["set"+a(l[y])]=function(p){return function(h){this[p]=String(h)}}(l[y]);return c})}),Ye=Q((e,n)=>{(function(i,a){typeof define=="function"&&define.amd?define("error-stack-parser",["stackframe"],a):typeof e=="object"?n.exports=a(ze()):i.ErrorStackParser=a(i.StackFrame)})(e,_(function(i){var a=/(^|@)\S+:\d+/,s=/^\s*at .*(\S+:\d+|\(native\))/m,r=/^(eval@)?(\[native code])?$/;return{parse:_(function(t){if(typeof t.stacktrace<"u"||typeof t["opera#sourceloc"]<"u")return this.parseOpera(t);if(t.stack&&t.stack.match(s))return this.parseV8OrIE(t);if(t.stack)return this.parseFFOrSafari(t);throw new Error("Cannot parse given Error object")},"ErrorStackParser$$parse"),extractLocation:_(function(t){if(t.indexOf(":")===-1)return[t];var l=/(.+?)(?::(\d+))?(?::(\d+))?$/,o=l.exec(t.replace(/[()]/g,""));return[o[1],o[2]||void 0,o[3]||void 0]},"ErrorStackParser$$extractLocation"),parseV8OrIE:_(function(t){var l=t.stack.split(`
`).filter(function(o){return!!o.match(s)},this);return l.map(function(o){o.indexOf("(eval ")>-1&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));var f=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),d=f.match(/ (\(.+\)$)/);f=d?f.replace(d[0],""):f;var c=this.extractLocation(d?d[1]:f),m=d&&f||void 0,u=["eval","<anonymous>"].indexOf(c[0])>-1?void 0:c[0];return new i({functionName:m,fileName:u,lineNumber:c[1],columnNumber:c[2],source:o})},this)},"ErrorStackParser$$parseV8OrIE"),parseFFOrSafari:_(function(t){var l=t.stack.split(`
`).filter(function(o){return!o.match(r)},this);return l.map(function(o){if(o.indexOf(" > eval")>-1&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),o.indexOf("@")===-1&&o.indexOf(":")===-1)return new i({functionName:o});var f=/((.*".+"[^@]*)?[^@]*)(?:@)/,d=o.match(f),c=d&&d[1]?d[1]:void 0,m=this.extractLocation(o.replace(f,""));return new i({functionName:c,fileName:m[0],lineNumber:m[1],columnNumber:m[2],source:o})},this)},"ErrorStackParser$$parseFFOrSafari"),parseOpera:_(function(t){return!t.stacktrace||t.message.indexOf(`
`)>-1&&t.message.split(`
`).length>t.stacktrace.split(`
`).length?this.parseOpera9(t):t.stack?this.parseOpera11(t):this.parseOpera10(t)},"ErrorStackParser$$parseOpera"),parseOpera9:_(function(t){for(var l=/Line (\d+).*script (?:in )?(\S+)/i,o=t.message.split(`
`),f=[],d=2,c=o.length;d<c;d+=2){var m=l.exec(o[d]);m&&f.push(new i({fileName:m[2],lineNumber:m[1],source:o[d]}))}return f},"ErrorStackParser$$parseOpera9"),parseOpera10:_(function(t){for(var l=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,o=t.stacktrace.split(`
`),f=[],d=0,c=o.length;d<c;d+=2){var m=l.exec(o[d]);m&&f.push(new i({functionName:m[3]||void 0,fileName:m[2],lineNumber:m[1],source:o[d]}))}return f},"ErrorStackParser$$parseOpera10"),parseOpera11:_(function(t){var l=t.stack.split(`
`).filter(function(o){return!!o.match(a)&&!o.match(/^Error created at/)},this);return l.map(function(o){var f=o.split("@"),d=this.extractLocation(f.pop()),c=f.shift()||"",m=c.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^)]*\)/g,"")||void 0,u;c.match(/\(([^)]*)\)/)&&(u=c.replace(/^[^(]+\(([^)]*)\)$/,"$1"));var y=u===void 0||u==="[arguments not available]"?void 0:u.split(",");return new i({functionName:m,args:y,fileName:d[0],lineNumber:d[1],columnNumber:d[2],source:o})},this)},"ErrorStackParser$$parseOpera11")}},"ErrorStackParser"))}),Ge=He(Ye()),g=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string"&&typeof process.browser>"u",Z=g&&typeof R<"u"&&typeof R.exports<"u"&&typeof J<"u"&&typeof __dirname<"u",Ke=g&&!Z,We=typeof Deno<"u",ee=!g&&!We,Xe=ee&&typeof window<"u"&&typeof document<"u"&&typeof document.createElement<"u"&&typeof sessionStorage<"u",Je=ee&&typeof importScripts<"u"&&typeof self<"u",ne,T,A,te,$,Qe=`"fetch" is not defined, maybe you're using node < 18? From Pyodide >= 0.25.0, node >= 18 is required. Older versions of Node.js may work, but it is not guaranteed or supported. Falling back to "node-fetch".`;async function U(){if(!g||(ne=(await import("./__vite-browser-external-CIEyP2s7.js")).default,$=await import("./__vite-browser-external-CIEyP2s7.js"),globalThis.fetch?T=fetch:(console.warn(Qe),T=(await import("./index-B489Fav_.js")).default),te=(await import("./__vite-browser-external-CIEyP2s7.js")).default,A=await import("./__vite-browser-external-CIEyP2s7.js"),V=A.sep,typeof J<"u"))return;let e=await import("./__vite-browser-external-CIEyP2s7.js"),n=await import("./__vite-browser-external-CIEyP2s7.js"),i=await import("./__vite-browser-external-CIEyP2s7.js"),a=await import("./__vite-browser-external-CIEyP2s7.js"),s={fs:e,crypto:n,ws:i,child_process:a};globalThis.require=function(r){return s[r]}}_(U,"initNodeModules");function ie(e,n){return A.resolve(n||".",e)}_(ie,"node_resolvePath");function re(e,n){return n===void 0&&(n=location),new URL(e,n).toString()}_(re,"browser_resolvePath");var I;g?I=ie:I=re;var V;g||(V="/");function ae(e,n){return e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?{response:T(e)}:{binary:$.readFile(e).then(i=>new Uint8Array(i.buffer,i.byteOffset,i.byteLength))}}_(ae,"node_getBinaryResponse");function se(e,n){let i=new URL(e,location);return{response:fetch(i,n?{integrity:n}:{})}}_(se,"browser_getBinaryResponse");var N;g?N=ae:N=se;async function oe(e,n){let{response:i,binary:a}=N(e,n);if(a)return a;let s=await i;if(!s.ok)throw new Error(`Failed to load '${e}': request failed.`);return new Uint8Array(await s.arrayBuffer())}_(oe,"loadBinaryFile");var S;if(Xe)S=_(async e=>await import(e),"loadScript");else if(Je)S=_(async e=>{try{globalThis.importScripts(e)}catch(n){if(n instanceof TypeError)await import(e);else throw n}},"loadScript");else if(g)S=le;else throw new Error("Cannot determine runtime environment");async function le(e){e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?te.runInThisContext(await(await T(e)).text()):await import(ne.pathToFileURL(e).href)}_(le,"nodeLoadScript");async function de(e){if(g){await U();let n=await $.readFile(e);return JSON.parse(n)}else return await(await fetch(e)).json()}_(de,"loadLockFile");async function fe(){if(Z)return __dirname;let e;try{throw new Error}catch(a){e=a}let n=Ge.default.parse(e)[0].fileName;if(Ke){let a=await import("./__vite-browser-external-CIEyP2s7.js");return(await import("./__vite-browser-external-CIEyP2s7.js")).fileURLToPath(a.dirname(n))}let i=n.lastIndexOf(V);if(i===-1)throw new Error("Could not extract indexURL path from pyodide module location");return n.slice(0,i)}_(fe,"calculateDirname");function ce(e){let n=e.FS,i=e.FS.filesystems.MEMFS,a=e.PATH,s={DIR_MODE:16895,FILE_MODE:33279,mount:function(r){if(!r.opts.fileSystemHandle)throw new Error("opts.fileSystemHandle is required");return i.mount.apply(null,arguments)},syncfs:async(r,t,l)=>{try{let o=s.getLocalSet(r),f=await s.getRemoteSet(r),d=t?f:o,c=t?o:f;await s.reconcile(r,d,c),l(null)}catch(o){l(o)}},getLocalSet:r=>{let t=Object.create(null);function l(d){return d!=="."&&d!==".."}_(l,"isRealDir");function o(d){return c=>a.join2(d,c)}_(o,"toAbsolute");let f=n.readdir(r.mountpoint).filter(l).map(o(r.mountpoint));for(;f.length;){let d=f.pop(),c=n.stat(d);n.isDir(c.mode)&&f.push.apply(f,n.readdir(d).filter(l).map(o(d))),t[d]={timestamp:c.mtime,mode:c.mode}}return{type:"local",entries:t}},getRemoteSet:async r=>{let t=Object.create(null),l=await Ze(r.opts.fileSystemHandle);for(let[o,f]of l)o!=="."&&(t[a.join2(r.mountpoint,o)]={timestamp:f.kind==="file"?(await f.getFile()).lastModifiedDate:new Date,mode:f.kind==="file"?s.FILE_MODE:s.DIR_MODE});return{type:"remote",entries:t,handles:l}},loadLocalEntry:r=>{let t=n.lookupPath(r).node,l=n.stat(r);if(n.isDir(l.mode))return{timestamp:l.mtime,mode:l.mode};if(n.isFile(l.mode))return t.contents=i.getFileDataAsTypedArray(t),{timestamp:l.mtime,mode:l.mode,contents:t.contents};throw new Error("node type not supported")},storeLocalEntry:(r,t)=>{if(n.isDir(t.mode))n.mkdirTree(r,t.mode);else if(n.isFile(t.mode))n.writeFile(r,t.contents,{canOwn:!0});else throw new Error("node type not supported");n.chmod(r,t.mode),n.utime(r,t.timestamp,t.timestamp)},removeLocalEntry:r=>{var t=n.stat(r);n.isDir(t.mode)?n.rmdir(r):n.isFile(t.mode)&&n.unlink(r)},loadRemoteEntry:async r=>{if(r.kind==="file"){let t=await r.getFile();return{contents:new Uint8Array(await t.arrayBuffer()),mode:s.FILE_MODE,timestamp:t.lastModifiedDate}}else{if(r.kind==="directory")return{mode:s.DIR_MODE,timestamp:new Date};throw new Error("unknown kind: "+r.kind)}},storeRemoteEntry:async(r,t,l)=>{let o=r.get(a.dirname(t)),f=n.isFile(l.mode)?await o.getFileHandle(a.basename(t),{create:!0}):await o.getDirectoryHandle(a.basename(t),{create:!0});if(f.kind==="file"){let d=await f.createWritable();await d.write(l.contents),await d.close()}r.set(t,f)},removeRemoteEntry:async(r,t)=>{await r.get(a.dirname(t)).removeEntry(a.basename(t)),r.delete(t)},reconcile:async(r,t,l)=>{let o=0,f=[];Object.keys(t.entries).forEach(function(m){let u=t.entries[m],y=l.entries[m];(!y||n.isFile(u.mode)&&u.timestamp.getTime()>y.timestamp.getTime())&&(f.push(m),o++)}),f.sort();let d=[];if(Object.keys(l.entries).forEach(function(m){t.entries[m]||(d.push(m),o++)}),d.sort().reverse(),!o)return;let c=t.type==="remote"?t.handles:l.handles;for(let m of f){let u=a.normalize(m.replace(r.mountpoint,"/")).substring(1);if(l.type==="local"){let y=c.get(u),p=await s.loadRemoteEntry(y);s.storeLocalEntry(m,p)}else{let y=s.loadLocalEntry(m);await s.storeRemoteEntry(c,u,y)}}for(let m of d)if(l.type==="local")s.removeLocalEntry(m);else{let u=a.normalize(m.replace(r.mountpoint,"/")).substring(1);await s.removeRemoteEntry(c,u)}}};e.FS.filesystems.NATIVEFS_ASYNC=s}_(ce,"initializeNativeFS");var Ze=_(async e=>{let n=[];async function i(s){for await(let r of s.values())n.push(r),r.kind==="directory"&&await i(r)}_(i,"collect"),await i(e);let a=new Map;a.set(".",e);for(let s of n){let r=(await e.resolve(s)).join("/");a.set(r,s)}return a},"getFsHandles");function me(){let e={};return e.noImageDecoding=!0,e.noAudioDecoding=!0,e.noWasmDecoding=!1,e.preRun=[],e.quit=(n,i)=>{throw e.exited={status:n,toThrow:i},i},e}_(me,"createModule");function pe(e,n){e.preRun.push(function(){let i="/";try{e.FS.mkdirTree(n)}catch(a){console.error(`Error occurred while making a home directory '${n}':`),console.error(a),console.error(`Using '${i}' for a home directory instead`),n=i}e.FS.chdir(n)})}_(pe,"createHomeDirectory");function _e(e,n){e.preRun.push(function(){Object.assign(e.ENV,n)})}_(_e,"setEnvironment");function ue(e,n){e.preRun.push(()=>{for(let i of n)e.FS.mkdirTree(i),e.FS.mount(e.FS.filesystems.NODEFS,{root:i},i)})}_(ue,"mountLocalDirectories");function he(e,n){let i=oe(n);e.preRun.push(()=>{let a=e._py_version_major(),s=e._py_version_minor();e.FS.mkdirTree("/lib"),e.FS.mkdirTree(`/lib/python${a}.${s}/site-packages`),e.addRunDependency("install-stdlib"),i.then(r=>{e.FS.writeFile(`/lib/python${a}${s}.zip`,r)}).catch(r=>{console.error("Error occurred while installing the standard library:"),console.error(r)}).finally(()=>{e.removeRunDependency("install-stdlib")})})}_(he,"installStdlib");function ye(e,n){let i;n.stdLibURL!=null?i=n.stdLibURL:i=n.indexURL+"python_stdlib.zip",he(e,i),pe(e,n.env.HOME),_e(e,n.env),ue(e,n._node_mounts),e.preRun.push(()=>ce(e))}_(ye,"initializeFileSystem");function ge(e,n){let{binary:i,response:a}=N(n+"pyodide.asm.wasm");e.instantiateWasm=function(s,r){return async function(){try{let t;a?t=await WebAssembly.instantiateStreaming(a,s):t=await WebAssembly.instantiate(await i,s);let{instance:l,module:o}=t;typeof WasmOffsetConverter<"u"&&(wasmOffsetConverter=new WasmOffsetConverter(wasmBinary,o)),r(l,o)}catch(t){console.warn("wasm instantiation failed!"),console.warn(t)}}(),{}}}_(ge,"preloadWasm");var D="0.25.0";async function we(e={}){await U();let n=e.indexURL||await fe();n=I(n),n.endsWith("/")||(n+="/"),e.indexURL=n;let i={fullStdLib:!1,jsglobals:globalThis,stdin:globalThis.prompt?globalThis.prompt:void 0,lockFileURL:n+"pyodide-lock.json",args:[],_node_mounts:[],env:{},packageCacheDir:n,packages:[]},a=Object.assign(i,e);a.env.HOME||(a.env.HOME="/home/pyodide");let s=me();s.print=a.stdout,s.printErr=a.stderr,s.arguments=a.args;let r={config:a};s.API=r,r.lockFilePromise=de(a.lockFileURL),ge(s,n),ye(s,a);let t=new Promise(o=>s.postRun=o);if(s.locateFile=o=>a.indexURL+o,typeof _createPyodideModule!="function"){let o=`${a.indexURL}pyodide.asm.js`;await S(o)}if(await _createPyodideModule(s),await t,s.exited)throw s.exited.toThrow;if(e.pyproxyToStringRepr&&r.setPyProxyToStringMethod(!0),r.version!==D)throw new Error(`Pyodide version does not match: '${D}' <==> '${r.version}'. If you updated the Pyodide version, make sure you also updated the 'indexURL' parameter passed to loadPyodide.`);s.locateFile=o=>{throw new Error("Didn't expect to load any more file_packager files!")};let l=r.finalizeBootstrap();if(l.version.includes("dev")||r.setCdnUrl(`https://cdn.jsdelivr.net/pyodide/v${l.version}/full/`),await r.packageIndexReady,r._pyodide._importhook.register_module_not_found_hook(r._import_name_to_package_name,r.lockfile_unvendored_stdlibs_and_test),r.lockfile_info.version!==D)throw new Error("Lock file version doesn't match Pyodide version");return r.package_loader.init_loaded_packages(),a.fullStdLib&&await l.loadPackage(r.lockfile_unvendored_stdlibs),r.initializeStreams(a.stdin,a.stdout,a.stderr),l}_(we,"loadPyodide");async function en(e){const n={"api/app.py":`from __future__ import annotations

from typing import Any

from api.models import ChartModel, SessionModel
from api.services import browse_charts, get_chart, get_next_chart

sessions: dict[str, SessionModel] = {"default": SessionModel()}


def getSession(session_key: str = "default") -> SessionModel:
  if session_key not in sessions:
    sessions[session_key] = SessionModel()
  return sessions[session_key]


def setSession(session: SessionModel, session_key: str = "default") -> None:
  sessions[session_key] = session


def loadSession(session: dict[str, Any] | SessionModel, session_key: str = "default"):
  if isinstance(session, dict):
    session = SessionModel.model_validate(session)

  new_session = SessionModel(filename=session.filename)
  new_session.charts = session.charts
  new_session.timestamp = session.timestamp

  if len(new_session.charts) == 0:
    chart = get_next_chart(new_session)
    new_session.charts.append(chart) if chart else None
    chart = get_next_chart(new_session)
    new_session.charts.append(chart) if chart else None

  setSession(new_session, session_key)
  return new_session.model_dump(by_alias=True, mode="json")


def appendChart(chart: dict[str, Any] | ChartModel, session_key: str = "default"):
  session = getSession(session_key)
  if isinstance(chart, dict):
    chart = ChartModel.model_validate(chart)
  session.charts.append(chart)
  return session.model_dump(by_alias=True, mode="json")


def appendNextChart(session_key: str = "default"):
  session = getSession(session_key)
  chart = get_next_chart(session)
  session.charts.append(chart) if chart else None
  return chart.model_dump(by_alias=True, mode="json") if chart else None


def browseCharts(field_names: list[str], session_key: str = "default"):
  session = getSession(session_key)
  browsed_chart = browse_charts(session, field_names)
  return [chart.model_dump(by_alias=True, mode="json") for chart in browsed_chart]


def getCharts(field_names: list[str], session_key: str = "default"):
  session = getSession(session_key)
  fields = [
    field for field in session.available_fields if set(field_names) == set([f.name for f in field])
  ]
  charts = [get_chart(session.df, field) for field in fields]
  return [chart.model_dump(by_alias=True, mode="json") for chart in charts if chart]


def setPreferred(key: str, preferred: bool, session_key: str = "default"):
  session = getSession(session_key)
  chart = next((chart for chart in session.charts if chart.key == key), None)
  if chart:
    chart.preferred = preferred
    return chart.model_dump(by_alias=True, mode="json")
  else:
    return None
`,"api/charts/__init__.py":`from typing import TYPE_CHECKING, Callable

from .barchart import barchart_c, barchart_n, barchart_nc, barchart_nc_c
from .heatmap import heatmap_cc, heatmap_cc_n
from .heatmap import heatmap_ct_n as heatmap_ct_n
from .linechart import linechart_ct, linechart_nt, linechart_nt_c, linechart_t
from .scatterplot import scatterplot_nn, scatterplot_nn_c, scatterplot_nnn

if TYPE_CHECKING:
  import altair as alt
  from api.models import FieldModel
  from pandas import DataFrame

ChartRenderer = Callable[["DataFrame", tuple["FieldModel", ...]], "alt.Chart"]

chart_map: dict[str, ChartRenderer] = {
  "categorical": barchart_c,
  "numeric": barchart_n,
  "datetime": linechart_t,
  "numeric_categorical": barchart_nc,
  "categorical_numeric": barchart_nc,
  "numeric_categorical_categorical": barchart_nc_c,
  "categorical_numeric_categorical": barchart_nc_c,
  "numeric_numeric": scatterplot_nn,
  "numeric_numeric_numeric": scatterplot_nnn,
  "numeric_numeric_categorical": scatterplot_nn_c,
  "categorical_categorical": heatmap_cc,
  "categorical_categorical_numeric": heatmap_cc_n,
  "categorical_datetime": linechart_ct,
  "datetime_categorical": linechart_ct,
  "datetime_numeric": linechart_nt,
  "numeric_datetime": linechart_nt,
  "datetime_numeric_categorical": linechart_nt_c,
  "numeric_datetime_categorical": linechart_nt_c,
}
`,"api/charts/barchart.py":`from typing import TYPE_CHECKING

import altair as alt
import pandas as pd

if TYPE_CHECKING:
  from api.models import FieldModel


def barchart_n(df: pd.DataFrame, fields: tuple["FieldModel", ...]) -> alt.Chart:
  if len(fields) != 1 and fields[0].type != "numeric":
    raise ValueError("Invalid field type for histogram")

  return (
    alt.Chart(df)
    .mark_bar()
    .encode(
      x=alt.X(
        fields[0].clingo_name,
        bin=True if fields[0].metadata.unique > 20 else False,
        type="quantitative" if fields[0].metadata.unique > 20 else "ordinal",
      ),
      y="count()",
    )
  )


def barchart_c(df: pd.DataFrame, fields: tuple["FieldModel", ...]) -> alt.Chart:
  if len(fields) != 1 and fields[0].type != "categorical":
    raise ValueError("Invalid field type for barchart_categorical")

  return alt.Chart(df).mark_bar().encode(x=alt.X(fields[0].clingo_name), y="count()")


# Bivariate
def barchart_nc(df: pd.DataFrame, fields: tuple["FieldModel", ...]) -> alt.Chart:
  if len(fields) != 2:
    raise ValueError("Invalid number of fields for barchart")

  numeric_field = fields[0] if fields[0].type == "numeric" else fields[1]
  categorical_field = fields[1] if fields[0].type == "numeric" else fields[0]

  return (
    alt.Chart(df)
    .mark_bar()
    .encode(x=categorical_field.clingo_name, y=alt.Y(numeric_field.clingo_name, aggregate="mean"))
  )


# Trivariate
def barchart_nc_c(df: pd.DataFrame, fields: tuple["FieldModel", ...]) -> alt.Chart:
  if len(fields) != 3:
    raise ValueError("Invalid number of fields for barchart")

  numeric_field = fields[0] if fields[0].type == "numeric" else fields[1]
  categorical_field = fields[1] if fields[0].type == "numeric" else fields[0]
  color_field = fields[2]

  return (
    alt.Chart(df)
    .mark_bar()
    .encode(
      x=categorical_field.clingo_name,
      y=alt.Y(numeric_field.clingo_name, aggregate="mean"),
      color=color_field.clingo_name,
      xOffset=color_field.clingo_name,
    )
  )
`,"api/charts/heatmap.py":`from typing import TYPE_CHECKING

import altair as alt
import pandas as pd

if TYPE_CHECKING:
  from api.models import FieldModel, TimeUnitType


def heatmap_cc(df: pd.DataFrame, fields: tuple["FieldModel", ...]) -> alt.Chart:
  if len(fields) != 2 or fields[0].type != "categorical" or fields[1].type != "categorical":
    raise ValueError("Invalid number of fields for heatmap")
  return (
    alt.Chart(df)
    .mark_rect()
    .encode(x=fields[0].clingo_name, y=fields[1].clingo_name, color="count()")
  )


def heatmap_cc_n(df: pd.DataFrame, fields: tuple["FieldModel", ...]) -> alt.Chart:
  if (
    len(fields) != 3
    or fields[0].type != "categorical"
    or fields[1].type != "categorical"
    or fields[2].type != "numeric"
  ):
    raise ValueError("Invalid number of fields for heatmap")
  return (
    alt.Chart(df)
    .mark_rect()
    .encode(
      x=fields[0].clingo_name,
      y=fields[1].clingo_name,
      color=alt.Color(fields[2].clingo_name, aggregate="mean"),
    )
  )


def heatmap_ct(
  df: pd.DataFrame, fields: tuple["FieldModel", ...], time_unit: "TimeUnitType" = "year"
) -> alt.Chart:
  if len(fields) != 2:
    raise ValueError("Invalid number of fields for heatmap")

  categorical_field = fields[0] if fields[0].type == "categorical" else fields[1]
  temporal_field = fields[1] if fields[0].type == "categorical" else fields[0]

  return (
    alt.Chart(df)
    .mark_rect()
    .encode(
      x=alt.X(
        temporal_field.clingo_name,
        type="temporal",
      ),
      y=categorical_field.clingo_name,
      color="count()",
    )
  )


def heatmap_ct_n(
  df: pd.DataFrame, fields: tuple["FieldModel", ...], time_unit: "TimeUnitType" = "year"
) -> alt.Chart:
  if len(fields) != 3:
    raise ValueError("Invalid number of fields for heatmap")

  categorical_field = fields[0] if fields[0].type == "categorical" else fields[1]
  temporal_field = fields[1] if fields[0].type == "categorical" else fields[0]
  numeric_field = fields[2]

  return (
    alt.Chart(df)
    .mark_rect()
    .encode(
      x=alt.X(
        temporal_field.clingo_name,
        type="temporal",
      ),
      y=categorical_field.clingo_name,
      color=alt.Color(numeric_field.clingo_name, aggregate="mean"),
    )
  )
`,"api/charts/linechart.py":`from typing import TYPE_CHECKING

import altair as alt
import pandas as pd

if TYPE_CHECKING:
  from api.models import FieldModel, TimeUnitType


def linechart_ct(
  df: pd.DataFrame, fields: tuple["FieldModel", ...], time_unit: "TimeUnitType" = "year"
):
  if len(fields) != 2:
    raise ValueError("Invalid number of fields for linechart")

  categorical_field = fields[0] if fields[0].type == "categorical" else fields[1]
  temporal_field = fields[1] if fields[0].type == "categorical" else fields[0]

  return (
    alt.Chart(df)
    .mark_line()
    .encode(
      x=alt.X(
        temporal_field.clingo_name,
        type="temporal",
      ),
      y=alt.Y("count()"),
      color=categorical_field.clingo_name,
    )
  )


def linechart_nt(
  df: pd.DataFrame, fields: tuple["FieldModel", ...], time_unit: "TimeUnitType" = "year"
) -> alt.Chart:
  if len(fields) != 2:
    raise ValueError("Invalid number of fields for linechart")

  numeric_field = fields[0] if fields[0].type == "numeric" else fields[1]
  temporal_field = fields[1] if fields[0].type == "numeric" else fields[0]

  return (
    alt.Chart(df)
    .mark_line()
    .encode(
      x=alt.X(
        temporal_field.clingo_name,
        type="temporal",
      ),
      y=alt.Y(numeric_field.clingo_name, aggregate="mean"),
    )
  )


def linechart_nt_c(
  df: pd.DataFrame, fields: tuple["FieldModel", ...], time_unit: "TimeUnitType" = "year"
) -> alt.Chart:
  if len(fields) != 3:
    raise ValueError("Invalid number of fields for linechart")

  numeric_field = fields[0] if fields[0].type == "numeric" else fields[1]
  temporal_field = fields[1] if fields[0].type == "numeric" else fields[0]
  categorical_field = fields[2]

  return (
    alt.Chart(df)
    .mark_line()
    .encode(
      x=alt.X(
        temporal_field.clingo_name,
        type="temporal",
      ),
      y=alt.Y(numeric_field.clingo_name, aggregate="mean"),
      color=categorical_field.clingo_name,
    )
  )


def linechart_t(
  df: pd.DataFrame,
  fields: tuple["FieldModel", ...],
) -> alt.Chart:
  if len(fields) != 1 and fields[0].type != "datetime":
    raise ValueError("Invalid field type for linechart_t")

  return (
    alt.Chart(df)
    .mark_line()
    .encode(
      x=alt.X(
        fields[0].clingo_name,
        type="temporal",
      ),
      y="count()",
    )
  )
`,"api/charts/scatterplot.py":`from typing import TYPE_CHECKING

import altair as alt
import pandas as pd

if TYPE_CHECKING:
  from api.models import FieldModel

# Bivariate


def scatterplot_nn(df: pd.DataFrame, fields: tuple["FieldModel", ...]) -> alt.Chart:
  if len(fields) != 2 or fields[0].type != "numeric" or fields[1].type != "numeric":
    raise ValueError("Invalid number of fields for scatterplot")
  return alt.Chart(df).mark_point().encode(x=fields[0].clingo_name, y=fields[1].clingo_name)


# Trivariate
def scatterplot_nnn(df: pd.DataFrame, fields: tuple["FieldModel", ...]) -> alt.Chart:
  if (
    len(fields) != 3
    or fields[0].type != "numeric"
    or fields[1].type != "numeric"
    or fields[2].type != "numeric"
  ):
    raise ValueError("Invalid number of fields for scatterplot")
  return (
    alt.Chart(df)
    .mark_point()
    .encode(x=fields[0].clingo_name, y=fields[1].clingo_name, color=fields[2].clingo_name)
  )


def scatterplot_nn_c(df: pd.DataFrame, fields: tuple["FieldModel", ...]) -> alt.Chart:
  if (
    len(fields) != 3
    or fields[0].type != "numeric"
    or fields[1].type != "numeric"
    or fields[2].type != "categorical"
  ):
    raise ValueError("Invalid number of fields for scatterplot")
  return (
    alt.Chart(df)
    .mark_point()
    .encode(x=fields[0].clingo_name, y=fields[1].clingo_name, color=fields[2].clingo_name)
  )
`,"api/models/__init__.py":`from typing import Literal

from .chart_model import ChartModel, DefaultConfig
from .field_model import FieldModel
from .metadata_model import FieldType, MetadataModel
from .session_model import SessionModel

TimeUnitType = Literal["year", "month", "day", "hours"]

__all__ = [
  "ChartModel",
  "FieldModel",
  "FieldType",
  "MetadataModel",
  "SessionModel",
  "DefaultConfig",
  "TimeUnitType",
]
`,"api/models/chart_model.py":`from __future__ import annotations

from typing import TYPE_CHECKING, Any, Self, cast

from api.utils import get_fields_hash, get_timestamp
from numpy import argmax
from pydantic import BaseModel, Field, model_validator

from .field_model import FieldModel
from .model_config import DefaultConfig

if TYPE_CHECKING:
  from .metadata_model import MetadataDatetime

timeFormats = {
  "year": "%Y",
  "month": "%b",
  "day": "%a",
  "hours": "%H",
}


class ChartModel(BaseModel):
  fields: tuple[FieldModel, ...] = Field(default_factory=tuple)
  spec: Any = Field(default_factory=dict)
  title: str = Field(default="")
  description: str = Field(default="")

  preferred: bool = Field(default=False, init=False)
  timestamp: int = Field(default_factory=get_timestamp, init=False)

  attributes: tuple[str, ...] = Field(default_factory=tuple, init=False)
  key: str = Field(default="", init=False, repr=False)

  time_unit: str | None = Field(default=None)

  model_config = DefaultConfig

  @model_validator(mode="after")
  def after(self) -> Self:
    self.attributes = tuple([field.name for field in self.fields])
    self.key = f"chart-{str([field for field in self.attributes])}-{self.timestamp}"
    self.title = " & ".join([field.name for field in self.fields])

    if "datetime" in [field.type for field in self.fields]:
      datetimefield = [field for field in self.fields if field.type == "datetime"][0]
      metadata = cast("MetadataDatetime", datetimefield.metadata)
      self.time_unit = ["year", "month", "day", "hours"][
        argmax(
          [
            metadata.year_unique,
            metadata.month_unique,
            metadata.day_unique,
            metadata.hours_unique,
          ]
        )
      ]

      self.spec = {
        **self.spec,
        "config": {
          **self.spec.get("config", {}),
          "axisTemporal": {
            "format": timeFormats[self.time_unit],
          },
        },
        "transform": [
          {
            "timeUnit": self.time_unit,
            "field": datetimefield.name,
            "as": datetimefield.name,
          },
        ],
      }

    return self

  def __hash__(self):
    return get_fields_hash(self.fields)
`,"api/models/field_model.py":`from __future__ import annotations

from typing import Literal

import pandas as pd
from api.utils import get_clingo_field_name
from pydantic import BaseModel

from .metadata_model import (
  FieldType,
  MetadataBase,
  MetadataCategorical,
  MetadataDatetime,
  MetadataModel,
  MetadataNumeric,
)
from .model_config import DefaultConfig

# warnings.filterwarnings("ignore")


def get_series_and_type(series: pd.Series) -> tuple[pd.Series, FieldType]:
  if pd.api.types.is_numeric_dtype(series):
    return series, "numeric"

  if pd.api.types.is_datetime64_any_dtype(series):
    return series, "datetime"

  try:
    return pd.to_datetime(series, errors="raise", format="mixed"), "datetime"
  except Exception:
    if series.nunique() > 10:
      return series, "name"

    return series, "categorical"


def get_field_metadata(series: pd.Series, type: FieldType) -> MetadataModel:
  if type == "numeric":
    return MetadataNumeric(
      type=type,
      count=len(series),
      unique=series.nunique(),
      missing=series.isnull().sum(),
      min=series.min(),
      max=series.max(),
      mean=series.mean(),
      median=series.median(),
      std=series.std(),
    )

  if type == "categorical":
    return MetadataCategorical(
      type=type,
      count=len(series),
      unique=series.nunique(),
      missing=series.isnull().sum(),
      top=str(series.mode().iloc[0]),
      freq=int(series.value_counts().iloc[0]),
    )

  if type == "datetime":
    return MetadataDatetime(
      type=type,
      count=len(series),
      unique=series.nunique(),
      missing=series.isnull().sum(),
      min=str(series.min()),
      max=str(series.max()),
      year_unique=series.dt.year.nunique(),
      month_unique=series.dt.month.nunique(),
      day_unique=series.dt.day.nunique(),
      hours_unique=series.dt.hour.nunique(),
    )

  return MetadataBase(
    type=type,
    count=len(series),
    unique=series.nunique(),
    missing=series.isnull().sum(),
  )


class FieldModel(BaseModel):
  name: str
  type: FieldType
  clingo_name: str
  metadata: MetadataModel

  model_config = DefaultConfig

  @classmethod
  def from_dataframe(cls, df: pd.DataFrame, name: str):
    series, series_type = get_series_and_type(df[name])
    metadata = get_field_metadata(series, series_type)
    clingo_name = get_clingo_field_name(name)
    series = series.rename(clingo_name)
    df[name] = series

    return cls(
      name=name,
      type=series_type,
      clingo_name=clingo_name,
      metadata=metadata,
    )

  @property
  def scale(self) -> Literal["ordinal", "categorical", "linear"] | None:
    if self.type == "numeric" and self.metadata.unique < 30:
      return "ordinal"
    if self.type == "categorical":
      return "categorical"
    return None

  def __hash__(self) -> int:
    return hash(self.name)
`,"api/models/metadata_model.py":`from typing import Literal

from api.models.model_config import DefaultConfig
from pydantic import BaseModel

FieldType = (
  Literal["categorical"]
  | Literal["categorical"]
  | Literal["datetime"]
  | Literal["numeric"]
  | Literal["name"]
)


class MetadataBase(BaseModel):
  type: FieldType
  count: int
  unique: int
  missing: int

  model_config = DefaultConfig


class MetadataNumeric(MetadataBase):
  type: FieldType = "numeric"
  min: float
  max: float
  mean: float
  median: float
  std: float


class MetadataCategorical(MetadataBase):
  type: FieldType = "categorical"
  top: str
  freq: int


class MetadataDatetime(MetadataBase):
  type: FieldType = "datetime"
  min: str
  max: str

  year_unique: int
  month_unique: int
  day_unique: int
  hours_unique: int


class MetadataName(MetadataBase):
  type: FieldType = "name"


MetadataModel = (
  MetadataBase | MetadataNumeric | MetadataCategorical | MetadataDatetime | MetadataName
)
`,"api/models/model_config.py":`from pydantic import ConfigDict
from pydantic.alias_generators import to_camel

DefaultConfig = ConfigDict(
  alias_generator=to_camel,
  populate_by_name=True,
  from_attributes=True,
  arbitrary_types_allowed=True,
)
`,"api/models/session_model.py":`from __future__ import annotations

from functools import cached_property
from pathlib import Path
from typing import Self

import pandas as pd
from api.utils import (
  get_clingo_field_name,
  get_file_extension,
  get_timestamp,
)
from api.utils.chart import check_fields
from pydantic import BaseModel, Field, model_validator

from .chart_model import ChartModel
from .field_model import FieldModel
from .model_config import DefaultConfig


class SessionModel(BaseModel):
  filename: str = Field(default="")
  df: pd.DataFrame = Field(default=None, repr=False, exclude=True, init=False)  # type: ignore
  timestamp: int = Field(default_factory=get_timestamp, init=False)
  charts: list["ChartModel"] = Field(default_factory=list, init=False)
  fields: list["FieldModel"] = Field(default_factory=list, init=False)

  model_config = DefaultConfig

  @model_validator(mode="after")
  def prosess_df(self) -> Self:
    if self.filename == "":
      return self

    if self.df is None:
      extension = get_file_extension(self.filename)
      self.df = getattr(pd, f"read_{extension}")(Path("data", self.filename))
      self.df = self.df if len(self.df) <= 5000 else self.df.sample(5000)
    self.fields = [FieldModel.from_dataframe(self.df, name) for name in self.df.columns]
    self.df.rename(columns=get_clingo_field_name, inplace=True)

    return self

  def get_attributes(self) -> list[tuple]:
    return [chart.attributes for chart in self.charts]

  @cached_property
  def available_fields(self) -> list[tuple[FieldModel, ...]]:
    len_1_fields = [(field,) for field in self.fields if field.type != "name"]

    len_2_fields = [
      (*field1, *field2)
      for i, field1 in enumerate(len_1_fields)
      for field2 in len_1_fields[i + 1 :]
    ]

    len_3_fields = [
      (*positional_fields, *extra_field)
      for positional_fields in len_2_fields
      for extra_field in len_1_fields
      if extra_field[0] not in positional_fields
    ]
    fields = [*len_1_fields, *len_2_fields, *len_3_fields]

    fields = [f for f in fields if check_fields(self.df, f)]
    return fields

  @cached_property
  def visualizable_fields(self) -> list[FieldModel]:
    return [field for field in self.fields if field.type != "name"]
`,"api/services/__init__.py":`from .browse_charts import browse_charts
from .get_chart import get_chart
from .get_next_chart import get_next_chart

__all__ = ["get_chart", "browse_charts", "get_next_chart"]
`,"api/services/browse_charts.py":`from api.models import ChartModel, SessionModel

from .get_chart import get_chart


def browse_charts(state: SessionModel, field_names: list[str]) -> list[ChartModel]:
  if not (field_names and (0 < len(field_names) <= 3)):
    raise ValueError("Invalid number of fields to browse")

  browsed_fields = [
    field_tuple
    for field_tuple in state.available_fields
    if len(field_tuple) <= (len(field_names) + 1)
    if all(field_name in [f.name for f in field_tuple] for field_name in field_names)
  ]

  browsed_fields = sorted(browsed_fields, key=lambda field_tuple: len(field_tuple))
  charts = [get_chart(state.df, fields) for fields in browsed_fields]
  return [chart for chart in charts if chart]
`,"api/services/get_chart.py":`from __future__ import annotations

import pandas as pd
from api.models import ChartModel, FieldModel
from api.utils import get_spec

chart_cache: dict[tuple[FieldModel, ...], ChartModel] = {}


def get_chart(df: pd.DataFrame, fields: tuple[FieldModel, ...]) -> ChartModel | None:
  if fields in chart_cache:
    cached_chart = chart_cache[fields]
    return ChartModel(fields=fields, spec=cached_chart.spec) if cached_chart else None

  # facts = get_facts_from_fields(df, fields)
  # specs = get_specs_from_facts(df, facts)
  spec = get_spec(df, fields)
  chart = ChartModel(fields=fields, spec=spec) if spec else None
  if chart:
    chart_cache[fields] = chart
  return chart
`,"api/services/get_facts.py":`import draco
import pandas as pd
from api.models import FieldModel
from api.utils import rescale_field_to_32bit


def _get_base_facts() -> list[str]:
  return [
    "entity(view,root,v0).",
    "entity(mark,v0,m0).",
    ":- {entity(encoding,_,_)} > 3.",
    # Exclude tick mark
    ":- attribute((mark,type),m0, tick).",
    # Exclude Faceted Chart
    ":- {entity(facet,_,_)} > 0.",
    "attribute(task,root,summary).",
  ]


def _get_attribute_facts(df: pd.DataFrame, fields: tuple["FieldModel", ...]) -> list[str]:
  base_scheme = draco.schema_from_dataframe(df[[f.clingo_name for f in fields]])
  base_scheme = {
    **base_scheme,
    "field": [rescale_field_to_32bit(f) for f in base_scheme["field"]],
  }
  return draco.dict_to_facts(base_scheme)


def _get_encoding_facts(fields: tuple["FieldModel", ...]) -> list[str]:
  return [
    f
    for i, (field, channel) in enumerate(zip(fields, ["x", "y", "color"]))
    for f in [
      f"entity(encoding,m0,e{i}).",
      f"attribute((encoding,field),e{i},{field.clingo_name}).",
      f"attribute((encoding,channel),e{i},{channel}).",
      # no bin if field type is datetime
      f":- attribute((encoding,binning),e{i},_)." if field.type == "datetime" else None,
      f"entity(scale,v0,s{i})." if field.scale and field.type != "datetime" else None,
      f"attribute((scale,channel),s{i},{channel})."
      if field.scale and field.type != "datetime"
      else None,
      f"attribute((scale,type),s{i},{'ordinal' if channel in ['x', 'y'] else field.scale})."
      if field.scale and field.type != "datetime"
      else None,
    ]
    if f is not None
  ]


def get_facts_from_fields(df: pd.DataFrame, fields: tuple["FieldModel", ...]) -> list[str]:
  return _get_base_facts() + _get_attribute_facts(df, fields) + _get_encoding_facts(fields)
`,"api/services/get_next_chart.py":`from __future__ import annotations

from random import choice
from typing import TypeVar

import numpy as np
from api.models import ChartModel, FieldModel, SessionModel
from api.services import get_chart
from api.utils import (
  find_last_index,
  get_fields_hash,
  sample,
)

T = TypeVar("T")


def relevance_score(session: SessionModel, fields: tuple[FieldModel, ...]) -> float:
  if len(fields) == 1:
    return 0.5

  recent_fields = set()

  for chart in session.charts[::-1][:5]:
    recent_fields.update(chart.fields)

  return len(set(fields) & recent_fields) / len(fields)


def preference_score(session: SessionModel, fields: tuple[FieldModel, ...]) -> float:
  preferred_charts = [chart for chart in session.charts[::-1][:5] if chart.preferred]
  preferred_scores = [
    len(set(fields) & set(chart.fields)) / len(fields) for chart in preferred_charts
  ]
  return sum(preferred_scores) / len(preferred_charts) if preferred_charts else 0


def simplicity_score(session: SessionModel, fields: tuple[FieldModel, ...]) -> float:
  return 1 - len(fields) / 3


def freshness_score(session: SessionModel, fields: tuple[FieldModel, ...]) -> float:
  n_fields = len(session.fields)
  last_index = find_last_index(
    session.charts, lambda c: get_fields_hash(c.fields) == get_fields_hash(fields)
  )

  if last_index == -1:
    return 1.0

  n_uni_and_bivariate = n_fields + (
    n_fields * (n_fields - 1) / 2
  )  # Univariate 차트 수 + Bivariate 차트 수

  return min((len(session.charts) - last_index) / n_uni_and_bivariate, 1)


score_weight = [
  1,  # relevance
  2,  # preference
  3,  # freshness
  2,  # simplicity
]


def get_score(vector: np.ndarray, field_vector: np.ndarray) -> float:
  return float(np.sum(vector * field_vector) / np.sum(field_vector))


def get_next_chart(session: SessionModel) -> ChartModel | None:
  if not session.charts:
    field = sample(session.visualizable_fields)
    return get_chart(session.df, (field,))

  if not session.available_fields:
    return None

  def get_score(fields: tuple[FieldModel, ...]) -> float:
    scores = [
      f(session, fields)
      for f in (relevance_score, preference_score, freshness_score, simplicity_score)
    ]
    return sum(w * s for w, s in zip(score_weight, scores))

  fields_and_scores = [(fields, get_score(fields)) for fields in session.available_fields]

  max_score = max(score for _, score in fields_and_scores)

  top_fields = [fields for fields, score in fields_and_scores if score == max_score]

  selected_fields = choice(top_fields)

  chart = get_chart(session.df, selected_fields)
  return chart
`,"api/services/get_specs.py":`from typing import Any, Iterable

import altair as alt
import draco
import pandas as pd
from api.utils import replace_clingo_field_name
from clingo import Symbol
from draco.renderer import AltairRenderer

drc = draco.Draco()
renderer = AltairRenderer()

SpecModel = dict[str, Any]


def _clean_spec(spec: SpecModel) -> SpecModel:
  return {k: v for k, v in spec.items() if k not in ["data", "datasets", "$schema"]}


def _answer_set_to_spec(answer_set: Iterable[Symbol], df: pd.DataFrame) -> dict:
  answer_dict = draco.answer_set_to_dict(answer_set)
  chart: alt.Chart = renderer.render(spec=dict(answer_dict), data=df)
  vega = chart.to_dict()
  return _clean_spec(vega)


def get_specs_from_facts(
  df: pd.DataFrame,
  facts: list[str],
  num: int = 5,
):
  specs = [_answer_set_to_spec(model.answer_set, df) for model in drc.complete_spec(facts, num)]
  return [replace_clingo_field_name(spec) for spec in specs]
`,"api/utils/__init__.py":`from .chart import check_fields, get_spec
from .decorators import df_required, exception_handler
from .field_hash import get_fields_hash
from .field_name import (
  get_clingo_field_name,
  get_original_field_name,
  replace_clingo_field_name,
)
from .file_extension import get_file_extension
from .find import find, find_index, find_last_index, find_right
from .rescaler import rescale_field_to_32bit
from .sample import sample
from .statistics import (
  has_categorical_categorical_stat,
  has_numeric_categorical_stat,
  has_numeric_datetime_stat,
  has_numeric_numeric_stat,
)
from .timestamp import get_timestamp

__all__ = [
  "df_required",
  "exception_handler",
  "find",
  "find_index",
  "rescale_field_to_32bit",
  "get_clingo_field_name",
  "get_original_field_name",
  "replace_clingo_field_name",
  "get_file_extension",
  "get_timestamp",
  "rescale_field_to_32bit",
  "has_categorical_categorical_stat",
  "has_numeric_categorical_stat",
  "has_numeric_datetime_stat",
  "has_numeric_numeric_stat",
  "find_last_index",
  "find_right",
  "get_fields_hash",
  "sample",
  "get_spec",
  "check_fields",
]
`,"api/utils/chart.py":`from __future__ import annotations

from typing import TYPE_CHECKING, Any, Optional

import pandas as pd

if TYPE_CHECKING:
  from api.models import ChartModel, FieldModel

from api.charts import chart_map
from api.utils.field_name import replace_clingo_field_name

chart_cache: dict[tuple["FieldModel", ...], "ChartModel"] = {}
SpecModel = dict[str, Any]


def _clean_spec(spec: SpecModel) -> SpecModel:
  return {k: v for k, v in spec.items() if k not in ["data", "datasets", "$schema"]}


def get_spec(df: pd.DataFrame, fields: tuple["FieldModel", ...]) -> Optional["ChartModel"]:
  key = "_".join([f.type for f in fields])
  try:
    if key in chart_map:
      spec = replace_clingo_field_name(_clean_spec(chart_map[key](df, fields).to_dict()))
      return spec
  except ValueError as V:
    print(key)
    print(V)
  except KeyError as K:
    print(key)
    print(K)

  return None


def check_fields(df: pd.DataFrame, fields: tuple["FieldModel", ...]) -> bool:
  key = "_".join([f.type for f in fields])
  if key in chart_map:
    return True
  return False
`,"api/utils/decorators.py":`from functools import wraps


def df_required(func):
  @wraps(func)
  def wrapper(self, *args, **kwargs):
    if self.df is None:
      raise ValueError("DataFrame (df) is required for this operation")
    return func(self, *args, **kwargs)

  return wrapper


def exception_handler(default_return=None):
  def decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
      try:
        return func(*args, **kwargs)
      except Exception as e:
        print(e)
        return default_return

    return wrapper

  return decorator
`,"api/utils/field_hash.py":`from typing import TYPE_CHECKING, Sequence

if TYPE_CHECKING:
  from api.models import FieldModel


def get_fields_hash(fields: Sequence["FieldModel"]) -> int:
  names = tuple(field.name for field in fields)
  if len(names) == 1:
    return hash(names)
  if len(names) == 2:
    return hash(names[0]) + hash(names[1])
  if len(names) == 3:
    return hash(hash(names[0]) + hash(names[1])) + hash(names[2])
  return 0
`,"api/utils/field_name.py":`from __future__ import annotations

import uuid
from typing import Any, overload

id_to_name: dict[str, str] = {}
name_to_id: dict[str, str] = {}


@overload
def get_clingo_field_name(field_name: str) -> str: ...


@overload
def get_clingo_field_name(field_name: list[str]) -> list[str]: ...


def get_clingo_field_name(field_name: str | list[str]) -> str | list[str]:
  if isinstance(field_name, list):
    return [get_clingo_field_name(f) for f in field_name]

  if field_name in id_to_name:
    return field_name

  if field_name in name_to_id:
    return name_to_id[field_name]

  id = str(uuid.uuid4())[:8]

  id_to_name[id] = field_name
  name_to_id[field_name] = id
  return id


def get_original_field_name(clingo_field_name: Any) -> Any:
  if not isinstance(clingo_field_name, str):
    return clingo_field_name
  if clingo_field_name in id_to_name:
    return id_to_name[clingo_field_name]
  else:
    return clingo_field_name


def replace_clingo_field_name(clingo_field_name: Any) -> Any:
  if isinstance(clingo_field_name, dict):
    return {k: replace_clingo_field_name(v) for k, v in clingo_field_name.items()}
  elif isinstance(clingo_field_name, list):
    return [replace_clingo_field_name(v) for v in clingo_field_name]
  else:
    return get_original_field_name(clingo_field_name)
`,"api/utils/file_extension.py":`def get_file_extension(filename: str) -> str:
  return filename.split(".")[-1]
`,"api/utils/find.py":`from __future__ import annotations

from typing import Callable, TypeVar

T = TypeVar("T")


def find(lst: list[T], predicate: Callable[[T], bool]) -> T | None:
  return next((x for x in lst if predicate(x)), None)


def find_right(lst: list[T], predicate: Callable[[T], bool]) -> T | None:
  return next((x for x in reversed(lst) if predicate(x)), None)


def find_index(lst: list[T], predicate: Callable[[T], bool]) -> int:
  return next((i for i, x in enumerate(lst) if predicate(x)), -1)


def find_last_index(lst: list[T], predicate: Callable[[T], bool]) -> int:
  return next((i for i, x in reversed(list(enumerate(lst))) if predicate(x)), -1)
`,"api/utils/rescaler.py":`from __future__ import annotations

from math import log
from typing import Literal, TypeAlias, TypedDict

# Field types recognized by a Draco schema.
FieldType: TypeAlias = Literal["number", "string", "boolean", "datetime"]


class BaseFieldProps(TypedDict):
  """Properties shared by fields of all types in a \`Schema\`."""

  name: str
  type: FieldType
  unique: int
  entropy: float


class NumberFieldProps(BaseFieldProps):
  """Properties of a \`number\` field in a \`Schema\`."""

  min: int
  max: int
  std: int


class StringFieldProps(BaseFieldProps):
  """Properties of a \`string\` field in a \`Schema\`."""

  freq: int


# Union of supported field properties.
FieldProps = NumberFieldProps | StringFieldProps | BaseFieldProps

MAX_32BIT = 2**31 - 1


def rescale_field_to_32bit(data: FieldProps):
  new_data = data.copy()

  if (
    "max" in new_data
    and "min" in new_data
    and "std" in new_data
    and "entropy" in new_data
    and new_data["max"] > MAX_32BIT
  ):
    scale_factor = 1 / (10 * new_data["max"] / MAX_32BIT)  # type: ignore

    new_data["max"] = (
      int(new_data["max"] * scale_factor)
      if isinstance(new_data["max"], (int, float))
      else new_data["max"]
    )
    new_data["min"] = (
      int(new_data["min"] * scale_factor)
      if isinstance(new_data["min"], (int, float))
      else new_data["min"]
    )
    new_data["std"] = (
      int(new_data["std"] * scale_factor)
      if isinstance(new_data["std"], (int, float))
      else new_data["std"]
    )

    new_data["entropy"] = (
      int(new_data["entropy"] + log(scale_factor) * 1000)
      if isinstance(new_data["entropy"], (int, float))
      else new_data["entropy"]
    )

  return new_data
`,"api/utils/sample.py":`from __future__ import annotations

from typing import Sequence, TypeVar

from numpy.random import choice

T = TypeVar("T")


def sample(targets: Sequence[T], p: Sequence[float] | None = None) -> T:
  if not p:
    p = [1 / len(targets)] * len(targets)

  return targets[choice(len(targets), 1, p=p)[0]]
`,"api/utils/statistics.py":`from functools import wraps
from typing import cast

import numpy as np
import pandas as pd
from scipy.stats import chi2_contingency, f_oneway, pearsonr, t


class Result:
  statistic: float
  pvalue: float


def cache(func):
  cache = {}

  @wraps(func)
  def wrapper(*args):
    key = tuple(id(arg) if isinstance(arg, pd.Series) else arg for arg in args)

    if key not in cache:
      cache[key] = func(*args)
    return cache[key]

  return wrapper


@cache
def has_numeric_numeric_stat(series1: pd.Series, series2: pd.Series) -> float:
  valid_data = pd.concat([series1, series2], axis=1).dropna()
  if len(valid_data) < 2:
    return 0
  res = cast(Result, pearsonr(valid_data.iloc[:, 0], valid_data.iloc[:, 1]))
  return 1.0 if res.pvalue < 0.05 else 0.0


@cache
def has_numeric_categorical_stat(numeric_series: pd.Series, categorical_series: pd.Series) -> float:
  valid_data = pd.concat([numeric_series, categorical_series], axis=1).dropna()
  if len(valid_data) == 0:
    return 0
  numeric_series = valid_data.iloc[:, 0]
  categorical_series = valid_data.iloc[:, 1]

  groups = [
    numeric_series[categorical_series == category] for category in categorical_series.unique()
  ]
  groups = [group for group in groups if len(group) > 0]

  if len(groups) < 2:
    return 0

  res = cast(Result, f_oneway(*groups))
  return 1.0 if res.pvalue < 0.05 else 0.0


@cache
def has_numeric_datetime_stat(numeric_series: pd.Series, datetime_series: pd.Series) -> float:
  valid_data = pd.concat([numeric_series, datetime_series], axis=1).dropna()
  if len(valid_data) < 2:
    return 0
  numeric_series = valid_data.iloc[:, 0]
  datetime_series = valid_data.iloc[:, 1]

  sorted_indices = datetime_series.sort_values().index
  sorted_numeric = numeric_series.loc[sorted_indices]

  autocorr = sorted_numeric.autocorr()

  n = len(sorted_numeric)
  se = 1 / np.sqrt(n)  # 표준 오차
  t_statistic = autocorr / se

  pvalue = 1.96 * (1 - t.cdf(abs(t_statistic), df=n - 2))

  return 1.0 if pvalue < 0.05 else 0.0


@cache
def has_categorical_categorical_stat(series1: pd.Series, series2: pd.Series) -> float:
  valid_data = pd.concat([series1, series2], axis=1).dropna()
  if len(valid_data) == 0:
    return 0
  series1 = valid_data.iloc[:, 0]
  series2 = valid_data.iloc[:, 1]

  contingency_table = pd.crosstab(series1, series2)
  if contingency_table.size == 0 or contingency_table.values.min() == 0:
    return 0

  res = cast(Result, chi2_contingency(contingency_table))
  return 1.0 if res.pvalue < 0.05 else 0.0
`,"api/utils/timestamp.py":`import time


def get_timestamp():
  return int(time.time() * 1000)
`};for(const[i,a]of Object.entries(n)){const s=i.split("/").slice(0,-1);let r="";for(const t of s){r=r?`${r}/${t}`:t;try{e.FS.mkdir(r)}catch{}}e.FS.writeFile(i,a)}}async function nn(e){await e.runPythonAsync(`from __future__ import annotations

from typing import Any

from api.models import ChartModel, SessionModel
from api.services import browse_charts, get_chart, get_next_chart

sessions: dict[str, SessionModel] = {"default": SessionModel()}


def getSession(session_key: str = "default") -> SessionModel:
  if session_key not in sessions:
    sessions[session_key] = SessionModel()
  return sessions[session_key]


def setSession(session: SessionModel, session_key: str = "default") -> None:
  sessions[session_key] = session


def loadSession(session: dict[str, Any] | SessionModel, session_key: str = "default"):
  if isinstance(session, dict):
    session = SessionModel.model_validate(session)

  new_session = SessionModel(filename=session.filename)
  new_session.charts = session.charts
  new_session.timestamp = session.timestamp

  if len(new_session.charts) == 0:
    chart = get_next_chart(new_session)
    new_session.charts.append(chart) if chart else None
    chart = get_next_chart(new_session)
    new_session.charts.append(chart) if chart else None

  setSession(new_session, session_key)
  return new_session.model_dump(by_alias=True, mode="json")


def appendChart(chart: dict[str, Any] | ChartModel, session_key: str = "default"):
  session = getSession(session_key)
  if isinstance(chart, dict):
    chart = ChartModel.model_validate(chart)
  session.charts.append(chart)
  return session.model_dump(by_alias=True, mode="json")


def appendNextChart(session_key: str = "default"):
  session = getSession(session_key)
  chart = get_next_chart(session)
  session.charts.append(chart) if chart else None
  return chart.model_dump(by_alias=True, mode="json") if chart else None


def browseCharts(field_names: list[str], session_key: str = "default"):
  session = getSession(session_key)
  browsed_chart = browse_charts(session, field_names)
  return [chart.model_dump(by_alias=True, mode="json") for chart in browsed_chart]


def getCharts(field_names: list[str], session_key: str = "default"):
  session = getSession(session_key)
  fields = [
    field for field in session.available_fields if set(field_names) == set([f.name for f in field])
  ]
  charts = [get_chart(session.df, field) for field in fields]
  return [chart.model_dump(by_alias=True, mode="json") for chart in charts if chart]


def setPreferred(key: str, preferred: bool, session_key: str = "default"):
  session = getSession(session_key)
  chart = next((chart for chart in session.charts if chart.key == key), None)
  if chart:
    chart.preferred = preferred
    return chart.model_dump(by_alias=True, mode="json")
  else:
    return None
`)}const tn={pyodide:null,async writeFile(e,n){try{if(!this.pyodide)throw new Error("Pyodide is not initialized");this.pyodide.FS.mkdir("data"),this.pyodide.FS.writeFile(`data/${e}`,n,{encoding:"binary",flags:"w"})}catch(i){throw console.error(i),i}},async readFile(e){try{if(!this.pyodide)throw new Error("Pyodide is not initialized");return this.pyodide.FS.readFile(`${e}`,{encoding:"utf-8"})}catch(n){throw console.error(n),n}},async initialize(e=[]){this.pyodide=await we({indexURL:"/Swipytics/artifacts"});for(const n of e)await this.pyodide.loadPackage(n);await en(this.pyodide);try{await nn(this.pyodide)}catch(n){console.error(n)}},terminate(){if(this.pyodide){const e=new Uint8Array(new SharedArrayBuffer(1));e[0]=2,this.pyodide.setInterruptBuffer(e),this.pyodide=null}},async runPython(e,n={}){if(!this.pyodide)throw new Error("Pyodide is not initialized");const i=this.pyodide.globals.get("dict")();for(const[a,s]of Object.entries(n))i.set(a,s);return this.pyodide.runPython(e,{globals:i})},async callPythonFunction(e,n){if(!this.pyodide)throw new Error("Pyodide is not initialized");const i=this.pyodide.globals.get(e);if(!i)throw new Error(`Function ${e} is not defined in globals`);const a=this.pyodide.toPy(n),s=i.call(i,...a),r=s==null?void 0:s.toJs({dict_converter:Object.fromEntries,depth:1e5});return a.destroy(),s.destroy(),r}};q(tn)});export default rn();
