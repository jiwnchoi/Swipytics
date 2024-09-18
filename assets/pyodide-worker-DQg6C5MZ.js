var Se=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports);var rn=Se((on,j)=>{/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const W=Symbol("Comlink.proxy"),xe=Symbol("Comlink.endpoint"),Ee=Symbol("Comlink.releaseProxy"),N=Symbol("Comlink.finalizer"),S=Symbol("Comlink.thrown"),H=e=>typeof e=="object"&&e!==null||typeof e=="function",ke={canHandle:e=>H(e)&&e[W],serialize(e){const{port1:n,port2:r}=new MessageChannel;return $(e,n),[r,[r]]},deserialize(e){return e.start(),Ce(e)}},Te={canHandle:e=>H(e)&&S in e,serialize({value:e}){let n;return e instanceof Error?n={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:n={isError:!1,value:e},[n,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},X=new Map([["proxy",ke],["throw",Te]]);function Oe(e,n){for(const r of e)if(n===r||r==="*"||r instanceof RegExp&&r.test(n))return!0;return!1}function $(e,n=globalThis,r=["*"]){n.addEventListener("message",function i(s){if(!s||!s.data)return;if(!Oe(r,s.origin)){console.warn(`Invalid origin '${s.origin}' for comlink proxy`);return}const{id:a,type:t,path:l}=Object.assign({path:[]},s.data),o=(s.data.argumentList||[]).map(b);let f;try{const d=l.slice(0,-1).reduce((m,_)=>m[_],e),c=l.reduce((m,_)=>m[_],e);switch(t){case"GET":f=c;break;case"SET":d[l.slice(-1)[0]]=b(s.data.value),f=!0;break;case"APPLY":f=c.apply(d,o);break;case"CONSTRUCT":{const m=new c(...o);f=Re(m)}break;case"ENDPOINT":{const{port1:m,port2:_}=new MessageChannel;$(e,_),f=Ae(m,[m])}break;case"RELEASE":f=void 0;break;default:return}}catch(d){f={value:d,[S]:0}}Promise.resolve(f).catch(d=>({value:d,[S]:0})).then(d=>{const[c,m]=T(d);n.postMessage(Object.assign(Object.assign({},c),{id:a}),m),t==="RELEASE"&&(n.removeEventListener("message",i),G(n),N in e&&typeof e[N]=="function"&&e[N]())}).catch(d=>{const[c,m]=T({value:new TypeError("Unserializable return value"),[S]:0});n.postMessage(Object.assign(Object.assign({},c),{id:a}),m)})}),n.start&&n.start()}function De(e){return e.constructor.name==="MessagePort"}function G(e){De(e)&&e.close()}function Ce(e,n){return L(e,[],n)}function M(e){if(e)throw new Error("Proxy has been released and is not useable")}function J(e){return v(e,{type:"RELEASE"}).then(()=>{G(e)})}const E=new WeakMap,k="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const n=(E.get(e)||0)-1;E.set(e,n),n===0&&J(e)});function Ne(e,n){const r=(E.get(n)||0)+1;E.set(n,r),k&&k.register(e,n,e)}function Pe(e){k&&k.unregister(e)}function L(e,n=[],r=function(){}){let i=!1;const s=new Proxy(r,{get(a,t){if(M(i),t===Ee)return()=>{Pe(s),J(e),i=!0};if(t==="then"){if(n.length===0)return{then:()=>s};const l=v(e,{type:"GET",path:n.map(o=>o.toString())}).then(b);return l.then.bind(l)}return L(e,[...n,t])},set(a,t,l){M(i);const[o,f]=T(l);return v(e,{type:"SET",path:[...n,t].map(d=>d.toString()),value:o},f).then(b)},apply(a,t,l){M(i);const o=n[n.length-1];if(o===xe)return v(e,{type:"ENDPOINT"}).then(b);if(o==="bind")return L(e,n.slice(0,-1));const[f,d]=V(l);return v(e,{type:"APPLY",path:n.map(c=>c.toString()),argumentList:f},d).then(b)},construct(a,t){M(i);const[l,o]=V(t);return v(e,{type:"CONSTRUCT",path:n.map(f=>f.toString()),argumentList:l},o).then(b)}});return Ne(s,e),s}function Le(e){return Array.prototype.concat.apply([],e)}function V(e){const n=e.map(T);return[n.map(r=>r[0]),Le(n.map(r=>r[1]))]}const Y=new WeakMap;function Ae(e,n){return Y.set(e,n),e}function Re(e){return Object.assign(e,{[W]:!0})}function T(e){for(const[n,r]of X)if(r.canHandle(e)){const[i,s]=r.serialize(e);return[{type:"HANDLER",name:n,value:i},s]}return[{type:"RAW",value:e},Y.get(e)||[]]}function b(e){switch(e.type){case"HANDLER":return X.get(e.name).deserialize(e.value);case"RAW":return e.value}}function v(e,n,r){return new Promise(i=>{const s=je();e.addEventListener("message",function a(t){!t.data||!t.data.id||t.data.id!==s||(e.removeEventListener("message",a),i(t.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:s},n),r)})}function je(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}var $e=Object.create,q=Object.defineProperty,qe=Object.getOwnPropertyDescriptor,Ie=Object.getOwnPropertyNames,ze=Object.getPrototypeOf,Be=Object.prototype.hasOwnProperty,u=(e,n)=>q(e,"name",{value:n,configurable:!0}),K=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(n,r)=>(typeof require<"u"?require:n)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')}),Q=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports),Ue=(e,n,r,i)=>{if(n&&typeof n=="object"||typeof n=="function")for(let s of Ie(n))!Be.call(e,s)&&s!==r&&q(e,s,{get:()=>n[s],enumerable:!(i=qe(n,s))||i.enumerable});return e},Ve=(e,n,r)=>(r=e!=null?$e(ze(e)):{},Ue(!e||!e.__esModule?q(r,"default",{value:e,enumerable:!0}):r,e)),We=Q((e,n)=>{(function(r,i){typeof define=="function"&&define.amd?define("stackframe",[],i):typeof e=="object"?n.exports=i():r.StackFrame=i()})(e,function(){function r(p){return!isNaN(parseFloat(p))&&isFinite(p)}u(r,"_isNumber");function i(p){return p.charAt(0).toUpperCase()+p.substring(1)}u(i,"_capitalize");function s(p){return function(){return this[p]}}u(s,"_getter");var a=["isConstructor","isEval","isNative","isToplevel"],t=["columnNumber","lineNumber"],l=["fileName","functionName","source"],o=["args"],f=["evalOrigin"],d=a.concat(t,l,o,f);function c(p){if(p)for(var y=0;y<d.length;y++)p[d[y]]!==void 0&&this["set"+i(d[y])](p[d[y]])}u(c,"StackFrame"),c.prototype={getArgs:function(){return this.args},setArgs:function(p){if(Object.prototype.toString.call(p)!=="[object Array]")throw new TypeError("Args must be an Array");this.args=p},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(p){if(p instanceof c)this.evalOrigin=p;else if(p instanceof Object)this.evalOrigin=new c(p);else throw new TypeError("Eval Origin must be an Object or StackFrame")},toString:function(){var p=this.getFileName()||"",y=this.getLineNumber()||"",w=this.getColumnNumber()||"",F=this.getFunctionName()||"";return this.getIsEval()?p?"[eval] ("+p+":"+y+":"+w+")":"[eval]:"+y+":"+w:F?F+" ("+p+":"+y+":"+w+")":p+":"+y+":"+w}},c.fromString=u(function(p){var y=p.indexOf("("),w=p.lastIndexOf(")"),F=p.substring(0,y),be=p.substring(y+1,w).split(","),U=p.substring(w+1);if(U.indexOf("@")===0)var C=/@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(U,""),ve=C[1],Fe=C[2],Me=C[3];return new c({functionName:F,args:be||void 0,fileName:ve,lineNumber:Fe||void 0,columnNumber:Me||void 0})},"StackFrame$$fromString");for(var m=0;m<a.length;m++)c.prototype["get"+i(a[m])]=s(a[m]),c.prototype["set"+i(a[m])]=function(p){return function(y){this[p]=!!y}}(a[m]);for(var _=0;_<t.length;_++)c.prototype["get"+i(t[_])]=s(t[_]),c.prototype["set"+i(t[_])]=function(p){return function(y){if(!r(y))throw new TypeError(p+" must be a Number");this[p]=Number(y)}}(t[_]);for(var g=0;g<l.length;g++)c.prototype["get"+i(l[g])]=s(l[g]),c.prototype["set"+i(l[g])]=function(p){return function(y){this[p]=String(y)}}(l[g]);return c})}),He=Q((e,n)=>{(function(r,i){typeof define=="function"&&define.amd?define("error-stack-parser",["stackframe"],i):typeof e=="object"?n.exports=i(We()):r.ErrorStackParser=i(r.StackFrame)})(e,u(function(r){var i=/(^|@)\S+:\d+/,s=/^\s*at .*(\S+:\d+|\(native\))/m,a=/^(eval@)?(\[native code])?$/;return{parse:u(function(t){if(typeof t.stacktrace<"u"||typeof t["opera#sourceloc"]<"u")return this.parseOpera(t);if(t.stack&&t.stack.match(s))return this.parseV8OrIE(t);if(t.stack)return this.parseFFOrSafari(t);throw new Error("Cannot parse given Error object")},"ErrorStackParser$$parse"),extractLocation:u(function(t){if(t.indexOf(":")===-1)return[t];var l=/(.+?)(?::(\d+))?(?::(\d+))?$/,o=l.exec(t.replace(/[()]/g,""));return[o[1],o[2]||void 0,o[3]||void 0]},"ErrorStackParser$$extractLocation"),parseV8OrIE:u(function(t){var l=t.stack.split(`
`).filter(function(o){return!!o.match(s)},this);return l.map(function(o){o.indexOf("(eval ")>-1&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));var f=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),d=f.match(/ (\(.+\)$)/);f=d?f.replace(d[0],""):f;var c=this.extractLocation(d?d[1]:f),m=d&&f||void 0,_=["eval","<anonymous>"].indexOf(c[0])>-1?void 0:c[0];return new r({functionName:m,fileName:_,lineNumber:c[1],columnNumber:c[2],source:o})},this)},"ErrorStackParser$$parseV8OrIE"),parseFFOrSafari:u(function(t){var l=t.stack.split(`
`).filter(function(o){return!o.match(a)},this);return l.map(function(o){if(o.indexOf(" > eval")>-1&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),o.indexOf("@")===-1&&o.indexOf(":")===-1)return new r({functionName:o});var f=/((.*".+"[^@]*)?[^@]*)(?:@)/,d=o.match(f),c=d&&d[1]?d[1]:void 0,m=this.extractLocation(o.replace(f,""));return new r({functionName:c,fileName:m[0],lineNumber:m[1],columnNumber:m[2],source:o})},this)},"ErrorStackParser$$parseFFOrSafari"),parseOpera:u(function(t){return!t.stacktrace||t.message.indexOf(`
`)>-1&&t.message.split(`
`).length>t.stacktrace.split(`
`).length?this.parseOpera9(t):t.stack?this.parseOpera11(t):this.parseOpera10(t)},"ErrorStackParser$$parseOpera"),parseOpera9:u(function(t){for(var l=/Line (\d+).*script (?:in )?(\S+)/i,o=t.message.split(`
`),f=[],d=2,c=o.length;d<c;d+=2){var m=l.exec(o[d]);m&&f.push(new r({fileName:m[2],lineNumber:m[1],source:o[d]}))}return f},"ErrorStackParser$$parseOpera9"),parseOpera10:u(function(t){for(var l=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,o=t.stacktrace.split(`
`),f=[],d=0,c=o.length;d<c;d+=2){var m=l.exec(o[d]);m&&f.push(new r({functionName:m[3]||void 0,fileName:m[2],lineNumber:m[1],source:o[d]}))}return f},"ErrorStackParser$$parseOpera10"),parseOpera11:u(function(t){var l=t.stack.split(`
`).filter(function(o){return!!o.match(i)&&!o.match(/^Error created at/)},this);return l.map(function(o){var f=o.split("@"),d=this.extractLocation(f.pop()),c=f.shift()||"",m=c.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^)]*\)/g,"")||void 0,_;c.match(/\(([^)]*)\)/)&&(_=c.replace(/^[^(]+\(([^)]*)\)$/,"$1"));var g=_===void 0||_==="[arguments not available]"?void 0:_.split(",");return new r({functionName:m,args:g,fileName:d[0],lineNumber:d[1],columnNumber:d[2],source:o})},this)},"ErrorStackParser$$parseOpera11")}},"ErrorStackParser"))}),Xe=Ve(He()),h=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string"&&typeof process.browser>"u",Z=h&&typeof j<"u"&&typeof j.exports<"u"&&typeof K<"u"&&typeof __dirname<"u",Ge=h&&!Z,Je=typeof Deno<"u",ee=!h&&!Je,Ye=ee&&typeof window<"u"&&typeof document<"u"&&typeof document.createElement<"u"&&typeof sessionStorage<"u",Ke=ee&&typeof importScripts<"u"&&typeof self<"u",ne,O,A,te,I,Qe=`"fetch" is not defined, maybe you're using node < 18? From Pyodide >= 0.25.0, node >= 18 is required. Older versions of Node.js may work, but it is not guaranteed or supported. Falling back to "node-fetch".`;async function z(){if(!h||(ne=(await import("./__vite-browser-external-CIEyP2s7.js")).default,I=await import("./__vite-browser-external-CIEyP2s7.js"),globalThis.fetch?O=fetch:(console.warn(Qe),O=(await import("./index-B489Fav_.js")).default),te=(await import("./__vite-browser-external-CIEyP2s7.js")).default,A=await import("./__vite-browser-external-CIEyP2s7.js"),B=A.sep,typeof K<"u"))return;let e=await import("./__vite-browser-external-CIEyP2s7.js"),n=await import("./__vite-browser-external-CIEyP2s7.js"),r=await import("./__vite-browser-external-CIEyP2s7.js"),i=await import("./__vite-browser-external-CIEyP2s7.js"),s={fs:e,crypto:n,ws:r,child_process:i};globalThis.require=function(a){return s[a]}}u(z,"initNodeModules");function re(e,n){return A.resolve(n||".",e)}u(re,"node_resolvePath");function ae(e,n){return n===void 0&&(n=location),new URL(e,n).toString()}u(ae,"browser_resolvePath");var R;h?R=re:R=ae;var B;h||(B="/");function ie(e,n){return e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?{response:O(e)}:{binary:I.readFile(e).then(r=>new Uint8Array(r.buffer,r.byteOffset,r.byteLength))}}u(ie,"node_getBinaryResponse");function oe(e,n){let r=new URL(e,location);return{response:fetch(r,n?{integrity:n}:{})}}u(oe,"browser_getBinaryResponse");var D;h?D=ie:D=oe;async function se(e,n){let{response:r,binary:i}=D(e,n);if(i)return i;let s=await r;if(!s.ok)throw new Error(`Failed to load '${e}': request failed.`);return new Uint8Array(await s.arrayBuffer())}u(se,"loadBinaryFile");var x;if(Ye)x=u(async e=>await import(e),"loadScript");else if(Ke)x=u(async e=>{try{globalThis.importScripts(e)}catch(n){if(n instanceof TypeError)await import(e);else throw n}},"loadScript");else if(h)x=le;else throw new Error("Cannot determine runtime environment");async function le(e){e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?te.runInThisContext(await(await O(e)).text()):await import(ne.pathToFileURL(e).href)}u(le,"nodeLoadScript");async function de(e){if(h){await z();let n=await I.readFile(e);return JSON.parse(n)}else return await(await fetch(e)).json()}u(de,"loadLockFile");async function fe(){if(Z)return __dirname;let e;try{throw new Error}catch(i){e=i}let n=Xe.default.parse(e)[0].fileName;if(Ge){let i=await import("./__vite-browser-external-CIEyP2s7.js");return(await import("./__vite-browser-external-CIEyP2s7.js")).fileURLToPath(i.dirname(n))}let r=n.lastIndexOf(B);if(r===-1)throw new Error("Could not extract indexURL path from pyodide module location");return n.slice(0,r)}u(fe,"calculateDirname");function ce(e){let n=e.FS,r=e.FS.filesystems.MEMFS,i=e.PATH,s={DIR_MODE:16895,FILE_MODE:33279,mount:function(a){if(!a.opts.fileSystemHandle)throw new Error("opts.fileSystemHandle is required");return r.mount.apply(null,arguments)},syncfs:async(a,t,l)=>{try{let o=s.getLocalSet(a),f=await s.getRemoteSet(a),d=t?f:o,c=t?o:f;await s.reconcile(a,d,c),l(null)}catch(o){l(o)}},getLocalSet:a=>{let t=Object.create(null);function l(d){return d!=="."&&d!==".."}u(l,"isRealDir");function o(d){return c=>i.join2(d,c)}u(o,"toAbsolute");let f=n.readdir(a.mountpoint).filter(l).map(o(a.mountpoint));for(;f.length;){let d=f.pop(),c=n.stat(d);n.isDir(c.mode)&&f.push.apply(f,n.readdir(d).filter(l).map(o(d))),t[d]={timestamp:c.mtime,mode:c.mode}}return{type:"local",entries:t}},getRemoteSet:async a=>{let t=Object.create(null),l=await Ze(a.opts.fileSystemHandle);for(let[o,f]of l)o!=="."&&(t[i.join2(a.mountpoint,o)]={timestamp:f.kind==="file"?(await f.getFile()).lastModifiedDate:new Date,mode:f.kind==="file"?s.FILE_MODE:s.DIR_MODE});return{type:"remote",entries:t,handles:l}},loadLocalEntry:a=>{let t=n.lookupPath(a).node,l=n.stat(a);if(n.isDir(l.mode))return{timestamp:l.mtime,mode:l.mode};if(n.isFile(l.mode))return t.contents=r.getFileDataAsTypedArray(t),{timestamp:l.mtime,mode:l.mode,contents:t.contents};throw new Error("node type not supported")},storeLocalEntry:(a,t)=>{if(n.isDir(t.mode))n.mkdirTree(a,t.mode);else if(n.isFile(t.mode))n.writeFile(a,t.contents,{canOwn:!0});else throw new Error("node type not supported");n.chmod(a,t.mode),n.utime(a,t.timestamp,t.timestamp)},removeLocalEntry:a=>{var t=n.stat(a);n.isDir(t.mode)?n.rmdir(a):n.isFile(t.mode)&&n.unlink(a)},loadRemoteEntry:async a=>{if(a.kind==="file"){let t=await a.getFile();return{contents:new Uint8Array(await t.arrayBuffer()),mode:s.FILE_MODE,timestamp:t.lastModifiedDate}}else{if(a.kind==="directory")return{mode:s.DIR_MODE,timestamp:new Date};throw new Error("unknown kind: "+a.kind)}},storeRemoteEntry:async(a,t,l)=>{let o=a.get(i.dirname(t)),f=n.isFile(l.mode)?await o.getFileHandle(i.basename(t),{create:!0}):await o.getDirectoryHandle(i.basename(t),{create:!0});if(f.kind==="file"){let d=await f.createWritable();await d.write(l.contents),await d.close()}a.set(t,f)},removeRemoteEntry:async(a,t)=>{await a.get(i.dirname(t)).removeEntry(i.basename(t)),a.delete(t)},reconcile:async(a,t,l)=>{let o=0,f=[];Object.keys(t.entries).forEach(function(m){let _=t.entries[m],g=l.entries[m];(!g||n.isFile(_.mode)&&_.timestamp.getTime()>g.timestamp.getTime())&&(f.push(m),o++)}),f.sort();let d=[];if(Object.keys(l.entries).forEach(function(m){t.entries[m]||(d.push(m),o++)}),d.sort().reverse(),!o)return;let c=t.type==="remote"?t.handles:l.handles;for(let m of f){let _=i.normalize(m.replace(a.mountpoint,"/")).substring(1);if(l.type==="local"){let g=c.get(_),p=await s.loadRemoteEntry(g);s.storeLocalEntry(m,p)}else{let g=s.loadLocalEntry(m);await s.storeRemoteEntry(c,_,g)}}for(let m of d)if(l.type==="local")s.removeLocalEntry(m);else{let _=i.normalize(m.replace(a.mountpoint,"/")).substring(1);await s.removeRemoteEntry(c,_)}}};e.FS.filesystems.NATIVEFS_ASYNC=s}u(ce,"initializeNativeFS");var Ze=u(async e=>{let n=[];async function r(s){for await(let a of s.values())n.push(a),a.kind==="directory"&&await r(a)}u(r,"collect"),await r(e);let i=new Map;i.set(".",e);for(let s of n){let a=(await e.resolve(s)).join("/");i.set(a,s)}return i},"getFsHandles");function me(){let e={};return e.noImageDecoding=!0,e.noAudioDecoding=!0,e.noWasmDecoding=!1,e.preRun=[],e.quit=(n,r)=>{throw e.exited={status:n,toThrow:r},r},e}u(me,"createModule");function pe(e,n){e.preRun.push(function(){let r="/";try{e.FS.mkdirTree(n)}catch(i){console.error(`Error occurred while making a home directory '${n}':`),console.error(i),console.error(`Using '${r}' for a home directory instead`),n=r}e.FS.chdir(n)})}u(pe,"createHomeDirectory");function ue(e,n){e.preRun.push(function(){Object.assign(e.ENV,n)})}u(ue,"setEnvironment");function _e(e,n){e.preRun.push(()=>{for(let r of n)e.FS.mkdirTree(r),e.FS.mount(e.FS.filesystems.NODEFS,{root:r},r)})}u(_e,"mountLocalDirectories");function ye(e,n){let r=se(n);e.preRun.push(()=>{let i=e._py_version_major(),s=e._py_version_minor();e.FS.mkdirTree("/lib"),e.FS.mkdirTree(`/lib/python${i}.${s}/site-packages`),e.addRunDependency("install-stdlib"),r.then(a=>{e.FS.writeFile(`/lib/python${i}${s}.zip`,a)}).catch(a=>{console.error("Error occurred while installing the standard library:"),console.error(a)}).finally(()=>{e.removeRunDependency("install-stdlib")})})}u(ye,"installStdlib");function ge(e,n){let r;n.stdLibURL!=null?r=n.stdLibURL:r=n.indexURL+"python_stdlib.zip",ye(e,r),pe(e,n.env.HOME),ue(e,n.env),_e(e,n._node_mounts),e.preRun.push(()=>ce(e))}u(ge,"initializeFileSystem");function he(e,n){let{binary:r,response:i}=D(n+"pyodide.asm.wasm");e.instantiateWasm=function(s,a){return async function(){try{let t;i?t=await WebAssembly.instantiateStreaming(i,s):t=await WebAssembly.instantiate(await r,s);let{instance:l,module:o}=t;typeof WasmOffsetConverter<"u"&&(wasmOffsetConverter=new WasmOffsetConverter(wasmBinary,o)),a(l,o)}catch(t){console.warn("wasm instantiation failed!"),console.warn(t)}}(),{}}}u(he,"preloadWasm");var P="0.25.0";async function we(e={}){await z();let n=e.indexURL||await fe();n=R(n),n.endsWith("/")||(n+="/"),e.indexURL=n;let r={fullStdLib:!1,jsglobals:globalThis,stdin:globalThis.prompt?globalThis.prompt:void 0,lockFileURL:n+"pyodide-lock.json",args:[],_node_mounts:[],env:{},packageCacheDir:n,packages:[]},i=Object.assign(r,e);i.env.HOME||(i.env.HOME="/home/pyodide");let s=me();s.print=i.stdout,s.printErr=i.stderr,s.arguments=i.args;let a={config:i};s.API=a,a.lockFilePromise=de(i.lockFileURL),he(s,n),ge(s,i);let t=new Promise(o=>s.postRun=o);if(s.locateFile=o=>i.indexURL+o,typeof _createPyodideModule!="function"){let o=`${i.indexURL}pyodide.asm.js`;await x(o)}if(await _createPyodideModule(s),await t,s.exited)throw s.exited.toThrow;if(e.pyproxyToStringRepr&&a.setPyProxyToStringMethod(!0),a.version!==P)throw new Error(`Pyodide version does not match: '${P}' <==> '${a.version}'. If you updated the Pyodide version, make sure you also updated the 'indexURL' parameter passed to loadPyodide.`);s.locateFile=o=>{throw new Error("Didn't expect to load any more file_packager files!")};let l=a.finalizeBootstrap();if(l.version.includes("dev")||a.setCdnUrl(`https://cdn.jsdelivr.net/pyodide/v${l.version}/full/`),await a.packageIndexReady,a._pyodide._importhook.register_module_not_found_hook(a._import_name_to_package_name,a.lockfile_unvendored_stdlibs_and_test),a.lockfile_info.version!==P)throw new Error("Lock file version doesn't match Pyodide version");return a.package_loader.init_loaded_packages(),i.fullStdLib&&await l.loadPackage(a.lockfile_unvendored_stdlibs),a.initializeStreams(i.stdin,i.stdout,i.stderr),l}u(we,"loadPyodide");async function en(e){const n={"api/app.py":`from __future__ import annotations

from typing import Any

from api.models import ChartModel, SessionModel
from api.services import browse_charts, get_next_chart


def loadData(filename: str):
  global session
  session = SessionModel(filename=filename)
  appendNextChart()
  return session.model_dump(by_alias=True, mode="json")


def appendChart(chart: dict[str, Any] | ChartModel):
  global session
  if isinstance(chart, dict):
    chart = ChartModel.model_validate(chart)
  session.charts.append(chart)
  return session.model_dump(by_alias=True, mode="json")


def appendNextChart():
  global session
  chart = get_next_chart(session)
  return chart.model_dump(by_alias=True, mode="json") if chart else None


def restoreSession(new_state: dict[str, Any] | SessionModel):
  global session
  if isinstance(new_state, dict):
    new_state = SessionModel.model_validate(new_state)
  session = new_state
  return session.model_dump(by_alias=True, mode="json")


def browseCharts(field_names: list[str]):
  global session
  browsed_chart = browse_charts(session, field_names)
  return [chart.model_dump(by_alias=True, mode="json") for chart in browsed_chart]
`,"api/models/__init__.py":`from .chart_model import ChartModel
from .data_field_model import DataFieldModel
from .metadata_model import FieldType, MetadataModel
from .session_model import SessionModel

__all__ = [
  "ChartModel",
  "DataFieldModel",
  "FieldType",
  "MetadataModel",
  "SessionModel",
]
`,"api/models/chart_model.py":`from typing import Any, Dict, List, Self

from api.utils import get_fields_hash, get_timestamp
from pydantic import BaseModel, Field, model_validator

from .data_field_model import DataFieldModel
from .model_config import DefaultConfig


class ChartModel(BaseModel):
  fields: tuple[DataFieldModel, ...] = Field(default_factory=tuple)
  specs: List[Dict[str, Any]] = Field(default_factory=list)
  title: str = Field(default="")
  description: str = Field(default="")

  spec_index: int = Field(default=0, init=False)
  preferred: bool = Field(default=False, init=False)
  timestamp: int = Field(default_factory=get_timestamp, init=False)

  attributes: tuple[str, ...] = Field(default_factory=tuple, init=False)
  key: str = Field(default="", init=False, repr=False)

  model_config = DefaultConfig

  @model_validator(mode="after")
  def after(self) -> Self:
    self.attributes = tuple([field.name for field in self.fields])
    self.key = f"chart-{str([field for field in self.attributes])}-{self.timestamp}"
    return self

  def __hash__(self):
    return get_fields_hash(self.fields)
`,"api/models/data_field_model.py":`import pandas as pd
from api.models.model_config import DefaultConfig
from api.utils.field_name import get_clingo_field_name
from pydantic import BaseModel

from .metadata_model import (
  FieldType,
  MetadataBase,
  MetadataCategorical,
  MetadataDatetime,
  MetadataModel,
  MetadataNumeric,
)


def get_field_type(df: pd.DataFrame, name: str) -> FieldType:
  if pd.api.types.is_datetime64_any_dtype(df[name]):
    return "datetime"

  if pd.api.types.is_numeric_dtype(df[name]):
    return "numeric"

  if df[name].nunique() > 10:
    return "name"

  return "categorical"


def get_field_metadata(df: pd.DataFrame, name: str) -> MetadataModel:
  type = get_field_type(df, name)

  if type == "numeric":
    return MetadataNumeric(
      type=type,
      count=len(df),
      unique=df[name].nunique(),
      missing=df[name].isnull().sum(),
      min=df[name].min(),
      max=df[name].max(),
      mean=df[name].mean(),
      median=df[name].median(),
      std=df[name].std(),
    )

  if type == "categorical":
    return MetadataCategorical(
      type=type,
      count=len(df),
      unique=df[name].nunique(),
      missing=df[name].isnull().sum(),
      top=str(df[name].mode().iloc[0]),
      freq=int(df[name].value_counts().iloc[0]),
    )

  if type == "datetime":
    return MetadataDatetime(
      type=type,
      count=len(df),
      unique=df[name].nunique(),
      missing=df[name].isnull().sum(),
      min=str(df[name].min()),
      max=str(df[name].max()),
    )

  return MetadataBase(
    type=type,
    count=len(df),
    unique=df[name].nunique(),
    missing=df[name].isnull().sum(),
  )


class DataFieldModel(BaseModel):
  name: str
  type: FieldType
  clingo_name: str
  metadata: MetadataModel

  model_config = DefaultConfig

  @classmethod
  def from_dataframe(cls, df: pd.DataFrame, name: str):
    metadata = get_field_metadata(df, name)
    return cls(
      name=name,
      type=metadata.type,
      clingo_name=get_clingo_field_name(name),
      metadata=metadata,
    )

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
  clear_field_name_cache,
  get_clingo_field_name,
  get_file_extension,
  get_timestamp,
)
from pydantic import BaseModel, Field, model_validator

from .chart_model import ChartModel
from .data_field_model import DataFieldModel
from .model_config import DefaultConfig

NEW_FIELD_P = 0.2


class SessionModel(BaseModel):
  df: pd.DataFrame = Field(default=None, repr=False, exclude=True)
  filename: str = Field(default="")
  timestamp: int = Field(default_factory=get_timestamp, init=False)
  charts: list["ChartModel"] = Field(default_factory=list, init=False)
  fields: list["DataFieldModel"] = Field(default_factory=list, init=False)

  model_config = DefaultConfig

  @model_validator(mode="after")
  def prosess_df(self) -> Self:
    clear_field_name_cache()
    if self.df is None:
      extension = get_file_extension(self.filename)
      self.df = getattr(pd, f"read_{extension}")(Path("./", self.filename))
      self.df = self.df if len(self.df) <= 5000 else self.df.sample(5000)
    self.fields = [DataFieldModel.from_dataframe(self.df, name) for name in self.df.columns]
    self.df.rename(columns=get_clingo_field_name, inplace=True)

    return self

  def get_attributes(self) -> list[tuple]:
    return [chart.attributes for chart in self.charts]

  @cached_property
  def available_fields(self) -> list[tuple[DataFieldModel, ...]]:
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
      if extra_field not in positional_fields
    ]

    return [*len_1_fields, *len_2_fields, *len_3_fields]

  @cached_property
  def visualizable_fields(self) -> list[DataFieldModel]:
    return [field for field in self.fields if field.type != "name"]
`,"api/services/__init__.py":`from .browse_charts import browse_charts
from .get_chart import get_chart
from .get_next_chart import get_next_chart

__all__ = ["get_chart", "browse_charts", "get_next_chart"]
`,"api/services/browse_charts.py":`from api.models.chart_model import ChartModel
from api.models.session_model import SessionModel

from .get_chart import get_chart


def browse_charts(state: SessionModel, field_names: list[str]) -> list[ChartModel]:
  if not (field_names and (0 < len(field_names) <= 3)):
    raise ValueError("Invalid number of fields to browse")

  # Input fields
  all_fields = state.fields

  input_fields = tuple(field for field in state.fields if field.name in field_names)
  # Add one more fields
  additional_fields = [field for field in all_fields if field not in input_fields]

  browse_fields = [
    input_fields,
    *[(*input_fields, field) for field in additional_fields],
  ][:10]
  charts = [get_chart(state.df, fields) for fields in browse_fields]
  return [chart for chart in charts if chart]
`,"api/services/get_chart.py":`from __future__ import annotations

import pandas as pd
from api.models import ChartModel, DataFieldModel

from .get_facts import get_facts_from_fields
from .get_specs import get_specs_from_facts


def get_chart(df: pd.DataFrame, fields: tuple[DataFieldModel, ...]) -> ChartModel | None:
  facts = get_facts_from_fields(df, fields)
  specs = get_specs_from_facts(df, facts)
  return None if not specs else ChartModel(fields=fields, specs=specs)
`,"api/services/get_facts.py":`import draco
import pandas as pd
from api.models import DataFieldModel
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
  ]


def _get_attribute_facts(df: pd.DataFrame, fields: list[str]) -> list[str]:
  base_scheme = draco.schema_from_dataframe(df[fields])
  base_scheme = {
    **base_scheme,
    "field": [rescale_field_to_32bit(f) for f in base_scheme["field"]],
  }
  facts = draco.dict_to_facts(base_scheme)
  return facts


def _get_encoding_facts(fields: list[str]) -> list[str]:
  facts = [
    f
    for i, field in enumerate(fields)
    for f in [f"entity(encoding,m0,e{i}).", f"attribute((encoding,field),e{i},{field})."]
  ]
  facts.extend(
    f"attribute((encoding,channel),e{i},{'x' if i == 0 else 'y'})."
    for i in range(min(2, len(fields)))
  )
  return facts


def get_facts_from_fields(df: pd.DataFrame, fields: tuple["DataFieldModel", ...]) -> list[str]:
  clingo_names = [field.clingo_name for field in fields]
  facts = (
    _get_base_facts() + _get_attribute_facts(df, clingo_names) + _get_encoding_facts(clingo_names)
  )
  return facts
`,"api/services/get_next_chart.py":`from __future__ import annotations

from typing import Sequence, TypeVar

from api.models import ChartModel, DataFieldModel, SessionModel
from numpy.random import choice

T = TypeVar("T")


def get_statistics_score(session: SessionModel, fields: tuple[DataFieldModel, ...]) -> float:
  return 1.0


def get_relevance_score(chart: ChartModel, fields: tuple[DataFieldModel, ...]) -> float:
  return 1.0


def get_preference_score(session: SessionModel, chart: ChartModel) -> float:
  return 1.0


def get_diminishing_penelty(session: SessionModel, chart: ChartModel) -> float:
  return 1.0


def sample_one(targets: Sequence[T], p: Sequence[float]) -> T:
  idx = choice(len(targets), 1, p=p)[0]
  return targets[idx]


def get_distribution(session: SessionModel, space: list[tuple[DataFieldModel, ...]]) -> list[float]:
  if not space:
    return [1 / len(session.visualizable_fields) for _ in session.visualizable_fields]
  return [1 / len(space) for _ in space]


def get_next_chart(session: SessionModel) -> ChartModel | None:
  current_chart = session.charts[-1] if session.charts else None

  if not current_chart:
    fields = sample_one(session.visualizable_fields, get_distribution(session, []))

  else:
    all_field_tuples = session.available_fields
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
`,"api/utils/__init__.py":`from .decorators import df_required, exception_handler
from .field_hash import get_fields_hash
from .field_name import (
  clear_field_name_cache,
  get_clingo_field_name,
  get_original_field_name,
  replace_clingo_field_name,
)
from .file_extension import get_file_extension
from .find import find, find_index
from .rescaler import rescale_field_to_32bit
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
  "clear_field_name_cache",
  "get_file_extension",
  "get_timestamp",
  "rescale_field_to_32bit",
  "get_fields_hash",
]
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
`,"api/utils/field_hash.py":`from typing import Sequence, TypeVar

T = TypeVar("T")


def get_fields_hash(fields: Sequence[T]) -> int:
  if len(fields) == 1:
    return hash(fields[0])
  elif len(fields) == 2:
    return hash(set(fields))
  elif len(fields) == 3:
    return hash(set(fields[:2])) + hash(fields[2])
  else:
    return 0
`,"api/utils/field_name.py":`from __future__ import annotations

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

  id = f"field_{len(id_to_name)}"

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


def clear_field_name_cache() -> None:
  id_to_name.clear()
  name_to_id.clear()
`,"api/utils/file_extension.py":`def get_file_extension(filename: str) -> str:
  return filename.split(".")[-1]
`,"api/utils/find.py":`from __future__ import annotations

from typing import Callable, TypeVar

T = TypeVar("T")


def find(lst: list[T], predicate: Callable[[T], bool]) -> T | None:
  return next((x for x in lst if predicate(x)), None)


def find_index(lst: list[T], predicate: Callable[[T], bool]) -> int:
  return next((i for i, x in enumerate(lst) if predicate(x)), -1)


__all__ = [
  "find",
  "find_index",
]
`,"api/utils/rescaler.py":`from __future__ import annotations

from math import log

from draco.schema import FieldProps

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
`,"api/utils/timestamp.py":`import time


def get_timestamp():
  return int(time.time() * 1000)
`};for(const[r,i]of Object.entries(n)){const s=r.split("/").slice(0,-1);let a="";for(const t of s){a=a?`${a}/${t}`:t;try{e.FS.mkdir(a)}catch{}}e.FS.writeFile(r,i)}}async function nn(e){await e.runPythonAsync(`from __future__ import annotations

from typing import Any

from api.models import ChartModel, SessionModel
from api.services import browse_charts, get_next_chart


def loadData(filename: str):
  global session
  session = SessionModel(filename=filename)
  appendNextChart()
  return session.model_dump(by_alias=True, mode="json")


def appendChart(chart: dict[str, Any] | ChartModel):
  global session
  if isinstance(chart, dict):
    chart = ChartModel.model_validate(chart)
  session.charts.append(chart)
  return session.model_dump(by_alias=True, mode="json")


def appendNextChart():
  global session
  chart = get_next_chart(session)
  return chart.model_dump(by_alias=True, mode="json") if chart else None


def restoreSession(new_state: dict[str, Any] | SessionModel):
  global session
  if isinstance(new_state, dict):
    new_state = SessionModel.model_validate(new_state)
  session = new_state
  return session.model_dump(by_alias=True, mode="json")


def browseCharts(field_names: list[str]):
  global session
  browsed_chart = browse_charts(session, field_names)
  return [chart.model_dump(by_alias=True, mode="json") for chart in browsed_chart]
`)}const tn={pyodide:null,async writeFile(e,n){try{if(!this.pyodide)throw new Error("Pyodide is not initialized");this.pyodide.FS.writeFile(e,n,{encoding:"binary",flags:"w"})}catch(r){throw console.error(r),r}},async readFile(e){try{if(!this.pyodide)throw new Error("Pyodide is not initialized");return this.pyodide.FS.readFile(`${e}`,{encoding:"utf-8"})}catch(n){throw console.error(n),n}},async initialize(e=[]){this.pyodide=await we({indexURL:"/Swipytics/artifacts"});for(const n of e)await this.pyodide.loadPackage(n);await en(this.pyodide);try{await nn(this.pyodide)}catch(n){console.error(n)}},terminate(){if(this.pyodide){const e=new Uint8Array(new SharedArrayBuffer(1));e[0]=2,this.pyodide.setInterruptBuffer(e),this.pyodide=null}},async runPython(e,n={}){if(!this.pyodide)throw new Error("Pyodide is not initialized");const r=this.pyodide.globals.get("dict")();for(const[i,s]of Object.entries(n))r.set(i,s);return this.pyodide.runPython(e,{globals:r})},async callPythonFunction(e,n={}){if(!this.pyodide)throw new Error("Pyodide is not initialized");const r=this.pyodide.globals.get(e);if(!r)throw new Error(`Function ${e} is not defined in globals`);const i=r.callKwargs(n);return i!=null&&i.toJs?i.toJs({dict_converter:Object.fromEntries}):i}};$(tn)});export default rn();
