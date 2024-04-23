//Utils define
var Utils = {
  prefix: "venge",
  prefixCDN: "https://assets.venge.io/",
  prefixMapCDN: "https://maps.venge.io/",
  variables: {
      floatingIndex: 0
  },
  currentNameIndex: 1,
  nameIndex: [],
  zeroVector: new pc.Vec3(0,0,0),
  heightVector: new pc.Vec3(0,-5,0),
  nullVector: new pc.Vec3(0,-100,0),
  whiteColor: new pc.Color(1,1,1),
  getAssetFromURL: function(e, t) {
      var r = new pc.Asset(e,"texture",{
          url: ""
      })
        , n = new pc.Texture(pc.app.graphicsDevice)
        , a = new Image;
      return a.crossOrigin = "anonymous",
      a.onload = function() {
          this && (n.setSource(this),
          n.upload(),
          r.loaded = !0)
      }
      ,
      a.src = "map" == t ? Utils.prefixMapCDN + e : Utils.prefixCDN + e,
      r.resource = n,
      pc.app.assets.add(r),
      r
  },
  parseFloat: function(e) {
      return 5 * parseFloat(parseFloat(e).toFixed(1))
  },
  triggerAction: function(e) {
      var t = e.split(", ");
      if (t.length > 0)
          for (var r in t) {
              var n = t[r]
                , a = n.split("@");
              if (a.length > 1) {
                  var o = a[0]
                    , i = a[1];
                  pc.app.fire(o, i)
              } else
                  pc.app.fire(n)
          }
  },
  hex2RGB: function(e) {
      var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
      return t ? {
          r: parseInt(t[1], 16) / 255,
          g: parseInt(t[2], 16) / 255,
          b: parseInt(t[3], 16) / 255
      } : null
  },
  generateId: function(number) {
      var _number = (Math.random() + 1).toString(36).substring(7);
      return eval(number)
  },
  encodeFloat: function(e) {
      return 5 * parseFloat(parseFloat(e).toFixed(1))
  },
  decodeFloat: function(e) {
      return e / 5
  },
  lookAt: function(e, t, r, n) {
      return Math.atan2(r - e, n - t)
  },
  distance: function(e, t, r, n) {
      return Math.sqrt(Math.pow(e - r, 2) + Math.pow(t - n, 2))
  },
  toDeg: function(e) {
      return e * (180 / Math.PI)
  },
  toRad: function(e) {
      return e * (Math.PI / 180)
  },
  lerp: function(e, t, r) {
      var n = (1 - r) * e + r * t;
      return isNaN(n) ? 0 : Math.abs(n - e) > 50 ? t : n
  },
  rotate: function(e, t, r) {
      return e + this.shortAngleDist(e, t) * r
  },
  shortcutName: function(e) {
      return e ? e.replace("-Grenade", "") : ""
  },
  onlyUsername: function(e) {
      var t = e.split("[/color]]")
        , r = e.split("[/rainbow]");
      return t.length > 1 ? t[1].trim() : r.length > 1 ? r[1].trim() : t[0].trim()
  },
  rainbowIndex: 0,
  colors: ["FF0E0E", "FF6000", "FFCA00", "BFFF00", "2AFF00", "00FF60", "00FFBF", "00D4FF", "0055FF", "0000FF", "6000FF", "BF00FF", "FF00D4", "FF0075", "FF004A"],
  usernames: [],
  preprocessUsername: function(e, t) {
      return t && !t.originalText ? (t.originalText = e,
      this.usernames.push(t)) : e = Utils.convertRainbow(e),
      e
  },
  updateUsernames: function() {
      for (var e in this.usernames) {
          var t = this.usernames[e];
          this.updateUsername(t)
      }
      this.rainbowIndex++,
      clearTimeout(this.usernameTimeout),
      this.usernameTimeout = setTimeout((function(e) {
          e.updateUsernames()
      }
      ), 50, this)
  },
  updateUsername: function(e) {
      e.text = Utils.convertRainbow(e.originalText)
  },
  convertRainbow: function(e) {
      if (!e)
          return e;
      var t = this
        , r = e.match(/\[rainbow\](.*?)\[\/rainbow\](.*?)/);
      return r && r.length > 0 ? (r = (r = (r = r[1]).split("")).map((function(e, r) {
          return '[color="#' + t.colors[(t.rainbowIndex + r) % t.colors.length] + '"]' + e.replace("[", "").replace("]", "") + "[/color]"
      }
      )).join(""),
      e.replace(/\[rainbow\](.*?)\[\/rainbow\](.*?)/, "\\[" + r + "]")) : e
  },
  displayUsername: function(e, t) {
      var r = 1;
      return Utils.nameIndex[e] ? r = Utils.nameIndex[e] : (Utils.currentNameIndex++,
      Utils.nameIndex[e] = Utils.currentNameIndex + ""),
      pc.settings && !0 === pc.settings.hideUsernames ? "HIDDEN" + r : Utils.preprocessUsername(e, t)
  },
  cleanUsername: function(e) {
      return e.replace(/\[color="(.*?)"\]/g, "").replace(/\[\/color]/g, "").replace(/\\/g, "").trim()
  },
  clearName: function(e) {
      return e ? e.replace("_", ".").replace("Ammo-", "") : ""
  },
  clearId: function(e) {
      return e ? e.replace("Ammo-", "") : ""
  },
  slug: function(e) {
      if (!e)
          return "";
      e = (e = e.replace(/^\s+|\s+$/g, "")).toLowerCase();
      for (var t = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;", r = 0, n = t.length; r < n; r++)
          e = e.replace(new RegExp(t.charAt(r),"g"), "aaaaeeeeiiiioooouuuunc------".charAt(r));
      return e = e.replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")
  },
  shortAngleDist: function(e, t) {
      var r = 2 * Math.PI
        , n = (t - e) % r;
      return 2 * n % r - n
  },
  float: function(e) {
      return isNaN(e) ? 0 : e.toFixed(3)
  },
  pad: function(e, t) {
      return ("000" + e).slice(-3)
  },
  mmssmm: function(e) {
      var t = e
        , r = Math.floor(1e3 * t % 1e3)
        , n = Math.floor(t % 60)
        , a = Math.floor(1e3 * t / 6e4 % 60)
        , o = "MM:SS:XX";
      return n < 10 && (n = "0" + n),
      a < 10 && (a = "0" + a),
      r < 100 && (r = "0" + r),
      o = (o = (o = o.replace(/MM/, a)).replace(/SS/, n)).replace(/XX/, r.toString().slice(0, 2))
  },
  mmss: function(e) {
      var t = e
        , r = Math.floor(1e3 * t % 1e3)
        , n = Math.floor(t % 60)
        , a = Math.floor(1e3 * t / 6e4 % 60)
        , o = "MM:SS";
      return n < 10 && (n = "0" + n),
      a < 10 && (a = "0" + a),
      r < 100 && (r = "0" + r),
      o = (o = o.replace(/MM/, a)).replace(/SS/, n),
      e >= 0 ? o : "00:00"
  },
  isLocalStorageSupported: function() {
      var e = !1
        , t = "localStorageSupportTest";
      try {
          localStorage.setItem(t, t),
          localStorage.removeItem(t),
          e = !0
      } catch (t) {
          e = !1
      }
      return e
  },
  setItem: function(e, t) {
      this.isLocalStorageSupported() ? window.localStorage.setItem(e, t) : this.createCookie(e, t)
  },
  getItem: function(e) {
      return this.isLocalStorageSupported() ? window.localStorage.getItem(e) : this.readCookie(e)
  },
  deleteItem: function(e) {
      this.isLocalStorageSupported() ? window.localStorage.removeItem(e) : this.createCookie(e, "")
  },
  createCookie: function(e, t, r) {
      if (r) {
          var n = new Date;
          n.setTime(n.getTime() + 24 * r * 60 * 60 * 1e3);
          var a = "; expires=" + n.toGMTString()
      } else
          a = "";
      document.cookie = e + "=" + t + a + "; path=/"
  },
  readCookie: function(e) {
      for (var t = e + "=", r = document.cookie.split(";"), n = 0; n < r.length; n++) {
          for (var a = r[n]; " " == a.charAt(0); )
              a = a.substring(1, a.length);
          if (0 == a.indexOf(t))
              return a.substring(t.length, a.length)
      }
      return null
  },
  shuffle: function(e) {
      var t, r, n;
      for (n = e.length - 1; n > 0; n--)
          t = Math.floor(Math.random() * (n + 1)),
          r = e[n],
          e[n] = e[t],
          e[t] = r;
      return e
  },
  isMobile: function() {
      var e, t = !1;
      return e = navigator.userAgent || navigator.vendor || window.opera,
      (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (t = !0),
      t
  },
  isIOS: function() {
      return ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform)
  },
  number: function(e, t) {
      return e ? parseInt(e) : t
  },
  getURLParams: function(e, t) {
      t || (t = location.href),
      e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var r = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(t);
      return null == r ? null : r[1]
  },
  closestPointLine: function(e, t, r) {
      var n = r.x - t.x
        , a = r.y - t.y
        , o = n * n + a * a
        , i = (e.x - t.x) * n + (e.y - t.y) * a
        , c = Math.min(1, Math.max(0, i / o));
      return i = (r.x - t.x) * (e.y - t.y) - (r.y - t.y) * (e.x - t.x),
      {
          point: {
              x: t.x + n * c,
              y: t.y + a * c
          },
          left: i < 1,
          dot: i,
          t: c
      }
  },
  copyToClipboard: function(e) {
      if (window.clipboardData && window.clipboardData.setData)
          return clipboardData.setData("Text", e);
      if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
          var t = document.createElement("textarea");
          t.textContent = e,
          t.style.position = "fixed",
          document.body.appendChild(t),
          t.select();
          try {
              return document.execCommand("copy")
          } catch (e) {
              return console.warn("Copy to clipboard failed.", e),
              !1
          } finally {
              document.body.removeChild(t)
          }
      }
  }
};
console.log("Utils loaded!")
