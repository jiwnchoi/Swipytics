var Fe=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports);var rn=Fe((sn,j)=>{/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const V=Symbol("Comlink.proxy"),Me=Symbol("Comlink.endpoint"),Ee=Symbol("Comlink.releaseProxy"),P=Symbol("Comlink.finalizer"),F=Symbol("Comlink.thrown"),W=e=>typeof e=="object"&&e!==null||typeof e=="function",ke={canHandle:e=>W(e)&&e[V],serialize(e){const{port1:n,port2:r}=new MessageChannel;return $(e,n),[r,[r]]},deserialize(e){return e.start(),Ce(e)}},Te={canHandle:e=>W(e)&&F in e,serialize({value:e}){let n;return e instanceof Error?n={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:n={isError:!1,value:e},[n,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},G=new Map([["proxy",ke],["throw",Te]]);function Ne(e,n){for(const r of e)if(n===r||r==="*"||r instanceof RegExp&&r.test(n))return!0;return!1}function $(e,n=globalThis,r=["*"]){n.addEventListener("message",function a(s){if(!s||!s.data)return;if(!Ne(r,s.origin)){console.warn(`Invalid origin '${s.origin}' for comlink proxy`);return}const{id:i,type:t,path:l}=Object.assign({path:[]},s.data),o=(s.data.argumentList||[]).map(b);let c;try{const d=l.slice(0,-1).reduce((m,u)=>m[u],e),f=l.reduce((m,u)=>m[u],e);switch(t){case"GET":c=f;break;case"SET":d[l.slice(-1)[0]]=b(s.data.value),c=!0;break;case"APPLY":c=f.apply(d,o);break;case"CONSTRUCT":{const m=new f(...o);c=Re(m)}break;case"ENDPOINT":{const{port1:m,port2:u}=new MessageChannel;$(e,u),c=Ae(m,[m])}break;case"RELEASE":c=void 0;break;default:return}}catch(d){c={value:d,[F]:0}}Promise.resolve(c).catch(d=>({value:d,[F]:0})).then(d=>{const[f,m]=T(d);n.postMessage(Object.assign(Object.assign({},f),{id:i}),m),t==="RELEASE"&&(n.removeEventListener("message",a),Y(n),P in e&&typeof e[P]=="function"&&e[P]())}).catch(d=>{const[f,m]=T({value:new TypeError("Unserializable return value"),[F]:0});n.postMessage(Object.assign(Object.assign({},f),{id:i}),m)})}),n.start&&n.start()}function Oe(e){return e.constructor.name==="MessagePort"}function Y(e){Oe(e)&&e.close()}function Ce(e,n){return L(e,[],n)}function x(e){if(e)throw new Error("Proxy has been released and is not useable")}function X(e){return v(e,{type:"RELEASE"}).then(()=>{Y(e)})}const E=new WeakMap,k="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const n=(E.get(e)||0)-1;E.set(e,n),n===0&&X(e)});function Pe(e,n){const r=(E.get(n)||0)+1;E.set(n,r),k&&k.register(e,n,e)}function De(e){k&&k.unregister(e)}function L(e,n=[],r=function(){}){let a=!1;const s=new Proxy(r,{get(i,t){if(x(a),t===Ee)return()=>{De(s),X(e),a=!0};if(t==="then"){if(n.length===0)return{then:()=>s};const l=v(e,{type:"GET",path:n.map(o=>o.toString())}).then(b);return l.then.bind(l)}return L(e,[...n,t])},set(i,t,l){x(a);const[o,c]=T(l);return v(e,{type:"SET",path:[...n,t].map(d=>d.toString()),value:o},c).then(b)},apply(i,t,l){x(a);const o=n[n.length-1];if(o===Me)return v(e,{type:"ENDPOINT"}).then(b);if(o==="bind")return L(e,n.slice(0,-1));const[c,d]=H(l);return v(e,{type:"APPLY",path:n.map(f=>f.toString()),argumentList:c},d).then(b)},construct(i,t){x(a);const[l,o]=H(t);return v(e,{type:"CONSTRUCT",path:n.map(c=>c.toString()),argumentList:l},o).then(b)}});return Pe(s,e),s}function Le(e){return Array.prototype.concat.apply([],e)}function H(e){const n=e.map(T);return[n.map(r=>r[0]),Le(n.map(r=>r[1]))]}const J=new WeakMap;function Ae(e,n){return J.set(e,n),e}function Re(e){return Object.assign(e,{[V]:!0})}function T(e){for(const[n,r]of G)if(r.canHandle(e)){const[a,s]=r.serialize(e);return[{type:"HANDLER",name:n,value:a},s]}return[{type:"RAW",value:e},J.get(e)||[]]}function b(e){switch(e.type){case"HANDLER":return G.get(e.name).deserialize(e.value);case"RAW":return e.value}}function v(e,n,r){return new Promise(a=>{const s=je();e.addEventListener("message",function i(t){!t.data||!t.data.id||t.data.id!==s||(e.removeEventListener("message",i),a(t.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:s},n),r)})}function je(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}var $e=Object.create,q=Object.defineProperty,qe=Object.getOwnPropertyDescriptor,Ie=Object.getOwnPropertyNames,ze=Object.getPrototypeOf,Be=Object.prototype.hasOwnProperty,_=(e,n)=>q(e,"name",{value:n,configurable:!0}),K=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(n,r)=>(typeof require<"u"?require:n)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')}),Q=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports),Ue=(e,n,r,a)=>{if(n&&typeof n=="object"||typeof n=="function")for(let s of Ie(n))!Be.call(e,s)&&s!==r&&q(e,s,{get:()=>n[s],enumerable:!(a=qe(n,s))||a.enumerable});return e},He=(e,n,r)=>(r=e!=null?$e(ze(e)):{},Ue(!e||!e.__esModule?q(r,"default",{value:e,enumerable:!0}):r,e)),Ve=Q((e,n)=>{(function(r,a){typeof define=="function"&&define.amd?define("stackframe",[],a):typeof e=="object"?n.exports=a():r.StackFrame=a()})(e,function(){function r(p){return!isNaN(parseFloat(p))&&isFinite(p)}_(r,"_isNumber");function a(p){return p.charAt(0).toUpperCase()+p.substring(1)}_(a,"_capitalize");function s(p){return function(){return this[p]}}_(s,"_getter");var i=["isConstructor","isEval","isNative","isToplevel"],t=["columnNumber","lineNumber"],l=["fileName","functionName","source"],o=["args"],c=["evalOrigin"],d=i.concat(t,l,o,c);function f(p){if(p)for(var g=0;g<d.length;g++)p[d[g]]!==void 0&&this["set"+a(d[g])](p[d[g]])}_(f,"StackFrame"),f.prototype={getArgs:function(){return this.args},setArgs:function(p){if(Object.prototype.toString.call(p)!=="[object Array]")throw new TypeError("Args must be an Array");this.args=p},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(p){if(p instanceof f)this.evalOrigin=p;else if(p instanceof Object)this.evalOrigin=new f(p);else throw new TypeError("Eval Origin must be an Object or StackFrame")},toString:function(){var p=this.getFileName()||"",g=this.getLineNumber()||"",w=this.getColumnNumber()||"",S=this.getFunctionName()||"";return this.getIsEval()?p?"[eval] ("+p+":"+g+":"+w+")":"[eval]:"+g+":"+w:S?S+" ("+p+":"+g+":"+w+")":p+":"+g+":"+w}},f.fromString=_(function(p){var g=p.indexOf("("),w=p.lastIndexOf(")"),S=p.substring(0,g),be=p.substring(g+1,w).split(","),U=p.substring(w+1);if(U.indexOf("@")===0)var C=/@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(U,""),ve=C[1],Se=C[2],xe=C[3];return new f({functionName:S,args:be||void 0,fileName:ve,lineNumber:Se||void 0,columnNumber:xe||void 0})},"StackFrame$$fromString");for(var m=0;m<i.length;m++)f.prototype["get"+a(i[m])]=s(i[m]),f.prototype["set"+a(i[m])]=function(p){return function(g){this[p]=!!g}}(i[m]);for(var u=0;u<t.length;u++)f.prototype["get"+a(t[u])]=s(t[u]),f.prototype["set"+a(t[u])]=function(p){return function(g){if(!r(g))throw new TypeError(p+" must be a Number");this[p]=Number(g)}}(t[u]);for(var y=0;y<l.length;y++)f.prototype["get"+a(l[y])]=s(l[y]),f.prototype["set"+a(l[y])]=function(p){return function(g){this[p]=String(g)}}(l[y]);return f})}),We=Q((e,n)=>{(function(r,a){typeof define=="function"&&define.amd?define("error-stack-parser",["stackframe"],a):typeof e=="object"?n.exports=a(Ve()):r.ErrorStackParser=a(r.StackFrame)})(e,_(function(r){var a=/(^|@)\S+:\d+/,s=/^\s*at .*(\S+:\d+|\(native\))/m,i=/^(eval@)?(\[native code])?$/;return{parse:_(function(t){if(typeof t.stacktrace<"u"||typeof t["opera#sourceloc"]<"u")return this.parseOpera(t);if(t.stack&&t.stack.match(s))return this.parseV8OrIE(t);if(t.stack)return this.parseFFOrSafari(t);throw new Error("Cannot parse given Error object")},"ErrorStackParser$$parse"),extractLocation:_(function(t){if(t.indexOf(":")===-1)return[t];var l=/(.+?)(?::(\d+))?(?::(\d+))?$/,o=l.exec(t.replace(/[()]/g,""));return[o[1],o[2]||void 0,o[3]||void 0]},"ErrorStackParser$$extractLocation"),parseV8OrIE:_(function(t){var l=t.stack.split(`
`).filter(function(o){return!!o.match(s)},this);return l.map(function(o){o.indexOf("(eval ")>-1&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));var c=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),d=c.match(/ (\(.+\)$)/);c=d?c.replace(d[0],""):c;var f=this.extractLocation(d?d[1]:c),m=d&&c||void 0,u=["eval","<anonymous>"].indexOf(f[0])>-1?void 0:f[0];return new r({functionName:m,fileName:u,lineNumber:f[1],columnNumber:f[2],source:o})},this)},"ErrorStackParser$$parseV8OrIE"),parseFFOrSafari:_(function(t){var l=t.stack.split(`
`).filter(function(o){return!o.match(i)},this);return l.map(function(o){if(o.indexOf(" > eval")>-1&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),o.indexOf("@")===-1&&o.indexOf(":")===-1)return new r({functionName:o});var c=/((.*".+"[^@]*)?[^@]*)(?:@)/,d=o.match(c),f=d&&d[1]?d[1]:void 0,m=this.extractLocation(o.replace(c,""));return new r({functionName:f,fileName:m[0],lineNumber:m[1],columnNumber:m[2],source:o})},this)},"ErrorStackParser$$parseFFOrSafari"),parseOpera:_(function(t){return!t.stacktrace||t.message.indexOf(`
`)>-1&&t.message.split(`
`).length>t.stacktrace.split(`
`).length?this.parseOpera9(t):t.stack?this.parseOpera11(t):this.parseOpera10(t)},"ErrorStackParser$$parseOpera"),parseOpera9:_(function(t){for(var l=/Line (\d+).*script (?:in )?(\S+)/i,o=t.message.split(`
`),c=[],d=2,f=o.length;d<f;d+=2){var m=l.exec(o[d]);m&&c.push(new r({fileName:m[2],lineNumber:m[1],source:o[d]}))}return c},"ErrorStackParser$$parseOpera9"),parseOpera10:_(function(t){for(var l=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,o=t.stacktrace.split(`
`),c=[],d=0,f=o.length;d<f;d+=2){var m=l.exec(o[d]);m&&c.push(new r({functionName:m[3]||void 0,fileName:m[2],lineNumber:m[1],source:o[d]}))}return c},"ErrorStackParser$$parseOpera10"),parseOpera11:_(function(t){var l=t.stack.split(`
`).filter(function(o){return!!o.match(a)&&!o.match(/^Error created at/)},this);return l.map(function(o){var c=o.split("@"),d=this.extractLocation(c.pop()),f=c.shift()||"",m=f.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^)]*\)/g,"")||void 0,u;f.match(/\(([^)]*)\)/)&&(u=f.replace(/^[^(]+\(([^)]*)\)$/,"$1"));var y=u===void 0||u==="[arguments not available]"?void 0:u.split(",");return new r({functionName:m,args:y,fileName:d[0],lineNumber:d[1],columnNumber:d[2],source:o})},this)},"ErrorStackParser$$parseOpera11")}},"ErrorStackParser"))}),Ge=He(We()),h=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string"&&typeof process.browser>"u",Z=h&&typeof j<"u"&&typeof j.exports<"u"&&typeof K<"u"&&typeof __dirname<"u",Ye=h&&!Z,Xe=typeof Deno<"u",ee=!h&&!Xe,Je=ee&&typeof window<"u"&&typeof document<"u"&&typeof document.createElement<"u"&&typeof sessionStorage<"u",Ke=ee&&typeof importScripts<"u"&&typeof self<"u",ne,N,A,te,I,Qe=`"fetch" is not defined, maybe you're using node < 18? From Pyodide >= 0.25.0, node >= 18 is required. Older versions of Node.js may work, but it is not guaranteed or supported. Falling back to "node-fetch".`;async function z(){if(!h||(ne=(await import("./__vite-browser-external-CIEyP2s7.js")).default,I=await import("./__vite-browser-external-CIEyP2s7.js"),globalThis.fetch?N=fetch:(console.warn(Qe),N=(await import("./index-B489Fav_.js")).default),te=(await import("./__vite-browser-external-CIEyP2s7.js")).default,A=await import("./__vite-browser-external-CIEyP2s7.js"),B=A.sep,typeof K<"u"))return;let e=await import("./__vite-browser-external-CIEyP2s7.js"),n=await import("./__vite-browser-external-CIEyP2s7.js"),r=await import("./__vite-browser-external-CIEyP2s7.js"),a=await import("./__vite-browser-external-CIEyP2s7.js"),s={fs:e,crypto:n,ws:r,child_process:a};globalThis.require=function(i){return s[i]}}_(z,"initNodeModules");function re(e,n){return A.resolve(n||".",e)}_(re,"node_resolvePath");function ie(e,n){return n===void 0&&(n=location),new URL(e,n).toString()}_(ie,"browser_resolvePath");var R;h?R=re:R=ie;var B;h||(B="/");function ae(e,n){return e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?{response:N(e)}:{binary:I.readFile(e).then(r=>new Uint8Array(r.buffer,r.byteOffset,r.byteLength))}}_(ae,"node_getBinaryResponse");function se(e,n){let r=new URL(e,location);return{response:fetch(r,n?{integrity:n}:{})}}_(se,"browser_getBinaryResponse");var O;h?O=ae:O=se;async function oe(e,n){let{response:r,binary:a}=O(e,n);if(a)return a;let s=await r;if(!s.ok)throw new Error(`Failed to load '${e}': request failed.`);return new Uint8Array(await s.arrayBuffer())}_(oe,"loadBinaryFile");var M;if(Je)M=_(async e=>await import(e),"loadScript");else if(Ke)M=_(async e=>{try{globalThis.importScripts(e)}catch(n){if(n instanceof TypeError)await import(e);else throw n}},"loadScript");else if(h)M=le;else throw new Error("Cannot determine runtime environment");async function le(e){e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?te.runInThisContext(await(await N(e)).text()):await import(ne.pathToFileURL(e).href)}_(le,"nodeLoadScript");async function de(e){if(h){await z();let n=await I.readFile(e);return JSON.parse(n)}else return await(await fetch(e)).json()}_(de,"loadLockFile");async function ce(){if(Z)return __dirname;let e;try{throw new Error}catch(a){e=a}let n=Ge.default.parse(e)[0].fileName;if(Ye){let a=await import("./__vite-browser-external-CIEyP2s7.js");return(await import("./__vite-browser-external-CIEyP2s7.js")).fileURLToPath(a.dirname(n))}let r=n.lastIndexOf(B);if(r===-1)throw new Error("Could not extract indexURL path from pyodide module location");return n.slice(0,r)}_(ce,"calculateDirname");function fe(e){let n=e.FS,r=e.FS.filesystems.MEMFS,a=e.PATH,s={DIR_MODE:16895,FILE_MODE:33279,mount:function(i){if(!i.opts.fileSystemHandle)throw new Error("opts.fileSystemHandle is required");return r.mount.apply(null,arguments)},syncfs:async(i,t,l)=>{try{let o=s.getLocalSet(i),c=await s.getRemoteSet(i),d=t?c:o,f=t?o:c;await s.reconcile(i,d,f),l(null)}catch(o){l(o)}},getLocalSet:i=>{let t=Object.create(null);function l(d){return d!=="."&&d!==".."}_(l,"isRealDir");function o(d){return f=>a.join2(d,f)}_(o,"toAbsolute");let c=n.readdir(i.mountpoint).filter(l).map(o(i.mountpoint));for(;c.length;){let d=c.pop(),f=n.stat(d);n.isDir(f.mode)&&c.push.apply(c,n.readdir(d).filter(l).map(o(d))),t[d]={timestamp:f.mtime,mode:f.mode}}return{type:"local",entries:t}},getRemoteSet:async i=>{let t=Object.create(null),l=await Ze(i.opts.fileSystemHandle);for(let[o,c]of l)o!=="."&&(t[a.join2(i.mountpoint,o)]={timestamp:c.kind==="file"?(await c.getFile()).lastModifiedDate:new Date,mode:c.kind==="file"?s.FILE_MODE:s.DIR_MODE});return{type:"remote",entries:t,handles:l}},loadLocalEntry:i=>{let t=n.lookupPath(i).node,l=n.stat(i);if(n.isDir(l.mode))return{timestamp:l.mtime,mode:l.mode};if(n.isFile(l.mode))return t.contents=r.getFileDataAsTypedArray(t),{timestamp:l.mtime,mode:l.mode,contents:t.contents};throw new Error("node type not supported")},storeLocalEntry:(i,t)=>{if(n.isDir(t.mode))n.mkdirTree(i,t.mode);else if(n.isFile(t.mode))n.writeFile(i,t.contents,{canOwn:!0});else throw new Error("node type not supported");n.chmod(i,t.mode),n.utime(i,t.timestamp,t.timestamp)},removeLocalEntry:i=>{var t=n.stat(i);n.isDir(t.mode)?n.rmdir(i):n.isFile(t.mode)&&n.unlink(i)},loadRemoteEntry:async i=>{if(i.kind==="file"){let t=await i.getFile();return{contents:new Uint8Array(await t.arrayBuffer()),mode:s.FILE_MODE,timestamp:t.lastModifiedDate}}else{if(i.kind==="directory")return{mode:s.DIR_MODE,timestamp:new Date};throw new Error("unknown kind: "+i.kind)}},storeRemoteEntry:async(i,t,l)=>{let o=i.get(a.dirname(t)),c=n.isFile(l.mode)?await o.getFileHandle(a.basename(t),{create:!0}):await o.getDirectoryHandle(a.basename(t),{create:!0});if(c.kind==="file"){let d=await c.createWritable();await d.write(l.contents),await d.close()}i.set(t,c)},removeRemoteEntry:async(i,t)=>{await i.get(a.dirname(t)).removeEntry(a.basename(t)),i.delete(t)},reconcile:async(i,t,l)=>{let o=0,c=[];Object.keys(t.entries).forEach(function(m){let u=t.entries[m],y=l.entries[m];(!y||n.isFile(u.mode)&&u.timestamp.getTime()>y.timestamp.getTime())&&(c.push(m),o++)}),c.sort();let d=[];if(Object.keys(l.entries).forEach(function(m){t.entries[m]||(d.push(m),o++)}),d.sort().reverse(),!o)return;let f=t.type==="remote"?t.handles:l.handles;for(let m of c){let u=a.normalize(m.replace(i.mountpoint,"/")).substring(1);if(l.type==="local"){let y=f.get(u),p=await s.loadRemoteEntry(y);s.storeLocalEntry(m,p)}else{let y=s.loadLocalEntry(m);await s.storeRemoteEntry(f,u,y)}}for(let m of d)if(l.type==="local")s.removeLocalEntry(m);else{let u=a.normalize(m.replace(i.mountpoint,"/")).substring(1);await s.removeRemoteEntry(f,u)}}};e.FS.filesystems.NATIVEFS_ASYNC=s}_(fe,"initializeNativeFS");var Ze=_(async e=>{let n=[];async function r(s){for await(let i of s.values())n.push(i),i.kind==="directory"&&await r(i)}_(r,"collect"),await r(e);let a=new Map;a.set(".",e);for(let s of n){let i=(await e.resolve(s)).join("/");a.set(i,s)}return a},"getFsHandles");function me(){let e={};return e.noImageDecoding=!0,e.noAudioDecoding=!0,e.noWasmDecoding=!1,e.preRun=[],e.quit=(n,r)=>{throw e.exited={status:n,toThrow:r},r},e}_(me,"createModule");function pe(e,n){e.preRun.push(function(){let r="/";try{e.FS.mkdirTree(n)}catch(a){console.error(`Error occurred while making a home directory '${n}':`),console.error(a),console.error(`Using '${r}' for a home directory instead`),n=r}e.FS.chdir(n)})}_(pe,"createHomeDirectory");function _e(e,n){e.preRun.push(function(){Object.assign(e.ENV,n)})}_(_e,"setEnvironment");function ue(e,n){e.preRun.push(()=>{for(let r of n)e.FS.mkdirTree(r),e.FS.mount(e.FS.filesystems.NODEFS,{root:r},r)})}_(ue,"mountLocalDirectories");function ge(e,n){let r=oe(n);e.preRun.push(()=>{let a=e._py_version_major(),s=e._py_version_minor();e.FS.mkdirTree("/lib"),e.FS.mkdirTree(`/lib/python${a}.${s}/site-packages`),e.addRunDependency("install-stdlib"),r.then(i=>{e.FS.writeFile(`/lib/python${a}${s}.zip`,i)}).catch(i=>{console.error("Error occurred while installing the standard library:"),console.error(i)}).finally(()=>{e.removeRunDependency("install-stdlib")})})}_(ge,"installStdlib");function ye(e,n){let r;n.stdLibURL!=null?r=n.stdLibURL:r=n.indexURL+"python_stdlib.zip",ge(e,r),pe(e,n.env.HOME),_e(e,n.env),ue(e,n._node_mounts),e.preRun.push(()=>fe(e))}_(ye,"initializeFileSystem");function he(e,n){let{binary:r,response:a}=O(n+"pyodide.asm.wasm");e.instantiateWasm=function(s,i){return async function(){try{let t;a?t=await WebAssembly.instantiateStreaming(a,s):t=await WebAssembly.instantiate(await r,s);let{instance:l,module:o}=t;typeof WasmOffsetConverter<"u"&&(wasmOffsetConverter=new WasmOffsetConverter(wasmBinary,o)),i(l,o)}catch(t){console.warn("wasm instantiation failed!"),console.warn(t)}}(),{}}}_(he,"preloadWasm");var D="0.25.0";async function we(e={}){await z();let n=e.indexURL||await ce();n=R(n),n.endsWith("/")||(n+="/"),e.indexURL=n;let r={fullStdLib:!1,jsglobals:globalThis,stdin:globalThis.prompt?globalThis.prompt:void 0,lockFileURL:n+"pyodide-lock.json",args:[],_node_mounts:[],env:{},packageCacheDir:n,packages:[]},a=Object.assign(r,e);a.env.HOME||(a.env.HOME="/home/pyodide");let s=me();s.print=a.stdout,s.printErr=a.stderr,s.arguments=a.args;let i={config:a};s.API=i,i.lockFilePromise=de(a.lockFileURL),he(s,n),ye(s,a);let t=new Promise(o=>s.postRun=o);if(s.locateFile=o=>a.indexURL+o,typeof _createPyodideModule!="function"){let o=`${a.indexURL}pyodide.asm.js`;await M(o)}if(await _createPyodideModule(s),await t,s.exited)throw s.exited.toThrow;if(e.pyproxyToStringRepr&&i.setPyProxyToStringMethod(!0),i.version!==D)throw new Error(`Pyodide version does not match: '${D}' <==> '${i.version}'. If you updated the Pyodide version, make sure you also updated the 'indexURL' parameter passed to loadPyodide.`);s.locateFile=o=>{throw new Error("Didn't expect to load any more file_packager files!")};let l=i.finalizeBootstrap();if(l.version.includes("dev")||i.setCdnUrl(`https://cdn.jsdelivr.net/pyodide/v${l.version}/full/`),await i.packageIndexReady,i._pyodide._importhook.register_module_not_found_hook(i._import_name_to_package_name,i.lockfile_unvendored_stdlibs_and_test),i.lockfile_info.version!==D)throw new Error("Lock file version doesn't match Pyodide version");return i.package_loader.init_loaded_packages(),a.fullStdLib&&await l.loadPackage(i.lockfile_unvendored_stdlibs),i.initializeStreams(a.stdin,a.stdout,a.stderr),l}_(we,"loadPyodide");async function en(e){const n={"api/app.py":`from __future__ import annotations

from typing import Any

from api.models import ChartModel, SessionModel
from api.services import browse_charts, get_next_chart

sessionState: SessionModel = SessionModel()


def getSession():
  global sessionState
  return sessionState


def loadSession(session: dict[str, Any] | SessionModel):
  global sessionState
  if isinstance(session, dict):
    session = SessionModel.model_validate(session)

  sessionState = SessionModel(filename=session.filename)
  sessionState.charts = session.charts
  sessionState.timestamp = session.timestamp

  if len(sessionState.charts) == 0:
    chart = get_next_chart(sessionState)
    sessionState.charts.append(chart) if chart else None

  return sessionState.model_dump(by_alias=True, mode="json")


def appendChart(chart: dict[str, Any] | ChartModel):
  global sessionState
  if isinstance(chart, dict):
    chart = ChartModel.model_validate(chart)
  sessionState.charts.append(chart)
  return sessionState.model_dump(by_alias=True, mode="json")


def appendNextChart():
  global sessionState
  chart = get_next_chart(sessionState)
  sessionState.charts.append(chart) if chart else None
  return chart.model_dump(by_alias=True, mode="json") if chart else None


def browseCharts(field_names: list[str]):
  global sessionState
  browsed_chart = browse_charts(sessionState, field_names)
  return [chart.model_dump(by_alias=True, mode="json") for chart in browsed_chart]


def setPreferred(key: str, preferred: bool):
  global sessionState
  chart = next((chart for chart in sessionState.charts if chart.key == key), None)
  if chart:
    chart.preferred = preferred
    return chart.model_dump(by_alias=True, mode="json")
  else:
    return None


print("Python backend loaded")
`,"api/models/__init__.py":`from .chart_model import ChartModel, DefaultConfig
from .field_model import FieldModel
from .metadata_model import FieldType, MetadataModel
from .session_model import SessionModel

__all__ = [
  "ChartModel",
  "FieldModel",
  "FieldType",
  "MetadataModel",
  "SessionModel",
  "DefaultConfig",
]
`,"api/models/chart_model.py":`from typing import Any, Dict, List, Self

from api.utils import get_fields_hash, get_timestamp
from pydantic import BaseModel, Field, model_validator

from .field_model import FieldModel
from .model_config import DefaultConfig


class ChartModel(BaseModel):
  fields: tuple[FieldModel, ...] = Field(default_factory=tuple)
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
`,"api/models/field_model.py":`import pandas as pd
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
    if series.nunique() > 20:
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
from .field_model import FieldModel
from .model_config import DefaultConfig

NEW_FIELD_P = 0.2


class SessionModel(BaseModel):
  filename: str = Field(default="")
  df: pd.DataFrame = Field(default=None, repr=False, exclude=True)
  timestamp: int = Field(default_factory=get_timestamp, init=False)
  charts: list["ChartModel"] = Field(default_factory=list, init=False)
  fields: list["FieldModel"] = Field(default_factory=list, init=False)

  model_config = DefaultConfig

  @model_validator(mode="after")
  def prosess_df(self) -> Self:
    if self.filename == "":
      return self

    clear_field_name_cache()
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

    return [*len_1_fields, *len_2_fields, *len_3_fields]

  @cached_property
  def visualizable_fields(self) -> list[FieldModel]:
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
from api.models import ChartModel, FieldModel

from .get_facts import get_facts_from_fields
from .get_specs import get_specs_from_facts


def get_chart(df: pd.DataFrame, fields: tuple[FieldModel, ...]) -> ChartModel | None:
  facts = get_facts_from_fields(df, fields)
  specs = get_specs_from_facts(df, facts)
  return ChartModel(fields=fields, specs=specs) if specs else None
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
  ]


def _get_attribute_facts(df: pd.DataFrame, fields: tuple["FieldModel", ...]) -> list[str]:
  base_scheme = draco.schema_from_dataframe(df[[f.clingo_name for f in fields]])
  base_scheme = {
    **base_scheme,
    "field": [rescale_field_to_32bit(f) for f in base_scheme["field"]],
  }
  facts = draco.dict_to_facts(base_scheme)
  return facts


def _get_encoding_facts(fields: tuple["FieldModel", ...]) -> list[str]:
  facts = [
    f
    for i, field in enumerate(fields)
    for f in [
      f"entity(encoding,m0,e{i}).",
      f"attribute((encoding,field),e{i},{field.clingo_name}).",
    ]
  ]

  if len(fields) == 3:
    facts.append(":- attribute((encoding,channel),e2,x).")
    facts.append(":- attribute((encoding,channel),e2,y).")

  return facts


def get_facts_from_fields(df: pd.DataFrame, fields: tuple["FieldModel", ...]) -> list[str]:
  facts = _get_base_facts() + _get_attribute_facts(df, fields) + _get_encoding_facts(fields)

  return facts
`,"api/services/get_next_chart.py":`from __future__ import annotations

from typing import TypeVar

import numpy as np
from api.models import ChartModel, FieldModel, SessionModel
from api.services import get_chart
from api.utils import (
  find_last_index,
  get_fields_hash,
  has_categorical_categorical_stat,
  has_numeric_categorical_stat,
  has_numeric_datetime_stat,
  has_numeric_numeric_stat,
  sample,
)

T = TypeVar("T")


def get_cognition_penalty(fields: tuple[FieldModel, ...]) -> float:
  return len(fields) / 3


def get_duplicate_penalty(session: SessionModel, fields: tuple[FieldModel, ...]) -> float:
  n_fields = len(session.fields)
  last_index = find_last_index(
    session.charts, lambda c: get_fields_hash(c.fields) == get_fields_hash(fields)
  )
  return (
    max(1 - ((len(session.charts) - last_index - 1) / n_fields), 0) * 3 if last_index != -1 else 0.0
  )


def get_fields_vector(session: SessionModel, use_preference: bool = False) -> np.ndarray:
  matrix = np.array(
    [
      [f in chart.fields and (chart.preferred if use_preference else True) for f in session.fields]
      for chart in session.charts
    ],
    dtype=np.float64,
  )
  matrix *= np.arange(1, len(matrix) + 1)[:, None]
  vector: np.ndarray = np.sum(matrix, axis=0)
  return vector / vector.max() if vector.max() != 0 else vector


def get_statistics_score(session: SessionModel, fields: tuple[FieldModel, ...]) -> float:
  if len(fields) == 1:
    return 1.0
  types = tuple(field.type for field in fields[:2])
  series = tuple(session.df[field.clingo_name] for field in fields[:2])
  type_combinations = {
    ("numeric", "numeric"): has_numeric_numeric_stat,
    ("categorical", "categorical"): has_categorical_categorical_stat,
    ("numeric", "categorical"): has_numeric_categorical_stat,
    ("categorical", "numeric"): lambda x, y: has_numeric_categorical_stat(y, x),
    ("numeric", "datetime"): has_numeric_datetime_stat,
    ("datetime", "numeric"): lambda x, y: has_numeric_datetime_stat(y, x),
  }
  return type_combinations[types](*series) if types in type_combinations else 0.0


def get_score(vector: np.ndarray, field_vector: np.ndarray) -> float:
  return float(np.sum(vector * field_vector) / np.sum(field_vector))


def get_next_chart(session: SessionModel) -> ChartModel | None:
  if not session.charts:
    field = sample(session.visualizable_fields)
    return get_chart(session.df, (field,))

  if not session.available_fields:
    return None

  relevance_vector = get_fields_vector(session)
  preference_vector = get_fields_vector(session, use_preference=True)

  def scores(fields):
    field_vector = np.array([f in fields for f in session.fields], dtype=np.float64)
    return [
      get_statistics_score(session, fields),
      get_score(relevance_vector, field_vector),
      get_score(preference_vector, field_vector),
      -get_duplicate_penalty(session, fields),
      -get_cognition_penalty(fields),
    ]

  total_scores = [scores(fields) for fields in session.available_fields]
  selected_fields, _ = max(zip(session.available_fields, total_scores), key=lambda x: sum(x[1]))

  return get_chart(session.df, selected_fields)
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
  "clear_field_name_cache",
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


def find_right(lst: list[T], predicate: Callable[[T], bool]) -> T | None:
  return next((x for x in reversed(lst) if predicate(x)), None)


def find_index(lst: list[T], predicate: Callable[[T], bool]) -> int:
  return next((i for i, x in enumerate(lst) if predicate(x)), -1)


def find_last_index(lst: list[T], predicate: Callable[[T], bool]) -> int:
  return next((i for i, x in reversed(list(enumerate(lst))) if predicate(x)), -1)
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
`};for(const[r,a]of Object.entries(n)){const s=r.split("/").slice(0,-1);let i="";for(const t of s){i=i?`${i}/${t}`:t;try{e.FS.mkdir(i)}catch{}}e.FS.writeFile(r,a)}}async function nn(e){await e.runPythonAsync(`from __future__ import annotations

from typing import Any

from api.models import ChartModel, SessionModel
from api.services import browse_charts, get_next_chart

sessionState: SessionModel = SessionModel()


def getSession():
  global sessionState
  return sessionState


def loadSession(session: dict[str, Any] | SessionModel):
  global sessionState
  if isinstance(session, dict):
    session = SessionModel.model_validate(session)

  sessionState = SessionModel(filename=session.filename)
  sessionState.charts = session.charts
  sessionState.timestamp = session.timestamp

  if len(sessionState.charts) == 0:
    chart = get_next_chart(sessionState)
    sessionState.charts.append(chart) if chart else None

  return sessionState.model_dump(by_alias=True, mode="json")


def appendChart(chart: dict[str, Any] | ChartModel):
  global sessionState
  if isinstance(chart, dict):
    chart = ChartModel.model_validate(chart)
  sessionState.charts.append(chart)
  return sessionState.model_dump(by_alias=True, mode="json")


def appendNextChart():
  global sessionState
  chart = get_next_chart(sessionState)
  sessionState.charts.append(chart) if chart else None
  return chart.model_dump(by_alias=True, mode="json") if chart else None


def browseCharts(field_names: list[str]):
  global sessionState
  browsed_chart = browse_charts(sessionState, field_names)
  return [chart.model_dump(by_alias=True, mode="json") for chart in browsed_chart]


def setPreferred(key: str, preferred: bool):
  global sessionState
  chart = next((chart for chart in sessionState.charts if chart.key == key), None)
  if chart:
    chart.preferred = preferred
    return chart.model_dump(by_alias=True, mode="json")
  else:
    return None


print("Python backend loaded")
`)}const tn={pyodide:null,async writeFile(e,n){try{if(!this.pyodide)throw new Error("Pyodide is not initialized");this.pyodide.FS.mkdir("data"),this.pyodide.FS.writeFile(`data/${e}`,n,{encoding:"binary",flags:"w"})}catch(r){throw console.error(r),r}},async readFile(e){try{if(!this.pyodide)throw new Error("Pyodide is not initialized");return this.pyodide.FS.readFile(`${e}`,{encoding:"utf-8"})}catch(n){throw console.error(n),n}},async initialize(e=[]){this.pyodide=await we({indexURL:"/Swipytics/artifacts"});for(const n of e)await this.pyodide.loadPackage(n);await en(this.pyodide);try{await nn(this.pyodide)}catch(n){console.error(n)}},terminate(){if(this.pyodide){const e=new Uint8Array(new SharedArrayBuffer(1));e[0]=2,this.pyodide.setInterruptBuffer(e),this.pyodide=null}},async runPython(e,n={}){if(!this.pyodide)throw new Error("Pyodide is not initialized");const r=this.pyodide.globals.get("dict")();for(const[a,s]of Object.entries(n))r.set(a,s);return this.pyodide.runPython(e,{globals:r})},async callPythonFunction(e,n){if(!this.pyodide)throw new Error("Pyodide is not initialized");const r=this.pyodide.globals.get(e);if(!r)throw new Error(`Function ${e} is not defined in globals`);const a=this.pyodide.toPy(n),s=r.call(r,...a),i=s==null?void 0:s.toJs({dict_converter:Object.fromEntries,depth:1e5});return a.destroy(),s.destroy(),i}};$(tn)});export default rn();
