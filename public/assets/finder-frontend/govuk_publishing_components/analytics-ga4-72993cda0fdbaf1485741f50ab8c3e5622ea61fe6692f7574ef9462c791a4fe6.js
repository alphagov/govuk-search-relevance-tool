this.Element&&function(t){t.matches=t.matches||t.matchesSelector||t.webkitMatchesSelector||t.msMatchesSelector||function(t){for(var e=this,n=(e.parentNode||e.document).querySelectorAll(t),i=-1;n[++i]&&n[i]!=e;);return!!n[i]}}(Element.prototype),this.Element&&function(t){t.closest=t.closest||function(t){for(var e=this;e.matches&&!e.matches(t);)e=e.parentNode;return e.matches?e:null}}(Element.prototype),window.GOVUK=window.GOVUK||{},window.GOVUK.analyticsGa4=window.GOVUK.analyticsGa4||{},function(){"use strict";var t={load:function(){var t=document.getElementsByTagName("script")[0],e=document.createElement("script");if(e.async=!0,window.GOVUK.analyticsGa4.vars.gtag_id){window.dataLayer=window.dataLayer||[];var n=function(){window.dataLayer.push(arguments)};n("js",new Date),n("config",window.GOVUK.analyticsGa4.vars.gtag_id),e.src="//www.googletagmanager.com/gtag/js?id="+window.GOVUK.analyticsGa4.vars.gtag_id,t.parentNode.insertBefore(e,t)}else{window.dataLayer=window.dataLayer||[],window.dataLayer.push({"gtm.blocklist":["customPixels","customScripts","html","nonGoogleScripts"]}),window.dataLayer.push({"gtm.start":(new Date).getTime(),event:"gtm.js"});var i=window.GOVUK.analyticsGa4.vars.auth||"",a=window.GOVUK.analyticsGa4.vars.preview||"";i&&(i="&gtm_auth="+i),a&&(a="&gtm_preview="+a+"&gtm_cookies_win=x"),this.googleSrc="https://www.googletagmanager.com/gtm.js?id="+window.GOVUK.analyticsGa4.vars.id+i+a,e.src=this.googleSrc,t.parentNode.insertBefore(e,t)}},sendData:function(t){t.govuk_gem_version=this.getGemVersion(),window.dataLayer.push(t)},getGemVersion:function(){return window.GOVUK.analyticsGa4.vars.gem_version||"not found"},trackFunctions:{findTrackingAttributes:function(t,e){return t.hasAttribute("["+e+"]")?t:t.closest("["+e+"]")},populateLinkPathParts:function(t){var e="";if("/"!==(e=this.hrefIsRelative(t)||this.isMailToLink(t)?t:t.replace(/^(http:||https:)?(\/\/)([^\/]*)/,""))&&0!==e.length){for(var n=e.match(/.{1,100}/g),i={},a=0;a<5;a++)i[(a+1).toString()]=n[a];return i}},hrefIsRelative:function(t){return"/"===t[0]&&"/"!==t[1]},hrefIsAnchor:function(t){return"#"===t[0]},isMailToLink:function(t){return"mailto:"===t.substring(0,7)},getClickType:function(t){switch(t.type){case"click":return t.ctrlKey?"ctrl click":t.metaKey?"command/win click":t.shiftKey?"shift click":"primary click";case"mousedown":return"middle click";case"contextmenu":return"secondary click"}},isInternalLink:function(t){var e=window.GOVUK.analyticsGa4.vars.internalDomains;if(this.hrefIsRelative(t)||this.hrefIsAnchor(t))return!0;for(var n=!1,i=0;i<e.length;i++){var a=e[i];this.hrefPointsToDomain(t,a)&&(n=!0)}return n},isExternalLink:function(t){return!this.isInternalLink(t)},hrefPointsToDomain:function(t,e){return"/"!==e.substring(e.length)&&(e+="/"),"/"!==t.substring(t.length)&&(t+="/"),new RegExp("^((http)*(s)*(:)*//)("+e+")","g").test(t)},removeLinesAndExtraSpaces:function(t){return t=(t=(t=t.trim()).replace(/(\r\n|\n|\r)/gm," ")).replace(/\s+/g," ")},removeCrossDomainParams:function(t){return-1===t.indexOf("_ga")&&-1===t.indexOf("_gl")||(t=(t=(t=t.replaceAll(/_g[al]=([^&]*)/g,"")).replaceAll(/(&&)+/g,"&")).replace("?&","?"),(this.stringEndsWith(t,"?")||this.stringEndsWith(t,"&"))&&(t=t.substring(0,t.length-1))),t},stringStartsWith:function(t,e){return t.substring(0,e.length)===e},stringEndsWith:function(t,e){return t.substring(t.length-e.length,t.length)===e},populateLinkDomain:function(t){return this.isMailToLink(t)?undefined:this.hrefIsRelative(t)||this.hrefIsAnchor(t)?this.getProtocol()+"//"+this.getHostname():/^(http:||https:)?(\/\/)([^\/]*)/.exec(t)[0]},getProtocol:function(){return window.location.protocol},getHostname:function(){return window.location.hostname},appendDomainsWithoutWWW:function(t){for(var e=0;e<t.length;e++){var n=t[e];if(this.stringStartsWith(n,"www.")){var i=n.replace("www.","");t.push(i)}}}}};window.GOVUK.analyticsGa4.core=t}(),function(t){"use strict";var e=t.GOVUK||{},n=function(){this.undefined=undefined};n.prototype.eventSchema=function(){return{event:this.undefined,event_data:{event_name:this.undefined,type:this.undefined,url:this.undefined,text:this.undefined,index:this.undefined,index_total:this.undefined,section:this.undefined,action:this.undefined,external:this.undefined,method:this.undefined,link_domain:this.undefined,link_path_parts:this.undefined}}},e.analyticsGa4=e.analyticsGa4||{},e.analyticsGa4.Schemas=n,t.GOVUK=e}(window),function(t){"use strict";function e(){return 0<document.querySelectorAll('meta[name="govuk:static-analytics:strip-dates"]').length}function n(){return 0<document.querySelectorAll('meta[name="govuk:static-analytics:strip-postcodes"]').length}function i(){var t=document.querySelector('meta[name="govuk:static-analytics:strip-query-string-parameters"]'),e=!1;t&&(e=t.getAttribute("content"));var n=[];if(e)for(var i=e.split(","),a=0;a<i.length;a++)n.push(i[a].trim());return n}var a=t.GOVUK||{},o=/[^\s=/?&#]+(?:@|%40)[^\s=/?&]+/g,r=/\b[A-PR-UWYZ][A-HJ-Z]?[0-9][0-9A-HJKMNPR-Y]?(?:[\s+]|%20)*[0-9](?!refund)[ABD-HJLNPQ-Z]{2,3}\b/gi,s=/\d{4}(-?)\d{2}(-?)\d{2}/g,c=/[|\\{}()[\]^$+*?.]/g,l=/reset_password_token=[a-zA-Z0-9-]+/g,d=/unlock_token=[a-zA-Z0-9-]+/g,u=/state=.[^&]+/g,h=function(){this.stripDatePII=e(),this.stripPostcodePII=n(),this.queryStringParametersToStrip=i()};h.prototype.PIISafe=function(t){this.value=t},h.prototype.stripPII=function(t){return"string"==typeof t?this.stripPIIFromString(t):"[object Array]"===Object.prototype.toString.call(t)||"[object Arguments]"===Object.prototype.toString.call(t)?this.stripPIIFromArray(t):"object"==typeof t?this.stripPIIFromObject(t):t},h.prototype.stripPIIWithOverride=function(t,e,n){var i=this.stripDatePII,a=this.stripPostcodePII;this.stripDatePII=e,this.stripPostcodePII=n;var o=this.stripPII(t);return this.stripDatePII=i,this.stripPostcodePII=a,o},h.prototype.stripPIIFromString=function(t){var e=t.replace(o,"[email]");return e=(e=(e=e.replace(l,"reset_password_token=[reset_password_token]")).replace(d,"unlock_token=[unlock_token]")).replace(u,"state=[state]"),e=this.stripQueryStringParameters(e),!0===this.stripDatePII&&(e=e.replace(s,"[date]")),!0===this.stripPostcodePII&&(e=e.replace(r,"[postcode]")),e},h.prototype.stripPIIFromObject=function(t){if(t){if(t instanceof this.PIISafe)return t.value;for(var e in t){var n=t[e];t[e]=this.stripPII(n)}return t}},h.prototype.stripPIIFromArray=function(t){for(var e=0,n=t.length;e<n;e++){var i=t[e];t[e]=this.stripPII(i)}return t},h.prototype.stripQueryStringParameters=function(t){for(var e=0;e<this.queryStringParametersToStrip.length;e++){var n=this.queryStringParametersToStrip[e],i=n.replace(c,"\\$&"),a=new RegExp("((?:\\?|&)"+i+"=)(?:[^&#\\s]*)","g");t=t.replace(a,"$1["+n+"]")}return t},a.analyticsGa4=a.analyticsGa4||{},a.analyticsGa4.PIIRemover=h,t.GOVUK=a}(window),window.GOVUK=window.GOVUK||{},window.GOVUK.analyticsGa4=window.GOVUK.analyticsGa4||{},window.GOVUK.analyticsGa4.analyticsModules=window.GOVUK.analyticsGa4.analyticsModules||{},function(t){"use strict";var e={PIIRemover:new window.GOVUK.analyticsGa4.PIIRemover,nullValue:undefined,init:function(t){if(window.dataLayer){var e={event:"page_view",page_view:{location:this.getLocation(),referrer:t||this.getReferrer(),title:this.getTitle(),status_code:this.getStatusCode(),document_type:this.getMetaContent("format"),publishing_app:this.getMetaContent("publishing-app"),rendering_app:this.getMetaContent("rendering-app"),schema_name:this.getMetaContent("schema-name"),content_id:this.getMetaContent("content-id"),browse_topic:this.getMetaContent("section"),taxon_slug:this.getMetaContent("taxon-slug"),taxon_id:this.getMetaContent("taxon-id"),taxonomy_level1:this.getMetaContent("themes"),taxon_slugs:this.getMetaContent("taxon-slugs"),taxon_ids:this.getMetaContent("taxon-ids"),language:this.getLanguage(),history:this.getHistory(),withdrawn:this.getWithDrawn(),first_published_at:this.stripTimeFrom(this.getMetaContent("first-published-at")),updated_at:this.stripTimeFrom(this.getMetaContent("updated-at")),public_updated_at:this.stripTimeFrom(this.getMetaContent("public-updated-at")),publishing_government:this.getMetaContent("publishing-government"),political_status:this.getMetaContent("political-status"),primary_publishing_organisation:this.getMetaContent("primary-publishing-organisation"),organisations:this.getMetaContent("analytics:organisations"),world_locations:this.getMetaContent("analytics:world-locations"),dynamic:t?"true":"false"}};window.GOVUK.analyticsGa4.core.sendData(e)}},getLocation:function(){return this.PIIRemover.stripPII(document.location.href)},getReferrer:function(){return this.PIIRemover.stripPIIWithOverride(document.referrer,!0,!0)},getTitle:function(){return this.PIIRemover.stripPII(document.title)},getStatusCode:function(){return window.httpStatusCode?window.httpStatusCode.toString():"200"},getMetaContent:function(t){var e=document.querySelector('meta[name="govuk:'+t+'"]');return e?e.getAttribute("content"):this.nullValue},getLanguage:function(){var t=document.getElementById("content");return t&&t.getAttribute("lang")||this.nullValue},getHistory:function(){return"true"===this.getMetaContent("content-has-history")?"true":"false"},getWithDrawn:function(){return"withdrawn"===this.getMetaContent("withdrawn")?"true":"false"},stripTimeFrom:function(t){return t!==undefined?t.split("T")[0]:this.nullValue}};t.PageViewTracker=e}(window.GOVUK.analyticsGa4.analyticsModules),function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e():"function"==typeof define&&define.amd?define("GOVUKFrontend",e):e()}(0,function(){"use strict";(function(){"document"in this&&"matches"in document.documentElement||(Element.prototype.matches=Element.prototype.webkitMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.mozMatchesSelector||function a(t){for(var e=this,n=(e.document||e.ownerDocument).querySelectorAll(t),i=0;n[i]&&n[i]!==e;)++i;return!!n[i]})}).call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof global&&global||{}),function(){"document"in this&&"closest"in document.documentElement||(Element.prototype.closest=function n(t){for(var e=this;e;){if(e.matches(t))return e;e="SVGElement"in window&&e instanceof SVGElement?e.parentNode:e.parentElement}return null})}.call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof global&&global||{})}),window.GOVUK=window.GOVUK||{},window.GOVUK.analyticsGa4=window.GOVUK.analyticsGa4||{},window.GOVUK.analyticsGa4.analyticsModules=window.GOVUK.analyticsGa4.analyticsModules||{},function(){"use strict";var t={init:function(t){window.dataLayer&&(t=t||{},this.internalDownloadPaths=t.internalDownloadPaths||["/government/uploads/"],this.dedicatedDownloadDomains=t.dedicatedDownloadDomains||["assets.publishing.service.gov.uk"],window.GOVUK.analyticsGa4.core.trackFunctions.appendDomainsWithoutWWW(this.dedicatedDownloadDomains),this.handleClick=this.handleClick.bind(this),this.handleMousedown=this.handleMousedown.bind(this),document.querySelector("body").addEventListener("click",this.handleClick),document.querySelector("body").addEventListener("contextmenu",this.handleClick),document.querySelector("body").addEventListener("mousedown",this.handleMousedown))},stopTracking:function(){document.querySelector("body").removeEventListener("click",this.handleClick),document.querySelector("body").removeEventListener("contextmenu",this.handleClick),document.querySelector("body").removeEventListener("mousedown",this.handleMousedown)},handleClick:function(t){var e=t.target;if("A"!==e.tagName&&(e=e.closest("a")),e&&!e.closest("[data-ga4-link]")){var n=e.getAttribute("href");if(n){var i={};if(window.GOVUK.analyticsGa4.core.trackFunctions.isMailToLink(n)?(i.event_name="navigation",i.type="email",i.external="true"):this.isDownloadLink(n)?(i.event_name="file_download",i.type=this.isPreviewLink(n)?"preview":"generic download",i.external=window.GOVUK.analyticsGa4.core.trackFunctions.isExternalLink(n)?"true":"false"):window.GOVUK.analyticsGa4.core.trackFunctions.isExternalLink(n)&&(i.event_name="navigation",i.type="generic link",i.external="true"),0<Object.keys(i).length){i.url=n,i.url&&(i.url=window.GOVUK.analyticsGa4.core.trackFunctions.removeCrossDomainParams(i.url),i.link_domain=window.GOVUK.analyticsGa4.core.trackFunctions.populateLinkDomain(i.url),i.link_path_parts=window.GOVUK.analyticsGa4.core.trackFunctions.populateLinkPathParts(i.url)),i.text=window.GOVUK.analyticsGa4.core.trackFunctions.removeLinesAndExtraSpaces(e.textContent),i.method=window.GOVUK.analyticsGa4.core.trackFunctions.getClickType(t);var a=(new window.GOVUK.analyticsGa4.Schemas).eventSchema();for(var o in a.event="event_data",i)o in a.event_data&&(a.event_data[o]=i[o]);window.GOVUK.analyticsGa4.core.sendData(a)}}}},handleMousedown:function(t){1===t.button&&this.handleClick(t)},isDownloadLink:function(t){if(window.GOVUK.analyticsGa4.core.trackFunctions.isInternalLink(t)&&this.hrefPointsToDownloadPath(t))return!0;for(var e=!1,n=0;n<this.dedicatedDownloadDomains.length;n++){var i=this.dedicatedDownloadDomains[n];window.GOVUK.analyticsGa4.core.trackFunctions.hrefPointsToDomain(t,i)&&(e=!0)}return e},isPreviewLink:function(t){return/\.\w+\/preview/i.test(t)},hrefPointsToDownloadPath:function(t){for(var e=!1,n=0;n<this.internalDownloadPaths.length;n++){var i=this.internalDownloadPaths[n];-1!==t.indexOf(i)&&(e=!0)}return e}};window.GOVUK.analyticsGa4.analyticsModules.Ga4SpecialistLinkTracker=t}(),window.GOVUK=window.GOVUK||{},window.GOVUK.Modules=window.GOVUK.Modules||{},function(t){"use strict";function e(t){this.module=t,this.trackingTrigger="data-ga4-link",this.trackLinksOnly=this.module.hasAttribute("data-ga4-track-links-only"),this.limitToElementClass=this.module.getAttribute("data-ga4-limit-to-element-class")}e.prototype.init=function(){var t=window.GOVUK.getConsentCookie();t&&t.settings?this.startModule():(this.startModule=this.startModule.bind(this),window.addEventListener("cookie-consent",this.startModule))},e.prototype.startModule=function(){window.dataLayer&&(this.handleClick=this.handleClick.bind(this),this.handleMousedown=this.handleMousedown.bind(this),this.module.addEventListener("click",this.handleClick),this.module.addEventListener("contextmenu",this.handleClick),this.module.addEventListener("mousedown",this.handleMousedown))},e.prototype.handleClick=function(t){var e=t.target;this.trackLinksOnly?this.trackLinksOnly&&e.closest("a")&&(this.limitToElementClass?e.closest("."+this.limitToElementClass)&&this.trackClick(t):this.trackClick(t)):this.trackClick(t)},e.prototype.handleMousedown=function(t){1===t.button&&this.handleClick(t)},e.prototype.trackClick=function(t){var e=window.GOVUK.analyticsGa4.core.trackFunctions.findTrackingAttributes(t.target,this.trackingTrigger);if(e){var n=(new window.GOVUK.analyticsGa4.Schemas).eventSchema();try{var i=e.getAttribute(this.trackingTrigger);i=JSON.parse(i)}catch(r){return void console.error("GA4 configuration error: "+r.message,window.location)}n.event="event_data";var a=i.text||t.target.textContent;for(var o in i.text=window.GOVUK.analyticsGa4.core.trackFunctions.removeLinesAndExtraSpaces(a),i.url=window.GOVUK.analyticsGa4.core.trackFunctions.removeCrossDomainParams(this.findLink(t.target).getAttribute("href")),i.link_domain=window.GOVUK.analyticsGa4.core.trackFunctions.populateLinkDomain(i.url),i.link_path_parts=window.GOVUK.analyticsGa4.core.trackFunctions.populateLinkPathParts(i.url),i.method=window.GOVUK.analyticsGa4.core.trackFunctions.getClickType(t),i.external=window.GOVUK.analyticsGa4.core.trackFunctions.isExternalLink(i.url)?"true":"false",i)o in n.event_data&&(n.event_data[o]=i[o]);window.GOVUK.analyticsGa4.core.sendData(n)}},e.prototype.findLink=function(t){return"A"===t.tagName?t:t.closest("a")},t.Ga4LinkTracker=e}(window.GOVUK.Modules),window.GOVUK=window.GOVUK||{},window.GOVUK.Modules=window.GOVUK.Modules||{},function(t){"use strict";function e(t){this.module=t,this.trackingTrigger="data-ga4-event"}e.prototype.init=function(){var t=window.GOVUK.getConsentCookie();t&&t.settings?this.startModule():(this.startModule=this.startModule.bind(this),window.addEventListener("cookie-consent",this.startModule))},e.prototype.startModule=function(){window.dataLayer&&this.module.addEventListener("click",this.trackClick.bind(this),!0)},e.prototype.trackClick=function(t){var e=window.GOVUK.analyticsGa4.core.trackFunctions.findTrackingAttributes(t.target,this.trackingTrigger);if(e){var n=(new window.GOVUK.analyticsGa4.Schemas).eventSchema();try{var i=e.getAttribute(this.trackingTrigger);i=JSON.parse(i)}catch(d){return void console.error("GA4 configuration error: "+d.message,window.location)}for(var a in n.event="event_data",i)a in n.event_data&&(n.event_data[a]=i[a]);if(e.closest("[data-ga4-expandable]"))var o=this.getClosestAttribute(e,"aria-expanded");var r=e.closest("details");if(o)n.event_data.text=i.text||e.innerText,n.event_data.action="false"===o?"opened":"closed";else if(r){n.event_data.text=i.text||r.textContent;var s=r.getAttribute("open");n.event_data.action=null==s?"opened":"closed"}if(t.target.closest(".gem-c-tabs")){var c=t.target.closest("a");if(c){var l=c.getAttribute("href");l&&(n.event_data.url=l)}}window.GOVUK.analyticsGa4.core.sendData(n)}},e.prototype.getClosestAttribute=function(t,e){var n=t.getAttribute(e),i=t.querySelector("["+e+"]");return n||""===n?n:i?i.getAttribute(e):void 0},t.Ga4EventTracker=e}(window.GOVUK.Modules),function(t){"use strict";var h=t.GOVUK||{};h.analyticsGa4=h.analyticsGa4||{},h.analyticsGa4.Ga4EcommerceTracker={PIIRemover:new h.analyticsGa4.PIIRemover,DEFAULT_LIST_TITLE:"Site search results",init:function(t){if(window.dataLayer){var e=!t;if(this.searchResultsBlocks=document.querySelectorAll("[data-ga4-ecommerce]"),0===!this.searchResultsBlocks.length)return;if(t){var n=window.GOVUK.analyticsGa4.analyticsModules.PageViewTracker;n&&n.init(t)}for(var i=0;i<this.searchResultsBlocks.length;i++)this.trackSearchResults(this.searchResultsBlocks[i]),e&&this.searchResultsBlocks[i].addEventListener("click",this.handleClick.bind(this))}},trackSearchResults:function(t){var e=this.populateEcommerceSchema(t,!1,null);this.clearPreviousEcommerceObject(),h.analyticsGa4.core.sendData(e)},handleClick:function(t){var e=t.target.closest("[data-ga4-ecommerce]");if(t.target.getAttribute("data-ecommerce-path")){var n=t.target,i=this.populateEcommerceSchema(e,!0,n);this.clearPreviousEcommerceObject(),h.analyticsGa4.core.sendData(i)}},populateEcommerceSchema:function(t,e,n){var i=this.PIIRemover.stripPII(t.getAttribute("data-search-query")).substring(0,100).toLowerCase(),a=t.getAttribute("data-ecommerce-variant")||undefined,o=t.querySelectorAll("[data-ecommerce-row]"),r=t.getAttribute("data-list-title")||this.DEFAULT_LIST_TITLE,s=parseInt(t.getAttribute("data-ecommerce-start-index"),10),c={event:"search_results",search_results:{event_name:e&&n?"select_item":"view_item_list",term:i,sort:a,results:this.getResultsCount(t),ecommerce:{items:[]}}};if(e&&n)c.search_results.ecommerce.items.push({item_id:n.getAttribute("data-ecommerce-path"),item_name:n.textContent,item_list_name:r,index:this.getIndex(n,s)}),c.event_data={external:h.analyticsGa4.core.trackFunctions.isExternalLink(n.getAttribute("data-ecommerce-path"))?"true":"false"};else for(var l=0;l<o.length;l++){var d=o[l],u=d.getAttribute("data-ecommerce-path");d.getAttribute("data-ecommerce-index")||d.setAttribute("data-ecommerce-index",l+1),c.search_results.ecommerce.items.push({item_id:u,item_list_name:r,index:this.getIndex(d,s)})}return c},getIndex:function(t,e){return parseInt(t.getAttribute("data-ecommerce-index"))+e-1},clearPreviousEcommerceObject:function(){h.analyticsGa4.core.sendData({search_results:{ecommerce:null}})},getResultsCount:function(t){var e=t.querySelector("#js-result-count");return e?(e=(e=e.textContent.replace(",","")).split(" ")[0],parseInt(e)):null}},t.GOVUK=h}(window),window.GOVUK=window.GOVUK||{},window.GOVUK.analyticsGa4=window.GOVUK.analyticsGa4||{};var initFunction=function(){var t=window.GOVUK.getConsentCookie();if(t&&t.usage){window.GOVUK.analyticsGa4.vars.internalDomains=[],window.GOVUK.analyticsGa4.vars.internalDomains.push(window.GOVUK.analyticsGa4.core.trackFunctions.getHostname()),window.GOVUK.analyticsGa4.core.trackFunctions.appendDomainsWithoutWWW(window.GOVUK.analyticsGa4.vars.internalDomains),window.GOVUK.analyticsGa4.core.load();var e=window.GOVUK.analyticsGa4.analyticsModules;for(var n in e){var i=e[n];"function"==typeof i.init&&i.init()}}else window.addEventListener("cookie-consent",window.GOVUK.analyticsGa4.init)};window.GOVUK.analyticsGa4.init=initFunction;