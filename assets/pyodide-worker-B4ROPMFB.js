var Oe=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var ot=Oe((lt,j)=>{/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const V=Symbol("Comlink.proxy"),Fe=Symbol("Comlink.endpoint"),xe=Symbol("Comlink.releaseProxy"),D=Symbol("Comlink.finalizer"),E=Symbol("Comlink.thrown"),B=e=>typeof e=="object"&&e!==null||typeof e=="function",Pe={canHandle:e=>B(e)&&e[V],serialize(e){const{port1:t,port2:i}=new MessageChannel;return M(e,t),[i,[i]]},deserialize(e){return e.start(),De(e)}},Ne={canHandle:e=>B(e)&&E in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},G=new Map([["proxy",Pe],["throw",Ne]]);function Le(e,t){for(const i of e)if(t===i||i==="*"||i instanceof RegExp&&i.test(t))return!0;return!1}function M(e,t=globalThis,i=["*"]){t.addEventListener("message",function a(o){if(!o||!o.data)return;if(!Le(i,o.origin)){console.warn(`Invalid origin '${o.origin}' for comlink proxy`);return}const{id:r,type:n,path:l}=Object.assign({path:[]},o.data),s=(o.data.argumentList||[]).map(b);let f;try{const c=l.slice(0,-1).reduce((u,_)=>u[_],e),d=l.reduce((u,_)=>u[_],e);switch(n){case"GET":f=d;break;case"SET":c[l.slice(-1)[0]]=b(o.data.value),f=!0;break;case"APPLY":f=d.apply(c,s);break;case"CONSTRUCT":{const u=new d(...s);f=je(u)}break;case"ENDPOINT":{const{port1:u,port2:_}=new MessageChannel;M(e,_),f=Ce(u,[u])}break;case"RELEASE":f=void 0;break;default:return}}catch(c){f={value:c,[E]:0}}Promise.resolve(f).catch(c=>({value:c,[E]:0})).then(c=>{const[d,u]=P(c);t.postMessage(Object.assign(Object.assign({},d),{id:r}),u),n==="RELEASE"&&(t.removeEventListener("message",a),J(t),D in e&&typeof e[D]=="function"&&e[D]())}).catch(c=>{const[d,u]=P({value:new TypeError("Unserializable return value"),[E]:0});t.postMessage(Object.assign(Object.assign({},d),{id:r}),u)})}),t.start&&t.start()}function Re(e){return e.constructor.name==="MessagePort"}function J(e){Re(e)&&e.close()}function De(e,t){return A(e,[],t)}function k(e){if(e)throw new Error("Proxy has been released and is not useable")}function Y(e){return v(e,{type:"RELEASE"}).then(()=>{J(e)})}const F=new WeakMap,x="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const t=(F.get(e)||0)-1;F.set(e,t),t===0&&Y(e)});function $e(e,t){const i=(F.get(t)||0)+1;F.set(t,i),x&&x.register(e,t,e)}function Ae(e){x&&x.unregister(e)}function A(e,t=[],i=function(){}){let a=!1;const o=new Proxy(i,{get(r,n){if(k(a),n===xe)return()=>{Ae(o),Y(e),a=!0};if(n==="then"){if(t.length===0)return{then:()=>o};const l=v(e,{type:"GET",path:t.map(s=>s.toString())}).then(b);return l.then.bind(l)}return A(e,[...t,n])},set(r,n,l){k(a);const[s,f]=P(l);return v(e,{type:"SET",path:[...t,n].map(c=>c.toString()),value:s},f).then(b)},apply(r,n,l){k(a);const s=t[t.length-1];if(s===Fe)return v(e,{type:"ENDPOINT"}).then(b);if(s==="bind")return A(e,t.slice(0,-1));const[f,c]=q(l);return v(e,{type:"APPLY",path:t.map(d=>d.toString()),argumentList:f},c).then(b)},construct(r,n){k(a);const[l,s]=q(n);return v(e,{type:"CONSTRUCT",path:t.map(f=>f.toString()),argumentList:l},s).then(b)}});return $e(o,e),o}function Te(e){return Array.prototype.concat.apply([],e)}function q(e){const t=e.map(P);return[t.map(i=>i[0]),Te(t.map(i=>i[1]))]}const K=new WeakMap;function Ce(e,t){return K.set(e,t),e}function je(e){return Object.assign(e,{[V]:!0})}function P(e){for(const[t,i]of G)if(i.canHandle(e)){const[a,o]=i.serialize(e);return[{type:"HANDLER",name:t,value:a},o]}return[{type:"RAW",value:e},K.get(e)||[]]}function b(e){switch(e.type){case"HANDLER":return G.get(e.name).deserialize(e.value);case"RAW":return e.value}}function v(e,t,i){return new Promise(a=>{const o=Me();e.addEventListener("message",function r(n){!n.data||!n.data.id||n.data.id!==o||(e.removeEventListener("message",r),a(n.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:o},t),i)})}function Me(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}var Ie=Object.create,I=Object.defineProperty,ze=Object.getOwnPropertyDescriptor,Ue=Object.getOwnPropertyNames,He=Object.getPrototypeOf,We=Object.prototype.hasOwnProperty,p=(e,t)=>I(e,"name",{value:t,configurable:!0}),X=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,i)=>(typeof require<"u"?require:t)[i]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')}),Q=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),qe=(e,t,i,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Ue(t))!We.call(e,o)&&o!==i&&I(e,o,{get:()=>t[o],enumerable:!(a=ze(t,o))||a.enumerable});return e},Ve=(e,t,i)=>(i=e!=null?Ie(He(e)):{},qe(!e||!e.__esModule?I(i,"default",{value:e,enumerable:!0}):i,e)),Be=Q((e,t)=>{(function(i,a){typeof define=="function"&&define.amd?define("stackframe",[],a):typeof e=="object"?t.exports=a():i.StackFrame=a()})(e,function(){function i(m){return!isNaN(parseFloat(m))&&isFinite(m)}p(i,"_isNumber");function a(m){return m.charAt(0).toUpperCase()+m.substring(1)}p(a,"_capitalize");function o(m){return function(){return this[m]}}p(o,"_getter");var r=["isConstructor","isEval","isNative","isToplevel"],n=["columnNumber","lineNumber"],l=["fileName","functionName","source"],s=["args"],f=["evalOrigin"],c=r.concat(n,l,s,f);function d(m){if(m)for(var y=0;y<c.length;y++)m[c[y]]!==void 0&&this["set"+a(c[y])](m[c[y]])}p(d,"StackFrame"),d.prototype={getArgs:function(){return this.args},setArgs:function(m){if(Object.prototype.toString.call(m)!=="[object Array]")throw new TypeError("Args must be an Array");this.args=m},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(m){if(m instanceof d)this.evalOrigin=m;else if(m instanceof Object)this.evalOrigin=new d(m);else throw new TypeError("Eval Origin must be an Object or StackFrame")},toString:function(){var m=this.getFileName()||"",y=this.getLineNumber()||"",w=this.getColumnNumber()||"",S=this.getFunctionName()||"";return this.getIsEval()?m?"[eval] ("+m+":"+y+":"+w+")":"[eval]:"+y+":"+w:S?S+" ("+m+":"+y+":"+w+")":m+":"+y+":"+w}},d.fromString=p(function(m){var y=m.indexOf("("),w=m.lastIndexOf(")"),S=m.substring(0,y),ve=m.substring(y+1,w).split(","),W=m.substring(w+1);if(W.indexOf("@")===0)var R=/@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(W,""),Se=R[1],ke=R[2],Ee=R[3];return new d({functionName:S,args:ve||void 0,fileName:Se,lineNumber:ke||void 0,columnNumber:Ee||void 0})},"StackFrame$$fromString");for(var u=0;u<r.length;u++)d.prototype["get"+a(r[u])]=o(r[u]),d.prototype["set"+a(r[u])]=function(m){return function(y){this[m]=!!y}}(r[u]);for(var _=0;_<n.length;_++)d.prototype["get"+a(n[_])]=o(n[_]),d.prototype["set"+a(n[_])]=function(m){return function(y){if(!i(y))throw new TypeError(m+" must be a Number");this[m]=Number(y)}}(n[_]);for(var g=0;g<l.length;g++)d.prototype["get"+a(l[g])]=o(l[g]),d.prototype["set"+a(l[g])]=function(m){return function(y){this[m]=String(y)}}(l[g]);return d})}),Ge=Q((e,t)=>{(function(i,a){typeof define=="function"&&define.amd?define("error-stack-parser",["stackframe"],a):typeof e=="object"?t.exports=a(Be()):i.ErrorStackParser=a(i.StackFrame)})(e,p(function(i){var a=/(^|@)\S+:\d+/,o=/^\s*at .*(\S+:\d+|\(native\))/m,r=/^(eval@)?(\[native code])?$/;return{parse:p(function(n){if(typeof n.stacktrace<"u"||typeof n["opera#sourceloc"]<"u")return this.parseOpera(n);if(n.stack&&n.stack.match(o))return this.parseV8OrIE(n);if(n.stack)return this.parseFFOrSafari(n);throw new Error("Cannot parse given Error object")},"ErrorStackParser$$parse"),extractLocation:p(function(n){if(n.indexOf(":")===-1)return[n];var l=/(.+?)(?::(\d+))?(?::(\d+))?$/,s=l.exec(n.replace(/[()]/g,""));return[s[1],s[2]||void 0,s[3]||void 0]},"ErrorStackParser$$extractLocation"),parseV8OrIE:p(function(n){var l=n.stack.split(`
`).filter(function(s){return!!s.match(o)},this);return l.map(function(s){s.indexOf("(eval ")>-1&&(s=s.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));var f=s.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),c=f.match(/ (\(.+\)$)/);f=c?f.replace(c[0],""):f;var d=this.extractLocation(c?c[1]:f),u=c&&f||void 0,_=["eval","<anonymous>"].indexOf(d[0])>-1?void 0:d[0];return new i({functionName:u,fileName:_,lineNumber:d[1],columnNumber:d[2],source:s})},this)},"ErrorStackParser$$parseV8OrIE"),parseFFOrSafari:p(function(n){var l=n.stack.split(`
`).filter(function(s){return!s.match(r)},this);return l.map(function(s){if(s.indexOf(" > eval")>-1&&(s=s.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),s.indexOf("@")===-1&&s.indexOf(":")===-1)return new i({functionName:s});var f=/((.*".+"[^@]*)?[^@]*)(?:@)/,c=s.match(f),d=c&&c[1]?c[1]:void 0,u=this.extractLocation(s.replace(f,""));return new i({functionName:d,fileName:u[0],lineNumber:u[1],columnNumber:u[2],source:s})},this)},"ErrorStackParser$$parseFFOrSafari"),parseOpera:p(function(n){return!n.stacktrace||n.message.indexOf(`
`)>-1&&n.message.split(`
`).length>n.stacktrace.split(`
`).length?this.parseOpera9(n):n.stack?this.parseOpera11(n):this.parseOpera10(n)},"ErrorStackParser$$parseOpera"),parseOpera9:p(function(n){for(var l=/Line (\d+).*script (?:in )?(\S+)/i,s=n.message.split(`
`),f=[],c=2,d=s.length;c<d;c+=2){var u=l.exec(s[c]);u&&f.push(new i({fileName:u[2],lineNumber:u[1],source:s[c]}))}return f},"ErrorStackParser$$parseOpera9"),parseOpera10:p(function(n){for(var l=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,s=n.stacktrace.split(`
`),f=[],c=0,d=s.length;c<d;c+=2){var u=l.exec(s[c]);u&&f.push(new i({functionName:u[3]||void 0,fileName:u[2],lineNumber:u[1],source:s[c]}))}return f},"ErrorStackParser$$parseOpera10"),parseOpera11:p(function(n){var l=n.stack.split(`
`).filter(function(s){return!!s.match(a)&&!s.match(/^Error created at/)},this);return l.map(function(s){var f=s.split("@"),c=this.extractLocation(f.pop()),d=f.shift()||"",u=d.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^)]*\)/g,"")||void 0,_;d.match(/\(([^)]*)\)/)&&(_=d.replace(/^[^(]+\(([^)]*)\)$/,"$1"));var g=_===void 0||_==="[arguments not available]"?void 0:_.split(",");return new i({functionName:u,args:g,fileName:c[0],lineNumber:c[1],columnNumber:c[2],source:s})},this)},"ErrorStackParser$$parseOpera11")}},"ErrorStackParser"))}),Je=Ve(Ge()),h=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string"&&typeof process.browser>"u",Z=h&&typeof j<"u"&&typeof j.exports<"u"&&typeof X<"u"&&typeof __dirname<"u",Ye=h&&!Z,Ke=typeof Deno<"u",ee=!h&&!Ke,Xe=ee&&typeof window<"u"&&typeof document<"u"&&typeof document.createElement<"u"&&typeof sessionStorage<"u",Qe=ee&&typeof importScripts<"u"&&typeof self<"u",te,N,T,ne,z,Ze=`"fetch" is not defined, maybe you're using node < 18? From Pyodide >= 0.25.0, node >= 18 is required. Older versions of Node.js may work, but it is not guaranteed or supported. Falling back to "node-fetch".`;async function U(){if(!h||(te=(await import("./__vite-browser-external-CIEyP2s7.js")).default,z=await import("./__vite-browser-external-CIEyP2s7.js"),globalThis.fetch?N=fetch:(console.warn(Ze),N=(await import("./index-B489Fav_.js")).default),ne=(await import("./__vite-browser-external-CIEyP2s7.js")).default,T=await import("./__vite-browser-external-CIEyP2s7.js"),H=T.sep,typeof X<"u"))return;let e=await import("./__vite-browser-external-CIEyP2s7.js"),t=await import("./__vite-browser-external-CIEyP2s7.js"),i=await import("./__vite-browser-external-CIEyP2s7.js"),a=await import("./__vite-browser-external-CIEyP2s7.js"),o={fs:e,crypto:t,ws:i,child_process:a};globalThis.require=function(r){return o[r]}}p(U,"initNodeModules");function re(e,t){return T.resolve(t||".",e)}p(re,"node_resolvePath");function ie(e,t){return t===void 0&&(t=location),new URL(e,t).toString()}p(ie,"browser_resolvePath");var C;h?C=re:C=ie;var H;h||(H="/");function ae(e,t){return e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?{response:N(e)}:{binary:z.readFile(e).then(i=>new Uint8Array(i.buffer,i.byteOffset,i.byteLength))}}p(ae,"node_getBinaryResponse");function oe(e,t){let i=new URL(e,location);return{response:fetch(i,t?{integrity:t}:{})}}p(oe,"browser_getBinaryResponse");var L;h?L=ae:L=oe;async function se(e,t){let{response:i,binary:a}=L(e,t);if(a)return a;let o=await i;if(!o.ok)throw new Error(`Failed to load '${e}': request failed.`);return new Uint8Array(await o.arrayBuffer())}p(se,"loadBinaryFile");var O;if(Xe)O=p(async e=>await import(e),"loadScript");else if(Qe)O=p(async e=>{try{globalThis.importScripts(e)}catch(t){if(t instanceof TypeError)await import(e);else throw t}},"loadScript");else if(h)O=le;else throw new Error("Cannot determine runtime environment");async function le(e){e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?ne.runInThisContext(await(await N(e)).text()):await import(te.pathToFileURL(e).href)}p(le,"nodeLoadScript");async function ce(e){if(h){await U();let t=await z.readFile(e);return JSON.parse(t)}else return await(await fetch(e)).json()}p(ce,"loadLockFile");async function fe(){if(Z)return __dirname;let e;try{throw new Error}catch(a){e=a}let t=Je.default.parse(e)[0].fileName;if(Ye){let a=await import("./__vite-browser-external-CIEyP2s7.js");return(await import("./__vite-browser-external-CIEyP2s7.js")).fileURLToPath(a.dirname(t))}let i=t.lastIndexOf(H);if(i===-1)throw new Error("Could not extract indexURL path from pyodide module location");return t.slice(0,i)}p(fe,"calculateDirname");function de(e){let t=e.FS,i=e.FS.filesystems.MEMFS,a=e.PATH,o={DIR_MODE:16895,FILE_MODE:33279,mount:function(r){if(!r.opts.fileSystemHandle)throw new Error("opts.fileSystemHandle is required");return i.mount.apply(null,arguments)},syncfs:async(r,n,l)=>{try{let s=o.getLocalSet(r),f=await o.getRemoteSet(r),c=n?f:s,d=n?s:f;await o.reconcile(r,c,d),l(null)}catch(s){l(s)}},getLocalSet:r=>{let n=Object.create(null);function l(c){return c!=="."&&c!==".."}p(l,"isRealDir");function s(c){return d=>a.join2(c,d)}p(s,"toAbsolute");let f=t.readdir(r.mountpoint).filter(l).map(s(r.mountpoint));for(;f.length;){let c=f.pop(),d=t.stat(c);t.isDir(d.mode)&&f.push.apply(f,t.readdir(c).filter(l).map(s(c))),n[c]={timestamp:d.mtime,mode:d.mode}}return{type:"local",entries:n}},getRemoteSet:async r=>{let n=Object.create(null),l=await et(r.opts.fileSystemHandle);for(let[s,f]of l)s!=="."&&(n[a.join2(r.mountpoint,s)]={timestamp:f.kind==="file"?(await f.getFile()).lastModifiedDate:new Date,mode:f.kind==="file"?o.FILE_MODE:o.DIR_MODE});return{type:"remote",entries:n,handles:l}},loadLocalEntry:r=>{let n=t.lookupPath(r).node,l=t.stat(r);if(t.isDir(l.mode))return{timestamp:l.mtime,mode:l.mode};if(t.isFile(l.mode))return n.contents=i.getFileDataAsTypedArray(n),{timestamp:l.mtime,mode:l.mode,contents:n.contents};throw new Error("node type not supported")},storeLocalEntry:(r,n)=>{if(t.isDir(n.mode))t.mkdirTree(r,n.mode);else if(t.isFile(n.mode))t.writeFile(r,n.contents,{canOwn:!0});else throw new Error("node type not supported");t.chmod(r,n.mode),t.utime(r,n.timestamp,n.timestamp)},removeLocalEntry:r=>{var n=t.stat(r);t.isDir(n.mode)?t.rmdir(r):t.isFile(n.mode)&&t.unlink(r)},loadRemoteEntry:async r=>{if(r.kind==="file"){let n=await r.getFile();return{contents:new Uint8Array(await n.arrayBuffer()),mode:o.FILE_MODE,timestamp:n.lastModifiedDate}}else{if(r.kind==="directory")return{mode:o.DIR_MODE,timestamp:new Date};throw new Error("unknown kind: "+r.kind)}},storeRemoteEntry:async(r,n,l)=>{let s=r.get(a.dirname(n)),f=t.isFile(l.mode)?await s.getFileHandle(a.basename(n),{create:!0}):await s.getDirectoryHandle(a.basename(n),{create:!0});if(f.kind==="file"){let c=await f.createWritable();await c.write(l.contents),await c.close()}r.set(n,f)},removeRemoteEntry:async(r,n)=>{await r.get(a.dirname(n)).removeEntry(a.basename(n)),r.delete(n)},reconcile:async(r,n,l)=>{let s=0,f=[];Object.keys(n.entries).forEach(function(u){let _=n.entries[u],g=l.entries[u];(!g||t.isFile(_.mode)&&_.timestamp.getTime()>g.timestamp.getTime())&&(f.push(u),s++)}),f.sort();let c=[];if(Object.keys(l.entries).forEach(function(u){n.entries[u]||(c.push(u),s++)}),c.sort().reverse(),!s)return;let d=n.type==="remote"?n.handles:l.handles;for(let u of f){let _=a.normalize(u.replace(r.mountpoint,"/")).substring(1);if(l.type==="local"){let g=d.get(_),m=await o.loadRemoteEntry(g);o.storeLocalEntry(u,m)}else{let g=o.loadLocalEntry(u);await o.storeRemoteEntry(d,_,g)}}for(let u of c)if(l.type==="local")o.removeLocalEntry(u);else{let _=a.normalize(u.replace(r.mountpoint,"/")).substring(1);await o.removeRemoteEntry(d,_)}}};e.FS.filesystems.NATIVEFS_ASYNC=o}p(de,"initializeNativeFS");var et=p(async e=>{let t=[];async function i(o){for await(let r of o.values())t.push(r),r.kind==="directory"&&await i(r)}p(i,"collect"),await i(e);let a=new Map;a.set(".",e);for(let o of t){let r=(await e.resolve(o)).join("/");a.set(r,o)}return a},"getFsHandles");function ue(){let e={};return e.noImageDecoding=!0,e.noAudioDecoding=!0,e.noWasmDecoding=!1,e.preRun=[],e.quit=(t,i)=>{throw e.exited={status:t,toThrow:i},i},e}p(ue,"createModule");function me(e,t){e.preRun.push(function(){let i="/";try{e.FS.mkdirTree(t)}catch(a){console.error(`Error occurred while making a home directory '${t}':`),console.error(a),console.error(`Using '${i}' for a home directory instead`),t=i}e.FS.chdir(t)})}p(me,"createHomeDirectory");function pe(e,t){e.preRun.push(function(){Object.assign(e.ENV,t)})}p(pe,"setEnvironment");function _e(e,t){e.preRun.push(()=>{for(let i of t)e.FS.mkdirTree(i),e.FS.mount(e.FS.filesystems.NODEFS,{root:i},i)})}p(_e,"mountLocalDirectories");function ye(e,t){let i=se(t);e.preRun.push(()=>{let a=e._py_version_major(),o=e._py_version_minor();e.FS.mkdirTree("/lib"),e.FS.mkdirTree(`/lib/python${a}.${o}/site-packages`),e.addRunDependency("install-stdlib"),i.then(r=>{e.FS.writeFile(`/lib/python${a}${o}.zip`,r)}).catch(r=>{console.error("Error occurred while installing the standard library:"),console.error(r)}).finally(()=>{e.removeRunDependency("install-stdlib")})})}p(ye,"installStdlib");function ge(e,t){let i;t.stdLibURL!=null?i=t.stdLibURL:i=t.indexURL+"python_stdlib.zip",ye(e,i),me(e,t.env.HOME),pe(e,t.env),_e(e,t._node_mounts),e.preRun.push(()=>de(e))}p(ge,"initializeFileSystem");function he(e,t){let{binary:i,response:a}=L(t+"pyodide.asm.wasm");e.instantiateWasm=function(o,r){return async function(){try{let n;a?n=await WebAssembly.instantiateStreaming(a,o):n=await WebAssembly.instantiate(await i,o);let{instance:l,module:s}=n;typeof WasmOffsetConverter<"u"&&(wasmOffsetConverter=new WasmOffsetConverter(wasmBinary,s)),r(l,s)}catch(n){console.warn("wasm instantiation failed!"),console.warn(n)}}(),{}}}p(he,"preloadWasm");var $="0.25.0";async function we(e={}){await U();let t=e.indexURL||await fe();t=C(t),t.endsWith("/")||(t+="/"),e.indexURL=t;let i={fullStdLib:!1,jsglobals:globalThis,stdin:globalThis.prompt?globalThis.prompt:void 0,lockFileURL:t+"pyodide-lock.json",args:[],_node_mounts:[],env:{},packageCacheDir:t,packages:[]},a=Object.assign(i,e);a.env.HOME||(a.env.HOME="/home/pyodide");let o=ue();o.print=a.stdout,o.printErr=a.stderr,o.arguments=a.args;let r={config:a};o.API=r,r.lockFilePromise=ce(a.lockFileURL),he(o,t),ge(o,a);let n=new Promise(s=>o.postRun=s);if(o.locateFile=s=>a.indexURL+s,typeof _createPyodideModule!="function"){let s=`${a.indexURL}pyodide.asm.js`;await O(s)}if(await _createPyodideModule(o),await n,o.exited)throw o.exited.toThrow;if(e.pyproxyToStringRepr&&r.setPyProxyToStringMethod(!0),r.version!==$)throw new Error(`Pyodide version does not match: '${$}' <==> '${r.version}'. If you updated the Pyodide version, make sure you also updated the 'indexURL' parameter passed to loadPyodide.`);o.locateFile=s=>{throw new Error("Didn't expect to load any more file_packager files!")};let l=r.finalizeBootstrap();if(l.version.includes("dev")||r.setCdnUrl(`https://cdn.jsdelivr.net/pyodide/v${l.version}/full/`),await r.packageIndexReady,r._pyodide._importhook.register_module_not_found_hook(r._import_name_to_package_name,r.lockfile_unvendored_stdlibs_and_test),r.lockfile_info.version!==$)throw new Error("Lock file version doesn't match Pyodide version");return r.package_loader.init_loaded_packages(),a.fullStdLib&&await l.loadPackage(r.lockfile_unvendored_stdlibs),r.initializeStreams(a.stdin,a.stdout,a.stderr),l}p(we,"loadPyodide");const be={"app.py":`from __future__ import annotations

import draco
import numpy as np
import pandas as pd
import pydantic
import sklearn
from api.functions import load_data
from api.models import Chart, Session, State
from api.store import state

print(
  f"Package Loaded. draco: {draco.__version__}, numpy: {np.__version__}, pandas: {pd.__version__}, sklearn: {sklearn.__version__},  pydantic: {pydantic.__version__}"
)
`,"functions/__init__.py":`from .facts import get_attribute_fact, get_base_facts
from .get_charts import get_charts
from .load_data import load_data

__all__ = ["get_charts", "load_data", "get_base_facts", "get_attribute_fact"]
`,"functions/facts.py":`import draco
import pandas as pd


def get_base_facts(df: pd.DataFrame) -> list[str]:
  base_scheme = draco.schema_from_dataframe(df)
  base_facts = draco.dict_to_facts(base_scheme)

  return [
    *base_facts,
    "entity(view,root,v0).",
    "entity(mark,v0,m0).",
    ":- {entity(encoding,_,_)} > 3.",
    ":- {entity(mark,_,_)} != 1.",
  ]


def get_attribute_fact(field: str, code: int = 0) -> list[str]:
  field = field.replace(" ", "_")
  field = field[0].lower() + field[1:]

  return [
    f"entity(encoding,m0,e{code}).",
    f"attribute((encoding,field),e{code},{field}).",
  ]


__all__ = ["get_base_facts", "get_attribute_fact"]
`,"functions/get_charts.py":`from typing import Iterable

import altair as alt
import draco
import pandas as pd
from clingo import Symbol
from draco.renderer import AltairRenderer

drc = draco.Draco()
renderer = AltairRenderer()


def clean_spec(spec: alt.TopLevelSpec) -> dict:
  return {
    k: v for k, v in spec.items() if k not in ["data", "datasets", "$schema"]
  }


def answer_set_to_spec(answer_set: Iterable[Symbol], df: pd.DataFrame) -> dict:
  answer_dict = draco.answer_set_to_dict(answer_set)
  chart: alt.Chart = renderer.render(spec=answer_dict, data=df)

  # Multiview Chart logic 처리 필요
  if (
    isinstance(chart, alt.FacetChart)
    and chart.facet.column is not alt.Undefined
  ):
    chart = chart.configure_view(continuousWidth=130, continuousHeight=130)

  vega = chart.to_dict()
  return clean_spec(vega)


def get_charts(
  df: pd.DataFrame,
  facts: list[str],
  num: int = 5,
) -> dict[str, tuple[list[str], dict]]:
  return [
    answer_set_to_spec(model.answer_set, df)
    for model in drc.complete_spec(facts, num)
  ]


__all__ = ["get_charts"]
`,"functions/get_session.py":`from api.models import Session
from api.store import state


def get_sessions(
  grounding_attributes: list[str],
) -> Session:
  return Session(
    charts=[],
    grounding_attributes=grounding_attributes,
  )
`,"functions/load_data.py":`from __future__ import annotations

import pandas as pd
from api.models import State
from api.store import state
from api.utils import get_file_extension
from vega_datasets import data


def load_data(fileName: str | None = None) -> None:
  if fileName is None:
    state.filename = "Cars"
    state.df = pd.DataFrame(data.cars())

    return

  extension = get_file_extension(fileName)

  state.filename = fileName
  state.df = getattr(pd, f"read_{extension}")(fileName)


__all__ = ["load_data"]
`,"models/Chart.py":`from dataclasses import field
from typing import Any

from api.utils import get_time_stamp

from .base import dataclass


@dataclass
class Chart:
  time_stamp: int = field(default=get_time_stamp)

  title: str = field(default="")
  description: str = field(default="")

  specs: list[dict[str, Any]] = field(default_factory=list)
  attributes: list[str] = field(default_factory=list)

  @property
  def key(self) -> str:
    return f"chart-{self.time_stamp}-{str(self.attributes)}"
`,"models/Session.py":`from dataclasses import field

from api.store import state
from api.utils import get_time_stamp
from numpy.random import choice

from .base import dataclass
from .Chart import Chart


@dataclass
class Session:
  charts: list[Chart]
  grounding_attributes: list[str]
  time_stamp: int = field(default_factory=get_time_stamp)

  @property
  def key(self):
    return f"session-{self.time_stamp}-{str(self.grounding_attributes)}"

  def get_sub_attribute(self, n=1) -> list[str]:
    if len(self.grounding_attributes) + n > 3:
      raise ValueError("Too many attributes")

    all_attributes = state.df.columns
    attributes = [
      attr for attr in all_attributes if attr not in self.grounding_attributes
    ]

    return choice(attributes, n, replace=False).tolist()
`,"models/State.py":`from __future__ import annotations

from dataclasses import field
from functools import wraps
from typing import Any

import pandas as pd
from numpy.random import choice

from .base import dataclass
from .Chart import Chart
from .Session import Session


@dataclass
class State:
  df: pd.DataFrame | None = field(default=None)
  filename: str | None = field(default=None)
  sessions: list[Session] = field(default_factory=list)

  @property
  def undiscovered_attributes(self) -> list[str]:
    return [
      column
      for column in self.df.columns
      if column
      not in sum(
        (session.grounding_attributes for session in self.sessions), []
      )
    ]

  def get_next_session(self) -> Session:
    # grounding attribute 추후 변경 필요
    grounding_attribute = choice(self.undiscovered_attributes)

    session = Session(
      charts=[],
      grounding_attributes=[grounding_attribute],
    )
    self.sessions.append(session)
    return session
`,"models/__init__.py":`from .base import dataclass
from .Chart import Chart
from .Session import Session
from .State import State

__all__ = [
  "State",
  "Session",
  "Chart",
  "dataclass",
]
`,"models/base.py":`import re
from dataclasses import MISSING, fields
from dataclasses import dataclass as dataclass_base
from typing import Any, Dict


def snake_to_camel(string: str) -> str:
  return re.sub(r"_([a-z])", lambda m: m.group(1).upper(), string)


def convert_dict_keys_to_camel_case(d: Dict[str, Any]) -> Dict[str, Any]:
  new_dict = {}
  for key, value in d.items():
    if isinstance(value, dict):
      value = convert_dict_keys_to_camel_case(value)
    elif isinstance(value, list):
      value = [
        convert_dict_keys_to_camel_case(v) if isinstance(v, dict) else v
        for v in value
      ]
    new_dict[snake_to_camel(key)] = value
  return new_dict


def dataclass(_cls=None, **kwargs):
  def wrap(cls):
    cls = dataclass_base(cls, **kwargs)

    def __post_init__(self):
      for field in fields(self):
        if field.default is not MISSING or field.default_factory is not MISSING:
          continue
        if not hasattr(self, field.name):
          setattr(self, field.name, None)

      if hasattr(self, "post_init_hook"):
        self.post_init_hook()

    def to_dict(self):
      return convert_dict_keys_to_camel_case(
        {f.name: getattr(self, f.name) for f in fields(self)}
      )

    def __iter__(self):
      for key, value in self.to_dict().items():
        yield key, value

    cls.__post_init__ = __post_init__
    cls.to_dict = to_dict
    cls.__iter__ = __iter__
    return cls

  if _cls is None:
    return wrap
  return wrap(_cls)
`,"store.py":`from api.models import State

state = State()

__all__ = ["state"]
`,"utils/__init__.py":`from .get_file_extension import get_file_extension
from .get_time_stamp import get_time_stamp

__all__ = ["get_file_extension", "get_time_stamp"]
`,"utils/get_file_extension.py":`def get_file_extension(filename: str) -> str:
  return filename.split(".")[-1]


__all__ = ["get_file_extension"]
`,"utils/get_time_stamp.py":`import time


def get_time_stamp():
  return int(time.time() * 1000)
`},tt="api",nt="app.py";async function rt(e){try{for(const[t,i]of Object.entries(be)){const a=`${tt}/${t}`,o=a.split("/");let r="";for(const n of o.slice(0,-1))r+=(r?"/":"")+n,e.FS.analyzePath(r).exists||e.FS.mkdir(r);e.FS.writeFile(a,i)}}catch(t){throw console.error("Failed to setup Pyodide files:",t),t}}async function it(e){const t=be[nt];return await e.runPythonAsync(t)}const at={pyodide:null,async writeFile(e,t){if(!this.pyodide)throw new Error("Pyodide is not initialized");this.pyodide.FS.writeFile(`${e}`,t,{encoding:"binary"})},async readFile(e){if(!this.pyodide)throw new Error("Pyodide is not initialized");return this.pyodide.FS.readFile(`${e}`)},async initialize(e=[]){this.pyodide=await we({indexURL:"/Swipytics/artifacts"});for(const t of e)await this.pyodide.loadPackage(t);await rt(this.pyodide),await it(this.pyodide)},async runPython(e,t={}){if(!this.pyodide)throw new Error("Pyodide is not initialized");const i=this.pyodide.globals.get("dict")();for(const[a,o]of Object.entries(t))i.set(a,o);return this.pyodide.runPython(e,{globals:i})},async callPythonFunction(e,t=[],i){if(!this.pyodide)throw new Error("Pyodide is not initialized");const a=this.pyodide.globals.get(e);if(!a)throw new Error(`Function ${e} is not defined in globals`);const o=this.pyodide.toPy(t),r=i?a.callKwargs(o,i):a(...o);return r!=null&&r.toJs?r.toJs():r}};M(at)});export default ot();
