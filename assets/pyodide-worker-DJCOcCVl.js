var Se=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports);var rn=Se((on,$)=>{/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const B=Symbol("Comlink.proxy"),ke=Symbol("Comlink.endpoint"),xe=Symbol("Comlink.releaseProxy"),T=Symbol("Comlink.finalizer"),S=Symbol("Comlink.thrown"),V=e=>typeof e=="object"&&e!==null||typeof e=="function",Oe={canHandle:e=>V(e)&&e[B],serialize(e){const{port1:n,port2:r}=new MessageChannel;return j(e,n),[r,[r]]},deserialize(e){return e.start(),Le(e)}},Pe={canHandle:e=>V(e)&&S in e,serialize({value:e}){let n;return e instanceof Error?n={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:n={isError:!1,value:e},[n,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},G=new Map([["proxy",Oe],["throw",Pe]]);function Ne(e,n){for(const r of e)if(n===r||r==="*"||r instanceof RegExp&&r.test(n))return!0;return!1}function j(e,n=globalThis,r=["*"]){n.addEventListener("message",function a(s){if(!s||!s.data)return;if(!Ne(r,s.origin)){console.warn(`Invalid origin '${s.origin}' for comlink proxy`);return}const{id:i,type:t,path:l}=Object.assign({path:[]},s.data),o=(s.data.argumentList||[]).map(b);let f;try{const d=l.slice(0,-1).reduce((m,_)=>m[_],e),c=l.reduce((m,_)=>m[_],e);switch(t){case"GET":f=c;break;case"SET":d[l.slice(-1)[0]]=b(s.data.value),f=!0;break;case"APPLY":f=c.apply(d,o);break;case"CONSTRUCT":{const m=new c(...o);f=Ae(m)}break;case"ENDPOINT":{const{port1:m,port2:_}=new MessageChannel;j(e,_),f=Re(m,[m])}break;case"RELEASE":f=void 0;break;default:return}}catch(d){f={value:d,[S]:0}}Promise.resolve(f).catch(d=>({value:d,[S]:0})).then(d=>{const[c,m]=P(d);n.postMessage(Object.assign(Object.assign({},c),{id:i}),m),t==="RELEASE"&&(n.removeEventListener("message",a),Y(n),T in e&&typeof e[T]=="function"&&e[T]())}).catch(d=>{const[c,m]=P({value:new TypeError("Unserializable return value"),[S]:0});n.postMessage(Object.assign(Object.assign({},c),{id:i}),m)})}),n.start&&n.start()}function De(e){return e.constructor.name==="MessagePort"}function Y(e){De(e)&&e.close()}function Le(e,n){return M(e,[],n)}function F(e){if(e)throw new Error("Proxy has been released and is not useable")}function K(e){return v(e,{type:"RELEASE"}).then(()=>{Y(e)})}const x=new WeakMap,O="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const n=(x.get(e)||0)-1;x.set(e,n),n===0&&K(e)});function Te(e,n){const r=(x.get(n)||0)+1;x.set(n,r),O&&O.register(e,n,e)}function Ce(e){O&&O.unregister(e)}function M(e,n=[],r=function(){}){let a=!1;const s=new Proxy(r,{get(i,t){if(F(a),t===xe)return()=>{Ce(s),K(e),a=!0};if(t==="then"){if(n.length===0)return{then:()=>s};const l=v(e,{type:"GET",path:n.map(o=>o.toString())}).then(b);return l.then.bind(l)}return M(e,[...n,t])},set(i,t,l){F(a);const[o,f]=P(l);return v(e,{type:"SET",path:[...n,t].map(d=>d.toString()),value:o},f).then(b)},apply(i,t,l){F(a);const o=n[n.length-1];if(o===ke)return v(e,{type:"ENDPOINT"}).then(b);if(o==="bind")return M(e,n.slice(0,-1));const[f,d]=W(l);return v(e,{type:"APPLY",path:n.map(c=>c.toString()),argumentList:f},d).then(b)},construct(i,t){F(a);const[l,o]=W(t);return v(e,{type:"CONSTRUCT",path:n.map(f=>f.toString()),argumentList:l},o).then(b)}});return Te(s,e),s}function Me(e){return Array.prototype.concat.apply([],e)}function W(e){const n=e.map(P);return[n.map(r=>r[0]),Me(n.map(r=>r[1]))]}const J=new WeakMap;function Re(e,n){return J.set(e,n),e}function Ae(e){return Object.assign(e,{[B]:!0})}function P(e){for(const[n,r]of G)if(r.canHandle(e)){const[a,s]=r.serialize(e);return[{type:"HANDLER",name:n,value:a},s]}return[{type:"RAW",value:e},J.get(e)||[]]}function b(e){switch(e.type){case"HANDLER":return G.get(e.name).deserialize(e.value);case"RAW":return e.value}}function v(e,n,r){return new Promise(a=>{const s=$e();e.addEventListener("message",function i(t){!t.data||!t.data.id||t.data.id!==s||(e.removeEventListener("message",i),a(t.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:s},n),r)})}function $e(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}var je=Object.create,I=Object.defineProperty,Ie=Object.getOwnPropertyDescriptor,qe=Object.getOwnPropertyNames,He=Object.getPrototypeOf,Ue=Object.prototype.hasOwnProperty,p=(e,n)=>I(e,"name",{value:n,configurable:!0}),X=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(n,r)=>(typeof require<"u"?require:n)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')}),Q=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports),ze=(e,n,r,a)=>{if(n&&typeof n=="object"||typeof n=="function")for(let s of qe(n))!Ue.call(e,s)&&s!==r&&I(e,s,{get:()=>n[s],enumerable:!(a=Ie(n,s))||a.enumerable});return e},We=(e,n,r)=>(r=e!=null?je(He(e)):{},ze(!e||!e.__esModule?I(r,"default",{value:e,enumerable:!0}):r,e)),Be=Q((e,n)=>{(function(r,a){typeof define=="function"&&define.amd?define("stackframe",[],a):typeof e=="object"?n.exports=a():r.StackFrame=a()})(e,function(){function r(u){return!isNaN(parseFloat(u))&&isFinite(u)}p(r,"_isNumber");function a(u){return u.charAt(0).toUpperCase()+u.substring(1)}p(a,"_capitalize");function s(u){return function(){return this[u]}}p(s,"_getter");var i=["isConstructor","isEval","isNative","isToplevel"],t=["columnNumber","lineNumber"],l=["fileName","functionName","source"],o=["args"],f=["evalOrigin"],d=i.concat(t,l,o,f);function c(u){if(u)for(var y=0;y<d.length;y++)u[d[y]]!==void 0&&this["set"+a(d[y])](u[d[y]])}p(c,"StackFrame"),c.prototype={getArgs:function(){return this.args},setArgs:function(u){if(Object.prototype.toString.call(u)!=="[object Array]")throw new TypeError("Args must be an Array");this.args=u},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(u){if(u instanceof c)this.evalOrigin=u;else if(u instanceof Object)this.evalOrigin=new c(u);else throw new TypeError("Eval Origin must be an Object or StackFrame")},toString:function(){var u=this.getFileName()||"",y=this.getLineNumber()||"",w=this.getColumnNumber()||"",E=this.getFunctionName()||"";return this.getIsEval()?u?"[eval] ("+u+":"+y+":"+w+")":"[eval]:"+y+":"+w:E?E+" ("+u+":"+y+":"+w+")":u+":"+y+":"+w}},c.fromString=p(function(u){var y=u.indexOf("("),w=u.lastIndexOf(")"),E=u.substring(0,y),be=u.substring(y+1,w).split(","),z=u.substring(w+1);if(z.indexOf("@")===0)var L=/@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(z,""),ve=L[1],Ee=L[2],Fe=L[3];return new c({functionName:E,args:be||void 0,fileName:ve,lineNumber:Ee||void 0,columnNumber:Fe||void 0})},"StackFrame$$fromString");for(var m=0;m<i.length;m++)c.prototype["get"+a(i[m])]=s(i[m]),c.prototype["set"+a(i[m])]=function(u){return function(y){this[u]=!!y}}(i[m]);for(var _=0;_<t.length;_++)c.prototype["get"+a(t[_])]=s(t[_]),c.prototype["set"+a(t[_])]=function(u){return function(y){if(!r(y))throw new TypeError(u+" must be a Number");this[u]=Number(y)}}(t[_]);for(var g=0;g<l.length;g++)c.prototype["get"+a(l[g])]=s(l[g]),c.prototype["set"+a(l[g])]=function(u){return function(y){this[u]=String(y)}}(l[g]);return c})}),Ve=Q((e,n)=>{(function(r,a){typeof define=="function"&&define.amd?define("error-stack-parser",["stackframe"],a):typeof e=="object"?n.exports=a(Be()):r.ErrorStackParser=a(r.StackFrame)})(e,p(function(r){var a=/(^|@)\S+:\d+/,s=/^\s*at .*(\S+:\d+|\(native\))/m,i=/^(eval@)?(\[native code])?$/;return{parse:p(function(t){if(typeof t.stacktrace<"u"||typeof t["opera#sourceloc"]<"u")return this.parseOpera(t);if(t.stack&&t.stack.match(s))return this.parseV8OrIE(t);if(t.stack)return this.parseFFOrSafari(t);throw new Error("Cannot parse given Error object")},"ErrorStackParser$$parse"),extractLocation:p(function(t){if(t.indexOf(":")===-1)return[t];var l=/(.+?)(?::(\d+))?(?::(\d+))?$/,o=l.exec(t.replace(/[()]/g,""));return[o[1],o[2]||void 0,o[3]||void 0]},"ErrorStackParser$$extractLocation"),parseV8OrIE:p(function(t){var l=t.stack.split(`
`).filter(function(o){return!!o.match(s)},this);return l.map(function(o){o.indexOf("(eval ")>-1&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));var f=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),d=f.match(/ (\(.+\)$)/);f=d?f.replace(d[0],""):f;var c=this.extractLocation(d?d[1]:f),m=d&&f||void 0,_=["eval","<anonymous>"].indexOf(c[0])>-1?void 0:c[0];return new r({functionName:m,fileName:_,lineNumber:c[1],columnNumber:c[2],source:o})},this)},"ErrorStackParser$$parseV8OrIE"),parseFFOrSafari:p(function(t){var l=t.stack.split(`
`).filter(function(o){return!o.match(i)},this);return l.map(function(o){if(o.indexOf(" > eval")>-1&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),o.indexOf("@")===-1&&o.indexOf(":")===-1)return new r({functionName:o});var f=/((.*".+"[^@]*)?[^@]*)(?:@)/,d=o.match(f),c=d&&d[1]?d[1]:void 0,m=this.extractLocation(o.replace(f,""));return new r({functionName:c,fileName:m[0],lineNumber:m[1],columnNumber:m[2],source:o})},this)},"ErrorStackParser$$parseFFOrSafari"),parseOpera:p(function(t){return!t.stacktrace||t.message.indexOf(`
`)>-1&&t.message.split(`
`).length>t.stacktrace.split(`
`).length?this.parseOpera9(t):t.stack?this.parseOpera11(t):this.parseOpera10(t)},"ErrorStackParser$$parseOpera"),parseOpera9:p(function(t){for(var l=/Line (\d+).*script (?:in )?(\S+)/i,o=t.message.split(`
`),f=[],d=2,c=o.length;d<c;d+=2){var m=l.exec(o[d]);m&&f.push(new r({fileName:m[2],lineNumber:m[1],source:o[d]}))}return f},"ErrorStackParser$$parseOpera9"),parseOpera10:p(function(t){for(var l=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,o=t.stacktrace.split(`
`),f=[],d=0,c=o.length;d<c;d+=2){var m=l.exec(o[d]);m&&f.push(new r({functionName:m[3]||void 0,fileName:m[2],lineNumber:m[1],source:o[d]}))}return f},"ErrorStackParser$$parseOpera10"),parseOpera11:p(function(t){var l=t.stack.split(`
`).filter(function(o){return!!o.match(a)&&!o.match(/^Error created at/)},this);return l.map(function(o){var f=o.split("@"),d=this.extractLocation(f.pop()),c=f.shift()||"",m=c.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^)]*\)/g,"")||void 0,_;c.match(/\(([^)]*)\)/)&&(_=c.replace(/^[^(]+\(([^)]*)\)$/,"$1"));var g=_===void 0||_==="[arguments not available]"?void 0:_.split(",");return new r({functionName:m,args:g,fileName:d[0],lineNumber:d[1],columnNumber:d[2],source:o})},this)},"ErrorStackParser$$parseOpera11")}},"ErrorStackParser"))}),Ge=We(Ve()),h=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string"&&typeof process.browser>"u",Z=h&&typeof $<"u"&&typeof $.exports<"u"&&typeof X<"u"&&typeof __dirname<"u",Ye=h&&!Z,Ke=typeof Deno<"u",ee=!h&&!Ke,Je=ee&&typeof window<"u"&&typeof document<"u"&&typeof document.createElement<"u"&&typeof sessionStorage<"u",Xe=ee&&typeof importScripts<"u"&&typeof self<"u",ne,N,R,te,q,Qe=`"fetch" is not defined, maybe you're using node < 18? From Pyodide >= 0.25.0, node >= 18 is required. Older versions of Node.js may work, but it is not guaranteed or supported. Falling back to "node-fetch".`;async function H(){if(!h||(ne=(await import("./__vite-browser-external-CIEyP2s7.js")).default,q=await import("./__vite-browser-external-CIEyP2s7.js"),globalThis.fetch?N=fetch:(console.warn(Qe),N=(await import("./index-B489Fav_.js")).default),te=(await import("./__vite-browser-external-CIEyP2s7.js")).default,R=await import("./__vite-browser-external-CIEyP2s7.js"),U=R.sep,typeof X<"u"))return;let e=await import("./__vite-browser-external-CIEyP2s7.js"),n=await import("./__vite-browser-external-CIEyP2s7.js"),r=await import("./__vite-browser-external-CIEyP2s7.js"),a=await import("./__vite-browser-external-CIEyP2s7.js"),s={fs:e,crypto:n,ws:r,child_process:a};globalThis.require=function(i){return s[i]}}p(H,"initNodeModules");function re(e,n){return R.resolve(n||".",e)}p(re,"node_resolvePath");function ie(e,n){return n===void 0&&(n=location),new URL(e,n).toString()}p(ie,"browser_resolvePath");var A;h?A=re:A=ie;var U;h||(U="/");function ae(e,n){return e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?{response:N(e)}:{binary:q.readFile(e).then(r=>new Uint8Array(r.buffer,r.byteOffset,r.byteLength))}}p(ae,"node_getBinaryResponse");function oe(e,n){let r=new URL(e,location);return{response:fetch(r,n?{integrity:n}:{})}}p(oe,"browser_getBinaryResponse");var D;h?D=ae:D=oe;async function se(e,n){let{response:r,binary:a}=D(e,n);if(a)return a;let s=await r;if(!s.ok)throw new Error(`Failed to load '${e}': request failed.`);return new Uint8Array(await s.arrayBuffer())}p(se,"loadBinaryFile");var k;if(Je)k=p(async e=>await import(e),"loadScript");else if(Xe)k=p(async e=>{try{globalThis.importScripts(e)}catch(n){if(n instanceof TypeError)await import(e);else throw n}},"loadScript");else if(h)k=le;else throw new Error("Cannot determine runtime environment");async function le(e){e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?te.runInThisContext(await(await N(e)).text()):await import(ne.pathToFileURL(e).href)}p(le,"nodeLoadScript");async function de(e){if(h){await H();let n=await q.readFile(e);return JSON.parse(n)}else return await(await fetch(e)).json()}p(de,"loadLockFile");async function fe(){if(Z)return __dirname;let e;try{throw new Error}catch(a){e=a}let n=Ge.default.parse(e)[0].fileName;if(Ye){let a=await import("./__vite-browser-external-CIEyP2s7.js");return(await import("./__vite-browser-external-CIEyP2s7.js")).fileURLToPath(a.dirname(n))}let r=n.lastIndexOf(U);if(r===-1)throw new Error("Could not extract indexURL path from pyodide module location");return n.slice(0,r)}p(fe,"calculateDirname");function ce(e){let n=e.FS,r=e.FS.filesystems.MEMFS,a=e.PATH,s={DIR_MODE:16895,FILE_MODE:33279,mount:function(i){if(!i.opts.fileSystemHandle)throw new Error("opts.fileSystemHandle is required");return r.mount.apply(null,arguments)},syncfs:async(i,t,l)=>{try{let o=s.getLocalSet(i),f=await s.getRemoteSet(i),d=t?f:o,c=t?o:f;await s.reconcile(i,d,c),l(null)}catch(o){l(o)}},getLocalSet:i=>{let t=Object.create(null);function l(d){return d!=="."&&d!==".."}p(l,"isRealDir");function o(d){return c=>a.join2(d,c)}p(o,"toAbsolute");let f=n.readdir(i.mountpoint).filter(l).map(o(i.mountpoint));for(;f.length;){let d=f.pop(),c=n.stat(d);n.isDir(c.mode)&&f.push.apply(f,n.readdir(d).filter(l).map(o(d))),t[d]={timestamp:c.mtime,mode:c.mode}}return{type:"local",entries:t}},getRemoteSet:async i=>{let t=Object.create(null),l=await Ze(i.opts.fileSystemHandle);for(let[o,f]of l)o!=="."&&(t[a.join2(i.mountpoint,o)]={timestamp:f.kind==="file"?(await f.getFile()).lastModifiedDate:new Date,mode:f.kind==="file"?s.FILE_MODE:s.DIR_MODE});return{type:"remote",entries:t,handles:l}},loadLocalEntry:i=>{let t=n.lookupPath(i).node,l=n.stat(i);if(n.isDir(l.mode))return{timestamp:l.mtime,mode:l.mode};if(n.isFile(l.mode))return t.contents=r.getFileDataAsTypedArray(t),{timestamp:l.mtime,mode:l.mode,contents:t.contents};throw new Error("node type not supported")},storeLocalEntry:(i,t)=>{if(n.isDir(t.mode))n.mkdirTree(i,t.mode);else if(n.isFile(t.mode))n.writeFile(i,t.contents,{canOwn:!0});else throw new Error("node type not supported");n.chmod(i,t.mode),n.utime(i,t.timestamp,t.timestamp)},removeLocalEntry:i=>{var t=n.stat(i);n.isDir(t.mode)?n.rmdir(i):n.isFile(t.mode)&&n.unlink(i)},loadRemoteEntry:async i=>{if(i.kind==="file"){let t=await i.getFile();return{contents:new Uint8Array(await t.arrayBuffer()),mode:s.FILE_MODE,timestamp:t.lastModifiedDate}}else{if(i.kind==="directory")return{mode:s.DIR_MODE,timestamp:new Date};throw new Error("unknown kind: "+i.kind)}},storeRemoteEntry:async(i,t,l)=>{let o=i.get(a.dirname(t)),f=n.isFile(l.mode)?await o.getFileHandle(a.basename(t),{create:!0}):await o.getDirectoryHandle(a.basename(t),{create:!0});if(f.kind==="file"){let d=await f.createWritable();await d.write(l.contents),await d.close()}i.set(t,f)},removeRemoteEntry:async(i,t)=>{await i.get(a.dirname(t)).removeEntry(a.basename(t)),i.delete(t)},reconcile:async(i,t,l)=>{let o=0,f=[];Object.keys(t.entries).forEach(function(m){let _=t.entries[m],g=l.entries[m];(!g||n.isFile(_.mode)&&_.timestamp.getTime()>g.timestamp.getTime())&&(f.push(m),o++)}),f.sort();let d=[];if(Object.keys(l.entries).forEach(function(m){t.entries[m]||(d.push(m),o++)}),d.sort().reverse(),!o)return;let c=t.type==="remote"?t.handles:l.handles;for(let m of f){let _=a.normalize(m.replace(i.mountpoint,"/")).substring(1);if(l.type==="local"){let g=c.get(_),u=await s.loadRemoteEntry(g);s.storeLocalEntry(m,u)}else{let g=s.loadLocalEntry(m);await s.storeRemoteEntry(c,_,g)}}for(let m of d)if(l.type==="local")s.removeLocalEntry(m);else{let _=a.normalize(m.replace(i.mountpoint,"/")).substring(1);await s.removeRemoteEntry(c,_)}}};e.FS.filesystems.NATIVEFS_ASYNC=s}p(ce,"initializeNativeFS");var Ze=p(async e=>{let n=[];async function r(s){for await(let i of s.values())n.push(i),i.kind==="directory"&&await r(i)}p(r,"collect"),await r(e);let a=new Map;a.set(".",e);for(let s of n){let i=(await e.resolve(s)).join("/");a.set(i,s)}return a},"getFsHandles");function me(){let e={};return e.noImageDecoding=!0,e.noAudioDecoding=!0,e.noWasmDecoding=!1,e.preRun=[],e.quit=(n,r)=>{throw e.exited={status:n,toThrow:r},r},e}p(me,"createModule");function ue(e,n){e.preRun.push(function(){let r="/";try{e.FS.mkdirTree(n)}catch(a){console.error(`Error occurred while making a home directory '${n}':`),console.error(a),console.error(`Using '${r}' for a home directory instead`),n=r}e.FS.chdir(n)})}p(ue,"createHomeDirectory");function pe(e,n){e.preRun.push(function(){Object.assign(e.ENV,n)})}p(pe,"setEnvironment");function _e(e,n){e.preRun.push(()=>{for(let r of n)e.FS.mkdirTree(r),e.FS.mount(e.FS.filesystems.NODEFS,{root:r},r)})}p(_e,"mountLocalDirectories");function ye(e,n){let r=se(n);e.preRun.push(()=>{let a=e._py_version_major(),s=e._py_version_minor();e.FS.mkdirTree("/lib"),e.FS.mkdirTree(`/lib/python${a}.${s}/site-packages`),e.addRunDependency("install-stdlib"),r.then(i=>{e.FS.writeFile(`/lib/python${a}${s}.zip`,i)}).catch(i=>{console.error("Error occurred while installing the standard library:"),console.error(i)}).finally(()=>{e.removeRunDependency("install-stdlib")})})}p(ye,"installStdlib");function ge(e,n){let r;n.stdLibURL!=null?r=n.stdLibURL:r=n.indexURL+"python_stdlib.zip",ye(e,r),ue(e,n.env.HOME),pe(e,n.env),_e(e,n._node_mounts),e.preRun.push(()=>ce(e))}p(ge,"initializeFileSystem");function he(e,n){let{binary:r,response:a}=D(n+"pyodide.asm.wasm");e.instantiateWasm=function(s,i){return async function(){try{let t;a?t=await WebAssembly.instantiateStreaming(a,s):t=await WebAssembly.instantiate(await r,s);let{instance:l,module:o}=t;typeof WasmOffsetConverter<"u"&&(wasmOffsetConverter=new WasmOffsetConverter(wasmBinary,o)),i(l,o)}catch(t){console.warn("wasm instantiation failed!"),console.warn(t)}}(),{}}}p(he,"preloadWasm");var C="0.25.0";async function we(e={}){await H();let n=e.indexURL||await fe();n=A(n),n.endsWith("/")||(n+="/"),e.indexURL=n;let r={fullStdLib:!1,jsglobals:globalThis,stdin:globalThis.prompt?globalThis.prompt:void 0,lockFileURL:n+"pyodide-lock.json",args:[],_node_mounts:[],env:{},packageCacheDir:n,packages:[]},a=Object.assign(r,e);a.env.HOME||(a.env.HOME="/home/pyodide");let s=me();s.print=a.stdout,s.printErr=a.stderr,s.arguments=a.args;let i={config:a};s.API=i,i.lockFilePromise=de(a.lockFileURL),he(s,n),ge(s,a);let t=new Promise(o=>s.postRun=o);if(s.locateFile=o=>a.indexURL+o,typeof _createPyodideModule!="function"){let o=`${a.indexURL}pyodide.asm.js`;await k(o)}if(await _createPyodideModule(s),await t,s.exited)throw s.exited.toThrow;if(e.pyproxyToStringRepr&&i.setPyProxyToStringMethod(!0),i.version!==C)throw new Error(`Pyodide version does not match: '${C}' <==> '${i.version}'. If you updated the Pyodide version, make sure you also updated the 'indexURL' parameter passed to loadPyodide.`);s.locateFile=o=>{throw new Error("Didn't expect to load any more file_packager files!")};let l=i.finalizeBootstrap();if(l.version.includes("dev")||i.setCdnUrl(`https://cdn.jsdelivr.net/pyodide/v${l.version}/full/`),await i.packageIndexReady,i._pyodide._importhook.register_module_not_found_hook(i._import_name_to_package_name,i.lockfile_unvendored_stdlibs_and_test),i.lockfile_info.version!==C)throw new Error("Lock file version doesn't match Pyodide version");return i.package_loader.init_loaded_packages(),a.fullStdLib&&await l.loadPackage(i.lockfile_unvendored_stdlibs),i.initializeStreams(a.stdin,a.stdout,a.stderr),l}p(we,"loadPyodide");async function en(e){const n={"api/app.py":`from __future__ import annotations

from typing import Any

from api.models import Session
from api.services import append_chart
from vega_datasets import data

default_df = data.cars()
state = Session(df=default_df, filename="cars.json")


def loadData(filename: str):
  state = Session(filename=filename)
  return state.model_dump(exclude={"df"})


def appendChart():
  return append_chart(state).model_dump()


def loadState(state_dict: dict[str, Any]):
  global state
  state = Session.model_validate(state_dict)
  return state.model_dump(exclude={"df"})


print("Python modules are loaded")
`,"api/models/__init__.py":`from .chart import Chart
from .data_field import DataField
from .session import Session

__all__ = [
  "Session",
  "Chart",
  "dataclass",
  "DataField",
]
`,"api/models/chart.py":`from typing import TYPE_CHECKING, Any, Dict, List, Self

from api.utils import get_timestamp
from pydantic import BaseModel, Field, model_validator

if TYPE_CHECKING:
  from api.models.data_field import DataField


class Chart(BaseModel):
  facts: List[str] = Field(default_factory=list)
  title: str = ""
  description: str = ""
  specs: List[Dict[str, Any]] = Field(default_factory=list)
  spec_index: int = Field(default=0, alias="specIndex")
  preferred: bool = False
  timestamp: int = Field(default_factory=get_timestamp)
  fields: list["DataField"] = Field(default_factory=list)
  key: str = Field(default="", init=False, repr=False)

  @model_validator(mode="after")
  def set_key(self) -> Self:
    self.key = f"chart-{str([field.name for field in self.fields])}"
    return self

  def __hash__(self):
    return hash(self.key)
`,"api/models/data_field.py":`from typing import Literal

import pandas as pd
from api.utils.field_name import get_clingo_field_name
from pydantic import BaseModel, ConfigDict

FieldType = Literal["categorical", "datetime", "numeric", "name"]


class MetadataBase(BaseModel):
  type: Literal["categorical", "datetime", "numeric", "name"]
  count: int
  unique: int
  missing: int


class MetadataNumeric(MetadataBase):
  type: Literal["numeric"]
  min: float
  max: float
  mean: float
  median: float
  std: float


class MetadataCategorical(MetadataBase):
  type: Literal["categorical"]
  top: str
  freq: int


class MetadataDatetime(MetadataBase):
  type: Literal["datetime"]
  min: str
  max: str


Metadata = (
  MetadataBase | MetadataNumeric | MetadataCategorical | MetadataDatetime
)


def get_field_type(df: pd.DataFrame, name: str) -> FieldType:
  dtype = df[name].dtype

  if "date" in str(dtype):
    return "datetime"

  if pd.api.types.is_numeric_dtype(dtype):
    return "numeric"

  if df[name].nunique() > 100:
    return "name"

  return "categorical"


def get_field_metadata(df: pd.DataFrame, name: str) -> Metadata:
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


class DataField(BaseModel):
  name: str
  type: FieldType
  clingo_name: str
  metadata: Metadata

  def __hash__(self) -> int:
    return hash(self.name)

  model_config = ConfigDict(arbitrary_types_allowed=True)

  @classmethod
  def from_dataframe(cls, df: pd.DataFrame, name: str):
    metadata = get_field_metadata(df, name)
    return cls(
      name=name,
      type=metadata.type,
      clingo_name=get_clingo_field_name(name),
      metadata=metadata,
    )


if __name__ == "__main__":
  from vega_datasets import data

  df = data.movies()
  field = DataField.from_dataframe(df, "Title")
  print(field)
`,"api/models/session.py":`from __future__ import annotations

from typing import Self

import pandas as pd
from anyio import Path
from api.utils import (
  clear_field_name_cache,
  get_clingo_field_name,
  get_file_extension,
  get_timestamp,
)
from pydantic import BaseModel, ConfigDict, Field, model_validator

from .chart import Chart
from .data_field import DataField

NEW_FIELD_P = 0.2


class Session(BaseModel):
  df: pd.DataFrame = Field(default=None, repr=False)
  filename: str = Field(default="")
  timestamp: int = Field(default_factory=get_timestamp, init=False)
  charts: list["Chart"] = Field(default_factory=list, init=False)
  fields: list["DataField"] = Field(default_factory=list, init=False)

  model_config = ConfigDict(arbitrary_types_allowed=True)

  base_field: "DataField" | None = Field(default=None, init=False, repr=False)

  @model_validator(mode="after")
  def prosess_df(self) -> Self:
    clear_field_name_cache()
    if self.df is None:
      extension = get_file_extension(self.filename)
      self.df = getattr(pd, f"read_{extension}")(Path("./", self.filename))
      self.df = self.df if len(self.df) <= 5000 else self.df.sample(5000)
    self.fields = [
      DataField.from_dataframe(self.df, name) for name in self.df.columns
    ]
    self.df.rename(columns=get_clingo_field_name, inplace=True)
    return self
`,"api/services/__init__.py":`from .chart import append_chart
from .data import load_data
from .facts import (
  get_attribute_facts,
  get_base_facts,
  get_encoding_facts,
  get_facts,
)
from .specs import get_specs_from_facts

__all__ = [
  "load_data",
  "append_chart",
  "get_encoding_facts",
  "get_base_facts",
  "get_specs_from_facts",
  "get_facts",
  "get_attribute_facts",
]
`,"api/services/chart.py":`from __future__ import annotations

from typing import TYPE_CHECKING

from api.models.chart import Chart
from api.utils import replace_clingo_field_name

from .facts import get_facts
from .specs import get_specs_from_facts

if TYPE_CHECKING:
  from api.models import Session


def append_chart(session: "Session") -> Chart:
  chart = None

  while chart is None:
    fields = session.get_fields()
    facts = get_facts(session, fields)
    specs = get_specs_from_facts(session, facts)
    chart = (
      Chart(
        specs=specs,
        facts=facts,
        attributes=replace_clingo_field_name(fields),
      )
      if len(specs) > 0
      else None
    )
    print(f"fields: {fields}")

  session.charts.append(chart)
  session.used_charts[fields[0]].add(chart)

  return chart
`,"api/services/facts.py":`from typing import TYPE_CHECKING

import draco
import pandas as pd

if TYPE_CHECKING:
  from api.models import Session


def get_base_facts() -> list[str]:
  return [
    "entity(view,root,v0).",
    "entity(mark,v0,m0).",
    ":- {entity(encoding,_,_)} > 3.",
    ":- {entity(mark,_,_)} != 1.",
    # Exclude tick mark
    ":- attribute((mark,type),m0, tick).",
  ]


def get_attribute_facts(df: pd.DataFrame, fields: list[str]) -> list[str]:
  base_scheme = draco.schema_from_dataframe(df[fields])
  return draco.dict_to_facts(base_scheme)


def get_encoding_facts(fields: list[str]) -> list[str]:
  return sum(
    [
      [
        f"entity(encoding,m0,e{code}).",
        f"attribute((encoding,field),e{code},{field}).",
      ]
      for code, field in enumerate(fields)
    ],
    [],
  )


def get_facts(session: "Session", fields: list[str]) -> list[str]:
  return (
    get_base_facts()
    + get_attribute_facts(session.df, fields)
    + get_encoding_facts(fields)
  )


__all__ = [
  "get_base_facts",
  "get_encoding_facts",
  "get_attribute_facts",
  "get_facts",
]
`,"api/services/recommendation.py":`from __future__ import annotations

import numpy as np
from api.models import DataField, Session
from api.utils.decorators import df_required
from numpy.random import choice

NEW_FIELD_P = 0.2


def _get_base_field(self: "Session") -> "DataField":
  p = np.full(len(self.fields), 1 / len(self.fields))
  return choice(self.fields, 1, p=p)[0]


def _get_rest_fields(
  self, fields: list["DataField"], n: int = 1
) -> list["DataField"]:
  new_fields = [field for field in self.fields if field not in fields]
  if len(new_fields) == 0:
    raise ValueError("No new fields")
  p = np.full(len(new_fields), 1 / len(new_fields))
  return choice(new_fields, n, p=p)


@df_required
def get_fields(self: Session) -> list[str]:
  if self.base_field is None:
    self.base_field = _get_base_field(self)
    return [self.base_field]

  # if len(self.used_charts[self.base_field]) == len(self.fields) - 1:
  #   self.base_field = _get_base_field(self)
  #   return [self.base_field]

  # if choice([True, False], 1, p=[NEW_FIELD_P, 1 - NEW_FIELD_P])[0]:
  #   self.base_field = self._get_base_field()
  #   return [self.base_field]

  # return [self.base_field, *self._get_rest_fields([self.base_field])]
`,"api/services/specs.py":`from typing import TYPE_CHECKING, Iterable

import altair as alt
import draco
import pandas as pd
from api.utils import replace_clingo_field_name
from clingo import Symbol
from draco.renderer import AltairRenderer

if TYPE_CHECKING:
  from api.models import Session

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
  return replace_clingo_field_name(clean_spec(vega))


def get_specs_from_facts(
  session: "Session",
  facts: list[str],
  num: int = 5,
) -> dict[str, tuple[list[str], dict]]:
  return [
    answer_set_to_spec(model.answer_set, session.df)
    for model in drc.complete_spec(facts, num)
  ]


__all__ = ["get_specs_from_facts"]
`,"api/utils/__init__.py":`from .decorators import df_required, exception_handler
from .field_name import (
  clear_field_name_cache,
  get_clingo_field_name,
  get_original_field_name,
  replace_clingo_field_name,
)
from .find import find, find_index
from .get_file_extension import get_file_extension
from .get_timestamp import get_timestamp

__all__ = [
  "df_required",
  "exception_handler",
  "get_file_extension",
  "get_timestamp",
  "find",
  "find_index",
  "get_clingo_field_name",
  "get_original_field_name",
  "replace_clingo_field_name",
  "clear_field_name_cache",
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
    return {
      k: replace_clingo_field_name(v) for k, v in clingo_field_name.items()
    }
  elif isinstance(clingo_field_name, list):
    return [replace_clingo_field_name(v) for v in clingo_field_name]
  else:
    return get_original_field_name(clingo_field_name)


def clear_field_name_cache() -> None:
  id_to_name.clear()
  name_to_id.clear()
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
`,"api/utils/get_file_extension.py":`def get_file_extension(filename: str) -> str:
  return filename.split(".")[-1]


__all__ = ["get_file_extension"]
`,"api/utils/get_timestamp.py":`import time


def get_timestamp():
  return int(time.time() * 1000)
`};for(const[r,a]of Object.entries(n)){const s=r.split("/").slice(0,-1);let i="";for(const t of s){i=i?`${i}/${t}`:t;try{e.FS.mkdir(i)}catch{}}e.FS.writeFile(r,a)}}async function nn(e){await e.runPythonAsync(`from __future__ import annotations

from typing import Any

from api.models import Session
from api.services import append_chart
from vega_datasets import data

default_df = data.cars()
state = Session(df=default_df, filename="cars.json")


def loadData(filename: str):
  state = Session(filename=filename)
  return state.model_dump(exclude={"df"})


def appendChart():
  return append_chart(state).model_dump()


def loadState(state_dict: dict[str, Any]):
  global state
  state = Session.model_validate(state_dict)
  return state.model_dump(exclude={"df"})


print("Python modules are loaded")
`)}const tn={pyodide:null,async writeFile(e,n){try{if(!this.pyodide)throw new Error("Pyodide is not initialized");this.pyodide.FS.writeFile(e,n,{encoding:"binary",flags:"w"})}catch(r){throw console.error(r),r}},async readFile(e){try{if(!this.pyodide)throw new Error("Pyodide is not initialized");return this.pyodide.FS.readFile(`${e}`,{encoding:"utf-8"})}catch(n){throw console.error(n),n}},async initialize(e=[]){this.pyodide=await we({indexURL:"/Swipytics/artifacts"});for(const n of e)await this.pyodide.loadPackage(n);await en(this.pyodide);try{await nn(this.pyodide)}catch(n){console.error(n)}},terminate(){if(this.pyodide){const e=new Uint8Array(new SharedArrayBuffer(1));e[0]=2,this.pyodide.setInterruptBuffer(e),this.pyodide=null}},async runPython(e,n={}){if(!this.pyodide)throw new Error("Pyodide is not initialized");const r=this.pyodide.globals.get("dict")();for(const[a,s]of Object.entries(n))r.set(a,s);return this.pyodide.runPython(e,{globals:r})},async callPythonFunction(e,n={}){if(!this.pyodide)throw new Error("Pyodide is not initialized");const r=this.pyodide.globals.get(e);if(!r)throw new Error(`Function ${e} is not defined in globals`);const a=r.callKwargs(n);return a!=null&&a.toJs?a.toJs({dict_converter:Object.fromEntries}):a}};j(tn)});export default rn();
