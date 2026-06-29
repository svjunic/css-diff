#!/usr/bin/env node
// Copyright (c) 2026 sv.junic. MIT License. v0.2.0
// Source: https://github.com/svjunic/css-review
var ms=Object.create;var Jt=Object.defineProperty;var gs=Object.getOwnPropertyDescriptor;var ys=Object.getOwnPropertyNames;var ws=Object.getPrototypeOf,vs=Object.prototype.hasOwnProperty;var v=(s,e)=>()=>{try{return e||s((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}};var xs=(s,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of ys(e))!vs.call(s,n)&&n!==t&&Jt(s,n,{get:()=>e[n],enumerable:!(r=gs(e,n))||r.enumerable});return s};var Ss=(s,e,t)=>(t=s!=null?ms(ws(s)):{},xs(e||!s||!s.__esModule?Jt(t,"default",{value:s,enumerable:!0}):t,s));var nt=v((Wo,rt)=>{var Ne=process||{},Yt=Ne.argv||[],Ie=Ne.env||{},bs=!(Ie.NO_COLOR||Yt.includes("--no-color"))&&(!!Ie.FORCE_COLOR||Yt.includes("--color")||Ne.platform==="win32"||(Ne.stdout||{}).isTTY&&Ie.TERM!=="dumb"||!!Ie.CI),Cs=(s,e,t=s)=>r=>{let n=""+r,i=n.indexOf(e,s.length);return~i?s+_s(n,e,t,i)+e:s+n+e},_s=(s,e,t,r)=>{let n="",i=0;do n+=s.substring(i,r)+t,i=r+e.length,r=s.indexOf(e,i);while(~r);return n+s.substring(i)},Xt=(s=bs)=>{let e=s?Cs:()=>String;return{isColorSupported:s,reset:e("\x1B[0m","\x1B[0m"),bold:e("\x1B[1m","\x1B[22m","\x1B[22m\x1B[1m"),dim:e("\x1B[2m","\x1B[22m","\x1B[22m\x1B[2m"),italic:e("\x1B[3m","\x1B[23m"),underline:e("\x1B[4m","\x1B[24m"),inverse:e("\x1B[7m","\x1B[27m"),hidden:e("\x1B[8m","\x1B[28m"),strikethrough:e("\x1B[9m","\x1B[29m"),black:e("\x1B[30m","\x1B[39m"),red:e("\x1B[31m","\x1B[39m"),green:e("\x1B[32m","\x1B[39m"),yellow:e("\x1B[33m","\x1B[39m"),blue:e("\x1B[34m","\x1B[39m"),magenta:e("\x1B[35m","\x1B[39m"),cyan:e("\x1B[36m","\x1B[39m"),white:e("\x1B[37m","\x1B[39m"),gray:e("\x1B[90m","\x1B[39m"),bgBlack:e("\x1B[40m","\x1B[49m"),bgRed:e("\x1B[41m","\x1B[49m"),bgGreen:e("\x1B[42m","\x1B[49m"),bgYellow:e("\x1B[43m","\x1B[49m"),bgBlue:e("\x1B[44m","\x1B[49m"),bgMagenta:e("\x1B[45m","\x1B[49m"),bgCyan:e("\x1B[46m","\x1B[49m"),bgWhite:e("\x1B[47m","\x1B[49m"),blackBright:e("\x1B[90m","\x1B[39m"),redBright:e("\x1B[91m","\x1B[39m"),greenBright:e("\x1B[92m","\x1B[39m"),yellowBright:e("\x1B[93m","\x1B[39m"),blueBright:e("\x1B[94m","\x1B[39m"),magentaBright:e("\x1B[95m","\x1B[39m"),cyanBright:e("\x1B[96m","\x1B[39m"),whiteBright:e("\x1B[97m","\x1B[39m"),bgBlackBright:e("\x1B[100m","\x1B[49m"),bgRedBright:e("\x1B[101m","\x1B[49m"),bgGreenBright:e("\x1B[102m","\x1B[49m"),bgYellowBright:e("\x1B[103m","\x1B[49m"),bgBlueBright:e("\x1B[104m","\x1B[49m"),bgMagentaBright:e("\x1B[105m","\x1B[49m"),bgCyanBright:e("\x1B[106m","\x1B[49m"),bgWhiteBright:e("\x1B[107m","\x1B[49m")}};rt.exports=Xt();rt.exports.createColors=Xt});var st=v((Ko,er)=>{"use strict";var ke=/[\t\n\f\r "#'()/;[\\\]{}]/g,qe=/[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g,Es=/.[\r\n"'(/\\]/,Zt=/[\da-f]/i;er.exports=function(e,t={}){let r=e.css.valueOf(),n=t.ignoreErrors,i,l,a,o,u,c,p,f,h,d,y=r.length,m=0,S=[],w=[],L=-1;function N(){return m}function O(X){throw e.error("Unclosed "+X,m)}function E(){return w.length===0&&m>=y}function K(X){if(w.length)return w.pop();if(m>=y)return;let tt=X?X.ignoreUnclosed:!1;switch(i=r.charCodeAt(m),i){case 10:case 32:case 9:case 13:case 12:{o=m;do o+=1,i=r.charCodeAt(o);while(i===32||i===10||i===9||i===13||i===12);c=["space",r.slice(m,o)],m=o-1;break}case 91:case 93:case 123:case 125:case 58:case 59:case 41:{let Qt=String.fromCharCode(i);c=[Qt,Qt,m];break}case 40:{if(d=S.length?S.pop()[1]:"",h=r.charCodeAt(m+1),d==="url"&&h!==39&&h!==34&&h!==32&&h!==10&&h!==9&&h!==12&&h!==13){o=m;do{if(p=!1,o=r.indexOf(")",o+1),o===-1)if(n||tt){o=m;break}else O("bracket");for(f=o;r.charCodeAt(f-1)===92;)f-=1,p=!p}while(p);c=["brackets",r.slice(m,o+1),m,o],m=o}else m<=L?c=["(","(",m]:(o=r.indexOf(")",m+1),l=r.slice(m,o+1),o===-1||Es.test(l)?(L=o===-1?y:o,c=["(","(",m]):(c=["brackets",l,m,o],m=o));break}case 39:case 34:{u=i===39?"'":'"',o=m;do{if(p=!1,o=r.indexOf(u,o+1),o===-1)if(n||tt){o=m+1;break}else O("string");for(f=o;r.charCodeAt(f-1)===92;)f-=1,p=!p}while(p);c=["string",r.slice(m,o+1),m,o],m=o;break}case 64:{ke.lastIndex=m+1,ke.test(r),ke.lastIndex===0?o=r.length-1:o=ke.lastIndex-2,c=["at-word",r.slice(m,o+1),m,o],m=o;break}case 92:{for(o=m,a=!0;r.charCodeAt(o+1)===92;)o+=1,a=!a;if(i=r.charCodeAt(o+1),a&&i!==47&&i!==32&&i!==10&&i!==9&&i!==13&&i!==12&&(o+=1,Zt.test(r.charAt(o)))){for(;Zt.test(r.charAt(o+1));)o+=1;r.charCodeAt(o+1)===32&&(o+=1)}c=["word",r.slice(m,o+1),m,o],m=o;break}default:{i===47&&r.charCodeAt(m+1)===42?(o=r.indexOf("*/",m+2)+1,o===0&&(n||tt?o=r.length:O("comment")),c=["comment",r.slice(m,o+1),m,o],m=o):(qe.lastIndex=m+1,qe.test(r),qe.lastIndex===0?o=r.length-1:o=qe.lastIndex-2,c=["word",r.slice(m,o+1),m,o],S.push(c),m=o);break}}return m++,c}function Ht(X){w.push(X)}return{back:Ht,endOfFile:E,nextToken:K,position:N}}});var it=v((Ho,nr)=>{"use strict";var $=nt(),Os=st(),tr;function As(s){tr=s}var Ls={";":$.yellow,":":$.yellow,"(":$.cyan,")":$.cyan,"[":$.yellow,"]":$.yellow,"{":$.yellow,"}":$.yellow,"at-word":$.cyan,brackets:$.cyan,call:$.cyan,class:$.yellow,comment:$.gray,hash:$.magenta,string:$.green};function Ms([s,e],t){if(s==="word"){if(e[0]===".")return"class";if(e[0]==="#")return"hash"}if(!t.endOfFile()){let r=t.nextToken();if(t.back(r),r[0]==="brackets"||r[0]==="(")return"call"}return s}function rr(s){let e=Os(new tr(s),{ignoreErrors:!0}),t="";for(;!e.endOfFile();){let r=e.nextToken(),n=Ls[Ms(r,e)];n?t+=r[1].split(/\r?\n/).map(i=>n(i)).join(`
`):t+=r[1]}return t}rr.registerInput=As;nr.exports=rr});var Te=v((Qo,or)=>{"use strict";var sr=nt(),ir=it(),ce=class s extends Error{constructor(e,t,r,n,i,l){super(e),this.name="CssSyntaxError",this.reason=e,i&&(this.file=i),n&&(this.source=n),l&&(this.plugin=l),typeof t<"u"&&typeof r<"u"&&(typeof t=="number"?(this.line=t,this.column=r):(this.line=t.line,this.column=t.column,this.endLine=r.line,this.endColumn=r.column)),this.setMessage(),Error.captureStackTrace&&Error.captureStackTrace(this,s)}setMessage(){this.message=this.plugin?this.plugin+": ":"",this.message+=this.file?this.file:"<css input>",typeof this.line<"u"&&(this.message+=":"+this.line+":"+this.column),this.message+=": "+this.reason}showSourceCode(e){if(!this.source)return"";let t=this.source;e==null&&(e=sr.isColorSupported);let r=c=>c,n=c=>c,i=c=>c;if(e){let{bold:c,gray:p,red:f}=sr.createColors(!0);n=h=>c(f(h)),r=h=>p(h),ir&&(i=h=>ir(h))}let l=t.split(/\r?\n/),a=Math.max(this.line-3,0),o=Math.min(this.line+2,l.length),u=String(o).length;return l.slice(a,o).map((c,p)=>{let f=a+1+p,h=" "+(" "+f).slice(-u)+" | ";if(f===this.line){if(c.length>160){let y=20,m=Math.max(0,this.column-y),S=Math.max(this.column+y,this.endColumn+y),w=c.slice(m,S),L=r(h.replace(/\d/g," "))+c.slice(0,Math.min(this.column-1,y-1)).replace(/[^\t]/g," ");return n(">")+r(h)+i(w)+`
 `+L+n("^")}let d=r(h.replace(/\d/g," "))+c.slice(0,this.column-1).replace(/[^\t]/g," ");return n(">")+r(h)+i(c)+`
 `+d+n("^")}return" "+r(h)+i(c)}).join(`
`)}toString(){let e=this.showSourceCode();return e&&(e=`

`+e+`
`),this.name+": "+this.message+e}};or.exports=ce;ce.default=ce});var ot=v((Jo,ar)=>{"use strict";var Rs=/(<)(\/?style\b)/gi,$s=/(<)(!--)/g;function j(s){return typeof s!="string"||!s.includes("<")?s:s.replace(Rs,"\\3c $2").replace($s,"\\3c $2")}var lr={after:`
`,beforeClose:`
`,beforeComment:`
`,beforeDecl:`
`,beforeOpen:" ",beforeRule:`
`,colon:": ",commentLeft:" ",commentRight:" ",emptyBody:"",indent:"    ",semicolon:!1};function Ps(s){return s[0].toUpperCase()+s.slice(1)}var fe=class{constructor(e){this.builder=e}atrule(e,t){let r=e.raws,n="@"+e.name,i=e.params?this.rawValue(e,"params"):"";if(typeof r.afterName<"u"?n+=r.afterName:i&&(n+=" "),e.nodes)this.block(e,n+i);else{let l=(r.between||"")+(t?";":"");this.builder(j(n+i+l),e)}}beforeAfter(e,t){let r;e.type==="decl"?r=this.raw(e,null,"beforeDecl"):e.type==="comment"?r=this.raw(e,null,"beforeComment"):t==="before"?r=this.raw(e,null,"beforeRule"):r=this.raw(e,null,"beforeClose");let n=e.parent,i=0;for(;n&&n.type!=="root";)i+=1,n=n.parent;if(r.includes(`
`)){let l=this.raw(e,null,"indent");if(l.length)for(let a=0;a<i;a++)r+=l}return r}block(e,t){let r=this.raw(e,"between","beforeOpen");this.builder(j(t+r)+"{",e,"start");let n;e.nodes&&e.nodes.length?(this.body(e),n=this.raw(e,"after")):n=this.raw(e,"after","emptyBody"),n&&this.builder(j(n)),this.builder("}",e,"end")}body(e){let t=e.nodes,r=t.length-1;for(;r>0&&t[r].type==="comment";)r-=1;let n=this.raw(e,"semicolon"),i=e.type==="document";for(let l=0;l<t.length;l++){let a=t[l],o=this.raw(a,"before");o&&this.builder(i?o:j(o)),this.stringify(a,r!==l||n)}}comment(e){let t=this.raw(e,"left","commentLeft"),r=this.raw(e,"right","commentRight");this.builder(j("/*"+t+e.text+r+"*/"),e)}decl(e,t){let r=e.raws,n=this.raw(e,"between","colon"),i=e.prop+n+this.rawValue(e,"value");e.important&&(i+=r.important||" !important"),t&&(i+=";"),this.builder(j(i),e)}document(e){this.body(e)}raw(e,t,r){let n;if(r||(r=t),t&&(n=e.raws[t],typeof n<"u"))return n;let i=e.parent;if(r==="before"&&(!i||i.type==="root"&&i.first===e||i&&i.type==="document"))return"";if(!i)return lr[r];let l=e.root(),a=l.rawCache||(l.rawCache={});if(typeof a[r]<"u")return a[r];if(r==="before"||r==="after")return this.beforeAfter(e,r);{let o="raw"+Ps(r);this[o]?n=this[o](l,e):l.walk(u=>{if(n=u.raws[t],typeof n<"u")return!1})}return typeof n>"u"&&(n=lr[r]),a[r]=n,n}rawBeforeClose(e){let t;return e.walk(r=>{if(r.nodes&&r.nodes.length>0&&typeof r.raws.after<"u")return t=r.raws.after,t.includes(`
`)&&(t=t.replace(/[^\n]+$/,"")),!1}),t&&(t=t.replace(/\S/g,"")),t}rawBeforeComment(e,t){let r;return e.walkComments(n=>{if(typeof n.raws.before<"u")return r=n.raws.before,r.includes(`
`)&&(r=r.replace(/[^\n]+$/,"")),!1}),typeof r>"u"?r=this.raw(t,null,"beforeDecl"):r&&(r=r.replace(/\S/g,"")),r}rawBeforeDecl(e,t){let r;return e.walkDecls(n=>{if(typeof n.raws.before<"u")return r=n.raws.before,r.includes(`
`)&&(r=r.replace(/[^\n]+$/,"")),!1}),typeof r>"u"?r=this.raw(t,null,"beforeRule"):r&&(r=r.replace(/\S/g,"")),r}rawBeforeOpen(e){let t;return e.walk(r=>{if(r.type!=="decl"&&(t=r.raws.between,typeof t<"u"))return!1}),t}rawBeforeRule(e){let t;return e.walk(r=>{if(r.nodes&&(r.parent!==e||e.first!==r)&&typeof r.raws.before<"u")return t=r.raws.before,t.includes(`
`)&&(t=t.replace(/[^\n]+$/,"")),!1}),t&&(t=t.replace(/\S/g,"")),t}rawColon(e){let t;return e.walkDecls(r=>{if(typeof r.raws.between<"u")return t=r.raws.between.replace(/[^\s:]/g,""),!1}),t}rawEmptyBody(e){let t;return e.walk(r=>{if(r.nodes&&r.nodes.length===0&&(t=r.raws.after,typeof t<"u"))return!1}),t}rawIndent(e){if(e.raws.indent)return e.raws.indent;let t;return e.walk(r=>{let n=r.parent;if(n&&n!==e&&n.parent&&n.parent===e&&typeof r.raws.before<"u"){let i=r.raws.before.split(`
`);return t=i[i.length-1],t=t.replace(/\S/g,""),!1}}),t}rawSemicolon(e){let t;return e.walk(r=>{if(r.nodes&&r.nodes.length&&r.last.type==="decl"&&(t=r.raws.semicolon,typeof t<"u"))return!1}),t}rawValue(e,t){let r=e[t],n=e.raws[t];return n&&n.value===r?n.raw:r}root(e){if(this.body(e),e.raws.after){let t=e.raws.after,r=e.parent&&e.parent.type==="document";this.builder(r?t:j(t))}}rule(e){this.block(e,this.rawValue(e,"selector")),e.raws.ownSemicolon&&this.builder(j(e.raws.ownSemicolon),e,"end")}stringify(e,t){if(!this[e.type])throw new Error("Unknown AST node type "+e.type+". Maybe you need to change PostCSS stringifier.");this[e.type](e,t)}};ar.exports=fe;fe.default=fe});var he=v((Yo,ur)=>{"use strict";var Is=ot();function lt(s,e){new Is(e).stringify(s)}ur.exports=lt;lt.default=lt});var De=v((Xo,at)=>{"use strict";at.exports.isClean=Symbol("isClean");at.exports.my=Symbol("my")});var me=v((Zo,cr)=>{"use strict";var Ns=Te(),ks=ot(),qs=he(),{isClean:pe,my:Ts}=De();function ut(s,e){let t=new s.constructor;for(let r in s){if(!Object.prototype.hasOwnProperty.call(s,r)||r==="proxyCache")continue;let n=s[r],i=typeof n;r==="parent"&&i==="object"?e&&(t[r]=e):r==="source"?t[r]=n:Array.isArray(n)?t[r]=n.map(l=>ut(l,t)):(i==="object"&&n!==null&&(n=ut(n)),t[r]=n)}return t}function B(s,e){if(e&&typeof e.offset<"u")return e.offset;let t=1,r=1,n=0;for(let i=0;i<s.length;i++){if(r===e.line&&t===e.column){n=i;break}s[i]===`
`?(t=1,r+=1):t+=1}return n}var de=class{get proxyOf(){return this}constructor(e={}){this.raws={},this[pe]=!1,this[Ts]=!0;for(let t in e)if(t==="nodes"){this.nodes=[];for(let r of e[t])typeof r.clone=="function"?this.append(r.clone()):this.append(r)}else this[t]=e[t]}addToError(e){if(e.postcssNode=this,e.stack&&this.source&&/\n\s{4}at /.test(e.stack)){let t=this.source;e.stack=e.stack.replace(/\n\s{4}at /,`$&${t.input.from}:${t.start.line}:${t.start.column}$&`)}return e}after(e){return this.parent.insertAfter(this,e),this}assign(e={}){for(let t in e)this[t]=e[t];return this}before(e){return this.parent.insertBefore(this,e),this}cleanRaws(e){delete this.raws.before,delete this.raws.after,e||delete this.raws.between}clone(e={}){let t=ut(this);for(let r in e)t[r]=e[r];return t}cloneAfter(e={}){let t=this.clone(e);return this.parent.insertAfter(this,t),t}cloneBefore(e={}){let t=this.clone(e);return this.parent.insertBefore(this,t),t}error(e,t={}){if(this.source){let{end:r,start:n}=this.rangeBy(t);return this.source.input.error(e,{column:n.column,line:n.line},{column:r.column,line:r.line},t)}return new Ns(e)}getProxyProcessor(){return{get(e,t){return t==="proxyOf"?e:t==="root"?()=>e.root().toProxy():e[t]},set(e,t,r){return e[t]===r||(e[t]=r,(t==="prop"||t==="value"||t==="name"||t==="params"||t==="important"||t==="text")&&e.markDirty()),!0}}}markClean(){this[pe]=!0}markDirty(){if(this[pe]){this[pe]=!1;let e=this;for(;e=e.parent;)e[pe]=!1}}next(){if(!this.parent)return;let e=this.parent.index(this);return this.parent.nodes[e+1]}positionBy(e={}){let t=this.source.start;if(e.index)t=this.positionInside(e.index);else if(e.word){let r="document"in this.source.input?this.source.input.document:this.source.input.css,i=r.slice(B(r,this.source.start),B(r,this.source.end)).indexOf(e.word);i!==-1&&(t=this.positionInside(i))}return t}positionInside(e){let t=this.source.start.column,r=this.source.start.line,n="document"in this.source.input?this.source.input.document:this.source.input.css,i=B(n,this.source.start),l=i+e;for(let a=i;a<l;a++)n[a]===`
`?(t=1,r+=1):t+=1;return{column:t,line:r,offset:l}}prev(){if(!this.parent)return;let e=this.parent.index(this);return this.parent.nodes[e-1]}rangeBy(e={}){let t="document"in this.source.input?this.source.input.document:this.source.input.css,r={column:this.source.start.column,line:this.source.start.line,offset:B(t,this.source.start)},n=this.source.end?{column:this.source.end.column+1,line:this.source.end.line,offset:typeof this.source.end.offset=="number"?this.source.end.offset:B(t,this.source.end)+1}:{column:r.column+1,line:r.line,offset:r.offset+1};if(e.word){let l=t.slice(B(t,this.source.start),B(t,this.source.end)).indexOf(e.word);l!==-1&&(r=this.positionInside(l),n=this.positionInside(l+e.word.length))}else e.start?r={column:e.start.column,line:e.start.line,offset:B(t,e.start)}:e.index&&(r=this.positionInside(e.index)),e.end?n={column:e.end.column,line:e.end.line,offset:B(t,e.end)}:typeof e.endIndex=="number"?n=this.positionInside(e.endIndex):e.index&&(n=this.positionInside(e.index+1));return(n.line<r.line||n.line===r.line&&n.column<=r.column)&&(n={column:r.column+1,line:r.line,offset:r.offset+1}),{end:n,start:r}}raw(e,t){return new ks().raw(this,e,t)}remove(){return this.parent&&this.parent.removeChild(this),this.parent=void 0,this}replaceWith(...e){if(this.parent){let t=this,r=!1;for(let n of e)n===this?r=!0:r?(this.parent.insertAfter(t,n),t=n):this.parent.insertBefore(t,n);r||this.remove()}return this}root(){let e=this;for(;e.parent&&e.parent.type!=="document";)e=e.parent;return e}toJSON(e,t){let r={},n=t==null;t=t||new Map;let i=0;for(let l in this){if(!Object.prototype.hasOwnProperty.call(this,l)||l==="parent"||l==="proxyCache")continue;let a=this[l];if(Array.isArray(a))r[l]=a.map(o=>typeof o=="object"&&o.toJSON?o.toJSON(null,t):o);else if(typeof a=="object"&&a.toJSON)r[l]=a.toJSON(null,t);else if(l==="source"){if(a==null)continue;let o=t.get(a.input);o==null&&(o=i,t.set(a.input,i),i++),r[l]={end:a.end,inputId:o,start:a.start}}else r[l]=a}return n&&(r.inputs=[...t.keys()].map(l=>l.toJSON())),r}toProxy(){return this.proxyCache||(this.proxyCache=new Proxy(this,this.getProxyProcessor())),this.proxyCache}toString(e=qs){e.stringify&&(e=e.stringify);let t="";return e(this,r=>{t+=r}),t}warn(e,t,r={}){let n={node:this};for(let i in r)n[i]=r[i];return e.warn(t,n)}};cr.exports=de;de.default=de});var ye=v((el,fr)=>{"use strict";var Ds=me(),ge=class extends Ds{constructor(e){super(e),this.type="comment"}};fr.exports=ge;ge.default=ge});var ve=v((tl,hr)=>{"use strict";var Us=me(),we=class extends Us{get variable(){return this.prop.startsWith("--")||this.prop[0]==="$"}constructor(e){e&&typeof e.value<"u"&&typeof e.value!="string"&&(e={...e,value:String(e.value)}),super(e),this.type="decl"}};hr.exports=we;we.default=we});var G=v((rl,Sr)=>{"use strict";var pr=ye(),dr=ve(),Bs=me(),{isClean:mr,my:gr}=De(),ct,yr,wr,ft;function vr(s){return s.map(e=>(e.nodes&&(e.nodes=vr(e.nodes)),delete e.source,e))}function xr(s){if(s[mr]=!1,s.proxyOf.nodes)for(let e of s.proxyOf.nodes)xr(e)}var T=class s extends Bs{get first(){if(this.proxyOf.nodes)return this.proxyOf.nodes[0]}get last(){if(this.proxyOf.nodes)return this.proxyOf.nodes[this.proxyOf.nodes.length-1]}append(...e){for(let t of e){let r=this.normalize(t,this.last);for(let n of r)this.proxyOf.nodes.push(n)}return this.markDirty(),this}cleanRaws(e){if(super.cleanRaws(e),this.nodes)for(let t of this.nodes)t.cleanRaws(e)}each(e){if(!this.proxyOf.nodes)return;let t=this.getIterator(),r,n;for(;this.indexes[t]<this.proxyOf.nodes.length&&(r=this.indexes[t],n=e(this.proxyOf.nodes[r],r),n!==!1);)this.indexes[t]+=1;return delete this.indexes[t],n}every(e){return this.nodes.every(e)}getIterator(){this.lastEach||(this.lastEach=0),this.indexes||(this.indexes={}),this.lastEach+=1;let e=this.lastEach;return this.indexes[e]=0,e}getProxyProcessor(){return{get(e,t){return t==="proxyOf"?e:e[t]?t==="each"||typeof t=="string"&&t.startsWith("walk")?(...r)=>e[t](...r.map(n=>typeof n=="function"?(i,l)=>n(i.toProxy(),l):n)):t==="every"||t==="some"?r=>e[t]((n,...i)=>r(n.toProxy(),...i)):t==="root"?()=>e.root().toProxy():t==="nodes"?e.nodes.map(r=>r.toProxy()):t==="first"||t==="last"?e[t].toProxy():e[t]:e[t]},set(e,t,r){return e[t]===r||(e[t]=r,(t==="name"||t==="params"||t==="selector")&&e.markDirty()),!0}}}index(e){return typeof e=="number"?e:(e.proxyOf&&(e=e.proxyOf),this.proxyOf.nodes.indexOf(e))}insertAfter(e,t){let r=this.index(e),n=this.normalize(t,this.proxyOf.nodes[r]).reverse();r=this.index(e);for(let l of n)this.proxyOf.nodes.splice(r+1,0,l);let i;for(let l in this.indexes)i=this.indexes[l],r<i&&(this.indexes[l]=i+n.length);return this.markDirty(),this}insertBefore(e,t){let r=this.index(e),n=r===0?"prepend":!1,i=this.normalize(t,this.proxyOf.nodes[r],n).reverse();r=this.index(e);for(let a of i)this.proxyOf.nodes.splice(r,0,a);let l;for(let a in this.indexes)l=this.indexes[a],r<=l&&(this.indexes[a]=l+i.length);return this.markDirty(),this}normalize(e,t){if(typeof e=="string")e=vr(yr(e).nodes);else if(typeof e>"u")e=[];else if(Array.isArray(e)){e=e.slice(0);for(let n of e)n.parent&&n.parent.removeChild(n,"ignore")}else if(e.type==="root"&&this.type!=="document"){e=e.nodes.slice(0);for(let n of e)n.parent&&n.parent.removeChild(n,"ignore")}else if(e.type)e=[e];else if(e.prop){if(typeof e.value>"u")throw new Error("Value field is missed in node creation");typeof e.value!="string"&&(e.value=String(e.value)),e=[new dr(e)]}else if(e.selector||e.selectors)e=[new ft(e)];else if(e.name)e=[new ct(e)];else if(e.text)e=[new pr(e)];else throw new Error("Unknown node type in node creation");return e.map(n=>(n[gr]||s.rebuild(n),n=n.proxyOf,n.parent&&n.parent.removeChild(n),n[mr]&&xr(n),n.raws||(n.raws={}),typeof n.raws.before>"u"&&t&&typeof t.raws.before<"u"&&(n.raws.before=t.raws.before.replace(/\S/g,"")),n.parent=this.proxyOf,n))}prepend(...e){e=e.reverse();for(let t of e){let r=this.normalize(t,this.first,"prepend").reverse();for(let n of r)this.proxyOf.nodes.unshift(n);for(let n in this.indexes)this.indexes[n]=this.indexes[n]+r.length}return this.markDirty(),this}push(e){return e.parent=this,this.proxyOf.nodes.push(e),this}removeAll(){for(let e of this.proxyOf.nodes)e.parent=void 0;return this.proxyOf.nodes=[],this.markDirty(),this}removeChild(e){e=this.index(e),this.proxyOf.nodes[e].parent=void 0,this.proxyOf.nodes.splice(e,1);let t;for(let r in this.indexes)t=this.indexes[r],t>=e&&(this.indexes[r]=t-1);return this.markDirty(),this}replaceValues(e,t,r){return r||(r=t,t={}),this.walkDecls(n=>{t.props&&!t.props.includes(n.prop)||t.fast&&!n.value.includes(t.fast)||(n.value=n.value.replace(e,r))}),this.markDirty(),this}some(e){return this.nodes.some(e)}walk(e){return this.each((t,r)=>{let n;try{n=e(t,r)}catch(i){throw t.addToError(i)}return n!==!1&&t.walk&&(n=t.walk(e)),n})}walkAtRules(e,t){return t?e instanceof RegExp?this.walk((r,n)=>{if(r.type==="atrule"&&e.test(r.name))return t(r,n)}):this.walk((r,n)=>{if(r.type==="atrule"&&r.name===e)return t(r,n)}):(t=e,this.walk((r,n)=>{if(r.type==="atrule")return t(r,n)}))}walkComments(e){return this.walk((t,r)=>{if(t.type==="comment")return e(t,r)})}walkDecls(e,t){return t?e instanceof RegExp?this.walk((r,n)=>{if(r.type==="decl"&&e.test(r.prop))return t(r,n)}):this.walk((r,n)=>{if(r.type==="decl"&&r.prop===e)return t(r,n)}):(t=e,this.walk((r,n)=>{if(r.type==="decl")return t(r,n)}))}walkRules(e,t){return t?e instanceof RegExp?this.walk((r,n)=>{if(r.type==="rule"&&e.test(r.selector))return t(r,n)}):this.walk((r,n)=>{if(r.type==="rule"&&r.selector===e)return t(r,n)}):(t=e,this.walk((r,n)=>{if(r.type==="rule")return t(r,n)}))}};T.registerParse=s=>{yr=s};T.registerRule=s=>{ft=s};T.registerAtRule=s=>{ct=s};T.registerRoot=s=>{wr=s};Sr.exports=T;T.default=T;T.rebuild=s=>{s.type==="atrule"?Object.setPrototypeOf(s,ct.prototype):s.type==="rule"?Object.setPrototypeOf(s,ft.prototype):s.type==="decl"?Object.setPrototypeOf(s,dr.prototype):s.type==="comment"?Object.setPrototypeOf(s,pr.prototype):s.type==="root"&&Object.setPrototypeOf(s,wr.prototype),s[gr]=!0,s.nodes&&s.nodes.forEach(e=>{T.rebuild(e)})}});var Ue=v((nl,Cr)=>{"use strict";var br=G(),Z=class extends br{constructor(e){super(e),this.type="atrule"}append(...e){return this.proxyOf.nodes||(this.nodes=[]),super.append(...e)}prepend(...e){return this.proxyOf.nodes||(this.nodes=[]),super.prepend(...e)}};Cr.exports=Z;Z.default=Z;br.registerAtRule(Z)});var Be=v((sl,Or)=>{"use strict";var Fs=G(),_r,Er,H=class extends Fs{constructor(e){super({type:"document",...e}),this.nodes||(this.nodes=[])}toResult(e={}){return new _r(new Er,this,e).stringify()}};H.registerLazyResult=s=>{_r=s};H.registerProcessor=s=>{Er=s};Or.exports=H;H.default=H});var Lr=v((il,Ar)=>{var zs="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",js=(s,e=21)=>(t=e)=>{let r="",n=t|0;for(;n--;)r+=s[Math.random()*s.length|0];return r},Gs=(s=21)=>{let e="",t=s|0;for(;t--;)e+=zs[Math.random()*64|0];return e};Ar.exports={nanoid:Gs,customAlphabet:js}});var Rr=v(ht=>{var Mr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");ht.encode=function(s){if(0<=s&&s<Mr.length)return Mr[s];throw new TypeError("Must be between 0 and 63: "+s)};ht.decode=function(s){var e=65,t=90,r=97,n=122,i=48,l=57,a=43,o=47,u=26,c=52;return e<=s&&s<=t?s-e:r<=s&&s<=n?s-r+u:i<=s&&s<=l?s-i+c:s==a?62:s==o?63:-1}});var mt=v(dt=>{var $r=Rr(),pt=5,Pr=1<<pt,Ir=Pr-1,Nr=Pr;function Vs(s){return s<0?(-s<<1)+1:(s<<1)+0}function Ws(s){var e=(s&1)===1,t=s>>1;return e?-t:t}dt.encode=function(e){var t="",r,n=Vs(e);do r=n&Ir,n>>>=pt,n>0&&(r|=Nr),t+=$r.encode(r);while(n>0);return t};dt.decode=function(e,t,r){var n=e.length,i=0,l=0,a,o;do{if(t>=n)throw new Error("Expected more digits in base 64 VLQ value.");if(o=$r.decode(e.charCodeAt(t++)),o===-1)throw new Error("Invalid base64 digit: "+e.charAt(t-1));a=!!(o&Nr),o&=Ir,i=i+(o<<l),l+=pt}while(a);r.value=Ws(i),r.rest=t}});var te=v(M=>{function Ks(s,e,t){if(e in s)return s[e];if(arguments.length===3)return t;throw new Error('"'+e+'" is a required argument.')}M.getArg=Ks;var kr=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,Hs=/^data:.+\,.+$/;function xe(s){var e=s.match(kr);return e?{scheme:e[1],auth:e[2],host:e[3],port:e[4],path:e[5]}:null}M.urlParse=xe;function ee(s){var e="";return s.scheme&&(e+=s.scheme+":"),e+="//",s.auth&&(e+=s.auth+"@"),s.host&&(e+=s.host),s.port&&(e+=":"+s.port),s.path&&(e+=s.path),e}M.urlGenerate=ee;var Qs=32;function Js(s){var e=[];return function(t){for(var r=0;r<e.length;r++)if(e[r].input===t){var n=e[0];return e[0]=e[r],e[r]=n,e[0].result}var i=s(t);return e.unshift({input:t,result:i}),e.length>Qs&&e.pop(),i}}var gt=Js(function(e){var t=e,r=xe(e);if(r){if(!r.path)return e;t=r.path}for(var n=M.isAbsolute(t),i=[],l=0,a=0;;)if(l=a,a=t.indexOf("/",l),a===-1){i.push(t.slice(l));break}else for(i.push(t.slice(l,a));a<t.length&&t[a]==="/";)a++;for(var o,u=0,a=i.length-1;a>=0;a--)o=i[a],o==="."?i.splice(a,1):o===".."?u++:u>0&&(o===""?(i.splice(a+1,u),u=0):(i.splice(a,2),u--));return t=i.join("/"),t===""&&(t=n?"/":"."),r?(r.path=t,ee(r)):t});M.normalize=gt;function qr(s,e){s===""&&(s="."),e===""&&(e=".");var t=xe(e),r=xe(s);if(r&&(s=r.path||"/"),t&&!t.scheme)return r&&(t.scheme=r.scheme),ee(t);if(t||e.match(Hs))return e;if(r&&!r.host&&!r.path)return r.host=e,ee(r);var n=e.charAt(0)==="/"?e:gt(s.replace(/\/+$/,"")+"/"+e);return r?(r.path=n,ee(r)):n}M.join=qr;M.isAbsolute=function(s){return s.charAt(0)==="/"||kr.test(s)};function Ys(s,e){s===""&&(s="."),s=s.replace(/\/$/,"");for(var t=0;e.indexOf(s+"/")!==0;){var r=s.lastIndexOf("/");if(r<0||(s=s.slice(0,r),s.match(/^([^\/]+:\/)?\/*$/)))return e;++t}return Array(t+1).join("../")+e.substr(s.length+1)}M.relative=Ys;var Tr=(function(){var s=Object.create(null);return!("__proto__"in s)})();function Dr(s){return s}function Xs(s){return Ur(s)?"$"+s:s}M.toSetString=Tr?Dr:Xs;function Zs(s){return Ur(s)?s.slice(1):s}M.fromSetString=Tr?Dr:Zs;function Ur(s){if(!s)return!1;var e=s.length;if(e<9||s.charCodeAt(e-1)!==95||s.charCodeAt(e-2)!==95||s.charCodeAt(e-3)!==111||s.charCodeAt(e-4)!==116||s.charCodeAt(e-5)!==111||s.charCodeAt(e-6)!==114||s.charCodeAt(e-7)!==112||s.charCodeAt(e-8)!==95||s.charCodeAt(e-9)!==95)return!1;for(var t=e-10;t>=0;t--)if(s.charCodeAt(t)!==36)return!1;return!0}function ei(s,e,t){var r=F(s.source,e.source);return r!==0||(r=s.originalLine-e.originalLine,r!==0)||(r=s.originalColumn-e.originalColumn,r!==0||t)||(r=s.generatedColumn-e.generatedColumn,r!==0)||(r=s.generatedLine-e.generatedLine,r!==0)?r:F(s.name,e.name)}M.compareByOriginalPositions=ei;function ti(s,e,t){var r;return r=s.originalLine-e.originalLine,r!==0||(r=s.originalColumn-e.originalColumn,r!==0||t)||(r=s.generatedColumn-e.generatedColumn,r!==0)||(r=s.generatedLine-e.generatedLine,r!==0)?r:F(s.name,e.name)}M.compareByOriginalPositionsNoSource=ti;function ri(s,e,t){var r=s.generatedLine-e.generatedLine;return r!==0||(r=s.generatedColumn-e.generatedColumn,r!==0||t)||(r=F(s.source,e.source),r!==0)||(r=s.originalLine-e.originalLine,r!==0)||(r=s.originalColumn-e.originalColumn,r!==0)?r:F(s.name,e.name)}M.compareByGeneratedPositionsDeflated=ri;function ni(s,e,t){var r=s.generatedColumn-e.generatedColumn;return r!==0||t||(r=F(s.source,e.source),r!==0)||(r=s.originalLine-e.originalLine,r!==0)||(r=s.originalColumn-e.originalColumn,r!==0)?r:F(s.name,e.name)}M.compareByGeneratedPositionsDeflatedNoLine=ni;function F(s,e){return s===e?0:s===null?1:e===null?-1:s>e?1:-1}function si(s,e){var t=s.generatedLine-e.generatedLine;return t!==0||(t=s.generatedColumn-e.generatedColumn,t!==0)||(t=F(s.source,e.source),t!==0)||(t=s.originalLine-e.originalLine,t!==0)||(t=s.originalColumn-e.originalColumn,t!==0)?t:F(s.name,e.name)}M.compareByGeneratedPositionsInflated=si;function ii(s){return JSON.parse(s.replace(/^\)]}'[^\n]*\n/,""))}M.parseSourceMapInput=ii;function oi(s,e,t){if(e=e||"",s&&(s[s.length-1]!=="/"&&e[0]!=="/"&&(s+="/"),e=s+e),t){var r=xe(t);if(!r)throw new Error("sourceMapURL could not be parsed");if(r.path){var n=r.path.lastIndexOf("/");n>=0&&(r.path=r.path.substring(0,n+1))}e=qr(ee(r),e)}return gt(e)}M.computeSourceURL=oi});var vt=v(Br=>{var yt=te(),wt=Object.prototype.hasOwnProperty,Q=typeof Map<"u";function z(){this._array=[],this._set=Q?new Map:Object.create(null)}z.fromArray=function(e,t){for(var r=new z,n=0,i=e.length;n<i;n++)r.add(e[n],t);return r};z.prototype.size=function(){return Q?this._set.size:Object.getOwnPropertyNames(this._set).length};z.prototype.add=function(e,t){var r=Q?e:yt.toSetString(e),n=Q?this.has(e):wt.call(this._set,r),i=this._array.length;(!n||t)&&this._array.push(e),n||(Q?this._set.set(e,i):this._set[r]=i)};z.prototype.has=function(e){if(Q)return this._set.has(e);var t=yt.toSetString(e);return wt.call(this._set,t)};z.prototype.indexOf=function(e){if(Q){var t=this._set.get(e);if(t>=0)return t}else{var r=yt.toSetString(e);if(wt.call(this._set,r))return this._set[r]}throw new Error('"'+e+'" is not in the set.')};z.prototype.at=function(e){if(e>=0&&e<this._array.length)return this._array[e];throw new Error("No element indexed by "+e)};z.prototype.toArray=function(){return this._array.slice()};Br.ArraySet=z});var jr=v(zr=>{var Fr=te();function li(s,e){var t=s.generatedLine,r=e.generatedLine,n=s.generatedColumn,i=e.generatedColumn;return r>t||r==t&&i>=n||Fr.compareByGeneratedPositionsInflated(s,e)<=0}function Fe(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}Fe.prototype.unsortedForEach=function(e,t){this._array.forEach(e,t)};Fe.prototype.add=function(e){li(this._last,e)?(this._last=e,this._array.push(e)):(this._sorted=!1,this._array.push(e))};Fe.prototype.toArray=function(){return this._sorted||(this._array.sort(Fr.compareByGeneratedPositionsInflated),this._sorted=!0),this._array};zr.MappingList=Fe});var xt=v(Gr=>{var Se=mt(),A=te(),ze=vt().ArraySet,ai=jr().MappingList;function k(s){s||(s={}),this._file=A.getArg(s,"file",null),this._sourceRoot=A.getArg(s,"sourceRoot",null),this._skipValidation=A.getArg(s,"skipValidation",!1),this._ignoreInvalidMapping=A.getArg(s,"ignoreInvalidMapping",!1),this._sources=new ze,this._names=new ze,this._mappings=new ai,this._sourcesContents=null}k.prototype._version=3;k.fromSourceMap=function(e,t){var r=e.sourceRoot,n=new k(Object.assign(t||{},{file:e.file,sourceRoot:r}));return e.eachMapping(function(i){var l={generated:{line:i.generatedLine,column:i.generatedColumn}};i.source!=null&&(l.source=i.source,r!=null&&(l.source=A.relative(r,l.source)),l.original={line:i.originalLine,column:i.originalColumn},i.name!=null&&(l.name=i.name)),n.addMapping(l)}),e.sources.forEach(function(i){var l=i;r!==null&&(l=A.relative(r,i)),n._sources.has(l)||n._sources.add(l);var a=e.sourceContentFor(i);a!=null&&n.setSourceContent(i,a)}),n};k.prototype.addMapping=function(e){var t=A.getArg(e,"generated"),r=A.getArg(e,"original",null),n=A.getArg(e,"source",null),i=A.getArg(e,"name",null);!this._skipValidation&&this._validateMapping(t,r,n,i)===!1||(n!=null&&(n=String(n),this._sources.has(n)||this._sources.add(n)),i!=null&&(i=String(i),this._names.has(i)||this._names.add(i)),this._mappings.add({generatedLine:t.line,generatedColumn:t.column,originalLine:r!=null&&r.line,originalColumn:r!=null&&r.column,source:n,name:i}))};k.prototype.setSourceContent=function(e,t){var r=e;this._sourceRoot!=null&&(r=A.relative(this._sourceRoot,r)),t!=null?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[A.toSetString(r)]=t):this._sourcesContents&&(delete this._sourcesContents[A.toSetString(r)],Object.keys(this._sourcesContents).length===0&&(this._sourcesContents=null))};k.prototype.applySourceMap=function(e,t,r){var n=t;if(t==null){if(e.file==null)throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);n=e.file}var i=this._sourceRoot;i!=null&&(n=A.relative(i,n));var l=new ze,a=new ze;this._mappings.unsortedForEach(function(o){if(o.source===n&&o.originalLine!=null){var u=e.originalPositionFor({line:o.originalLine,column:o.originalColumn});u.source!=null&&(o.source=u.source,r!=null&&(o.source=A.join(r,o.source)),i!=null&&(o.source=A.relative(i,o.source)),o.originalLine=u.line,o.originalColumn=u.column,u.name!=null&&(o.name=u.name))}var c=o.source;c!=null&&!l.has(c)&&l.add(c);var p=o.name;p!=null&&!a.has(p)&&a.add(p)},this),this._sources=l,this._names=a,e.sources.forEach(function(o){var u=e.sourceContentFor(o);u!=null&&(r!=null&&(o=A.join(r,o)),i!=null&&(o=A.relative(i,o)),this.setSourceContent(o,u))},this)};k.prototype._validateMapping=function(e,t,r,n){if(t&&typeof t.line!="number"&&typeof t.column!="number"){var i="original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(i),!1;throw new Error(i)}if(!(e&&"line"in e&&"column"in e&&e.line>0&&e.column>=0&&!t&&!r&&!n)){if(e&&"line"in e&&"column"in e&&t&&"line"in t&&"column"in t&&e.line>0&&e.column>=0&&t.line>0&&t.column>=0&&r)return;var i="Invalid mapping: "+JSON.stringify({generated:e,source:r,original:t,name:n});if(this._ignoreInvalidMapping)return typeof console<"u"&&console.warn&&console.warn(i),!1;throw new Error(i)}};k.prototype._serializeMappings=function(){for(var e=0,t=1,r=0,n=0,i=0,l=0,a="",o,u,c,p,f=this._mappings.toArray(),h=0,d=f.length;h<d;h++){if(u=f[h],o="",u.generatedLine!==t)for(e=0;u.generatedLine!==t;)o+=";",t++;else if(h>0){if(!A.compareByGeneratedPositionsInflated(u,f[h-1]))continue;o+=","}o+=Se.encode(u.generatedColumn-e),e=u.generatedColumn,u.source!=null&&(p=this._sources.indexOf(u.source),o+=Se.encode(p-l),l=p,o+=Se.encode(u.originalLine-1-n),n=u.originalLine-1,o+=Se.encode(u.originalColumn-r),r=u.originalColumn,u.name!=null&&(c=this._names.indexOf(u.name),o+=Se.encode(c-i),i=c)),a+=o}return a};k.prototype._generateSourcesContent=function(e,t){return e.map(function(r){if(!this._sourcesContents)return null;t!=null&&(r=A.relative(t,r));var n=A.toSetString(r);return Object.prototype.hasOwnProperty.call(this._sourcesContents,n)?this._sourcesContents[n]:null},this)};k.prototype.toJSON=function(){var e={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return this._file!=null&&(e.file=this._file),this._sourceRoot!=null&&(e.sourceRoot=this._sourceRoot),this._sourcesContents&&(e.sourcesContent=this._generateSourcesContent(e.sources,e.sourceRoot)),e};k.prototype.toString=function(){return JSON.stringify(this.toJSON())};Gr.SourceMapGenerator=k});var Vr=v(J=>{J.GREATEST_LOWER_BOUND=1;J.LEAST_UPPER_BOUND=2;function St(s,e,t,r,n,i){var l=Math.floor((e-s)/2)+s,a=n(t,r[l],!0);return a===0?l:a>0?e-l>1?St(l,e,t,r,n,i):i==J.LEAST_UPPER_BOUND?e<r.length?e:-1:l:l-s>1?St(s,l,t,r,n,i):i==J.LEAST_UPPER_BOUND?l:s<0?-1:s}J.search=function(e,t,r,n){if(t.length===0)return-1;var i=St(-1,t.length,e,t,r,n||J.GREATEST_LOWER_BOUND);if(i<0)return-1;for(;i-1>=0&&r(t[i],t[i-1],!0)===0;)--i;return i}});var Hr=v(Kr=>{function ui(s){function e(n,i,l){var a=n[i];n[i]=n[l],n[l]=a}function t(n,i){return Math.round(n+Math.random()*(i-n))}function r(n,i,l,a){if(l<a){var o=t(l,a),u=l-1;e(n,o,a);for(var c=n[a],p=l;p<a;p++)i(n[p],c,!1)<=0&&(u+=1,e(n,u,p));e(n,u+1,p);var f=u+1;r(n,i,l,f-1),r(n,i,f+1,a)}}return r}function ci(s){let e=ui.toString();return new Function(`return ${e}`)()(s)}var Wr=new WeakMap;Kr.quickSort=function(s,e,t=0){let r=Wr.get(e);r===void 0&&(r=ci(e),Wr.set(e,r)),r(s,e,t,s.length-1)}});var Yr=v(je=>{var g=te(),Ct=Vr(),re=vt().ArraySet,fi=mt(),be=Hr().quickSort;function _(s,e){var t=s;return typeof s=="string"&&(t=g.parseSourceMapInput(s)),t.sections!=null?new D(t,e):new R(t,e)}_.fromSourceMap=function(s,e){return R.fromSourceMap(s,e)};_.prototype._version=3;_.prototype.__generatedMappings=null;Object.defineProperty(_.prototype,"_generatedMappings",{configurable:!0,enumerable:!0,get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}});_.prototype.__originalMappings=null;Object.defineProperty(_.prototype,"_originalMappings",{configurable:!0,enumerable:!0,get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}});_.prototype._charIsMappingSeparator=function(e,t){var r=e.charAt(t);return r===";"||r===","};_.prototype._parseMappings=function(e,t){throw new Error("Subclasses must implement _parseMappings")};_.GENERATED_ORDER=1;_.ORIGINAL_ORDER=2;_.GREATEST_LOWER_BOUND=1;_.LEAST_UPPER_BOUND=2;_.prototype.eachMapping=function(e,t,r){var n=t||null,i=r||_.GENERATED_ORDER,l;switch(i){case _.GENERATED_ORDER:l=this._generatedMappings;break;case _.ORIGINAL_ORDER:l=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}for(var a=this.sourceRoot,o=e.bind(n),u=this._names,c=this._sources,p=this._sourceMapURL,f=0,h=l.length;f<h;f++){var d=l[f],y=d.source===null?null:c.at(d.source);y!==null&&(y=g.computeSourceURL(a,y,p)),o({source:y,generatedLine:d.generatedLine,generatedColumn:d.generatedColumn,originalLine:d.originalLine,originalColumn:d.originalColumn,name:d.name===null?null:u.at(d.name)})}};_.prototype.allGeneratedPositionsFor=function(e){var t=g.getArg(e,"line"),r={source:g.getArg(e,"source"),originalLine:t,originalColumn:g.getArg(e,"column",0)};if(r.source=this._findSourceIndex(r.source),r.source<0)return[];var n=[],i=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",g.compareByOriginalPositions,Ct.LEAST_UPPER_BOUND);if(i>=0){var l=this._originalMappings[i];if(e.column===void 0)for(var a=l.originalLine;l&&l.originalLine===a;)n.push({line:g.getArg(l,"generatedLine",null),column:g.getArg(l,"generatedColumn",null),lastColumn:g.getArg(l,"lastGeneratedColumn",null)}),l=this._originalMappings[++i];else for(var o=l.originalColumn;l&&l.originalLine===t&&l.originalColumn==o;)n.push({line:g.getArg(l,"generatedLine",null),column:g.getArg(l,"generatedColumn",null),lastColumn:g.getArg(l,"lastGeneratedColumn",null)}),l=this._originalMappings[++i]}return n};je.SourceMapConsumer=_;function R(s,e){var t=s;typeof s=="string"&&(t=g.parseSourceMapInput(s));var r=g.getArg(t,"version"),n=g.getArg(t,"sources"),i=g.getArg(t,"names",[]),l=g.getArg(t,"sourceRoot",null),a=g.getArg(t,"sourcesContent",null),o=g.getArg(t,"mappings"),u=g.getArg(t,"file",null);if(r!=this._version)throw new Error("Unsupported version: "+r);l&&(l=g.normalize(l)),n=n.map(String).map(g.normalize).map(function(c){return l&&g.isAbsolute(l)&&g.isAbsolute(c)?g.relative(l,c):c}),this._names=re.fromArray(i.map(String),!0),this._sources=re.fromArray(n,!0),this._absoluteSources=this._sources.toArray().map(function(c){return g.computeSourceURL(l,c,e)}),this.sourceRoot=l,this.sourcesContent=a,this._mappings=o,this._sourceMapURL=e,this.file=u}R.prototype=Object.create(_.prototype);R.prototype.consumer=_;R.prototype._findSourceIndex=function(s){var e=s;if(this.sourceRoot!=null&&(e=g.relative(this.sourceRoot,e)),this._sources.has(e))return this._sources.indexOf(e);var t;for(t=0;t<this._absoluteSources.length;++t)if(this._absoluteSources[t]==s)return t;return-1};R.fromSourceMap=function(e,t){var r=Object.create(R.prototype),n=r._names=re.fromArray(e._names.toArray(),!0),i=r._sources=re.fromArray(e._sources.toArray(),!0);r.sourceRoot=e._sourceRoot,r.sourcesContent=e._generateSourcesContent(r._sources.toArray(),r.sourceRoot),r.file=e._file,r._sourceMapURL=t,r._absoluteSources=r._sources.toArray().map(function(h){return g.computeSourceURL(r.sourceRoot,h,t)});for(var l=e._mappings.toArray().slice(),a=r.__generatedMappings=[],o=r.__originalMappings=[],u=0,c=l.length;u<c;u++){var p=l[u],f=new Jr;f.generatedLine=p.generatedLine,f.generatedColumn=p.generatedColumn,p.source&&(f.source=i.indexOf(p.source),f.originalLine=p.originalLine,f.originalColumn=p.originalColumn,p.name&&(f.name=n.indexOf(p.name)),o.push(f)),a.push(f)}return be(r.__originalMappings,g.compareByOriginalPositions),r};R.prototype._version=3;Object.defineProperty(R.prototype,"sources",{get:function(){return this._absoluteSources.slice()}});function Jr(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}var bt=g.compareByGeneratedPositionsDeflatedNoLine;function Qr(s,e){let t=s.length,r=s.length-e;if(!(r<=1))if(r==2){let n=s[e],i=s[e+1];bt(n,i)>0&&(s[e]=i,s[e+1]=n)}else if(r<20)for(let n=e;n<t;n++)for(let i=n;i>e;i--){let l=s[i-1],a=s[i];if(bt(l,a)<=0)break;s[i-1]=a,s[i]=l}else be(s,bt,e)}R.prototype._parseMappings=function(e,t){var r=1,n=0,i=0,l=0,a=0,o=0,u=e.length,c=0,p={},f={},h=[],d=[],y,m,S,w,L;let N=0;for(;c<u;)if(e.charAt(c)===";")r++,c++,n=0,Qr(d,N),N=d.length;else if(e.charAt(c)===",")c++;else{for(y=new Jr,y.generatedLine=r,w=c;w<u&&!this._charIsMappingSeparator(e,w);w++);for(m=e.slice(c,w),S=[];c<w;)fi.decode(e,c,f),L=f.value,c=f.rest,S.push(L);if(S.length===2)throw new Error("Found a source, but no line and column");if(S.length===3)throw new Error("Found a source and line, but no column");if(y.generatedColumn=n+S[0],n=y.generatedColumn,S.length>1&&(y.source=a+S[1],a+=S[1],y.originalLine=i+S[2],i=y.originalLine,y.originalLine+=1,y.originalColumn=l+S[3],l=y.originalColumn,S.length>4&&(y.name=o+S[4],o+=S[4])),d.push(y),typeof y.originalLine=="number"){let E=y.source;for(;h.length<=E;)h.push(null);h[E]===null&&(h[E]=[]),h[E].push(y)}}Qr(d,N),this.__generatedMappings=d;for(var O=0;O<h.length;O++)h[O]!=null&&be(h[O],g.compareByOriginalPositionsNoSource);this.__originalMappings=[].concat(...h)};R.prototype._findMapping=function(e,t,r,n,i,l){if(e[r]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+e[r]);if(e[n]<0)throw new TypeError("Column must be greater than or equal to 0, got "+e[n]);return Ct.search(e,t,i,l)};R.prototype.computeColumnSpans=function(){for(var e=0;e<this._generatedMappings.length;++e){var t=this._generatedMappings[e];if(e+1<this._generatedMappings.length){var r=this._generatedMappings[e+1];if(t.generatedLine===r.generatedLine){t.lastGeneratedColumn=r.generatedColumn-1;continue}}t.lastGeneratedColumn=1/0}};R.prototype.originalPositionFor=function(e){var t={generatedLine:g.getArg(e,"line"),generatedColumn:g.getArg(e,"column")},r=this._findMapping(t,this._generatedMappings,"generatedLine","generatedColumn",g.compareByGeneratedPositionsDeflated,g.getArg(e,"bias",_.GREATEST_LOWER_BOUND));if(r>=0){var n=this._generatedMappings[r];if(n.generatedLine===t.generatedLine){var i=g.getArg(n,"source",null);i!==null&&(i=this._sources.at(i),i=g.computeSourceURL(this.sourceRoot,i,this._sourceMapURL));var l=g.getArg(n,"name",null);return l!==null&&(l=this._names.at(l)),{source:i,line:g.getArg(n,"originalLine",null),column:g.getArg(n,"originalColumn",null),name:l}}}return{source:null,line:null,column:null,name:null}};R.prototype.hasContentsOfAllSources=function(){return this.sourcesContent?this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(e){return e==null}):!1};R.prototype.sourceContentFor=function(e,t){if(!this.sourcesContent)return null;var r=this._findSourceIndex(e);if(r>=0)return this.sourcesContent[r];var n=e;this.sourceRoot!=null&&(n=g.relative(this.sourceRoot,n));var i;if(this.sourceRoot!=null&&(i=g.urlParse(this.sourceRoot))){var l=n.replace(/^file:\/\//,"");if(i.scheme=="file"&&this._sources.has(l))return this.sourcesContent[this._sources.indexOf(l)];if((!i.path||i.path=="/")&&this._sources.has("/"+n))return this.sourcesContent[this._sources.indexOf("/"+n)]}if(t)return null;throw new Error('"'+n+'" is not in the SourceMap.')};R.prototype.generatedPositionFor=function(e){var t=g.getArg(e,"source");if(t=this._findSourceIndex(t),t<0)return{line:null,column:null,lastColumn:null};var r={source:t,originalLine:g.getArg(e,"line"),originalColumn:g.getArg(e,"column")},n=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",g.compareByOriginalPositions,g.getArg(e,"bias",_.GREATEST_LOWER_BOUND));if(n>=0){var i=this._originalMappings[n];if(i.source===r.source)return{line:g.getArg(i,"generatedLine",null),column:g.getArg(i,"generatedColumn",null),lastColumn:g.getArg(i,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}};je.BasicSourceMapConsumer=R;function D(s,e){var t=s;typeof s=="string"&&(t=g.parseSourceMapInput(s));var r=g.getArg(t,"version"),n=g.getArg(t,"sections");if(r!=this._version)throw new Error("Unsupported version: "+r);this._sources=new re,this._names=new re;var i={line:-1,column:0};this._sections=n.map(function(l){if(l.url)throw new Error("Support for url field in sections not implemented.");var a=g.getArg(l,"offset"),o=g.getArg(a,"line"),u=g.getArg(a,"column");if(o<i.line||o===i.line&&u<i.column)throw new Error("Section offsets must be ordered and non-overlapping.");return i=a,{generatedOffset:{generatedLine:o+1,generatedColumn:u+1},consumer:new _(g.getArg(l,"map"),e)}})}D.prototype=Object.create(_.prototype);D.prototype.constructor=_;D.prototype._version=3;Object.defineProperty(D.prototype,"sources",{get:function(){for(var s=[],e=0;e<this._sections.length;e++)for(var t=0;t<this._sections[e].consumer.sources.length;t++)s.push(this._sections[e].consumer.sources[t]);return s}});D.prototype.originalPositionFor=function(e){var t={generatedLine:g.getArg(e,"line"),generatedColumn:g.getArg(e,"column")},r=Ct.search(t,this._sections,function(i,l){var a=i.generatedLine-l.generatedOffset.generatedLine;return a||i.generatedColumn-l.generatedOffset.generatedColumn}),n=this._sections[r];return n?n.consumer.originalPositionFor({line:t.generatedLine-(n.generatedOffset.generatedLine-1),column:t.generatedColumn-(n.generatedOffset.generatedLine===t.generatedLine?n.generatedOffset.generatedColumn-1:0),bias:e.bias}):{source:null,line:null,column:null,name:null}};D.prototype.hasContentsOfAllSources=function(){return this._sections.every(function(e){return e.consumer.hasContentsOfAllSources()})};D.prototype.sourceContentFor=function(e,t){for(var r=0;r<this._sections.length;r++){var n=this._sections[r],i=n.consumer.sourceContentFor(e,!0);if(i||i==="")return i}if(t)return null;throw new Error('"'+e+'" is not in the SourceMap.')};D.prototype.generatedPositionFor=function(e){for(var t=0;t<this._sections.length;t++){var r=this._sections[t];if(r.consumer._findSourceIndex(g.getArg(e,"source"))!==-1){var n=r.consumer.generatedPositionFor(e);if(n){var i={line:n.line+(r.generatedOffset.generatedLine-1),column:n.column+(r.generatedOffset.generatedLine===n.line?r.generatedOffset.generatedColumn-1:0)};return i}}}return{line:null,column:null}};D.prototype._parseMappings=function(e,t){this.__generatedMappings=[],this.__originalMappings=[];for(var r=0;r<this._sections.length;r++)for(var n=this._sections[r],i=n.consumer._generatedMappings,l=0;l<i.length;l++){var a=i[l],o=n.consumer._sources.at(a.source);o!==null&&(o=g.computeSourceURL(n.consumer.sourceRoot,o,this._sourceMapURL)),this._sources.add(o),o=this._sources.indexOf(o);var u=null;a.name&&(u=n.consumer._names.at(a.name),this._names.add(u),u=this._names.indexOf(u));var c={source:o,generatedLine:a.generatedLine+(n.generatedOffset.generatedLine-1),generatedColumn:a.generatedColumn+(n.generatedOffset.generatedLine===a.generatedLine?n.generatedOffset.generatedColumn-1:0),originalLine:a.originalLine,originalColumn:a.originalColumn,name:u};this.__generatedMappings.push(c),typeof c.originalLine=="number"&&this.__originalMappings.push(c)}be(this.__generatedMappings,g.compareByGeneratedPositionsDeflated),be(this.__originalMappings,g.compareByOriginalPositions)};je.IndexedSourceMapConsumer=D});var Zr=v(Xr=>{var hi=xt().SourceMapGenerator,Ge=te(),pi=/(\r?\n)/,di=10,ne="$$$isSourceNode$$$";function I(s,e,t,r,n){this.children=[],this.sourceContents={},this.line=s??null,this.column=e??null,this.source=t??null,this.name=n??null,this[ne]=!0,r!=null&&this.add(r)}I.fromStringWithSourceMap=function(e,t,r){var n=new I,i=e.split(pi),l=0,a=function(){var f=d(),h=d()||"";return f+h;function d(){return l<i.length?i[l++]:void 0}},o=1,u=0,c=null;return t.eachMapping(function(f){if(c!==null)if(o<f.generatedLine)p(c,a()),o++,u=0;else{var h=i[l]||"",d=h.substr(0,f.generatedColumn-u);i[l]=h.substr(f.generatedColumn-u),u=f.generatedColumn,p(c,d),c=f;return}for(;o<f.generatedLine;)n.add(a()),o++;if(u<f.generatedColumn){var h=i[l]||"";n.add(h.substr(0,f.generatedColumn)),i[l]=h.substr(f.generatedColumn),u=f.generatedColumn}c=f},this),l<i.length&&(c&&p(c,a()),n.add(i.splice(l).join(""))),t.sources.forEach(function(f){var h=t.sourceContentFor(f);h!=null&&(r!=null&&(f=Ge.join(r,f)),n.setSourceContent(f,h))}),n;function p(f,h){if(f===null||f.source===void 0)n.add(h);else{var d=r?Ge.join(r,f.source):f.source;n.add(new I(f.originalLine,f.originalColumn,d,h,f.name))}}};I.prototype.add=function(e){if(Array.isArray(e))e.forEach(function(t){this.add(t)},this);else if(e[ne]||typeof e=="string")e&&this.children.push(e);else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e);return this};I.prototype.prepend=function(e){if(Array.isArray(e))for(var t=e.length-1;t>=0;t--)this.prepend(e[t]);else if(e[ne]||typeof e=="string")this.children.unshift(e);else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e);return this};I.prototype.walk=function(e){for(var t,r=0,n=this.children.length;r<n;r++)t=this.children[r],t[ne]?t.walk(e):t!==""&&e(t,{source:this.source,line:this.line,column:this.column,name:this.name})};I.prototype.join=function(e){var t,r,n=this.children.length;if(n>0){for(t=[],r=0;r<n-1;r++)t.push(this.children[r]),t.push(e);t.push(this.children[r]),this.children=t}return this};I.prototype.replaceRight=function(e,t){var r=this.children[this.children.length-1];return r[ne]?r.replaceRight(e,t):typeof r=="string"?this.children[this.children.length-1]=r.replace(e,t):this.children.push("".replace(e,t)),this};I.prototype.setSourceContent=function(e,t){this.sourceContents[Ge.toSetString(e)]=t};I.prototype.walkSourceContents=function(e){for(var t=0,r=this.children.length;t<r;t++)this.children[t][ne]&&this.children[t].walkSourceContents(e);for(var n=Object.keys(this.sourceContents),t=0,r=n.length;t<r;t++)e(Ge.fromSetString(n[t]),this.sourceContents[n[t]])};I.prototype.toString=function(){var e="";return this.walk(function(t){e+=t}),e};I.prototype.toStringWithSourceMap=function(e){var t={code:"",line:1,column:0},r=new hi(e),n=!1,i=null,l=null,a=null,o=null;return this.walk(function(u,c){t.code+=u,c.source!==null&&c.line!==null&&c.column!==null?((i!==c.source||l!==c.line||a!==c.column||o!==c.name)&&r.addMapping({source:c.source,original:{line:c.line,column:c.column},generated:{line:t.line,column:t.column},name:c.name}),i=c.source,l=c.line,a=c.column,o=c.name,n=!0):n&&(r.addMapping({generated:{line:t.line,column:t.column}}),i=null,n=!1);for(var p=0,f=u.length;p<f;p++)u.charCodeAt(p)===di?(t.line++,t.column=0,p+1===f?(i=null,n=!1):n&&r.addMapping({source:c.source,original:{line:c.line,column:c.column},generated:{line:t.line,column:t.column},name:c.name})):t.column++}),this.walkSourceContents(function(u,c){r.setSourceContent(u,c)}),{code:t.code,map:r}};Xr.SourceNode=I});var We=v(Ve=>{Ve.SourceMapGenerator=xt().SourceMapGenerator;Ve.SourceMapConsumer=Yr().SourceMapConsumer;Ve.SourceNode=Zr().SourceNode});var Et=v((yl,rn)=>{"use strict";var{existsSync:mi,readFileSync:gi}=require("fs"),{dirname:_t,join:yi}=require("path"),{SourceMapConsumer:en,SourceMapGenerator:tn}=We();function wi(s){return Buffer?Buffer.from(s,"base64").toString():window.atob(s)}var Ce=class{constructor(e,t){if(t.map===!1)return;t.unsafeMap&&(this.unsafeMap=!0),this.loadAnnotation(e),this.inline=this.startWith(this.annotation,"data:");let r=t.map?t.map.prev:void 0,n=this.loadMap(t.from,r);!this.mapFile&&t.from&&(this.mapFile=t.from),this.mapFile&&(this.root=_t(this.mapFile)),n&&(this.text=n)}consumer(){return this.consumerCache||(this.consumerCache=new en(this.json||this.text)),this.consumerCache}decodeInline(e){let t=/^data:application\/json;charset=utf-?8;base64,/,r=/^data:application\/json;base64,/,n=/^data:application\/json;charset=utf-?8,/,i=/^data:application\/json,/,l=e.match(n)||e.match(i);if(l)return decodeURIComponent(e.substr(l[0].length));let a=e.match(t)||e.match(r);if(a)return wi(e.substr(a[0].length));let o=e.slice(22);throw o=o.slice(0,o.indexOf(",")),new Error("Unsupported source map encoding "+o)}getAnnotationURL(e){return e.replace(/^\/\*\s*# sourceMappingURL=/,"").trim()}isMap(e){return typeof e!="object"?!1:typeof e.mappings=="string"||typeof e._mappings=="string"||Array.isArray(e.sections)}loadAnnotation(e){let t=e.match(/\/\*\s*# sourceMappingURL=/g);if(!t)return;let r=e.lastIndexOf(t.pop()),n=e.indexOf("*/",r);r>-1&&n>-1&&(this.annotation=this.getAnnotationURL(e.substring(r,n)))}loadFile(e,t,r){if(!(!r&&!this.unsafeMap&&!/\.map$/i.test(e))&&(this.root=_t(e),mi(e)))return this.mapFile=e,gi(e,"utf-8").toString().trim()}loadMap(e,t){if(t===!1)return!1;if(t){if(typeof t=="string")return t;if(typeof t=="function"){let r=t(e);if(r){let n=this.loadFile(r,e,!0);if(!n)throw new Error("Unable to load previous source map: "+r.toString());return n}}else{if(t instanceof en)return tn.fromSourceMap(t).toString();if(t instanceof tn)return t.toString();if(this.isMap(t))return JSON.stringify(t);throw new Error("Unsupported previous source map format: "+t.toString())}}else{if(this.inline)return this.decodeInline(this.annotation);if(this.annotation){let r=this.annotation;e&&(r=yi(_t(e),r));let n=this.loadFile(r,e,!1);if(n)try{this.json=JSON.parse(n.replace(/^\)]}'[^\n]*\n/,""))}catch{return}return n}}}startWith(e,t){return e?e.substr(0,t.length)===t:!1}withContent(){return!!(this.consumer().sourcesContent&&this.consumer().sourcesContent.length>0)}};rn.exports=Ce;Ce.default=Ce});var _e=v((wl,an)=>{"use strict";var{nanoid:vi}=Lr(),{isAbsolute:Lt,resolve:Mt}=require("path"),{SourceMapConsumer:xi,SourceMapGenerator:Si}=We(),{fileURLToPath:nn,pathToFileURL:Ke}=require("url"),sn=Te(),bi=Et(),Ot=it(),At=Symbol("lineToIndexCache"),Ci=!!(xi&&Si),on=!!(Mt&&Lt);function ln(s){if(s[At])return s[At];let e=s.css.split(`
`),t=new Array(e.length),r=0;for(let n=0,i=e.length;n<i;n++)t[n]=r,r+=e[n].length+1;return s[At]=t,t}var se=class{get from(){return this.file||this.id}constructor(e,t={}){if(e===null||typeof e>"u"||typeof e=="object"&&!e.toString)throw new Error(`PostCSS received ${e} instead of CSS string`);if(this.css=e.toString(),this.css[0]==="\uFEFF"||this.css[0]==="\uFFFE"?(this.hasBOM=!0,this.css=this.css.slice(1)):this.hasBOM=!1,this.document=this.css,t.document&&(this.document=t.document.toString()),t.from&&(!on||/^\w+:\/\//.test(t.from)||Lt(t.from)?this.file=t.from:this.file=Mt(t.from)),on&&Ci){let r=new bi(this.css,t);if(r.text){this.map=r;let n=r.consumer().file;!this.file&&n&&(this.file=this.mapResolve(n))}}this.file||(this.id="<input css "+vi(6)+">"),this.map&&(this.map.file=this.from)}error(e,t,r,n={}){let i,l,a,o,u;if(t&&typeof t=="object"){let p=t,f=r;if(typeof p.offset=="number"){o=p.offset;let h=this.fromOffset(o);t=h.line,r=h.col}else t=p.line,r=p.column,o=this.fromLineAndColumn(t,r);if(typeof f.offset=="number"){a=f.offset;let h=this.fromOffset(a);l=h.line,i=h.col}else l=f.line,i=f.column,a=this.fromLineAndColumn(f.line,f.column)}else if(r)o=this.fromLineAndColumn(t,r);else{o=t;let p=this.fromOffset(o);t=p.line,r=p.col}let c=this.origin(t,r,l,i);return c?u=new sn(e,c.endLine===void 0?c.line:{column:c.column,line:c.line},c.endLine===void 0?c.column:{column:c.endColumn,line:c.endLine},c.source,c.file,n.plugin):u=new sn(e,l===void 0?t:{column:r,line:t},l===void 0?r:{column:i,line:l},this.css,this.file,n.plugin),u.input={column:r,endColumn:i,endLine:l,endOffset:a,line:t,offset:o,source:this.css},this.file&&(Ke&&(u.input.url=Ke(this.file).toString()),u.input.file=this.file),u}fromLineAndColumn(e,t){return ln(this)[e-1]+t-1}fromOffset(e){let t=ln(this),r=t[t.length-1],n=0;if(e>=r)n=t.length-1;else{let i=t.length-2,l;for(;n<i;)if(l=n+(i-n>>1),e<t[l])i=l-1;else if(e>=t[l+1])n=l+1;else{n=l;break}}return{col:e-t[n]+1,line:n+1}}mapResolve(e){return/^\w+:\/\//.test(e)?e:Mt(this.map.consumer().sourceRoot||this.map.root||".",e)}origin(e,t,r,n){if(!this.map)return!1;let i=this.map.consumer(),l=i.originalPositionFor({column:t,line:e});if(!l.source)return!1;let a;typeof r=="number"&&(a=i.originalPositionFor({column:n,line:r}));let o;Lt(l.source)?o=Ke(l.source):o=new URL(l.source,this.map.consumer().sourceRoot||Ke(this.map.mapFile));let u={column:l.column,endColumn:a&&a.column,endLine:a&&a.line,line:l.line,url:o.toString()};if(o.protocol==="file:")if(nn)u.file=nn(o);else throw new Error("file: protocol is not available in this PostCSS build");let c=i.sourceContentFor(l.source);return c&&(u.source=c),u}toJSON(){let e={};for(let t of["hasBOM","css","file","id"])this[t]!=null&&(e[t]=this[t]);return this.map&&(e.map={...this.map},e.map.consumerCache&&(e.map.consumerCache=void 0)),e}};an.exports=se;se.default=se;Ot&&Ot.registerInput&&Ot.registerInput(se)});var ie=v((vl,hn)=>{"use strict";var un=G(),cn,fn,V=class extends un{constructor(e){super(e),this.type="root",this.nodes||(this.nodes=[])}normalize(e,t,r){let n=super.normalize(e);if(t){if(r==="prepend")this.nodes.length>1?t.raws.before=this.nodes[1].raws.before:delete t.raws.before;else if(this.first!==t)for(let i of n)i.raws.before=t.raws.before}return n}removeChild(e,t){let r=this.index(e);return!t&&r===0&&this.nodes.length>1&&(this.nodes[1].raws.before=this.nodes[r].raws.before),super.removeChild(e)}toResult(e={}){return new cn(new fn,this,e).stringify()}};V.registerLazyResult=s=>{cn=s};V.registerProcessor=s=>{fn=s};hn.exports=V;V.default=V;un.registerRoot(V)});var Rt=v((xl,pn)=>{"use strict";var Ee={comma(s){return Ee.split(s,[","],!0)},space(s){let e=[" ",`
`,"	"];return Ee.split(s,e)},split(s,e,t){let r=[],n="",i=!1,l=0,a=!1,o="",u=!1;for(let c of s)u?u=!1:c==="\\"?u=!0:a?c===o&&(a=!1):c==='"'||c==="'"?(a=!0,o=c):c==="("?l+=1:c===")"?l>0&&(l-=1):l===0&&e.includes(c)&&(i=!0),i?(n!==""&&r.push(n.trim()),n="",i=!1):n+=c;return(t||n!=="")&&r.push(n.trim()),r}};pn.exports=Ee;Ee.default=Ee});var He=v((Sl,mn)=>{"use strict";var dn=G(),_i=Rt(),oe=class extends dn{get selectors(){return _i.comma(this.selector)}set selectors(e){let t=this.selector?this.selector.match(/,\s*/):null,r=t?t[0]:","+this.raw("between","beforeOpen");this.selector=e.join(r)}constructor(e){super(e),this.type="rule",this.nodes||(this.nodes=[])}};mn.exports=oe;oe.default=oe;dn.registerRule(oe)});var yn=v((bl,gn)=>{"use strict";var Ei=Ue(),Oi=ye(),Ai=ve(),Li=_e(),Mi=Et(),Ri=ie(),$i=He();function Oe(s,e){if(Array.isArray(s))return s.map(n=>Oe(n));let{inputs:t,...r}=s;if(t){e=[];for(let n of t){let i={...n,__proto__:Li.prototype};i.map&&(i.map={...i.map,__proto__:Mi.prototype}),e.push(i)}}if(r.nodes&&(r.nodes=s.nodes.map(n=>Oe(n,e))),r.source){let{inputId:n,...i}=r.source;r.source=i,n!=null&&(r.source.input=e[n])}if(r.type==="root")return new Ri(r);if(r.type==="decl")return new Ai(r);if(r.type==="rule")return new $i(r);if(r.type==="comment")return new Oi(r);if(r.type==="atrule")return new Ei(r);throw new Error("Unknown node type: "+s.type)}gn.exports=Oe;Oe.default=Oe});var Pt=v((Cl,Cn)=>{"use strict";var{dirname:Qe,relative:vn,resolve:xn,sep:Sn}=require("path"),{SourceMapConsumer:bn,SourceMapGenerator:Je}=We(),{pathToFileURL:wn}=require("url"),Pi=_e(),Ii=!!(bn&&Je),Ni=!!(Qe&&xn&&vn&&Sn),$t=class{constructor(e,t,r,n){this.stringify=e,this.mapOpts=r.map||{},this.root=t,this.opts=r,this.css=n,this.originalCSS=n,this.usesFileUrls=!this.mapOpts.from&&this.mapOpts.absolute,this.memoizedFileURLs=new Map,this.memoizedPaths=new Map,this.memoizedURLs=new Map}addAnnotation(){let e;this.isInline()?e="data:application/json;base64,"+this.toBase64(this.map.toString()):typeof this.mapOpts.annotation=="string"?e=this.mapOpts.annotation:typeof this.mapOpts.annotation=="function"?e=this.mapOpts.annotation(this.opts.to,this.root):e=this.outputFile()+".map";let t=`
`;this.css.includes(`\r
`)&&(t=`\r
`),this.css+=t+"/*# sourceMappingURL="+e+" */"}applyPrevMaps(){for(let e of this.previous()){let t=this.toUrl(this.path(e.file)),r=e.root||Qe(e.file),n;this.mapOpts.sourcesContent===!1?(n=new bn(e.text),n.sourcesContent&&(n.sourcesContent=null)):n=e.consumer(),this.map.applySourceMap(n,t,this.toUrl(this.path(r)))}}clearAnnotation(){if(this.mapOpts.annotation!==!1){if(this.root){let e;for(let t=this.root.nodes.length-1;t>=0;t--)e=this.root.nodes[t],e.type==="comment"&&e.text.startsWith("# sourceMappingURL=")&&this.root.removeChild(t)}else if(this.css){let e;for(;(e=this.css.lastIndexOf("/*#"))!==-1;){let t=this.css.indexOf("*/",e+3);if(t===-1)break;for(;e>0&&this.css[e-1]===`
`;)e--;this.css=this.css.slice(0,e)+this.css.slice(t+2)}}}}generate(){if(this.clearAnnotation(),Ni&&Ii&&this.isMap())return this.generateMap();{let e="";return this.stringify(this.root,t=>{e+=t}),[e]}}generateMap(){if(this.root)this.generateString();else if(this.previous().length===1){let e=this.previous()[0].consumer();e.file=this.outputFile(),this.map=Je.fromSourceMap(e,{ignoreInvalidMapping:!0})}else this.map=new Je({file:this.outputFile(),ignoreInvalidMapping:!0}),this.map.addMapping({generated:{column:0,line:1},original:{column:0,line:1},source:this.opts.from?this.toUrl(this.path(this.opts.from)):"<no source>"});return this.isSourcesContent()&&this.setSourcesContent(),this.root&&this.previous().length>0&&this.applyPrevMaps(),this.isAnnotation()&&this.addAnnotation(),this.isInline()?[this.css]:[this.css,this.map]}generateString(){this.css="",this.map=new Je({file:this.outputFile(),ignoreInvalidMapping:!0});let e=1,t=1,r="<no source>",n={generated:{column:0,line:0},original:{column:0,line:0},source:""},i,l;this.stringify(this.root,(a,o,u)=>{if(this.css+=a,o&&u!=="end"&&(n.generated.line=e,n.generated.column=t-1,o.source&&o.source.start?(n.source=this.sourcePath(o),n.original.line=o.source.start.line,n.original.column=o.source.start.column-1,this.map.addMapping(n)):(n.source=r,n.original.line=1,n.original.column=0,this.map.addMapping(n))),l=a.match(/\n/g),l?(e+=l.length,i=a.lastIndexOf(`
`),t=a.length-i):t+=a.length,o&&u!=="start"){let c=o.parent||{raws:{}};(!(o.type==="decl"||o.type==="atrule"&&!o.nodes)||o!==c.last||c.raws.semicolon)&&(o.source&&o.source.end?(n.source=this.sourcePath(o),n.original.line=o.source.end.line,n.original.column=o.source.end.column-1,n.generated.line=e,n.generated.column=t-2,this.map.addMapping(n)):(n.source=r,n.original.line=1,n.original.column=0,n.generated.line=e,n.generated.column=t-1,this.map.addMapping(n)))}})}isAnnotation(){return this.isInline()?!0:typeof this.mapOpts.annotation<"u"?this.mapOpts.annotation:this.previous().length?this.previous().some(e=>e.annotation):!0}isInline(){if(typeof this.mapOpts.inline<"u")return this.mapOpts.inline;let e=this.mapOpts.annotation;return typeof e<"u"&&e!==!0?!1:this.previous().length?this.previous().some(t=>t.inline):!0}isMap(){return typeof this.opts.map<"u"?!!this.opts.map:this.previous().length>0}isSourcesContent(){return typeof this.mapOpts.sourcesContent<"u"?this.mapOpts.sourcesContent:this.previous().length?this.previous().some(e=>e.withContent()):!0}outputFile(){return this.opts.to?this.path(this.opts.to):this.opts.from?this.path(this.opts.from):"to.css"}path(e){if(this.mapOpts.absolute||e.charCodeAt(0)===60||/^\w+:\/\//.test(e))return e;let t=this.memoizedPaths.get(e);if(t)return t;let r=this.opts.to?Qe(this.opts.to):".";typeof this.mapOpts.annotation=="string"&&(r=Qe(xn(r,this.mapOpts.annotation)));let n=vn(r,e);return this.memoizedPaths.set(e,n),n}previous(){if(!this.previousMaps)if(this.previousMaps=[],this.root)this.root.walk(e=>{if(e.source&&e.source.input.map){let t=e.source.input.map;this.previousMaps.includes(t)||this.previousMaps.push(t)}});else{let e=new Pi(this.originalCSS,this.opts);e.map&&this.previousMaps.push(e.map)}return this.previousMaps}setSourcesContent(){let e={};if(this.root)this.root.walk(t=>{if(t.source){let r=t.source.input.from;if(r&&!e[r]){e[r]=!0;let n=this.usesFileUrls?this.toFileUrl(r):this.toUrl(this.path(r));this.map.setSourceContent(n,t.source.input.css)}}});else if(this.css){let t=this.opts.from?this.toUrl(this.path(this.opts.from)):"<no source>";this.map.setSourceContent(t,this.css)}}sourcePath(e){return this.mapOpts.from?this.toUrl(this.mapOpts.from):this.usesFileUrls?this.toFileUrl(e.source.input.from):this.toUrl(this.path(e.source.input.from))}toBase64(e){return Buffer?Buffer.from(e).toString("base64"):window.btoa(unescape(encodeURIComponent(e)))}toFileUrl(e){let t=this.memoizedFileURLs.get(e);if(t)return t;if(wn){let r=wn(e).toString();return this.memoizedFileURLs.set(e,r),r}else throw new Error("`map.absolute` option is not available in this PostCSS build")}toUrl(e){let t=this.memoizedURLs.get(e);if(t)return t;Sn==="\\"&&(e=e.replace(/\\/g,"/"));let r=encodeURI(e).replace(/[#?]/g,encodeURIComponent);return this.memoizedURLs.set(e,r),r}};Cn.exports=$t});var An=v((_l,On)=>{"use strict";var ki=Ue(),qi=ye(),Ti=ve(),Di=ie(),_n=He(),Ui=st(),En={empty:!0,space:!0};function Bi(s){for(let e=s.length-1;e>=0;e--){let t=s[e],r=t[3]||t[2];if(r)return r}}function It(s,e,t){let r="";for(let n=e;n<t;n++)r+=s[n][1];return r}var Nt=class{constructor(e){this.input=e,this.root=new Di,this.current=this.root,this.spaces="",this.semicolon=!1,this.createTokenizer(),this.root.source={input:e,start:{column:1,line:1,offset:0}}}atrule(e){let t=new ki;t.name=e[1].slice(1),t.name===""&&this.unnamedAtrule(t,e),this.init(t,e[2]);let r,n,i,l=!1,a=!1,o=[],u=[];for(;!this.tokenizer.endOfFile();){if(e=this.tokenizer.nextToken(),r=e[0],r==="("||r==="["?u.push(r==="("?")":"]"):r==="{"&&u.length>0?u.push("}"):r===u[u.length-1]&&u.pop(),u.length===0)if(r===";"){t.source.end=this.getPosition(e[2]),t.source.end.offset++,this.semicolon=!0;break}else if(r==="{"){a=!0;break}else if(r==="}"){if(o.length>0){for(i=o.length-1,n=o[i];n&&n[0]==="space";)n=o[--i];n&&(t.source.end=this.getPosition(n[3]||n[2]),t.source.end.offset++)}this.end(e);break}else o.push(e);else o.push(e);if(this.tokenizer.endOfFile()){l=!0;break}}t.raws.between=this.spacesAndCommentsFromEnd(o),o.length?(t.raws.afterName=this.spacesAndCommentsFromStart(o),this.raw(t,"params",o),l&&(e=o[o.length-1],t.source.end=this.getPosition(e[3]||e[2]),t.source.end.offset++,this.spaces=t.raws.between,t.raws.between="")):(t.raws.afterName="",t.params=""),a&&(t.nodes=[],this.current=t)}checkMissedSemicolon(e){let t=this.colon(e);if(t===!1)return;let r=0,n;for(let i=t-1;i>=0&&(n=e[i],!(n[0]!=="space"&&(r+=1,r===2)));i--);throw this.input.error("Missed semicolon",n[0]==="word"?n[3]+1:n[2])}colon(e){let t=0,r,n,i;for(let[l,a]of e.entries()){if(n=a,i=n[0],i==="("&&(t+=1),i===")"&&(t-=1),t===0&&i===":")if(!r)this.doubleColon(n);else{if(r[0]==="word"&&r[1]==="progid")continue;return l}r=n}return!1}comment(e){let t=new qi;this.init(t,e[2]),t.source.end=this.getPosition(e[3]||e[2]),t.source.end.offset++;let r=e[1].slice(2,-2);if(!r.trim())t.text="",t.raws.left=r,t.raws.right="";else{let n=r.match(/^(\s*)([^]*\S)(\s*)$/);t.text=n[2],t.raws.left=n[1],t.raws.right=n[3]}}createTokenizer(){this.tokenizer=Ui(this.input)}decl(e,t){let r=new Ti;this.init(r,e[0][2]);let n=e[e.length-1];n[0]===";"&&(this.semicolon=!0,e.pop()),r.source.end=this.getPosition(n[3]||n[2]||Bi(e)),r.source.end.offset++;let i=0;for(;e[i][0]!=="word";)i===e.length-1&&this.unknownWord([e[i]]),i++;r.raws.before+=It(e,0,i),r.source.start=this.getPosition(e[i][2]);let l=i;for(;i<e.length;){let f=e[i][0];if(f===":"||f==="space"||f==="comment")break;i++}r.prop=It(e,l,i);let a=i,o;for(;i<e.length&&(o=e[i],i++,o[0]!==":");)o[0]==="word"&&/\w/.test(o[1])&&this.unknownWord([o]);r.raws.between=It(e,a,i),(r.prop[0]==="_"||r.prop[0]==="*")&&(r.raws.before+=r.prop[0],r.prop=r.prop.slice(1));let u=i;for(;i<e.length;){let f=e[i][0];if(f!=="space"&&f!=="comment")break;i++}let c=e.slice(u,i);e=e.slice(i),this.precheckMissedSemicolon(e);for(let f=e.length-1;f>=0;f--){if(o=e[f],o[1].toLowerCase()==="!important"){r.important=!0;let h=this.stringFrom(e,f);h=this.spacesFromEnd(e)+h,h!==" !important"&&(r.raws.important=h);break}else if(o[1].toLowerCase()==="important"){let h=e.slice(0),d="";for(let y=f;y>0;y--){let m=h[y][0];if(d.trim().startsWith("!")&&m!=="space")break;d=h.pop()[1]+d}d.trim().startsWith("!")&&(r.important=!0,r.raws.important=d,e=h)}if(o[0]!=="space"&&o[0]!=="comment")break}e.some(f=>f[0]!=="space"&&f[0]!=="comment")&&(r.raws.between+=c.map(f=>f[1]).join(""),c=[]),this.raw(r,"value",c.concat(e),t),r.value.includes(":")&&!t&&this.checkMissedSemicolon(e)}doubleColon(e){throw this.input.error("Double colon",{offset:e[2]},{offset:e[2]+e[1].length})}emptyRule(e){let t=new _n;this.init(t,e[2]),t.selector="",t.raws.between="",this.current=t}end(e){this.current.nodes&&this.current.nodes.length&&(this.current.raws.semicolon=this.semicolon),this.semicolon=!1,this.current.raws.after=(this.current.raws.after||"")+this.spaces,this.spaces="",this.current.parent?(this.current.source.end=this.getPosition(e[2]),this.current.source.end.offset++,this.current=this.current.parent):this.unexpectedClose(e)}endFile(){this.current.parent&&this.unclosedBlock(),this.current.nodes&&this.current.nodes.length&&(this.current.raws.semicolon=this.semicolon),this.current.raws.after=(this.current.raws.after||"")+this.spaces,this.root.source.end=this.getPosition(this.tokenizer.position())}freeSemicolon(e){if(this.spaces+=e[1],this.current.nodes){let t=this.current.nodes[this.current.nodes.length-1];t&&t.type==="rule"&&!t.raws.ownSemicolon&&(t.raws.ownSemicolon=this.spaces,this.spaces="",t.source.end=this.getPosition(e[2]),t.source.end.offset+=t.raws.ownSemicolon.length)}}getPosition(e){let t=this.input.fromOffset(e);return{column:t.col,line:t.line,offset:e}}init(e,t){this.current.push(e),e.source={input:this.input,start:this.getPosition(t)},e.raws.before=this.spaces,this.spaces="",e.type!=="comment"&&(this.semicolon=!1)}other(e){let t=!1,r=null,n=!1,i=null,l=[],a=e[1].startsWith("--"),o=[],u=e;for(;u;){if(r=u[0],o.push(u),r==="("||r==="[")i||(i=u),l.push(r==="("?")":"]");else if(a&&n&&r==="{")i||(i=u),l.push("}");else if(l.length===0)if(r===";")if(n){this.decl(o,a);return}else break;else if(r==="{"){this.rule(o);return}else if(r==="}"){this.tokenizer.back(o.pop()),t=!0;break}else r===":"&&(n=!0);else r===l[l.length-1]&&(l.pop(),l.length===0&&(i=null));u=this.tokenizer.nextToken()}if(this.tokenizer.endOfFile()&&(t=!0),l.length>0&&this.unclosedBracket(i),t&&n){if(!a)for(;o.length&&(u=o[o.length-1][0],!(u!=="space"&&u!=="comment"));)this.tokenizer.back(o.pop());this.decl(o,a)}else this.unknownWord(o)}parse(){let e;for(;!this.tokenizer.endOfFile();)switch(e=this.tokenizer.nextToken(),e[0]){case"space":this.spaces+=e[1];break;case";":this.freeSemicolon(e);break;case"}":this.end(e);break;case"comment":this.comment(e);break;case"at-word":this.atrule(e);break;case"{":this.emptyRule(e);break;default:this.other(e);break}this.endFile()}precheckMissedSemicolon(){}raw(e,t,r,n){let i,l,a=r.length,o="",u=!0,c,p;for(let f=0;f<a;f+=1)i=r[f],l=i[0],l==="space"&&f===a-1&&!n?u=!1:l==="comment"?(p=r[f-1]?r[f-1][0]:"empty",c=r[f+1]?r[f+1][0]:"empty",!En[p]&&!En[c]?o.slice(-1)===","?u=!1:o+=i[1]:u=!1):o+=i[1];if(!u){let f=r.reduce((h,d)=>h+d[1],"");e.raws[t]={raw:f,value:o}}e[t]=o}rule(e){e.pop();let t=new _n;this.init(t,e[0][2]),t.raws.between=this.spacesAndCommentsFromEnd(e),this.raw(t,"selector",e),this.current=t}spacesAndCommentsFromEnd(e){let t,r="";for(;e.length&&(t=e[e.length-1][0],!(t!=="space"&&t!=="comment"));)r=e.pop()[1]+r;return r}spacesAndCommentsFromStart(e){let t,r="";for(;e.length&&(t=e[0][0],!(t!=="space"&&t!=="comment"));)r+=e.shift()[1];return r}spacesFromEnd(e){let t,r="";for(;e.length&&(t=e[e.length-1][0],t==="space");)r=e.pop()[1]+r;return r}stringFrom(e,t){let r="";for(let n=t;n<e.length;n++)r+=e[n][1];return e.splice(t,e.length-t),r}unclosedBlock(){let e=this.current.source.start;throw this.input.error("Unclosed block",e.line,e.column)}unclosedBracket(e){throw this.input.error("Unclosed bracket",{offset:e[2]},{offset:e[2]+1})}unexpectedClose(e){throw this.input.error("Unexpected }",{offset:e[2]},{offset:e[2]+1})}unknownWord(e){throw this.input.error("Unknown word "+e[0][1],{offset:e[0][2]},{offset:e[0][2]+e[0][1].length})}unnamedAtrule(e,t){throw this.input.error("At-rule without name",{offset:t[2]},{offset:t[2]+t[1].length})}};On.exports=Nt});var Xe=v((El,Ln)=>{"use strict";var Fi=G(),zi=_e(),ji=An();function Ye(s,e){let t=new zi(s,e),r=new ji(t);try{r.parse()}catch(n){throw process.env.NODE_ENV!=="production"&&n.name==="CssSyntaxError"&&e&&e.from&&(/\.scss$/i.test(e.from)?n.message+=`
You tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser`:/\.sass/i.test(e.from)?n.message+=`
You tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser`:/\.less$/i.test(e.from)&&(n.message+=`
You tried to parse Less with the standard CSS parser; try again with the postcss-less parser`)),n}return r.root}Ln.exports=Ye;Ye.default=Ye;Fi.registerParse(Ye)});var kt=v((Ol,Mn)=>{"use strict";var Ae=class{constructor(e,t={}){if(this.type="warning",this.text=e,t.node&&t.node.source){let r=t.node.rangeBy(t);this.line=r.start.line,this.column=r.start.column,this.endLine=r.end.line,this.endColumn=r.end.column}for(let r in t)this[r]=t[r]}toString(){return this.node?this.node.error(this.text,{index:this.index,plugin:this.plugin,word:this.word}).message:this.plugin?this.plugin+": "+this.text:this.text}};Mn.exports=Ae;Ae.default=Ae});var Ze=v((Al,Rn)=>{"use strict";var Gi=kt(),Le=class{get content(){return this.css}constructor(e,t,r){this.processor=e,this.messages=[],this.root=t,this.opts=r,this.css="",this.map=void 0}toString(){return this.css}warn(e,t={}){t.plugin||this.lastPlugin&&this.lastPlugin.postcssPlugin&&(t.plugin=this.lastPlugin.postcssPlugin);let r=new Gi(e,t);return this.messages.push(r),r}warnings(){return this.messages.filter(e=>e.type==="warning")}};Rn.exports=Le;Le.default=Le});var qt=v((Ll,Pn)=>{"use strict";var $n={};Pn.exports=function(e){$n[e]||($n[e]=!0,typeof console<"u"&&console.warn&&console.warn(e))}});var Ut=v((Ml,qn)=>{"use strict";var Vi=G(),Wi=Be(),Ki=Pt(),Hi=Xe(),In=Ze(),Qi=ie(),Ji=he(),{isClean:U,my:Yi}=De(),Xi=qt(),Zi={atrule:"AtRule",comment:"Comment",decl:"Declaration",document:"Document",root:"Root",rule:"Rule"},eo={AtRule:!0,AtRuleExit:!0,Comment:!0,CommentExit:!0,Declaration:!0,DeclarationExit:!0,Document:!0,DocumentExit:!0,Once:!0,OnceExit:!0,postcssPlugin:!0,prepare:!0,Root:!0,RootExit:!0,Rule:!0,RuleExit:!0},to={Once:!0,postcssPlugin:!0,prepare:!0},le=0;function Me(s){return typeof s=="object"&&typeof s.then=="function"}function kn(s){let e=!1,t=Zi[s.type];return s.type==="decl"?e=s.prop.toLowerCase():s.type==="atrule"&&(e=s.name.toLowerCase()),e&&s.append?[t,t+"-"+e,le,t+"Exit",t+"Exit-"+e]:e?[t,t+"-"+e,t+"Exit",t+"Exit-"+e]:s.append?[t,le,t+"Exit"]:[t,t+"Exit"]}function Nn(s){let e;return s.type==="document"?e=["Document",le,"DocumentExit"]:s.type==="root"?e=["Root",le,"RootExit"]:e=kn(s),{eventIndex:0,events:e,iterator:0,node:s,visitorIndex:0,visitors:[]}}function Tt(s){return s[U]=!1,s.nodes&&s.nodes.forEach(e=>Tt(e)),s}var Dt={},W=class s{get content(){return this.stringify().content}get css(){return this.stringify().css}get map(){return this.stringify().map}get messages(){return this.sync().messages}get opts(){return this.result.opts}get processor(){return this.result.processor}get root(){return this.sync().root}get[Symbol.toStringTag](){return"LazyResult"}constructor(e,t,r){this.stringified=!1,this.processed=!1;let n;if(typeof t=="object"&&t!==null&&(t.type==="root"||t.type==="document"))n=Tt(t);else if(t instanceof s||t instanceof In)n=Tt(t.root),t.map&&(typeof r.map>"u"&&(r.map={}),r.map.inline||(r.map.inline=!1),r.map.prev=t.map);else{let i=Hi;r.syntax&&(i=r.syntax.parse),r.parser&&(i=r.parser),i.parse&&(i=i.parse);try{n=i(t,r)}catch(l){this.processed=!0,this.error=l}n&&!n[Yi]&&Vi.rebuild(n)}this.result=new In(e,n,r),this.helpers={...Dt,postcss:Dt,result:this.result},this.plugins=this.processor.plugins.map(i=>typeof i=="object"&&i.prepare?{...i,...i.prepare(this.result)}:i)}async(){return this.error?Promise.reject(this.error):this.processed?Promise.resolve(this.result):(this.processing||(this.processing=this.runAsync()),this.processing)}catch(e){return this.async().catch(e)}finally(e){return this.async().then(e,e)}getAsyncError(){throw new Error("Use process(css).then(cb) to work with async plugins")}handleError(e,t){let r=this.result.lastPlugin;try{if(t&&t.addToError(e),this.error=e,e.name==="CssSyntaxError"&&!e.plugin)e.plugin=r.postcssPlugin,e.setMessage();else if(r.postcssVersion&&process.env.NODE_ENV!=="production"){let n=r.postcssPlugin,i=r.postcssVersion,l=this.result.processor.version,a=i.split("."),o=l.split(".");(a[0]!==o[0]||parseInt(a[1])>parseInt(o[1]))&&console.error("Unknown error from PostCSS plugin. Your current PostCSS version is "+l+", but "+n+" uses "+i+". Perhaps this is the source of the error below.")}}catch(n){console&&console.error&&console.error(n)}return e}prepareVisitors(){this.listeners={};let e=(t,r,n)=>{this.listeners[r]||(this.listeners[r]=[]),this.listeners[r].push([t,n])};for(let t of this.plugins)if(typeof t=="object")for(let r in t){if(!eo[r]&&/^[A-Z]/.test(r))throw new Error(`Unknown event ${r} in ${t.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`);if(!to[r])if(typeof t[r]=="object")for(let n in t[r])n==="*"?e(t,r,t[r][n]):e(t,r+"-"+n.toLowerCase(),t[r][n]);else typeof t[r]=="function"&&e(t,r,t[r])}this.hasListener=Object.keys(this.listeners).length>0}async runAsync(){this.plugin=0;for(let e=0;e<this.plugins.length;e++){let t=this.plugins[e],r=this.runOnRoot(t);if(Me(r))try{await r}catch(n){throw this.handleError(n)}}if(this.prepareVisitors(),this.hasListener){let e=this.result.root;for(;!e[U];){e[U]=!0;let t=[Nn(e)];for(;t.length>0;){let r=this.visitTick(t);if(Me(r))try{await r}catch(n){let i=t[t.length-1].node;throw this.handleError(n,i)}}}if(this.listeners.OnceExit)for(let[t,r]of this.listeners.OnceExit){this.result.lastPlugin=t;try{if(e.type==="document"){let n=e.nodes.map(i=>r(i,this.helpers));await Promise.all(n)}else await r(e,this.helpers)}catch(n){throw this.handleError(n)}}}return this.processed=!0,this.stringify()}runOnRoot(e){this.result.lastPlugin=e;try{if(typeof e=="object"&&e.Once){if(this.result.root.type==="document"){let t=this.result.root.nodes.map(r=>e.Once(r,this.helpers));return Me(t[0])?Promise.all(t):t}return e.Once(this.result.root,this.helpers)}else if(typeof e=="function")return e(this.result.root,this.result)}catch(t){throw this.handleError(t)}}stringify(){if(this.error)throw this.error;if(this.stringified)return this.result;this.stringified=!0,this.sync();let e=this.result.opts,t=Ji;e.syntax&&(t=e.syntax.stringify),e.stringifier&&(t=e.stringifier),t.stringify&&(t=t.stringify);let r=this.result.root.source;if(e.map===void 0&&!(r&&r.input&&r.input.map)){let l="";return t(this.result.root,a=>{l+=a}),this.result.css=l,this.result}let i=new Ki(t,this.result.root,this.result.opts).generate();return this.result.css=i[0],this.result.map=i[1],this.result}sync(){if(this.error)throw this.error;if(this.processed)return this.result;if(this.processed=!0,this.processing)throw this.getAsyncError();for(let e of this.plugins){let t=this.runOnRoot(e);if(Me(t))throw this.getAsyncError()}if(this.prepareVisitors(),this.hasListener){let e=this.result.root;for(;!e[U];)e[U]=!0,this.walkSync(e);if(this.listeners.OnceExit)if(e.type==="document")for(let t of e.nodes)this.visitSync(this.listeners.OnceExit,t);else this.visitSync(this.listeners.OnceExit,e)}return this.result}then(e,t){return process.env.NODE_ENV!=="production"&&("from"in this.opts||Xi("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.")),this.async().then(e,t)}toString(){return this.css}visitSync(e,t){for(let[r,n]of e){this.result.lastPlugin=r;let i;try{i=n(t,this.helpers)}catch(l){throw this.handleError(l,t.proxyOf)}if(t.type!=="root"&&t.type!=="document"&&!t.parent)return!0;if(Me(i))throw this.getAsyncError()}}visitTick(e){let t=e[e.length-1],{node:r,visitors:n}=t;if(r.type!=="root"&&r.type!=="document"&&!r.parent){e.pop();return}if(n.length>0&&t.visitorIndex<n.length){let[l,a]=n[t.visitorIndex];t.visitorIndex+=1,t.visitorIndex===n.length&&(t.visitors=[],t.visitorIndex=0),this.result.lastPlugin=l;try{return a(r.toProxy(),this.helpers)}catch(o){throw this.handleError(o,r)}}if(t.iterator!==0){let l=t.iterator,a;for(;a=r.nodes[r.indexes[l]];)if(r.indexes[l]+=1,!a[U]){a[U]=!0,e.push(Nn(a));return}t.iterator=0,delete r.indexes[l]}let i=t.events;for(;t.eventIndex<i.length;){let l=i[t.eventIndex];if(t.eventIndex+=1,l===le){r.nodes&&r.nodes.length&&(r[U]=!0,t.iterator=r.getIterator());return}else if(this.listeners[l]){t.visitors=this.listeners[l];return}}e.pop()}walkSync(e){e[U]=!0;let t=kn(e);for(let r of t)if(r===le)e.nodes&&e.each(n=>{n[U]||this.walkSync(n)});else{let n=this.listeners[r];if(n&&this.visitSync(n,e.toProxy()))return}}warnings(){return this.sync().warnings()}};W.registerPostcss=s=>{Dt=s};qn.exports=W;W.default=W;Qi.registerLazyResult(W);Wi.registerLazyResult(W)});var Dn=v((Rl,Tn)=>{"use strict";var ro=Pt(),no=Xe(),so=Ze(),io=he(),oo=qt(),Re=class{get content(){return this.result.css}get css(){return this.result.css}get map(){return this.result.map}get messages(){return[]}get opts(){return this.result.opts}get processor(){return this.result.processor}get root(){if(this._root)return this._root;let e,t=no;try{e=t(this._css,this._opts)}catch(r){this.error=r}if(this.error)throw this.error;return this._root=e,e}get[Symbol.toStringTag](){return"NoWorkResult"}constructor(e,t,r){t=t.toString(),this.stringified=!1,this._processor=e,this._css=t,this._opts=r,this._map=void 0;let n=io;this.result=new so(this._processor,void 0,this._opts),this.result.css=t;let i=this;Object.defineProperty(this.result,"root",{get(){return i.root}});let l=new ro(n,void 0,this._opts,t);if(l.isMap()){let[a,o]=l.generate();a&&(this.result.css=a),o&&(this.result.map=o)}else l.clearAnnotation(),this.result.css=l.css}async(){return this.error?Promise.reject(this.error):Promise.resolve(this.result)}catch(e){return this.async().catch(e)}finally(e){return this.async().then(e,e)}sync(){if(this.error)throw this.error;return this.result}then(e,t){return process.env.NODE_ENV!=="production"&&("from"in this._opts||oo("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.")),this.async().then(e,t)}toString(){return this._css}warnings(){return[]}};Tn.exports=Re;Re.default=Re});var Bn=v(($l,Un)=>{"use strict";var lo=Be(),ao=Ut(),uo=Dn(),co=ie(),Y=class{constructor(e=[]){this.version="8.5.15",this.plugins=this.normalize(e)}normalize(e){let t=[];for(let r of e)if(r.postcss===!0?r=r():r.postcss&&(r=r.postcss),typeof r=="object"&&Array.isArray(r.plugins))t=t.concat(r.plugins);else if(typeof r=="object"&&r.postcssPlugin)t.push(r);else if(typeof r=="function")t.push(r);else if(typeof r=="object"&&(r.parse||r.stringify)){if(process.env.NODE_ENV!=="production")throw new Error("PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation.")}else throw new Error(r+" is not a PostCSS plugin");return t}process(e,t={}){return!this.plugins.length&&!t.parser&&!t.stringifier&&!t.syntax?new uo(this,e,t):new ao(this,e,t)}use(e){return this.plugins=this.plugins.concat(this.normalize([e])),this}};Un.exports=Y;Y.default=Y;co.registerProcessor(Y);lo.registerProcessor(Y)});var Hn=v((Pl,Kn)=>{"use strict";var Fn=Ue(),zn=ye(),fo=G(),ho=Te(),jn=ve(),Gn=Be(),po=yn(),mo=_e(),go=Ut(),yo=Rt(),wo=me(),vo=Xe(),Bt=Bn(),xo=Ze(),Vn=ie(),Wn=He(),So=he(),bo=kt();function b(...s){return s.length===1&&Array.isArray(s[0])&&(s=s[0]),new Bt(s)}b.plugin=function(e,t){let r=!1;function n(...l){console&&console.warn&&!r&&(r=!0,console.warn(e+`: postcss.plugin was deprecated. Migration guide:
https://evilmartians.com/chronicles/postcss-8-plugin-migration`),process.env.LANG&&process.env.LANG.startsWith("cn")&&console.warn(e+`: \u91CC\u9762 postcss.plugin \u88AB\u5F03\u7528. \u8FC1\u79FB\u6307\u5357:
https://www.w3ctech.com/topic/2226`));let a=t(...l);return a.postcssPlugin=e,a.postcssVersion=new Bt().version,a}let i;return Object.defineProperty(n,"postcss",{get(){return i||(i=n()),i}}),n.process=function(l,a,o){return b([n(o)]).process(l,a)},n};b.stringify=So;b.parse=vo;b.fromJSON=po;b.list=yo;b.comment=s=>new zn(s);b.atRule=s=>new Fn(s);b.decl=s=>new jn(s);b.rule=s=>new Wn(s);b.root=s=>new Vn(s);b.document=s=>new Gn(s);b.CssSyntaxError=ho;b.Declaration=jn;b.Container=fo;b.Processor=Bt;b.Document=Gn;b.Comment=zn;b.Warning=bo;b.AtRule=Fn;b.Result=xo;b.Input=mo;b.Rule=Wn;b.Root=Vn;b.Node=wo;go.registerPostcss(b);Kn.exports=b;b.default=b});var as=require("node:fs"),us=require("node:util");var C=Ss(Hn(),1),Ft=C.default,Il=C.default.stringify,Nl=C.default.fromJSON,kl=C.default.plugin,ql=C.default.parse,Tl=C.default.list,Dl=C.default.document,Ul=C.default.comment,Bl=C.default.atRule,Fl=C.default.rule,zl=C.default.decl,jl=C.default.root,Gl=C.default.CssSyntaxError,Vl=C.default.Declaration,Wl=C.default.Container,Kl=C.default.Processor,Hl=C.default.Document,Ql=C.default.Comment,Jl=C.default.Warning,Yl=C.default.AtRule,Xl=C.default.Result,Zl=C.default.Input,ea=C.default.Rule,ta=C.default.Root,ra=C.default.Node;function et(s){return s.trim().replace(/\s+/g," ").replace(/\s*([>+~])\s*/g," $1 ").trim()}function zt(s){return s.trim().replace(/:\s*/g,": ").replace(/\s+/g," ").replace(/\)\s*(and|or|not|only)\s*\(/gi,") $1 (").trim().replace(/\s+/g," ")}function jt(s){return s.trim()}function Co(s){let e=s.toLowerCase();return e.length===4?"#"+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]:e.length===5?"#"+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]+e[4]+e[4]:e}function Gt(s){let e=s.trim().replace(/\s+/g," ");return e=e.replace(/['"]/g,""),e=e.replace(/\s*,\s*/g,","),e=e.replace(/\s*([*/])\s*/g,"$1"),e=e.replace(/(^|[\s,(])\.(\d)/g,"$10.$2"),e=e.replace(/#[0-9a-fA-F]{3,8}\b/g,t=>Co(t)),e}function Vt(s){let e=et(s);return e=e.replace(/\[([^\]]*)\]/g,(t,r)=>{let n=r.replace(/\s*([~|^$*]?=)\s*/g,"$1");return n=n.replace(/(['"])(.*?)\1/g,"$2"),"["+n.trim()+"]"}),e}function _o(s){let e={};for(let i of s){let l=i.prop.toLowerCase();(l==="font-family"||l==="font-weight"||l==="font-style")&&(e[l]=jt(i.value).replace(/['"]/g,""))}let t=e["font-family"]||"unknown",r=e["font-weight"]||"normal",n=e["font-style"]||"normal";return`${t}/${r}/${n}`}function Eo(s,e){return`@keyframes ${e.trim()}`}function Wt(s,e={}){let t=new Map,r=0;function n(p){return t.has(p)||t.set(p,new Map),t.get(p)}function i(p,f){n(p).set(f,r++)}let l=e.semanticSelectors?Vt:et;function a(p,f){for(let h of p.selectors.map(d=>l(d)))i(f,h)}function o(p,f){let h=p.name.toLowerCase();if(h==="media"){let y=`@media ${zt(p.params)}`;n(y),p.each(m=>{m.type==="rule"?a(m,y):m.type==="atrule"&&o(m,y)})}else h==="font-face"||h==="keyframes"||h==="-webkit-keyframes"||h==="charset"||h==="import"||h==="namespace"||p.nodes&&p.each(d=>{d.type==="rule"?a(d,f):d.type==="atrule"&&o(d,f)})}let u;try{u=Ft.parse(s,{from:void 0})}catch{return new Map}n("base"),u.each(p=>{p.type==="rule"?a(p,"base"):p.type==="atrule"&&o(p,"base")});let c=new Map;for(let[p,f]of t)c.set(p,[...f.entries()].sort((h,d)=>h[1]-d[1]).map(h=>h[0]));return c}function ae(s,e={}){let t=new Map;function r(u){return t.has(u)||t.set(u,[]),t.get(u)}function n(u,c,p){r(u).push({selector:c,prop:p.prop.toLowerCase(),value:jt(p.value),important:p.important||!1})}let i=e.semanticSelectors?Vt:et;function l(u,c){let p=u.selectors.map(f=>i(f));for(let f of p)u.each(h=>{h.type==="decl"&&n(c,f,h)})}function a(u,c){let p=u.name.toLowerCase();if(p==="media"){let h=`@media ${zt(u.params)}`;r(h),u.each(d=>{d.type==="rule"?l(d,h):d.type==="atrule"&&a(d,h)})}else if(p==="font-face"){let f="@font-face";r(f);let h=[];u.each(y=>{y.type==="decl"&&h.push(y)});let d=_o(h);for(let y of h)n(f,d,y)}else if(p==="keyframes"||p==="-webkit-keyframes"){let f=Eo(p,u.params);r(f),u.each(h=>{if(h.type==="rule"){let d=h.selectors.map(y=>y.trim()).join(", ");h.each(y=>{y.type==="decl"&&n(f,d,y)})}})}else p==="charset"||p==="import"||p==="namespace"||u.nodes&&u.each(f=>{f.type==="rule"?l(f,c):f.type==="atrule"&&a(f,c)})}let o;try{o=Ft.parse(s,{from:void 0})}catch{return t}return r("base"),o.each(u=>{u.type==="rule"?l(u,"base"):u.type==="atrule"&&a(u,"base")}),t}function ue(s){let e=new Map;for(let[t,r]of s){e.has(t)||e.set(t,new Map);let n=e.get(t);for(let{selector:i,prop:l,value:a,important:o}of r){n.has(i)||n.set(i,new Map);let u=n.get(i),c=u.get(l);c?c.important&&!o||u.set(l,{value:a,important:o}):u.set(l,{value:a,important:o})}}return e}function Qn(s,e,t={}){let r=new Map,n=new Set([...s.keys(),...e.keys()]),i=["base",...[...n].filter(l=>l!=="base").sort()];for(let l of i){if(!n.has(l))continue;let a=s.get(l)||new Map,o=e.get(l)||new Map,u=new Set([...a.keys(),...o.keys()]),c=new Map,p=0;for(let h of[...u].sort()){let d=a.get(h)||new Map,y=o.get(h)||new Map,m=new Set([...d.keys(),...y.keys()]),S=new Map,w=0;for(let N of[...m].sort()){let O=d.get(N),E=y.get(N),K;!O&&E?(K={status:"added",newValue:E.value,newImportant:E.important},w++):O&&!E?(K={status:"removed",oldValue:O.value,oldImportant:O.important},w++):(t.ignoreCosmetic?Gt(O.value)!==Gt(E.value):O.value!==E.value)||O.important!==E.important?(K={status:"changed",oldValue:O.value,oldImportant:O.important,newValue:E.value,newImportant:E.important},w++):K={status:"unchanged",value:E.value,important:E.important},S.set(N,K)}let L;a.has(h)?o.has(h)?w>0?L="changed":L="unchanged":L="removed":L="added",c.set(h,{status:L,changeCount:w,props:S}),p+=w}let f;s.has(l)?e.has(l)?p>0?f="changed":f="unchanged":f="removed":f="added",r.set(l,{status:f,changeCount:p,selectors:c})}return r}function Jn(s){let e=s,t=0,r=0,n=0;e=e.replace(/::[\w-]+(\([^)]*\))?/g,()=>(n++,"")),e=e.replace(/\[[^\]]*\]/g,()=>(r++,"")),e=e.replace(/:[^:\s>+~([\].#]+(\([^)]*\))?/g,()=>(r++,"")),e=e.replace(/#[\w-]+/g,()=>(t++,"")),e=e.replace(/\.[\w-]+/g,()=>(r++,"")),e=e.replace(/[>+~]/g," ");let i=e.split(/\s+/).filter(l=>l&&l!=="*"&&/^[a-zA-Z][\w-]*/.test(l));return n+=i.length,[t,r,n]}function Yn(s,e){let[t,r,n]=Jn(s),[i,l,a]=Jn(e);return t===i&&r===l&&n===a}function Oo(s,e){let t=new Set(s),r=new Set(e),n=s.filter(u=>r.has(u)),i=e.filter(u=>t.has(u)),l=new Map;for(let u=0;u<n.length;u++)l.set(n[u],i[u]);let a=[],o=0;for(let u of s){if(!r.has(u)){a.push({type:"deleted",oldSelector:u,newSelector:null});continue}let c=l.get(u);for(;o<e.length&&e[o]!==c&&!t.has(e[o]);)a.push({type:"added",oldSelector:null,newSelector:e[o]}),o++;a.push(u===c?{type:"equal",oldSelector:u,newSelector:c}:{type:"moved",oldSelector:u,newSelector:c}),o++}for(;o<e.length;)t.has(e[o])||a.push({type:"added",oldSelector:null,newSelector:e[o]}),o++;return a}function Ao(s,e,t,r,n){s.sameSpecificity=Yn(s.oldSelector,s.newSelector),s.conflictingProps=[];let i=e.indexOf(s.oldSelector),l=e.indexOf(s.newSelector),a=t.indexOf(s.oldSelector),o=t.indexOf(s.newSelector);if(i<0||l<0||a<0||o<0)return;let u=i>l?s.oldSelector:s.newSelector,c=a>o?s.oldSelector:s.newSelector;if(u===c)return;let p=n.get(s.oldSelector)||new Map,f=n.get(s.newSelector)||new Map;for(let[h,d]of p){let y=f.get(h);if(!y||d.value===y.value&&d.important===y.important)continue;let m=(r.get(u)||new Map).get(h),S=(n.get(c)||new Map).get(h);!m||!S||s.conflictingProps.push({prop:h,oldEffective:{value:m.value,important:m.important},newEffective:{value:S.value,important:S.important}})}}function Xn(s,e,t={}){let r={semanticSelectors:t.semanticSelectors},n=Wt(s,r),i=Wt(e,r),l=ue(ae(s,r)),a=ue(ae(e,r)),o=new Set([...n.keys(),...i.keys()]),u=["base",...[...o].filter(p=>p!=="base").sort()],c=[];for(let p of u){if(!o.has(p))continue;let f=n.get(p)||[],h=i.get(p)||[],d=Oo(f,h),y=l.get(p)||new Map,m=a.get(p)||new Map;for(let w of d)w.type==="moved"&&Ao(w,f,h,y,m);let S=d.some(w=>w.type==="moved");d.some(w=>w.type!=="equal")&&c.push({contextKey:p,rows:d,hasWarning:S})}return c}var rs=require("node:fs"),ns=require("node:url");function x(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Zn(s,e){let{status:t}=e;function r(n){return n?' <span class="important">!important</span>':""}return t==="added"?`
      <div class="prop prop--added">
        <span class="prop-name">${x(s)}</span>
        <span class="prop-colon">:</span>
        <span class="prop-value">${x(e.newValue)}${r(e.newImportant)}</span>
        <span class="prop-badge badge--added">\u8FFD\u52A0</span>
      </div>`:t==="removed"?`
      <div class="prop prop--removed">
        <span class="prop-name">${x(s)}</span>
        <span class="prop-colon">:</span>
        <span class="prop-value">${x(e.oldValue)}${r(e.oldImportant)}</span>
        <span class="prop-badge badge--removed">\u524A\u9664</span>
      </div>`:t==="changed"?`
      <div class="prop prop--changed">
        <span class="prop-name">${x(s)}</span>
        <span class="prop-colon">:</span>
        <span class="prop-value prop-value--old">${x(e.oldValue)}${r(e.oldImportant)}</span>
        <span class="prop-arrow">\u2192</span>
        <span class="prop-value prop-value--new">${x(e.newValue)}${r(e.newImportant)}</span>
        <span class="prop-badge badge--changed">\u5909\u66F4</span>
      </div>`:`
    <div class="prop prop--unchanged">
      <span class="prop-name">${x(s)}</span>
      <span class="prop-colon">:</span>
      <span class="prop-value">${x(e.value)}${r(e.important)}</span>
    </div>`}function Lo(s,e){let{props:t}=e,r=[],n=[];for(let[l,a]of t){let o=x(l);if(a.status==="unchanged"){let u=x(a.value)+(a.important?" !important":"");r.push(`<div class="detail-line detail-line--unchanged"><span class="detail-prop">${o}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`),n.push(`<div class="detail-line detail-line--unchanged"><span class="detail-prop">${o}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`)}else if(a.status==="added"){r.push('<div class="detail-line detail-line--empty"></div>');let u=x(a.newValue)+(a.newImportant?" !important":"");n.push(`<div class="detail-line detail-line--added"><span class="detail-prop">${o}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`)}else if(a.status==="removed"){let u=x(a.oldValue)+(a.oldImportant?" !important":"");r.push(`<div class="detail-line detail-line--removed"><span class="detail-prop">${o}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`),n.push('<div class="detail-line detail-line--empty"></div>')}else{let u=x(a.oldValue)+(a.oldImportant?" !important":""),c=x(a.newValue)+(a.newImportant?" !important":"");r.push(`<div class="detail-line detail-line--changed"><span class="detail-prop">${o}</span><span class="detail-colon">:</span> <span class="detail-val">${u}</span>;</div>`),n.push(`<div class="detail-line detail-line--changed"><span class="detail-prop">${o}</span><span class="detail-colon">:</span> <span class="detail-val">${c}</span>;</div>`)}}let i=x(s);return`
    <div class="selector-detail">
      <div class="selector-detail-col selector-detail-col--old">
        <div class="selector-detail-col-label">\u65E7</div>
        <pre class="detail-block"><code>${i} {
${r.join(`
`)}}</code></pre>
      </div>
      <div class="selector-detail-col selector-detail-col--new">
        <div class="selector-detail-col-label">\u65B0</div>
        <pre class="detail-block"><code>${i} {
${n.join(`
`)}}</code></pre>
      </div>
    </div>`}function Mo(s,e,{highlightHtml:t,showUnchanged:r=!1,contextKey:n="",expanded:i=!1}={}){let{status:l,changeCount:a,props:o}=e,u=t||x(s),c={added:"badge--added",removed:"badge--removed",changed:"badge--changed",unchanged:"badge--unchanged"}[l],p={added:`+${[...o.values()].filter(w=>w.status==="added").length} \u8FFD\u52A0`,removed:`\u2212${[...o.values()].filter(w=>w.status==="removed").length} \u524A\u9664`,changed:(()=>{let w=[...o.values()].filter(E=>E.status==="added").length,L=[...o.values()].filter(E=>E.status==="removed").length,N=[...o.values()].filter(E=>E.status==="changed").length,O=[];return w&&O.push(`+${w}`),L&&O.push(`\u2212${L}`),N&&O.push(`~${N}`),O.join(" ")})(),unchanged:"\u5909\u66F4\u306A\u3057"}[l],f=[...o.entries()].filter(([,w])=>w.status!=="unchanged"),h=[...o.entries()].filter(([,w])=>w.status==="unchanged"),d=[...f.map(([w,L])=>Zn(w,L)),...r?h.map(([w,L])=>Zn(w,L)):[]].join(""),y=h.length>0&&!r?`<button class="unchanged-toggle" data-selector="${x(s)}">
           \u5909\u66F4\u306A\u3057 ${h.length} \u4EF6\u3092\u8868\u793A
         </button>`:"",m=i?Lo(s,e):"",S=i?' data-expanded="true"':"";return`
    <div class="selector-card selector-card--${l}" data-selector="${x(s)}" data-context="${x(n)}"${S}>
      <div class="selector-header" role="button" tabindex="0" title="\u30AF\u30EA\u30C3\u30AF\u3067\u65B0\u65E7\u306E\u5168\u30D7\u30ED\u30D1\u30C6\u30A3\u3092\u8868\u793A">
        <code class="selector-name">${u}</code>
        <span class="selector-badge ${c}">${p}</span>
        <span class="selector-expand-icon">${i?"\u25B2":"\u25BC"}</span>
      </div>
      <div class="props-list">
        ${d||'<div class="no-props">\u30D7\u30ED\u30D1\u30C6\u30A3\u306A\u3057</div>'}
        ${y}
      </div>
      ${m}
    </div>`}function Ro(s,e,t,{showUnchanged:r=!1,expandedSelectors:n=new Set}={}){let{status:i,changeCount:l}=e,o=s==="base"?"\u30C8\u30C3\u30D7\u30EC\u30D9\u30EB (base)":x(s),u={added:"badge--added",removed:"badge--removed",changed:"badge--changed",unchanged:"badge--unchanged"}[i],c=l>0?`<span class="context-badge ${u}">${l} \u4EF6\u306E\u5909\u66F4</span>`:'<span class="context-badge badge--unchanged">\u5909\u66F4\u306A\u3057</span>',p=t?t.map(({selector:h,positions:d})=>({selector:h,positions:d,selDiff:e.selectors.get(h)})).filter(h=>h.selDiff):[...e.selectors.entries()].map(([h,d])=>({selector:h,positions:new Set,selDiff:d}));if(p.length===0)return"";let f=p.map(({selector:h,positions:d,selDiff:y})=>Mo(h,y,{highlightHtml:d.size>0?$o(h,d):null,showUnchanged:r,contextKey:s,expanded:n.has(`${s}||${h}`)})).join("");return`
    <section class="context-section context-section--${i}">
      <div class="context-header">
        <span class="context-label">${o}</span>
        ${c}
      </div>
      <div class="context-selectors">
        ${f}
      </div>
    </section>`}function $o(s,e){return[...s].map((t,r)=>{let n=x(t);return e.has(r)?`<mark class="fzf-match">${n}</mark>`:n}).join("")}function Po(s){let e=x(s.prop),t=x(s.oldEffective.value)+(s.oldEffective.important?" !important":""),r=x(s.newEffective.value)+(s.newEffective.important?" !important":"");return`<span class="or-conflict-prop"><span class="or-prop-name">${e}</span>: <span class="or-prop-old">${t}</span> <span class="or-prop-arrow">\u2192</span> <span class="or-prop-new">${r}</span></span>`}function Io(s){let e=x(s.oldSelector),t=x(s.newSelector),r=s.conflictingProps&&s.conflictingProps.length>0,n=s.sameSpecificity?'<span class="or-spec-same">\u540C\u4E00\u8A73\u7D30\u5EA6</span>':'<span class="or-spec-diff">\u8A73\u7D30\u5EA6\u304C\u7570\u306A\u308B</span>',i=r?`<div class="or-conflicts">${s.conflictingProps.map(Po).join("")}</div>`:"";return`<tr class="${r?"or-row or-row--moved or-row--conflict":"or-row or-row--moved"}">
    <td class="or-cell or-cell--old"><code>${e}</code></td>
    <td class="or-cell or-cell--new"><code>${t}</code></td>
    <td class="or-cell or-cell--status">
      <span class="or-badge or-badge--moved">\u26A0\uFE0F \u9806\u5E8F\u5909\u66F4</span>
      ${n}
      ${i}
    </td>
  </tr>`}function No(s){return s.type==="equal"?`<tr class="or-row or-row--equal">
      <td class="or-cell or-cell--old"><code>${x(s.oldSelector)}</code></td>
      <td class="or-cell or-cell--new"><code>${x(s.newSelector)}</code></td>
      <td class="or-cell or-cell--status"></td>
    </tr>`:s.type==="deleted"?`<tr class="or-row or-row--deleted">
      <td class="or-cell or-cell--old"><code>${x(s.oldSelector)}</code></td>
      <td class="or-cell or-cell--new or-cell--empty"></td>
      <td class="or-cell or-cell--status"><span class="or-badge or-badge--deleted">\u524A\u9664</span></td>
    </tr>`:s.type==="added"?`<tr class="or-row or-row--added">
      <td class="or-cell or-cell--old or-cell--empty"></td>
      <td class="or-cell or-cell--new"><code>${x(s.newSelector)}</code></td>
      <td class="or-cell or-cell--status"><span class="or-badge or-badge--added">\u8FFD\u52A0</span></td>
    </tr>`:""}function ko(s,e=!1){let{contextKey:t,rows:r,hasWarning:n}=s,i=t==="base"?"\u30C8\u30C3\u30D7\u30EC\u30D9\u30EB (base)":x(t),l=r.filter(c=>c.type==="moved").length,a=n?`<span class="or-ctx-badge or-ctx-badge--warning">${l} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4</span>`:'<span class="or-ctx-badge or-ctx-badge--ok">\u9806\u5E8F\u5909\u66F4\u306A\u3057</span>',o=`<span class="or-toggle-icon">${e?"\u25BC":"\u25B6"}</span>`,u=r.map(c=>c.type==="moved"?Io(c):No(c)).join("");return`<div class="or-context">
    <div class="or-context-header" data-or-ctx-key="${x(t)}" aria-expanded="${e}" role="button" tabindex="0">
      ${o}
      <span class="or-context-label">${i}</span>
      ${a}
    </div>
    <div class="or-table-wrap${e?"":" or-table-wrap--collapsed"}">
      <table class="or-table">
        <thead>
          <tr>
            <th class="or-th">\u65E7 CSS</th>
            <th class="or-th">\u65B0 CSS</th>
            <th class="or-th">\u72B6\u614B</th>
          </tr>
        </thead>
        <tbody>${u}</tbody>
      </table>
    </div>
  </div>`}function es(s,{activeContext:e="all",filterOrderRisk:t=!1,expandedContexts:r=new Set}={}){if(!s||s.length===0)return"";let n=s.reduce((o,u)=>o+u.rows.filter(c=>c.type==="moved").length,0);if(n===0&&!t)return"";let i=t?s.filter(o=>o.hasWarning):s,l=e==="all"?i:i.filter(o=>o.contextKey===e);if(l.length===0)return"";let a=l.map(o=>ko(o,r.has(o.contextKey))).join("");return`<section class="order-risks-section">
    <div class="order-risks-header">
      <span class="order-risks-title">\u30BB\u30EC\u30AF\u30BF\u51FA\u73FE\u9806\u306E\u6BD4\u8F03</span>
      ${n>0?`<span class="order-risks-count order-risks-count--warning">\u26A0\uFE0F ${n} \u4EF6\u306E\u9806\u5E8F\u5909\u66F4</span>`:'<span class="order-risks-count order-risks-count--ok">\u9806\u5E8F\u5909\u66F4\u306A\u3057</span>'}
    </div>
    ${a}
  </section>`}function ts(s,e,{activeContext:t="all",showUnchanged:r=!1,expandedSelectors:n=new Set}={}){if(!s||s.size===0)return'<div class="empty-state">CSS \u3092\u8AAD\u307F\u8FBC\u3093\u3067\u304F\u3060\u3055\u3044\u3002</div>';let i=null;if(e!==null){i=new Map;for(let a of e)i.has(a.contextKey)||i.set(a.contextKey,[]),i.get(a.contextKey).push({selector:a.selector,positions:a.positions||new Set})}let l="";for(let[a,o]of s){if(t!=="all"&&a!==t)continue;let u=i?i.get(a)||[]:null;i&&u.length===0||(l+=Ro(a,o,u,{showUnchanged:r,expandedSelectors:n}))}return l||'<div class="empty-state">\u6761\u4EF6\u306B\u4E00\u81F4\u3059\u308B\u30BB\u30EC\u30AF\u30BF\u304C\u3042\u308A\u307E\u305B\u3093\u3002</div>'}var Uo={};function qo(){return`/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   CSS Diff App \u2014 \u30B9\u30BF\u30A4\u30EB
   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

/* \u2500\u2500 \u30C7\u30B6\u30A4\u30F3\u30C8\u30FC\u30AF\u30F3 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
:root {
  --color-bg:          #f8fafc;
  --color-surface:     #ffffff;
  --color-border:      #e2e8f0;
  --color-text:        #1e293b;
  --color-text-muted:  #64748b;
  --color-text-code:   #334155;

  --color-added-bg:    #f0fdf4;
  --color-added-text:  #15803d;
  --color-added-border:#86efac;
  --color-added-badge: #22c55e;

  --color-removed-bg:   #fff1f2;
  --color-removed-text: #be123c;
  --color-removed-border:#fda4af;
  --color-removed-badge: #f43f5e;

  --color-changed-bg:   #fffbeb;
  --color-changed-text: #92400e;
  --color-changed-border:#fcd34d;
  --color-changed-badge: #f59e0b;

  --color-unchanged-bg:   #f8fafc;
  --color-unchanged-text: #94a3b8;
  --color-unchanged-border:#e2e8f0;

  --color-primary:     #6366f1;
  --color-primary-light: #e0e7ff;

  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg: 12px;

  --shadow-sm:  0 1px 2px rgba(0,0,0,.06);
  --shadow-md:  0 4px 12px rgba(0,0,0,.08);

  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'SFMono-Regular', 'Cascadia Code', 'Consolas', 'Menlo', monospace;
}

/* \u2500\u2500 \u30D9\u30FC\u30B9 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font-sans);
  font-size: 14px;
  background: var(--color-bg);
  color: var(--color-text);
  min-height: 100vh;
  line-height: 1.6;
}

/* \u2500\u2500 \u30D8\u30C3\u30C0\u30FC & \u30C9\u30ED\u30C3\u30D7\u30BE\u30FC\u30F3 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.app-header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 20px 24px;
  position: relative;
}

.github-link {
  position: absolute;
  top: 16px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-muted);
  text-decoration: none;
  padding: 5px 10px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  transition: color 0.15s, border-color 0.15s, background 0.15s;
}

.github-link:hover {
  color: var(--color-text);
  border-color: var(--color-text-muted);
  background: var(--color-border);
}

.github-icon {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}

.app-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.01em;
  margin-bottom: 4px;
}

.app-desc {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-bottom: 16px;
}

.dropzones {
  display: flex;
  align-items: center;
  gap: 16px;
}

.dropzones-arrow {
  font-size: 20px;
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.dropzone {
  flex: 1;
  min-height: 80px;
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  transition: border-color .15s, background .15s;
  padding: 16px;
  user-select: none;
}

.dropzone:hover,
.dropzone:focus-visible {
  border-color: var(--color-primary);
  background: var(--color-primary-light);
  outline: none;
}

.dropzone.dragover {
  border-color: var(--color-primary);
  background: var(--color-primary-light);
}

.dropzone.loaded {
  border-style: solid;
  border-color: var(--color-primary);
  background: var(--color-primary-light);
}

.dropzone-icon { font-size: 20px; }

.dropzone-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
  text-align: center;
  word-break: break-all;
}

.dropzone-sub {
  font-size: 11px;
  color: var(--color-text-muted);
  text-align: center;
}

/* \u2500\u2500 \u30B3\u30F3\u30C8\u30ED\u30FC\u30EB\u30D0\u30FC \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.controls-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 10px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.search-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 200px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0 10px;
}

.search-icon { font-size: 13px; }

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 7px 0;
  font-size: 13px;
  font-family: var(--font-mono);
  color: var(--color-text);
  outline: none;
}

.search-input::placeholder { color: var(--color-text-muted); }

.filter-buttons {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid var(--color-border);
  border-radius: 9999px;
  background: var(--color-surface);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all .12s;
  white-space: nowrap;
}

.filter-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }

.filter-btn.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

/* \u2500\u2500 \u30B5\u30DE\u30EA\u30FC\u30D0\u30FC \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.summary-bar {
  padding: 8px 24px;
  font-size: 12px;
  color: var(--color-text-muted);
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.sum-added   { color: var(--color-added-text); font-weight: 600; }
.sum-removed { color: var(--color-removed-text); font-weight: 600; }
.sum-changed { color: var(--color-changed-text); font-weight: 600; }

/* \u2500\u2500 \u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u30BF\u30D6 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.context-tabs {
  padding: 10px 24px 0;
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  overflow-x: auto;
}

.ctx-tab {
  padding: 5px 12px;
  font-size: 11px;
  font-family: var(--font-mono);
  font-weight: 500;
  border: 1px solid var(--color-border);
  border-bottom: none;
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  background: var(--color-bg);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all .12s;
  white-space: nowrap;
  position: relative;
  bottom: -1px;
}

.ctx-tab:hover { color: var(--color-text); background: var(--color-surface); }

.ctx-tab.active {
  background: var(--color-surface);
  color: var(--color-text);
  border-color: var(--color-border);
  border-bottom-color: var(--color-surface);
}

.ctx-tab--changed .ctx-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-changed-badge);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 9999px;
  margin-left: 4px;
}

.ctx-tab--added .ctx-badge {
  background: var(--color-added-badge);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 9999px;
  margin-left: 4px;
}

.ctx-tab--removed .ctx-badge {
  background: var(--color-removed-badge);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 9999px;
  margin-left: 4px;
}

/* \u2500\u2500 \u7D50\u679C\u30A8\u30EA\u30A2 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.results {
  padding: 16px 24px 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 1400px;
}

.empty-state {
  text-align: center;
  padding: 60px 24px;
  color: var(--color-text-muted);
}

.empty-state p { margin-bottom: 8px; }
.empty-sub { font-size: 12px; }

/* \u2500\u2500 \u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u30BB\u30AF\u30B7\u30E7\u30F3 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.context-section {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.context-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg);
}

.context-label {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text);
  flex: 1;
}

.context-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 9999px;
}

.badge--added     { background: var(--color-added-bg); color: var(--color-added-text); border: 1px solid var(--color-added-border); }
.badge--removed   { background: var(--color-removed-bg); color: var(--color-removed-text); border: 1px solid var(--color-removed-border); }
.badge--changed   { background: var(--color-changed-bg); color: var(--color-changed-text); border: 1px solid var(--color-changed-border); }
.badge--unchanged { background: var(--color-unchanged-bg); color: var(--color-unchanged-text); border: 1px solid var(--color-unchanged-border); }

.context-selectors {
  display: flex;
  flex-direction: column;
}

/* \u2500\u2500 \u30BB\u30EC\u30AF\u30BF\u30AB\u30FC\u30C9 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.selector-card {
  border-bottom: 1px solid var(--color-border);
  padding: 10px 16px;
}

.selector-card:last-child { border-bottom: none; }

.selector-card--added .selector-header   { background: var(--color-added-bg); }
.selector-card--removed .selector-header { background: var(--color-removed-bg); }
.selector-card--changed .selector-header { background: var(--color-changed-bg); }
.selector-card--unchanged { opacity: .7; }

.selector-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  margin-bottom: 6px;
  cursor: pointer;
  user-select: none;
}

.selector-name {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-code);
  flex: 1;
  word-break: break-all;
}

.selector-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 9999px;
  white-space: nowrap;
  flex-shrink: 0;
}

/* \u2500\u2500 fzf \u30CF\u30A4\u30E9\u30A4\u30C8 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.fzf-match {
  background: #fef08a;
  color: #78350f;
  border-radius: 2px;
  padding: 0 1px;
}

/* \u2500\u2500 \u30D7\u30ED\u30D1\u30C6\u30A3\u884C \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.props-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-left: 8px;
}

.prop {
  display: flex;
  align-items: baseline;
  gap: 6px;
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 12px;
  flex-wrap: wrap;
}

.prop--added   { background: var(--color-added-bg); }
.prop--removed { background: var(--color-removed-bg); }
.prop--changed { background: var(--color-changed-bg); }
.prop--unchanged { color: var(--color-text-muted); }

.prop-name  { font-weight: 600; color: inherit; }
.prop-colon { color: var(--color-text-muted); }

.prop-value--old {
  color: var(--color-removed-text);
  text-decoration: line-through;
}

.prop-value--new {
  color: var(--color-added-text);
  font-weight: 600;
}

.prop-arrow {
  font-size: 11px;
  color: var(--color-text-muted);
}

.prop-badge {
  font-size: 9px;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 9999px;
  flex-shrink: 0;
  margin-left: auto;
}

.important {
  font-size: 10px;
  color: var(--color-removed-text);
  font-weight: 700;
}

.no-props {
  font-size: 11px;
  color: var(--color-text-muted);
  padding: 2px 0;
}

/* \u2500\u2500 \u5909\u66F4\u306A\u3057\u5C55\u958B\u30DC\u30BF\u30F3 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.unchanged-toggle {
  margin-top: 4px;
  padding: 3px 10px;
  font-size: 11px;
  color: var(--color-text-muted);
  background: transparent;
  border: 1px dashed var(--color-border);
  border-radius: 9999px;
  cursor: pointer;
  transition: all .12s;
  align-self: flex-start;
}

.unchanged-toggle:hover {
  color: var(--color-text);
  border-color: var(--color-text-muted);
}

/* \u2500\u2500 \u30AA\u30D7\u30B7\u30E7\u30F3 \u30C1\u30A7\u30C3\u30AF\u30DC\u30C3\u30AF\u30B9 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.option-checks {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 6px;
  width: 100%;
}

.option-check-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--color-text-muted);
  cursor: pointer;
  user-select: none;
}

.option-check-label input[type="checkbox"] {
  width: 14px;
  height: 14px;
  accent-color: var(--color-primary);
  cursor: pointer;
}

.option-check-label:hover { color: var(--color-text); }

/* \u2500\u2500 \u30BB\u30EC\u30AF\u30BF\u5C55\u958B\u30A2\u30A4\u30B3\u30F3 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.selector-expand-icon {
  font-size: 10px;
  color: var(--color-text-muted);
  flex-shrink: 0;
  transition: opacity .12s;
}

.selector-header:hover .selector-expand-icon {
  opacity: 0.8;
}

/* \u2500\u2500 \u65B0\u65E72\u30AB\u30E9\u30E0\u8A73\u7D30\u30D1\u30CD\u30EB \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.selector-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed var(--color-border);
}

.selector-detail-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.selector-detail-col-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.selector-detail-col--old .selector-detail-col-label { color: var(--color-removed-text); }
.selector-detail-col--new .selector-detail-col-label { color: var(--color-added-text); }

.detail-block {
  font-family: var(--font-mono);
  font-size: 11px;
  line-height: 1.6;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 8px 10px;
  overflow-x: auto;
  white-space: pre;
  margin: 0;
}

.detail-line {
  display: block;
  padding: 1px 4px;
  border-radius: 2px;
}

.detail-line--unchanged { color: var(--color-text-code); }
.detail-line--added     { background: var(--color-added-bg); color: var(--color-added-text); }
.detail-line--removed   { background: var(--color-removed-bg); color: var(--color-removed-text); text-decoration: line-through; }
.detail-line--changed   { background: var(--color-changed-bg); color: var(--color-changed-text); }
.detail-line--empty     { min-height: 1.6em; }

.detail-prop { font-weight: 600; }
.detail-colon { color: var(--color-text-muted); }
.detail-val { color: inherit; }

/* \u2500\u2500 \u30D5\u30A3\u30EB\u30BF\u30DC\u30BF\u30F3\uFF08\u8B66\u544A\u7528\uFF09 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.filter-btn--warning { border-color: var(--color-changed-border); }
.filter-btn--warning:hover { border-color: var(--color-changed-badge); color: var(--color-changed-text); }
.filter-btn--warning.active {
  background: var(--color-changed-badge);
  border-color: var(--color-changed-badge);
  color: #fff;
}

/* \u2500\u2500 \u51FA\u73FE\u9806\u30EA\u30B9\u30AF\u30BB\u30AF\u30B7\u30E7\u30F3 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
:root {
  --color-warning-bg:     #fffbeb;
  --color-warning-border: #fcd34d;
  --color-warning-text:   #92400e;
  --color-warning-badge:  #f59e0b;
}

.order-risks-section {
  background: var(--color-surface);
  border: 2px solid var(--color-warning-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.order-risks-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: var(--color-warning-bg);
  border-bottom: 1px solid var(--color-warning-border);
}

.order-risks-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-warning-text);
  flex: 1;
}

.order-risks-count {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 9999px;
}

.order-risks-count--warning {
  background: var(--color-warning-bg);
  color: var(--color-warning-text);
  border: 1px solid var(--color-warning-border);
}

.order-risks-count--ok {
  background: var(--color-unchanged-bg);
  color: var(--color-unchanged-text);
  border: 1px solid var(--color-unchanged-border);
}

/* \u30B3\u30F3\u30C6\u30AD\u30B9\u30C8 */
.or-context {
  border-bottom: 1px solid var(--color-border);
}

.or-context:last-child { border-bottom: none; }

.or-context-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
  user-select: none;
}

.or-context-header:hover {
  background: var(--color-surface);
}

.or-toggle-icon {
  font-size: 9px;
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.or-table-wrap--collapsed {
  display: none;
}

.or-context-label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text);
  flex: 1;
}

.or-ctx-badge {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 9999px;
}

.or-ctx-badge--warning {
  background: var(--color-warning-bg);
  color: var(--color-warning-text);
  border: 1px solid var(--color-warning-border);
}

.or-ctx-badge--ok {
  background: var(--color-unchanged-bg);
  color: var(--color-unchanged-text);
  border: 1px solid var(--color-unchanged-border);
}

/* \u30C6\u30FC\u30D6\u30EB */
.or-table-wrap {
  overflow-x: auto;
}

.or-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-mono);
  font-size: 11px;
}

.or-th {
  padding: 6px 12px;
  text-align: left;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg);
}

.or-cell {
  padding: 5px 12px;
  vertical-align: middle;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-code);
}

.or-row:last-child .or-cell { border-bottom: none; }

.or-cell--old { width: 35%; }
.or-cell--new { width: 35%; }
.or-cell--status { width: 30%; }

.or-cell--empty { background: var(--color-bg); }

.or-cell code {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-code);
  word-break: break-all;
}

/* \u884C\u306E\u30B9\u30BF\u30A4\u30EB */
.or-row--equal .or-cell { color: var(--color-text-muted); }
.or-row--equal .or-cell code { color: var(--color-text-muted); }

.or-row--deleted { background: var(--color-removed-bg); }
.or-row--deleted .or-cell code { color: var(--color-removed-text); }

.or-row--added { background: var(--color-added-bg); }
.or-row--added .or-cell code { color: var(--color-added-text); }

.or-row--moved { background: var(--color-warning-bg); }
.or-row--moved.or-row--conflict { background: #fef9c3; }
.or-row--moved .or-cell code { color: var(--color-warning-text); font-weight: 600; }

/* \u30D0\u30C3\u30B8 */
.or-badge {
  display: inline-block;
  font-size: 9px;
  font-weight: 700;
  padding: 2px 5px;
  border-radius: 9999px;
  white-space: nowrap;
}

.or-badge--moved {
  background: var(--color-warning-bg);
  color: var(--color-warning-text);
  border: 1px solid var(--color-warning-border);
}

.or-badge--deleted {
  background: var(--color-removed-bg);
  color: var(--color-removed-text);
  border: 1px solid var(--color-removed-border);
}

.or-badge--added {
  background: var(--color-added-bg);
  color: var(--color-added-text);
  border: 1px solid var(--color-added-border);
}

/* \u8A73\u7D30\u5EA6 */
.or-spec-same {
  display: inline-block;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 9999px;
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #fde68a;
  margin-left: 4px;
}

.or-spec-diff {
  display: inline-block;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 9999px;
  background: var(--color-unchanged-bg);
  color: var(--color-unchanged-text);
  border: 1px solid var(--color-unchanged-border);
  margin-left: 4px;
}

/* \u7AF6\u5408\u30D7\u30ED\u30D1\u30C6\u30A3 */
.or-conflicts {
  margin-top: 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.or-conflict-prop {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 4px;
  padding: 2px 6px;
  color: #9a3412;
}

.or-prop-name { font-weight: 700; }

.or-prop-old {
  color: var(--color-removed-text);
  text-decoration: line-through;
}

.or-prop-new {
  color: var(--color-added-text);
  font-weight: 700;
}

.or-prop-arrow { color: var(--color-text-muted); font-size: 9px; }

/* \u2500\u2500 \u30EC\u30B9\u30DD\u30F3\u30B7\u30D6 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
@media (max-width: 600px) {
  .dropzones { flex-direction: column; }
  .dropzones-arrow { transform: rotate(90deg); }
  .controls-bar { flex-direction: column; align-items: stretch; }
  .filter-buttons { justify-content: flex-start; }
  .selector-detail { grid-template-columns: 1fr; }
}
`}var To=`
#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}
/* \u8A73\u7D30\u30D1\u30CD\u30EB: data-expanded="true" \u306E\u3068\u304D\u306E\u307F\u8868\u793A */
.selector-card:not([data-expanded="true"]) .selector-detail { display: none; }
.order-risks-section { margin-top: 32px; }
`,Do=`
<script>
document.addEventListener('DOMContentLoaded', () => {
  // \u30BB\u30EC\u30AF\u30BF\u30AB\u30FC\u30C9\u306E\u30A2\u30B3\u30FC\u30C7\u30A3\u30AA\u30F3
  document.querySelectorAll('.selector-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.selector-card')
      if (!card) return
      const expanded = card.getAttribute('data-expanded') === 'true'
      card.setAttribute('data-expanded', expanded ? 'false' : 'true')
      const icon = header.querySelector('.selector-expand-icon')
      if (icon) icon.textContent = expanded ? '\u25BC' : '\u25B2'
    })
  })

  // \u51FA\u73FE\u9806\u30EA\u30B9\u30AF\u306E\u30B3\u30F3\u30C6\u30AD\u30B9\u30C8\u30D8\u30C3\u30C0\u30FC\u306E\u30A2\u30B3\u30FC\u30C7\u30A3\u30AA\u30F3
  document.querySelectorAll('.or-context-header').forEach(header => {
    header.addEventListener('click', () => {
      const wrap = header.nextElementSibling
      if (!wrap) return
      const collapsed = wrap.classList.toggle('or-table-wrap--collapsed')
      const icon = header.querySelector('.or-toggle-icon')
      if (icon) icon.textContent = collapsed ? '\u25B6' : '\u25BC'
      header.setAttribute('aria-expanded', String(!collapsed))
    })
  })
})
</script>
`;function ss(s,e){let t=qo(),r=[],n=new Set;for(let[u,c]of s)for(let[p,f]of c.selectors)f.status!=="unchanged"&&(r.push({contextKey:u,selector:p,positions:new Set}),n.add(`${u}||${p}`));let i=r.length>0,l=e&&e.some(u=>u.hasWarning),a=e?new Set(e.map(u=>u.contextKey)):new Set,o="";return i&&(o+=`<div class="diff-section">${ts(s,r,{expandedSelectors:n})}</div>`),l&&(o+=es(e,{expandedContexts:a})),!i&&!l&&(o='<div class="empty-state">\u5DEE\u5206\u306F\u3042\u308A\u307E\u305B\u3093\u3002</div>'),`<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Diff Report</title>
  <style>${t}</style>
  <style>${To}</style>
</head>
<body>
  <div id="app">${o}</div>
  ${Do}
</body>
</html>`}var cs=`Usage: css-review <old.css> <new.css> [options]

Arguments:
  old.css    \u6BD4\u8F03\u5143 CSS \u30D5\u30A1\u30A4\u30EB\u306E\u30D1\u30B9
  new.css    \u6BD4\u8F03\u5148 CSS \u30D5\u30A1\u30A4\u30EB\u306E\u30D1\u30B9

Options:
  --format <text|json|html>               \u51FA\u529B\u30D5\u30A9\u30FC\u30DE\u30C3\u30C8 (default: text)
  --filter <changed|added|removed|unchanged|all>
                                          \u30B9\u30C6\u30FC\u30BF\u30B9\u3067\u7D5E\u308A\u8FBC\u307F (default: changed)
  --order-risk                            \u30BB\u30EC\u30AF\u30BF\u51FA\u73FE\u9806\u30EA\u30B9\u30AF\u3092\u8868\u793A
  --ignore-cosmetic                       \u8868\u8A18\u63FA\u308C\u3092\u7121\u8996
  --semantic-selectors                    \u5C5E\u6027\u30BB\u30EC\u30AF\u30BF\u306E\u30AF\u30A9\u30FC\u30C8\u6709\u7121\u3092\u540C\u4E00\u8996
  --no-color                              ANSI \u30AB\u30E9\u30FC\u3092\u7121\u52B9\u5316
  -v, --version                           \u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u8868\u793A
  -h, --help                              \u30D8\u30EB\u30D7\u3092\u8868\u793A

Exit codes:
  0  \u5DEE\u5206\u306A\u3057
  1  \u5DEE\u5206\u3042\u308A
  2  \u30A8\u30E9\u30FC`,fs;try{fs=(0,us.parseArgs)({options:{format:{type:"string",default:"text"},filter:{type:"string",default:"changed"},"order-risk":{type:"boolean",default:!1},"ignore-cosmetic":{type:"boolean",default:!1},"semantic-selectors":{type:"boolean",default:!1},"no-color":{type:"boolean",default:!1},version:{type:"boolean",short:"v",default:!1},help:{type:"boolean",short:"h",default:!1}},allowPositionals:!0,args:process.argv.slice(2)})}catch(s){console.error(`Error: ${s.message}`),process.exit(2)}var{values:P,positionals:hs}=fs;P.version&&(console.log("0.2.0"),process.exit(0));P.help&&(console.log(cs),process.exit(0));hs.length<2&&(console.error(`Error: 2\u3064\u306E\u30D5\u30A1\u30A4\u30EB\u30D1\u30B9\u304C\u5FC5\u8981\u3067\u3059
`),console.error(cs),process.exit(2));var Bo=new Set(["text","json","html"]);Bo.has(P.format)||(console.error("Error: --format \u306F text | json | html \u306E\u3044\u305A\u308C\u304B\u3067\u3059"),process.exit(2));var Fo=new Set(["changed","added","removed","unchanged","all"]);Fo.has(P.filter)||(console.error("Error: --filter \u306F changed | added | removed | unchanged | all \u306E\u3044\u305A\u308C\u304B\u3067\u3059"),process.exit(2));function ps(s){try{return(0,as.readFileSync)(s,"utf8")}catch(e){console.error(`Error: \u30D5\u30A1\u30A4\u30EB\u3092\u8AAD\u307F\u8FBC\u3081\u307E\u305B\u3093 "${s}": ${e.message}`),process.exit(2)}}var[zo,jo]=hs,is=ps(zo),os=ps(jo),Pe,$e=[];try{let s={semanticSelectors:P["semantic-selectors"]};Pe=Qn(ue(ae(is,s)),ue(ae(os,s)),{ignoreCosmetic:P["ignore-cosmetic"]}),P["order-risk"]&&($e=Xn(is,os,{semanticSelectors:P["semantic-selectors"]}))}catch(s){console.error(`Parse error: ${s.message}`),process.exit(2)}function ls(s,e){return e==="all"?!0:e==="changed"?s!=="unchanged":s===e}function Go(s){let e=0,t=0,r=0,n=0;for(let[,i]of s)for(let[,l]of i.selectors)for(let[,a]of l.props)a.status==="changed"?e++:a.status==="added"?t++:a.status==="removed"?r++:n++;return{changed:e,added:t,removed:r,unchanged:n}}var q=Go(Pe),ds=q.changed>0||q.added>0||q.removed>0,Kt=P.filter;if(P.format==="html"){let s=ss(Pe,P["order-risk"]?$e:null);process.stdout.write(s),process.exit(ds?1:0)}if(P.format==="json"){let s=[];for(let[t,r]of Pe){let n=[];for(let[i,l]of r.selectors){let a=[];for(let[o,u]of l.props)ls(u.status,Kt)&&a.push({prop:o,...u});a.length>0&&n.push({selector:i,status:l.status,changeCount:l.changeCount,props:a})}n.length>0&&s.push({key:t,status:r.status,changeCount:r.changeCount,selectors:n})}let e={version:1,summary:q,contexts:s};P["order-risk"]&&(e.orderRisks=$e),console.log(JSON.stringify(e,null,2))}else{let s=!P["no-color"]&&!!process.stdout.isTTY,e={reset:s?"\x1B[0m":"",yellow:s?"\x1B[33m":"",green:s?"\x1B[32m":"",red:s?"\x1B[31m":"",cyan:s?"\x1B[36m":"",dim:s?"\x1B[2m":""};for(let[r,n]of Pe){let i=[];for(let[l,a]of n.selectors){let o=[];for(let[u,c]of a.props)ls(c.status,Kt)&&(c.status==="changed"?o.push(`    ${e.yellow}~${e.reset} ${u}: ${c.oldValue} \u2192 ${c.newValue}`):c.status==="added"?o.push(`    ${e.green}+${e.reset} ${u}: ${c.newValue}`):c.status==="removed"?o.push(`    ${e.red}-${e.reset} ${u}: ${c.oldValue}`):o.push(`      ${u}: ${c.value}`));o.length>0&&(i.push(`  ${e.dim}${l}${e.reset}`),i.push(...o))}i.length>0&&(console.log(`
${e.cyan}[${r}]${e.reset}`),i.forEach(l=>console.log(l)))}let t=[];if(q.changed&&t.push(`${e.yellow}${q.changed} changed${e.reset}`),q.added&&t.push(`${e.green}${q.added} added${e.reset}`),q.removed&&t.push(`${e.red}${q.removed} removed${e.reset}`),Kt==="all"&&q.unchanged&&t.push(`${q.unchanged} unchanged`),console.log(`
Summary: ${t.length?t.join(", "):"no differences"}`),P["order-risk"]&&$e.length>0){console.log(`
Order Risks:`);for(let{contextKey:r,rows:n}of $e){let i=n.filter(o=>o.type!=="equal");if(i.length===0)continue;let l=Math.max(6,...i.map(o=>(o.oldSelector??"-").length)),a=Math.max(6,...i.map(o=>(o.newSelector??"-").length));console.log(`
${e.cyan}[${r}]${e.reset}`),console.log(`  ${"\u65E7 CSS".padEnd(l)}  ${"\u65B0 CSS".padEnd(a)}  \u72B6\u614B`),console.log(`  ${"-".repeat(l)}  ${"-".repeat(a)}  ------`);for(let o of i){let u=(o.oldSelector??"-").padEnd(l),c=(o.newSelector??"-").padEnd(a);if(o.type==="moved"){let p=o.sameSpecificity?` ${e.dim}(\u8A73\u7D30\u5EA6\u304C\u540C\u3058)${e.reset}`:"";if(console.log(`  ${u}  ${c}  ${e.yellow}\u26A0 \u9806\u5E8F\u5909\u66F4${e.reset}${p}`),o.conflictingProps&&o.conflictingProps.length>0)for(let f of o.conflictingProps){let h=d=>d.important?" !important":"";console.log(`    ${e.dim}${f.prop}: ${f.oldEffective.value}${h(f.oldEffective)} \u2192 ${f.newEffective.value}${h(f.newEffective)}${e.reset}`)}}else o.type==="deleted"?console.log(`  ${u}  ${"-".padEnd(a)}  ${e.red}- \u524A\u9664${e.reset}`):o.type==="added"&&console.log(`  ${"-".padEnd(l)}  ${c}  ${e.green}+ \u8FFD\u52A0${e.reset}`)}}}}process.exit(ds?1:0);
