;(function (global) {
    global.Ta = global.Ta || {};
    Ta.hack = function () {
        return {
            params: '',
            conf: {sid: 65975181, pf: 1, logo: 255, hot: {"url": "new.qq.com/|new.qq.com/ch/photo/", "isValid": true}}
        };
    };
})(this);

(function (h, n) {
    function v(c) {
        c += "";
        var a, b, d, e, f, g;
        d = c.length;
        b = 0;
        for (a = ""; b < d;) {
            e = c.charCodeAt(b++) & 255;
            if (b == d) {
                a += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >> 2);
                a += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((e & 3) << 4);
                a += "==";
                break
            }
            f = c.charCodeAt(b++);
            if (b == d) {
                a += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >> 2);
                a += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((e & 3) << 4 | (f & 240) >>
                    4);
                a += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((f & 15) << 2);
                a += "=";
                break
            }
            g = c.charCodeAt(b++);
            a += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >> 2);
            a += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((e & 3) << 4 | (f & 240) >> 4);
            a += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((f & 15) << 2 | (g & 192) >> 6);
            a += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(g & 63)
        }
        return a
    }

    function p(c) {
        return (c =
            document.cookie.match(new RegExp("(?:^|;\\s)" + c + "=(.*?)(?:;\\s|$)"))) ? c[1] : ""
    }

    function q(c, a, b) {
        var d = window.location.host,
            e = {"com.cn": 1, "net.cn": 1, "gov.cn": 1, "com.hk": 1, "co.nz": 1, "org.cn": 1, "edu.cn": 1},
            f = d.split(".");
        2 < f.length && (d = (e[f.slice(-2).join(".")] ? f.slice(-3) : f.slice(-2)).join("."));
        document.cookie = c + "=" + a + ";path=/;domain=" + d + (b ? ";expires=" + b : "")
    }

    function l(c) {
        var a, b, d, e = {};
        void 0 === c ? (d = window.location, c = d.host, a = d.pathname, b = d.search.substr(1), d = d.hash) : (d = c.match(/\w+:\/\/((?:[\w-]+\.)+\w+)(?:\:\d+)?(\/[^\?\\\"\'\|\:<>]*)?(?:\?([^\'\"\\<>#]*))?(?:#(\w+))?/i) ||
            [], c = d[1], a = d[2], b = d[3], d = d[4]);
        void 0 !== d && (d = encodeURI(d.replace(/\"|\'|\<|\>/ig, "M")));
        if (b) for (var f = b.split("&"), g = 0, h = f.length; g < h; g++) if (-1 != f[g].indexOf("=")) {
            var m = f[g].indexOf("="), k = f[g].slice(0, m), m = f[g].slice(m + 1);
            e[k] = m
        }
        return {host: c, path: a, search: b, hash: d, param: e}
    }

    function r(c) {
        return (c || "") + Math.round(2147483647 * (Math.random() || .5)) * +new Date % 1E10
    }

    function t(c, a) {
        var b = document.createElement("script"), d = document.getElementsByTagName("script")[0];
        b.src = c;
        b.type = "text/javascript";
        b.onload =
            b.onerror = b.onreadystatechange = function () {
                /loaded|complete|undefined/.test(b.readyState) && (b.onload = b.onerror = b.onreadystatechange = null, b.parentNode.removeChild(b), b = void 0, a())
            };
        d.parentNode.insertBefore(b, d)
    }

    function w() {
        var c = l(), a = {dm: c.host, pvi: "", si: "", url: c.path, arg: encodeURIComponent(c.search || ""), ty: 1};
        a.pvi = function () {
            var b = p("pgv_pvi");
            b || (a.ty = 0, b = r(), q("pgv_pvi", b, "Sun, 18 Jan 2038 00:00:00 GMT;"));
            return b
        }();
        a.si = function () {
            var a = p("pgv_si");
            a || (a = r("s"), q("pgv_si", a));
            return a
        }();
        return a
    }

    function x() {
        var c = l(document.referrer), a = l();
        return {
            rdm: c.host,
            rurl: c.path,
            rarg: encodeURIComponent(c.search || ""),
            adt: a.param.ADTAG || a.param.adtag
        }
    }

    function y() {
        try {
            var c = navigator, a = screen || {width: "", height: "", colorDepth: ""}, b = document.body,
                d = a.width + "x" + a.height, e = a.colorDepth + "-bit",
                f = (c.language || c.userLanguage).toLowerCase(), g = c.javaEnabled() ? 1 : 0,
                h = (new Date).getTimezoneOffset() / 60, a = "";
            b && b.addBehavior && (b.addBehavior("#default#clientCaps"), a = b.connectionType);
            var b = {
                fl: "", scr: d, scl: e,
                lg: f, jv: g, tz: h, ct: a
            }, m, k, l, n;
            if ((m = c.plugins) && (k = m.length)) for (c = 0; c < k; c++) {
                if (l = m[c].description.match(/Shockwave Flash ([\d\.]+) \w*/)) b.fl = l[1]
            } else n = (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version"), b.fl = n.replace(/^.*\s+(\d+)\,(\d+).*$/, "$1.$2")
        } catch (p) {
            return {}
        }
        return b
    }

    function z() {
        var c = {};
        if ("undefined" != typeof _taadHolders && 0 < _taadHolders.length) for (var a = 0, b = _taadHolders, d = b.length; a < d; a++) c[b[a]] = c[b[a]] ? c[b[a]] + 1 : 1;
        var a = [], e;
        for (e in c) c.hasOwnProperty(e) &&
        a.push(e + "*" + c[e]);
        return {ext: "adid=" + a.join(":")}
    }

    function A() {
        var c = [], a;
        for (a in k) {
            var b = p(k[a].c_id), d;
            "afs" == a ? d = (d = /ssid=([^&]*)/i.exec(l().hash)) && d[1] ? d[1] : "" : (d = l().param, d = d[k[a].id] ? d[k[a].id] : "");
            d ? (c.push("ty=" + k[a].key + ";ck=0;id=" + d), b = new Date, b.setTime(b.getTime() + 2592E6), q(k[a].c_id, d, b.toGMTString())) : b && c.push("ty=" + k[a].key + ";ck=1;id=" + b)
        }
        return {pf: c.join("|")}
    }

    function u(c) {
        c = c || {};
        c.conf && function () {
            var a = c.conf, b;
            for (b in a) a.hasOwnProperty(b) && (h[b] = a[b])
        }();
        if (h.sid && !Ta[h.sid]) {
            for (var a =
                [], b = 0, d = [w(), x(), {
                r2: h.sid,
                r3: "undefined" == typeof _speedMark ? "-1" : new Date - _speedMark,
                r4: h.pf || 1
            }, y(), z(), A(), {random: +new Date}], e = d.length; b < e; b++) for (var f in d[b]) d[b].hasOwnProperty(f) && a.push(f + "=" + (d[b][f] || ""));
            c.params && a.push(c.params);
            var a = Ta.src = ("https:" == document.location.protocol ? "https://pingtas.qq.com/webview" : "http://pingtcss.qq.com") + "/pingd?" + a.join("&"),
                g = new Image;
            Ta[h.sid] = g;
            g.onload = g.onerror = g.onabort = function () {
                g = g.onload = g.onerror = g.onabort = null;
                Ta[h.sid] = !0
            };
            g.src = a;
            (1 * !h.pf || h.hot.isValid) &&
            B(a);
            h.logo && 255 != h.logo && C(h.logo)
        }
    }

    function B(c) {
        var a = window.location, b = a.host + a.pathname, d = a.pathname, e = function () {
            t(("https:" == document.location.protocol ? "https://" : "http://") + "tajs.qq.com/ping_hotclick_min.js", function () {
                window.hotclick && (new hotclick(c)).watchClick()
            })
        };
        1 * h.pf ? (new RegExp(b)).test(h.hot.url) && e() : (a = h.sid, t("http://tcss.qq.com/heatmap/" + a % 100 + "/" + v(a) + ".js?random=" + +new Date, function () {
            var a;
            if (window._Cnf && (a = window._Cnf.url)) {
                a = a.split("|");
                for (var b = 0; b < a.length; b++) if (a[b] ==
                    d) {
                    e();
                    break
                }
            }
        }))
    }

    function C(c) {
        var a = {
            9: "\u817e\u8baf\u5206\u6790",
            10: "\u7f51\u7ad9\u7edf\u8ba1",
            df: '<img src="' + (("https:" == document.location.protocol ? "https:" : "http:") + "//tajs.qq.com/icon/toss_" + c + ".gif") + '" border="0" />'
        };
        document.write(['<a href="http://ta.qq.com?ADTAG=FROUM.FOOTER.CLICK.ICON" title="\u817e\u8baf\u5206\u6790" target="_blank">', a[c] || a.df, "</a>"].join(""))
    }

    var k = {
        afs: {key: 1, id: "ssid", c_id: "pgv_afsid", fr: "hash"},
        afc: {key: 2, id: "__tacid", c_id: "pgv_afcid", fr: "param"},
        gdt: {
            key: 11,
            id: "qz_gdt", c_id: "pgv_gdtid", fr: "param"
        }
    };
    n.taClick = function (c, a) {
        var b = Ta.src.replace(/ext=[^&]*/, function () {
            return "ext=" + ("evtid" == a ? "ty=0;evtid=" : "clickid" == a ? "ty=1;clickid=" : "adid=") + c
        }).replace(/r2=([^&]*)/, function (b, c) {
            return "r2=" + ("clickid" == a ? "b" : "a") + c
        });
        (new Image(1, 1)).src = b
    };
    n.Ta = n.Ta || {};
    Ta.pgv = u;
    !Ta.async && u(Ta.hack ? Ta.hack() : "")
})({sid: "", pf: "", hot: {url: "", isValid: !1}}, this);


("http://tcss.qq.com/heatmap/" + a % 100 + "/" + v(a) + ".js?random=" + +new Date, function () {
    var a;
    if (window._Cnf && (a = window._Cnf.url)) {
        a = a.split("|");
        for (var b = 0; b < a.length; b++) if (a[b] ==
            d) {
            e();
            break
        }
    }
})

__jp0([{
    "title": "\u4e00\u5f20\u84dd\u56fe\u4e00\u76d8\u68cb \u4e60\u8fd1\u5e73\u8fd9\u6837\u64d8\u753b\u4eac\u6d25\u5180\u534f\u540c\u53d1\u5c55",
    "url": "https:\/\/new.qq.com\/omn\/20190225\/20190225A05F0J.html",
    "article_id": "20190225a05f0j",
    "comment_id": "0",
    "group": "0"
}, {
    "title": "\u3010\u9886\u822a\u65b0\u65f6\u4ee3\u3011\u5409\u6797\uff1a\u7528\u5b9e\u5e72\u4f5c\u7b54 \u4ee5\u53d1\u5c55\u6c42\u53d8",
    "url": "https:\/\/new.qq.com\/omn\/20190224\/20190224A0TPIB.html",
    "article_id": "20190224a0tpib",
    "comment_id": "0",
    "group": "0"
}, {
    "title": "\u56db\u5ddd\u843d\u5b9e\u4e60\u8fd1\u5e73\u603b\u4e66\u8bb0\u5168\u56fd\u4e24\u4f1a\u91cd\u8981\u8bb2\u8bdd\u7cbe\u795e\u7eaa\u5b9e",
    "url": "https:\/\/new.qq.com\/omn\/20190224\/20190224A0LW09.html",
    "article_id": "20190224a0lw09",
    "comment_id": "0",
    "group": "0"
}, {
    "title": "\u65b0\u534e\u793e\u8bc4\u8bba\u5458\uff1a\u63a8\u52a8\u91d1\u878d\u4e1a\u9ad8\u8d28\u91cf\u53d1\u5c55",
    "url": "https:\/\/new.qq.com\/omn\/20190224A0XN0G00",
    "article_id": "20190224a0xn0g00",
    "comment_id": "0",
    "group": "0"
}, {
    "title": "\u7cfb\u597d\u4eba\u751f\u201c\u7b2c\u4e00\u7c92\u6263\u5b50\u201d",
    "url": "https:\/\/new.qq.com\/omn\/20190224A0Q6T200",
    "article_id": "20190224a0q6t200",
    "comment_id": "0",
    "group": "0"
}, {
    "title": "\u4eba\u6c11\u65e5\u62a5\u949f\u58f0\uff1a\u6309\u4e2d\u7f8e\u5143\u9996\u5171\u8bc6\u52a0\u5feb\u8fbe\u6210\u4e92\u5229\u53cc\u8d62\u534f\u8bae",
    "url": "https:\/\/new.qq.com\/omn\/20190225\/20190225A0DFSH.html",
    "article_id": "20190225a0dfsh",
    "comment_id": "0",
    "group": "0"
}, {
    "title": "\u534f\u540c\u53d1\u5c55\u4e94\u5e74\u95f4\uff0c\u975e\u9996\u90fd\u529f\u80fd\u758f\u89e3\u5f97\u600e\u6837\u4e86\uff1f",
    "url": "https:\/\/new.qq.com\/omn\/20190224\/20190224A0OWSL.html",
    "article_id": "20190224a0owsl",
    "comment_id": "0",
    "group": "0"
}, {
    "title": "\u5efa\u5f3a\u515a\u652f\u90e8 \u53d1\u52a8\u201c\u706b\u8f66\u5934\u201d\uff08\u65b0\u601d\u60f3\u57fa\u5c42\u7ed3\u7855\u679c\uff09",
    "url": "https:\/\/new.qq.com\/omn\/20190225\/20190225A09NVG.html",
    "article_id": "20190225a09nvg",
    "comment_id": "0",
    "group": "0"
}])
