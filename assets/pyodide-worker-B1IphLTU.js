var Oe=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var ot=Oe((ct,C)=>{/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const q=Symbol("Comlink.proxy"),Fe=Symbol("Comlink.endpoint"),xe=Symbol("Comlink.releaseProxy"),A=Symbol("Comlink.finalizer"),S=Symbol("Comlink.thrown"),B=e=>typeof e=="object"&&e!==null||typeof e=="function",Pe={canHandle:e=>B(e)&&e[q],serialize(e){const{port1:t,port2:i}=new MessageChannel;return M(e,t),[i,[i]]},deserialize(e){return e.start(),Ae(e)}},Ne={canHandle:e=>B(e)&&S in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},K=new Map([["proxy",Pe],["throw",Ne]]);function Le(e,t){for(const i of e)if(t===i||i==="*"||i instanceof RegExp&&i.test(t))return!0;return!1}function M(e,t=globalThis,i=["*"]){t.addEventListener("message",function a(o){if(!o||!o.data)return;if(!Le(i,o.origin)){console.warn(`Invalid origin '${o.origin}' for comlink proxy`);return}const{id:r,type:n,path:c}=Object.assign({path:[]},o.data),s=(o.data.argumentList||[]).map(b);let f;try{const l=c.slice(0,-1).reduce((u,_)=>u[_],e),d=c.reduce((u,_)=>u[_],e);switch(n){case"GET":f=d;break;case"SET":l[c.slice(-1)[0]]=b(o.data.value),f=!0;break;case"APPLY":f=d.apply(l,s);break;case"CONSTRUCT":{const u=new d(...s);f=Ce(u)}break;case"ENDPOINT":{const{port1:u,port2:_}=new MessageChannel;M(e,_),f=je(u,[u])}break;case"RELEASE":f=void 0;break;default:return}}catch(l){f={value:l,[S]:0}}Promise.resolve(f).catch(l=>({value:l,[S]:0})).then(l=>{const[d,u]=P(l);t.postMessage(Object.assign(Object.assign({},d),{id:r}),u),n==="RELEASE"&&(t.removeEventListener("message",a),G(t),A in e&&typeof e[A]=="function"&&e[A]())}).catch(l=>{const[d,u]=P({value:new TypeError("Unserializable return value"),[S]:0});t.postMessage(Object.assign(Object.assign({},d),{id:r}),u)})}),t.start&&t.start()}function Re(e){return e.constructor.name==="MessagePort"}function G(e){Re(e)&&e.close()}function Ae(e,t){return $(e,[],t)}function k(e){if(e)throw new Error("Proxy has been released and is not useable")}function J(e){return v(e,{type:"RELEASE"}).then(()=>{G(e)})}const F=new WeakMap,x="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const t=(F.get(e)||0)-1;F.set(e,t),t===0&&J(e)});function Te(e,t){const i=(F.get(t)||0)+1;F.set(t,i),x&&x.register(e,t,e)}function $e(e){x&&x.unregister(e)}function $(e,t=[],i=function(){}){let a=!1;const o=new Proxy(i,{get(r,n){if(k(a),n===xe)return()=>{$e(o),J(e),a=!0};if(n==="then"){if(t.length===0)return{then:()=>o};const c=v(e,{type:"GET",path:t.map(s=>s.toString())}).then(b);return c.then.bind(c)}return $(e,[...t,n])},set(r,n,c){k(a);const[s,f]=P(c);return v(e,{type:"SET",path:[...t,n].map(l=>l.toString()),value:s},f).then(b)},apply(r,n,c){k(a);const s=t[t.length-1];if(s===Fe)return v(e,{type:"ENDPOINT"}).then(b);if(s==="bind")return $(e,t.slice(0,-1));const[f,l]=V(c);return v(e,{type:"APPLY",path:t.map(d=>d.toString()),argumentList:f},l).then(b)},construct(r,n){k(a);const[c,s]=V(n);return v(e,{type:"CONSTRUCT",path:t.map(f=>f.toString()),argumentList:c},s).then(b)}});return Te(o,e),o}function De(e){return Array.prototype.concat.apply([],e)}function V(e){const t=e.map(P);return[t.map(i=>i[0]),De(t.map(i=>i[1]))]}const Y=new WeakMap;function je(e,t){return Y.set(e,t),e}function Ce(e){return Object.assign(e,{[q]:!0})}function P(e){for(const[t,i]of K)if(i.canHandle(e)){const[a,o]=i.serialize(e);return[{type:"HANDLER",name:t,value:a},o]}return[{type:"RAW",value:e},Y.get(e)||[]]}function b(e){switch(e.type){case"HANDLER":return K.get(e.name).deserialize(e.value);case"RAW":return e.value}}function v(e,t,i){return new Promise(a=>{const o=Me();e.addEventListener("message",function r(n){!n.data||!n.data.id||n.data.id!==o||(e.removeEventListener("message",r),a(n.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:o},t),i)})}function Me(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}var Ie=Object.create,I=Object.defineProperty,Ue=Object.getOwnPropertyDescriptor,ze=Object.getOwnPropertyNames,He=Object.getPrototypeOf,We=Object.prototype.hasOwnProperty,m=(e,t)=>I(e,"name",{value:t,configurable:!0}),X=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,i)=>(typeof require<"u"?require:t)[i]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')}),Q=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Ve=(e,t,i,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of ze(t))!We.call(e,o)&&o!==i&&I(e,o,{get:()=>t[o],enumerable:!(a=Ue(t,o))||a.enumerable});return e},qe=(e,t,i)=>(i=e!=null?Ie(He(e)):{},Ve(!e||!e.__esModule?I(i,"default",{value:e,enumerable:!0}):i,e)),Be=Q((e,t)=>{(function(i,a){typeof define=="function"&&define.amd?define("stackframe",[],a):typeof e=="object"?t.exports=a():i.StackFrame=a()})(e,function(){function i(p){return!isNaN(parseFloat(p))&&isFinite(p)}m(i,"_isNumber");function a(p){return p.charAt(0).toUpperCase()+p.substring(1)}m(a,"_capitalize");function o(p){return function(){return this[p]}}m(o,"_getter");var r=["isConstructor","isEval","isNative","isToplevel"],n=["columnNumber","lineNumber"],c=["fileName","functionName","source"],s=["args"],f=["evalOrigin"],l=r.concat(n,c,s,f);function d(p){if(p)for(var g=0;g<l.length;g++)p[l[g]]!==void 0&&this["set"+a(l[g])](p[l[g]])}m(d,"StackFrame"),d.prototype={getArgs:function(){return this.args},setArgs:function(p){if(Object.prototype.toString.call(p)!=="[object Array]")throw new TypeError("Args must be an Array");this.args=p},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(p){if(p instanceof d)this.evalOrigin=p;else if(p instanceof Object)this.evalOrigin=new d(p);else throw new TypeError("Eval Origin must be an Object or StackFrame")},toString:function(){var p=this.getFileName()||"",g=this.getLineNumber()||"",w=this.getColumnNumber()||"",E=this.getFunctionName()||"";return this.getIsEval()?p?"[eval] ("+p+":"+g+":"+w+")":"[eval]:"+g+":"+w:E?E+" ("+p+":"+g+":"+w+")":p+":"+g+":"+w}},d.fromString=m(function(p){var g=p.indexOf("("),w=p.lastIndexOf(")"),E=p.substring(0,g),ve=p.substring(g+1,w).split(","),W=p.substring(w+1);if(W.indexOf("@")===0)var R=/@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(W,""),Ee=R[1],ke=R[2],Se=R[3];return new d({functionName:E,args:ve||void 0,fileName:Ee,lineNumber:ke||void 0,columnNumber:Se||void 0})},"StackFrame$$fromString");for(var u=0;u<r.length;u++)d.prototype["get"+a(r[u])]=o(r[u]),d.prototype["set"+a(r[u])]=function(p){return function(g){this[p]=!!g}}(r[u]);for(var _=0;_<n.length;_++)d.prototype["get"+a(n[_])]=o(n[_]),d.prototype["set"+a(n[_])]=function(p){return function(g){if(!i(g))throw new TypeError(p+" must be a Number");this[p]=Number(g)}}(n[_]);for(var y=0;y<c.length;y++)d.prototype["get"+a(c[y])]=o(c[y]),d.prototype["set"+a(c[y])]=function(p){return function(g){this[p]=String(g)}}(c[y]);return d})}),Ke=Q((e,t)=>{(function(i,a){typeof define=="function"&&define.amd?define("error-stack-parser",["stackframe"],a):typeof e=="object"?t.exports=a(Be()):i.ErrorStackParser=a(i.StackFrame)})(e,m(function(i){var a=/(^|@)\S+:\d+/,o=/^\s*at .*(\S+:\d+|\(native\))/m,r=/^(eval@)?(\[native code])?$/;return{parse:m(function(n){if(typeof n.stacktrace<"u"||typeof n["opera#sourceloc"]<"u")return this.parseOpera(n);if(n.stack&&n.stack.match(o))return this.parseV8OrIE(n);if(n.stack)return this.parseFFOrSafari(n);throw new Error("Cannot parse given Error object")},"ErrorStackParser$$parse"),extractLocation:m(function(n){if(n.indexOf(":")===-1)return[n];var c=/(.+?)(?::(\d+))?(?::(\d+))?$/,s=c.exec(n.replace(/[()]/g,""));return[s[1],s[2]||void 0,s[3]||void 0]},"ErrorStackParser$$extractLocation"),parseV8OrIE:m(function(n){var c=n.stack.split(`
`).filter(function(s){return!!s.match(o)},this);return c.map(function(s){s.indexOf("(eval ")>-1&&(s=s.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));var f=s.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),l=f.match(/ (\(.+\)$)/);f=l?f.replace(l[0],""):f;var d=this.extractLocation(l?l[1]:f),u=l&&f||void 0,_=["eval","<anonymous>"].indexOf(d[0])>-1?void 0:d[0];return new i({functionName:u,fileName:_,lineNumber:d[1],columnNumber:d[2],source:s})},this)},"ErrorStackParser$$parseV8OrIE"),parseFFOrSafari:m(function(n){var c=n.stack.split(`
`).filter(function(s){return!s.match(r)},this);return c.map(function(s){if(s.indexOf(" > eval")>-1&&(s=s.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),s.indexOf("@")===-1&&s.indexOf(":")===-1)return new i({functionName:s});var f=/((.*".+"[^@]*)?[^@]*)(?:@)/,l=s.match(f),d=l&&l[1]?l[1]:void 0,u=this.extractLocation(s.replace(f,""));return new i({functionName:d,fileName:u[0],lineNumber:u[1],columnNumber:u[2],source:s})},this)},"ErrorStackParser$$parseFFOrSafari"),parseOpera:m(function(n){return!n.stacktrace||n.message.indexOf(`
`)>-1&&n.message.split(`
`).length>n.stacktrace.split(`
`).length?this.parseOpera9(n):n.stack?this.parseOpera11(n):this.parseOpera10(n)},"ErrorStackParser$$parseOpera"),parseOpera9:m(function(n){for(var c=/Line (\d+).*script (?:in )?(\S+)/i,s=n.message.split(`
`),f=[],l=2,d=s.length;l<d;l+=2){var u=c.exec(s[l]);u&&f.push(new i({fileName:u[2],lineNumber:u[1],source:s[l]}))}return f},"ErrorStackParser$$parseOpera9"),parseOpera10:m(function(n){for(var c=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,s=n.stacktrace.split(`
`),f=[],l=0,d=s.length;l<d;l+=2){var u=c.exec(s[l]);u&&f.push(new i({functionName:u[3]||void 0,fileName:u[2],lineNumber:u[1],source:s[l]}))}return f},"ErrorStackParser$$parseOpera10"),parseOpera11:m(function(n){var c=n.stack.split(`
`).filter(function(s){return!!s.match(a)&&!s.match(/^Error created at/)},this);return c.map(function(s){var f=s.split("@"),l=this.extractLocation(f.pop()),d=f.shift()||"",u=d.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^)]*\)/g,"")||void 0,_;d.match(/\(([^)]*)\)/)&&(_=d.replace(/^[^(]+\(([^)]*)\)$/,"$1"));var y=_===void 0||_==="[arguments not available]"?void 0:_.split(",");return new i({functionName:u,args:y,fileName:l[0],lineNumber:l[1],columnNumber:l[2],source:s})},this)},"ErrorStackParser$$parseOpera11")}},"ErrorStackParser"))}),Ge=qe(Ke()),h=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string"&&typeof process.browser>"u",Z=h&&typeof C<"u"&&typeof C.exports<"u"&&typeof X<"u"&&typeof __dirname<"u",Je=h&&!Z,Ye=typeof Deno<"u",ee=!h&&!Ye,Xe=ee&&typeof window<"u"&&typeof document<"u"&&typeof document.createElement<"u"&&typeof sessionStorage<"u",Qe=ee&&typeof importScripts<"u"&&typeof self<"u",te,N,D,ne,U,Ze=`"fetch" is not defined, maybe you're using node < 18? From Pyodide >= 0.25.0, node >= 18 is required. Older versions of Node.js may work, but it is not guaranteed or supported. Falling back to "node-fetch".`;async function z(){if(!h||(te=(await import("./__vite-browser-external-CIEyP2s7.js")).default,U=await import("./__vite-browser-external-CIEyP2s7.js"),globalThis.fetch?N=fetch:(console.warn(Ze),N=(await import("./index-B489Fav_.js")).default),ne=(await import("./__vite-browser-external-CIEyP2s7.js")).default,D=await import("./__vite-browser-external-CIEyP2s7.js"),H=D.sep,typeof X<"u"))return;let e=await import("./__vite-browser-external-CIEyP2s7.js"),t=await import("./__vite-browser-external-CIEyP2s7.js"),i=await import("./__vite-browser-external-CIEyP2s7.js"),a=await import("./__vite-browser-external-CIEyP2s7.js"),o={fs:e,crypto:t,ws:i,child_process:a};globalThis.require=function(r){return o[r]}}m(z,"initNodeModules");function re(e,t){return D.resolve(t||".",e)}m(re,"node_resolvePath");function ie(e,t){return t===void 0&&(t=location),new URL(e,t).toString()}m(ie,"browser_resolvePath");var j;h?j=re:j=ie;var H;h||(H="/");function ae(e,t){return e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?{response:N(e)}:{binary:U.readFile(e).then(i=>new Uint8Array(i.buffer,i.byteOffset,i.byteLength))}}m(ae,"node_getBinaryResponse");function oe(e,t){let i=new URL(e,location);return{response:fetch(i,t?{integrity:t}:{})}}m(oe,"browser_getBinaryResponse");var L;h?L=ae:L=oe;async function se(e,t){let{response:i,binary:a}=L(e,t);if(a)return a;let o=await i;if(!o.ok)throw new Error(`Failed to load '${e}': request failed.`);return new Uint8Array(await o.arrayBuffer())}m(se,"loadBinaryFile");var O;if(Xe)O=m(async e=>await import(e),"loadScript");else if(Qe)O=m(async e=>{try{globalThis.importScripts(e)}catch(t){if(t instanceof TypeError)await import(e);else throw t}},"loadScript");else if(h)O=ce;else throw new Error("Cannot determine runtime environment");async function ce(e){e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?ne.runInThisContext(await(await N(e)).text()):await import(te.pathToFileURL(e).href)}m(ce,"nodeLoadScript");async function le(e){if(h){await z();let t=await U.readFile(e);return JSON.parse(t)}else return await(await fetch(e)).json()}m(le,"loadLockFile");async function fe(){if(Z)return __dirname;let e;try{throw new Error}catch(a){e=a}let t=Ge.default.parse(e)[0].fileName;if(Je){let a=await import("./__vite-browser-external-CIEyP2s7.js");return(await import("./__vite-browser-external-CIEyP2s7.js")).fileURLToPath(a.dirname(t))}let i=t.lastIndexOf(H);if(i===-1)throw new Error("Could not extract indexURL path from pyodide module location");return t.slice(0,i)}m(fe,"calculateDirname");function de(e){let t=e.FS,i=e.FS.filesystems.MEMFS,a=e.PATH,o={DIR_MODE:16895,FILE_MODE:33279,mount:function(r){if(!r.opts.fileSystemHandle)throw new Error("opts.fileSystemHandle is required");return i.mount.apply(null,arguments)},syncfs:async(r,n,c)=>{try{let s=o.getLocalSet(r),f=await o.getRemoteSet(r),l=n?f:s,d=n?s:f;await o.reconcile(r,l,d),c(null)}catch(s){c(s)}},getLocalSet:r=>{let n=Object.create(null);function c(l){return l!=="."&&l!==".."}m(c,"isRealDir");function s(l){return d=>a.join2(l,d)}m(s,"toAbsolute");let f=t.readdir(r.mountpoint).filter(c).map(s(r.mountpoint));for(;f.length;){let l=f.pop(),d=t.stat(l);t.isDir(d.mode)&&f.push.apply(f,t.readdir(l).filter(c).map(s(l))),n[l]={timestamp:d.mtime,mode:d.mode}}return{type:"local",entries:n}},getRemoteSet:async r=>{let n=Object.create(null),c=await et(r.opts.fileSystemHandle);for(let[s,f]of c)s!=="."&&(n[a.join2(r.mountpoint,s)]={timestamp:f.kind==="file"?(await f.getFile()).lastModifiedDate:new Date,mode:f.kind==="file"?o.FILE_MODE:o.DIR_MODE});return{type:"remote",entries:n,handles:c}},loadLocalEntry:r=>{let n=t.lookupPath(r).node,c=t.stat(r);if(t.isDir(c.mode))return{timestamp:c.mtime,mode:c.mode};if(t.isFile(c.mode))return n.contents=i.getFileDataAsTypedArray(n),{timestamp:c.mtime,mode:c.mode,contents:n.contents};throw new Error("node type not supported")},storeLocalEntry:(r,n)=>{if(t.isDir(n.mode))t.mkdirTree(r,n.mode);else if(t.isFile(n.mode))t.writeFile(r,n.contents,{canOwn:!0});else throw new Error("node type not supported");t.chmod(r,n.mode),t.utime(r,n.timestamp,n.timestamp)},removeLocalEntry:r=>{var n=t.stat(r);t.isDir(n.mode)?t.rmdir(r):t.isFile(n.mode)&&t.unlink(r)},loadRemoteEntry:async r=>{if(r.kind==="file"){let n=await r.getFile();return{contents:new Uint8Array(await n.arrayBuffer()),mode:o.FILE_MODE,timestamp:n.lastModifiedDate}}else{if(r.kind==="directory")return{mode:o.DIR_MODE,timestamp:new Date};throw new Error("unknown kind: "+r.kind)}},storeRemoteEntry:async(r,n,c)=>{let s=r.get(a.dirname(n)),f=t.isFile(c.mode)?await s.getFileHandle(a.basename(n),{create:!0}):await s.getDirectoryHandle(a.basename(n),{create:!0});if(f.kind==="file"){let l=await f.createWritable();await l.write(c.contents),await l.close()}r.set(n,f)},removeRemoteEntry:async(r,n)=>{await r.get(a.dirname(n)).removeEntry(a.basename(n)),r.delete(n)},reconcile:async(r,n,c)=>{let s=0,f=[];Object.keys(n.entries).forEach(function(u){let _=n.entries[u],y=c.entries[u];(!y||t.isFile(_.mode)&&_.timestamp.getTime()>y.timestamp.getTime())&&(f.push(u),s++)}),f.sort();let l=[];if(Object.keys(c.entries).forEach(function(u){n.entries[u]||(l.push(u),s++)}),l.sort().reverse(),!s)return;let d=n.type==="remote"?n.handles:c.handles;for(let u of f){let _=a.normalize(u.replace(r.mountpoint,"/")).substring(1);if(c.type==="local"){let y=d.get(_),p=await o.loadRemoteEntry(y);o.storeLocalEntry(u,p)}else{let y=o.loadLocalEntry(u);await o.storeRemoteEntry(d,_,y)}}for(let u of l)if(c.type==="local")o.removeLocalEntry(u);else{let _=a.normalize(u.replace(r.mountpoint,"/")).substring(1);await o.removeRemoteEntry(d,_)}}};e.FS.filesystems.NATIVEFS_ASYNC=o}m(de,"initializeNativeFS");var et=m(async e=>{let t=[];async function i(o){for await(let r of o.values())t.push(r),r.kind==="directory"&&await i(r)}m(i,"collect"),await i(e);let a=new Map;a.set(".",e);for(let o of t){let r=(await e.resolve(o)).join("/");a.set(r,o)}return a},"getFsHandles");function ue(){let e={};return e.noImageDecoding=!0,e.noAudioDecoding=!0,e.noWasmDecoding=!1,e.preRun=[],e.quit=(t,i)=>{throw e.exited={status:t,toThrow:i},i},e}m(ue,"createModule");function pe(e,t){e.preRun.push(function(){let i="/";try{e.FS.mkdirTree(t)}catch(a){console.error(`Error occurred while making a home directory '${t}':`),console.error(a),console.error(`Using '${i}' for a home directory instead`),t=i}e.FS.chdir(t)})}m(pe,"createHomeDirectory");function me(e,t){e.preRun.push(function(){Object.assign(e.ENV,t)})}m(me,"setEnvironment");function _e(e,t){e.preRun.push(()=>{for(let i of t)e.FS.mkdirTree(i),e.FS.mount(e.FS.filesystems.NODEFS,{root:i},i)})}m(_e,"mountLocalDirectories");function ge(e,t){let i=se(t);e.preRun.push(()=>{let a=e._py_version_major(),o=e._py_version_minor();e.FS.mkdirTree("/lib"),e.FS.mkdirTree(`/lib/python${a}.${o}/site-packages`),e.addRunDependency("install-stdlib"),i.then(r=>{e.FS.writeFile(`/lib/python${a}${o}.zip`,r)}).catch(r=>{console.error("Error occurred while installing the standard library:"),console.error(r)}).finally(()=>{e.removeRunDependency("install-stdlib")})})}m(ge,"installStdlib");function ye(e,t){let i;t.stdLibURL!=null?i=t.stdLibURL:i=t.indexURL+"python_stdlib.zip",ge(e,i),pe(e,t.env.HOME),me(e,t.env),_e(e,t._node_mounts),e.preRun.push(()=>de(e))}m(ye,"initializeFileSystem");function he(e,t){let{binary:i,response:a}=L(t+"pyodide.asm.wasm");e.instantiateWasm=function(o,r){return async function(){try{let n;a?n=await WebAssembly.instantiateStreaming(a,o):n=await WebAssembly.instantiate(await i,o);let{instance:c,module:s}=n;typeof WasmOffsetConverter<"u"&&(wasmOffsetConverter=new WasmOffsetConverter(wasmBinary,s)),r(c,s)}catch(n){console.warn("wasm instantiation failed!"),console.warn(n)}}(),{}}}m(he,"preloadWasm");var T="0.25.0";async function we(e={}){await z();let t=e.indexURL||await fe();t=j(t),t.endsWith("/")||(t+="/"),e.indexURL=t;let i={fullStdLib:!1,jsglobals:globalThis,stdin:globalThis.prompt?globalThis.prompt:void 0,lockFileURL:t+"pyodide-lock.json",args:[],_node_mounts:[],env:{},packageCacheDir:t,packages:[]},a=Object.assign(i,e);a.env.HOME||(a.env.HOME="/home/pyodide");let o=ue();o.print=a.stdout,o.printErr=a.stderr,o.arguments=a.args;let r={config:a};o.API=r,r.lockFilePromise=le(a.lockFileURL),he(o,t),ye(o,a);let n=new Promise(s=>o.postRun=s);if(o.locateFile=s=>a.indexURL+s,typeof _createPyodideModule!="function"){let s=`${a.indexURL}pyodide.asm.js`;await O(s)}if(await _createPyodideModule(o),await n,o.exited)throw o.exited.toThrow;if(e.pyproxyToStringRepr&&r.setPyProxyToStringMethod(!0),r.version!==T)throw new Error(`Pyodide version does not match: '${T}' <==> '${r.version}'. If you updated the Pyodide version, make sure you also updated the 'indexURL' parameter passed to loadPyodide.`);o.locateFile=s=>{throw new Error("Didn't expect to load any more file_packager files!")};let c=r.finalizeBootstrap();if(c.version.includes("dev")||r.setCdnUrl(`https://cdn.jsdelivr.net/pyodide/v${c.version}/full/`),await r.packageIndexReady,r._pyodide._importhook.register_module_not_found_hook(r._import_name_to_package_name,r.lockfile_unvendored_stdlibs_and_test),r.lockfile_info.version!==T)throw new Error("Lock file version doesn't match Pyodide version");return r.package_loader.init_loaded_packages(),a.fullStdLib&&await c.loadPackage(r.lockfile_unvendored_stdlibs),r.initializeStreams(a.stdin,a.stdout,a.stderr),c}m(we,"loadPyodide");const be={"app.py":`from __future__ import annotations

from dataclasses import asdict

import draco
import numpy as np
import pandas as pd
import pydantic
import sklearn
from api.services import load_data
from api.services.chart import append_chart
from api.services.session import append_session
from api.state import return_state, state
from api.utils import find
from numpy.random import choice

print(
  f"Package Loaded. draco: {draco.__version__}, numpy: {np.__version__}, pandas: {pd.__version__}, sklearn: {sklearn.__version__},  pydantic: {pydantic.__version__}"
)


@return_state
def loadData(fileName: str | None = None):
  load_data(fileName)
  return {k: v for k, v in asdict(state).items() if k not in ["df", "filename"]}


def appendSession():
  print("appendSession")
  attributes = state.undiscovered_attributes
  groundingAttributes = choice(attributes, 1, replace=False).tolist()
  append_session(groundingAttributes)
  return asdict(state)["sessions"][-1]


def appendChart(sessionKey: str):
  print("appendChart", sessionKey)
  print([session.key for session in state.sessions])
  session = find(state.sessions, lambda x: x.key == sessionKey)

  if not session:
    raise Exception("Session not found")

  append_chart(session)
  return asdict(session)["charts"][-1]
`,"services/__init__.py":`from .data import load_data
from .facts import get_attribute_facts, get_base_facts
from .specs import get_specs_from_facts

__all__ = [
  "load_data",
  "get_attribute_facts",
  "get_base_facts",
  "get_specs_from_facts",
]
`,"services/chart.py":`from random import choice

from api.models import Session
from api.models.chart import Chart
from api.services.facts import get_attribute_facts, get_base_facts
from api.services.specs import get_specs_from_facts
from api.state import state


def append_chart(session: Session):
  grounding_facts = [
    *get_base_facts(state.df),
    *sum(
      [
        get_attribute_facts(field, code)
        for code, field in enumerate(session.groundingAttributes)
      ],
      [],
    ),
  ]

  # 기본 차트 추가
  if len(session.charts) == 0:
    specs = get_specs_from_facts(grounding_facts)
    session.charts.append(
      Chart(
        specs=specs,
        facts=grounding_facts,
        attributes=session.groundingAttributes,
      )
    )

  used_field = sum([chart.attributes for chart in session.charts], [])
  new_field = choice(
    [column for column in state.df.columns if column not in used_field]
  )

  new_facts = grounding_facts + get_attribute_facts(
    new_field, len(session.groundingAttributes)
  )
  new_specs = get_specs_from_facts([*grounding_facts, *new_facts])

  session.charts.append(
    Chart(
      specs=new_specs,
      facts=new_facts,
      attributes=[*session.groundingAttributes, new_field],
    )
  )
`,"services/data.py":`from __future__ import annotations

import pathlib

import pandas as pd
from api.state import state
from api.utils import get_file_extension
from vega_datasets import data


def load_data(fileName: str | None = None) -> None:
  if fileName is None:
    state.filename = "Cars"
    state.df = pd.DataFrame(data.cars())

    return

  extension = get_file_extension(fileName)

  state.filename = fileName
  state.df = getattr(pd, f"read_{extension}")(pathlib.Path("./", fileName))


__all__ = ["load_data"]
`,"services/facts.py":`import draco
import pandas as pd
from api.utils import get_clingo_field_name


def get_base_facts(df: pd.DataFrame) -> list[str]:
  df.columns = [get_clingo_field_name(col) for col in df.columns]
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
  return [
    f"entity(encoding,m0,e{code}).",
    f"attribute((encoding,field),e{code},{get_clingo_field_name(field)}).",
  ]


__all__ = ["get_base_facts", "get_attribute_facts"]
`,"services/session.py":`from api.models import Session
from api.services.chart import append_chart
from api.state import state


def append_session(groundingAttributes: list[str]) -> None:
  session = Session(charts=[], groundingAttributes=groundingAttributes)
  append_chart(session)
  state.sessions.append(session)
`,"services/specs.py":`from typing import Iterable

import altair as alt
import draco
import pandas as pd
from api.state import state
from api.utils import replace_clingo_field_name
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
  return replace_clingo_field_name(clean_spec(vega))


def get_specs_from_facts(
  facts: list[str],
  num: int = 5,
) -> dict[str, tuple[list[str], dict]]:
  return [
    answer_set_to_spec(model.answer_set, state.df)
    for model in drc.complete_spec(facts, num)
  ]


__all__ = ["get_specs_from_facts"]
`,"state.py":`from api.models import State

state = State()


# decorator that return dict(state)
def return_state(func):
  def wrapper(*args, **kwargs):
    func(*args, **kwargs)

    # remove df, filename in asdict(state)

  return wrapper


__all__ = ["state", "return_state"]
`,"utils/__init__.py":`from .field_name import (
  get_clingo_field_name,
  get_original_field_name,
  replace_clingo_field_name,
)
from .find import find
from .get_file_extension import get_file_extension
from .get_timestamp import get_timestamp

__all__ = [
  "get_file_extension",
  "get_timestamp",
  "find",
  "get_clingo_field_name",
  "get_original_field_name",
  "replace_clingo_field_name",
]
`,"utils/field_name.py":`from __future__ import annotations

from typing import Any

id_to_name: dict[str, str] = {}
name_to_id: dict[str, str] = {}


def get_clingo_field_name(field_name: str | int) -> str:
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
`,"utils/find.py":`from __future__ import annotations

from typing import Callable, TypeVar

T = TypeVar("T")


def find(lst: list[T], predicate: Callable[[T], bool]) -> T | None:
  return next((x for x in lst if predicate(x)), None)
`,"utils/get_file_extension.py":`def get_file_extension(filename: str) -> str:
  return filename.split(".")[-1]


__all__ = ["get_file_extension"]
`,"utils/get_timestamp.py":`import time


def get_timestamp():
  return int(time.time() * 1000)
`},tt="api",nt="app.py";async function rt(e){try{for(const[t,i]of Object.entries(be)){const a=`${tt}/${t}`,o=a.split("/");let r="";for(const n of o.slice(0,-1))r+=(r?"/":"")+n,e.FS.analyzePath(r).exists||e.FS.mkdir(r);e.FS.writeFile(a,i)}}catch(t){throw console.error("Failed to setup Pyodide files:",t),t}}async function it(e){const t=be[nt];return await e.runPythonAsync(t)}const at={pyodide:null,async writeFile(e,t){if(!this.pyodide)throw new Error("Pyodide is not initialized");this.pyodide.FS.writeFile(`${e}`,t,{encoding:"binary"})},async readFile(e){if(!this.pyodide)throw new Error("Pyodide is not initialized");return this.pyodide.FS.readFile(`${e}`)},async initialize(e=[]){this.pyodide=await we({indexURL:"/Swipytics/artifacts"});for(const t of e)await this.pyodide.loadPackage(t);await rt(this.pyodide);try{await it(this.pyodide)}catch(t){console.error(t)}},terminate(){if(this.pyodide){const e=new Uint8Array(new SharedArrayBuffer(1));e[0]=2,this.pyodide.setInterruptBuffer(e),this.pyodide=null}},async runPython(e,t={}){if(!this.pyodide)throw new Error("Pyodide is not initialized");const i=this.pyodide.globals.get("dict")();for(const[a,o]of Object.entries(t))i.set(a,o);return this.pyodide.runPython(e,{globals:i})},async callPythonFunction(e,t=[],i){if(!this.pyodide)throw new Error("Pyodide is not initialized");const a=this.pyodide.globals.get(e);if(!a)throw new Error(`Function ${e} is not defined in globals`);const o=this.pyodide.toPy(t),r=i?a.callKwargs(o,i):a(...o);return r!=null&&r.toJs?r.toJs({dict_converter:Object.fromEntries}):r}};M(at)});export default ot();
