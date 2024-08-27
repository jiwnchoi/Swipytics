var Se=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var rt=Se((at,j)=>{/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const q=Symbol("Comlink.proxy"),Oe=Symbol("Comlink.endpoint"),xe=Symbol("Comlink.releaseProxy"),R=Symbol("Comlink.finalizer"),S=Symbol("Comlink.thrown"),B=e=>typeof e=="object"&&e!==null||typeof e=="function",Fe={canHandle:e=>B(e)&&e[q],serialize(e){const{port1:t,port2:i}=new MessageChannel;return M(e,t),[i,[i]]},deserialize(e){return e.start(),Le(e)}},Ne={canHandle:e=>B(e)&&S in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},K=new Map([["proxy",Fe],["throw",Ne]]);function Pe(e,t){for(const i of e)if(t===i||i==="*"||i instanceof RegExp&&i.test(t))return!0;return!1}function M(e,t=globalThis,i=["*"]){t.addEventListener("message",function a(s){if(!s||!s.data)return;if(!Pe(i,s.origin)){console.warn(`Invalid origin '${s.origin}' for comlink proxy`);return}const{id:r,type:n,path:l}=Object.assign({path:[]},s.data),o=(s.data.argumentList||[]).map(b);let f;try{const c=l.slice(0,-1).reduce((p,_)=>p[_],e),d=l.reduce((p,_)=>p[_],e);switch(n){case"GET":f=d;break;case"SET":c[l.slice(-1)[0]]=b(s.data.value),f=!0;break;case"APPLY":f=d.apply(c,o);break;case"CONSTRUCT":{const p=new d(...o);f=De(p)}break;case"ENDPOINT":{const{port1:p,port2:_}=new MessageChannel;M(e,_),f=$e(p,[p])}break;case"RELEASE":f=void 0;break;default:return}}catch(c){f={value:c,[S]:0}}Promise.resolve(f).catch(c=>({value:c,[S]:0})).then(c=>{const[d,p]=N(c);t.postMessage(Object.assign(Object.assign({},d),{id:r}),p),n==="RELEASE"&&(t.removeEventListener("message",a),G(t),R in e&&typeof e[R]=="function"&&e[R]())}).catch(c=>{const[d,p]=N({value:new TypeError("Unserializable return value"),[S]:0});t.postMessage(Object.assign(Object.assign({},d),{id:r}),p)})}),t.start&&t.start()}function Ae(e){return e.constructor.name==="MessagePort"}function G(e){Ae(e)&&e.close()}function Le(e,t){return C(e,[],t)}function E(e){if(e)throw new Error("Proxy has been released and is not useable")}function Y(e){return v(e,{type:"RELEASE"}).then(()=>{G(e)})}const x=new WeakMap,F="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const t=(x.get(e)||0)-1;x.set(e,t),t===0&&Y(e)});function Re(e,t){const i=(x.get(t)||0)+1;x.set(t,i),F&&F.register(e,t,e)}function Te(e){F&&F.unregister(e)}function C(e,t=[],i=function(){}){let a=!1;const s=new Proxy(i,{get(r,n){if(E(a),n===xe)return()=>{Te(s),Y(e),a=!0};if(n==="then"){if(t.length===0)return{then:()=>s};const l=v(e,{type:"GET",path:t.map(o=>o.toString())}).then(b);return l.then.bind(l)}return C(e,[...t,n])},set(r,n,l){E(a);const[o,f]=N(l);return v(e,{type:"SET",path:[...t,n].map(c=>c.toString()),value:o},f).then(b)},apply(r,n,l){E(a);const o=t[t.length-1];if(o===Oe)return v(e,{type:"ENDPOINT"}).then(b);if(o==="bind")return C(e,t.slice(0,-1));const[f,c]=V(l);return v(e,{type:"APPLY",path:t.map(d=>d.toString()),argumentList:f},c).then(b)},construct(r,n){E(a);const[l,o]=V(n);return v(e,{type:"CONSTRUCT",path:t.map(f=>f.toString()),argumentList:l},o).then(b)}});return Re(s,e),s}function Ce(e){return Array.prototype.concat.apply([],e)}function V(e){const t=e.map(N);return[t.map(i=>i[0]),Ce(t.map(i=>i[1]))]}const J=new WeakMap;function $e(e,t){return J.set(e,t),e}function De(e){return Object.assign(e,{[q]:!0})}function N(e){for(const[t,i]of K)if(i.canHandle(e)){const[a,s]=i.serialize(e);return[{type:"HANDLER",name:t,value:a},s]}return[{type:"RAW",value:e},J.get(e)||[]]}function b(e){switch(e.type){case"HANDLER":return K.get(e.name).deserialize(e.value);case"RAW":return e.value}}function v(e,t,i){return new Promise(a=>{const s=je();e.addEventListener("message",function r(n){!n.data||!n.data.id||n.data.id!==s||(e.removeEventListener("message",r),a(n.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:s},t),i)})}function je(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}var Me=Object.create,I=Object.defineProperty,Ie=Object.getOwnPropertyDescriptor,Ue=Object.getOwnPropertyNames,ze=Object.getPrototypeOf,He=Object.prototype.hasOwnProperty,u=(e,t)=>I(e,"name",{value:t,configurable:!0}),X=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,i)=>(typeof require<"u"?require:t)[i]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')}),Q=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),We=(e,t,i,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Ue(t))!He.call(e,s)&&s!==i&&I(e,s,{get:()=>t[s],enumerable:!(a=Ie(t,s))||a.enumerable});return e},Ve=(e,t,i)=>(i=e!=null?Me(ze(e)):{},We(!e||!e.__esModule?I(i,"default",{value:e,enumerable:!0}):i,e)),qe=Q((e,t)=>{(function(i,a){typeof define=="function"&&define.amd?define("stackframe",[],a):typeof e=="object"?t.exports=a():i.StackFrame=a()})(e,function(){function i(m){return!isNaN(parseFloat(m))&&isFinite(m)}u(i,"_isNumber");function a(m){return m.charAt(0).toUpperCase()+m.substring(1)}u(a,"_capitalize");function s(m){return function(){return this[m]}}u(s,"_getter");var r=["isConstructor","isEval","isNative","isToplevel"],n=["columnNumber","lineNumber"],l=["fileName","functionName","source"],o=["args"],f=["evalOrigin"],c=r.concat(n,l,o,f);function d(m){if(m)for(var g=0;g<c.length;g++)m[c[g]]!==void 0&&this["set"+a(c[g])](m[c[g]])}u(d,"StackFrame"),d.prototype={getArgs:function(){return this.args},setArgs:function(m){if(Object.prototype.toString.call(m)!=="[object Array]")throw new TypeError("Args must be an Array");this.args=m},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(m){if(m instanceof d)this.evalOrigin=m;else if(m instanceof Object)this.evalOrigin=new d(m);else throw new TypeError("Eval Origin must be an Object or StackFrame")},toString:function(){var m=this.getFileName()||"",g=this.getLineNumber()||"",w=this.getColumnNumber()||"",k=this.getFunctionName()||"";return this.getIsEval()?m?"[eval] ("+m+":"+g+":"+w+")":"[eval]:"+g+":"+w:k?k+" ("+m+":"+g+":"+w+")":m+":"+g+":"+w}},d.fromString=u(function(m){var g=m.indexOf("("),w=m.lastIndexOf(")"),k=m.substring(0,g),be=m.substring(g+1,w).split(","),W=m.substring(w+1);if(W.indexOf("@")===0)var L=/@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(W,""),ve=L[1],ke=L[2],Ee=L[3];return new d({functionName:k,args:be||void 0,fileName:ve,lineNumber:ke||void 0,columnNumber:Ee||void 0})},"StackFrame$$fromString");for(var p=0;p<r.length;p++)d.prototype["get"+a(r[p])]=s(r[p]),d.prototype["set"+a(r[p])]=function(m){return function(g){this[m]=!!g}}(r[p]);for(var _=0;_<n.length;_++)d.prototype["get"+a(n[_])]=s(n[_]),d.prototype["set"+a(n[_])]=function(m){return function(g){if(!i(g))throw new TypeError(m+" must be a Number");this[m]=Number(g)}}(n[_]);for(var y=0;y<l.length;y++)d.prototype["get"+a(l[y])]=s(l[y]),d.prototype["set"+a(l[y])]=function(m){return function(g){this[m]=String(g)}}(l[y]);return d})}),Be=Q((e,t)=>{(function(i,a){typeof define=="function"&&define.amd?define("error-stack-parser",["stackframe"],a):typeof e=="object"?t.exports=a(qe()):i.ErrorStackParser=a(i.StackFrame)})(e,u(function(i){var a=/(^|@)\S+:\d+/,s=/^\s*at .*(\S+:\d+|\(native\))/m,r=/^(eval@)?(\[native code])?$/;return{parse:u(function(n){if(typeof n.stacktrace<"u"||typeof n["opera#sourceloc"]<"u")return this.parseOpera(n);if(n.stack&&n.stack.match(s))return this.parseV8OrIE(n);if(n.stack)return this.parseFFOrSafari(n);throw new Error("Cannot parse given Error object")},"ErrorStackParser$$parse"),extractLocation:u(function(n){if(n.indexOf(":")===-1)return[n];var l=/(.+?)(?::(\d+))?(?::(\d+))?$/,o=l.exec(n.replace(/[()]/g,""));return[o[1],o[2]||void 0,o[3]||void 0]},"ErrorStackParser$$extractLocation"),parseV8OrIE:u(function(n){var l=n.stack.split(`
`).filter(function(o){return!!o.match(s)},this);return l.map(function(o){o.indexOf("(eval ")>-1&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));var f=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),c=f.match(/ (\(.+\)$)/);f=c?f.replace(c[0],""):f;var d=this.extractLocation(c?c[1]:f),p=c&&f||void 0,_=["eval","<anonymous>"].indexOf(d[0])>-1?void 0:d[0];return new i({functionName:p,fileName:_,lineNumber:d[1],columnNumber:d[2],source:o})},this)},"ErrorStackParser$$parseV8OrIE"),parseFFOrSafari:u(function(n){var l=n.stack.split(`
`).filter(function(o){return!o.match(r)},this);return l.map(function(o){if(o.indexOf(" > eval")>-1&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),o.indexOf("@")===-1&&o.indexOf(":")===-1)return new i({functionName:o});var f=/((.*".+"[^@]*)?[^@]*)(?:@)/,c=o.match(f),d=c&&c[1]?c[1]:void 0,p=this.extractLocation(o.replace(f,""));return new i({functionName:d,fileName:p[0],lineNumber:p[1],columnNumber:p[2],source:o})},this)},"ErrorStackParser$$parseFFOrSafari"),parseOpera:u(function(n){return!n.stacktrace||n.message.indexOf(`
`)>-1&&n.message.split(`
`).length>n.stacktrace.split(`
`).length?this.parseOpera9(n):n.stack?this.parseOpera11(n):this.parseOpera10(n)},"ErrorStackParser$$parseOpera"),parseOpera9:u(function(n){for(var l=/Line (\d+).*script (?:in )?(\S+)/i,o=n.message.split(`
`),f=[],c=2,d=o.length;c<d;c+=2){var p=l.exec(o[c]);p&&f.push(new i({fileName:p[2],lineNumber:p[1],source:o[c]}))}return f},"ErrorStackParser$$parseOpera9"),parseOpera10:u(function(n){for(var l=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,o=n.stacktrace.split(`
`),f=[],c=0,d=o.length;c<d;c+=2){var p=l.exec(o[c]);p&&f.push(new i({functionName:p[3]||void 0,fileName:p[2],lineNumber:p[1],source:o[c]}))}return f},"ErrorStackParser$$parseOpera10"),parseOpera11:u(function(n){var l=n.stack.split(`
`).filter(function(o){return!!o.match(a)&&!o.match(/^Error created at/)},this);return l.map(function(o){var f=o.split("@"),c=this.extractLocation(f.pop()),d=f.shift()||"",p=d.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^)]*\)/g,"")||void 0,_;d.match(/\(([^)]*)\)/)&&(_=d.replace(/^[^(]+\(([^)]*)\)$/,"$1"));var y=_===void 0||_==="[arguments not available]"?void 0:_.split(",");return new i({functionName:p,args:y,fileName:c[0],lineNumber:c[1],columnNumber:c[2],source:o})},this)},"ErrorStackParser$$parseOpera11")}},"ErrorStackParser"))}),Ke=Ve(Be()),h=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string"&&typeof process.browser>"u",Z=h&&typeof j<"u"&&typeof j.exports<"u"&&typeof X<"u"&&typeof __dirname<"u",Ge=h&&!Z,Ye=typeof Deno<"u",ee=!h&&!Ye,Je=ee&&typeof window<"u"&&typeof document<"u"&&typeof document.createElement<"u"&&typeof sessionStorage<"u",Xe=ee&&typeof importScripts<"u"&&typeof self<"u",te,P,$,ne,U,Qe=`"fetch" is not defined, maybe you're using node < 18? From Pyodide >= 0.25.0, node >= 18 is required. Older versions of Node.js may work, but it is not guaranteed or supported. Falling back to "node-fetch".`;async function z(){if(!h||(te=(await import("./__vite-browser-external-CIEyP2s7.js")).default,U=await import("./__vite-browser-external-CIEyP2s7.js"),globalThis.fetch?P=fetch:(console.warn(Qe),P=(await import("./index-B489Fav_.js")).default),ne=(await import("./__vite-browser-external-CIEyP2s7.js")).default,$=await import("./__vite-browser-external-CIEyP2s7.js"),H=$.sep,typeof X<"u"))return;let e=await import("./__vite-browser-external-CIEyP2s7.js"),t=await import("./__vite-browser-external-CIEyP2s7.js"),i=await import("./__vite-browser-external-CIEyP2s7.js"),a=await import("./__vite-browser-external-CIEyP2s7.js"),s={fs:e,crypto:t,ws:i,child_process:a};globalThis.require=function(r){return s[r]}}u(z,"initNodeModules");function re(e,t){return $.resolve(t||".",e)}u(re,"node_resolvePath");function ie(e,t){return t===void 0&&(t=location),new URL(e,t).toString()}u(ie,"browser_resolvePath");var D;h?D=re:D=ie;var H;h||(H="/");function ae(e,t){return e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?{response:P(e)}:{binary:U.readFile(e).then(i=>new Uint8Array(i.buffer,i.byteOffset,i.byteLength))}}u(ae,"node_getBinaryResponse");function se(e,t){let i=new URL(e,location);return{response:fetch(i,t?{integrity:t}:{})}}u(se,"browser_getBinaryResponse");var A;h?A=ae:A=se;async function oe(e,t){let{response:i,binary:a}=A(e,t);if(a)return a;let s=await i;if(!s.ok)throw new Error(`Failed to load '${e}': request failed.`);return new Uint8Array(await s.arrayBuffer())}u(oe,"loadBinaryFile");var O;if(Je)O=u(async e=>await import(e),"loadScript");else if(Xe)O=u(async e=>{try{globalThis.importScripts(e)}catch(t){if(t instanceof TypeError)await import(e);else throw t}},"loadScript");else if(h)O=le;else throw new Error("Cannot determine runtime environment");async function le(e){e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?ne.runInThisContext(await(await P(e)).text()):await import(te.pathToFileURL(e).href)}u(le,"nodeLoadScript");async function ce(e){if(h){await z();let t=await U.readFile(e);return JSON.parse(t)}else return await(await fetch(e)).json()}u(ce,"loadLockFile");async function fe(){if(Z)return __dirname;let e;try{throw new Error}catch(a){e=a}let t=Ke.default.parse(e)[0].fileName;if(Ge){let a=await import("./__vite-browser-external-CIEyP2s7.js");return(await import("./__vite-browser-external-CIEyP2s7.js")).fileURLToPath(a.dirname(t))}let i=t.lastIndexOf(H);if(i===-1)throw new Error("Could not extract indexURL path from pyodide module location");return t.slice(0,i)}u(fe,"calculateDirname");function de(e){let t=e.FS,i=e.FS.filesystems.MEMFS,a=e.PATH,s={DIR_MODE:16895,FILE_MODE:33279,mount:function(r){if(!r.opts.fileSystemHandle)throw new Error("opts.fileSystemHandle is required");return i.mount.apply(null,arguments)},syncfs:async(r,n,l)=>{try{let o=s.getLocalSet(r),f=await s.getRemoteSet(r),c=n?f:o,d=n?o:f;await s.reconcile(r,c,d),l(null)}catch(o){l(o)}},getLocalSet:r=>{let n=Object.create(null);function l(c){return c!=="."&&c!==".."}u(l,"isRealDir");function o(c){return d=>a.join2(c,d)}u(o,"toAbsolute");let f=t.readdir(r.mountpoint).filter(l).map(o(r.mountpoint));for(;f.length;){let c=f.pop(),d=t.stat(c);t.isDir(d.mode)&&f.push.apply(f,t.readdir(c).filter(l).map(o(c))),n[c]={timestamp:d.mtime,mode:d.mode}}return{type:"local",entries:n}},getRemoteSet:async r=>{let n=Object.create(null),l=await Ze(r.opts.fileSystemHandle);for(let[o,f]of l)o!=="."&&(n[a.join2(r.mountpoint,o)]={timestamp:f.kind==="file"?(await f.getFile()).lastModifiedDate:new Date,mode:f.kind==="file"?s.FILE_MODE:s.DIR_MODE});return{type:"remote",entries:n,handles:l}},loadLocalEntry:r=>{let n=t.lookupPath(r).node,l=t.stat(r);if(t.isDir(l.mode))return{timestamp:l.mtime,mode:l.mode};if(t.isFile(l.mode))return n.contents=i.getFileDataAsTypedArray(n),{timestamp:l.mtime,mode:l.mode,contents:n.contents};throw new Error("node type not supported")},storeLocalEntry:(r,n)=>{if(t.isDir(n.mode))t.mkdirTree(r,n.mode);else if(t.isFile(n.mode))t.writeFile(r,n.contents,{canOwn:!0});else throw new Error("node type not supported");t.chmod(r,n.mode),t.utime(r,n.timestamp,n.timestamp)},removeLocalEntry:r=>{var n=t.stat(r);t.isDir(n.mode)?t.rmdir(r):t.isFile(n.mode)&&t.unlink(r)},loadRemoteEntry:async r=>{if(r.kind==="file"){let n=await r.getFile();return{contents:new Uint8Array(await n.arrayBuffer()),mode:s.FILE_MODE,timestamp:n.lastModifiedDate}}else{if(r.kind==="directory")return{mode:s.DIR_MODE,timestamp:new Date};throw new Error("unknown kind: "+r.kind)}},storeRemoteEntry:async(r,n,l)=>{let o=r.get(a.dirname(n)),f=t.isFile(l.mode)?await o.getFileHandle(a.basename(n),{create:!0}):await o.getDirectoryHandle(a.basename(n),{create:!0});if(f.kind==="file"){let c=await f.createWritable();await c.write(l.contents),await c.close()}r.set(n,f)},removeRemoteEntry:async(r,n)=>{await r.get(a.dirname(n)).removeEntry(a.basename(n)),r.delete(n)},reconcile:async(r,n,l)=>{let o=0,f=[];Object.keys(n.entries).forEach(function(p){let _=n.entries[p],y=l.entries[p];(!y||t.isFile(_.mode)&&_.timestamp.getTime()>y.timestamp.getTime())&&(f.push(p),o++)}),f.sort();let c=[];if(Object.keys(l.entries).forEach(function(p){n.entries[p]||(c.push(p),o++)}),c.sort().reverse(),!o)return;let d=n.type==="remote"?n.handles:l.handles;for(let p of f){let _=a.normalize(p.replace(r.mountpoint,"/")).substring(1);if(l.type==="local"){let y=d.get(_),m=await s.loadRemoteEntry(y);s.storeLocalEntry(p,m)}else{let y=s.loadLocalEntry(p);await s.storeRemoteEntry(d,_,y)}}for(let p of c)if(l.type==="local")s.removeLocalEntry(p);else{let _=a.normalize(p.replace(r.mountpoint,"/")).substring(1);await s.removeRemoteEntry(d,_)}}};e.FS.filesystems.NATIVEFS_ASYNC=s}u(de,"initializeNativeFS");var Ze=u(async e=>{let t=[];async function i(s){for await(let r of s.values())t.push(r),r.kind==="directory"&&await i(r)}u(i,"collect"),await i(e);let a=new Map;a.set(".",e);for(let s of t){let r=(await e.resolve(s)).join("/");a.set(r,s)}return a},"getFsHandles");function pe(){let e={};return e.noImageDecoding=!0,e.noAudioDecoding=!0,e.noWasmDecoding=!1,e.preRun=[],e.quit=(t,i)=>{throw e.exited={status:t,toThrow:i},i},e}u(pe,"createModule");function me(e,t){e.preRun.push(function(){let i="/";try{e.FS.mkdirTree(t)}catch(a){console.error(`Error occurred while making a home directory '${t}':`),console.error(a),console.error(`Using '${i}' for a home directory instead`),t=i}e.FS.chdir(t)})}u(me,"createHomeDirectory");function ue(e,t){e.preRun.push(function(){Object.assign(e.ENV,t)})}u(ue,"setEnvironment");function _e(e,t){e.preRun.push(()=>{for(let i of t)e.FS.mkdirTree(i),e.FS.mount(e.FS.filesystems.NODEFS,{root:i},i)})}u(_e,"mountLocalDirectories");function ge(e,t){let i=oe(t);e.preRun.push(()=>{let a=e._py_version_major(),s=e._py_version_minor();e.FS.mkdirTree("/lib"),e.FS.mkdirTree(`/lib/python${a}.${s}/site-packages`),e.addRunDependency("install-stdlib"),i.then(r=>{e.FS.writeFile(`/lib/python${a}${s}.zip`,r)}).catch(r=>{console.error("Error occurred while installing the standard library:"),console.error(r)}).finally(()=>{e.removeRunDependency("install-stdlib")})})}u(ge,"installStdlib");function ye(e,t){let i;t.stdLibURL!=null?i=t.stdLibURL:i=t.indexURL+"python_stdlib.zip",ge(e,i),me(e,t.env.HOME),ue(e,t.env),_e(e,t._node_mounts),e.preRun.push(()=>de(e))}u(ye,"initializeFileSystem");function he(e,t){let{binary:i,response:a}=A(t+"pyodide.asm.wasm");e.instantiateWasm=function(s,r){return async function(){try{let n;a?n=await WebAssembly.instantiateStreaming(a,s):n=await WebAssembly.instantiate(await i,s);let{instance:l,module:o}=n;typeof WasmOffsetConverter<"u"&&(wasmOffsetConverter=new WasmOffsetConverter(wasmBinary,o)),r(l,o)}catch(n){console.warn("wasm instantiation failed!"),console.warn(n)}}(),{}}}u(he,"preloadWasm");var T="0.25.0";async function we(e={}){await z();let t=e.indexURL||await fe();t=D(t),t.endsWith("/")||(t+="/"),e.indexURL=t;let i={fullStdLib:!1,jsglobals:globalThis,stdin:globalThis.prompt?globalThis.prompt:void 0,lockFileURL:t+"pyodide-lock.json",args:[],_node_mounts:[],env:{},packageCacheDir:t,packages:[]},a=Object.assign(i,e);a.env.HOME||(a.env.HOME="/home/pyodide");let s=pe();s.print=a.stdout,s.printErr=a.stderr,s.arguments=a.args;let r={config:a};s.API=r,r.lockFilePromise=ce(a.lockFileURL),he(s,t),ye(s,a);let n=new Promise(o=>s.postRun=o);if(s.locateFile=o=>a.indexURL+o,typeof _createPyodideModule!="function"){let o=`${a.indexURL}pyodide.asm.js`;await O(o)}if(await _createPyodideModule(s),await n,s.exited)throw s.exited.toThrow;if(e.pyproxyToStringRepr&&r.setPyProxyToStringMethod(!0),r.version!==T)throw new Error(`Pyodide version does not match: '${T}' <==> '${r.version}'. If you updated the Pyodide version, make sure you also updated the 'indexURL' parameter passed to loadPyodide.`);s.locateFile=o=>{throw new Error("Didn't expect to load any more file_packager files!")};let l=r.finalizeBootstrap();if(l.version.includes("dev")||r.setCdnUrl(`https://cdn.jsdelivr.net/pyodide/v${l.version}/full/`),await r.packageIndexReady,r._pyodide._importhook.register_module_not_found_hook(r._import_name_to_package_name,r.lockfile_unvendored_stdlibs_and_test),r.lockfile_info.version!==T)throw new Error("Lock file version doesn't match Pyodide version");return r.package_loader.init_loaded_packages(),a.fullStdLib&&await l.loadPackage(r.lockfile_unvendored_stdlibs),r.initializeStreams(a.stdin,a.stdout,a.stderr),l}u(we,"loadPyodide");async function et(e){const t={"api/app.py":`from __future__ import annotations

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
`,"api/models/__init__.py":`from .chart import Chart
from .session import Session
from .state import State

__all__ = [
  "State",
  "Session",
  "Chart",
  "dataclass",
]
`,"api/models/chart.py":`from dataclasses import dataclass, field
from typing import Any

from api.utils import get_timestamp


@dataclass
class Chart:
  facts: list[str]

  title: str = field(default="")
  description: str = field(default="")

  specs: list[dict[str, Any]] = field(default_factory=list)
  attributes: list[str] = field(default_factory=list)

  timestamp: int = field(default_factory=get_timestamp)
  key: str = field(default="")

  def __post_init__(self):
    self.key = f"chart-{self.timestamp}-{str(self.attributes)}"
`,"api/models/session.py":`from dataclasses import dataclass, field

from api.utils import get_timestamp

from .chart import Chart


@dataclass
class Session:
  charts: list[Chart]
  groundingAttributes: list[str]
  timestamp: int = field(default_factory=get_timestamp)
  key: str = field(default="")

  def __post_init__(self):
    self.key = f"session-{self.timestamp}-{str(self.groundingAttributes)}"
`,"api/models/state.py":`from __future__ import annotations

from dataclasses import dataclass, field
from typing import TYPE_CHECKING

import pandas as pd
from api.utils import get_timestamp

if TYPE_CHECKING:
  from .session import Session


@dataclass
class State:
  df: pd.DataFrame | None = field(default=None)
  filename: str | None = field(default=None)
  sessions: list["Session"] = field(default_factory=list)

  timestamp: int = field(default_factory=get_timestamp)

  @property
  def undiscovered_attributes(self) -> list[str]:
    return [
      column
      for column in self.df.columns
      if column
      not in sum((session.groundingAttributes for session in self.sessions), [])
    ]
`,"api/services/__init__.py":`from .data import load_data
from .facts import (
  get_attribute_facts,
  get_base_facts,
  get_encoding_facts,
  get_facts,
)
from .specs import get_specs_from_facts

__all__ = [
  "load_data",
  "get_encoding_facts",
  "get_base_facts",
  "get_specs_from_facts",
  "get_facts",
  "get_attribute_facts",
]
`,"api/services/chart.py":`from random import choice

from api.models import Session
from api.models.chart import Chart
from api.services.facts import get_facts
from api.services.specs import get_specs_from_facts
from api.state import state
from api.utils import replace_clingo_field_name
from api.utils.field_name import get_clingo_field_name


def append_chart(session: Session):
  # 기본 차트 추가
  grounding_fields = [
    get_clingo_field_name(field) for field in session.groundingAttributes
  ]
  if len(session.charts) == 0:
    facts = get_facts(grounding_fields)
    specs = get_specs_from_facts(facts)
    session.charts.append(
      Chart(
        specs=specs,
        facts=facts,
        attributes=session.groundingAttributes,
      )
    )

  used_field = sum([chart.attributes for chart in session.charts], [])
  if len(used_field) == len(state.df.columns):
    print("All fields are used")
    return

  def get_new_spes():
    new_fields = get_clingo_field_name(
      [
        *session.groundingAttributes,
        choice(
          [column for column in state.df.columns if column not in used_field]
        ),
      ]
    )

    new_facts = get_facts(new_fields)
    new_specs = get_specs_from_facts(new_facts)
    return new_fields, new_facts, new_specs

  new_fields, new_facts, new_specs = get_new_spes()

  while len(new_specs) > 0:
    used_field.append(new_fields[-1])
    new_fields, new_facts, new_specs = get_new_spes()

  session.charts.append(
    Chart(
      specs=new_specs,
      facts=new_facts,
      attributes=replace_clingo_field_name(new_fields),
    )
  )
`,"api/services/data.py":`from __future__ import annotations

import pathlib

import pandas as pd
from api.state import state
from api.utils import get_file_extension
from api.utils.field_name import get_clingo_field_name
from vega_datasets import data


def load_data(fileName: str | None = None) -> None:
  if fileName is None:
    state.filename = "Cars"
    state.df = pd.DataFrame(data.cars())

    return

  extension = get_file_extension(fileName)

  state.filename = fileName
  state.df = getattr(pd, f"read_{extension}")(pathlib.Path("./", fileName))
  state.df.columns = [
    get_clingo_field_name(column) for column in state.df.columns
  ]


__all__ = ["load_data"]
`,"api/services/facts.py":`import draco
from api.state import state


def get_base_facts() -> list[str]:
  return [
    "entity(view,root,v0).",
    "entity(mark,v0,m0).",
    ":- {entity(encoding,_,_)} > 3.",
    ":- {entity(mark,_,_)} != 1.",
  ]


def get_attribute_facts(fields: list[str]) -> list[str]:
  base_scheme = draco.schema_from_dataframe(state.df[fields])
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


def get_facts(fields: list[str]) -> list[str]:
  print(fields)
  return (
    get_base_facts() + get_attribute_facts(fields) + get_encoding_facts(fields)
  )


__all__ = [
  "get_base_facts",
  "get_encoding_facts",
  "get_attribute_facts",
  "get_facts",
]
`,"api/services/session.py":`from api.models import Session
from api.services.chart import append_chart
from api.state import state
from api.utils.field_name import replace_clingo_field_name


def append_session(groundingAttributes: list[str]) -> None:
  session = Session(
    charts=[],
    groundingAttributes=replace_clingo_field_name(groundingAttributes),
  )
  append_chart(session)
  state.sessions.append(session)
`,"api/services/specs.py":`from typing import Iterable

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
`,"api/state.py":`from api.models import State

state = State()


# decorator that return dict(state)
def return_state(func):
  def wrapper(*args, **kwargs):
    func(*args, **kwargs)

    # remove df, filename in asdict(state)

  return wrapper


__all__ = ["state", "return_state"]
`,"api/utils/__init__.py":`from .field_name import (
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
`,"api/utils/field_name.py":`from __future__ import annotations

from typing import Any

id_to_name: dict[str, str] = {}
name_to_id: dict[str, str] = {}


def get_clingo_field_name(field_name: str | int | list) -> str:
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
`,"api/utils/get_file_extension.py":`def get_file_extension(filename: str) -> str:
  return filename.split(".")[-1]


__all__ = ["get_file_extension"]
`,"api/utils/get_timestamp.py":`import time


def get_timestamp():
  return int(time.time() * 1000)
`};for(const[i,a]of Object.entries(t)){const s=i.split("/").slice(0,-1);let r="";for(const n of s){r=r?`${r}/${n}`:n;try{e.FS.mkdir(r)}catch{}}e.FS.writeFile(i,a)}}async function tt(e){await e.runPythonAsync(`from __future__ import annotations

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
`)}const nt={pyodide:null,async writeFile(e,t){if(!this.pyodide)throw new Error("Pyodide is not initialized");this.pyodide.FS.writeFile(`${e}`,t,{encoding:"binary"})},async readFile(e){if(!this.pyodide)throw new Error("Pyodide is not initialized");return this.pyodide.FS.readFile(`${e}`,{encoding:"utf-8"})},async initialize(e=[]){this.pyodide=await we({indexURL:"/Swipytics/artifacts"});for(const t of e)await this.pyodide.loadPackage(t);await et(this.pyodide);try{await tt(this.pyodide)}catch(t){console.error(t)}},terminate(){if(this.pyodide){const e=new Uint8Array(new SharedArrayBuffer(1));e[0]=2,this.pyodide.setInterruptBuffer(e),this.pyodide=null}},async runPython(e,t={}){if(!this.pyodide)throw new Error("Pyodide is not initialized");const i=this.pyodide.globals.get("dict")();for(const[a,s]of Object.entries(t))i.set(a,s);return this.pyodide.runPython(e,{globals:i})},async callPythonFunction(e,t=[],i){if(!this.pyodide)throw new Error("Pyodide is not initialized");const a=this.pyodide.globals.get(e);if(!a)throw new Error(`Function ${e} is not defined in globals`);const s=this.pyodide.toPy(t),r=i?a.callKwargs(s,i):a(...s);return r!=null&&r.toJs?r.toJs({dict_converter:Object.fromEntries}):r}};M(nt)});export default rt();
