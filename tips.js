/*!------------Modifier: < TANGENTGUO-MC1 > 2019-1-7 16:38:06------------*/

"use strict";
(function () {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;
                    if (!f && c) return c(i, !0);
                    if (u) return u(i, !0);
                    var a = new Error("Cannot find module '" + i + "'");
                    throw a.code = "MODULE_NOT_FOUND", a
                }
                var p = n[i] = {exports: {}};
                e[i][0].call(p.exports, function (r) {
                    var n = e[i][1][r];
                    return o(n || r)
                }, p, p.exports, r, e, n, t)
            }
            return n[i].exports
        }

        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
            o(t[i])
        }
        return o
    }

    return r
})()({
    1: [function (require, module, exports) {
        (function (global) {
            var open = global.location && location.href.indexOf("debug") !== -1;
            var debug = {
                log: function log() {
                    if (!open || !global.console) return;
                    var logs = Array.prototype.slice.call(arguments);
                    console.log.apply ? console.log.apply(null, logs) : console.log(logs)
                }, open: open
            };
            module.exports = debug
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}], 2: [function (require, module, exports) {
        (function (global) {
            var support = global.localStorage;
            var keys = ["count", "onceTime", "close", "lastTime"];
            var prefix = "mercury_";
            var LS = {
                getItem: function getItem(k) {
                    if (support) {
                        return localStorage.getItem(prefix + k)
                    }
                    return null
                }, setItem: function setItem(k, v) {
                    if (support) {
                        localStorage.setItem(prefix + k, v)
                    }
                }, removeItem: function removeItem(k) {
                    if (support) {
                        localStorage.removeItem(prefix + k)
                    }
                }, clear: function clear() {
                    for (var i = 0; i < keys.length; i++) {
                        LS.removeItem(keys[i])
                    }
                }
            };
            module.exports = LS
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}], 3: [function (require, module, exports) {
        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function (searchElement, fromIndex) {
                var k;
                if (this == null) {
                    throw new TypeError("\"this\" is null or not defined")
                }
                var O = Object(this);
                var len = O.length >>> 0;
                if (len === 0) {
                    return -1
                }
                var n = +fromIndex || 0;
                if (Math.abs(n) === Infinity) {
                    n = 0
                }
                if (n >= len) {
                    return -1
                }
                k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
                while (k < len) {
                    if (k in O && O[k] === searchElement) {
                        return k
                    }
                    k++
                }
                return -1
            }
        }
        if (!Array.prototype.some) {
            Array.prototype.some = function (fun) {
                "use strict";
                if (this === void 0 || this === null) throw new TypeError;
                var t = Object(this);
                var len = t.length >>> 0;
                if (typeof fun !== "function") throw new TypeError;
                var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
                for (var i = 0; i < len; i++) {
                    if (i in t && fun.call(thisArg, t[i], i, t)) return true
                }
                return false
            }
        }
    }, {}], 4: [function (require, module, exports) {
        var config = {};
        module.exports = config
    }, {}], 5: [function (require, module, exports) {
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift()
        }

        module.exports.get = getCookie
    }, {}], 6: [function (require, module, exports) {
        var cookie = require("./cookie");
        var iQQ = cookie.get("o_cookie");
        var btraceUrl = "http://btrace.qq.com/kvcollect";
        var boss = function boss(p) {
            return function (p2) {
                p["QQ"] = iQQ;
                if ($.isPlainObject(p2)) {
                    $.extend(p, p2)
                } else if (typeof p2 == "string") {
                    $.extend(p, {sOp: p2})
                }
                new Image(1, 1).src = btraceUrl + "?" + $.param(p)
            }
        };
        var boss3744 = boss({
            BossId: 3744,
            Pwd: "2036264807",
            channel: location.hostname,
            sop: "pc_tips",
            url: location.href,
            product: "1",
            ua_raw: navigator.userAgent,
            rand: Math.random()
        });
        module.exports = boss3744
    }, {"./cookie": 5}], 7: [function (require, module, exports) {
        (function (global) {
            var debug = require("./DEBUG");
            var LS = require("./LS");
            var CONFIG = require("./config");
            var boss = require("./report");
            var getType = function getType(Location) {
                if (!Location) return 0;
                if (Location.href.match(/\/(a|omn|cmsn)\//)) {
                    if (global.ARTICLE_INFO && global.ARTICLE_INFO.tpl && global.ARTICLE_INFO.tpl.type === "6") {
                        return "gq"
                    } else {
                        return "dc"
                    }
                } else {
                    return "index"
                }
            };
            var isChromeNotification = function isChromeNotification() {
                return global.HasChromeNotice ? 1 : 0
            };
            var channelAllow = function channelAllow(arr, hostname) {
                if (hostname === "new.qq.com" && global.DATA) {
                    if (arr.indexOf(global.DATA.catalog1 + ".qq.com") !== -1) {
                        debug.log("\u547D\u4E2D new.qq.com \u5206\u7C7B", global.DATA.catalog1);
                        return 1
                    }
                }
                if (arr.indexOf(hostname) === -1) return 0;
                return global.ARTICLE_INFO && ARTICLE_INFO.tpl ? ARTICLE_INFO.tpl.name != "political" : 1
            };
            var rangeAllow = function rangeAllow(arr) {
                var type = getType(global.location);
                CONFIG.pagetype = type;
                return arr.some(function (v) {
                    return v === type
                })
            };
            var pageAllow = function pageAllow(d) {
                if (d.status !== "200") return 0;
                debug.log("display:", d.data.is_display);
                if (d.data.is_display == 0) return 0;
                if (isChromeNotification()) return 0;
                debug.log("\u65E0chrome\u901A\u77E5");
                if (!channelAllow(d.data.channels, global.location.hostname)) return 0;
                debug.log("\u5141\u8BB8\u5F53\u524D\u9891\u9053");
                if (!rangeAllow(d.data.range)) return 0;
                debug.log("\u5141\u8BB8\u5F53\u524D\u8303\u56F4");
                return 1
            };
            var showMercury = function showMercury(config, data) {
                var id = data["tips_id"];
                var nowTimeStamp = new Date().getTime();
                var oneDayMillisecond = 24 * 60 * 60 * 1000;
                var oneWeekMillisecond = 7 * oneDayMillisecond;
                if (config.id == id) {
                    if (config.close) {
                        debug.log("\u88AB\u5173\u95ED\u8FC7\uFF0C\u4E0D\u663E\u793A");
                        boss({sop: 1, s_action: "off"});
                        return 0
                    }
                    if (config.lastTime && nowTimeStamp - config.lastTime < oneDayMillisecond) {
                        debug.log("\u8DDD\u79BB\u4E0A\u6B21\u663E\u793A\u5C11\u4E8E\u4E00\u5929\uFF0C\u4E0D\u663E\u793A");
                        boss({sop: 2, s_action: "off"});
                        return 0
                    }
                    if (nowTimeStamp - config.onceTime < oneWeekMillisecond) {
                        if (config.count >= 2) {
                            debug.log("\u4E00\u5468\u5185\u5DF2\u7ECF\u663E\u793A\u4E862\u6B21\u4E86");
                            boss({sop: 3, s_action: "off"});
                            return 0
                        } else {
                            LS.setItem("onceTime", config.lastTime);
                            return 1
                        }
                    }
                    return 1
                } else {
                    debug.log("\u65B0id\uFF0C\u663E\u793A");
                    LS.setItem("id", id);
                    LS.setItem("onceTime", nowTimeStamp);
                    LS.clear();
                    return 1
                }
            };
            var ipLocation = function ipLocation(arr, callback) {
                if (!arr) return;
                $.ajax({
                    url: "//fw.qq.com/ipwhere",
                    dataType: "jsonp",
                    jsonpCallback: "ipwhere",
                    cache: true,
                    scriptCharset: "gbk"
                }).done(function (d) {
                    debug.log("cities&ipinfo", arr, d);
                    CONFIG.ipwhere = d;
                    if (arr.length == 0) {
                        callback(1);
                        return
                    }
                    if (arr.some(function (v) {
                        return v == "#" + d.provcode
                    })) {
                        callback(1);
                        return
                    }
                    if (arr.some(function (v) {
                        return v == d.citycode
                    })) {
                        callback(1);
                        return
                    }
                    callback(0)
                })
            };
            module.exports = {
                getType: getType,
                isChromeNotification: isChromeNotification,
                channelAllow: channelAllow,
                rangeAllow: rangeAllow,
                pageAllow: pageAllow,
                showMercury: showMercury,
                ipLocation: ipLocation
            }
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {"./DEBUG": 1, "./LS": 2, "./config": 4, "./report": 6}], 8: [function (require, module, exports) {
        var insertCss = require("insert-css");
        var boss = require("./report");
        var CONFIG = require("./config");
        var LS = require("./LS");
        var css = function css(config) {
            return "\n.M_TIPS { width: 342px; height: 182px; position: fixed; right: 0; bottom: 0; z-index: 999; border-radius: 2px; background: " + (config.background || "#3793ef") + "; font-family: \"Microsoft Yahei\"; color:" + config.fontColor + "; font-size: 14px; }\n\n.M_TIPS a { color: " + config.fontColor + "; text-decoration: none; }\n\n.M_TIPS a:link { color: " + config.fontColor + "; }\n\n.M_TIPS a:hover { color: " + config.fontColor + "; }\n\n.M_TIPS .mtitle { height: 29px; border-bottom: 1px solid rgba(255,255,255,0.3); line-height: 29px; padding: 0 14px; }\n\n.M_TIPS .mtitle .mclose { float: right; font-size: 20px; display: block; color:" + config.close + "; }\n\n.M_TIPS .mpicture { width: 88px; height: 88px; display: block; position: absolute; top: 54px; left: 15px; }\n\n.M_TIPS .mpicture img { width: 100%; height: 100%; border: 0; }\n\n.M_TIPS .mcontent { width: 200px; margin: 20px 0 10px 112px; line-height: 1.3; min-height: 120px; }\n\n.M_TIPS .mcontent .mctitle { font-size: 18px; font-weight: 600; margin-bottom: 5px; }\n\n.M_TIPS .mcontent a { display: block; }\n\n.M_TIPS a.participate { position: absolute; right: 20px; bottom: 10px; display: block; padding: 0 13px; background:" + config.buttonBgColor + "; height: 27px; line-height: 27px; margin: 8px 0 0; border-radius: 2px;color:" + config.buttonFontColor + "\n\n"
        };

        function view(data) {
            $.getScript("//mat1.gtimg.com/pingjs/ext2020/configF2017/5c11c3d3.js").done(function () {
                var colorConfig = window.apub_5c11c3d3;
                if (!colorConfig) return;
                var colors = colorConfig.items;
                var getColor = function getColor(key) {
                    var obj = {};
                    for (var i = 0; i < colors.length; i++) {
                        var color = colors[i];
                        obj[color.title] = color.color
                    }
                    return obj
                };
                var Cconfig = getColor();
                console.log(Cconfig);
                insertCss(css(Cconfig));
                $("body").append("<div class=\"M_TIPS\" id=\"mercury\"></div>");
                bevent();
                $("#mercury").html("\n        <div class=\"mtitle\"><a href=\"javascript:void(0)\" class=\"mclose\" data-report=\"Tips_close\">\xD7</a>\u817E\u8BAF\u7F51\u793E\u533A</div>\n        <a href=\"" + data.url + "\" class=\"mpicture\" target=\"_blank\" data-report=\"Tips_pic\">\n            <img src=\"" + data.pic + "\" />\n        </a>\n        <div class=\"mcontent\">\n            <a href=\"" + data.url + "\" class=\"mctitle\" target=\"_blank\" data-report=\"Tips_text\">" + data.title + "</a>\n            " + data.description + "\n        </div>\n        <a class=\"participate\" href=\"" + data.url + "\" target=\"_blank\" data-report=\"Tips_in\">\u53C2\u4E0E\u8C03\u67E5</a>\n        <!--<a href=\"javascript:void(0)\" class=\"ignore\" data-report=\"Tips_ignore\">\u5FFD\u7565</a>-->\n        ");
                $("#mercury").show();
                boss({
                    surveyurl: CONFIG.tips_data.data.url,
                    s_action: "expo",
                    pagetype: CONFIG.pagetype,
                    s_location: CONFIG.ipwhere.province + CONFIG.ipwhere.town
                })
            })
        }

        function bevent() {
            $("#mercury").on("click", ".mclose", function (e) {
                LS.setItem("close", 1);
                boss({
                    surveyurl: CONFIG.tips_data.data.url,
                    s_action: "click",
                    pagetype: CONFIG.pagetype,
                    s_location: CONFIG.ipwhere.province + CONFIG.ipwhere.town,
                    reject: 1
                });
                $("#mercury").hide()
            });
            $("#mercury").on("click", "a", function (e) {
                var report = $(this).attr("data-report");
                if (report) boss({
                    surveyurl: CONFIG.tips_data.data.url,
                    s_action: "click",
                    pagetype: CONFIG.pagetype,
                    s_location: CONFIG.ipwhere.province + CONFIG.ipwhere.town
                })
            })
        }

        module.exports = view
    }, {"./LS": 2, "./config": 4, "./report": 6, "insert-css": 10}], 9: [function (require, module, exports) {
        require("./js/Polyfill");
        var debug = require("./js/DEBUG");
        var CONFIG = require("./js/config");
        var cookie = require("./js/cookie");
        var LS = require("./js/LS");
        var view = require("./js/view");
        var validation = require("./js/validation");
        var qq = cookie.get("o_cookie");
        var config = {
            id: LS.getItem("id"),
            count: LS.getItem("count") || 0,
            close: LS.getItem("close") || 0,
            onceTime: LS.getItem("onceTime") || 0,
            lastTime: LS.getItem("lastTime")
        };
        CONFIG.config = config;
        debug.log("localstorage ", config);
        var api = "https://api.cpcwe.com/tipsapi/info";
        var apiTest = "http://test.api.cpcwe.com/tipsapi/info";
        if (qq) {
            $.ajax({url: debug.open ? api : api, dataType: "jsonp", data: {qq: qq}}).done(function (d) {
                CONFIG.tips_data = d;
                debug.log(d);
                if (!validation.pageAllow(d)) return;
                var show = validation.showMercury(config, d.data);
                if (show) {
                    validation.ipLocation(d.data.cities, function (s) {
                        if (!s) return;
                        new view(d.data);
                        config.count++;
                        LS.setItem("count", config.count);
                        LS.setItem("lastTime", new Date().getTime())
                    })
                }
            })
        } else {
            debug.log("\u65E0qq\u53F7\uFF0C\u6216\u8005\u4E3A\u65F6\u653F\u7248")
        }
    }, {
        "./js/DEBUG": 1,
        "./js/LS": 2,
        "./js/Polyfill": 3,
        "./js/config": 4,
        "./js/cookie": 5,
        "./js/validation": 7,
        "./js/view": 8
    }], 10: [function (require, module, exports) {
        var containers = [];
        var styleElements = [];
        var usage = "insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).";

        function insertCss(css, options) {
            options = options || {};
            if (css === undefined) {
                throw new Error(usage)
            }
            var position = options.prepend === true ? "prepend" : "append";
            var container = options.container !== undefined ? options.container : document.querySelector("head");
            var containerId = containers.indexOf(container);
            if (containerId === -1) {
                containerId = containers.push(container) - 1;
                styleElements[containerId] = {}
            }
            var styleElement;
            if (styleElements[containerId] !== undefined && styleElements[containerId][position] !== undefined) {
                styleElement = styleElements[containerId][position]
            } else {
                styleElement = styleElements[containerId][position] = createStyleElement();
                if (position === "prepend") {
                    container.insertBefore(styleElement, container.childNodes[0])
                } else {
                    container.appendChild(styleElement)
                }
            }
            if (css.charCodeAt(0) === 65279) {
                css = css.substr(1, css.length)
            }
            if (styleElement.styleSheet) {
                styleElement.styleSheet.cssText += css
            } else {
                styleElement.textContent += css
            }
            return styleElement
        };

        function createStyleElement() {
            var styleElement = document.createElement("style");
            styleElement.setAttribute("type", "text/css");
            return styleElement
        }

        module.exports = insertCss;
        module.exports.insertCss = insertCss
    }, {}]
}, {}, [9]);/*  |xGv00|f093ece89518271b781e6f3c7f6fbdde */