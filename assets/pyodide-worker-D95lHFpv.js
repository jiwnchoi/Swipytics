var Se=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports);var rn=Se((sn,I)=>{/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const V=Symbol("Comlink.proxy"),xe=Symbol("Comlink.endpoint"),Fe=Symbol("Comlink.releaseProxy"),L=Symbol("Comlink.finalizer"),S=Symbol("Comlink.thrown"),G=e=>typeof e=="object"&&e!==null||typeof e=="function",Ne={canHandle:e=>G(e)&&e[V],serialize(e){const{port1:n,port2:r}=new MessageChannel;return j(e,n),[r,[r]]},deserialize(e){return e.start(),Te(e)}},Oe={canHandle:e=>G(e)&&S in e,serialize({value:e}){let n;return e instanceof Error?n={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:n={isError:!1,value:e},[n,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},Y=new Map([["proxy",Ne],["throw",Oe]]);function Pe(e,n){for(const r of e)if(n===r||r==="*"||r instanceof RegExp&&r.test(n))return!0;return!1}function j(e,n=globalThis,r=["*"]){n.addEventListener("message",function a(o){if(!o||!o.data)return;if(!Pe(r,o.origin)){console.warn(`Invalid origin '${o.origin}' for comlink proxy`);return}const{id:i,type:t,path:l}=Object.assign({path:[]},o.data),s=(o.data.argumentList||[]).map(b);let c;try{const f=l.slice(0,-1).reduce((m,_)=>m[_],e),d=l.reduce((m,_)=>m[_],e);switch(t){case"GET":c=d;break;case"SET":f[l.slice(-1)[0]]=b(o.data.value),c=!0;break;case"APPLY":c=d.apply(f,s);break;case"CONSTRUCT":{const m=new d(...s);c=$e(m)}break;case"ENDPOINT":{const{port1:m,port2:_}=new MessageChannel;j(e,_),c=De(m,[m])}break;case"RELEASE":c=void 0;break;default:return}}catch(f){c={value:f,[S]:0}}Promise.resolve(c).catch(f=>({value:f,[S]:0})).then(f=>{const[d,m]=O(f);n.postMessage(Object.assign(Object.assign({},d),{id:i}),m),t==="RELEASE"&&(n.removeEventListener("message",a),K(n),L in e&&typeof e[L]=="function"&&e[L]())}).catch(f=>{const[d,m]=O({value:new TypeError("Unserializable return value"),[S]:0});n.postMessage(Object.assign(Object.assign({},d),{id:i}),m)})}),n.start&&n.start()}function Ce(e){return e.constructor.name==="MessagePort"}function K(e){Ce(e)&&e.close()}function Te(e,n){return A(e,[],n)}function k(e){if(e)throw new Error("Proxy has been released and is not useable")}function B(e){return v(e,{type:"RELEASE"}).then(()=>{K(e)})}const F=new WeakMap,N="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const n=(F.get(e)||0)-1;F.set(e,n),n===0&&B(e)});function Le(e,n){const r=(F.get(n)||0)+1;F.set(n,r),N&&N.register(e,n,e)}function Re(e){N&&N.unregister(e)}function A(e,n=[],r=function(){}){let a=!1;const o=new Proxy(r,{get(i,t){if(k(a),t===Fe)return()=>{Re(o),B(e),a=!0};if(t==="then"){if(n.length===0)return{then:()=>o};const l=v(e,{type:"GET",path:n.map(s=>s.toString())}).then(b);return l.then.bind(l)}return A(e,[...n,t])},set(i,t,l){k(a);const[s,c]=O(l);return v(e,{type:"SET",path:[...n,t].map(f=>f.toString()),value:s},c).then(b)},apply(i,t,l){k(a);const s=n[n.length-1];if(s===xe)return v(e,{type:"ENDPOINT"}).then(b);if(s==="bind")return A(e,n.slice(0,-1));const[c,f]=q(l);return v(e,{type:"APPLY",path:n.map(d=>d.toString()),argumentList:c},f).then(b)},construct(i,t){k(a);const[l,s]=q(t);return v(e,{type:"CONSTRUCT",path:n.map(c=>c.toString()),argumentList:l},s).then(b)}});return Le(o,e),o}function Ae(e){return Array.prototype.concat.apply([],e)}function q(e){const n=e.map(O);return[n.map(r=>r[0]),Ae(n.map(r=>r[1]))]}const J=new WeakMap;function De(e,n){return J.set(e,n),e}function $e(e){return Object.assign(e,{[V]:!0})}function O(e){for(const[n,r]of Y)if(r.canHandle(e)){const[a,o]=r.serialize(e);return[{type:"HANDLER",name:n,value:a},o]}return[{type:"RAW",value:e},J.get(e)||[]]}function b(e){switch(e.type){case"HANDLER":return Y.get(e.name).deserialize(e.value);case"RAW":return e.value}}function v(e,n,r){return new Promise(a=>{const o=Ie();e.addEventListener("message",function i(t){!t.data||!t.data.id||t.data.id!==o||(e.removeEventListener("message",i),a(t.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:o},n),r)})}function Ie(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}var je=Object.create,M=Object.defineProperty,Me=Object.getOwnPropertyDescriptor,He=Object.getOwnPropertyNames,Ue=Object.getPrototypeOf,ze=Object.prototype.hasOwnProperty,p=(e,n)=>M(e,"name",{value:n,configurable:!0}),X=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(n,r)=>(typeof require<"u"?require:n)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')}),Q=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports),We=(e,n,r,a)=>{if(n&&typeof n=="object"||typeof n=="function")for(let o of He(n))!ze.call(e,o)&&o!==r&&M(e,o,{get:()=>n[o],enumerable:!(a=Me(n,o))||a.enumerable});return e},qe=(e,n,r)=>(r=e!=null?je(Ue(e)):{},We(!e||!e.__esModule?M(r,"default",{value:e,enumerable:!0}):r,e)),Ve=Q((e,n)=>{(function(r,a){typeof define=="function"&&define.amd?define("stackframe",[],a):typeof e=="object"?n.exports=a():r.StackFrame=a()})(e,function(){function r(u){return!isNaN(parseFloat(u))&&isFinite(u)}p(r,"_isNumber");function a(u){return u.charAt(0).toUpperCase()+u.substring(1)}p(a,"_capitalize");function o(u){return function(){return this[u]}}p(o,"_getter");var i=["isConstructor","isEval","isNative","isToplevel"],t=["columnNumber","lineNumber"],l=["fileName","functionName","source"],s=["args"],c=["evalOrigin"],f=i.concat(t,l,s,c);function d(u){if(u)for(var g=0;g<f.length;g++)u[f[g]]!==void 0&&this["set"+a(f[g])](u[f[g]])}p(d,"StackFrame"),d.prototype={getArgs:function(){return this.args},setArgs:function(u){if(Object.prototype.toString.call(u)!=="[object Array]")throw new TypeError("Args must be an Array");this.args=u},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(u){if(u instanceof d)this.evalOrigin=u;else if(u instanceof Object)this.evalOrigin=new d(u);else throw new TypeError("Eval Origin must be an Object or StackFrame")},toString:function(){var u=this.getFileName()||"",g=this.getLineNumber()||"",w=this.getColumnNumber()||"",E=this.getFunctionName()||"";return this.getIsEval()?u?"[eval] ("+u+":"+g+":"+w+")":"[eval]:"+g+":"+w:E?E+" ("+u+":"+g+":"+w+")":u+":"+g+":"+w}},d.fromString=p(function(u){var g=u.indexOf("("),w=u.lastIndexOf(")"),E=u.substring(0,g),be=u.substring(g+1,w).split(","),W=u.substring(w+1);if(W.indexOf("@")===0)var T=/@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(W,""),ve=T[1],Ee=T[2],ke=T[3];return new d({functionName:E,args:be||void 0,fileName:ve,lineNumber:Ee||void 0,columnNumber:ke||void 0})},"StackFrame$$fromString");for(var m=0;m<i.length;m++)d.prototype["get"+a(i[m])]=o(i[m]),d.prototype["set"+a(i[m])]=function(u){return function(g){this[u]=!!g}}(i[m]);for(var _=0;_<t.length;_++)d.prototype["get"+a(t[_])]=o(t[_]),d.prototype["set"+a(t[_])]=function(u){return function(g){if(!r(g))throw new TypeError(u+" must be a Number");this[u]=Number(g)}}(t[_]);for(var y=0;y<l.length;y++)d.prototype["get"+a(l[y])]=o(l[y]),d.prototype["set"+a(l[y])]=function(u){return function(g){this[u]=String(g)}}(l[y]);return d})}),Ge=Q((e,n)=>{(function(r,a){typeof define=="function"&&define.amd?define("error-stack-parser",["stackframe"],a):typeof e=="object"?n.exports=a(Ve()):r.ErrorStackParser=a(r.StackFrame)})(e,p(function(r){var a=/(^|@)\S+:\d+/,o=/^\s*at .*(\S+:\d+|\(native\))/m,i=/^(eval@)?(\[native code])?$/;return{parse:p(function(t){if(typeof t.stacktrace<"u"||typeof t["opera#sourceloc"]<"u")return this.parseOpera(t);if(t.stack&&t.stack.match(o))return this.parseV8OrIE(t);if(t.stack)return this.parseFFOrSafari(t);throw new Error("Cannot parse given Error object")},"ErrorStackParser$$parse"),extractLocation:p(function(t){if(t.indexOf(":")===-1)return[t];var l=/(.+?)(?::(\d+))?(?::(\d+))?$/,s=l.exec(t.replace(/[()]/g,""));return[s[1],s[2]||void 0,s[3]||void 0]},"ErrorStackParser$$extractLocation"),parseV8OrIE:p(function(t){var l=t.stack.split(`
`).filter(function(s){return!!s.match(o)},this);return l.map(function(s){s.indexOf("(eval ")>-1&&(s=s.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));var c=s.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),f=c.match(/ (\(.+\)$)/);c=f?c.replace(f[0],""):c;var d=this.extractLocation(f?f[1]:c),m=f&&c||void 0,_=["eval","<anonymous>"].indexOf(d[0])>-1?void 0:d[0];return new r({functionName:m,fileName:_,lineNumber:d[1],columnNumber:d[2],source:s})},this)},"ErrorStackParser$$parseV8OrIE"),parseFFOrSafari:p(function(t){var l=t.stack.split(`
`).filter(function(s){return!s.match(i)},this);return l.map(function(s){if(s.indexOf(" > eval")>-1&&(s=s.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),s.indexOf("@")===-1&&s.indexOf(":")===-1)return new r({functionName:s});var c=/((.*".+"[^@]*)?[^@]*)(?:@)/,f=s.match(c),d=f&&f[1]?f[1]:void 0,m=this.extractLocation(s.replace(c,""));return new r({functionName:d,fileName:m[0],lineNumber:m[1],columnNumber:m[2],source:s})},this)},"ErrorStackParser$$parseFFOrSafari"),parseOpera:p(function(t){return!t.stacktrace||t.message.indexOf(`
`)>-1&&t.message.split(`
`).length>t.stacktrace.split(`
`).length?this.parseOpera9(t):t.stack?this.parseOpera11(t):this.parseOpera10(t)},"ErrorStackParser$$parseOpera"),parseOpera9:p(function(t){for(var l=/Line (\d+).*script (?:in )?(\S+)/i,s=t.message.split(`
`),c=[],f=2,d=s.length;f<d;f+=2){var m=l.exec(s[f]);m&&c.push(new r({fileName:m[2],lineNumber:m[1],source:s[f]}))}return c},"ErrorStackParser$$parseOpera9"),parseOpera10:p(function(t){for(var l=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,s=t.stacktrace.split(`
`),c=[],f=0,d=s.length;f<d;f+=2){var m=l.exec(s[f]);m&&c.push(new r({functionName:m[3]||void 0,fileName:m[2],lineNumber:m[1],source:s[f]}))}return c},"ErrorStackParser$$parseOpera10"),parseOpera11:p(function(t){var l=t.stack.split(`
`).filter(function(s){return!!s.match(a)&&!s.match(/^Error created at/)},this);return l.map(function(s){var c=s.split("@"),f=this.extractLocation(c.pop()),d=c.shift()||"",m=d.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^)]*\)/g,"")||void 0,_;d.match(/\(([^)]*)\)/)&&(_=d.replace(/^[^(]+\(([^)]*)\)$/,"$1"));var y=_===void 0||_==="[arguments not available]"?void 0:_.split(",");return new r({functionName:m,args:y,fileName:f[0],lineNumber:f[1],columnNumber:f[2],source:s})},this)},"ErrorStackParser$$parseOpera11")}},"ErrorStackParser"))}),Ye=qe(Ge()),h=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string"&&typeof process.browser>"u",Z=h&&typeof I<"u"&&typeof I.exports<"u"&&typeof X<"u"&&typeof __dirname<"u",Ke=h&&!Z,Be=typeof Deno<"u",ee=!h&&!Be,Je=ee&&typeof window<"u"&&typeof document<"u"&&typeof document.createElement<"u"&&typeof sessionStorage<"u",Xe=ee&&typeof importScripts<"u"&&typeof self<"u",ne,P,D,te,H,Qe=`"fetch" is not defined, maybe you're using node < 18? From Pyodide >= 0.25.0, node >= 18 is required. Older versions of Node.js may work, but it is not guaranteed or supported. Falling back to "node-fetch".`;async function U(){if(!h||(ne=(await import("./__vite-browser-external-CIEyP2s7.js")).default,H=await import("./__vite-browser-external-CIEyP2s7.js"),globalThis.fetch?P=fetch:(console.warn(Qe),P=(await import("./index-B489Fav_.js")).default),te=(await import("./__vite-browser-external-CIEyP2s7.js")).default,D=await import("./__vite-browser-external-CIEyP2s7.js"),z=D.sep,typeof X<"u"))return;let e=await import("./__vite-browser-external-CIEyP2s7.js"),n=await import("./__vite-browser-external-CIEyP2s7.js"),r=await import("./__vite-browser-external-CIEyP2s7.js"),a=await import("./__vite-browser-external-CIEyP2s7.js"),o={fs:e,crypto:n,ws:r,child_process:a};globalThis.require=function(i){return o[i]}}p(U,"initNodeModules");function re(e,n){return D.resolve(n||".",e)}p(re,"node_resolvePath");function ie(e,n){return n===void 0&&(n=location),new URL(e,n).toString()}p(ie,"browser_resolvePath");var $;h?$=re:$=ie;var z;h||(z="/");function ae(e,n){return e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?{response:P(e)}:{binary:H.readFile(e).then(r=>new Uint8Array(r.buffer,r.byteOffset,r.byteLength))}}p(ae,"node_getBinaryResponse");function se(e,n){let r=new URL(e,location);return{response:fetch(r,n?{integrity:n}:{})}}p(se,"browser_getBinaryResponse");var C;h?C=ae:C=se;async function oe(e,n){let{response:r,binary:a}=C(e,n);if(a)return a;let o=await r;if(!o.ok)throw new Error(`Failed to load '${e}': request failed.`);return new Uint8Array(await o.arrayBuffer())}p(oe,"loadBinaryFile");var x;if(Je)x=p(async e=>await import(e),"loadScript");else if(Xe)x=p(async e=>{try{globalThis.importScripts(e)}catch(n){if(n instanceof TypeError)await import(e);else throw n}},"loadScript");else if(h)x=le;else throw new Error("Cannot determine runtime environment");async function le(e){e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?te.runInThisContext(await(await P(e)).text()):await import(ne.pathToFileURL(e).href)}p(le,"nodeLoadScript");async function fe(e){if(h){await U();let n=await H.readFile(e);return JSON.parse(n)}else return await(await fetch(e)).json()}p(fe,"loadLockFile");async function ce(){if(Z)return __dirname;let e;try{throw new Error}catch(a){e=a}let n=Ye.default.parse(e)[0].fileName;if(Ke){let a=await import("./__vite-browser-external-CIEyP2s7.js");return(await import("./__vite-browser-external-CIEyP2s7.js")).fileURLToPath(a.dirname(n))}let r=n.lastIndexOf(z);if(r===-1)throw new Error("Could not extract indexURL path from pyodide module location");return n.slice(0,r)}p(ce,"calculateDirname");function de(e){let n=e.FS,r=e.FS.filesystems.MEMFS,a=e.PATH,o={DIR_MODE:16895,FILE_MODE:33279,mount:function(i){if(!i.opts.fileSystemHandle)throw new Error("opts.fileSystemHandle is required");return r.mount.apply(null,arguments)},syncfs:async(i,t,l)=>{try{let s=o.getLocalSet(i),c=await o.getRemoteSet(i),f=t?c:s,d=t?s:c;await o.reconcile(i,f,d),l(null)}catch(s){l(s)}},getLocalSet:i=>{let t=Object.create(null);function l(f){return f!=="."&&f!==".."}p(l,"isRealDir");function s(f){return d=>a.join2(f,d)}p(s,"toAbsolute");let c=n.readdir(i.mountpoint).filter(l).map(s(i.mountpoint));for(;c.length;){let f=c.pop(),d=n.stat(f);n.isDir(d.mode)&&c.push.apply(c,n.readdir(f).filter(l).map(s(f))),t[f]={timestamp:d.mtime,mode:d.mode}}return{type:"local",entries:t}},getRemoteSet:async i=>{let t=Object.create(null),l=await Ze(i.opts.fileSystemHandle);for(let[s,c]of l)s!=="."&&(t[a.join2(i.mountpoint,s)]={timestamp:c.kind==="file"?(await c.getFile()).lastModifiedDate:new Date,mode:c.kind==="file"?o.FILE_MODE:o.DIR_MODE});return{type:"remote",entries:t,handles:l}},loadLocalEntry:i=>{let t=n.lookupPath(i).node,l=n.stat(i);if(n.isDir(l.mode))return{timestamp:l.mtime,mode:l.mode};if(n.isFile(l.mode))return t.contents=r.getFileDataAsTypedArray(t),{timestamp:l.mtime,mode:l.mode,contents:t.contents};throw new Error("node type not supported")},storeLocalEntry:(i,t)=>{if(n.isDir(t.mode))n.mkdirTree(i,t.mode);else if(n.isFile(t.mode))n.writeFile(i,t.contents,{canOwn:!0});else throw new Error("node type not supported");n.chmod(i,t.mode),n.utime(i,t.timestamp,t.timestamp)},removeLocalEntry:i=>{var t=n.stat(i);n.isDir(t.mode)?n.rmdir(i):n.isFile(t.mode)&&n.unlink(i)},loadRemoteEntry:async i=>{if(i.kind==="file"){let t=await i.getFile();return{contents:new Uint8Array(await t.arrayBuffer()),mode:o.FILE_MODE,timestamp:t.lastModifiedDate}}else{if(i.kind==="directory")return{mode:o.DIR_MODE,timestamp:new Date};throw new Error("unknown kind: "+i.kind)}},storeRemoteEntry:async(i,t,l)=>{let s=i.get(a.dirname(t)),c=n.isFile(l.mode)?await s.getFileHandle(a.basename(t),{create:!0}):await s.getDirectoryHandle(a.basename(t),{create:!0});if(c.kind==="file"){let f=await c.createWritable();await f.write(l.contents),await f.close()}i.set(t,c)},removeRemoteEntry:async(i,t)=>{await i.get(a.dirname(t)).removeEntry(a.basename(t)),i.delete(t)},reconcile:async(i,t,l)=>{let s=0,c=[];Object.keys(t.entries).forEach(function(m){let _=t.entries[m],y=l.entries[m];(!y||n.isFile(_.mode)&&_.timestamp.getTime()>y.timestamp.getTime())&&(c.push(m),s++)}),c.sort();let f=[];if(Object.keys(l.entries).forEach(function(m){t.entries[m]||(f.push(m),s++)}),f.sort().reverse(),!s)return;let d=t.type==="remote"?t.handles:l.handles;for(let m of c){let _=a.normalize(m.replace(i.mountpoint,"/")).substring(1);if(l.type==="local"){let y=d.get(_),u=await o.loadRemoteEntry(y);o.storeLocalEntry(m,u)}else{let y=o.loadLocalEntry(m);await o.storeRemoteEntry(d,_,y)}}for(let m of f)if(l.type==="local")o.removeLocalEntry(m);else{let _=a.normalize(m.replace(i.mountpoint,"/")).substring(1);await o.removeRemoteEntry(d,_)}}};e.FS.filesystems.NATIVEFS_ASYNC=o}p(de,"initializeNativeFS");var Ze=p(async e=>{let n=[];async function r(o){for await(let i of o.values())n.push(i),i.kind==="directory"&&await r(i)}p(r,"collect"),await r(e);let a=new Map;a.set(".",e);for(let o of n){let i=(await e.resolve(o)).join("/");a.set(i,o)}return a},"getFsHandles");function me(){let e={};return e.noImageDecoding=!0,e.noAudioDecoding=!0,e.noWasmDecoding=!1,e.preRun=[],e.quit=(n,r)=>{throw e.exited={status:n,toThrow:r},r},e}p(me,"createModule");function ue(e,n){e.preRun.push(function(){let r="/";try{e.FS.mkdirTree(n)}catch(a){console.error(`Error occurred while making a home directory '${n}':`),console.error(a),console.error(`Using '${r}' for a home directory instead`),n=r}e.FS.chdir(n)})}p(ue,"createHomeDirectory");function pe(e,n){e.preRun.push(function(){Object.assign(e.ENV,n)})}p(pe,"setEnvironment");function _e(e,n){e.preRun.push(()=>{for(let r of n)e.FS.mkdirTree(r),e.FS.mount(e.FS.filesystems.NODEFS,{root:r},r)})}p(_e,"mountLocalDirectories");function ge(e,n){let r=oe(n);e.preRun.push(()=>{let a=e._py_version_major(),o=e._py_version_minor();e.FS.mkdirTree("/lib"),e.FS.mkdirTree(`/lib/python${a}.${o}/site-packages`),e.addRunDependency("install-stdlib"),r.then(i=>{e.FS.writeFile(`/lib/python${a}${o}.zip`,i)}).catch(i=>{console.error("Error occurred while installing the standard library:"),console.error(i)}).finally(()=>{e.removeRunDependency("install-stdlib")})})}p(ge,"installStdlib");function ye(e,n){let r;n.stdLibURL!=null?r=n.stdLibURL:r=n.indexURL+"python_stdlib.zip",ge(e,r),ue(e,n.env.HOME),pe(e,n.env),_e(e,n._node_mounts),e.preRun.push(()=>de(e))}p(ye,"initializeFileSystem");function he(e,n){let{binary:r,response:a}=C(n+"pyodide.asm.wasm");e.instantiateWasm=function(o,i){return async function(){try{let t;a?t=await WebAssembly.instantiateStreaming(a,o):t=await WebAssembly.instantiate(await r,o);let{instance:l,module:s}=t;typeof WasmOffsetConverter<"u"&&(wasmOffsetConverter=new WasmOffsetConverter(wasmBinary,s)),i(l,s)}catch(t){console.warn("wasm instantiation failed!"),console.warn(t)}}(),{}}}p(he,"preloadWasm");var R="0.25.0";async function we(e={}){await U();let n=e.indexURL||await ce();n=$(n),n.endsWith("/")||(n+="/"),e.indexURL=n;let r={fullStdLib:!1,jsglobals:globalThis,stdin:globalThis.prompt?globalThis.prompt:void 0,lockFileURL:n+"pyodide-lock.json",args:[],_node_mounts:[],env:{},packageCacheDir:n,packages:[]},a=Object.assign(r,e);a.env.HOME||(a.env.HOME="/home/pyodide");let o=me();o.print=a.stdout,o.printErr=a.stderr,o.arguments=a.args;let i={config:a};o.API=i,i.lockFilePromise=fe(a.lockFileURL),he(o,n),ye(o,a);let t=new Promise(s=>o.postRun=s);if(o.locateFile=s=>a.indexURL+s,typeof _createPyodideModule!="function"){let s=`${a.indexURL}pyodide.asm.js`;await x(s)}if(await _createPyodideModule(o),await t,o.exited)throw o.exited.toThrow;if(e.pyproxyToStringRepr&&i.setPyProxyToStringMethod(!0),i.version!==R)throw new Error(`Pyodide version does not match: '${R}' <==> '${i.version}'. If you updated the Pyodide version, make sure you also updated the 'indexURL' parameter passed to loadPyodide.`);o.locateFile=s=>{throw new Error("Didn't expect to load any more file_packager files!")};let l=i.finalizeBootstrap();if(l.version.includes("dev")||i.setCdnUrl(`https://cdn.jsdelivr.net/pyodide/v${l.version}/full/`),await i.packageIndexReady,i._pyodide._importhook.register_module_not_found_hook(i._import_name_to_package_name,i.lockfile_unvendored_stdlibs_and_test),i.lockfile_info.version!==R)throw new Error("Lock file version doesn't match Pyodide version");return i.package_loader.init_loaded_packages(),a.fullStdLib&&await l.loadPackage(i.lockfile_unvendored_stdlibs),i.initializeStreams(a.stdin,a.stdout,a.stderr),l}p(we,"loadPyodide");async function en(e){const n={"api/app.py":`from __future__ import annotations

from api.models import Session
from api.services import append_chart, load_data
from api.utils.decorators import exception_handler

state = Session()


@exception_handler(default_return=Session().asdict())
def loadData(filename: str):
  global state
  state = Session()
  load_data(state, filename if filename != "" else None)
  append_chart(state)
  return state.asdict()


@exception_handler(default_return={})
def appendChart():
  return append_chart(state).to_dict()


print("Python modules are loaded")
`,"api/models/__init__.py":`from .chart import Chart
from .session import Session

__all__ = [
  "Session",
  "Chart",
  "dataclass",
]
`,"api/models/chart.py":`from dataclasses import dataclass, field
from typing import Any

from api.utils import get_timestamp


@dataclass
class Chart:
  facts: list[str] = field(default_factory=list)

  title: str = field(default="")
  description: str = field(default="")

  specs: list[dict[str, Any]] = field(default_factory=list)
  attributes: list[str] = field(default_factory=list)

  timestamp: int = field(
    default_factory=get_timestamp, init=False, repr=False, compare=False
  )
  key: str = field(init=False, repr=False, compare=False)

  def __post_init__(self):
    self.key = f"chart-{str(self.attributes)}"

  def __hash__(self):
    return hash(self.key)

  def to_dict(self) -> dict[str, Any]:
    return {
      "title": self.title,
      "description": self.description,
      "specs": self.specs,
      "attributes": self.attributes,
      "timestamp": self.timestamp,
      "key": self.key,
    }

  def __asdict__(self) -> dict[str, Any]:
    return self.to_dict()
`,"api/models/session.py":`from __future__ import annotations

from collections import defaultdict
from dataclasses import dataclass, field
from typing import TYPE_CHECKING, Any, cast

import numpy as np
import pandas as pd
from api.utils import df_required, find_index, get_timestamp
from numpy.random import choice

if TYPE_CHECKING:
  from .chart import Chart

NEW_FIELD_P = 0.2


@dataclass
class Session:
  df: pd.DataFrame | None = field(default=None)
  filename: str | None = field(default=None)
  charts: list["Chart"] = field(default_factory=list)

  timestamp: int = field(default_factory=get_timestamp, init=False)
  used_charts: defaultdict[str, set] = cast(
    defaultdict[str, set],
    field(default_factory=lambda: defaultdict(set), init=False, repr=False),
  )
  field_name: list[str] = field(default_factory=list, init=False, repr=False)
  clingo_field_name: list[str] = field(
    default_factory=list, init=False, repr=False
  )

  base_field: str | None = field(default=None, init=False, repr=False)

  def asdict(self) -> dict[str, Any]:
    return {
      "filename": self.filename,
      "timestamp": self.timestamp,
      "charts": [chart.to_dict() for chart in self.charts],
    }

  def __asdict__(self) -> dict[str, Any]:
    return self.asdict()

  @df_required
  def convert_name(self, name: str) -> str:
    if name.startswith("field_"):
      return self.field_name[
        find_index(self.clingo_field_name, lambda x: x == name)
      ]
    else:
      return self.clingo_field_name[
        find_index(self.field_name, lambda x: x == name)
      ]

  def _get_base_field(self) -> str:
    base_fields = self.clingo_field_name

    # 확률 처리 알고리즘
    p = np.full(len(base_fields), 1 / len(base_fields))

    return choice(base_fields, 1, p=p).tolist()[0]

  def _get_rest_fields(self, fields: list[str], n: int = 1) -> list[str]:
    new_fields = [
      field for field in self.clingo_field_name if field not in fields
    ]

    if len(new_fields) == 0:
      raise ValueError("No new fields")

    p = np.full(len(new_fields), 1 / len(new_fields))

    return [*choice(new_fields, n, p=p).tolist()]

  @df_required
  def get_fields(self) -> list[str]:
    if self.base_field is None:
      self.base_field = self._get_base_field()
      return [self.base_field]

    if len(self.used_charts[self.base_field]) == self.clingo_field_name:
      self.base_field = self._get_base_field()
      return [self.base_field]

    # Routing to the new base field
    if choice([True, False], 1, p=[NEW_FIELD_P, 1 - NEW_FIELD_P])[0]:
      print("New base field")
      self.base_field = self._get_base_field()
      return [self.base_field]

    return [self.base_field, *self._get_rest_fields([self.base_field])]
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
`,"api/services/data.py":`from __future__ import annotations

from pathlib import Path
from typing import TYPE_CHECKING

import pandas as pd
from api.utils import get_file_extension
from api.utils.field_name import get_clingo_field_name, id_to_name, name_to_id
from vega_datasets import data

if TYPE_CHECKING:
  from api.models.session import Session


def is_name_attribute(series: pd.Series) -> bool:
  return series.nunique() >= 30 and not pd.api.types.is_numeric_dtype(series)


def load_data(session: "Session", filename: str | None = None) -> None:
  id_to_name.clear()
  name_to_id.clear()
  df: pd.DataFrame
  if filename is None:
    session.filename = "Cars"
    df = pd.DataFrame(data.cars())
  else:
    session.filename = filename
    extension = get_file_extension(filename)
    df = getattr(pd, f"read_{extension}")(Path("./", filename))
    df = df if len(df) <= 5000 else df.sample(5000)

  # Identify name attributes
  name_attributes = [col for col in df.columns if is_name_attribute(df[col])]

  # Filter out name attributes from field_name
  session.field_name = [col for col in df.columns if col not in name_attributes]
  session.clingo_field_name = get_clingo_field_name(session.field_name)
  print(f"field_name: {session.field_name}")
  print(f"clingo_field_name: {session.clingo_field_name}")

  # Rename columns for the dataframe
  rename_dict = {
    col: get_clingo_field_name([col])[0] for col in session.field_name
  }
  session.df = df.rename(columns=rename_dict)
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
`};for(const[r,a]of Object.entries(n)){const o=r.split("/").slice(0,-1);let i="";for(const t of o){i=i?`${i}/${t}`:t;try{e.FS.mkdir(i)}catch{}}e.FS.writeFile(r,a)}}async function nn(e){await e.runPythonAsync(`from __future__ import annotations

from api.models import Session
from api.services import append_chart, load_data
from api.utils.decorators import exception_handler

state = Session()


@exception_handler(default_return=Session().asdict())
def loadData(filename: str):
  global state
  state = Session()
  load_data(state, filename if filename != "" else None)
  append_chart(state)
  return state.asdict()


@exception_handler(default_return={})
def appendChart():
  return append_chart(state).to_dict()


print("Python modules are loaded")
`)}const tn={pyodide:null,async writeFile(e,n){try{if(!this.pyodide)throw new Error("Pyodide is not initialized");this.pyodide.FS.writeFile(e,n,{encoding:"binary",flags:"w"})}catch(r){throw console.error(r),r}},async readFile(e){try{if(!this.pyodide)throw new Error("Pyodide is not initialized");return this.pyodide.FS.readFile(`${e}`,{encoding:"utf-8"})}catch(n){throw console.error(n),n}},async initialize(e=[]){this.pyodide=await we({indexURL:"/Swipytics/artifacts"});for(const n of e)await this.pyodide.loadPackage(n);await en(this.pyodide);try{await nn(this.pyodide)}catch(n){console.error(n)}},terminate(){if(this.pyodide){const e=new Uint8Array(new SharedArrayBuffer(1));e[0]=2,this.pyodide.setInterruptBuffer(e),this.pyodide=null}},async runPython(e,n={}){if(!this.pyodide)throw new Error("Pyodide is not initialized");const r=this.pyodide.globals.get("dict")();for(const[a,o]of Object.entries(n))r.set(a,o);return this.pyodide.runPython(e,{globals:r})},async callPythonFunction(e,n={}){if(!this.pyodide)throw new Error("Pyodide is not initialized");const r=this.pyodide.globals.get(e);if(!r)throw new Error(`Function ${e} is not defined in globals`);const a=r.callKwargs(n);return a!=null&&a.toJs?a.toJs({dict_converter:Object.fromEntries}):a}};j(tn)});export default rn();
