(function(window){

  /*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
// var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s){
    return binl2hex(core_md5(str2binl(s), s.length * chrsz));
}
// function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
// function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
// function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
// function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
// function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
    /* append padding */
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    var a =  1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d =  271733878;

    for(var i = 0; i < x.length; i += 16)
    {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;

        a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
        d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
        b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
        d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
        c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
        d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
        d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

        a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
        d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
        c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
        b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
        d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
        c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
        d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
        c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
        a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
        d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
        c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
        b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

        a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
        d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
        b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
        d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
        c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
        d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
        a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
        d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
        b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

        a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
        d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
        c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
        d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
        d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
        a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
        d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
        b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
    }
    return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
// function core_hmac_md5(key, data)
// {
//     var bkey = str2binl(key);
//     if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);
//
//     var ipad = Array(16), opad = Array(16);
//     for(var i = 0; i < 16; i++)
//     {
//         ipad[i] = bkey[i] ^ 0x36363636;
//         opad[i] = bkey[i] ^ 0x5C5C5C5C;
//     }
//
//     var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
//     return core_md5(opad.concat(hash), 512 + 128);
// }

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
    return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str)
{
    if (str==null || str==undefined || str==""){
        return "";
    }
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for(var i = 0; i < str.length * chrsz; i += chrsz)
        bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
    return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
// function binl2str(bin)
// {
//     var str = "";
//     var mask = (1 << chrsz) - 1;
//     for(var i = 0; i < bin.length * 32; i += chrsz)
//         str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
//     return str;
// }

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for(var i = 0; i < binarray.length * 4; i++)
    {
        str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
        hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
    }
    return str;
}

  var _data = "";
  var _userAgent = "$!{userAgent}";
  var _language = "$!{language}";
  // var _origin = "$!{origin}";
  var _browser = "$!{browser}";
  var _browserVersion = "$!{browserVersion}";
  var _os = "$!{os}";
  var _osVersion = "$!{osVersion}";
  // var DEBUG = false;
  var fingerprint = function(options) {
    var defaultOptions = {


    };
    this.options = this.extend(options, defaultOptions);
    this.nativeForEach = Array.prototype.forEach;
    this.nativeMap = Array.prototype.map;
  };
  fingerprint.prototype = {
    extend: function(source, target) {
      if (!source) {
        return target;
      }
      for (var k in source) {
        if (source[k] !== null && target[k] !== source[k]) {
          target[k] = source[k];
        }
      }
      return target;
    },
    log: function(msg) {
      if (window.console) {
        console.log(msg);
      }
    },

    getData: function() {
      return _data;
    },
    get: function() {
      var browserVersion = _browserVersion * 1;
      var keys = [];
      if (_browser == "ie" && browserVersion >= 7) {
        keys.push(_userAgent);
        keys.push(_language);
        _data = _data + ",userAgent:" + hex_md5(_userAgent) + ",language:" + _language;
        this.browserRedirect(_userAgent);
      } else {
        keys = this.userAgentKey(keys);
        keys = this.languageKey(keys);
      }
      keys.push(_browser);
      keys.push(_browserVersion);
      keys.push(_os);
      keys.push(_osVersion);
      _data = _data + ",os:" + _os + ",osVersion:" + _osVersion + ",browser:" + _browser + ",browserVersion:" + _browserVersion;
      try {
        keys = this.colorDepthKey(keys);
        keys = this.screenResolutionKey(keys);
        keys = this.timezoneOffsetKey(keys);
        keys = this.sessionStorageKey(keys);
        keys = this.localStorageKey(keys);
        keys = this.indexedDbKey(keys);
        keys = this.addBehaviorKey(keys);
        keys = this.openDatabaseKey(keys);
        keys = this.cpuClassKey(keys);
        keys = this.platformKey(keys);
        keys = this.doNotTrackKey(keys);
        keys = this.pluginsKey(keys);
        keys = this.canvasKey(keys);
        // keys = this.webglKey(keys);
      } catch (e) {

      } finally {

      }

      // keys.push(Date.now());
      // keys.push(Math.random());
      var murmur = this.x64hash128(keys.join("~~~"), 31);
      // return done(murmur);
      return murmur;
      /*var that = this;
      this.fontsKey(keys, function(newKeys){
      var murmur = that.x64hash128(newKeys.join("~~~"), 31);
      return done(murmur);
      });*/
    },

    userAgentKey: function(keys) {
      if (!this.options.excludeUserAgent) {
        keys.push(navigator.userAgent);
        _data = _data + ",userAgent:" + hex_md5(navigator.userAgent);
        this.browserRedirect(navigator.userAgent);
      }
      return keys;
    },


    replaceAll: function(str, sptr, sptr1) {
      while (str.indexOf(sptr) >= 0) {
        str = str.replace(sptr, sptr1);
      }
      return str;
    },

    browserRedirect: function(userAgent) {
      var sUserAgent = userAgent.toLowerCase();
      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      var bIsMidp = sUserAgent.match(/midp/i) == "midp";
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      var bIsAndroid = sUserAgent.match(/android/i) == "android";
      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
      if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        _data = _data + ",origin:mobile";
      } else {
        _data = _data + ",origin:pc";
      }
    },
    languageKey: function(keys) {
      if (!this.options.excludeLanguage) {
        keys.push(navigator.language);
        _data = _data + ",language:" + this.replaceAll(navigator.language, " ", "_");
      }
      return keys;
    },
    colorDepthKey: function(keys) {
      if (!this.options.excludeColorDepth) {
        keys.push(screen.colorDepth);
        _data = _data + ",colorDepth:" + screen.colorDepth;
      }
      return keys;
    },
    screenResolutionKey: function(keys) {
      if (!this.options.excludeScreenResolution) {
        var resolution = this.getScreenResolution();
        if (typeof resolution !== "undefined") { // headless browsers, such as phantomjs
          keys.push(resolution.join("x"));
          _data = _data + ",screenResolution:" + resolution.join("x");
        }
      }
      return keys;
    },
    getScreenResolution: function() {
      var resolution;
      if (this.options.detectScreenOrientation) {
        resolution = (screen.height > screen.width) ? [screen.height, screen.width] : [screen.width, screen.height];
      } else {
        resolution = [screen.height, screen.width];
      }
      return resolution;
    },
    timezoneOffsetKey: function(keys) {
      if (!this.options.excludeTimezoneOffset) {
        keys.push(new Date().getTimezoneOffset());
        _data = _data + ",timezoneOffset:" + new Date().getTimezoneOffset() / 60;
      }
      return keys;
    },
    sessionStorageKey: function(keys) {
      if (!this.options.excludeSessionStorage && this.hasSessionStorage()) {
        keys.push("sessionStorageKey");
        _data = _data + ",sessionStorage:true";
      }
      return keys;
    },
    localStorageKey: function(keys) {
      if (!this.options.excludeSessionStorage && this.hasLocalStorage()) {
        keys.push("localStorageKey");
        _data = _data + ",localStorage:true";
      }
      return keys;
    },
    indexedDbKey: function(keys) {
      if (!this.options.excludeIndexedDB && this.hasIndexedDB()) {
        keys.push("indexedDbKey");
        _data = _data + ",indexedDb:true";
      }
      return keys;
    },
    addBehaviorKey: function(keys) {
      //body might not be defined at this point or removed programmatically
      if (document.body && !this.options.excludeAddBehavior && document.body.addBehavior) {
        keys.push("addBehaviorKey");
        _data = _data + ",addBehavior:true";
      } else {
        _data = _data + ",addBehavior:false";
      }
      return keys;
    },
    openDatabaseKey: function(keys) {
      if (!this.options.excludeOpenDatabase && window.openDatabase) {
        keys.push("openDatabase");
        _data = _data + ",openDatabase:true";
      } else {
        _data = _data + ",openDatabase:false";
      }
      return keys;
    },
    cpuClassKey: function(keys) {
      if (!this.options.excludeCpuClass) {
        keys.push(this.getNavigatorCpuClass());
        _data = _data + ",cpu:" + this.getNavigatorCpuClass();
      }
      return keys;
    },
    platformKey: function(keys) {
      if (!this.options.excludePlatform) {
        keys.push(this.getNavigatorPlatform());
        _data = _data + ",platform:" + this.getNavigatorPlatform();
      }
      return keys;
    },
    doNotTrackKey: function(keys) {
      if (!this.options.excludeDoNotTrack) {
        keys.push(this.getDoNotTrack());
        _data = _data + ",track:" + this.getDoNotTrack();
      }
      return keys;
    },
    canvasKey: function(keys) {
      if (!this.options.excludeCanvas && this.isCanvasSupported()) {
        keys.push(this.getCanvasFp());
        _data = _data + ",canvas:" + hex_md5(this.getCanvasFp());
      }
      return keys;
    },
    // webglKey: function(keys) {
    //   if (!this.options.excludeWebGL && this.isCanvasSupported()) {
    //     keys.push(this.getWebglFp());
    //     _data = _data + ",webglFp:" + hex_md5(this.getWebglFp());
    //   }
    //   return keys;
    // },
    // kudos to http://www.lalit.org/lab/javascript-css-font-detect/
    pluginsKey: function(keys) {
      if (this.isIE()) {
        keys.push(this.getIEPluginsString());
        _data = _data + ",plugins:" + hex_md5(this.getIEPluginsString());
      } else {
        keys.push(this.getRegularPluginsString());
        _data = _data + ",plugins:" + hex_md5(this.getRegularPluginsString());
      }
      return keys;
    },
    getRegularPluginsString: function() {
      return this.map(navigator.plugins, function(p) {
        var mimeTypes = this.map(p, function(mt) {
          return [mt.type, mt.suffixes].join("~");
        }).join(",");
        return [p.name, p.description, mimeTypes].join("::");
      }, this).join(";");
    },
    getIEPluginsString: function() {
      if (window.ActiveXObject) {
        var names = [
          "AcroPDF.PDF", // Adobe PDF reader 7+
          "Adodb.Stream",
          "AgControl.AgControl", // Silverlight
          "DevalVRXCtrl.DevalVRXCtrl.1",
          "MacromediaFlashPaper.MacromediaFlashPaper",
          "Msxml2.DOMDocument",
          "Msxml2.XMLHTTP",
          "PDF.PdfCtrl", // Adobe PDF reader 6 and earlier, brrr
          "QuickTime.QuickTime", // QuickTime
          "QuickTimeCheckObject.QuickTimeCheck.1",
          "RealPlayer",
          "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)",
          "RealVideo.RealVideo(tm) ActiveX Control (32-bit)",
          "Scripting.Dictionary",
          "SWCtl.SWCtl", // ShockWave player
          "Shell.UIHelper",
          "ShockwaveFlash.ShockwaveFlash", //flash plugin
          "Skype.Detection",
          "TDCCtl.TDCCtl",
          "WMPlayer.OCX", // Windows media player
          "rmocx.RealPlayer G2 Control",
          "rmocx.RealPlayer G2 Control.1"
        ];
        // starting to detect plugins in IE
        return this.map(names, function(name) {
          try {
            new ActiveXObject(name);
            return name;
          } catch (e) {
            return null;
          }
        }).join(";");
      } else {
        return "";
      }
    },
    hasSessionStorage: function() {
      try {
        return !!window.sessionStorage;
      } catch (e) {
        return true; // SecurityError when referencing it means it exists
      }
    },
    // https://bugzilla.mozilla.org/show_bug.cgi?id=781447
    hasLocalStorage: function() {
      try {
        return !!window.localStorage;
      } catch (e) {
        return true; // SecurityError when referencing it means it exists
      }
    },
    hasIndexedDB: function() {
      return !!window.indexedDB;
    },
    getNavigatorCpuClass: function() {
      if (navigator.cpuClass) {
        return navigator.cpuClass;
      } else {
        return "unknown";
      }
    },
    getNavigatorPlatform: function() {
      if (navigator.platform) {
        return navigator.platform;
      } else {
        return "unknown";
      }
    },
    getDoNotTrack: function() {
      if (navigator.doNotTrack) {
        return navigator.doNotTrack;
      } else {
        return "unknown";
      }
    },
    getCanvasFp: function() {
      // Very simple now, need to make it more complex (geo shapes etc)
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      // https://www.browserleaks.com/canvas#how-does-it-work
      var txt = "Cwm fjordbank glyphs vext quiz, https://github.com/valve ?";
      ctx.textBaseline = "top";
      ctx.font = "70px 'Arial'";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#f60";
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = "#069";
      ctx.fillText(txt, 2, 15);
      ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
      ctx.fillText(txt, 4, 17);
      return canvas.toDataURL();
    },

    // getWebglFp: function() {
    //   var gl;
    //   var fa2s = function(fa) {
    //     gl.clearColor(0.0, 0.0, 0.0, 1.0);
    //     gl.enable(gl.DEPTH_TEST);
    //     gl.depthFunc(gl.LEQUAL);
    //     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //     return "[" + fa[0] + ", " + fa[1] + "]";
    //   };
    //   var maxAnisotropy = function(gl) {
    //     var anisotropy, ext = gl.getExtension("EXT_texture_filter_anisotropic") || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
    //     return ext ? (anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT), 0 === anisotropy && (anisotropy = 2), anisotropy) : null;
    //   };
    //   gl = this.getWebglCanvas();
    //   if (!gl) {
    //     return null;
    //   }
    //   // WebGL fingerprinting is a combination of techniques, found in MaxMind antifraud script & Augur fingerprinting.
    //   // First it draws a gradient object with shaders and convers the image to the Base64 string.
    //   // Then it enumerates all WebGL extensions & capabilities and appends them to the Base64 string, resulting in a huge WebGL string, potentially very unique on each device
    //   // Since iOS supports webgl starting from version 8.1 and 8.1 runs on several graphics chips, the results may be different across ios devices, but we need to verify it.
    //   var result = [];
    //   var vShaderTemplate = "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}";
    //   var fShaderTemplate = "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}";
    //   var vertexPosBuffer = gl.createBuffer();
    //   gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
    //   var vertices = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
    //   gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    //   vertexPosBuffer.itemSize = 3;
    //   vertexPosBuffer.numItems = 3;
    //   var program = gl.createProgram(),
    //     vshader = gl.createShader(gl.VERTEX_SHADER);
    //   gl.shaderSource(vshader, vShaderTemplate);
    //   gl.compileShader(vshader);
    //   var fshader = gl.createShader(gl.FRAGMENT_SHADER);
    //   gl.shaderSource(fshader, fShaderTemplate);
    //   gl.compileShader(fshader);
    //   gl.attachShader(program, vshader);
    //   gl.attachShader(program, fshader);
    //   gl.linkProgram(program);
    //   gl.useProgram(program);
    //   program.vertexPosAttrib = gl.getAttribLocation(program, "attrVertex");
    //   program.offsetUniform = gl.getUniformLocation(program, "uniformOffset");
    //   gl.enableVertexAttribArray(program.vertexPosArray);
    //   gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, !1, 0, 0);
    //   gl.uniform2f(program.offsetUniform, 1, 1);
    //   gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems);
    //   if (gl.canvas != null) result.push(gl.canvas.toDataURL());
    //   result.push("extensions:" + gl.getSupportedExtensions().join(";"));
    //   result.push("webgl aliased line width range:" + fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)));
    //   result.push("webgl aliased point size range:" + fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)));
    //   result.push("webgl alpha bits:" + gl.getParameter(gl.ALPHA_BITS));
    //   result.push("webgl antialiasing:" + (gl.getContextAttributes().antialias ? "yes" : "no"));
    //   result.push("webgl blue bits:" + gl.getParameter(gl.BLUE_BITS));
    //   result.push("webgl depth bits:" + gl.getParameter(gl.DEPTH_BITS));
    //   result.push("webgl green bits:" + gl.getParameter(gl.GREEN_BITS));
    //   result.push("webgl max anisotropy:" + maxAnisotropy(gl));
    //   result.push("webgl max combined texture image units:" + gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
    //   result.push("webgl max cube map texture size:" + gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE));
    //   result.push("webgl max fragment uniform vectors:" + gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS));
    //   result.push("webgl max render buffer size:" + gl.getParameter(gl.MAX_RENDERBUFFER_SIZE));
    //   result.push("webgl max texture image units:" + gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
    //   result.push("webgl max texture size:" + gl.getParameter(gl.MAX_TEXTURE_SIZE));
    //   result.push("webgl max varying vectors:" + gl.getParameter(gl.MAX_VARYING_VECTORS));
    //   result.push("webgl max vertex attribs:" + gl.getParameter(gl.MAX_VERTEX_ATTRIBS));
    //   result.push("webgl max vertex texture image units:" + gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
    //   result.push("webgl max vertex uniform vectors:" + gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS));
    //   result.push("webgl max viewport dims:" + fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS)));
    //   result.push("webgl red bits:" + gl.getParameter(gl.RED_BITS));
    //   result.push("webgl renderer:" + gl.getParameter(gl.RENDERER));
    //   result.push("webgl shading language version:" + gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
    //   result.push("webgl stencil bits:" + gl.getParameter(gl.STENCIL_BITS));
    //   result.push("webgl vendor:" + gl.getParameter(gl.VENDOR));
    //   result.push("webgl version:" + gl.getParameter(gl.VERSION));
    //   //TODO: implement vertex shader & fragment shader precision
    //   return result.join("§");
    // },
    isCanvasSupported: function() {
      var elem = document.createElement("canvas");
      return !!(elem.getContext && elem.getContext("2d"));
    },
    isIE: function() {
      if (navigator.appName === "Microsoft Internet Explorer") {
        return true;
      } else if (navigator.appName === "Netscape" && /Trident/.test(navigator.userAgent)) { // IE 11
        return true;
      }
      return false;
    },
    hasSwfObjectLoaded: function() {
      return typeof window.swfobject !== "undefined";
    },
    hasMinFlashInstalled: function() {
      return swfobject.hasFlashPlayerVersion("9.0.0");
    },
    addFlashDivNode: function() {
      var node = document.createElement("div");
      node.setAttribute("id", this.options.swfContainerId);
      document.body.appendChild(node);
    },
    loadSwfAndDetectFonts: function(done) {
      var hiddenCallback = "___fp_swf_loaded";
      window[hiddenCallback] = function(fonts) {
        done(fonts);
      };
      var id = this.options.swfContainerId;
      this.addFlashDivNode();
      var flashvars = {
        onReady: hiddenCallback
      };
      var flashparams = {
        allowScriptAccess: "always",
        menu: "false"
      };
      swfobject.embedSWF(this.options.swfPath, id, "1", "1", "9.0.0", false, flashvars, flashparams, {});
    },
    // getWebglCanvas: function() {
    //   var canvas = document.createElement("canvas");
    //   var gl = null;
    //   try {
    //     gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    //   } catch (e) {}
    //   if (!gl) {
    //     gl = null;
    //   }
    //   return gl;
    // },
    // each: function(obj, iterator, context) {
    //   if (obj === null) {
    //     return;
    //   }
    //   if (this.nativeForEach && obj.forEach === this.nativeForEach) {
    //     obj.forEach(iterator, context);
    //   } else if (obj.length === +obj.length) {
    //     for (var i = 0, l = obj.length; i < l; i++) {
    //       if (iterator.call(context, obj[i], i, obj) === {}) {
    //         return;
    //       }
    //     }
    //   } else {
    //     for (var key in obj) {
    //       if (obj.hasOwnProperty(key)) {
    //         if (iterator.call(context, obj[key], key, obj) === {}) {
    //           return;
    //         }
    //       }
    //     }
    //   }
    // },

    map: function(obj, iterator, context) {
      var results = [];
      // Not using strict equality so that this acts as a
      // shortcut to checking for `null` and `undefined`.
      if (obj == null) {
        return results;
      }
      if (this.nativeMap && obj.map === this.nativeMap) {
        return obj.map(iterator, context);
      }
      this.each(obj, function(value, index, list) {
        results[results.length] = iterator.call(context, value, index, list);
      });
      return results;
    },

    /// MurmurHash3 related functions

    //
    // Given two 64bit ints (as an array of two 32bit ints) returns the two
    // added together as a 64bit int (as an array of two 32bit ints).
    //
    x64Add: function(m, n) {
      m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
      n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
      var o = [0, 0, 0, 0];
      o[3] += m[3] + n[3];
      o[2] += o[3] >>> 16;
      o[3] &= 0xffff;
      o[2] += m[2] + n[2];
      o[1] += o[2] >>> 16;
      o[2] &= 0xffff;
      o[1] += m[1] + n[1];
      o[0] += o[1] >>> 16;
      o[1] &= 0xffff;
      o[0] += m[0] + n[0];
      o[0] &= 0xffff;
      return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]];
    },

    //
    // Given two 64bit ints (as an array of two 32bit ints) returns the two
    // multiplied together as a 64bit int (as an array of two 32bit ints).
    //
    x64Multiply: function(m, n) {
      m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
      n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
      var o = [0, 0, 0, 0];
      o[3] += m[3] * n[3];
      o[2] += o[3] >>> 16;
      o[3] &= 0xffff;
      o[2] += m[2] * n[3];
      o[1] += o[2] >>> 16;
      o[2] &= 0xffff;
      o[2] += m[3] * n[2];
      o[1] += o[2] >>> 16;
      o[2] &= 0xffff;
      o[1] += m[1] * n[3];
      o[0] += o[1] >>> 16;
      o[1] &= 0xffff;
      o[1] += m[2] * n[2];
      o[0] += o[1] >>> 16;
      o[1] &= 0xffff;
      o[1] += m[3] * n[1];
      o[0] += o[1] >>> 16;
      o[1] &= 0xffff;
      o[0] += (m[0] * n[3]) + (m[1] * n[2]) + (m[2] * n[1]) + (m[3] * n[0]);
      o[0] &= 0xffff;
      return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]];
    },
    //
    // Given a 64bit int (as an array of two 32bit ints) and an int
    // representing a number of bit positions, returns the 64bit int (as an
    // array of two 32bit ints) rotated left by that number of positions.
    //
    x64Rotl: function(m, n) {
      n %= 64;
      if (n === 32) {
        return [m[1], m[0]];
      } else if (n < 32) {
        return [(m[0] << n) | (m[1] >>> (32 - n)), (m[1] << n) | (m[0] >>> (32 - n))];
      } else {
        n -= 32;
        return [(m[1] << n) | (m[0] >>> (32 - n)), (m[0] << n) | (m[1] >>> (32 - n))];
      }
    },
    //
    // Given a 64bit int (as an array of two 32bit ints) and an int
    // representing a number of bit positions, returns the 64bit int (as an
    // array of two 32bit ints) shifted left by that number of positions.
    //
    x64LeftShift: function(m, n) {
      n %= 64;
      if (n === 0) {
        return m;
      } else if (n < 32) {
        return [(m[0] << n) | (m[1] >>> (32 - n)), m[1] << n];
      } else {
        return [m[1] << (n - 32), 0];
      }
    },
    //
    // Given two 64bit ints (as an array of two 32bit ints) returns the two
    // xored together as a 64bit int (as an array of two 32bit ints).
    //
    x64Xor: function(m, n) {
      return [m[0] ^ n[0], m[1] ^ n[1]];
    },
    //
    // Given a block, returns murmurHash3's final x64 mix of that block.
    // (`[0, h[0] >>> 1]` is a 33 bit unsigned right shift. This is the
    // only place where we need to right shift 64bit ints.)
    //
    x64Fmix: function(h) {
      h = this.x64Xor(h, [0, h[0] >>> 1]);
      h = this.x64Multiply(h, [0xff51afd7, 0xed558ccd]);
      h = this.x64Xor(h, [0, h[0] >>> 1]);
      h = this.x64Multiply(h, [0xc4ceb9fe, 0x1a85ec53]);
      h = this.x64Xor(h, [0, h[0] >>> 1]);
      return h;
    },

    //
    // Given a string and an optional seed as an int, returns a 128 bit
    // hash using the x64 flavor of MurmurHash3, as an unsigned hex.
    //
    x64hash128: function(key, seed) {
      key = key || "";
      seed = seed || 0;
      var remainder = key.length % 16;
      var bytes = key.length - remainder;
      var h1 = [0, seed];
      var h2 = [0, seed];
      var k1 = [0, 0];
      var k2 = [0, 0];
      var c1 = [0x87c37b91, 0x114253d5];
      var c2 = [0x4cf5ad43, 0x2745937f];
      for (var i = 0; i < bytes; i = i + 16) {
        k1 = [((key.charCodeAt(i + 4) & 0xff)) | ((key.charCodeAt(i + 5) & 0xff) << 8) | ((key.charCodeAt(i + 6) & 0xff) << 16) | ((key.charCodeAt(i + 7) & 0xff) << 24), ((key.charCodeAt(i) & 0xff)) | ((key.charCodeAt(i + 1) & 0xff) << 8) | ((key.charCodeAt(i + 2) & 0xff) << 16) | ((key.charCodeAt(i + 3) & 0xff) << 24)];
        k2 = [((key.charCodeAt(i + 12) & 0xff)) | ((key.charCodeAt(i + 13) & 0xff) << 8) | ((key.charCodeAt(i + 14) & 0xff) << 16) | ((key.charCodeAt(i + 15) & 0xff) << 24), ((key.charCodeAt(i + 8) & 0xff)) | ((key.charCodeAt(i + 9) & 0xff) << 8) | ((key.charCodeAt(i + 10) & 0xff) << 16) | ((key.charCodeAt(i + 11) & 0xff) << 24)];
        k1 = this.x64Multiply(k1, c1);
        k1 = this.x64Rotl(k1, 31);
        k1 = this.x64Multiply(k1, c2);
        h1 = this.x64Xor(h1, k1);
        h1 = this.x64Rotl(h1, 27);
        h1 = this.x64Add(h1, h2);
        h1 = this.x64Add(this.x64Multiply(h1, [0, 5]), [0, 0x52dce729]);
        k2 = this.x64Multiply(k2, c2);
        k2 = this.x64Rotl(k2, 33);
        k2 = this.x64Multiply(k2, c1);
        h2 = this.x64Xor(h2, k2);
        h2 = this.x64Rotl(h2, 31);
        h2 = this.x64Add(h2, h1);
        h2 = this.x64Add(this.x64Multiply(h2, [0, 5]), [0, 0x38495ab5]);
      }
      k1 = [0, 0];
      k2 = [0, 0];
      switch (remainder) {
        case 15:
          k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 14)], 48));
        case 14:
          k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 13)], 40));
        case 13:
          k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 12)], 32));
        case 12:
          k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 11)], 24));
        case 11:
          k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 10)], 16));
        case 10:
          k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 9)], 8));
        case 9:
          k2 = this.x64Xor(k2, [0, key.charCodeAt(i + 8)]);
          k2 = this.x64Multiply(k2, c2);
          k2 = this.x64Rotl(k2, 33);
          k2 = this.x64Multiply(k2, c1);
          h2 = this.x64Xor(h2, k2);
        case 8:
          k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 7)], 56));
        case 7:
          k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 6)], 48));
        case 6:
          k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 5)], 40));
        case 5:
          k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 4)], 32));
        case 4:
          k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 3)], 24));
        case 3:
          k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 2)], 16));
        case 2:
          k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 1)], 8));
        case 1:
          k1 = this.x64Xor(k1, [0, key.charCodeAt(i)]);
          k1 = this.x64Multiply(k1, c1);
          k1 = this.x64Rotl(k1, 31);
          k1 = this.x64Multiply(k1, c2);
          h1 = this.x64Xor(h1, k1);
      }
      h1 = this.x64Xor(h1, [0, key.length]);
      h2 = this.x64Xor(h2, [0, key.length]);
      h1 = this.x64Add(h1, h2);
      h2 = this.x64Add(h2, h1);
      h1 = this.x64Fmix(h1);
      h2 = this.x64Fmix(h2);
      h1 = this.x64Add(h1, h2);
      h2 = this.x64Add(h2, h1);
      return ("00000000" + (h1[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h1[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[1] >>> 0).toString(16)).slice(-8);
    }
  };


  // 获取常规URL参数 (格式为: ?needPin=yes&code=d9b733fc2b01471881eaf95ab5f98691)
  var getParameter =  function (key, host) {
      var search = host || document.location.search;
      var c = new RegExp("(?:^|&|[?]|[/])" + key + "[=|:]([^&]*)");
      var d = c.exec(search);
      return d ? decodeURIComponent(d[1]) : "";
  };

  //日期格式化
  var dateFormat = function(date) {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
  };

    ////////////////
    // 存取 Cookies //
    ////////////////
    function Store() {
      if ("undefined" == typeof Store._initialized) {
          var a = document.domain.replace(/.*?(\w+\.\w+)$/, "$1");
          console.log("cookie");
          console.log(document.cookie);
          var b = function(a) {
              return document.cookie.length > 0 && a && (c_start = document.cookie.indexOf(a + "="),
              -1 != c_start) ? (c_start = c_start + a.length + 1,
              c_end = document.cookie.indexOf(";", c_start),
              -1 == c_end && (c_end = document.cookie.length),
              decodeURIComponent(document.cookie.substring(c_start, c_end))) : "";
          };
          var c = function(b, c, d) {
              if (b) {
                  var e = "";
                  if (d) {
                      var f = new Date();
                      f.setTime(f.getTime() + 1e3 * d);
                      e = ";expires=" + f.toGMTString();
                  }
                  document.cookie = b + "=" + encodeURIComponent(c) + e + ";path=/;domain=" + a + ";";
              }
          };

          Store.prototype.setItem = function(a, b, d) {
              c(a, b, d);
          };
          Store.prototype.getItem = function(a) {
              return b(a);
          };
          Store._initialized = !0;
      }
  }
  var store = new Store();

  var setPoint = function(options) {
    let data = {};
    data.url = window.location.href;
    if(data.url.indexOf("?") > -1) {
      data.cur_page_par = "?" + data.url.split("?")[1];
    }
    var store_deviceid = store.getItem("store_deviceid");
    if(!store_deviceid){
      var fp = new fingerprint();
      store_deviceid = fp.get();
      store.setItem("store_deviceid", store_deviceid, 7776000);
    }
    data.device_id = store_deviceid;
    data.ref_page_par = getParameter('ref_page_par');
    if(data.ref_page_par) {
      try {
        data.ref_page_par = JSON.parse(data.ref_page_par);
      } catch(e) {
        data.ref_page_par = getParameter('ref_page_par');
      }
    }
    let params = {
        //浏览器版本 必填
        "agent": navigator.userAgent,
        //浏览器版本号 必填
        "agent_ver": navigator.appVersion,
        //客户端IP 必填
        // "client_ip": "58.216.236.114, 172.19.132.37",
        //设备ID 必填
        "device_id": data.device_id,
        //？
        // "network": "",
        //？
        "session_id": store.getItem("login.o2o.jd.com1"),
        //用户ID
        "user_id": options.user_id || store.getItem("user_key"),
        //上报时间 必填
        "create_time": dateFormat(new Date()),
        //埋点类型
        "log_data_type": options.click ? "site_click" : "site_pv",
        //事件名称
        "click_name": options.click ? options.click.click_name : undefined,
        //事件编号
        "click_no": options.click ? options.click.click_no : undefined,
        //事件参数
        "click_par": options.click ? options.click.click_par : undefined,
        //当前页面请求参数
        "cur_page_par": data.cur_page_par,
        //关键字
        "keyword": options.keyword,
        //订单号
        "order_id": options.order_id,
        //页面ID
        "page_id": options.page_id,
        //页面名称
        "page_name": options.page_name,
        //上一级页面的关键字
        "ref_keyword": options.ref_keyword || getParameter('ref_keyword'),
        //上一级页面ID
        "ref_page_id": options.ref_page_id || getParameter('ref_page_id'),
        //上一级页面名称
        "ref_page_name": options.ref_page_name || getParameter('ref_page_name'),
        //上一级页面URL
        "ref_url": options.ref_url || getParameter('ref_url') || document.referrer,
        //上一级页面
        "ref_page_par": options.ref_page_par || data.ref_page_par,
        //？
        // "testtag": [
        //     {
        //         "duration": "10800000",
        //         "experimentName": "glbStorePage",
        //         "testTag": "glbStorePage:hide:2017-05-25 15:42:29"
        //     },
        //     {
        //         "duration": 10800000,
        //         "experimentName": "search_andor_test",
        //         "testTag": "search_andor_test:or:2017-05-25 15:43:03"
        //     }
        // ],
        //当前页面URL
        "url": data.url,
        //当前页面参数
        "url_page_par": options.url_page_par,
        //客户端时间
        // "visit_time": "2017-05-25 15:47:49.135+0800",
        //商家ID
        "vender_id": options.vender_id || store.getItem("vender_id"),
        //商家名称
        "vender_name": options.vender_name || store.getItem("vender_name")
    }
    $.ajax({
        // url: document.location.protocol + "//log-o2op.jd.com/v1/logging", // 预发布
        url: document.location.protocol + "//log-o2o.jd.com/v1/logging", // 线上环境
        type:'POST',
        data: {
          logType: "dj_store",
          json: "[" + JSON.stringify(params) + "]"
        },
        dataType:"json",
        success: function(result) { // console.log(result);
         },
        error: function(result) { }
    });
  };

  if (typeof define === "function" && define.amd) {
    define(function() {
      return setPoint;
    });
  } else if (typeof module === "object" && module && typeof module.exports === "object" && module.exports) {
    module.exports = setPoint;
  } else {
    window.setPoint = setPoint;
  }
})(function() {
  return this || window;
}());
