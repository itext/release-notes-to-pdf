var Oc = Object.defineProperty;
var rs = (e) => {
  throw TypeError(e);
};
var wc = (e, t, n) => t in e ? Oc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ie = (e, t, n) => wc(e, typeof t != "symbol" ? t + "" : t, n), si = (e, t, n) => t.has(e) || rs("Cannot " + n);
var be = (e, t, n) => (si(e, t, "read from private field"), n ? n.call(e) : t.get(e)), Ce = (e, t, n) => t.has(e) ? rs("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), lt = (e, t, n, r) => (si(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), On = (e, t, n) => (si(e, t, "access private method"), n);
var is = (e, t, n, r) => ({
  set _(i) {
    lt(e, t, i, n);
  },
  get _() {
    return be(e, t, r);
  }
});
import { _ as Ie, p as Tn, a as go, O as Sc, k as ce, K as se, x as Q, d as B, A as C, y as K, q, l as os, b as v, R as H, T as M, c as jr, D as pt, $ as va, g as fn, h as mo, C as ga, E as Ke, e as ma, f as Nc, W as re, r as ba, M as Pi, i as Ac, F as _a, j as ya } from "./compat.module-of3iNHE7.js";
import { a as xc } from "./utils-ChjtKy_M.js";
import { Q as P, c as Tc, d as Rc, e as Ea, f as bo, h as Cc, i as Dc, j as $c, b as _o, k as Lc, l as Pc, m as Oa } from "./theme-xRX1rfIo.js";
import { t as $e, i as Ic } from "./i18n-DKG4M0Tj.js";
import { i as Rn } from "./index-BQkERkoW.js";
import { g as yo } from "./get-random-string-CK0Qtika.js";
import { g as Eo } from "./placeholder-DMT-j6rL.js";
import Vc from "./purify.es-Cm3utOpm.js";
import { g as wa, b as Oo } from "./i18nInstance-CmPW1jk_.js";
import { g as Fc } from "./_commonjsHelpers-DebK9D3O.js";
var ai, ss;
function Mc() {
  return ss || (ss = 1, ai = {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
  }), ai;
}
var jc = Mc();
const kc = /* @__PURE__ */ Fc(jc);
var Bc = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;
function as(e) {
  var t = { type: "tag", name: "", voidElement: !1, attrs: {}, children: [] }, n = e.match(/<\/?([^\s]+?)[/\s>]/);
  if (n && (t.name = n[1], (kc[n[1]] || e.charAt(e.length - 2) === "/") && (t.voidElement = !0), t.name.startsWith("!--"))) {
    var r = e.indexOf("-->");
    return { type: "comment", comment: r !== -1 ? e.slice(4, r) : "" };
  }
  for (var i = new RegExp(Bc), o = null; (o = i.exec(e)) !== null; ) if (o[0].trim()) if (o[1]) {
    var s = o[1].trim(), a = [s, ""];
    s.indexOf("=") > -1 && (a = s.split("=")), t.attrs[a[0]] = a[1], i.lastIndex--;
  } else o[2] && (t.attrs[o[2]] = o[3].trim().substring(1, o[3].length - 1));
  return t;
}
var Uc = /<[a-zA-Z0-9\-\!\/](?:"[^"]*"|'[^']*'|[^'">])*>/g, Hc = /^\s*$/, qc = /* @__PURE__ */ Object.create(null);
function Sa(e, t) {
  switch (t.type) {
    case "text":
      return e + t.content;
    case "tag":
      return e += "<" + t.name + (t.attrs ? function(n) {
        var r = [];
        for (var i in n) r.push(i + '="' + n[i] + '"');
        return r.length ? " " + r.join(" ") : "";
      }(t.attrs) : "") + (t.voidElement ? "/>" : ">"), t.voidElement ? e : e + t.children.reduce(Sa, "") + "</" + t.name + ">";
    case "comment":
      return e + "<!--" + t.comment + "-->";
  }
}
var Gc = { parse: function(e, t) {
  t || (t = {}), t.components || (t.components = qc);
  var n, r = [], i = [], o = -1, s = !1;
  if (e.indexOf("<") !== 0) {
    var a = e.indexOf("<");
    r.push({ type: "text", content: a === -1 ? e : e.substring(0, a) });
  }
  return e.replace(Uc, function(l, u) {
    if (s) {
      if (l !== "</" + n.name + ">") return;
      s = !1;
    }
    var c, f = l.charAt(1) !== "/", p = l.startsWith("<!--"), d = u + l.length, h = e.charAt(d);
    if (p) {
      var g = as(l);
      return o < 0 ? (r.push(g), r) : ((c = i[o]).children.push(g), r);
    }
    if (f && (o++, (n = as(l)).type === "tag" && t.components[n.name] && (n.type = "component", s = !0), n.voidElement || s || !h || h === "<" || n.children.push({ type: "text", content: e.slice(d, e.indexOf("<", d)) }), o === 0 && r.push(n), (c = i[o - 1]) && c.children.push(n), i[o] = n), (!f || n.voidElement) && (o > -1 && (n.voidElement || n.name === l.slice(2, -1)) && (o--, n = o === -1 ? r : i[o]), !s && h !== "<" && h)) {
      c = o === -1 ? r : i[o].children;
      var b = e.indexOf("<", d), E = e.slice(d, b === -1 ? void 0 : b);
      Hc.test(E) && (E = " "), (b > -1 && o + c.length >= 0 || E !== " ") && c.push({ type: "text", content: E });
    }
  }), r;
}, stringify: function(e) {
  return e.reduce(function(t, n) {
    return t + Sa("", n);
  }, "");
} };
const ur = (e, t, n, r) => {
  var o, s, a, l;
  const i = [n, {
    code: t,
    ...r || {}
  }];
  if ((s = (o = e == null ? void 0 : e.services) == null ? void 0 : o.logger) != null && s.forward)
    return e.services.logger.forward(i, "warn", "react-i18next::", !0);
  Me(i[0]) && (i[0] = `react-i18next:: ${i[0]}`), (l = (a = e == null ? void 0 : e.services) == null ? void 0 : a.logger) != null && l.warn ? e.services.logger.warn(...i) : console != null && console.warn && console.warn(...i);
}, ls = {}, Cn = (e, t, n, r) => {
  Me(n) && ls[n] || (Me(n) && (ls[n] = /* @__PURE__ */ new Date()), ur(e, t, n, r));
}, Na = (e, t) => () => {
  if (e.isInitialized)
    t();
  else {
    const n = () => {
      setTimeout(() => {
        e.off("initialized", n);
      }, 0), t();
    };
    e.on("initialized", n);
  }
}, Ii = (e, t, n) => {
  e.loadNamespaces(t, Na(e, n));
}, us = (e, t, n, r) => {
  if (Me(n) && (n = [n]), e.options.preload && e.options.preload.indexOf(t) > -1) return Ii(e, n, r);
  n.forEach((i) => {
    e.options.ns.indexOf(i) < 0 && e.options.ns.push(i);
  }), e.loadLanguages(t, Na(e, r));
}, Wc = (e, t, n = {}) => !t.languages || !t.languages.length ? (Cn(t, "NO_LANGUAGES", "i18n.languages were undefined or empty", {
  languages: t.languages
}), !0) : t.hasLoadedNamespace(e, {
  lng: n.lng,
  precheck: (r, i) => {
    var o;
    if (((o = n.bindI18n) == null ? void 0 : o.indexOf("languageChanging")) > -1 && r.services.backendConnector.backend && r.isLanguageChangingTo && !i(r.isLanguageChangingTo, e)) return !1;
  }
}), Me = (e) => typeof e == "string", Dt = (e) => typeof e == "object" && e !== null, li = (e, t) => {
  var r;
  if (!e) return !1;
  const n = ((r = e.props) == null ? void 0 : r.children) ?? e.children;
  return t ? n.length > 0 : !!n;
}, ui = (e) => {
  var n, r;
  if (!e) return [];
  const t = ((n = e.props) == null ? void 0 : n.children) ?? e.children;
  return (r = e.props) != null && r.i18nIsDynamicList ? Zt(t) : t;
}, Kc = (e) => Array.isArray(e) && e.every(Tn), Zt = (e) => Array.isArray(e) ? e : [e], zc = (e, t) => {
  const n = {
    ...t
  };
  return n.props = Object.assign(e.props, t.props), n;
}, Aa = (e, t, n, r) => {
  if (!e) return "";
  let i = "";
  const o = Zt(e), s = t != null && t.transSupportBasicHtmlNodes ? t.transKeepBasicHtmlNodesFor ?? [] : [];
  return o.forEach((a, l) => {
    if (Me(a)) {
      i += `${a}`;
      return;
    }
    if (Tn(a)) {
      const {
        props: u,
        type: c
      } = a, f = Object.keys(u).length, p = s.indexOf(c) > -1, d = u.children;
      if (!d && p && !f) {
        i += `<${c}/>`;
        return;
      }
      if (!d && (!p || f) || u.i18nIsDynamicList) {
        i += `<${l}></${l}>`;
        return;
      }
      if (p && f === 1 && Me(d)) {
        i += `<${c}>${d}</${c}>`;
        return;
      }
      const h = Aa(d, t, n, r);
      i += `<${l}>${h}</${l}>`;
      return;
    }
    if (a === null) {
      ur(n, "TRANS_NULL_VALUE", "Passed in a null value as child", {
        i18nKey: r
      });
      return;
    }
    if (Dt(a)) {
      const {
        format: u,
        ...c
      } = a, f = Object.keys(c);
      if (f.length === 1) {
        const p = u ? `${f[0]}, ${u}` : f[0];
        i += `{{${p}}}`;
        return;
      }
      ur(n, "TRANS_INVALID_OBJ", "Invalid child - Object should only have keys {{ value, format }} (format is optional).", {
        i18nKey: r,
        child: a
      });
      return;
    }
    ur(n, "TRANS_INVALID_VAR", "Passed in a variable like {number} - pass variables for interpolation as full objects like {{number}}.", {
      i18nKey: r,
      child: a
    });
  }), i;
}, Yc = (e, t, n, r, i, o) => {
  if (t === "") return [];
  const s = r.transKeepBasicHtmlNodesFor || [], a = t && new RegExp(s.map((b) => `<${b}`).join("|")).test(t);
  if (!e && !a && !o) return [t];
  const l = {}, u = (b) => {
    Zt(b).forEach((_) => {
      Me(_) || (li(_) ? u(ui(_)) : Dt(_) && !Tn(_) && Object.assign(l, _));
    });
  };
  u(e);
  const c = Gc.parse(`<0>${t}</0>`), f = {
    ...l,
    ...i
  }, p = (b, E, _) => {
    var x;
    const y = ui(b), w = h(y, E.children, _);
    return Kc(y) && w.length === 0 || (x = b.props) != null && x.i18nIsDynamicList ? y : w;
  }, d = (b, E, _, y, w) => {
    b.dummy ? (b.children = E, _.push(go(b, {
      key: y
    }, w ? void 0 : E))) : _.push(...Sc.map([b], (x) => {
      const N = {
        ...x.props
      };
      return delete N.i18nIsDynamicList, Ie(x.type, {
        ...N,
        key: y,
        ref: x.ref
      }, w ? null : E);
    }));
  }, h = (b, E, _) => {
    const y = Zt(b);
    return Zt(E).reduce((x, N, D) => {
      var $, T;
      const L = ((T = ($ = N.children) == null ? void 0 : $[0]) == null ? void 0 : T.content) && n.services.interpolator.interpolate(N.children[0].content, f, n.language);
      if (N.type === "tag") {
        let S = y[parseInt(N.name, 10)];
        _.length === 1 && !S && (S = _[0][N.name]), S || (S = {});
        const V = Object.keys(N.attrs).length !== 0 ? zc({
          props: N.attrs
        }, S) : S, G = Tn(V), W = G && li(N, !0) && !N.voidElement, te = a && Dt(V) && V.dummy && !G, X = Dt(e) && Object.hasOwnProperty.call(e, N.name);
        if (Me(V)) {
          const U = n.services.interpolator.interpolate(V, f, n.language);
          x.push(U);
        } else if (li(V) || W) {
          const U = p(V, N, _);
          d(V, U, x, D);
        } else if (te) {
          const U = h(y, N.children, _);
          d(V, U, x, D);
        } else if (Number.isNaN(parseFloat(N.name)))
          if (X) {
            const U = p(V, N, _);
            d(V, U, x, D, N.voidElement);
          } else if (r.transSupportBasicHtmlNodes && s.indexOf(N.name) > -1)
            if (N.voidElement)
              x.push(Ie(N.name, {
                key: `${N.name}-${D}`
              }));
            else {
              const U = h(y, N.children, _);
              x.push(Ie(N.name, {
                key: `${N.name}-${D}`
              }, U));
            }
          else if (N.voidElement)
            x.push(`<${N.name} />`);
          else {
            const U = h(y, N.children, _);
            x.push(`<${N.name}>${U}</${N.name}>`);
          }
        else if (Dt(V) && !G) {
          const U = N.children[0] ? L : null;
          U && x.push(U);
        } else
          d(V, L, x, D, N.children.length !== 1 || !L);
      } else if (N.type === "text") {
        const S = r.transWrapTextNodes, V = o ? r.unescape(n.services.interpolator.interpolate(N.content, f, n.language)) : n.services.interpolator.interpolate(N.content, f, n.language);
        S ? x.push(Ie(S, {
          key: `${N.name}-${D}`
        }, V)) : x.push(V);
      }
      return x;
    }, []);
  }, g = h([{
    dummy: !0,
    children: e || []
  }], c, Zt(e || []));
  return ui(g[0]);
}, xa = (e, t, n) => {
  const r = e.key || t, i = go(e, {
    key: r
  });
  if (!i.props || !i.props.children || n.indexOf(`${t}/>`) < 0 && n.indexOf(`${t} />`) < 0)
    return i;
  function o() {
    return Ie(ce, null, i);
  }
  return Ie(o, {
    key: r
  });
}, Xc = (e, t) => e.map((n, r) => xa(n, r, t)), Qc = (e, t) => {
  const n = {};
  return Object.keys(e).forEach((r) => {
    Object.assign(n, {
      [r]: xa(e[r], r, t)
    });
  }), n;
}, Zc = (e, t, n, r) => e ? Array.isArray(e) ? Xc(e, t) : Dt(e) ? Qc(e, t) : (Cn(n, "TRANS_INVALID_COMPONENTS", '<Trans /> "components" prop expects an object or array', {
  i18nKey: r
}), null) : null;
function Jc({
  children: e,
  count: t,
  parent: n,
  i18nKey: r,
  context: i,
  tOptions: o = {},
  values: s,
  defaults: a,
  components: l,
  ns: u,
  i18n: c,
  t: f,
  shouldUnescape: p,
  ...d
}) {
  var V, G, W, te, X, U;
  const h = c || Oo();
  if (!h)
    return Cn(h, "NO_I18NEXT_INSTANCE", "Trans: You need to pass in an i18next instance using i18nextReactModule", {
      i18nKey: r
    }), e;
  const g = f || h.t.bind(h) || ((j) => j), b = {
    ...wa(),
    ...(V = h.options) == null ? void 0 : V.react
  };
  let E = u || g.ns || ((G = h.options) == null ? void 0 : G.defaultNS);
  E = Me(E) ? [E] : E || ["translation"];
  const _ = Aa(e, b, h, r), y = a || _ || b.transEmptyNodeValue || r, {
    hashTransKey: w
  } = b, x = r || (w ? w(_ || y) : _ || y);
  (te = (W = h.options) == null ? void 0 : W.interpolation) != null && te.defaultVariables && (s = s && Object.keys(s).length > 0 ? {
    ...s,
    ...h.options.interpolation.defaultVariables
  } : {
    ...h.options.interpolation.defaultVariables
  });
  const N = s || t !== void 0 && !((U = (X = h.options) == null ? void 0 : X.interpolation) != null && U.alwaysFormat) || !e ? o.interpolation : {
    interpolation: {
      ...o.interpolation,
      prefix: "#$?",
      suffix: "?$#"
    }
  }, D = {
    ...o,
    context: i || o.context,
    count: t,
    ...s,
    ...N,
    defaultValue: y,
    ns: E
  }, L = x ? g(x, D) : y, $ = Zc(l, L, h, r), T = Yc($ || e, L, h, b, D, p), S = n ?? b.defaultTransParent;
  return S ? Ie(S, d, T) : T;
}
const Ta = se();
class ef {
  constructor() {
    this.usedNamespaces = {};
  }
  addUsedNamespaces(t) {
    t.forEach((n) => {
      this.usedNamespaces[n] || (this.usedNamespaces[n] = !0);
    });
  }
  getUsedNamespaces() {
    return Object.keys(this.usedNamespaces);
  }
}
function qe({
  children: e,
  count: t,
  parent: n,
  i18nKey: r,
  context: i,
  tOptions: o = {},
  values: s,
  defaults: a,
  components: l,
  ns: u,
  i18n: c,
  t: f,
  shouldUnescape: p,
  ...d
}) {
  var _;
  const {
    i18n: h,
    defaultNS: g
  } = Q(Ta) || {}, b = c || h || Oo(), E = f || (b == null ? void 0 : b.t.bind(b));
  return Jc({
    children: e,
    count: t,
    parent: n,
    i18nKey: r,
    context: i,
    tOptions: o,
    values: s,
    defaults: a,
    components: l,
    ns: u || (E == null ? void 0 : E.ns) || g || ((_ = b == null ? void 0 : b.options) == null ? void 0 : _.defaultNS),
    i18n: b,
    t: f,
    shouldUnescape: p,
    ...d
  });
}
const tf = (e, t) => {
  const n = C();
  return K(() => {
    n.current = e;
  }, [e, t]), n.current;
}, Ra = (e, t, n, r) => e.getFixedT(t, n, r), nf = (e, t, n, r) => q(Ra(e, t, n, r), [e, t, n, r]), qn = (e, t = {}) => {
  var w, x, N, D;
  const {
    i18n: n
  } = t, {
    i18n: r,
    defaultNS: i
  } = Q(Ta) || {}, o = n || r || Oo();
  if (o && !o.reportNamespaces && (o.reportNamespaces = new ef()), !o) {
    Cn(o, "NO_I18NEXT_INSTANCE", "useTranslation: You will need to pass in an i18next instance by using initReactI18next");
    const L = (T, S) => Me(S) ? S : Dt(S) && Me(S.defaultValue) ? S.defaultValue : Array.isArray(T) ? T[T.length - 1] : T, $ = [L, {}, !1];
    return $.t = L, $.i18n = {}, $.ready = !1, $;
  }
  (w = o.options.react) != null && w.wait && Cn(o, "DEPRECATED_OPTION", "useTranslation: It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");
  const s = {
    ...wa(),
    ...o.options.react,
    ...t
  }, {
    useSuspense: a,
    keyPrefix: l
  } = s;
  let u = i || ((x = o.options) == null ? void 0 : x.defaultNS);
  u = Me(u) ? [u] : u || ["translation"], (D = (N = o.reportNamespaces).addUsedNamespaces) == null || D.call(N, u);
  const c = (o.isInitialized || o.initializedStoreOnce) && u.every((L) => Wc(L, o, s)), f = nf(o, t.lng || null, s.nsMode === "fallback" ? u : u[0], l), p = () => f, d = () => Ra(o, t.lng || null, s.nsMode === "fallback" ? u : u[0], l), [h, g] = B(p);
  let b = u.join();
  t.lng && (b = `${t.lng}${b}`);
  const E = tf(b), _ = C(!0);
  K(() => {
    const {
      bindI18n: L,
      bindI18nStore: $
    } = s;
    _.current = !0, !c && !a && (t.lng ? us(o, t.lng, u, () => {
      _.current && g(d);
    }) : Ii(o, u, () => {
      _.current && g(d);
    })), c && E && E !== b && _.current && g(d);
    const T = () => {
      _.current && g(d);
    };
    return L && (o == null || o.on(L, T)), $ && (o == null || o.store.on($, T)), () => {
      _.current = !1, o && (L == null || L.split(" ").forEach((S) => o.off(S, T))), $ && o && $.split(" ").forEach((S) => o.store.off(S, T));
    };
  }, [o, b]), K(() => {
    _.current && c && g(p);
  }, [o, l, c]);
  const y = [h, o, c];
  if (y.t = h, y.i18n = o, y.ready = c, c || !c && !a) return y;
  throw new Promise((L) => {
    t.lng ? us(o, t.lng, u, () => L()) : Ii(o, u, () => L());
  });
};
var O = {}, rf = {
  0: "Invalid value for configuration 'enforceActions', expected 'never', 'always' or 'observed'",
  1: function(t, n) {
    return "Cannot apply '" + t + "' to '" + n.toString() + "': Field not found.";
  },
  /*
  2(prop) {
      return `invalid decorator for '${prop.toString()}'`
  },
  3(prop) {
      return `Cannot decorate '${prop.toString()}': action can only be used on properties with a function value.`
  },
  4(prop) {
      return `Cannot decorate '${prop.toString()}': computed can only be used on getter properties.`
  },
  */
  5: "'keys()' can only be used on observable objects, arrays, sets and maps",
  6: "'values()' can only be used on observable objects, arrays, sets and maps",
  7: "'entries()' can only be used on observable objects, arrays and maps",
  8: "'set()' can only be used on observable objects, arrays and maps",
  9: "'remove()' can only be used on observable objects, arrays and maps",
  10: "'has()' can only be used on observable objects, arrays and maps",
  11: "'get()' can only be used on observable objects, arrays and maps",
  12: "Invalid annotation",
  13: "Dynamic observable objects cannot be frozen. If you're passing observables to 3rd party component/function that calls Object.freeze, pass copy instead: toJS(observable)",
  14: "Intercept handlers should return nothing or a change object",
  15: "Observable arrays cannot be frozen. If you're passing observables to 3rd party component/function that calls Object.freeze, pass copy instead: toJS(observable)",
  16: "Modification exception: the internal structure of an observable array was changed.",
  17: function(t, n) {
    return "[mobx.array] Index out of bounds, " + t + " is larger than " + n;
  },
  18: "mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js",
  19: function(t) {
    return "Cannot initialize from classes that inherit from Map: " + t.constructor.name;
  },
  20: function(t) {
    return "Cannot initialize map from " + t;
  },
  21: function(t) {
    return "Cannot convert to map from '" + t + "'";
  },
  22: "mobx.set requires Set polyfill for the current browser. Check babel-polyfill or core-js/es6/set.js",
  23: "It is not possible to get index atoms from arrays",
  24: function(t) {
    return "Cannot obtain administration from " + t;
  },
  25: function(t, n) {
    return "the entry '" + t + "' does not exist in the observable map '" + n + "'";
  },
  26: "please specify a property",
  27: function(t, n) {
    return "no observable property '" + t.toString() + "' found on the observable object '" + n + "'";
  },
  28: function(t) {
    return "Cannot obtain atom from " + t;
  },
  29: "Expecting some object",
  30: "invalid action stack. did you forget to finish an action?",
  31: "missing option for computed: get",
  32: function(t, n) {
    return "Cycle detected in computation " + t + ": " + n;
  },
  33: function(t) {
    return "The setter of computed value '" + t + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?";
  },
  34: function(t) {
    return "[ComputedValue '" + t + "'] It is not possible to assign a new value to a computed value.";
  },
  35: "There are multiple, different versions of MobX active. Make sure MobX is loaded only once or use `configure({ isolateGlobalState: true })`",
  36: "isolateGlobalState should be called before MobX is running any reactions",
  37: function(t) {
    return "[mobx] `observableArray." + t + "()` mutates the array in-place, which is not allowed inside a derivation. Use `array.slice()." + t + "()` instead";
  },
  38: "'ownKeys()' can only be used on observable objects",
  39: "'defineProperty()' can only be used on observable objects"
}, of = O.NODE_ENV !== "production" ? rf : {};
function R(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  if (O.NODE_ENV !== "production") {
    var i = typeof e == "string" ? e : of[e];
    throw typeof i == "function" && (i = i.apply(null, n)), new Error("[MobX] " + i);
  }
  throw new Error(typeof e == "number" ? "[MobX] minified error nr: " + e + (n.length ? " " + n.map(String).join(",") : "") + ". Find the full error at: https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/errors.ts" : "[MobX] " + e);
}
var sf = {};
function kr() {
  return typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : sf;
}
var Ca = Object.assign, gr = Object.getOwnPropertyDescriptor, rt = Object.defineProperty, Br = Object.prototype, mr = [];
Object.freeze(mr);
var Da = {};
Object.freeze(Da);
var af = typeof Proxy < "u", lf = /* @__PURE__ */ Object.toString();
function $a() {
  af || R(O.NODE_ENV !== "production" ? "`Proxy` objects are not available in the current environment. Please configure MobX to enable a fallback implementation.`" : "Proxy not available");
}
function wn(e) {
  O.NODE_ENV !== "production" && A.verifyProxies && R("MobX is currently configured to be able to run in ES5 mode, but in ES5 MobX won't be able to " + e);
}
function Ze() {
  return ++A.mobxGuid;
}
function wo(e) {
  var t = !1;
  return function() {
    if (!t)
      return t = !0, e.apply(this, arguments);
  };
}
var Jt = function() {
};
function le(e) {
  return typeof e == "function";
}
function Ft(e) {
  var t = typeof e;
  switch (t) {
    case "string":
    case "symbol":
    case "number":
      return !0;
  }
  return !1;
}
function Ur(e) {
  return e !== null && typeof e == "object";
}
function we(e) {
  if (!Ur(e))
    return !1;
  var t = Object.getPrototypeOf(e);
  if (t == null)
    return !0;
  var n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n.toString() === lf;
}
function La(e) {
  var t = e == null ? void 0 : e.constructor;
  return t ? t.name === "GeneratorFunction" || t.displayName === "GeneratorFunction" : !1;
}
function Gn(e, t, n) {
  rt(e, t, {
    enumerable: !1,
    writable: !0,
    configurable: !0,
    value: n
  });
}
function Pa(e, t, n) {
  rt(e, t, {
    enumerable: !1,
    writable: !1,
    configurable: !0,
    value: n
  });
}
function qt(e, t) {
  var n = "isMobX" + e;
  return t.prototype[n] = !0, function(r) {
    return Ur(r) && r[n] === !0;
  };
}
function dn(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Map]";
}
function uf(e) {
  var t = Object.getPrototypeOf(e), n = Object.getPrototypeOf(t), r = Object.getPrototypeOf(n);
  return r === null;
}
function ut(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Set]";
}
var Ia = typeof Object.getOwnPropertySymbols < "u";
function cf(e) {
  var t = Object.keys(e);
  if (!Ia)
    return t;
  var n = Object.getOwnPropertySymbols(e);
  return n.length ? [].concat(t, n.filter(function(r) {
    return Br.propertyIsEnumerable.call(e, r);
  })) : t;
}
var sn = typeof Reflect < "u" && Reflect.ownKeys ? Reflect.ownKeys : Ia ? function(e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : (
  /* istanbul ignore next */
  Object.getOwnPropertyNames
);
function Vi(e) {
  return typeof e == "string" ? e : typeof e == "symbol" ? e.toString() : new String(e).toString();
}
function Va(e) {
  return e === null ? null : typeof e == "object" ? "" + e : e;
}
function je(e, t) {
  return Br.hasOwnProperty.call(e, t);
}
var ff = Object.getOwnPropertyDescriptors || function(t) {
  var n = {};
  return sn(t).forEach(function(r) {
    n[r] = gr(t, r);
  }), n;
};
function Ee(e, t) {
  return !!(e & t);
}
function Oe(e, t, n) {
  return n ? e |= t : e &= ~t, e;
}
function cs(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function df(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, hf(r.key), r);
  }
}
function pn(e, t, n) {
  return t && df(e.prototype, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function en(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n) return (n = n.call(e)).next.bind(n);
  if (Array.isArray(e) || (n = vf(e)) || t) {
    n && (e = n);
    var r = 0;
    return function() {
      return r >= e.length ? {
        done: !0
      } : {
        done: !1,
        value: e[r++]
      };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ht() {
  return ht = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, ht.apply(null, arguments);
}
function Fa(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Fi(e, t);
}
function Fi(e, t) {
  return Fi = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, r) {
    return n.__proto__ = r, n;
  }, Fi(e, t);
}
function pf(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t);
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(e);
}
function hf(e) {
  var t = pf(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function vf(e, t) {
  if (e) {
    if (typeof e == "string") return cs(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? cs(e, t) : void 0;
  }
}
var _e = /* @__PURE__ */ Symbol("mobx-stored-annotations");
function it(e) {
  function t(n, r) {
    if (Kn(r))
      return e.decorate_20223_(n, r);
    Wn(n, r, e);
  }
  return Object.assign(t, e);
}
function Wn(e, t, n) {
  if (je(e, _e) || Gn(e, _e, ht({}, e[_e])), O.NODE_ENV !== "production" && _r(n) && !je(e[_e], t)) {
    var r = e.constructor.name + ".prototype." + t.toString();
    R("'" + r + "' is decorated with 'override', but no such decorated member was found on prototype.");
  }
  gf(e, n, t), _r(n) || (e[_e][t] = n);
}
function gf(e, t, n) {
  if (O.NODE_ENV !== "production" && !_r(t) && je(e[_e], n)) {
    var r = e.constructor.name + ".prototype." + n.toString(), i = e[_e][n].annotationType_, o = t.annotationType_;
    R("Cannot apply '@" + o + "' to '" + r + "':" + (`
The field is already decorated with '@` + i + "'.") + `
Re-decorating fields is not allowed.
Use '@override' decorator for methods overridden by subclass.`);
  }
}
function mf(e) {
  return je(e, _e) || Gn(e, _e, ht({}, e[_e])), e[_e];
}
function Kn(e) {
  return typeof e == "object" && typeof e.kind == "string";
}
function Hr(e, t) {
  O.NODE_ENV !== "production" && !t.includes(e.kind) && R("The decorator applied to '" + String(e.name) + "' cannot be used on a " + e.kind + " element");
}
var F = /* @__PURE__ */ Symbol("mobx administration"), Nt = /* @__PURE__ */ function() {
  function e(n) {
    n === void 0 && (n = O.NODE_ENV !== "production" ? "Atom@" + Ze() : "Atom"), this.name_ = void 0, this.flags_ = 0, this.observers_ = /* @__PURE__ */ new Set(), this.lastAccessedBy_ = 0, this.lowestObserverState_ = z.NOT_TRACKING_, this.onBOL = void 0, this.onBUOL = void 0, this.name_ = n;
  }
  var t = e.prototype;
  return t.onBO = function() {
    this.onBOL && this.onBOL.forEach(function(r) {
      return r();
    });
  }, t.onBUO = function() {
    this.onBUOL && this.onBUOL.forEach(function(r) {
      return r();
    });
  }, t.reportObserved = function() {
    return el(this);
  }, t.reportChanged = function() {
    Ve(), tl(this), Fe();
  }, t.toString = function() {
    return this.name_;
  }, pn(e, [{
    key: "isBeingObserved",
    get: function() {
      return Ee(this.flags_, e.isBeingObservedMask_);
    },
    set: function(r) {
      this.flags_ = Oe(this.flags_, e.isBeingObservedMask_, r);
    }
  }, {
    key: "isPendingUnobservation",
    get: function() {
      return Ee(this.flags_, e.isPendingUnobservationMask_);
    },
    set: function(r) {
      this.flags_ = Oe(this.flags_, e.isPendingUnobservationMask_, r);
    }
  }, {
    key: "diffValue",
    get: function() {
      return Ee(this.flags_, e.diffValueMask_) ? 1 : 0;
    },
    set: function(r) {
      this.flags_ = Oe(this.flags_, e.diffValueMask_, r === 1);
    }
  }]);
}();
Nt.isBeingObservedMask_ = 1;
Nt.isPendingUnobservationMask_ = 2;
Nt.diffValueMask_ = 4;
var So = /* @__PURE__ */ qt("Atom", Nt);
function Ma(e, t, n) {
  t === void 0 && (t = Jt), n === void 0 && (n = Jt);
  var r = new Nt(e);
  return t !== Jt && xd(r, t), n !== Jt && ll(r, n), r;
}
function bf(e, t) {
  return Ol(e, t);
}
function _f(e, t) {
  return Object.is ? Object.is(e, t) : e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
var br = {
  structural: bf,
  default: _f
};
function Mt(e, t, n) {
  return Ln(e) ? e : Array.isArray(e) ? pe.array(e, {
    name: n
  }) : we(e) ? pe.object(e, void 0, {
    name: n
  }) : dn(e) ? pe.map(e, {
    name: n
  }) : ut(e) ? pe.set(e, {
    name: n
  }) : typeof e == "function" && !an(e) && !$n(e) ? La(e) ? ln(e) : Dn(n, e) : e;
}
function yf(e, t, n) {
  if (e == null || hn(e) || zr(e) || At(e) || tt(e))
    return e;
  if (Array.isArray(e))
    return pe.array(e, {
      name: n,
      deep: !1
    });
  if (we(e))
    return pe.object(e, void 0, {
      name: n,
      deep: !1
    });
  if (dn(e))
    return pe.map(e, {
      name: n,
      deep: !1
    });
  if (ut(e))
    return pe.set(e, {
      name: n,
      deep: !1
    });
  O.NODE_ENV !== "production" && R("The shallow modifier / decorator can only used in combination with arrays, objects, maps and sets");
}
function qr(e) {
  return e;
}
function Ef(e, t) {
  return O.NODE_ENV !== "production" && Ln(e) && R("observable.struct should not be used with observable values"), Ol(e, t) ? t : e;
}
var Of = "override";
function _r(e) {
  return e.annotationType_ === Of;
}
function zn(e, t) {
  return {
    annotationType_: e,
    options_: t,
    make_: wf,
    extend_: Sf,
    decorate_20223_: Nf
  };
}
function wf(e, t, n, r) {
  var i;
  if ((i = this.options_) != null && i.bound)
    return this.extend_(e, t, n, !1) === null ? 0 : 1;
  if (r === e.target_)
    return this.extend_(e, t, n, !1) === null ? 0 : 2;
  if (an(n.value))
    return 1;
  var o = ja(e, this, t, n, !1);
  return rt(r, t, o), 2;
}
function Sf(e, t, n, r) {
  var i = ja(e, this, t, n);
  return e.defineProperty_(t, i, r);
}
function Nf(e, t) {
  O.NODE_ENV !== "production" && Hr(t, ["method", "field"]);
  var n = t.kind, r = t.name, i = t.addInitializer, o = this, s = function(u) {
    var c, f, p, d;
    return jt((c = (f = o.options_) == null ? void 0 : f.name) != null ? c : r.toString(), u, (p = (d = o.options_) == null ? void 0 : d.autoAction) != null ? p : !1);
  };
  if (n == "field")
    return function(l) {
      var u, c = l;
      return an(c) || (c = s(c)), (u = o.options_) != null && u.bound && (c = c.bind(this), c.isMobxAction = !0), c;
    };
  if (n == "method") {
    var a;
    return an(e) || (e = s(e)), (a = this.options_) != null && a.bound && i(function() {
      var l = this, u = l[r].bind(l);
      u.isMobxAction = !0, l[r] = u;
    }), e;
  }
  R("Cannot apply '" + o.annotationType_ + "' to '" + String(r) + "' (kind: " + n + "):" + (`
'` + o.annotationType_ + "' can only be used on properties with a function value."));
}
function Af(e, t, n, r) {
  var i = t.annotationType_, o = r.value;
  O.NODE_ENV !== "production" && !le(o) && R("Cannot apply '" + i + "' to '" + e.name_ + "." + n.toString() + "':" + (`
'` + i + "' can only be used on properties with a function value."));
}
function ja(e, t, n, r, i) {
  var o, s, a, l, u, c, f;
  i === void 0 && (i = A.safeDescriptors), Af(e, t, n, r);
  var p = r.value;
  if ((o = t.options_) != null && o.bound) {
    var d;
    p = p.bind((d = e.proxy_) != null ? d : e.target_);
  }
  return {
    value: jt(
      (s = (a = t.options_) == null ? void 0 : a.name) != null ? s : n.toString(),
      p,
      (l = (u = t.options_) == null ? void 0 : u.autoAction) != null ? l : !1,
      // https://github.com/mobxjs/mobx/discussions/3140
      (c = t.options_) != null && c.bound ? (f = e.proxy_) != null ? f : e.target_ : void 0
    ),
    // Non-configurable for classes
    // prevents accidental field redefinition in subclass
    configurable: i ? e.isPlainObject_ : !0,
    // https://github.com/mobxjs/mobx/pull/2641#issuecomment-737292058
    enumerable: !1,
    // Non-obsevable, therefore non-writable
    // Also prevents rewriting in subclass constructor
    writable: !i
  };
}
function ka(e, t) {
  return {
    annotationType_: e,
    options_: t,
    make_: xf,
    extend_: Tf,
    decorate_20223_: Rf
  };
}
function xf(e, t, n, r) {
  var i;
  if (r === e.target_)
    return this.extend_(e, t, n, !1) === null ? 0 : 2;
  if ((i = this.options_) != null && i.bound && (!je(e.target_, t) || !$n(e.target_[t])) && this.extend_(e, t, n, !1) === null)
    return 0;
  if ($n(n.value))
    return 1;
  var o = Ba(e, this, t, n, !1, !1);
  return rt(r, t, o), 2;
}
function Tf(e, t, n, r) {
  var i, o = Ba(e, this, t, n, (i = this.options_) == null ? void 0 : i.bound);
  return e.defineProperty_(t, o, r);
}
function Rf(e, t) {
  var n;
  O.NODE_ENV !== "production" && Hr(t, ["method"]);
  var r = t.name, i = t.addInitializer;
  return $n(e) || (e = ln(e)), (n = this.options_) != null && n.bound && i(function() {
    var o = this, s = o[r].bind(o);
    s.isMobXFlow = !0, o[r] = s;
  }), e;
}
function Cf(e, t, n, r) {
  var i = t.annotationType_, o = r.value;
  O.NODE_ENV !== "production" && !le(o) && R("Cannot apply '" + i + "' to '" + e.name_ + "." + n.toString() + "':" + (`
'` + i + "' can only be used on properties with a generator function value."));
}
function Ba(e, t, n, r, i, o) {
  o === void 0 && (o = A.safeDescriptors), Cf(e, t, n, r);
  var s = r.value;
  if ($n(s) || (s = ln(s)), i) {
    var a;
    s = s.bind((a = e.proxy_) != null ? a : e.target_), s.isMobXFlow = !0;
  }
  return {
    value: s,
    // Non-configurable for classes
    // prevents accidental field redefinition in subclass
    configurable: o ? e.isPlainObject_ : !0,
    // https://github.com/mobxjs/mobx/pull/2641#issuecomment-737292058
    enumerable: !1,
    // Non-obsevable, therefore non-writable
    // Also prevents rewriting in subclass constructor
    writable: !o
  };
}
function No(e, t) {
  return {
    annotationType_: e,
    options_: t,
    make_: Df,
    extend_: $f,
    decorate_20223_: Lf
  };
}
function Df(e, t, n) {
  return this.extend_(e, t, n, !1) === null ? 0 : 1;
}
function $f(e, t, n, r) {
  return Pf(e, this, t, n), e.defineComputedProperty_(t, ht({}, this.options_, {
    get: n.get,
    set: n.set
  }), r);
}
function Lf(e, t) {
  O.NODE_ENV !== "production" && Hr(t, ["getter"]);
  var n = this, r = t.name, i = t.addInitializer;
  return i(function() {
    var o = Wt(this)[F], s = ht({}, n.options_, {
      get: e,
      context: this
    });
    s.name || (s.name = O.NODE_ENV !== "production" ? o.name_ + "." + r.toString() : "ObservableObject." + r.toString()), o.values_.set(r, new Be(s));
  }), function() {
    return this[F].getObservablePropValue_(r);
  };
}
function Pf(e, t, n, r) {
  var i = t.annotationType_, o = r.get;
  O.NODE_ENV !== "production" && !o && R("Cannot apply '" + i + "' to '" + e.name_ + "." + n.toString() + "':" + (`
'` + i + "' can only be used on getter(+setter) properties."));
}
function Gr(e, t) {
  return {
    annotationType_: e,
    options_: t,
    make_: If,
    extend_: Vf,
    decorate_20223_: Ff
  };
}
function If(e, t, n) {
  return this.extend_(e, t, n, !1) === null ? 0 : 1;
}
function Vf(e, t, n, r) {
  var i, o;
  return Mf(e, this, t, n), e.defineObservableProperty_(t, n.value, (i = (o = this.options_) == null ? void 0 : o.enhancer) != null ? i : Mt, r);
}
function Ff(e, t) {
  if (O.NODE_ENV !== "production") {
    if (t.kind === "field")
      throw R("Please use `@observable accessor " + String(t.name) + "` instead of `@observable " + String(t.name) + "`");
    Hr(t, ["accessor"]);
  }
  var n = this, r = t.kind, i = t.name, o = /* @__PURE__ */ new WeakSet();
  function s(a, l) {
    var u, c, f = Wt(a)[F], p = new It(l, (u = (c = n.options_) == null ? void 0 : c.enhancer) != null ? u : Mt, O.NODE_ENV !== "production" ? f.name_ + "." + i.toString() : "ObservableObject." + i.toString(), !1);
    f.values_.set(i, p), o.add(a);
  }
  if (r == "accessor")
    return {
      get: function() {
        return o.has(this) || s(this, e.get.call(this)), this[F].getObservablePropValue_(i);
      },
      set: function(l) {
        return o.has(this) || s(this, l), this[F].setObservablePropValue_(i, l);
      },
      init: function(l) {
        return o.has(this) || s(this, l), l;
      }
    };
}
function Mf(e, t, n, r) {
  var i = t.annotationType_;
  O.NODE_ENV !== "production" && !("value" in r) && R("Cannot apply '" + i + "' to '" + e.name_ + "." + n.toString() + "':" + (`
'` + i + "' cannot be used on getter/setter properties"));
}
var jf = "true", kf = /* @__PURE__ */ Ua();
function Ua(e) {
  return {
    annotationType_: jf,
    options_: e,
    make_: Bf,
    extend_: Uf,
    decorate_20223_: Hf
  };
}
function Bf(e, t, n, r) {
  var i, o;
  if (n.get)
    return Wr.make_(e, t, n, r);
  if (n.set) {
    var s = jt(t.toString(), n.set);
    return r === e.target_ ? e.defineProperty_(t, {
      configurable: A.safeDescriptors ? e.isPlainObject_ : !0,
      set: s
    }) === null ? 0 : 2 : (rt(r, t, {
      configurable: !0,
      set: s
    }), 2);
  }
  if (r !== e.target_ && typeof n.value == "function") {
    var a;
    if (La(n.value)) {
      var l, u = (l = this.options_) != null && l.autoBind ? ln.bound : ln;
      return u.make_(e, t, n, r);
    }
    var c = (a = this.options_) != null && a.autoBind ? Dn.bound : Dn;
    return c.make_(e, t, n, r);
  }
  var f = ((i = this.options_) == null ? void 0 : i.deep) === !1 ? pe.ref : pe;
  if (typeof n.value == "function" && (o = this.options_) != null && o.autoBind) {
    var p;
    n.value = n.value.bind((p = e.proxy_) != null ? p : e.target_);
  }
  return f.make_(e, t, n, r);
}
function Uf(e, t, n, r) {
  var i, o;
  if (n.get)
    return Wr.extend_(e, t, n, r);
  if (n.set)
    return e.defineProperty_(t, {
      configurable: A.safeDescriptors ? e.isPlainObject_ : !0,
      set: jt(t.toString(), n.set)
    }, r);
  if (typeof n.value == "function" && (i = this.options_) != null && i.autoBind) {
    var s;
    n.value = n.value.bind((s = e.proxy_) != null ? s : e.target_);
  }
  var a = ((o = this.options_) == null ? void 0 : o.deep) === !1 ? pe.ref : pe;
  return a.extend_(e, t, n, r);
}
function Hf(e, t) {
  R("'" + this.annotationType_ + "' cannot be used as a decorator");
}
var qf = "observable", Gf = "observable.ref", Wf = "observable.shallow", Kf = "observable.struct", Ha = {
  deep: !0,
  name: void 0,
  defaultDecorator: void 0,
  proxy: !0
};
Object.freeze(Ha);
function nr(e) {
  return e || Ha;
}
var Mi = /* @__PURE__ */ Gr(qf), zf = /* @__PURE__ */ Gr(Gf, {
  enhancer: qr
}), Yf = /* @__PURE__ */ Gr(Wf, {
  enhancer: yf
}), Xf = /* @__PURE__ */ Gr(Kf, {
  enhancer: Ef
}), qa = /* @__PURE__ */ it(Mi);
function rr(e) {
  return e.deep === !0 ? Mt : e.deep === !1 ? qr : Zf(e.defaultDecorator);
}
function Qf(e) {
  var t;
  return e ? (t = e.defaultDecorator) != null ? t : Ua(e) : void 0;
}
function Zf(e) {
  var t, n;
  return e && (t = (n = e.options_) == null ? void 0 : n.enhancer) != null ? t : Mt;
}
function Ga(e, t, n) {
  if (Kn(t))
    return Mi.decorate_20223_(e, t);
  if (Ft(t)) {
    Wn(e, t, Mi);
    return;
  }
  return Ln(e) ? e : we(e) ? pe.object(e, t, n) : Array.isArray(e) ? pe.array(e, t) : dn(e) ? pe.map(e, t) : ut(e) ? pe.set(e, t) : typeof e == "object" && e !== null ? e : pe.box(e, t);
}
Ca(Ga, qa);
var Jf = {
  box: function(t, n) {
    var r = nr(n);
    return new It(t, rr(r), r.name, !0, r.equals);
  },
  array: function(t, n) {
    var r = nr(n);
    return (A.useProxies === !1 || r.proxy === !1 ? Zd : Ud)(t, rr(r), r.name);
  },
  map: function(t, n) {
    var r = nr(n);
    return new gl(t, rr(r), r.name);
  },
  set: function(t, n) {
    var r = nr(n);
    return new ml(t, rr(r), r.name);
  },
  object: function(t, n, r) {
    return xt(function() {
      return cl(A.useProxies === !1 || (r == null ? void 0 : r.proxy) === !1 ? Wt({}, r) : Md({}, r), t, n);
    });
  },
  ref: /* @__PURE__ */ it(zf),
  shallow: /* @__PURE__ */ it(Yf),
  deep: qa,
  struct: /* @__PURE__ */ it(Xf)
}, pe = /* @__PURE__ */ Ca(Ga, Jf), Wa = "computed", ed = "computed.struct", ji = /* @__PURE__ */ No(Wa), td = /* @__PURE__ */ No(ed, {
  equals: br.structural
}), Wr = function(t, n) {
  if (Kn(n))
    return ji.decorate_20223_(t, n);
  if (Ft(n))
    return Wn(t, n, ji);
  if (we(t))
    return it(No(Wa, t));
  O.NODE_ENV !== "production" && (le(t) || R("First argument to `computed` should be an expression."), le(n) && R("A setter as second argument is no longer supported, use `{ set: fn }` option instead"));
  var r = we(n) ? n : {};
  return r.get = t, r.name || (r.name = t.name || ""), new Be(r);
};
Object.assign(Wr, ji);
Wr.struct = /* @__PURE__ */ it(td);
var fs, ds, yr = 0, nd = 1, rd = (fs = (ds = /* @__PURE__ */ gr(function() {
}, "name")) == null ? void 0 : ds.configurable) != null ? fs : !1, ps = {
  value: "action",
  configurable: !0,
  writable: !1,
  enumerable: !1
};
function jt(e, t, n, r) {
  n === void 0 && (n = !1), O.NODE_ENV !== "production" && (le(t) || R("`action` can only be invoked on functions"), (typeof e != "string" || !e) && R("actions should have valid names, got: '" + e + "'"));
  function i() {
    return Ka(e, n, t, r || this, arguments);
  }
  return i.isMobxAction = !0, i.toString = function() {
    return t.toString();
  }, rd && (ps.value = e, rt(i, "name", ps)), i;
}
function Ka(e, t, n, r, i) {
  var o = id(e, t, r, i);
  try {
    return n.apply(r, i);
  } catch (s) {
    throw o.error_ = s, s;
  } finally {
    od(o);
  }
}
function id(e, t, n, r) {
  var i = O.NODE_ENV !== "production" && he() && !!e, o = 0;
  if (O.NODE_ENV !== "production" && i) {
    o = Date.now();
    var s = r ? Array.from(r) : mr;
    Se({
      type: Ro,
      name: e,
      object: n,
      arguments: s
    });
  }
  var a = A.trackingDerivation, l = !t || !a;
  Ve();
  var u = A.allowStateChanges;
  l && (Gt(), u = Ao(!0));
  var c = To(!0), f = {
    runAsAction_: l,
    prevDerivation_: a,
    prevAllowStateChanges_: u,
    prevAllowStateReads_: c,
    notifySpy_: i,
    startTime_: o,
    actionId_: nd++,
    parentActionId_: yr
  };
  return yr = f.actionId_, f;
}
function od(e) {
  yr !== e.actionId_ && R(30), yr = e.parentActionId_, e.error_ !== void 0 && (A.suppressReactionErrors = !0), xo(e.prevAllowStateChanges_), Nn(e.prevAllowStateReads_), Fe(), e.runAsAction_ && dt(e.prevDerivation_), O.NODE_ENV !== "production" && e.notifySpy_ && Ne({
    time: Date.now() - e.startTime_
  }), A.suppressReactionErrors = !1;
}
function Ao(e) {
  var t = A.allowStateChanges;
  return A.allowStateChanges = e, t;
}
function xo(e) {
  A.allowStateChanges = e;
}
var sd = "create", It = /* @__PURE__ */ function(e) {
  function t(r, i, o, s, a) {
    var l;
    return o === void 0 && (o = O.NODE_ENV !== "production" ? "ObservableValue@" + Ze() : "ObservableValue"), s === void 0 && (s = !0), a === void 0 && (a = br.default), l = e.call(this, o) || this, l.enhancer = void 0, l.name_ = void 0, l.equals = void 0, l.hasUnreportedChange_ = !1, l.interceptors_ = void 0, l.changeListeners_ = void 0, l.value_ = void 0, l.dehancer = void 0, l.enhancer = i, l.name_ = o, l.equals = a, l.value_ = i(r, void 0, o), O.NODE_ENV !== "production" && s && he() && kt({
      type: sd,
      object: l,
      observableKind: "value",
      debugObjectName: l.name_,
      newValue: "" + l.value_
    }), l;
  }
  Fa(t, e);
  var n = t.prototype;
  return n.dehanceValue = function(i) {
    return this.dehancer !== void 0 ? this.dehancer(i) : i;
  }, n.set = function(i) {
    var o = this.value_;
    if (i = this.prepareNewValue_(i), i !== A.UNCHANGED) {
      var s = he();
      O.NODE_ENV !== "production" && s && Se({
        type: Ge,
        object: this,
        observableKind: "value",
        debugObjectName: this.name_,
        newValue: i,
        oldValue: o
      }), this.setNewValue_(i), O.NODE_ENV !== "production" && s && Ne();
    }
  }, n.prepareNewValue_ = function(i) {
    if (nt(this), Le(this)) {
      var o = Pe(this, {
        object: this,
        type: Ge,
        newValue: i
      });
      if (!o)
        return A.UNCHANGED;
      i = o.newValue;
    }
    return i = this.enhancer(i, this.value_, this.name_), this.equals(this.value_, i) ? A.UNCHANGED : i;
  }, n.setNewValue_ = function(i) {
    var o = this.value_;
    this.value_ = i, this.reportChanged(), ze(this) && Ye(this, {
      type: Ge,
      object: this,
      newValue: i,
      oldValue: o
    });
  }, n.get = function() {
    return this.reportObserved(), this.dehanceValue(this.value_);
  }, n.intercept_ = function(i) {
    return Yn(this, i);
  }, n.observe_ = function(i, o) {
    return o && i({
      observableKind: "value",
      debugObjectName: this.name_,
      object: this,
      type: Ge,
      newValue: this.value_,
      oldValue: void 0
    }), Xn(this, i);
  }, n.raw = function() {
    return this.value_;
  }, n.toJSON = function() {
    return this.get();
  }, n.toString = function() {
    return this.name_ + "[" + this.value_ + "]";
  }, n.valueOf = function() {
    return Va(this.get());
  }, n[Symbol.toPrimitive] = function() {
    return this.valueOf();
  }, t;
}(Nt), Be = /* @__PURE__ */ function() {
  function e(n) {
    this.dependenciesState_ = z.NOT_TRACKING_, this.observing_ = [], this.newObserving_ = null, this.observers_ = /* @__PURE__ */ new Set(), this.runId_ = 0, this.lastAccessedBy_ = 0, this.lowestObserverState_ = z.UP_TO_DATE_, this.unboundDepsCount_ = 0, this.value_ = new Er(null), this.name_ = void 0, this.triggeredBy_ = void 0, this.flags_ = 0, this.derivation = void 0, this.setter_ = void 0, this.isTracing_ = ke.NONE, this.scope_ = void 0, this.equals_ = void 0, this.requiresReaction_ = void 0, this.keepAlive_ = void 0, this.onBOL = void 0, this.onBUOL = void 0, n.get || R(31), this.derivation = n.get, this.name_ = n.name || (O.NODE_ENV !== "production" ? "ComputedValue@" + Ze() : "ComputedValue"), n.set && (this.setter_ = jt(O.NODE_ENV !== "production" ? this.name_ + "-setter" : "ComputedValue-setter", n.set)), this.equals_ = n.equals || (n.compareStructural || n.struct ? br.structural : br.default), this.scope_ = n.context, this.requiresReaction_ = n.requiresReaction, this.keepAlive_ = !!n.keepAlive;
  }
  var t = e.prototype;
  return t.onBecomeStale_ = function() {
    pd(this);
  }, t.onBO = function() {
    this.onBOL && this.onBOL.forEach(function(r) {
      return r();
    });
  }, t.onBUO = function() {
    this.onBUOL && this.onBUOL.forEach(function(r) {
      return r();
    });
  }, t.get = function() {
    if (this.isComputing && R(32, this.name_, this.derivation), A.inBatch === 0 && // !globalState.trackingDerivatpion &&
    this.observers_.size === 0 && !this.keepAlive_)
      ki(this) && (this.warnAboutUntrackedRead_(), Ve(), this.value_ = this.computeValue_(!1), Fe());
    else if (el(this), ki(this)) {
      var r = A.trackingContext;
      this.keepAlive_ && !r && (A.trackingContext = this), this.trackAndCompute() && dd(this), A.trackingContext = r;
    }
    var i = this.value_;
    if (cr(i))
      throw i.cause;
    return i;
  }, t.set = function(r) {
    if (this.setter_) {
      this.isRunningSetter && R(33, this.name_), this.isRunningSetter = !0;
      try {
        this.setter_.call(this.scope_, r);
      } finally {
        this.isRunningSetter = !1;
      }
    } else
      R(34, this.name_);
  }, t.trackAndCompute = function() {
    var r = this.value_, i = (
      /* see #1208 */
      this.dependenciesState_ === z.NOT_TRACKING_
    ), o = this.computeValue_(!0), s = i || cr(r) || cr(o) || !this.equals_(r, o);
    return s && (this.value_ = o, O.NODE_ENV !== "production" && he() && kt({
      observableKind: "computed",
      debugObjectName: this.name_,
      object: this.scope_,
      type: "update",
      oldValue: r,
      newValue: o
    })), s;
  }, t.computeValue_ = function(r) {
    this.isComputing = !0;
    var i = Ao(!1), o;
    if (r)
      o = za(this, this.derivation, this.scope_);
    else if (A.disableErrorBoundaries === !0)
      o = this.derivation.call(this.scope_);
    else
      try {
        o = this.derivation.call(this.scope_);
      } catch (s) {
        o = new Er(s);
      }
    return xo(i), this.isComputing = !1, o;
  }, t.suspend_ = function() {
    this.keepAlive_ || (Bi(this), this.value_ = void 0, O.NODE_ENV !== "production" && this.isTracing_ !== ke.NONE && console.log("[mobx.trace] Computed value '" + this.name_ + "' was suspended and it will recompute on the next access."));
  }, t.observe_ = function(r, i) {
    var o = this, s = !0, a = void 0;
    return Od(function() {
      var l = o.get();
      if (!s || i) {
        var u = Gt();
        r({
          observableKind: "computed",
          debugObjectName: o.name_,
          type: Ge,
          object: o,
          newValue: l,
          oldValue: a
        }), dt(u);
      }
      s = !1, a = l;
    });
  }, t.warnAboutUntrackedRead_ = function() {
    O.NODE_ENV !== "production" && (this.isTracing_ !== ke.NONE && console.log("[mobx.trace] Computed value '" + this.name_ + "' is being read outside a reactive context. Doing a full recompute."), (typeof this.requiresReaction_ == "boolean" ? this.requiresReaction_ : A.computedRequiresReaction) && console.warn("[mobx] Computed value '" + this.name_ + "' is being read outside a reactive context. Doing a full recompute."));
  }, t.toString = function() {
    return this.name_ + "[" + this.derivation.toString() + "]";
  }, t.valueOf = function() {
    return Va(this.get());
  }, t[Symbol.toPrimitive] = function() {
    return this.valueOf();
  }, pn(e, [{
    key: "isComputing",
    get: function() {
      return Ee(this.flags_, e.isComputingMask_);
    },
    set: function(r) {
      this.flags_ = Oe(this.flags_, e.isComputingMask_, r);
    }
  }, {
    key: "isRunningSetter",
    get: function() {
      return Ee(this.flags_, e.isRunningSetterMask_);
    },
    set: function(r) {
      this.flags_ = Oe(this.flags_, e.isRunningSetterMask_, r);
    }
  }, {
    key: "isBeingObserved",
    get: function() {
      return Ee(this.flags_, e.isBeingObservedMask_);
    },
    set: function(r) {
      this.flags_ = Oe(this.flags_, e.isBeingObservedMask_, r);
    }
  }, {
    key: "isPendingUnobservation",
    get: function() {
      return Ee(this.flags_, e.isPendingUnobservationMask_);
    },
    set: function(r) {
      this.flags_ = Oe(this.flags_, e.isPendingUnobservationMask_, r);
    }
  }, {
    key: "diffValue",
    get: function() {
      return Ee(this.flags_, e.diffValueMask_) ? 1 : 0;
    },
    set: function(r) {
      this.flags_ = Oe(this.flags_, e.diffValueMask_, r === 1);
    }
  }]);
}();
Be.isComputingMask_ = 1;
Be.isRunningSetterMask_ = 2;
Be.isBeingObservedMask_ = 4;
Be.isPendingUnobservationMask_ = 8;
Be.diffValueMask_ = 16;
var Kr = /* @__PURE__ */ qt("ComputedValue", Be), z;
(function(e) {
  e[e.NOT_TRACKING_ = -1] = "NOT_TRACKING_", e[e.UP_TO_DATE_ = 0] = "UP_TO_DATE_", e[e.POSSIBLY_STALE_ = 1] = "POSSIBLY_STALE_", e[e.STALE_ = 2] = "STALE_";
})(z || (z = {}));
var ke;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.LOG = 1] = "LOG", e[e.BREAK = 2] = "BREAK";
})(ke || (ke = {}));
var Er = function(t) {
  this.cause = void 0, this.cause = t;
};
function cr(e) {
  return e instanceof Er;
}
function ki(e) {
  switch (e.dependenciesState_) {
    case z.UP_TO_DATE_:
      return !1;
    case z.NOT_TRACKING_:
    case z.STALE_:
      return !0;
    case z.POSSIBLY_STALE_: {
      for (var t = To(!0), n = Gt(), r = e.observing_, i = r.length, o = 0; o < i; o++) {
        var s = r[o];
        if (Kr(s)) {
          if (A.disableErrorBoundaries)
            s.get();
          else
            try {
              s.get();
            } catch {
              return dt(n), Nn(t), !0;
            }
          if (e.dependenciesState_ === z.STALE_)
            return dt(n), Nn(t), !0;
        }
      }
      return Xa(e), dt(n), Nn(t), !1;
    }
  }
}
function nt(e) {
  if (O.NODE_ENV !== "production") {
    var t = e.observers_.size > 0;
    !A.allowStateChanges && (t || A.enforceActions === "always") && console.warn("[MobX] " + (A.enforceActions ? "Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: " : "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, a computed value or the render function of a React component? You can wrap side effects in 'runInAction' (or decorate functions with 'action') if needed. Tried to modify: ") + e.name_);
  }
}
function ad(e) {
  O.NODE_ENV !== "production" && !A.allowStateReads && A.observableRequiresReaction && console.warn("[mobx] Observable '" + e.name_ + "' being read outside a reactive context.");
}
function za(e, t, n) {
  var r = To(!0);
  Xa(e), e.newObserving_ = new Array(
    // Reserve constant space for initial dependencies, dynamic space otherwise.
    // See https://github.com/mobxjs/mobx/pull/3833
    e.runId_ === 0 ? 100 : e.observing_.length
  ), e.unboundDepsCount_ = 0, e.runId_ = ++A.runId;
  var i = A.trackingDerivation;
  A.trackingDerivation = e, A.inBatch++;
  var o;
  if (A.disableErrorBoundaries === !0)
    o = t.call(n);
  else
    try {
      o = t.call(n);
    } catch (s) {
      o = new Er(s);
    }
  return A.inBatch--, A.trackingDerivation = i, ud(e), ld(e), Nn(r), o;
}
function ld(e) {
  O.NODE_ENV !== "production" && e.observing_.length === 0 && (typeof e.requiresObservable_ == "boolean" ? e.requiresObservable_ : A.reactionRequiresObservable) && console.warn("[mobx] Derivation '" + e.name_ + "' is created/updated without reading any observable value.");
}
function ud(e) {
  for (var t = e.observing_, n = e.observing_ = e.newObserving_, r = z.UP_TO_DATE_, i = 0, o = e.unboundDepsCount_, s = 0; s < o; s++) {
    var a = n[s];
    a.diffValue === 0 && (a.diffValue = 1, i !== s && (n[i] = a), i++), a.dependenciesState_ > r && (r = a.dependenciesState_);
  }
  for (n.length = i, e.newObserving_ = null, o = t.length; o--; ) {
    var l = t[o];
    l.diffValue === 0 && Za(l, e), l.diffValue = 0;
  }
  for (; i--; ) {
    var u = n[i];
    u.diffValue === 1 && (u.diffValue = 0, fd(u, e));
  }
  r !== z.UP_TO_DATE_ && (e.dependenciesState_ = r, e.onBecomeStale_());
}
function Bi(e) {
  var t = e.observing_;
  e.observing_ = [];
  for (var n = t.length; n--; )
    Za(t[n], e);
  e.dependenciesState_ = z.NOT_TRACKING_;
}
function Ya(e) {
  var t = Gt();
  try {
    return e();
  } finally {
    dt(t);
  }
}
function Gt() {
  var e = A.trackingDerivation;
  return A.trackingDerivation = null, e;
}
function dt(e) {
  A.trackingDerivation = e;
}
function To(e) {
  var t = A.allowStateReads;
  return A.allowStateReads = e, t;
}
function Nn(e) {
  A.allowStateReads = e;
}
function Xa(e) {
  if (e.dependenciesState_ !== z.UP_TO_DATE_) {
    e.dependenciesState_ = z.UP_TO_DATE_;
    for (var t = e.observing_, n = t.length; n--; )
      t[n].lowestObserverState_ = z.UP_TO_DATE_;
  }
}
var fr = function() {
  this.version = 6, this.UNCHANGED = {}, this.trackingDerivation = null, this.trackingContext = null, this.runId = 0, this.mobxGuid = 0, this.inBatch = 0, this.pendingUnobservations = [], this.pendingReactions = [], this.isRunningReactions = !1, this.allowStateChanges = !1, this.allowStateReads = !0, this.enforceActions = !0, this.spyListeners = [], this.globalReactionErrorHandlers = [], this.computedRequiresReaction = !1, this.reactionRequiresObservable = !1, this.observableRequiresReaction = !1, this.disableErrorBoundaries = !1, this.suppressReactionErrors = !1, this.useProxies = !0, this.verifyProxies = !1, this.safeDescriptors = !0;
}, dr = !0, Qa = !1, A = /* @__PURE__ */ function() {
  var e = /* @__PURE__ */ kr();
  return e.__mobxInstanceCount > 0 && !e.__mobxGlobals && (dr = !1), e.__mobxGlobals && e.__mobxGlobals.version !== new fr().version && (dr = !1), dr ? e.__mobxGlobals ? (e.__mobxInstanceCount += 1, e.__mobxGlobals.UNCHANGED || (e.__mobxGlobals.UNCHANGED = {}), e.__mobxGlobals) : (e.__mobxInstanceCount = 1, e.__mobxGlobals = /* @__PURE__ */ new fr()) : (setTimeout(function() {
    Qa || R(35);
  }, 1), new fr());
}();
function cd() {
  if ((A.pendingReactions.length || A.inBatch || A.isRunningReactions) && R(36), Qa = !0, dr) {
    var e = kr();
    --e.__mobxInstanceCount === 0 && (e.__mobxGlobals = void 0), A = new fr();
  }
}
function fd(e, t) {
  e.observers_.add(t), e.lowestObserverState_ > t.dependenciesState_ && (e.lowestObserverState_ = t.dependenciesState_);
}
function Za(e, t) {
  e.observers_.delete(t), e.observers_.size === 0 && Ja(e);
}
function Ja(e) {
  e.isPendingUnobservation === !1 && (e.isPendingUnobservation = !0, A.pendingUnobservations.push(e));
}
function Ve() {
  A.inBatch++;
}
function Fe() {
  if (--A.inBatch === 0) {
    il();
    for (var e = A.pendingUnobservations, t = 0; t < e.length; t++) {
      var n = e[t];
      n.isPendingUnobservation = !1, n.observers_.size === 0 && (n.isBeingObserved && (n.isBeingObserved = !1, n.onBUO()), n instanceof Be && n.suspend_());
    }
    A.pendingUnobservations = [];
  }
}
function el(e) {
  ad(e);
  var t = A.trackingDerivation;
  return t !== null ? (t.runId_ !== e.lastAccessedBy_ && (e.lastAccessedBy_ = t.runId_, t.newObserving_[t.unboundDepsCount_++] = e, !e.isBeingObserved && A.trackingContext && (e.isBeingObserved = !0, e.onBO())), e.isBeingObserved) : (e.observers_.size === 0 && A.inBatch > 0 && Ja(e), !1);
}
function tl(e) {
  e.lowestObserverState_ !== z.STALE_ && (e.lowestObserverState_ = z.STALE_, e.observers_.forEach(function(t) {
    t.dependenciesState_ === z.UP_TO_DATE_ && (O.NODE_ENV !== "production" && t.isTracing_ !== ke.NONE && nl(t, e), t.onBecomeStale_()), t.dependenciesState_ = z.STALE_;
  }));
}
function dd(e) {
  e.lowestObserverState_ !== z.STALE_ && (e.lowestObserverState_ = z.STALE_, e.observers_.forEach(function(t) {
    t.dependenciesState_ === z.POSSIBLY_STALE_ ? (t.dependenciesState_ = z.STALE_, O.NODE_ENV !== "production" && t.isTracing_ !== ke.NONE && nl(t, e)) : t.dependenciesState_ === z.UP_TO_DATE_ && (e.lowestObserverState_ = z.UP_TO_DATE_);
  }));
}
function pd(e) {
  e.lowestObserverState_ === z.UP_TO_DATE_ && (e.lowestObserverState_ = z.POSSIBLY_STALE_, e.observers_.forEach(function(t) {
    t.dependenciesState_ === z.UP_TO_DATE_ && (t.dependenciesState_ = z.POSSIBLY_STALE_, t.onBecomeStale_());
  }));
}
function nl(e, t) {
  if (console.log("[mobx.trace] '" + e.name_ + "' is invalidated due to a change in: '" + t.name_ + "'"), e.isTracing_ === ke.BREAK) {
    var n = [];
    rl(fl(e), n, 1), new Function(`debugger;
/*
Tracing '` + e.name_ + `'

You are entering this break point because derivation '` + e.name_ + "' is being traced and '" + t.name_ + `' is now forcing it to update.
Just follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update
The stackframe you are looking for is at least ~6-8 stack-frames up.

` + (e instanceof Be ? e.derivation.toString().replace(/[*]\//g, "/") : "") + `

The dependencies for this derivation are:

` + n.join(`
`) + `
*/
    `)();
  }
}
function rl(e, t, n) {
  if (t.length >= 1e3) {
    t.push("(and many more)");
    return;
  }
  t.push("" + "	".repeat(n - 1) + e.name), e.dependencies && e.dependencies.forEach(function(r) {
    return rl(r, t, n + 1);
  });
}
var vt = /* @__PURE__ */ function() {
  function e(n, r, i, o) {
    n === void 0 && (n = O.NODE_ENV !== "production" ? "Reaction@" + Ze() : "Reaction"), this.name_ = void 0, this.onInvalidate_ = void 0, this.errorHandler_ = void 0, this.requiresObservable_ = void 0, this.observing_ = [], this.newObserving_ = [], this.dependenciesState_ = z.NOT_TRACKING_, this.runId_ = 0, this.unboundDepsCount_ = 0, this.flags_ = 0, this.isTracing_ = ke.NONE, this.name_ = n, this.onInvalidate_ = r, this.errorHandler_ = i, this.requiresObservable_ = o;
  }
  var t = e.prototype;
  return t.onBecomeStale_ = function() {
    this.schedule_();
  }, t.schedule_ = function() {
    this.isScheduled || (this.isScheduled = !0, A.pendingReactions.push(this), il());
  }, t.runReaction_ = function() {
    if (!this.isDisposed) {
      Ve(), this.isScheduled = !1;
      var r = A.trackingContext;
      if (A.trackingContext = this, ki(this)) {
        this.isTrackPending = !0;
        try {
          this.onInvalidate_(), O.NODE_ENV !== "production" && this.isTrackPending && he() && kt({
            name: this.name_,
            type: "scheduled-reaction"
          });
        } catch (i) {
          this.reportExceptionInDerivation_(i);
        }
      }
      A.trackingContext = r, Fe();
    }
  }, t.track = function(r) {
    if (!this.isDisposed) {
      Ve();
      var i = he(), o;
      O.NODE_ENV !== "production" && i && (o = Date.now(), Se({
        name: this.name_,
        type: "reaction"
      })), this.isRunning = !0;
      var s = A.trackingContext;
      A.trackingContext = this;
      var a = za(this, r, void 0);
      A.trackingContext = s, this.isRunning = !1, this.isTrackPending = !1, this.isDisposed && Bi(this), cr(a) && this.reportExceptionInDerivation_(a.cause), O.NODE_ENV !== "production" && i && Ne({
        time: Date.now() - o
      }), Fe();
    }
  }, t.reportExceptionInDerivation_ = function(r) {
    var i = this;
    if (this.errorHandler_) {
      this.errorHandler_(r, this);
      return;
    }
    if (A.disableErrorBoundaries)
      throw r;
    var o = O.NODE_ENV !== "production" ? "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this + "'" : "[mobx] uncaught error in '" + this + "'";
    A.suppressReactionErrors ? O.NODE_ENV !== "production" && console.warn("[mobx] (error in reaction '" + this.name_ + "' suppressed, fix error of causing action below)") : console.error(o, r), O.NODE_ENV !== "production" && he() && kt({
      type: "error",
      name: this.name_,
      message: o,
      error: "" + r
    }), A.globalReactionErrorHandlers.forEach(function(s) {
      return s(r, i);
    });
  }, t.dispose = function() {
    this.isDisposed || (this.isDisposed = !0, this.isRunning || (Ve(), Bi(this), Fe()));
  }, t.getDisposer_ = function(r) {
    var i = this, o = function s() {
      i.dispose(), r == null || r.removeEventListener == null || r.removeEventListener("abort", s);
    };
    return r == null || r.addEventListener == null || r.addEventListener("abort", o), o[F] = this, o;
  }, t.toString = function() {
    return "Reaction[" + this.name_ + "]";
  }, t.trace = function(r) {
    r === void 0 && (r = !1), Id(this, r);
  }, pn(e, [{
    key: "isDisposed",
    get: function() {
      return Ee(this.flags_, e.isDisposedMask_);
    },
    set: function(r) {
      this.flags_ = Oe(this.flags_, e.isDisposedMask_, r);
    }
  }, {
    key: "isScheduled",
    get: function() {
      return Ee(this.flags_, e.isScheduledMask_);
    },
    set: function(r) {
      this.flags_ = Oe(this.flags_, e.isScheduledMask_, r);
    }
  }, {
    key: "isTrackPending",
    get: function() {
      return Ee(this.flags_, e.isTrackPendingMask_);
    },
    set: function(r) {
      this.flags_ = Oe(this.flags_, e.isTrackPendingMask_, r);
    }
  }, {
    key: "isRunning",
    get: function() {
      return Ee(this.flags_, e.isRunningMask_);
    },
    set: function(r) {
      this.flags_ = Oe(this.flags_, e.isRunningMask_, r);
    }
  }, {
    key: "diffValue",
    get: function() {
      return Ee(this.flags_, e.diffValueMask_) ? 1 : 0;
    },
    set: function(r) {
      this.flags_ = Oe(this.flags_, e.diffValueMask_, r === 1);
    }
  }]);
}();
vt.isDisposedMask_ = 1;
vt.isScheduledMask_ = 2;
vt.isTrackPendingMask_ = 4;
vt.isRunningMask_ = 8;
vt.diffValueMask_ = 16;
var hs = 100, Ui = function(t) {
  return t();
};
function il() {
  A.inBatch > 0 || A.isRunningReactions || Ui(hd);
}
function hd() {
  A.isRunningReactions = !0;
  for (var e = A.pendingReactions, t = 0; e.length > 0; ) {
    ++t === hs && (console.error(O.NODE_ENV !== "production" ? "Reaction doesn't converge to a stable state after " + hs + " iterations." + (" Probably there is a cycle in the reactive function: " + e[0]) : "[mobx] cycle in reaction: " + e[0]), e.splice(0));
    for (var n = e.splice(0), r = 0, i = n.length; r < i; r++)
      n[r].runReaction_();
  }
  A.isRunningReactions = !1;
}
var Or = /* @__PURE__ */ qt("Reaction", vt);
function vd(e) {
  var t = Ui;
  Ui = function(r) {
    return e(function() {
      return t(r);
    });
  };
}
function he() {
  return O.NODE_ENV !== "production" && !!A.spyListeners.length;
}
function kt(e) {
  if (O.NODE_ENV !== "production" && A.spyListeners.length)
    for (var t = A.spyListeners, n = 0, r = t.length; n < r; n++)
      t[n](e);
}
function Se(e) {
  if (O.NODE_ENV !== "production") {
    var t = ht({}, e, {
      spyReportStart: !0
    });
    kt(t);
  }
}
var gd = {
  type: "report-end",
  spyReportEnd: !0
};
function Ne(e) {
  O.NODE_ENV !== "production" && kt(e ? ht({}, e, {
    type: "report-end",
    spyReportEnd: !0
  }) : gd);
}
function md(e) {
  return O.NODE_ENV === "production" ? (console.warn("[mobx.spy] Is a no-op in production builds"), function() {
  }) : (A.spyListeners.push(e), wo(function() {
    A.spyListeners = A.spyListeners.filter(function(t) {
      return t !== e;
    });
  }));
}
var Ro = "action", bd = "action.bound", ol = "autoAction", _d = "autoAction.bound", sl = "<unnamed action>", Hi = /* @__PURE__ */ zn(Ro), yd = /* @__PURE__ */ zn(bd, {
  bound: !0
}), qi = /* @__PURE__ */ zn(ol, {
  autoAction: !0
}), Ed = /* @__PURE__ */ zn(_d, {
  autoAction: !0,
  bound: !0
});
function al(e) {
  var t = function(r, i) {
    if (le(r))
      return jt(r.name || sl, r, e);
    if (le(i))
      return jt(r, i, e);
    if (Kn(i))
      return (e ? qi : Hi).decorate_20223_(r, i);
    if (Ft(i))
      return Wn(r, i, e ? qi : Hi);
    if (Ft(r))
      return it(zn(e ? ol : Ro, {
        name: r,
        autoAction: e
      }));
    O.NODE_ENV !== "production" && R("Invalid arguments for `action`");
  };
  return t;
}
var tn = /* @__PURE__ */ al(!1);
Object.assign(tn, Hi);
var Dn = /* @__PURE__ */ al(!0);
Object.assign(Dn, qi);
tn.bound = /* @__PURE__ */ it(yd);
Dn.bound = /* @__PURE__ */ it(Ed);
function ci(e) {
  return Ka(e.name || sl, !1, e, this, void 0);
}
function an(e) {
  return le(e) && e.isMobxAction === !0;
}
function Od(e, t) {
  var n, r, i, o;
  t === void 0 && (t = Da), O.NODE_ENV !== "production" && (le(e) || R("Autorun expects a function as first argument"), an(e) && R("Autorun does not accept actions since actions are untrackable"));
  var s = (n = (r = t) == null ? void 0 : r.name) != null ? n : O.NODE_ENV !== "production" ? e.name || "Autorun@" + Ze() : "Autorun", a = !t.scheduler && !t.delay, l;
  if (a)
    l = new vt(s, function() {
      this.track(f);
    }, t.onError, t.requiresObservable);
  else {
    var u = Sd(t), c = !1;
    l = new vt(s, function() {
      c || (c = !0, u(function() {
        c = !1, l.isDisposed || l.track(f);
      }));
    }, t.onError, t.requiresObservable);
  }
  function f() {
    e(l);
  }
  return (i = t) != null && (i = i.signal) != null && i.aborted || l.schedule_(), l.getDisposer_((o = t) == null ? void 0 : o.signal);
}
var wd = function(t) {
  return t();
};
function Sd(e) {
  return e.scheduler ? e.scheduler : e.delay ? function(t) {
    return setTimeout(t, e.delay);
  } : wd;
}
var Nd = "onBO", Ad = "onBUO";
function xd(e, t, n) {
  return ul(Nd, e, t, n);
}
function ll(e, t, n) {
  return ul(Ad, e, t, n);
}
function ul(e, t, n, r) {
  var i = un(t), o = le(r) ? r : n, s = e + "L";
  return i[s] ? i[s].add(o) : i[s] = /* @__PURE__ */ new Set([o]), function() {
    var a = i[s];
    a && (a.delete(o), a.size === 0 && delete i[s]);
  };
}
var Td = "never", ir = "always", Rd = "observed";
function Cd(e) {
  e.isolateGlobalState === !0 && cd();
  var t = e.useProxies, n = e.enforceActions;
  if (t !== void 0 && (A.useProxies = t === ir ? !0 : t === Td ? !1 : typeof Proxy < "u"), t === "ifavailable" && (A.verifyProxies = !0), n !== void 0) {
    var r = n === ir ? ir : n === Rd;
    A.enforceActions = r, A.allowStateChanges = !(r === !0 || r === ir);
  }
  ["computedRequiresReaction", "reactionRequiresObservable", "observableRequiresReaction", "disableErrorBoundaries", "safeDescriptors"].forEach(function(i) {
    i in e && (A[i] = !!e[i]);
  }), A.allowStateReads = !A.observableRequiresReaction, O.NODE_ENV !== "production" && A.disableErrorBoundaries === !0 && console.warn("WARNING: Debug feature only. MobX will NOT recover from errors when `disableErrorBoundaries` is enabled."), e.reactionScheduler && vd(e.reactionScheduler);
}
function cl(e, t, n, r) {
  O.NODE_ENV !== "production" && (arguments.length > 4 && R("'extendObservable' expected 2-4 arguments"), typeof e != "object" && R("'extendObservable' expects an object as first argument"), At(e) && R("'extendObservable' should not be used on maps, use map.merge instead"), we(t) || R("'extendObservable' only accepts plain objects as second argument"), (Ln(t) || Ln(n)) && R("Extending an object with another observable (object) is not supported"));
  var i = ff(t);
  return xt(function() {
    var o = Wt(e, r)[F];
    sn(i).forEach(function(s) {
      o.extend_(
        s,
        i[s],
        // must pass "undefined" for { key: undefined }
        n && s in n ? n[s] : !0
      );
    });
  }), e;
}
function fl(e, t) {
  return dl(un(e, t));
}
function dl(e) {
  var t = {
    name: e.name_
  };
  return e.observing_ && e.observing_.length > 0 && (t.dependencies = Dd(e.observing_).map(dl)), t;
}
function Dd(e) {
  return Array.from(new Set(e));
}
var $d = 0;
function pl() {
  this.message = "FLOW_CANCELLED";
}
pl.prototype = /* @__PURE__ */ Object.create(Error.prototype);
var fi = /* @__PURE__ */ ka("flow"), Ld = /* @__PURE__ */ ka("flow.bound", {
  bound: !0
}), ln = /* @__PURE__ */ Object.assign(function(t, n) {
  if (Kn(n))
    return fi.decorate_20223_(t, n);
  if (Ft(n))
    return Wn(t, n, fi);
  O.NODE_ENV !== "production" && arguments.length !== 1 && R("Flow expects single argument with generator function");
  var r = t, i = r.name || "<unnamed flow>", o = function() {
    var a = this, l = arguments, u = ++$d, c = tn(i + " - runid: " + u + " - init", r).apply(a, l), f, p = void 0, d = new Promise(function(h, g) {
      var b = 0;
      f = g;
      function E(w) {
        p = void 0;
        var x;
        try {
          x = tn(i + " - runid: " + u + " - yield " + b++, c.next).call(c, w);
        } catch (N) {
          return g(N);
        }
        y(x);
      }
      function _(w) {
        p = void 0;
        var x;
        try {
          x = tn(i + " - runid: " + u + " - yield " + b++, c.throw).call(c, w);
        } catch (N) {
          return g(N);
        }
        y(x);
      }
      function y(w) {
        if (le(w == null ? void 0 : w.then)) {
          w.then(y, g);
          return;
        }
        return w.done ? h(w.value) : (p = Promise.resolve(w.value), p.then(E, _));
      }
      E(void 0);
    });
    return d.cancel = tn(i + " - runid: " + u + " - cancel", function() {
      try {
        p && vs(p);
        var h = c.return(void 0), g = Promise.resolve(h.value);
        g.then(Jt, Jt), vs(g), f(new pl());
      } catch (b) {
        f(b);
      }
    }), d;
  };
  return o.isMobXFlow = !0, o;
}, fi);
ln.bound = /* @__PURE__ */ it(Ld);
function vs(e) {
  le(e.cancel) && e.cancel();
}
function $n(e) {
  return (e == null ? void 0 : e.isMobXFlow) === !0;
}
function Pd(e, t) {
  return e ? hn(e) || !!e[F] || So(e) || Or(e) || Kr(e) : !1;
}
function Ln(e) {
  return O.NODE_ENV !== "production" && arguments.length !== 1 && R("isObservable expects only 1 argument. Use isObservableProp to inspect the observability of a property"), Pd(e);
}
function Id() {
  if (O.NODE_ENV !== "production") {
    for (var e = !1, t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    typeof n[n.length - 1] == "boolean" && (e = n.pop());
    var i = Vd(n);
    if (!i)
      return R("'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly");
    i.isTracing_ === ke.NONE && console.log("[mobx.trace] '" + i.name_ + "' tracing enabled"), i.isTracing_ = e ? ke.BREAK : ke.LOG;
  }
}
function Vd(e) {
  switch (e.length) {
    case 0:
      return A.trackingDerivation;
    case 1:
      return un(e[0]);
    case 2:
      return un(e[0], e[1]);
  }
}
function ct(e, t) {
  t === void 0 && (t = void 0), Ve();
  try {
    return e.apply(t);
  } finally {
    Fe();
  }
}
function Rt(e) {
  return e[F];
}
var Fd = {
  has: function(t, n) {
    return O.NODE_ENV !== "production" && A.trackingDerivation && wn("detect new properties using the 'in' operator. Use 'has' from 'mobx' instead."), Rt(t).has_(n);
  },
  get: function(t, n) {
    return Rt(t).get_(n);
  },
  set: function(t, n, r) {
    var i;
    return Ft(n) ? (O.NODE_ENV !== "production" && !Rt(t).values_.has(n) && wn("add a new observable property through direct assignment. Use 'set' from 'mobx' instead."), (i = Rt(t).set_(n, r, !0)) != null ? i : !0) : !1;
  },
  deleteProperty: function(t, n) {
    var r;
    return O.NODE_ENV !== "production" && wn("delete properties from an observable object. Use 'remove' from 'mobx' instead."), Ft(n) ? (r = Rt(t).delete_(n, !0)) != null ? r : !0 : !1;
  },
  defineProperty: function(t, n, r) {
    var i;
    return O.NODE_ENV !== "production" && wn("define property on an observable object. Use 'defineProperty' from 'mobx' instead."), (i = Rt(t).defineProperty_(n, r)) != null ? i : !0;
  },
  ownKeys: function(t) {
    return O.NODE_ENV !== "production" && A.trackingDerivation && wn("iterate keys to detect added / removed properties. Use 'keys' from 'mobx' instead."), Rt(t).ownKeys_();
  },
  preventExtensions: function(t) {
    R(13);
  }
};
function Md(e, t) {
  var n, r;
  return $a(), e = Wt(e, t), (r = (n = e[F]).proxy_) != null ? r : n.proxy_ = new Proxy(e, Fd);
}
function Le(e) {
  return e.interceptors_ !== void 0 && e.interceptors_.length > 0;
}
function Yn(e, t) {
  var n = e.interceptors_ || (e.interceptors_ = []);
  return n.push(t), wo(function() {
    var r = n.indexOf(t);
    r !== -1 && n.splice(r, 1);
  });
}
function Pe(e, t) {
  var n = Gt();
  try {
    for (var r = [].concat(e.interceptors_ || []), i = 0, o = r.length; i < o && (t = r[i](t), t && !t.type && R(14), !!t); i++)
      ;
    return t;
  } finally {
    dt(n);
  }
}
function ze(e) {
  return e.changeListeners_ !== void 0 && e.changeListeners_.length > 0;
}
function Xn(e, t) {
  var n = e.changeListeners_ || (e.changeListeners_ = []);
  return n.push(t), wo(function() {
    var r = n.indexOf(t);
    r !== -1 && n.splice(r, 1);
  });
}
function Ye(e, t) {
  var n = Gt(), r = e.changeListeners_;
  if (r) {
    r = r.slice();
    for (var i = 0, o = r.length; i < o; i++)
      r[i](t);
    dt(n);
  }
}
function jd(e, t, n) {
  return xt(function() {
    var r, i = Wt(e, n)[F];
    O.NODE_ENV !== "production" && t && e[_e] && R("makeObservable second arg must be nullish when using decorators. Mixing @decorator syntax with annotations is not supported."), (r = t) != null || (t = mf(e)), sn(t).forEach(function(o) {
      return i.make_(o, t[o]);
    });
  }), e;
}
var di = /* @__PURE__ */ Symbol("mobx-keys");
function hl(e, t, n) {
  return O.NODE_ENV !== "production" && (!we(e) && !we(Object.getPrototypeOf(e)) && R("'makeAutoObservable' can only be used for classes that don't have a superclass"), hn(e) && R("makeAutoObservable can only be used on objects not already made observable")), we(e) ? cl(e, e, t, n) : (xt(function() {
    var r = Wt(e, n)[F];
    if (!e[di]) {
      var i = Object.getPrototypeOf(e), o = new Set([].concat(sn(e), sn(i)));
      o.delete("constructor"), o.delete(F), Gn(i, di, o);
    }
    e[di].forEach(function(s) {
      return r.make_(
        s,
        // must pass "undefined" for { key: undefined }
        t && s in t ? t[s] : !0
      );
    });
  }), e);
}
var gs = "splice", Ge = "update", kd = 1e4, Bd = {
  get: function(t, n) {
    var r = t[F];
    return n === F ? r : n === "length" ? r.getArrayLength_() : typeof n == "string" && !isNaN(n) ? r.get_(parseInt(n)) : je(wr, n) ? wr[n] : t[n];
  },
  set: function(t, n, r) {
    var i = t[F];
    return n === "length" && i.setArrayLength_(r), typeof n == "symbol" || isNaN(n) ? t[n] = r : i.set_(parseInt(n), r), !0;
  },
  preventExtensions: function() {
    R(15);
  }
}, Co = /* @__PURE__ */ function() {
  function e(n, r, i, o) {
    n === void 0 && (n = O.NODE_ENV !== "production" ? "ObservableArray@" + Ze() : "ObservableArray"), this.owned_ = void 0, this.legacyMode_ = void 0, this.atom_ = void 0, this.values_ = [], this.interceptors_ = void 0, this.changeListeners_ = void 0, this.enhancer_ = void 0, this.dehancer = void 0, this.proxy_ = void 0, this.lastKnownLength_ = 0, this.owned_ = i, this.legacyMode_ = o, this.atom_ = new Nt(n), this.enhancer_ = function(s, a) {
      return r(s, a, O.NODE_ENV !== "production" ? n + "[..]" : "ObservableArray[..]");
    };
  }
  var t = e.prototype;
  return t.dehanceValue_ = function(r) {
    return this.dehancer !== void 0 ? this.dehancer(r) : r;
  }, t.dehanceValues_ = function(r) {
    return this.dehancer !== void 0 && r.length > 0 ? r.map(this.dehancer) : r;
  }, t.intercept_ = function(r) {
    return Yn(this, r);
  }, t.observe_ = function(r, i) {
    return i === void 0 && (i = !1), i && r({
      observableKind: "array",
      object: this.proxy_,
      debugObjectName: this.atom_.name_,
      type: "splice",
      index: 0,
      added: this.values_.slice(),
      addedCount: this.values_.length,
      removed: [],
      removedCount: 0
    }), Xn(this, r);
  }, t.getArrayLength_ = function() {
    return this.atom_.reportObserved(), this.values_.length;
  }, t.setArrayLength_ = function(r) {
    (typeof r != "number" || isNaN(r) || r < 0) && R("Out of range: " + r);
    var i = this.values_.length;
    if (r !== i)
      if (r > i) {
        for (var o = new Array(r - i), s = 0; s < r - i; s++)
          o[s] = void 0;
        this.spliceWithArray_(i, 0, o);
      } else
        this.spliceWithArray_(r, i - r);
  }, t.updateArrayLength_ = function(r, i) {
    r !== this.lastKnownLength_ && R(16), this.lastKnownLength_ += i, this.legacyMode_ && i > 0 && yl(r + i + 1);
  }, t.spliceWithArray_ = function(r, i, o) {
    var s = this;
    nt(this.atom_);
    var a = this.values_.length;
    if (r === void 0 ? r = 0 : r > a ? r = a : r < 0 && (r = Math.max(0, a + r)), arguments.length === 1 ? i = a - r : i == null ? i = 0 : i = Math.max(0, Math.min(i, a - r)), o === void 0 && (o = mr), Le(this)) {
      var l = Pe(this, {
        object: this.proxy_,
        type: gs,
        index: r,
        removedCount: i,
        added: o
      });
      if (!l)
        return mr;
      i = l.removedCount, o = l.added;
    }
    if (o = o.length === 0 ? o : o.map(function(f) {
      return s.enhancer_(f, void 0);
    }), this.legacyMode_ || O.NODE_ENV !== "production") {
      var u = o.length - i;
      this.updateArrayLength_(a, u);
    }
    var c = this.spliceItemsIntoValues_(r, i, o);
    return (i !== 0 || o.length !== 0) && this.notifyArraySplice_(r, o, c), this.dehanceValues_(c);
  }, t.spliceItemsIntoValues_ = function(r, i, o) {
    if (o.length < kd) {
      var s;
      return (s = this.values_).splice.apply(s, [r, i].concat(o));
    } else {
      var a = this.values_.slice(r, r + i), l = this.values_.slice(r + i);
      this.values_.length += o.length - i;
      for (var u = 0; u < o.length; u++)
        this.values_[r + u] = o[u];
      for (var c = 0; c < l.length; c++)
        this.values_[r + o.length + c] = l[c];
      return a;
    }
  }, t.notifyArrayChildUpdate_ = function(r, i, o) {
    var s = !this.owned_ && he(), a = ze(this), l = a || s ? {
      observableKind: "array",
      object: this.proxy_,
      type: Ge,
      debugObjectName: this.atom_.name_,
      index: r,
      newValue: i,
      oldValue: o
    } : null;
    O.NODE_ENV !== "production" && s && Se(l), this.atom_.reportChanged(), a && Ye(this, l), O.NODE_ENV !== "production" && s && Ne();
  }, t.notifyArraySplice_ = function(r, i, o) {
    var s = !this.owned_ && he(), a = ze(this), l = a || s ? {
      observableKind: "array",
      object: this.proxy_,
      debugObjectName: this.atom_.name_,
      type: gs,
      index: r,
      removed: o,
      added: i,
      removedCount: o.length,
      addedCount: i.length
    } : null;
    O.NODE_ENV !== "production" && s && Se(l), this.atom_.reportChanged(), a && Ye(this, l), O.NODE_ENV !== "production" && s && Ne();
  }, t.get_ = function(r) {
    if (this.legacyMode_ && r >= this.values_.length) {
      console.warn(O.NODE_ENV !== "production" ? "[mobx.array] Attempt to read an array index (" + r + ") that is out of bounds (" + this.values_.length + "). Please check length first. Out of bound indices will not be tracked by MobX" : "[mobx] Out of bounds read: " + r);
      return;
    }
    return this.atom_.reportObserved(), this.dehanceValue_(this.values_[r]);
  }, t.set_ = function(r, i) {
    var o = this.values_;
    if (this.legacyMode_ && r > o.length && R(17, r, o.length), r < o.length) {
      nt(this.atom_);
      var s = o[r];
      if (Le(this)) {
        var a = Pe(this, {
          type: Ge,
          object: this.proxy_,
          // since "this" is the real array we need to pass its proxy
          index: r,
          newValue: i
        });
        if (!a)
          return;
        i = a.newValue;
      }
      i = this.enhancer_(i, s);
      var l = i !== s;
      l && (o[r] = i, this.notifyArrayChildUpdate_(r, i, s));
    } else {
      for (var u = new Array(r + 1 - o.length), c = 0; c < u.length - 1; c++)
        u[c] = void 0;
      u[u.length - 1] = i, this.spliceWithArray_(o.length, 0, u);
    }
  }, e;
}();
function Ud(e, t, n, r) {
  return n === void 0 && (n = O.NODE_ENV !== "production" ? "ObservableArray@" + Ze() : "ObservableArray"), r === void 0 && (r = !1), $a(), xt(function() {
    var i = new Co(n, t, r, !1);
    Pa(i.values_, F, i);
    var o = new Proxy(i.values_, Bd);
    return i.proxy_ = o, e && e.length && i.spliceWithArray_(0, 0, e), o;
  });
}
var wr = {
  clear: function() {
    return this.splice(0);
  },
  replace: function(t) {
    var n = this[F];
    return n.spliceWithArray_(0, n.values_.length, t);
  },
  // Used by JSON.stringify
  toJSON: function() {
    return this.slice();
  },
  /*
   * functions that do alter the internal structure of the array, (based on lib.es6.d.ts)
   * since these functions alter the inner structure of the array, the have side effects.
   * Because the have side effects, they should not be used in computed function,
   * and for that reason the do not call dependencyState.notifyObserved
   */
  splice: function(t, n) {
    for (var r = arguments.length, i = new Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++)
      i[o - 2] = arguments[o];
    var s = this[F];
    switch (arguments.length) {
      case 0:
        return [];
      case 1:
        return s.spliceWithArray_(t);
      case 2:
        return s.spliceWithArray_(t, n);
    }
    return s.spliceWithArray_(t, n, i);
  },
  spliceWithArray: function(t, n, r) {
    return this[F].spliceWithArray_(t, n, r);
  },
  push: function() {
    for (var t = this[F], n = arguments.length, r = new Array(n), i = 0; i < n; i++)
      r[i] = arguments[i];
    return t.spliceWithArray_(t.values_.length, 0, r), t.values_.length;
  },
  pop: function() {
    return this.splice(Math.max(this[F].values_.length - 1, 0), 1)[0];
  },
  shift: function() {
    return this.splice(0, 1)[0];
  },
  unshift: function() {
    for (var t = this[F], n = arguments.length, r = new Array(n), i = 0; i < n; i++)
      r[i] = arguments[i];
    return t.spliceWithArray_(0, 0, r), t.values_.length;
  },
  reverse: function() {
    return A.trackingDerivation && R(37, "reverse"), this.replace(this.slice().reverse()), this;
  },
  sort: function() {
    A.trackingDerivation && R(37, "sort");
    var t = this.slice();
    return t.sort.apply(t, arguments), this.replace(t), this;
  },
  remove: function(t) {
    var n = this[F], r = n.dehanceValues_(n.values_).indexOf(t);
    return r > -1 ? (this.splice(r, 1), !0) : !1;
  }
};
Z("at", xe);
Z("concat", xe);
Z("flat", xe);
Z("includes", xe);
Z("indexOf", xe);
Z("join", xe);
Z("lastIndexOf", xe);
Z("slice", xe);
Z("toString", xe);
Z("toLocaleString", xe);
Z("toSorted", xe);
Z("toSpliced", xe);
Z("with", xe);
Z("every", Je);
Z("filter", Je);
Z("find", Je);
Z("findIndex", Je);
Z("findLast", Je);
Z("findLastIndex", Je);
Z("flatMap", Je);
Z("forEach", Je);
Z("map", Je);
Z("some", Je);
Z("toReversed", Je);
Z("reduce", vl);
Z("reduceRight", vl);
function Z(e, t) {
  typeof Array.prototype[e] == "function" && (wr[e] = t(e));
}
function xe(e) {
  return function() {
    var t = this[F];
    t.atom_.reportObserved();
    var n = t.dehanceValues_(t.values_);
    return n[e].apply(n, arguments);
  };
}
function Je(e) {
  return function(t, n) {
    var r = this, i = this[F];
    i.atom_.reportObserved();
    var o = i.dehanceValues_(i.values_);
    return o[e](function(s, a) {
      return t.call(n, s, a, r);
    });
  };
}
function vl(e) {
  return function() {
    var t = this, n = this[F];
    n.atom_.reportObserved();
    var r = n.dehanceValues_(n.values_), i = arguments[0];
    return arguments[0] = function(o, s, a) {
      return i(o, s, a, t);
    }, r[e].apply(r, arguments);
  };
}
var Hd = /* @__PURE__ */ qt("ObservableArrayAdministration", Co);
function zr(e) {
  return Ur(e) && Hd(e[F]);
}
var qd = {}, yt = "add", Sr = "delete", gl = /* @__PURE__ */ function() {
  function e(n, r, i) {
    var o = this;
    r === void 0 && (r = Mt), i === void 0 && (i = O.NODE_ENV !== "production" ? "ObservableMap@" + Ze() : "ObservableMap"), this.enhancer_ = void 0, this.name_ = void 0, this[F] = qd, this.data_ = void 0, this.hasMap_ = void 0, this.keysAtom_ = void 0, this.interceptors_ = void 0, this.changeListeners_ = void 0, this.dehancer = void 0, this.enhancer_ = r, this.name_ = i, le(Map) || R(18), xt(function() {
      o.keysAtom_ = Ma(O.NODE_ENV !== "production" ? o.name_ + ".keys()" : "ObservableMap.keys()"), o.data_ = /* @__PURE__ */ new Map(), o.hasMap_ = /* @__PURE__ */ new Map(), n && o.merge(n);
    });
  }
  var t = e.prototype;
  return t.has_ = function(r) {
    return this.data_.has(r);
  }, t.has = function(r) {
    var i = this;
    if (!A.trackingDerivation)
      return this.has_(r);
    var o = this.hasMap_.get(r);
    if (!o) {
      var s = o = new It(this.has_(r), qr, O.NODE_ENV !== "production" ? this.name_ + "." + Vi(r) + "?" : "ObservableMap.key?", !1);
      this.hasMap_.set(r, s), ll(s, function() {
        return i.hasMap_.delete(r);
      });
    }
    return o.get();
  }, t.set = function(r, i) {
    var o = this.has_(r);
    if (Le(this)) {
      var s = Pe(this, {
        type: o ? Ge : yt,
        object: this,
        newValue: i,
        name: r
      });
      if (!s)
        return this;
      i = s.newValue;
    }
    return o ? this.updateValue_(r, i) : this.addValue_(r, i), this;
  }, t.delete = function(r) {
    var i = this;
    if (nt(this.keysAtom_), Le(this)) {
      var o = Pe(this, {
        type: Sr,
        object: this,
        name: r
      });
      if (!o)
        return !1;
    }
    if (this.has_(r)) {
      var s = he(), a = ze(this), l = a || s ? {
        observableKind: "map",
        debugObjectName: this.name_,
        type: Sr,
        object: this,
        oldValue: this.data_.get(r).value_,
        name: r
      } : null;
      return O.NODE_ENV !== "production" && s && Se(l), ct(function() {
        var u;
        i.keysAtom_.reportChanged(), (u = i.hasMap_.get(r)) == null || u.setNewValue_(!1);
        var c = i.data_.get(r);
        c.setNewValue_(void 0), i.data_.delete(r);
      }), a && Ye(this, l), O.NODE_ENV !== "production" && s && Ne(), !0;
    }
    return !1;
  }, t.updateValue_ = function(r, i) {
    var o = this.data_.get(r);
    if (i = o.prepareNewValue_(i), i !== A.UNCHANGED) {
      var s = he(), a = ze(this), l = a || s ? {
        observableKind: "map",
        debugObjectName: this.name_,
        type: Ge,
        object: this,
        oldValue: o.value_,
        name: r,
        newValue: i
      } : null;
      O.NODE_ENV !== "production" && s && Se(l), o.setNewValue_(i), a && Ye(this, l), O.NODE_ENV !== "production" && s && Ne();
    }
  }, t.addValue_ = function(r, i) {
    var o = this;
    nt(this.keysAtom_), ct(function() {
      var u, c = new It(i, o.enhancer_, O.NODE_ENV !== "production" ? o.name_ + "." + Vi(r) : "ObservableMap.key", !1);
      o.data_.set(r, c), i = c.value_, (u = o.hasMap_.get(r)) == null || u.setNewValue_(!0), o.keysAtom_.reportChanged();
    });
    var s = he(), a = ze(this), l = a || s ? {
      observableKind: "map",
      debugObjectName: this.name_,
      type: yt,
      object: this,
      name: r,
      newValue: i
    } : null;
    O.NODE_ENV !== "production" && s && Se(l), a && Ye(this, l), O.NODE_ENV !== "production" && s && Ne();
  }, t.get = function(r) {
    return this.has(r) ? this.dehanceValue_(this.data_.get(r).get()) : this.dehanceValue_(void 0);
  }, t.dehanceValue_ = function(r) {
    return this.dehancer !== void 0 ? this.dehancer(r) : r;
  }, t.keys = function() {
    return this.keysAtom_.reportObserved(), this.data_.keys();
  }, t.values = function() {
    var r = this, i = this.keys();
    return ms({
      next: function() {
        var s = i.next(), a = s.done, l = s.value;
        return {
          done: a,
          value: a ? void 0 : r.get(l)
        };
      }
    });
  }, t.entries = function() {
    var r = this, i = this.keys();
    return ms({
      next: function() {
        var s = i.next(), a = s.done, l = s.value;
        return {
          done: a,
          value: a ? void 0 : [l, r.get(l)]
        };
      }
    });
  }, t[Symbol.iterator] = function() {
    return this.entries();
  }, t.forEach = function(r, i) {
    for (var o = en(this), s; !(s = o()).done; ) {
      var a = s.value, l = a[0], u = a[1];
      r.call(i, u, l, this);
    }
  }, t.merge = function(r) {
    var i = this;
    return At(r) && (r = new Map(r)), ct(function() {
      we(r) ? cf(r).forEach(function(o) {
        return i.set(o, r[o]);
      }) : Array.isArray(r) ? r.forEach(function(o) {
        var s = o[0], a = o[1];
        return i.set(s, a);
      }) : dn(r) ? (uf(r) || R(19, r), r.forEach(function(o, s) {
        return i.set(s, o);
      })) : r != null && R(20, r);
    }), this;
  }, t.clear = function() {
    var r = this;
    ct(function() {
      Ya(function() {
        for (var i = en(r.keys()), o; !(o = i()).done; ) {
          var s = o.value;
          r.delete(s);
        }
      });
    });
  }, t.replace = function(r) {
    var i = this;
    return ct(function() {
      for (var o = Gd(r), s = /* @__PURE__ */ new Map(), a = !1, l = en(i.data_.keys()), u; !(u = l()).done; ) {
        var c = u.value;
        if (!o.has(c)) {
          var f = i.delete(c);
          if (f)
            a = !0;
          else {
            var p = i.data_.get(c);
            s.set(c, p);
          }
        }
      }
      for (var d = en(o.entries()), h; !(h = d()).done; ) {
        var g = h.value, b = g[0], E = g[1], _ = i.data_.has(b);
        if (i.set(b, E), i.data_.has(b)) {
          var y = i.data_.get(b);
          s.set(b, y), _ || (a = !0);
        }
      }
      if (!a)
        if (i.data_.size !== s.size)
          i.keysAtom_.reportChanged();
        else
          for (var w = i.data_.keys(), x = s.keys(), N = w.next(), D = x.next(); !N.done; ) {
            if (N.value !== D.value) {
              i.keysAtom_.reportChanged();
              break;
            }
            N = w.next(), D = x.next();
          }
      i.data_ = s;
    }), this;
  }, t.toString = function() {
    return "[object ObservableMap]";
  }, t.toJSON = function() {
    return Array.from(this);
  }, t.observe_ = function(r, i) {
    return O.NODE_ENV !== "production" && i === !0 && R("`observe` doesn't support fireImmediately=true in combination with maps."), Xn(this, r);
  }, t.intercept_ = function(r) {
    return Yn(this, r);
  }, pn(e, [{
    key: "size",
    get: function() {
      return this.keysAtom_.reportObserved(), this.data_.size;
    }
  }, {
    key: Symbol.toStringTag,
    get: function() {
      return "Map";
    }
  }]);
}(), At = /* @__PURE__ */ qt("ObservableMap", gl);
function ms(e) {
  return e[Symbol.toStringTag] = "MapIterator", $o(e);
}
function Gd(e) {
  if (dn(e) || At(e))
    return e;
  if (Array.isArray(e))
    return new Map(e);
  if (we(e)) {
    var t = /* @__PURE__ */ new Map();
    for (var n in e)
      t.set(n, e[n]);
    return t;
  } else
    return R(21, e);
}
var Wd = {}, ml = /* @__PURE__ */ function() {
  function e(n, r, i) {
    var o = this;
    r === void 0 && (r = Mt), i === void 0 && (i = O.NODE_ENV !== "production" ? "ObservableSet@" + Ze() : "ObservableSet"), this.name_ = void 0, this[F] = Wd, this.data_ = /* @__PURE__ */ new Set(), this.atom_ = void 0, this.changeListeners_ = void 0, this.interceptors_ = void 0, this.dehancer = void 0, this.enhancer_ = void 0, this.name_ = i, le(Set) || R(22), this.enhancer_ = function(s, a) {
      return r(s, a, i);
    }, xt(function() {
      o.atom_ = Ma(o.name_), n && o.replace(n);
    });
  }
  var t = e.prototype;
  return t.dehanceValue_ = function(r) {
    return this.dehancer !== void 0 ? this.dehancer(r) : r;
  }, t.clear = function() {
    var r = this;
    ct(function() {
      Ya(function() {
        for (var i = en(r.data_.values()), o; !(o = i()).done; ) {
          var s = o.value;
          r.delete(s);
        }
      });
    });
  }, t.forEach = function(r, i) {
    for (var o = en(this), s; !(s = o()).done; ) {
      var a = s.value;
      r.call(i, a, a, this);
    }
  }, t.add = function(r) {
    var i = this;
    if (nt(this.atom_), Le(this)) {
      var o = Pe(this, {
        type: yt,
        object: this,
        newValue: r
      });
      if (!o)
        return this;
      r = o.newValue;
    }
    if (!this.has(r)) {
      ct(function() {
        i.data_.add(i.enhancer_(r, void 0)), i.atom_.reportChanged();
      });
      var s = O.NODE_ENV !== "production" && he(), a = ze(this), l = a || s ? {
        observableKind: "set",
        debugObjectName: this.name_,
        type: yt,
        object: this,
        newValue: r
      } : null;
      s && O.NODE_ENV !== "production" && Se(l), a && Ye(this, l), s && O.NODE_ENV !== "production" && Ne();
    }
    return this;
  }, t.delete = function(r) {
    var i = this;
    if (Le(this)) {
      var o = Pe(this, {
        type: Sr,
        object: this,
        oldValue: r
      });
      if (!o)
        return !1;
    }
    if (this.has(r)) {
      var s = O.NODE_ENV !== "production" && he(), a = ze(this), l = a || s ? {
        observableKind: "set",
        debugObjectName: this.name_,
        type: Sr,
        object: this,
        oldValue: r
      } : null;
      return s && O.NODE_ENV !== "production" && Se(l), ct(function() {
        i.atom_.reportChanged(), i.data_.delete(r);
      }), a && Ye(this, l), s && O.NODE_ENV !== "production" && Ne(), !0;
    }
    return !1;
  }, t.has = function(r) {
    return this.atom_.reportObserved(), this.data_.has(this.dehanceValue_(r));
  }, t.entries = function() {
    var r = this.values();
    return bs({
      next: function() {
        var o = r.next(), s = o.value, a = o.done;
        return a ? {
          value: void 0,
          done: a
        } : {
          value: [s, s],
          done: a
        };
      }
    });
  }, t.keys = function() {
    return this.values();
  }, t.values = function() {
    this.atom_.reportObserved();
    var r = this, i = this.data_.values();
    return bs({
      next: function() {
        var s = i.next(), a = s.value, l = s.done;
        return l ? {
          value: void 0,
          done: l
        } : {
          value: r.dehanceValue_(a),
          done: l
        };
      }
    });
  }, t.intersection = function(r) {
    if (ut(r) && !tt(r))
      return r.intersection(this);
    var i = new Set(this);
    return i.intersection(r);
  }, t.union = function(r) {
    if (ut(r) && !tt(r))
      return r.union(this);
    var i = new Set(this);
    return i.union(r);
  }, t.difference = function(r) {
    return new Set(this).difference(r);
  }, t.symmetricDifference = function(r) {
    if (ut(r) && !tt(r))
      return r.symmetricDifference(this);
    var i = new Set(this);
    return i.symmetricDifference(r);
  }, t.isSubsetOf = function(r) {
    return new Set(this).isSubsetOf(r);
  }, t.isSupersetOf = function(r) {
    return new Set(this).isSupersetOf(r);
  }, t.isDisjointFrom = function(r) {
    if (ut(r) && !tt(r))
      return r.isDisjointFrom(this);
    var i = new Set(this);
    return i.isDisjointFrom(r);
  }, t.replace = function(r) {
    var i = this;
    return tt(r) && (r = new Set(r)), ct(function() {
      Array.isArray(r) ? (i.clear(), r.forEach(function(o) {
        return i.add(o);
      })) : ut(r) ? (i.clear(), r.forEach(function(o) {
        return i.add(o);
      })) : r != null && R("Cannot initialize set from " + r);
    }), this;
  }, t.observe_ = function(r, i) {
    return O.NODE_ENV !== "production" && i === !0 && R("`observe` doesn't support fireImmediately=true in combination with sets."), Xn(this, r);
  }, t.intercept_ = function(r) {
    return Yn(this, r);
  }, t.toJSON = function() {
    return Array.from(this);
  }, t.toString = function() {
    return "[object ObservableSet]";
  }, t[Symbol.iterator] = function() {
    return this.values();
  }, pn(e, [{
    key: "size",
    get: function() {
      return this.atom_.reportObserved(), this.data_.size;
    }
  }, {
    key: Symbol.toStringTag,
    get: function() {
      return "Set";
    }
  }]);
}(), tt = /* @__PURE__ */ qt("ObservableSet", ml);
function bs(e) {
  return e[Symbol.toStringTag] = "SetIterator", $o(e);
}
var _s = /* @__PURE__ */ Object.create(null), ys = "remove", Gi = /* @__PURE__ */ function() {
  function e(n, r, i, o) {
    r === void 0 && (r = /* @__PURE__ */ new Map()), o === void 0 && (o = kf), this.target_ = void 0, this.values_ = void 0, this.name_ = void 0, this.defaultAnnotation_ = void 0, this.keysAtom_ = void 0, this.changeListeners_ = void 0, this.interceptors_ = void 0, this.proxy_ = void 0, this.isPlainObject_ = void 0, this.appliedAnnotations_ = void 0, this.pendingKeys_ = void 0, this.target_ = n, this.values_ = r, this.name_ = i, this.defaultAnnotation_ = o, this.keysAtom_ = new Nt(O.NODE_ENV !== "production" ? this.name_ + ".keys" : "ObservableObject.keys"), this.isPlainObject_ = we(this.target_), O.NODE_ENV !== "production" && !wl(this.defaultAnnotation_) && R("defaultAnnotation must be valid annotation"), O.NODE_ENV !== "production" && (this.appliedAnnotations_ = {});
  }
  var t = e.prototype;
  return t.getObservablePropValue_ = function(r) {
    return this.values_.get(r).get();
  }, t.setObservablePropValue_ = function(r, i) {
    var o = this.values_.get(r);
    if (o instanceof Be)
      return o.set(i), !0;
    if (Le(this)) {
      var s = Pe(this, {
        type: Ge,
        object: this.proxy_ || this.target_,
        name: r,
        newValue: i
      });
      if (!s)
        return null;
      i = s.newValue;
    }
    if (i = o.prepareNewValue_(i), i !== A.UNCHANGED) {
      var a = ze(this), l = O.NODE_ENV !== "production" && he(), u = a || l ? {
        type: Ge,
        observableKind: "object",
        debugObjectName: this.name_,
        object: this.proxy_ || this.target_,
        oldValue: o.value_,
        name: r,
        newValue: i
      } : null;
      O.NODE_ENV !== "production" && l && Se(u), o.setNewValue_(i), a && Ye(this, u), O.NODE_ENV !== "production" && l && Ne();
    }
    return !0;
  }, t.get_ = function(r) {
    return A.trackingDerivation && !je(this.target_, r) && this.has_(r), this.target_[r];
  }, t.set_ = function(r, i, o) {
    return o === void 0 && (o = !1), je(this.target_, r) ? this.values_.has(r) ? this.setObservablePropValue_(r, i) : o ? Reflect.set(this.target_, r, i) : (this.target_[r] = i, !0) : this.extend_(r, {
      value: i,
      enumerable: !0,
      writable: !0,
      configurable: !0
    }, this.defaultAnnotation_, o);
  }, t.has_ = function(r) {
    if (!A.trackingDerivation)
      return r in this.target_;
    this.pendingKeys_ || (this.pendingKeys_ = /* @__PURE__ */ new Map());
    var i = this.pendingKeys_.get(r);
    return i || (i = new It(r in this.target_, qr, O.NODE_ENV !== "production" ? this.name_ + "." + Vi(r) + "?" : "ObservableObject.key?", !1), this.pendingKeys_.set(r, i)), i.get();
  }, t.make_ = function(r, i) {
    if (i === !0 && (i = this.defaultAnnotation_), i !== !1) {
      if (ws(this, i, r), !(r in this.target_)) {
        var o;
        if ((o = this.target_[_e]) != null && o[r])
          return;
        R(1, i.annotationType_, this.name_ + "." + r.toString());
      }
      for (var s = this.target_; s && s !== Br; ) {
        var a = gr(s, r);
        if (a) {
          var l = i.make_(this, r, a, s);
          if (l === 0)
            return;
          if (l === 1)
            break;
        }
        s = Object.getPrototypeOf(s);
      }
      Os(this, i, r);
    }
  }, t.extend_ = function(r, i, o, s) {
    if (s === void 0 && (s = !1), o === !0 && (o = this.defaultAnnotation_), o === !1)
      return this.defineProperty_(r, i, s);
    ws(this, o, r);
    var a = o.extend_(this, r, i, s);
    return a && Os(this, o, r), a;
  }, t.defineProperty_ = function(r, i, o) {
    o === void 0 && (o = !1), nt(this.keysAtom_);
    try {
      Ve();
      var s = this.delete_(r);
      if (!s)
        return s;
      if (Le(this)) {
        var a = Pe(this, {
          object: this.proxy_ || this.target_,
          name: r,
          type: yt,
          newValue: i.value
        });
        if (!a)
          return null;
        var l = a.newValue;
        i.value !== l && (i = ht({}, i, {
          value: l
        }));
      }
      if (o) {
        if (!Reflect.defineProperty(this.target_, r, i))
          return !1;
      } else
        rt(this.target_, r, i);
      this.notifyPropertyAddition_(r, i.value);
    } finally {
      Fe();
    }
    return !0;
  }, t.defineObservableProperty_ = function(r, i, o, s) {
    s === void 0 && (s = !1), nt(this.keysAtom_);
    try {
      Ve();
      var a = this.delete_(r);
      if (!a)
        return a;
      if (Le(this)) {
        var l = Pe(this, {
          object: this.proxy_ || this.target_,
          name: r,
          type: yt,
          newValue: i
        });
        if (!l)
          return null;
        i = l.newValue;
      }
      var u = Es(r), c = {
        configurable: A.safeDescriptors ? this.isPlainObject_ : !0,
        enumerable: !0,
        get: u.get,
        set: u.set
      };
      if (s) {
        if (!Reflect.defineProperty(this.target_, r, c))
          return !1;
      } else
        rt(this.target_, r, c);
      var f = new It(i, o, O.NODE_ENV !== "production" ? this.name_ + "." + r.toString() : "ObservableObject.key", !1);
      this.values_.set(r, f), this.notifyPropertyAddition_(r, f.value_);
    } finally {
      Fe();
    }
    return !0;
  }, t.defineComputedProperty_ = function(r, i, o) {
    o === void 0 && (o = !1), nt(this.keysAtom_);
    try {
      Ve();
      var s = this.delete_(r);
      if (!s)
        return s;
      if (Le(this)) {
        var a = Pe(this, {
          object: this.proxy_ || this.target_,
          name: r,
          type: yt,
          newValue: void 0
        });
        if (!a)
          return null;
      }
      i.name || (i.name = O.NODE_ENV !== "production" ? this.name_ + "." + r.toString() : "ObservableObject.key"), i.context = this.proxy_ || this.target_;
      var l = Es(r), u = {
        configurable: A.safeDescriptors ? this.isPlainObject_ : !0,
        enumerable: !1,
        get: l.get,
        set: l.set
      };
      if (o) {
        if (!Reflect.defineProperty(this.target_, r, u))
          return !1;
      } else
        rt(this.target_, r, u);
      this.values_.set(r, new Be(i)), this.notifyPropertyAddition_(r, void 0);
    } finally {
      Fe();
    }
    return !0;
  }, t.delete_ = function(r, i) {
    if (i === void 0 && (i = !1), nt(this.keysAtom_), !je(this.target_, r))
      return !0;
    if (Le(this)) {
      var o = Pe(this, {
        object: this.proxy_ || this.target_,
        name: r,
        type: ys
      });
      if (!o)
        return null;
    }
    try {
      var s;
      Ve();
      var a = ze(this), l = O.NODE_ENV !== "production" && he(), u = this.values_.get(r), c = void 0;
      if (!u && (a || l)) {
        var f;
        c = (f = gr(this.target_, r)) == null ? void 0 : f.value;
      }
      if (i) {
        if (!Reflect.deleteProperty(this.target_, r))
          return !1;
      } else
        delete this.target_[r];
      if (O.NODE_ENV !== "production" && delete this.appliedAnnotations_[r], u && (this.values_.delete(r), u instanceof It && (c = u.value_), tl(u)), this.keysAtom_.reportChanged(), (s = this.pendingKeys_) == null || (s = s.get(r)) == null || s.set(r in this.target_), a || l) {
        var p = {
          type: ys,
          observableKind: "object",
          object: this.proxy_ || this.target_,
          debugObjectName: this.name_,
          oldValue: c,
          name: r
        };
        O.NODE_ENV !== "production" && l && Se(p), a && Ye(this, p), O.NODE_ENV !== "production" && l && Ne();
      }
    } finally {
      Fe();
    }
    return !0;
  }, t.observe_ = function(r, i) {
    return O.NODE_ENV !== "production" && i === !0 && R("`observe` doesn't support the fire immediately property for observable objects."), Xn(this, r);
  }, t.intercept_ = function(r) {
    return Yn(this, r);
  }, t.notifyPropertyAddition_ = function(r, i) {
    var o, s = ze(this), a = O.NODE_ENV !== "production" && he();
    if (s || a) {
      var l = s || a ? {
        type: yt,
        observableKind: "object",
        debugObjectName: this.name_,
        object: this.proxy_ || this.target_,
        name: r,
        newValue: i
      } : null;
      O.NODE_ENV !== "production" && a && Se(l), s && Ye(this, l), O.NODE_ENV !== "production" && a && Ne();
    }
    (o = this.pendingKeys_) == null || (o = o.get(r)) == null || o.set(!0), this.keysAtom_.reportChanged();
  }, t.ownKeys_ = function() {
    return this.keysAtom_.reportObserved(), sn(this.target_);
  }, t.keys_ = function() {
    return this.keysAtom_.reportObserved(), Object.keys(this.target_);
  }, e;
}();
function Wt(e, t) {
  var n;
  if (O.NODE_ENV !== "production" && t && hn(e) && R("Options can't be provided for already observable objects."), je(e, F))
    return O.NODE_ENV !== "production" && !(El(e) instanceof Gi) && R("Cannot convert '" + Nr(e) + `' into observable object:
The target is already observable of different type.
Extending builtins is not supported.`), e;
  O.NODE_ENV !== "production" && !Object.isExtensible(e) && R("Cannot make the designated object observable; it is not extensible");
  var r = (n = t == null ? void 0 : t.name) != null ? n : O.NODE_ENV !== "production" ? (we(e) ? "ObservableObject" : e.constructor.name) + "@" + Ze() : "ObservableObject", i = new Gi(e, /* @__PURE__ */ new Map(), String(r), Qf(t));
  return Gn(e, F, i), e;
}
var Kd = /* @__PURE__ */ qt("ObservableObjectAdministration", Gi);
function Es(e) {
  return _s[e] || (_s[e] = {
    get: function() {
      return this[F].getObservablePropValue_(e);
    },
    set: function(n) {
      return this[F].setObservablePropValue_(e, n);
    }
  });
}
function hn(e) {
  return Ur(e) ? Kd(e[F]) : !1;
}
function Os(e, t, n) {
  var r;
  O.NODE_ENV !== "production" && (e.appliedAnnotations_[n] = t), (r = e.target_[_e]) == null || delete r[n];
}
function ws(e, t, n) {
  if (O.NODE_ENV !== "production" && !wl(t) && R("Cannot annotate '" + e.name_ + "." + n.toString() + "': Invalid annotation."), O.NODE_ENV !== "production" && !_r(t) && je(e.appliedAnnotations_, n)) {
    var r = e.name_ + "." + n.toString(), i = e.appliedAnnotations_[n].annotationType_, o = t.annotationType_;
    R("Cannot apply '" + o + "' to '" + r + "':" + (`
The field is already annotated with '` + i + "'.") + `
Re-annotating fields is not allowed.
Use 'override' annotation for methods overridden by subclass.`);
  }
}
var zd = /* @__PURE__ */ _l(0), Yd = /* @__PURE__ */ function() {
  var e = !1, t = {};
  return Object.defineProperty(t, "0", {
    set: function() {
      e = !0;
    }
  }), Object.create(t)[0] = 1, e === !1;
}(), pi = 0, bl = function() {
};
function Xd(e, t) {
  Object.setPrototypeOf ? Object.setPrototypeOf(e.prototype, t) : e.prototype.__proto__ !== void 0 ? e.prototype.__proto__ = t : e.prototype = t;
}
Xd(bl, Array.prototype);
var Do = /* @__PURE__ */ function(e) {
  function t(r, i, o, s) {
    var a;
    return o === void 0 && (o = O.NODE_ENV !== "production" ? "ObservableArray@" + Ze() : "ObservableArray"), s === void 0 && (s = !1), a = e.call(this) || this, xt(function() {
      var l = new Co(o, i, s, !0);
      l.proxy_ = a, Pa(a, F, l), r && r.length && a.spliceWithArray(0, 0, r), Yd && Object.defineProperty(a, "0", zd);
    }), a;
  }
  Fa(t, e);
  var n = t.prototype;
  return n.concat = function() {
    this[F].atom_.reportObserved();
    for (var i = arguments.length, o = new Array(i), s = 0; s < i; s++)
      o[s] = arguments[s];
    return Array.prototype.concat.apply(
      this.slice(),
      //@ts-ignore
      o.map(function(a) {
        return zr(a) ? a.slice() : a;
      })
    );
  }, n[Symbol.iterator] = function() {
    var r = this, i = 0;
    return $o({
      next: function() {
        return i < r.length ? {
          value: r[i++],
          done: !1
        } : {
          done: !0,
          value: void 0
        };
      }
    });
  }, pn(t, [{
    key: "length",
    get: function() {
      return this[F].getArrayLength_();
    },
    set: function(i) {
      this[F].setArrayLength_(i);
    }
  }, {
    key: Symbol.toStringTag,
    get: function() {
      return "Array";
    }
  }]);
}(bl);
Object.entries(wr).forEach(function(e) {
  var t = e[0], n = e[1];
  t !== "concat" && Gn(Do.prototype, t, n);
});
function _l(e) {
  return {
    enumerable: !1,
    configurable: !0,
    get: function() {
      return this[F].get_(e);
    },
    set: function(n) {
      this[F].set_(e, n);
    }
  };
}
function Qd(e) {
  rt(Do.prototype, "" + e, _l(e));
}
function yl(e) {
  if (e > pi) {
    for (var t = pi; t < e + 100; t++)
      Qd(t);
    pi = e;
  }
}
yl(1e3);
function Zd(e, t, n) {
  return new Do(e, t, n);
}
function un(e, t) {
  if (typeof e == "object" && e !== null) {
    if (zr(e))
      return t !== void 0 && R(23), e[F].atom_;
    if (tt(e))
      return e.atom_;
    if (At(e)) {
      if (t === void 0)
        return e.keysAtom_;
      var n = e.data_.get(t) || e.hasMap_.get(t);
      return n || R(25, t, Nr(e)), n;
    }
    if (hn(e)) {
      if (!t)
        return R(26);
      var r = e[F].values_.get(t);
      return r || R(27, t, Nr(e)), r;
    }
    if (So(e) || Kr(e) || Or(e))
      return e;
  } else if (le(e) && Or(e[F]))
    return e[F];
  R(28);
}
function El(e, t) {
  if (e || R(29), So(e) || Kr(e) || Or(e) || At(e) || tt(e))
    return e;
  if (e[F])
    return e[F];
  R(24, e);
}
function Nr(e, t) {
  var n;
  if (t !== void 0)
    n = un(e, t);
  else {
    if (an(e))
      return e.name;
    hn(e) || At(e) || tt(e) ? n = El(e) : n = un(e);
  }
  return n.name_;
}
function xt(e) {
  var t = Gt(), n = Ao(!0);
  Ve();
  try {
    return e();
  } finally {
    Fe(), xo(n), dt(t);
  }
}
var Ss = Br.toString;
function Ol(e, t, n) {
  return n === void 0 && (n = -1), Wi(e, t, n);
}
function Wi(e, t, n, r, i) {
  if (e === t)
    return e !== 0 || 1 / e === 1 / t;
  if (e == null || t == null)
    return !1;
  if (e !== e)
    return t !== t;
  var o = typeof e;
  if (o !== "function" && o !== "object" && typeof t != "object")
    return !1;
  var s = Ss.call(e);
  if (s !== Ss.call(t))
    return !1;
  switch (s) {
    // Strings, numbers, regular expressions, dates, and booleans are compared by value.
    case "[object RegExp]":
    // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
    case "[object String]":
      return "" + e == "" + t;
    case "[object Number]":
      return +e != +e ? +t != +t : +e == 0 ? 1 / +e === 1 / t : +e == +t;
    case "[object Date]":
    case "[object Boolean]":
      return +e == +t;
    case "[object Symbol]":
      return typeof Symbol < "u" && Symbol.valueOf.call(e) === Symbol.valueOf.call(t);
    case "[object Map]":
    case "[object Set]":
      n >= 0 && n++;
      break;
  }
  e = Ns(e), t = Ns(t);
  var a = s === "[object Array]";
  if (!a) {
    if (typeof e != "object" || typeof t != "object")
      return !1;
    var l = e.constructor, u = t.constructor;
    if (l !== u && !(le(l) && l instanceof l && le(u) && u instanceof u) && "constructor" in e && "constructor" in t)
      return !1;
  }
  if (n === 0)
    return !1;
  n < 0 && (n = -1), r = r || [], i = i || [];
  for (var c = r.length; c--; )
    if (r[c] === e)
      return i[c] === t;
  if (r.push(e), i.push(t), a) {
    if (c = e.length, c !== t.length)
      return !1;
    for (; c--; )
      if (!Wi(e[c], t[c], n - 1, r, i))
        return !1;
  } else {
    var f = Object.keys(e), p = f.length;
    if (Object.keys(t).length !== p)
      return !1;
    for (var d = 0; d < p; d++) {
      var h = f[d];
      if (!(je(t, h) && Wi(e[h], t[h], n - 1, r, i)))
        return !1;
    }
  }
  return r.pop(), i.pop(), !0;
}
function Ns(e) {
  return zr(e) ? e.slice() : dn(e) || At(e) || ut(e) || tt(e) ? Array.from(e.entries()) : e;
}
var As, Jd = ((As = kr().Iterator) == null ? void 0 : As.prototype) || {};
function $o(e) {
  return e[Symbol.iterator] = ep, Object.assign(Object.create(Jd), e);
}
function ep() {
  return this;
}
function wl(e) {
  return (
    // Can be function
    e instanceof Object && typeof e.annotationType_ == "string" && le(e.make_) && le(e.extend_)
  );
}
["Symbol", "Map", "Set"].forEach(function(e) {
  var t = kr();
  typeof t[e] > "u" && R("MobX requires global '" + e + "' to be available or polyfilled");
});
typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ == "object" && __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
  spy: md,
  extras: {
    getDebugName: Nr
  },
  $mobx: F
});
const Ki = "next", zi = "previous", tp = [{
  name: P.CONTENT_SOURCE,
  defaultValue: ""
}, {
  name: P.VERSION,
  defaultValue: ""
}, {
  name: P.VARIANT,
  defaultValue: ""
}, {
  name: P.START,
  defaultValue: "0"
}, {
  name: P.MAX,
  defaultValue: "10"
}, {
  name: P.IN_APP_HELP,
  defaultValue: ""
}, {
  name: P.REFERRER,
  defaultValue: ""
}], Ar = {
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical"
}, np = (e, t) => {
  const n = e.message ? e.message : e;
  n ? console.error(n, t) : console.error(e);
}, rp = {
  error: np
};
class Sl extends Error {
}
class Nl extends Error {
}
class ip extends Error {
}
class op extends Error {
  /**
   * @param uiMessages messages to show to UI (if the error is considered expected, and caught)
   * @param message message that is shown in log and used when reporting to Sentry (if this error will be reported)
   */
  constructor(t, n) {
    super(), this.uiMessages = t, this.message = n;
  }
}
class sp extends Error {
  /**
   * @param message message that is shown in log and used when reporting to Sentry (if this error will be reported)
   */
  constructor(t) {
    super(), this.message = t;
  }
}
const ap = (e) => {
  if (e.ok)
    return Promise.resolve(e);
  if (e.status === 403)
    return Promise.reject(new Sl(`Permission error accessing resource ${e.url}.`));
  if (e.status === 404)
    return Promise.reject(new ip(`No item found on ${e.url}`));
  const t = `Request failed: ${e.url}. Status: ${e.status}.`;
  return e.status >= 500 ? Promise.reject(new sp(`Internal server error. Status: ${e.status}.`)) : e.status >= 400 ? Promise.reject(new op(t)) : Promise.reject(new Error(t));
}, lp = (e) => e.status === 204 ? null : e.json(), up = (e, t = {}, n) => fetch(e, {
  method: "GET",
  headers: t,
  signal: n
}).then(ap).then(lp);
var Fn;
class Al {
  constructor({
    lang: t
  }) {
    Ce(this, Fn);
    lt(this, Fn, t);
  }
  /**
   * @param {Omit<TFetchSuggestionsOptions, 'json'>} options
   * @return {Promise<{ hits: Array<{ contentSourceId: string; description: string; path: string; title: string; }>; limit: number; start: number; took: number; total: number; }>}
   * @throws {Error | InvalidQueryError}
   */
  async fetchSuggestions({
    query: t,
    contentSource: n,
    version: r,
    variant: i,
    language: o,
    max: s,
    start: a,
    onlyLatest: l,
    signal: u
  }) {
    const c = this.getSearchUrl({
      query: t,
      contentSource: n,
      version: r,
      variant: i,
      language: o,
      max: s,
      start: a,
      onlyLatest: l,
      json: !0
    });
    try {
      const f = await up(c, {}, u);
      return {
        ...f,
        hits: f.hits.map((p) => ({
          ...p,
          path: new URL(p.path.replace(/^\//, ""), Tc()).pathname
        }))
      };
    } catch (f) {
      if ((f == null ? void 0 : f.name) === "AbortError")
        throw f;
      let p = f;
      throw p instanceof Sl && (p = new Nl()), rp.error(p), p;
    }
  }
  async navigateToSearchPage({
    query: t,
    contentSource: n,
    version: r,
    variant: i,
    language: o,
    max: s,
    start: a
  } = {}) {
    const l = this.getSearchUrl({
      query: t,
      contentSource: n,
      version: r,
      variant: i,
      language: o,
      max: s,
      start: a
    });
    self.location.assign(l);
  }
  /**
   * @param {TFetchSuggestionsOptions} options
   * @returns {URL}
   */
  getSearchUrl({
    query: t,
    contentSource: n,
    version: r,
    variant: i,
    language: o,
    max: s = 10,
    start: a = 0,
    onlyLatest: l = !1,
    json: u = !1
  } = {}) {
    const c = u ? Rc() : Ea();
    return (/* @__PURE__ */ new Map([[P.QUERY, t], [P.MAX, s.toString()], [P.START, a.toString()], [P.CONTENT_SOURCE, n || null], [P.VARIANT, i || null], [P.VERSION, r || null], [P.LANGUAGE, o || be(this, Fn) || null], [P.ONLY_LATEST, l.toString()], [P.IN_APP_HELP, Rn() ? "true" : null], [P.REFERRER, Rn() ? encodeURIComponent(window.location) : null]])).forEach((p, d) => {
      p != null && c.searchParams.set(d, p);
    }), c.searchParams.sort(), c;
  }
}
Fn = new WeakMap();
var Mn, jn;
class Xt {
  /**
   * @param {Object} options
   * @param options.title
   * @param [options.query]
   * @param [options.icon]
   * @param options.description
   * @param options.contentSourceName
   * @param options.versionName
   * @param options.variantName
   * @param options.url
   * @param options.store
   * @param [options.type]
   * @param [options.action]
   * @param [options.id]
   */
  constructor({
    title: t,
    query: n,
    icon: r,
    description: i,
    contentSourceName: o,
    versionName: s,
    variantName: a,
    url: l,
    store: u,
    type: c,
    action: f,
    id: p
  }) {
    Ce(this, Mn);
    Ce(this, jn);
    ie(this, "title");
    ie(this, "query");
    ie(this, "description");
    ie(this, "contentSourceName");
    ie(this, "versionName");
    ie(this, "variantName");
    ie(this, "url");
    /** @type {'cta' | 'tool' | 'suggestion' | undefined} */
    ie(this, "type");
    /** @type {function(Suggestion): void} */
    ie(this, "actionCallback");
    hl(this), lt(this, jn, p || yo()), lt(this, Mn, u), this.title = t, this.query = n, this.icon = r, this.description = i, this.contentSourceName = o, this.versionName = s, this.variantName = a, this.url = l, this.type = c, this.actionCallback = f, this.action = this.action.bind(this);
  }
  get id() {
    return be(this, jn);
  }
  get focused() {
    return be(this, Mn).focusedSuggestion === this;
  }
  action() {
    var t;
    (t = this.actionCallback) == null || t.call(this, this);
  }
}
Mn = new WeakMap(), jn = new WeakMap();
const de = {
  DEFAULT: "default",
  LOADING: "loading",
  NO_SUGGESTIONS_FOUND: "no_suggestions_found",
  SUGGESTIONS_FOUND: "suggestions_found",
  INVALID_QUERY: "invalid_query",
  ERROR: "error"
}, oe = {
  CONTENT_SOURCE: "contentSource",
  VERSION: "version",
  VARIANT: "variant",
  LANGUAGE: "language"
}, cp = {
  [oe.CONTENT_SOURCE]: null,
  [oe.VERSION]: null,
  [oe.VARIANT]: null,
  [oe.LANGUAGE]: null
}, fp = 200, dp = '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.28081 5.51147L8.769 5.46533C8.9226 6.46368 9.35644 7.87098 10.1986 9.0578C11.0294 10.2285 12.2344 11.1594 13.9709 11.333L13.8963 12.8293C13.1395 12.8293 11.8409 13.3406 10.7053 14.3318C9.5887 15.3066 8.77773 16.6171 8.77773 18.0793H7.27773C7.27773 17.2883 6.82991 15.9506 5.89393 14.8034C4.97622 13.6786 3.66616 12.8293 2.00006 12.8293L2 11.3293C3.53581 11.3293 4.73219 10.86 5.59661 9.95985C6.47348 9.04678 7.09046 7.60526 7.28081 5.51147ZM5.09423 12.161C5.87292 12.612 6.52881 13.2088 7.05618 13.8552C7.42989 14.3132 7.74789 14.8067 8.00506 15.3061C8.45055 14.486 9.06045 13.7766 9.71887 13.2018C10.2251 12.7599 10.7825 12.378 11.3479 12.0765C10.3512 11.5355 9.57088 10.7651 8.97536 9.92589C8.65649 9.47654 8.38841 9.00509 8.16519 8.53351C7.8097 9.51141 7.31415 10.337 6.6785 10.9988C6.21042 11.4863 5.67889 11.8719 5.09423 12.161Z" /><path fill-rule="evenodd" clip-rule="evenodd" d="M13.9456 2.03225L14.9369 2C15.0253 2.54673 15.2758 3.32024 15.7617 3.9719C16.239 4.61209 16.934 5.12591 17.9439 5.22202L17.8965 6.21977C17.4621 6.21977 16.7082 6.50104 16.0482 7.04939C15.3978 7.58971 14.9433 8.30173 14.9433 9.07979H13.9433C13.9433 8.66673 13.6926 7.93796 13.1501 7.30519C12.6218 6.68897 11.8648 6.21974 10.8965 6.21977L10.8965 5.21977C11.7947 5.21977 12.4851 4.95822 12.9792 4.46864C13.4787 3.97356 13.8352 3.18812 13.9456 2.03225ZM12.8758 5.77105C13.2799 6.01568 13.6254 6.32313 13.9093 6.65434C14.1106 6.88912 14.2855 7.14113 14.4313 7.39809C14.6948 6.96222 15.0411 6.58596 15.4091 6.2802C15.6682 6.06495 15.9499 5.87478 16.2378 5.71709C15.7099 5.41604 15.2886 5.0103 14.96 4.56967C14.7948 4.34815 14.6524 4.11722 14.5305 3.88496C14.3214 4.39266 14.0391 4.82613 13.6831 5.17894C13.4403 5.41952 13.1698 5.61611 12.8758 5.77105Z" /></svg>';
var kn, Pt, on, Bn, Yi;
class vn {
  /**
   * @typedef {import('./search-service').default} SearchRestService
   *
   * @param {Object} options
   * @param {SearchRestService} options.searchService
   * @param {any} options.context
   * @param {Array} options.contentSources
   */
  constructor({
    searchService: t,
    context: n,
    contentSources: r
  }) {
    Ce(this, Bn);
    /**
     * @typedef {import('./search-service').default} searchService
     * @type {SearchRestService}
     */
    ie(this, "searchService");
    ie(this, "context");
    ie(this, "query", "");
    ie(this, "contentSources", []);
    ie(this, "filter", cp);
    ie(this, "suggestions", []);
    ie(this, "suggestionsState", de.DEFAULT);
    ie(this, "focusedSuggestion");
    ie(this, "activeTool");
    Ce(this, kn, xc(() => this.fetchSuggestions(), fp));
    Ce(this, Pt, 0);
    Ce(this, on);
    hl(this, {
      searchService: !1,
      context: !1,
      contentSources: !1
    }), this.searchService = t, this.context = n, this.contentSources = r, this.initFilter();
  }
  get selectedContentSource() {
    return this.contentSources.find(({
      id: t
    }) => t === this.filter[oe.CONTENT_SOURCE]);
  }
  get selectedVersion() {
    return this.filter[oe.VERSION];
  }
  get selectedVariant() {
    return this.filter[oe.VARIANT];
  }
  get selectedLanguage() {
    return this.filter[oe.LANGUAGE];
  }
  get pending() {
    return this.suggestionsState === de.LOADING;
  }
  setFilter(t) {
    this.activeTool && this.setActiveTool(null), Object.entries(t).forEach(([n, r]) => {
      Object.prototype.hasOwnProperty.call(this.filter, n) && (this.filter[n] = r);
    }), On(this, Bn, Yi).call(this);
  }
  setContentSourceFilter(t) {
    this.setFilter({
      [oe.CONTENT_SOURCE]: t
    });
  }
  initFilter() {
    var t, n, r, i;
    this.setFilter({
      [oe.CONTENT_SOURCE]: (t = this.context) == null ? void 0 : t.contentSource,
      [oe.VERSION]: (n = this.context) == null ? void 0 : n.version,
      [oe.VARIANT]: (r = this.context) == null ? void 0 : r.variant,
      [oe.LANGUAGE]: (i = this.context) == null ? void 0 : i.language
    });
  }
  submit() {
    var t, n;
    this.focusedSuggestion && this.focusedSuggestion.type === "tool" ? (this.setActiveTool(this.focusedSuggestion), (n = (t = this.focusedSuggestion).action) == null || n.call(t)) : this.focusedSuggestion && (this.focusedSuggestion.type === "suggestion" || this.focusedSuggestion.type === "cta") ? this.navigateToPage({
      url: this.focusedSuggestion.url
    }) : this.navigateToSearchPage(), this.focusedSuggestion = null;
  }
  setActiveTool(t) {
    this.activeTool = t;
  }
  input(t, {
    fetchSuggestions: n
  }) {
    this.query !== t && this.activeTool && this.setActiveTool(null), this.query = t, n && On(this, Bn, Yi).call(this);
  }
  clearSuggestions() {
    var t;
    be(this, kn).cancel(), lt(this, Pt, be(this, Pt) + 1), (t = be(this, on)) == null || t.abort(), this.activeTool && this.setActiveTool(null), this.suggestions.clear(), this.suggestionsState = de.DEFAULT;
  }
  async fetchSuggestions({
    max: t = 5
  } = {}) {
    var l;
    this.suggestionsState = de.LOADING;
    const n = ++is(this, Pt)._;
    (l = be(this, on)) == null || l.abort();
    const {
      signal: r
    } = lt(this, on, new AbortController()), i = this.filter[oe.CONTENT_SOURCE], o = this.filter[oe.VERSION], s = this.filter[oe.VARIANT], a = this.filter[oe.LANGUAGE];
    try {
      const u = await this.searchService.fetchSuggestions({
        query: this.query,
        contentSource: i,
        version: o,
        variant: s,
        language: a,
        max: t,
        onlyLatest: !o,
        signal: r
      });
      if (n !== be(this, Pt))
        return;
      ci(() => {
        var c;
        if (u && Array.isArray(u.hits) && u.hits.length > 0) {
          this.suggestionsState = de.SUGGESTIONS_FOUND, this.suggestions.clear();
          const f = u.hits.map(({
            path: p,
            title: d,
            contentSourceId: h,
            versionName: g,
            variantName: b
          }) => new Xt({
            title: d,
            type: "suggestion",
            description: "",
            contentSourceName: bo(h),
            versionName: g,
            variantName: b,
            url: p,
            store: this
          }));
          this.suggestions.replace(f), t < u.total && this.suggestions.push(new Xt({
            title: $e("search.results.more.label"),
            url: this.searchService.getSearchUrl({
              query: this.query,
              contentSource: i,
              version: o,
              variant: s
            }),
            type: "cta",
            store: this,
            contentSourceName: "",
            versionName: "",
            variantName: "",
            description: ""
          }));
        } else u && Array.isArray(u.hits) && u.hits.length === 0 ? (this.suggestions.clear(), this.suggestions.push(new Xt({
          title: $e("search.results.nothing.label"),
          url: null,
          store: this,
          contentSourceName: "",
          versionName: "",
          variantName: "",
          description: ""
        })), this.suggestionsState = de.NO_SUGGESTIONS_FOUND) : this.suggestionsState = de.DEFAULT;
        (c = Eo("site")) != null && c.aiSearchEnabled && this.suggestions.unshift(new Xt({
          id: "ai-search",
          title: $e("cta.label", {
            ns: "ai-search"
          }),
          query: this.query,
          icon: dp,
          type: "tool",
          store: this,
          action: (f) => {
            this.setActiveTool(f);
          }
        }));
      });
    } catch (u) {
      if ((u == null ? void 0 : u.name) === "AbortError" || n !== be(this, Pt))
        return;
      u instanceof Nl ? ci(() => {
        this.suggestions.clear(), this.suggestions.push(new Xt({
          title: $e("search.error.invalid.label"),
          url: null,
          store: this,
          contentSourceName: "",
          versionName: "",
          variantName: "",
          description: ""
        })), this.suggestionsState = de.INVALID_QUERY;
      }) : ci(() => {
        this.suggestions.clear(), this.suggestions.push(new Xt({
          title: $e("search.error.general.label"),
          url: null,
          store: this,
          contentSourceName: "",
          versionName: "",
          variantName: "",
          description: ""
        })), this.suggestionsState = de.ERROR;
      });
    }
  }
  /**
   * @param {'previous' | 'next'} direction
   */
  focusSuggestion(t) {
    if (this.suggestions.length === 0 || this.suggestionsState === de.NO_SUGGESTIONS_FOUND && this.suggestions.length === 0 || this.suggestionsState === de.INVALID_QUERY || this.suggestionsState === de.ERROR || this.suggestionsState === de.LOADING)
      return;
    const n = this.focusedSuggestion ? this.suggestions.indexOf(this.focusedSuggestion) : -1;
    let r;
    const i = this.suggestions.filter(({
      type: s
    }) => ["suggestion", "cta", "tool"].includes(s)).length;
    t === zi ? n <= 0 ? r = i - 1 : r = n - 1 : t === Ki && (n >= i - 1 ? r = 0 : r = n + 1);
    const o = this.suggestions[r];
    o && (o.type === "tool" || o.type === "suggestion" || o.type === "cta") && (this.focusedSuggestion = o);
  }
  focusNextSuggestion() {
    this.focusSuggestion("next");
  }
  focusPreviousSuggestion() {
    this.focusSuggestion("previous");
  }
  resetSuggestions() {
    this.focusedSuggestion = void 0, this.suggestionsState = de.DEFAULT;
  }
  navigateToSearchPage() {
    const t = this.filter[oe.CONTENT_SOURCE], n = this.filter[oe.VERSION], r = this.filter[oe.VARIANT], i = this.filter[oe.LANGUAGE];
    this.searchService.navigateToSearchPage({
      query: this.query,
      contentSource: t,
      version: n,
      variant: r,
      language: i
    });
  }
  /**
   * @param {Object} options
   * @param {string|URL} options.url
   */
  navigateToPage({
    url: t
  }) {
    if (Rn()) {
      const n = document.createElement("a");
      n.setAttribute("href", t), n.setAttribute("target", "_blank"), n.click();
    } else
      window.location.assign(t);
  }
  reset() {
    this.clearSuggestions(), this.resetSuggestions(), this.setActiveTool(null), this.query = "";
  }
}
kn = new WeakMap(), Pt = new WeakMap(), on = new WeakMap(), Bn = new WeakSet(), Yi = function() {
  this.query.length > 2 ? be(this, kn).call(this) : this.clearSuggestions();
};
var pp = 0;
function m(e, t, n, r, i, o) {
  t || (t = {});
  var s, a, l = t;
  if ("ref" in l) for (a in l = {}, t) a == "ref" ? s = t[a] : l[a] = t[a];
  var u = { type: e, props: l, key: n, ref: s, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --pp, __i: -1, __u: 0, __source: i, __self: o };
  if (typeof e == "function" && (s = e.defaultProps)) for (a in s) l[a] === void 0 && (l[a] = s[a]);
  return os.vnode && os.vnode(u), u;
}
const xl = se({}), Lo = ({
  children: e,
  store: t
}) => /* @__PURE__ */ m(xl.Provider, {
  value: t,
  children: e
});
Lo.propTypes = {
  children: v.node.isRequired,
  store: v.instanceOf(vn)
};
const Tl = typeof document < "u" ? H.useLayoutEffect : () => {
};
function Xi(e) {
  const t = C(null);
  return Tl(() => {
    t.current = e;
  }, [
    e
  ]), q((...n) => {
    const r = t.current;
    return r == null ? void 0 : r(...n);
  }, []);
}
const gt = (e) => {
  var t;
  return (t = e == null ? void 0 : e.ownerDocument) !== null && t !== void 0 ? t : document;
}, $t = (e) => e && "window" in e && e.window === e ? e : gt(e).defaultView || window;
function hp(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && typeof e.nodeType == "number";
}
function vp(e) {
  return hp(e) && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && "host" in e;
}
let gp = !1;
function Po() {
  return gp;
}
function Rl(e, t) {
  if (!Po()) return t && e ? e.contains(t) : !1;
  if (!e || !t) return !1;
  let n = t;
  for (; n !== null; ) {
    if (n === e) return !0;
    n.tagName === "SLOT" && n.assignedSlot ? n = n.assignedSlot.parentNode : vp(n) ? n = n.host : n = n.parentNode;
  }
  return !1;
}
const Qi = (e = document) => {
  var t;
  if (!Po()) return e.activeElement;
  let n = e.activeElement;
  for (; n && "shadowRoot" in n && (!((t = n.shadowRoot) === null || t === void 0) && t.activeElement); ) n = n.shadowRoot.activeElement;
  return n;
};
function Cl(e) {
  return Po() && e.target.shadowRoot && e.composedPath ? e.composedPath()[0] : e.target;
}
var mp = {};
function bp(e) {
  var t;
  return typeof window > "u" || window.navigator == null ? !1 : ((t = window.navigator.userAgentData) === null || t === void 0 ? void 0 : t.brands.some((n) => e.test(n.brand))) || e.test(window.navigator.userAgent);
}
function _p(e) {
  var t;
  return typeof window < "u" && window.navigator != null ? e.test(((t = window.navigator.userAgentData) === null || t === void 0 ? void 0 : t.platform) || window.navigator.platform) : !1;
}
function Dl(e) {
  if (mp.NODE_ENV === "test") return e;
  let t = null;
  return () => (t == null && (t = e()), t);
}
const yp = Dl(function() {
  return _p(/^Mac/i);
}), Ep = Dl(function() {
  return bp(/Android/i);
});
function $l() {
  let e = C(/* @__PURE__ */ new Map()), t = q((i, o, s, a) => {
    let l = a != null && a.once ? (...u) => {
      e.current.delete(s), s(...u);
    } : s;
    e.current.set(s, {
      type: o,
      eventTarget: i,
      fn: l,
      options: a
    }), i.addEventListener(o, l, a);
  }, []), n = q((i, o, s, a) => {
    var l;
    let u = ((l = e.current.get(s)) === null || l === void 0 ? void 0 : l.fn) || s;
    i.removeEventListener(o, u, a), e.current.delete(s);
  }, []), r = q(() => {
    e.current.forEach((i, o) => {
      n(i.eventTarget, i.type, o, i.options);
    });
  }, [
    n
  ]);
  return K(() => r, [
    r
  ]), {
    addGlobalListener: t,
    removeGlobalListener: n,
    removeAllGlobalListeners: r
  };
}
function Op(e) {
  return e.mozInputSource === 0 && e.isTrusted ? !0 : Ep() && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function Ll(e) {
  let t = e;
  return t.nativeEvent = e, t.isDefaultPrevented = () => t.defaultPrevented, t.isPropagationStopped = () => t.cancelBubble, t.persist = () => {
  }, t;
}
function wp(e, t) {
  Object.defineProperty(e, "target", {
    value: t
  }), Object.defineProperty(e, "currentTarget", {
    value: t
  });
}
function Pl(e) {
  let t = C({
    isFocused: !1,
    observer: null
  });
  Tl(() => {
    const r = t.current;
    return () => {
      r.observer && (r.observer.disconnect(), r.observer = null);
    };
  }, []);
  let n = Xi((r) => {
    e == null || e(r);
  });
  return q((r) => {
    if (r.target instanceof HTMLButtonElement || r.target instanceof HTMLInputElement || r.target instanceof HTMLTextAreaElement || r.target instanceof HTMLSelectElement) {
      t.current.isFocused = !0;
      let i = r.target, o = (s) => {
        if (t.current.isFocused = !1, i.disabled) {
          let a = Ll(s);
          n(a);
        }
        t.current.observer && (t.current.observer.disconnect(), t.current.observer = null);
      };
      i.addEventListener("focusout", o, {
        once: !0
      }), t.current.observer = new MutationObserver(() => {
        if (t.current.isFocused && i.disabled) {
          var s;
          (s = t.current.observer) === null || s === void 0 || s.disconnect();
          let a = i === document.activeElement ? null : document.activeElement;
          i.dispatchEvent(new FocusEvent("blur", {
            relatedTarget: a
          })), i.dispatchEvent(new FocusEvent("focusout", {
            bubbles: !0,
            relatedTarget: a
          }));
        }
      }), t.current.observer.observe(i, {
        attributes: !0,
        attributeFilter: [
          "disabled"
        ]
      });
    }
  }, [
    n
  ]);
}
let Sp = !1;
var Il = {};
let Qn = null, Zi = /* @__PURE__ */ new Set(), An = /* @__PURE__ */ new Map(), Bt = !1, Ji = !1;
const Np = {
  Tab: !0,
  Escape: !0
};
function Io(e, t) {
  for (let n of Zi) n(e, t);
}
function Ap(e) {
  return !(e.metaKey || !yp() && e.altKey || e.ctrlKey || e.key === "Control" || e.key === "Shift" || e.key === "Meta");
}
function xr(e) {
  Bt = !0, Ap(e) && (Qn = "keyboard", Io("keyboard", e));
}
function De(e) {
  Qn = "pointer", (e.type === "mousedown" || e.type === "pointerdown") && (Bt = !0, Io("pointer", e));
}
function Vl(e) {
  Op(e) && (Bt = !0, Qn = "virtual");
}
function Fl(e) {
  e.target === window || e.target === document || Sp || !e.isTrusted || (!Bt && !Ji && (Qn = "virtual", Io("virtual", e)), Bt = !1, Ji = !1);
}
function Ml() {
  Bt = !1, Ji = !0;
}
function eo(e) {
  if (typeof window > "u" || typeof document > "u" || An.get($t(e))) return;
  const t = $t(e), n = gt(e);
  let r = t.HTMLElement.prototype.focus;
  t.HTMLElement.prototype.focus = function() {
    Bt = !0, r.apply(this, arguments);
  }, n.addEventListener("keydown", xr, !0), n.addEventListener("keyup", xr, !0), n.addEventListener("click", Vl, !0), t.addEventListener("focus", Fl, !0), t.addEventListener("blur", Ml, !1), typeof PointerEvent < "u" ? (n.addEventListener("pointerdown", De, !0), n.addEventListener("pointermove", De, !0), n.addEventListener("pointerup", De, !0)) : Il.NODE_ENV === "test" && (n.addEventListener("mousedown", De, !0), n.addEventListener("mousemove", De, !0), n.addEventListener("mouseup", De, !0)), t.addEventListener("beforeunload", () => {
    jl(e);
  }, {
    once: !0
  }), An.set(t, {
    focus: r
  });
}
const jl = (e, t) => {
  const n = $t(e), r = gt(e);
  t && r.removeEventListener("DOMContentLoaded", t), An.has(n) && (n.HTMLElement.prototype.focus = An.get(n).focus, r.removeEventListener("keydown", xr, !0), r.removeEventListener("keyup", xr, !0), r.removeEventListener("click", Vl, !0), n.removeEventListener("focus", Fl, !0), n.removeEventListener("blur", Ml, !1), typeof PointerEvent < "u" ? (r.removeEventListener("pointerdown", De, !0), r.removeEventListener("pointermove", De, !0), r.removeEventListener("pointerup", De, !0)) : Il.NODE_ENV === "test" && (r.removeEventListener("mousedown", De, !0), r.removeEventListener("mousemove", De, !0), r.removeEventListener("mouseup", De, !0)), An.delete(n));
};
function xp(e) {
  const t = gt(e);
  let n;
  return t.readyState !== "loading" ? eo(e) : (n = () => {
    eo(e);
  }, t.addEventListener("DOMContentLoaded", n)), () => jl(e, n);
}
typeof document < "u" && xp();
function kl() {
  return Qn !== "pointer";
}
const Tp = /* @__PURE__ */ new Set([
  "checkbox",
  "radio",
  "range",
  "color",
  "file",
  "image",
  "button",
  "submit",
  "reset"
]);
function Rp(e, t, n) {
  let r = gt(n == null ? void 0 : n.target);
  const i = typeof window < "u" ? $t(n == null ? void 0 : n.target).HTMLInputElement : HTMLInputElement, o = typeof window < "u" ? $t(n == null ? void 0 : n.target).HTMLTextAreaElement : HTMLTextAreaElement, s = typeof window < "u" ? $t(n == null ? void 0 : n.target).HTMLElement : HTMLElement, a = typeof window < "u" ? $t(n == null ? void 0 : n.target).KeyboardEvent : KeyboardEvent;
  return e = e || r.activeElement instanceof i && !Tp.has(r.activeElement.type) || r.activeElement instanceof o || r.activeElement instanceof s && r.activeElement.isContentEditable, !(e && t === "keyboard" && n instanceof a && !Np[n.key]);
}
function Cp(e, t, n) {
  eo(), K(() => {
    let r = (i, o) => {
      Rp(!!(n != null && n.isTextInput), i, o) && e(kl());
    };
    return Zi.add(r), () => {
      Zi.delete(r);
    };
  }, t);
}
function Dp(e) {
  let { isDisabled: t, onFocus: n, onBlur: r, onFocusChange: i } = e;
  const o = q((l) => {
    if (l.target === l.currentTarget)
      return r && r(l), i && i(!1), !0;
  }, [
    r,
    i
  ]), s = Pl(o), a = q((l) => {
    const u = gt(l.target), c = u ? Qi(u) : Qi();
    l.target === l.currentTarget && c === Cl(l.nativeEvent) && (n && n(l), i && i(!0), s(l));
  }, [
    i,
    n,
    s
  ]);
  return {
    focusProps: {
      onFocus: !t && (n || i || r) ? a : void 0,
      onBlur: !t && (r || i) ? o : void 0
    }
  };
}
function $p(e) {
  let { isDisabled: t, onBlurWithin: n, onFocusWithin: r, onFocusWithinChange: i } = e, o = C({
    isFocusWithin: !1
  }), { addGlobalListener: s, removeAllGlobalListeners: a } = $l(), l = q((f) => {
    f.currentTarget.contains(f.target) && o.current.isFocusWithin && !f.currentTarget.contains(f.relatedTarget) && (o.current.isFocusWithin = !1, a(), n && n(f), i && i(!1));
  }, [
    n,
    i,
    o,
    a
  ]), u = Pl(l), c = q((f) => {
    if (!f.currentTarget.contains(f.target)) return;
    const p = gt(f.target), d = Qi(p);
    if (!o.current.isFocusWithin && d === Cl(f.nativeEvent)) {
      r && r(f), i && i(!0), o.current.isFocusWithin = !0, u(f);
      let h = f.currentTarget;
      s(p, "focus", (g) => {
        if (o.current.isFocusWithin && !Rl(h, g.target)) {
          let b = new p.defaultView.FocusEvent("blur", {
            relatedTarget: g.target
          });
          wp(b, h);
          let E = Ll(b);
          l(E);
        }
      }, {
        capture: !0
      });
    }
  }, [
    r,
    i,
    u,
    s,
    l
  ]);
  return t ? {
    focusWithinProps: {
      // These cannot be null, that would conflict in mergeProps
      onFocus: void 0,
      onBlur: void 0
    }
  } : {
    focusWithinProps: {
      onFocus: c,
      onBlur: l
    }
  };
}
function Lp(e = {}) {
  let { autoFocus: t = !1, isTextInput: n, within: r } = e, i = C({
    isFocused: !1,
    isFocusVisible: t || kl()
  }), [o, s] = B(!1), [a, l] = B(() => i.current.isFocused && i.current.isFocusVisible), u = q(() => l(i.current.isFocused && i.current.isFocusVisible), []), c = q((d) => {
    i.current.isFocused = d, s(d), u();
  }, [
    u
  ]);
  Cp((d) => {
    i.current.isFocusVisible = d, u();
  }, [], {
    isTextInput: n
  });
  let { focusProps: f } = Dp({
    isDisabled: r,
    onFocusChange: c
  }), { focusWithinProps: p } = $p({
    isDisabled: !r,
    onFocusWithinChange: c
  });
  return {
    isFocused: o,
    isFocusVisible: a,
    focusProps: r ? p : f
  };
}
function xs(e) {
  if (!e) return;
  let t = !0;
  return (n) => {
    let r = {
      ...n,
      preventDefault() {
        n.preventDefault();
      },
      isDefaultPrevented() {
        return n.isDefaultPrevented();
      },
      stopPropagation() {
        t ? console.error("stopPropagation is now the default behavior for events in React Spectrum. You can use continuePropagation() to revert this behavior.") : t = !0;
      },
      continuePropagation() {
        t = !1;
      },
      isPropagationStopped() {
        return t;
      }
    };
    e(r), t && n.stopPropagation();
  };
}
function Pp(e) {
  return {
    keyboardProps: e.isDisabled ? {} : {
      onKeyDown: xs(e.onKeyDown),
      onKeyUp: xs(e.onKeyUp)
    }
  };
}
let Tr = !1, hi = 0;
function to() {
  Tr = !0, setTimeout(() => {
    Tr = !1;
  }, 50);
}
function Ts(e) {
  e.pointerType === "touch" && to();
}
function Ip() {
  if (!(typeof document > "u"))
    return typeof PointerEvent < "u" ? document.addEventListener("pointerup", Ts) : document.addEventListener("touchend", to), hi++, () => {
      hi--, !(hi > 0) && (typeof PointerEvent < "u" ? document.removeEventListener("pointerup", Ts) : document.removeEventListener("touchend", to));
    };
}
function Vp(e) {
  let { onHoverStart: t, onHoverChange: n, onHoverEnd: r, isDisabled: i } = e, [o, s] = B(!1), a = C({
    isHovered: !1,
    ignoreEmulatedMouseEvents: !1,
    pointerType: "",
    target: null
  }).current;
  K(Ip, []);
  let { addGlobalListener: l, removeAllGlobalListeners: u } = $l(), { hoverProps: c, triggerHoverEnd: f } = M(() => {
    let p = (g, b) => {
      if (a.pointerType = b, i || b === "touch" || a.isHovered || !g.currentTarget.contains(g.target)) return;
      a.isHovered = !0;
      let E = g.currentTarget;
      a.target = E, l(gt(g.target), "pointerover", (_) => {
        a.isHovered && a.target && !Rl(a.target, _.target) && d(_, _.pointerType);
      }, {
        capture: !0
      }), t && t({
        type: "hoverstart",
        target: E,
        pointerType: b
      }), n && n(!0), s(!0);
    }, d = (g, b) => {
      let E = a.target;
      a.pointerType = "", a.target = null, !(b === "touch" || !a.isHovered || !E) && (a.isHovered = !1, u(), r && r({
        type: "hoverend",
        target: E,
        pointerType: b
      }), n && n(!1), s(!1));
    }, h = {};
    return typeof PointerEvent < "u" ? (h.onPointerEnter = (g) => {
      Tr && g.pointerType === "mouse" || p(g, g.pointerType);
    }, h.onPointerLeave = (g) => {
      !i && g.currentTarget.contains(g.target) && d(g, g.pointerType);
    }) : (h.onTouchStart = () => {
      a.ignoreEmulatedMouseEvents = !0;
    }, h.onMouseEnter = (g) => {
      !a.ignoreEmulatedMouseEvents && !Tr && p(g, "mouse"), a.ignoreEmulatedMouseEvents = !1;
    }, h.onMouseLeave = (g) => {
      !i && g.currentTarget.contains(g.target) && d(g, "mouse");
    }), {
      hoverProps: h,
      triggerHoverEnd: d
    };
  }, [
    t,
    n,
    r,
    i,
    a,
    l,
    u
  ]);
  return K(() => {
    i && f({
      currentTarget: a.target
    }, a.pointerType);
  }, [
    i
  ]), {
    hoverProps: c,
    isHovered: o
  };
}
function Fp(e) {
  let { ref: t, onInteractOutside: n, isDisabled: r, onInteractOutsideStart: i } = e, o = C({
    isPointerDown: !1,
    ignoreEmulatedMouseEvents: !1
  }), s = Xi((l) => {
    n && or(l, t) && (i && i(l), o.current.isPointerDown = !0);
  }), a = Xi((l) => {
    n && n(l);
  });
  K(() => {
    let l = o.current;
    if (r) return;
    const u = t.current, c = gt(u);
    if (typeof PointerEvent < "u") {
      let f = (p) => {
        l.isPointerDown && or(p, t) && a(p), l.isPointerDown = !1;
      };
      return c.addEventListener("pointerdown", s, !0), c.addEventListener("pointerup", f, !0), () => {
        c.removeEventListener("pointerdown", s, !0), c.removeEventListener("pointerup", f, !0);
      };
    } else {
      let f = (d) => {
        l.ignoreEmulatedMouseEvents ? l.ignoreEmulatedMouseEvents = !1 : l.isPointerDown && or(d, t) && a(d), l.isPointerDown = !1;
      }, p = (d) => {
        l.ignoreEmulatedMouseEvents = !0, l.isPointerDown && or(d, t) && a(d), l.isPointerDown = !1;
      };
      return c.addEventListener("mousedown", s, !0), c.addEventListener("mouseup", f, !0), c.addEventListener("touchstart", s, !0), c.addEventListener("touchend", p, !0), () => {
        c.removeEventListener("mousedown", s, !0), c.removeEventListener("mouseup", f, !0), c.removeEventListener("touchstart", s, !0), c.removeEventListener("touchend", p, !0);
      };
    }
  }, [
    t,
    r,
    s,
    a
  ]);
}
function or(e, t) {
  if (e.button > 0) return !1;
  if (e.target) {
    const n = e.target.ownerDocument;
    if (!n || !n.documentElement.contains(e.target) || e.target.closest("[data-react-aria-top-layer]")) return !1;
  }
  return t.current ? !e.composedPath().includes(t.current) : !1;
}
var Mp = Object.defineProperty, jp = (e, t, n) => t in e ? Mp(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, vi = (e, t, n) => (jp(e, typeof t != "symbol" ? t + "" : t, n), n);
let kp = class {
  constructor() {
    vi(this, "current", this.detect()), vi(this, "handoffState", "pending"), vi(this, "currentId", 0);
  }
  set(t) {
    this.current !== t && (this.handoffState = "pending", this.currentId = 0, this.current = t);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window > "u" || typeof document > "u" ? "server" : "client";
  }
  handoff() {
    this.handoffState === "pending" && (this.handoffState = "complete");
  }
  get isHandoffComplete() {
    return this.handoffState === "complete";
  }
}, Vt = new kp();
function Zn(e) {
  return Vt.isServer ? null : e instanceof Node ? e.ownerDocument : e != null && e.hasOwnProperty("current") && e.current instanceof Node ? e.current.ownerDocument : document;
}
function Bl(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((t) => setTimeout(() => {
    throw t;
  }));
}
function mt() {
  let e = [], t = { addEventListener(n, r, i, o) {
    return n.addEventListener(r, i, o), t.add(() => n.removeEventListener(r, i, o));
  }, requestAnimationFrame(...n) {
    let r = requestAnimationFrame(...n);
    return t.add(() => cancelAnimationFrame(r));
  }, nextFrame(...n) {
    return t.requestAnimationFrame(() => t.requestAnimationFrame(...n));
  }, setTimeout(...n) {
    let r = setTimeout(...n);
    return t.add(() => clearTimeout(r));
  }, microTask(...n) {
    let r = { current: !0 };
    return Bl(() => {
      r.current && n[0]();
    }), t.add(() => {
      r.current = !1;
    });
  }, style(n, r, i) {
    let o = n.style.getPropertyValue(r);
    return Object.assign(n.style, { [r]: i }), this.add(() => {
      Object.assign(n.style, { [r]: o });
    });
  }, group(n) {
    let r = mt();
    return n(r), this.add(() => r.dispose());
  }, add(n) {
    return e.includes(n) || e.push(n), () => {
      let r = e.indexOf(n);
      if (r >= 0) for (let i of e.splice(r, 1)) i();
    };
  }, dispose() {
    for (let n of e.splice(0)) n();
  } };
  return t;
}
function Kt() {
  let [e] = B(mt);
  return K(() => () => e.dispose(), [e]), e;
}
let ee = (e, t) => {
  Vt.isServer ? K(e, t) : jr(e, t);
};
function zt(e) {
  let t = C(e);
  return ee(() => {
    t.current = e;
  }, [e]), t;
}
let k = function(e) {
  let t = zt(e);
  return H.useCallback((...n) => t.current(...n), [t]);
};
function Bp(e) {
  let t = e.width / 2, n = e.height / 2;
  return { top: e.clientY - n, right: e.clientX + t, bottom: e.clientY + n, left: e.clientX - t };
}
function Up(e, t) {
  return !(!e || !t || e.right < t.left || e.left > t.right || e.bottom < t.top || e.top > t.bottom);
}
function Hp({ disabled: e = !1 } = {}) {
  let t = C(null), [n, r] = B(!1), i = Kt(), o = k(() => {
    t.current = null, r(!1), i.dispose();
  }), s = k((a) => {
    if (i.dispose(), t.current === null) {
      t.current = a.currentTarget, r(!0);
      {
        let l = Zn(a.currentTarget);
        i.addEventListener(l, "pointerup", o, !1), i.addEventListener(l, "pointermove", (u) => {
          if (t.current) {
            let c = Bp(u);
            r(Up(c, t.current.getBoundingClientRect()));
          }
        }, !1), i.addEventListener(l, "pointercancel", o, !1);
      }
    }
  });
  return { pressed: n, pressProps: e ? {} : { onPointerDown: s, onPointerUp: o, onClick: o } };
}
let qp = se(void 0);
function Vo() {
  return Q(qp);
}
function no(...e) {
  return Array.from(new Set(e.flatMap((t) => typeof t == "string" ? t.split(" ") : []))).filter(Boolean).join(" ");
}
function Xe(e, t, ...n) {
  if (e in t) {
    let i = t[e];
    return typeof i == "function" ? i(...n) : i;
  }
  let r = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((i) => `"${i}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(r, Xe), r;
}
var Rr = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(Rr || {}), Et = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(Et || {});
function Te() {
  let e = Wp();
  return q((t) => Gp({ mergeRefs: e, ...t }), [e]);
}
function Gp({ ourProps: e, theirProps: t, slot: n, defaultTag: r, features: i, visible: o = !0, name: s, mergeRefs: a }) {
  a = a ?? Kp;
  let l = Ul(t, e);
  if (o) return sr(l, n, r, s, a);
  let u = i ?? 0;
  if (u & 2) {
    let { static: c = !1, ...f } = l;
    if (c) return sr(f, n, r, s, a);
  }
  if (u & 1) {
    let { unmount: c = !0, ...f } = l;
    return Xe(c ? 0 : 1, { 0() {
      return null;
    }, 1() {
      return sr({ ...f, hidden: !0, style: { display: "none" } }, n, r, s, a);
    } });
  }
  return sr(l, n, r, s, a);
}
function sr(e, t = {}, n, r, i) {
  let { as: o = n, children: s, refName: a = "ref", ...l } = gi(e, ["unmount", "static"]), u = e.ref !== void 0 ? { [a]: e.ref } : {}, c = typeof s == "function" ? s(t) : s;
  "className" in l && l.className && typeof l.className == "function" && (l.className = l.className(t)), l["aria-labelledby"] && l["aria-labelledby"] === l.id && (l["aria-labelledby"] = void 0);
  let f = {};
  if (t) {
    let p = !1, d = [];
    for (let [h, g] of Object.entries(t)) typeof g == "boolean" && (p = !0), g === !0 && d.push(h.replace(/([A-Z])/g, (b) => `-${b.toLowerCase()}`));
    if (p) {
      f["data-headlessui-state"] = d.join(" ");
      for (let h of d) f[`data-${h}`] = "";
    }
  }
  if (o === ce && (Object.keys(_t(l)).length > 0 || Object.keys(_t(f)).length > 0)) if (!Tn(c) || Array.isArray(c) && c.length > 1) {
    if (Object.keys(_t(l)).length > 0) throw new Error(['Passing props on "Fragment"!', "", `The current component <${r} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(_t(l)).concat(Object.keys(_t(f))).map((p) => `  - ${p}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map((p) => `  - ${p}`).join(`
`)].join(`
`));
  } else {
    let p = c.props, d = p == null ? void 0 : p.className, h = typeof d == "function" ? (...E) => no(d(...E), l.className) : no(d, l.className), g = h ? { className: h } : {}, b = Ul(c.props, _t(gi(l, ["ref"])));
    for (let E in f) E in b && delete f[E];
    return go(c, Object.assign({}, b, f, u, { ref: i(zp(c), u.ref) }, g));
  }
  return Ie(o, Object.assign({}, gi(l, ["ref"]), o !== ce && u, o !== ce && f), c);
}
function Wp() {
  let e = C([]), t = q((n) => {
    for (let r of e.current) r != null && (typeof r == "function" ? r(n) : r.current = n);
  }, []);
  return (...n) => {
    if (!n.every((r) => r == null)) return e.current = n, t;
  };
}
function Kp(...e) {
  return e.every((t) => t == null) ? void 0 : (t) => {
    for (let n of e) n != null && (typeof n == "function" ? n(t) : n.current = t);
  };
}
function Ul(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let t = {}, n = {};
  for (let r of e) for (let i in r) i.startsWith("on") && typeof r[i] == "function" ? (n[i] != null || (n[i] = []), n[i].push(r[i])) : t[i] = r[i];
  if (t.disabled || t["aria-disabled"]) for (let r in n) /^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(r) && (n[r] = [(i) => {
    var o;
    return (o = i == null ? void 0 : i.preventDefault) == null ? void 0 : o.call(i);
  }]);
  for (let r in n) Object.assign(t, { [r](i, ...o) {
    let s = n[r];
    for (let a of s) {
      if ((i instanceof Event || (i == null ? void 0 : i.nativeEvent) instanceof Event) && i.defaultPrevented) return;
      a(i, ...o);
    }
  } });
  return t;
}
function Hl(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let t = {}, n = {};
  for (let r of e) for (let i in r) i.startsWith("on") && typeof r[i] == "function" ? (n[i] != null || (n[i] = []), n[i].push(r[i])) : t[i] = r[i];
  for (let r in n) Object.assign(t, { [r](...i) {
    let o = n[r];
    for (let s of o) s == null || s(...i);
  } });
  return t;
}
function ye(e) {
  var t;
  return Object.assign(pt(e), { displayName: (t = e.displayName) != null ? t : e.name });
}
function _t(e) {
  let t = Object.assign({}, e);
  for (let n in t) t[n] === void 0 && delete t[n];
  return t;
}
function gi(e, t = []) {
  let n = Object.assign({}, e);
  for (let r of t) r in n && delete n[r];
  return n;
}
function zp(e) {
  return H.version.split(".")[0] >= "19" ? e.props.ref : e.ref;
}
function Yp(e, t, n) {
  let [r, i] = B(n), o = e !== void 0, s = C(o), a = C(!1), l = C(!1);
  return o && !s.current && !a.current ? (a.current = !0, s.current = o, console.error("A component is changing from uncontrolled to controlled. This may be caused by the value changing from undefined to a defined value, which should not happen.")) : !o && s.current && !l.current && (l.current = !0, s.current = o, console.error("A component is changing from controlled to uncontrolled. This may be caused by the value changing from a defined value to undefined, which should not happen.")), [o ? e : r, k((u) => (o || i(u), t == null ? void 0 : t(u)))];
}
function Xp(e) {
  let [t] = B(e);
  return t;
}
function ql(e = {}, t = null, n = []) {
  for (let [r, i] of Object.entries(e)) Wl(n, Gl(t, r), i);
  return n;
}
function Gl(e, t) {
  return e ? e + "[" + t + "]" : t;
}
function Wl(e, t, n) {
  if (Array.isArray(n)) for (let [r, i] of n.entries()) Wl(e, Gl(t, r.toString()), i);
  else n instanceof Date ? e.push([t, n.toISOString()]) : typeof n == "boolean" ? e.push([t, n ? "1" : "0"]) : typeof n == "string" ? e.push([t, n]) : typeof n == "number" ? e.push([t, `${n}`]) : n == null ? e.push([t, ""]) : ql(n, t, e);
}
function Qp(e) {
  var t, n;
  let r = (t = e == null ? void 0 : e.form) != null ? t : e.closest("form");
  if (r) {
    for (let i of r.elements) if (i !== e && (i.tagName === "INPUT" && i.type === "submit" || i.tagName === "BUTTON" && i.type === "submit" || i.nodeName === "INPUT" && i.type === "image")) {
      i.click();
      return;
    }
    (n = r.requestSubmit) == null || n.call(r);
  }
}
let Zp = "span";
var Fo = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(Fo || {});
function Jp(e, t) {
  var n;
  let { features: r = 1, ...i } = e, o = { ref: t, "aria-hidden": (r & 2) === 2 ? !0 : (n = i["aria-hidden"]) != null ? n : void 0, hidden: (r & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(r & 4) === 4 && (r & 2) !== 2 && { display: "none" } } };
  return Te()({ ourProps: o, theirProps: i, slot: {}, defaultTag: Zp, name: "Hidden" });
}
let Kl = ye(Jp), eh = se(null);
function th({ children: e }) {
  let t = Q(eh);
  if (!t) return H.createElement(H.Fragment, null, e);
  let { target: n } = t;
  return n ? va(H.createElement(H.Fragment, null, e), n) : null;
}
function nh({ data: e, form: t, disabled: n, onReset: r, overrides: i }) {
  let [o, s] = B(null), a = Kt();
  return K(() => {
    if (r && o) return a.addEventListener(o, "reset", r);
  }, [o, t, r]), H.createElement(th, null, H.createElement(rh, { setForm: s, formId: t }), ql(e).map(([l, u]) => H.createElement(Kl, { features: Fo.Hidden, ..._t({ key: l, as: "input", type: "hidden", hidden: !0, readOnly: !0, form: t, disabled: n, name: l, value: u, ...i }) })));
}
function rh({ setForm: e, formId: t }) {
  return K(() => {
    if (t) {
      let n = document.getElementById(t);
      n && e(n);
    }
  }, [e, t]), t ? null : H.createElement(Kl, { features: Fo.Hidden, as: "input", type: "hidden", hidden: !0, readOnly: !0, ref: (n) => {
    if (!n) return;
    let r = n.closest("form");
    r && e(r);
  } });
}
let ih = se(void 0);
function zl() {
  return Q(ih);
}
function oh(e) {
  let t = e.parentElement, n = null;
  for (; t && !(t instanceof HTMLFieldSetElement); ) t instanceof HTMLLegendElement && (n = t), t = t.parentElement;
  let r = (t == null ? void 0 : t.getAttribute("disabled")) === "";
  return r && sh(n) ? !1 : r;
}
function sh(e) {
  if (!e) return !1;
  let t = e.previousElementSibling;
  for (; t !== null; ) {
    if (t instanceof HTMLLegendElement) return !1;
    t = t.previousElementSibling;
  }
  return !0;
}
let Yl = Symbol();
function ah(e, t = !0) {
  return Object.assign(e, { [Yl]: t });
}
function Ue(...e) {
  let t = C(e);
  K(() => {
    t.current = e;
  }, [e]);
  let n = k((r) => {
    for (let i of t.current) i != null && (typeof i == "function" ? i(r) : i.current = r);
  });
  return e.every((r) => r == null || (r == null ? void 0 : r[Yl])) ? void 0 : n;
}
let Mo = se(null);
Mo.displayName = "DescriptionContext";
function Xl() {
  let e = Q(Mo);
  if (e === null) {
    let t = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t, Xl), t;
  }
  return e;
}
function lh() {
  var e, t;
  return (t = (e = Q(Mo)) == null ? void 0 : e.value) != null ? t : void 0;
}
let uh = "p";
function ch(e, t) {
  let n = fn(), r = Vo(), { id: i = `headlessui-description-${n}`, ...o } = e, s = Xl(), a = Ue(t);
  ee(() => s.register(i), [i, s.register]);
  let l = r || !1, u = M(() => ({ ...s.slot, disabled: l }), [s.slot, l]), c = { ref: a, ...s.props, id: i };
  return Te()({ ourProps: c, theirProps: o, slot: u, defaultTag: uh, name: s.name || "Description" });
}
let fh = ye(ch);
Object.assign(fh, {});
var ue = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(ue || {});
let Yr = se(null);
Yr.displayName = "LabelContext";
function Ql() {
  let e = Q(Yr);
  if (e === null) {
    let t = new Error("You used a <Label /> component, but it is not inside a relevant parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t, Ql), t;
  }
  return e;
}
function Zl(e) {
  var t, n, r;
  let i = (n = (t = Q(Yr)) == null ? void 0 : t.value) != null ? n : void 0;
  return ((r = e == null ? void 0 : e.length) != null ? r : 0) > 0 ? [i, ...e].filter(Boolean).join(" ") : i;
}
function dh({ inherit: e = !1 } = {}) {
  let t = Zl(), [n, r] = B([]), i = e ? [t, ...n].filter(Boolean) : n;
  return [i.length > 0 ? i.join(" ") : void 0, M(() => function(o) {
    let s = k((l) => (r((u) => [...u, l]), () => r((u) => {
      let c = u.slice(), f = c.indexOf(l);
      return f !== -1 && c.splice(f, 1), c;
    }))), a = M(() => ({ register: s, slot: o.slot, name: o.name, props: o.props, value: o.value }), [s, o.slot, o.name, o.props, o.value]);
    return H.createElement(Yr.Provider, { value: a }, o.children);
  }, [r])];
}
let ph = "label";
function hh(e, t) {
  var n;
  let r = fn(), i = Ql(), o = zl(), s = Vo(), { id: a = `headlessui-label-${r}`, htmlFor: l = o ?? ((n = i.props) == null ? void 0 : n.htmlFor), passive: u = !1, ...c } = e, f = Ue(t);
  ee(() => i.register(a), [a, i.register]);
  let p = k((b) => {
    let E = b.currentTarget;
    if (E instanceof HTMLLabelElement && b.preventDefault(), i.props && "onClick" in i.props && typeof i.props.onClick == "function" && i.props.onClick(b), E instanceof HTMLLabelElement) {
      let _ = document.getElementById(E.htmlFor);
      if (_) {
        let y = _.getAttribute("disabled");
        if (y === "true" || y === "") return;
        let w = _.getAttribute("aria-disabled");
        if (w === "true" || w === "") return;
        (_ instanceof HTMLInputElement && (_.type === "radio" || _.type === "checkbox") || _.role === "radio" || _.role === "checkbox" || _.role === "switch") && _.click(), _.focus({ preventScroll: !0 });
      }
    }
  }), d = s || !1, h = M(() => ({ ...i.slot, disabled: d }), [i.slot, d]), g = { ref: f, ...i.props, id: a, htmlFor: l, onClick: p };
  return u && ("onClick" in g && (delete g.htmlFor, delete g.onClick), "onClick" in c && delete c.onClick), Te()({ ourProps: g, theirProps: c, slot: h, defaultTag: l ? ph : "div", name: i.name || "Label" });
}
let vh = ye(hh), gh = Object.assign(vh, {});
function mh(e, t) {
  return e !== null && t !== null && typeof e == "object" && typeof t == "object" && "id" in e && "id" in t ? e.id === t.id : e === t;
}
function bh(e = mh) {
  return q((t, n) => {
    if (typeof e == "string") {
      let r = e;
      return (t == null ? void 0 : t[r]) === (n == null ? void 0 : n[r]);
    }
    return e(t, n);
  }, [e]);
}
function _h(e) {
  if (e === null) return { width: 0, height: 0 };
  let { width: t, height: n } = e.getBoundingClientRect();
  return { width: t, height: n };
}
function yh(e, t = !1) {
  let [n, r] = mo(() => ({}), {}), i = M(() => _h(e), [e, n]);
  return ee(() => {
    if (!e) return;
    let o = new ResizeObserver(r);
    return o.observe(e), () => {
      o.disconnect();
    };
  }, [e]), t ? { width: `${i.width}px`, height: `${i.height}px` } : i;
}
let Eh = class extends Map {
  constructor(t) {
    super(), this.factory = t;
  }
  get(t) {
    let n = super.get(t);
    return n === void 0 && (n = this.factory(t), this.set(t, n)), n;
  }
};
function Jl(e, t) {
  let n = e(), r = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return n;
  }, subscribe(i) {
    return r.add(i), () => r.delete(i);
  }, dispatch(i, ...o) {
    let s = t[i].call(n, ...o);
    s && (n = s, r.forEach((a) => a()));
  } };
}
function eu(e) {
  return ga(e.subscribe, e.getSnapshot, e.getSnapshot);
}
let Oh = new Eh(() => Jl(() => [], { ADD(e) {
  return this.includes(e) ? this : [...this, e];
}, REMOVE(e) {
  let t = this.indexOf(e);
  if (t === -1) return this;
  let n = this.slice();
  return n.splice(t, 1), n;
} }));
function jo(e, t) {
  let n = Oh.get(t), r = fn(), i = eu(n);
  if (ee(() => {
    if (e) return n.dispatch("ADD", r), () => n.dispatch("REMOVE", r);
  }, [n, e]), !e) return !1;
  let o = i.indexOf(r), s = i.length;
  return o === -1 && (o = s, s += 1), o === s - 1;
}
let ro = /* @__PURE__ */ new Map(), xn = /* @__PURE__ */ new Map();
function Rs(e) {
  var t;
  let n = (t = xn.get(e)) != null ? t : 0;
  return xn.set(e, n + 1), n !== 0 ? () => Cs(e) : (ro.set(e, { "aria-hidden": e.getAttribute("aria-hidden"), inert: e.inert }), e.setAttribute("aria-hidden", "true"), e.inert = !0, () => Cs(e));
}
function Cs(e) {
  var t;
  let n = (t = xn.get(e)) != null ? t : 1;
  if (n === 1 ? xn.delete(e) : xn.set(e, n - 1), n !== 1) return;
  let r = ro.get(e);
  r && (r["aria-hidden"] === null ? e.removeAttribute("aria-hidden") : e.setAttribute("aria-hidden", r["aria-hidden"]), e.inert = r.inert, ro.delete(e));
}
function wh(e, { allowed: t, disallowed: n } = {}) {
  let r = jo(e, "inert-others");
  ee(() => {
    var i, o;
    if (!r) return;
    let s = mt();
    for (let l of (i = n == null ? void 0 : n()) != null ? i : []) l && s.add(Rs(l));
    let a = (o = t == null ? void 0 : t()) != null ? o : [];
    for (let l of a) {
      if (!l) continue;
      let u = Zn(l);
      if (!u) continue;
      let c = l.parentElement;
      for (; c && c !== u.body; ) {
        for (let f of c.children) a.some((p) => f.contains(p)) || s.add(Rs(f));
        c = c.parentElement;
      }
    }
    return s.dispose;
  }, [r, t, n]);
}
function Sh(e, t, n) {
  let r = zt((i) => {
    let o = i.getBoundingClientRect();
    o.x === 0 && o.y === 0 && o.width === 0 && o.height === 0 && n();
  });
  K(() => {
    if (!e) return;
    let i = t === null ? null : t instanceof HTMLElement ? t : t.current;
    if (!i) return;
    let o = mt();
    if (typeof ResizeObserver < "u") {
      let s = new ResizeObserver(() => r.current(i));
      s.observe(i), o.add(() => s.disconnect());
    }
    if (typeof IntersectionObserver < "u") {
      let s = new IntersectionObserver(() => r.current(i));
      s.observe(i), o.add(() => s.disconnect());
    }
    return () => o.dispose();
  }, [t, r, e]);
}
let io = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(","), Nh = ["[data-autofocus]"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var oo = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e[e.AutoFocus = 64] = "AutoFocus", e))(oo || {}), Ah = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(Ah || {}), xh = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(xh || {});
function tu(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(io)).sort((t, n) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (n.tabIndex || Number.MAX_SAFE_INTEGER)));
}
function Th(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(Nh)).sort((t, n) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (n.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var ko = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(ko || {});
function nu(e, t = 0) {
  var n;
  return e === ((n = Zn(e)) == null ? void 0 : n.body) ? !1 : Xe(t, { 0() {
    return e.matches(io);
  }, 1() {
    let r = e;
    for (; r !== null; ) {
      if (r.matches(io)) return !0;
      r = r.parentElement;
    }
    return !1;
  } });
}
var Rh = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(Rh || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
let Ch = ["textarea", "input"].join(",");
function Dh(e) {
  var t, n;
  return (n = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, Ch)) != null ? n : !1;
}
function ru(e, t = (n) => n) {
  return e.slice().sort((n, r) => {
    let i = t(n), o = t(r);
    if (i === null || o === null) return 0;
    let s = i.compareDocumentPosition(o);
    return s & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : s & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function $h(e, t) {
  return Lh(tu(), t, { relativeTo: e });
}
function Lh(e, t, { sorted: n = !0, relativeTo: r = null, skipElements: i = [] } = {}) {
  let o = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e.ownerDocument, s = Array.isArray(e) ? n ? ru(e) : e : t & 64 ? Th(e) : tu(e);
  i.length > 0 && s.length > 1 && (s = s.filter((d) => !i.some((h) => h != null && "current" in h ? (h == null ? void 0 : h.current) === d : h === d))), r = r ?? o.activeElement;
  let a = (() => {
    if (t & 5) return 1;
    if (t & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), l = (() => {
    if (t & 1) return 0;
    if (t & 2) return Math.max(0, s.indexOf(r)) - 1;
    if (t & 4) return Math.max(0, s.indexOf(r)) + 1;
    if (t & 8) return s.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), u = t & 32 ? { preventScroll: !0 } : {}, c = 0, f = s.length, p;
  do {
    if (c >= f || c + f <= 0) return 0;
    let d = l + c;
    if (t & 16) d = (d + f) % f;
    else {
      if (d < 0) return 3;
      if (d >= f) return 1;
    }
    p = s[d], p == null || p.focus(u), c += a;
  } while (p !== o.activeElement);
  return t & 6 && Dh(p) && p.select(), 2;
}
function iu() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function Ph() {
  return /Android/gi.test(window.navigator.userAgent);
}
function Ih() {
  return iu() || Ph();
}
function Sn(e, t, n, r) {
  let i = zt(n);
  K(() => {
    if (!e) return;
    function o(s) {
      i.current(s);
    }
    return document.addEventListener(t, o, r), () => document.removeEventListener(t, o, r);
  }, [e, t, r]);
}
function Vh(e, t, n, r) {
  let i = zt(n);
  K(() => {
    if (!e) return;
    function o(s) {
      i.current(s);
    }
    return window.addEventListener(t, o, r), () => window.removeEventListener(t, o, r);
  }, [e, t, r]);
}
const Ds = 30;
function Fh(e, t, n) {
  let r = jo(e, "outside-click"), i = zt(n), o = q(function(l, u) {
    if (l.defaultPrevented) return;
    let c = u(l);
    if (c === null || !c.getRootNode().contains(c) || !c.isConnected) return;
    let f = function p(d) {
      return typeof d == "function" ? p(d()) : Array.isArray(d) || d instanceof Set ? d : [d];
    }(t);
    for (let p of f) if (p !== null && (p.contains(c) || l.composed && l.composedPath().includes(p))) return;
    return !nu(c, ko.Loose) && c.tabIndex !== -1 && l.preventDefault(), i.current(l, c);
  }, [i, t]), s = C(null);
  Sn(r, "pointerdown", (l) => {
    var u, c;
    s.current = ((c = (u = l.composedPath) == null ? void 0 : u.call(l)) == null ? void 0 : c[0]) || l.target;
  }, !0), Sn(r, "mousedown", (l) => {
    var u, c;
    s.current = ((c = (u = l.composedPath) == null ? void 0 : u.call(l)) == null ? void 0 : c[0]) || l.target;
  }, !0), Sn(r, "click", (l) => {
    Ih() || s.current && (o(l, () => s.current), s.current = null);
  }, !0);
  let a = C({ x: 0, y: 0 });
  Sn(r, "touchstart", (l) => {
    a.current.x = l.touches[0].clientX, a.current.y = l.touches[0].clientY;
  }, !0), Sn(r, "touchend", (l) => {
    let u = { x: l.changedTouches[0].clientX, y: l.changedTouches[0].clientY };
    if (!(Math.abs(u.x - a.current.x) >= Ds || Math.abs(u.y - a.current.y) >= Ds)) return o(l, () => l.target instanceof HTMLElement ? l.target : null);
  }, !0), Vh(r, "blur", (l) => o(l, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
function Bo(...e) {
  return M(() => Zn(...e), [...e]);
}
function Mh(e, t) {
  return M(() => {
    var n;
    if (e.type) return e.type;
    let r = (n = e.as) != null ? n : "button";
    if (typeof r == "string" && r.toLowerCase() === "button" || (t == null ? void 0 : t.tagName) === "BUTTON" && !t.hasAttribute("type")) return "button";
  }, [e.type, e.as, t]);
}
function jh() {
  let e;
  return { before({ doc: t }) {
    var n;
    let r = t.documentElement, i = (n = t.defaultView) != null ? n : window;
    e = Math.max(0, i.innerWidth - r.clientWidth);
  }, after({ doc: t, d: n }) {
    let r = t.documentElement, i = Math.max(0, r.clientWidth - r.offsetWidth), o = Math.max(0, e - i);
    n.style(r, "paddingRight", `${o}px`);
  } };
}
function kh() {
  return iu() ? { before({ doc: e, d: t, meta: n }) {
    function r(i) {
      return n.containers.flatMap((o) => o()).some((o) => o.contains(i));
    }
    t.microTask(() => {
      var i;
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let a = mt();
        a.style(e.documentElement, "scrollBehavior", "auto"), t.add(() => t.microTask(() => a.dispose()));
      }
      let o = (i = window.scrollY) != null ? i : window.pageYOffset, s = null;
      t.addEventListener(e, "click", (a) => {
        if (a.target instanceof HTMLElement) try {
          let l = a.target.closest("a");
          if (!l) return;
          let { hash: u } = new URL(l.href), c = e.querySelector(u);
          c && !r(c) && (s = c);
        } catch {
        }
      }, !0), t.addEventListener(e, "touchstart", (a) => {
        if (a.target instanceof HTMLElement) if (r(a.target)) {
          let l = a.target;
          for (; l.parentElement && r(l.parentElement); ) l = l.parentElement;
          t.style(l, "overscrollBehavior", "contain");
        } else t.style(a.target, "touchAction", "none");
      }), t.addEventListener(e, "touchmove", (a) => {
        if (a.target instanceof HTMLElement) {
          if (a.target.tagName === "INPUT") return;
          if (r(a.target)) {
            let l = a.target;
            for (; l.parentElement && l.dataset.headlessuiPortal !== "" && !(l.scrollHeight > l.clientHeight || l.scrollWidth > l.clientWidth); ) l = l.parentElement;
            l.dataset.headlessuiPortal === "" && a.preventDefault();
          } else a.preventDefault();
        }
      }, { passive: !1 }), t.add(() => {
        var a;
        let l = (a = window.scrollY) != null ? a : window.pageYOffset;
        o !== l && window.scrollTo(0, o), s && s.isConnected && (s.scrollIntoView({ block: "nearest" }), s = null);
      });
    });
  } } : {};
}
function Bh() {
  return { before({ doc: e, d: t }) {
    t.style(e.documentElement, "overflow", "hidden");
  } };
}
function Uh(e) {
  let t = {};
  for (let n of e) Object.assign(t, n(t));
  return t;
}
let Lt = Jl(() => /* @__PURE__ */ new Map(), { PUSH(e, t) {
  var n;
  let r = (n = this.get(e)) != null ? n : { doc: e, count: 0, d: mt(), meta: /* @__PURE__ */ new Set() };
  return r.count++, r.meta.add(t), this.set(e, r), this;
}, POP(e, t) {
  let n = this.get(e);
  return n && (n.count--, n.meta.delete(t)), this;
}, SCROLL_PREVENT({ doc: e, d: t, meta: n }) {
  let r = { doc: e, d: t, meta: Uh(n) }, i = [kh(), jh(), Bh()];
  i.forEach(({ before: o }) => o == null ? void 0 : o(r)), i.forEach(({ after: o }) => o == null ? void 0 : o(r));
}, SCROLL_ALLOW({ d: e }) {
  e.dispose();
}, TEARDOWN({ doc: e }) {
  this.delete(e);
} });
Lt.subscribe(() => {
  let e = Lt.getSnapshot(), t = /* @__PURE__ */ new Map();
  for (let [n] of e) t.set(n, n.documentElement.style.overflow);
  for (let n of e.values()) {
    let r = t.get(n.doc) === "hidden", i = n.count !== 0;
    (i && !r || !i && r) && Lt.dispatch(n.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", n), n.count === 0 && Lt.dispatch("TEARDOWN", n);
  }
});
function Hh(e, t, n = () => ({ containers: [] })) {
  let r = eu(Lt), i = t ? r.get(t) : void 0, o = i ? i.count > 0 : !1;
  return ee(() => {
    if (!(!t || !e)) return Lt.dispatch("PUSH", t, n), () => Lt.dispatch("POP", t, n);
  }, [e, t]), o;
}
function qh(e, t, n = () => [document.body]) {
  let r = jo(e, "scroll-lock");
  Hh(r, t, (i) => {
    var o;
    return { containers: [...(o = i.containers) != null ? o : [], n] };
  });
}
function $s(e) {
  return [e.screenX, e.screenY];
}
function Gh() {
  let e = C([-1, -1]);
  return { wasMoved(t) {
    let n = $s(t);
    return e.current[0] === n[0] && e.current[1] === n[1] ? !1 : (e.current = n, !0);
  }, update(t) {
    e.current = $s(t);
  } };
}
function Wh(e = 0) {
  let [t, n] = B(e), r = q((l) => n(l), [t]), i = q((l) => n((u) => u | l), [t]), o = q((l) => (t & l) === l, [t]), s = q((l) => n((u) => u & ~l), [n]), a = q((l) => n((u) => u ^ l), [n]);
  return { flags: t, setFlag: r, addFlag: i, hasFlag: o, removeFlag: s, toggleFlag: a };
}
var Kh = {}, Ls, Ps;
typeof process < "u" && typeof globalThis < "u" && typeof Element < "u" && ((Ls = process == null ? void 0 : Kh) == null ? void 0 : Ls.NODE_ENV) === "test" && typeof ((Ps = Element == null ? void 0 : Element.prototype) == null ? void 0 : Ps.getAnimations) > "u" && (Element.prototype.getAnimations = function() {
  return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.", "Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.", "", "Example usage:", "```js", "import { mockAnimationsApi } from 'jsdom-testing-mocks'", "mockAnimationsApi()", "```"].join(`
`)), [];
});
var zh = ((e) => (e[e.None = 0] = "None", e[e.Closed = 1] = "Closed", e[e.Enter = 2] = "Enter", e[e.Leave = 4] = "Leave", e))(zh || {});
function ou(e) {
  let t = {};
  for (let n in e) e[n] === !0 && (t[`data-${n}`] = "");
  return t;
}
function su(e, t, n, r) {
  let [i, o] = B(n), { hasFlag: s, addFlag: a, removeFlag: l } = Wh(e && i ? 3 : 0), u = C(!1), c = C(!1), f = Kt();
  return ee(() => {
    var p;
    if (e) {
      if (n && o(!0), !t) {
        n && a(3);
        return;
      }
      return (p = r == null ? void 0 : r.start) == null || p.call(r, n), Yh(t, { inFlight: u, prepare() {
        c.current ? c.current = !1 : c.current = u.current, u.current = !0, !c.current && (n ? (a(3), l(4)) : (a(4), l(2)));
      }, run() {
        c.current ? n ? (l(3), a(4)) : (l(4), a(3)) : n ? l(1) : a(1);
      }, done() {
        var d;
        c.current && typeof t.getAnimations == "function" && t.getAnimations().length > 0 || (u.current = !1, l(7), n || o(!1), (d = r == null ? void 0 : r.end) == null || d.call(r, n));
      } });
    }
  }, [e, n, t, f]), e ? [i, { closed: s(1), enter: s(2), leave: s(4), transition: s(2) || s(4) }] : [n, { closed: void 0, enter: void 0, leave: void 0, transition: void 0 }];
}
function Yh(e, { prepare: t, run: n, done: r, inFlight: i }) {
  let o = mt();
  return Qh(e, { prepare: t, inFlight: i }), o.nextFrame(() => {
    n(), o.requestAnimationFrame(() => {
      o.add(Xh(e, r));
    });
  }), o.dispose;
}
function Xh(e, t) {
  var n, r;
  let i = mt();
  if (!e) return i.dispose;
  let o = !1;
  i.add(() => {
    o = !0;
  });
  let s = (r = (n = e.getAnimations) == null ? void 0 : n.call(e).filter((a) => a instanceof CSSTransition)) != null ? r : [];
  return s.length === 0 ? (t(), i.dispose) : (Promise.allSettled(s.map((a) => a.finished)).then(() => {
    o || t();
  }), i.dispose);
}
function Qh(e, { inFlight: t, prepare: n }) {
  if (t != null && t.current) {
    n();
    return;
  }
  let r = e.style.transition;
  e.style.transition = "none", n(), e.offsetHeight, e.style.transition = r;
}
function Xr() {
  return typeof window < "u";
}
function gn(e) {
  return au(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Ae(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function st(e) {
  var t;
  return (t = (au(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function au(e) {
  return Xr() ? e instanceof Node || e instanceof Ae(e).Node : !1;
}
function me(e) {
  return Xr() ? e instanceof Element || e instanceof Ae(e).Element : !1;
}
function bt(e) {
  return Xr() ? e instanceof HTMLElement || e instanceof Ae(e).HTMLElement : !1;
}
function Is(e) {
  return !Xr() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Ae(e).ShadowRoot;
}
function Jn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: i
  } = Qe(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Zh(e) {
  return /^(table|td|th)$/.test(gn(e));
}
function Qr(e) {
  try {
    if (e.matches(":popover-open"))
      return !0;
  } catch {
  }
  try {
    return e.matches(":modal");
  } catch {
    return !1;
  }
}
const Jh = /transform|translate|scale|rotate|perspective|filter/, ev = /paint|layout|strict|content/, Ct = (e) => !!e && e !== "none";
let mi;
function Uo(e) {
  const t = me(e) ? Qe(e) : e;
  return Ct(t.transform) || Ct(t.translate) || Ct(t.scale) || Ct(t.rotate) || Ct(t.perspective) || !Ho() && (Ct(t.backdropFilter) || Ct(t.filter)) || Jh.test(t.willChange || "") || ev.test(t.contain || "");
}
function tv(e) {
  let t = wt(e);
  for (; bt(t) && !cn(t); ) {
    if (Uo(t))
      return t;
    if (Qr(t))
      return null;
    t = wt(t);
  }
  return null;
}
function Ho() {
  return mi == null && (mi = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), mi;
}
function cn(e) {
  return /^(html|body|#document)$/.test(gn(e));
}
function Qe(e) {
  return Ae(e).getComputedStyle(e);
}
function Zr(e) {
  return me(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function wt(e) {
  if (gn(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Is(e) && e.host || // Fallback.
    st(e)
  );
  return Is(t) ? t.host : t;
}
function lu(e) {
  const t = wt(e);
  return cn(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : bt(t) && Jn(t) ? t : lu(t);
}
function Pn(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const i = lu(e), o = i === ((r = e.ownerDocument) == null ? void 0 : r.body), s = Ae(i);
  if (o) {
    const a = so(s);
    return t.concat(s, s.visualViewport || [], Jn(i) ? i : [], a && n ? Pn(a) : []);
  } else
    return t.concat(i, Pn(i, [], n));
}
function so(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function nv() {
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? e.brands.map((t) => {
    let {
      brand: n,
      version: r
    } = t;
    return n + "/" + r;
  }).join(" ") : navigator.userAgent;
}
const Ut = Math.min, ge = Math.max, In = Math.round, ar = Math.floor, ot = (e) => ({
  x: e,
  y: e
}), rv = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Vs(e, t, n) {
  return ge(e, Ut(t, n));
}
function mn(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function St(e) {
  return e.split("-")[0];
}
function er(e) {
  return e.split("-")[1];
}
function uu(e) {
  return e === "x" ? "y" : "x";
}
function cu(e) {
  return e === "y" ? "height" : "width";
}
function ft(e) {
  const t = e[0];
  return t === "t" || t === "b" ? "y" : "x";
}
function fu(e) {
  return uu(ft(e));
}
function iv(e, t, n) {
  n === void 0 && (n = !1);
  const r = er(e), i = fu(e), o = cu(i);
  let s = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[o] > t.floating[o] && (s = Cr(s)), [s, Cr(s)];
}
function ov(e) {
  const t = Cr(e);
  return [ao(e), t, ao(t)];
}
function ao(e) {
  return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
const Fs = ["left", "right"], Ms = ["right", "left"], sv = ["top", "bottom"], av = ["bottom", "top"];
function lv(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? Ms : Fs : t ? Fs : Ms;
    case "left":
    case "right":
      return t ? sv : av;
    default:
      return [];
  }
}
function uv(e, t, n, r) {
  const i = er(e);
  let o = lv(St(e), n === "start", r);
  return i && (o = o.map((s) => s + "-" + i), t && (o = o.concat(o.map(ao)))), o;
}
function Cr(e) {
  const t = St(e);
  return rv[t] + e.slice(t.length);
}
function cv(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function fv(e) {
  return typeof e != "number" ? cv(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Dr(e) {
  const {
    x: t,
    y: n,
    width: r,
    height: i
  } = e;
  return {
    width: r,
    height: i,
    top: n,
    left: t,
    right: t + r,
    bottom: n + i,
    x: t,
    y: n
  };
}
function js(e, t, n) {
  let {
    reference: r,
    floating: i
  } = e;
  const o = ft(t), s = fu(t), a = cu(s), l = St(t), u = o === "y", c = r.x + r.width / 2 - i.width / 2, f = r.y + r.height / 2 - i.height / 2, p = r[a] / 2 - i[a] / 2;
  let d;
  switch (l) {
    case "top":
      d = {
        x: c,
        y: r.y - i.height
      };
      break;
    case "bottom":
      d = {
        x: c,
        y: r.y + r.height
      };
      break;
    case "right":
      d = {
        x: r.x + r.width,
        y: f
      };
      break;
    case "left":
      d = {
        x: r.x - i.width,
        y: f
      };
      break;
    default:
      d = {
        x: r.x,
        y: r.y
      };
  }
  switch (er(t)) {
    case "start":
      d[s] -= p * (n && u ? -1 : 1);
      break;
    case "end":
      d[s] += p * (n && u ? -1 : 1);
      break;
  }
  return d;
}
async function du(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: i,
    platform: o,
    rects: s,
    elements: a,
    strategy: l
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: c = "viewport",
    elementContext: f = "floating",
    altBoundary: p = !1,
    padding: d = 0
  } = mn(t, e), h = fv(d), b = a[p ? f === "floating" ? "reference" : "floating" : f], E = Dr(await o.getClippingRect({
    element: (n = await (o.isElement == null ? void 0 : o.isElement(b))) == null || n ? b : b.contextElement || await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(a.floating)),
    boundary: u,
    rootBoundary: c,
    strategy: l
  })), _ = f === "floating" ? {
    x: r,
    y: i,
    width: s.floating.width,
    height: s.floating.height
  } : s.reference, y = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(a.floating)), w = await (o.isElement == null ? void 0 : o.isElement(y)) ? await (o.getScale == null ? void 0 : o.getScale(y)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, x = Dr(o.convertOffsetParentRelativeRectToViewportRelativeRect ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: _,
    offsetParent: y,
    strategy: l
  }) : _);
  return {
    top: (E.top - x.top + h.top) / w.y,
    bottom: (x.bottom - E.bottom + h.bottom) / w.y,
    left: (E.left - x.left + h.left) / w.x,
    right: (x.right - E.right + h.right) / w.x
  };
}
const dv = 50, pv = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: i = "absolute",
    middleware: o = [],
    platform: s
  } = n, a = s.detectOverflow ? s : {
    ...s,
    detectOverflow: du
  }, l = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let u = await s.getElementRects({
    reference: e,
    floating: t,
    strategy: i
  }), {
    x: c,
    y: f
  } = js(u, r, l), p = r, d = 0;
  const h = {};
  for (let g = 0; g < o.length; g++) {
    const b = o[g];
    if (!b)
      continue;
    const {
      name: E,
      fn: _
    } = b, {
      x: y,
      y: w,
      data: x,
      reset: N
    } = await _({
      x: c,
      y: f,
      initialPlacement: r,
      placement: p,
      strategy: i,
      middlewareData: h,
      rects: u,
      platform: a,
      elements: {
        reference: e,
        floating: t
      }
    });
    c = y ?? c, f = w ?? f, h[E] = {
      ...h[E],
      ...x
    }, N && d < dv && (d++, typeof N == "object" && (N.placement && (p = N.placement), N.rects && (u = N.rects === !0 ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: i
    }) : N.rects), {
      x: c,
      y: f
    } = js(u, p, l)), g = -1);
  }
  return {
    x: c,
    y: f,
    placement: p,
    strategy: i,
    middlewareData: h
  };
}, hv = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: i,
        middlewareData: o,
        rects: s,
        initialPlacement: a,
        platform: l,
        elements: u
      } = t, {
        mainAxis: c = !0,
        crossAxis: f = !0,
        fallbackPlacements: p,
        fallbackStrategy: d = "bestFit",
        fallbackAxisSideDirection: h = "none",
        flipAlignment: g = !0,
        ...b
      } = mn(e, t);
      if ((n = o.arrow) != null && n.alignmentOffset)
        return {};
      const E = St(i), _ = ft(a), y = St(a) === a, w = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)), x = p || (y || !g ? [Cr(a)] : ov(a)), N = h !== "none";
      !p && N && x.push(...uv(a, g, h, w));
      const D = [a, ...x], L = await l.detectOverflow(t, b), $ = [];
      let T = ((r = o.flip) == null ? void 0 : r.overflows) || [];
      if (c && $.push(L[E]), f) {
        const W = iv(i, s, w);
        $.push(L[W[0]], L[W[1]]);
      }
      if (T = [...T, {
        placement: i,
        overflows: $
      }], !$.every((W) => W <= 0)) {
        var S, V;
        const W = (((S = o.flip) == null ? void 0 : S.index) || 0) + 1, te = D[W];
        if (te && (!(f === "alignment" ? _ !== ft(te) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        T.every((j) => ft(j.placement) === _ ? j.overflows[0] > 0 : !0)))
          return {
            data: {
              index: W,
              overflows: T
            },
            reset: {
              placement: te
            }
          };
        let X = (V = T.filter((U) => U.overflows[0] <= 0).sort((U, j) => U.overflows[1] - j.overflows[1])[0]) == null ? void 0 : V.placement;
        if (!X)
          switch (d) {
            case "bestFit": {
              var G;
              const U = (G = T.filter((j) => {
                if (N) {
                  const Y = ft(j.placement);
                  return Y === _ || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  Y === "y";
                }
                return !0;
              }).map((j) => [j.placement, j.overflows.filter((Y) => Y > 0).reduce((Y, ne) => Y + ne, 0)]).sort((j, Y) => j[1] - Y[1])[0]) == null ? void 0 : G[0];
              U && (X = U);
              break;
            }
            case "initialPlacement":
              X = a;
              break;
          }
        if (i !== X)
          return {
            reset: {
              placement: X
            }
          };
      }
      return {};
    }
  };
}, vv = /* @__PURE__ */ new Set(["left", "top"]);
async function gv(e, t) {
  const {
    placement: n,
    platform: r,
    elements: i
  } = e, o = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), s = St(n), a = er(n), l = ft(n) === "y", u = vv.has(s) ? -1 : 1, c = o && l ? -1 : 1, f = mn(t, e);
  let {
    mainAxis: p,
    crossAxis: d,
    alignmentAxis: h
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: f.mainAxis || 0,
    crossAxis: f.crossAxis || 0,
    alignmentAxis: f.alignmentAxis
  };
  return a && typeof h == "number" && (d = a === "end" ? h * -1 : h), l ? {
    x: d * c,
    y: p * u
  } : {
    x: p * u,
    y: d * c
  };
}
const mv = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: i,
        y: o,
        placement: s,
        middlewareData: a
      } = t, l = await gv(t, e);
      return s === ((n = a.offset) == null ? void 0 : n.placement) && (r = a.arrow) != null && r.alignmentOffset ? {} : {
        x: i + l.x,
        y: o + l.y,
        data: {
          ...l,
          placement: s
        }
      };
    }
  };
}, bv = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: i,
        platform: o
      } = t, {
        mainAxis: s = !0,
        crossAxis: a = !1,
        limiter: l = {
          fn: (E) => {
            let {
              x: _,
              y
            } = E;
            return {
              x: _,
              y
            };
          }
        },
        ...u
      } = mn(e, t), c = {
        x: n,
        y: r
      }, f = await o.detectOverflow(t, u), p = ft(St(i)), d = uu(p);
      let h = c[d], g = c[p];
      if (s) {
        const E = d === "y" ? "top" : "left", _ = d === "y" ? "bottom" : "right", y = h + f[E], w = h - f[_];
        h = Vs(y, h, w);
      }
      if (a) {
        const E = p === "y" ? "top" : "left", _ = p === "y" ? "bottom" : "right", y = g + f[E], w = g - f[_];
        g = Vs(y, g, w);
      }
      const b = l.fn({
        ...t,
        [d]: h,
        [p]: g
      });
      return {
        ...b,
        data: {
          x: b.x - n,
          y: b.y - r,
          enabled: {
            [d]: s,
            [p]: a
          }
        }
      };
    }
  };
}, _v = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: i,
        rects: o,
        platform: s,
        elements: a
      } = t, {
        apply: l = () => {
        },
        ...u
      } = mn(e, t), c = await s.detectOverflow(t, u), f = St(i), p = er(i), d = ft(i) === "y", {
        width: h,
        height: g
      } = o.floating;
      let b, E;
      f === "top" || f === "bottom" ? (b = f, E = p === (await (s.isRTL == null ? void 0 : s.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (E = f, b = p === "end" ? "top" : "bottom");
      const _ = g - c.top - c.bottom, y = h - c.left - c.right, w = Ut(g - c[b], _), x = Ut(h - c[E], y), N = !t.middlewareData.shift;
      let D = w, L = x;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (L = y), (r = t.middlewareData.shift) != null && r.enabled.y && (D = _), N && !p) {
        const T = ge(c.left, 0), S = ge(c.right, 0), V = ge(c.top, 0), G = ge(c.bottom, 0);
        d ? L = h - 2 * (T !== 0 || S !== 0 ? T + S : ge(c.left, c.right)) : D = g - 2 * (V !== 0 || G !== 0 ? V + G : ge(c.top, c.bottom));
      }
      await l({
        ...t,
        availableWidth: L,
        availableHeight: D
      });
      const $ = await s.getDimensions(a.floating);
      return h !== $.width || g !== $.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function pu(e) {
  const t = Qe(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const i = bt(e), o = i ? e.offsetWidth : n, s = i ? e.offsetHeight : r, a = In(n) !== o || In(r) !== s;
  return a && (n = o, r = s), {
    width: n,
    height: r,
    $: a
  };
}
function qo(e) {
  return me(e) ? e : e.contextElement;
}
function rn(e) {
  const t = qo(e);
  if (!bt(t))
    return ot(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: i,
    $: o
  } = pu(t);
  let s = (o ? In(n.width) : n.width) / r, a = (o ? In(n.height) : n.height) / i;
  return (!s || !Number.isFinite(s)) && (s = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: s,
    y: a
  };
}
const yv = /* @__PURE__ */ ot(0);
function hu(e) {
  const t = Ae(e);
  return !Ho() || !t.visualViewport ? yv : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Ev(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Ae(e) ? !1 : t;
}
function Ht(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const i = e.getBoundingClientRect(), o = qo(e);
  let s = ot(1);
  t && (r ? me(r) && (s = rn(r)) : s = rn(e));
  const a = Ev(o, n, r) ? hu(o) : ot(0);
  let l = (i.left + a.x) / s.x, u = (i.top + a.y) / s.y, c = i.width / s.x, f = i.height / s.y;
  if (o) {
    const p = Ae(o), d = r && me(r) ? Ae(r) : r;
    let h = p, g = so(h);
    for (; g && r && d !== h; ) {
      const b = rn(g), E = g.getBoundingClientRect(), _ = Qe(g), y = E.left + (g.clientLeft + parseFloat(_.paddingLeft)) * b.x, w = E.top + (g.clientTop + parseFloat(_.paddingTop)) * b.y;
      l *= b.x, u *= b.y, c *= b.x, f *= b.y, l += y, u += w, h = Ae(g), g = so(h);
    }
  }
  return Dr({
    width: c,
    height: f,
    x: l,
    y: u
  });
}
function Jr(e, t) {
  const n = Zr(e).scrollLeft;
  return t ? t.left + n : Ht(st(e)).left + n;
}
function vu(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - Jr(e, n), i = n.top + t.scrollTop;
  return {
    x: r,
    y: i
  };
}
function Ov(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: i
  } = e;
  const o = i === "fixed", s = st(r), a = t ? Qr(t.floating) : !1;
  if (r === s || a && o)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = ot(1);
  const c = ot(0), f = bt(r);
  if ((f || !f && !o) && ((gn(r) !== "body" || Jn(s)) && (l = Zr(r)), f)) {
    const d = Ht(r);
    u = rn(r), c.x = d.x + r.clientLeft, c.y = d.y + r.clientTop;
  }
  const p = s && !f && !o ? vu(s, l) : ot(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - l.scrollLeft * u.x + c.x + p.x,
    y: n.y * u.y - l.scrollTop * u.y + c.y + p.y
  };
}
function wv(e) {
  return Array.from(e.getClientRects());
}
function Sv(e) {
  const t = st(e), n = Zr(e), r = e.ownerDocument.body, i = ge(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), o = ge(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + Jr(e);
  const a = -n.scrollTop;
  return Qe(r).direction === "rtl" && (s += ge(t.clientWidth, r.clientWidth) - i), {
    width: i,
    height: o,
    x: s,
    y: a
  };
}
const ks = 25;
function Nv(e, t) {
  const n = Ae(e), r = st(e), i = n.visualViewport;
  let o = r.clientWidth, s = r.clientHeight, a = 0, l = 0;
  if (i) {
    o = i.width, s = i.height;
    const c = Ho();
    (!c || c && t === "fixed") && (a = i.offsetLeft, l = i.offsetTop);
  }
  const u = Jr(r);
  if (u <= 0) {
    const c = r.ownerDocument, f = c.body, p = getComputedStyle(f), d = c.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight) || 0, h = Math.abs(r.clientWidth - f.clientWidth - d);
    h <= ks && (o -= h);
  } else u <= ks && (o += u);
  return {
    width: o,
    height: s,
    x: a,
    y: l
  };
}
function Av(e, t) {
  const n = Ht(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, o = bt(e) ? rn(e) : ot(1), s = e.clientWidth * o.x, a = e.clientHeight * o.y, l = i * o.x, u = r * o.y;
  return {
    width: s,
    height: a,
    x: l,
    y: u
  };
}
function Bs(e, t, n) {
  let r;
  if (t === "viewport")
    r = Nv(e, n);
  else if (t === "document")
    r = Sv(st(e));
  else if (me(t))
    r = Av(t, n);
  else {
    const i = hu(e);
    r = {
      x: t.x - i.x,
      y: t.y - i.y,
      width: t.width,
      height: t.height
    };
  }
  return Dr(r);
}
function gu(e, t) {
  const n = wt(e);
  return n === t || !me(n) || cn(n) ? !1 : Qe(n).position === "fixed" || gu(n, t);
}
function xv(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Pn(e, [], !1).filter((a) => me(a) && gn(a) !== "body"), i = null;
  const o = Qe(e).position === "fixed";
  let s = o ? wt(e) : e;
  for (; me(s) && !cn(s); ) {
    const a = Qe(s), l = Uo(s);
    !l && a.position === "fixed" && (i = null), (o ? !l && !i : !l && a.position === "static" && !!i && (i.position === "absolute" || i.position === "fixed") || Jn(s) && !l && gu(e, s)) ? r = r.filter((c) => c !== s) : i = a, s = wt(s);
  }
  return t.set(e, r), r;
}
function Tv(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: i
  } = e;
  const s = [...n === "clippingAncestors" ? Qr(t) ? [] : xv(t, this._c) : [].concat(n), r], a = Bs(t, s[0], i);
  let l = a.top, u = a.right, c = a.bottom, f = a.left;
  for (let p = 1; p < s.length; p++) {
    const d = Bs(t, s[p], i);
    l = ge(d.top, l), u = Ut(d.right, u), c = Ut(d.bottom, c), f = ge(d.left, f);
  }
  return {
    width: u - f,
    height: c - l,
    x: f,
    y: l
  };
}
function Rv(e) {
  const {
    width: t,
    height: n
  } = pu(e);
  return {
    width: t,
    height: n
  };
}
function Cv(e, t, n) {
  const r = bt(t), i = st(t), o = n === "fixed", s = Ht(e, !0, o, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = ot(0);
  function u() {
    l.x = Jr(i);
  }
  if (r || !r && !o)
    if ((gn(t) !== "body" || Jn(i)) && (a = Zr(t)), r) {
      const d = Ht(t, !0, o, t);
      l.x = d.x + t.clientLeft, l.y = d.y + t.clientTop;
    } else i && u();
  o && !r && i && u();
  const c = i && !r && !o ? vu(i, a) : ot(0), f = s.left + a.scrollLeft - l.x - c.x, p = s.top + a.scrollTop - l.y - c.y;
  return {
    x: f,
    y: p,
    width: s.width,
    height: s.height
  };
}
function bi(e) {
  return Qe(e).position === "static";
}
function Us(e, t) {
  if (!bt(e) || Qe(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return st(e) === n && (n = n.ownerDocument.body), n;
}
function mu(e, t) {
  const n = Ae(e);
  if (Qr(e))
    return n;
  if (!bt(e)) {
    let i = wt(e);
    for (; i && !cn(i); ) {
      if (me(i) && !bi(i))
        return i;
      i = wt(i);
    }
    return n;
  }
  let r = Us(e, t);
  for (; r && Zh(r) && bi(r); )
    r = Us(r, t);
  return r && cn(r) && bi(r) && !Uo(r) ? n : r || tv(e) || n;
}
const Dv = async function(e) {
  const t = this.getOffsetParent || mu, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: Cv(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function $v(e) {
  return Qe(e).direction === "rtl";
}
const Lv = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Ov,
  getDocumentElement: st,
  getClippingRect: Tv,
  getOffsetParent: mu,
  getElementRects: Dv,
  getClientRects: wv,
  getDimensions: Rv,
  getScale: rn,
  isElement: me,
  isRTL: $v
};
function bu(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Pv(e, t) {
  let n = null, r;
  const i = st(e);
  function o() {
    var a;
    clearTimeout(r), (a = n) == null || a.disconnect(), n = null;
  }
  function s(a, l) {
    a === void 0 && (a = !1), l === void 0 && (l = 1), o();
    const u = e.getBoundingClientRect(), {
      left: c,
      top: f,
      width: p,
      height: d
    } = u;
    if (a || t(), !p || !d)
      return;
    const h = ar(f), g = ar(i.clientWidth - (c + p)), b = ar(i.clientHeight - (f + d)), E = ar(c), y = {
      rootMargin: -h + "px " + -g + "px " + -b + "px " + -E + "px",
      threshold: ge(0, Ut(1, l)) || 1
    };
    let w = !0;
    function x(N) {
      const D = N[0].intersectionRatio;
      if (D !== l) {
        if (!w)
          return s();
        D ? s(!1, D) : r = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      D === 1 && !bu(u, e.getBoundingClientRect()) && s(), w = !1;
    }
    try {
      n = new IntersectionObserver(x, {
        ...y,
        // Handle <iframe>s
        root: i.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(x, y);
    }
    n.observe(e);
  }
  return s(!0), o;
}
function Iv(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: o = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = r, u = qo(e), c = i || o ? [...u ? Pn(u) : [], ...t ? Pn(t) : []] : [];
  c.forEach((E) => {
    i && E.addEventListener("scroll", n, {
      passive: !0
    }), o && E.addEventListener("resize", n);
  });
  const f = u && a ? Pv(u, n) : null;
  let p = -1, d = null;
  s && (d = new ResizeObserver((E) => {
    let [_] = E;
    _ && _.target === u && d && t && (d.unobserve(t), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
      var y;
      (y = d) == null || y.observe(t);
    })), n();
  }), u && !l && d.observe(u), t && d.observe(t));
  let h, g = l ? Ht(e) : null;
  l && b();
  function b() {
    const E = Ht(e);
    g && !bu(g, E) && n(), g = E, h = requestAnimationFrame(b);
  }
  return n(), () => {
    var E;
    c.forEach((_) => {
      i && _.removeEventListener("scroll", n), o && _.removeEventListener("resize", n);
    }), f == null || f(), (E = d) == null || E.disconnect(), d = null, l && cancelAnimationFrame(h);
  };
}
const _i = du, Vv = mv, Fv = bv, Mv = hv, jv = _v, kv = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), i = {
    platform: Lv,
    ...n
  }, o = {
    ...i.platform,
    _c: r
  };
  return pv(e, t, {
    ...i,
    platform: o
  });
};
var Bv = typeof document < "u", Uv = function() {
}, pr = Bv ? jr : Uv;
function $r(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let n, r, i;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n !== t.length) return !1;
      for (r = n; r-- !== 0; )
        if (!$r(e[r], t[r]))
          return !1;
      return !0;
    }
    if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!{}.hasOwnProperty.call(t, i[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const o = i[r];
      if (!(o === "_owner" && e.$$typeof) && !$r(e[o], t[o]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function _u(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Hs(e, t) {
  const n = _u(e);
  return Math.round(t * n) / n;
}
function yi(e) {
  const t = C(e);
  return pr(() => {
    t.current = e;
  }), t;
}
function Hv(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: i,
    elements: {
      reference: o,
      floating: s
    } = {},
    transform: a = !0,
    whileElementsMounted: l,
    open: u
  } = e, [c, f] = B({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [p, d] = B(r);
  $r(p, r) || d(r);
  const [h, g] = B(null), [b, E] = B(null), _ = q((j) => {
    j !== N.current && (N.current = j, g(j));
  }, []), y = q((j) => {
    j !== D.current && (D.current = j, E(j));
  }, []), w = o || h, x = s || b, N = C(null), D = C(null), L = C(c), $ = l != null, T = yi(l), S = yi(i), V = yi(u), G = q(() => {
    if (!N.current || !D.current)
      return;
    const j = {
      placement: t,
      strategy: n,
      middleware: p
    };
    S.current && (j.platform = S.current), kv(N.current, D.current, j).then((Y) => {
      const ne = {
        ...Y,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: V.current !== !1
      };
      W.current && !$r(L.current, ne) && (L.current = ne, Ke(() => {
        f(ne);
      }));
    });
  }, [p, t, n, S, V]);
  pr(() => {
    u === !1 && L.current.isPositioned && (L.current.isPositioned = !1, f((j) => ({
      ...j,
      isPositioned: !1
    })));
  }, [u]);
  const W = C(!1);
  pr(() => (W.current = !0, () => {
    W.current = !1;
  }), []), pr(() => {
    if (w && (N.current = w), x && (D.current = x), w && x) {
      if (T.current)
        return T.current(w, x, G);
      G();
    }
  }, [w, x, G, T, $]);
  const te = M(() => ({
    reference: N,
    floating: D,
    setReference: _,
    setFloating: y
  }), [_, y]), X = M(() => ({
    reference: w,
    floating: x
  }), [w, x]), U = M(() => {
    const j = {
      position: n,
      left: 0,
      top: 0
    };
    if (!X.floating)
      return j;
    const Y = Hs(X.floating, c.x), ne = Hs(X.floating, c.y);
    return a ? {
      ...j,
      transform: "translate(" + Y + "px, " + ne + "px)",
      ..._u(X.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: Y,
      top: ne
    };
  }, [n, a, X.floating, c.x, c.y]);
  return M(() => ({
    ...c,
    update: G,
    refs: te,
    elements: X,
    floatingStyles: U
  }), [c, G, te, X, U]);
}
const yu = (e, t) => ({
  ...Vv(e),
  options: [e, t]
}), qv = (e, t) => ({
  ...Fv(e),
  options: [e, t]
}), Gv = (e, t) => ({
  ...Mv(e),
  options: [e, t]
}), Wv = (e, t) => ({
  ...jv(e),
  options: [e, t]
});
var ei = {};
const Eu = {
  ...ma
}, Kv = Eu.useInsertionEffect, zv = Kv || ((e) => e());
function Ou(e) {
  const t = C(() => {
    if (ei.NODE_ENV !== "production")
      throw new Error("Cannot call an event handler while rendering.");
  });
  return zv(() => {
    t.current = e;
  }), q(function() {
    for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++)
      r[i] = arguments[i];
    return t.current == null ? void 0 : t.current(...r);
  }, []);
}
var lo = typeof document < "u" ? jr : K;
let qs = !1, Yv = 0;
const Gs = () => (
  // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + Yv++
);
function Xv() {
  const [e, t] = B(() => qs ? Gs() : void 0);
  return lo(() => {
    e == null && t(Gs());
  }, []), K(() => {
    qs = !0;
  }, []), e;
}
const Qv = Eu.useId, Zv = Qv || Xv;
let Vn;
ei.NODE_ENV !== "production" && (Vn = /* @__PURE__ */ new Set());
function Jv() {
  for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++)
    n[r] = arguments[r];
  const i = "Floating UI: " + n.join(" ");
  if (!((e = Vn) != null && e.has(i))) {
    var o;
    (o = Vn) == null || o.add(i), console.warn(i);
  }
}
function eg() {
  for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++)
    n[r] = arguments[r];
  const i = "Floating UI: " + n.join(" ");
  if (!((e = Vn) != null && e.has(i))) {
    var o;
    (o = Vn) == null || o.add(i), console.error(i);
  }
}
function tg() {
  const e = /* @__PURE__ */ new Map();
  return {
    emit(t, n) {
      var r;
      (r = e.get(t)) == null || r.forEach((i) => i(n));
    },
    on(t, n) {
      e.set(t, [...e.get(t) || [], n]);
    },
    off(t, n) {
      var r;
      e.set(t, ((r = e.get(t)) == null ? void 0 : r.filter((i) => i !== n)) || []);
    }
  };
}
const ng = /* @__PURE__ */ se(null), rg = /* @__PURE__ */ se(null), ig = () => {
  var e;
  return ((e = Q(ng)) == null ? void 0 : e.id) || null;
}, og = () => Q(rg), sg = "data-floating-ui-focusable";
function ag(e) {
  const {
    open: t = !1,
    onOpenChange: n,
    elements: r
  } = e, i = Zv(), o = C({}), [s] = B(() => tg()), a = ig() != null;
  if (ei.NODE_ENV !== "production") {
    const d = r.reference;
    d && !me(d) && eg("Cannot pass a virtual element to the `elements.reference` option,", "as it must be a real DOM element. Use `refs.setPositionReference()`", "instead.");
  }
  const [l, u] = B(r.reference), c = Ou((d, h, g) => {
    o.current.openEvent = d ? h : void 0, s.emit("openchange", {
      open: d,
      event: h,
      reason: g,
      nested: a
    }), n == null || n(d, h, g);
  }), f = M(() => ({
    setPositionReference: u
  }), []), p = M(() => ({
    reference: l || r.reference || null,
    floating: r.floating || null,
    domReference: r.reference
  }), [l, r.reference, r.floating]);
  return M(() => ({
    dataRef: o,
    open: t,
    onOpenChange: c,
    elements: p,
    events: s,
    floatingId: i,
    refs: f
  }), [t, c, p, s, i, f]);
}
function lg(e) {
  e === void 0 && (e = {});
  const {
    nodeId: t
  } = e, n = ag({
    ...e,
    elements: {
      reference: null,
      floating: null,
      ...e.elements
    }
  }), r = e.rootContext || n, i = r.elements, [o, s] = B(null), [a, l] = B(null), c = (i == null ? void 0 : i.domReference) || o, f = C(null), p = og();
  lo(() => {
    c && (f.current = c);
  }, [c]);
  const d = Hv({
    ...e,
    elements: {
      ...i,
      ...a && {
        reference: a
      }
    }
  }), h = q((y) => {
    const w = me(y) ? {
      getBoundingClientRect: () => y.getBoundingClientRect(),
      contextElement: y
    } : y;
    l(w), d.refs.setReference(w);
  }, [d.refs]), g = q((y) => {
    (me(y) || y === null) && (f.current = y, s(y)), (me(d.refs.reference.current) || d.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    y !== null && !me(y)) && d.refs.setReference(y);
  }, [d.refs]), b = M(() => ({
    ...d.refs,
    setReference: g,
    setPositionReference: h,
    domReference: f
  }), [d.refs, g, h]), E = M(() => ({
    ...d.elements,
    domReference: c
  }), [d.elements, c]), _ = M(() => ({
    ...d,
    ...r,
    refs: b,
    elements: E,
    nodeId: t
  }), [d, b, E, t, r]);
  return lo(() => {
    r.dataRef.current.floatingContext = _;
    const y = p == null ? void 0 : p.nodesRef.current.find((w) => w.id === t);
    y && (y.context = _);
  }), M(() => ({
    ...d,
    context: _,
    refs: b,
    elements: E
  }), [d, b, E, _]);
}
const Ws = "active", Ks = "selected";
function Ei(e, t, n) {
  const r = /* @__PURE__ */ new Map(), i = n === "item";
  let o = e;
  if (i && e) {
    const {
      [Ws]: s,
      [Ks]: a,
      ...l
    } = e;
    o = l;
  }
  return {
    ...n === "floating" && {
      tabIndex: -1,
      [sg]: ""
    },
    ...o,
    ...t.map((s) => {
      const a = s ? s[n] : null;
      return typeof a == "function" ? e ? a(e) : null : a;
    }).concat(e).reduce((s, a) => (a && Object.entries(a).forEach((l) => {
      let [u, c] = l;
      if (!(i && [Ws, Ks].includes(u)))
        if (u.indexOf("on") === 0) {
          if (r.has(u) || r.set(u, []), typeof c == "function") {
            var f;
            (f = r.get(u)) == null || f.push(c), s[u] = function() {
              for (var p, d = arguments.length, h = new Array(d), g = 0; g < d; g++)
                h[g] = arguments[g];
              return (p = r.get(u)) == null ? void 0 : p.map((b) => b(...h)).find((b) => b !== void 0);
            };
          }
        } else
          s[u] = c;
    }), s), {})
  };
}
function ug(e) {
  e === void 0 && (e = []);
  const t = e.map((a) => a == null ? void 0 : a.reference), n = e.map((a) => a == null ? void 0 : a.floating), r = e.map((a) => a == null ? void 0 : a.item), i = q(
    (a) => Ei(a, e, "reference"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  ), o = q(
    (a) => Ei(a, e, "floating"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    n
  ), s = q(
    (a) => Ei(a, e, "item"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    r
  );
  return M(() => ({
    getReferenceProps: i,
    getFloatingProps: o,
    getItemProps: s
  }), [i, o, s]);
}
function zs(e, t) {
  return {
    ...e,
    rects: {
      ...e.rects,
      floating: {
        ...e.rects.floating,
        height: t
      }
    }
  };
}
const cg = (e) => ({
  name: "inner",
  options: e,
  async fn(t) {
    const {
      listRef: n,
      overflowRef: r,
      onFallbackChange: i,
      offset: o = 0,
      index: s = 0,
      minItemsVisible: a = 4,
      referenceOverflowThreshold: l = 0,
      scrollRef: u,
      ...c
    } = mn(e, t), {
      rects: f,
      elements: {
        floating: p
      }
    } = t, d = n.current[s], h = (u == null ? void 0 : u.current) || p, g = p.clientTop || h.clientTop, b = p.clientTop !== 0, E = h.clientTop !== 0, _ = p === h;
    if (ei.NODE_ENV !== "production" && (t.placement.startsWith("bottom") || Jv('`placement` side must be "bottom" when using the `inner`', "middleware.")), !d)
      return {};
    const y = {
      ...t,
      ...await yu(-d.offsetTop - p.clientTop - f.reference.height / 2 - d.offsetHeight / 2 - o).fn(t)
    }, w = await _i(zs(y, h.scrollHeight + g + p.clientTop), c), x = await _i(y, {
      ...c,
      elementContext: "reference"
    }), N = ge(0, w.top), D = y.y + N, T = (h.scrollHeight > h.clientHeight ? (S) => S : In)(ge(0, h.scrollHeight + (b && _ || E ? g * 2 : 0) - N - ge(0, w.bottom)));
    if (h.style.maxHeight = T + "px", h.scrollTop = N, i) {
      const S = h.offsetHeight < d.offsetHeight * Ut(a, n.current.length) - 1 || x.top >= -l || x.bottom >= -l;
      Ke(() => i(S));
    }
    return r && (r.current = await _i(zs({
      ...y,
      y: D
    }, h.offsetHeight + g + p.clientTop), c)), {
      y: D
    };
  }
});
function fg(e, t) {
  const {
    open: n,
    elements: r
  } = e, {
    enabled: i = !0,
    overflowRef: o,
    scrollRef: s,
    onChange: a
  } = t, l = Ou(a), u = C(!1), c = C(null), f = C(null);
  K(() => {
    if (!i) return;
    function d(g) {
      if (g.ctrlKey || !h || o.current == null)
        return;
      const b = g.deltaY, E = o.current.top >= -0.5, _ = o.current.bottom >= -0.5, y = h.scrollHeight - h.clientHeight, w = b < 0 ? -1 : 1, x = b < 0 ? "max" : "min";
      h.scrollHeight <= h.clientHeight || (!E && b > 0 || !_ && b < 0 ? (g.preventDefault(), Ke(() => {
        l((N) => N + Math[x](b, y * w));
      })) : /firefox/i.test(nv()) && (h.scrollTop += b));
    }
    const h = (s == null ? void 0 : s.current) || r.floating;
    if (n && h)
      return h.addEventListener("wheel", d), requestAnimationFrame(() => {
        c.current = h.scrollTop, o.current != null && (f.current = {
          ...o.current
        });
      }), () => {
        c.current = null, f.current = null, h.removeEventListener("wheel", d);
      };
  }, [i, n, r.floating, o, s, l]);
  const p = M(() => ({
    onKeyDown() {
      u.current = !0;
    },
    onWheel() {
      u.current = !1;
    },
    onPointerMove() {
      u.current = !1;
    },
    onScroll() {
      const d = (s == null ? void 0 : s.current) || r.floating;
      if (!(!o.current || !d || !u.current)) {
        if (c.current !== null) {
          const h = d.scrollTop - c.current;
          (o.current.bottom < -0.5 && h < -1 || o.current.top < -0.5 && h > 1) && Ke(() => l((g) => g + h));
        }
        requestAnimationFrame(() => {
          c.current = d.scrollTop;
        });
      }
    }
  }), [r.floating, l, o, s]);
  return M(() => i ? {
    floating: p
  } : {}, [i, p]);
}
let bn = se({ styles: void 0, setReference: () => {
}, setFloating: () => {
}, getReferenceProps: () => ({}), getFloatingProps: () => ({}), slot: {} });
bn.displayName = "FloatingContext";
let Go = se(null);
Go.displayName = "PlacementContext";
function dg(e) {
  return M(() => e ? typeof e == "string" ? { to: e } : e : null, [e]);
}
function pg() {
  return Q(bn).setReference;
}
function hg() {
  return Q(bn).getReferenceProps;
}
function vg() {
  let { getFloatingProps: e, slot: t } = Q(bn);
  return q((...n) => Object.assign({}, e(...n), { "data-anchor": t.anchor }), [e, t]);
}
function gg(e = null) {
  e === !1 && (e = null), typeof e == "string" && (e = { to: e });
  let t = Q(Go), n = M(() => e, [JSON.stringify(e, (i, o) => {
    var s;
    return (s = o == null ? void 0 : o.outerHTML) != null ? s : o;
  })]);
  ee(() => {
    t == null || t(n ?? null);
  }, [t, n]);
  let r = Q(bn);
  return M(() => [r.setFloating, e ? r.styles : {}], [r.setFloating, e, r.styles]);
}
let Ys = 4;
function mg({ children: e, enabled: t = !0 }) {
  let [n, r] = B(null), [i, o] = B(0), s = C(null), [a, l] = B(null);
  bg(a);
  let u = t && n !== null && a !== null, { to: c = "bottom", gap: f = 0, offset: p = 0, padding: d = 0, inner: h } = _g(n, a), [g, b = "center"] = c.split(" ");
  ee(() => {
    u && o(0);
  }, [u]);
  let { refs: E, floatingStyles: _, context: y } = lg({ open: u, placement: g === "selection" ? b === "center" ? "bottom" : `bottom-${b}` : b === "center" ? `${g}` : `${g}-${b}`, strategy: "absolute", transform: !1, middleware: [yu({ mainAxis: g === "selection" ? 0 : f, crossAxis: p }), qv({ padding: d }), g !== "selection" && Gv({ padding: d }), g === "selection" && h ? cg({ ...h, padding: d, overflowRef: s, offset: i, minItemsVisible: Ys, referenceOverflowThreshold: d, onFallbackChange(S) {
    var V, G;
    if (!S) return;
    let W = y.elements.floating;
    if (!W) return;
    let te = parseFloat(getComputedStyle(W).scrollPaddingBottom) || 0, X = Math.min(Ys, W.childElementCount), U = 0, j = 0;
    for (let Y of (G = (V = y.elements.floating) == null ? void 0 : V.childNodes) != null ? G : []) if (Y instanceof HTMLElement) {
      let ne = Y.offsetTop, He = ne + Y.clientHeight + te, at = W.scrollTop, I = at + W.clientHeight;
      if (ne >= at && He <= I) X--;
      else {
        j = Math.max(0, Math.min(He, I) - Math.max(ne, at)), U = Y.clientHeight;
        break;
      }
    }
    X >= 1 && o((Y) => {
      let ne = U * X - j + te;
      return Y >= ne ? Y : ne;
    });
  } }) : null, Wv({ padding: d, apply({ availableWidth: S, availableHeight: V, elements: G }) {
    Object.assign(G.floating.style, { overflow: "auto", maxWidth: `${S}px`, maxHeight: `min(var(--anchor-max-height, 100vh), ${V}px)` });
  } })].filter(Boolean), whileElementsMounted: Iv }), [w = g, x = b] = y.placement.split("-");
  g === "selection" && (w = "selection");
  let N = M(() => ({ anchor: [w, x].filter(Boolean).join(" ") }), [w, x]), D = fg(y, { overflowRef: s, onChange: o }), { getReferenceProps: L, getFloatingProps: $ } = ug([D]), T = k((S) => {
    l(S), E.setFloating(S);
  });
  return Ie(Go.Provider, { value: r }, Ie(bn.Provider, { value: { setFloating: T, setReference: E.setReference, styles: _, getReferenceProps: L, getFloatingProps: $, slot: N } }, e));
}
function bg(e) {
  ee(() => {
    if (!e) return;
    let t = new MutationObserver(() => {
      let n = window.getComputedStyle(e).maxHeight, r = parseFloat(n);
      if (isNaN(r)) return;
      let i = parseInt(n);
      isNaN(i) || r !== i && (e.style.maxHeight = `${Math.ceil(r)}px`);
    });
    return t.observe(e, { attributes: !0, attributeFilter: ["style"] }), () => {
      t.disconnect();
    };
  }, [e]);
}
function _g(e, t) {
  var n, r, i;
  let o = Oi((n = e == null ? void 0 : e.gap) != null ? n : "var(--anchor-gap, 0)", t), s = Oi((r = e == null ? void 0 : e.offset) != null ? r : "var(--anchor-offset, 0)", t), a = Oi((i = e == null ? void 0 : e.padding) != null ? i : "var(--anchor-padding, 0)", t);
  return { ...e, gap: o, offset: s, padding: a };
}
function Oi(e, t, n = void 0) {
  let r = Kt(), i = k((l, u) => {
    if (l == null) return [n, null];
    if (typeof l == "number") return [l, null];
    if (typeof l == "string") {
      if (!u) return [n, null];
      let c = Xs(l, u);
      return [c, (f) => {
        let p = wu(l);
        {
          let d = p.map((h) => window.getComputedStyle(u).getPropertyValue(h));
          r.requestAnimationFrame(function h() {
            r.nextFrame(h);
            let g = !1;
            for (let [E, _] of p.entries()) {
              let y = window.getComputedStyle(u).getPropertyValue(_);
              if (d[E] !== y) {
                d[E] = y, g = !0;
                break;
              }
            }
            if (!g) return;
            let b = Xs(l, u);
            c !== b && (f(b), c = b);
          });
        }
        return r.dispose;
      }];
    }
    return [n, null];
  }), o = M(() => i(e, t)[0], [e, t]), [s = o, a] = B();
  return ee(() => {
    let [l, u] = i(e, t);
    if (a(l), !!u) return u(a);
  }, [e, t]), s;
}
function wu(e) {
  let t = /var\((.*)\)/.exec(e);
  if (t) {
    let n = t[1].indexOf(",");
    if (n === -1) return [t[1]];
    let r = t[1].slice(0, n).trim(), i = t[1].slice(n + 1).trim();
    return i ? [r, ...wu(i)] : [r];
  }
  return [];
}
function Xs(e, t) {
  let n = document.createElement("div");
  t.appendChild(n), n.style.setProperty("margin-top", "0px", "important"), n.style.setProperty("margin-top", e, "important");
  let r = parseFloat(window.getComputedStyle(n).marginTop) || 0;
  return t.removeChild(n), r;
}
function yg(e, t) {
  let [n, r] = B(t);
  return !e && n !== t && r(t), e ? n : t;
}
let Wo = se(null);
Wo.displayName = "OpenClosedContext";
var We = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(We || {});
function Ko() {
  return Q(Wo);
}
function Su({ value: e, children: t }) {
  return H.createElement(Wo.Provider, { value: e }, t);
}
function Eg(e) {
  throw new Error("Unexpected object: " + e);
}
var ae = ((e) => (e[e.First = 0] = "First", e[e.Previous = 1] = "Previous", e[e.Next = 2] = "Next", e[e.Last = 3] = "Last", e[e.Specific = 4] = "Specific", e[e.Nothing = 5] = "Nothing", e))(ae || {});
function wi(e, t) {
  let n = t.resolveItems();
  if (n.length <= 0) return null;
  let r = t.resolveActiveIndex(), i = r ?? -1;
  switch (e.focus) {
    case 0: {
      for (let o = 0; o < n.length; ++o) if (!t.resolveDisabled(n[o], o, n)) return o;
      return r;
    }
    case 1: {
      i === -1 && (i = n.length);
      for (let o = i - 1; o >= 0; --o) if (!t.resolveDisabled(n[o], o, n)) return o;
      return r;
    }
    case 2: {
      for (let o = i + 1; o < n.length; ++o) if (!t.resolveDisabled(n[o], o, n)) return o;
      return r;
    }
    case 3: {
      for (let o = n.length - 1; o >= 0; --o) if (!t.resolveDisabled(n[o], o, n)) return o;
      return r;
    }
    case 4: {
      for (let o = 0; o < n.length; ++o) if (t.resolveId(n[o], o, n) === e.id) return o;
      return r;
    }
    case 5:
      return null;
    default:
      Eg(e);
  }
}
function Og(e) {
  let t = k(e), n = C(!1);
  K(() => (n.current = !1, () => {
    n.current = !0, Bl(() => {
      n.current && t();
    });
  }), [t]);
}
function wg() {
  let e = typeof document > "u";
  return ((t) => t.useSyncExternalStore)(ma)(() => () => {
  }, () => !1, () => !e);
}
function zo() {
  let e = wg(), [t, n] = B(Vt.isHandoffComplete);
  return t && Vt.isHandoffComplete === !1 && n(!1), K(() => {
    t !== !0 && n(!0);
  }, [t]), K(() => Vt.handoff(), []), e ? !1 : t;
}
let Sg = se(!1);
function Ng() {
  return Q(Sg);
}
function Ag(e) {
  let t = Ng(), n = Q(Au), r = Bo(e), [i, o] = B(() => {
    var s;
    if (!t && n !== null) return (s = n.current) != null ? s : null;
    if (Vt.isServer) return null;
    let a = r == null ? void 0 : r.getElementById("headlessui-portal-root");
    if (a) return a;
    if (r === null) return null;
    let l = r.createElement("div");
    return l.setAttribute("id", "headlessui-portal-root"), r.body.appendChild(l);
  });
  return K(() => {
    i !== null && (r != null && r.body.contains(i) || r == null || r.body.appendChild(i));
  }, [i, r]), K(() => {
    t || n !== null && o(n.current);
  }, [n, o, t]), i;
}
let Nu = ce, xg = ye(function(e, t) {
  let n = e, r = C(null), i = Ue(ah((f) => {
    r.current = f;
  }), t), o = Bo(r), s = Ag(r), [a] = B(() => {
    var f;
    return Vt.isServer ? null : (f = o == null ? void 0 : o.createElement("div")) != null ? f : null;
  }), l = Q(Dg), u = zo();
  ee(() => {
    !s || !a || s.contains(a) || (a.setAttribute("data-headlessui-portal", ""), s.appendChild(a));
  }, [s, a]), ee(() => {
    if (a && l) return l.register(a);
  }, [l, a]), Og(() => {
    var f;
    !s || !a || (a instanceof Node && s.contains(a) && s.removeChild(a), s.childNodes.length <= 0 && ((f = s.parentElement) == null || f.removeChild(s)));
  });
  let c = Te();
  return u ? !s || !a ? null : va(c({ ourProps: { ref: i }, theirProps: n, slot: {}, defaultTag: Nu, name: "Portal" }), a) : null;
});
function Tg(e, t) {
  let n = Ue(t), { enabled: r = !0, ...i } = e, o = Te();
  return r ? H.createElement(xg, { ...i, ref: n }) : o({ ourProps: { ref: n }, theirProps: i, slot: {}, defaultTag: Nu, name: "Portal" });
}
let Rg = ce, Au = se(null);
function Cg(e, t) {
  let { target: n, ...r } = e, i = { ref: Ue(t) }, o = Te();
  return H.createElement(Au.Provider, { value: n }, o({ ourProps: i, theirProps: r, defaultTag: Rg, name: "Popover.Group" }));
}
let Dg = se(null), $g = ye(Tg), Lg = ye(Cg), Pg = Object.assign($g, { Group: Lg });
function Ig() {
  let e = C(!1);
  return ee(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
}
function xu(e) {
  var t;
  return !!(e.enter || e.enterFrom || e.enterTo || e.leave || e.leaveFrom || e.leaveTo) || ((t = e.as) != null ? t : Ru) !== ce || H.Children.count(e.children) === 1;
}
let ti = se(null);
ti.displayName = "TransitionContext";
var Vg = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(Vg || {});
function Fg() {
  let e = Q(ti);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
function Mg() {
  let e = Q(ni);
  if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
  return e;
}
let ni = se(null);
ni.displayName = "NestingContext";
function ri(e) {
  return "children" in e ? ri(e.children) : e.current.filter(({ el: t }) => t.current !== null).filter(({ state: t }) => t === "visible").length > 0;
}
function Tu(e, t) {
  let n = zt(e), r = C([]), i = Ig(), o = Kt(), s = k((d, h = Et.Hidden) => {
    let g = r.current.findIndex(({ el: b }) => b === d);
    g !== -1 && (Xe(h, { [Et.Unmount]() {
      r.current.splice(g, 1);
    }, [Et.Hidden]() {
      r.current[g].state = "hidden";
    } }), o.microTask(() => {
      var b;
      !ri(r) && i.current && ((b = n.current) == null || b.call(n));
    }));
  }), a = k((d) => {
    let h = r.current.find(({ el: g }) => g === d);
    return h ? h.state !== "visible" && (h.state = "visible") : r.current.push({ el: d, state: "visible" }), () => s(d, Et.Unmount);
  }), l = C([]), u = C(Promise.resolve()), c = C({ enter: [], leave: [] }), f = k((d, h, g) => {
    l.current.splice(0), t && (t.chains.current[h] = t.chains.current[h].filter(([b]) => b !== d)), t == null || t.chains.current[h].push([d, new Promise((b) => {
      l.current.push(b);
    })]), t == null || t.chains.current[h].push([d, new Promise((b) => {
      Promise.all(c.current[h].map(([E, _]) => _)).then(() => b());
    })]), h === "enter" ? u.current = u.current.then(() => t == null ? void 0 : t.wait.current).then(() => g(h)) : g(h);
  }), p = k((d, h, g) => {
    Promise.all(c.current[h].splice(0).map(([b, E]) => E)).then(() => {
      var b;
      (b = l.current.shift()) == null || b();
    }).then(() => g(h));
  });
  return M(() => ({ children: r, register: a, unregister: s, onStart: f, onStop: p, wait: u, chains: c }), [a, s, r, f, p, c, u]);
}
let Ru = ce, Cu = Rr.RenderStrategy;
function jg(e, t) {
  var n, r;
  let { transition: i = !0, beforeEnter: o, afterEnter: s, beforeLeave: a, afterLeave: l, enter: u, enterFrom: c, enterTo: f, entered: p, leave: d, leaveFrom: h, leaveTo: g, ...b } = e, [E, _] = B(null), y = C(null), w = xu(e), x = Ue(...w ? [y, t, _] : t === null ? [] : [t]), N = (n = b.unmount) == null || n ? Et.Unmount : Et.Hidden, { show: D, appear: L, initial: $ } = Fg(), [T, S] = B(D ? "visible" : "hidden"), V = Mg(), { register: G, unregister: W } = V;
  ee(() => G(y), [G, y]), ee(() => {
    if (N === Et.Hidden && y.current) {
      if (D && T !== "visible") {
        S("visible");
        return;
      }
      return Xe(T, { hidden: () => W(y), visible: () => G(y) });
    }
  }, [T, y, G, W, D, N]);
  let te = zo();
  ee(() => {
    if (w && te && T === "visible" && y.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
  }, [y, T, te, w]);
  let X = $ && !L, U = L && D && $, j = C(!1), Y = Tu(() => {
    j.current || (S("hidden"), W(y));
  }, V), ne = k((En) => {
    j.current = !0;
    let Yt = En ? "enter" : "leave";
    Y.onStart(y, Yt, (Tt) => {
      Tt === "enter" ? o == null || o() : Tt === "leave" && (a == null || a());
    });
  }), He = k((En) => {
    let Yt = En ? "enter" : "leave";
    j.current = !1, Y.onStop(y, Yt, (Tt) => {
      Tt === "enter" ? s == null || s() : Tt === "leave" && (l == null || l());
    }), Yt === "leave" && !ri(Y) && (S("hidden"), W(y));
  });
  K(() => {
    w && i || (ne(D), He(D));
  }, [D, w, i]);
  let at = !(!i || !w || !te || X), [, I] = su(at, E, D, { start: ne, end: He }), ve = _t({ ref: x, className: ((r = no(b.className, U && u, U && c, I.enter && u, I.enter && I.closed && c, I.enter && !I.closed && f, I.leave && d, I.leave && !I.closed && h, I.leave && I.closed && g, !I.transition && D && p)) == null ? void 0 : r.trim()) || void 0, ...ou(I) }), Re = 0;
  T === "visible" && (Re |= We.Open), T === "hidden" && (Re |= We.Closed), I.enter && (Re |= We.Opening), I.leave && (Re |= We.Closing);
  let yn = Te();
  return H.createElement(ni.Provider, { value: Y }, H.createElement(Su, { value: Re }, yn({ ourProps: ve, theirProps: b, defaultTag: Ru, features: Cu, visible: T === "visible", name: "Transition.Child" })));
}
function kg(e, t) {
  let { show: n, appear: r = !1, unmount: i = !0, ...o } = e, s = C(null), a = xu(e), l = Ue(...a ? [s, t] : t === null ? [] : [t]);
  zo();
  let u = Ko();
  if (n === void 0 && u !== null && (n = (u & We.Open) === We.Open), n === void 0) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
  let [c, f] = B(n ? "visible" : "hidden"), p = Tu(() => {
    n || f("hidden");
  }), [d, h] = B(!0), g = C([n]);
  ee(() => {
    d !== !1 && g.current[g.current.length - 1] !== n && (g.current.push(n), h(!1));
  }, [g, n]);
  let b = M(() => ({ show: n, appear: r, initial: d }), [n, r, d]);
  ee(() => {
    n ? f("visible") : !ri(p) && s.current !== null && f("hidden");
  }, [n, p]);
  let E = { unmount: i }, _ = k(() => {
    var x;
    d && h(!1), (x = e.beforeEnter) == null || x.call(e);
  }), y = k(() => {
    var x;
    d && h(!1), (x = e.beforeLeave) == null || x.call(e);
  }), w = Te();
  return H.createElement(ni.Provider, { value: p }, H.createElement(ti.Provider, { value: b }, w({ ourProps: { ...E, as: ce, children: H.createElement(Du, { ref: l, ...E, ...o, beforeEnter: _, beforeLeave: y }) }, theirProps: {}, defaultTag: ce, features: Cu, visible: c === "visible", name: "Transition" })));
}
function Bg(e, t) {
  let n = Q(ti) !== null, r = Ko() !== null;
  return H.createElement(H.Fragment, null, !n && r ? H.createElement(uo, { ref: t, ...e }) : H.createElement(Du, { ref: t, ...e }));
}
let uo = ye(kg), Du = ye(jg), $u = ye(Bg), Yo = Object.assign(uo, { Child: $u, Root: uo });
function Ug(e, t) {
  let n = C({ left: 0, top: 0 });
  if (ee(() => {
    if (!t) return;
    let i = t.getBoundingClientRect();
    i && (n.current = i);
  }, [e, t]), t == null || !e || t === document.activeElement) return !1;
  let r = t.getBoundingClientRect();
  return r.top !== n.current.top || r.left !== n.current.left;
}
let Qs = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
function Zs(e) {
  var t, n;
  let r = (t = e.innerText) != null ? t : "", i = e.cloneNode(!0);
  if (!(i instanceof HTMLElement)) return r;
  let o = !1;
  for (let a of i.querySelectorAll('[hidden],[aria-hidden],[role="img"]')) a.remove(), o = !0;
  let s = o ? (n = i.innerText) != null ? n : "" : r;
  return Qs.test(s) && (s = s.replace(Qs, "")), s;
}
function Hg(e) {
  let t = e.getAttribute("aria-label");
  if (typeof t == "string") return t.trim();
  let n = e.getAttribute("aria-labelledby");
  if (n) {
    let r = n.split(" ").map((i) => {
      let o = document.getElementById(i);
      if (o) {
        let s = o.getAttribute("aria-label");
        return typeof s == "string" ? s.trim() : Zs(o).trim();
      }
      return null;
    }).filter(Boolean);
    if (r.length > 0) return r.join(", ");
  }
  return Zs(e).trim();
}
function qg(e) {
  let t = C(""), n = C("");
  return k(() => {
    let r = e.current;
    if (!r) return "";
    let i = r.innerText;
    if (t.current === i) return n.current;
    let o = Hg(r).trim().toLowerCase();
    return t.current = i, n.current = o, o;
  });
}
var Gg = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(Gg || {}), Wg = ((e) => (e[e.Single = 0] = "Single", e[e.Multi = 1] = "Multi", e))(Wg || {}), Kg = ((e) => (e[e.Pointer = 0] = "Pointer", e[e.Other = 1] = "Other", e))(Kg || {}), zg = ((e) => (e[e.OpenListbox = 0] = "OpenListbox", e[e.CloseListbox = 1] = "CloseListbox", e[e.GoToOption = 2] = "GoToOption", e[e.Search = 3] = "Search", e[e.ClearSearch = 4] = "ClearSearch", e[e.RegisterOption = 5] = "RegisterOption", e[e.UnregisterOption = 6] = "UnregisterOption", e[e.SetButtonElement = 7] = "SetButtonElement", e[e.SetOptionsElement = 8] = "SetOptionsElement", e))(zg || {});
function Si(e, t = (n) => n) {
  let n = e.activeOptionIndex !== null ? e.options[e.activeOptionIndex] : null, r = ru(t(e.options.slice()), (o) => o.dataRef.current.domRef.current), i = n ? r.indexOf(n) : null;
  return i === -1 && (i = null), { options: r, activeOptionIndex: i };
}
let Yg = { 1(e) {
  return e.dataRef.current.disabled || e.listboxState === 1 ? e : { ...e, activeOptionIndex: null, listboxState: 1, __demoMode: !1 };
}, 0(e) {
  if (e.dataRef.current.disabled || e.listboxState === 0) return e;
  let t = e.activeOptionIndex, { isSelected: n } = e.dataRef.current, r = e.options.findIndex((i) => n(i.dataRef.current.value));
  return r !== -1 && (t = r), { ...e, listboxState: 0, activeOptionIndex: t, __demoMode: !1 };
}, 2(e, t) {
  var n, r, i, o, s;
  if (e.dataRef.current.disabled || e.listboxState === 1) return e;
  let a = { ...e, searchQuery: "", activationTrigger: (n = t.trigger) != null ? n : 1, __demoMode: !1 };
  if (t.focus === ae.Nothing) return { ...a, activeOptionIndex: null };
  if (t.focus === ae.Specific) return { ...a, activeOptionIndex: e.options.findIndex((c) => c.id === t.id) };
  if (t.focus === ae.Previous) {
    let c = e.activeOptionIndex;
    if (c !== null) {
      let f = e.options[c].dataRef.current.domRef, p = wi(t, { resolveItems: () => e.options, resolveActiveIndex: () => e.activeOptionIndex, resolveId: (d) => d.id, resolveDisabled: (d) => d.dataRef.current.disabled });
      if (p !== null) {
        let d = e.options[p].dataRef.current.domRef;
        if (((r = f.current) == null ? void 0 : r.previousElementSibling) === d.current || ((i = d.current) == null ? void 0 : i.previousElementSibling) === null) return { ...a, activeOptionIndex: p };
      }
    }
  } else if (t.focus === ae.Next) {
    let c = e.activeOptionIndex;
    if (c !== null) {
      let f = e.options[c].dataRef.current.domRef, p = wi(t, { resolveItems: () => e.options, resolveActiveIndex: () => e.activeOptionIndex, resolveId: (d) => d.id, resolveDisabled: (d) => d.dataRef.current.disabled });
      if (p !== null) {
        let d = e.options[p].dataRef.current.domRef;
        if (((o = f.current) == null ? void 0 : o.nextElementSibling) === d.current || ((s = d.current) == null ? void 0 : s.nextElementSibling) === null) return { ...a, activeOptionIndex: p };
      }
    }
  }
  let l = Si(e), u = wi(t, { resolveItems: () => l.options, resolveActiveIndex: () => l.activeOptionIndex, resolveId: (c) => c.id, resolveDisabled: (c) => c.dataRef.current.disabled });
  return { ...a, ...l, activeOptionIndex: u };
}, 3: (e, t) => {
  if (e.dataRef.current.disabled || e.listboxState === 1) return e;
  let n = e.searchQuery !== "" ? 0 : 1, r = e.searchQuery + t.value.toLowerCase(), i = (e.activeOptionIndex !== null ? e.options.slice(e.activeOptionIndex + n).concat(e.options.slice(0, e.activeOptionIndex + n)) : e.options).find((s) => {
    var a;
    return !s.dataRef.current.disabled && ((a = s.dataRef.current.textValue) == null ? void 0 : a.startsWith(r));
  }), o = i ? e.options.indexOf(i) : -1;
  return o === -1 || o === e.activeOptionIndex ? { ...e, searchQuery: r } : { ...e, searchQuery: r, activeOptionIndex: o, activationTrigger: 1 };
}, 4(e) {
  return e.dataRef.current.disabled || e.listboxState === 1 || e.searchQuery === "" ? e : { ...e, searchQuery: "" };
}, 5: (e, t) => {
  let n = { id: t.id, dataRef: t.dataRef }, r = Si(e, (i) => [...i, n]);
  return e.activeOptionIndex === null && e.dataRef.current.isSelected(t.dataRef.current.value) && (r.activeOptionIndex = r.options.indexOf(n)), { ...e, ...r };
}, 6: (e, t) => {
  let n = Si(e, (r) => {
    let i = r.findIndex((o) => o.id === t.id);
    return i !== -1 && r.splice(i, 1), r;
  });
  return { ...e, ...n, activationTrigger: 1 };
}, 7: (e, t) => e.buttonElement === t.element ? e : { ...e, buttonElement: t.element }, 8: (e, t) => e.optionsElement === t.element ? e : { ...e, optionsElement: t.element } }, Xo = se(null);
Xo.displayName = "ListboxActionsContext";
function ii(e) {
  let t = Q(Xo);
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <Listbox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, ii), n;
  }
  return t;
}
let oi = se(null);
oi.displayName = "ListboxDataContext";
function tr(e) {
  let t = Q(oi);
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <Listbox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, tr), n;
  }
  return t;
}
function Xg(e, t) {
  return Xe(t.type, Yg, e, t);
}
let Qg = ce;
function Zg(e, t) {
  var n;
  let r = Vo(), { value: i, defaultValue: o, form: s, name: a, onChange: l, by: u, invalid: c = !1, disabled: f = r || !1, horizontal: p = !1, multiple: d = !1, __demoMode: h = !1, ...g } = e;
  const b = p ? "horizontal" : "vertical";
  let E = Ue(t), _ = Xp(o), [y = d ? [] : void 0, w] = Yp(i, l, _), [x, N] = mo(Xg, { dataRef: Nc(), listboxState: h ? 0 : 1, options: [], searchQuery: "", activeOptionIndex: null, activationTrigger: 1, optionsVisible: !1, buttonElement: null, optionsElement: null, __demoMode: h }), D = C({ static: !1, hold: !1 }), L = C(/* @__PURE__ */ new Map()), $ = bh(u), T = q((J) => Xe(S.mode, { 1: () => y.some((fe) => $(fe, J)), 0: () => $(y, J) }), [y]), S = M(() => ({ ...x, value: y, disabled: f, invalid: c, mode: d ? 1 : 0, orientation: b, compare: $, isSelected: T, optionsPropsRef: D, listRef: L }), [y, f, c, d, x, L]);
  ee(() => {
    x.dataRef.current = S;
  }, [S]);
  let V = S.listboxState === 0;
  Fh(V, [S.buttonElement, S.optionsElement], (J, fe) => {
    var et;
    N({ type: 1 }), nu(fe, ko.Loose) || (J.preventDefault(), (et = S.buttonElement) == null || et.focus());
  });
  let G = M(() => ({ open: S.listboxState === 0, disabled: f, invalid: c, value: y }), [S, f, y, c]), W = k((J) => {
    let fe = S.options.find((et) => et.id === J);
    fe && He(fe.dataRef.current.value);
  }), te = k(() => {
    if (S.activeOptionIndex !== null) {
      let { dataRef: J, id: fe } = S.options[S.activeOptionIndex];
      He(J.current.value), N({ type: 2, focus: ae.Specific, id: fe });
    }
  }), X = k(() => N({ type: 0 })), U = k(() => N({ type: 1 })), j = Kt(), Y = k((J, fe, et) => {
    j.dispose(), j.microTask(() => J === ae.Specific ? N({ type: 2, focus: ae.Specific, id: fe, trigger: et }) : N({ type: 2, focus: J, trigger: et }));
  }), ne = k((J, fe) => (N({ type: 5, id: J, dataRef: fe }), () => N({ type: 6, id: J }))), He = k((J) => Xe(S.mode, { 0() {
    return w == null ? void 0 : w(J);
  }, 1() {
    let fe = S.value.slice(), et = fe.findIndex((Ec) => $(Ec, J));
    return et === -1 ? fe.push(J) : fe.splice(et, 1), w == null ? void 0 : w(fe);
  } })), at = k((J) => N({ type: 3, value: J })), I = k(() => N({ type: 4 })), ve = k((J) => {
    N({ type: 7, element: J });
  }), Re = k((J) => {
    N({ type: 8, element: J });
  }), yn = M(() => ({ onChange: He, registerOption: ne, goToOption: Y, closeListbox: U, openListbox: X, selectActiveOption: te, selectOption: W, search: at, clearSearch: I, setButtonElement: ve, setOptionsElement: Re }), []), [En, Yt] = dh({ inherit: !0 }), Tt = { ref: E }, _c = q(() => {
    if (_ !== void 0) return w == null ? void 0 : w(_);
  }, [w, _]), yc = Te();
  return H.createElement(Yt, { value: En, props: { htmlFor: (n = S.buttonElement) == null ? void 0 : n.id }, slot: { open: S.listboxState === 0, disabled: f } }, H.createElement(mg, null, H.createElement(Xo.Provider, { value: yn }, H.createElement(oi.Provider, { value: S }, H.createElement(Su, { value: Xe(S.listboxState, { 0: We.Open, 1: We.Closed }) }, a != null && y != null && H.createElement(nh, { disabled: f, data: { [a]: y }, form: s, onReset: _c }), yc({ ourProps: Tt, theirProps: g, slot: G, defaultTag: Qg, name: "Listbox" }))))));
}
let Jg = "button";
function em(e, t) {
  var n;
  let r = tr("Listbox.Button"), i = ii("Listbox.Button"), o = fn(), s = zl(), { id: a = s || `headlessui-listbox-button-${o}`, disabled: l = r.disabled || !1, autoFocus: u = !1, ...c } = e, f = Ue(t, pg(), i.setButtonElement), p = hg(), d = k((S) => {
    switch (S.key) {
      case ue.Enter:
        Qp(S.currentTarget);
        break;
      case ue.Space:
      case ue.ArrowDown:
        S.preventDefault(), Ke(() => i.openListbox()), r.value || i.goToOption(ae.First);
        break;
      case ue.ArrowUp:
        S.preventDefault(), Ke(() => i.openListbox()), r.value || i.goToOption(ae.Last);
        break;
    }
  }), h = k((S) => {
    switch (S.key) {
      case ue.Space:
        S.preventDefault();
        break;
    }
  }), g = k((S) => {
    var V;
    if (oh(S.currentTarget)) return S.preventDefault();
    r.listboxState === 0 ? (Ke(() => i.closeListbox()), (V = r.buttonElement) == null || V.focus({ preventScroll: !0 })) : (S.preventDefault(), i.openListbox());
  }), b = k((S) => S.preventDefault()), E = Zl([a]), _ = lh(), { isFocusVisible: y, focusProps: w } = Lp({ autoFocus: u }), { isHovered: x, hoverProps: N } = Vp({ isDisabled: l }), { pressed: D, pressProps: L } = Hp({ disabled: l }), $ = M(() => ({ open: r.listboxState === 0, active: D || r.listboxState === 0, disabled: l, invalid: r.invalid, value: r.value, hover: x, focus: y, autofocus: u }), [r.listboxState, r.value, l, x, y, D, r.invalid, u]), T = Hl(p(), { ref: f, id: a, type: Mh(e, r.buttonElement), "aria-haspopup": "listbox", "aria-controls": (n = r.optionsElement) == null ? void 0 : n.id, "aria-expanded": r.listboxState === 0, "aria-labelledby": E, "aria-describedby": _, disabled: l || void 0, autoFocus: u, onKeyDown: d, onKeyUp: h, onKeyPress: b, onClick: g }, w, N, L);
  return Te()({ ourProps: T, theirProps: c, slot: $, defaultTag: Jg, name: "Listbox.Button" });
}
let Lu = se(!1), tm = "div", nm = Rr.RenderStrategy | Rr.Static;
function rm(e, t) {
  var n, r;
  let i = fn(), { id: o = `headlessui-listbox-options-${i}`, anchor: s, portal: a = !1, modal: l = !0, transition: u = !1, ...c } = e, f = dg(s), [p, d] = B(null);
  f && (a = !0);
  let h = tr("Listbox.Options"), g = ii("Listbox.Options"), b = Bo(h.optionsElement), E = Ko(), [_, y] = su(u, p, E !== null ? (E & We.Open) === We.Open : h.listboxState === 0);
  Sh(_, h.buttonElement, g.closeListbox);
  let w = h.__demoMode ? !1 : l && h.listboxState === 0;
  qh(w, b);
  let x = h.__demoMode ? !1 : l && h.listboxState === 0;
  wh(x, { allowed: q(() => [h.buttonElement, h.optionsElement], [h.buttonElement, h.optionsElement]) });
  let N = h.listboxState !== 0, D = Ug(N, h.buttonElement) ? !1 : _, L = _ && h.listboxState === 1, $ = yg(L, h.value), T = k((I) => h.compare($, I)), S = M(() => {
    var I;
    if (f == null || !((I = f == null ? void 0 : f.to) != null && I.includes("selection"))) return null;
    let ve = h.options.findIndex((Re) => T(Re.dataRef.current.value));
    return ve === -1 && (ve = 0), ve;
  }, [f, h.options]), V = (() => {
    if (f == null) return;
    if (S === null) return { ...f, inner: void 0 };
    let I = Array.from(h.listRef.current.values());
    return { ...f, inner: { listRef: { current: I }, index: S } };
  })(), [G, W] = gg(V), te = vg(), X = Ue(t, f ? G : null, g.setOptionsElement, d), U = Kt();
  K(() => {
    var I;
    let ve = h.optionsElement;
    ve && h.listboxState === 0 && ve !== ((I = Zn(ve)) == null ? void 0 : I.activeElement) && (ve == null || ve.focus({ preventScroll: !0 }));
  }, [h.listboxState, h.optionsElement]);
  let j = k((I) => {
    var ve, Re;
    switch (U.dispose(), I.key) {
      case ue.Space:
        if (h.searchQuery !== "") return I.preventDefault(), I.stopPropagation(), g.search(I.key);
      case ue.Enter:
        if (I.preventDefault(), I.stopPropagation(), h.activeOptionIndex !== null) {
          let { dataRef: yn } = h.options[h.activeOptionIndex];
          g.onChange(yn.current.value);
        }
        h.mode === 0 && (Ke(() => g.closeListbox()), (ve = h.buttonElement) == null || ve.focus({ preventScroll: !0 }));
        break;
      case Xe(h.orientation, { vertical: ue.ArrowDown, horizontal: ue.ArrowRight }):
        return I.preventDefault(), I.stopPropagation(), g.goToOption(ae.Next);
      case Xe(h.orientation, { vertical: ue.ArrowUp, horizontal: ue.ArrowLeft }):
        return I.preventDefault(), I.stopPropagation(), g.goToOption(ae.Previous);
      case ue.Home:
      case ue.PageUp:
        return I.preventDefault(), I.stopPropagation(), g.goToOption(ae.First);
      case ue.End:
      case ue.PageDown:
        return I.preventDefault(), I.stopPropagation(), g.goToOption(ae.Last);
      case ue.Escape:
        I.preventDefault(), I.stopPropagation(), Ke(() => g.closeListbox()), (Re = h.buttonElement) == null || Re.focus({ preventScroll: !0 });
        return;
      case ue.Tab:
        I.preventDefault(), I.stopPropagation(), Ke(() => g.closeListbox()), $h(h.buttonElement, I.shiftKey ? oo.Previous : oo.Next);
        break;
      default:
        I.key.length === 1 && (g.search(I.key), U.setTimeout(() => g.clearSearch(), 350));
        break;
    }
  }), Y = (n = h.buttonElement) == null ? void 0 : n.id, ne = M(() => ({ open: h.listboxState === 0 }), [h.listboxState]), He = Hl(f ? te() : {}, { id: o, ref: X, "aria-activedescendant": h.activeOptionIndex === null || (r = h.options[h.activeOptionIndex]) == null ? void 0 : r.id, "aria-multiselectable": h.mode === 1 ? !0 : void 0, "aria-labelledby": Y, "aria-orientation": h.orientation, onKeyDown: j, role: "listbox", tabIndex: h.listboxState === 0 ? 0 : void 0, style: { ...c.style, ...W, "--button-width": yh(h.buttonElement, !0).width }, ...ou(y) }), at = Te();
  return H.createElement(Pg, { enabled: a ? e.static || _ : !1 }, H.createElement(oi.Provider, { value: h.mode === 1 ? h : { ...h, isSelected: T } }, at({ ourProps: He, theirProps: c, slot: ne, defaultTag: tm, features: nm, visible: D, name: "Listbox.Options" })));
}
let im = "div";
function om(e, t) {
  let n = fn(), { id: r = `headlessui-listbox-option-${n}`, disabled: i = !1, value: o, ...s } = e, a = Q(Lu) === !0, l = tr("Listbox.Option"), u = ii("Listbox.Option"), c = l.activeOptionIndex !== null ? l.options[l.activeOptionIndex].id === r : !1, f = l.isSelected(o), p = C(null), d = qg(p), h = zt({ disabled: i, value: o, domRef: p, get textValue() {
    return d();
  } }), g = Ue(t, p, ($) => {
    $ ? l.listRef.current.set(r, $) : l.listRef.current.delete(r);
  });
  ee(() => {
    if (!l.__demoMode && l.listboxState === 0 && c && l.activationTrigger !== 0) return mt().requestAnimationFrame(() => {
      var $, T;
      (T = ($ = p.current) == null ? void 0 : $.scrollIntoView) == null || T.call($, { block: "nearest" });
    });
  }, [p, c, l.__demoMode, l.listboxState, l.activationTrigger, l.activeOptionIndex]), ee(() => {
    if (!a) return u.registerOption(r, h);
  }, [h, r, a]);
  let b = k(($) => {
    var T;
    if (i) return $.preventDefault();
    u.onChange(o), l.mode === 0 && (Ke(() => u.closeListbox()), (T = l.buttonElement) == null || T.focus({ preventScroll: !0 }));
  }), E = k(() => {
    if (i) return u.goToOption(ae.Nothing);
    u.goToOption(ae.Specific, r);
  }), _ = Gh(), y = k(($) => {
    _.update($), !i && (c || u.goToOption(ae.Specific, r, 0));
  }), w = k(($) => {
    _.wasMoved($) && (i || c || u.goToOption(ae.Specific, r, 0));
  }), x = k(($) => {
    _.wasMoved($) && (i || c && u.goToOption(ae.Nothing));
  }), N = M(() => ({ active: c, focus: c, selected: f, disabled: i, selectedOption: f && a }), [c, f, i, a]), D = a ? {} : { id: r, ref: g, role: "option", tabIndex: i === !0 ? void 0 : -1, "aria-disabled": i === !0 ? !0 : void 0, "aria-selected": f, disabled: void 0, onClick: b, onFocus: E, onPointerEnter: y, onMouseEnter: y, onPointerMove: w, onMouseMove: w, onPointerLeave: x, onMouseLeave: x }, L = Te();
  return !f && a ? null : L({ ourProps: D, theirProps: s, slot: N, defaultTag: im, name: "Listbox.Option" });
}
let sm = ce;
function am(e, t) {
  let { options: n, placeholder: r, ...i } = e, o = { ref: Ue(t) }, s = tr("ListboxSelectedOption"), a = M(() => ({}), []), l = s.value === void 0 || s.value === null || s.mode === 1 && Array.isArray(s.value) && s.value.length === 0, u = Te();
  return H.createElement(Lu.Provider, { value: !0 }, u({ ourProps: o, theirProps: { ...i, children: H.createElement(H.Fragment, null, r && l ? r : n) }, slot: a, defaultTag: sm, name: "ListboxSelectedOption" }));
}
let lm = ye(Zg), um = ye(em), cm = gh, Pu = ye(rm), fm = ye(om), dm = ye(am), Lr = Object.assign(lm, { Button: um, Label: cm, Options: Pu, Option: fm, SelectedOption: dm });
const pm = window.matchMedia("(min-width: 0px) and (max-width: 1023px)"), hm = window.matchMedia("(min-width: 768px)"), Qo = {
  isMediumDeviceDownMediaQuery: pm,
  isTabletUpMediaQuery: hm
}, Js = (e) => e instanceof MediaQueryList ? e : window.matchMedia(e);
function Zo(e) {
  const [t, n] = B(Js(e).matches);
  return K(() => {
    const r = Js(e), i = (o) => {
      n(o.matches);
    };
    return r.addEventListener("change", i), () => {
      r.addEventListener("change", i);
    };
  }, [e]), t;
}
const vm = (e) => {
  const t = C();
  return K(() => {
    t.current = e;
  }, [e]), t.current;
}, gm = (e, {
  onSubmit: t
} = {}) => (K(() => {
  const r = e.current, i = (o) => {
    typeof t == "function" && t(o);
  };
  return r == null || r.addEventListener("submit", i), () => {
    r == null || r.removeEventListener("submit", i);
  };
}, [e, t]), q(() => {
  e.current && typeof e.current.requestSubmit == "function" && e.current.requestSubmit();
}, [e]));
function mm(e, {
  replaceState: t = !1
} = {}) {
  const n = new URL(`${window.location.origin}${window.location.pathname}`);
  n.search = e.toString(), t ? (window.history.replaceState({}, "", n), window.dispatchEvent(new CustomEvent("replacestate"))) : (window.history.pushState({}, "", n), window.dispatchEvent(new CustomEvent("pushstate")));
}
class bm extends URLSearchParams {
  constructor(t, n = {}) {
    super(t), this.onUpdate = n == null ? void 0 : n.onUpdate;
  }
  set(t, n) {
    super.set(t, n), this.onUpdate(this);
  }
  replace(t, n) {
    const r = new URLSearchParams(Object.fromEntries(new URLSearchParams(t)));
    Array.from(this).forEach(([i]) => super.delete(i)), r.forEach((i, o) => super.set(o, i)), super.sort(), this.onUpdate(this, n);
  }
}
const ea = (e) => new bm(e, {
  onUpdate: mm
});
class _m {
  constructor() {
    /** @type {CustomURLSearchParams} */
    ie(this, "state");
    /**
     * @template T
     * @type {Set<function(typeof state): T>}
     */
    ie(this, "listeners", /* @__PURE__ */ new Set());
    this.state = ea(window.location.search), this.onChange = this.onChange.bind(this), this.subscribe = this.subscribe.bind(this), this.on = this.on.bind(this), this.off = this.off.bind(this), this.getState = this.getState.bind(this), this.setState = this.setState.bind(this);
  }
  getState() {
    return this.state;
  }
  setState(t) {
    this.state = t;
  }
  onChange() {
    this.setState(ea(window.location.search)), this.listeners.forEach((t) => t(this.state));
  }
  on() {
    window.addEventListener("popstate", this.onChange), window.addEventListener("pushstate", this.onChange), window.addEventListener("replacestate", this.onChange);
  }
  off() {
    window.removeEventListener("popstate", this.onChange), window.removeEventListener("pushstate", this.onChange), window.removeEventListener("replacestate", this.onChange);
  }
  subscribe(t) {
    return this.listeners.add(t), this.on(), this.off;
  }
}
const ta = new _m();
function Iu() {
  return {
    state: ga(ta.subscribe, ta.getState)
  };
}
const co = (e, t) => Vc.sanitize(e, t), Vu = () => Q(xl), na = ["em"], Qt = {
  IDLE: "idle",
  PENDING: "pending",
  SUCCESS: "success",
  FAILURE: "failure",
  NOTHING_FOUND: "nothing_found"
}, Ot = {
  IDLE: "idle",
  LOAD: "load",
  LOAD_SUCCESS: "load_success",
  LOAD_FAILED: "load_failed"
}, Fu = {
  status: Qt.IDLE,
  hits: [],
  total: 0,
  error: null
}, Mu = (e) => ({
  ...e
}), ym = (e) => {
  const {
    contentSourceId: t,
    languageCode: n,
    versionName: r,
    variantName: i,
    path: o,
    ...s
  } = e;
  return {
    contentSourceName: bo(t),
    languageCode: n,
    versionName: r,
    variantName: i,
    url: o,
    title: (
      /** @type {string} */
      co(s.title, {
        ALLOWED_TAGS: na
      })
    ),
    description: (
      /** @type {string} */
      co(s.description, {
        ALLOWED_TAGS: na
      })
    )
  };
}, Em = (e, t) => {
  var n;
  switch (t.type) {
    case Ot.IDLE:
      return {
        ...e,
        status: Qt.IDLE,
        error: null
      };
    case Ot.LOAD:
      return {
        ...e,
        status: Qt.PENDING
      };
    case Ot.LOAD_SUCCESS: {
      const r = t.payload.total ?? 0;
      return r <= 0 ? {
        ...Mu(Fu),
        status: Qt.NOTHING_FOUND
      } : {
        ...e,
        status: Qt.SUCCESS,
        hits: t.payload.hits.map(ym),
        total: r,
        error: null
      };
    }
    case Ot.LOAD_FAILED:
      return {
        ...e,
        status: Qt.FAILURE,
        hits: [],
        total: 0,
        // TODO: IVPC-1127 Refine error handling
        error: (n = t.payload) == null ? void 0 : n.message
      };
    default:
      throw new Error(`Unknown action type: ${t == null ? void 0 : t.type}`);
  }
}, Om = () => {
  const e = Vu(), [t, n] = mo(Em, Fu, Mu), {
    state: r
  } = Iu(), i = q(async () => {
    n({
      type: Ot.IDLE
    });
    try {
      n({
        type: Ot.LOAD
      });
      const o = await e.searchService.fetchSuggestions({
        query: r.get(P.QUERY),
        contentSource: r.get(P.CONTENT_SOURCE),
        version: r.get(P.VERSION),
        variant: r.get(P.VARIANT),
        language: r.get(P.LANGUAGE),
        max: Number(r.get(P.MAX)),
        start: Number(r.get(P.START))
      });
      n({
        type: Ot.LOAD_SUCCESS,
        payload: o
      });
    } catch (o) {
      n({
        type: Ot.LOAD_FAILED,
        payload: o
      });
    }
  }, [r, e.searchService]);
  return M(() => ({
    ...t,
    load: i
  }), [i, t]);
}, wm = ({
  totalHits: e,
  state: t
}) => {
  const n = () => Number(t[P.MAX]) || 1, r = () => Number(t[P.START]) || 0, i = Math.ceil(e / n()), o = ({
    currentIndex: l,
    activeIndex: u,
    total: c
  }) => {
    const g = l <= u + 1 && l >= u - 1, b = l >= c - 2 || l < 2, E = l === u - 1 - 1 && l === 2, _ = l === u + 1 + 1 && l === c - 2 - 1, y = 5 > l && 5 > u || c - 5 <= l && c - 5 <= u;
    return c <= 8 || g || b || _ || E || y;
  }, s = (l) => {
    let u = null;
    const c = r(), f = i * n();
    if (l === Ki) {
      const p = c + n();
      !Number.isNaN(p) && p < f ? u = p : u = null;
    }
    if (l === zi) {
      const p = c - n();
      !Number.isNaN(p) && p >= 0 ? u = p : u = null;
    }
    return u;
  }, a = Array(i).fill(!0).map((l, u) => ({
    value: u * n(),
    get active() {
      return this.value === r();
    }
  })).map((l, u, c) => ({
    ...l,
    get hidden() {
      return !o({
        currentIndex: u,
        activeIndex: c.indexOf(c.find(({
          active: f
        }) => f)),
        total: c.length
      });
    }
  }));
  return {
    next: s(Ki),
    prev: s(zi),
    pages: a
  };
}, ju = (e) => {
  var n, r;
  const t = ((r = (n = Cc()) == null ? void 0 : n.collection) == null ? void 0 : r.members) ?? [];
  return t.length === 1 ? t[0] : t.find((i) => i.id === e);
}, ku = (e, t) => {
  var r;
  if (Dc() && !$c(e == null ? void 0 : e.name, Ic.language))
    return null;
  const n = e && ((r = e[t]) == null ? void 0 : r.available);
  return (n == null ? void 0 : n.length) > 0 ? n : null;
}, Sm = (e) => {
  const t = ju(e);
  return ku(t, "versions");
}, Nm = (e) => {
  const t = ju(e);
  return ku(t, "variants");
}, Am = (e, {
  id: t,
  label: n,
  name: r,
  items: i
}) => {
  const o = [];
  i.length > 1 && o.push({
    name: $e(`search.filter.${t}.all`),
    id: ""
  });
  const s = [...o, ...i].map((a, l, u) => ({
    ...a,
    total: u.length,
    get value() {
      return this.id ?? this.name;
    },
    get active() {
      return this.value === e[r];
    }
  })).map(({
    active: a,
    ...l
  }, u, c) => ({
    ...l,
    // Set the first item to be active if there is no other active item
    get active() {
      return c.some(({
        active: f
      }) => f) ? a : u === 0;
    }
  })).filter(Boolean);
  return {
    id: t,
    label: n,
    name: r,
    items: s
  };
}, xm = [{
  id: "content",
  get label() {
    return $e("search.filter.content.label");
  },
  name: P.CONTENT_SOURCE,
  items: () => _o()
}, {
  id: "version",
  get label() {
    return $e("search.filter.version.label");
  },
  name: P.VERSION,
  items: (e) => Sm(e[P.CONTENT_SOURCE])
}, {
  id: "variant",
  get label() {
    return $e("search.filter.variant.label");
  },
  name: P.VARIANT,
  items: (e) => Nm(e[P.CONTENT_SOURCE])
}], Tm = (e) => xm.map(({
  items: t,
  ...n
}) => ({
  ...n,
  items: t(e)
})).filter(({
  items: t
}) => Array.isArray(t)).map((t) => Am(e, t)).filter(Boolean);
let ra = !0, Ni = null;
const Rm = (e, t) => {
  const n = new FormData();
  for (const [o, s] of new FormData(e).entries())
    n.set(o, s);
  const r = n.get(P.CONTENT_SOURCE), i = bo(r);
  return Ni !== null && Ni !== i && (n.delete(P.VARIANT), n.delete(P.VERSION)), Object.values(P).forEach((o) => {
    n.has(o) || n.set(o, ""), o === P.IN_APP_HELP && n.get(o) !== "true" && n.delete(o), o === P.REFERRER && !n.get(o) && n.delete(o);
  }), Lc(i) || n.delete(P.VARIANT), Pc(i) || n.delete(P.VERSION), (t == null ? void 0 : t.name) !== P.START && !ra && n.set(P.START, "0"), ra = !1, Ni = i, n;
};
let Ai = !1;
const Cm = (e) => {
  const {
    state: t
  } = Iu(), {
    hits: n,
    total: r,
    status: i,
    error: o,
    load: s
  } = Om(), a = q(async (p) => {
    p.preventDefault();
    const d = Rm(p.target, p.submitter);
    t.replace(d, {
      replaceState: !Ai
    }), await s();
  }, [s, t]), l = gm(e, {
    onSubmit: a
  });
  K(() => {
    !Ai && t.has(P.QUERY) && l(), Ai = !0;
  }, [t, l]);
  const u = Object.fromEntries(t), c = Tm(u), f = wm({
    totalHits: r,
    state: u
  });
  return {
    state: u,
    results: n,
    total: r,
    status: i,
    error: o,
    pagination: f,
    filter: c
  };
}, hr = ({
  classNames: e,
  children: t,
  value: n,
  label: r,
  active: i,
  onClick: o,
  disabled: s = !1
}) => /* @__PURE__ */ m("button", {
  type: "button",
  "aria-label": r,
  "aria-current": i,
  value: n,
  onClick: o,
  className: re(e),
  disabled: s,
  children: t
});
hr.propTypes = {
  classNames: v.string,
  children: v.node.isRequired,
  value: v.string.isRequired,
  label: v.string,
  active: v.bool,
  onClick: v.func,
  disabled: v.bool
};
const Bu = ({
  vpId: e,
  form: t,
  pages: n = [],
  nextPage: r,
  prevPage: i,
  onClick: o
}) => {
  const s = C(null), a = C(null), {
    t: l
  } = qn(), u = Zo(Qo.isTabletUpMediaQuery), c = n.find(({
    active: h
  }) => h === !0), f = (h) => {
    h.target.value.length && (s.current.setAttribute("value", `${h.target.value}`), a.current.setAttribute("value", `${h.target.value}`), a.current.click(), typeof o == "function" && o());
  };
  let p = !1, d = !1;
  return /* @__PURE__ */ m("nav", {
    "data-id": e,
    className: re("pagination", {
      "pagination--simple": !u
    }),
    "aria-label": l("pagination.label"),
    children: [/* @__PURE__ */ m("div", {
      className: "pagination__inner",
      children: [/* @__PURE__ */ m("span", {
        className: "pagination__action-container",
        children: /* @__PURE__ */ m(hr, {
          classNames: re("button pagination__action pagination__action--prev", {
            "button--secondary": !u
          }),
          value: i === null ? "" : `${i}`,
          onClick: f,
          disabled: i === null,
          children: /* @__PURE__ */ m(qe, {
            i18nKey: "pagination.prev.label"
          })
        })
      }), u ? /* @__PURE__ */ m("ul", {
        className: "pagination__items list-none m-0 p-0",
        children: n.map(({
          value: h,
          active: g,
          hidden: b
        }, E) => b ? !p && E > n.indexOf(c) ? (p = !0, /* @__PURE__ */ m("li", {
          children: /* @__PURE__ */ m("select", {
            className: "pagination__item button",
            "aria-label": "Select page number",
            onChange: f,
            children: [/* @__PURE__ */ m("option", {
              disabled: !0,
              selected: !0,
              value: "",
              children: "···"
            }), n.map(({
              value: _,
              hidden: y
            }, w) => !y || w < n.indexOf(c) ? null : /* @__PURE__ */ m("option", {
              value: _,
              children: w + 1
            }, _))]
          }, c)
        })) : !d && E < n.indexOf(c) ? (d = !0, /* @__PURE__ */ m("li", {
          children: /* @__PURE__ */ m("select", {
            className: "pagination__item button",
            "aria-label": "Select page number",
            onChange: f,
            children: [/* @__PURE__ */ m("option", {
              disabled: !0,
              selected: !0,
              value: "",
              children: "···"
            }), n.map(({
              value: _,
              hidden: y
            }, w) => !y || w > n.indexOf(c) ? null : /* @__PURE__ */ m("option", {
              value: _,
              children: w + 1
            }, _))]
          }, c)
        })) : null : (p = !1, d = !1, /* @__PURE__ */ m("li", {
          children: /* @__PURE__ */ m(hr, {
            value: `${h}`,
            label: l("pagination.page.label", {
              index: E + 1
            }),
            active: g,
            onClick: f,
            classNames: "pagination__item button",
            children: E + 1
          })
        }, h)))
      }) : /* @__PURE__ */ m("span", {
        className: "pagination__page-indicator",
        "aria-label": l("pagination.page.context.label", {
          index: n.indexOf(c) + 1,
          count: n.length
        }),
        children: [n.indexOf(c) + 1, " / ", n.length]
      }), /* @__PURE__ */ m("span", {
        className: "pagination__action-container",
        children: /* @__PURE__ */ m(hr, {
          classNames: re("button pagination__action pagination__action--next", {
            "button--secondary": !u
          }),
          value: r === null ? "" : `${r}`,
          onClick: f,
          disabled: r === null,
          children: /* @__PURE__ */ m(qe, {
            i18nKey: "pagination.next.label"
          })
        })
      })]
    }), /* @__PURE__ */ m("input", {
      ref: s,
      type: "hidden",
      form: t,
      name: P.START,
      defaultValue: c == null ? void 0 : c.value
    }), /* @__PURE__ */ m("input", {
      ref: a,
      type: "submit",
      hidden: !0,
      "aria-hidden": "true",
      form: t,
      name: P.START,
      defaultValue: c == null ? void 0 : c.value
    })]
  });
};
Bu.propTypes = {
  vpId: v.string,
  form: v.string.isRequired,
  pages: v.array,
  nextPage: v.number,
  prevPage: v.number,
  onClick: v.func
};
const Uu = ({
  vpId: e,
  children: t,
  open: n = !0
}) => /* @__PURE__ */ m("details", {
  "data-id": e,
  "data-component": "expand",
  open: n,
  className: "expand",
  children: t
});
Uu.propTypes = {
  vpId: v.string.isRequired,
  open: v.bool,
  children: v.node.isRequired
};
const Hu = ({
  vpId: e,
  children: t
}) => /* @__PURE__ */ m("summary", {
  "data-id": e,
  className: "expand-control",
  children: t
});
Hu.propTypes = {
  vpId: v.string.isRequired,
  children: v.node.isRequired
};
const qu = ({
  children: e
}) => /* @__PURE__ */ m("div", {
  className: "expand-body",
  children: e
});
qu.propTypes = {
  children: v.node.isRequired
};
const xi = Object.assign(Uu, {
  Summary: Hu,
  Body: qu
}), Dm = (e, t, n) => {
  const [r, i] = B(t), o = q((s) => {
    s.key === "ArrowDown" || s.key === "ArrowRight" ? (s.preventDefault(), i((r + 1) % n)) : (s.key === "ArrowUp" || s.key === "ArrowLeft") && (s.preventDefault(), i((r - 1 + n) % n));
  }, [n, r, i]);
  return K(() => {
    const s = e.current;
    return s == null || s.addEventListener("keydown", o, !1), () => {
      s == null || s.removeEventListener("keydown", o, !1);
    };
  }, [e, o]), [r, i];
}, Gu = se(null), Wu = ({
  id: e,
  name: t,
  onChange: n,
  checked: r,
  children: i,
  index: o
}) => {
  const s = C(null), {
    currentIndex: a,
    setCurrentIndex: l,
    active: u
  } = Q(Gu), c = o === a, f = () => {
    l(o), n == null || n();
  };
  return jr(() => {
    c && u && s.current.focus();
  }, [c, u]), /* @__PURE__ */ m("button", {
    id: e,
    "data-name": t,
    "data-value": e,
    ref: s,
    tabIndex: c ? 0 : -1,
    type: "button",
    role: "radio",
    onClick: () => f(),
    "aria-checked": r,
    children: i
  });
};
Wu.propTypes = {
  name: v.string.isRequired,
  onChange: v.func,
  checked: v.bool.isRequired,
  id: v.string.isRequired,
  children: v.node.isRequired,
  index: v.number.isRequired
};
const Ku = ({
  id: e,
  items: t = [],
  value: n,
  getId: r,
  label: i,
  children: o
}) => {
  const s = C(null), a = t.findIndex((d) => n === r(d)), [l, u] = Dm(s, a, t.length), [c, f] = B(!1);
  K(() => {
    const d = s.current, h = (b) => {
      b.currentTarget.contains(b.relatedTarget) || (u(a), f(!1));
    }, g = () => {
      f(!0);
    };
    return d == null || d.addEventListener("focusin", g), d == null || d.addEventListener("blur", h), () => {
      d == null || d.removeEventListener("focusin", g), d == null || d.removeEventListener("blur", h);
    };
  }, [a, u]);
  const p = M(() => ({
    currentIndex: l,
    setCurrentIndex: u,
    active: c
  }), [l, u, c]);
  return /* @__PURE__ */ m(Gu.Provider, {
    value: p,
    children: /* @__PURE__ */ m("div", {
      "data-id": e,
      className: "m-0 p-0 list-none",
      role: "radiogroup",
      "aria-labelledby": i,
      ref: s,
      children: o
    })
  });
};
Ku.propTypes = {
  id: v.string.isRequired,
  items: v.array,
  value: v.string,
  getId: v.func,
  label: v.string,
  children: v.node.isRequired
};
const ia = Object.assign(Ku, {
  Item: Wu
}), zu = ({
  id: e,
  summary: t,
  items: n = [],
  form: r,
  name: i,
  value: o,
  getLabel: s,
  getId: a,
  onChange: l,
  disabled: u = !1
}) => {
  const c = C(null), f = C(null), p = (d) => {
    f.current.setAttribute("value", a(d)), c.current.click(), typeof l == "function" && l(d);
  };
  return /* @__PURE__ */ m(ce, {
    children: [/* @__PURE__ */ m(xi, {
      vpId: `search-page-vertical-filter-${e}`,
      children: [/* @__PURE__ */ m(xi.Summary, {
        vpId: `search-page-vertical-filter-${e}-summary`,
        children: t
      }), /* @__PURE__ */ m(xi.Body, {
        children: /* @__PURE__ */ m(ia, {
          id: `search-page-vertical-filter-${e}-items`,
          items: n,
          value: a(o),
          getId: a,
          children: n.map((d, h) => /* @__PURE__ */ m(ia.Item, {
            id: a(d),
            name: i,
            onChange: () => p(d),
            checked: a(d) === a(o),
            index: h,
            children: /* @__PURE__ */ m("span", {
              className: "filter-vertical__button",
              children: s(d)
            })
          }, a(d)))
        })
      })]
    }), /* @__PURE__ */ m("input", {
      ref: f,
      type: "hidden",
      form: r,
      name: i,
      value: a(o) ?? ""
    }), /* @__PURE__ */ m("input", {
      ref: c,
      type: "submit",
      hidden: !0,
      "aria-hidden": "true",
      form: r,
      disabled: u
    })]
  });
};
zu.propTypes = {
  id: v.string.isRequired,
  summary: v.string,
  items: v.array,
  form: v.string.isRequired,
  name: v.string.isRequired,
  value: v.shape({
    name: v.string,
    id: v.string,
    total: v.number,
    value: v.string,
    active: v.bool
  }),
  getLabel: v.func,
  getId: v.func,
  onChange: v.func,
  disabled: v.bool
};
const Pr = 24, $m = `0 0 ${Pr} ${Pr}`, _n = ({
  vpId: e,
  children: t,
  fill: n,
  width: r = Pr,
  height: i = Pr,
  viewBox: o = $m
}) => /* @__PURE__ */ m("svg", {
  "data-id": e,
  xmlns: "http://www.w3.org/2000/svg",
  width: r,
  height: i,
  viewBox: o,
  fill: n || "currentColor",
  "aria-hidden": "true",
  children: t
});
_n.propTypes = {
  vpId: v.string,
  children: v.node.isRequired,
  fill: v.string,
  width: v.oneOfType([v.number, v.string]),
  height: v.oneOfType([v.number, v.string]),
  viewBox: v.string
};
const Yu = ({
  vpId: e,
  color: t,
  size: n
}) => /* @__PURE__ */ m(_n, {
  vpId: ["chevron-right-icon", e].filter(Boolean).join("-"),
  fill: "none",
  width: n,
  height: n,
  viewBox: "0 0 16 16",
  children: /* @__PURE__ */ m("path", {
    d: "M7 5L10 8L7 11",
    stroke: t || "currentColor",
    strokeWidth: "1px",
    strokeLinecap: "square"
  })
});
Yu.propTypes = {
  vpId: v.string,
  color: v.string,
  size: v.oneOfType([v.string, v.number])
};
const Xu = ({
  vpId: e,
  label: t,
  lang: n,
  IconComponent: r,
  classNames: i = {}
}) => /* @__PURE__ */ m(Lr.Button, {
  "data-id": `${e}-button`,
  className: re("dropdown__button", i == null ? void 0 : i.button),
  lang: n,
  children: [r ? /* @__PURE__ */ m("span", {
    className: re("dropdown__button-icon", "dropdown__button-icon--custom", i == null ? void 0 : i.icon),
    children: /* @__PURE__ */ m(r, {})
  }) : null, /* @__PURE__ */ m("span", {
    className: re("dropdown__button-label", i == null ? void 0 : i.label),
    children: t
  }), /* @__PURE__ */ m("span", {
    className: re("dropdown__button-icon", "dropdown__button-icon--chevron", i == null ? void 0 : i.icon),
    children: /* @__PURE__ */ m(Yu, {
      size: "16"
    })
  })]
});
Xu.propTypes = {
  vpId: v.string,
  label: v.string,
  lang: v.string,
  IconComponent: v.element,
  classNames: v.object
};
const fo = {
  name: v.string,
  id: v.string,
  total: v.number,
  value: v.string,
  active: v.bool
}, Qu = ({
  vpId: e,
  value: t,
  lang: n,
  label: r,
  name: i,
  getId: o = (s) => s.id
}) => /* @__PURE__ */ m(Lr.Option, {
  "data-id": `${e}-item`,
  "data-name": i,
  "data-value": o(t),
  value: t,
  lang: n,
  className: ({
    active: s,
    selected: a
  }) => re("dropdown__option", {
    "dropdown__option--active": s,
    "is-active": s,
    "is-selected": a
  }),
  children: ({
    active: s,
    selected: a
  }) => /* @__PURE__ */ m("span", {
    className: re("dropdown__option-label", {
      "is-active": s,
      "is-selected": a
    }),
    children: r
  })
});
Qu.propTypes = {
  vpId: v.string,
  value: v.shape(fo).isRequired,
  lang: v.string,
  label: v.string,
  name: v.string,
  getId: v.func
};
const Zu = ({
  vpId: e,
  variant: t,
  items: n,
  value: r,
  onChange: i,
  getLabel: o,
  getId: s,
  label: a,
  ButtonComponent: l = Xu,
  ButtonIconComponent: u,
  ListItemComponent: c = Qu,
  TransitionComponent: f = Yo,
  classNames: p = {},
  name: d
}) => /* @__PURE__ */ m(Lr, {
  "data-component": "dropdown",
  "data-appearance": t,
  "data-id": e,
  className: re("dropdown", p == null ? void 0 : p.container),
  value: r,
  onChange: i,
  children: /* @__PURE__ */ m("div", {
    "data-id": `${e}-inner`,
    className: re("dropdown__inner", p == null ? void 0 : p.inner),
    children: [a ? /* @__PURE__ */ m(Lr.Label, {
      className: "sr-only",
      children: a
    }) : null, /* @__PURE__ */ m(l, {
      vpId: e,
      label: o(r),
      lang: r == null ? void 0 : r.lang,
      IconComponent: u,
      classNames: {
        button: p == null ? void 0 : p.button,
        label: p == null ? void 0 : p.buttonLabel,
        icon: p == null ? void 0 : p.buttonIcon
      }
    }), /* @__PURE__ */ m(f, {
      as: ce,
      children: /* @__PURE__ */ m(Pu, {
        "data-id": `${e}-options`,
        className: re("dropdown__options", p == null ? void 0 : p.options),
        children: n.map((h) => /* @__PURE__ */ m(c, {
          vpId: e,
          value: h,
          lang: h == null ? void 0 : h.lang,
          label: o(h),
          name: d,
          getId: s
        }, s(h)))
      })
    })]
  })
});
Zu.propTypes = {
  vpId: v.string,
  variant: v.oneOf(["simple", "searchbar"]).isRequired,
  items: v.arrayOf(v.shape(fo)).isRequired,
  value: v.shape(fo).isRequired,
  label: v.string.isRequired,
  getLabel: v.func.isRequired,
  getId: v.func.isRequired,
  classNames: v.object,
  onChange: v.func.isRequired,
  ButtonIconComponent: v.element,
  ButtonComponent: v.element,
  ListItemComponent: v.element,
  TransitionComponent: v.element,
  name: v.string
};
const vr = {
  UP: "up",
  DOWN: "down"
}, Ir = {
  SEARCH_BAR: "searchbar",
  SIMPLE: "simple"
}, Jo = ({
  vpId: e,
  variant: t,
  items: n,
  value: r,
  label: i,
  getLabel: o = (p) => p.label,
  getId: s = (p) => p.id,
  classNames: a = {},
  onChange: l,
  ButtonIconComponent: u,
  direction: c = vr.DOWN,
  name: f
}) => /* @__PURE__ */ m(Zu, {
  vpId: e,
  variant: t,
  items: n,
  value: r,
  label: i,
  getId: s,
  getLabel: o,
  onChange: l,
  name: f,
  ButtonIconComponent: u,
  classNames: {
    ...a,
    container: {
      ...a == null ? void 0 : a.container,
      "dropdown--simple": t === Ir.SIMPLE,
      "dropdown--searchbar": t === Ir.SEARCH_BAR
    },
    options: {
      "direction-up": c === vr.UP,
      "direction-down": c === vr.DOWN
    }
  }
}), oa = {
  name: v.string,
  id: v.string,
  total: v.number,
  value: v.string,
  active: v.bool
};
Jo.propTypes = {
  vpId: v.string,
  variant: v.oneOf(Object.values(Ir)).isRequired,
  items: v.arrayOf(v.shape(oa)).isRequired,
  value: v.shape(oa).isRequired,
  label: v.string,
  getLabel: v.func,
  getId: v.func,
  classNames: v.object,
  onChange: v.func.isRequired,
  ButtonIconComponent: v.element,
  direction: v.oneOf(Object.values(vr)),
  name: v.string
};
const Ju = ({
  vpId: e,
  form: t,
  name: n,
  value: r,
  items: i,
  getId: o,
  onChange: s,
  ...a
}) => {
  const l = C(null), u = C(null);
  return /* @__PURE__ */ m(ce, {
    children: [/* @__PURE__ */ m(Jo, {
      vpId: e,
      value: r,
      items: i,
      onChange: (f) => {
        l.current.setAttribute("value", o(f)), u.current.click(), typeof s == "function" && s(f);
      },
      getId: o,
      name: n,
      ...a
    }), /* @__PURE__ */ m("input", {
      ref: l,
      type: "hidden",
      form: t,
      name: n,
      value: o(r) ?? ""
    }), /* @__PURE__ */ m("input", {
      ref: u,
      type: "submit",
      hidden: !0,
      "aria-hidden": "true",
      form: t
    })]
  });
}, Vr = {
  name: v.string,
  id: v.string,
  total: v.number,
  value: v.string,
  active: v.bool
};
Ju.propTypes = {
  vpId: v.string,
  form: v.string.isRequired,
  name: v.string.isRequired,
  value: v.shape(Vr),
  items: v.arrayOf(v.shape(Vr)),
  getId: v.func,
  onChange: v.func
};
const ec = ({
  form: e,
  id: t,
  label: n,
  name: r,
  value: i,
  items: o = [],
  getLabel: s,
  getId: a,
  onChange: l
}) => /* @__PURE__ */ m(Ju, {
  vpId: `search-page-horizontal-filter-${t}`,
  variant: "simple",
  label: n,
  name: r,
  value: i,
  items: o,
  form: e,
  getLabel: s,
  getId: a,
  onChange: l
});
ec.propTypes = {
  form: v.string.isRequired,
  id: v.string,
  label: v.string,
  name: v.string,
  value: v.shape(Vr),
  items: v.arrayOf(v.shape(Vr)),
  getLabel: v.func,
  getId: v.func,
  onChange: v.func
};
const tc = ({
  vpId: e,
  color: t = "currentColor",
  size: n = 20
}) => /* @__PURE__ */ m(_n, {
  vpId: ["close-icon", e].filter(Boolean).join("-"),
  fill: "none",
  width: n,
  height: n,
  viewBox: "0 -960 960 960",
  children: /* @__PURE__ */ m("path", {
    fill: t,
    d: "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
  })
});
tc.propTypes = {
  vpId: v.string,
  color: v.string,
  size: v.oneOfType([v.string, v.number])
};
const nc = ({
  form: e,
  name: t,
  value: n,
  label: r
}) => {
  const {
    t: i
  } = qn(), o = C(null), s = C(null), a = (l) => {
    l.preventDefault(), s.current.setAttribute("value", ""), o.current.click();
  };
  return /* @__PURE__ */ m("div", {
    className: "filter-pill",
    children: [/* @__PURE__ */ m("button", {
      type: "button",
      "aria-label": i("search.filter.reset.label", {
        filter: r
      }),
      onClick: a,
      children: [/* @__PURE__ */ m(tc, {
        vpId: "filter-pill-remove"
      }), /* @__PURE__ */ m("span", {
        className: "filter-pill__label",
        children: r
      })]
    }), /* @__PURE__ */ m("input", {
      form: e,
      type: "hidden",
      ref: s,
      name: t,
      defaultValue: n
    }), /* @__PURE__ */ m("input", {
      form: e,
      type: "submit",
      ref: o,
      hidden: !0,
      "aria-hidden": "true"
    })]
  });
};
nc.propTypes = {
  form: v.string.isRequired,
  name: v.string.isRequired,
  value: v.string.isRequired,
  label: v.string.isRequired
};
const rc = ({
  title: e,
  description: t,
  labels: n = [],
  url: r,
  contentSource: i,
  openInNewTab: o
}) => /* @__PURE__ */ m("div", {
  className: "search-result",
  children: [/* @__PURE__ */ m("div", {
    className: "search-result__content-source",
    children: i
  }), /* @__PURE__ */ m("a", {
    className: "search-result__title",
    href: r,
    dangerouslySetInnerHTML: {
      __html: e
    },
    "aria-describedby": o ? "a11y-open-new-tab" : null,
    target: o ? "_blank" : null,
    rel: o ? "noopener noreferrer" : null
  }), t ? /* @__PURE__ */ m("p", {
    className: "search-result__description",
    dangerouslySetInnerHTML: {
      __html: t
    }
  }) : null, n && (n != null && n.length) ? /* @__PURE__ */ m("ul", {
    className: "search-result__labels",
    children: n.map((s) => /* @__PURE__ */ m("li", {
      children: /* @__PURE__ */ m("span", {
        "data-component": "status",
        "data-color": "neutral",
        class: "status",
        children: s
      }, s)
    }, s))
  }) : null]
});
rc.propTypes = {
  title: v.string.isRequired,
  description: v.string.isRequired,
  labels: v.array,
  url: v.string.isRequired,
  contentSource: v.string.isRequired,
  openInNewTab: v.bool
};
const es = pt(({
  id: e,
  children: t,
  style: n,
  onSubmit: r,
  className: i
}, o) => {
  const s = M(() => `search-form-${yo()}`, []), a = {
    action: Ea(),
    "data-id": "search-form",
    className: re(i),
    onSubmit: r
  };
  return /* @__PURE__ */ m("form", {
    role: "search",
    id: e ?? s,
    ref: o,
    method: "GET",
    style: n,
    ...a,
    children: t
  });
});
es.propTypes = {
  id: v.string,
  children: v.node.isRequired,
  style: v.object,
  onSubmit: v.func,
  className: v.string
};
const ic = ({
  size: e = "medium",
  noColor: t = !1,
  noBackground: n = !1
}) => /* @__PURE__ */ m("div", {
  className: re("spinner-container", {
    "spinner-variant-large": e === "large",
    "spinner-variant-small": e === "small",
    "spinner-variant-gray": t === !0,
    "spinner-variant-no-background": n === !0
  }),
  children: /* @__PURE__ */ m("svg", {
    "aria-hidden": "true",
    viewBox: "0 0 50 32",
    xmlns: "http://www.w3.org/2000/svg",
    children: [/* @__PURE__ */ m("circle", {
      className: "spinner-circle",
      cx: "6",
      cy: "6",
      r: "6"
    }), /* @__PURE__ */ m("circle", {
      className: "spinner-circle",
      cx: "25",
      cy: "6",
      r: "6"
    }), /* @__PURE__ */ m("circle", {
      className: "spinner-circle",
      cx: "44",
      cy: "6",
      r: "6"
    })]
  })
});
ic.propTypes = {
  size: v.oneOf(["small", "medium", "large"]),
  noColor: v.bool,
  noBackground: v.bool
};
if (!B)
  throw new Error("mobx-react-lite requires React with Hooks support");
if (!jd)
  throw new Error("mobx-react-lite@3 requires mobx at least version 6 to be available");
var Lm = {};
function Pm(e) {
  e();
}
function Im(e) {
  e || (e = Pm, Lm.NODE_ENV !== "production" && console.warn("[MobX] Failed to get unstable_batched updates from react-dom / react-native")), Cd({ reactionScheduler: e });
}
function Vm(e) {
  return fl(e);
}
var Fm = 1e4, Mm = 1e4, jm = (
  /** @class */
  function() {
    function e(t) {
      var n = this;
      Object.defineProperty(this, "finalize", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
      }), Object.defineProperty(this, "registrations", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: /* @__PURE__ */ new Map()
      }), Object.defineProperty(this, "sweepTimeout", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "sweep", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: function(r) {
          r === void 0 && (r = Fm), clearTimeout(n.sweepTimeout), n.sweepTimeout = void 0;
          var i = Date.now();
          n.registrations.forEach(function(o, s) {
            i - o.registeredAt >= r && (n.finalize(o.value), n.registrations.delete(s));
          }), n.registrations.size > 0 && n.scheduleSweep();
        }
      }), Object.defineProperty(this, "finalizeAllImmediately", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: function() {
          n.sweep(0);
        }
      });
    }
    return Object.defineProperty(e.prototype, "register", {
      enumerable: !1,
      configurable: !0,
      writable: !0,
      value: function(t, n, r) {
        this.registrations.set(r, {
          value: n,
          registeredAt: Date.now()
        }), this.scheduleSweep();
      }
    }), Object.defineProperty(e.prototype, "unregister", {
      enumerable: !1,
      configurable: !0,
      writable: !0,
      value: function(t) {
        this.registrations.delete(t);
      }
    }), Object.defineProperty(e.prototype, "scheduleSweep", {
      enumerable: !1,
      configurable: !0,
      writable: !0,
      value: function() {
        this.sweepTimeout === void 0 && (this.sweepTimeout = setTimeout(this.sweep, Mm));
      }
    }), e;
  }()
), km = typeof FinalizationRegistry < "u" ? FinalizationRegistry : jm, po = new km(function(e) {
  var t;
  (t = e.reaction) === null || t === void 0 || t.dispose(), e.reaction = null;
}), lr = { exports: {} }, Ti = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sa;
function Bm() {
  if (sa) return Ti;
  sa = 1;
  var e = ba;
  function t(f, p) {
    return f === p && (f !== 0 || 1 / f === 1 / p) || f !== f && p !== p;
  }
  var n = typeof Object.is == "function" ? Object.is : t, r = e.useState, i = e.useEffect, o = e.useLayoutEffect, s = e.useDebugValue;
  function a(f, p) {
    var d = p(), h = r({ inst: { value: d, getSnapshot: p } }), g = h[0].inst, b = h[1];
    return o(
      function() {
        g.value = d, g.getSnapshot = p, l(g) && b({ inst: g });
      },
      [f, d, p]
    ), i(
      function() {
        return l(g) && b({ inst: g }), f(function() {
          l(g) && b({ inst: g });
        });
      },
      [f]
    ), s(d), d;
  }
  function l(f) {
    var p = f.getSnapshot;
    f = f.value;
    try {
      var d = p();
      return !n(f, d);
    } catch {
      return !0;
    }
  }
  function u(f, p) {
    return p();
  }
  var c = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? u : a;
  return Ti.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : c, Ti;
}
var Ri = {}, aa;
function Um() {
  if (aa) return Ri;
  aa = 1;
  var e = {};
  /**
   * @license React
   * use-sync-external-store-shim.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  return e.NODE_ENV !== "production" && function() {
    function t(h, g) {
      return h === g && (h !== 0 || 1 / h === 1 / g) || h !== h && g !== g;
    }
    function n(h, g) {
      f || o.startTransition === void 0 || (f = !0, console.error(
        "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
      ));
      var b = g();
      if (!p) {
        var E = g();
        s(b, E) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), p = !0);
      }
      E = a({
        inst: { value: b, getSnapshot: g }
      });
      var _ = E[0].inst, y = E[1];
      return u(
        function() {
          _.value = b, _.getSnapshot = g, r(_) && y({ inst: _ });
        },
        [h, b, g]
      ), l(
        function() {
          return r(_) && y({ inst: _ }), h(function() {
            r(_) && y({ inst: _ });
          });
        },
        [h]
      ), c(b), b;
    }
    function r(h) {
      var g = h.getSnapshot;
      h = h.value;
      try {
        var b = g();
        return !s(h, b);
      } catch {
        return !0;
      }
    }
    function i(h, g) {
      return g();
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var o = ba, s = typeof Object.is == "function" ? Object.is : t, a = o.useState, l = o.useEffect, u = o.useLayoutEffect, c = o.useDebugValue, f = !1, p = !1, d = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? i : n;
    Ri.useSyncExternalStore = o.useSyncExternalStore !== void 0 ? o.useSyncExternalStore : d, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }(), Ri;
}
var la;
function Hm() {
  if (la) return lr.exports;
  la = 1;
  var e = {};
  return e.NODE_ENV === "production" ? lr.exports = Bm() : lr.exports = Um(), lr.exports;
}
var qm = Hm();
function ua(e) {
  e.reaction = new vt("observer".concat(e.name), function() {
    var t;
    e.stateVersion = Symbol(), (t = e.onStoreChange) === null || t === void 0 || t.call(e);
  });
}
function Gm(e, t) {
  t === void 0 && (t = "observed");
  var n = H.useRef(null);
  if (!n.current) {
    var r = {
      reaction: null,
      onStoreChange: null,
      stateVersion: Symbol(),
      name: t,
      subscribe: function(a) {
        return po.unregister(r), r.onStoreChange = a, r.reaction || (ua(r), r.stateVersion = Symbol()), function() {
          var l;
          r.onStoreChange = null, (l = r.reaction) === null || l === void 0 || l.dispose(), r.reaction = null;
        };
      },
      getSnapshot: function() {
        return r.stateVersion;
      }
    };
    n.current = r;
  }
  var i = n.current;
  i.reaction || (ua(i), po.register(n, i, i)), H.useDebugValue(i.reaction, Vm), qm.useSyncExternalStore(
    // Both of these must be stable, otherwise it would keep resubscribing every render.
    i.subscribe,
    i.getSnapshot,
    i.getSnapshot
  );
  var o, s;
  if (i.reaction.track(function() {
    try {
      o = e();
    } catch (a) {
      s = a;
    }
  }), s)
    throw s;
  return o;
}
var ca = {}, Ci, Di, fa = !0, oc = typeof Symbol == "function" && Symbol.for, Wm = (Di = (Ci = Object.getOwnPropertyDescriptor(function() {
}, "name")) === null || Ci === void 0 ? void 0 : Ci.configurable) !== null && Di !== void 0 ? Di : !1, da = oc ? Symbol.for("react.forward_ref") : typeof pt == "function" && pt(function(e) {
  return null;
}).$$typeof, pa = oc ? Symbol.for("react.memo") : typeof Pi == "function" && Pi(function(e) {
  return null;
}).$$typeof;
function ts(e, t) {
  var n;
  if (pa && e.$$typeof === pa)
    throw new Error("[mobx-react-lite] You are trying to use `observer` on a function component wrapped in either another `observer` or `React.memo`. The observer already applies 'React.memo' for you.");
  var r = (n = void 0) !== null && n !== void 0 ? n : !1, i = e, o = e.displayName || e.name;
  if (da && e.$$typeof === da && (r = !0, i = e.render, typeof i != "function"))
    throw new Error("[mobx-react-lite] `render` property of ForwardRef was not a function");
  var s = function(a, l) {
    return Gm(function() {
      return i(a, l);
    }, o);
  };
  return s.displayName = e.displayName, Wm && Object.defineProperty(s, "name", {
    value: e.name,
    writable: !0,
    configurable: !0
  }), e.contextTypes && (s.contextTypes = e.contextTypes, ca.NODE_ENV !== "production" && fa && (fa = !1, console.warn("[mobx-react-lite] Support for Legacy Context in function components will be removed in the next major release."))), r && (s = pt(s)), s = Pi(s), zm(e, s), ca.NODE_ENV !== "production" && Object.defineProperty(s, "contextTypes", {
    set: function() {
      var a, l;
      throw new Error("[mobx-react-lite] `".concat(this.displayName || ((a = this.type) === null || a === void 0 ? void 0 : a.displayName) || ((l = this.type) === null || l === void 0 ? void 0 : l.name) || "Component", ".contextTypes` must be set before applying `observer`."));
    }
  }), s;
}
var Km = {
  $$typeof: !0,
  render: !0,
  compare: !0,
  type: !0,
  // Don't redefine `displayName`,
  // it's defined as getter-setter pair on `memo` (see #3192).
  displayName: !0
};
function zm(e, t) {
  Object.keys(e).forEach(function(n) {
    Km[n] || Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
  });
}
var $i;
Im(Ac);
$i = po.finalizeAllImmediately;
const ho = ({
  id: e,
  children: t
}) => {
  const {
    t: n
  } = qn();
  return /* @__PURE__ */ m("ul", {
    id: e,
    "data-component": "search-suggestion",
    className: "search-suggestion-panel",
    role: "listbox",
    "aria-label": n("search.suggestions.label"),
    tabIndex: "-1",
    children: t
  });
};
ho.propTypes = {
  id: v.string,
  children: v.node.isRequired
};
const vo = ({
  id: e,
  title: t,
  pageUrl: n,
  contentSourceName: r,
  versionName: i,
  variantName: o,
  isFocused: s = !1,
  ...a
}) => {
  const l = [r, i, o].filter(Boolean), u = M(() => co(t, {
    ALLOWED_TAGS: ["em"]
  }), [t]), c = n != null ? "a" : "div", f = Rn();
  return /* @__PURE__ */ m("li", {
    id: e,
    role: "option",
    "aria-selected": s,
    "aria-describedby": f ? "a11y-open-new-tab" : null,
    className: "search-suggestion-option-container",
    ...a,
    children: /* @__PURE__ */ m(c, {
      className: re("search-suggestion-option", "search-suggestion-option--default"),
      href: n,
      target: f ? "_blank" : null,
      tabIndex: -1,
      children: [/* @__PURE__ */ m("span", {
        className: "search-suggestion-option__label",
        dangerouslySetInnerHTML: {
          __html: u
        }
      }), l.length ? /* @__PURE__ */ m("div", {
        className: "search-suggestion-option__info-container",
        children: l.map((p) => /* @__PURE__ */ m("span", {
          className: "search-suggestion-option__info",
          children: p
        }))
      }) : null]
    })
  });
};
vo.propTypes = {
  id: v.string,
  title: v.string,
  pageUrl: v.string,
  contentSourceName: v.string,
  versionName: v.string,
  variantName: v.string,
  isFocused: v.bool
};
const sc = ({
  vpId: e,
  color: t,
  size: n = 20
}) => /* @__PURE__ */ m(_n, {
  vpId: ["magnifier-icon", e].filter(Boolean).join("-"),
  fill: t || "currentColor",
  width: n,
  height: n,
  viewBox: "0 0 16 16",
  children: /* @__PURE__ */ m("path", {
    d: "M7.196 11.6q1.82 0 3.112-1.28Q11.6 9.043 11.6 7.205q0-1.82-1.289-3.112T7.2 2.8q-1.838 0-3.12 1.289Q2.8 5.378 2.8 7.2q0 1.838 1.28 3.12 1.278 1.28 3.116 1.28m.004 1.2a5.4 5.4 0 0 1-2.183-.442 5.8 5.8 0 0 1-1.784-1.2A5.512 5.512 0 0 1 1.6 7.2q0-1.149.442-2.174a5.7 5.7 0 0 1 1.196-1.784 5.6 5.6 0 0 1 1.774-1.2A5.4 5.4 0 0 1 7.198 1.6q1.152 0 2.177.442a5.7 5.7 0 0 1 1.783 1.2q.759.758 1.2 1.78.442 1.023.442 2.179 0 .999-.332 1.89a5.9 5.9 0 0 1-.918 1.626l2.85 2.85-.85.833-2.85-2.833a5.7 5.7 0 0 1-1.615.909A5.4 5.4 0 0 1 7.2 12.8"
  })
});
sc.propTypes = {
  vpId: v.string,
  color: v.string,
  size: v.oneOfType([v.string, v.number])
};
const ac = ({
  vpId: e,
  color: t,
  size: n = 20
}) => /* @__PURE__ */ m(_n, {
  vpId: ["magnifier-icon", e].filter(Boolean).join("-"),
  fill: t || "currentColor",
  width: n,
  height: n,
  viewBox: "0 0 16 16",
  children: [/* @__PURE__ */ m("path", {
    d: "M10.0017 6.93758C8.26716 6.45881 7.93563 6.12539 7.45542 4.38985C7.42295 4.27358 7.31871 4.19492 7.19738 4.19492C7.07604 4.19492 6.9718 4.27529 6.93933 4.38985C6.46083 6.12539 6.1276 6.4571 4.39305 6.93758C4.27684 6.97007 4.19652 7.07437 4.19652 7.19578C4.19652 7.31718 4.27684 7.42148 4.39305 7.45397C6.1276 7.93274 6.45913 8.26617 6.93933 9.99999C6.9718 10.1163 7.07604 10.1949 7.19738 10.1949C7.31871 10.1949 7.42295 10.1146 7.45542 9.99999C7.93392 8.26617 8.26716 7.93274 10.0017 7.45397C10.1179 7.42148 10.1965 7.31718 10.1965 7.19578C10.1965 7.07437 10.1162 6.97007 10.0017 6.93758Z"
  }), /* @__PURE__ */ m("path", {
    d: "M13.8701 3.82844C12.7138 3.50926 12.4927 3.28698 12.1726 2.12995C12.151 2.05244 12.0815 2 12.0006 2C11.9197 2 11.8502 2.05358 11.8285 2.12995C11.5095 3.28698 11.2874 3.50812 10.131 3.82844C10.0535 3.8501 10 3.91964 10 4.00057C10 4.08151 10.0535 4.15104 10.131 4.1727C11.2874 4.49188 11.5084 4.71416 11.8285 5.87005C11.8502 5.94756 11.9197 6 12.0006 6C12.0815 6 12.151 5.94642 12.1726 5.87005C12.4916 4.71416 12.7138 4.49188 13.8701 4.1727C13.9476 4.15104 14 4.08151 14 4.00057C14 3.91964 13.9465 3.8501 13.8701 3.82844Z"
  }), /* @__PURE__ */ m("path", {
    d: "M7.19824 1.59961C7.94604 1.59961 8.65353 1.7411 9.32129 2.02051L8.89551 3.125C8.37531 2.90799 7.81009 2.79983 7.2002 2.7998C5.97449 2.7998 4.93486 3.22983 4.08105 4.08887C3.22724 4.94792 2.7998 5.98496 2.7998 7.2002C2.79985 8.42575 3.22628 9.4656 4.0791 10.3193C4.932 11.1731 5.97096 11.5995 7.19531 11.5996C8.40935 11.5996 9.44748 11.1733 10.3086 10.3203C10.9613 9.67367 11.3647 8.9198 11.5225 8.05957L12.7861 7.58496C12.7515 8.1103 12.6462 8.61231 12.4678 9.09082C12.2463 9.68481 11.9401 10.227 11.5498 10.7168L14.4004 13.5664L13.5498 14.4004L10.7002 11.5664C10.2137 11.9564 9.67502 12.2595 9.08496 12.4756C8.49496 12.6917 7.86677 12.7998 7.2002 12.7998C6.42354 12.7998 5.69586 12.6528 5.01758 12.3584C4.33926 12.064 3.74451 11.6638 3.2334 11.1582C2.72237 10.6527 2.32208 10.0611 2.0332 9.38281C1.74431 8.70441 1.59961 7.976 1.59961 7.19922C1.59966 6.43302 1.74766 5.70853 2.04199 5.02539C2.33644 4.34206 2.73513 3.74702 3.23828 3.24121C3.74136 2.73553 4.33235 2.33518 5.01172 2.04102C5.69118 1.74685 6.42025 1.59964 7.19824 1.59961Z"
  })]
});
ac.propTypes = {
  vpId: v.string,
  color: v.string,
  size: v.oneOfType([v.string, v.number])
};
const lc = pt(({
  form: e,
  value: t,
  label: n,
  pending: r = !1,
  classNames: i,
  onChange: o,
  onBlur: s,
  placeholder: a,
  variant: l,
  children: u,
  ...c
}, f) => {
  var d;
  const {
    t: p
  } = qn();
  return /* @__PURE__ */ m("div", {
    "data-component": "search-input",
    "data-appearance": l,
    className: re("search-input", {
      "search-input--border": l === "border"
    }, i == null ? void 0 : i.root),
    children: [/* @__PURE__ */ m("input", {
      ...c,
      ref: f,
      form: e,
      type: "search",
      autoComplete: "off",
      value: t,
      placeholder: a,
      "aria-label": n,
      className: re("search-input__input", i == null ? void 0 : i.input),
      onChange: o,
      onBlur: s
    }), /* @__PURE__ */ m("div", {
      className: "search-input__slot",
      children: u
    }), /* @__PURE__ */ m("button", {
      type: "submit",
      "aria-label": p("search.submit.label"),
      className: "search-input__submit search-input__icon",
      form: e,
      children: (d = Eo("site")) != null && d.aiSearchEnabled ? /* @__PURE__ */ m(ac, {}) : /* @__PURE__ */ m(sc, {})
    }), /* @__PURE__ */ m(Yo, {
      as: "div",
      className: "search-input__spinner",
      enter: "transition-opacity duration-75 delay-150",
      enterFrom: "opacity-0",
      enterTo: "opacity-100",
      leave: "transition-opacity duration-75",
      leaveFrom: "opacity-100",
      leaveTo: "opacity-0",
      show: r,
      appear: !0
    })]
  });
});
lc.propTypes = {
  form: v.string,
  value: v.string,
  label: v.string,
  pending: v.bool,
  classNames: v.object,
  onChange: v.func,
  onBlur: v.func,
  placeholder: v.string,
  variant: v.string,
  children: v.node
};
const Ym = [de.SUGGESTIONS_FOUND, de.NO_SUGGESTIONS_FOUND, de.INVALID_QUERY], Xm = ts(({
  searchStore: e,
  classNames: t,
  onChange: n
}) => {
  const i = [{
    get name() {
      return $e("search.filter.content.all");
    },
    id: null
  }, ...e.contentSources], o = e.selectedContentSource ?? i[0], s = (a) => {
    e.setContentSourceFilter(a.id), typeof n == "function" && n(a);
  };
  return /* @__PURE__ */ m(Jo, {
    vpId: "search-bar-content-source-filter",
    variant: Ir.SEARCH_BAR,
    items: i,
    value: o,
    getId: ({
      id: a
    } = {}) => a,
    getLabel: ({
      name: a
    } = {}) => a,
    onChange: s,
    classNames: t
  });
}), Qm = ts(({
  id: e,
  searchStore: t
}) => {
  var s, a;
  const n = t.suggestions.filter(({
    type: l
  }) => l === "suggestion"), r = t.suggestions.filter(({
    type: l
  }) => l === "cta"), i = t.suggestions.filter(({
    type: l
  }) => l === "tool"), o = t.suggestions.filter(({
    type: l
  }) => l === void 0);
  return ((s = t.activeTool) == null ? void 0 : s.id) === "ai-search" ? /* @__PURE__ */ m(ho, {
    id: e,
    children: /* @__PURE__ */ m("k15t-ai-search", {
      query: t.query,
      contentsource: (a = t.selectedContentSource) == null ? void 0 : a.id,
      version: t.selectedVersion,
      variant: t.selectedVariant,
      style: {
        "--border-width": 0
      }
    }, "")
  }) : /* @__PURE__ */ m(ho, {
    id: e,
    children: [i.length ? /* @__PURE__ */ m(ce, {
      children: [/* @__PURE__ */ m("div", {
        className: "search-suggestion-tools-container",
        children: i.map(({
          id: l,
          focused: u,
          title: c,
          query: f,
          action: p,
          icon: d = () => {
          }
        }) => /* @__PURE__ */ m("li", {
          role: "option",
          "aria-selected": u,
          className: "search-suggestion-option search-suggestion-option--default search-suggestion-tools-option",
          children: /* @__PURE__ */ m("button", {
            type: "button",
            id: l,
            tabIndex: "-1",
            className: re("search-suggestion-tools-item"),
            onClick: () => p(l),
            children: [/* @__PURE__ */ m("span", {
              role: "img",
              "aria-hidden": "true",
              dangerouslySetInnerHTML: {
                __html: d
              }
            }), /* @__PURE__ */ m("span", {
              children: [/* @__PURE__ */ m("b", {
                className: "title",
                children: c
              }), ": ", /* @__PURE__ */ m("span", {
                className: "query",
                children: f
              })]
            })]
          }, l)
        }))
      }), /* @__PURE__ */ m("p", {
        style: {
          textAlign: "left",
          marginLeft: "16px",
          marginBottom: "10px",
          marginTop: "10px",
          fontSize: "14px",
          color: "var(--K15t-foreground-subtle)"
        },
        children: $e("search.results.label")
      })]
    }) : null, n.map(({
      id: l,
      focused: u,
      title: c,
      url: f,
      contentSourceName: p,
      versionName: d,
      variantName: h
    }) => /* @__PURE__ */ m(vo, {
      id: l,
      isFocused: u,
      title: c,
      pageUrl: f,
      contentSourceName: p,
      versionName: d,
      variantName: h
    }, l)), o.map(({
      id: l,
      title: u,
      url: c
    }) => /* @__PURE__ */ m(vo, {
      id: l,
      title: u,
      pageUrl: c,
      isFocused: !1
    }, l)), r.length ? /* @__PURE__ */ m("li", {
      className: "search-suggestion-action-container",
      children: r.map(({
        id: l,
        focused: u,
        title: c,
        url: f
      }) => /* @__PURE__ */ m("a", {
        id: l,
        role: "option",
        "aria-selected": u,
        href: f,
        rel: "noopener",
        tabIndex: "-1",
        className: "search-suggestion-action button button--secondary",
        children: c
      }, l))
    }) : null]
  });
}), uc = pt(({
  vpId: e,
  label: t,
  searchStore: n,
  noContentSourceFilter: r = !1,
  noSuggestions: i = !1,
  autoFocus: o = !1,
  form: s,
  variant: a,
  inputVariant: l,
  defaultValue: u,
  name: c
}, f) => {
  var L, $;
  const p = C(null), d = i ? null : Ym.includes(n.suggestionsState) || Array.isArray(n.suggestions) && n.suggestions.length >= 1;
  Fp({
    ref: p,
    onInteractOutside: () => {
      d && n.clearSuggestions();
    },
    isDisabled: !((L = p == null ? void 0 : p.current) != null && L.contains(document.activeElement))
  });
  const [h, g] = B((n == null ? void 0 : n.query) ?? u ?? "");
  n && n.query !== h && g(n.query);
  const b = q((T) => {
    T.preventDefault();
    const {
      value: S
    } = T.target;
    g(S), n && n.query !== S && n.input(S, {
      fetchSuggestions: i === !1
    });
  }, [n, i]), {
    keyboardProps: E
  } = Pp({
    onKeyDown: (T) => {
      switch (T.nativeEvent.code) {
        case "ArrowDown": {
          T.preventDefault(), n.focusNextSuggestion();
          break;
        }
        case "ArrowUp": {
          T.preventDefault(), n.focusPreviousSuggestion();
          break;
        }
        case "Escape": {
          T.preventDefault(), n.clearSuggestions();
          break;
        }
      }
    }
  }), _ = M(() => `suggestion-${yo()}`, []), y = ($ = n == null ? void 0 : n.suggestions.find(({
    focused: T
  }) => T)) == null ? void 0 : $.id, w = i ? {} : {
    ...E,
    role: "combobox",
    "aria-controls": _,
    "aria-expanded": d,
    "aria-autocomplete": "list",
    "aria-activedescendant": y
  }, x = Zo(Qo.isMediumDeviceDownMediaQuery), N = !r && !x, D = C(null);
  return _a(f, () => ({
    focus() {
      var T;
      (T = D.current) == null || T.focus();
    },
    blur() {
      var T;
      (T = D.current) == null || T.blur();
    }
  }), []), /* @__PURE__ */ m("div", {
    "data-id": e,
    "data-component": "search-bar",
    "data-appearance": a,
    className: re("search-bar", {
      "has-suggestions": !i,
      "has-filter": N
    }),
    ref: p,
    children: [/* @__PURE__ */ m("div", {
      className: "search-bar__input-container",
      children: /* @__PURE__ */ m(lc, {
        ...w,
        ref: D,
        form: s,
        autoFocus: o,
        value: h,
        required: !0,
        variant: l,
        label: t ?? $e("search.label"),
        name: c,
        pending: n ? n.pending : !1,
        classNames: {
          input: {
            "!rounded-r-none": N
          }
        },
        onChange: b,
        onFocus: b,
        children: N ? /* @__PURE__ */ m(Xm, {
          searchStore: n
        }) : null
      })
    }), i || !d ? null : /* @__PURE__ */ m(Qm, {
      id: _,
      expanded: d,
      searchStore: n
    })]
  });
});
uc.propTypes = {
  vpId: v.string,
  label: v.string,
  searchStore: v.instanceOf(vn),
  noContentSourceFilter: v.bool,
  noSuggestions: v.bool,
  autoFocus: v.bool,
  form: v.string,
  variant: v.string,
  inputVariant: v.string,
  defaultValue: v.string,
  name: v.string
};
const cc = ts(uc), fc = pt((e, t) => {
  const n = C(null), {
    children: r,
    variant: i = "default",
    className: o,
    ariaLabel: s,
    ariaHidden: a,
    tabIndex: l,
    onClick: u,
    ...c
  } = e;
  return _a(t, () => ({
    focus() {
      n.current.focus();
    }
  })), /* @__PURE__ */ m("button", {
    type: "button",
    className: re("button", {
      "button--primary": i === "primary",
      "button--secondary": i === "secondary"
    }, o),
    ...c,
    onClick: u,
    "aria-label": s,
    "aria-hidden": a,
    tabIndex: l,
    ref: n,
    children: r
  });
});
fc.propTypes = {
  children: v.node.isRequired,
  variant: v.oneOf(["primary", "secondary"]),
  className: v.string,
  ariaLabel: v.string,
  ariaHidden: v.string,
  tabIndex: v.number
};
const dc = ({
  vpId: e,
  color: t = "currentColor",
  size: n = 20
}) => /* @__PURE__ */ m(_n, {
  vpId: ["filter-icon", e].filter(Boolean).join("-"),
  fill: "none",
  width: n,
  height: n,
  viewBox: "0 -960 960 960",
  children: /* @__PURE__ */ m("path", {
    fill: t,
    d: "M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z"
  })
});
dc.propTypes = {
  vpId: v.string,
  color: v.string,
  size: v.oneOfType([v.string, v.number])
};
const Zm = (e, t) => {
  try {
    const n = new URL(e);
    return ["http:", "https:"].includes(n.protocol) && n.origin === t;
  } catch {
    return !1;
  }
}, Jm = (e) => {
  let t = "";
  if (e != null && e.length) {
    let n = null;
    try {
      n = decodeURIComponent(e);
    } catch {
    }
    n && Zm(n, self.location.origin) && (t = n);
  }
  return t;
}, nn = "search-form", ns = () => window.scrollTo({
  top: 0
}), eb = (e) => e.focus(), ha = (e, t, {
  disabled: n,
  onClick: r
}) => !Array.isArray(e) || !e.length ? null : /* @__PURE__ */ m("fieldset", {
  "data-id": "search-page-vertical-filter",
  disabled: n,
  className: "filter-vertical",
  children: [/* @__PURE__ */ m("legend", {
    className: "sr-only",
    children: /* @__PURE__ */ m(qe, {
      i18nKey: "search.filter.label"
    })
  }), e.map((i) => /* @__PURE__ */ m("div", {
    hidden: i.items.length <= 1,
    children: /* @__PURE__ */ m(zu, {
      id: i.id,
      summary: i.label,
      name: i.name,
      value: i.items.find(({
        active: o
      }) => o),
      items: i.items,
      form: nn,
      getLabel: ({
        name: o
      } = {}) => o,
      getId: ({
        value: o
      } = {}) => o,
      onChange: (o) => {
        ns(), typeof r == "function" && r(o);
      }
    })
  }, i.id))]
}), tb = (e, t, {
  disabled: n
}) => !Array.isArray(e) || !e.length ? null : /* @__PURE__ */ m("fieldset", {
  "data-id": "search-page-horizontal-filter",
  disabled: n,
  className: "search-page__filter-horizontal hidden lg:flex flex flex-row gap-4 p-0 m-0 border-0",
  children: [/* @__PURE__ */ m("legend", {
    className: "sr-only",
    children: /* @__PURE__ */ m(qe, {
      i18nKey: "search.filter.label"
    })
  }), e.map((r) => /* @__PURE__ */ m("div", {
    hidden: r.items.length <= 1,
    children: /* @__PURE__ */ m(ec, {
      id: r.id,
      label: r.label,
      name: r.name,
      value: r.items.find(({
        active: i
      }) => i),
      items: r.items,
      form: nn,
      getLabel: ({
        name: i
      } = {}) => i,
      getId: ({
        value: i
      } = {}) => i,
      onChange: () => ns()
    })
  }, r.id))]
}), nb = (e) => Array.isArray(e) ? e.flatMap(({
  name: t,
  items: n
}) => n.filter(({
  active: r
}) => r === !0).map(({
  ...r
}) => ({
  ...r,
  filterName: t
}))) : [], Li = Rn(), pc = ({
  filterLayout: e
}) => {
  var L, $, T;
  const t = C(null), n = C(null), [r, i] = B(!1), o = C(null), {
    state: s,
    results: a,
    total: l,
    status: u,
    pagination: c,
    filter: f
  } = Cm(t), p = vm(u), d = nb(f), h = Zo(Qo.isMediumDeviceDownMediaQuery), g = u === "success" || p === "success" && u === "pending", b = d.some(({
    value: S
  }) => S.length), E = h && b, _ = s[P.QUERY], y = Jm(s[P.REFERRER]), {
    t: w
  } = qn();
  K(() => {
    document.title = [_, w("search.label"), document.title].filter(Boolean).join(" — ");
  }, [w, _]);
  const x = Li && y.length, N = g || E, D = C(null);
  return /* @__PURE__ */ m(ce, {
    children: [/* @__PURE__ */ m(es, {
      id: nn,
      ref: t,
      onSubmit: () => {
        var S;
        (S = n.current) == null || S.blur();
      },
      children: [tp.map(({
        name: S,
        defaultValue: V
      }) => /* @__PURE__ */ m("input", {
        type: "hidden",
        name: S,
        value: s[S] ?? V
      }, S)), /* @__PURE__ */ m("input", {
        type: "hidden",
        name: P.LANGUAGE,
        value: document.documentElement.lang
      }, P.LANGUAGE)]
    }), /* @__PURE__ */ m("search", {
      id: "content",
      tabindex: "-1",
      className: "search-page",
      children: [/* @__PURE__ */ m("div", {
        className: "search-page__search-bar search-bar-container",
        children: [/* @__PURE__ */ m(cc, {
          vpId: "search-page-search-bar",
          form: nn,
          variant: "large",
          inputVariant: "border",
          name: P.QUERY,
          defaultValue: _ ?? "",
          noSuggestions: !0,
          noContentSourceFilter: !0,
          ref: n
        }), !Li && h && f.some(({
          items: S
        }) => S.length > 1) ? /* @__PURE__ */ m(fc, {
          variant: "secondary",
          onClick: () => {
            i(!0), o.current.showModal();
          },
          ariaLabel: w("search.filter.open.label"),
          "aria-controls": (L = o.current) == null ? void 0 : L.id,
          "aria-expanded": r,
          "aria-haspopup": "dialog",
          children: /* @__PURE__ */ m(dc, {
            vpId: "filter-icon"
          })
        }) : null]
      }), /* @__PURE__ */ m("div", {
        className: "search-page__subgrid",
        children: [e === Ar.HORIZONTAL && !h && tb(f, s, {
          disabled: r
        }), /* @__PURE__ */ m("hr", {
          className: "search-page__hr"
        }), e === Ar.VERTICAL && !h && /* @__PURE__ */ m("div", {
          className: "search-page__aside search-page__filter-vertical",
          children: ha(f, s, {
            disabled: r
          })
        }), /* @__PURE__ */ m("div", {
          ref: D,
          tabIndex: "-1",
          "data-id": "search-page-main",
          className: "search-page__main",
          children: [/* @__PURE__ */ m("p", {
            role: "status",
            className: "sr-only",
            children: u === "pending" ? w("search.event.pending.label") : null
          }), ($ = Eo("site")) != null && $.aiSearchEnabled ? /* @__PURE__ */ m("k15t-ai-search", {
            query: _,
            mode: "manual",
            contentsource: s[P.CONTENT_SOURCE],
            version: s[P.VERSION],
            variant: s[P.VARIANT]
          }) : null, /* @__PURE__ */ m("div", {
            className: "search-page__main-inner",
            inert: u === "pending" ? "true" : void 0,
            children: [/* @__PURE__ */ m("div", {
              style: {
                position: "absolute",
                inset: 0,
                pointerEvents: "none"
              },
              children: /* @__PURE__ */ m(Yo, {
                show: u === "pending",
                appear: !0,
                enter: "transition-opacity duration-75 delay-150",
                enterFrom: "opacity-0",
                enterTo: "opacity-100",
                leave: "transition-opacity duration-75",
                leaveFrom: "opacity-100",
                leaveTo: "opacity-0",
                children: /* @__PURE__ */ m($u, {
                  as: H.Fragment,
                  children: /* @__PURE__ */ m("div", {
                    className: "search-page__loading",
                    children: /* @__PURE__ */ m(ic, {
                      noBackground: !0,
                      noColor: !0
                    })
                  })
                })
              })
            }), /* @__PURE__ */ m("div", {
              className: re("search-page__results-header", {
                "search-page__results-header--hidden": !x && !N
              }),
              children: [x ? /* @__PURE__ */ m("a", {
                className: "m-0 search-results__go-back-button flex-shrink-0 flex items-center gap-2",
                href: y,
                children: [/* @__PURE__ */ m("svg", {
                  "aria-hidden": "true",
                  width: "12",
                  height: "12",
                  viewBox: "0 0 12 12",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /* @__PURE__ */ m("path", {
                    d: "M5.99989 11.5554L0.444336 5.99989L5.99989 0.444336L6.98947 1.41656L3.10059 5.30545H11.5554V6.69434H3.10059L6.98947 10.5832L5.99989 11.5554Z",
                    fill: "#1C1B1F"
                  })
                }), /* @__PURE__ */ m(qe, {
                  i18nKey: "inAppHelp.search.back.label"
                })]
              }) : null, N && g ? /* @__PURE__ */ m("p", {
                role: "status",
                className: "m-0 search-results__results__label flex-shrink-0",
                children: /* @__PURE__ */ m(qe, {
                  i18nKey: "search.results.found.label",
                  values: {
                    count: l
                  }
                })
              }) : null, !x && g && E ? /* @__PURE__ */ m("fieldset", {
                role: "log",
                "data-id": "search-page-filter-pills",
                className: "m-0 p-0 border-none",
                disabled: r,
                children: [/* @__PURE__ */ m("label", {
                  className: "sr-only",
                  children: /* @__PURE__ */ m(qe, {
                    i18nKey: "search.filter.active.label"
                  })
                }), /* @__PURE__ */ m("ul", {
                  className: "list-none m-0 p-0 flex flex-wrap gap-2",
                  children: d.map(({
                    filterName: S,
                    name: V,
                    value: G,
                    total: W
                  }) => /* @__PURE__ */ m("li", {
                    hidden: W <= 1 || G.length === 0,
                    children: /* @__PURE__ */ m(nc, {
                      form: nn,
                      name: S,
                      value: G,
                      label: V
                    })
                  }, S))
                })]
              }) : null]
            }), u === "nothing_found" && /* @__PURE__ */ m("div", {
              role: "log",
              children: [/* @__PURE__ */ m("p", {
                className: "mb-4",
                children: /* @__PURE__ */ m(qe, {
                  i18nKey: "search.results.nothing.label"
                })
              }), /* @__PURE__ */ m(qe, {
                i18nKey: "search.results.nothing.description"
              })]
            }), u === "failure" && /* @__PURE__ */ m("div", {
              role: "log",
              children: [/* @__PURE__ */ m("p", {
                className: "mb-4",
                children: /* @__PURE__ */ m(qe, {
                  i18nKey: "search.error.general.label"
                })
              }), /* @__PURE__ */ m(qe, {
                i18nKey: "search.error.general.description"
              })]
            }), (u === "success" || p === "success" && u === "pending") && (a.length ? /* @__PURE__ */ m("ul", {
              "aria-label": w("search.results.label"),
              "data-id": "search-page-results",
              className: "contents m-0 p-0 list-none",
              children: a.map((S, V) => /* @__PURE__ */ m("li", {
                "aria-label": w("search.results.item.label", {
                  index: V + 1
                }),
                children: /* @__PURE__ */ m(rc, {
                  url: S.url,
                  description: S.description,
                  title: S.title,
                  labels: [S.versionName, S.variantName].filter(Boolean),
                  contentSource: S.contentSourceName,
                  openInNewTab: Li
                })
              }, S.url))
            }) : null)]
          })]
        })]
      }), (u === "success" || p === "success" && u === "pending") && c.pages.length > 1 && /* @__PURE__ */ m(ce, {
        children: [/* @__PURE__ */ m("hr", {
          className: "search-page__hr"
        }), /* @__PURE__ */ m("div", {
          className: "search-page__pagination",
          children: /* @__PURE__ */ m(Bu, {
            vpId: "search-page-pagination",
            form: nn,
            pages: c.pages,
            nextPage: c.next,
            prevPage: c.prev,
            onClick: () => {
              ns(), eb(D.current);
            }
          })
        })]
      })]
    }), h && Array.isArray(f) && f.length ? /* @__PURE__ */ m("dialog", {
      ref: o,
      id: "search-page-filter-mobile-dialog",
      class: "drawer",
      children: [/* @__PURE__ */ m("header", {
        class: "flex justify-end p-4",
        children: /* @__PURE__ */ m("button", {
          type: "button",
          className: "close-button drawer-toggle",
          "aria-label": w("search.filter.close.label"),
          "aria-controls": (T = o.current) == null ? void 0 : T.id,
          "aria-expanded": r,
          "aria-haspopup": "dialog",
          onClick: () => {
            i(!1), o.current.close();
          },
          children: /* @__PURE__ */ m("span", {
            "aria-hidden": "true",
            children: "×"
          })
        })
      }), /* @__PURE__ */ m("div", {
        className: "px-4",
        children: ha(f, s, {
          disabled: !r
        })
      })]
    }) : null]
  });
};
pc.propTypes = {
  filterLayout: v.string.isRequired
};
const hc = ({
  store: e,
  filterLayout: t
}) => /* @__PURE__ */ m(Lo, {
  store: e,
  children: /* @__PURE__ */ m(pc, {
    filterLayout: t
  })
});
hc.propTypes = {
  store: v.instanceOf(vn),
  filterLayout: v.oneOf([Ar.VERTICAL, Ar.HORIZONTAL]).isRequired
};
var Un, Fr, vc;
class rb extends HTMLElement {
  constructor() {
    super(...arguments);
    Ce(this, Fr);
    Ce(this, Un);
  }
  connectedCallback() {
    (async () => {
      await On(this, Fr, vc).call(this);
      const n = this.getAttribute("layout");
      ya(Ie(hc, {
        store: be(this, Un),
        filterLayout: n ?? "horizontal"
      }), this);
    })();
  }
}
Un = new WeakMap(), Fr = new WeakSet(), vc = async function() {
  lt(this, Un, new vn({
    searchService: new Al({
      lang: document.documentElement.lang
    }),
    contentSources: _o(),
    context: Oa()
  }));
};
customElements.define("search-page", rb);
const gc = ({
  store: e,
  ...t
}) => /* @__PURE__ */ m(Lo, {
  store: e,
  children: /* @__PURE__ */ m(ib, {
    ...t
  })
});
gc.propTypes = {
  store: v.instanceOf(vn).isRequired
};
const mc = ({
  variant: e,
  hasQuickSearch: t = !1,
  hasContentSourceFilter: n = !1
}, r) => {
  const i = Vu(), o = C();
  return /* @__PURE__ */ m(es, {
    ref: o,
    onSubmit: (a) => {
      a.preventDefault(), i.submit();
    },
    className: "flex w-full justify-center",
    children: /* @__PURE__ */ m(cc, {
      ref: r,
      searchStore: i,
      variant: e,
      noSuggestions: !t,
      noContentSourceFilter: i.contentSources.length <= 1 || !n
    })
  });
};
mc.propTypes = {
  variant: v.string,
  hasQuickSearch: v.bool,
  hasContentSourceFilter: v.bool
};
const ib = pt(mc);
var Hn, Mr, bc;
class ob extends HTMLElement {
  constructor() {
    super(...arguments);
    Ce(this, Mr);
    Ce(this, Hn);
  }
  connectedCallback() {
    (async () => {
      await On(this, Mr, bc).call(this);
      const n = this.hasAttribute("quicksearch"), r = this.hasAttribute("contentsourcefilter"), i = this.getAttribute("variant");
      ya(Ie(gc, {
        store: be(this, Hn),
        hasQuickSearch: n,
        hasContentSourceFilter: r,
        variant: i
      }), this);
    })();
  }
}
Hn = new WeakMap(), Mr = new WeakSet(), bc = async function() {
  lt(this, Hn, new vn({
    searchService: new Al({
      lang: document.documentElement.lang
    }),
    contentSources: _o(),
    context: Oa()
  }));
};
customElements.define("search-bar", ob);
