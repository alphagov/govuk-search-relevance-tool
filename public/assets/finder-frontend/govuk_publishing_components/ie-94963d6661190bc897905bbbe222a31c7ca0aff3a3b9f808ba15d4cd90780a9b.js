var JSON;!function(e,i){function s(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function u(){var e=j.elements;return"string"==typeof e?e.split(" "):e}function t(e,t){var n=j.elements;"string"!=typeof n&&(n=n.join(" ")),"string"!=typeof e&&(e=e.join(" ")),j.elements=n+" "+e,a(t)}function p(e){var t=x[e[E]];return t||(t={},N++,e[E]=N,x[N]=t),t}function r(e,t,n){return t||(t=i),l?t.createElement(e):(n||(n=p(t)),!(r=n.cache[e]?n.cache[e].cloneNode():S.test(e)?(n.cache[e]=n.createElem(e)).cloneNode():n.createElem(e)).canHaveChildren||b.test(e)||r.tagUrn?r:n.frag.appendChild(r));var r}function n(e,t){if(e||(e=i),l)return e.createDocumentFragment();for(var n=(t=t||p(e)).frag.cloneNode(),r=0,o=u(),a=o.length;r<a;r++)n.createElement(o[r]);return n}function o(t,n){n.cache||(n.cache={},n.createElem=t.createElement,n.createFrag=t.createDocumentFragment,n.frag=n.createFrag()),t.createElement=function(e){return j.shivMethods?r(e,t,n):n.createElem(e)},t.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+u().join().replace(/[\w\-:]+/g,function(e){return n.createElem(e),n.frag.createElement(e),'c("'+e+'")'})+");return n}")(j,n.frag)}function a(e){e||(e=i);var t=p(e);return!j.shivCSS||c||t.hasCSS||(t.hasCSS=!!s(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),l||o(e,t),e}function d(e){for(var t,n=e.getElementsByTagName("*"),r=n.length,o=RegExp("^(?:"+u().join("|")+")$","i"),a=[];r--;)t=n[r],o.test(t.nodeName)&&a.push(t.applyElement(f(t)));return a}function f(e){for(var t,n=e.attributes,r=n.length,o=e.ownerDocument.createElement(w+":"+e.nodeName);r--;)(t=n[r]).specified&&o.setAttribute(t.nodeName,t.nodeValue);return o.style.cssText=e.style.cssText,o}function h(e){for(var t,n=e.split("{"),r=n.length,o=RegExp("(^|[\\s,>+~])("+u().join("|")+")(?=[[\\s,>+~#.:]|$)","gi"),a="$1"+w+"\\:$2";r--;)(t=n[r]=n[r].split("}"))[t.length-1]=t[t.length-1].replace(o,a),n[r]=t.join("}");return n.join("{")}function m(e){for(var t=e.length;t--;)e[t].removeNode()}function g(u){function f(){clearTimeout(e._removeSheetTimer),c&&c.removeNode(!0),c=null}var c,l,e=p(u),t=u.namespaces,n=u.parentWindow;return!C||u.printShived||("undefined"==typeof t[w]&&t.add(w),n.attachEvent("onbeforeprint",function(){f();for(var e,t,n,r=u.styleSheets,o=[],a=r.length,i=Array(a);a--;)i[a]=r[a];for(;n=i.pop();)if(!n.disabled&&T.test(n.media)){try{t=(e=n.imports).length}catch(g){t=0}for(a=0;a<t;a++)i.push(e[a]);try{o.push(n.cssText)}catch(g){}}o=h(o.reverse().join("")),l=d(u),c=s(u,o)}),n.attachEvent("onafterprint",function(){m(l),clearTimeout(e._removeSheetTimer),e._removeSheetTimer=setTimeout(f,500)}),u.printShived=!0),u}var c,l,y="3.7.3",v=e.html5||{},b=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,S=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,E="_html5shiv",N=0,x={};!function(){try{var e=i.createElement("a");e.innerHTML="<xyz></xyz>",c="hidden"in e,l=1==e.childNodes.length||function(){i.createElement("a");var e=i.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(s){l=c=!0}}();var j={elements:v.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:y,shivCSS:!1!==v.shivCSS,supportsUnknownElements:l,shivMethods:!1!==v.shivMethods,type:"default",shivDocument:a,createElement:r,createDocumentFragment:n,addElements:t};e.html5=j,a(i);var O,T=/^$|\b(?:all|print)\b/,w="html5shiv",C=!(l||(O=i.documentElement,"undefined"==typeof i.namespaces||"undefined"==typeof i.parentWindow||"undefined"==typeof O.applyElement||"undefined"==typeof O.removeNode||"undefined"==typeof e.attachEvent));j.type+=" print",(j.shivPrint=g)(i),"object"==typeof module&&module.exports&&(module.exports=j)}("undefined"!=typeof window?window:this,document),JSON||(JSON={}),function(){"use strict";function f(e){return e<10?"0"+e:e}function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,o,a,i,u=gap,f=t[e];switch(f&&"object"==typeof f&&"function"==typeof f.toJSON&&(f=f.toJSON(e)),"function"==typeof rep&&(f=rep.call(t,e,f)),typeof f){case"string":return quote(f);case"number":return isFinite(f)?String(f):"null";case"boolean":case"null":return String(f);case"object":if(!f)return"null";if(gap+=indent,i=[],"[object Array]"===Object.prototype.toString.apply(f)){for(a=f.length,n=0;n<a;n+=1)i[n]=str(n,f)||"null";return o=0===i.length?"[]":gap?"[\n"+gap+i.join(",\n"+gap)+"\n"+u+"]":"["+i.join(",")+"]",gap=u,o}if(rep&&"object"==typeof rep)for(a=rep.length,n=0;n<a;n+=1)"string"==typeof rep[n]&&(o=str(r=rep[n],f))&&i.push(quote(r)+(gap?": ":":")+o);else for(r in f)Object.prototype.hasOwnProperty.call(f,r)&&(o=str(r,f))&&i.push(quote(r)+(gap?": ":":")+o);return o=0===i.length?"{}":gap?"{\n"+gap+i.join(",\n"+gap)+"\n"+u+"}":"{"+i.join(",")+"}",gap=u,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;"function"!=typeof JSON.stringify&&(JSON.stringify=function(e,t,n){var r;if(indent=gap="","number"==typeof n)for(r=0;r<n;r+=1)indent+=" ";else"string"==typeof n&&(indent=n);if((rep=t)&&"function"!=typeof t&&("object"!=typeof t||"number"!=typeof t.length))throw new Error("JSON.stringify");return str("",{"":e})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(e,t){var n,r,o=e[t];if(o&&"object"==typeof o)for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&((r=walk(o,n))!==undefined?o[n]=r:delete o[n]);return reviver.call(e,t,o)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();