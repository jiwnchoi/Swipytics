var Se=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports);var rn=Se((sn,I)=>{/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const V=Symbol("Comlink.proxy"),Fe=Symbol("Comlink.endpoint"),xe=Symbol("Comlink.releaseProxy"),T=Symbol("Comlink.finalizer"),S=Symbol("Comlink.thrown"),G=e=>typeof e=="object"&&e!==null||typeof e=="function",Ne={canHandle:e=>G(e)&&e[V],serialize(e){const{port1:n,port2:i}=new MessageChannel;return j(e,n),[i,[i]]},deserialize(e){return e.start(),Le(e)}},Oe={canHandle:e=>G(e)&&S in e,serialize({value:e}){let n;return e instanceof Error?n={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:n={isError:!1,value:e},[n,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},Y=new Map([["proxy",Ne],["throw",Oe]]);function Pe(e,n){for(const i of e)if(n===i||i==="*"||i instanceof RegExp&&i.test(n))return!0;return!1}function j(e,n=globalThis,i=["*"]){n.addEventListener("message",function a(s){if(!s||!s.data)return;if(!Pe(i,s.origin)){console.warn(`Invalid origin '${s.origin}' for comlink proxy`);return}const{id:r,type:t,path:l}=Object.assign({path:[]},s.data),o=(s.data.argumentList||[]).map(b);let c;try{const f=l.slice(0,-1).reduce((m,_)=>m[_],e),d=l.reduce((m,_)=>m[_],e);switch(t){case"GET":c=d;break;case"SET":f[l.slice(-1)[0]]=b(s.data.value),c=!0;break;case"APPLY":c=d.apply(f,o);break;case"CONSTRUCT":{const m=new d(...o);c=$e(m)}break;case"ENDPOINT":{const{port1:m,port2:_}=new MessageChannel;j(e,_),c=De(m,[m])}break;case"RELEASE":c=void 0;break;default:return}}catch(f){c={value:f,[S]:0}}Promise.resolve(c).catch(f=>({value:f,[S]:0})).then(f=>{const[d,m]=O(f);n.postMessage(Object.assign(Object.assign({},d),{id:r}),m),t==="RELEASE"&&(n.removeEventListener("message",a),K(n),T in e&&typeof e[T]=="function"&&e[T]())}).catch(f=>{const[d,m]=O({value:new TypeError("Unserializable return value"),[S]:0});n.postMessage(Object.assign(Object.assign({},d),{id:r}),m)})}),n.start&&n.start()}function Ce(e){return e.constructor.name==="MessagePort"}function K(e){Ce(e)&&e.close()}function Le(e,n){return A(e,[],n)}function k(e){if(e)throw new Error("Proxy has been released and is not useable")}function B(e){return v(e,{type:"RELEASE"}).then(()=>{K(e)})}const x=new WeakMap,N="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const n=(x.get(e)||0)-1;x.set(e,n),n===0&&B(e)});function Te(e,n){const i=(x.get(n)||0)+1;x.set(n,i),N&&N.register(e,n,e)}function Re(e){N&&N.unregister(e)}function A(e,n=[],i=function(){}){let a=!1;const s=new Proxy(i,{get(r,t){if(k(a),t===xe)return()=>{Re(s),B(e),a=!0};if(t==="then"){if(n.length===0)return{then:()=>s};const l=v(e,{type:"GET",path:n.map(o=>o.toString())}).then(b);return l.then.bind(l)}return A(e,[...n,t])},set(r,t,l){k(a);const[o,c]=O(l);return v(e,{type:"SET",path:[...n,t].map(f=>f.toString()),value:o},c).then(b)},apply(r,t,l){k(a);const o=n[n.length-1];if(o===Fe)return v(e,{type:"ENDPOINT"}).then(b);if(o==="bind")return A(e,n.slice(0,-1));const[c,f]=q(l);return v(e,{type:"APPLY",path:n.map(d=>d.toString()),argumentList:c},f).then(b)},construct(r,t){k(a);const[l,o]=q(t);return v(e,{type:"CONSTRUCT",path:n.map(c=>c.toString()),argumentList:l},o).then(b)}});return Te(s,e),s}function Ae(e){return Array.prototype.concat.apply([],e)}function q(e){const n=e.map(O);return[n.map(i=>i[0]),Ae(n.map(i=>i[1]))]}const J=new WeakMap;function De(e,n){return J.set(e,n),e}function $e(e){return Object.assign(e,{[V]:!0})}function O(e){for(const[n,i]of Y)if(i.canHandle(e)){const[a,s]=i.serialize(e);return[{type:"HANDLER",name:n,value:a},s]}return[{type:"RAW",value:e},J.get(e)||[]]}function b(e){switch(e.type){case"HANDLER":return Y.get(e.name).deserialize(e.value);case"RAW":return e.value}}function v(e,n,i){return new Promise(a=>{const s=Ie();e.addEventListener("message",function r(t){!t.data||!t.data.id||t.data.id!==s||(e.removeEventListener("message",r),a(t.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:s},n),i)})}function Ie(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}var je=Object.create,M=Object.defineProperty,Me=Object.getOwnPropertyDescriptor,He=Object.getOwnPropertyNames,Ue=Object.getPrototypeOf,ze=Object.prototype.hasOwnProperty,u=(e,n)=>M(e,"name",{value:n,configurable:!0}),X=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(n,i)=>(typeof require<"u"?require:n)[i]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')}),Q=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports),We=(e,n,i,a)=>{if(n&&typeof n=="object"||typeof n=="function")for(let s of He(n))!ze.call(e,s)&&s!==i&&M(e,s,{get:()=>n[s],enumerable:!(a=Me(n,s))||a.enumerable});return e},qe=(e,n,i)=>(i=e!=null?je(Ue(e)):{},We(!e||!e.__esModule?M(i,"default",{value:e,enumerable:!0}):i,e)),Ve=Q((e,n)=>{(function(i,a){typeof define=="function"&&define.amd?define("stackframe",[],a):typeof e=="object"?n.exports=a():i.StackFrame=a()})(e,function(){function i(p){return!isNaN(parseFloat(p))&&isFinite(p)}u(i,"_isNumber");function a(p){return p.charAt(0).toUpperCase()+p.substring(1)}u(a,"_capitalize");function s(p){return function(){return this[p]}}u(s,"_getter");var r=["isConstructor","isEval","isNative","isToplevel"],t=["columnNumber","lineNumber"],l=["fileName","functionName","source"],o=["args"],c=["evalOrigin"],f=r.concat(t,l,o,c);function d(p){if(p)for(var y=0;y<f.length;y++)p[f[y]]!==void 0&&this["set"+a(f[y])](p[f[y]])}u(d,"StackFrame"),d.prototype={getArgs:function(){return this.args},setArgs:function(p){if(Object.prototype.toString.call(p)!=="[object Array]")throw new TypeError("Args must be an Array");this.args=p},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(p){if(p instanceof d)this.evalOrigin=p;else if(p instanceof Object)this.evalOrigin=new d(p);else throw new TypeError("Eval Origin must be an Object or StackFrame")},toString:function(){var p=this.getFileName()||"",y=this.getLineNumber()||"",w=this.getColumnNumber()||"",E=this.getFunctionName()||"";return this.getIsEval()?p?"[eval] ("+p+":"+y+":"+w+")":"[eval]:"+y+":"+w:E?E+" ("+p+":"+y+":"+w+")":p+":"+y+":"+w}},d.fromString=u(function(p){var y=p.indexOf("("),w=p.lastIndexOf(")"),E=p.substring(0,y),be=p.substring(y+1,w).split(","),W=p.substring(w+1);if(W.indexOf("@")===0)var L=/@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(W,""),ve=L[1],Ee=L[2],ke=L[3];return new d({functionName:E,args:be||void 0,fileName:ve,lineNumber:Ee||void 0,columnNumber:ke||void 0})},"StackFrame$$fromString");for(var m=0;m<r.length;m++)d.prototype["get"+a(r[m])]=s(r[m]),d.prototype["set"+a(r[m])]=function(p){return function(y){this[p]=!!y}}(r[m]);for(var _=0;_<t.length;_++)d.prototype["get"+a(t[_])]=s(t[_]),d.prototype["set"+a(t[_])]=function(p){return function(y){if(!i(y))throw new TypeError(p+" must be a Number");this[p]=Number(y)}}(t[_]);for(var g=0;g<l.length;g++)d.prototype["get"+a(l[g])]=s(l[g]),d.prototype["set"+a(l[g])]=function(p){return function(y){this[p]=String(y)}}(l[g]);return d})}),Ge=Q((e,n)=>{(function(i,a){typeof define=="function"&&define.amd?define("error-stack-parser",["stackframe"],a):typeof e=="object"?n.exports=a(Ve()):i.ErrorStackParser=a(i.StackFrame)})(e,u(function(i){var a=/(^|@)\S+:\d+/,s=/^\s*at .*(\S+:\d+|\(native\))/m,r=/^(eval@)?(\[native code])?$/;return{parse:u(function(t){if(typeof t.stacktrace<"u"||typeof t["opera#sourceloc"]<"u")return this.parseOpera(t);if(t.stack&&t.stack.match(s))return this.parseV8OrIE(t);if(t.stack)return this.parseFFOrSafari(t);throw new Error("Cannot parse given Error object")},"ErrorStackParser$$parse"),extractLocation:u(function(t){if(t.indexOf(":")===-1)return[t];var l=/(.+?)(?::(\d+))?(?::(\d+))?$/,o=l.exec(t.replace(/[()]/g,""));return[o[1],o[2]||void 0,o[3]||void 0]},"ErrorStackParser$$extractLocation"),parseV8OrIE:u(function(t){var l=t.stack.split(`
`).filter(function(o){return!!o.match(s)},this);return l.map(function(o){o.indexOf("(eval ")>-1&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));var c=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),f=c.match(/ (\(.+\)$)/);c=f?c.replace(f[0],""):c;var d=this.extractLocation(f?f[1]:c),m=f&&c||void 0,_=["eval","<anonymous>"].indexOf(d[0])>-1?void 0:d[0];return new i({functionName:m,fileName:_,lineNumber:d[1],columnNumber:d[2],source:o})},this)},"ErrorStackParser$$parseV8OrIE"),parseFFOrSafari:u(function(t){var l=t.stack.split(`
`).filter(function(o){return!o.match(r)},this);return l.map(function(o){if(o.indexOf(" > eval")>-1&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),o.indexOf("@")===-1&&o.indexOf(":")===-1)return new i({functionName:o});var c=/((.*".+"[^@]*)?[^@]*)(?:@)/,f=o.match(c),d=f&&f[1]?f[1]:void 0,m=this.extractLocation(o.replace(c,""));return new i({functionName:d,fileName:m[0],lineNumber:m[1],columnNumber:m[2],source:o})},this)},"ErrorStackParser$$parseFFOrSafari"),parseOpera:u(function(t){return!t.stacktrace||t.message.indexOf(`
`)>-1&&t.message.split(`
`).length>t.stacktrace.split(`
`).length?this.parseOpera9(t):t.stack?this.parseOpera11(t):this.parseOpera10(t)},"ErrorStackParser$$parseOpera"),parseOpera9:u(function(t){for(var l=/Line (\d+).*script (?:in )?(\S+)/i,o=t.message.split(`
`),c=[],f=2,d=o.length;f<d;f+=2){var m=l.exec(o[f]);m&&c.push(new i({fileName:m[2],lineNumber:m[1],source:o[f]}))}return c},"ErrorStackParser$$parseOpera9"),parseOpera10:u(function(t){for(var l=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,o=t.stacktrace.split(`
`),c=[],f=0,d=o.length;f<d;f+=2){var m=l.exec(o[f]);m&&c.push(new i({functionName:m[3]||void 0,fileName:m[2],lineNumber:m[1],source:o[f]}))}return c},"ErrorStackParser$$parseOpera10"),parseOpera11:u(function(t){var l=t.stack.split(`
`).filter(function(o){return!!o.match(a)&&!o.match(/^Error created at/)},this);return l.map(function(o){var c=o.split("@"),f=this.extractLocation(c.pop()),d=c.shift()||"",m=d.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^)]*\)/g,"")||void 0,_;d.match(/\(([^)]*)\)/)&&(_=d.replace(/^[^(]+\(([^)]*)\)$/,"$1"));var g=_===void 0||_==="[arguments not available]"?void 0:_.split(",");return new i({functionName:m,args:g,fileName:f[0],lineNumber:f[1],columnNumber:f[2],source:o})},this)},"ErrorStackParser$$parseOpera11")}},"ErrorStackParser"))}),Ye=qe(Ge()),h=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string"&&typeof process.browser>"u",Z=h&&typeof I<"u"&&typeof I.exports<"u"&&typeof X<"u"&&typeof __dirname<"u",Ke=h&&!Z,Be=typeof Deno<"u",ee=!h&&!Be,Je=ee&&typeof window<"u"&&typeof document<"u"&&typeof document.createElement<"u"&&typeof sessionStorage<"u",Xe=ee&&typeof importScripts<"u"&&typeof self<"u",ne,P,D,te,H,Qe=`"fetch" is not defined, maybe you're using node < 18? From Pyodide >= 0.25.0, node >= 18 is required. Older versions of Node.js may work, but it is not guaranteed or supported. Falling back to "node-fetch".`;async function U(){if(!h||(ne=(await import("./__vite-browser-external-CIEyP2s7.js")).default,H=await import("./__vite-browser-external-CIEyP2s7.js"),globalThis.fetch?P=fetch:(console.warn(Qe),P=(await import("./index-B489Fav_.js")).default),te=(await import("./__vite-browser-external-CIEyP2s7.js")).default,D=await import("./__vite-browser-external-CIEyP2s7.js"),z=D.sep,typeof X<"u"))return;let e=await import("./__vite-browser-external-CIEyP2s7.js"),n=await import("./__vite-browser-external-CIEyP2s7.js"),i=await import("./__vite-browser-external-CIEyP2s7.js"),a=await import("./__vite-browser-external-CIEyP2s7.js"),s={fs:e,crypto:n,ws:i,child_process:a};globalThis.require=function(r){return s[r]}}u(U,"initNodeModules");function re(e,n){return D.resolve(n||".",e)}u(re,"node_resolvePath");function ie(e,n){return n===void 0&&(n=location),new URL(e,n).toString()}u(ie,"browser_resolvePath");var $;h?$=re:$=ie;var z;h||(z="/");function ae(e,n){return e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?{response:P(e)}:{binary:H.readFile(e).then(i=>new Uint8Array(i.buffer,i.byteOffset,i.byteLength))}}u(ae,"node_getBinaryResponse");function se(e,n){let i=new URL(e,location);return{response:fetch(i,n?{integrity:n}:{})}}u(se,"browser_getBinaryResponse");var C;h?C=ae:C=se;async function oe(e,n){let{response:i,binary:a}=C(e,n);if(a)return a;let s=await i;if(!s.ok)throw new Error(`Failed to load '${e}': request failed.`);return new Uint8Array(await s.arrayBuffer())}u(oe,"loadBinaryFile");var F;if(Je)F=u(async e=>await import(e),"loadScript");else if(Xe)F=u(async e=>{try{globalThis.importScripts(e)}catch(n){if(n instanceof TypeError)await import(e);else throw n}},"loadScript");else if(h)F=le;else throw new Error("Cannot determine runtime environment");async function le(e){e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?te.runInThisContext(await(await P(e)).text()):await import(ne.pathToFileURL(e).href)}u(le,"nodeLoadScript");async function fe(e){if(h){await U();let n=await H.readFile(e);return JSON.parse(n)}else return await(await fetch(e)).json()}u(fe,"loadLockFile");async function ce(){if(Z)return __dirname;let e;try{throw new Error}catch(a){e=a}let n=Ye.default.parse(e)[0].fileName;if(Ke){let a=await import("./__vite-browser-external-CIEyP2s7.js");return(await import("./__vite-browser-external-CIEyP2s7.js")).fileURLToPath(a.dirname(n))}let i=n.lastIndexOf(z);if(i===-1)throw new Error("Could not extract indexURL path from pyodide module location");return n.slice(0,i)}u(ce,"calculateDirname");function de(e){let n=e.FS,i=e.FS.filesystems.MEMFS,a=e.PATH,s={DIR_MODE:16895,FILE_MODE:33279,mount:function(r){if(!r.opts.fileSystemHandle)throw new Error("opts.fileSystemHandle is required");return i.mount.apply(null,arguments)},syncfs:async(r,t,l)=>{try{let o=s.getLocalSet(r),c=await s.getRemoteSet(r),f=t?c:o,d=t?o:c;await s.reconcile(r,f,d),l(null)}catch(o){l(o)}},getLocalSet:r=>{let t=Object.create(null);function l(f){return f!=="."&&f!==".."}u(l,"isRealDir");function o(f){return d=>a.join2(f,d)}u(o,"toAbsolute");let c=n.readdir(r.mountpoint).filter(l).map(o(r.mountpoint));for(;c.length;){let f=c.pop(),d=n.stat(f);n.isDir(d.mode)&&c.push.apply(c,n.readdir(f).filter(l).map(o(f))),t[f]={timestamp:d.mtime,mode:d.mode}}return{type:"local",entries:t}},getRemoteSet:async r=>{let t=Object.create(null),l=await Ze(r.opts.fileSystemHandle);for(let[o,c]of l)o!=="."&&(t[a.join2(r.mountpoint,o)]={timestamp:c.kind==="file"?(await c.getFile()).lastModifiedDate:new Date,mode:c.kind==="file"?s.FILE_MODE:s.DIR_MODE});return{type:"remote",entries:t,handles:l}},loadLocalEntry:r=>{let t=n.lookupPath(r).node,l=n.stat(r);if(n.isDir(l.mode))return{timestamp:l.mtime,mode:l.mode};if(n.isFile(l.mode))return t.contents=i.getFileDataAsTypedArray(t),{timestamp:l.mtime,mode:l.mode,contents:t.contents};throw new Error("node type not supported")},storeLocalEntry:(r,t)=>{if(n.isDir(t.mode))n.mkdirTree(r,t.mode);else if(n.isFile(t.mode))n.writeFile(r,t.contents,{canOwn:!0});else throw new Error("node type not supported");n.chmod(r,t.mode),n.utime(r,t.timestamp,t.timestamp)},removeLocalEntry:r=>{var t=n.stat(r);n.isDir(t.mode)?n.rmdir(r):n.isFile(t.mode)&&n.unlink(r)},loadRemoteEntry:async r=>{if(r.kind==="file"){let t=await r.getFile();return{contents:new Uint8Array(await t.arrayBuffer()),mode:s.FILE_MODE,timestamp:t.lastModifiedDate}}else{if(r.kind==="directory")return{mode:s.DIR_MODE,timestamp:new Date};throw new Error("unknown kind: "+r.kind)}},storeRemoteEntry:async(r,t,l)=>{let o=r.get(a.dirname(t)),c=n.isFile(l.mode)?await o.getFileHandle(a.basename(t),{create:!0}):await o.getDirectoryHandle(a.basename(t),{create:!0});if(c.kind==="file"){let f=await c.createWritable();await f.write(l.contents),await f.close()}r.set(t,c)},removeRemoteEntry:async(r,t)=>{await r.get(a.dirname(t)).removeEntry(a.basename(t)),r.delete(t)},reconcile:async(r,t,l)=>{let o=0,c=[];Object.keys(t.entries).forEach(function(m){let _=t.entries[m],g=l.entries[m];(!g||n.isFile(_.mode)&&_.timestamp.getTime()>g.timestamp.getTime())&&(c.push(m),o++)}),c.sort();let f=[];if(Object.keys(l.entries).forEach(function(m){t.entries[m]||(f.push(m),o++)}),f.sort().reverse(),!o)return;let d=t.type==="remote"?t.handles:l.handles;for(let m of c){let _=a.normalize(m.replace(r.mountpoint,"/")).substring(1);if(l.type==="local"){let g=d.get(_),p=await s.loadRemoteEntry(g);s.storeLocalEntry(m,p)}else{let g=s.loadLocalEntry(m);await s.storeRemoteEntry(d,_,g)}}for(let m of f)if(l.type==="local")s.removeLocalEntry(m);else{let _=a.normalize(m.replace(r.mountpoint,"/")).substring(1);await s.removeRemoteEntry(d,_)}}};e.FS.filesystems.NATIVEFS_ASYNC=s}u(de,"initializeNativeFS");var Ze=u(async e=>{let n=[];async function i(s){for await(let r of s.values())n.push(r),r.kind==="directory"&&await i(r)}u(i,"collect"),await i(e);let a=new Map;a.set(".",e);for(let s of n){let r=(await e.resolve(s)).join("/");a.set(r,s)}return a},"getFsHandles");function me(){let e={};return e.noImageDecoding=!0,e.noAudioDecoding=!0,e.noWasmDecoding=!1,e.preRun=[],e.quit=(n,i)=>{throw e.exited={status:n,toThrow:i},i},e}u(me,"createModule");function pe(e,n){e.preRun.push(function(){let i="/";try{e.FS.mkdirTree(n)}catch(a){console.error(`Error occurred while making a home directory '${n}':`),console.error(a),console.error(`Using '${i}' for a home directory instead`),n=i}e.FS.chdir(n)})}u(pe,"createHomeDirectory");function ue(e,n){e.preRun.push(function(){Object.assign(e.ENV,n)})}u(ue,"setEnvironment");function _e(e,n){e.preRun.push(()=>{for(let i of n)e.FS.mkdirTree(i),e.FS.mount(e.FS.filesystems.NODEFS,{root:i},i)})}u(_e,"mountLocalDirectories");function ye(e,n){let i=oe(n);e.preRun.push(()=>{let a=e._py_version_major(),s=e._py_version_minor();e.FS.mkdirTree("/lib"),e.FS.mkdirTree(`/lib/python${a}.${s}/site-packages`),e.addRunDependency("install-stdlib"),i.then(r=>{e.FS.writeFile(`/lib/python${a}${s}.zip`,r)}).catch(r=>{console.error("Error occurred while installing the standard library:"),console.error(r)}).finally(()=>{e.removeRunDependency("install-stdlib")})})}u(ye,"installStdlib");function ge(e,n){let i;n.stdLibURL!=null?i=n.stdLibURL:i=n.indexURL+"python_stdlib.zip",ye(e,i),pe(e,n.env.HOME),ue(e,n.env),_e(e,n._node_mounts),e.preRun.push(()=>de(e))}u(ge,"initializeFileSystem");function he(e,n){let{binary:i,response:a}=C(n+"pyodide.asm.wasm");e.instantiateWasm=function(s,r){return async function(){try{let t;a?t=await WebAssembly.instantiateStreaming(a,s):t=await WebAssembly.instantiate(await i,s);let{instance:l,module:o}=t;typeof WasmOffsetConverter<"u"&&(wasmOffsetConverter=new WasmOffsetConverter(wasmBinary,o)),r(l,o)}catch(t){console.warn("wasm instantiation failed!"),console.warn(t)}}(),{}}}u(he,"preloadWasm");var R="0.25.0";async function we(e={}){await U();let n=e.indexURL||await ce();n=$(n),n.endsWith("/")||(n+="/"),e.indexURL=n;let i={fullStdLib:!1,jsglobals:globalThis,stdin:globalThis.prompt?globalThis.prompt:void 0,lockFileURL:n+"pyodide-lock.json",args:[],_node_mounts:[],env:{},packageCacheDir:n,packages:[]},a=Object.assign(i,e);a.env.HOME||(a.env.HOME="/home/pyodide");let s=me();s.print=a.stdout,s.printErr=a.stderr,s.arguments=a.args;let r={config:a};s.API=r,r.lockFilePromise=fe(a.lockFileURL),he(s,n),ge(s,a);let t=new Promise(o=>s.postRun=o);if(s.locateFile=o=>a.indexURL+o,typeof _createPyodideModule!="function"){let o=`${a.indexURL}pyodide.asm.js`;await F(o)}if(await _createPyodideModule(s),await t,s.exited)throw s.exited.toThrow;if(e.pyproxyToStringRepr&&r.setPyProxyToStringMethod(!0),r.version!==R)throw new Error(`Pyodide version does not match: '${R}' <==> '${r.version}'. If you updated the Pyodide version, make sure you also updated the 'indexURL' parameter passed to loadPyodide.`);s.locateFile=o=>{throw new Error("Didn't expect to load any more file_packager files!")};let l=r.finalizeBootstrap();if(l.version.includes("dev")||r.setCdnUrl(`https://cdn.jsdelivr.net/pyodide/v${l.version}/full/`),await r.packageIndexReady,r._pyodide._importhook.register_module_not_found_hook(r._import_name_to_package_name,r.lockfile_unvendored_stdlibs_and_test),r.lockfile_info.version!==R)throw new Error("Lock file version doesn't match Pyodide version");return r.package_loader.init_loaded_packages(),a.fullStdLib&&await l.loadPackage(r.lockfile_unvendored_stdlibs),r.initializeStreams(a.stdin,a.stdout,a.stderr),l}u(we,"loadPyodide");async function en(e){const n={"api/app.py":`from __future__ import annotations

import draco
import numpy as np
import pandas as pd
import pydantic
import sklearn
from api.models import Session
from api.services import append_chart, load_data

print(
  f"Package Loaded. draco: {draco.__version__}, numpy: {np.__version__}, pandas: {pd.__version__}, sklearn: {sklearn.__version__},  pydantic: {pydantic.__version__}"
)

state = Session()


def loadData(filename: str | None = None):
  load_data(state, filename)
  append_chart(state)
  return state.asdict()


def appendChart():
  return append_chart(state).to_dict()
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
    base_fields = [
      field for field in self.clingo_field_name if field not in self.used_charts
    ]
    # 확률 처리 알고리즘
    p = np.full(len(base_fields), 1 / len(base_fields))

    return choice(base_fields, 1, p=p).tolist()[0]

  def _get_rest_fields(self, fields: list[str], n: int = 1) -> list[str]:
    new_fields = [
      field for field in self.clingo_field_name if field not in fields
    ]
    p = np.full(len(new_fields), 1 / len(new_fields))

    return [*choice(new_fields, n, p=p).tolist()]

  @df_required
  def get_fields(self) -> list[str]:
    if self.base_field is None:
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
  fields = session.get_fields()
  print(f"fields: {fields}")
  chart = None

  while chart is None:
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

  session.charts.append(chart)
  session.used_charts[fields[0]].add(chart)
  return chart
`,"api/services/data.py":`from __future__ import annotations

from pathlib import Path
from typing import TYPE_CHECKING

import pandas as pd
from api.utils import get_file_extension
from api.utils.field_name import get_clingo_field_name
from vega_datasets import data

if TYPE_CHECKING:
  from api.models.session import Session


def is_name_attribute(series: pd.Series) -> bool:
  return series.nunique() >= 30 and not pd.api.types.is_numeric_dtype(series)


def load_data(session: "Session", filename: str | None = None) -> None:
  df: pd.DataFrame
  if filename is None:
    session.filename = "Cars"
    df = pd.DataFrame(data.cars())
  else:
    session.filename = filename
    extension = get_file_extension(filename)
    df = getattr(pd, f"read_{extension}")(Path("./", filename))

  # Identify name attributes
  name_attributes = [col for col in df.columns if is_name_attribute(df[col])]

  # Filter out name attributes from field_name
  session.field_name = [col for col in df.columns if col not in name_attributes]
  session.clingo_field_name = get_clingo_field_name(session.field_name)

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
`,"api/utils/__init__.py":`from .decorators import df_required
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
`};for(const[i,a]of Object.entries(n)){const s=i.split("/").slice(0,-1);let r="";for(const t of s){r=r?`${r}/${t}`:t;try{e.FS.mkdir(r)}catch{}}e.FS.writeFile(i,a)}}async function nn(e){await e.runPythonAsync(`from __future__ import annotations

import draco
import numpy as np
import pandas as pd
import pydantic
import sklearn
from api.models import Session
from api.services import append_chart, load_data

print(
  f"Package Loaded. draco: {draco.__version__}, numpy: {np.__version__}, pandas: {pd.__version__}, sklearn: {sklearn.__version__},  pydantic: {pydantic.__version__}"
)

state = Session()


def loadData(filename: str | None = None):
  load_data(state, filename)
  append_chart(state)
  return state.asdict()


def appendChart():
  return append_chart(state).to_dict()
`)}const tn={pyodide:null,async writeFile(e,n){if(!this.pyodide)throw new Error("Pyodide is not initialized");this.pyodide.FS.writeFile(`${e}`,n,{encoding:"binary"})},async readFile(e){if(!this.pyodide)throw new Error("Pyodide is not initialized");return this.pyodide.FS.readFile(`${e}`,{encoding:"utf-8"})},async initialize(e=[]){this.pyodide=await we({indexURL:"/Swipytics/artifacts"});for(const n of e)await this.pyodide.loadPackage(n);await en(this.pyodide);try{await nn(this.pyodide)}catch(n){console.error(n)}},terminate(){if(this.pyodide){const e=new Uint8Array(new SharedArrayBuffer(1));e[0]=2,this.pyodide.setInterruptBuffer(e),this.pyodide=null}},async runPython(e,n={}){if(!this.pyodide)throw new Error("Pyodide is not initialized");const i=this.pyodide.globals.get("dict")();for(const[a,s]of Object.entries(n))i.set(a,s);return this.pyodide.runPython(e,{globals:i})},async callPythonFunction(e,n=[],i){if(!this.pyodide)throw new Error("Pyodide is not initialized");const a=this.pyodide.globals.get(e);if(!a)throw new Error(`Function ${e} is not defined in globals`);const s=this.pyodide.toPy(n),r=i?a.callKwargs(s,i):a(...s);return r!=null&&r.toJs?r.toJs({dict_converter:Object.fromEntries}):r}};j(tn)});export default rn();
