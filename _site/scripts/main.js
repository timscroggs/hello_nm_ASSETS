(function() {
    var t, e, n, i, o, s, r, a, l, u, p, h, c, d, f, m, g, v, w, y, b, x, I, C, k, T, S, P, A, E, M, W, _, D, O, z, L, F, j, R, q, B, N, Q, H, X, U, V, G, Y = [].slice,
        Z = {}.hasOwnProperty,
        K = function(t, e) {
            function n() {
                this.constructor = t
            }
            for (var i in e) Z.call(e, i) && (t[i] = e[i]);
            return n.prototype = e.prototype, t.prototype = new n, t.__super__ = e.prototype, t
        },
        $ = [].indexOf || function(t) {
            for (var e = 0, n = this.length; n > e; e++)
                if (e in this && this[e] === t) return e;
            return -1
        };
    for (b = {
            catchupTime: 100,
            initialRate: .03,
            minTime: 250,
            ghostTime: 100,
            maxProgressPerFrame: 20,
            easeFactor: 1.25,
            startOnPageLoad: !0,
            restartOnPushState: !0,
            restartOnRequestAfter: 500,
            target: "body",
            elements: {
                checkInterval: 100,
                selectors: ["body"]
            },
            eventLag: {
                minSamples: 10,
                sampleCount: 3,
                lagThreshold: 3
            },
            ajax: {
                trackMethods: ["GET"],
                trackWebSockets: !0,
                ignoreURLs: []
            }
        }, A = function() {
            var t;
            return null != (t = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? t : +new Date
        }, M = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, y = window.cancelAnimationFrame || window.mozCancelAnimationFrame, null == M && (M = function(t) {
            return setTimeout(t, 50)
        }, y = function(t) {
            return clearTimeout(t)
        }), _ = function(t) {
            var e, n;
            return e = A(), (n = function() {
                var i;
                return i = A() - e, i >= 33 ? (e = A(), t(i, function() {
                    return M(n)
                })) : setTimeout(n, 33 - i)
            })()
        }, W = function() {
            var t, e, n;
            return n = arguments[0], e = arguments[1], t = 3 <= arguments.length ? Y.call(arguments, 2) : [], "function" == typeof n[e] ? n[e].apply(n, t) : n[e]
        }, x = function() {
            var t, e, n, i, o, s, r;
            for (e = arguments[0], i = 2 <= arguments.length ? Y.call(arguments, 1) : [], s = 0, r = i.length; r > s; s++)
                if (n = i[s])
                    for (t in n) Z.call(n, t) && (o = n[t], null != e[t] && "object" == typeof e[t] && null != o && "object" == typeof o ? x(e[t], o) : e[t] = o);
            return e
        }, g = function(t) {
            var e, n, i, o, s;
            for (n = e = 0, o = 0, s = t.length; s > o; o++) i = t[o], n += Math.abs(i), e++;
            return n / e
        }, C = function(t, e) {
            var n, i, o;
            if (null == t && (t = "options"), null == e && (e = !0), o = document.querySelector("[data-pace-" + t + "]")) {
                if (n = o.getAttribute("data-pace-" + t), !e) return n;
                try {
                    return JSON.parse(n)
                } catch (s) {
                    return i = s, "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", i) : void 0
                }
            }
        }, r = function() {
            function t() {}
            return t.prototype.on = function(t, e, n, i) {
                var o;
                return null == i && (i = !1), null == this.bindings && (this.bindings = {}), null == (o = this.bindings)[t] && (o[t] = []), this.bindings[t].push({
                    handler: e,
                    ctx: n,
                    once: i
                })
            }, t.prototype.once = function(t, e, n) {
                return this.on(t, e, n, !0)
            }, t.prototype.off = function(t, e) {
                var n, i, o;
                if (null != (null != (i = this.bindings) ? i[t] : void 0)) {
                    if (null == e) return delete this.bindings[t];
                    for (n = 0, o = []; n < this.bindings[t].length;) o.push(this.bindings[t][n].handler === e ? this.bindings[t].splice(n, 1) : n++);
                    return o
                }
            }, t.prototype.trigger = function() {
                var t, e, n, i, o, s, r, a, l;
                if (n = arguments[0], t = 2 <= arguments.length ? Y.call(arguments, 1) : [], null != (r = this.bindings) ? r[n] : void 0) {
                    for (o = 0, l = []; o < this.bindings[n].length;) a = this.bindings[n][o], i = a.handler, e = a.ctx, s = a.once, i.apply(null != e ? e : this, t), l.push(s ? this.bindings[n].splice(o, 1) : o++);
                    return l
                }
            }, t
        }(), u = window.Pace || {}, window.Pace = u, x(u, r.prototype), E = u.options = x({}, b, window.paceOptions, C()), U = ["ajax", "document", "eventLag", "elements"], N = 0, H = U.length; H > N; N++) L = U[N], E[L] === !0 && (E[L] = b[L]);
    l = function(t) {
        function e() {
            return V = e.__super__.constructor.apply(this, arguments)
        }
        return K(e, t), e
    }(Error), e = function() {
        function t() {
            this.progress = 0
        }
        return t.prototype.getElement = function() {
            var t;
            if (null == this.el) {
                if (t = document.querySelector(E.target), !t) throw new l;
                this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace(/pace-done/g, ""), document.body.className += " pace-running", this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', null != t.firstChild ? t.insertBefore(this.el, t.firstChild) : t.appendChild(this.el)
            }
            return this.el
        }, t.prototype.finish = function() {
            var t;
            return t = this.getElement(), t.className = t.className.replace("pace-active", ""), t.className += " pace-inactive", document.body.className = document.body.className.replace("pace-running", ""), document.body.className += " pace-done"
        }, t.prototype.update = function(t) {
            return this.progress = t, this.render()
        }, t.prototype.destroy = function() {
            try {
                this.getElement().parentNode.removeChild(this.getElement())
            } catch (t) {
                l = t
            }
            return this.el = void 0
        }, t.prototype.render = function() {
            var t, e, n, i, o, s, r;
            if (null == document.querySelector(E.target)) return !1;
            for (t = this.getElement(), i = "translate3d(" + this.progress + "%, 0, 0)", r = ["webkitTransform", "msTransform", "transform"], o = 0, s = r.length; s > o; o++) e = r[o], t.children[0].style[e] = i;
            return (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (t.children[0].setAttribute("data-progress-text", "" + (0 | this.progress) + "%"), this.progress >= 100 ? n = "99" : (n = this.progress < 10 ? "0" : "", n += 0 | this.progress), t.children[0].setAttribute("data-progress", "" + n)), this.lastRenderedProgress = this.progress
        }, t.prototype.done = function() {
            return this.progress >= 100
        }, t
    }(), a = function() {
        function t() {
            this.bindings = {}
        }
        return t.prototype.trigger = function(t, e) {
            var n, i, o, s, r;
            if (null != this.bindings[t]) {
                for (s = this.bindings[t], r = [], i = 0, o = s.length; o > i; i++) n = s[i], r.push(n.call(this, e));
                return r
            }
        }, t.prototype.on = function(t, e) {
            var n;
            return null == (n = this.bindings)[t] && (n[t] = []), this.bindings[t].push(e)
        }, t
    }(), B = window.XMLHttpRequest, q = window.XDomainRequest, R = window.WebSocket, I = function(t, e) {
        var n, i, o;
        o = [];
        for (i in e.prototype) try {
            o.push(null == t[i] && "function" != typeof e[i] ? "function" == typeof Object.defineProperty ? Object.defineProperty(t, i, {
                get: function() {
                    return e.prototype[i]
                },
                configurable: !0,
                enumerable: !0
            }) : t[i] = e.prototype[i] : void 0)
        } catch (s) {
            n = s
        }
        return o
    }, S = [], u.ignore = function() {
        var t, e, n;
        return e = arguments[0], t = 2 <= arguments.length ? Y.call(arguments, 1) : [], S.unshift("ignore"), n = e.apply(null, t), S.shift(), n
    }, u.track = function() {
        var t, e, n;
        return e = arguments[0], t = 2 <= arguments.length ? Y.call(arguments, 1) : [], S.unshift("track"), n = e.apply(null, t), S.shift(), n
    }, z = function(t) {
        var e;
        if (null == t && (t = "GET"), "track" === S[0]) return "force";
        if (!S.length && E.ajax) {
            if ("socket" === t && E.ajax.trackWebSockets) return !0;
            if (e = t.toUpperCase(), $.call(E.ajax.trackMethods, e) >= 0) return !0
        }
        return !1
    }, p = function(t) {
        function e() {
            var t, n = this;
            e.__super__.constructor.apply(this, arguments), t = function(t) {
                var e;
                return e = t.open, t.open = function(i, o) {
                    return z(i) && n.trigger("request", {
                        type: i,
                        url: o,
                        request: t
                    }), e.apply(t, arguments)
                }
            }, window.XMLHttpRequest = function(e) {
                var n;
                return n = new B(e), t(n), n
            };
            try {
                I(window.XMLHttpRequest, B)
            } catch (i) {}
            if (null != q) {
                window.XDomainRequest = function() {
                    var e;
                    return e = new q, t(e), e
                };
                try {
                    I(window.XDomainRequest, q)
                } catch (i) {}
            }
            if (null != R && E.ajax.trackWebSockets) {
                window.WebSocket = function(t, e) {
                    var i;
                    return i = null != e ? new R(t, e) : new R(t), z("socket") && n.trigger("request", {
                        type: "socket",
                        url: t,
                        protocols: e,
                        request: i
                    }), i
                };
                try {
                    I(window.WebSocket, R)
                } catch (i) {}
            }
        }
        return K(e, t), e
    }(a), Q = null, k = function() {
        return null == Q && (Q = new p), Q
    }, O = function(t) {
        var e, n, i, o;
        for (o = E.ajax.ignoreURLs, n = 0, i = o.length; i > n; n++)
            if (e = o[n], "string" == typeof e) {
                if (-1 !== t.indexOf(e)) return !0
            } else if (e.test(t)) return !0;
        return !1
    }, k().on("request", function(e) {
        var n, i, o, s, r;
        return s = e.type, o = e.request, r = e.url, O(r) ? void 0 : u.running || E.restartOnRequestAfter === !1 && "force" !== z(s) ? void 0 : (i = arguments, n = E.restartOnRequestAfter || 0, "boolean" == typeof n && (n = 0), setTimeout(function() {
            var e, n, r, a, l, p;
            if (e = "socket" === s ? o.readyState < 2 : 0 < (a = o.readyState) && 4 > a) {
                for (u.restart(), l = u.sources, p = [], n = 0, r = l.length; r > n; n++) {
                    if (L = l[n], L instanceof t) {
                        L.watch.apply(L, i);
                        break
                    }
                    p.push(void 0)
                }
                return p
            }
        }, n))
    }), t = function() {
        function t() {
            var t = this;
            this.elements = [], k().on("request", function() {
                return t.watch.apply(t, arguments)
            })
        }
        return t.prototype.watch = function(t) {
            var e, n, i, o;
            return i = t.type, e = t.request, o = t.url, O(o) ? void 0 : (n = "socket" === i ? new d(e) : new f(e), this.elements.push(n))
        }, t
    }(), f = function() {
        function t(t) {
            var e, n, i, o, s, r, a = this;
            if (this.progress = 0, null != window.ProgressEvent)
                for (n = null, t.addEventListener("progress", function(t) {
                        return a.progress = t.lengthComputable ? 100 * t.loaded / t.total : a.progress + (100 - a.progress) / 2
                    }, !1), r = ["load", "abort", "timeout", "error"], i = 0, o = r.length; o > i; i++) e = r[i], t.addEventListener(e, function() {
                    return a.progress = 100
                }, !1);
            else s = t.onreadystatechange, t.onreadystatechange = function() {
                var e;
                return 0 === (e = t.readyState) || 4 === e ? a.progress = 100 : 3 === t.readyState && (a.progress = 50), "function" == typeof s ? s.apply(null, arguments) : void 0
            }
        }
        return t
    }(), d = function() {
        function t(t) {
            var e, n, i, o, s = this;
            for (this.progress = 0, o = ["error", "open"], n = 0, i = o.length; i > n; n++) e = o[n], t.addEventListener(e, function() {
                return s.progress = 100
            }, !1)
        }
        return t
    }(), i = function() {
        function t(t) {
            var e, n, i, s;
            for (null == t && (t = {}), this.elements = [], null == t.selectors && (t.selectors = []), s = t.selectors, n = 0, i = s.length; i > n; n++) e = s[n], this.elements.push(new o(e))
        }
        return t
    }(), o = function() {
        function t(t) {
            this.selector = t, this.progress = 0, this.check()
        }
        return t.prototype.check = function() {
            var t = this;
            return document.querySelector(this.selector) ? this.done() : setTimeout(function() {
                return t.check()
            }, E.elements.checkInterval)
        }, t.prototype.done = function() {
            return this.progress = 100
        }, t
    }(), n = function() {
        function t() {
            var t, e, n = this;
            this.progress = null != (e = this.states[document.readyState]) ? e : 100, t = document.onreadystatechange, document.onreadystatechange = function() {
                return null != n.states[document.readyState] && (n.progress = n.states[document.readyState]), "function" == typeof t ? t.apply(null, arguments) : void 0
            }
        }
        return t.prototype.states = {
            loading: 0,
            interactive: 50,
            complete: 100
        }, t
    }(), s = function() {
        function t() {
            var t, e, n, i, o, s = this;
            this.progress = 0, t = 0, o = [], i = 0, n = A(), e = setInterval(function() {
                var r;
                return r = A() - n - 50, n = A(), o.push(r), o.length > E.eventLag.sampleCount && o.shift(), t = g(o), ++i >= E.eventLag.minSamples && t < E.eventLag.lagThreshold ? (s.progress = 100, clearInterval(e)) : s.progress = 100 * (3 / (t + 3))
            }, 50)
        }
        return t
    }(), c = function() {
        function t(t) {
            this.source = t, this.last = this.sinceLastUpdate = 0, this.rate = E.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = W(this.source, "progress"))
        }
        return t.prototype.tick = function(t, e) {
            var n;
            return null == e && (e = W(this.source, "progress")), e >= 100 && (this.done = !0), e === this.last ? this.sinceLastUpdate += t : (this.sinceLastUpdate && (this.rate = (e - this.last) / this.sinceLastUpdate), this.catchup = (e - this.progress) / E.catchupTime, this.sinceLastUpdate = 0, this.last = e), e > this.progress && (this.progress += this.catchup * t), n = 1 - Math.pow(this.progress / 100, E.easeFactor), this.progress += n * this.rate * t, this.progress = Math.min(this.lastProgress + E.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress
        }, t
    }(), F = null, D = null, v = null, j = null, m = null, w = null, u.running = !1, T = function() {
        return E.restartOnPushState ? u.restart() : void 0
    }, null != window.history.pushState && (X = window.history.pushState, window.history.pushState = function() {
        return T(), X.apply(window.history, arguments)
    }), null != window.history.replaceState && (G = window.history.replaceState, window.history.replaceState = function() {
        return T(), G.apply(window.history, arguments)
    }), h = {
        ajax: t,
        elements: i,
        document: n,
        eventLag: s
    }, (P = function() {
        var t, n, i, o, s, r, a, l;
        for (u.sources = F = [], r = ["ajax", "elements", "document", "eventLag"], n = 0, o = r.length; o > n; n++) t = r[n], E[t] !== !1 && F.push(new h[t](E[t]));
        for (l = null != (a = E.extraSources) ? a : [], i = 0, s = l.length; s > i; i++) L = l[i], F.push(new L(E));
        return u.bar = v = new e, D = [], j = new c
    })(), u.stop = function() {
        return u.trigger("stop"), u.running = !1, v.destroy(), w = !0, null != m && ("function" == typeof y && y(m), m = null), P()
    }, u.restart = function() {
        return u.trigger("restart"), u.stop(), u.start()
    }, u.go = function() {
        var t;
        return u.running = !0, v.render(), t = A(), w = !1, m = _(function(e, n) {
            var i, o, s, r, a, l, p, h, d, f, m, g, y, b, x, I;
            for (h = 100 - v.progress, o = m = 0, s = !0, l = g = 0, b = F.length; b > g; l = ++g)
                for (L = F[l], f = null != D[l] ? D[l] : D[l] = [], a = null != (I = L.elements) ? I : [L], p = y = 0, x = a.length; x > y; p = ++y) r = a[p], d = null != f[p] ? f[p] : f[p] = new c(r), s &= d.done, d.done || (o++, m += d.tick(e));
            return i = m / o, v.update(j.tick(e, i)), v.done() || s || w ? (v.update(100), u.trigger("done"), setTimeout(function() {
                return v.finish(), u.running = !1, u.trigger("hide")
            }, Math.max(E.ghostTime, Math.max(E.minTime - (A() - t), 0)))) : n()
        })
    }, u.start = function(t) {
        x(E, t), u.running = !0;
        try {
            v.render()
        } catch (e) {
            l = e
        }
        return document.querySelector(".pace") ? (u.trigger("start"), u.go()) : setTimeout(u.start, 50)
    }, "function" == typeof define && define.amd ? define(["pace"], function() {
        return u
    }) : "object" == typeof exports ? module.exports = u : E.startOnPageLoad && u.start()
}).call(this);






! function() {
    "use strict";

    function t(i) {
        if (!i) throw new Error("No options passed to Waypoint constructor");
        if (!i.element) throw new Error("No element option passed to Waypoint constructor");
        if (!i.handler) throw new Error("No handler option passed to Waypoint constructor");
        this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, i), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = i.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), n[this.key] = this, e += 1
    }
    var e = 0,
        n = {};
    t.prototype.queueTrigger = function(t) {
        this.group.queueTrigger(this, t)
    }, t.prototype.trigger = function(t) {
        this.enabled && this.callback && this.callback.apply(this, t)
    }, t.prototype.destroy = function() {
        this.context.remove(this), this.group.remove(this), delete n[this.key]
    }, t.prototype.disable = function() {
        return this.enabled = !1, this
    }, t.prototype.enable = function() {
        return this.context.refresh(), this.enabled = !0, this
    }, t.prototype.next = function() {
        return this.group.next(this)
    }, t.prototype.previous = function() {
        return this.group.previous(this)
    }, t.invokeAll = function(t) {
        var e = [];
        for (var i in n) e.push(n[i]);
        for (var o = 0, s = e.length; s > o; o++) e[o][t]()
    }, t.destroyAll = function() {
        t.invokeAll("destroy")
    }, t.disableAll = function() {
        t.invokeAll("disable")
    }, t.enableAll = function() {
        t.invokeAll("enable")
    }, t.refreshAll = function() {
        t.Context.refreshAll()
    }, t.viewportHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight
    }, t.viewportWidth = function() {
        return document.documentElement.clientWidth
    }, t.adapters = [], t.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: "default",
        horizontal: !1,
        offset: 0
    }, t.offsetAliases = {
        "bottom-in-view": function() {
            return this.context.innerHeight() - this.adapter.outerHeight()
        },
        "right-in-view": function() {
            return this.context.innerWidth() - this.adapter.outerWidth()
        }
    }, window.Waypoint = t
}(),
function() {
    "use strict";

    function t(t) {
        window.setTimeout(t, 1e3 / 60)
    }

    function e(t) {
        this.element = t, this.Adapter = o.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + n, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
            x: this.adapter.scrollLeft(),
            y: this.adapter.scrollTop()
        }, this.waypoints = {
            vertical: {},
            horizontal: {}
        }, t.waypointContextKey = this.key, i[t.waypointContextKey] = this, n += 1, this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
    }
    var n = 0,
        i = {},
        o = window.Waypoint,
        s = window.onload;
    e.prototype.add = function(t) {
        var e = t.options.horizontal ? "horizontal" : "vertical";
        this.waypoints[e][t.key] = t, this.refresh()
    }, e.prototype.checkEmpty = function() {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
            e = this.Adapter.isEmptyObject(this.waypoints.vertical);
        t && e && (this.adapter.off(".waypoints"), delete i[this.key])
    }, e.prototype.createThrottledResizeHandler = function() {
        function t() {
            e.handleResize(), e.didResize = !1
        }
        var e = this;
        this.adapter.on("resize.waypoints", function() {
            e.didResize || (e.didResize = !0, o.requestAnimationFrame(t))
        })
    }, e.prototype.createThrottledScrollHandler = function() {
        function t() {
            e.handleScroll(), e.didScroll = !1
        }
        var e = this;
        this.adapter.on("scroll.waypoints", function() {
            (!e.didScroll || o.isTouch) && (e.didScroll = !0, o.requestAnimationFrame(t))
        })
    }, e.prototype.handleResize = function() {
        o.Context.refreshAll()
    }, e.prototype.handleScroll = function() {
        var t = {},
            e = {
                horizontal: {
                    newScroll: this.adapter.scrollLeft(),
                    oldScroll: this.oldScroll.x,
                    forward: "right",
                    backward: "left"
                },
                vertical: {
                    newScroll: this.adapter.scrollTop(),
                    oldScroll: this.oldScroll.y,
                    forward: "down",
                    backward: "up"
                }
            };
        for (var n in e) {
            var i = e[n],
                o = i.newScroll > i.oldScroll,
                s = o ? i.forward : i.backward;
            for (var r in this.waypoints[n]) {
                var a = this.waypoints[n][r],
                    l = i.oldScroll < a.triggerPoint,
                    u = i.newScroll >= a.triggerPoint,
                    p = l && u,
                    h = !l && !u;
                (p || h) && (a.queueTrigger(s), t[a.group.id] = a.group)
            }
        }
        for (var c in t) t[c].flushTriggers();
        this.oldScroll = {
            x: e.horizontal.newScroll,
            y: e.vertical.newScroll
        }
    }, e.prototype.innerHeight = function() {
        return this.element == this.element.window ? o.viewportHeight() : this.adapter.innerHeight()
    }, e.prototype.remove = function(t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty()
    }, e.prototype.innerWidth = function() {
        return this.element == this.element.window ? o.viewportWidth() : this.adapter.innerWidth()
    }, e.prototype.destroy = function() {
        var t = [];
        for (var e in this.waypoints)
            for (var n in this.waypoints[e]) t.push(this.waypoints[e][n]);
        for (var i = 0, o = t.length; o > i; i++) t[i].destroy()
    }, e.prototype.refresh = function() {
        var t, e = this.element == this.element.window,
            n = e ? void 0 : this.adapter.offset(),
            i = {};
        this.handleScroll(), t = {
            horizontal: {
                contextOffset: e ? 0 : n.left,
                contextScroll: e ? 0 : this.oldScroll.x,
                contextDimension: this.innerWidth(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left",
                offsetProp: "left"
            },
            vertical: {
                contextOffset: e ? 0 : n.top,
                contextScroll: e ? 0 : this.oldScroll.y,
                contextDimension: this.innerHeight(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up",
                offsetProp: "top"
            }
        };
        for (var s in t) {
            var r = t[s];
            for (var a in this.waypoints[s]) {
                var l, u, p, h, c, d = this.waypoints[s][a],
                    f = d.options.offset,
                    m = d.triggerPoint,
                    g = 0,
                    v = null == m;
                d.element !== d.element.window && (g = d.adapter.offset()[r.offsetProp]), "function" == typeof f ? f = f.apply(d) : "string" == typeof f && (f = parseFloat(f), d.options.offset.indexOf("%") > -1 && (f = Math.ceil(r.contextDimension * f / 100))), l = r.contextScroll - r.contextOffset, d.triggerPoint = g + l - f, u = m < r.oldScroll, p = d.triggerPoint >= r.oldScroll, h = u && p, c = !u && !p, !v && h ? (d.queueTrigger(r.backward), i[d.group.id] = d.group) : !v && c ? (d.queueTrigger(r.forward), i[d.group.id] = d.group) : v && r.oldScroll >= d.triggerPoint && (d.queueTrigger(r.forward), i[d.group.id] = d.group)
            }
        }
        return o.requestAnimationFrame(function() {
            for (var t in i) i[t].flushTriggers()
        }), this
    }, e.findOrCreateByElement = function(t) {
        return e.findByElement(t) || new e(t)
    }, e.refreshAll = function() {
        for (var t in i) i[t].refresh()
    }, e.findByElement = function(t) {
        return i[t.waypointContextKey]
    }, window.onload = function() {
        s && s(), e.refreshAll()
    }, o.requestAnimationFrame = function(e) {
        var n = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
        n.call(window, e)
    }, o.Context = e
}(),
function() {
    "use strict";

    function t(t, e) {
        return t.triggerPoint - e.triggerPoint
    }

    function e(t, e) {
        return e.triggerPoint - t.triggerPoint
    }

    function n(t) {
        this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), i[this.axis][this.name] = this
    }
    var i = {
            vertical: {},
            horizontal: {}
        },
        o = window.Waypoint;
    n.prototype.add = function(t) {
        this.waypoints.push(t)
    }, n.prototype.clearTriggerQueues = function() {
        this.triggerQueues = {
            up: [],
            down: [],
            left: [],
            right: []
        }
    }, n.prototype.flushTriggers = function() {
        for (var n in this.triggerQueues) {
            var i = this.triggerQueues[n],
                o = "up" === n || "left" === n;
            i.sort(o ? e : t);
            for (var s = 0, r = i.length; r > s; s += 1) {
                var a = i[s];
                (a.options.continuous || s === i.length - 1) && a.trigger([n])
            }
        }
        this.clearTriggerQueues()
    }, n.prototype.next = function(e) {
        this.waypoints.sort(t);
        var n = o.Adapter.inArray(e, this.waypoints),
            i = n === this.waypoints.length - 1;
        return i ? null : this.waypoints[n + 1]
    }, n.prototype.previous = function(e) {
        this.waypoints.sort(t);
        var n = o.Adapter.inArray(e, this.waypoints);
        return n ? this.waypoints[n - 1] : null
    }, n.prototype.queueTrigger = function(t, e) {
        this.triggerQueues[e].push(t)
    }, n.prototype.remove = function(t) {
        var e = o.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1)
    }, n.prototype.first = function() {
        return this.waypoints[0]
    }, n.prototype.last = function() {
        return this.waypoints[this.waypoints.length - 1]
    }, n.findOrCreate = function(t) {
        return i[t.axis][t.name] || new n(t)
    }, o.Group = n
}(),
function() {
    "use strict";

    function t(t) {
        this.$element = e(t)
    }
    var e = window.jQuery,
        n = window.Waypoint;
    e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(e, n) {
        t.prototype[n] = function() {
            var t = Array.prototype.slice.call(arguments);
            return this.$element[n].apply(this.$element, t)
        }
    }), e.each(["extend", "inArray", "isEmptyObject"], function(n, i) {
        t[i] = e[i]
    }), n.adapters.push({
        name: "jquery",
        Adapter: t
    }), n.Adapter = t
}(),
function() {
    "use strict";

    function t(t) {
        return function() {
            var n = [],
                i = arguments[0];
            return t.isFunction(arguments[0]) && (i = t.extend({}, arguments[1]), i.handler = arguments[0]), this.each(function() {
                var o = t.extend({}, i, {
                    element: this
                });
                "string" == typeof o.context && (o.context = t(this).closest(o.context)[0]), n.push(new e(o))
            }), n
        }
    }
    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
}(), ! function() {
    "use strict";

    function t() {}

    function e(t) {
        this.options = n.Adapter.extend({}, e.defaults, t), this.axis = this.options.horizontal ? "horizontal" : "vertical", this.waypoints = [], this.element = this.options.element, this.createWaypoints()
    }
    var n = window.Waypoint;
    e.prototype.createWaypoints = function() {
        for (var t = {
                vertical: [{
                    down: "enter",
                    up: "exited",
                    offset: "100%"
                }, {
                    down: "entered",
                    up: "exit",
                    offset: "bottom-in-view"
                }, {
                    down: "exit",
                    up: "entered",
                    offset: 0
                }, {
                    down: "exited",
                    up: "enter",
                    offset: function() {
                        return -this.adapter.outerHeight()
                    }
                }],
                horizontal: [{
                    right: "enter",
                    left: "exited",
                    offset: "100%"
                }, {
                    right: "entered",
                    left: "exit",
                    offset: "right-in-view"
                }, {
                    right: "exit",
                    left: "entered",
                    offset: 0
                }, {
                    right: "exited",
                    left: "enter",
                    offset: function() {
                        return -this.adapter.outerWidth()
                    }
                }]
            }, e = 0, n = t[this.axis].length; n > e; e++) {
            var i = t[this.axis][e];
            this.createWaypoint(i)
        }
    }, e.prototype.createWaypoint = function(t) {
        var e = this;
        this.waypoints.push(new n({
            context: this.options.context,
            element: this.options.element,
            enabled: this.options.enabled,
            handler: function(t) {
                return function(n) {
                    e.options[t[n]].call(e, n)
                }
            }(t),
            offset: t.offset,
            horizontal: this.options.horizontal
        }))
    }, e.prototype.destroy = function() {
        for (var t = 0, e = this.waypoints.length; e > t; t++) this.waypoints[t].destroy();
        this.waypoints = []
    }, e.prototype.disable = function() {
        for (var t = 0, e = this.waypoints.length; e > t; t++) this.waypoints[t].disable()
    }, e.prototype.enable = function() {
        for (var t = 0, e = this.waypoints.length; e > t; t++) this.waypoints[t].enable()
    }, e.defaults = {
        context: window,
        enabled: !0,
        enter: t,
        entered: t,
        exit: t,
        exited: t
    }, n.Inview = e
}(), ! function() {
    "use strict";

    function t(i) {
        this.options = e.extend({}, n.defaults, t.defaults, i), this.element = this.options.element, this.$element = e(this.element), this.createWrapper(), this.createWaypoint()
    }
    var e = window.jQuery,
        n = window.Waypoint;
    t.prototype.createWaypoint = function() {
        var t = this.options.handler;
        this.waypoint = new n(e.extend({}, this.options, {
            element: this.wrapper,
            handler: e.proxy(function(e) {
                var n = this.options.direction.indexOf(e) > -1,
                    i = n ? this.$element.outerHeight(!0) : "";
                this.$wrapper.height(i), this.$element.toggleClass(this.options.stuckClass, n), t && t.call(this, e)
            }, this)
        }))
    }, t.prototype.createWrapper = function() {
        this.options.wrapper && this.$element.wrap(this.options.wrapper), this.$wrapper = this.$element.parent(), this.wrapper = this.$wrapper[0]
    }, t.prototype.destroy = function() {
        this.$element.parent()[0] === this.wrapper && (this.waypoint.destroy(), this.$element.removeClass(this.options.stuckClass), this.options.wrapper && this.$element.unwrap())
    }, t.defaults = {
        wrapper: '<div class="sticky-wrapper" />',
        stuckClass: "stuck",
        direction: "down right"
    }, n.Sticky = t
}(),
    
    
    
    
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof module && module.exports ? require("jquery") : jQuery)
}(function(t) {
    function e(t) {
        return t.replace(/(:|\.|\/)/g, "\\$1")
    }
    var n = "1.5.6",
        i = {},
        o = {
            exclude: [],
            excludeWithin: [],
            offset: 0,
            direction: "top",
            scrollElement: null,
            scrollTarget: null,
            beforeScroll: function() {},
            afterScroll: function() {},
            easing: "swing",
            speed: 400,
            autoCoefficient: 2,
            preventDefault: !0
        },
        s = function(e) {
            var n = [],
                i = !1,
                o = e.dir && "left" === e.dir ? "scrollLeft" : "scrollTop";
            return this.each(function() {
                var e = t(this);
                return this !== document && this !== window ? !document.scrollingElement || this !== document.documentElement && this !== document.body ? void(e[o]() > 0 ? n.push(this) : (e[o](1),
                    i = e[o]() > 0, i && n.push(this), e[o](0))) : (n.push(document.scrollingElement), !1) : void 0
            }), n.length || this.each(function() {
                "BODY" === this.nodeName && (n = [this])
            }), "first" === e.el && n.length > 1 && (n = [n[0]]), n
        };
    t.fn.extend({
        scrollable: function(t) {
            var e = s.call(this, {
                dir: t
            });
            return this.pushStack(e)
        },
        firstScrollable: function(t) {
            var e = s.call(this, {
                el: "first",
                dir: t
            });
            return this.pushStack(e)
        },
        smoothScroll: function(n, i) {
            if (n = n || {}, "options" === n) return i ? this.each(function() {
                var e = t(this),
                    n = t.extend(e.data("ssOpts") || {}, i);
                t(this).data("ssOpts", n)
            }) : this.first().data("ssOpts");
            var o = t.extend({}, t.fn.smoothScroll.defaults, n),
                s = t.smoothScroll.filterPath(location.pathname);
            return this.unbind("click.smoothscroll").bind("click.smoothscroll", function(n) {
                var i = this,
                    r = t(this),
                    a = t.extend({}, o, r.data("ssOpts") || {}),
                    l = o.exclude,
                    u = a.excludeWithin,
                    p = 0,
                    h = 0,
                    c = !0,
                    d = {},
                    f = location.hostname === i.hostname || !i.hostname,
                    m = a.scrollTarget || t.smoothScroll.filterPath(i.pathname) === s,
                    g = e(i.hash);
                if (a.scrollTarget || f && m && g) {
                    for (; c && l.length > p;) r.is(e(l[p++])) && (c = !1);
                    for (; c && u.length > h;) r.closest(u[h++]).length && (c = !1)
                } else c = !1;
                c && (a.preventDefault && n.preventDefault(), t.extend(d, a, {
                    scrollTarget: a.scrollTarget || g,
                    link: i
                }), t.smoothScroll(d))
            }), this
        }
    }), t.smoothScroll = function(e, n) {
        if ("options" === e && "object" == typeof n) return t.extend(i, n);
        var o, s, r, a, l, u = 0,
            p = "offset",
            h = "scrollTop",
            c = {},
            d = {};
        "number" == typeof e ? (o = t.extend({
            link: null
        }, t.fn.smoothScroll.defaults, i), r = e) : (o = t.extend({
            link: null
        }, t.fn.smoothScroll.defaults, e || {}, i), o.scrollElement && (p = "position", "static" === o.scrollElement.css("position") && o.scrollElement.css("position", "relative"))), h = "left" === o.direction ? "scrollLeft" : h, o.scrollElement ? (s = o.scrollElement, /^(?:HTML|BODY)$/.test(s[0].nodeName) || (u = s[h]())) : s = t("html, body").firstScrollable(o.direction), o.beforeScroll.call(s, o), r = "number" == typeof e ? e : n || t(o.scrollTarget)[p]() && t(o.scrollTarget)[p]()[o.direction] || 0, c[h] = r + u + o.offset, a = o.speed, "auto" === a && (l = c[h] - s.scrollTop(), 0 > l && (l *= -1), a = l / o.autoCoefficient), d = {
            duration: a,
            easing: o.easing,
            complete: function() {
                o.afterScroll.call(o.link, o)
            }
        }, o.step && (d.step = o.step), s.length ? s.stop().animate(c, d) : o.afterScroll.call(o.link, o)
    }, t.smoothScroll.version = n, t.smoothScroll.filterPath = function(t) {
        return t = t || "", t.replace(/^\//, "").replace(/(?:index|default).[a-zA-Z]{3,4}$/, "").replace(/\/$/, "")
    }, t.fn.smoothScroll.defaults = o
}), 
    
    
    
    jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        swing: function(t, e, n, i, o) {
            return jQuery.easing[jQuery.easing.def](t, e, n, i, o)
        },
        easeInQuad: function(t, e, n, i, o) {
            return i * (e /= o) * e + n
        },
        easeOutQuad: function(t, e, n, i, o) {
            return -i * (e /= o) * (e - 2) + n
        },
        easeInOutQuad: function(t, e, n, i, o) {
            return (e /= o / 2) < 1 ? i / 2 * e * e + n : -i / 2 * (--e * (e - 2) - 1) + n
        },
        easeInCubic: function(t, e, n, i, o) {
            return i * (e /= o) * e * e + n
        },
        easeOutCubic: function(t, e, n, i, o) {
            return i * ((e = e / o - 1) * e * e + 1) + n
        },
        easeInOutCubic: function(t, e, n, i, o) {
            return (e /= o / 2) < 1 ? i / 2 * e * e * e + n : i / 2 * ((e -= 2) * e * e + 2) + n
        },
        easeInQuart: function(t, e, n, i, o) {
            return i * (e /= o) * e * e * e + n
        },
        easeOutQuart: function(t, e, n, i, o) {
            return -i * ((e = e / o - 1) * e * e * e - 1) + n
        },
        easeInOutQuart: function(t, e, n, i, o) {
            return (e /= o / 2) < 1 ? i / 2 * e * e * e * e + n : -i / 2 * ((e -= 2) * e * e * e - 2) + n
        },
        easeInQuint: function(t, e, n, i, o) {
            return i * (e /= o) * e * e * e * e + n
        },
        easeOutQuint: function(t, e, n, i, o) {
            return i * ((e = e / o - 1) * e * e * e * e + 1) + n
        },
        easeInOutQuint: function(t, e, n, i, o) {
            return (e /= o / 2) < 1 ? i / 2 * e * e * e * e * e + n : i / 2 * ((e -= 2) * e * e * e * e + 2) + n
        },
        easeInSine: function(t, e, n, i, o) {
            return -i * Math.cos(e / o * (Math.PI / 2)) + i + n
        },
        easeOutSine: function(t, e, n, i, o) {
            return i * Math.sin(e / o * (Math.PI / 2)) + n
        },
        easeInOutSine: function(t, e, n, i, o) {
            return -i / 2 * (Math.cos(Math.PI * e / o) - 1) + n
        },
        easeInExpo: function(t, e, n, i, o) {
            return 0 == e ? n : i * Math.pow(2, 10 * (e / o - 1)) + n
        },
        easeOutExpo: function(t, e, n, i, o) {
            return e == o ? n + i : i * (-Math.pow(2, -10 * e / o) + 1) + n
        },
        easeInOutExpo: function(t, e, n, i, o) {
            return 0 == e ? n : e == o ? n + i : (e /= o / 2) < 1 ? i / 2 * Math.pow(2, 10 * (e - 1)) + n : i / 2 * (-Math.pow(2, -10 * --e) + 2) + n
        },
        easeInCirc: function(t, e, n, i, o) {
            return -i * (Math.sqrt(1 - (e /= o) * e) - 1) + n
        },
        easeOutCirc: function(t, e, n, i, o) {
            return i * Math.sqrt(1 - (e = e / o - 1) * e) + n
        },
        easeInOutCirc: function(t, e, n, i, o) {
            return (e /= o / 2) < 1 ? -i / 2 * (Math.sqrt(1 - e * e) - 1) + n : i / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + n
        },
        easeInElastic: function(t, e, n, i, o) {
            var s = 1.70158,
                r = 0,
                a = i;
            if (0 == e) return n;
            if (1 == (e /= o)) return n + i;
            if (r || (r = .3 * o), a < Math.abs(i)) {
                a = i;
                var s = r / 4
            } else var s = r / (2 * Math.PI) * Math.asin(i / a);
            return -(a * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * o - s) * (2 * Math.PI) / r)) + n
        },
        easeOutElastic: function(t, e, n, i, o) {
            var s = 1.70158,
                r = 0,
                a = i;
            if (0 == e) return n;
            if (1 == (e /= o)) return n + i;
            if (r || (r = .3 * o), a < Math.abs(i)) {
                a = i;
                var s = r / 4
            } else var s = r / (2 * Math.PI) * Math.asin(i / a);
            return a * Math.pow(2, -10 * e) * Math.sin((e * o - s) * (2 * Math.PI) / r) + i + n
        },
        easeInOutElastic: function(t, e, n, i, o) {
            var s = 1.70158,
                r = 0,
                a = i;
            if (0 == e) return n;
            if (2 == (e /= o / 2)) return n + i;
            if (r || (r = o * (.3 * 1.5)), a < Math.abs(i)) {
                a = i;
                var s = r / 4
            } else var s = r / (2 * Math.PI) * Math.asin(i / a);
            return 1 > e ? -.5 * (a * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * o - s) * (2 * Math.PI) / r)) + n : a * Math.pow(2, -10 * (e -= 1)) * Math.sin((e * o - s) * (2 * Math.PI) / r) * .5 + i + n
        },
        easeInBack: function(t, e, n, i, o, s) {
            return void 0 == s && (s = 1.70158), i * (e /= o) * e * ((s + 1) * e - s) + n
        },
        easeOutBack: function(t, e, n, i, o, s) {
            return void 0 == s && (s = 1.70158), i * ((e = e / o - 1) * e * ((s + 1) * e + s) + 1) + n
        },
        easeInOutBack: function(t, e, n, i, o, s) {
            return void 0 == s && (s = 1.70158), (e /= o / 2) < 1 ? i / 2 * (e * e * (((s *= 1.525) + 1) * e - s)) + n : i / 2 * ((e -= 2) * e * (((s *= 1.525) + 1) * e + s) + 2) + n
        },
        easeInBounce: function(t, e, n, i, o) {
            return i - jQuery.easing.easeOutBounce(t, o - e, 0, i, o) + n
        },
        easeOutBounce: function(t, e, n, i, o) {
            return (e /= o) < 1 / 2.75 ? i * (7.5625 * e * e) + n : 2 / 2.75 > e ? i * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + n : 2.5 / 2.75 > e ? i * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + n : i * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + n
        },
        easeInOutBounce: function(t, e, n, i, o) {
            return o / 2 > e ? .5 * jQuery.easing.easeInBounce(t, 2 * e, 0, i, o) + n : .5 * jQuery.easing.easeOutBounce(t, 2 * e - o, 0, i, o) + .5 * i + n
        }
    }), 
    
    
    
    "function" != typeof Object.create && (Object.create = function(t) {
        function e() {}
        return e.prototype = t, new e
    }),
    
    
    
    
    function(t, e, n) {
        var i = {
            init: function(e, n) {
                this.$elem = t(n), this.options = t.extend({}, t.fn.owlCarousel.options, this.$elem.data(), e), this.userOptions = e, this.loadContent()
            },
            loadContent: function() {
                function e(t) {
                    var e, i = "";
                    if ("function" == typeof n.options.jsonSuccess) n.options.jsonSuccess.apply(this, [t]);
                    else {
                        for (e in t.owl) t.owl.hasOwnProperty(e) && (i += t.owl[e].item);
                        n.$elem.html(i)
                    }
                    n.logIn()
                }
                var n = this,
                    i;
                "function" == typeof n.options.beforeInit && n.options.beforeInit.apply(this, [n.$elem]), "string" == typeof n.options.jsonPath ? (i = n.options.jsonPath, t.getJSON(i, e)) : n.logIn()
            },
            logIn: function() {
                this.$elem.data("owl-originalStyles", this.$elem.attr("style")), this.$elem.data("owl-originalClasses", this.$elem.attr("class")), this.$elem.css({
                    opacity: 0
                }), this.orignalItems = this.options.items, this.checkBrowser(), this.wrapperWidth = 0, this.checkVisible = null, this.setVars()
            },
            setVars: function() {
                return 0 === this.$elem.children().length ? !1 : (this.baseClass(), this.eventTypes(), this.$userItems = this.$elem.children(), this.itemsAmount = this.$userItems.length, this.wrapItems(), this.$owlItems = this.$elem.find(".owl-item"), this.$owlWrapper = this.$elem.find(".owl-wrapper"), this.playDirection = "next", this.prevItem = 0, this.prevArr = [0], this.currentItem = 0, this.customEvents(), void this.onStartup())
            },
            onStartup: function() {
                this.updateItems(), this.calculateAll(), this.buildControls(), this.updateControls(), this.response(), this.moveEvents(), this.stopOnHover(), this.owlStatus(), !1 !== this.options.transitionStyle && this.transitionTypes(this.options.transitionStyle), !0 === this.options.autoPlay && (this.options.autoPlay = 5e3), this.play(), this.$elem.find(".owl-wrapper").css("display", "block"), this.$elem.is(":visible") ? this.$elem.css("opacity", 1) : this.watchVisibility(), this.onstartup = !1, this.eachMoveUpdate(), "function" == typeof this.options.afterInit && this.options.afterInit.apply(this, [this.$elem])
            },
            eachMoveUpdate: function() {
                !0 === this.options.lazyLoad && this.lazyLoad(), !0 === this.options.autoHeight && this.autoHeight(), this.onVisibleItems(), "function" == typeof this.options.afterAction && this.options.afterAction.apply(this, [this.$elem])
            },
            updateVars: function() {
                "function" == typeof this.options.beforeUpdate && this.options.beforeUpdate.apply(this, [this.$elem]), this.watchVisibility(), this.updateItems(), this.calculateAll(), this.updatePosition(), this.updateControls(), this.eachMoveUpdate(), "function" == typeof this.options.afterUpdate && this.options.afterUpdate.apply(this, [this.$elem])
            },
            reload: function() {
                var t = this;
                e.setTimeout(function() {
                    t.updateVars()
                }, 0)
            },
            watchVisibility: function() {
                var t = this;
                return !1 !== t.$elem.is(":visible") ? !1 : (t.$elem.css({
                    opacity: 0
                }), e.clearInterval(t.autoPlayInterval), e.clearInterval(t.checkVisible), void(t.checkVisible = e.setInterval(function() {
                    t.$elem.is(":visible") && (t.reload(), t.$elem.animate({
                        opacity: 1
                    }, 200), e.clearInterval(t.checkVisible))
                }, 500)))
            },
            wrapItems: function() {
                this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'), this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'), this.wrapperOuter = this.$elem.find(".owl-wrapper-outer"), this.$elem.css("display", "block")
            },
            baseClass: function() {
                var t = this.$elem.hasClass(this.options.baseClass),
                    e = this.$elem.hasClass(this.options.theme);
                t || this.$elem.addClass(this.options.baseClass), e || this.$elem.addClass(this.options.theme)
            },
            updateItems: function() {
                var e, n;
                if (!1 === this.options.responsive) return !1;
                if (!0 === this.options.singleItem) return this.options.items = this.orignalItems = 1, this.options.itemsCustom = !1, this.options.itemsDesktop = !1, this.options.itemsDesktopSmall = !1, this.options.itemsTablet = !1, this.options.itemsTabletSmall = !1, this.options.itemsMobile = !1;
                if (e = t(this.options.responsiveBaseWidth).width(), e > (this.options.itemsDesktop[0] || this.orignalItems) && (this.options.items = this.orignalItems), !1 !== this.options.itemsCustom)
                    for (this.options.itemsCustom.sort(function(t, e) {
                            return t[0] - e[0]
                        }), n = 0; n < this.options.itemsCustom.length; n += 1) this.options.itemsCustom[n][0] <= e && (this.options.items = this.options.itemsCustom[n][1]);
                else e <= this.options.itemsDesktop[0] && !1 !== this.options.itemsDesktop && (this.options.items = this.options.itemsDesktop[1]), e <= this.options.itemsDesktopSmall[0] && !1 !== this.options.itemsDesktopSmall && (this.options.items = this.options.itemsDesktopSmall[1]), e <= this.options.itemsTablet[0] && !1 !== this.options.itemsTablet && (this.options.items = this.options.itemsTablet[1]), e <= this.options.itemsTabletSmall[0] && !1 !== this.options.itemsTabletSmall && (this.options.items = this.options.itemsTabletSmall[1]), e <= this.options.itemsMobile[0] && !1 !== this.options.itemsMobile && (this.options.items = this.options.itemsMobile[1]);
                this.options.items > this.itemsAmount && !0 === this.options.itemsScaleUp && (this.options.items = this.itemsAmount)
            },
            response: function() {
                var n = this,
                    i, o;
                return !0 !== n.options.responsive ? !1 : (o = t(e).width(), n.resizer = function() {
                    t(e).width() !== o && (!1 !== n.options.autoPlay && e.clearInterval(n.autoPlayInterval), e.clearTimeout(i), i = e.setTimeout(function() {
                        o = t(e).width(), n.updateVars()
                    }, n.options.responsiveRefreshRate))
                }, void t(e).resize(n.resizer))
            },
            updatePosition: function() {
                this.jumpTo(this.currentItem), !1 !== this.options.autoPlay && this.checkAp()
            },
            appendItemsSizes: function() {
                var e = this,
                    n = 0,
                    i = e.itemsAmount - e.options.items;
                e.$owlItems.each(function(o) {
                    var s = t(this);
                    s.css({
                        width: e.itemWidth
                    }).data("owl-item", Number(o)), (0 === o % e.options.items || o === i) && (o > i || (n += 1)), s.data("owl-roundPages", n)
                })
            },
            appendWrapperSizes: function() {
                this.$owlWrapper.css({
                    width: this.$owlItems.length * this.itemWidth * 2,
                    left: 0
                }), this.appendItemsSizes()
            },
            calculateAll: function() {
                this.calculateWidth(), this.appendWrapperSizes(), this.loops(), this.max()
            },
            calculateWidth: function() {
                this.itemWidth = Math.round(this.$elem.width() / this.options.items)
            },
            max: function() {
                var t = -1 * (this.itemsAmount * this.itemWidth - this.options.items * this.itemWidth);
                return this.options.items > this.itemsAmount ? this.maximumPixels = t = this.maximumItem = 0 : (this.maximumItem = this.itemsAmount - this.options.items, this.maximumPixels = t), t
            },
            min: function() {
                return 0
            },
            loops: function() {
                var e = 0,
                    n = 0,
                    i, o;
                for (this.positionsInArray = [0], this.pagesInArray = [], i = 0; i < this.itemsAmount; i += 1) n += this.itemWidth, this.positionsInArray.push(-n), !0 === this.options.scrollPerPage && (o = t(this.$owlItems[i]), o = o.data("owl-roundPages"), o !== e && (this.pagesInArray[e] = this.positionsInArray[i], e = o))
            },
            buildControls: function() {
                (!0 === this.options.navigation || !0 === this.options.pagination) && (this.owlControls = t('<div class="owl-controls"/>').toggleClass("clickable", !this.browser.isTouch).appendTo(this.$elem)), !0 === this.options.pagination && this.buildPagination(), !0 === this.options.navigation && this.buildButtons()
            },
            buildButtons: function() {
                var e = this,
                    n = t('<div class="owl-buttons"/>');
                e.owlControls.append(n), e.buttonPrev = t("<div/>", {
                    "class": "owl-prev",
                    html: e.options.navigationText[0] || ""
                }), e.buttonNext = t("<div/>", {
                    "class": "owl-next",
                    html: e.options.navigationText[1] || ""
                }), n.append(e.buttonPrev).append(e.buttonNext), n.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(t) {
                    t.preventDefault()
                }), n.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(n) {
                    n.preventDefault(), t(this).hasClass("owl-next") ? e.next() : e.prev()
                })
            },
            buildPagination: function() {
                var e = this;
                e.paginationWrapper = t('<div class="owl-pagination"/>'), e.owlControls.append(e.paginationWrapper), e.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(n) {
                    n.preventDefault(), Number(t(this).data("owl-page")) !== e.currentItem && e.goTo(Number(t(this).data("owl-page")), !0)
                })
            },
            updatePagination: function() {
                var e, n, i, o, s, r;
                if (!1 === this.options.pagination) return !1;
                for (this.paginationWrapper.html(""), e = 0, n = this.itemsAmount - this.itemsAmount % this.options.items, o = 0; o < this.itemsAmount; o += 1) 0 === o % this.options.items && (e += 1, n === o && (i = this.itemsAmount - this.options.items), s = t("<div/>", {
                    "class": "owl-page"
                }), r = t("<span></span>", {
                    text: !0 === this.options.paginationNumbers ? e : "",
                    "class": !0 === this.options.paginationNumbers ? "owl-numbers" : ""
                }), s.append(r), s.data("owl-page", n === o ? i : o), s.data("owl-roundPages", e), this.paginationWrapper.append(s));
                this.checkPagination()
            },
            checkPagination: function() {
                var e = this;
                return !1 === e.options.pagination ? !1 : void e.paginationWrapper.find(".owl-page").each(function() {
                    t(this).data("owl-roundPages") === t(e.$owlItems[e.currentItem]).data("owl-roundPages") && (e.paginationWrapper.find(".owl-page").removeClass("active"), t(this).addClass("active"))
                })
            },
            checkNavigation: function() {
                return !1 === this.options.navigation ? !1 : void(!1 === this.options.rewindNav && (0 === this.currentItem && 0 === this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.addClass("disabled")) : 0 === this.currentItem && 0 !== this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.removeClass("disabled")) : this.currentItem === this.maximumItem ? (this.buttonPrev.removeClass("disabled"), this.buttonNext.addClass("disabled")) : 0 !== this.currentItem && this.currentItem !== this.maximumItem && (this.buttonPrev.removeClass("disabled"), this.buttonNext.removeClass("disabled"))))
            },
            updateControls: function() {
                this.updatePagination(), this.checkNavigation(), this.owlControls && (this.options.items >= this.itemsAmount ? this.owlControls.hide() : this.owlControls.show())
            },
            destroyControls: function() {
                this.owlControls && this.owlControls.remove()
            },
            next: function(t) {
                if (this.isTransition) return !1;
                if (this.currentItem += !0 === this.options.scrollPerPage ? this.options.items : 1, this.currentItem > this.maximumItem + (!0 === this.options.scrollPerPage ? this.options.items - 1 : 0)) {
                    if (!0 !== this.options.rewindNav) return this.currentItem = this.maximumItem, !1;
                    this.currentItem = 0, t = "rewind"
                }
                this.goTo(this.currentItem, t)
            },
            prev: function(t) {
                if (this.isTransition) return !1;
                if (this.currentItem = !0 === this.options.scrollPerPage && 0 < this.currentItem && this.currentItem < this.options.items ? 0 : this.currentItem - (!0 === this.options.scrollPerPage ? this.options.items : 1), 0 > this.currentItem) {
                    if (!0 !== this.options.rewindNav) return this.currentItem = 0, !1;
                    this.currentItem = this.maximumItem, t = "rewind"
                }
                this.goTo(this.currentItem, t)
            },
            goTo: function(t, n, i) {
                var o = this;
                return o.isTransition ? !1 : ("function" == typeof o.options.beforeMove && o.options.beforeMove.apply(this, [o.$elem]), t >= o.maximumItem ? t = o.maximumItem : 0 >= t && (t = 0), o.currentItem = o.owl.currentItem = t, !1 !== o.options.transitionStyle && "drag" !== i && 1 === o.options.items && !0 === o.browser.support3d ? (o.swapSpeed(0), !0 === o.browser.support3d ? o.transition3d(o.positionsInArray[t]) : o.css2slide(o.positionsInArray[t], 1), o.afterGo(), o.singleItemTransition(), !1) : (t = o.positionsInArray[t], !0 === o.browser.support3d ? (o.isCss3Finish = !1, !0 === n ? (o.swapSpeed("paginationSpeed"), e.setTimeout(function() {
                    o.isCss3Finish = !0
                }, o.options.paginationSpeed)) : "rewind" === n ? (o.swapSpeed(o.options.rewindSpeed), e.setTimeout(function() {
                    o.isCss3Finish = !0
                }, o.options.rewindSpeed)) : (o.swapSpeed("slideSpeed"), e.setTimeout(function() {
                    o.isCss3Finish = !0
                }, o.options.slideSpeed)), o.transition3d(t)) : !0 === n ? o.css2slide(t, o.options.paginationSpeed) : "rewind" === n ? o.css2slide(t, o.options.rewindSpeed) : o.css2slide(t, o.options.slideSpeed), void o.afterGo()))
            },
            jumpTo: function(t) {
                "function" == typeof this.options.beforeMove && this.options.beforeMove.apply(this, [this.$elem]), t >= this.maximumItem || -1 === t ? t = this.maximumItem : 0 >= t && (t = 0), this.swapSpeed(0), !0 === this.browser.support3d ? this.transition3d(this.positionsInArray[t]) : this.css2slide(this.positionsInArray[t], 1), this.currentItem = this.owl.currentItem = t, this.afterGo()
            },
            afterGo: function() {
                this.prevArr.push(this.currentItem), this.prevItem = this.owl.prevItem = this.prevArr[this.prevArr.length - 2], this.prevArr.shift(0), this.prevItem !== this.currentItem && (this.checkPagination(), this.checkNavigation(), this.eachMoveUpdate(), !1 !== this.options.autoPlay && this.checkAp()), "function" == typeof this.options.afterMove && this.prevItem !== this.currentItem && this.options.afterMove.apply(this, [this.$elem])
            },
            stop: function() {
                this.apStatus = "stop", e.clearInterval(this.autoPlayInterval)
            },
            checkAp: function() {
                "stop" !== this.apStatus && this.play()
            },
            play: function() {
                var t = this;
                return t.apStatus = "play", !1 === t.options.autoPlay ? !1 : (e.clearInterval(t.autoPlayInterval), void(t.autoPlayInterval = e.setInterval(function() {
                    t.next(!0)
                }, t.options.autoPlay)))
            },
            swapSpeed: function(t) {
                "slideSpeed" === t ? this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)) : "paginationSpeed" === t ? this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)) : "string" != typeof t && this.$owlWrapper.css(this.addCssSpeed(t))
            },
            addCssSpeed: function(t) {
                return {
                    "-webkit-transition": "all " + t + "ms ease",
                    "-moz-transition": "all " + t + "ms ease",
                    "-o-transition": "all " + t + "ms ease",
                    transition: "all " + t + "ms ease"
                }
            },
            removeTransition: function() {
                return {
                    "-webkit-transition": "",
                    "-moz-transition": "",
                    "-o-transition": "",
                    transition: ""
                }
            },
            doTranslate: function(t) {
                return {
                    "-webkit-transform": "translate3d(" + t + "px, 0px, 0px)",
                    "-moz-transform": "translate3d(" + t + "px, 0px, 0px)",
                    "-o-transform": "translate3d(" + t + "px, 0px, 0px)",
                    "-ms-transform": "translate3d(" + t + "px, 0px, 0px)",
                    transform: "translate3d(" + t + "px, 0px,0px)"
                }
            },
            transition3d: function(t) {
                this.$owlWrapper.css(this.doTranslate(t))
            },
            css2move: function(t) {
                this.$owlWrapper.css({
                    left: t
                })
            },
            css2slide: function(t, e) {
                var n = this;
                n.isCssFinish = !1, n.$owlWrapper.stop(!0, !0).animate({
                    left: t
                }, {
                    duration: e || n.options.slideSpeed,
                    complete: function() {
                        n.isCssFinish = !0
                    }
                })
            },
            checkBrowser: function() {
                var t = n.createElement("div");
                t.style.cssText = "  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)", t = t.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g), this.browser = {
                    support3d: null !== t && 1 === t.length,
                    isTouch: "ontouchstart" in e || e.navigator.msMaxTouchPoints
                }
            },
            moveEvents: function() {
                (!1 !== this.options.mouseDrag || !1 !== this.options.touchDrag) && (this.gestures(), this.disabledEvents())
            },
            eventTypes: function() {
                var t = ["s", "e", "x"];
                this.ev_types = {}, !0 === this.options.mouseDrag && !0 === this.options.touchDrag ? t = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] : !1 === this.options.mouseDrag && !0 === this.options.touchDrag ? t = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : !0 === this.options.mouseDrag && !1 === this.options.touchDrag && (t = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]), this.ev_types.start = t[0], this.ev_types.move = t[1], this.ev_types.end = t[2]
            },
            disabledEvents: function() {
                this.$elem.on("dragstart.owl", function(t) {
                    t.preventDefault()
                }), this.$elem.on("mousedown.disableTextSelect", function(e) {
                    return t(e.target).is("input, textarea, select, option")
                })
            },
            gestures: function() {
                function i(t) {
                    if (void 0 !== t.touches) return {
                        x: t.touches[0].pageX,
                        y: t.touches[0].pageY
                    };
                    if (void 0 === t.touches) {
                        if (void 0 !== t.pageX) return {
                            x: t.pageX,
                            y: t.pageY
                        };
                        if (void 0 === t.pageX) return {
                            x: t.clientX,
                            y: t.clientY
                        }
                    }
                }

                function o(e) {
                    "on" === e ? (t(n).on(a.ev_types.move, s), t(n).on(a.ev_types.end, r)) : "off" === e && (t(n).off(a.ev_types.move), t(n).off(a.ev_types.end))
                }

                function s(o) {
                    o = o.originalEvent || o || e.event, a.newPosX = i(o).x - l.offsetX, a.newPosY = i(o).y - l.offsetY, a.newRelativeX = a.newPosX - l.relativePos, "function" == typeof a.options.startDragging && !0 !== l.dragging && 0 !== a.newRelativeX && (l.dragging = !0, a.options.startDragging.apply(a, [a.$elem])), (8 < a.newRelativeX || -8 > a.newRelativeX) && !0 === a.browser.isTouch && (void 0 !== o.preventDefault ? o.preventDefault() : o.returnValue = !1, l.sliding = !0), (10 < a.newPosY || -10 > a.newPosY) && !1 === l.sliding && t(n).off("touchmove.owl"), a.newPosX = Math.max(Math.min(a.newPosX, a.newRelativeX / 5), a.maximumPixels + a.newRelativeX / 5), !0 === a.browser.support3d ? a.transition3d(a.newPosX) : a.css2move(a.newPosX)
                }

                function r(n) {
                    n = n.originalEvent || n || e.event;
                    var i;
                    n.target = n.target || n.srcElement, l.dragging = !1, !0 !== a.browser.isTouch && a.$owlWrapper.removeClass("grabbing"), a.dragDirection = 0 > a.newRelativeX ? a.owl.dragDirection = "left" : a.owl.dragDirection = "right", 0 !== a.newRelativeX && (i = a.getNewPosition(), a.goTo(i, !1, "drag"), l.targetElement === n.target && !0 !== a.browser.isTouch && (t(n.target).on("click.disable", function(e) {
                        e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault(), t(e.target).off("click.disable")
                    }), n = t._data(n.target, "events").click, i = n.pop(), n.splice(0, 0, i))), o("off")
                }
                var a = this,
                    l = {
                        offsetX: 0,
                        offsetY: 0,
                        baseElWidth: 0,
                        relativePos: 0,
                        position: null,
                        minSwipe: null,
                        maxSwipe: null,
                        sliding: null,
                        dargging: null,
                        targetElement: null
                    };
                a.isCssFinish = !0, a.$elem.on(a.ev_types.start, ".owl-wrapper", function(n) {
                    n = n.originalEvent || n || e.event;
                    var s;
                    if (3 === n.which) return !1;
                    if (!(a.itemsAmount <= a.options.items)) {
                        if (!1 === a.isCssFinish && !a.options.dragBeforeAnimFinish || !1 === a.isCss3Finish && !a.options.dragBeforeAnimFinish) return !1;
                        !1 !== a.options.autoPlay && e.clearInterval(a.autoPlayInterval), !0 === a.browser.isTouch || a.$owlWrapper.hasClass("grabbing") || a.$owlWrapper.addClass("grabbing"), a.newPosX = 0, a.newRelativeX = 0, t(this).css(a.removeTransition()), s = t(this).position(), l.relativePos = s.left, l.offsetX = i(n).x - s.left, l.offsetY = i(n).y - s.top, o("on"), l.sliding = !1, l.targetElement = n.target || n.srcElement
                    }
                })
            },
            getNewPosition: function() {
                var t = this.closestItem();
                return t > this.maximumItem ? t = this.currentItem = this.maximumItem : 0 <= this.newPosX && (this.currentItem = t = 0), t
            },
            closestItem: function() {
                var e = this,
                    n = !0 === e.options.scrollPerPage ? e.pagesInArray : e.positionsInArray,
                    i = e.newPosX,
                    o = null;
                return t.each(n, function(s, r) {
                    i - e.itemWidth / 20 > n[s + 1] && i - e.itemWidth / 20 < r && "left" === e.moveDirection() ? (o = r, e.currentItem = !0 === e.options.scrollPerPage ? t.inArray(o, e.positionsInArray) : s) : i + e.itemWidth / 20 < r && i + e.itemWidth / 20 > (n[s + 1] || n[s] - e.itemWidth) && "right" === e.moveDirection() && (!0 === e.options.scrollPerPage ? (o = n[s + 1] || n[n.length - 1], e.currentItem = t.inArray(o, e.positionsInArray)) : (o = n[s + 1], e.currentItem = s + 1))
                }), e.currentItem
            },
            moveDirection: function() {
                var t;
                return 0 > this.newRelativeX ? (t = "right", this.playDirection = "next") : (t = "left", this.playDirection = "prev"), t
            },
            customEvents: function() {
                var t = this;
                t.$elem.on("owl.next", function() {
                    t.next()
                }), t.$elem.on("owl.prev", function() {
                    t.prev()
                }), t.$elem.on("owl.play", function(e, n) {
                    t.options.autoPlay = n, t.play(), t.hoverStatus = "play"
                }), t.$elem.on("owl.stop", function() {
                    t.stop(), t.hoverStatus = "stop"
                }), t.$elem.on("owl.goTo", function(e, n) {
                    t.goTo(n)
                }), t.$elem.on("owl.jumpTo", function(e, n) {
                    t.jumpTo(n)
                })
            },
            stopOnHover: function() {
                var t = this;
                !0 === t.options.stopOnHover && !0 !== t.browser.isTouch && !1 !== t.options.autoPlay && (t.$elem.on("mouseover", function() {
                    t.stop()
                }), t.$elem.on("mouseout", function() {
                    "stop" !== t.hoverStatus && t.play()
                }))
            },
            lazyLoad: function() {
                var e, n, i, o, s;
                if (!1 === this.options.lazyLoad) return !1;
                for (e = 0; e < this.itemsAmount; e += 1) n = t(this.$owlItems[e]), "loaded" !== n.data("owl-loaded") && (i = n.data("owl-item"), o = n.find(".lazyOwl"), "string" != typeof o.data("src") ? n.data("owl-loaded", "loaded") : (void 0 === n.data("owl-loaded") && (o.hide(), n.addClass("loading").data("owl-loaded", "checked")), (s = !0 === this.options.lazyFollow ? i >= this.currentItem : !0) && i < this.currentItem + this.options.items && o.length && this.lazyPreload(n, o)))
            },
            lazyPreload: function(t, n) {
                function i() {
                    t.data("owl-loaded", "loaded").removeClass("loading"), n.removeAttr("data-src"), "fade" === s.options.lazyEffect ? n.fadeIn(400) : n.show(), "function" == typeof s.options.afterLazyLoad && s.options.afterLazyLoad.apply(this, [s.$elem])
                }

                function o() {
                    r += 1, s.completeImg(n.get(0)) || !0 === a ? i() : 100 >= r ? e.setTimeout(o, 100) : i()
                }
                var s = this,
                    r = 0,
                    a;
                "DIV" === n.prop("tagName") ? (n.css("background-image", "url(" + n.data("src") + ")"), a = !0) : n[0].src = n.data("src"), o()
            },
            autoHeight: function() {
                function n() {
                    var n = t(o.$owlItems[o.currentItem]).height();
                    o.wrapperOuter.css("height", n + "px"), o.wrapperOuter.hasClass("autoHeight") || e.setTimeout(function() {
                        o.wrapperOuter.addClass("autoHeight")
                    }, 0)
                }

                function i() {
                    r += 1, o.completeImg(s.get(0)) ? n() : 100 >= r ? e.setTimeout(i, 100) : o.wrapperOuter.css("height", "")
                }
                var o = this,
                    s = t(o.$owlItems[o.currentItem]).find("img"),
                    r;
                void 0 !== s.get(0) ? (r = 0, i()) : n()
            },
            completeImg: function(t) {
                return !t.complete || "undefined" != typeof t.naturalWidth && 0 === t.naturalWidth ? !1 : !0
            },
            onVisibleItems: function() {
                var e;
                for (!0 === this.options.addClassActive && this.$owlItems.removeClass("active"), this.visibleItems = [], e = this.currentItem; e < this.currentItem + this.options.items; e += 1) this.visibleItems.push(e), !0 === this.options.addClassActive && t(this.$owlItems[e]).addClass("active");
                this.owl.visibleItems = this.visibleItems
            },
            transitionTypes: function(t) {
                this.outClass = "owl-" + t + "-out", this.inClass = "owl-" + t + "-in"
            },
            singleItemTransition: function() {
                var t = this,
                    e = t.outClass,
                    n = t.inClass,
                    i = t.$owlItems.eq(t.currentItem),
                    o = t.$owlItems.eq(t.prevItem),
                    s = Math.abs(t.positionsInArray[t.currentItem]) + t.positionsInArray[t.prevItem],
                    r = Math.abs(t.positionsInArray[t.currentItem]) + t.itemWidth / 2;
                t.isTransition = !0, t.$owlWrapper.addClass("owl-origin").css({
                    "-webkit-transform-origin": r + "px",
                    "-moz-perspective-origin": r + "px",
                    "perspective-origin": r + "px"
                }), o.css({
                    position: "relative",
                    left: s + "px"
                }).addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function() {
                    t.endPrev = !0, o.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"), t.clearTransStyle(o, e)
                }), i.addClass(n).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function() {
                    t.endCurrent = !0, i.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"), t.clearTransStyle(i, n)
                })
            },
            clearTransStyle: function(t, e) {
                t.css({
                    position: "",
                    left: ""
                }).removeClass(e), this.endPrev && this.endCurrent && (this.$owlWrapper.removeClass("owl-origin"), this.isTransition = this.endCurrent = this.endPrev = !1)
            },
            owlStatus: function() {
                this.owl = {
                    userOptions: this.userOptions,
                    baseElement: this.$elem,
                    userItems: this.$userItems,
                    owlItems: this.$owlItems,
                    currentItem: this.currentItem,
                    prevItem: this.prevItem,
                    visibleItems: this.visibleItems,
                    isTouch: this.browser.isTouch,
                    browser: this.browser,
                    dragDirection: this.dragDirection
                }
            },
            clearEvents: function() {
                this.$elem.off(".owl owl mousedown.disableTextSelect"), t(n).off(".owl owl"), t(e).off("resize", this.resizer)
            },
            unWrap: function() {
                0 !== this.$elem.children().length && (this.$owlWrapper.unwrap(), this.$userItems.unwrap().unwrap(), this.owlControls && this.owlControls.remove()), this.clearEvents(), this.$elem.attr("style", this.$elem.data("owl-originalStyles") || "").attr("class", this.$elem.data("owl-originalClasses"))
            },
            destroy: function() {
                this.stop(), e.clearInterval(this.checkVisible), this.unWrap(), this.$elem.removeData()
            },
            reinit: function(e) {
                e = t.extend({}, this.userOptions, e), this.unWrap(), this.init(e, this.$elem)
            },
            addItem: function(t, e) {
                var n;
                return t ? 0 === this.$elem.children().length ? (this.$elem.append(t), this.setVars(), !1) : (this.unWrap(), n = void 0 === e || -1 === e ? -1 : e, n >= this.$userItems.length || -1 === n ? this.$userItems.eq(-1).after(t) : this.$userItems.eq(n).before(t), void this.setVars()) : !1
            },
            removeItem: function(t) {
                return 0 === this.$elem.children().length ? !1 : (t = void 0 === t || -1 === t ? -1 : t, this.unWrap(), this.$userItems.eq(t).remove(), void this.setVars())
            }
        };
    
    
    
        t.fn.owlCarousel = function(e) {
            return this.each(function() {
                if (!0 === t(this).data("owl-init")) return !1;
                t(this).data("owl-init", !0);
                var n = Object.create(i);
                n.init(e, this), t.data(this, "owlCarousel", n)
            })
        }, t.fn.owlCarousel.options = {
            items: 5,
            itemsCustom: !1,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 2],
            itemsTabletSmall: !1,
            itemsMobile: [479, 1],
            singleItem: !1,
            itemsScaleUp: !1,
            slideSpeed: 200,
            paginationSpeed: 800,
            rewindSpeed: 1e3,
            autoPlay: !1,
            stopOnHover: !1,
            navigation: !1,
            navigationText: ["prev", "next"],
            rewindNav: !0,
            scrollPerPage: !1,
            pagination: !0,
            paginationNumbers: !1,
            responsive: !0,
            responsiveRefreshRate: 200,
            responsiveBaseWidth: e,
            baseClass: "owl-carousel",
            theme: "owl-theme",
            lazyLoad: !1,
            lazyFollow: !0,
            lazyEffect: "fade",
            autoHeight: !1,
            jsonPath: !1,
            jsonSuccess: !1,
            dragBeforeAnimFinish: !0,
            mouseDrag: !0,
            touchDrag: !0,
            addClassActive: !1,
            transitionStyle: !1,
            beforeUpdate: !1,
            afterUpdate: !1,
            beforeInit: !1,
            afterInit: !1,
            beforeMove: !1,
            afterMove: !1,
            afterAction: !1,
            startDragging: !1,
            afterLazyLoad: !1
        }
    }(jQuery, window, document),
    
    
    
    function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
        }



(function($) {
        "use strict";

        function t(t, n) {
            this.element = t, this.$element = $(t), this.options = $.extend({}, r, n), this._defaults = r, this._name = e, this.init()
        }
        var e = "colorScroll",
            n = window.document,
            i = $(n),
            o = $(window),
            s = {
                UPDATE: "update.colorScroll"
            },
            r = {
                colors: [{
                    color: "#FFFFFF",
                    position: "0%"
                }, {
                    color: "#000000",
                    position: "100%"
                }],
                scrollElement: i,
                fauxScroll: !1,
                colorChange: void 0
            },
            a = function() {
                var t = n.createElement("div"),
                    e = t.style;
                return e.cssText = "background-color:rgba(150,255,150,.5)", ("" + e.backgroundColor).indexOf("rgba") > -1
            }(),
            l = function(t) {
                return function(e, n) {
                    return e[t] < n[t] ? -1 : e[t] > n[t] ? 1 : 0
                }
            },
            u = function(t, e, n) {
                var i = "rgb" + (a ? "a" : "") + "(" + parseInt(t[0] + n * (e[0] - t[0]), 10) + "," + parseInt(t[1] + n * (e[1] - t[1]), 10) + "," + parseInt(t[2] + n * (e[2] - t[2]), 10);
                return a && (i += "," + (t && e ? parseFloat(t[3] + n * (e[3] - t[3])) : 1)), i += ")"
            },
            p = function(t) {
                var e, n;
                return (e = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(t)) ? n = [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16), 1] : (e = /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(t)) ? n = [17 * parseInt(e[1], 16), 17 * parseInt(e[2], 16), 17 * parseInt(e[3], 16), 1] : (e = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(t)) ? n = [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3], 10), 1] : (e = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(t)) && (n = [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3], 10), parseFloat(e[4])]), n
            };
        t.prototype = {
            colors: [],
            init: function() {
                this.setPositions(), this.currentColor = this.$element.css("background-color"), this.updateColor(), this.addListeners()
            },
            addListeners: function() {
                var t = this;
                this.options.scrollElement.on("scroll", $.proxy(this.updateColor, this)), o.on("debouncedresize", function() {
                    t.setPositions(), t.updateColor()
                })
            },
            setPositions: function() {
                for (var t = i.height() - o.height(), e = [], n = 0; n < this.options.colors.length; n++) {
                    var s = {},
                        r = this.options.colors[n].position;
                    s.color = this.options.colors[n].color, "string" == typeof r ? "%" === r.charAt(r.length - 1) ? s.position = Math.floor(parseFloat(r) * t / 100) : s.position = parseFloat(r) : s.position = r, e.push(s)
                }
                e.sort(l("position")), this.colors = e
            },
            updateColor: function() {
                var t = i.scrollTop(),
                    e, n, o, s;
                if (t <= this.colors[0].position) this.setColor(this.colors[0].color);
                else if (t >= this.colors[this.colors.length - 1].position) this.setColor(this.colors[this.colors.length - 1].color);
                else {
                    for (var r = 0; r < this.colors.length; r++) {
                        if (!(t >= this.colors[r].position)) {
                            n = this.colors[r].position, s = this.colors[r].color;
                            break
                        }
                        e = this.colors[r].position, o = this.colors[r].color
                    }
                    var a = (t - e) / (n - e),
                        l = u(p(o), p(s), a);
                    this.setColor(l)
                }
            },
            setColor: function(t) {
                t !== this.currentColor && (this.$element.css("background-color", t), this.currentColor = t, this.$element.trigger(s.UPDATE, {
                    color: t
                }), this.options.colorChange && this.options.colorChange(t))
            }
        }, $.fn[e] = function(n) {
            return this.each(function() {
                $.data(this, "plugin_" + e) || $.data(this, "plugin_" + e, new t(this, n))
            })
        }
    }),
    
    
    
    function($) {
        "use strict";
        var t = $.event,
            e, n;
        e = t.special.debouncedresize = {
            setup: function() {
                $(this).on("resize", e.handler)
            },
            teardown: function() {
                $(this).off("resize", e.handler)
            },
            handler: function(i, o) {
                var s = this,
                    r = arguments,
                    a = function() {
                        i.type = "debouncedresize", t.dispatch.apply(s, r)
                    };
                n && clearTimeout(n), o ? a() : n = setTimeout(a, e.threshold)
            },
            threshold: 150
        }
    }(jQuery), jQuery(document).ready(function($) {
        Pace.on("done", function() {
            $(".pace-cover").addClass("paceCoverFade"), setTimeout(function() {
                $(".pace-cover").css({
                    display: "none"
                })
            }, 600)
        });
        var t = new Waypoint.Sticky({
            element: $("nav#main-nav")[0]
        });
        $(".ss-target").click(function(t) {
            var e = this;
            t.preventDefault(), $.smoothScroll({
                scrollTarget: e.hash,
                offset: -60,
                speed: 900,
                easing: "easeInOutQuad"
            })
        });
        var e = new Waypoint.Inview({
                element: $(".curtain")[0],
                enter: function(t) {
                    $("#hero").css({
                        position: "fixed"
                    }), $("#first").css({
                        height: "100vh"
                    }), $("#nav-spacer").css({
                        height: "100vh"
                    })
                },
                exited: function(t) {
                    $("#hero").css({
                        position: "relative"
                    }), $("#first").css({
                        height: "auto"
                    }), $("#nav-spacer").css({
                        height: "60px"
                    })
                }
            }),
            n = $("#nav-spacer");
        n.waypoint(function(t) {
            "down" == t ? $(".hero-txt").removeClass("hero-reveal") : $(".hero-txt").addClass("hero-reveal")
        }, {
            offset: "200"
        }), $("section#types").waypoint(function(t) {
            "down" == t ? ($("#main-nav ul li").removeClass("nav-active"), $("#main-nav ul li.nav2").addClass("nav-active")) : ($("#main-nav ul li.nav2").removeClass("nav-active"), $("#main-nav ul li.nav1").addClass("nav-active"))
        }, {
            offset: "100"
        }), $("#types-hero").waypoint(function(t) {
            "down" == t ? ($("#main-nav ul li").removeClass("nav-active"), $("#main-nav ul li.nav3").addClass("nav-active")) : ($("#main-nav ul li.nav3").removeClass("nav-active"), $("#main-nav ul li.nav2").addClass("nav-active"))
        }, {
            offset: "100"
        }), $("#about").waypoint(function(t) {
            "down" == t ? ($("#main-nav ul li").removeClass("nav-active"), $("#main-nav ul li.nav4").addClass("nav-active")) : ($("#main-nav ul li.nav4").removeClass("nav-active"), $("#main-nav ul li.nav3").addClass("nav-active"))
        }, {
            offset: "100"
        }), $("section#locations").waypoint(function(t) {
            "down" == t ? ($("#main-nav ul li").removeClass("nav-active"), $("#main-nav ul li.nav5").addClass("nav-active")) : ($("#main-nav ul li.nav5").removeClass("nav-active"), $("#main-nav ul li.nav4").addClass("nav-active"))
        }, {
            offset: "100"
        }), $("section#contact-form").waypoint(function(t) {
            "down" == t ? ($("#main-nav ul li").removeClass("nav-active"), $("#main-nav ul li.nav6").addClass("nav-active")) : ($("#main-nav ul li.nav6").removeClass("nav-active"), $("#main-nav ul li.nav5").addClass("nav-active"))
        }, {
            offset: "100"
        }), $(".cd-primary-nav-trigger").on("click", function() {
            $(".cd-menu-icon").toggleClass("is-clicked"), $(".cd-header").toggleClass("menu-is-open"), $(".cd-primary-nav").hasClass("is-visible") ? $(".cd-primary-nav").removeClass("is-visible").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
                $("body").removeClass("overflow-hidden")
            }) : $(".cd-primary-nav").addClass("is-visible").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
                $("body").addClass("overflow-hidden")
            })
        }), $("ul.cd-primary-nav li a").on("click", function() {
            $(".cd-menu-icon").removeClass("is-clicked"), $(".cd-header").removeClass("menu-is-open"), $(".cd-primary-nav").hasClass("is-visible") ? $(".cd-primary-nav").removeClass("is-visible").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
                $("body").removeClass("overflow-hidden")
            }) : $(".cd-primary-nav").addClass("is-visible").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
                $("body").addClass("overflow-hidden")
            })
        }), $("#nm-slider").owlCarousel({
            navigation: !1,
            slideSpeed: 400,
            paginationSpeed: 400,
            singleItem: !0,
            autoPlay: !0
        }), $(".about-wrap").colorScroll({
            colors: [{
                color: "#00ff0a",
                position: "10%"
            }, {
                color: "#00ffb1",
                position: "40%"
            }, {
                color: "#0069f8",
                position: "70%"
            }, {
                color: "#1400ff",
                position: "90%"
            }]
        })
    }),
    
    
    function() {
        for (var t, e = function() {}, n = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeline", "timelineEnd", "timeStamp", "trace", "warn"], i = n.length, o = window.console = window.console || {}; i--;) t = n[i], o[t] || (o[t] = e)
    }();