var Oe=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var ot=Oe((lt,j)=>{/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const q=Symbol("Comlink.proxy"),Fe=Symbol("Comlink.endpoint"),xe=Symbol("Comlink.releaseProxy"),T=Symbol("Comlink.finalizer"),S=Symbol("Comlink.thrown"),B=e=>typeof e=="object"&&e!==null||typeof e=="function",Ne={canHandle:e=>B(e)&&e[q],serialize(e){const{port1:t,port2:a}=new MessageChannel;return M(e,t),[a,[a]]},deserialize(e){return e.start(),Te(e)}},Pe={canHandle:e=>B(e)&&S in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},G=new Map([["proxy",Ne],["throw",Pe]]);function Le(e,t){for(const a of e)if(t===a||a==="*"||a instanceof RegExp&&a.test(t))return!0;return!1}function M(e,t=globalThis,a=["*"]){t.addEventListener("message",function i(o){if(!o||!o.data)return;if(!Le(a,o.origin)){console.warn(`Invalid origin '${o.origin}' for comlink proxy`);return}const{id:r,type:n,path:l}=Object.assign({path:[]},o.data),s=(o.data.argumentList||[]).map(b);let f;try{const c=l.slice(0,-1).reduce((u,_)=>u[_],e),d=l.reduce((u,_)=>u[_],e);switch(n){case"GET":f=d;break;case"SET":c[l.slice(-1)[0]]=b(o.data.value),f=!0;break;case"APPLY":f=d.apply(c,s);break;case"CONSTRUCT":{const u=new d(...s);f=je(u)}break;case"ENDPOINT":{const{port1:u,port2:_}=new MessageChannel;M(e,_),f=Ae(u,[u])}break;case"RELEASE":f=void 0;break;default:return}}catch(c){f={value:c,[S]:0}}Promise.resolve(f).catch(c=>({value:c,[S]:0})).then(c=>{const[d,u]=N(c);t.postMessage(Object.assign(Object.assign({},d),{id:r}),u),n==="RELEASE"&&(t.removeEventListener("message",i),K(t),T in e&&typeof e[T]=="function"&&e[T]())}).catch(c=>{const[d,u]=N({value:new TypeError("Unserializable return value"),[S]:0});t.postMessage(Object.assign(Object.assign({},d),{id:r}),u)})}),t.start&&t.start()}function Re(e){return e.constructor.name==="MessagePort"}function K(e){Re(e)&&e.close()}function Te(e,t){return $(e,[],t)}function E(e){if(e)throw new Error("Proxy has been released and is not useable")}function Y(e){return v(e,{type:"RELEASE"}).then(()=>{K(e)})}const F=new WeakMap,x="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const t=(F.get(e)||0)-1;F.set(e,t),t===0&&Y(e)});function De(e,t){const a=(F.get(t)||0)+1;F.set(t,a),x&&x.register(e,t,e)}function $e(e){x&&x.unregister(e)}function $(e,t=[],a=function(){}){let i=!1;const o=new Proxy(a,{get(r,n){if(E(i),n===xe)return()=>{$e(o),Y(e),i=!0};if(n==="then"){if(t.length===0)return{then:()=>o};const l=v(e,{type:"GET",path:t.map(s=>s.toString())}).then(b);return l.then.bind(l)}return $(e,[...t,n])},set(r,n,l){E(i);const[s,f]=N(l);return v(e,{type:"SET",path:[...t,n].map(c=>c.toString()),value:s},f).then(b)},apply(r,n,l){E(i);const s=t[t.length-1];if(s===Fe)return v(e,{type:"ENDPOINT"}).then(b);if(s==="bind")return $(e,t.slice(0,-1));const[f,c]=V(l);return v(e,{type:"APPLY",path:t.map(d=>d.toString()),argumentList:f},c).then(b)},construct(r,n){E(i);const[l,s]=V(n);return v(e,{type:"CONSTRUCT",path:t.map(f=>f.toString()),argumentList:l},s).then(b)}});return De(o,e),o}function Ce(e){return Array.prototype.concat.apply([],e)}function V(e){const t=e.map(N);return[t.map(a=>a[0]),Ce(t.map(a=>a[1]))]}const J=new WeakMap;function Ae(e,t){return J.set(e,t),e}function je(e){return Object.assign(e,{[q]:!0})}function N(e){for(const[t,a]of G)if(a.canHandle(e)){const[i,o]=a.serialize(e);return[{type:"HANDLER",name:t,value:i},o]}return[{type:"RAW",value:e},J.get(e)||[]]}function b(e){switch(e.type){case"HANDLER":return G.get(e.name).deserialize(e.value);case"RAW":return e.value}}function v(e,t,a){return new Promise(i=>{const o=Me();e.addEventListener("message",function r(n){!n.data||!n.data.id||n.data.id!==o||(e.removeEventListener("message",r),i(n.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:o},t),a)})}function Me(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}var Ie=Object.create,I=Object.defineProperty,ze=Object.getOwnPropertyDescriptor,Ue=Object.getOwnPropertyNames,He=Object.getPrototypeOf,We=Object.prototype.hasOwnProperty,m=(e,t)=>I(e,"name",{value:t,configurable:!0}),X=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,a)=>(typeof require<"u"?require:t)[a]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')}),Q=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Ve=(e,t,a,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Ue(t))!We.call(e,o)&&o!==a&&I(e,o,{get:()=>t[o],enumerable:!(i=ze(t,o))||i.enumerable});return e},qe=(e,t,a)=>(a=e!=null?Ie(He(e)):{},Ve(!e||!e.__esModule?I(a,"default",{value:e,enumerable:!0}):a,e)),Be=Q((e,t)=>{(function(a,i){typeof define=="function"&&define.amd?define("stackframe",[],i):typeof e=="object"?t.exports=i():a.StackFrame=i()})(e,function(){function a(p){return!isNaN(parseFloat(p))&&isFinite(p)}m(a,"_isNumber");function i(p){return p.charAt(0).toUpperCase()+p.substring(1)}m(i,"_capitalize");function o(p){return function(){return this[p]}}m(o,"_getter");var r=["isConstructor","isEval","isNative","isToplevel"],n=["columnNumber","lineNumber"],l=["fileName","functionName","source"],s=["args"],f=["evalOrigin"],c=r.concat(n,l,s,f);function d(p){if(p)for(var y=0;y<c.length;y++)p[c[y]]!==void 0&&this["set"+i(c[y])](p[c[y]])}m(d,"StackFrame"),d.prototype={getArgs:function(){return this.args},setArgs:function(p){if(Object.prototype.toString.call(p)!=="[object Array]")throw new TypeError("Args must be an Array");this.args=p},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(p){if(p instanceof d)this.evalOrigin=p;else if(p instanceof Object)this.evalOrigin=new d(p);else throw new TypeError("Eval Origin must be an Object or StackFrame")},toString:function(){var p=this.getFileName()||"",y=this.getLineNumber()||"",w=this.getColumnNumber()||"",k=this.getFunctionName()||"";return this.getIsEval()?p?"[eval] ("+p+":"+y+":"+w+")":"[eval]:"+y+":"+w:k?k+" ("+p+":"+y+":"+w+")":p+":"+y+":"+w}},d.fromString=m(function(p){var y=p.indexOf("("),w=p.lastIndexOf(")"),k=p.substring(0,y),ve=p.substring(y+1,w).split(","),W=p.substring(w+1);if(W.indexOf("@")===0)var R=/@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(W,""),ke=R[1],Ee=R[2],Se=R[3];return new d({functionName:k,args:ve||void 0,fileName:ke,lineNumber:Ee||void 0,columnNumber:Se||void 0})},"StackFrame$$fromString");for(var u=0;u<r.length;u++)d.prototype["get"+i(r[u])]=o(r[u]),d.prototype["set"+i(r[u])]=function(p){return function(y){this[p]=!!y}}(r[u]);for(var _=0;_<n.length;_++)d.prototype["get"+i(n[_])]=o(n[_]),d.prototype["set"+i(n[_])]=function(p){return function(y){if(!a(y))throw new TypeError(p+" must be a Number");this[p]=Number(y)}}(n[_]);for(var g=0;g<l.length;g++)d.prototype["get"+i(l[g])]=o(l[g]),d.prototype["set"+i(l[g])]=function(p){return function(y){this[p]=String(y)}}(l[g]);return d})}),Ge=Q((e,t)=>{(function(a,i){typeof define=="function"&&define.amd?define("error-stack-parser",["stackframe"],i):typeof e=="object"?t.exports=i(Be()):a.ErrorStackParser=i(a.StackFrame)})(e,m(function(a){var i=/(^|@)\S+:\d+/,o=/^\s*at .*(\S+:\d+|\(native\))/m,r=/^(eval@)?(\[native code])?$/;return{parse:m(function(n){if(typeof n.stacktrace<"u"||typeof n["opera#sourceloc"]<"u")return this.parseOpera(n);if(n.stack&&n.stack.match(o))return this.parseV8OrIE(n);if(n.stack)return this.parseFFOrSafari(n);throw new Error("Cannot parse given Error object")},"ErrorStackParser$$parse"),extractLocation:m(function(n){if(n.indexOf(":")===-1)return[n];var l=/(.+?)(?::(\d+))?(?::(\d+))?$/,s=l.exec(n.replace(/[()]/g,""));return[s[1],s[2]||void 0,s[3]||void 0]},"ErrorStackParser$$extractLocation"),parseV8OrIE:m(function(n){var l=n.stack.split(`
`).filter(function(s){return!!s.match(o)},this);return l.map(function(s){s.indexOf("(eval ")>-1&&(s=s.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));var f=s.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),c=f.match(/ (\(.+\)$)/);f=c?f.replace(c[0],""):f;var d=this.extractLocation(c?c[1]:f),u=c&&f||void 0,_=["eval","<anonymous>"].indexOf(d[0])>-1?void 0:d[0];return new a({functionName:u,fileName:_,lineNumber:d[1],columnNumber:d[2],source:s})},this)},"ErrorStackParser$$parseV8OrIE"),parseFFOrSafari:m(function(n){var l=n.stack.split(`
`).filter(function(s){return!s.match(r)},this);return l.map(function(s){if(s.indexOf(" > eval")>-1&&(s=s.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),s.indexOf("@")===-1&&s.indexOf(":")===-1)return new a({functionName:s});var f=/((.*".+"[^@]*)?[^@]*)(?:@)/,c=s.match(f),d=c&&c[1]?c[1]:void 0,u=this.extractLocation(s.replace(f,""));return new a({functionName:d,fileName:u[0],lineNumber:u[1],columnNumber:u[2],source:s})},this)},"ErrorStackParser$$parseFFOrSafari"),parseOpera:m(function(n){return!n.stacktrace||n.message.indexOf(`
`)>-1&&n.message.split(`
`).length>n.stacktrace.split(`
`).length?this.parseOpera9(n):n.stack?this.parseOpera11(n):this.parseOpera10(n)},"ErrorStackParser$$parseOpera"),parseOpera9:m(function(n){for(var l=/Line (\d+).*script (?:in )?(\S+)/i,s=n.message.split(`
`),f=[],c=2,d=s.length;c<d;c+=2){var u=l.exec(s[c]);u&&f.push(new a({fileName:u[2],lineNumber:u[1],source:s[c]}))}return f},"ErrorStackParser$$parseOpera9"),parseOpera10:m(function(n){for(var l=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,s=n.stacktrace.split(`
`),f=[],c=0,d=s.length;c<d;c+=2){var u=l.exec(s[c]);u&&f.push(new a({functionName:u[3]||void 0,fileName:u[2],lineNumber:u[1],source:s[c]}))}return f},"ErrorStackParser$$parseOpera10"),parseOpera11:m(function(n){var l=n.stack.split(`
`).filter(function(s){return!!s.match(i)&&!s.match(/^Error created at/)},this);return l.map(function(s){var f=s.split("@"),c=this.extractLocation(f.pop()),d=f.shift()||"",u=d.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^)]*\)/g,"")||void 0,_;d.match(/\(([^)]*)\)/)&&(_=d.replace(/^[^(]+\(([^)]*)\)$/,"$1"));var g=_===void 0||_==="[arguments not available]"?void 0:_.split(",");return new a({functionName:u,args:g,fileName:c[0],lineNumber:c[1],columnNumber:c[2],source:s})},this)},"ErrorStackParser$$parseOpera11")}},"ErrorStackParser"))}),Ke=qe(Ge()),h=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string"&&typeof process.browser>"u",Z=h&&typeof j<"u"&&typeof j.exports<"u"&&typeof X<"u"&&typeof __dirname<"u",Ye=h&&!Z,Je=typeof Deno<"u",ee=!h&&!Je,Xe=ee&&typeof window<"u"&&typeof document<"u"&&typeof document.createElement<"u"&&typeof sessionStorage<"u",Qe=ee&&typeof importScripts<"u"&&typeof self<"u",te,P,C,ne,z,Ze=`"fetch" is not defined, maybe you're using node < 18? From Pyodide >= 0.25.0, node >= 18 is required. Older versions of Node.js may work, but it is not guaranteed or supported. Falling back to "node-fetch".`;async function U(){if(!h||(te=(await import("./__vite-browser-external-CIEyP2s7.js")).default,z=await import("./__vite-browser-external-CIEyP2s7.js"),globalThis.fetch?P=fetch:(console.warn(Ze),P=(await import("./index-B489Fav_.js")).default),ne=(await import("./__vite-browser-external-CIEyP2s7.js")).default,C=await import("./__vite-browser-external-CIEyP2s7.js"),H=C.sep,typeof X<"u"))return;let e=await import("./__vite-browser-external-CIEyP2s7.js"),t=await import("./__vite-browser-external-CIEyP2s7.js"),a=await import("./__vite-browser-external-CIEyP2s7.js"),i=await import("./__vite-browser-external-CIEyP2s7.js"),o={fs:e,crypto:t,ws:a,child_process:i};globalThis.require=function(r){return o[r]}}m(U,"initNodeModules");function re(e,t){return C.resolve(t||".",e)}m(re,"node_resolvePath");function ae(e,t){return t===void 0&&(t=location),new URL(e,t).toString()}m(ae,"browser_resolvePath");var A;h?A=re:A=ae;var H;h||(H="/");function ie(e,t){return e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?{response:P(e)}:{binary:z.readFile(e).then(a=>new Uint8Array(a.buffer,a.byteOffset,a.byteLength))}}m(ie,"node_getBinaryResponse");function oe(e,t){let a=new URL(e,location);return{response:fetch(a,t?{integrity:t}:{})}}m(oe,"browser_getBinaryResponse");var L;h?L=ie:L=oe;async function se(e,t){let{response:a,binary:i}=L(e,t);if(i)return i;let o=await a;if(!o.ok)throw new Error(`Failed to load '${e}': request failed.`);return new Uint8Array(await o.arrayBuffer())}m(se,"loadBinaryFile");var O;if(Xe)O=m(async e=>await import(e),"loadScript");else if(Qe)O=m(async e=>{try{globalThis.importScripts(e)}catch(t){if(t instanceof TypeError)await import(e);else throw t}},"loadScript");else if(h)O=le;else throw new Error("Cannot determine runtime environment");async function le(e){e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?ne.runInThisContext(await(await P(e)).text()):await import(te.pathToFileURL(e).href)}m(le,"nodeLoadScript");async function ce(e){if(h){await U();let t=await z.readFile(e);return JSON.parse(t)}else return await(await fetch(e)).json()}m(ce,"loadLockFile");async function fe(){if(Z)return __dirname;let e;try{throw new Error}catch(i){e=i}let t=Ke.default.parse(e)[0].fileName;if(Ye){let i=await import("./__vite-browser-external-CIEyP2s7.js");return(await import("./__vite-browser-external-CIEyP2s7.js")).fileURLToPath(i.dirname(t))}let a=t.lastIndexOf(H);if(a===-1)throw new Error("Could not extract indexURL path from pyodide module location");return t.slice(0,a)}m(fe,"calculateDirname");function de(e){let t=e.FS,a=e.FS.filesystems.MEMFS,i=e.PATH,o={DIR_MODE:16895,FILE_MODE:33279,mount:function(r){if(!r.opts.fileSystemHandle)throw new Error("opts.fileSystemHandle is required");return a.mount.apply(null,arguments)},syncfs:async(r,n,l)=>{try{let s=o.getLocalSet(r),f=await o.getRemoteSet(r),c=n?f:s,d=n?s:f;await o.reconcile(r,c,d),l(null)}catch(s){l(s)}},getLocalSet:r=>{let n=Object.create(null);function l(c){return c!=="."&&c!==".."}m(l,"isRealDir");function s(c){return d=>i.join2(c,d)}m(s,"toAbsolute");let f=t.readdir(r.mountpoint).filter(l).map(s(r.mountpoint));for(;f.length;){let c=f.pop(),d=t.stat(c);t.isDir(d.mode)&&f.push.apply(f,t.readdir(c).filter(l).map(s(c))),n[c]={timestamp:d.mtime,mode:d.mode}}return{type:"local",entries:n}},getRemoteSet:async r=>{let n=Object.create(null),l=await et(r.opts.fileSystemHandle);for(let[s,f]of l)s!=="."&&(n[i.join2(r.mountpoint,s)]={timestamp:f.kind==="file"?(await f.getFile()).lastModifiedDate:new Date,mode:f.kind==="file"?o.FILE_MODE:o.DIR_MODE});return{type:"remote",entries:n,handles:l}},loadLocalEntry:r=>{let n=t.lookupPath(r).node,l=t.stat(r);if(t.isDir(l.mode))return{timestamp:l.mtime,mode:l.mode};if(t.isFile(l.mode))return n.contents=a.getFileDataAsTypedArray(n),{timestamp:l.mtime,mode:l.mode,contents:n.contents};throw new Error("node type not supported")},storeLocalEntry:(r,n)=>{if(t.isDir(n.mode))t.mkdirTree(r,n.mode);else if(t.isFile(n.mode))t.writeFile(r,n.contents,{canOwn:!0});else throw new Error("node type not supported");t.chmod(r,n.mode),t.utime(r,n.timestamp,n.timestamp)},removeLocalEntry:r=>{var n=t.stat(r);t.isDir(n.mode)?t.rmdir(r):t.isFile(n.mode)&&t.unlink(r)},loadRemoteEntry:async r=>{if(r.kind==="file"){let n=await r.getFile();return{contents:new Uint8Array(await n.arrayBuffer()),mode:o.FILE_MODE,timestamp:n.lastModifiedDate}}else{if(r.kind==="directory")return{mode:o.DIR_MODE,timestamp:new Date};throw new Error("unknown kind: "+r.kind)}},storeRemoteEntry:async(r,n,l)=>{let s=r.get(i.dirname(n)),f=t.isFile(l.mode)?await s.getFileHandle(i.basename(n),{create:!0}):await s.getDirectoryHandle(i.basename(n),{create:!0});if(f.kind==="file"){let c=await f.createWritable();await c.write(l.contents),await c.close()}r.set(n,f)},removeRemoteEntry:async(r,n)=>{await r.get(i.dirname(n)).removeEntry(i.basename(n)),r.delete(n)},reconcile:async(r,n,l)=>{let s=0,f=[];Object.keys(n.entries).forEach(function(u){let _=n.entries[u],g=l.entries[u];(!g||t.isFile(_.mode)&&_.timestamp.getTime()>g.timestamp.getTime())&&(f.push(u),s++)}),f.sort();let c=[];if(Object.keys(l.entries).forEach(function(u){n.entries[u]||(c.push(u),s++)}),c.sort().reverse(),!s)return;let d=n.type==="remote"?n.handles:l.handles;for(let u of f){let _=i.normalize(u.replace(r.mountpoint,"/")).substring(1);if(l.type==="local"){let g=d.get(_),p=await o.loadRemoteEntry(g);o.storeLocalEntry(u,p)}else{let g=o.loadLocalEntry(u);await o.storeRemoteEntry(d,_,g)}}for(let u of c)if(l.type==="local")o.removeLocalEntry(u);else{let _=i.normalize(u.replace(r.mountpoint,"/")).substring(1);await o.removeRemoteEntry(d,_)}}};e.FS.filesystems.NATIVEFS_ASYNC=o}m(de,"initializeNativeFS");var et=m(async e=>{let t=[];async function a(o){for await(let r of o.values())t.push(r),r.kind==="directory"&&await a(r)}m(a,"collect"),await a(e);let i=new Map;i.set(".",e);for(let o of t){let r=(await e.resolve(o)).join("/");i.set(r,o)}return i},"getFsHandles");function ue(){let e={};return e.noImageDecoding=!0,e.noAudioDecoding=!0,e.noWasmDecoding=!1,e.preRun=[],e.quit=(t,a)=>{throw e.exited={status:t,toThrow:a},a},e}m(ue,"createModule");function pe(e,t){e.preRun.push(function(){let a="/";try{e.FS.mkdirTree(t)}catch(i){console.error(`Error occurred while making a home directory '${t}':`),console.error(i),console.error(`Using '${a}' for a home directory instead`),t=a}e.FS.chdir(t)})}m(pe,"createHomeDirectory");function me(e,t){e.preRun.push(function(){Object.assign(e.ENV,t)})}m(me,"setEnvironment");function _e(e,t){e.preRun.push(()=>{for(let a of t)e.FS.mkdirTree(a),e.FS.mount(e.FS.filesystems.NODEFS,{root:a},a)})}m(_e,"mountLocalDirectories");function ye(e,t){let a=se(t);e.preRun.push(()=>{let i=e._py_version_major(),o=e._py_version_minor();e.FS.mkdirTree("/lib"),e.FS.mkdirTree(`/lib/python${i}.${o}/site-packages`),e.addRunDependency("install-stdlib"),a.then(r=>{e.FS.writeFile(`/lib/python${i}${o}.zip`,r)}).catch(r=>{console.error("Error occurred while installing the standard library:"),console.error(r)}).finally(()=>{e.removeRunDependency("install-stdlib")})})}m(ye,"installStdlib");function ge(e,t){let a;t.stdLibURL!=null?a=t.stdLibURL:a=t.indexURL+"python_stdlib.zip",ye(e,a),pe(e,t.env.HOME),me(e,t.env),_e(e,t._node_mounts),e.preRun.push(()=>de(e))}m(ge,"initializeFileSystem");function he(e,t){let{binary:a,response:i}=L(t+"pyodide.asm.wasm");e.instantiateWasm=function(o,r){return async function(){try{let n;i?n=await WebAssembly.instantiateStreaming(i,o):n=await WebAssembly.instantiate(await a,o);let{instance:l,module:s}=n;typeof WasmOffsetConverter<"u"&&(wasmOffsetConverter=new WasmOffsetConverter(wasmBinary,s)),r(l,s)}catch(n){console.warn("wasm instantiation failed!"),console.warn(n)}}(),{}}}m(he,"preloadWasm");var D="0.25.0";async function we(e={}){await U();let t=e.indexURL||await fe();t=A(t),t.endsWith("/")||(t+="/"),e.indexURL=t;let a={fullStdLib:!1,jsglobals:globalThis,stdin:globalThis.prompt?globalThis.prompt:void 0,lockFileURL:t+"pyodide-lock.json",args:[],_node_mounts:[],env:{},packageCacheDir:t,packages:[]},i=Object.assign(a,e);i.env.HOME||(i.env.HOME="/home/pyodide");let o=ue();o.print=i.stdout,o.printErr=i.stderr,o.arguments=i.args;let r={config:i};o.API=r,r.lockFilePromise=ce(i.lockFileURL),he(o,t),ge(o,i);let n=new Promise(s=>o.postRun=s);if(o.locateFile=s=>i.indexURL+s,typeof _createPyodideModule!="function"){let s=`${i.indexURL}pyodide.asm.js`;await O(s)}if(await _createPyodideModule(o),await n,o.exited)throw o.exited.toThrow;if(e.pyproxyToStringRepr&&r.setPyProxyToStringMethod(!0),r.version!==D)throw new Error(`Pyodide version does not match: '${D}' <==> '${r.version}'. If you updated the Pyodide version, make sure you also updated the 'indexURL' parameter passed to loadPyodide.`);o.locateFile=s=>{throw new Error("Didn't expect to load any more file_packager files!")};let l=r.finalizeBootstrap();if(l.version.includes("dev")||r.setCdnUrl(`https://cdn.jsdelivr.net/pyodide/v${l.version}/full/`),await r.packageIndexReady,r._pyodide._importhook.register_module_not_found_hook(r._import_name_to_package_name,r.lockfile_unvendored_stdlibs_and_test),r.lockfile_info.version!==D)throw new Error("Lock file version doesn't match Pyodide version");return r.package_loader.init_loaded_packages(),i.fullStdLib&&await l.loadPackage(r.lockfile_unvendored_stdlibs),r.initializeStreams(i.stdin,i.stdout,i.stderr),l}m(we,"loadPyodide");const be={"app.py":`from __future__ import annotations

import draco
import numpy as np
import pandas as pd
import pydantic
import sklearn
from api.services import load_data
from api.services.chart import append_chart
from api.services.session import append_session
from api.store import return_state, state
from api.utils import find
from numpy.random import choice

print(
  f"Package Loaded. draco: {draco.__version__}, numpy: {np.__version__}, pandas: {pd.__version__}, sklearn: {sklearn.__version__},  pydantic: {pydantic.__version__}"
)


# Controllers must be implemented here


@return_state
def loadData(fileName: str | None = None):
  load_data(fileName)


@return_state
def appendSession():
  attributes = state.undiscovered_attributes
  grounding_attributes = choice(attributes, 1, replace=False).tolist()
  append_session(grounding_attributes)


@return_state
def appendChart(sessionKey: str):
  session = find(state.sessions, lambda x: x.key == sessionKey)

  if not session:
    raise Exception("Session not found")

  append_chart(session)
`,"models/Chart.py":`from dataclasses import field
from typing import Any

from api.utils import get_time_stamp

from .base import dataclass


@dataclass
class Chart:
  facts: list[str]

  title: str = field(default="")
  description: str = field(default="")

  specs: list[dict[str, Any]] = field(default_factory=list)
  attributes: list[str] = field(default_factory=list)

  time_stamp: int = field(default=get_time_stamp)

  @property
  def key(self) -> str:
    return f"chart-{self.time_stamp}-{str(self.attributes)}"
`,"models/Session.py":`from dataclasses import field

from api.utils import get_time_stamp

from .base import dataclass
from .chart import Chart


@dataclass
class Session:
  charts: list[Chart]
  grounding_attributes: list[str]
  time_stamp: int = field(default_factory=get_time_stamp)

  @property
  def key(self):
    return f"session-{self.time_stamp}-{str(self.grounding_attributes)}"
`,"models/State.py":`from __future__ import annotations

from dataclasses import field
from typing import TYPE_CHECKING

import pandas as pd

from .base import dataclass

if TYPE_CHECKING:
  from .session import Session


@dataclass
class State:
  df: pd.DataFrame | None = field(default=None)
  filename: str | None = field(default=None)
  sessions: list["Session"] = field(default_factory=list)

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
`,"models/__init__.py":`from .base import dataclass
from .chart import Chart
from .session import Session
from .state import State

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

    def to_dict(self):
      return convert_dict_keys_to_camel_case(
        {f.name: getattr(self, f.name) for f in fields(self)}
      )

    def __iter__(self):
      for key, value in self.to_dict().items():
        yield key, value

    cls.to_dict = to_dict
    cls.__iter__ = __iter__
    return cls

  if _cls is None:
    return wrap
  return wrap(_cls)
`,"services/__init__.py":`from .data import load_data
from .facts import get_attribute_facts, get_base_facts
from .specs import get_specs_from_facts

__all__ = [
  "load_data",
  "get_attribute_facts",
  "get_base_facts",
  "get_specs_from_facts",
]
`,"services/chart.py":`from api.store import state
from pytest import Session


def append_chart(session: Session):
  pass
`,"services/data.py":`from __future__ import annotations

import pandas as pd
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
`,"services/facts.py":`import draco
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


def get_attribute_facts(field: str, code: int = 0) -> list[str]:
  field = field.replace(" ", "_")
  field = field[0].lower() + field[1:]

  return [
    f"entity(encoding,m0,e{code}).",
    f"attribute((encoding,field),e{code},{field}).",
  ]


__all__ = ["get_base_facts", "get_attribute_facts"]
`,"services/session.py":`from api.store import state


def append_session(grounding_attributes: list[str]) -> None:
  pass
`,"services/specs.py":`from typing import Iterable

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


def get_specs_from_facts(
  df: pd.DataFrame,
  facts: list[str],
  num: int = 5,
) -> dict[str, tuple[list[str], dict]]:
  return [
    answer_set_to_spec(model.answer_set, df)
    for model in drc.complete_spec(facts, num)
  ]


__all__ = ["get_specs_from_facts"]
`,"store.py":`from api.models import State

state = State()


# decorator that return dict(state)
def return_state(func):
  def wrapper(*args, **kwargs):
    func(*args, **kwargs)
    return dict(state)

  return wrapper


__all__ = ["state", "return_state"]
`,"utils/__init__.py":`from .find import find
from .get_file_extension import get_file_extension
from .get_time_stamp import get_time_stamp

__all__ = ["get_file_extension", "get_time_stamp", "find"]
`,"utils/find.py":`from __future__ import annotations

from typing import Callable, TypeVar

T = TypeVar("T")


def find(lst: list[T], predicate: Callable[[T], bool]) -> T | None:
  return next((x for x in lst if predicate(x)), None)
`,"utils/get_file_extension.py":`def get_file_extension(filename: str) -> str:
  return filename.split(".")[-1]


__all__ = ["get_file_extension"]
`,"utils/get_time_stamp.py":`import time


def get_time_stamp():
  return int(time.time() * 1000)
`},tt="api",nt="app.py";async function rt(e){try{for(const[t,a]of Object.entries(be)){const i=`${tt}/${t}`,o=i.split("/");let r="";for(const n of o.slice(0,-1))r+=(r?"/":"")+n,e.FS.analyzePath(r).exists||e.FS.mkdir(r);e.FS.writeFile(i,a)}}catch(t){throw console.error("Failed to setup Pyodide files:",t),t}}async function at(e){const t=be[nt];return await e.runPythonAsync(t)}const it={pyodide:null,async writeFile(e,t){if(!this.pyodide)throw new Error("Pyodide is not initialized");this.pyodide.FS.writeFile(`${e}`,t,{encoding:"binary"})},async readFile(e){if(!this.pyodide)throw new Error("Pyodide is not initialized");return this.pyodide.FS.readFile(`${e}`)},async initialize(e=[]){this.pyodide=await we({indexURL:"/Swipytics/artifacts"});for(const t of e)await this.pyodide.loadPackage(t);await rt(this.pyodide),await at(this.pyodide)},async runPython(e,t={}){if(!this.pyodide)throw new Error("Pyodide is not initialized");const a=this.pyodide.globals.get("dict")();for(const[i,o]of Object.entries(t))a.set(i,o);return this.pyodide.runPython(e,{globals:a})},async callPythonFunction(e,t=[],a){if(!this.pyodide)throw new Error("Pyodide is not initialized");const i=this.pyodide.globals.get(e);if(!i)throw new Error(`Function ${e} is not defined in globals`);const o=this.pyodide.toPy(t),r=a?i.callKwargs(o,a):i(...o);return r!=null&&r.toJs?r.toJs():r}};M(it)});export default ot();
