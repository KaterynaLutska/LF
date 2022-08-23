

 (function($) {
      $.fn.hoverIntent = function(handlerIn, handlerOut, selector) {
        var cfg = {
          interval: 100,
          sensitivity: 6,
          timeout: 50
        };
        if (typeof handlerIn === "object") {
          cfg = $.extend(cfg, handlerIn)
        } else {
          if ($.isFunction(handlerOut)) {
            cfg = $.extend(cfg, {
              over: handlerIn,
              out: handlerOut,
              selector: selector
            })
          } else {
            cfg = $.extend(cfg, {
              over: handlerIn,
              out: handlerIn,
              selector: handlerOut
            })
          }
        }
        var cX, cY, pX, pY;
        var track = function(ev) {
          cX = ev.pageX;
          cY = ev.pageY
        };
        var compare = function(ev, ob) {
          ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
          if (Math.sqrt((pX - cX) * (pX - cX) + (pY - cY) * (pY - cY)) < cfg.sensitivity) {
            $(ob).off("mousemove.hoverIntent", track);
            ob.hoverIntent_s = true;
            return cfg.over.apply(ob, [ev])
          } else {
            pX = cX;
            pY = cY;
            ob.hoverIntent_t = setTimeout(function() {
              compare(ev, ob)
            }, cfg.interval)
          }
        };
        var delay = function(ev, ob) {
          ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
          ob.hoverIntent_s = false;
          return cfg.out.apply(ob, [ev])
        };
        var handleHover = function(e) {
          var ev = $.extend({}, e);
          var ob = this;
          if (ob.hoverIntent_t) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t)
          }
          if (e.type === "mouseenter") {
            pX = ev.pageX;
            pY = ev.pageY;
            $(ob).on("mousemove.hoverIntent", track);
            if (!ob.hoverIntent_s) {
              ob.hoverIntent_t = setTimeout(function() {
                compare(ev, ob)
              }, cfg.interval)
            }
          } else {
            $(ob).off("mousemove.hoverIntent", track);
            if (ob.hoverIntent_s) {
              ob.hoverIntent_t = setTimeout(function() {
                delay(ev, ob)
              }, cfg.timeout)
            }
          }
        };
        return this.on({
          "mouseenter.hoverIntent": handleHover,
          "mouseleave.hoverIntent": handleHover
        }, cfg.selector)
      }
    })(jQuery);

// ---------------------------------------------------------------------------
// Image.switchImage
// helps to switch variant images on variant selection
// ---------------------------------------------------------------------------
Shopify.Image = {
  preload: function (images, size) {
    for (var i=0; i < images.length; i++) {
      var image = images[i];

      this.loadImage(this.getSizedImageUrl(image, size));
    }
  },

  loadImage: function (path) {
    new Image().src = path;
  },

  switchImage: function (image, element, callback) {
    if (!image || !element) {
      return;
    }

    var size = this.imageSize(element.src)
    var imageUrl = this.getSizedImageUrl(image.src, size);

    if (callback) {
      callback(imageUrl, image, element);
    } else {
      element.src = imageUrl;
    }
  },

  imageSize: function (src) {
    var match = src.match(/_(1024x1024|2048x2048|pico|icon|thumb|small|compact|medium|large|grande)\./);

    if (match != null) {
      return match[1];
    } else {
      return null;
    }
  },

  getSizedImageUrl: function (src, size) {
    if (size == null) {
      return src;
    }

    if (size == 'master') {
      return this.removeProtocol(src);
    }

    var match  = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

    if (match != null) {
      var prefix = src.split(match[0]);
      var suffix = match[0];

      return this.removeProtocol(prefix[0] + "_" + size + suffix);
    } else {
      return null;
    }
  },

  removeProtocol: function (path) {
    return path.replace(/http(s)?:/, "");
  }
};


/*! @vimeo/player v2.8.1 | (c) 2019 Vimeo | MIT License | https://github.com/vimeo/player.js */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):((e=e||self).Vimeo=e.Vimeo||{},e.Vimeo.Player=t())}(this,function(){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var e="undefined"!=typeof global&&"[object global]"==={}.toString.call(global);function i(e,t){return 0===e.indexOf(t.toLowerCase())?e:"".concat(t.toLowerCase()).concat(e.substr(0,1).toUpperCase()).concat(e.substr(1))}function s(e){return/^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(e)}function l(){var e,t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},n=t.id,r=t.url,o=n||r;if(!o)throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");if(e=o,!isNaN(parseFloat(e))&&isFinite(e)&&Math.floor(e)==e)return"https://vimeo.com/".concat(o);if(s(o))return o.replace("http:","https:");if(n)throw new TypeError("“".concat(n,"” is not a valid video id."));throw new TypeError("“".concat(o,"” is not a vimeo.com url."))}var t=void 0!==Array.prototype.indexOf,n="undefined"!=typeof window&&void 0!==window.postMessage;if(!(e||t&&n))throw new Error("Sorry, the Vimeo Player API is not available in this browser.");var o="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};!function(e){if(!e.WeakMap){var n=Object.prototype.hasOwnProperty,o=function(e,t,n){Object.defineProperty?Object.defineProperty(e,t,{configurable:!0,writable:!0,value:n}):e[t]=n};e.WeakMap=function(){function e(){if(void 0===this)throw new TypeError("Constructor WeakMap requires 'new'");if(o(this,"_id","_WeakMap"+"_"+t()+"."+t()),0<arguments.length)throw new TypeError("WeakMap iterable is not supported")}function r(e,t){if(!i(e)||!n.call(e,"_id"))throw new TypeError(t+" method called on incompatible receiver "+typeof e)}function t(){return Math.random().toString().substring(2)}return o(e.prototype,"delete",function(e){if(r(this,"delete"),!i(e))return!1;var t=e[this._id];return!(!t||t[0]!==e)&&(delete e[this._id],!0)}),o(e.prototype,"get",function(e){if(r(this,"get"),i(e)){var t=e[this._id];return t&&t[0]===e?t[1]:void 0}}),o(e.prototype,"has",function(e){if(r(this,"has"),!i(e))return!1;var t=e[this._id];return!(!t||t[0]!==e)}),o(e.prototype,"set",function(e,t){if(r(this,"set"),!i(e))throw new TypeError("Invalid value used as weak map key");var n=e[this._id];return n&&n[0]===e?n[1]=t:o(e,this._id,[e,t]),this}),o(e,"_polyfill",!0),e}()}function i(e){return Object(e)===e}}("undefined"!=typeof self?self:"undefined"!=typeof window?window:o);var a,f=(function(e){var t,n,r;r=function(){var t,a,n,e=Object.prototype.toString,r="undefined"!=typeof setImmediate?function(e){return setImmediate(e)}:setTimeout;try{Object.defineProperty({},"x",{}),t=function(e,t,n,r){return Object.defineProperty(e,t,{value:n,writable:!0,configurable:!1!==r})}}catch(e){t=function(e,t,n){return e[t]=n,e}}function i(e,t){n.add(e,t),a||(a=r(n.drain))}function u(e){var t,n=typeof e;return null==e||"object"!=n&&"function"!=n||(t=e.then),"function"==typeof t&&t}function c(){for(var e=0;e<this.chain.length;e++)o(this,1===this.state?this.chain[e].success:this.chain[e].failure,this.chain[e]);this.chain.length=0}function o(e,t,n){var r,o;try{!1===t?n.reject(e.msg):(r=!0===t?e.msg:t.call(void 0,e.msg))===n.promise?n.reject(TypeError("Promise-chain cycle")):(o=u(r))?o.call(r,n.resolve,n.reject):n.resolve(r)}catch(e){n.reject(e)}}function s(e){var t=this;t.triggered||(t.triggered=!0,t.def&&(t=t.def),t.msg=e,t.state=2,0<t.chain.length&&i(c,t))}function l(e,n,r,o){for(var t=0;t<n.length;t++)!function(t){e.resolve(n[t]).then(function(e){r(t,e)},o)}(t)}function f(e){this.def=e,this.triggered=!1}function d(e){this.promise=e,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function h(e){if("function"!=typeof e)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var r=new d(this);this.then=function(e,t){var n={success:"function"!=typeof e||e,failure:"function"==typeof t&&t};return n.promise=new this.constructor(function(e,t){if("function"!=typeof e||"function"!=typeof t)throw TypeError("Not a function");n.resolve=e,n.reject=t}),r.chain.push(n),0!==r.state&&i(c,r),n.promise},this.catch=function(e){return this.then(void 0,e)};try{e.call(void 0,function(e){(function e(n){var r,o=this;if(!o.triggered){o.triggered=!0,o.def&&(o=o.def);try{(r=u(n))?i(function(){var t=new f(o);try{r.call(n,function(){e.apply(t,arguments)},function(){s.apply(t,arguments)})}catch(e){s.call(t,e)}}):(o.msg=n,o.state=1,0<o.chain.length&&i(c,o))}catch(e){s.call(new f(o),e)}}}).call(r,e)},function(e){s.call(r,e)})}catch(e){s.call(r,e)}}n=function(){var n,r,o;function i(e,t){this.fn=e,this.self=t,this.next=void 0}return{add:function(e,t){o=new i(e,t),r?r.next=o:n=o,r=o,o=void 0},drain:function(){var e=n;for(n=r=a=void 0;e;)e.fn.call(e.self),e=e.next}}}();var v=t({},"constructor",h,!1);return t(h.prototype=v,"__NPO__",0,!1),t(h,"resolve",function(n){return n&&"object"==typeof n&&1===n.__NPO__?n:new this(function(e,t){if("function"!=typeof e||"function"!=typeof t)throw TypeError("Not a function");e(n)})}),t(h,"reject",function(n){return new this(function(e,t){if("function"!=typeof e||"function"!=typeof t)throw TypeError("Not a function");t(n)})}),t(h,"all",function(t){var a=this;return"[object Array]"!=e.call(t)?a.reject(TypeError("Not an array")):0===t.length?a.resolve([]):new a(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");var r=t.length,o=Array(r),i=0;l(a,t,function(e,t){o[e]=t,++i===r&&n(o)},e)})}),t(h,"race",function(t){var r=this;return"[object Array]"!=e.call(t)?r.reject(TypeError("Not an array")):new r(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");l(r,t,function(e,t){n(t)},e)})}),h},(n=o)[t="Promise"]=n[t]||r(),e.exports&&(e.exports=n[t])}(a={exports:{}},a.exports),a.exports),d=new WeakMap;function u(e,t,n){var r=d.get(e.element)||{};t in r||(r[t]=[]),r[t].push(n),d.set(e.element,r)}function c(e,t){return(d.get(e.element)||{})[t]||[]}function h(e,t,n){var r=d.get(e.element)||{};if(!r[t])return!0;if(!n)return r[t]=[],d.set(e.element,r),!0;var o=r[t].indexOf(n);return-1!==o&&r[t].splice(o,1),d.set(e.element,r),r[t]&&0===r[t].length}var v=["autopause","autoplay","background","byline","color","height","id","loop","maxheight","maxwidth","muted","playsinline","portrait","responsive","speed","title","transparent","url","width"];function p(r){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};return v.reduce(function(e,t){var n=r.getAttribute("data-vimeo-".concat(t));return(n||""===n)&&(e[t]=""===n?1:n),e},e)}function y(e,t){var n=e.html;if(!t)throw new TypeError("An element must be provided");if(null!==t.getAttribute("data-vimeo-initialized"))return t.querySelector("iframe");var r=document.createElement("div");return r.innerHTML=n,t.appendChild(r.firstChild),t.setAttribute("data-vimeo-initialized","true"),t.querySelector("iframe")}function m(i){var a=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},u=2<arguments.length?arguments[2]:void 0;return new Promise(function(t,n){if(!s(i))throw new TypeError("“".concat(i,"” is not a vimeo.com url."));var e="https://vimeo.com/api/oembed.json?url=".concat(encodeURIComponent(i),"&domain=").concat(window.location.hostname);for(var r in a)a.hasOwnProperty(r)&&(e+="&".concat(r,"=").concat(encodeURIComponent(a[r])));var o="XDomainRequest"in window?new XDomainRequest:new XMLHttpRequest;o.open("GET",e,!0),o.onload=function(){if(404!==o.status)if(403!==o.status)try{var e=JSON.parse(o.responseText);if(403===e.domain_status_code)return y(e,u),void n(new Error("“".concat(i,"” is not embeddable.")));t(e)}catch(e){n(e)}else n(new Error("“".concat(i,"” is not embeddable.")));else n(new Error("“".concat(i,"” was not found.")))},o.onerror=function(){var e=o.status?" (".concat(o.status,")"):"";n(new Error("There was an error fetching the embed code from Vimeo".concat(e,".")))},o.send()})}function g(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){return console.warn(e),{}}return e}function w(e,t,n){if(e.element.contentWindow&&e.element.contentWindow.postMessage){var r={method:t};void 0!==n&&(r.value=n);var o=parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/,"$1"));8<=o&&o<10&&(r=JSON.stringify(r)),e.element.contentWindow.postMessage(r,e.origin)}}function b(n,r){var t,e=[];if((r=g(r)).event){if("error"===r.event)c(n,r.data.method).forEach(function(e){var t=new Error(r.data.message);t.name=r.data.name,e.reject(t),h(n,r.data.method,e)});e=c(n,"event:".concat(r.event)),t=r.data}else if(r.method){var o=function(e,t){var n=c(e,t);if(n.length<1)return!1;var r=n.shift();return h(e,t,r),r}(n,r.method);o&&(e.push(o),t=r.value)}e.forEach(function(e){try{if("function"==typeof e)return void e.call(n,t);e.resolve(t)}catch(e){}})}var k=new WeakMap,E=new WeakMap,Player=function(){function Player(u){var e,c=this,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Player),window.jQuery&&u instanceof jQuery&&(1<u.length&&window.console&&console.warn&&console.warn("A jQuery object with multiple elements was passed, using the first element."),u=u[0]),"undefined"!=typeof document&&"string"==typeof u&&(u=document.getElementById(u)),e=u,!Boolean(e&&1===e.nodeType&&"nodeName"in e&&e.ownerDocument&&e.ownerDocument.defaultView))throw new TypeError("You must pass either a valid element or a valid id.");var r=u.ownerDocument.defaultView;if("IFRAME"!==u.nodeName){var t=u.querySelector("iframe");t&&(u=t)}if("IFRAME"===u.nodeName&&!s(u.getAttribute("src")||""))throw new Error("The player element passed isn’t a Vimeo embed.");if(k.has(u))return k.get(u);this.element=u,this.origin="*";var o=new f(function(i,a){var e=function(e){if(s(e.origin)&&c.element.contentWindow===e.source){"*"===c.origin&&(c.origin=e.origin);var t=g(e.data);if(t&&"error"===t.event&&t.data&&"ready"===t.data.method){var n=new Error(t.data.message);return n.name=t.data.name,void a(n)}var r=t&&"ready"===t.event,o=t&&"ping"===t.method;if(r||o)return c.element.setAttribute("data-ready","true"),void i();b(c,t)}};if(r.addEventListener?r.addEventListener("message",e,!1):r.attachEvent&&r.attachEvent("onmessage",e),"IFRAME"!==c.element.nodeName){var t=p(u,n);m(l(t),t,u).then(function(e){var t,n,r,o=y(e,u);return c.element=o,c._originalElement=u,t=u,n=o,r=d.get(t),d.set(n,r),d.delete(t),k.set(c.element,c),e}).catch(a)}});return E.set(this,o),k.set(this.element,this),"IFRAME"===this.element.nodeName&&w(this,"ping"),this}var e,t,n;return e=Player,(t=[{key:"callMethod",value:function(n){var r=this,o=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};return new f(function(e,t){return r.ready().then(function(){u(r,n,{resolve:e,reject:t}),w(r,n,o)}).catch(t)})}},{key:"get",value:function(n){var r=this;return new f(function(e,t){return n=i(n,"get"),r.ready().then(function(){u(r,n,{resolve:e,reject:t}),w(r,n)}).catch(t)})}},{key:"set",value:function(n,r){var o=this;return new f(function(e,t){if(n=i(n,"set"),null==r)throw new TypeError("There must be a value to set.");return o.ready().then(function(){u(o,n,{resolve:e,reject:t}),w(o,n,r)}).catch(t)})}},{key:"on",value:function(e,t){if(!e)throw new TypeError("You must pass an event name.");if(!t)throw new TypeError("You must pass a callback function.");if("function"!=typeof t)throw new TypeError("The callback must be a function.");0===c(this,"event:".concat(e)).length&&this.callMethod("addEventListener",e).catch(function(){}),u(this,"event:".concat(e),t)}},{key:"off",value:function(e,t){if(!e)throw new TypeError("You must pass an event name.");if(t&&"function"!=typeof t)throw new TypeError("The callback must be a function.");h(this,"event:".concat(e),t)&&this.callMethod("removeEventListener",e).catch(function(e){})}},{key:"loadVideo",value:function(e){return this.callMethod("loadVideo",e)}},{key:"ready",value:function(){var e=E.get(this)||new f(function(e,t){t(new Error("Unknown player. Probably unloaded."))});return f.resolve(e)}},{key:"addCuePoint",value:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};return this.callMethod("addCuePoint",{time:e,data:t})}},{key:"removeCuePoint",value:function(e){return this.callMethod("removeCuePoint",e)}},{key:"enableTextTrack",value:function(e,t){if(!e)throw new TypeError("You must pass a language.");return this.callMethod("enableTextTrack",{language:e,kind:t})}},{key:"disableTextTrack",value:function(){return this.callMethod("disableTextTrack")}},{key:"pause",value:function(){return this.callMethod("pause")}},{key:"play",value:function(){return this.callMethod("play")}},{key:"unload",value:function(){return this.callMethod("unload")}},{key:"destroy",value:function(){var t=this;return new f(function(e){E.delete(t),k.delete(t.element),t._originalElement&&(k.delete(t._originalElement),t._originalElement.removeAttribute("data-vimeo-initialized")),t.element&&"IFRAME"===t.element.nodeName&&t.element.parentNode&&t.element.parentNode.removeChild(t.element),e()})}},{key:"getAutopause",value:function(){return this.get("autopause")}},{key:"setAutopause",value:function(e){return this.set("autopause",e)}},{key:"getBuffered",value:function(){return this.get("buffered")}},{key:"getColor",value:function(){return this.get("color")}},{key:"setColor",value:function(e){return this.set("color",e)}},{key:"getCuePoints",value:function(){return this.get("cuePoints")}},{key:"getCurrentTime",value:function(){return this.get("currentTime")}},{key:"setCurrentTime",value:function(e){return this.set("currentTime",e)}},{key:"getDuration",value:function(){return this.get("duration")}},{key:"getEnded",value:function(){return this.get("ended")}},{key:"getLoop",value:function(){return this.get("loop")}},{key:"setLoop",value:function(e){return this.set("loop",e)}},{key:"getPaused",value:function(){return this.get("paused")}},{key:"getPlaybackRate",value:function(){return this.get("playbackRate")}},{key:"setPlaybackRate",value:function(e){return this.set("playbackRate",e)}},{key:"getPlayed",value:function(){return this.get("played")}},{key:"getSeekable",value:function(){return this.get("seekable")}},{key:"getSeeking",value:function(){return this.get("seeking")}},{key:"getTextTracks",value:function(){return this.get("textTracks")}},{key:"getVideoEmbedCode",value:function(){return this.get("videoEmbedCode")}},{key:"getVideoId",value:function(){return this.get("videoId")}},{key:"getVideoTitle",value:function(){return this.get("videoTitle")}},{key:"getVideoWidth",value:function(){return this.get("videoWidth")}},{key:"getVideoHeight",value:function(){return this.get("videoHeight")}},{key:"getVideoUrl",value:function(){return this.get("videoUrl")}},{key:"getVolume",value:function(){return this.get("volume")}},{key:"setVolume",value:function(e){return this.set("volume",e)}}])&&r(e.prototype,t),n&&r(e,n),Player}();return e||(function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:document,t=[].slice.call(e.querySelectorAll("[data-vimeo-id], [data-vimeo-url]")),n=function(e){"console"in window&&console.error&&console.error("There was an error creating an embed: ".concat(e))};t.forEach(function(t){try{if(null!==t.getAttribute("data-vimeo-defer"))return;var e=p(t);m(l(e),e,t).then(function(e){return y(e,t)}).catch(n)}catch(e){n(e)}})}(),function(){var r=0<arguments.length&&void 0!==arguments[0]?arguments[0]:document;if(!window.VimeoPlayerResizeEmbeds_){window.VimeoPlayerResizeEmbeds_=!0;var e=function(e){if(s(e.origin)&&e.data&&"spacechange"===e.data.event)for(var t=r.querySelectorAll("iframe"),n=0;n<t.length;n++)if(t[n].contentWindow===e.source){t[n].parentElement.style.paddingBottom="".concat(e.data.data[0].bottom,"px");break}};window.addEventListener?window.addEventListener("message",e,!1):window.attachEvent&&window.attachEvent("onmessage",e)}}()),Player});
  
/*
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

jQuery.cookie=function(b,j,m){if(typeof j!="undefined"){m=m||{};if(j===null){j="";m.expires=-1}var e="";if(m.expires&&(typeof m.expires=="number"||m.expires.toUTCString)){var f;if(typeof m.expires=="number"){f=new Date();f.setTime(f.getTime()+(m.expires*24*60*60*1000))}else{f=m.expires}e="; expires="+f.toUTCString()}var l=m.path?"; path="+(m.path):"";var g=m.domain?"; domain="+(m.domain):"";var a=m.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),e,l,g,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var k=document.cookie.split(";");for(var h=0;h<k.length;h++){var c=jQuery.trim(k[h]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};

/**
* jquery-match-height master by @liabru
* http://brm.io/jquery-match-height/
* License: MIT
*/

;(function(factory) { // eslint-disable-line no-extra-semi
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    // CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Global
    factory(jQuery);
  }
})(function($) {
  /*
    *  internal
    */

  var _previousResizeWidth = -1,
      _updateTimeout = -1;

  /*
    *  _parse
    *  value parse utility function
    */

  var _parse = function(value) {
    // parse value and convert NaN to 0
    return parseFloat(value) || 0;
  };

  /*
    *  _rows
    *  utility function returns array of jQuery selections representing each row
    *  (as displayed after float wrapping applied by browser)
    */

  var _rows = function(elements) {
    var tolerance = 1,
        $elements = $(elements),
        lastTop = null,
        rows = [];

    // group elements by their top position
    $elements.each(function(){
      var $that = $(this),
          top = $that.offset().top - _parse($that.css('margin-top')),
          lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

      if (lastRow === null) {
        // first item on the row, so just push it
        rows.push($that);
      } else {
        // if the row top is the same, add to the row group
        if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
          rows[rows.length - 1] = lastRow.add($that);
        } else {
          // otherwise start a new row group
          rows.push($that);
        }
      }

      // keep track of the last row top
      lastTop = top;
    });

    return rows;
  };

  /*
    *  _parseOptions
    *  handle plugin options
    */

  var _parseOptions = function(options) {
    var opts = {
      byRow: true,
      property: 'height',
      target: null,
      remove: false
    };

    if (typeof options === 'object') {
      return $.extend(opts, options);
    }

    if (typeof options === 'boolean') {
      opts.byRow = options;
    } else if (options === 'remove') {
      opts.remove = true;
    }

    return opts;
  };

  /*
    *  matchHeight
    *  plugin definition
    */

  var matchHeight = $.fn.matchHeight = function(options) {
    var opts = _parseOptions(options);

    // handle remove
    if (opts.remove) {
      var that = this;

      // remove fixed height from all selected elements
      this.css(opts.property, '');

      // remove selected elements from all groups
      $.each(matchHeight._groups, function(key, group) {
        group.elements = group.elements.not(that);
      });

      // TODO: cleanup empty groups

      return this;
    }

    if (this.length <= 1 && !opts.target) {
      return this;
    }

    // keep track of this group so we can re-apply later on load and resize events
    matchHeight._groups.push({
      elements: this,
      options: opts
    });

    // match each element's height to the tallest element in the selection
    matchHeight._apply(this, opts);

    return this;
  };

  /*
    *  plugin global options
    */

  matchHeight.version = 'master';
  matchHeight._groups = [];
  matchHeight._throttle = 80;
  matchHeight._maintainScroll = true;
  matchHeight._beforeUpdate = null;
  matchHeight._afterUpdate = null;
  matchHeight._rows = _rows;
  matchHeight._parse = _parse;
  matchHeight._parseOptions = _parseOptions;

  /*
    *  matchHeight._apply
    *  apply matchHeight to given elements
    */

  matchHeight._apply = function(elements, options) {
    var opts = _parseOptions(options),
        $elements = $(elements),
        rows = [$elements];

    // take note of scroll position
    var scrollTop = $(window).scrollTop(),
        htmlHeight = $('html').outerHeight(true);

    // get hidden parents
    var $hiddenParents = $elements.parents().filter(':hidden');

    // cache the original inline style
    $hiddenParents.each(function() {
      var $that = $(this);
      $that.data('style-cache', $that.attr('style'));
    });

    // temporarily must force hidden parents visible
    $hiddenParents.css('display', 'block');

    // get rows if using byRow, otherwise assume one row
    if (opts.byRow && !opts.target) {

      // must first force an arbitrary equal height so floating elements break evenly
      $elements.each(function() {
        var $that = $(this),
            display = $that.css('display');

        // temporarily force a usable display value
        if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
          display = 'block';
        }

        // cache the original inline style
        $that.data('style-cache', $that.attr('style'));

        $that.css({
          'display': display,
          'padding-top': '0',
          'padding-bottom': '0',
          'margin-top': '0',
          'margin-bottom': '0',
          'border-top-width': '0',
          'border-bottom-width': '0',
          'height': '100px',
          'overflow': 'hidden'
        });
      });

      // get the array of rows (based on element top position)
      rows = _rows($elements);

      // revert original inline styles
      $elements.each(function() {
        var $that = $(this);
        $that.attr('style', $that.data('style-cache') || '');
      });
    }

    $.each(rows, function(key, row) {
      var $row = $(row),
          targetHeight = 0;

      if (!opts.target) {
        // skip apply to rows with only one item
        if (opts.byRow && $row.length <= 1) {
          $row.css(opts.property, '');
          return;
        }

        // iterate the row and find the max height
        $row.each(function(){
          var $that = $(this),
              style = $that.attr('style'),
              display = $that.css('display');

          // temporarily force a usable display value
          if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
            display = 'block';
          }

          // ensure we get the correct actual height (and not a previously set height value)
          var css = { 'display': display };
          css[opts.property] = '';
          $that.css(css);

          // find the max height (including padding, but not margin)
          if ($that.outerHeight(false) > targetHeight) {
            targetHeight = $that.outerHeight(false);
          }

          // revert styles
          if (style) {
            $that.attr('style', style);
          } else {
            $that.css('display', '');
          }
        });
      } else {
        // if target set, use the height of the target element
        targetHeight = opts.target.outerHeight(false);
      }

      // iterate the row and apply the height to all elements
      $row.each(function(){
        var $that = $(this),
            verticalPadding = 0;

        // don't apply to a target
        if (opts.target && $that.is(opts.target)) {
          return;
        }

        // handle padding and border correctly (required when not using border-box)
        if ($that.css('box-sizing') !== 'border-box') {
          verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
          verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
        }

        // set the height (accounting for padding and border)
        $that.css(opts.property, (targetHeight - verticalPadding) + 'px');
      });
    });

    // revert hidden parents
    $hiddenParents.each(function() {
      var $that = $(this);
      $that.attr('style', $that.data('style-cache') || null);
    });

    // restore scroll position if enabled
    if (matchHeight._maintainScroll) {
      $(window).scrollTop((scrollTop / htmlHeight) * $('html').outerHeight(true));
    }

    return this;
  };

  /*
    *  matchHeight._applyDataApi
    *  applies matchHeight to all elements with a data-match-height attribute
    */

  matchHeight._applyDataApi = function() {
    var groups = {};

    // generate groups by their groupId set by elements using data-match-height
    $('[data-match-height], [data-mh]').each(function() {
      var $this = $(this),
          groupId = $this.attr('data-mh') || $this.attr('data-match-height');

      if (groupId in groups) {
        groups[groupId] = groups[groupId].add($this);
      } else {
        groups[groupId] = $this;
      }
    });

    // apply matchHeight to each group
    $.each(groups, function() {
      this.matchHeight(true);
    });
  };

  /*
    *  matchHeight._update
    *  updates matchHeight on all current groups with their correct options
    */

   var _update = function(event) {
    if (matchHeight._beforeUpdate) {
      matchHeight._beforeUpdate(event, matchHeight._groups);
    }

    $.each(matchHeight._groups, function(index ) {
      var thisElement = this;
      var timerVal = 0;

      if(thisElement.elements.length){
         timerVal += 500;
        setTimeout(function () {
           matchHeight._apply(thisElement.elements, thisElement.options);
      }, timerVal);
    }
    });

    if (matchHeight._afterUpdate) {
      matchHeight._afterUpdate(event, matchHeight._groups);
    }
  };

  matchHeight._update = function(throttle, event) {
    // prevent update if fired from a resize event
    // where the viewport width hasn't actually changed
    // fixes an event looping bug in IE8
    if (event && event.type === 'resize') {
      var windowWidth = $(window).width();
      if (windowWidth === _previousResizeWidth) {
        return;
      }
      _previousResizeWidth = windowWidth;
    }

    // throttle updates
    if (!throttle) {
      _update(event);
    } else if (_updateTimeout === -1) {
      _updateTimeout = setTimeout(function() {
        _update(event);
        _updateTimeout = -1;
      }, matchHeight._throttle);
    }
  };

  /*
    *  bind events
    */

  // apply on DOM ready event
  $(matchHeight._applyDataApi);

  // update heights on load and resize events
  $(window).bind('load', function(event) {
    matchHeight._update(false, event);
  });

  // throttled update heights on resize events
  $(window).bind('resize orientationchange', function(event) {
    matchHeight._update(true, event);
  });

});


 /*
  * YoutubeBackground - A wrapper for the Youtube API - Great for fullscreen background videos or just regular videos.
  *
  * Licensed under the MIT license:
  *   http://www.opensource.org/licenses/mit-license.php
  *
  *
  * Version:  1.0.5
  *
  */
"function"!=typeof Object.create&&(Object.create=function(e){function t(){}return t.prototype=e,new t}),function(e,t,o){var a=function(o){"undefined"==typeof YT&&void 0===t.loadingPlayer?(t.loadingPlayer=!0,t.dfd=e.Deferred(),t.onYouTubeIframeAPIReady=function(){t.onYouTubeIframeAPIReady=null,t.dfd.resolve("done"),o()}):"object"==typeof YT?o():t.dfd.done(function(e){o()})};YTPlayer={player:null,defaults:{ratio:16/9,videoId:"LSmgKRx5pBo",mute:!0,repeat:!0,width:e(t).width(),playButtonClass:"YTPlayer-play",pauseButtonClass:"YTPlayer-pause",muteButtonClass:"YTPlayer-mute",volumeUpClass:"YTPlayer-volume-up",volumeDownClass:"YTPlayer-volume-down",start:0,pauseOnScroll:!1,fitToBackground:!0,playerVars:{iv_load_policy:3,modestbranding:1,autoplay:1,controls:0,showinfo:0,wmode:"opaque",branding:0,autohide:0},events:null},init:function(n,i){var l,r,d,s=this;return s.userOptions=i,s.$body=e("body"),s.$node=e(n),s.$window=e(t),s.defaults.events={onReady:function(e){s.onPlayerReady(e),s.options.pauseOnScroll&&s.pauseOnScroll(),"function"==typeof s.options.callback&&s.options.callback.call(this)},onStateChange:function(e){1===e.data?(s.$node.find("img").fadeOut(400),s.$node.addClass("loaded")):0===e.data&&s.options.repeat&&s.player.seekTo(s.options.start)}},s.options=e.extend(!0,{},s.defaults,s.userOptions),s.options.height=Math.ceil(s.options.width/s.options.ratio),s.ID=(new Date).getTime(),s.holderID="YTPlayer-ID-"+s.ID,s.options.fitToBackground?s.createBackgroundVideo():s.createContainerVideo(),s.$window.on("resize.YTplayer"+s.ID,function(){s.resize(s)}),l=s.onYouTubeIframeAPIReady.bind(s),r=o.createElement("script"), r.id="youtube-sdk",d=o.getElementsByTagName("head")[0],"file://"==t.location.origin?r.src="http://www.youtube.com/iframe_api":r.src="//www.youtube.com/iframe_api",d.appendChild(r),console.log(r),d=null,r=null,a(l),s.resize(s),s},pauseOnScroll:function(){var e=this;e.$window.on("scroll.YTplayer"+e.ID,function(){1===e.player.getPlayerState()&&e.player.pauseVideo()}),e.$window.scrollStopped(function(){2===e.player.getPlayerState()&&e.player.playVideo()})},createContainerVideo:function(){var t=this,o=e('<div id="ytplayer-container'+t.ID+'" >                                    <div id="'+t.holderID+'" class="ytplayer-player-inline"></div>                                     </div>                                     <div id="ytplayer-shield" class="ytplayer-shield"></div>');t.$node.append(o),t.$YTPlayerString=o,o=null},createBackgroundVideo:function(){var t=this,o=e('<div id="ytplayer-container'+t.ID+'" class="ytplayer-container background">                                    <div id="'+t.holderID+'" class="ytplayer-player"></div>                                    </div>                                    <div id="ytplayer-shield" class="ytplayer-shield"></div>');t.$node.append(o),t.$YTPlayerString=o,o=null},resize:function(o){var a=e(t);o.options.fitToBackground||(a=o.$node);var n,i,l=a.width(),r=a.height(),d=e("#"+o.holderID);l/o.options.ratio<r?(n=Math.ceil(r*o.options.ratio),d.width(n).height(r).css({left:(l-n)/2,top:0})):(i=Math.ceil(l/o.options.ratio),d.width(l).height(i).css({left:0,top:(r-i)/2})),d=null,a=null},onYouTubeIframeAPIReady:function(){theme.ProductVideo.youtubeApiLoaded = true; theme.ProductVideo.loadVideos(theme.ProductVideo.hosts.youtube); var e=this;e.player=new t.YT.Player(e.holderID,e.options)},onPlayerReady:function(e){this.options.mute&&e.target.mute()},getPlayer:function(){return this.player},destroy:function(){var o=this;o.$node.removeData("yt-init").removeData("ytPlayer").removeClass("loaded"),o.$YTPlayerString.remove(),e(t).off("resize.YTplayer"+o.ID),e(t).off("scroll.YTplayer"+o.ID),o.$body=null,o.$node=null,o.$YTPlayerString=null,o.player.destroy(),o.player=null}},e.fn.scrollStopped=function(t){var o=e(this),a=this;o.scroll(function(){o.data("scrollTimeout")&&clearTimeout(o.data("scrollTimeout")),o.data("scrollTimeout",setTimeout(t,250,a))})},e.fn.YTPlayer=function(t){return this.each(function(){var o=this;e(o).data("yt-init",!0);var a=Object.create(YTPlayer);a.init(o,t),e.data(o,"ytPlayer",a)})}}(jQuery,window,document);


/*! Pushy - v0.9.2 - 2014-9-13
* Pushy is a responsive off-canvas navigation menu using CSS transforms & transitions.
* https://github.com/christophery/pushy/
* by Christopher Yee */

var initPushyMenu = function() {
  var nav = $('#pushy-menu'), //menu css class
      navBtn = $('.pushy-menu-btn'),
      filters = $('#pushy-filters'),
      filtersBnt = $('#pushy-filters-btn'),
      body = $('body,html'),
      container = $('#container, .notification-bar, .nav-main-logo, .nav-container-float'), //container css class
      filterContainer = $('.container-pushy-main, .page-header, #shopify-section-footer, .notification-bar, .nav-main-logo, .nav-standard, .nav-container-float'), //container css class
      push = $('.push'), //css class to add pushy capability
      siteOverlay = $('.site-overlay'), //site overlay
      pushyActiveClass = "pushy-active", //css class to toggle site overlay
      containerClass = "container-push", //container open class
      pushClass = "push-push", //css class to add pushy capability
      menuSpeed = 200, //jQuery fallback menu speed
      navState = true,
      closeNav = $('#pushy-close, .mobile-menu-close-icon'),
      closeFilters = $('#pushy-close-filters, .mobile-menu-close-icon'),
      filtersState = true,
      mp = $.magnificPopup.instance;

  function openPushyNav() {
    if(!filtersState) {
      closePushyFilters();
      filtersState = true;
    }
    $(".left_nav_icons_accordion").addClass("nav_icons_accordion_open");
    nav.addClass("pushy-open");
    body.addClass(pushyActiveClass);
    container.addClass(containerClass);
    push.addClass(pushClass);
    navBtn.addClass('tcon-transform');
    mp.close();

    $('a, button, input, select, textarea, object, area, iframe').each(function(index, el){
      if ($(el).attr('tabindex') != '-1') {
        $(el).attr('tabindex', '-2');
      }
    });
    $('.header-nav-pushy a, .header-nav-pushy button').each(function(index, el){
      $(el).attr('tabindex', 0);
    });
    $('.left_nav_icons_accordion a, .left_nav_icons_accordion select, .left_nav_icons_accordion button').each(function(index, el){
      $(el).attr('tabindex', 0);
    });
  }

  function closePushyNav() {
    nav.removeClass("pushy-open");
    $(".left_nav_icons_accordion").removeClass("nav_icons_accordion_open");
    body.removeClass(pushyActiveClass);
    container.removeClass(containerClass);
    push.removeClass(pushClass);
    navBtn.removeClass('tcon-transform')

    $('.header-nav-pushy a, .header-nav-pushy button').each(function(index, el){
      $(el).attr('tabindex', -1);
    });
    $('.left_nav_icons_accordion a, .left_nav_icons_accordion select').each(function(index, el){
      $(el).attr('tabindex', -1);
    });
    $('[tabindex]').each(function(index, el){
      if ($(el).attr('tabindex') == '-2') {
        $(el).attr('tabindex', '0');
      }
    });
    if ($('.minimal-top-nav').length > 0) {
      setTimeout(function(){
        $('.nav-container-actions > li:eq(0)').children().focus();
      },10);
    }
  }

  function openPushyFilters()
  {
    if(!navState) {
      closePushyNav();
      navState = true;
    }
    filters.addClass("pushy-open");
    body.addClass(pushyActiveClass);
    filterContainer.addClass(containerClass);
    push.addClass(pushClass);
    mp.close();
  }

  function closePushyFilters() {
    filters.removeClass("pushy-open");
    body.removeClass(pushyActiveClass);
    filterContainer.removeClass(containerClass);
    push.removeClass(pushClass);
  }

  navBtn.on('click', function(e) {
    e.preventDefault();
    if (navState) {
      openPushyNav();
      navState = false;
    } else {
      closePushyNav();
      navState = true;
    }
  });

  closeNav.on('click', function(e) {
    e.preventDefault();
    closePushyNav();
    navState = true;
  });

  closeFilters.on('click', function(e) {
    e.preventDefault();
    closePushyFilters();
    filtersState = true;
  });

  filtersBnt.on('click', function(e) {
    e.preventDefault();
    if (filtersState) {
      openPushyFilters();
      filtersState = false;
    } else {
      closePushyFilters();
      filtersState = true;
    }
  });

  siteOverlay.on('click', function(){
    closePushyNav();
    navState = true;
    closePushyFilters();
    filtersState = true;
  });


  return {
    close: function() {
      return closePushyFilters();
    }
  }
};

function inlineSwiper($container) {
  var id = $container.attr('data-section-id');
  var blocksPerView = +$container.attr('data-blocks-per-view');
  var blocksMax = +$container.attr('data-blocks-limit');
  var blocksCount = +$container.attr('data-blocks-count');
  var blockAutoplay = +$container.attr('data-autoplay') * 1000;
  var setAutoplay = blockAutoplay ? {delay: blockAutoplay} : false;
  var mobileSlides = +$container.attr('data-mobile-items') || 1;
  var spaceBetweenBlocks;

  switch (blocksPerView) {
    case 2:
      spaceBetweenBlocks = 30;
      break;
    case 3:
      spaceBetweenBlocks = 25; 
      break;
    case 4:
      spaceBetweenBlocks = 15;
      break;
    case 5 || 6:
      spaceBetweenBlocks = 10;
      break;
    default:
      spaceBetweenBlocks = 15;
  }

  return new Swiper ('#inline-swiper-'+id, {
    direction: 'horizontal',
     pagination: {
        el: '#swiper-pagination-'+id,
        clickable: true
      },
      loop: !!blockAutoplay,
      slidesPerView: mobileSlides,
      slidesPerGroup: 1,
      spaceBetween: spaceBetweenBlocks,
      // simulateTouch: ($(window).width() <= 768) || (blocksPerView < blocksMax && blocksPerView < blocksCount),
      simulateTouch: true,
      breakpoints: {
        768: {
          slidesPerView: blocksPerView,
          slidesPerGroup: 1,
          spaceBetween: 15
        }
      },
      autoplay: setAutoplay
    });
}


window.theme = window.theme || {};

theme.Sections = function Sections() {
  this.constructors = {};
  this.instances = [];

  $(document)
  .on('shopify:section:load', this._onSectionLoad.bind(this))
  .on('shopify:section:unload', this._onSectionUnload.bind(this))
  .on('shopify:section:select', this._onSelect.bind(this))
  .on('shopify:section:deselect', this._onDeselect.bind(this))
  .on('shopify:section:reorder', this._onReorder.bind(this))
  .on('shopify:block:select', this._onBlockSelect.bind(this))
  .on('shopify:block:deselect', this._onBlockDeselect.bind(this));
};

theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
  _createInstance: function(container, constructor) {
    var $container = $(container);
    var id = $container.attr('data-section-id');
    var type = $container.attr('data-section-type');

    constructor = constructor || this.constructors[type];

    if (_.isUndefined(constructor)) {
      return;
    }

    var instance = _.assignIn(new constructor(container), {
      id: id,
      type: type,
      container: container
    });

    this.instances.push(instance);
  },
  _onSectionLoad: function(evt) {
    var container = $('[data-section-id]', evt.target)[0];
    if (container) {
      this._createInstance(container);
    }
  },

  _onSectionUnload: function(evt) {
    this.instances = _.filter(this.instances, function(instance) {
      var isEventInstance = (instance.id === evt.originalEvent.detail.sectionId);

      if (isEventInstance) {
        if (_.isFunction(instance.onUnload)) {
          instance.onUnload(evt);
        }
      }

      return !isEventInstance;
    });
  },

  _onSelect: function(evt) {

    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.originalEvent.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onSelect)) {
      instance.onSelect(evt);
    }
  },

  _onDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.originalEvent.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onDeselect)) {
      instance.onDeselect(evt);
    }
  },
  _onReorder: function(evt) {
    var isSlideshow = $("#container").find(".shopify-section").first().hasClass("home-slideshow-section");
    var isOverlap = $("#top-header-section").data("index-overlap"),
        bgColor = $("#top-header-section").data("bg-color"),
        imgWidth = $("#top-header-section").data("logo-width")+"px";
    if(isSlideshow && isOverlap){
       $(".nav-standard-float, .nav-container, .nav-main-logo").css({"position":"absolute", "background": "none"});
       $(".nav-main-logo img").css("width", imgWidth);
    }
    else{
     $(".nav-main-logo, .nav-container, .nav-standard-float").css({"position":"relative", "background": bgColor, "width" : "100%"});
    }

     // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.originalEvent.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onReorder)) {
      instance.onReorder(evt);
    }

  },

  _onBlockSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.originalEvent.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockSelect)) {
      instance.onBlockSelect(evt);
    }
  },

  _onBlockDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.originalEvent.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockDeselect)) {
      instance.onBlockDeselect(evt);
    }
  },

  register: function(type, constructor) {
    this.constructors[type] = constructor;
    $('[data-section-type=' + type + ']').each(function(index, container) {
      this._createInstance(container, constructor);
    }.bind(this));
  }
});

 
 theme.LibraryLoader = (function() {
  var types = {
    link: 'link',
    script: 'script'
  };

  var status = {
    requested: 'requested',
    loaded: 'loaded'
  };

  var cloudCdn = 'https://cdn.shopify.com/shopifycloud/';

  var libraries = {
    youtubeSdk: {
      tagId: 'youtube-sdk',
      src: 'https://www.youtube.com/iframe_api',
      type: types.script
    },
    plyrShopifyStyles: {
      tagId: 'plyr-shopify-styles',
      src: cloudCdn + 'shopify-plyr/v1.0/shopify-plyr.css',
      type: types.link
    },
    modelViewerUiStyles: {
      tagId: 'shopify-model-viewer-ui-styles',
      src: cloudCdn + 'model-viewer-ui/assets/v1.0/model-viewer-ui.css',
      type: types.link
    }
  };

  function load(libraryName, callback) {
    var library = libraries[libraryName];

    if (!library) return;
    if (library.status === status.requested) return;

    callback = callback || function() {};
    if (library.status === status.loaded) {
      callback();
      return;
    }

    library.status = status.requested;

    var tag;

    switch (library.type) {
      case types.script:
        tag = createScriptTag(library, callback);
        break;
      case types.link:
        tag = createLinkTag(library, callback);
        break;
    }

    tag.id = library.tagId;
    library.element = tag;

    var firstScriptTag = document.getElementsByTagName(library.type)[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  function createScriptTag(library, callback) {
    var tag = document.createElement('script');
    tag.src = library.src;
    tag.addEventListener('load', function() {
      library.status = status.loaded;
      callback();
    });
    return tag;
  }

  function createLinkTag(library, callback) {
    var tag = document.createElement('link');
    tag.href = library.src;
    tag.rel = 'stylesheet';
    tag.type = 'text/css';
    tag.addEventListener('load', function() {
      library.status = status.loaded;
      callback();
    });
    return tag;
  }

  return {
    load: load
  };
})();



theme.VideoSection = (function() {
  // console.log('video section');
  function isOnScreen($el) {
    var elementTop = $el.offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
  }

  function VideoSection(container) {
    var $container = this.$container = $(container);
    var sectionId = this.sectionId = $container.attr('data-section-id');
    var videoId = this.videoId = $container.attr('data-video-id');
    var videoLink = this.videoLink = $container.attr('data-video-link');
    var $video = $('#video-' + sectionId);
    var $playBtn = $('#video-play-' + sectionId);
    var videoType = this.videoType = $container.attr('data-video-type');


    if($(window).width() > 992 && $video.length) {
      if(videoType == 'vimeo'){
        var options = {
          id: videoId,
          muted: true,
          autoplay: true,
          loop: true,
          autopause: false
        };
        var video01Player = new Vimeo.Player('iframe-'+sectionId, options);
        
        video01Player.on('loaded', function() {
          if($("#video-"+sectionId+" iframe").length){
            $("#video-"+sectionId)
            .prepend('<div class="vidcover"></div>');

            $(window).resize( function(){
              var theWidth = $(window).width();
              var theHeight = $(window).height();
              var newWidth = (theHeight*1.77777778);
              var newHeight = (theWidth/1.77777778);

              if ( (theWidth > 1280) && (newHeight > theHeight )) {
                $('#video-'+sectionId+' iframe').css({'width':theWidth, 'height':newHeight});
              }

              if ( (theHeight > 720) && (newWidth > theWidth )) {
                $('#video-'+sectionId+' iframe').css({'height':theHeight, 'width':newWidth});
              }

              $('#video-'+sectionId+' .vidcover').css({'height':theHeight, 'width':theWidth});
            }).resize();
            
            if(!isOnScreen($video)) {
              video01Player.pause();
            }
            $(window).on('scroll', function(){
                if(!isOnScreen($video)) {
                  console.log("Video "+ videoId +" stopped");
                  video01Player.pause();
                } else {
                  console.log("Video "+ videoId +" playing");
                  video01Player.play();
                }
            });

          }
        });
                        
      }else{
      $video.YTPlayer({
          fitToBackground: true,
          videoId: videoId,
          playerVars: {
            modestbranding: 1,
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            branding: 0,
            rel: 0,
            iv_load_policy: 3,
            autohide: 1,
            wmode: "transparent",
            frameborder: 0
          },
          callback: function(){
            var player = $video.data('ytPlayer').player;
            console.log("Video "+ videoId +" loaded");
            if(!isOnScreen($video)) {
              player.pauseVideo();
            }
            $(window).on('scroll', function(){
              if(!player.neverPlay) {
                if(!isOnScreen($video)) {
                  console.log("Video "+ videoId +" stopped");
                  player.pauseVideo();
                } else {
                  console.log("Video "+ videoId +" playing");
                  player.playVideo();
                }
              }
            });
          }
       });
      }
    }else{
      $("#vimeo_iframe_wrapper-"+sectionId).remove();
    }
    
    function playerStop() {
      if($video.data('ytPlayer')) {
        var player = $video.data('ytPlayer').player;
        $video.hide();
        player.pauseVideo();
        player.neverPlay = true;
      }else{
         $video.hide(); 
      }
    }

    $playBtn.on('click', function(e){
      e.preventDefault();
      $.magnificPopup.open({
        items: {
          src: videoLink,
          type: 'iframe'
        },
        callbacks: {
          open: playerStop,
          close: playerStop
        }
      })
    });

      
  }

  return VideoSection;
})();


/*********************************************************************
*  #### Twitter Post Fetcher v17.0.2 ####
*  Coded by Jason Mayes 2015. A present to all the developers out there.
*  www.jasonmayes.com
*  Please keep this disclaimer with my code if you use it. Thanks. :-)
*  Got feedback or questions, ask here:
*  http://www.jasonmayes.com/projects/twitterApi/
*  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
*  Updates will be posted to this site.
*********************************************************************/
(function(root,factory){if(typeof define==='function'&&define.amd){define([],factory);}else if(typeof exports==='object'){module.exports=factory();}else{factory();}}(this,function(){var domNode='';var maxTweets=20;var parseLinks=true;var queue=[];var inProgress=false;var printTime=true;var printUser=true;var formatterFunction=null;var supportsClassName=true;var showRts=true;var customCallbackFunction=null;var showInteractionLinks=true;var showImages=false;var useEmoji=false;var targetBlank=true;var lang='en';var permalinks=true;var dataOnly=false;var script=null;var scriptAdded=false;function handleTweets(tweets){if(customCallbackFunction===null){var x=tweets.length;var n=0;var element=document.getElementById(domNode);var html='<ul>';while(n<x){html+='<li>'+tweets[n]+'</li>';n++;}
html+='</ul>';element.innerHTML=html;}else{customCallbackFunction(tweets);}}
function strip(data){return data.replace(/<b[^>]*>(.*?)<\/b>/gi,function(a,s){return s;}).replace(/class="(?!(tco-hidden|tco-display|tco-ellipsis))+.*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi,'');}
function targetLinksToNewWindow(el){var links=el.getElementsByTagName('a');for(var i=links.length-1;i>=0;i--){links[i].setAttribute('target','_blank');}}
function getElementsByClassName(node,classname){var a=[];var regex=new RegExp('(^| )'+classname+'( |$)');var elems=node.getElementsByTagName('*');for(var i=0,j=elems.length;i<j;i++){if(regex.test(elems[i].className)){a.push(elems[i]);}}
return a;}
function extractAuthor(el) {
      var $el = $(el);
      var link = $el.find('a').attr('href');
      return link;
    }
function extractImageUrl(image_data){if(image_data!==undefined&&image_data.innerHTML.indexOf('data-srcset')>=0){var data_src=image_data.innerHTML.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0];return decodeURIComponent(data_src).split('"')[1];}}
var twitterFetcher={fetch:function(config){if(config.maxTweets===undefined){config.maxTweets=20;}
if(config.enableLinks===undefined){config.enableLinks=true;}
if(config.showUser===undefined){config.showUser=true;}
if(config.showTime===undefined){config.showTime=true;}
if(config.dateFunction===undefined){config.dateFunction='default';}
if(config.showRetweet===undefined){config.showRetweet=true;}
if(config.customCallback===undefined){config.customCallback=null;}
if(config.showInteraction===undefined){config.showInteraction=true;}
if(config.showImages===undefined){config.showImages=false;}
if(config.useEmoji===undefined){config.useEmoji=false;}
if(config.linksInNewWindow===undefined){config.linksInNewWindow=true;}
if(config.showPermalinks===undefined){config.showPermalinks=true;}
if(config.dataOnly===undefined){config.dataOnly=false;}
if(inProgress){queue.push(config);}else{inProgress=true;domNode=config.domId;maxTweets=config.maxTweets;parseLinks=config.enableLinks;printUser=config.showUser;printTime=config.showTime;showRts=config.showRetweet;formatterFunction=config.dateFunction;customCallbackFunction=config.customCallback;showInteractionLinks=config.showInteraction;showImages=config.showImages;useEmoji=config.useEmoji;targetBlank=config.linksInNewWindow;permalinks=config.showPermalinks;dataOnly=config.dataOnly;var head=document.getElementsByTagName('head')[0];if(script!==null){head.removeChild(script);}
script=document.createElement('script');script.type='text/javascript';if(config.list!==undefined){script.src='https://syndication.twitter.com/timeline/list?'+'callback=__twttrf.callback&dnt=false&list_slug='+
config.list.listSlug+'&screen_name='+config.list.screenName+'&suppress_response_codes=true&lang='+(config.lang||lang)+'&rnd='+Math.random();}else if(config.profile!==undefined){script.src='https://syndication.twitter.com/timeline/profile?'+'callback=__twttrf.callback&dnt=false'+'&screen_name='+config.profile.screenName+'&suppress_response_codes=true&lang='+(config.lang||lang)+'&rnd='+Math.random();}else if(config.likes!==undefined){script.src='https://syndication.twitter.com/timeline/likes?'+'callback=__twttrf.callback&dnt=false'+'&screen_name='+config.likes.screenName+'&suppress_response_codes=true&lang='+(config.lang||lang)+'&rnd='+Math.random();}else{script.src='https://cdn.syndication.twimg.com/widgets/timelines/'+
config.id+'?&lang='+(config.lang||lang)+'&callback=__twttrf.callback&'+'suppress_response_codes=true&rnd='+Math.random();}
head.appendChild(script);}},callback:function(data){if(data===undefined||data.body===undefined){inProgress=false;if(queue.length>0){twitterFetcher.fetch(queue[0]);queue.splice(0,1);}
return;}
if(!useEmoji){data.body=data.body.replace(/(<img[^c]*class="Emoji[^>]*>)|(<img[^c]*class="u-block[^>]*>)/g,'');}
if(!showImages){data.body=data.body.replace(/(<img[^c]*class="NaturalImage-image[^>]*>|(<img[^c]*class="CroppedImage-image[^>]*>))/g,'');}
if(!printUser){data.body=data.body.replace(/(<img[^c]*class="Avatar"[^>]*>)/g,'');}
var div=document.createElement('div');div.innerHTML=data.body;if(typeof(div.getElementsByClassName)==='undefined'){supportsClassName=false;}
function swapDataSrc(element){var avatarImg=element.getElementsByTagName('img')[0];avatarImg.src=avatarImg.getAttribute('data-src-2x');return element;}
var tweets=[];var authors=[];var times=[];var images=[];var rts=[];var tids=[];var permalinksURL=[];var x=0;if(supportsClassName){var tmp=div.getElementsByClassName('timeline-Tweet');while(x<tmp.length){if(tmp[x].getElementsByClassName('timeline-Tweet-retweetCredit').length>0){rts.push(true);}else{rts.push(false);}
if(!rts[x]||rts[x]&&showRts){tweets.push(tmp[x].getElementsByClassName('timeline-Tweet-text')[0]);tids.push(tmp[x].getAttribute('data-tweet-id'));if(printUser){authors.push(swapDataSrc(tmp[x].getElementsByClassName('timeline-Tweet-author')[0]));}
times.push(tmp[x].getElementsByClassName('dt-updated')[0]);permalinksURL.push(tmp[x].getElementsByClassName('timeline-Tweet-timestamp')[0]);if(tmp[x].getElementsByClassName('timeline-Tweet-media')[0]!==undefined){images.push(tmp[x].getElementsByClassName('timeline-Tweet-media')[0]);}else{images.push(undefined);}}
x++;}}else{var tmp=getElementsByClassName(div,'timeline-Tweet');while(x<tmp.length){if(getElementsByClassName(tmp[x],'timeline-Tweet-retweetCredit').length>0){rts.push(true);}else{rts.push(false);}
if(!rts[x]||rts[x]&&showRts){tweets.push(getElementsByClassName(tmp[x],'timeline-Tweet-text')[0]);tids.push(tmp[x].getAttribute('data-tweet-id'));if(printUser){authors.push(swapDataSrc(getElementsByClassName(tmp[x],'timeline-Tweet-author')[0]));}
times.push(getElementsByClassName(tmp[x],'dt-updated')[0]);permalinksURL.push(getElementsByClassName(tmp[x],'timeline-Tweet-timestamp')[0]);if(getElementsByClassName(tmp[x],'timeline-Tweet-media')[0]!==undefined){images.push(getElementsByClassName(tmp[x],'timeline-Tweet-media')[0]);}else{images.push(undefined);}}
x++;}}
if(tweets.length>maxTweets){tweets.splice(maxTweets,(tweets.length-maxTweets));authors.splice(maxTweets,(authors.length-maxTweets));times.splice(maxTweets,(times.length-maxTweets));rts.splice(maxTweets,(rts.length-maxTweets));images.splice(maxTweets,(images.length-maxTweets));permalinksURL.splice(maxTweets,(permalinksURL.length-maxTweets));}
var arrayTweets=[];var x=tweets.length;var n=0;if(dataOnly){while(n<x){arrayTweets.push({tweet:tweets[n].innerHTML,author:authors[n]?authors[n].innerHTML:'Unknown Author',author_data:{profile_url:authors[n]?authors[n].querySelector('[data-scribe="element:user_link"]').href:null,profile_image:authors[n]?authors[n].querySelector('[data-scribe="element:avatar"]').getAttribute('data-src-1x'):null,profile_image_2x:authors[n]?authors[n].querySelector('[data-scribe="element:avatar"]').getAttribute('data-src-2x'):null,screen_name:authors[n]?authors[n].querySelector('[data-scribe="element:screen_name"]').title:null,name:authors[n]?authors[n].querySelector('[data-scribe="element:name"]').title:null},time:times[n].textContent,timestamp:times[n].getAttribute('datetime').replace('+0000','Z').replace(/([\+\-])(\d\d)(\d\d)/,'$1$2:$3'),image:extractImageUrl(images[n]),rt:rts[n],tid:tids[n],permalinkURL:(permalinksURL[n]===undefined)?'':permalinksURL[n].href});n++;}}else{while(n<x){if(typeof(formatterFunction)!=='string'){var datetimeText=times[n].getAttribute('datetime');var newDate=new Date(times[n].getAttribute('datetime').replace(/-/g,'/').replace('T',' ').split('+')[0]);var dateString=formatterFunction(newDate,datetimeText);times[n].setAttribute('aria-label',dateString);if(tweets[n].textContent){if(supportsClassName){times[n].textContent=dateString;}else{var h=document.createElement('p');var t=document.createTextNode(dateString);h.appendChild(t);h.setAttribute('aria-label',dateString);times[n]=h;}}else{times[n].textContent=dateString;}}
var op='';if(parseLinks){if(targetBlank){targetLinksToNewWindow(tweets[n]);if(printUser){targetLinksToNewWindow(authors[n]);}}
if(printUser){op+='<div class="swiper-slide"><div class="tweet-wrapper"><div class="user">'+strip(authors[n].innerHTML)+'</div>';}
op+='<p class="tweet">'+strip(tweets[n].innerHTML)+'</p>';if(printTime){if(permalinks){op+='<p class="timePosted"><a href="'+permalinksURL[n]+'">'+times[n].getAttribute('aria-label')+'</a></p>';}else{op+='<p class="timePosted">'+
times[n].getAttribute('aria-label')+'</p>';}}}else{if(tweets[n].textContent){if(printUser){op+='<p class="user">'+authors[n].textContent+'</p>';}
op+='<p class="tweet">'+tweets[n].textContent+'</p>';if(printTime){op+='<p class="timePosted">'+times[n].textContent+'</p>';}}else{if(printUser){op+='<p class="user">'+authors[n].textContent+'</p>';}
op+='<p class="tweet">'+tweets[n].textContent+'</p>';if(printTime){op+='<p class="timePosted">'+times[n].textContent+'</p>';}}}
if(showInteractionLinks){op+='<p class="interact"><a href="https://twitter.com/intent/'+'tweet?in_reply_to='+tids[n]+'" class="twitter_reply_icon"'+
(targetBlank?' target="_blank">':'>')+'</a><a href="https://twitter.com/intent/retweet?'+'tweet_id='+tids[n]+'" class="twitter_retweet_icon"'+
(targetBlank?' target="_blank">':'>')+'</a>'+'<a href="https://twitter.com/intent/favorite?tweet_id='+
tids[n]+'" class="twitter_fav_icon"'+
(targetBlank?' target="_blank">':'>')+'</a></p></div></div>';}
if(showImages&&images[n]!==undefined&&extractImageUrl(images[n])!==undefined){op+='<div class="media">'+'<img src="'+extractImageUrl(images[n])+'" alt="Image from tweet" />'+'</div>';}
if(showImages){arrayTweets.push(op);}else if(!showImages&&tweets[n].textContent.length){arrayTweets.push(op);}
n++;}}
handleTweets(arrayTweets);inProgress=false;if(queue.length>0){twitterFetcher.fetch(queue[0]);queue.splice(0,1);}}};window.__twttrf=twitterFetcher;window.twitterFetcher=twitterFetcher;return twitterFetcher;}));

/**
 * ### HOW TO CREATE A VALID ID TO USE: ###
 * Go to www.twitter.com and sign in as normal, go to your settings page.
 * Go to "Widgets" on the left hand side.
 * Create a new widget for what you need eg "user time line" or "search" etc.
 * Feel free to check "exclude replies" if you don't want replies in results.
 * Now go back to settings page, and then go back to widgets page and
 * you should see the widget you just created. Click edit.
 * Look at the URL in your web browser, you will see a long number like this:
 * 345735908357048478
 * Use this as your ID below instead!
 */

/**
 * How to use TwitterFetcher's fetch function:
 *
 * @function fetch(object) Fetches the Twitter content according to
 *     the parameters specified in object.
 *
 * @param object {Object} An object containing case sensitive key-value pairs
 *     of properties below.
 *
 * You may specify at minimum the following two required properties:
 *
 * @param object.id {string} The ID of the Twitter widget you wish
 *     to grab data from (see above for how to generate this number).
 * @param object.domId {string} The ID of the DOM element you want
 *     to write results to.
 *
 * You may also specify one or more of the following optional properties
 *     if you desire:
 *
 * @param object.maxTweets [int] The maximum number of tweets you want
 *     to return. Must be a number between 1 and 20. Default value is 20.
 * @param object.enableLinks [boolean] Set false if you don't want
 *     urls and hashtags to be hyperlinked.
 * @param object.showUser [boolean] Set false if you don't want user
 *     photo / name for tweet to show.
 * @param object.showTime [boolean] Set false if you don't want time of tweet
 *     to show.
 * @param object.dateFunction [function] A function you can specify
 *     to format date/time of tweet however you like. This function takes
 *     a JavaScript date as a parameter and returns a String representation
 *     of that date.
 * @param object.showRetweet [boolean] Set false if you don't want retweets
 *     to show.
 * @param object.customCallback [function] A function you can specify
 *     to call when data are ready. It also passes data to this function
 *     to manipulate them yourself before outputting. If you specify
 *     this parameter you must output data yourself!
 * @param object.showInteraction [boolean] Set false if you don't want links
 *     for reply, retweet and favourite to show.
 * @param object.showImages [boolean] Set true if you want images from tweet
 *     to show.
 * @param object.lang [string] The abbreviation of the language you want to use
 *     for Twitter phrases like "posted on" or "time ago". Default value
 *     is "en" (English).
 */


theme.TwitterSection = (function() {
  
  function fromNow(date_string) {
  var date =  new Date(date_string);
  var seconds = Math.floor((new Date() - date) / 1000);
  var years = Math.floor(seconds / 31536000);
  var months = Math.floor(seconds / 2592000);
  var days = Math.floor(seconds / 86400);

  if (days > 548) {
    return years + ' years ago';
  }
  if (days >= 320 && days <= 547) {
    return 'a year ago';
  }
  if (days >= 45 && days <= 319) {
    return months + ' months ago';
  }
  if (days >= 26 && days <= 45) {
    return 'a month ago';
  }

  var hours = Math.floor(seconds / 3600);

  if (hours >= 36 && days <= 25) {
    return days + ' days ago';
  }
  if (hours >= 22 && hours <= 35) {
    return 'a day ago';
  }
  
  var minutes = Math.floor(seconds / 60);

  if (minutes >= 90 && hours <= 21) {
    return hours + ' hours ago';
  }
  if (minutes >= 45 && minutes <= 89) {
    return 'an hour ago';
  }
  if (seconds >= 90 && minutes <= 44) {
    return minutes + ' minutes ago';
  }
  if (seconds >= 45 && seconds <= 89) {
    return 'a minute ago';
  }
  if (seconds >= 0 && seconds <= 45) {
    return 'a few seconds ago';
  }
}
  

  function TwitterSection(container) {
    var $container = this.$container = $(container),
        id = $container.attr('data-section-id'),
        username = $container.attr('data-username') || "Shopify";

    function renderTweets(tweets) {
      if(!tweets || !tweets.length) {
        return;
      }

      tweets.forEach(function (tweet) {
        $("#inline-swiper-"+id).find('.swiper-wrapper').append(tweet);
      });

      inlineSwiper($container);

      twttr.widgets.load();
    }

    function dateFormat(date, dateString) {
      return '<span class="tweet-date-title">Posted</span>' + '<span class="tweet-date">' + fromNow(dateString) + '</span>';
    }

    twitterFetcher.fetch({
      'profile': { 'screenName': username },
      'maxTweets': +$container.attr('data-blocks-limit'),
      'enableLinks': true,
      'showUser': true,
      'showTime': true,
      'dataOnly': false,
      'showImages': false,
      'showRetweet': true,
      'lang': 'en',
      'customCallback': renderTweets,
      'showInteraction': true,
      'dateFunction': dateFormat
    });
  }
  return TwitterSection;
})();


// theme.LogoSection
theme.LogoSection = (function() {

  function LogoSection(container) {
    var $container = this.$container = $(container);
    inlineSwiper($container);
  }

  return LogoSection;
})();

theme.Quotes = (function() {
  function Quotes(container) {

    var $container = this.$container = $(container);

    inlineSwiper($container);


  }

  return Quotes;
})();
// theme.ImageBarSection
function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

//   if (alpha) {
//     return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
//   } else {
//     return "rgb(" + r + ", " + g + ", " + b + ")";
//   }

  return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
}
theme.ImageBarSection = (function() {
  function ImageBarSection(container) {

    var $container = this.$container = $(container);
    var id = $container.attr('data-section-id');
    var isLightbox = $container.attr('data-section-lighbox');

    if(isLightbox === "true") {
      $container.magnificPopup({
        delegate: '.gallery-item-link',
        mainClass: '-image-gallery my-mfp-zoom-in',
        type: 'image',
        gallery: {
          enabled: true
        },
        image: {
          titleSrc: function(item) {
    				return '' +
            '<h4 class="gallery-item_lighbox-title">' + item.el.attr('title') + '</h4>' +
            '<p class="gallery-item_lighbox-subtitle">' + item.el.attr('data-subtitle') + '</p>';
    			}
        }
      })
    }
  }

  return ImageBarSection;
})();

theme.ImageBarSection.prototype = _.assignIn({}, theme.ImageBarSection.prototype, {
  onBlockSelect: function(evt) {
    var blockId = $(evt.target).data('id'),
        color = $(evt.target).data('color'),
        opacity = $(evt.target).data('opacity')/100,
        rgba = hexToRGB(color, opacity);

    $(".gallery-text-"+blockId).css("background-color", rgba);
  }
});

// theme.RichTextSection
theme.RichTextSection = (function() {
  function RichTextSection(container) {

    var $container = this.$container = $(container);
    var id = $container.attr('data-section-id');
    var itemMinHeight = $container.find(".hero__inner").outerHeight() -80;
    $container.find(".hero").css("min-height", itemMinHeight);
    $( window ).resize(function() {
      var itemMinHeight = $container.find(".hero__inner").outerHeight() -80;
      $container.find(".hero").css("min-height", itemMinHeight);
    });
  }

  return RichTextSection;
})();

// theme.NewsletterSection
theme.NewsletterSection = (function() {
  function NewsletterSection(container) {

    var $container = this.$container = $(container);
    var id = $container.attr('data-section-id');
    var itemMinHeight = $container.find(".hero__inner").outerHeight() -80;
    $container.find(".hero").css("min-height", itemMinHeight);
    $( window ).resize(function() {
      var itemMinHeight = $container.find(".hero__inner").outerHeight() -80;
      $container.find(".hero").css("min-height", itemMinHeight);
    });


     $container.find("form").on("submit", function(){
       event.preventDefault();
	   var cookieTime = 2000;
       $.cookie('newsletter_confirm', 'newsletter', { expires: cookieTime });
       $(this).off('submit').submit();
    });

    if($.cookie('newsletter_confirm') != null && (window.location.search == "?customer_posted=true" || window.location.hash == "#contact_form" || $container.find("form .errors").length) && window.location.href.indexOf("challenge") < 0){
      $.cookie('newsletter_confirm', null);
      window.history.replaceState(null, null, window.location.pathname);
      $("#shopify-section-footer .errors").hide();
      if(!$container.find("form .errors").length){
      	$container.find("form").html('<div class="alert alert-success">Thanks for subscribing to our newsletter!</div>');
       }
       var target_offset =  $container.find("form").closest(".shopify-section").offset().top;
       var animation_durration = target_offset/1000*150;

       $('html, body').animate({
          scrollTop: $container.find("form").closest(".shopify-section").offset().top
        }, animation_durration, function() {

          if(($container.find("form").closest(".shopify-section").offset().top > $(window).scrollTop()) && ($(window).scrollTop() + $(window).height() < $(document).height())){
            var target_offset =  $container.find("form").closest(".shopify-section").offset().top - $(window).scrollTop();
            var animation_durration = target_offset/1000*150;
            $('html, body').animate({
              scrollTop: $container.find("form").closest(".shopify-section").offset().top
            }, animation_durration);
          }
  		});
    }

  }

  return NewsletterSection;
})();




// theme.Cart
theme.Cart = (function() {
  function Cart(container) {
    bindEventsInCart();
  }

  return Cart;
})();

theme.Cart.prototype = _.assignIn({}, theme.Cart.prototype, {

  onSelect: function(){
    updatePageHeaderView();
  }
});

var handleizeStr = function (str) {
  return str.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "");
};
// theme.Product Page
var changeUrl = false;
var index_featured_product_image = false;
theme.ProductPage = (function() {
  var defaults = {
    // Breakpoints from src/stylesheets/global/variables.scss.liquid
    mediaQuerySmall: 'screen and (max-width: 749px)',
    mediaQueryMediumUp: 'screen and (min-width: 750px)',
    bpSmall: false,
    sliderActive: false,
    zoomEnabled: false,
    imageSize: null,
    imageZoomSize: null,
    selectors: {
      addToCart: '#AddToCart',
      addToCartText: '#AddToCartText',
      productFeaturedImage: '#FeaturedImage',
      productThumbImages: '.swiper-slide',
      productThumbs: '.product-item-img',
      optionSelector: 'ProductSelect',
      saleLabel: '.product-price__sale-label',
      saleClasses: 'product-price__sale product-price__sale--single'
    }
  };

  function swapNodes(a, b) {
    a.replaceWith(b.clone());
    b.replaceWith(a);
  }
  var desktop_title = $('.desktop_caption_header').find('h1.product-item-caption-title');
  var mobile_title = $('.mobile_caption_header').find('p.product-item-caption-title');
  if($(window).width() < 768) {
    swapNodes(mobile_title,desktop_title);
  } 
  $(window).resize(function () {
    if($(window).width() < 768) {
      var desktop_title = $('.desktop_caption_header').find('h1.product-item-caption-title');
      var mobile_title = $('.mobile_caption_header').find('p.product-item-caption-title');
      swapNodes(mobile_title,desktop_title);
    } else {   

      var desktop_title = $('.desktop_caption_header').find('p.product-item-caption-title');
      var mobile_title = $('.mobile_caption_header').find('h1.product-item-caption-title');
      swapNodes(desktop_title,mobile_title);
    }
  });



   $("#shopify-product-reviews").on("click",".spr-summary-actions-newreview", function(){
     $.fn.matchHeight._update();
  });


  function Product(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');


    this.settings = $.extend({}, defaults, {
      sectionId: sectionId,
      swiperObjects: {},
      selectors: {
        originalSelectorId: 'ProductSelect-' + sectionId,
        addToCart: '#AddToCart-' + sectionId,
        productPrice: '#ProductPrice-' + sectionId + ' span',
        comparePrice: '#ComparePrice-' + sectionId + ' span',
        addToCartText: '#AddToCartText-' + sectionId,
        productFeaturedImage: '#FeaturedImage-' + sectionId,
        productImageWrap: '#FeaturedImageZoom-' + sectionId,
        productThumbImages: '.product-single__thumbnail--' + sectionId,
        productThumbs: '.product-single__thumbnails-' + sectionId,
        saleLabel: '.product-price__sale-label-' + sectionId,
        saleClasses: 'product-price__sale product-price__sale--single',
        price: '.product-price__price-' + sectionId,
        PP_zoomEnabled:'.zoom-link',
        variantSkuRow: '.sku-table-row-' + sectionId,
        variantSku: '.variant-sku-' + sectionId,
        variantInventoryRow: '.inventory-product-row-' + sectionId,
        variantInventory: '.variant-inventory-' + sectionId
      }
    });

    $container.find('form[action*="/cart/add"]').submit(function(e) {
      
      e.preventDefault();
      //Disable the Add To Cart button, add a disabled class.
      $(e.target).find('input[type=image], input.submit-add-to-cart').attr('disabled', true).addClass('disabled');
      //Can't use updateCartFromForm since you need the item added before you can update (otherwise, would have been more convenient)
      //So, in onItemAdded, we Shopify.getCart() to force the repaint of items in cart.
      Shopify.addItemFromForm(e.target);
      
      
      
    });

    var videoInRTE = $container.find(".prodyct-rte-description iframe").length || false;

    if(videoInRTE){
      $container.find(".prodyct-rte-description iframe").wrap("<div class='videoWrapperRTE'></div>");
    }

    initQuantityEvents(sectionId);

    // Stop parsing if we don't have the product json script tag when loading
    // section in the Theme Editor
    if (!$('#ProductJson-' + sectionId).html()) {
      if($(window).width() > 767) {
        $(".equal-columns-"+sectionId).matchHeight();
      }
      return;
    }

    this.productSingleObject = JSON.parse(document.getElementById('ProductJson-' + sectionId).innerHTML);

    this.init();

    $.fn.matchHeight._update();
  }

  Product.prototype = _.assignIn({}, Product.prototype, {
    onSelect: function(){
    var starsValue = this.reviewsStars;
    
    if(starsValue == "true"){
              SPR.$(document).ready(function() {
                return SPR.registerCallbacks(),
                  SPR.initRatingHandler(),
                  SPR.initDomEls(),
                  SPR.loadProducts(),
                  SPR.loadBadges()
              })
            }
    if(theme.ProductVideo.youtubeApiLoaded == true){
      theme.ProductVideo.loadVideos(theme.ProductVideo.hosts.youtube);
    }  
  },
   onUnload: function(evt) {
      theme.ProductVideo.removeSectionVideos(this.settings.sectionId);
      theme.ProductModel.removeSectionModels(this.settings.sectionId);
   },

    init: function() {
      this.initSwiper();
      this.stringOverrides();
      this.initProductVariant();
      this.initImageZoom();
      this.initSelectDropdowns();
      this.initSwatches();
      this.initStickSlider();
      this.initTabs();
    },
    initTabs: function(){
      var sectionId = this.settings.sectionId;
    var prodDesc = $('.main-product-description-'+sectionId);
        var prodDescHtml = prodDesc.html();
  if (typeof prodDescHtml != 'undefined') {
    var matchs = prodDescHtml.match(/\<\!\-\- TABS \-\-\>((.|[\r\n])+)\<\!\-\- \/TABS \-\-\>/m);
    
    if(matchs!==null && matchs.length>1) {
      $('.product-description-tabs-'+sectionId).html('<ul class="resp-tabs-list pr-tab-'+sectionId+'"></ul><div class="resp-tabs-container pr-tab-'+sectionId+'"></div>');
      prodDesc.html(prodDescHtml.replace(/\<\!\-\- TABS \-\-\>((.|[\r\n])+)\<\!\-\- \/TABS \-\-\>/m, ''));
      var tabs = matchs[1].split('<h5>');
//       var imgClosed = ‘<img class=“mobile_tab_icons mobile_tab_icon_closed” src=““/>‘;
//       var imgOpen = ‘<img class=“mobile_tab_icons mobile_tab_icon_open” src=“‘;
      $.each(tabs, function(i,v){
        if(i!=0) {

         info = v.split('</h5>');

         $('.resp-tabs-list.pr-tab-'+sectionId).append('<li id="'+handleizeStr(info[0])+'">'+info[0]+'</li>');
          $('.resp-tabs-container.pr-tab-'+sectionId).append('<div>'+info[1]+'</div>');

       }
      });


      $('.product-description-tabs-'+sectionId).easyResponsiveTabs({
            type: 'default', //Types: default, vertical, accordion
            width: 'auto', //auto or any width like 600px
            fit: true, // 100% fit in a container
            tabidentify: 'pr-tab-'+sectionId, // The tab groups identifier
          activate: function() {
              $.fn.matchHeight._maintainScroll = true;
              $.fn.matchHeight._update();
            }
        });

      if (window.location.hash !== '') {
      var thisUrlHash = window.location.hash;
      var selectedHash = '#'+thisUrlHash.split('#tab=')[1];
      $('.product-description-tabs-'+sectionId).find(selectedHash).click();
    }

   }
  }
    },
    initStickSlider: function(){
      var sectionId = this.settings.sectionId;


        if($(window).width() > 767) {

        var descriptionHeight = $(".product-description-"+sectionId).outerHeight();
        var galleryHeight = $(".product-gallery-"+sectionId).outerHeight();
        if(galleryHeight > descriptionHeight){
          $(".equal-columns-"+sectionId).matchHeight();
        }else{
    $("#ProductSection-"+sectionId+" #parent > div").matchHeight();
          $('.slider-'+ sectionId).stick_in_parent({
            parent: '#parent'
          });
        }
      }
      $( window ).resize(function() {

        if($(window).width() > 767) {
          var descriptionHeight = $(".product-description-"+sectionId).outerHeight();
          var galleryHeight = $(".product-gallery-"+sectionId).outerHeight();
          if(galleryHeight > descriptionHeight){
            $(".equal-columns-"+sectionId).matchHeight();
          }else{
            if((typeof $._data($(".slider-"+sectionId)[0]).events) == 'undefined'){
                $('.slider-'+ sectionId).stick_in_parent({
              parent: '#parent'
            });
            }
          }
        }
        else{
          $('.slider-'+ sectionId).trigger("sticky_kit:detach");
        }
      });
    },

    stringOverrides: function() {
      // Override defaults in theme.strings with potential
      // template overrides

      theme.productStrings = theme.productStrings || {};
      $.extend(theme.strings, theme.productStrings);
    },
    initImageZoom: function() {
      if(typeof $.zoom === 'function' && this.settings.selectors.PP_zoomEnabled.length){
        if($(window).width() > 767) {
          var imageBlock = $('#slider');
          if(imageBlock.length){
            var imageSlideLinks = imageBlock.find('.zoom-img-wrap');
            if(imageSlideLinks.length){
              imageSlideLinks.each(function(){
                var t = $(this);
                var url = t.find("img.zoom-img").data('srczoom');
                t.find(".zoom-img-container").zoom({ url:url,touch:false });
              });
            }
          }
        }

        $( window ).resize(function() {
          if($(window).width() > 767) {
            var imageBlock = $('#slider');
            if(imageBlock.length){
              var imageSlideLinks = imageBlock.find('.zoom-img-wrap');
              if(imageSlideLinks.length){
                imageSlideLinks.each(function(){
                  var t = $(this);
                  var url = t.find("img.zoom-img").data('srczoom');
                  t.find(".zoom-img-container").zoom({ url:url,touch:false });
                });
              }
            }
          }else{
            var imageBlock = $('#slider');
            if(imageBlock.length){
              var imageSlideLinks = imageBlock.find('.zoom-img-wrap');
              if(imageSlideLinks.length){
                imageSlideLinks.each(function(){
                  var t = $(this);
                  t.find(".zoom-img-container").trigger('zoom.destroy');
                });
              }
            }
          }

        });
      }
      else{
        return false;
      }
    },
    initSwatches: function() {
      this.$container.find('.swatch :radio').change(function() {
        var optionIndex = jQuery(this).closest('.swatch').attr('data-option-index');
        var optionValue = jQuery(this).val().replace(/\s{2,}/g, ' ');
        jQuery(this)
        .closest('form')
        .find('.single-option-selector')
        .eq(optionIndex)
        .val(optionValue)
        .trigger('change');
      });

      var productJSON = this.productSingleObject;
      for (var i=0,length=productJSON.variants.length; i<length; i++) {
        var productVariants = productJSON.variants[i];
        if(productVariants.available){
          for (var j=0,optlength=productVariants.options.length; j<optlength; j++) {
            var variantOption = productVariants.options[j];
            variantOption = handleizeStr(variantOption);
            this.$container.find('.swatch[data-option-index="'+j+'"] .'+variantOption+'').removeClass('soldout').addClass('available').find(':radio').removeAttr('disabled');
          }

        }
      }

    },
    initSelectDropdowns: function(){
      var $container = this.$container;
      setTimeout(function(){
        $container.find(".single-option-selector").select2({
          theme: "classic",
          minimumResultsForSearch: Infinity
        });
      }, 100);
    },
    initSwiper: function(){
      var windowResizeFunc = function(){
        $(window).trigger('resize');
      }
      
       var $container = this.$container;
       var sectionId = this.settings.sectionId;
    
      $container.find("[data-product-media-type-video]").each(function() {
        var $el = $(this);
        theme.ProductVideo.init($el, sectionId);
      });   

      var $modelViewerElements = $(
        "[data-product-media-type-model]",
        $container
      );

      if ($modelViewerElements.length > 0){
        theme.ProductModel.init($modelViewerElements, sectionId);
      }


      $(document).on('shopify_xr_launch', function() {
        var $currentMedia = $container.find(".main-swiper-container .swiper-slide-active");
        $currentMedia.trigger('xrLaunch');
      });
      
      
      //initialize swiper when document ready
      if($('.swiper-main-'+this.settings.sectionId+' .swiper-wrapper .swiper-slide').length > 1){
         var useLoop = true;
      }else{
       var useLoop = false;
      }
      this.settings.swiperObjects.mySwiper = new Swiper ('.swiper-main-'+this.settings.sectionId, {
        // Optional parameters
        direction: 'horizontal',
        pagination: {
            el: '.swiper-pagination-'+this.settings.sectionId,
            clickable: true
          },
        updateOnImagesReady :true,
        spaceBetween: 0,
        slidesPerView: 1,
        roundLengths: true,
        simulateTouch: false,
        onImagesReady: windowResizeFunc,
		on:{ 
          transitionEnd:function(){
          var slider = this;  
          var index = slider.activeIndex;
          var current_index = slider.previousIndex;

          var $newMedia = $(slider.$el).find(".swiper-slide").eq(index).find("[data-product-single-media-wrapper]");
          var $currentMedia = $(".main-swiper-container").find("[data-product-single-media-wrapper]");
            
          $currentMedia.trigger('mediaHidden').removeAttr("style");
       	  $newMedia.css("visibility", "visible").trigger('mediaVisible');

          if (theme.Helpers.isTouch()){return false;}

            if($newMedia.find("model-viewer").length){
              $newMedia.find("model-viewer").focus();      
            }else if($newMedia.find("[tabindex='0']").length){
              $newMedia.find("[tabindex]").focus();
            }else{
              setTimeout(function(){
               $newMedia.focus();  
              }, 100);
            
            }    
            
        }
        }
      });


     
        var gallerySwiperThumbsVert = this.settings.swiperObjects.gallerySwiperThumbsVert = new Swiper('#swiper-gallery-thumbs-vert-'+this.settings.sectionId, {
        direction: 'vertical',
        spaceBetween: 0,
        centeredSlides: true,  
        slidesPerView: 'auto',
        slideToClickedSlide: true,
        updateOnImagesReady :true,
        onImagesReady: windowResizeFunc,
        disableAutoResize: true,
        resizeEvent: 'auto',     
//         navigation: {
//           nextEl: '.swiper-button-next-'+sectionId,
//           prevEl: '.swiper-button-prev-'+sectionId,
//         }
      });
      
     var gallerySwiperThumbs = this.settings.swiperObjects.gallerySwiperThumbs = new Swiper('#swiper-gallery-thumbs-'+this.settings.sectionId, {
       spaceBetween: 0,
        slidesPerView: 'auto',
        centeredSlides: true,  
        slideToClickedSlide: true,
        updateOnImagesReady :true,
        onImagesReady: windowResizeFunc,
        disableAutoResize: true,
        resizeEvent: 'auto',     
//        navigation: {
//          nextEl: '.swiper-button-next-'+sectionId,
//          prevEl: '.swiper-button-prev-'+sectionId,
//        },
      })


        this.settings.swiperObjects.gallerySwiperVert = new Swiper('#swiper-gallery-vert-'+this.settings.sectionId, {
        spaceBetween: 0,
        slidesPerView: 1,
         roundLengths: true,
         simulateTouch: false,
         on:{ 
          transitionStart:function(){
          $("#swiper-gallery-thumbs-vert-"+sectionId).css("pointer-events", "none");
          },
          transitionEnd:function(){            
          $("#swiper-gallery-thumbs-vert-"+sectionId).css("pointer-events", "all");
          var slider = this;  
          var index = slider.activeIndex;
          var current_index = slider.previousIndex;

          var $newMedia = $(slider.$el).find(".swiper-slide").eq(index).find("[data-product-single-media-wrapper]");
          var $currentMedia = $(".main-swiper-container").find("[data-product-single-media-wrapper]");

          $currentMedia.trigger('mediaHidden').removeAttr("style");
       	  $newMedia.css("visibility", "visible").trigger('mediaVisible');

          if (theme.Helpers.isTouch()){return false;}

            if($newMedia.find("model-viewer").length){
              $newMedia.find("model-viewer").focus();  
            }else if($newMedia.find("[tabindex='0']").length){
              $newMedia.find("[tabindex]").focus();
            }else{
               $newMedia.focus();             
            }                
        }
        }
      });
      
      

      
       this.settings.swiperObjects.gallerySwiper = new Swiper('#swiper-gallery-'+this.settings.sectionId, {
        spaceBetween: 0,
        slidesPerView: 1,
         roundLengths: true,
         simulateTouch: false,
        on:{ 
          transitionStart:function(){
          $("#swiper-gallery-thumbs-"+sectionId).css("pointer-events", "none");
          },
          transitionEnd:function(){            
          $("#swiper-gallery-thumbs-"+sectionId).css("pointer-events", "all");
            
          var slider = this;  
          var index = slider.activeIndex;
          var current_index = slider.previousIndex;

          var $newMedia = $(slider.$el).find(".swiper-slide").eq(index).find("[data-product-single-media-wrapper]");
         var $currentMedia = $(".main-swiper-container").find("[data-product-single-media-wrapper]");

          $currentMedia.trigger('mediaHidden').removeAttr("style");
       	  $newMedia.css("visibility", "visible").trigger('mediaVisible');

          if (theme.Helpers.isTouch()){return false;}

            if($newMedia.find("model-viewer").length){
              $newMedia.find("model-viewer").focus();      
            }else if($newMedia.find("[tabindex='0']").length){
              $newMedia.find("[tabindex]").focus();
            }else{
              setTimeout(function(){
               $newMedia.focus();  
              }, 100);
            
            }    
            
        }
        }
      });
      
      if(typeof this.settings.swiperObjects.gallerySwiper.controller != "undefined"){
        this.settings.swiperObjects.gallerySwiper.controller.control = this.settings.swiperObjects.gallerySwiperThumbs;
        this.settings.swiperObjects.gallerySwiperThumbs.controller.control = this.settings.swiperObjects.gallerySwiper;
      }
      if(typeof this.settings.swiperObjects.gallerySwiperVert.controller != "undefined"){
        this.settings.swiperObjects.gallerySwiperVert.controller.control = this.settings.swiperObjects.gallerySwiperThumbsVert;
        this.settings.swiperObjects.gallerySwiperThumbsVert.controller.control = this.settings.swiperObjects.gallerySwiperVert;
      }
      
      
      
      $container.on('keyup', ".swiper-thumbnails-main-container .swiper-slide", function(event) {
      var keycode = event.keyCode;
      if (keycode === 13) {
      var swiper_instance = $container.find(".main-swiper-container")[0].swiper;       
      if(typeof swiper_instance == 'object' && $(this).is(":focus")) { 
          var index = swiper_instance.activeIndex;
          var thumb_index = $(document.activeElement).index();
          var active_slide_index = $container.find(".swiper-slide-active").index();

          if(thumb_index == active_slide_index){
 			var $newMedia = $(swiper_instance.$el).find(".swiper-slide").eq(index).find("[data-product-single-media-wrapper]");
             $newMedia.trigger('mediaVisible');
            if($newMedia.find("model-viewer").length){
              $newMedia.find("model-viewer").focus();
            }else if( $newMedia.find("[tabindex='0']").length){
              $newMedia.find("[tabindex='0']").focus();  
            }else{
              $newMedia.focus();  
            }            
          }else{
            swiper_instance.slideTo(thumb_index);
          }
        }
      }
     });
      
      $container.on('keyup', ".swiper-pagination-bullet", function(event) {
      var keycode = event.keyCode;
      if (keycode === 13) {
      var swiper_instance = $container.find(".main-swiper-container")[0].swiper;       
      if(typeof swiper_instance == 'object') { 
          var index = swiper_instance.activeIndex;
          var thumb_index = $(document.activeElement).index();
          var active_slide_index = $container.find(".swiper-slide-active").index();

          if(thumb_index == active_slide_index){
             setTimeout(function(){
 			var $newMedia = $(swiper_instance.$el).find(".swiper-slide").eq(index).find("[data-product-single-media-wrapper]");
             $newMedia.trigger('mediaVisible');
            if($newMedia.find("model-viewer").length){
              $newMedia.find("model-viewer").focus();
            }else if( $newMedia.find("[tabindex='0']").length){
              $newMedia.find("[tabindex='0']").focus();  
            }else{
              $newMedia.focus();  
            }
             }, 300);   
          }
        }
      }
     });
      
      
        $container.on('click', ".swiper-thumbnails-main-container .swiper-slide-active, .swiper-pagination-bullet", function(event) {
         if (theme.Helpers.isTouch()){return false;}    
        var swiper_instance = $container.find(".main-swiper-container")[0].swiper;       
        if(typeof swiper_instance == 'object') { 
            var index = swiper_instance.activeIndex;
            var previousIndex = swiper_instance.previousIndex;
            var thumb_index = $(this).index();    
            var active_slide_index = $container.find(".swiper-slide-active").index();

          if(thumb_index == active_slide_index && !swiper_instance.animating){
            setTimeout(function(){
   			var $newMedia = $(swiper_instance.$el).find(".swiper-slide").eq(index).find("[data-product-single-media-wrapper]");
               $newMedia.trigger('mediaVisible');
              if($newMedia.find("model-viewer").length){
                $newMedia.find("model-viewer").focus();
              }else if( $newMedia.find("[tabindex='0']").length){
                $newMedia.find("[tabindex='0']").focus();  
              }else{
                $newMedia.focus();  
              }            
             }, 300);
          }
        }

      });
      
      
    },

    initProductVariant: function() {
      // this.productSingleObject is a global JSON object defined in theme.liquid
      if (!this.productSingleObject) {
        return;
      }

      var self = this;

      var productJSON = this.productSingleObject
      var productVariantObj = productJSON.variants;

      $(".main-product-select-"+productJSON.id+" .single-option-selector").on("change", function(){


        var option1 = $(".main-product-select-"+productJSON.id+" #SingleOptionSelector-0").val() || null,
            option2 = $(".main-product-select-"+productJSON.id+" #SingleOptionSelector-1").val() || null,
            option3 = $(".main-product-select-"+productJSON.id+" #SingleOptionSelector-2").val() || null,
            flag = true;
        for (var i=0,length=productVariantObj.length; i<length; i++) {
          var productVar = productVariantObj[i];
           if(productVar.option1 != null){productVar.option1 = productVar.option1.replace(/\s{2,}/g, ' ');}
          if(productVar.option2 != null){productVar.option2 = productVar.option2.replace(/\s{2,}/g, ' ');}
          if(productVar.option3 != null){productVar.option3 = productVar.option3.replace(/\s{2,}/g, ' ');}

          if(option1==productVar.option1 && option2==productVar.option2 && option3==productVar.option3){
            flag = false;
            $('#ProductSelect-' + productJSON.id ).val(productVar.id);
            self.productVariantCallback(productVar, productJSON.id);
            break;
          }
        }
        if(flag){
          self.productVariantCallback(null, productJSON.id);
        }

      });

      var selectedOptionsLength = $('#ProductSelect-' + productJSON.id + ' option[selected]').length;
      var optionsLength = $('#ProductSelect-' + productJSON.id).length;
      if(!selectedOptionsLength || optionsLength == 1){
        self.productVariantCallback(productJSON.variants[0], productJSON.id);
      }

      // Add label if only one product option and it isn't 'Title'. Could be 'Size'.
      if(productJSON.options.size == 1 && productJSON.options[0] != 'Title'){
        $('.selector-wrapper:eq(0)').prepend('<label>'+productJSON.options[0]+'</label>');
      }

      // Hide selectors if we only have 1 variant and its title contains 'Default'.
      if(productJSON.variants.size == 1 && (productJSON.variants[0].title.indexOf('Default') + 1)){
        $('.selector-wrapper').hide();
      }

      var str = window.location.href;
      if(!(str.indexOf('?variant=') + 1)) {
        // Auto-select first available variant on page load. Otherwise the product looks sold out.
        var found_one_in_stock = false;
        for(variant in productJSON.variants){
          if(productJSON.variants[variant].available && found_one_in_stock == false){
            found_one_in_stock = true;
            for(option in productJSON.options){
              var i = Object.keys(productJSON.options).indexOf(option);
              if(i >= 0){
                $('.main-product-select-'+productJSON.id+' .single-option-selector:eq('+i+')').val(productJSON.variants[variant].options[i].replace(/\s{2,}/g, ' ')).trigger("change");
              }
            }

            if ($('#ProductTemplate-' + productJSON.id).html()) {
              changeUrl = true;
            }
            if ($('#FeaturedProductTemplate').html()) {
              index_featured_product_image = true;
            }

          }
        }
      }
      else{
        if ($('#ProductTemplate-' + productJSON.id).html()) {
          changeUrl = true;
        }
        if ($('#FeaturedProductTemplate').html()) {
          index_featured_product_image = true;
        }
        $('.main-product-select-'+productJSON.id+' .single-option-selector').first().trigger("change");

      }

      this.productVariantStyles();
    },

    productVariantStyles: function() {
      $('.selector-wrapper').addClass('product-form__item');
      $('.single-option-selector').addClass('product-form__input');
    },

    // **WARNING** This function actually inherits `this` from `this.optionSelector` not
    // from `product` when passed in as a callback for `option_selection.js`
    productVariantCallback: function(variant, selector) {
      if(variant && changeUrl){
        var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant.id;
        window.history.replaceState({path: newurl}, '', newurl);
      }

 	  var smart_checkout_btn = $(this.settings.selectors.addToCart).closest("form").find(".shopify-payment-button"),
          sizedImgUrl,
          zoomSizedImgUrl;

      if (variant) {
        var indexArray=[];
        $(".main-product-select-"+selector+" .single-option-selector option:selected").each(function() {
          indexArray.push($(this).index());
        });
        var form = jQuery('#ProductSelect-'+selector).closest('form');
//         for (var i=0,length=variant.options.length; i<length; i++) {
//           var num = indexArray[i];
//           var radioButtonDiv = form.find('.swatch[data-option-index="' + i + '"] div.swatch-element')[num];
//           var radioButton = $(radioButtonDiv).find(":radio");
//           if (radioButton.size()) {
//             radioButton.get(0).checked = true;
//           }
//         }
        
        for (var i=0,length=variant.options.length; i<length; i++) {
          var radioButton = form.find('.swatch[data-option-index="' + i + '"] :radio[value="' + variant.options[i] +'"]');
          if (radioButton.size()) {
            radioButton.get(0).checked = true;
          }
        }
      }
      // END SWATCHES

      if (variant) {

        // Update variant image, if one is set
        if (variant.featured_image && (changeUrl || index_featured_product_image)) {
          var slideId = variant.featured_media.id;
          if(typeof this.settings.swiperObjects.gallerySwiper.controller != "undefined"){
            this.settings.swiperObjects.gallerySwiper.slideTo($("#"+slideId).index());
          }
          else if(typeof this.settings.swiperObjects.gallerySwiperVert.controller != "undefined"){
            this.settings.swiperObjects.gallerySwiperVert.slideTo($("#"+slideId).index());
          }
          else{
            this.settings.swiperObjects.mySwiper.slideTo($("#"+slideId).index());
          }

        }

        // Update the product price
        $(this.settings.selectors.productPrice).html(Shopify.formatMoney(variant.price, theme.moneyFormat));

        // Update and show the product's compare price if necessary
        if (variant.compare_at_price > variant.price) {
          $(this.settings.selectors.comparePrice)
          .html(Shopify.formatMoney(variant.compare_at_price, theme.moneyFormat))
          .removeClass('hide');

          $(this.settings.selectors.price).addClass(this.settings.selectors.saleClasses);
          $(this.settings.selectors.saleLabel).removeClass('hide');
          $(this.settings.selectors.comparePrice).closest("li").removeClass('hide');
        } else {
          $(this.settings.selectors.comparePrice).addClass('hide');
          $(this.settings.selectors.comparePrice).closest("li").addClass('hide');
          $(this.settings.selectors.saleLabel).addClass('hide');
          $(this.settings.selectors.price).removeClass(this.settings.selectors.saleClasses);
        }

        // Select a valid variant if available
        if (variant.available) {
          // We have a valid product variant, so enable the submit button
          $(this.settings.selectors.addToCart).prop('disabled', false);
          $(this.settings.selectors.addToCartText).text(theme.strings.addToCart);
          smart_checkout_btn.show();
        } else {
          // Variant is sold out, disable the submit button and change the text
          $(this.settings.selectors.addToCart).prop('disabled', true);
          $(this.settings.selectors.addToCartText).text(theme.strings.soldOut);
          smart_checkout_btn.hide();
        }

        // Show sku and inventory status if needed
        if (jQuery.type( variant ) === "null") {
          console.log("woring")
        }
        else {
          variantSkuRow = $(this.settings.selectors.variantSkuRow);
          variantSku = $(this.settings.selectors.variantSku);
          variantInventoryRow = $(this.settings.selectors.variantInventoryRow);
          variantInventory = $(this.settings.selectors.variantInventory);

          if (variant.sku && variantSkuRow ) {
            variantSkuRow.css("display", "block");
            variantSku.html(variant.sku);
            if(variantSkuRow.is(":last-child")){
       variantSkuRow.prev('li').removeAttr("style");
            }
          }
          else{
            variantSkuRow.css("display", "none");
            variantSku.html('');
            if(variantSkuRow.is(":last-child")){
            variantSkuRow.prev('li').css("padding-bottom", "0");
            }
          }

          if(variantInventoryRow) {
            variantInventoryRow.css("display", "block");


      var main_product_select = $("#ProductSelect-"+selector),
          optionsLength = main_product_select.find("option").length;
      for(var i=0;i<=optionsLength;i++){
        var currentOption = main_product_select.find("option:nth-child("+i+")");
        if(currentOption.val() == variant.id){
        var variant_inventory_management = currentOption.attr("data-inventory_management");
      var variant_inventory_policy = currentOption.attr("data-inventory_policy" );
      var variant_inventory_quantity = currentOption.attr("data-inventory_quantity");
      break;
        }else{
      var variant_inventory_management = "";
      var variant_inventory_policy = "";
      var variant_inventory_quantity = "";
      }
      }
      if (variant_inventory_management == "shopify" && variant_inventory_policy != "continue") {
        if (variant_inventory_quantity >0) {
          variantInventory.html('<span class=in-stock>In stock! Usually ships within 24 hours.</span>');
        } else {
          variantInventory.html("<span class=out-of-stock>Sorry!  This product is currently out of stock.</span>");
        }
      } else {
        variantInventory.html("<span class=in-stock>In stock! Usually ships within 24 hours.</span>");
      }
    }
   }
		
          if(variant.price == 0){
            var hide_price = this.$container.attr("data-hide_price");  
            var hide_btn = this.$container.attr("data-show_btn");  
          if(hide_price != ""){
              this.$container.find(".product-item-caption-price").hide();
              this.$container.find(".price0_text").show();             
            }else{
              this.$container.find(".product-item-caption-price").show();
              this.$container.find(".price0_text").hide();
            }
            if(hide_btn == "true"){
             $(this.settings.selectors.addToCart).hide().prop('disabled', true);
             this.$container.find(".product_payments_btns").hide();
            }else{            
               $(this.settings.selectors.addToCart).show().prop('disabled', false);
               this.$container.find(".product_payments_btns").show();
            }
          }else{
            this.$container.find(".product-item-caption-price").show();
            this.$container.find(".price0_text").hide();
            $(this.settings.selectors.addToCart).show();
            this.$container.find(".product_payments_btns").show();
            if (variant.available) {
              $(this.settings.selectors.addToCart).prop('disabled', false);
            }
          }

      } else {
        // The variant doesn't exist, disable submit button and change the text.
        // This may be an error or notice that a specific variant is not available.
        this.$container.find(".product-item-caption-price").show();
        this.$container.find(".price0_text").hide();
        this.$container.find(".product_payments_btns").show();
        $(this.settings.selectors.addToCart).prop('disabled', true);
        $(this.settings.selectors.addToCartText).text(theme.strings.unavailable);
        $(this.settings.selectors.comparePrice).addClass('hide');
        $(this.settings.selectors.comparePrice).closest("li").addClass('hide');
        $(this.settings.selectors.saleLabel).addClass('hide');
        $(this.settings.selectors.price).removeClass(this.settings.selectors.saleClasses);
        $(this.settings.selectors.productPrice).html('Unavailable');
        smart_checkout_btn.hide();
        if(variantInventoryRow) {
        variantInventory.html("<span class=out-of-stock>Sorry!  This product is currently out of stock.</span>");
        }
      }
    }
  });

  return Product;
})();



// theme.CollectionPage
var swiperArr = [],
    container = $('#container');
theme.CollectionPage = (function() {
  function CollectionPage(container) {

    var $container = this.$container = $(container),
        sectionId = this.sectionId = $container.attr('data-section-id'),
        container = $('#container'),
        mp = $.magnificPopup.instance,
        swiperCarousel,
        swiperCarouselThumbs;
    function hideSpinner() {
      $container.find(".spinner-cube").hide();
    }

    $container.find(".product-thumb-caption-title").on("click", function(){
      var product_url = $(this).closest(".product-thumb").find(".product-thumb-href").attr("href");
      window.location.href = product_url;
    });


    var pushy = initPushyMenu();

    $(window).scroll(function() {
      if($(window).scrollTop() + $(window).height() > $("#shopify-section-collection-template").height()+50) {
        $('#pushy-filters-btn').css({
          position: 'absolute',
          bottom: 'auto',
          marginTop: $("#shopify-section-collection-template").height() - 80,
          left: 0
        });
      }else{
        if($(".nav-main").length){
         // var left = 30;
        }else{
          var left = 0;
        }
        $('#pushy-filters-btn').css({
          position: 'fixed',
          marginTop: 0,
          bottom: 0,
          left: left
        });
      }
    });


    if($(window).width() > 800) {
      var animationOnHoverBlock = $(".showInfoOnHover .animationOnHoverBlock");
      animationOnHoverBlock.each(function(){

        var animationOnHoverBlockHeight = $(this).outerHeight();
        var animationOnHoverBlockTitleHeight = $(this).find("h5").outerHeight() - 32;
        var transformValue = animationOnHoverBlockHeight - animationOnHoverBlockTitleHeight - 20;
        $(this).css("transform", "translateY("+transformValue+"px)");
      });

    }

    $(window).resize(function() {
    if($(window).width() > 800) {
      var animationOnHoverBlock = $(".showInfoOnHover .animationOnHoverBlock");
      animationOnHoverBlock.each(function(){

        var animationOnHoverBlockHeight = $(this).outerHeight();
        var animationOnHoverBlockTitleHeight = $(this).find("h5").outerHeight() - 32;
        var transformValue = animationOnHoverBlockHeight - animationOnHoverBlockTitleHeight -20;
        $(this).css("transform", "translateY("+transformValue+"px)");
      });

    }else{
       var animationOnHoverBlock = $(".showInfoOnHover .animationOnHoverBlock");
      animationOnHoverBlock.each(function(){
        $(this).removeAttr("style");
      });
    }
    });

    $(".same-height-blocks").matchHeight();
    if($(window).width() > 992) {


      $('#category-sticky-filters').stick_in_parent({
        parent: '#category-sticky-parent'
      });
    }

    Shopify.queryParams = {};
    if (location.search.length) {
      for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
        aKeyValue = aCouples[i].split('=');
        if (aKeyValue.length > 1) {
          Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
        }
      }
    }

    $('#sortBy')
    // select the current sort order
    .val($('#sortBy').data("sort"))
    .bind('change', function() {
      Shopify.queryParams.sort_by = jQuery(this).val();
      location.search = jQuery.param(Shopify.queryParams);
    });
  setTimeout(function(){
        $container.find("#sortBy").select2({
          theme: "classic",
          minimumResultsForSearch: Infinity
        });
      }, 100);


   //initQuantityEvents(sectionId);
     initQuickView(sectionId);

    var popped = false;
    window.onpopstate = function (event) {
      if(popped){
        location.href = $(".category-filters-area").data("url");
      }
    };

    var filters = $('.advanced-filter'),
        activeTag,
        activeHandle;

    $('.advanced-filter a').on('click', function(evt) {
      evt.preventDefault();
    });

    filters.on('click', function(e) {

      var el = $(this),
          group = el.data('group'),
          url = el.find('a').attr('href');

      // Continue as normal if we're clicking on the active link
      if ( el.hasClass('active-filter') ) {
        return window.location = url;
      }

      // Get active group link (unidentified if there isn't one)
      activeTag = $('.active-filter[data-group="'+ group +'"]');

      // If a tag from this group is already selected, remove it from the new tag's URL and continue
      if ( activeTag && activeTag.data('group') === group ) {
        e.preventDefault();
        activeHandle = activeTag.data('handle') + '+';

        // Create new URL without the currently active handle
        url = url.replace(activeHandle, '');
        window.location = url;
      }else{
        window.location = url;
      }

    });

    // filters.on('click', function(e) {
    //
    //   var el = $(this),
    //       group = el.data('group'),
    //       url = el.find('a').attr('href');
    //
    //   // Continue as normal if we're clicking on the active link
    //   if ( el.hasClass('active-filter') ) {
    //     return ajaxLoadFilterPage(url);
    //   }
    //
    //   // Get active group link (unidentified if there isn't one)
    //   activeTag = $('.active-filter[data-group="'+ group +'"]');
    //
    //   // If a tag from this group is already selected, remove it from the new tag's URL and continue
    //   if ( activeTag && activeTag.data('group') === group ) {
    //     e.preventDefault();
    //     activeHandle = activeTag.data('handle') + '+';
    //
    //     // Create new URL without the currently active handle
    //     url = url.replace(activeHandle, '');
    //     ajaxLoadFilterPage(url);
    //   }else{
    //     ajaxLoadFilterPage(url);
    //   }
    //
    //   pushy.close();
    // });

    (function doCheck(){
      setTimeout(function(){
        if ($(".collection-products-wrapper:last-child .product-thumb-img").hasClass("lazyloaded")) {
          $.fn.matchHeight._maintainScroll = true;
          $.fn.matchHeight._update();
        }else{
          doCheck();
        }
      }, 100);
    })();


    var ajaxLoadFilterPage = function (url) {
      $.ajax({
        type: 'GET',
        url: url,
        data: {},
        complete: function (data) {
          $(".product-thumb").matchHeight({ remove: true });
          $('#category-sticky-products, #category-sticky-filters').trigger("sticky_kit:detach");
          $('#category-sticky-products').html($("#category-sticky-products", data.responseText).html());
          if($("#category-sticky-filters").length){
            $('#category-sticky-filters').html($("#category-sticky-filters", data.responseText).html());
            $('.pushy_left_sidebar_content').html($(".pushy_left_sidebar_content", data.responseText).html());
          }else{
            $('.category-filters-area').html($(".category-filters-area", data.responseText).html());
          }
          $('.page-header').html($(".page-header", data.responseText).html());
          $('.pagination-buttons').html($(".pagination-buttons", data.responseText).html());

          //window.history.pushState(stateObj, url, url);
          history.pushState({
            page: url
          }, url, url);

          popped = true;

          $('img.lazyload').addClass('lazypreload');

          $('#sortBy')
          // select the current sort order
          .val($('#sortBy').data("sort"))
          .bind('change', function() {
            Shopify.queryParams.sort_by = jQuery(this).val();
            location.search = jQuery.param(Shopify.queryParams);
          });

          setTimeout(function(){
            $container.find("#sortBy").select2({
              theme: "classic",
              minimumResultsForSearch: Infinity
            });
          }, 200);

           setTimeout(function(){
            // $(".product-thumb").matchHeight();
             $container.find(".product-thumb-caption-title").on("click", function(){
               var product_url = $(this).closest(".product-thumb").find(".product-thumb-href").attr("href");
               window.location.href = product_url;
             });
          }, 500);



    $(window).scrollTop(0);
        $('#pushy-filters-btn').css({
          position: 'fixed',
          marginTop: 0,
          bottom: 0,
          left: 0
        });

          setTimeout(function(){
            $(".same-height-blocks").matchHeight({ remove: true });
            $(".same-height-blocks").matchHeight();
            setTimeout(function(){
              if($(window).width() > 992) {
                $('#category-sticky-filters').stick_in_parent({
                  parent: '#category-sticky-parent'
                });
              }
            },200);

          }, 2000);


       //initQuantityEvents(sectionId);
         initQuickView(sectionId);



          var filters = $('.advanced-filter'),
              activeTag,
              activeHandle;

          $('.advanced-filter a').on('click', function(evt) {
            evt.preventDefault();
          });
           if($(window).width() > 800) {
      var animationOnHoverBlock = $(".showInfoOnHover .animationOnHoverBlock");
      animationOnHoverBlock.each(function(){
        var animationOnHoverBlockHeight = $(this).outerHeight();
        var animationOnHoverBlockTitleHeight = $(this).find("h5").outerHeight() - 32;
        var transformValue = animationOnHoverBlockHeight - animationOnHoverBlockTitleHeight - 20;
        $(this).css("transform", "translateY("+transformValue+"px)");
      });

    }

    $(window).resize(function() {
    if($(window).width() > 800) {
      var animationOnHoverBlock = $(".showInfoOnHover .animationOnHoverBlock");
      animationOnHoverBlock.each(function(){
        var animationOnHoverBlockHeight = $(this).outerHeight();
        var animationOnHoverBlockTitleHeight = $(this).find("h5").outerHeight() - 32;
        var transformValue = animationOnHoverBlockHeight - animationOnHoverBlockTitleHeight - 20;
        $(this).css("transform", "translateY("+transformValue+"px)");
      });

    }else{
       var animationOnHoverBlock = $(".showInfoOnHover .animationOnHoverBlock");
      animationOnHoverBlock.each(function(){
        $(this).removeAttr("style");
      });
    }
    });

           function hideSpinner() {
      $container.find(".spinner-cube").hide();
    }

          filters.on('click', function(e) {
            var el = $(this),
                group = el.data('group'),
                url = el.find('a').attr('href');

            // Continue as normal if we're clicking on the active link
            if ( el.hasClass('active-filter') ) {
          $('#category-sticky-products').trigger("sticky_kit:detach");
          $('#category-sticky-filters').trigger("sticky_kit:detach");
              return ajaxLoadFilterPage(url);
            }

            // Get active group link (unidentified if there isn't one)
            activeTag = $('.active-filter[data-group="'+ group +'"]');

            // If a tag from this group is already selected, remove it from the new tag's URL and continue
            if ( activeTag && activeTag.data('group') === group ) {
              e.preventDefault();
              activeHandle = activeTag.data('handle') + '+';

              // Create new URL without the currently active handle
              url = url.replace(activeHandle, '');
              $('#category-sticky-products').trigger("sticky_kit:detach");
          $('#category-sticky-filters').trigger("sticky_kit:detach");
              ajaxLoadFilterPage(url);
            }else{
              $('#category-sticky-products').trigger("sticky_kit:detach");
          $('#category-sticky-filters').trigger("sticky_kit:detach");
              ajaxLoadFilterPage(url);
            }
          });


        (function doCheck(){
            setTimeout(function(){
              if ($(".collection-products-wrapper:last-child .product-thumb-img").hasClass("lazyloaded")) {
                $.fn.matchHeight._maintainScroll = true;
                $.fn.matchHeight._update();
              }else{
                doCheck();
              }
            }, 100);
          })();
        }
      });
      
    };
	enabledQuickView();
  }

  return CollectionPage;
})();
theme.CollectionPage.prototype = _.assignIn({}, theme.CollectionPage.prototype, {

  onSelect: function(){
    var mp = $.magnificPopup.instance;
    if(typeof mp !== 'undefined'){
      mp.close();
    }
    updatePageHeaderView();
  }
});


function quickViewSelectCallback(variant, selector){

  // find the matching product panel
  var productPanel = $('div.quick-view-panel[data-id="'+selector+'"]');

  // check that the panel exists
  if(productPanel.length === 0){
    console.log('Can not find product panel');
    return;
  }

  //check that data is what we expect, and if the panel is open
//   if (variant && variant.featured_image && productPanel.is(":visible")) {
//     var original_image = $(".swiper-slide img", productPanel), new_image = variant.featured_image;
//     Shopify.Image.switchImage(new_image, original_image[0]);
//   }

      if (variant) {
        if (variant.featured_image) {
          var slideId = variant.featured_media.id;
          var slide = $("#"+slideId);
          var slideIndex =  slide.index();
           if(typeof swiperCarousel != "undefined"){
            swiperCarousel.slideTo(slideIndex);
          }
//           var slideImg = slide.find('img'),
//               src = slideImg.attr("data-original");
//             slideImg.attr("src", src).removeClass("lazyload");
        }
      }

  // BEGIN SWATCHES
  if (variant) {
    var indexArray=[];
    $("[data-id='"+selector+ "'] .single-option-selector option:selected").each(function() {
      indexArray.push($(this).index());
    });
    var form = jQuery('#VQProductSelect-'+selector).closest('form');
//     for (var i=0,length=variant.options.length; i<length; i++) {
//       var num = indexArray[i];
//       var radioButtonDiv = form.find('.swatch[data-option-index="' + i + '"] div.swatch-element')[num];
//       var radioButton = $(radioButtonDiv).find(":radio");
//       if (radioButton.size()) {
//         radioButton.get(0).checked = true;
//       }
//     }
    
      for (var i=0,length=variant.options.length; i<length; i++) {
      var radioButton = form.find('.swatch[data-option-index="' + i + '"] :radio[value="' + variant.options[i] +'"]');
      if (radioButton.size()) {
        debugger;
        radioButton.get(0).checked = true;
      }
    }
  }
  // END SWATCHES

  var addToCart = productPanel.find('.AddToCartQV'), // find the add to cart button
      addtoCartText = addToCart.find('span');// find the add to cart text
  var productPrice = productPanel.find('.product-item-caption-price-current span'); // find the price
  var comparePrice = productPanel.find('.product-item-caption-price-list span'); // find the compare price (not currently used in quick view)
  var smart_checkout_btn = productPanel.find(".shopify-payment-button");
  if (variant) {
    if (variant.available) {
      // We have a valid product variant, so enable the submit button
      addToCart.removeClass('disabled').prop('disabled', false).val('Add to cart');
      addtoCartText.text('Add to cart');
      smart_checkout_btn.show();
    } else {
      // Variant is sold out, disable the submit button
      addToCart.val('Sold out').addClass('disabled').prop('disabled', true);
      addtoCartText.html('Sold out');
      smart_checkout_btn.hide();
     }

      // Regardless of stock, update the product price
      if(productPrice.length){
        productPrice.html(Shopify.formatMoney(variant.price, theme.moneyFormat));
      }

      // Also update and show the product's compare price if necessary
      if(comparePrice.length){
        if ( variant.compare_at_price > variant.price ) {
          comparePrice.html(Shopify.formatMoney(variant.compare_at_price, theme.moneyFormat)).show();
          comparePrice.closest("li").show();
        }else{
          debugger;
          comparePrice.html("");
          comparePrice.closest("li").hide();
          comparePrice.hide();
        }
      }
    
    if(variant.price == 0){
            var hide_price = productPanel.attr("data-hide_price");  
            var hide_btn = productPanel.attr("data-show_btn");  
          if(hide_price != ""){
              productPanel.find(".product-item-caption-price").hide();
              productPanel.find(".price0_text").show();             
            }else{
              productPanel.find(".product-item-caption-price").show();
              productPanel.find(".price0_text").hide();
            }
            if(hide_btn == "true"){
             addToCart.hide().prop('disabled', true);
             productPanel.find(".product_payments_btns").hide();
            }else{            
               addToCart.show().prop('disabled', false);
               productPanel.find(".product_payments_btns").show();
            }
          }else{
            productPanel.find(".product-item-caption-price").show();
            productPanel.find(".price0_text").hide();
            addToCart.show();
            productPanel.find(".product_payments_btns").show();
            if (variant.available) {
              addToCart.prop('disabled', false);
            }
          }
    
    } else {
      addToCart.val('Unavailable').show().addClass('disabled').prop('disabled', true);
         addtoCartText.html('Sold out');
      comparePrice.html("");
      comparePrice.closest("li").hide();
      comparePrice.hide();
      smart_checkout_btn.hide();
      productPrice.html("Unavailable");
      productPanel.find(".product-item-caption-price").show();
      productPanel.find(".price0_text").hide();
      productPanel.find(".product_payments_btns").show();
       }
   }; // END quickViewSelectCallback()


// theme.HeaderSection
theme.HeaderSection = (function() {
 function HeaderSection(container) {
   var $container = this.$container = $(container);
   var sectionId = this.sectionId = $container.attr('data-section-id');
   var menuType = $container.data("menu-type");
   var heroSize = $container.data("hero-size");
   var showBreadcrumbs = $container.data("show-breadcrumbs");

   if(showBreadcrumbs){
     $("body").addClass("show_breadcrumbs");
   }else{
     $("body").removeClass("show_breadcrumbs");
   }

  updatePageHeaderView();

    $('.header-nav-pushy a, .header-nav-pushy button').each(function(index, el){
      $(el).attr('tabindex', -1);
    });

    if ($('.left_nav_icons_accordion').length > 0) {
      $('.left_nav_icons_accordion a, .left_nav_icons_accordion select').each(function(index, el){
        $(el).attr('tabindex', -1);
      });
    }


  $('.close-pushy-menu').on('focus', function(){
    $('.pushy-menu-btn:eq(0)').trigger("click");
  });

  // $('.pushy-menu-btn').on("focus", function(){
  //   $(this).trigger("click");
  // });

  // $('[data-toggle="collapse"]').on("focus", function(e){
    // $(this).trigger("click");
  // });

  $('.pushy-menu-btn').keypress(function(e){
    if (e.keyCode == 32) {
      // $(this).trigger("click");
    }
  });

  $('[data-toggle="collapse"]').keypress(function(e){
    if (e.keyCode == 32) {
        $(this).trigger("click");
    }
  });

     $(".second_level_drop_link").on("click", function(e){
     var el = $(this);

     var data_collapsed = el.hasClass("collapsed");
     var data_url = el.data("link-url");
     if(e.target == this && !data_collapsed){
       window.location.href = data_url;
     }else{

       el.addClass("second_level_drop_link_active");
       setTimeout(function(){
         $(".second_level_drop_link").not(".second_level_drop_link_active").each(function(){
           $(this).addClass("collapsed").attr("aria-expanded", "false").closest(".panel-heading").next(".panel-collapse").attr("aria-expanded", false).animate({
             height: "0px",
           }, 400, function() { $(this).removeClass("in") });
         });
         el.removeClass("second_level_drop_link_active");
       },100);

     }
   });

    $(".third_level_drop_link").on("click", function(e){
     var el = $(this);

     var data_collapsed = el.hasClass("collapsed");
     var data_url = el.data("link-url");

     if(e.target == this && !data_collapsed){
       window.location.href = data_url;
     }
   });


   $('.header-nav-pushy [aria-expanded]').on('focusin', function(){
    $(this).attr('aria-expanded', true);
   });
   $('.header-nav-pushy [aria-expanded]').on('focusout', function(){
    $(this).attr('aria-expanded', false);
   });
   
   $('.mega-menu-simple [aria-haspopup="true"]').on('focusin', function(){
    if (theme.Helpers.isTouch()){return false;}
    $(this).addClass("dropdown_open");
   });

   $('.mega-menu-simple [aria-haspopup="true"]').on('focusout', function(e){
     if (theme.Helpers.isTouch()){return false;}
     if(!$(e.relatedTarget).closest($(this)).length){
       $(this).removeClass("dropdown_open");
     }
   });
   
   $('.mega-yamm-menu  [aria-haspopup="true"]').on('focusin', function(){
    if (theme.Helpers.isTouch()){return false;}
    $(this).addClass("dropdown_open");
   });

   $('.mega-yamm-menu [aria-haspopup="true"]').on('focusout', function(e){
     if (theme.Helpers.isTouch()){return false;}
     if(!$(e.relatedTarget).closest($(this)).length){
       $(this).removeClass("dropdown_open");
     }
   });
   
   
  
   

   if($("body").hasClass("template-index")){
     var isOverlapped = $("#container").find(".shopify-section").first().hasClass("overlapped_content");
     var isOverlap = $("#top-header-section").data("index-overlap"),
         bgColor = $("#top-header-section").data("bg-color"),
         imgWidth = $("#top-header-section").data("logo-width")+"px",
         notificationbarEnabled = $("#top-header-section").data("notificationbar");
     
     if(isOverlapped && isOverlap){
       $(".nav-standard-float, .nav-container, .nav-main-logo").css({"position":"absolute", "background": "none"});
       $(".nav-main-logo img").css("width", imgWidth);
       $("#shopify-section-header").addClass("white_icons_header");


       if(notificationbarEnabled == true){
         var headerHeight = $(".notification-bar").outerHeight();
           var slider_height =  $("#container").find(".shopify-section>*").first().data("height");
           $("#container").find(".shopify-section").first().find(".hero--full_screen, .hero-background-wrapper, .hero-item").css("height", "calc("+slider_height+" - "+headerHeight+"px");
           $( window ).resize(function() {
             var headerHeight = $("#top-header-section").outerHeight();
              var slider_height =  $("#container").find(".shopify-section>*").first().data("height");
             $("#container").find(".shopify-section").first().find(".hero--full_screen, .hero-background-wrapper, .hero-item").css("height", "calc("+slider_height+" - "+headerHeight+"px");
         });
       }
     }
     else if(isOverlapped && !isOverlap){
       var headerHeight = $("#top-header-section").outerHeight();
       var slider_height =  $("#container").find(".shopify-section>*").first().data("height");
       if(slider_height == "100vh"){
          $("#container").find(".shopify-section").first().find(".hero--full_screen, .hero-background-wrapper, .hero-item, .swiper-slide").css("height", "calc("+slider_height+" - "+headerHeight+"px");
       }else{
          $("#container").find(".shopify-section").first().find(".hero--full_screen, .hero-background-wrapper, .hero-item, .swiper-slide").css("height", slider_height);
       }
      
        $( window ).resize(function() {
             var headerHeight = $("#top-header-section").outerHeight();
           var slider_height =  $("#container").find(".shopify-section>*").first().data("height");
                if(slider_height == "100vh"){
          $("#container").find(".shopify-section").first().find(".hero--full_screen, .hero-background-wrapper, .hero-item, .swiper-slide").css("height", "calc("+slider_height+" - "+headerHeight+"px");
       }else{
          $("#container").find(".shopify-section").first().find(".hero--full_screen, .hero-background-wrapper, .hero-item, .swiper-slide").css("height", slider_height);
       }
          });
     }
     else{
       $(".nav-main-logo, .nav-container, .nav-standard-float").css({"position":"relative", "background": bgColor, "width" : "100%"}).addClass('nav-standard-dark');
     }
   }

   if(menuType == 'left'){
//      $(".main-content").css("margin-left","60px");
//      $(window).trigger('resize');
   }
   else{
     $(".main-content").css("margin-left","0");
   }

   var $window = $(window),
       winHeightPadded = $window.height() * 0.5,
       // $navSticky = $('.nav-to-sticky'),
       $navSticky = $('#navbarStickyDesktop'),
       navStickyHeight = $navSticky.height(),
       $navStickyMobile = $('#navbarStickyMobile'),
       navStickyMobileHeight = $navStickyMobile.height(),
       desktopScroll = function() {
         return navStickyScroll($navSticky, navStickyHeight);
       },
       mobileScroll = function() {
         return navStickyScroll($navStickyMobile, navStickyMobileHeight)
       };
       // navStickyHieght = $navSticky.height();


   if($navSticky.length && $(window).width() > 992) {
     $window.on('scroll', desktopScroll);
   } else if($navStickyMobile.length && $(window).width() <= 992) {
     console.log('scrolling on mobile');
     $window.on('scroll', mobileScroll);
   }


   function navStickyScroll($el, elHeight) {

     var scrolled = $window.scrollTop(),
        navStickyHieght = elHeight;
     if(scrolled > winHeightPadded) {

       // var $navStickyNew = $('.nav-to-sticky:not(.nav-sticky):visible');
       // if($navStickyNew.length){
       //   navStickyHieght = $navStickyNew.height();
       // }

       if($(window).width() <= 992 || !$container.data("index-overlap")) {
         var indexOverlap = false;
       } else if($('body').hasClass('template-index') && $("#container").find(".shopify-section").first().hasClass("home-slideshow-section")) {
         var indexOverlap = true;
       } else if($('#page-header').length) {
         var indexOverlap = true;
       }


       $el.addClass('nav-sticky');
       if(!indexOverlap){
         $('#container').css({
           marginTop: navStickyHieght
         });
       }
     }
     if(scrolled < winHeightPadded) {
       $el.removeClass('nav-sticky');
       // vague.unblur();
       $('#container').css({
         marginTop: 0
       });

     }
   }

       $('.dropdown.yamm-fw').hoverIntent(function() {
         $(this).attr('aria-expanded', true);
       }, function() {
         $(this).attr('aria-expanded', false);
       });

       $(".mega-menu-simple .dropdown").hoverIntent(function() {
         $(this).attr('aria-expanded', true);
       }, function() {
         $(this).attr('aria-expanded', false);
       });

        $(".mega-simple-menu-column-with-list").hoverIntent(function() {
         $(this).attr('aria-expanded', true);
       }, function() {
         $(this).attr('aria-expanded', false);
       });

       $('.mega-menu-simple .dropdown').on('focusin', function(){
         $(this).attr('aria-expanded', true);
       });
       $('.mega-menu-simple .dropdown').on('focusout', function(){
         $(this).attr('aria-expanded', false);
       });

   $(function ()
     {
     $(".mega-yamm-menu > li").each(function (e) {
       if ($('ul', this).length && $('ul', this).hasClass("lr_auto"))
       {
         $(this).children().removeClass('l_auto');
         var elm = $('ul:first', this); //ul.wsmenu-sub-list
         var off = elm.offset();
         var l = off.left;
         var w = elm.width();
         var docH = $(window).height();
         var docW = $(window).width()-2;
         var isEntirelyVisible = (l + w <= docW);
         if (!isEntirelyVisible && docW > 992 )
         {
           elm.addClass('l_auto');
         } else {
           elm.removeClass('l_auto');
         }
       }
       $( window ).resize(function() {
         $(".mega-yamm-menu > li").each(function (e) {
           if ($('ul', this).length && $('ul', this).hasClass("lr_auto"))
           {
             $(this).children().removeClass('l_auto');
             var elm = $('ul:first', this);
             var off = elm.offset();
             var l = off.left;
             var w = elm.width();
             var docH = $(window).height();
             var docW = $(window).width()-2;
             var isEntirelyVisible = (l + w <= docW);
             if (!isEntirelyVisible && docW > 992 )
             {
               elm.addClass('l_auto');
             } else {
               elm.removeClass('l_auto');
             }}
         });
       });
     });
   });

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && $(window).width() >= 768) {
      $(document).on("click", ".dropdown.yamm-fw > a", function(e) {
        if(!$(this).closest("li").hasClass("opened_mega_menu") && $(this).closest("li").attr("aria-haspopup") == 'true'){
           $(".opened_mega_menu").each(function(){
            $(this).removeClass("opened_mega_menu");
           });
           $(this).closest("li").addClass("opened_mega_menu");

                  $('html').on("touchend", function(event) {
                    //check up the tree of the click target to check whether user has clicked outside of menu
                    if ($(event.target).parents('.mega-yamm-menu').length==0) {

                      $(".opened_mega_menu").each(function(){
                        $(this).removeClass('opened_mega_menu');
                      });


                      //this event listener has done its job so we can unbind it.
                      $(this).unbind(event);
                    }

                  })

           e.preventDefault();
           return false;
        }

      });

      $(document).on("click", ".mega-menu-simple .dropdown > a", function(e) {
        if(!$(this).closest("li").hasClass("opened_mega_menu") && $(this).closest("li").attr("aria-haspopup") == 'true'){
           $(".opened_mega_menu").each(function(){
            $(this).removeClass("opened_mega_menu");
           });
           $(this).closest("li").addClass("opened_mega_menu");

                  $('html').on("touchend", function(event) {
                    //check up the tree of the click target to check whether user has clicked outside of menu
                    if ($(event.target).parents('.mega-menu-simple').length==0) {

                      $(".opened_mega_menu").each(function(){
                        $(this).removeClass('opened_mega_menu');
                      });


                      //this event listener has done its job so we can unbind it.
                      $(this).unbind(event);
                    }

                  })

           e.preventDefault();
           return false;
        }

      });

      $(document).on("click", ".mega-simple-menu-column-with-list >.nav-mega-section-title > a", function(e) {
        if(!$(this).closest("div").hasClass("opened_mega_menu") && $(this).closest("div").attr("aria-haspopup") == 'true'){
           $(".mega-simple-menu-column-with-list.opened_mega_menu").each(function(){
            $(this).removeClass("opened_mega_menu");
           });
           $(this).closest("div").addClass("opened_mega_menu");

                  $('html').on("touchend", function(event) {
                    //check up the tree of the click target to check whether user has clicked outside of menu
                    if ($(event.target).parents('.mega-menu-simple').length==0) {

                      $(".mega-simple-menu-column-with-list.opened_mega_menu").each(function(){
                        $(this).removeClass('opened_mega_menu');
                      });


                      //this event listener has done its job so we can unbind it.
                      $(this).unbind(event);
                    }

                  })

           e.preventDefault();
           return false;
        }

      });



    }

   initPushyMenu();
   bindEventsInModalCart();
   $('.search-modal-popup').on("click", function(){
     Shopify.showSearchModal();
   });
   $('.cart-modal-popup').on("click", function(){
     // 
     // Shopify.showModal();
     // 

     if ("modal" == "modal" && $(window).width() > 768) {
       Shopify.showModal();
     } else {
       window.location = '/cart';
     }
   });
 }

 return HeaderSection;
 })();

 Shopify.showSearchModal = function() {
   $.magnificPopup.open({
     items: {
       src: '#nav-search-dialog',
       type: 'inline'
     },
     mainClass: 'mfp-move-from-top',
     removalDelay: 500,
     callbacks: {
       beforeOpen: function() {
         container.addClass('blured');
         $('body').addClass('y-hid');
       },
       open: function() {
         container.addClass('blured')
       },
       beforeClose: function() {
         container.removeClass('blured');
       },
       close: function() {
       },
       afterClose: function() {
         $('body').removeClass('y-hid');
       }
     },
     midClick: true
   });
 };

 // theme.PopupSection
theme.PopupSection = (function() {
        function PopupSection(container) {

          var $container = this.$container = $(container);
          var sectionId = this.sectionId = $container.attr('data-section-id');
          var delay = $container.attr('data-delay')*1000,
              cookie = $container.attr('data-cookie'),
              enabledPopup = $container.attr('data-enabled'),
              sumbitted_form = false;

          $container.find("form").on("submit", function(){
            event.preventDefault();
            var cookieTime = cookie*1;
            $.cookie('pop_confirm', 'pop_newsletter', { expires: cookieTime });
            $(this).off('submit').submit();
          });

          $container.click(function (e) {
            var container = $container.find('.modal-content');
            if (container.has(e.target).length === 0){
              $('#myModal').modal('hide');
            }
          });


          if($.cookie('pop_confirm') != null && (window.location.search == "?customer_posted=true" || window.location.hash == "#contact_form" || $container.find("form .errors").length)){
            var sumbitted_form = true;
          }



          if(enabledPopup == "true" && window.location.href.indexOf("challenge") < 0){
            function show_modal(){
              $('#myModal').modal();
              $('#myModal').on('hidden.bs.modal', function () {
                var cookieTime = cookie*1;
                $.cookie('pop', 'modal', { expires: cookieTime });
                $.cookie("pop_confirm", null);
              });
            }
            $('#myModal').on('hidden.bs.modal', function () {
              $('body').attr('tabindex', '0');
              $('body').focus();
            });



            if ($.cookie('pop') == null || cookie  == "use_test_popup" || sumbitted_form) {
              window.setTimeout(show_modal, delay); // delay before it calls the modal function
              if (cookie  != "use_test_popup" || !sumbitted_form) {
                var cookieTime = cookie*1;
                $.cookie('pop', 'modal', { expires: cookieTime });
              }
              if(sumbitted_form){
                $.cookie("pop_confirm", null);
                $("#shopify-section-footer .errors").hide();
                $(".newsletter_hero__inner .errors").hide();

                if(!$container.find("form .errors").length){
                  $container.find("form").html('<div class="alert alert-success">Thanks for subscribing to our newsletter!</div>');
                                               }
                                               window.setTimeout(show_modal, delay);
                  window.history.replaceState(null, null, window.location.pathname);
                }

              }
            }
          }
          return PopupSection;
        })();

  theme.PopupSection.prototype = _.assignIn({}, theme.PopupSection.prototype, {

  onUnload: function(){
     $('#myModal').modal('hide');
  }
});

// theme.FeturedCollectionSection
theme.FeturedCollectionSection = (function() {
  function FeturedCollectionSection(container) {

    var $container = this.$container = $(container),
        container = $('#container'),
        sectionId = this.sectionId = $container.attr('data-section-id'),
        mp = $.magnificPopup.instance;

     if($(window).width() > 800) {
      var animationOnHoverBlock = $container.find(".showInfoOnHover .animationOnHoverBlock");
      animationOnHoverBlock.each(function(){
        var animationOnHoverBlockHeight = $(this).outerHeight();
        var animationOnHoverBlockTitleHeight = $(this).find("h5").outerHeight() - 32;
        var transformValue = animationOnHoverBlockHeight - animationOnHoverBlockTitleHeight -20;
        $(this).css("transform", "translateY("+transformValue+"px)");
      });

    }

    $(window).resize(function() {
    if($(window).width() > 800) {
      var animationOnHoverBlock = $container.find(".showInfoOnHover .animationOnHoverBlock");
      animationOnHoverBlock.each(function(){
        var animationOnHoverBlockHeight = $(this).outerHeight();
        var animationOnHoverBlockTitleHeight = $(this).find("h5").outerHeight() - 32;
        var transformValue = animationOnHoverBlockHeight - animationOnHoverBlockTitleHeight -20;
        $(this).css("transform", "translateY("+transformValue+"px)");
      });

    }else{
       var animationOnHoverBlock = $container.find(".showInfoOnHover .animationOnHoverBlock");
      animationOnHoverBlock.each(function(){
        $(this).removeAttr("style");
      });
    }
    });

 function hideSpinner() {
      $container.find(".spinner-cube").hide();
    }
//     $container.find(".product-thumb").matchHeight();


    //initQuantityEvents(sectionId);
     initQuickView(sectionId);

    $container.find(".product-thumb-caption-title").on("click", function(){
      var product_url = $(this).closest(".product-thumb").find(".product-thumb-href").attr("href");
      window.location.href = product_url;
    });
	enabledQuickView();
  }

  return FeturedCollectionSection;
})();

theme.FeturedCollectionSection.prototype = _.assignIn({}, theme.FeturedCollectionSection.prototype, {
        onSelect: function(){
          var mp = $.magnificPopup.instance;
          if(typeof mp !== 'undefined'){
            mp.close();
          }
        }
      });

// theme.SearchSection
      theme.SearchSection = (function() {
        function SearchSection(container) {
          var $container = this.$container = $(container);
          var sectionId = this.sectionId = $container.attr('data-section-id');
 function hideSpinner() {
      $container.find(".spinner-cube").hide();
    }

          // $container.find(".product-thumb").matchHeight();
        }

        return SearchSection;
      })();

      theme.SearchSection.prototype = _.assignIn({}, theme.SearchSection.prototype, {

        onSelect: function(){
          updatePageHeaderView();
        }
      });


// theme.CollectionsListSection
      theme.CollectionsListSection = (function() {
        function CollectionsListSection(container) {

          var $container = this.$container = $(container);
          var sectionId = this.sectionId = $container.attr('data-section-id');
 function hideSpinner() {
      $container.find(".spinner-cube").hide();
    }
      $container.find(".product-thumb").matchHeight();

          $container.find(".product-thumb-caption-title").on("click", function(){
            var product_url = $(this).closest(".product-thumb").find(".product-thumb-href").attr("href");
            window.location.href = product_url;
          });
        }

        return CollectionsListSection;
      })();

      theme.CollectionsListSection.prototype = _.assignIn({}, theme.CollectionsListSection.prototype, {

        onSelect: function(){
          updatePageHeaderView();
        }
      });

// theme.BlogPostsSection
//       theme.BlogPostsSection = (function() {
//         function BlogPostsSection(container) {
//
//           var $container = this.$container = $(container);
//           var sectionId = this.sectionId = $container.attr('data-section-id');
//
// //           $container.find(".blog-thumb-img").matchHeight();
//           // $container.find(".blog-thumb-caption").matchHeight();
//           // $container.find(".blog-thumb").matchHeight();
//
//
//           var useBottomPadding = $container.closest(".index-section").next().find(".block-title").length;
//           if(!useBottomPadding){
//             $container.css("padding-bottom","50px");
//           }else{
//             $container.css("padding-bottom","0");
//           }
//         }
//
//         return BlogPostsSection;
//       })();

theme.BlogPostsSection = (function() {

  function BlogPostsSection(container) {
    var $container = this.$container = $(container);
    inlineSwiper($container);
  }

  return BlogPostsSection;
})();

      //  theme.BlogPostsSection.prototype = _.assignIn({}, theme.BlogPostsSection.prototype, {
      //   onReorder: function(evt){
      // var container = $(evt.target).find(".blog-posts-row");
      //      var useBottomPadding = container.closest(".index-section").next().find(".block-title").length;
      //     if(!useBottomPadding){
      //       container.css("padding-bottom","50px");
      //     }else{
      //       container.css("padding-bottom","0");
      //     }
      //   }
      // });
// theme.BlogPageSection
      theme.BlogPageSection = (function() {
        function BlogPageSection(container) {

          var $container = this.$container = $(container);
          var sectionId = this.sectionId = $container.attr('data-section-id');

          $container.find(".blog_text_wrapper").matchHeight();
          $container.find(".blog-post").matchHeight();
        }

        return BlogPageSection;
      })();

       theme.BlogPageSection.prototype = _.assignIn({}, theme.BlogPageSection.prototype, {

        onSelect: function(){
          updatePageHeaderView();
        }
      });


      // theme.ArticlePageSection
      theme.ArticlePageSection = (function() {
        function ArticlePageSection(container) {

          var $container = this.$container = $(container);
          var sectionId = this.sectionId = $container.attr('data-section-id');

          var videoInRTE = $container.find(".blog-post-body iframe").length || false;
          if(videoInRTE){
            $container.find(".blog-post-body iframe").wrap("<div class='videoWrapperRTE'></div>");
          }
        }

        return ArticlePageSection;
      })();

       theme.ArticlePageSection.prototype = _.assignIn({}, theme.ArticlePageSection.prototype, {

        onSelect: function(){
          updatePageHeaderView();
        }
      });


// theme.FeaturedCollectiosSection
      theme.FeaturedCollectionsSection = (function() {
        function FeaturedCollectionsSection(container) {

          var $container = this.$container = $(container);
          var sectionId = this.sectionId = $container.attr('data-section-id');
 function hideSpinner() {
      $container.find(".spinner-cube").hide();
    }

          $container.find(".product-thumb").matchHeight();

          $container.find(".product-thumb-caption-title").on("click", function(){
            var product_url = $(this).closest(".product-thumb").find(".product-thumb-href").attr("href");
            window.location.href = product_url;
          });

        }

        return FeaturedCollectionsSection;
      })();
// theme.Maps
     theme.Maps = (function() {
  var config = {
    zoom: 14
  };
  var apiStatus = null;
  var mapsToLoad = [];
       if(theme.strings != undefined){
  var errors = {
    addressNoResults: theme.strings.addressNoResults,
    addressQueryLimit: theme.strings.addressQueryLimit,
    addressError: theme.strings.addressError,
    authError: theme.strings.authError
  };
       }
  var selectors = {
    section: '[data-section-type="map"]',
    map: '[data-map]',
    mapOverlay: '[data-map-overlay]'
  };

  var classes = {
    mapError: 'map-section--load-error',
    errorMsg: 'map-section__error errors text-center'
  };

  // Global function called by Google on auth errors.
  // Show an auto error message on all map instances.
  // eslint-disable-next-line camelcase, no-unused-vars
  window.gm_authFailure = function() {
    if (Shopify.designMode) {
      $(selectors.section).addClass(classes.mapError);
      $(selectors.map).remove();
      $(selectors.mapOverlay).after('<div class="' + classes.errorMsg + '">' + theme.strings.authError + '</div>');
    }
  }

  function Map(container) {
    this.$container = $(container);
    this.$map = this.$container.find(selectors.map);
    this.key = this.$map.data('api-key');

    if (typeof this.key === 'object') {
      return;
    }

    if (apiStatus === 'loaded') {
      this.createMap();
    } else {
      mapsToLoad.push(this);

      if (apiStatus !== 'loading') {
        apiStatus = 'loading';
        if (typeof window.google === 'undefined') {
          $.getScript('https://maps.googleapis.com/maps/api/js?key=' + this.key)
            .then(function() {
              apiStatus = 'loaded';
              initAllMaps();
            });
        }
      }
    }
  }

  function initAllMaps() {
    // API has loaded, load all Map instances in queue
    $.each(mapsToLoad, function(index, instance) {
      instance.createMap();
    });
  }

  function geolocate($map) {
    var deferred = $.Deferred();
    var geocoder = new google.maps.Geocoder();
    var address = $map.data('address-setting');

    geocoder.geocode({address: address}, function(results, status) {
      if (status !== google.maps.GeocoderStatus.OK) {
        deferred.reject(status);
      }

      deferred.resolve(results);
    });

    return deferred;
  }

  Map.prototype = _.assignIn({}, Map.prototype, {
    createMap: function() {
      var $map = this.$map;

      return geolocate($map)
        .then(function(results) {
          var mapOptions = {
            zoom: config.zoom,
            center: results[0].geometry.location,
            draggable: false,
            clickableIcons: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            disableDefaultUI: true
          };

          var mapStyle = this.mapStyle = new google.maps.StyledMapType(

            [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#333333"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#0072ff"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [
            {
                "lightness": "0"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels",
        "stylers": [
            {
                "lightness": "50"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": "16"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e3e3e3"
            },
            {
                "lightness": 21
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": "-81"
            },
            {
                "lightness": "27"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": "-64"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#b0d5b9"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#a3c6d8"
            },
            {
                "lightness": 17
            }
        ]
    }
],
            {name: 'Styled Map'});
          var map = this.map = new google.maps.Map($map[0], mapOptions);
          var center = this.center = map.getCenter();

          //eslint-disable-next-line no-unused-vars
          var marker = new google.maps.Marker({
            map: map,
            position: map.getCenter()
          });

          map.mapTypes.set('styled_map', mapStyle);
          map.setMapTypeId('styled_map');

          google.maps.event.addDomListener(window, 'resize', $.debounce(250, function() {
            google.maps.event.trigger(map, 'resize');
            map.setCenter(center);
            $map.removeAttr('style');
          }));
        }.bind(this))
        .fail(function() {
          var errorMessage;

          switch (status) {
            case 'ZERO_RESULTS':
              errorMessage = errors.addressNoResults;
              break;
            case 'OVER_QUERY_LIMIT':
              errorMessage = errors.addressQueryLimit;
              break;
            case 'REQUEST_DENIED':
              errorMessage = errors.authError;
              break;
            default:
              errorMessage = errors.addressError;
              break;
          }

          // Show errors only to merchant in the editor.
          if (Shopify.designMode) {
            $map
              .parent()
              .addClass(classes.mapError)
              .html('<div class="' + classes.errorMsg + '">' + errorMessage + '</div>');
          }
        });
    },

    onUnload: function() {
      if (this.$map.length === 0) {
        return;
      }
      google.maps.event.clearListeners(this.map, 'resize');
    },
     onSelect: function() {
      updatePageHeaderView();
    }

  });

  return Map;
})();


// theme.PasswordSection
      theme.PasswordSection = (function() {
        function PasswordSection(container) {
          $('.js-toggle-login-modal').magnificPopup({
            type: 'inline',
            mainClass: 'mfp-fade',
            closeOnBgClick: false,
            closeBtnInside: false,
            closeOnContentClick: false,
            tClose: "translation missing: en.general.password_page.close",
            removalDelay: 500,
            callbacks: {
            open: function() {
            window.setTimeout( function() { document.getElementById('password').focus(); }, 50 );
        },
          close: function() {
            window.setTimeout( function() { document.getElementById('email').focus(); }, 50 );
          }
      }
                               });
      if ( $('.storefront-password-form .errors').size() ) {
        $('.js-toggle-login-modal').click();
      }
    }

    return PasswordSection;
  })();

  // theme.FooterSection
  theme.FooterSection = (function() {
    function FooterSection(container) {
      var $container = this.$container = $(container);
      
      if($container.find("[data-disclosure-locale]").length){
        var localeDisclosure = new theme.Disclosure($container.find('[data-disclosure-locale]'));
        //$(".select2-container--lang").css("width", $("#lang-list").outerWidth());
      }

      if($container.find("[data-disclosure-currency]").length){
        var currencyDisclosure = new theme.Disclosure($container.find('[data-disclosure-currency]'));
         //$(".select2-container--currency").css("width", $("#currency-list").outerWidth());
      }
            
      function wrapped() {
        var footer_bottom_flex_row_item_height =  $('.footer-bottom-flex-row .col-md-6').first().outerHeight();
        var footer_bottom_flex_row_height = $('.footer-bottom-flex-row').first().outerHeight();

        if(footer_bottom_flex_row_item_height != footer_bottom_flex_row_height){
          $('.footer-bottom-flex-row').addClass("wrapped");
        }else{
          $('.footer-bottom-flex-row').removeClass("wrapped");
        }
      }

      wrapped();
      $(window).resize(function() {
        wrapped();
      });

       $container.find("form").on("submit", function(){
       event.preventDefault();
	   var cookieTime = 2000;
       $.cookie('footer_confirm', 'newsletter', { expires: cookieTime });
       $(this).off('submit').submit();
    });


    if($.cookie('footer_confirm') != null && (window.location.search == "?customer_posted=true" || window.location.hash == "#contact_form" || $container.find("form .errors").length) && window.location.href.indexOf("challenge") < 0){
      $.cookie('footer_confirm', null);
      window.history.replaceState(null, null, window.location.pathname);
      $(".newsletter_hero__inner .errors").hide();
      if(!$container.find("form .errors").length){
      	$container.find("form").html('<div class="alert alert-success">Thanks for subscribing to our newsletter!</div>');
       }

       var target_offset =  $container.find("form").closest(".footer-col").offset().top;
       var animation_durration = target_offset/1000*150;

       $('html, body').animate({
          scrollTop: $container.find("form").closest(".footer-col").offset().top
        }, animation_durration, function() {

          if(($container.find("form").closest(".footer-col").offset().top > $(window).scrollTop()) && ($(window).scrollTop() + $(window).height() < $(document).height())){
            var target_offset =  $container.find("form").closest(".footer-col").offset().top - $(window).scrollTop();
            var animation_durration = target_offset/1000*150;
            $('html, body').animate({
              scrollTop: $container.find("form").closest(".footer-col").offset().top
            }, animation_durration);
          }
  		});
    }




    }
    return FooterSection;
  })();

// theme.SlidshowSection
theme.ColumnsSliderSection = (function(){
  return function(container) {
    var $container = this.$container = $(container);
    var sectionId = this.sectionId = $(container).attr('data-section-id');
    var autoplay = +$(container).attr('data-slidesSpeed');

    var swiperSettings = {
      direction: 'horizontal',
      loop: true,
      simulateTouch: true,
      pagination: {
        el: '#swiper-pagination-'+sectionId,
        clickable: true
      },
      autoplay: autoplay ? {delay: autoplay*1000} : false,
      autoHeight: true,
      init: false
    };
    var swiper = new Swiper ('#swiper-'+sectionId, swiperSettings);

    function initColumns() {
    if($(window).width() > 992) {
      $('.hero-item-'+sectionId).hover(function(){
        var $self = $(this),
            id = $self.attr('data-hero-item'),
            $bg = $(id);
        $('.hero-item-'+sectionId).each(function(){
          $(this).removeClass('active');
          $(this).removeClass('hover');
        });
        $('.hero-item-bg-'+sectionId).each(function(){
          $(this).removeClass('active');
        });
        $bg.addClass('active');
        $self.addClass('active');
      });
    } else {
        swiper.init();
      }
    }
    initColumns();
    $( window ).resize(initColumns);
  };
})();

  theme.SlideshowSection = (function() {
    function SlideshowSection(container) {

      var $container = this.$container = $(container);
      var sectionId = this.sectionId = $container.attr('data-section-id');
      var swiperEnabled = this.swiperEnabled= $('#swiper-main-'+sectionId).length;
      var slidesSpeed = $container.attr('data-slidesSpeed')*1000;
      var autoplay = slidesSpeed > 0 ? { delay: +slidesSpeed } : false;
      // smoothScroll();

      var slidesLength = $('#swiper-main-'+sectionId+' .swiper-slide').length;
      if(slidesLength>1){
        var use_loop = true;
        var simulate_touch = true;
        }else{
        var use_loop = false;
        var simulate_touch = false;
        }
      var mySwiper = this.mySwiper = new Swiper ('#swiper-main-'+sectionId, {
        // Optional parameters
        navigation: {
          nextEl: '#swiper-button-next-'+sectionId,
          prevEl: '#swiper-button-prev-'+sectionId
        },
        direction: 'horizontal',
        loop: use_loop,
        simulateTouch: simulate_touch,
        pagination: {
          el: '#swiper-pagination-'+sectionId,
          clickable: true
        },
        autoplay: autoplay,
        autoHeight: true
      });
    }

    return SlideshowSection;
  })();
//  theme.HeaderSection.prototype = _.assignIn({}, theme.HeaderSection.prototype, {
//         onReorder: function(){
//           console.log("---------");
//         }
//       });
  theme.SlideshowSection.prototype = _.assignIn({}, theme.SlideshowSection.prototype, {

    onBlockSelect: function(evt) {

      var sectionId = this.sectionId
      var slideIndex = $(evt.target).data('index');
      var videoEnabled = this.swiperEnabled;
      var mySwiper = this.mySwiper;
      var mySwiperMobile = this.mySwiperMobile;
      mySwiper.slideTo(slideIndex, 1500, false);
      mySwiper.autoplay.stop();
    },
    onBlockDeselect: function() {
      var sectionId = this.sectionId
      var mySwiper = this.mySwiper;
      var mySwiperMobile = this.mySwiperMobile;
      mySwiper.autoplay.start();
    }
  });

  // theme.customerTemplates
  theme.customerTemplates = (function() {

    function initEventListeners() {
      // Show reset password form
      $('#RecoverPassword').on('click', function(evt) {
        evt.preventDefault();
        toggleRecoverPasswordForm();
      });

      // Hide reset password form
      $('#HideRecoverPasswordLink').on('click', function(evt) {
        evt.preventDefault();
        toggleRecoverPasswordForm();
      });
    }

    /**
   *
   *  Show/Hide recover password form
   *
   */
    function toggleRecoverPasswordForm() {
      $('#RecoverPasswordForm').toggleClass('hide');
      $('#CustomerLoginForm').toggleClass('hide');
    }

    /**
   *
   *  Show reset password success message
   *
   */
    function resetPasswordSuccess() {
      var $formState = $('.reset-password-success');

      // check if reset password form was successfully submited.
      if (!$formState.length) {
        return;
      }

      // show success message
      $('#ResetSuccess').removeClass('hide');
    }

    /**
   *
   *  Check URL for reset password hash
   *
   */
    function checkUrlHash() {
      var hash = window.location.hash;

      // Allow deep linking to recover password form
      if (hash === '#recover') {
        toggleRecoverPasswordForm();
      }
    }

    return {
      init: function() {
        checkUrlHash();
        initEventListeners();
        resetPasswordSuccess();
        //customerAddressForm();
      }
    };
  })();

  // function smoothScroll() {
  //   //   $('a[href*="#"]:not([href="#"]:not([href="#"])').each(function(){
  //   $('a.smoothScroll').each(function(){
  //     $(this).click(function() {
  //       if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
  //         var target = $(this.hash);
  //         target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
  //         if (target.length) {
  //           $('html,body').animate({
  //             scrollTop: target.offset().top
  //           }, 1000);
  //           return false;
  //         }
  //       }
  //     });
  //   });
  // };


 function initQuickView(sectionId){
 var sectionContainer = $("[data-section-id='"+sectionId+"']");

    if($(window).width() >= 768) {
    sectionContainer.find('.quick-view-btn').on('click', function (e) {
      if($(this).hasClass('quick-view-btn-opened')){

      setTimeout(function(){
        swiperCarousel.destroy(true, true);
           if(typeof swiperCarouselThumbs == 'object'){
             swiperCarouselThumbs.destroy(true, true);
           }
          }, 400);
        $(this).removeClass('quick-view-btn-opened');

        var windowWidth = $(this).closest('.collection-row').width();
        var parentRow = $(this).closest('.collection-row');
        var collectionProdWrapper = $(this).closest('.collection-products-wrapper');
        var boxWidth = collectionProdWrapper.outerWidth()-1;
        var boxesPerRow = ~~(windowWidth / boxWidth);

        // get the index of the clicked element
        var index = collectionProdWrapper.index();
        // get the column of the clicked element
        var col = (index % boxesPerRow) + 1;
        // calculate how far it is to the end of this row,
        // and select that element
        var $endOfRow = parentRow.find('.collection-products-wrapper').eq(index + boxesPerRow - col);
        if (!$endOfRow.length) $endOfRow = parentRow.find('.collection-products-wrapper').last();

    var quickViewPanel = collectionProdWrapper.find(".quick-view-panel"),
            quickViewPanelHeight = quickViewPanel.find(".row-col-norsp").outerHeight() +24,
            endOfRowPrevHeight = $endOfRow.outerHeight() - quickViewPanelHeight;


//         var target = $endOfRow;
         var target = quickViewPanel;
        setTimeout(function(){
          $endOfRow.css('height', endOfRowPrevHeight).removeClass("quickViewColumnOpened");
        }, 100);


        setTimeout(function(){
         $(".showTriangle").removeClass("showTriangle");
         }, 400);
         setTimeout(function(){
      $(window).trigger('scroll');
      },500);
      }else{
        var productId = $(this).attr("data-product-id"),
            sliderType = $(this).attr("data-slider-type"),
            quick_view_url = $(this).data("url"),
            btn=$(this);

        $("#quick-view-panel-inner-"+productId).load(quick_view_url, function(resp) {
//           	openQuickViewPanel(btn,sliderType, productId);
//             prepareQuickViewPanel(productId,sectionId);
        });


      }
    });     
  }
  }


    function enabledQuickView(){
      
        // check to make sure the popup script is available
        if(typeof $().magnificPopup !== 'function'){ return }


        // check that we are on the right kind of template
        var $quickViewBtns = $('a.quick-view-btn'); /* find all the the quick view launch buttons */     

        if($quickViewBtns.length){
         $quickViewBtns.each(function () {
            var prod_id = $(this).data('product-id');
            var productId = $(this).attr("data-product-id"),
                sliderType = $(this).attr("data-slider-type"),
                quick_view_url = $(this).data("url"),
                btn=$(this);
            // setup the quickview popup action
           $(this).magnificPopup({
              type: 'ajax',
              closeOnContentClick: false,
              mainClass:'mfp-move-from-top',
              removalDelay: 1000,
              callbacks : {
                elementParse: function(item) {
                  if(item.src.indexOf("nav-shopping-cart-dialog") == -1){
                  item.src = item.src.split("?")[0] + "?view=quickview";
                  }
                },
                ajaxContentAdded : function(){
                  var mp = $.magnificPopup.instance;                
                  var cur = mp.st.el;
                  var href = $(cur).attr('href');
                  var select = $(".mfp-move-from-top").find(".SingleOptionSelector-0");
               
                 if(typeof SPR != "undefined"){    
                    SPR.$(document).ready(function() {
                      return SPR.registerCallbacks(),
                        SPR.initRatingHandler(),
                        SPR.initDomEls(),
                        SPR.loadProducts(),
                        SPR.loadBadges()
                    })
                  }     
                  openQuickViewPanel(btn,sliderType, productId);
                  prepareQuickViewPanel(productId,prod_id);
                  
                  if(select.length){
                    select.trigger("change");
                  }
                }
 
              }
           });

          });

        }
    }
    
    function prepareQuickViewPanel(productId,sectionId){

      var quickViewPanel = $("#product-quickview-"+productId);


      if (!$('#ProductQuickViewJson-' + productId).html()) {
        return;
      }



      quickViewPanel.find(".swatch :radio").on("change", function() {
        var optionIndex = jQuery(this).closest('.swatch').attr('data-option-index');
        var optionValue = jQuery(this).val().replace(/\s{2,}/g, ' ');
        jQuery(this)
        .closest('form')
        .find('.single-option-selector')
        .eq(optionIndex)
        .val(optionValue)
        .trigger('change');
      });

      quickViewPanel.find("form[action*='/cart/add']").on("submit", function(e) {
        
        e.preventDefault();
        //Disable the Add To Cart button, add a disabled class.
        $(e.target).find('input[type=image], input.submit-add-to-cart').attr('disabled', true).addClass('disabled');

        //Can't use updateCartFromForm since you need the item added before you can update (otherwise, would have been more convenient)
        //So, in onItemAdded, we Shopify.getCart() to force the repaint of items in cart.
        Shopify.addItemFromForm(e.target);
        
      });


      var product = JSON.parse(document.getElementById('ProductQuickViewJson-' + productId).innerHTML);

      $(".quick-view-selector-"+product.id).on("change", function(){
        var $form = $(this).closest("form"),
            productVariantObj = product.variants;

        var option1 = $form.find(".SingleOptionSelector-0").val() || null,
            option2 = $form.find(".SingleOptionSelector-1").val() || null,
            option3 = $form.find(".SingleOptionSelector-2").val() || null,
            flag = true;
        for (var i=0,length=productVariantObj.length; i<length; i++) {
          var productVar = productVariantObj[i];
          if(productVar.option1 != null){productVar.option1 = productVar.option1.replace(/\s{2,}/g, ' ');}
          if(productVar.option2 != null){productVar.option2 = productVar.option2.replace(/\s{2,}/g, ' ');}
          if(productVar.option3 != null){productVar.option3 = productVar.option3.replace(/\s{2,}/g, ' ');}

          if(option1==productVar.option1 && option2==productVar.option2 && option3==productVar.option3){
            flag = false;
            $('#VQProductSelect-'+product.id).val(productVar.id);
            quickViewSelectCallback(productVar, product.id);
            break;
          }
        }
        if(flag){
          quickViewSelectCallback(null, product.id);
        }

      });

      var select = quickViewPanel.find(".single-option-selector");
      setTimeout(function(){
        select.select2({
          theme: "classic",
          minimumResultsForSearch: Infinity
        });
      },100);

      
      if(typeof SPR != "undefined"){    
      SPR.$(document).ready(function() {
        return SPR.registerCallbacks(),
          SPR.initRatingHandler(),
          SPR.initDomEls(),
          SPR.loadProducts(),
          SPR.loadBadges()
      });
      }
      


      // Hide variant dropdown if only one exists and title contains 'Default'
      if (product.variants.length && product.variants[0].title.indexOf('Default') >= 0) {
        quickViewPanel.find('.selector-wrapper').hide();
      }

      var productJSON = product;
      for (var i=0,length=productJSON.variants.length; i<length; i++) {
        var productVariants = productJSON.variants[i];

        if(productVariants.available){
          for (var j=0,optlength=productVariants.options.length; j<optlength; j++) {
            var variantOption = productVariants.options[j];
            variantOption = handleizeStr(variantOption);
            quickViewPanel.find('.swatch[data-option-index="'+j+'"] .'+variantOption+'').removeClass('soldout').addClass('available').find(':radio').removeAttr('disabled');
          }

        }
      }

      // BEGIN SWATCHES

      var indexArray=[];
      var productVariantOptions = product.variants;
      $("[data-id="+product.id+"] .single-option-selector option:selected").each(function() {
        indexArray.push($(this).index());
      });
      var form = jQuery('#VQProductSelect-'+product.id).closest('form');
      var variantIndex = jQuery('#VQProductSelect-'+product.id+' option:selected').index();
      if(variantIndex>=0){
        var variant = productVariantOptions[variantIndex];
        for (var i=0,length=variant.options.length; i<length; i++) {
          var num = indexArray[i];
          var radioButtonDiv = form.find('.swatch[data-option-index="' + i + '"] div.swatch-element')[num];
          var radioButton = $(radioButtonDiv).find(":radio");
          if (radioButton.size()) {
            radioButton.get(0).checked = true;
          }
        }
      }

      // END SWATCHES
      initQuantityEvents(productId);
    }

    function openQuickViewPanel(btn,sliderType, productId){
      setTimeout(function(){
       var $container = $("#quick-view-panel-inner-"+productId);
       var sectionId = productId;
    
        $container.find("[data-product-media-type-video]").each(function() {
          var $el = $(this);
          theme.ProductVideo.init($el, sectionId);
        });   
       
        if(theme.ProductVideo.youtubeApiLoaded){
          theme.ProductVideo.loadVideos(theme.ProductVideo.hosts.youtube);
        }  

        var $modelViewerElements = $(
          "[data-product-media-type-model]",
          $container
        );

        if ($modelViewerElements.length > 0){
          theme.ProductModel.init($modelViewerElements, sectionId);
        }


        $(document).on('shopify_xr_launch', function() {
          var $currentMedia = $container.find(".main-swiper-container .swiper-slide-active");
          $currentMedia.trigger('xrLaunch');
        });
        
        
           swiperCarousel = new Swiper ('.swiper-main-'+productId, {
            // Optional parameters
            direction: 'horizontal',
            pagination: {
              el: '.swiper-pagination-'+productId,
              clickable: true
            },
            simulateTouch: false,
            updateOnImagesReady :true,
             on:{ 
               transitionEnd:function(){
                 var slider = this;  
                 var index = slider.activeIndex;
                 var current_index = slider.previousIndex;

                 var $newMedia = $(slider.$el).find(".swiper-slide").eq(index).find("[data-product-single-media-wrapper]");
                 var $currentMedia = $(".main-swiper-container").find("[data-product-single-media-wrapper]");

                 $currentMedia.trigger('mediaHidden').removeAttr("style");
                 $newMedia.css("visibility", "visible").trigger('mediaVisible');

                 if (theme.Helpers.isTouch()){return false;}

                 if($newMedia.find("model-viewer").length){
                   $newMedia.find("model-viewer").focus();      
                 }else if($newMedia.find("[tabindex='0']").length){
                   $newMedia.find("[tabindex]").focus();
                 }else{
                   setTimeout(function(){
                     $newMedia.focus();  
                   }, 100);

                 }    

               }
             }
          });
        
        
     $container.on('keyup', ".swiper-pagination-bullet", function(event) {
      var keycode = event.keyCode;
      if (keycode === 13) {
      var swiper_instance = $container.find(".main-swiper-container")[0].swiper;       
      if(typeof swiper_instance == 'object') { 
          var index = swiper_instance.activeIndex;
          var thumb_index = $(document.activeElement).index();
          var active_slide_index = $container.find(".swiper-slide-active").index();

          if(thumb_index == active_slide_index){
             setTimeout(function(){
 			var $newMedia = $(swiper_instance.$el).find(".swiper-slide").eq(index).find("[data-product-single-media-wrapper]");
             $newMedia.trigger('mediaVisible');
            if($newMedia.find("model-viewer").length){
              $newMedia.find("model-viewer").focus();
            }else if( $newMedia.find("[tabindex='0']").length){
              $newMedia.find("[tabindex='0']").focus();  
            }else{
              $newMedia.focus();  
            }
             }, 300);   
          }
        }
      }
     });
      
        $container.on('click', ".swiper-pagination-bullet", function(event) {
         if (theme.Helpers.isTouch()){return false;}    
        var swiper_instance = $container.find(".main-swiper-container")[0].swiper;       
        if(typeof swiper_instance == 'object') { 
            var index = swiper_instance.activeIndex;
            var previousIndex = swiper_instance.previousIndex;
            var thumb_index = $(this).index();    
            var active_slide_index = $container.find(".swiper-slide-active").index();

          if(thumb_index == active_slide_index && !swiper_instance.animating){
            setTimeout(function(){
   			var $newMedia = $(swiper_instance.$el).find(".swiper-slide").eq(index).find("[data-product-single-media-wrapper]");
               $newMedia.trigger('mediaVisible');
              if($newMedia.find("model-viewer").length){
                $newMedia.find("model-viewer").focus();
              }else if( $newMedia.find("[tabindex='0']").length){
                $newMedia.find("[tabindex='0']").focus();  
              }else{
                $newMedia.focus();  
              }            
             }, 300);
          }
        }

      });
        
      }, 500);

    }


  function initQuantityEvents(sectionId){
    $('.btn-number-'+sectionId).click(function(e){
      e.preventDefault();
      fieldName = $(this).attr('data-field');
      type      = $(this).attr('data-type');
      var input = $(this).closest(".product-form__item--quantity").find("input[name='quantity']");
      var currentVal = parseInt(input.val());
      if (!isNaN(currentVal)) {
        if(type == 'minus') {
          if(currentVal > 0) {
            input.val(currentVal - 1).change();
          }
        } else if(type == 'plus') {
            input.val(currentVal + 1).change();
        }
      } else {
        input.val(0);
      }
    });

    $('.input-number-'+sectionId).focusin(function(){
      $(this).data('oldValue', $(this).val());
    });

    $('.input-number-'+sectionId).change(function() {

      minValue =  0;
      maxValue =  999;
      valueCurrent = parseInt($(this).val());

      name = $(this).attr('name');
      if(valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
      } else {
        $(this).val($(this).data('oldValue'));
      }
      if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
      } else {
        $(this).val($(this).data('oldValue'));
      }

    });
    $(".input-number-" +sectionId).keydown(function (e) {
      // Allow: backspace, delete, tab, escape, enter and .
      if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
          // Allow: Ctrl+A
          (e.keyCode == 65 && e.ctrlKey === true) ||
          // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
      }
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
    });
  }


  function updatePageHeaderView(){
    var titleHeader = $("header.page-header");
    var heroSize = $("#top-header-section").data("hero-size");
    var menuType = $("#top-header-section").data("menu-type");
    var isOverlapHeader = $("#top-header-section").data("index-overlap");
   if(titleHeader.length){
     titleHeader.removeClass("hero--xs-small");
     titleHeader.removeClass("hero--l-small");
     titleHeader.removeClass("hero--l-medium");
     titleHeader.addClass(heroSize);
   }else{
    return;
   }

   if(isOverlapHeader){

   if(menuType == "mega" || menuType == "mega_simple" ){
     var pageHeaderHeight = $(".collection-page-header-title").outerHeight();

     if($(window).width() > 992) {
       var navMenuHeight = $(".nav-standard").outerHeight(),
           totalMinHeight = pageHeaderHeight+navMenuHeight + 175;

       if($(".page-header-nav").length){
         var pageCollHeaderNav = $(".page-header-nav").outerHeight(),
             titlePaddingBottom = pageCollHeaderNav + 35;
         totalMinHeight += pageCollHeaderNav;
         titleHeader.css("padding-bottom", titlePaddingBottom+"px");
       }

       titleHeader.css("min-height", totalMinHeight+"px");

     }else if($(window).width() > 767) {
       var navMenuHeight = $(".nav-standard-middle").outerHeight(),
           totalMinHeight = pageHeaderHeight+navMenuHeight+55;
       if($(".page-header-nav").length){
         var pageCollHeaderNav = $(".page-header-nav").outerHeight(),
             titlePaddingBottom = pageCollHeaderNav;
         totalMinHeight += pageCollHeaderNav;
         titleHeader.css("padding-bottom", titlePaddingBottom+"px");
       }

       titleHeader.css("min-height", totalMinHeight+"px");
     }else{
       if($(".page-header-nav").length){
         var pageCollHeaderNav = $(".page-header-nav").outerHeight(),
             titlePaddingBottom = pageCollHeaderNav + 50;
         titleHeader.css("padding-bottom", titlePaddingBottom+"px");
       }
     }
   }else if(menuType == "left"){
      var pageHeaderHeight = $(".collection-page-header-title").outerHeight();
     if($(window).width() > 767) {
       var navMenuHeight = $(" .nav-main-logo").outerHeight(),
           totalMinHeight = pageHeaderHeight+navMenuHeight+85;

       if($(".page-header-nav").length){
         var pageCollHeaderNav = $(".page-header-nav").outerHeight(),
             titlePaddingBottom = pageCollHeaderNav;
         totalMinHeight += pageCollHeaderNav;
         titleHeader.css("padding-bottom", titlePaddingBottom+"px");
         titleHeader.css("justify-content", "center");
       }

       titleHeader.css("min-height", totalMinHeight+"px");
     }else{
       if($(".page-header-nav").length){
         var pageCollHeaderNav = $(".page-header-nav").outerHeight(),
             titlePaddingBottom = pageCollHeaderNav + 50;
         titleHeader.css("padding-bottom", titlePaddingBottom+"px");
       }
     }
   }else{
       var pageHeaderHeight = $(".collection-page-header-title").outerHeight();
     if($(window).width() > 767) {
       var navMenuHeight = $(".minimal-top-nav").outerHeight(),
           totalMinHeight = pageHeaderHeight+navMenuHeight+85;

        if($(".page-header-nav").length){
         var pageCollHeaderNav = $(".page-header-nav").outerHeight(),
             titlePaddingBottom = pageCollHeaderNav;
         totalMinHeight += pageCollHeaderNav;
         titleHeader.css("padding-bottom", titlePaddingBottom+"px");
         titleHeader.css("justify-content", "center");
       }


       titleHeader.css("min-height", totalMinHeight+"px");
     }else{
       if($(".page-header-nav").length){
         var pageCollHeaderNav = $(".page-header-nav").outerHeight(),
             titlePaddingBottom = pageCollHeaderNav + 50;
         titleHeader.css("padding-bottom", titlePaddingBottom+"px");
       }
     }
  }


    $( window ).resize(function() {
      if(menuType == "mega" || menuType == "mega_simple"){
     var pageHeaderHeight = $(".collection-page-header-title").outerHeight();

     if($(window).width() > 992) {

       var navMenuHeight = $(".nav-standard").outerHeight(),
           totalMinHeight = pageHeaderHeight+navMenuHeight + 55;

       if($(".page-header-nav").length){
         var pageCollHeaderNav = $(".page-header-nav").outerHeight(),
             titlePaddingBottom = pageCollHeaderNav + 35;
         totalMinHeight += pageCollHeaderNav;
         titleHeader.css("padding-bottom", titlePaddingBottom+"px");
         titleHeader.css("justify-content", "flex-end");
       }

       titleHeader.css("min-height", totalMinHeight+"px");

     }else if($(window).width() > 767) {
       var navMenuHeight = $(".nav-standard-middle").outerHeight(),
           totalMinHeight = pageHeaderHeight+navMenuHeight+55;

       if($(".page-header-nav").length){
         var pageCollHeaderNav = $(".page-header-nav").outerHeight(),
             titlePaddingBottom = pageCollHeaderNav;
         totalMinHeight += pageCollHeaderNav;
         titleHeader.css("padding-bottom", titlePaddingBottom+"px");
         titleHeader.css("justify-content", "center");
       }

       titleHeader.css("min-height", totalMinHeight+"px");
     }else{

        if($(".page-header-nav").length){
         var pageCollHeaderNav = $(".page-header-nav").outerHeight(),
             titlePaddingBottom = pageCollHeaderNav + 50;
         titleHeader.css("padding-bottom", titlePaddingBottom+"px");
       }

       titleHeader.css("min-height", 0);
     }
   }else if(menuType == "left"){
      var pageHeaderHeight = $(".collection-page-header-title").outerHeight();
     if($(window).width() > 767) {
       var navMenuHeight = $(" .nav-main-logo").outerHeight(),
           totalMinHeight = pageHeaderHeight+navMenuHeight+85;

         if($(".page-header-nav").length){
           var pageCollHeaderNav = $(".page-header-nav").outerHeight(),
               titlePaddingBottom = pageCollHeaderNav;
           totalMinHeight += pageCollHeaderNav;
           titleHeader.css("padding-bottom", titlePaddingBottom+"px");
           titleHeader.css("justify-content", "center");
         }

       titleHeader.css("min-height", totalMinHeight+"px");
     }else{
        if($(".page-header-nav").length){
         var pageCollHeaderNav = $(".page-header-nav").outerHeight(),
             titlePaddingBottom = pageCollHeaderNav + 50;
         titleHeader.css("padding-bottom", titlePaddingBottom+"px");
       }
       titleHeader.css("min-height", 0);
     }
   }else{
     var pageHeaderHeight = $(".collection-page-header-title").outerHeight();
     if($(window).width() > 767) {
       var navMenuHeight = $(".minimal-top-nav").outerHeight(),
           totalMinHeight = pageHeaderHeight+navMenuHeight+85;

           if($(".page-header-nav").length){
             var pageCollHeaderNav = $(".page-header-nav").outerHeight(),
                 titlePaddingBottom = pageCollHeaderNav;
             totalMinHeight += pageCollHeaderNav;
             titleHeader.css("padding-bottom", titlePaddingBottom+"px");
             titleHeader.css("justify-content", "center");
           }

       titleHeader.css("min-height", totalMinHeight+"px");
     }else{

        if($(".page-header-nav").length){
         var pageCollHeaderNav = $(".page-header-nav").outerHeight(),
             titlePaddingBottom = pageCollHeaderNav + 50;
         titleHeader.css("padding-bottom", titlePaddingBottom+"px");
       }

       titleHeader.css("min-height", 0);
     }
   }
    });

   }
  }



    // /**
//  * Shopify Ajaxify Shop.
//  */

jQuery(document).ready(function() {
  var selectors = {
    TOTAL_ITEMS: '.count-items',
    TOTAL_ITEMS_PRICE: '.total-items-price',
    QUICK_CART_TABLE: '#modal-cart-table',
    QUICK_CART_FORM: '.modal-cart-form',
    QUICK_CART_MENU:'.nav-dialog-inner-cart',
    CART_MENU: '.main-cart-form'
  };

  Shopify.afterCartUpdate = function(cart) {
    
    if(typeof window.BOLD !== 'undefined'
         && typeof window.BOLD.common !== 'undefined'
         && typeof window.BOLD.common.cartDoctor !== 'undefined') {
        // NOTE: "cart" should be the variable containing the cart json data
        cart = window.BOLD.common.cartDoctor.fix(cart);
      }
    
    // Total Items Update
    var message = cart.item_count;

      var totalPriceConverted = Shopify.formatMoney(cart.total_price, theme.moneyFormat);    
      var total_discount_PriceConverted = Shopify.formatMoney(cart.total_discount, theme.moneyFormat);

    if(cart.item_count > 0){
      $(selectors.TOTAL_ITEMS).text(message).removeClass('hidden');
      $(".nav-cart-dialog-total-amount").html(totalPriceConverted);
      $(".order-discount--cart-total").find('.money').html(total_discount_PriceConverted);
      $(selectors.TOTAL_ITEMS_PRICE).html(totalPriceConverted).removeClass('hidden');

      // SEB QUICKFIX !!!
      Shopify.updateExpressPayments()



    }else{
      $(selectors.TOTAL_ITEMS).text('').addClass('hidden');
      $(selectors.TOTAL_ITEMS_PRICE).text('').addClass('hidden');
    }

  };

  Shopify.updateExpressPayments = function(timeout = 1500) {
    if(window.location.pathname === '/cart') {
      if (window.Shopify && Shopify.StorefrontExpressButtons) {
        setTimeout(Shopify.StorefrontExpressButtons.initialize, timeout);
      }
    } else {
      var modalForm = $(".nav-dialog-inner-cart");
      if(modalForm.length) {
        $additionCheckoutBlock = modalForm.find("#additional-checkout-block");
        $additionCheckoutBlock.load('/cart #addCheckoutBtn', function() {
          if (window.Shopify && Shopify.StorefrontExpressButtons) {
            setTimeout(Shopify.StorefrontExpressButtons.initialize, timeout);
          }
        });
      }
    }
  };

  Shopify.showModal = function() {
//     var magnificPopup = $.magnificPopup.instance;
//     if(typeof magnificPopup !== 'undefined'){
//       magnificPopup.close();
//     }
    
    $.magnificPopup.open({
      items: {
        src: '#nav-shopping-cart-dialog',
        type: 'inline'
      },
      mainClass: 'mfp-move-from-top',
      removalDelay: 500,
      fixedContentPos: true,
      fixedBgPos: true,
      callbacks: {
        beforeOpen: function() {
          container.addClass('blured');
          $('body').addClass('y-hid');
        },
        open: function() {
          container.addClass('blured');
          Shopify.updateExpressPayments(30);
        },
        beforeClose: function() {
          container.removeClass('blured');
        },
        close: function() {
        },
        afterClose: function() {
          $('body').removeClass('y-hid');
        }
      },
      midClick: true
    });
  };

  Shopify.updateQuickCart = function(cart){
    
    if(typeof window.BOLD !== 'undefined'
        && typeof window.BOLD.common !== 'undefined'
        && typeof window.BOLD.common.cartDoctor !== 'undefined') {
      // NOTE: "cart" should be the variable containing the cart json data
      cart = window.BOLD.common.cartDoctor.fix(cart);
    }
    
    var formIsExist = $('.modal-cart-form').length;
    var totalPriceConverted = Shopify.formatMoney(cart.total_price, theme.moneyFormat);

    if(cart.items.length && formIsExist){
      
      //Bold:POv2 updating the modal cart
      // $(selectors.QUICK_CART_TABLE).load('/cart?'+(new Date()).getTime()+' #cart-page-table', function() {
         $(selectors.QUICK_CART_TABLE).load('/cart?view=modal&'+(new Date()).getTime()+' #cart-page-table', function() {       
        //Bold:POv2 updating the modal cart
           
        $(this).find("#cart-page-table").children(':first').unwrap();
      });
    }
    else if(cart.items.length && !formIsExist){

      //  
      // 	var cartNoteContent = '<textarea name="note" id="CartSpecialInstructionsModal" class="cart-notes" rows="6" placeholder="Add a note to your order">'+cart.note+'</textarea>';
      // 
 
      var cartNoteContent = '';
      var cartNoteClass = '';
      var cart_level_discount_applications = '';
      if (true) {
        var cartNote = cart.note;
        if(cartNote == null){
          cartNote = "";
        }
        cartNoteClass = '-with-notes';
        cartNoteContent = (
          '<a role="button" data-toggle="collapse" href="#cartNotesCollapse" aria-expanded="false" aria-controls="cartNotesCollapse" class="cart-notes-title">Add order notes</a>' +
          '<div class="collapse" id="cartNotesCollapse">' +
            '<textarea name="note" id="CartSpecialInstructions" class="cart-notes" rows="6" placeholder="Add a note to your order">'+cartNote+'</textarea>' +
          '</div>'
        );
      }

      if(cart.cart_level_discount_applications.length){

        for(var k=0;k<cart.cart_level_discount_applications.length;k++){
          var total_allocated_amount_val = cart.cart_level_discount_applications[k].total_allocated_amount;
          var total_allocated_amount_converted = Shopify.formatMoney(total_allocated_amount_val, theme.moneyFormat);              


          var cart_level_discount_applications = '<p class="order-discount-cart-wrapper"><span class="order-discount--cart total_val">'+
            '<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-saletag"><path d="M10 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-3H7a1 1 0 0 0-.71.29l-6 6a1 1 0 0 0 0 1.42l4 4a1 1 0 0 0 1.42 0c.19-.2 5.8-5.81 6-6A1 1 0 0 0 12 5V2a2 2 0 0 0-2-2z"/></svg>'+
              cart.cart_level_discount_applications[k].title +':</span><span class="order-discount--cart-total"> (-<span class="money">'+total_allocated_amount_converted+'</span>)</span></p>';
 
        }             

      }

      

      var title = '<h2 class="nav-cart-dialog-title">My shopping cart</h2>',
      form = '<form action="/cart" method="post" novalidate class="modal-cart-form"></form>',
        _checkOutRow = '<div class="nav-cart-dialog-total">'+
        '<span class="nav-cart-dialog-total-sign">Subtotal</span>'+
      '<span class="nav-cart-dialog-total-amount money">'+totalPriceConverted+'</span>'+
        '</div>'+cartNoteContent+
        '<ul class="nav-cart-dialog-actions">'+
        '<li><a href="javascript:void(0);" class="btn_close btn btn-white btn-ghost btn-lg">Continue Shopping</a></li>'+
        '<li><button type="submit" name="checkout" value="Checkout" class="btn btn-primary btn-lg">Checkout</button></li>'+
        '</ul>'+
          '<div id="additional-checkout-block"></div>';


          checkOutRow = (
          '<div class="cart-total-wrapper">'+
            '<div class="row">' +
              '<div class="col-sm-6">' + cart_level_discount_applications + 
                '<p class="cart-total ' + cartNoteClass + '"> <span class="sign">Subtotal</span>  <span class="money nav-cart-dialog-total-amount">' +totalPriceConverted+ '</span></p>' +
                cartNoteContent +
              '</div>' +
              '<div class="col-sm-6">' +
                '<div class="cart-checkout-bts">' +
                  '<div class="clearfix">' +
                    '<button type="submit" name="checkout" class="cart-checkout-btn checkout-btn btn btn-primary btn-lg">Checkout</button>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
        '</div>' +
        '<div id="additional-checkout-block"></div>');

      $(selectors.QUICK_CART_MENU).html("").append(title).append(form);
      $('.modal-cart-form').load('/cart?'+(new Date()).getTime()+' #cart-page-table', function() {
        $(this).find("#cart-page-table").attr("id", "modal-cart-table")
        $(this).append(checkOutRow);
        Shopify.updateExpressPayments(0);
      });
    }
    else{
      $(selectors.QUICK_CART_FORM).hide().load('/cart .empty-page-content', function() {
        $(this).children(':first').unwrap();
      }).fadeIn();
    }


    console.log('from modal update');
    
    setTimeout(function(){
         if (window.BOLD && BOLD.common && BOLD.common.eventEmitter &&
                  typeof BOLD.common.eventEmitter.emit === 'function'){
                BOLD.common.eventEmitter.emit('BOLD_COMMON_cart_loaded');
 }
        },1500);
  };

  Shopify.loadQuickCart = function(cart){
    
    if(typeof window.BOLD !== 'undefined'
           && typeof window.BOLD.common !== 'undefined'
           && typeof window.BOLD.common.cartDoctor !== 'undefined') {
          // NOTE: "cart" should be the variable containing the cart json data
          cart = window.BOLD.common.cartDoctor.fix(cart);
        }
    
    Shopify.updateQuickCart(cart);
    Shopify.afterCartUpdate(cart);
    Shopify.showModal();
    
    if (window.BOLD && BOLD.common && BOLD.common.eventEmitter &&
        typeof BOLD.common.eventEmitter.emit === 'function'){
      BOLD.common.eventEmitter.emit('BOLD_COMMON_cart_loaded',cart);
    }
    
  };

  Shopify.updateCart = function(cart){
    
    if(typeof window.BOLD !== 'undefined'
      && typeof window.BOLD.common !== 'undefined'
      && typeof window.BOLD.common.cartDoctor !== 'undefined') {
    // NOTE: "cart" should be the variable containing the cart json data
    cart = window.BOLD.common.cartDoctor.fix(cart);
  }

    if(cart.items.length){
      $(selectors.CART_MENU).load('/cart?'+(new Date()).getTime()+' .main-cart-form', function() {
        $(this).children(':first').unwrap();
      });
    }
    else{
      $(selectors.CART_MENU).hide().load('/cart .empty-page-content', function() {
        $(this).children(':first').unwrap();
      }).fadeIn();
    }

    Shopify.afterCartUpdate(cart);
  };

  Shopify.increaseQty = function(el){
    var inputEl = el.closest(".table-shopping-qty").find("input"),
        qty = inputEl.val();
    qty++;
    var quantity = qty,
        id = inputEl.data("id");

    

    Shopify.changeItem(id, quantity, function(cart){
      
      if(typeof window.BOLD !== 'undefined'
           && typeof window.BOLD.common !== 'undefined'
           && typeof window.BOLD.common.cartDoctor !== 'undefined') {
          // NOTE: "cart" should be the variable containing the cart json data
          cart = window.BOLD.common.cartDoctor.fix(cart);
        }
      
      var updatedItem = cart.items.filter(function(item){ return item.key == id });
      if(updatedItem.length && updatedItem[0].quantity == quantity){
        inputEl.val(quantity);
        Shopify.updateCart(cart);
        Shopify.updateQuickCart(cart);
        
        if(typeof window.BOLD !== 'undefined'
           && typeof window.BOLD.common !== 'undefined'
           && typeof window.BOLD.common.cartDoctor !== 'undefined') {
          // NOTE: "cart" should be the variable containing the cart json data
          updatedItem = window.BOLD.common.cartDoctor.fixItem(updatedItem);
        }
      }
      else{
        jQuery('.ajaxcart__item__' + id + '__errors').show().delay(3000).fadeOut();
      }
      
      if (window.BOLD && BOLD.common && BOLD.common.eventEmitter &&
          typeof BOLD.common.eventEmitter.emit === 'function'){
        BOLD.common.eventEmitter.emit('BOLD_COMMON_cart_loaded');
      }
      
    });
  }


  Shopify.changeInputQty = function(el){
    var inputEl = el,
        $itemRow = inputEl.closest("tr"),
        qty = inputEl.val();

    var quantity = qty,
        id = inputEl.data("id");
 if(quantity == 0){
   Shopify.removeItem(id, function(cart){
     
     if(typeof window.BOLD !== 'undefined'
         && typeof window.BOLD.common !== 'undefined'
         && typeof window.BOLD.common.cartDoctor !== 'undefined') {
        // NOTE: "cart" should be the variable containing the cart json data
        cart = window.BOLD.common.cartDoctor.fix(cart);
      }
     
        $itemRow.fadeOut( "slow", function() {
          Shopify.updateCart(cart);
          Shopify.updateQuickCart(cart);
        });
      });
 }else{
    

    Shopify.changeItem(id, quantity, function(cart){
      
      if(typeof window.BOLD !== 'undefined'
           && typeof window.BOLD.common !== 'undefined'
           && typeof window.BOLD.common.cartDoctor !== 'undefined') {
          // NOTE: "cart" should be the variable containing the cart json data
          cart = window.BOLD.common.cartDoctor.fix(cart);
        }
      
      var updatedItem = cart.items.filter(function(item){ return item.key == id });
      if(updatedItem.length && updatedItem[0].quantity == quantity){
        Shopify.updateCart(cart);
        Shopify.updateQuickCart(cart);
        
        if(typeof window.BOLD !== 'undefined'
           && typeof window.BOLD.common !== 'undefined'
           && typeof window.BOLD.common.cartDoctor !== 'undefined') {
          // NOTE: "cart" should be the variable containing the cart json data
          updatedItem = window.BOLD.common.cartDoctor.fixItem(updatedItem);
        }
        
      }
      else{
        jQuery('.ajaxcart__item__' + id + '__errors').show().delay(3000).fadeOut();
      }
      
      if (window.BOLD && BOLD.common && BOLD.common.eventEmitter &&
          typeof BOLD.common.eventEmitter.emit === 'function'){
        BOLD.common.eventEmitter.emit('BOLD_COMMON_cart_loaded');
      }
      
    });
 }
  }

  Shopify.decreaseQty = function(el){
    var inputEl = el.closest(".table-shopping-qty").find("input"),
        $itemRow = el.closest("tr"),
        qty = inputEl.val();
    qty--;
    if (qty < 0)
      qty = 0;

    var quantity = qty,
        id = inputEl.data("id");

    

    if(quantity != 0){
      inputEl.val(qty);
      Shopify.changeItem(id, quantity, function(cart){
        
        if(typeof window.BOLD !== 'undefined'
           && typeof window.BOLD.common !== 'undefined'
           && typeof window.BOLD.common.cartDoctor !== 'undefined') {
          // NOTE: "cart" should be the variable containing the cart json data
          cart = window.BOLD.common.cartDoctor.fix(cart);
        }
        
        Shopify.updateCart(cart);
        Shopify.updateQuickCart(cart);
        
        if (window.BOLD && BOLD.common && BOLD.common.eventEmitter &&
          typeof BOLD.common.eventEmitter.emit === 'function'){
        BOLD.common.eventEmitter.emit('BOLD_COMMON_cart_loaded');
      }
        
      });
    }
    else{
      Shopify.removeItem(id, function(cart){
        
        if(typeof window.BOLD !== 'undefined'
         && typeof window.BOLD.common !== 'undefined'
         && typeof window.BOLD.common.cartDoctor !== 'undefined') {
        // NOTE: "cart" should be the variable containing the cart json data
        cart = window.BOLD.common.cartDoctor.fix(cart);
      }
        
        $itemRow.fadeOut( "slow", function() {
          Shopify.updateCart(cart);
          Shopify.updateQuickCart(cart);
        });
      });
    }
  }
  Shopify.removeItemFromCart = function(el){
    var id = el.data('id') || null,
        $itemRow = el.closest("tr");

    Shopify.removeItem(id, function(cart){
      
      if(typeof window.BOLD !== 'undefined'
         && typeof window.BOLD.common !== 'undefined'
         && typeof window.BOLD.common.cartDoctor !== 'undefined') {
        // NOTE: "cart" should be the variable containing the cart json data
        cart = window.BOLD.common.cartDoctor.fix(cart);
      }
      
      $itemRow.fadeOut( "slow", function() {
        Shopify.updateCart(cart);
        Shopify.updateQuickCart(cart);
      });
    });
  }
});

var  bindEventsInModalCart = function(){
  var modalSelectors = {
    CART_PLUS_BTN: ".table-shopping-qty-plus",
    CART_MINUS_BTN: ".table-shopping-qty-minus",
    CART_INPUT_FIELD: ".cart__qty-input",
    CART_MENU: '.main-cart-form',
    CART_PAGE_MENU: '.modal-cart-form',
    TOTAL_ITEMS: '.count-items',
    TOTAL_ITEMS_PRICE: '.total-items-price',
    CART_REMOVE_BTN: '.cart-remove-btn',
    QUICK_CART_MENU:'.nav-dialog-inner-cart'
  };
  var modalForm = $(".nav-dialog-inner-cart");
  $additionCheckoutBlock = modalForm.find("#additional-checkout-block");
  $additionCheckoutBlock.load('/cart #addCheckoutBtn', function() {
    if (window.Shopify && Shopify.StorefrontExpressButtons) {
      Shopify.StorefrontExpressButtons.initialize();
    }
  });
   
  $(modalSelectors.QUICK_CART_MENU).on("change",modalSelectors.CART_INPUT_FIELD, function () {
   Shopify.changeInputQty($(this));
  });
  
  $(modalSelectors.QUICK_CART_MENU).on("click",modalSelectors.CART_PLUS_BTN, function () {
    Shopify.increaseQty($(this));
  })
  $(modalSelectors.QUICK_CART_MENU).on("click", modalSelectors.CART_MINUS_BTN, function () {
    Shopify.decreaseQty($(this));
  });
  $(modalSelectors.QUICK_CART_MENU).on("click",modalSelectors.CART_REMOVE_BTN, function(e){
    e.preventDefault();
    Shopify.removeItemFromCart($(this));
  });
  $(modalSelectors.QUICK_CART_MENU).on("click",".btn_close", function(){
    var magnificPopup = $.magnificPopup.instance;
    if(typeof magnificPopup !== 'undefined'){
      magnificPopup.close();
    }
  });

  $(modalSelectors.QUICK_CART_MENU).on("focusout","textarea", function(){
    var note = $(this).val(),
     textareas = $(".cart-notes");

    Shopify.updateCartNote(note, function(){
      $(textareas).each(function () {
        $(this).val(note);
        $(this).text(note);
      });
    });
  });

};
var  bindEventsInCart = function(){
  var cartSelectors = {
    CART_PLUS_BTN: ".table-shopping-qty-plus",
    CART_MINUS_BTN: ".table-shopping-qty-minus",
    CART_INPUT_FIELD: ".cart__qty-input",
    CART_CONTENT: ".cart-content",
    CART_REMOVE_BTN: '.cart-remove-btn'
  };
   
  $(cartSelectors.CART_CONTENT).on("change",cartSelectors.CART_INPUT_FIELD, function () {
   Shopify.changeInputQty($(this));
  });
  
  $(cartSelectors.CART_CONTENT).on("click",cartSelectors.CART_PLUS_BTN, function () {
    Shopify.increaseQty($(this));
  })
  $(cartSelectors.CART_CONTENT).on("click", cartSelectors.CART_MINUS_BTN, function () {
    Shopify.decreaseQty($(this));
  });
  $(cartSelectors.CART_CONTENT).on("click",cartSelectors.CART_REMOVE_BTN, function(e){
    e.preventDefault();
    Shopify.removeItemFromCart($(this));
  });
   $(cartSelectors.CART_CONTENT).on("click",".btn_close", function(){
    window.location.href = "/collections/all";
  });
   $(cartSelectors.CART_CONTENT).on("focusout","textarea", function(){
    var note = $(this).val(),
     textareas = $(".cart-notes");

    Shopify.updateCartNote(note, function(){
      $(textareas).each(function () {
        $(this).val(note);
        $(this).text(note);
      });
    });
  });
};

 theme.RelatedProductSection = (function() {
  function RelatedProductSection(container) {

    var $container = this.$container = $(container);
    var id = $container.attr('data-section-id');
    var productsPerRow = $container.attr('data-productsPerRow');
    var baseUrl = this.$container.data('baseUrl');
    
    
    
    var productRecommendationsSection = document.querySelector(".product-recommendations");
    if (productRecommendationsSection != null) {
      // Read product id from data attribute   
      var productId = productRecommendationsSection.dataset.productId;
      // Read limit from data attribute
      var limit = productRecommendationsSection.dataset.limit;
      // Build request URL
      var requestUrl = baseUrl+"?section_id=product-recommendations&limit="+limit+"&product_id="+productId;
      // Create request and submit it using Ajax
      var request = new XMLHttpRequest();
      request.open("GET", requestUrl);
      request.onload = function() {
        if (request.status >= 200 && request.status < 300) {

          var container = document.createElement("div");
          container.innerHTML = request.response;
          productRecommendationsSection.innerHTML = container.querySelector('.product-recommendations').innerHTML;

          var  relatedProductsCarousel = new Swiper ('.swiper-products-'+id, {
            // Optional parameters
            direction: 'horizontal',
            pagination: false,
            loop: false,
            slidesPerView: 2,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },
            breakpoints: {
              992: {
                slidesPerView: productsPerRow,
                loop: false
              },
              768: {
                slidesPerView: 3,
                loop: false
              }
            },
            autoplay: 3000
          });

          $container.find(".product-thumb-caption-title").on("click", function(){
            var product_url = $(this).closest(".product-thumb").find(".product-thumb-href").attr("href");
            window.location.href = product_url;
          });

            
        }else{
          $(".recommendation_content").hide();
        }
      };
      request.send();
}                          

  }

  return RelatedProductSection;
})();


  theme.init = function() {
    $('a[href="#"]').on('click', function(evt) {
      evt.preventDefault();
    });

    theme.customerTemplates.init();
  };

  $(theme.init);

    
theme.Helpers = (function() {
  var touchDevice = false;

  function setTouch() {
    touchDevice = true;
    $("body").addClass("body-touch-device");
  }

  function isTouch() {
    return touchDevice;
  }
  return {
    setTouch: setTouch,
    isTouch: isTouch
  };
})();

// Youtube API callback
// eslint-disable-next-line no-unused-vars
function onYouTubeIframeAPIReady() {
  theme.ProductVideo.loadVideos(theme.ProductVideo.hosts.youtube);
  theme.ProductVideo.youtubeApiLoaded = true;
}

theme.ProductVideo = (function() {
  var videos = {};

  var hosts = {
    html5: 'html5',
    youtube: 'youtube'
  };

  var selectors = {
    productMediaWrapper: '[data-product-single-media-wrapper]'
  };

  var attributes = {
    enableVideoLooping: 'enable-video-looping',
    videoId: 'video-id'
  };

  function init(videoContainer, sectionId) {
    if (!videoContainer.length) {
      return;
    }

    var videoElement = videoContainer.find('iframe, video')[0];
    var mediaId = videoContainer.data('mediaId');

    if (!videoElement) {
      return;
    }

    videos[mediaId] = {
      mediaId: mediaId,
      sectionId: sectionId,
      host: hostFromVideoElement(videoElement),
      container: videoContainer,
      element: videoElement,
      ready: function() {
        createPlayer(this);
      }
    };

    var video = videos[mediaId];

    switch (video.host) {
      case hosts.html5:
        window.Shopify.loadFeatures([
          {
            name: 'video-ui',
            version: '1.0',
            onLoad: setupPlyrVideos
          }
        ]);
        theme.LibraryLoader.load('plyrShopifyStyles');
        break;
      case hosts.youtube:
        if(!$("#youtube-sdk").length){
          theme.LibraryLoader.load('youtubeSdk');
        }
        break;
    }
  }

  function setupPlyrVideos(errors) {
    if (errors) {
      fallbackToNativeVideo();
      return;
    }

    loadVideos(hosts.html5);
  }

  function createPlayer(video) {
    if (video.player) {
      return;
    }

    var productMediaWrapper = video.container.closest(
      selectors.productMediaWrapper
    );
    var enableLooping = productMediaWrapper.data(attributes.enableVideoLooping);

    switch (video.host) {
      case hosts.html5:
        // eslint-disable-next-line no-undef
        video.player = new Shopify.Plyr(video.element, {
          loop: { active: enableLooping }
        });
        break;
      case hosts.youtube:
        var videoId = productMediaWrapper.data(attributes.videoId);

        video.player = new YT.Player(video.element, {
          videoId: videoId,
          events: {
            onStateChange: function(event) {
              if (event.data === 0 && enableLooping) event.target.seekTo(0);
            }
          }
        });
        break;
    }

    productMediaWrapper.on('mediaHidden xrLaunch', function() {
      if (!video.player) return;

      if (video.host === hosts.html5) {
        video.player.pause();
      }

      if (video.host === hosts.youtube && video.player.pauseVideo) {
        video.player.pauseVideo();
      }
    });

    productMediaWrapper.on('mediaVisible', function() {
      if (theme.Helpers.isTouch()) return;
      console.log(video);
      if (!video.player) return;

      if (video.host === hosts.html5) {
        video.player.play();
      }

      if (video.host === hosts.youtube && video.player.playVideo) {
        video.player.playVideo();
      }
    });
  }

  function hostFromVideoElement(video) {
    if (video.tagName === 'VIDEO') {
      return hosts.html5;
    }

    if (video.tagName === 'IFRAME') {
      if (
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(
          video.src
        )
      ) {
        return hosts.youtube;
      }
    }
    return null;
  }

  function loadVideos(host) {
    for (var key in videos) {
      if (videos.hasOwnProperty(key)) {
        var video = videos[key];
        if (video.host === host) {
          video.ready();
        }
      }
    }
  }

  function fallbackToNativeVideo() {
    for (var key in videos) {
      if (videos.hasOwnProperty(key)) {
        var video = videos[key];

        if (video.nativeVideo) continue;

        if (video.host === hosts.html5) {
          video.element.setAttribute('controls', 'controls');
          video.nativeVideo = true;
        }
      }
    }
  }

  function removeSectionVideos(sectionId) {
    for (var key in videos) {
      if (videos.hasOwnProperty(key)) {
        var video = videos[key];

        if (video.sectionId === sectionId) {
          if (video.player) video.player.destroy();
          delete videos[key];
        }
      }
    }
  }

  return {
    init: init,
    hosts: hosts,
    loadVideos: loadVideos,
    removeSectionVideos: removeSectionVideos
  };
})();

theme.ProductModel = (function() {
  var modelJsonSections = {};
  var models = {};
  var xrButtons = {};

  var selectors = {
    mediaGroup: '[data-product-single-media-group]',
    xrButton: '[data-shopify-xr]'
  };

  function init(modelViewerContainers, sectionId) {
    modelJsonSections[sectionId] = {
      loaded: false
    };

    modelViewerContainers.each(function(index) {
      var $modelViewerContainer = $(this);
      var mediaId = $modelViewerContainer.data('media-id');
      var $modelViewerElement = $(
        $modelViewerContainer.find('model-viewer')[0]
      );
      var modelId = $modelViewerElement.data('model-id');

      if (index === 0) {
        var $xrButton = $modelViewerContainer
          .closest(selectors.mediaGroup)
          .find(selectors.xrButton);
        xrButtons[sectionId] = {
          $element: $xrButton,
          defaultId: modelId
        };
      }

      models[mediaId] = {
        modelId: modelId,
        sectionId: sectionId,
        $container: $modelViewerContainer,
        $element: $modelViewerElement
      };
    });

    window.Shopify.loadFeatures([
      {
        name: 'shopify-xr',
        version: '1.0',
        onLoad: setupShopifyXr
      },
      {
        name: 'model-viewer-ui',
        version: '1.0',
        onLoad: setupModelViewerUi
      }
    ]);
    theme.LibraryLoader.load('modelViewerUiStyles');
  }

  function setupShopifyXr(errors) {
    if (errors) return;

    if (!window.ShopifyXR) {
      document.addEventListener('shopify_xr_initialized', function() {
        setupShopifyXr();
      });
      return;
    }

    for (var sectionId in modelJsonSections) {
      if (modelJsonSections.hasOwnProperty(sectionId)) {
        var modelSection = modelJsonSections[sectionId];

        if (modelSection.loaded) continue;
        
        var $modelJson = $('#ModelJson-' + sectionId);

        window.ShopifyXR.addModels(JSON.parse($modelJson.html()));
        modelSection.loaded = true;
      }
    }
    window.ShopifyXR.setupXRElements();
  }

  function setupModelViewerUi(errors) {
    if (errors) return;

    for (var key in models) {
      if (models.hasOwnProperty(key)) {
        var model = models[key];
        if (!model.modelViewerUi) {
          model.modelViewerUi = new Shopify.ModelViewerUI(model.$element);
        }
        setupModelViewerListeners(model);
      }
    }    
  }

  function setupModelViewerListeners(model) {
    var xrButton = xrButtons[model.sectionId];

    model.$container.on('mediaVisible', function() {
      xrButton.$element.attr('data-shopify-model3d-id', model.modelId);
      if (theme.Helpers.isTouch()) return;      
        model.modelViewerUi.play();	
    });

    model.$container
      .on('mediaHidden', function() {
        xrButton.$element.attr('data-shopify-model3d-id', xrButton.defaultId);
        model.modelViewerUi.pause();
      })
      .on('xrLaunch', function() {
        model.modelViewerUi.pause();
      });
    
    $(model.modelViewerUi.viewer).on('shopify_model_viewer_ui_toggle_play', function() {
      var swiper_instance = $(model.modelViewerUi.viewer).closest('.main-swiper-container')[0].swiper;
      swiper_instance.allowTouchMove = false;      
    });
     $(model.modelViewerUi.viewer).on('shopify_model_viewer_ui_toggle_pause', function() {
      var swiper_instance = $(model.modelViewerUi.viewer).closest('.main-swiper-container')[0].swiper;
      swiper_instance.allowTouchMove = true;       
    });
    
  }

  function removeSectionModels(sectionId) {
    for (var key in models) {
      if (models.hasOwnProperty(key)) {
        var model = models[key];
        if (model.sectionId === sectionId) {
          models[key].modelViewerUi.destroy();
          delete models[key];
        }
      }
    }
    delete modelJsonSections[sectionId];
  }

  return {
    init: init,
    removeSectionModels: removeSectionModels
  };
})();
    
  theme.Disclosure = (function() {
  var selectors = {
    disclosureList: '[data-disclosure-list]',
    disclosureToggle: '[data-disclosure-toggle]',
    disclosureInput: '[data-disclosure-input]',
    disclosureOptions: '[data-disclosure-option]'
  };

  var classes = {
    listVisible: 'disclosure-list--visible'
  };

  function Disclosure($disclosure) {
    this.$container = $disclosure;
    this.cache = {};
    this._cacheSelectors();
    this._connectOptions();
    this._connectToggle();
    this._onFocusOut();
  }

  Disclosure.prototype = _.assignIn({}, Disclosure.prototype, {
    _cacheSelectors: function() {
      this.cache = {
        $disclosureList: this.$container.find(selectors.disclosureList),
        $disclosureToggle: this.$container.find(selectors.disclosureToggle),
        $disclosureInput: this.$container.find(selectors.disclosureInput),
        $disclosureOptions: this.$container.find(selectors.disclosureOptions)
      };
    },

    _connectToggle: function() {
      this.cache.$disclosureToggle.on(
        'click',
        function(evt) {
          var ariaExpanded =
            $(evt.currentTarget).attr('aria-expanded') === 'true';
          $(evt.currentTarget).attr('aria-expanded', !ariaExpanded);

          this.cache.$disclosureList.toggleClass(classes.listVisible);
        }.bind(this)
      );
    },

    _connectOptions: function() {
      this.cache.$disclosureOptions.on(
        'click',
        function(evt) {
          this._submitForm($(evt.currentTarget).data('value'));
        }.bind(this)
      );
    },

    _onFocusOut: function() {
      this.cache.$disclosureToggle.on(
        'focusout',
        function(evt) {
          var disclosureLostFocus =
            this.$container.has(evt.relatedTarget).length === 0;

          if (disclosureLostFocus) {
            this._hideList();
          }
        }.bind(this)
      );

      this.cache.$disclosureList.on(
        'focusout',
        function(evt) {
          var childInFocus =
            $(evt.currentTarget).has(evt.relatedTarget).length > 0;
          var isVisible = this.cache.$disclosureList.hasClass(
            classes.listVisible
          );

          if (isVisible && !childInFocus) {
            this._hideList();
          }
        }.bind(this)
      );

      this.$container.on(
        'keyup',
        function(evt) {
          if (evt.which !== "27") return;
          this._hideList();
          this.cache.$disclosureToggle.focus();
        }.bind(this)
      );
      
      this.bodyOnClick = function(evt) {
        var isOption = this.$container.has(evt.target).length > 0;
        var isVisible = this.cache.$disclosureList.hasClass(
          classes.listVisible
        );

        if (isVisible && !isOption) {
          this._hideList();
        }
      }.bind(this);

      $('body').on('click', this.bodyOnClick);
    },

    _submitForm: function(value) {
      this.cache.$disclosureInput.val(value);
      this.$container.parents('form').submit();
    },

    _hideList: function() {
      this.cache.$disclosureList.removeClass(classes.listVisible);
      this.cache.$disclosureToggle.attr('aria-expanded', false);
    },

    unload: function() {
      $('body').off('click', this.bodyOnClick);
      this.cache.$disclosureOptions.off();
      this.cache.$disclosureToggle.off();
      this.cache.$disclosureList.off();
      this.$container.off();
    }
  });

  return Disclosure;
})();
    
     // Put this code in the bottom
var Shopify = Shopify || {};
Shopify.optionsMapQV = Shopify.optionsMapQV || {};
// Required functionality from depricated options_selection.js
Shopify.arrayIncludes = function(e, t) {
  for (var n = 0; n < e.length; n++)
      if (e[n] == t) return !0;
  return !1
}, Shopify.uniq = function(e) {
    for (var t = [], n = 0; n < e.length; n++) Shopify.arrayIncludes(t, e[n]) || t.push(e[n]);
    return t
};
Shopify.updateOptionsInSelectorQV = function(selectorIndex,qvpId,productId) {
    
  switch (selectorIndex) {
    case 0:
      var key = 'root';
      var selector = jQuery('.'+qvpId+' .single-option-selector:eq(0)');
      break;
    case 1:
      var key = jQuery('.'+qvpId+' .single-option-selector:eq(0)').val();
      var selector = jQuery('.'+qvpId+' .single-option-selector:eq(1)');
      break;
    case 2:
      var key = jQuery('.'+qvpId+' .single-option-selector:eq(0)').val();  
      key += ' / ' + jQuery('.'+qvpId+' .single-option-selector:eq(1)').val();
      var selector = jQuery('.'+qvpId+' .single-option-selector:eq(2)');
  }
  
  var initialValue = selector.val();
  selector.empty();    
  var availableOptions = Shopify.optionsMapQV[productId][key];
  for (var i=0; i<availableOptions.length; i++) {
    var option = availableOptions[i];
    var newOption = jQuery('<option></option>').val(option).html(option);
    selector.append(newOption);
  }
  
  jQuery('.'+qvpId+' .swatch[data-option-index="' + selectorIndex + '"] .swatch-element').each(function() {
    if (jQuery.inArray($(this).attr('data-value'), availableOptions) !== -1) {
      $(this).removeClass('soldout').show().find(':radio').removeAttr('disabled','disabled').removeAttr('checked');
    }
    else {
      $(this).addClass('soldout').hide().find(':radio').removeAttr('checked').attr('disabled','disabled');
    }
  });
  if (jQuery.inArray(initialValue, availableOptions) !== -1) {
    selector.val(initialValue);
  }
  selector.trigger('change');
  
};
Shopify.linkOptionSelectorsQV = function(qvpId, product) {
  // Building our mapping object.
  for (var i=0; i<product.variants.length; i++) {
    var variant = product.variants[i];
    if (variant.available) {
      // Gathering values for the 1st drop-down.
      Shopify.optionsMapQV[product.id]['root'] = Shopify.optionsMapQV[product.id]['root'] || [];
      Shopify.optionsMapQV[product.id]['root'].push(variant.option1);
      Shopify.optionsMapQV[product.id]['root'] = Shopify.uniq(Shopify.optionsMapQV[product.id]['root']);
      // Gathering values for the 2nd drop-down.
      if (product.options.length > 1) {
        var key = variant.option1;
        Shopify.optionsMapQV[product.id][key] = Shopify.optionsMapQV[product.id][key] || [];
        Shopify.optionsMapQV[product.id][key].push(variant.option2);
        Shopify.optionsMapQV[product.id][key] = Shopify.uniq(Shopify.optionsMapQV[product.id][key]);
      }
      // Gathering values for the 3rd drop-down.
      if (product.options.length === 3) {
        var key = variant.option1 + ' / ' + variant.option2;
        Shopify.optionsMapQV[product.id][key] = Shopify.optionsMapQV[product.id][key] || [];
        Shopify.optionsMapQV[product.id][key].push(variant.option3);
        Shopify.optionsMapQV[product.id][key] = Shopify.uniq(Shopify.optionsMapQV[product.id][key]);
      }
    }
  }
  // Update options right away.
  Shopify.updateOptionsInSelectorQV(0,qvpId,product.id);
  if (product.options.length > 1) Shopify.updateOptionsInSelectorQV(1,qvpId,product.id);
  if (product.options.length === 3) Shopify.updateOptionsInSelectorQV(2,qvpId,product.id);
  // When there is an update in the first dropdown.
  jQuery("."+qvpId+" .single-option-selector:eq(0)").change(function() {
    Shopify.updateOptionsInSelectorQV(1,qvpId,product.id);
    if (product.options.length === 3) Shopify.updateOptionsInSelectorQV(2,qvpId,product.id);
    return true;
  });
  // When there is an update in the second dropdown.
  jQuery("."+qvpId+" .single-option-selector:eq(1)").change(function() {
    if (product.options.length === 3) Shopify.updateOptionsInSelectorQV(2,qvpId,product.id);
    return true;
  });  
};
    
    
    
  $(document).ready(function() {
    var sections = new theme.Sections();

    sections.register('cart-template', theme.Cart);
    sections.register('product-page', theme.ProductPage);
    sections.register('collection-template', theme.CollectionPage);
    sections.register('header-section', theme.HeaderSection);
    sections.register('popup-section', theme.PopupSection);
    sections.register('map', theme.Maps);
    sections.register('slideshow-section', theme.SlideshowSection);
    sections.register('columns-slider-section', theme.ColumnsSliderSection);
    sections.register('fetured-collection-section', theme.FeturedCollectionSection);
    sections.register('search-section', theme.SearchSection);
    sections.register('collections-list-section', theme.CollectionsListSection);
    sections.register('featured-collections-section', theme.FeaturedCollectionsSection);
    sections.register('twitter-section', theme.TwitterSection);
    sections.register('image-bar-section', theme.ImageBarSection);
    sections.register('logo-section', theme.LogoSection);
    sections.register('quotes-section', theme.Quotes);
    sections.register('rich-text-section', theme.RichTextSection);
    sections.register('video-section', theme.VideoSection);
    sections.register('blog-posts-section', theme.BlogPostsSection);
    sections.register('blog-page-section', theme.BlogPageSection);
    sections.register('article-page-section', theme.ArticlePageSection);
    sections.register('footer-section', theme.FooterSection);
    sections.register('password-section', theme.PasswordSection);
    sections.register('related-products', theme.RelatedProductSection);
    sections.register('newsletter-section', theme.NewsletterSection);



    $(document)
     .on('shopify:section:select', function(e) {
        var $target = $(e.target),
          sectionID = e.originalEvent.detail.sectionId,
          $handle = $('#shopify-section-handle-' + sectionID),
          handle_class = $handle.length ? $handle.attr('data-bg-type') : null;

        if(handle_class) {
          $target.addClass(handle_class);
        }
     });
  });

   var SPRCallbacks = {};
    SPRCallbacks.onReviewsLoad = function(){
      $.fn.matchHeight._update();
    }
    
 $(document).one('touchstart', function() {
    theme.Helpers.setTouch();
  });
    
   
  
  
 