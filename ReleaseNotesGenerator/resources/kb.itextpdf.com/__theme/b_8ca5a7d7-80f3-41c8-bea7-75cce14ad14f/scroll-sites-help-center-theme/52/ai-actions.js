var F = (i) => {
  throw TypeError(i);
};
var z = (i, s, t) => s.has(i) || F("Cannot " + t);
var n = (i, s, t) => (z(i, s, "read from private field"), t ? t.call(i) : s.get(i)), u = (i, s, t) => s.has(i) ? F("Cannot add the same private member more than once") : s instanceof WeakSet ? s.add(i) : s.set(i, t), h = (i, s, t, e) => (z(i, s, "write to private field"), e ? e.call(i, t) : s.set(i, t), t), r = (i, s, t) => (z(i, s, "access private method"), t);
import { o as f, x as m, E as Z, B as nt } from "./unsafe-html-B1yMZI_M.js";
import { t as v } from "./i18n-DKG4M0Tj.js";
function Y(i) {
  const s = new URL(i, location.origin);
  return s.pathname = `${s.pathname}.md`, s;
}
async function it(i) {
  const s = Y(i), t = await fetch(s);
  if (!t.ok)
    throw new Error(`Failed to fetch: ${t.statusText}`);
  const e = t.headers.get("Content-Type");
  if (!(e != null && e.includes("text/markdown")))
    throw new Error("Response is not a text/markdown file.");
  return t.text();
}
async function st(i) {
  const {
    marked: s
  } = await import("./marked.esm-CtDyvN5z.js"), {
    default: t
  } = await import("./purify.es-Q3IQ-fe5.js");
  return s.use({
    hooks: {
      postprocess: (e) => t.sanitize(e)
    }
  }), s.parse(i);
}
async function rt(i) {
  if (!(navigator != null && navigator.clipboard))
    throw new Error("Clipboard API is not available.");
  if (typeof i == "string")
    return await navigator.clipboard.writeText(i);
  const s = {};
  for (const [e, o] of Object.entries(i))
    s[e] = Promise.resolve(o).then((l) => new Blob([l], {
      type: e
    }));
  const t = new ClipboardItem(s);
  await navigator.clipboard.write([t]);
}
const ot = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" data-component="icon" class="icon">
	<path d="M6.039 11.667q-.505 0-.856-.35a1.16 1.16 0 0 1-.35-.855v-7.59q0-.506.35-.855.35-.35.856-.35h5.59q.504 0 .854.35t.35.855v7.59q0 .504-.35.855-.35.35-.855.35zm0-1h5.59a.2.2 0 0 0 .14-.064.2.2 0 0 0 .064-.141v-7.59a.2.2 0 0 0-.064-.141.2.2 0 0 0-.14-.064h-5.59a.2.2 0 0 0-.141.064.2.2 0 0 0-.065.14v7.59q0 .078.064.142t.141.064M3.705 14q-.505 0-.855-.35a1.16 1.16 0 0 1-.35-.855v-8.59h1v8.59q0 .077.064.14.064.066.141.065h6.59v1zM6.77 8.564h.795v-3h.872v2h.795v-2h.871v3h.795V5.36a.57.57 0 0 0-.169-.42.57.57 0 0 0-.42-.17H7.359a.57.57 0 0 0-.42.17.57.57 0 0 0-.17.42z"/>
</svg>
`, at = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" data-component="icon" class="icon">
	<style>
		circle {
			animation-iteration-count: infinite;
			animation-duration: 860ms;
			animation-name: bouncy;
		}

		circle:nth-of-type(1) {
			animation-delay: -200ms;
		}

		circle:nth-of-type(2) {
			animation-delay: -100ms;
		}

		@keyframes bouncy {
			0% {
				animation-timing-function: ease-in;
				transform: translateY(0);
			}

			50% {
				animation-timing-function: ease-out;
				transform: translateY(35%);
			}
		}
	</style>
	<circle cx="3.5" cy="5" r="1.5" />
	<circle cx="8" cy="5" r="1.5" />
	<circle cx="12.5" cy="5" r="1.5" />
</svg>
`, ct = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" data-component="icon" class="icon">
	<path d="m8.8 15.9-4.2-4.2-1.4 1.4 5.6 5.6 12-12-1.4-1.4z"/>
</svg>
`, lt = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" data-component="icon" class="icon">
	<path d="M8 1.333A6.67 6.67 0 0 0 1.334 8 6.67 6.67 0 0 0 8 14.667 6.67 6.67 0 0 0 14.667 8 6.67 6.67 0 0 0 8 1.333m.667 10H7.334V10h1.333zm0-2.666H7.334v-4h1.333z"/>
</svg>
`, ht = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" data-component="icon" class="icon">
	<path d="m10.667 9.898 1.852-1.853-.552-.57-.903.897v-2.27h-.795v2.27l-.902-.896-.553.569zM2.872 13q-.505 0-.855-.35a1.16 1.16 0 0 1-.35-.855v-7.59q0-.505.35-.855T2.872 3h10.256q.505 0 .855.35t.35.855v7.59q0 .505-.35.855t-.855.35zm0-1h10.256a.2.2 0 0 0 .141-.064.2.2 0 0 0 .064-.141v-7.59a.2.2 0 0 0-.064-.14.2.2 0 0 0-.14-.065H2.871a.2.2 0 0 0-.141.064.2.2 0 0 0-.064.141v7.59q0 .077.064.14.064.066.14.065m.897-2.102h.795v-3h.872v2h.795v-2h.871v3h.795V6.667a.55.55 0 0 0-.564-.564h-3a.55.55 0 0 0-.564.564z"/>
</svg>
`, dt = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" data-component="icon" class="icon">
	<path d="M6.447 6.143V4.888c0-.106.04-.185.132-.238l2.524-1.453c.344-.199.754-.291 1.176-.291 1.586 0 2.59 1.229 2.59 2.537 0 .092 0 .198-.013.304l-2.617-1.533a.44.44 0 0 0-.475 0zm5.894 4.89v-3a.44.44 0 0 0-.238-.41L8.667 5.668l1.202-.594a.24.24 0 0 1 .265 0l2.524 1.454c.727.422 1.216 1.321 1.216 2.193 0 1.005-.595 1.93-1.533 2.313M5.668 8.39l-1.084-.634a.25.25 0 0 1-.132-.238V4.61c0-1.413 1.083-2.484 2.55-2.484.556 0 1.07.185 1.507.516L5.905 4.148a.44.44 0 0 0-.237.41zM8 9.738l-1.553-.873v-1.85L8 6.143l1.553.872v1.85zm.998 4.016c-.556 0-1.07-.184-1.507-.515l2.603-1.506a.44.44 0 0 0 .238-.41v-3.83l1.097.632c.093.053.132.133.132.238v2.908c0 1.413-1.097 2.483-2.563 2.483m-3.132-2.946L3.333 9.333c-.726-.423-1.207-1.3-1.207-2.172a2.49 2.49 0 0 1 1.546-2.313v3.013c0 .185.08.317.238.41l3.304 1.916-1.084.621a.24.24 0 0 1-.264 0m-.146 2.167c-1.493 0-2.59-1.123-2.59-2.51 0-.106.014-.212.027-.317l2.603 1.505a.44.44 0 0 0 .475 0L9.552 9.78v1.214c0 .106-.039.185-.132.238l-2.523 1.453c-.344.199-.754.29-1.177.29m3.278 1.572a3.304 3.304 0 0 0 3.237-2.642c1.48-.383 2.432-1.772 2.432-3.185 0-.925-.396-1.823-1.11-2.471.066-.278.105-.555.105-.832a3.296 3.296 0 0 0-4.348-3.132 3.3 3.3 0 0 0-2.311-.952 3.304 3.304 0 0 0-3.238 2.643c-1.48.383-2.432 1.771-2.432 3.185a3.34 3.34 0 0 0 1.11 2.471 3.6 3.6 0 0 0-.105.833 3.296 3.296 0 0 0 4.347 3.132 3.3 3.3 0 0 0 2.313.951"/>
</svg>
`, ut = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" data-component="icon" class="icon">
	<path d="m3.95 10.197 2.622-1.47.044-.128-.044-.071h-.128L6.006 8.5l-1.5-.04-1.299-.054-1.259-.068-.317-.067-.298-.392.03-.196.268-.178.38.033.845.058 1.266.087.917.054L6.4 7.88h.216l.03-.087-.074-.055-.057-.054-1.31-.886-1.418-.938-.742-.54-.402-.273-.202-.257-.088-.56.364-.4.49.033.125.034.496.38 1.06.82 1.384 1.019.202.169.081-.057.01-.04-.09-.153-.753-1.359-.898-1.248-.49-.761-.116-.272c-.036-.132.118-.592.115-.728l.49-.26.23-.074.554.075.233.202.344.785.557 1.239.864 1.683.253.499.135.462.05.142h.089v-.081l.07-.948.132-1.164.128-1.497.045-.422.209-.506.415-.273.324.155.267.38-.038.248-.158 1.028-.311 1.613-.202 1.079h.118l.135-.135.547-.725.918-1.147.405-.456.472-.502.304-.24h.574l.422.628-.188.648-.592.748-.49.634-.701.945-.44.755.041.062.105-.012 1.586-.336.858-.156 1.023-.175.462.216.05.22-.181.448-1.094.27-1.283.256-1.91.452-.024.017.027.033.86.082.369.02h.9l1.678.125.44.29.263.354-.044.27-.675.344-.911-.216-2.128-.506-.728-.183h-.101v.062l.607.593L11.8 10.72 13.333 12v.333l-.181.229h-.254l-1.225-.921-.473-.415-1.07-.9h-.071v.095l.247.36 1.302 1.956.068.6-.094.196-.338.119-.371-.068-.763-1.07-.787-1.203-.635-1.08-.077.044-.375 4.03-.175.206-.405.156-.338-.256-.179-.415.18-.82.215-1.07.175-.85.16-1.055.094-.351-.007-.023-.078.01-.796 1.092-1.211 1.636-.96 1.026-.23.09-.398-.205.038-.368.222-.327 1.327-1.687.8-1.045.517-.604-.004-.087h-.03l-3.524 2.286-.628.082-.27-.254.033-.414.129-.135 1.06-.73z"/>
</svg>
`;
function pt() {
  const i = Y(location.pathname), s = encodeURIComponent(v("aiActions.prompt", {
    url: i.href,
    interpolation: {
      escapeValue: !1
    }
  }));
  return [{
    id: "copy-as-markdown",
    label: {
      idle: v("aiActions.copyAsMarkdown.label.idle"),
      pending: v("aiActions.copyAsMarkdown.label.pending"),
      success: v("aiActions.copyAsMarkdown.label.success"),
      error: v("aiActions.copyAsMarkdown.label.error")
    },
    desc: {
      idle: v("aiActions.copyAsMarkdown.description.idle"),
      error: v("aiActions.copyAsMarkdown.description.error")
    },
    icon: {
      idle: m`${f(ot)}`,
      pending: m`${f(at)}`,
      success: m`${f(ct)}`,
      error: m`${f(lt)}`
    },
    action: mt
  }, {
    id: "view-as-markdown",
    label: v("aiActions.viewAsMarkdown.label"),
    desc: v("aiActions.viewAsMarkdown.description"),
    icon: m`${f(ht)}`,
    url: i
  }, {
    separator: !0
  }, {
    id: "open-in-chatgpt",
    label: v("aiActions.openInChatGPT.label"),
    desc: v("aiActions.openInChatGPT.description"),
    icon: m`${f(dt)}`,
    url: `https://chat.openai.com/?q=${s}`
  }, {
    id: "open-in-claude",
    label: v("aiActions.openInClaude.label"),
    desc: v("aiActions.openInClaude.description"),
    icon: m`${f(ut)}`,
    url: `https://claude.ai/new?q=${s}`
  }];
}
async function mt() {
  const i = it(location.pathname), s = i.then((t) => st(t));
  await rt({
    "text/html": s,
    "text/plain": i
  });
}
var C;
class P extends HTMLElement {
  constructor() {
    super();
    /** @type {ElementInternals} */
    u(this, C);
    h(this, C, this.attachInternals()), n(this, C).role = "menuitem";
  }
  static get observedAttributes() {
    return ["disabled"];
  }
  connectedCallback() {
    this.id || (this.id = `menuitem-${crypto.randomUUID()}`);
  }
  /**
   * @param {string} name
   * @param {string|null} oldVal
   * @param {string|null} newVal
   */
  attributeChangedCallback(t, e, o) {
    if (t === "disabled") {
      const l = o !== null;
      n(this, C).ariaDisabled = l ? "true" : "false";
    }
  }
  /**
   * @public
   * @returns {boolean}
   */
  get disabled() {
    return this.hasAttribute("disabled");
  }
  /**
   * @public
   * @param {boolean} value
   */
  set disabled(t) {
    this.toggleAttribute("disabled", !!t);
  }
  /**
   * @public
   * @returns {string}
   */
  get value() {
    var t;
    return this.getAttribute("value") || ((t = this.textContent) == null ? void 0 : t.trim()) || "";
  }
}
C = new WeakMap();
customElements.define("theme-menu-item", P);
var k, D, b, c, B, L, U, G, V, j;
class vt extends HTMLElement {
  constructor() {
    super();
    u(this, c);
    /** @type {AbortController | null} */
    u(this, k, null);
    /** @type {ElementInternals} */
    u(this, D);
    /** @type {number} */
    u(this, b, -1);
    h(this, D, this.attachInternals()), n(this, D).role = "menu";
  }
  connectedCallback() {
    this.setAttribute("tabindex", "-1"), h(this, k, new AbortController());
    const {
      signal: t
    } = n(this, k);
    this.addEventListener("keydown", r(this, c, j).bind(this), {
      signal: t
    }), this.addEventListener("click", r(this, c, V).bind(this), {
      signal: t
    }), this.addEventListener("pointermove", r(this, c, G).bind(this), {
      signal: t
    });
  }
  disconnectedCallback() {
    var t;
    (t = n(this, k)) == null || t.abort(), h(this, k, null);
  }
  /**
   * @public
   * @returns {MenuItem[]}
   */
  get items() {
    return Array.from(this.querySelectorAll("theme-menu-item"));
  }
  /** @public */
  setActiveFirst() {
    r(this, c, L).call(this, 0);
  }
  /** @public */
  setActiveLast() {
    r(this, c, L).call(this, this.items.length - 1);
  }
  /** @public */
  resetActive() {
    h(this, b, -1), r(this, c, B).call(this);
  }
}
k = new WeakMap(), D = new WeakMap(), b = new WeakMap(), c = new WeakSet(), B = function() {
  this.items.forEach((t) => t.removeAttribute("data-highlighted")), this.removeAttribute("aria-activedescendant");
}, /** @param {number} index */
L = function(t) {
  const e = this.items[t];
  r(this, c, B).call(this), e && (h(this, b, t), e.setAttribute("data-highlighted", ""), this.setAttribute("aria-activedescendant", e.id));
}, /** @param {MenuItem} item */
U = function(t) {
  if (!t || t.disabled)
    return;
  const e = t.querySelector("a[href]");
  e && e.click(), this.dispatchEvent(new CustomEvent("menu-item-select", {
    bubbles: !0,
    detail: {
      value: t.value
    }
  }));
}, /** @param {PointerEvent} event */
G = function(t) {
  const o = /** @type {HTMLElement} */ t.target.closest("theme-menu-item");
  if (o instanceof P) {
    const l = this.items.indexOf(o);
    l !== -1 && l !== n(this, b) && r(this, c, L).call(this, l);
  }
}, /** @param {MouseEvent} event */
V = function(t) {
  const o = /** @type {HTMLElement} */ t.target.closest("theme-menu-item");
  if (o instanceof P) {
    if (o.disabled) {
      t.preventDefault();
      return;
    }
    r(this, c, U).call(this, o);
  }
}, /** @param {KeyboardEvent} event */
j = function(t) {
  const e = this.items, o = e.length;
  if (o !== 0)
    switch (t.key) {
      case "ArrowDown":
        t.preventDefault();
        let l = n(this, b) + 1;
        l >= o && (l = 0), r(this, c, L).call(this, l);
        break;
      case "ArrowUp":
        t.preventDefault();
        let w = n(this, b) - 1;
        w < 0 && (w = o - 1), r(this, c, L).call(this, w);
        break;
      case "Home":
        t.preventDefault(), r(this, c, L).call(this, 0);
        break;
      case "End":
        t.preventDefault(), r(this, c, L).call(this, o - 1);
        break;
      case "Enter":
      case " ":
        t.preventDefault(), n(this, b) >= 0 && r(this, c, U).call(this, e[n(this, b)]);
        break;
    }
};
customElements.define("theme-menu", vt);
var x, p, d, g, K, N, W, J, Q;
class wt extends HTMLElement {
  constructor() {
    super(...arguments);
    u(this, g);
    /** @type {AbortController | null} */
    u(this, x, null);
    /** @type {HTMLButtonElement | null} */
    u(this, p, null);
    /** @type {Menu | null} */
    u(this, d, null);
  }
  /**
   * @public
   * @returns {boolean}
   */
  get isOpen() {
    var t;
    return !!((t = n(this, d)) != null && t.matches(":popover-open"));
  }
  connectedCallback() {
    h(this, p, this.querySelector("button")), h(this, d, this.querySelector("theme-menu")), !(!n(this, p) || !n(this, d)) && (r(this, g, K).call(this), r(this, g, N).call(this));
  }
  disconnectedCallback() {
    var t;
    (t = n(this, x)) == null || t.abort(), h(this, x, null);
  }
  /** @public */
  open() {
    var t;
    this.isOpen || (t = n(this, d)) == null || t.showPopover();
  }
  /** @public */
  close() {
    var t;
    this.isOpen && ((t = n(this, d)) == null || t.hidePopover());
  }
}
x = new WeakMap(), p = new WeakMap(), d = new WeakMap(), g = new WeakSet(), K = function() {
  var t, e;
  (t = n(this, d)).id || (t.id = `menu-${crypto.randomUUID()}`), (e = n(this, p)).id || (e.id = `trigger-${crypto.randomUUID()}`), n(this, d).setAttribute("popover", "auto"), n(this, d).setAttribute("aria-labelledby", n(this, p).id), n(this, p).setAttribute("popovertarget", n(this, d).id), n(this, p).setAttribute("popovertargetaction", "toggle"), n(this, p).setAttribute("aria-controls", n(this, d).id), n(this, p).setAttribute("aria-haspopup", "menu"), n(this, p).setAttribute("aria-expanded", "false");
}, N = function() {
  h(this, x, new AbortController());
  const {
    signal: t
  } = n(this, x);
  this.addEventListener("menu-item-select", r(this, g, W).bind(this), {
    signal: t
  }), this.addEventListener("keydown", r(this, g, Q).bind(this), {
    signal: t
  }), this.addEventListener("toggle", r(this, g, J).bind(this), {
    signal: t,
    capture: !0
  });
}, W = function() {
  this.hasAttribute("stayopenonselect") || this.close();
}, /** @param {ToggleEvent} event */
J = function(t) {
  var o, l, w, I;
  if (t.target !== n(this, d))
    return;
  const e = t.newState === "open";
  (o = n(this, p)) == null || o.setAttribute("aria-expanded", String(e)), e ? (l = n(this, d)) == null || l.focus() : t.newState === "closed" && ((I = (w = n(this, d)) == null ? void 0 : w.resetActive) == null || I.call(w));
}, /** @param {KeyboardEvent} event */
Q = function(t) {
  var e, o;
  switch (t.key) {
    case "ArrowDown":
      if (t.target !== n(this, p))
        return;
      t.preventDefault(), this.isOpen || this.open(), (e = n(this, d)) == null || e.setActiveFirst();
      break;
    case "ArrowUp": {
      if (t.target !== n(this, p))
        return;
      t.preventDefault(), this.isOpen || this.open(), (o = n(this, d)) == null || o.setActiveLast();
      break;
    }
    case "Enter":
    case " ": {
      if (t.target !== n(this, p))
        return;
      t.preventDefault(), this.isOpen ? this.close() : this.open();
      break;
    }
    case "Escape":
      this.isOpen && (t.preventDefault(), this.close());
      break;
    case "Tab":
      this.close();
      break;
  }
};
customElements.define("theme-dropdown", wt);
const gt = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" data-component="icon" class="icon">
	<path d="M4.333 3.667V5h5.727l-6.393 6.393.94.94L11 5.94v5.727h1.333v-8z"/>
</svg>
`, ft = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" data-component="icon" class="icon">
	<path d="M12 15.4L6 9.4L7.4 8L12 12.6L16.6 8L18 9.4L12 15.4Z" />
</svg>
`, bt = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" data-component="icon" class="icon">
	<path d="M19 9L20.25 6.25L23 5L20.25 3.75L19 1L17.75 3.75L15 5L17.75 6.25L19 9Z"/>
	<path d="M19 15L17.75 17.75L15 19L17.75 20.25L19 23L20.25 20.25L23 19L20.25 17.75L19 15Z"/>
	<path d="M11.5 9.5L9 4L6.5 9.5L1 12L6.5 14.5L9 20L11.5 14.5L17 12L11.5 9.5ZM9.99 12.99L9 15.17L8.01 12.99L5.83 12L8.01 11.01L9 8.83L9.99 11.01L12.17 12L9.99 12.99Z"/>
</svg>
`, At = 3e3, Lt = 5e3;
var M, A, q, E, y, T, a, X, tt, S, H, O, et, _, $;
class yt extends HTMLElement {
  constructor() {
    super();
    u(this, a);
    /** @type {AbortController | null} */
    u(this, M, null);
    /** @type {Map<string, AsyncActionStatus>} */
    u(this, A, /* @__PURE__ */ new Map());
    /** @type {AiActionItem[]} */
    u(this, q, []);
    /** @type {ActionFilter} */
    u(this, E, (t) => !0);
    /** @type {AiActionItem[] | null} */
    u(this, y, null);
    /** @type {boolean} */
    u(this, T, !1);
    h(this, q, pt());
  }
  /**
   * Set filter function to control which actions are visible
   * @param {ActionFilter | null} fn
   */
  set filter(t) {
    if (t == null)
      h(this, E, () => !0);
    else if (typeof t != "function") {
      console.warn("Provided filter is not a function. Ignoring the value.");
      return;
    } else
      h(this, E, t);
    h(this, y, null), r(this, a, $).call(this);
  }
  connectedCallback() {
    h(this, M, new AbortController());
    const {
      signal: t
    } = n(this, M);
    this.addEventListener("menu-item-select", r(this, a, X).bind(this), {
      signal: t,
      capture: !0
    }), r(this, a, $).call(this);
  }
  disconnectedCallback() {
    var t;
    (t = n(this, M)) == null || t.abort(), h(this, M, null);
  }
}
M = new WeakMap(), A = new WeakMap(), q = new WeakMap(), E = new WeakMap(), y = new WeakMap(), T = new WeakMap(), a = new WeakSet(), X = async function(t) {
  const {
    value: e
  } = t.detail, o = n(this, a, _).find((l) => l.id === e);
  if (!(!o || o.url || n(this, A).get(e) === "pending")) {
    this.querySelector("theme-dropdown"), r(this, a, S).call(this, e, "pending");
    try {
      await o.action(), r(this, a, S).call(this, e, "success"), setTimeout(() => {
        Array.from(n(this, A).values()).filter((w) => w === "pending").length === 0 && r(this, a, tt).call(this);
      }, At);
    } catch (l) {
      console.error(l), r(this, a, S).call(this, e, "error"), setTimeout(() => {
        r(this, a, H).call(this, e);
      }, Lt);
    }
  }
}, tt = function() {
  const t = this.querySelector("theme-dropdown");
  t && (t.close(), t.addEventListener("toggle", (e) => {
    e.newState === "closed" && r(this, a, H).call(this);
  }, {
    once: !0,
    capture: !0
  }));
}, /**
 * @param {string} id
 * @param {AsyncActionStatus} status
 */
S = function(t, e) {
  n(this, A).set(t, e), r(this, a, $).call(this);
}, /** @param {string} [id] */
H = function(t) {
  t ? n(this, A).delete(t) : n(this, A).clear(), r(this, a, $).call(this);
}, /**
 * @param {ActionLabel | ActionIcon} itemValue
 * @param {AsyncActionStatus} status
 * @returns {string | TemplateResult}
 */
O = function(t, e) {
  if (typeof t == "object" && t !== null) {
    if (e in t)
      return t[e];
    if ("idle" in t)
      return t.idle;
  }
  return t;
}, /**
 * @param {AiActionItem} item
 * @returns {TemplateResult}
 */
et = function(t) {
  if (t.separator)
    return m`<hr>`;
  const e = n(this, A).get(t.id) || "idle", o = r(this, a, O).call(this, t.label, e), l = r(this, a, O).call(this, t.icon, e), w = r(this, a, O).call(this, t.desc, e), I = ["pending", "success", "error"].includes(e), R = !!t.url;
  return m`
			<theme-menu-item
				value=${t.id}
				data-status=${e !== "idle" ? `${e}` : Z}
				?disabled=${I}
			>
				<div class="prefix">${l}</div>
				<div class="content">
					<div class="label" aria-live=${R ? Z : "polite"}>
						${R ? m`
								<a href=${t.url} target="_blank" rel="noopener noreferrer" tabindex="-1">
									${o}
									${m`${f(gt)}`}
								</a>
							` : o}
					</div>
					${w ? m`<div class="desc">${w}</div>` : ""}
				</div>
			</theme-menu-item>
		`;
}, _ = function() {
  return n(this, y) !== null ? n(this, y) : (h(this, y, n(this, q).filter((t) => {
    if (!t || t.separator || !t.id)
      return !0;
    try {
      return !!n(this, E).call(this, t.id);
    } catch {
      return !0;
    }
  })), n(this, y));
}, $ = function() {
  n(this, T) || (this.replaceChildren(), h(this, T, !0));
  const t = Array.from(n(this, A).values()), e = t.includes("pending") || t.includes("error");
  nt(m`
			<theme-dropdown ?stayopenonselect=${e}>
				<button type="button">
					${m`${f(bt)}`}
					${v("aiActions.button.label")}
					${m`${f(ft)}`}
				</button>
				<theme-menu>
					${n(this, a, _).map((o) => r(this, a, et).call(this, o))}
				</theme-menu>
			</theme-dropdown>
		`, this);
};
customElements.define("ai-actions", yt);
