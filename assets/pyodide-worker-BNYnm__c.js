var Ee=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var rt=Ee((it,$)=>{/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const H=Symbol("Comlink.proxy"),Se=Symbol("Comlink.endpoint"),ke=Symbol("Comlink.releaseProxy"),P=Symbol("Comlink.finalizer"),E=Symbol("Comlink.thrown"),V=e=>typeof e=="object"&&e!==null||typeof e=="function",xe={canHandle:e=>V(e)&&e[H],serialize(e){const{port1:t,port2:r}=new MessageChannel;return j(e,t),[r,[r]]},deserialize(e){return e.start(),Ce(e)}},Oe={canHandle:e=>V(e)&&E in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},G=new Map([["proxy",xe],["throw",Oe]]);function De(e,t){for(const r of e)if(t===r||r==="*"||r instanceof RegExp&&r.test(t))return!0;return!1}function j(e,t=globalThis,r=["*"]){t.addEventListener("message",function i(s){if(!s||!s.data)return;if(!De(r,s.origin)){console.warn(`Invalid origin '${s.origin}' for comlink proxy`);return}const{id:a,type:n,path:l}=Object.assign({path:[]},s.data),o=(s.data.argumentList||[]).map(b);let f;try{const d=l.slice(0,-1).reduce((m,_)=>m[_],e),c=l.reduce((m,_)=>m[_],e);switch(n){case"GET":f=c;break;case"SET":d[l.slice(-1)[0]]=b(s.data.value),f=!0;break;case"APPLY":f=c.apply(d,o);break;case"CONSTRUCT":{const m=new c(...o);f=Re(m)}break;case"ENDPOINT":{const{port1:m,port2:_}=new MessageChannel;j(e,_),f=Ae(m,[m])}break;case"RELEASE":f=void 0;break;default:return}}catch(d){f={value:d,[E]:0}}Promise.resolve(f).catch(d=>({value:d,[E]:0})).then(d=>{const[c,m]=O(d);t.postMessage(Object.assign(Object.assign({},c),{id:a}),m),n==="RELEASE"&&(t.removeEventListener("message",i),J(t),P in e&&typeof e[P]=="function"&&e[P]())}).catch(d=>{const[c,m]=O({value:new TypeError("Unserializable return value"),[E]:0});t.postMessage(Object.assign(Object.assign({},c),{id:a}),m)})}),t.start&&t.start()}function Te(e){return e.constructor.name==="MessagePort"}function J(e){Te(e)&&e.close()}function Ce(e,t){return L(e,[],t)}function M(e){if(e)throw new Error("Proxy has been released and is not useable")}function Y(e){return v(e,{type:"RELEASE"}).then(()=>{J(e)})}const k=new WeakMap,x="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const t=(k.get(e)||0)-1;k.set(e,t),t===0&&Y(e)});function Pe(e,t){const r=(k.get(t)||0)+1;k.set(t,r),x&&x.register(e,t,e)}function Ne(e){x&&x.unregister(e)}function L(e,t=[],r=function(){}){let i=!1;const s=new Proxy(r,{get(a,n){if(M(i),n===ke)return()=>{Ne(s),Y(e),i=!0};if(n==="then"){if(t.length===0)return{then:()=>s};const l=v(e,{type:"GET",path:t.map(o=>o.toString())}).then(b);return l.then.bind(l)}return L(e,[...t,n])},set(a,n,l){M(i);const[o,f]=O(l);return v(e,{type:"SET",path:[...t,n].map(d=>d.toString()),value:o},f).then(b)},apply(a,n,l){M(i);const o=t[t.length-1];if(o===Se)return v(e,{type:"ENDPOINT"}).then(b);if(o==="bind")return L(e,t.slice(0,-1));const[f,d]=W(l);return v(e,{type:"APPLY",path:t.map(c=>c.toString()),argumentList:f},d).then(b)},construct(a,n){M(i);const[l,o]=W(n);return v(e,{type:"CONSTRUCT",path:t.map(f=>f.toString()),argumentList:l},o).then(b)}});return Pe(s,e),s}function Le(e){return Array.prototype.concat.apply([],e)}function W(e){const t=e.map(O);return[t.map(r=>r[0]),Le(t.map(r=>r[1]))]}const K=new WeakMap;function Ae(e,t){return K.set(e,t),e}function Re(e){return Object.assign(e,{[H]:!0})}function O(e){for(const[t,r]of G)if(r.canHandle(e)){const[i,s]=r.serialize(e);return[{type:"HANDLER",name:t,value:i},s]}return[{type:"RAW",value:e},K.get(e)||[]]}function b(e){switch(e.type){case"HANDLER":return G.get(e.name).deserialize(e.value);case"RAW":return e.value}}function v(e,t,r){return new Promise(i=>{const s=$e();e.addEventListener("message",function a(n){!n.data||!n.data.id||n.data.id!==s||(e.removeEventListener("message",a),i(n.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:s},t),r)})}function $e(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}var je=Object.create,I=Object.defineProperty,Ie=Object.getOwnPropertyDescriptor,qe=Object.getOwnPropertyNames,Ue=Object.getPrototypeOf,ze=Object.prototype.hasOwnProperty,p=(e,t)=>I(e,"name",{value:t,configurable:!0}),X=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')}),Q=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Be=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of qe(t))!ze.call(e,s)&&s!==r&&I(e,s,{get:()=>t[s],enumerable:!(i=Ie(t,s))||i.enumerable});return e},We=(e,t,r)=>(r=e!=null?je(Ue(e)):{},Be(!e||!e.__esModule?I(r,"default",{value:e,enumerable:!0}):r,e)),He=Q((e,t)=>{(function(r,i){typeof define=="function"&&define.amd?define("stackframe",[],i):typeof e=="object"?t.exports=i():r.StackFrame=i()})(e,function(){function r(u){return!isNaN(parseFloat(u))&&isFinite(u)}p(r,"_isNumber");function i(u){return u.charAt(0).toUpperCase()+u.substring(1)}p(i,"_capitalize");function s(u){return function(){return this[u]}}p(s,"_getter");var a=["isConstructor","isEval","isNative","isToplevel"],n=["columnNumber","lineNumber"],l=["fileName","functionName","source"],o=["args"],f=["evalOrigin"],d=a.concat(n,l,o,f);function c(u){if(u)for(var g=0;g<d.length;g++)u[d[g]]!==void 0&&this["set"+i(d[g])](u[d[g]])}p(c,"StackFrame"),c.prototype={getArgs:function(){return this.args},setArgs:function(u){if(Object.prototype.toString.call(u)!=="[object Array]")throw new TypeError("Args must be an Array");this.args=u},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(u){if(u instanceof c)this.evalOrigin=u;else if(u instanceof Object)this.evalOrigin=new c(u);else throw new TypeError("Eval Origin must be an Object or StackFrame")},toString:function(){var u=this.getFileName()||"",g=this.getLineNumber()||"",w=this.getColumnNumber()||"",F=this.getFunctionName()||"";return this.getIsEval()?u?"[eval] ("+u+":"+g+":"+w+")":"[eval]:"+g+":"+w:F?F+" ("+u+":"+g+":"+w+")":u+":"+g+":"+w}},c.fromString=p(function(u){var g=u.indexOf("("),w=u.lastIndexOf(")"),F=u.substring(0,g),be=u.substring(g+1,w).split(","),B=u.substring(w+1);if(B.indexOf("@")===0)var C=/@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(B,""),ve=C[1],Fe=C[2],Me=C[3];return new c({functionName:F,args:be||void 0,fileName:ve,lineNumber:Fe||void 0,columnNumber:Me||void 0})},"StackFrame$$fromString");for(var m=0;m<a.length;m++)c.prototype["get"+i(a[m])]=s(a[m]),c.prototype["set"+i(a[m])]=function(u){return function(g){this[u]=!!g}}(a[m]);for(var _=0;_<n.length;_++)c.prototype["get"+i(n[_])]=s(n[_]),c.prototype["set"+i(n[_])]=function(u){return function(g){if(!r(g))throw new TypeError(u+" must be a Number");this[u]=Number(g)}}(n[_]);for(var y=0;y<l.length;y++)c.prototype["get"+i(l[y])]=s(l[y]),c.prototype["set"+i(l[y])]=function(u){return function(g){this[u]=String(g)}}(l[y]);return c})}),Ve=Q((e,t)=>{(function(r,i){typeof define=="function"&&define.amd?define("error-stack-parser",["stackframe"],i):typeof e=="object"?t.exports=i(He()):r.ErrorStackParser=i(r.StackFrame)})(e,p(function(r){var i=/(^|@)\S+:\d+/,s=/^\s*at .*(\S+:\d+|\(native\))/m,a=/^(eval@)?(\[native code])?$/;return{parse:p(function(n){if(typeof n.stacktrace<"u"||typeof n["opera#sourceloc"]<"u")return this.parseOpera(n);if(n.stack&&n.stack.match(s))return this.parseV8OrIE(n);if(n.stack)return this.parseFFOrSafari(n);throw new Error("Cannot parse given Error object")},"ErrorStackParser$$parse"),extractLocation:p(function(n){if(n.indexOf(":")===-1)return[n];var l=/(.+?)(?::(\d+))?(?::(\d+))?$/,o=l.exec(n.replace(/[()]/g,""));return[o[1],o[2]||void 0,o[3]||void 0]},"ErrorStackParser$$extractLocation"),parseV8OrIE:p(function(n){var l=n.stack.split(`
`).filter(function(o){return!!o.match(s)},this);return l.map(function(o){o.indexOf("(eval ")>-1&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));var f=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),d=f.match(/ (\(.+\)$)/);f=d?f.replace(d[0],""):f;var c=this.extractLocation(d?d[1]:f),m=d&&f||void 0,_=["eval","<anonymous>"].indexOf(c[0])>-1?void 0:c[0];return new r({functionName:m,fileName:_,lineNumber:c[1],columnNumber:c[2],source:o})},this)},"ErrorStackParser$$parseV8OrIE"),parseFFOrSafari:p(function(n){var l=n.stack.split(`
`).filter(function(o){return!o.match(a)},this);return l.map(function(o){if(o.indexOf(" > eval")>-1&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),o.indexOf("@")===-1&&o.indexOf(":")===-1)return new r({functionName:o});var f=/((.*".+"[^@]*)?[^@]*)(?:@)/,d=o.match(f),c=d&&d[1]?d[1]:void 0,m=this.extractLocation(o.replace(f,""));return new r({functionName:c,fileName:m[0],lineNumber:m[1],columnNumber:m[2],source:o})},this)},"ErrorStackParser$$parseFFOrSafari"),parseOpera:p(function(n){return!n.stacktrace||n.message.indexOf(`
`)>-1&&n.message.split(`
`).length>n.stacktrace.split(`
`).length?this.parseOpera9(n):n.stack?this.parseOpera11(n):this.parseOpera10(n)},"ErrorStackParser$$parseOpera"),parseOpera9:p(function(n){for(var l=/Line (\d+).*script (?:in )?(\S+)/i,o=n.message.split(`
`),f=[],d=2,c=o.length;d<c;d+=2){var m=l.exec(o[d]);m&&f.push(new r({fileName:m[2],lineNumber:m[1],source:o[d]}))}return f},"ErrorStackParser$$parseOpera9"),parseOpera10:p(function(n){for(var l=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,o=n.stacktrace.split(`
`),f=[],d=0,c=o.length;d<c;d+=2){var m=l.exec(o[d]);m&&f.push(new r({functionName:m[3]||void 0,fileName:m[2],lineNumber:m[1],source:o[d]}))}return f},"ErrorStackParser$$parseOpera10"),parseOpera11:p(function(n){var l=n.stack.split(`
`).filter(function(o){return!!o.match(i)&&!o.match(/^Error created at/)},this);return l.map(function(o){var f=o.split("@"),d=this.extractLocation(f.pop()),c=f.shift()||"",m=c.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^)]*\)/g,"")||void 0,_;c.match(/\(([^)]*)\)/)&&(_=c.replace(/^[^(]+\(([^)]*)\)$/,"$1"));var y=_===void 0||_==="[arguments not available]"?void 0:_.split(",");return new r({functionName:m,args:y,fileName:d[0],lineNumber:d[1],columnNumber:d[2],source:o})},this)},"ErrorStackParser$$parseOpera11")}},"ErrorStackParser"))}),Ge=We(Ve()),h=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string"&&typeof process.browser>"u",Z=h&&typeof $<"u"&&typeof $.exports<"u"&&typeof X<"u"&&typeof __dirname<"u",Je=h&&!Z,Ye=typeof Deno<"u",ee=!h&&!Ye,Ke=ee&&typeof window<"u"&&typeof document<"u"&&typeof document.createElement<"u"&&typeof sessionStorage<"u",Xe=ee&&typeof importScripts<"u"&&typeof self<"u",te,D,A,ne,q,Qe=`"fetch" is not defined, maybe you're using node < 18? From Pyodide >= 0.25.0, node >= 18 is required. Older versions of Node.js may work, but it is not guaranteed or supported. Falling back to "node-fetch".`;async function U(){if(!h||(te=(await import("./__vite-browser-external-CIEyP2s7.js")).default,q=await import("./__vite-browser-external-CIEyP2s7.js"),globalThis.fetch?D=fetch:(console.warn(Qe),D=(await import("./index-B489Fav_.js")).default),ne=(await import("./__vite-browser-external-CIEyP2s7.js")).default,A=await import("./__vite-browser-external-CIEyP2s7.js"),z=A.sep,typeof X<"u"))return;let e=await import("./__vite-browser-external-CIEyP2s7.js"),t=await import("./__vite-browser-external-CIEyP2s7.js"),r=await import("./__vite-browser-external-CIEyP2s7.js"),i=await import("./__vite-browser-external-CIEyP2s7.js"),s={fs:e,crypto:t,ws:r,child_process:i};globalThis.require=function(a){return s[a]}}p(U,"initNodeModules");function re(e,t){return A.resolve(t||".",e)}p(re,"node_resolvePath");function ae(e,t){return t===void 0&&(t=location),new URL(e,t).toString()}p(ae,"browser_resolvePath");var R;h?R=re:R=ae;var z;h||(z="/");function ie(e,t){return e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?{response:D(e)}:{binary:q.readFile(e).then(r=>new Uint8Array(r.buffer,r.byteOffset,r.byteLength))}}p(ie,"node_getBinaryResponse");function oe(e,t){let r=new URL(e,location);return{response:fetch(r,t?{integrity:t}:{})}}p(oe,"browser_getBinaryResponse");var T;h?T=ie:T=oe;async function se(e,t){let{response:r,binary:i}=T(e,t);if(i)return i;let s=await r;if(!s.ok)throw new Error(`Failed to load '${e}': request failed.`);return new Uint8Array(await s.arrayBuffer())}p(se,"loadBinaryFile");var S;if(Ke)S=p(async e=>await import(e),"loadScript");else if(Xe)S=p(async e=>{try{globalThis.importScripts(e)}catch(t){if(t instanceof TypeError)await import(e);else throw t}},"loadScript");else if(h)S=le;else throw new Error("Cannot determine runtime environment");async function le(e){e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?ne.runInThisContext(await(await D(e)).text()):await import(te.pathToFileURL(e).href)}p(le,"nodeLoadScript");async function de(e){if(h){await U();let t=await q.readFile(e);return JSON.parse(t)}else return await(await fetch(e)).json()}p(de,"loadLockFile");async function fe(){if(Z)return __dirname;let e;try{throw new Error}catch(i){e=i}let t=Ge.default.parse(e)[0].fileName;if(Je){let i=await import("./__vite-browser-external-CIEyP2s7.js");return(await import("./__vite-browser-external-CIEyP2s7.js")).fileURLToPath(i.dirname(t))}let r=t.lastIndexOf(z);if(r===-1)throw new Error("Could not extract indexURL path from pyodide module location");return t.slice(0,r)}p(fe,"calculateDirname");function ce(e){let t=e.FS,r=e.FS.filesystems.MEMFS,i=e.PATH,s={DIR_MODE:16895,FILE_MODE:33279,mount:function(a){if(!a.opts.fileSystemHandle)throw new Error("opts.fileSystemHandle is required");return r.mount.apply(null,arguments)},syncfs:async(a,n,l)=>{try{let o=s.getLocalSet(a),f=await s.getRemoteSet(a),d=n?f:o,c=n?o:f;await s.reconcile(a,d,c),l(null)}catch(o){l(o)}},getLocalSet:a=>{let n=Object.create(null);function l(d){return d!=="."&&d!==".."}p(l,"isRealDir");function o(d){return c=>i.join2(d,c)}p(o,"toAbsolute");let f=t.readdir(a.mountpoint).filter(l).map(o(a.mountpoint));for(;f.length;){let d=f.pop(),c=t.stat(d);t.isDir(c.mode)&&f.push.apply(f,t.readdir(d).filter(l).map(o(d))),n[d]={timestamp:c.mtime,mode:c.mode}}return{type:"local",entries:n}},getRemoteSet:async a=>{let n=Object.create(null),l=await Ze(a.opts.fileSystemHandle);for(let[o,f]of l)o!=="."&&(n[i.join2(a.mountpoint,o)]={timestamp:f.kind==="file"?(await f.getFile()).lastModifiedDate:new Date,mode:f.kind==="file"?s.FILE_MODE:s.DIR_MODE});return{type:"remote",entries:n,handles:l}},loadLocalEntry:a=>{let n=t.lookupPath(a).node,l=t.stat(a);if(t.isDir(l.mode))return{timestamp:l.mtime,mode:l.mode};if(t.isFile(l.mode))return n.contents=r.getFileDataAsTypedArray(n),{timestamp:l.mtime,mode:l.mode,contents:n.contents};throw new Error("node type not supported")},storeLocalEntry:(a,n)=>{if(t.isDir(n.mode))t.mkdirTree(a,n.mode);else if(t.isFile(n.mode))t.writeFile(a,n.contents,{canOwn:!0});else throw new Error("node type not supported");t.chmod(a,n.mode),t.utime(a,n.timestamp,n.timestamp)},removeLocalEntry:a=>{var n=t.stat(a);t.isDir(n.mode)?t.rmdir(a):t.isFile(n.mode)&&t.unlink(a)},loadRemoteEntry:async a=>{if(a.kind==="file"){let n=await a.getFile();return{contents:new Uint8Array(await n.arrayBuffer()),mode:s.FILE_MODE,timestamp:n.lastModifiedDate}}else{if(a.kind==="directory")return{mode:s.DIR_MODE,timestamp:new Date};throw new Error("unknown kind: "+a.kind)}},storeRemoteEntry:async(a,n,l)=>{let o=a.get(i.dirname(n)),f=t.isFile(l.mode)?await o.getFileHandle(i.basename(n),{create:!0}):await o.getDirectoryHandle(i.basename(n),{create:!0});if(f.kind==="file"){let d=await f.createWritable();await d.write(l.contents),await d.close()}a.set(n,f)},removeRemoteEntry:async(a,n)=>{await a.get(i.dirname(n)).removeEntry(i.basename(n)),a.delete(n)},reconcile:async(a,n,l)=>{let o=0,f=[];Object.keys(n.entries).forEach(function(m){let _=n.entries[m],y=l.entries[m];(!y||t.isFile(_.mode)&&_.timestamp.getTime()>y.timestamp.getTime())&&(f.push(m),o++)}),f.sort();let d=[];if(Object.keys(l.entries).forEach(function(m){n.entries[m]||(d.push(m),o++)}),d.sort().reverse(),!o)return;let c=n.type==="remote"?n.handles:l.handles;for(let m of f){let _=i.normalize(m.replace(a.mountpoint,"/")).substring(1);if(l.type==="local"){let y=c.get(_),u=await s.loadRemoteEntry(y);s.storeLocalEntry(m,u)}else{let y=s.loadLocalEntry(m);await s.storeRemoteEntry(c,_,y)}}for(let m of d)if(l.type==="local")s.removeLocalEntry(m);else{let _=i.normalize(m.replace(a.mountpoint,"/")).substring(1);await s.removeRemoteEntry(c,_)}}};e.FS.filesystems.NATIVEFS_ASYNC=s}p(ce,"initializeNativeFS");var Ze=p(async e=>{let t=[];async function r(s){for await(let a of s.values())t.push(a),a.kind==="directory"&&await r(a)}p(r,"collect"),await r(e);let i=new Map;i.set(".",e);for(let s of t){let a=(await e.resolve(s)).join("/");i.set(a,s)}return i},"getFsHandles");function me(){let e={};return e.noImageDecoding=!0,e.noAudioDecoding=!0,e.noWasmDecoding=!1,e.preRun=[],e.quit=(t,r)=>{throw e.exited={status:t,toThrow:r},r},e}p(me,"createModule");function ue(e,t){e.preRun.push(function(){let r="/";try{e.FS.mkdirTree(t)}catch(i){console.error(`Error occurred while making a home directory '${t}':`),console.error(i),console.error(`Using '${r}' for a home directory instead`),t=r}e.FS.chdir(t)})}p(ue,"createHomeDirectory");function pe(e,t){e.preRun.push(function(){Object.assign(e.ENV,t)})}p(pe,"setEnvironment");function _e(e,t){e.preRun.push(()=>{for(let r of t)e.FS.mkdirTree(r),e.FS.mount(e.FS.filesystems.NODEFS,{root:r},r)})}p(_e,"mountLocalDirectories");function ge(e,t){let r=se(t);e.preRun.push(()=>{let i=e._py_version_major(),s=e._py_version_minor();e.FS.mkdirTree("/lib"),e.FS.mkdirTree(`/lib/python${i}.${s}/site-packages`),e.addRunDependency("install-stdlib"),r.then(a=>{e.FS.writeFile(`/lib/python${i}${s}.zip`,a)}).catch(a=>{console.error("Error occurred while installing the standard library:"),console.error(a)}).finally(()=>{e.removeRunDependency("install-stdlib")})})}p(ge,"installStdlib");function ye(e,t){let r;t.stdLibURL!=null?r=t.stdLibURL:r=t.indexURL+"python_stdlib.zip",ge(e,r),ue(e,t.env.HOME),pe(e,t.env),_e(e,t._node_mounts),e.preRun.push(()=>ce(e))}p(ye,"initializeFileSystem");function he(e,t){let{binary:r,response:i}=T(t+"pyodide.asm.wasm");e.instantiateWasm=function(s,a){return async function(){try{let n;i?n=await WebAssembly.instantiateStreaming(i,s):n=await WebAssembly.instantiate(await r,s);let{instance:l,module:o}=n;typeof WasmOffsetConverter<"u"&&(wasmOffsetConverter=new WasmOffsetConverter(wasmBinary,o)),a(l,o)}catch(n){console.warn("wasm instantiation failed!"),console.warn(n)}}(),{}}}p(he,"preloadWasm");var N="0.25.0";async function we(e={}){await U();let t=e.indexURL||await fe();t=R(t),t.endsWith("/")||(t+="/"),e.indexURL=t;let r={fullStdLib:!1,jsglobals:globalThis,stdin:globalThis.prompt?globalThis.prompt:void 0,lockFileURL:t+"pyodide-lock.json",args:[],_node_mounts:[],env:{},packageCacheDir:t,packages:[]},i=Object.assign(r,e);i.env.HOME||(i.env.HOME="/home/pyodide");let s=me();s.print=i.stdout,s.printErr=i.stderr,s.arguments=i.args;let a={config:i};s.API=a,a.lockFilePromise=de(i.lockFileURL),he(s,t),ye(s,i);let n=new Promise(o=>s.postRun=o);if(s.locateFile=o=>i.indexURL+o,typeof _createPyodideModule!="function"){let o=`${i.indexURL}pyodide.asm.js`;await S(o)}if(await _createPyodideModule(s),await n,s.exited)throw s.exited.toThrow;if(e.pyproxyToStringRepr&&a.setPyProxyToStringMethod(!0),a.version!==N)throw new Error(`Pyodide version does not match: '${N}' <==> '${a.version}'. If you updated the Pyodide version, make sure you also updated the 'indexURL' parameter passed to loadPyodide.`);s.locateFile=o=>{throw new Error("Didn't expect to load any more file_packager files!")};let l=a.finalizeBootstrap();if(l.version.includes("dev")||a.setCdnUrl(`https://cdn.jsdelivr.net/pyodide/v${l.version}/full/`),await a.packageIndexReady,a._pyodide._importhook.register_module_not_found_hook(a._import_name_to_package_name,a.lockfile_unvendored_stdlibs_and_test),a.lockfile_info.version!==N)throw new Error("Lock file version doesn't match Pyodide version");return a.package_loader.init_loaded_packages(),i.fullStdLib&&await l.loadPackage(a.lockfile_unvendored_stdlibs),a.initializeStreams(i.stdin,i.stdout,i.stderr),l}p(we,"loadPyodide");async function et(e){const t={"api/app.py":`from __future__ import annotations

from typing import Any

from api.models import SessionModel
from api.models.chart_model import ChartModel
from api.services import browse_charts, get_next_chart
from vega_datasets import data

default_df = data.movies()
session = SessionModel(df=default_df, filename="movies.json")


def loadData(filename: str):
  global session
  session = SessionModel(filename=filename)
  return session.model_dump(by_alias=True)


def appendChart(chart: dict[str | Any] | ChartModel):
  global session
  if isinstance(chart, dict):
    chart = ChartModel.model_validate(chart)
  session.charts.append(chart)
  return session.model_dump(by_alias=True)


def appendNextChart():
  global session
  chart = get_next_chart(session)
  return chart.model_dump(by_alias=True)


def restoreSession(new_state: dict[str, Any] | SessionModel):
  global session
  if isinstance(new_state, dict):
    new_state = SessionModel.model_validate(new_state)
  session = new_state
  return session.model_dump(by_alias=True)


def browseCharts(field_names: list[str]):
  global session
  browsed_chart = browse_charts(session, field_names)
  return [chart.model_dump(by_alias=True) for chart in browsed_chart]
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

from api.utils import get_timestamp
from pydantic import BaseModel, Field, model_validator

from .data_field_model import DataFieldModel
from .model_config import DefaultConfig


class ChartModel(BaseModel):
  fields: tuple[DataFieldModel, ...] = Field(default_factory=tuple, exclude=True)
  specs: List[Dict[str, Any]] = Field(default_factory=list)
  title: str = Field(default="")
  description: str = Field(default="")

  spec_index: int = Field(default=0, init=False)
  preferred: bool = Field(default=False, init=False)
  timestamp: int = Field(default_factory=get_timestamp, init=False)

  attributes: tuple[str] = Field(default_factory=tuple, init=False)
  key: str = Field(default="", init=False, repr=False)

  model_config = DefaultConfig

  @model_validator(mode="after")
  def after(self) -> Self:
    self.attributes = tuple([field.name for field in self.fields])
    self.key = f"chart-{str([field for field in self.attributes])}-{self.timestamp}"
    return self

  def __hash__(self):
    return hash(self.fields)
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
  dtype = df[name].dtype

  if "date" in str(dtype):
    return "datetime"

  if pd.api.types.is_numeric_dtype(dtype):
    return "numeric"

  if df[name].nunique() > 100:
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

FieldType = Literal["categorical", "datetime", "numeric", "name"]


class MetadataBase(BaseModel):
  type: Literal["categorical", "datetime", "numeric", "name"]
  count: int
  unique: int
  missing: int

  model_config = DefaultConfig


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


MetadataModel = MetadataBase | MetadataNumeric | MetadataCategorical | MetadataDatetime
`,"api/models/model_config.py":`from pydantic import ConfigDict
from pydantic.alias_generators import to_camel

DefaultConfig = ConfigDict(
  alias_generator=to_camel,
  populate_by_name=True,
  from_attributes=True,
  arbitrary_types_allowed=True,
)
`,"api/models/session_model.py":`from __future__ import annotations

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
`,"api/services/__init__.py":`from .browse_charts import browse_charts
from .get_chart import get_chart
from .get_next_chart import get_next_chart

__all__ = ["get_chart", "browse_charts", "get_next_chart"]
`,"api/services/browse_charts.py":`from api.models.chart_model import ChartModel
from api.models.session_model import SessionModel
from api.services import get_chart


def browse_charts(state: SessionModel, field_names: list[str]) -> list[ChartModel]:
  if not (field_names and (0 < len(field_names) <= 3)):
    raise "Please select 1 or 3 field names"

  # Input fields
  all_fields = state.fields

  input_fields = [field for field in state.fields if field.name in field_names]

  # Add one more fields
  additional_fields = [field for field in all_fields if field not in input_fields]

  browse_fields = [
    input_fields,
    *[[*input_fields, field] for field in additional_fields],
  ]

  browse_charts = [get_chart(state, fields) for fields in browse_fields]

  return [chart.model_dump(by_alias=True) for chart in browse_charts]
`,"api/services/get_chart.py":`from __future__ import annotations

import pandas as pd
from api.models import ChartModel, DataFieldModel

from .get_facts import get_facts_from_fields
from .get_specs import get_specs_from_facts


def get_chart(df: pd.DataFrame, fields: tuple[DataFieldModel, ...]) -> ChartModel:
  facts = get_facts_from_fields(df, fields)
  specs = get_specs_from_facts(df, facts)
  return ChartModel(fields=fields, specs=specs)
`,"api/services/get_facts.py":`import draco
import pandas as pd
from api.models import DataFieldModel


def _get_base_facts() -> list[str]:
  return [
    "entity(view,root,v0).",
    "entity(mark,v0,m0).",
    ":- {entity(encoding,_,_)} > 3.",
    ":- {entity(mark,_,_)} != 1.",
    # Exclude tick mark
    ":- attribute((mark,type),m0, tick).",
  ]


def _get_attribute_facts(df: pd.DataFrame, fields: list[str]) -> list[str]:
  base_scheme = draco.schema_from_dataframe(df[fields])
  return draco.dict_to_facts(base_scheme)


def _get_encoding_facts(fields: list[str]) -> list[str]:
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


def get_facts_from_fields(df: pd.DataFrame, fields: list["DataFieldModel"]) -> list[str]:
  clingo_names = [field.clingo_name for field in fields]
  return (
    _get_base_facts() + _get_attribute_facts(df, clingo_names) + _get_encoding_facts(clingo_names)
  )
`,"api/services/get_next_chart.py":`from __future__ import annotations

from api.models import ChartModel, DataFieldModel, SessionModel
from numpy.random import choice

from .get_chart import get_chart

NEW_FIELD_P = 0.2


def sample(targets: list[DataFieldModel], p: list[float] | None = None) -> DataFieldModel:
  p = [1 / len(targets)] * len(targets) if p is None else p
  return choice(targets, 1, p=p)[0]


def get_next_chart(session: SessionModel) -> ChartModel:
  field = sample(session.fields)
  chart = get_chart(session.df, tuple([field]))
  session.charts.append(chart)
  return chart

  if len(session.charts) == 0:
    field = sample(session.fields)
    chart = get_chart(session.df, tuple([field]))
    session.charts.append(chart)

  pass
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
  chart: alt.Chart = renderer.render(spec=answer_dict, data=df)

  # Multiview Chart logic 처리 필요
  if isinstance(chart, alt.FacetChart) and chart.facet.column is not alt.Undefined:
    chart = chart.configure_view(continuousWidth=130, continuousHeight=130)

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
    return {k: replace_clingo_field_name(v) for k, v in clingo_field_name.items()}
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
`,"api/utils/get_timestamp.py":`import time


def get_timestamp():
  return int(time.time() * 1000)
`};for(const[r,i]of Object.entries(t)){const s=r.split("/").slice(0,-1);let a="";for(const n of s){a=a?`${a}/${n}`:n;try{e.FS.mkdir(a)}catch{}}e.FS.writeFile(r,i)}}async function tt(e){await e.runPythonAsync(`from __future__ import annotations

from typing import Any

from api.models import SessionModel
from api.models.chart_model import ChartModel
from api.services import browse_charts, get_next_chart
from vega_datasets import data

default_df = data.movies()
session = SessionModel(df=default_df, filename="movies.json")


def loadData(filename: str):
  global session
  session = SessionModel(filename=filename)
  return session.model_dump(by_alias=True)


def appendChart(chart: dict[str | Any] | ChartModel):
  global session
  if isinstance(chart, dict):
    chart = ChartModel.model_validate(chart)
  session.charts.append(chart)
  return session.model_dump(by_alias=True)


def appendNextChart():
  global session
  chart = get_next_chart(session)
  return chart.model_dump(by_alias=True)


def restoreSession(new_state: dict[str, Any] | SessionModel):
  global session
  if isinstance(new_state, dict):
    new_state = SessionModel.model_validate(new_state)
  session = new_state
  return session.model_dump(by_alias=True)


def browseCharts(field_names: list[str]):
  global session
  browsed_chart = browse_charts(session, field_names)
  return [chart.model_dump(by_alias=True) for chart in browsed_chart]
`)}const nt={pyodide:null,async writeFile(e,t){try{if(!this.pyodide)throw new Error("Pyodide is not initialized");this.pyodide.FS.writeFile(e,t,{encoding:"binary",flags:"w"})}catch(r){throw console.error(r),r}},async readFile(e){try{if(!this.pyodide)throw new Error("Pyodide is not initialized");return this.pyodide.FS.readFile(`${e}`,{encoding:"utf-8"})}catch(t){throw console.error(t),t}},async initialize(e=[]){this.pyodide=await we({indexURL:"/Swipytics/artifacts"});for(const t of e)await this.pyodide.loadPackage(t);await et(this.pyodide);try{await tt(this.pyodide)}catch(t){console.error(t)}},terminate(){if(this.pyodide){const e=new Uint8Array(new SharedArrayBuffer(1));e[0]=2,this.pyodide.setInterruptBuffer(e),this.pyodide=null}},async runPython(e,t={}){if(!this.pyodide)throw new Error("Pyodide is not initialized");const r=this.pyodide.globals.get("dict")();for(const[i,s]of Object.entries(t))r.set(i,s);return this.pyodide.runPython(e,{globals:r})},async callPythonFunction(e,t={}){if(!this.pyodide)throw new Error("Pyodide is not initialized");const r=this.pyodide.globals.get(e);if(!r)throw new Error(`Function ${e} is not defined in globals`);const i=r.callKwargs(t);return i!=null&&i.toJs?i.toJs({dict_converter:Object.fromEntries}):i}};j(nt)});export default rt();
