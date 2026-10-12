var bt = Object.defineProperty;
var Ne = (i) => {
  throw TypeError(i);
};
var vt = (i, s, e) => s in i ? bt(i, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[s] = e;
var _ = (i, s, e) => vt(i, typeof s != "symbol" ? s + "" : s, e), Ee = (i, s, e) => s.has(i) || Ne("Cannot " + e);
var n = (i, s, e) => (Ee(i, s, "read from private field"), e ? e.call(i) : s.get(i)), c = (i, s, e) => s.has(i) ? Ne("Cannot add the same private member more than once") : s instanceof WeakSet ? s.add(i) : s.set(i, e), u = (i, s, e, t) => (Ee(i, s, "write to private field"), t ? t.call(i, e) : s.set(i, e), e), l = (i, s, e) => (Ee(i, s, "access private method"), e);
import { i as yt } from "./index-BQkERkoW.js";
import { g as wt } from "./placeholder-CE7Sskrf.js";
import { a as Et, n as xt, N as Ct } from "./navigator-state-D9eJfWnE.js";
import { d as kt } from "./utils-CJuG4ON-.js";
import { t as x } from "./i18n-DKG4M0Tj.js";
import At from "./purify.es-Q3IQ-fe5.js";
import { c as ze } from "./theme-ehL-TQzv.js";
import { d as St } from "./jwt-CBQwn05Y.js";
var I, K;
class Lt extends HTMLElement {
  constructor() {
    super();
    /** @type NavigatorState | undefined */
    c(this, I);
    /** @type HTMLButtonElement | undefined */
    c(this, K);
    this.toggle = this.toggle.bind(this), this.onStorageEvent = this.onStorageEvent.bind(this), this.update = this.update.bind(this);
  }
  get cacheType() {
    return Et("navigation_state", "functional") ? "storage" : "memory";
  }
  get expanded() {
    var e;
    return ((e = n(this, I)) == null ? void 0 : e.get({
      cache: this.cacheType
    })) !== "collapsed";
  }
  connectedCallback() {
    var e, t, o;
    u(this, I, xt), u(this, K, this.querySelector("#navigator-toggle")), (e = n(this, K)) == null || e.addEventListener("click", this.toggle), (t = n(this, I)) == null || t.addEventListener("change", this.update), (o = n(this, I)) == null || o.addEventListener("storage", this.onStorageEvent), window.addEventListener("storage", this.onStorageEvent), this.update();
  }
  disconnectedCallback() {
    var e, t, o;
    (e = n(this, K)) == null || e.removeEventListener("click", this.toggle), (t = n(this, I)) == null || t.removeEventListener("change", this.update), (o = n(this, I)) == null || o.removeEventListener("storage", this.onStorageEvent), window.removeEventListener("storage", this.onStorageEvent);
  }
  toggle() {
    var e;
    (e = n(this, I)) == null || e.set(this.expanded ? "collapsed" : "expanded", {
      cache: this.cacheType
    });
  }
  onStorageEvent(e) {
    "key" in e && e.key !== Ct || this.update();
  }
  update() {
    var e, t;
    (e = n(this, K)) == null || e.setAttribute("aria-expanded", String(this.expanded)), this.expanded && ((t = this.querySelector('#navigator-nav a[aria-current="page"]')) == null || t.scrollIntoView({
      block: "nearest"
    }));
  }
}
I = new WeakMap(), K = new WeakMap();
customElements.define("theme-navigator", Lt);
const Fe = document.createElement("template");
Fe.innerHTML = `
<style>
    :host {
        display: block;
        position: relative;
    }

    :host([hidden]) {
        display: none;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    .container {
        --_shadow-size: 12px;
        --_shadow-size-active: 20px;
        --_shadow-blur: 8px;
        --_shadow-blur-active: 12px;
        --_shadow-color: var(--K15t-shadow-overflow, hsl(0deg 0% 0% / 0.075));
        --_shadow-coords-x-start: calc(var(--_shadow-size) * var(--_shadow-visibility-inline-start, 0)) 0;
        --_shadow-coords-x-end: calc((var(--_shadow-size) * var(--_shadow-visibility-inline-end, 0)) * -1) 0;
        --_shadow-spread: calc(var(--_shadow-blur) * -1);

        overflow: auto;
        scrollbar-width: thin;
        overscroll-behavior-x: contain;
    }

    .container:focus-visible {
        outline-style: auto;
        outline-color: Highlight;
        outline-color: -webkit-focus-ring-color;
    }

    .container:is(:hover, :focus-visible) {
        --_shadow-size: var(--_shadow-size-active);
        --_shadow-blur: var(--_shadow-blur-active);
    }

    .container::after {
        content: '';
        position: absolute;
        inset: 0;
        box-shadow:
            var(--_shadow-coords-x-start) var(--_shadow-blur) var(--_shadow-spread) inset var(--_shadow-color),
            var(--_shadow-coords-x-end) var(--_shadow-blur) var(--_shadow-spread) inset var(--_shadow-color);
        will-change: box-shadow;
        transition: box-shadow 100ms ease-out;
        pointer-events: none;
    }

    .content {
        display: flex;
        position: relative;
        min-inline-size: fit-content;
        min-block-size: fit-content;
    }

    .edge {
        position: absolute;
    }

    .edge:is([data-position=inline-start], [data-position=inline-end]) {
        inset-block-start: 0;
        inline-size: 0;
        block-size: 100%;
    }

   /* Note: It's necessary to use this random 1px offset on the edges due to some rendering issues in Safari and MS Edge on Windows. */

    .edge[data-position=inline-start] {
        inset-inline-start: 1px;
    }

    .edge[data-position=inline-end] {
        inset-inline-end: 1px;
    }
</style>
<div class="container">
    <div class="content">
        <div class="edge" data-position="inline-start"></div>
        <slot></slot>
        <div class="edge" data-position="inline-end"></div>
    </div>
</div>
`;
const xe = /* @__PURE__ */ new WeakMap();
var ee;
class Tt extends HTMLElement {
  constructor() {
    super();
    /** @type {HTMLElement[]} */
    c(this, ee);
    const e = this.attachShadow({
      mode: "open"
    });
    e.appendChild(Fe.content.cloneNode(!0)), u(this, ee, Array.from(this.shadowRoot.querySelectorAll(".edge"))), xe.set(this, new IntersectionObserver((t) => {
      t.forEach((o) => {
        const r = o.target.getAttribute("data-position"), a = o.isIntersecting ? 0 : 1;
        e.querySelector(".container").style.setProperty(`--_shadow-visibility-${r}`, a.toString());
      });
    }, {
      root: this,
      rootMargin: "0px",
      threshold: 1
    }));
  }
  get direction() {
    return this.getAttribute("direction");
  }
  connectedCallback() {
    n(this, ee).forEach((e) => xe.get(this).observe(e));
  }
  disconnectedCallback() {
    xe.get(this).disconnect();
  }
}
ee = new WeakMap();
customElements.define("scroll-shadow", Tt);
function qt(i, s) {
  let e, t, o;
  return function(...r) {
    t = r, o = this, e || (i.apply(o, t), e = !0, setTimeout(() => {
      e = !1, t && (i.apply(o, t), t = null);
    }, s));
  };
}
var U, te, A, p, ie, Ae, He, Be, Se, Ke, j, Ve, Le, $e, Pe;
class It {
  /**
   * @param {Config} config
   */
  constructor(s) {
    c(this, p);
    /** @type {HeadingNode[]} */
    c(this, U, []);
    /** @type {string | null} */
    c(this, te, null);
    /** @type {AbortController} */
    c(this, A);
    /** @type {Config} */
    _(this, "config");
    c(this, j, () => {
      const s = l(this, p, Ke).call(this);
      (s == null ? void 0 : s.id) !== n(this, p, ie) && u(this, p, (s == null ? void 0 : s.id) || null, Ae);
    });
    var t;
    const e = {
      elements: [],
      tocElement: null,
      scrollOffset: 0
    };
    if (this.config = {
      ...e,
      ...s,
      elements: ((t = s.elements) == null ? void 0 : t.filter(l(this, p, He))) || []
    }, !(!this.config.elements || !this.config.elements.length)) {
      if (!this.config.tocElement)
        throw new Error("No TOC element provided");
      return this;
    }
  }
  listen() {
    var t;
    (t = n(this, A)) == null || t.abort(), u(this, A, new AbortController());
    const s = qt(n(this, j).bind(this), 100), e = kt(l(this, p, Pe).bind(this), 200);
    addEventListener("scroll", s, {
      signal: n(this, A).signal
    }), addEventListener("scrollend", s, {
      signal: n(this, A).signal
    }), addEventListener("resize", e, {
      signal: n(this, A).signal
    });
  }
  unlisten() {
    !n(this, A) || n(this, A).signal.aborted || (n(this, A).abort(), u(this, p, null, Ae));
  }
  destroy() {
    var s;
    (s = this.config.tocElement) == null || s.replaceChildren(), this.unlisten();
  }
  init() {
    u(this, U, l(this, p, Ve).call(this, this.config.elements)), n(this, U).length && (l(this, p, $e).call(this), n(this, j).call(this), this.listen());
  }
}
U = new WeakMap(), te = new WeakMap(), A = new WeakMap(), p = new WeakSet(), ie = function() {
  return n(this, te);
}, Ae = function(s) {
  var e, t;
  if (s !== n(this, p, ie)) {
    if (n(this, p, ie)) {
      const o = (e = this.config.tocElement) == null ? void 0 : e.querySelector("a[href][aria-current]");
      o == null || o.removeAttribute("aria-current");
    }
    if (s !== null) {
      const o = (t = this.config.tocElement) == null ? void 0 : t.querySelector(`a[href="#${CSS.escape(s)}"]`);
      o && (o.setAttribute("aria-current", "true"), o.scrollIntoView({
        block: "nearest",
        inline: "nearest"
      }));
    }
    u(this, te, s);
  }
}, /**
 * Validates if an element is a valid heading for table of contents
 * @param {HTMLElement} element
 * @returns {boolean}
 */
He = function(s) {
  var e;
  return s instanceof HTMLHeadingElement && !!s.id && !!((e = s.textContent) != null && e.trim().length);
}, /**
 * Checks if an element is hidden inside a closed <details> or <dialog> element.
 * @param {HTMLElement} element
 * @returns {boolean}
 */
Be = function(s) {
  const e = s.closest("details") ?? s.closest("dialog");
  return !(e && !e.open);
}, /**
 * Checks if an element is visible in the current viewport.
 * @param {HTMLElement} element
 * @returns {boolean}
 */
Se = function(s) {
  const e = s.getBoundingClientRect(), t = window.innerHeight || document.documentElement.clientHeight;
  return e.top < t && e.bottom > 0;
}, /** @returns {HTMLElement | null} */
Ke = function() {
  const s = this.config.elements.filter(l(this, p, Be)), e = window.scrollY || document.documentElement.scrollTop;
  if (s.length === 0)
    return null;
  if (e <= this.config.scrollOffset) {
    const o = s[0];
    return l(this, p, Se).call(this, o) ? o : null;
  }
  for (let o = s.length - 1; o >= 0; o--) {
    const r = s[o];
    if (Math.round(r.getBoundingClientRect().top + e) <= Math.round(e + this.config.scrollOffset))
      return r;
  }
  const t = s[0];
  return l(this, p, Se).call(this, t) ? t : null;
}, j = new WeakMap(), /**
 * Parses the elements and converts them into a uniform structure.
 * @param {HTMLElement[]} elements
 * @returns {HeadingNode[]}
 */
Ve = function(s) {
  const e = [], t = [];
  return s.forEach((o) => {
    const r = parseInt(o.tagName.substring(1)), a = {
      text: (
        /** @type {string} */
        o.textContent.trim()
      ),
      id: o.id,
      level: r,
      element: o,
      children: []
    };
    for (; t.length > 0 && t[t.length - 1].level >= r; )
      t.pop();
    t.length === 0 ? e.push(a) : t[t.length - 1].node.children.push(a), t.push({
      level: r,
      node: a
    });
  }), e;
}, /**
 * @param {HeadingNode[]} items
 * @returns {HTMLOListElement | null}
 */
Le = function(s) {
  if (!s || s.length === 0)
    return null;
  const e = document.createElement("ol");
  return e.classList.add("toc-list"), s.forEach((t) => {
    const o = document.createElement("li");
    o.classList.add("toc-list-item", `node-name--H${t.level}`);
    const r = document.createElement("a");
    if (r.href = `#${t.id}`, r.textContent = t.text, r.classList.add("toc-link"), o.appendChild(r), t.children && t.children.length > 0) {
      const a = l(this, p, Le).call(this, t.children);
      a && o.appendChild(a);
    }
    e.appendChild(o);
  }), e;
}, $e = function() {
  if (!this.config.tocElement)
    return;
  const s = l(this, p, Le).call(this, n(this, U));
  s && this.config.tocElement.replaceChildren(s);
}, Pe = function() {
  this.unlisten(), n(this, j).call(this), this.listen();
};
function Dt() {
  const i = document.createElement("div");
  i.style.scrollMargin = getComputedStyle(document.documentElement).getPropertyValue("--theme-scroll-offset") || "0px", document.body.append(i);
  const s = getComputedStyle(i).scrollMargin;
  return i.remove(), parseInt(s);
}
var O;
class Mt extends HTMLElement {
  constructor() {
    super();
    c(this, O);
    if (!this.targetId)
      throw new Error("No `for` attribute provided");
    u(this, O, new It({
      tocElement: this,
      elements: Array.from(document.getElementById(this.targetId).querySelectorAll("h2,h3,h4,h5,h6")),
      scrollOffset: Dt()
    }));
  }
  get targetId() {
    return this.getAttribute("for");
  }
  connectedCallback() {
    n(this, O) && n(this, O).init();
  }
  disconnectedCallback() {
    n(this, O) && n(this, O).destroy();
  }
}
O = new WeakMap();
customElements.define("theme-toc", Mt);
const Ue = document.createElement("template");
Ue.innerHTML = `
<style>
	:host {
		display: inline-block;
	}

	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	.sr-only {
		position: absolute;
		inline-size: 1px;
		block-size: 1px;
		padding: 0;
		overflow: hidden;
		clip: rect(0,0,0,0);
		clip-path: inset(100%);
		white-space: nowrap;
		border-width: 0;
	}

	.thumbnail {
		position: relative;
		display: grid;
		grid-template: 1fr / 1fr;
	}

	.thumbnail:has(:focus-visible) {
		outline-style: auto;
		outline-offset: 2px;
		outline-color: HighlightText;
		outline-color: -webkit-focus-ring-color;
	}

	.toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		inline-size: 24px;
		aspect-ratio: 1 / 1;
		padding: 0;
		color: var(--K15t-foreground);
		background-color: var(--K15t-background-neutral);
		border-width: 1px;
		border-style: solid;
		border-radius: var(--K15t-radius-small);
		border-color: var(--K15t-border-neutral-strong);
		cursor: pointer;
	}

	.toggle-open {
		display: none;
		margin: 4px;
		grid-area: 1 / 1;
		transition: opacity 0.2s ease-in-out;
		z-index: 1;
		justify-self: end;

		@media (hover: hover) {
			opacity: 0;
		}

	}

	.toggle svg {
		color: currentColor;
		display: block;
		inline-size: 16px;
		aspect-ratio: 1 / 1;
		pointer-events: none;
	}

	.toggle-open:is(:focus, :focus-visible) {
		outline-style: none;
	}

	:host(:not([disabled])) .toggle-open {
		display: flex;
	}

	:host(:not([disabled]):not([invisible])) :where(.thumbnail:hover .toggle-open, .toggle-open:focus-visible) {
		opacity: 1;
	}

	.toggle-close:is(:hover, :focus-visible) {
		background-color: var(--K15t-background-neutral-hovered);
		border-color: var(--K15t-border-neutral-strong-hovered);
	}

	.toggle-close:active {
		background-color: var(--K15t-background-neutral-pressed);
	}

	slot[name="thumbnail"] {
		grid-area: 1 / 1;
		align-self: center;
		justify-self: center;
	}

	dialog {
		inline-size: 100%;
		block-size: 100%;
		max-inline-size: 100dvw;
		max-block-size: 100dvh;
		inset: 0;
		background: transparent;
		border: 0;
		opacity: 0;
		transition: opacity 0.3s ease;
		margin: 0;
		padding: 0;
	}

	dialog[open] {
		display: flex;
		flex-direction: column;
		opacity: 1;
	}

	dialog::backdrop {
		/* Fallback until backdrop can inherit from dialog */
		/* More info: https://stackoverflow.com/questions/58818299/css-variables-not-working-in-dialogbackdrop/77393321#77393321 */
		background-color: var(--K15t-blanket, hsl(0 0% 0% / 85%));
	}

	.toolbar {
		display: flex;
		justify-content: end;
		position: absolute;
		inset-block-start: 0;
		inset-inline: 0;
		padding-inline: 20px;
		padding-block-start: 20px;
	}

	.content {
		flex: 1 1 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding: 20px;
		block-size: 100%;
		min-block-size: 0;
		min-inline-size: 0;
	}

	/* Enable light dismiss */
	:is(.toolbar, .content) {
		pointer-events: none;

		> * {
			pointer-events: auto;
		}
	}

	slot {
		display: block;
		max-inline-size: 100%;
	}

	slot[name="lightbox"] {
		display: flex;
		min-block-size: 0;
		min-inline-size: 0;
		max-inline-size: 100%;
		border-radius: var(--K15t-radius-small);

		&::slotted(*) {
			margin-block: 0;
		}
	}
</style>

<div class="thumbnail">
	<button
		type="button"
		aria-haspopup="dialog"
		aria-describedby="toggleDesc"
		aria-controls="dialog"
		class="toggle toggle-open"
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" aria-hidden="true">
		<path fill="currentColor" d="M120-120v-320h80v184l504-504H520v-80h320v320h-80v-184L256-200h184v80H120Z"/>
		</svg>
	</button>
	<slot name="thumbnail"></slot>
</div>

<dialog id="dialog" aria-modal="true">
	<header class="toolbar">
		<button type="button" id="toggle-close" class="toggle toggle-close" aria-controls="dialog">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 -960 960 960"
			aria-hidden="true"
			role="img"
		>
		<path
		fill="currentColor"
			d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
			/>
		</svg>
		</button>
	</header>

	<main class="content" part="content">
		<slot name="lightbox"></slot>
	</main>
</dialog>
`;
var W, M, R, S, G, b, Te, re, We, Ge, J, qe;
class je extends HTMLElement {
  constructor() {
    super();
    c(this, b);
    /** @type {AbortController} */
    c(this, W);
    /** @type {HTMLDialogElement} */
    c(this, M);
    /** @type {HTMLElement | null} */
    c(this, R, null);
    /** @type {HTMLElement | null} */
    c(this, S, null);
    /** @type {ElementInternals} */
    c(this, G);
    this.attachShadow({
      mode: "open",
      slotAssignment: "manual"
    }).appendChild(Ue.content.cloneNode(!0)), u(this, G, this.attachInternals());
  }
  attributeChangedCallback(e, t, o) {
    e !== "disabled" || t === o || (o === null ? l(this, b, Te).call(this) : l(this, b, re).call(this));
  }
  connectedCallback() {
    this.getAttribute("disabled") ? l(this, b, re).call(this) : l(this, b, Te).call(this);
  }
  disconnectedCallback() {
    l(this, b, re).call(this);
  }
}
W = new WeakMap(), M = new WeakMap(), R = new WeakMap(), S = new WeakMap(), G = new WeakMap(), b = new WeakSet(), Te = function() {
  if (u(this, W, new AbortController()), u(this, M, this.shadowRoot.getElementById("dialog")), u(this, R, this.firstElementChild), !n(this, R))
    return;
  this.shadowRoot.querySelector('slot[name="thumbnail"]').assign(n(this, R));
  const e = {
    signal: n(this, W).signal
  }, t = this.shadowRoot.querySelector(".toggle-open"), o = n(this, R).querySelector("img");
  o && (o.addEventListener("mouseenter", () => {
    var a;
    (a = n(this, G).states) == null || a.add("hover-thumbnail");
  }, e), o.addEventListener("mouseleave", () => {
    var a;
    (a = n(this, G).states) == null || a.delete("hover-thumbnail");
  }, e)), Array.from(this.shadowRoot.querySelectorAll(".toggle")).forEach((a) => {
    a.addEventListener("click", l(this, b, qe).bind(this), e);
  }), this.shadowRoot.querySelector(".thumbnail").addEventListener("click", (a) => {
    const h = a.composedPath();
    h.some((g) => g instanceof Element && g.localName === "figcaption") || h.includes(t) || l(this, b, qe).call(this, a);
  }, e), n(this, M).addEventListener("keydown", (a) => {
    a.key === "Escape" && (a.preventDefault(), l(this, b, J).call(this));
  }, e), n(this, M).addEventListener("click", l(this, b, We).bind(this), e);
}, re = function() {
  var e;
  l(this, b, J).call(this), (e = n(this, W)) == null || e.abort();
}, /**
 * @param {PointerEvent} event
 */
We = function(e) {
  e.target.nodeName === "DIALOG" && l(this, b, J).call(this);
}, Ge = function() {
  n(this, S) === null && (u(this, S, n(this, R).cloneNode(!0)), n(this, S).setAttribute("slot", "lightbox")), n(this, S) instanceof HTMLElement && n(this, R).insertAdjacentElement("afterend", n(this, S)), this.shadowRoot.querySelector('slot[name="lightbox"]').assign(n(this, S)), document.documentElement.classList.add("no-scroll"), n(this, M).showModal();
}, // Note: In Safari, the focus jumps back to the article thumbnail instead of the toggle button by design
J = function() {
  n(this, S) instanceof HTMLElement && n(this, S).remove(), document.documentElement.classList.remove("no-scroll"), n(this, M).close();
}, /**
 * @param {PointerEvent} event
 */
qe = function(e) {
  e.preventDefault(), n(this, M).open ? l(this, b, J).call(this) : l(this, b, Ge).call(this);
}, _(je, "observedAttributes", ["disabled"]);
customElements.define("image-lightbox", je);
const k = {
  NONE: "none",
  ASC: "ascending",
  DESC: "descending"
};
var w, V, oe;
class Rt extends HTMLElement {
  constructor() {
    super();
    /** @type {HTMLTableElement} */
    c(this, w);
    /**
     *  @type {boolean}
     *
     *  This flag indicates whether the `th` element is located inside the `tbody`.
     *
     *  It helps adapt to two different table structures:
     *  1. When the table structure is `<table><thead><tr><th></th></tr></thead><tbody>...</tbody></table>`
     *  2. When the table structure is `<table><tbody><tr><th></th></tr>...</tbody></table>`,
     */
    c(this, V);
    c(this, oe, !1);
    /**
     * @param {HTMLTableElement} tableElement
     * @return {boolean}
     */
    _(this, "containsMergedCells", (e) => [...e.querySelectorAll("[rowspan], [colspan]")].filter((r) => {
      const a = Number(r.getAttribute("rowspan")), h = Number(r.getAttribute("colspan"));
      return a > 1 || h > 1;
    }).length >= 1);
    this.sortTable = this.sortTable.bind(this), this.onButtonClick = this.onButtonClick.bind(this);
  }
  connectedCallback() {
    u(this, w, this.querySelector("table")), n(this, w) && (this.containsMergedCells(n(this, w)) || this.containsValidTh(n(this, w)) && (n(this, oe) || (this.transformThStructure(n(this, w)), this.addTableCaption(n(this, w)), this.preserveInitialOrder(n(this, w))), u(this, oe, !0), this.addEventListeners(n(this, w))));
  }
  disconnectedCallback() {
    this.removeEventListeners(n(this, w));
  }
  /**
   * @param {HTMLTableElement} tableElement
   * @returns {boolean}
   *
   * Checks if the table contains a <th> element either in <thead> or <tbody>, but not both.
   */
  transformThStructure(e) {
    const o = (n(this, V) ? e.querySelector("tbody tr") : e.querySelector("thead tr")).getElementsByTagName("th");
    Array.from(o).forEach((r) => {
      const a = Array.from(r.childNodes), h = document.createElement("button");
      h.type = "button", a.forEach((f) => h.appendChild(f));
      const g = document.createElement("span");
      g.setAttribute("aria-hidden", "true"), h.appendChild(g), r.appendChild(h);
    });
  }
  /**
   * @param {HTMLTableElement} tableElement
   *
   * Adds a visually hidden caption element to the table
   */
  addTableCaption(e) {
    const t = document.createElement("caption");
    t.className = "sr-only", t.textContent = x("macro.table.columnSort.label"), e.insertBefore(t, e.firstChild);
  }
  /**
   * @param {HTMLTableElement} tableElement
   * @returns {boolean}
   *
   * Checks if the table contains a <th> element either in <thead> or <tbody>, but not both.
   */
  containsValidTh(e) {
    const t = e.querySelector("thead th"), o = e.querySelector("tbody th");
    return u(this, V, !!o), t && o ? (console.error("Table structure is incorrect !"), !1) : !(!t && !o);
  }
  /**
   * @param {HTMLTableElement} tableElement
   *
   * Preserves the initial order of the rows by setting a `data-initial-index` attribute on each row.
   * This is used to restore the initial row order when `aria-sort` is removed.
   */
  preserveInitialOrder(e) {
    e.querySelectorAll("tbody tr").forEach((o, r) => {
      o.setAttribute("data-initial-index", r);
    });
  }
  /**
   * @param {MouseEvent} event
   */
  onButtonClick(e) {
    const o = e.target.closest("th");
    if (!o || o.dataset.sort === "")
      return;
    const r = Array.from(o.parentElement.children).indexOf(o);
    this.sortTable(n(this, w), r);
  }
  addEventListeners(e) {
    e.querySelectorAll("th button").forEach((o) => {
      o.addEventListener("click", this.onButtonClick);
    });
  }
  removeEventListeners(e) {
    e && e.querySelectorAll("th button").forEach((o) => {
      o.removeEventListener("click", this.onButtonClick);
    });
  }
  /**
   * @param {HTMLTableElement} tableElement
   * @param {number} columnIndex
   */
  sortTable(e, t) {
    const o = Array.from(e.querySelectorAll("tbody tr")), a = e.querySelectorAll("th")[t].getAttribute("aria-sort") || k.NONE, h = this.getNextSortType(a);
    this.updateSortType(e, t, h);
    let g = [];
    h === k.NONE ? g = this.restoreInitialOrder(o) : g = this.sortRows(o, t, h);
    const f = e.querySelector("tbody"), q = document.createDocumentFragment();
    n(this, V) ? g.slice(1).forEach((we) => q.appendChild(we)) : g.forEach((we) => q.appendChild(we)), f.appendChild(q);
  }
  /**
   * @param {SORT_TYPE} currentSortType
   */
  getNextSortType(e) {
    return (/* @__PURE__ */ new Map([[k.NONE, k.ASC], [k.ASC, k.DESC], [k.DESC, k.NONE]])).get(e) || k.NONE;
  }
  /**
   * @param {HTMLTableElement} tableElement
   * @param {number} columnIndex
   * @param {SORT_TYPE} nextSortType
   */
  updateSortType(e, t, o) {
    e.querySelectorAll("th").forEach((a, h) => {
      h !== t || o === k.NONE ? a.removeAttribute("aria-sort") : a.setAttribute("aria-sort", o);
    });
  }
  /**
   * @param {Array} rows
   * @returns {Array} - The sorted rows.
   */
  restoreInitialOrder(e) {
    return [...e].sort((o, r) => {
      const a = Number(o.getAttribute("data-initial-index")), h = Number(r.getAttribute("data-initial-index"));
      return a - h;
    });
  }
  /**
   * @param {Array} rows
   * @param {number} columnIndex
   * @param {SORT_TYPE} sortType
   *
   * @returns {Array} - The sorted rows.
   *
   * Sorts the rows based on the specified column index and sort type (ascending or descending).
   * If `th` elements are in the `tbody`, it keeps the first row as is and sorts the rest.
   * Otherwise, it sorts all rows based on the column values.
   */
  sortRows(e, t, o) {
    const r = (h, g) => {
      const f = h.cells[t].textContent.trim(), q = g.cells[t].textContent.trim();
      return o === k.ASC ? f.localeCompare(q) : q.localeCompare(f);
    };
    return n(this, V) ? [e[0], ...e.slice(1).sort(r)] : [...e].sort(r);
  }
}
w = new WeakMap(), V = new WeakMap(), oe = new WeakMap();
customElements.define("table-sort", Rt);
const Nt = `
<style>
	*,
	*::before,
	*::after {
	  box-sizing: border-box;
	}

	:host {
	  display: flex;
	  flex-direction: column;
	  align-items: start;
	  gap: 1rem;
	  position: relative;
		width: fit-content;
	  max-width: 100%;
	}

	:host([disabled]) .toggle {
		display: none;
	}

	.sr-only {
	  position: absolute;
	  width: 1px;
	  height: 1px;
	  padding: 0;
	  margin: -1px;
	  overflow: hidden;
	  clip: rect(0, 0, 0, 0);
	  white-space: nowrap;
	  border: 0;
	}

	.toggle {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  align-self: end;
	  inline-size: 24px;
	  aspect-ratio: 1 / 1;
	  padding: 0;
	  color: var(--K15t-foreground);
	  background-color: var(--K15t-background-neutral);
	  border-width: 1px;
	  border-style: solid;
	  border-radius: 4px;
	  border-color: var(--K15t-border-neutral-strong);
	  cursor: pointer;
	}

	.toggle:is(:hover, :focus-visible) {
	    background-color: var(--K15t-background-neutral-hovered);
	    border-color: var(--K15t-border-neutral-strong-hovered);
	}

	.toggle:active {
	    background-color: var(--K15t-background-neutral-pressed);
	}

	.toggle svg {
	  display: block;
	  inline-size: 16px;
	  aspect-ratio: 1 / 1;
	  color: currentColor;
	  pointer-events: none;
	}

	#toggle-open {
	    position: absolute;
	    translate: 0 calc(-100% - 0.5rem);
	}

	#wrapper {
	  width: 100%;
	}

	dialog {
	  position: fixed;
	  inset: 1rem;
	  padding: 0;
	  margin: auto;
	  width: auto;
	  max-width: unset;
	  height: auto;
	  max-height: unset;
	  flex-direction: column;
	  border-radius: 4px;
	  border: 1px solid var(--K15t-border-neutral);
	  touch-action: none;
	}

	dialog[open] {
	  display: flex;
		--dialog-content-width: 100%;
	}

	dialog :where(header, main) {
 		background-color: var(--K15t-surface);
	}

	dialog :where(header, #main-inner) {
	  padding: 1rem;
	}

	#main-inner {
		display: flex;
		justify-content: center;
		align-items: center;
		min-block-size: 100%;
	}

	dialog::backdrop {
	    /* Fallback until backdrop can inherit from dialog */
	    /* More info: https://stackoverflow.com/questions/58818299/css-variables-not-working-in-dialogbackdrop/77393321#77393321 */
    background-color: var(--K15t-blanket, hsl(0 0% 0% / 85%));
	}

	dialog header {
	  display: flex;
	  flex-direction: row-reverse;
	  position: sticky;
	  inset-block-start: 0;
	  z-index: 1;
	  padding-block: 1rem;
	  border-block-end: 1px solid var(--K15t-border-neutral);
	}

	dialog main {
	  flex: 1 1 auto;
	  z-index: 0;
	  overflow-y: auto;
	  scrollbar-width: thin;
	  overscroll-behavior: contain;
	}

	slot {
  	display: block;
  	max-width: 100%;
	}

	slot[name="dialog"] {
		display: block;
		max-inline-size: 100%;
		max-block-size: 100%;
	}
</style>

<i18n-message id="tableDesc" class="sr-only" i18nkey="dialog.table.description.label"></i18n-message>

<button
  type="button"
  id="toggle-open"
  class="toggle"
  aria-controls="dialog"
  aria-haspopup="dialog"
  aria-describedby="tableDesc"
>
  <i18n-message class="sr-only" i18nkey="dialog.open.label"></i18n-message>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M120-120v-320h80v184l504-504H520v-80h320v320h-80v-184L256-200h184v80H120Z"
    />
  </svg>
</button>

<div id="wrapper">
  <slot name="table"></slot>
</div>

<dialog id="dialog" aria-modal="true">
  <header>
    <button type="button" class="toggle" aria-controls="dialog">
      <span class="sr-only">
        <i18n-message i18nkey="dialog.close.label"></i18n-message>
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        aria-hidden="true"
        role="img"
      >
        <path
          fill="currentColor"
          d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
        />
      </svg>
    </button>
  </header>

  <main>
    <div id="main-inner" part="content">
        <slot name="dialog"></slot>
    </div>
  </main>
</dialog>
`;
var z, E, L, F, y, Ie, ae, Ze, le, Je;
class Ye extends HTMLElement {
  constructor() {
    super();
    c(this, y);
    /** @type {HTMLDialogElement} */
    c(this, z);
    /** @type {HTMLElement | null} */
    c(this, E, null);
    /** @type {HTMLElement | null} */
    c(this, L, null);
    /** @type {AbortController | null} */
    c(this, F, null);
    const e = document.createElement("template");
    e.innerHTML = Nt, this.attachShadow({
      mode: "open",
      slotAssignment: "manual"
    }), this.shadowRoot.append(e.content.cloneNode(!0));
  }
  connectedCallback() {
    this.getAttribute("disabled") ? l(this, y, ae).call(this) : l(this, y, Ie).call(this);
  }
  disconnectedCallback() {
    l(this, y, ae).call(this);
  }
  attributeChangedCallback(e, t, o) {
    e !== "disabled" || t === o || (o === null ? l(this, y, Ie).call(this) : l(this, y, ae).call(this));
  }
}
z = new WeakMap(), E = new WeakMap(), L = new WeakMap(), F = new WeakMap(), y = new WeakSet(), Ie = function() {
  if ((!n(this, F) || n(this, F).signal.aborted) && u(this, F, new AbortController()), u(this, z, this.shadowRoot.getElementById("dialog")), u(this, E, this.firstElementChild), n(this, E) !== null) {
    n(this, E).setAttribute("slot", "table"), this.shadowRoot.querySelector('slot[name="table"]').assign(n(this, E));
    const e = {
      signal: n(this, F).signal
    };
    Array.from(this.shadowRoot.querySelectorAll(".toggle")).forEach((t) => {
      t.addEventListener("click", l(this, y, Je).bind(this), e);
    }), n(this, z).addEventListener("keydown", (t) => {
      t.key === "Escape" && (t.preventDefault(), l(this, y, le).call(this));
    });
  }
}, ae = function() {
  l(this, y, le).call(this), n(this, F).abort();
}, Ze = function() {
  n(this, L) === null && u(this, L, n(this, E).cloneNode(!0)), n(this, L) instanceof HTMLElement && n(this, E).insertAdjacentElement("afterend", n(this, L)), n(this, E).setAttribute("slot", "dialog"), this.shadowRoot.querySelector('slot[name="dialog"]').assign(n(this, E)), n(this, L).setAttribute("slot", "table"), this.shadowRoot.querySelector('slot[name="table"]').assign(n(this, L)), document.documentElement.classList.add("no-scroll"), n(this, z).showModal();
}, // Note: In Safari, the focus jumps back to the article wrapper instead of the toggle button by design
le = function() {
  n(this, E).setAttribute("slot", "table"), this.shadowRoot.querySelector('slot[name="table"]').assign(n(this, E)), n(this, L) instanceof HTMLElement && n(this, L).remove(), document.documentElement.classList.remove("no-scroll"), n(this, z).close();
}, Je = function() {
  n(this, z).open ? l(this, y, le).call(this) : l(this, y, Ze).call(this);
}, _(Ye, "observedAttributes", ["disabled"]);
customElements.define("table-expand", Ye);
const _t = `
	<style>
		:host {
			display: block;
		}

		iframe {
			width: 100%;
			height: auto;
			border: none;
		}

		:host(.content-rendered) ::slotted(a) {
			display: none;
		}
	</style>
	<slot></slot>
`, Ot = `
	<div class="rich-card">
		<div class="content">
			<div class="title">
				<span>
					<a href="" target="_blank"></a>
				</span>
			</div>
			<div class="description"></div>
			<div class="logo"></div>
		</div>
		<div class="image-container"></div>
	</div>

	<style>
		.rich-card {
			--logo-url: url("");

			display: grid;
			grid-template-columns: 70% 30%;
			border-radius: var(--K15t-radius-small);
			overflow: clip;
			border: 1px solid var(--K15t-border-neutral-strong);
			min-height: 5rem;
			position: relative;
			background-color: var(--K15t-background-neutral-subtle);

			&:has(:hover, :focus-visible) {
				background-color: var(--K15t-background-neutral-subtle-hovered);
				border-color: var(--K15t-border-neutral-strong-hovered);
			}

			&:has(.image-container:not([style*="background-image"])) {
				grid-template-columns: 100%
			}

			&[data-provider="youtube"] {
				--logo-url: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%20width%3D%2224px%22%20height%3D%2224px%22%3E%3Cpath%20fill%3D%22%23FF3D00%22%20d%3D%22M43.2%2C33.9c-0.4%2C2.1-2.1%2C3.7-4.2%2C4c-3.3%2C0.5-8.8%2C1.1-15%2C1.1c-6.1%2C0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4%2C31.6%2C4%2C28.2%2C4%2C24c0-4.2%2C0.4-7.6%2C0.8-9.9c0.4-2.1%2C2.1-3.7%2C4.2-4C12.3%2C9.6%2C17.8%2C9%2C24%2C9c6.2%2C0%2C11.6%2C0.6%2C15%2C1.1c2.1%2C0.3%2C3.8%2C1.9%2C4.2%2C4c0.4%2C2.3%2C0.9%2C5.7%2C0.9%2C9.9C44%2C28.2%2C43.6%2C31.6%2C43.2%2C33.9z%22%2F%3E%3Cpath%20fill%3D%22%23FFF%22%20d%3D%22M20%2031L20%2017%2032%2024z%22%2F%3E%3C%2Fsvg%3E");
			}

			&[data-provider="loom"] {
				--logo-url: url("data:image/svg+xml,%3Csvg%20width%3D%2224px%22%20height%3D%2224px%22%20viewBox%3D%220%200%2016%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%3E%3Cpath%20fill%3D%22%23625DF5%22%20d%3D%22M15%207.222h-4.094l3.546-2.047-.779-1.35-3.545%202.048%202.046-3.546-1.349-.779L8.78%205.093V1H7.22v4.094L5.174%201.548l-1.348.779%202.046%203.545-3.545-2.046-.779%201.348%203.546%202.047H1v1.557h4.093l-3.545%202.047.779%201.35%203.545-2.047-2.047%203.545%201.35.779%202.046-3.546V15h1.557v-4.094l2.047%203.546%201.349-.779-2.047-3.546%203.545%202.047.779-1.349-3.545-2.046h4.093L15%207.222zm-7%202.896a2.126%202.126%200%20110-4.252%202.126%202.126%200%20010%204.252z%22%2F%3E%3C%2Fsvg%3E");
			}

			&[data-provider="vimeo"] {
				--logo-url: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224px%22%20height%3D%2224px%22%20viewBox%3D%220%200%20512%20512%22%3E%3Crect%20width%3D%22512%22%20height%3D%22512%22%20rx%3D%2215%25%22%20fill%3D%22%231eb8eb%22%2F%3E%3Cpath%20d%3D%22m418%20185c-19%20109-128%20202-161%20223-32%2021-62-9-73-30-12-26-49-164-59-176-9-12-39%2012-39%2012l-13-19s59-71%20104-79c47-10%2047%2073%2059%20118%2011%2045%2018%2070%2027%2070%2010%200%2029-24%2049-63%2021-37-1-71-41-47%2017-95%20166-118%20147-9z%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fsvg%3E");
			}

			.content {
				padding: 1rem;
				display: flex;
				flex-direction: column;
				gap: 0.5rem;

				.title {
					gap: 0.5rem;
					text-wrap: balance;
					text-wrap: pretty;

					a {
						color: var(--K15t-link);
						text-decoration: none;
						text-underline-offset: 0.5ex;

						&:is(:hover, :focus-visible) {
							text-decoration: underline;
						}

						&::before {
							content: "";
							position: absolute;
							inset: 0;
						}
					}
				}

				.description {
					color: var(--K15t-foreground-subtle);
					font: var(--K15t-font-body-small);
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					overflow-y: hidden;
				}

				.logo {
					display: flex;
					align-items: center;
					color: var(--K15t-foreground-subtle);
					font: var(--K15t-font-body-small);
					line-height: var(--K15t-line-height-x-small);

					&::before {
						display: inline-block;
						aspect-ratio: 1 / 1;
						block-size: 1lh;
						background-image: var(--logo-url);
						background-size: contain;
						content: '';
						margin-inline-end: 0.5ch;
					}
				}
			}

			.image-container {
				width: 100%;
				height: 100%;
				background-color: var(--K15t-background-neutral);
				background-size: cover;
				background-position: center;
				background-repeat: no-repeat;

				&:not([style*="background-image"]) {
					display: none;
				}
			}
		}
	</style>
`, _e = ["embedded", "enriched"];
var ne;
class zt extends HTMLElement {
  constructor() {
    super();
    c(this, ne);
    this.attachShadow({
      mode: "open"
    });
    const e = document.createElement("template");
    e.innerHTML = _t, this.shadowRoot.appendChild(e.content.cloneNode(!0));
  }
  async connectedCallback() {
    const [e, t, o] = this.getLinkInfoFromSlot();
    if (!e || !o || !_e.includes(t)) {
      console.error("Error: Link info not found in slot content.");
      return;
    }
    u(this, ne, o);
    const r = await this.loadOEmbedData(o);
    if (!r) {
      console.error("Error: no oembed data found");
      return;
    }
    this.classList.add("content-rendered");
    try {
      t === _e[0] ? await this.renderIframe(r) : this.renderEnrichedCard(r), this.dispatchEvent(new Event("load"));
    } catch {
    }
  }
  /**
   * This method queries the shadow DOM for a `slot` element, extracts its assigned elements,
   * and then searches for the first `<a>` tag. It returns an array containing the following:
   *
   * @returns {Array}
   * 1. The link element (`<a>`) itself.
   * 2. The value of the `data-display-mode` attribute (if it exists).
   * 3. The `href` attribute of the `<a>` element (if it exists).
   */
  getLinkInfoFromSlot() {
    const o = this.shadowRoot.querySelector("slot").assignedElements().find((r) => r.nodeType === Node.ELEMENT_NODE && r.tagName.toLowerCase() === "a");
    return [o, o == null ? void 0 : o.getAttribute("data-display-mode"), o == null ? void 0 : o.href];
  }
  /**
   * This method attempts to parse the provided URL. If the URL is valid, it checks the hostname
   * to determine which oEmbed service URL should be used (for YouTube, Vimeo, Loom, etc.)
   *
   * @param {string} url - The URL of the content to generate the oEmbed URL for.
   * @returns {string|undefined} The oEmbed URL if the service is supported, otherwise undefined.
   */
  getOEmbedUrl(e) {
    let t;
    try {
      t = new URL(e);
    } catch {
      console.error("Invalid URL:", e);
      return;
    }
    const o = t.hostname.replace(/^www\./, "").toLowerCase(), a = (/* @__PURE__ */ new Map([["youtube.com", "https://www.youtube.com/oembed?url={url}&format=json"], ["youtu.be", "https://www.youtube.com/oembed?url={url}&format=json"], ["vimeo.com", "https://vimeo.com/api/oembed.json?url={url}"], ["player.vimeo.com", "https://vimeo.com/api/oembed.json?url={url}"], ["loom.com", "https://www.loom.com/v1/oembed?url={url}"]])).get(o);
    if (!a) {
      console.error("Unsupported service:", o);
      return;
    }
    return a.replace("{url}", encodeURIComponent(e));
  }
  /**
   * Loads oEmbed data from a given URL by fetching the corresponding oEmbed service URL.
   * Note: oEmbed data from YouTube has no field "description", it is available via YouTube API
   *
   * @param {string} url
   * @returns {Promise<Object|undefined>}
   */
  async loadOEmbedData(e) {
    const t = this.getOEmbedUrl(e);
    if (!t) {
      console.error("Error: no oembed service found");
      return;
    }
    try {
      return await (await fetch(t)).json();
    } catch (o) {
      console.error("Error loading oEmbed content:", o);
    }
  }
  /**
   * Renders an iframe based on oEmbed data
   * @param {Object} oEmbedData
   */
  renderIframe(e) {
    return new Promise((t, o) => {
      const r = this.parseIframe(e.html);
      r.onload = t, r.onerror = o;
      const a = Number(r.getAttribute("width")), h = Number(r.getAttribute("height")), g = a && h ? a / h : 16 / 9;
      r.style.aspectRatio = String(g), r.setAttribute("data-component", "iframe"), this.shadowRoot.appendChild(r);
    });
  }
  /**
   * Parses an iframe string, sanitizes it to allow only specific tags and attributes,
   * and returns the corresponding iframe element.
   *
   * @param {string} iframeStr - The raw HTML string that contains the iframe code.
   * @returns {HTMLElement|null} The parsed iframe element, or `null` if no iframe is found.
   */
  parseIframe(e) {
    const t = At.sanitize(e, {
      ALLOWED_TAGS: ["iframe"],
      ALLOWED_ATTRS: ["src", "width", "height", "allowfullscreen", "title"]
    });
    return new DOMParser().parseFromString(t, "text/html").querySelector("iframe");
  }
  /**
   * Renders a rich card based on the provided data.
   * The card includes a title, description, provider logo, and a background image.
   * @param {Object} oEmbedData
   */
  renderEnrichedCard(e) {
    const t = document.createElement("template");
    t.innerHTML = Ot;
    const o = t.content.cloneNode(!0), r = o.querySelector(".rich-card"), a = o.querySelector(".logo"), h = o.querySelector(".title a"), g = o.querySelector(".description"), f = o.querySelector(".image-container");
    h.textContent = e.title ?? "", h.href = n(this, ne), g.textContent = e.description ?? "", e.thumbnail_url && (f.style.backgroundImage = `url(${e.thumbnail_url})`), e.provider_name && (r.setAttribute("data-provider", e.provider_name.toLowerCase()), a.textContent = e.provider_name), this.shadowRoot.appendChild(o);
  }
}
ne = new WeakMap();
customElements.define("smart-link", zt);
var N, $, H, Y, P, v, Qe, Xe, et, tt, ot, Q, ue, me, ge;
class Ft extends HTMLElement {
  constructor() {
    super(...arguments);
    c(this, v);
    /** @type {HTMLButtonElement[]} */
    c(this, N, []);
    /** @type {HTMLElement[]} */
    c(this, $, []);
    c(this, H, 0);
    c(this, Y, !1);
    /** @type {AbortController | null} */
    c(this, P, null);
    /** @type {(event: MouseEvent) => void} */
    c(this, ue, (e) => {
      if (!(e.target instanceof Element))
        return;
      const t = e.target.closest("[role='tab']"), o = t ? n(this, N).indexOf(t) : -1;
      o !== -1 && l(this, v, Q).call(this, o);
    });
    /** @type {(event: Event) => void} */
    c(this, me, (e) => {
      if (!(e.target instanceof Element))
        return;
      const t = e.target.closest("[role='tabpanel']"), o = n(this, $).indexOf(t);
      o !== -1 && l(this, v, Q).call(this, o, {
        focus: !1
      });
    });
    /** @type {(event: KeyboardEvent) => void} */
    c(this, ge, (e) => {
      if (!(e.target instanceof Element))
        return;
      const t = e.target.closest("[role='tab']");
      if (!t || !n(this, N).includes(t))
        return;
      const o = n(this, N).length - 1, r = {
        ArrowLeft: n(this, H) === 0 ? o : n(this, H) - 1,
        ArrowRight: n(this, H) === o ? 0 : n(this, H) + 1,
        Home: 0,
        End: o
      };
      e.key in r && (e.preventDefault(), l(this, v, Q).call(this, r[e.key]));
    });
  }
  connectedCallback() {
    if (n(this, Y) || u(this, Y, l(this, v, Qe).call(this)), !n(this, Y))
      return;
    u(this, P, new AbortController());
    const {
      signal: e
    } = n(this, P);
    this.addEventListener("click", n(this, ue), {
      signal: e
    }), this.addEventListener("keydown", n(this, ge), {
      signal: e
    }), this.addEventListener("beforematch", n(this, me), {
      signal: e
    });
  }
  disconnectedCallback() {
    var e;
    (e = n(this, P)) == null || e.abort(), u(this, P, null);
  }
}
N = new WeakMap(), $ = new WeakMap(), H = new WeakMap(), Y = new WeakMap(), P = new WeakMap(), v = new WeakSet(), /**
 * One-time DOM enhancement; listeners are wired per connect.
 * @returns {boolean} whether the markup could be enhanced
 */
Qe = function() {
  const e = this.querySelector(':scope > [data-component="tabs"]'), t = e == null ? void 0 : e.querySelector(":scope > ul");
  if (!e || !t)
    return !1;
  const o = l(this, v, Xe).call(this, t), r = [...o.querySelectorAll("[role='tab']")], a = [...e.querySelectorAll(":scope > section")];
  return !r.length || !a.length ? !1 : (t.replaceWith(o), u(this, N, r), u(this, $, a), l(this, v, ot).call(this), l(this, v, Q).call(this, 0, {
    focus: !1
  }), !0);
}, /**
 * @param {HTMLUListElement} list
 * @returns {HTMLElement}
 */
Xe = function(e) {
  const t = document.createElement("scroll-shadow");
  t.setAttribute("role", "tablist");
  const o = document.createElement("div");
  o.classList.add("tabs-items");
  for (const r of e.querySelectorAll("a"))
    o.append(l(this, v, et).call(this, r));
  return t.append(o), t;
}, /**
 * @param {HTMLAnchorElement} link
 * @returns {HTMLButtonElement}
 */
et = function(e) {
  const t = l(this, v, tt).call(this, e.getAttribute("href")), o = document.createElement("button");
  return o.setAttribute("type", "button"), o.setAttribute("role", "tab"), o.setAttribute("id", `tab-${t}`), o.setAttribute("aria-controls", t), o.setAttribute("aria-selected", "false"), o.setAttribute("tabindex", "-1"), o.textContent = e.textContent, o;
}, /**
 * @param {string} href
 * @returns {string}
 */
tt = function(e) {
  const {
    hash: t
  } = new URL(e, document.baseURI);
  return decodeURIComponent(t.slice(1));
}, ot = function() {
  for (const e of n(this, $))
    e.setAttribute("role", "tabpanel"), e.setAttribute("aria-labelledby", `tab-${e.id}`);
}, /**
 * @param {number} index
 * @param {{ focus?: boolean }} [options]
 */
Q = function(e, {
  focus: t = !0
} = {}) {
  u(this, H, e);
  for (const [o, r] of n(this, N).entries()) {
    const a = o === e;
    r.setAttribute("aria-selected", String(a)), r.setAttribute("tabindex", a ? "0" : "-1");
  }
  for (const [o, r] of n(this, $).entries()) {
    const a = o === e;
    a ? r.removeAttribute("hidden") : r.setAttribute("hidden", "until-found"), r.setAttribute("tabindex", a ? "0" : "-1");
  }
  t && n(this, N)[e].focus();
}, ue = new WeakMap(), me = new WeakMap(), ge = new WeakMap();
customElements.define("theme-tabs", Ft);
const nt = (i) => (i.getAttribute("aria-describedby") ?? "").split(/\s+/).filter(Boolean);
function Ht(i, s) {
  const e = nt(i);
  e.includes(s) || i.setAttribute("aria-describedby", [...e, s].join(" "));
}
function Bt(i, s) {
  const e = nt(i), t = e.filter((o) => o !== s);
  t.length !== e.length && (t.length ? i.setAttribute("aria-describedby", t.join(" ")) : i.removeAttribute("aria-describedby"));
}
function st(i) {
  return (i == null ? void 0 : i.querySelector(":scope > legend")) ?? null;
}
function Kt(i) {
  var o;
  const t = (i.type === "checkbox" || i.type === "radio" ? st(i.closest("fieldset")) : null) ?? ((o = i.labels) == null ? void 0 : o[0]);
  return (t == null ? void 0 : t.textContent.trim()) || i.name;
}
const Vt = (i) => {
  const s = /* @__PURE__ */ new Map();
  for (const e of i.elements) {
    if (!e.name)
      continue;
    const t = s.get(e.name);
    t ? t.push(e) : s.set(e.name, [e]);
  }
  return s;
}, $t = (i, s) => {
  const e = [];
  for (const [t, o] of Vt(i)) {
    const r = `${i.dataset.formId}-${t}-error`, a = o[0].closest(".form-field"), h = s.get(t), g = document.getElementById(r);
    if (h === void 0 || !a) {
      g == null || g.remove();
      for (const f of o)
        f.removeAttribute("aria-invalid"), Bt(f, r);
      continue;
    }
    if (g)
      g.textContent = h;
    else {
      const f = document.createElement("p");
      f.classList.add("form-field-error"), f.id = r, f.textContent = h, a.append(f);
    }
    for (const f of o)
      f.setAttribute("aria-invalid", "true"), Ht(f, r);
    e.push({
      text: h,
      control: o[0]
    });
  }
  return e;
}, Pt = (i, s, e) => {
  const t = i.querySelector(".form-error");
  if (t && !e) {
    const h = t.firstElementChild;
    return h.textContent !== s && (h.textContent = s), t;
  }
  t == null || t.remove();
  const o = `${i.dataset.formId}-error-title`, r = document.createElement("p");
  r.id = o, r.textContent = s;
  const a = document.createElement("div");
  return a.classList.add("form-error"), a.setAttribute("role", "group"), a.setAttribute("aria-labelledby", o), a.tabIndex = -1, a.append(r), i.prepend(a), a;
}, Ut = (i, s, e) => {
  const t = s.querySelector("ul");
  if (!e.length) {
    t == null || t.remove();
    return;
  }
  const o = e.map(({
    text: h,
    control: g
  }) => (g.id || (g.id = `${i.dataset.formId}-${g.name}-control`), {
    href: `#${g.id}`,
    text: `${Kt(g)}: ${h}`
  })), r = o.map(({
    href: h,
    text: g
  }) => `${h}
${g}`).join(`
`);
  if ((t == null ? void 0 : t.dataset.entries) === r)
    return;
  const a = document.createElement("ul");
  a.dataset.entries = r;
  for (const {
    href: h,
    text: g
  } of o) {
    const f = document.createElement("li"), q = document.createElement("a");
    q.href = h, q.textContent = g, f.append(q), a.append(f);
  }
  t ? t.replaceWith(a) : s.append(a);
};
function Ce(i, s, e = !1) {
  var a;
  const t = $t(i, (s == null ? void 0 : s.fields) ?? /* @__PURE__ */ new Map());
  if (!s)
    return (a = i.querySelector(".form-error")) == null || a.remove(), null;
  const o = s.fields.size && !t.length ? s.fallbackMessage : s.message, r = Pt(i, o, e);
  return Ut(i, r, t), r;
}
const it = "[data-honeypot]";
function jt(i) {
  const s = {};
  for (const e of i.elements) {
    const {
      name: t
    } = e;
    if (!(!t || e.matches(it) || e instanceof HTMLButtonElement))
      switch (e.type) {
        // Service uses stored default for hidden inputs; not serialized.
        case "hidden":
        // A named button is not a field. `<button>` is already out above; these are the
        // `<input>` spellings of the same thing.
        case "submit":
        case "reset":
        case "button":
        case "image":
        // `value` is `C:\fakepath\…`, and the contract carries strings — a file cannot travel
        // here at all, so sending that path would be worse than sending nothing.
        case "file":
          break;
        case "select-multiple":
          s[t] = [...e.selectedOptions].map((o) => o.value);
          break;
        case "checkbox":
          s[t] ?? (s[t] = []), e.checked && s[t].push(e.value);
          break;
        // Service allowlists values; omit unselected groups instead of empty string.
        case "radio":
          e.checked && (s[t] = e.value);
          break;
        // Every text-like type serializes as its value, which is what carries a field type the
        // service adds later — email, tel, url, number, date — without a change here. A type
        // the browser does not recognize reports as `text`, so it lands here too. So does a
        // single select: the macro emits no empty option, so the browser has one selected from
        // the start and there is no unselected state to omit the way `radio` has.
        default:
          s[t] = e.value;
      }
  }
  return s;
}
const Wt = 100;
var T, Z;
class Gt {
  /**
   * @param {HTMLElement} host what the region is appended to. Put it outside anything the host
   *   replaces, so the region outlives the replacement.
   * @param {string} [className] a hook of the caller's own, so nothing has to select on a shared
   *   utility class.
   */
  constructor(s, e) {
    /** @type {HTMLElement} */
    c(this, T);
    /** @type {ReturnType<typeof setTimeout> | undefined} */
    c(this, Z);
    u(this, T, document.createElement("div")), n(this, T).classList.add("sr-only"), n(this, T).setAttribute("role", "status"), e && n(this, T).classList.add(e), s.append(n(this, T));
  }
  /**
   * Speaks `text`. Only a *change* to a live region is announced, so the region is emptied now
   * and filled in a later task, which makes even a repeated message read as new. A newer
   * announcement supersedes one still pending.
   * @param {string} text
   */
  announce(s) {
    clearTimeout(n(this, Z)), n(this, T).textContent = "", u(this, Z, setTimeout(() => {
      n(this, T).textContent = s;
    }, Wt));
  }
  /** Silences the region now, dropping an announcement still pending. */
  clear() {
    clearTimeout(n(this, Z)), n(this, T).textContent = "";
  }
}
T = new WeakMap(), Z = new WeakMap();
const Oe = {
  required: "macro.form.error.required.label",
  max_length: "macro.form.error.maxLength.label",
  invalid_option: "macro.form.error.invalidOption.label",
  single_value: "macro.form.error.singleValue.label",
  unknown_field: "macro.form.error.unknownField.label"
};
function ke(i) {
  return x(Object.hasOwn(Oe, i) ? Oe[i] : "macro.form.error.invalid.label");
}
const rt = (i) => i.valueMissing || i.customError ? "required" : i.tooLong ? "max_length" : "invalid";
function Yt(i) {
  const s = /* @__PURE__ */ new Map();
  for (const e of i.elements)
    !e.name || s.has(e.name) || !e.willValidate || e.validity.valid || s.set(e.name, {
      field: e.name,
      code: rt(e.validity)
    });
  return [...s.values()];
}
const ce = "fieldset[data-required]";
function Zt(i, s, {
  defaults: e = !1
} = {}) {
  for (const t of i.querySelectorAll(ce)) {
    const o = [...t.querySelectorAll('input[type="checkbox"]')], r = o.some((a) => e ? a.defaultChecked : a.checked);
    for (const a of o)
      a.setCustomValidity(r ? "" : s);
  }
}
const Jt = "__token/forms", Qt = "forms-api/submit";
class ye extends Error {
  constructor() {
    super(...arguments);
    _(this, "name", "SubmissionError");
  }
}
class at extends ye {
  /**
   * @param {string} message
   * @param {FieldError[]} errors
   */
  constructor(e, t) {
    super(e);
    _(this, "name", "ValidationError");
    /** @type {FieldError[]} */
    _(this, "errors");
    this.errors = t;
  }
}
const Xt = (i) => {
  var e;
  const s = (e = St(i)) == null ? void 0 : e.formsEmailDomain;
  if (!s)
    throw new ye("The forms service host is not configured");
  return new URL(Qt, `https://${s}`);
}, eo = () => {
  const i = ze().pathname;
  return `/${self.location.pathname.slice(i.length)}`;
};
async function to(i) {
  const s = await fetch(new URL(Jt, ze()), {
    signal: i
  });
  if (!s.ok)
    throw new ye("Token request failed");
  const {
    token: e
  } = await s.json();
  return e;
}
async function oo({
  formId: i,
  fields: s,
  honeypot: e = "",
  signal: t
}) {
  const o = await to(t), r = await fetch(Xt(o), {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({
      jwt: o,
      path: eo(),
      formId: i,
      url: e,
      fields: s
    }),
    signal: t
  });
  if (r.ok)
    return;
  const a = await r.json().catch(() => null);
  throw (a == null ? void 0 : a.code) === "VALIDATION_FAILED" && Array.isArray(a.errors) ? new at("Form validation failed", a.errors) : new ye(`Form submission failed (${(a == null ? void 0 : a.code) ?? r.status})`);
}
var m, D, B, C, d, lt, ct, dt, ht, ut, mt, pe, de, X, De, he, Me, Re, gt, pt, fe, se, be, ve, ft;
class no extends HTMLElement {
  constructor() {
    super(...arguments);
    c(this, d);
    /** @type {HTMLFormElement | null} */
    c(this, m, null);
    /** @type {LiveRegion | null} */
    c(this, D, null);
    /** @type {AbortController | null} */
    c(this, B, null);
    /** @type {FormErrorState | null} */
    c(this, C, null);
    /** @type {() => void} */
    c(this, pe, () => n(this, m).removeAttribute("tabindex"));
    /** @type {(event: SubmitEvent) => void} */
    c(this, fe, async (e) => {
      var o;
      if (e.preventDefault(), l(this, d, De).call(this))
        return;
      const t = Yt(n(this, m));
      if (t.length) {
        l(this, d, he).call(this, l(this, d, Me).call(this, t));
        return;
      }
      l(this, d, Re).call(this), l(this, d, X).call(this, !0);
      try {
        await oo({
          formId: n(this, m).dataset.formId,
          fields: jt(n(this, m)),
          // Absent unless spam protection is on.
          honeypot: (o = n(this, m).querySelector(it)) == null ? void 0 : o.value,
          signal: n(this, B).signal
        }), l(this, d, X).call(this, !1), l(this, d, pt).call(this);
      } catch (r) {
        if (r.name === "AbortError")
          return;
        l(this, d, X).call(this, !1), r instanceof at ? l(this, d, he).call(this, l(this, d, Me).call(this, r.errors)) : l(this, d, he).call(this, {
          message: x("macro.form.error.general.label"),
          fields: /* @__PURE__ */ new Map()
        });
      }
    });
    /** @type {(event: Event) => void} */
    c(this, se, (e) => {
      const t = e.target instanceof Element ? e.target : null;
      (t == null ? void 0 : t.type) === "checkbox" && t.closest(ce) && l(this, d, de).call(this), l(this, d, gt).call(this, t), !(!n(this, C) && !n(this, m).querySelector(".form-error")) && Ce(n(this, m), n(this, C));
    });
    /**
     * Undoes what the component added; a native reset restores values only, so a leftover message
     * would misreport.
     * @type {(event: Event) => void}
     */
    c(this, be, (e) => {
      if (l(this, d, De).call(this)) {
        e.preventDefault();
        return;
      }
      n(this, D).announce(x("macro.form.reset.label")), l(this, d, Re).call(this), l(this, d, de).call(this, {
        defaults: !0
      });
    });
    /** @type {(event: MouseEvent) => void} */
    c(this, ve, (e) => {
      var o;
      const t = e.target instanceof Element ? e.target.closest('.form-error a[href^="#"]') : null;
      t && (e.preventDefault(), (o = document.getElementById(decodeURIComponent(t.hash.slice(1)))) == null || o.focus({
        focusVisible: !0
      }));
    });
  }
  connectedCallback() {
    if (!n(this, m) && !l(this, d, lt).call(this))
      return;
    l(this, d, X).call(this, !1), u(this, B, new AbortController());
    const {
      signal: e
    } = n(this, B);
    n(this, m).addEventListener("submit", n(this, fe), {
      signal: e
    }), n(this, m).addEventListener("input", n(this, se), {
      signal: e
    }), n(this, m).addEventListener("change", n(this, se), {
      signal: e
    }), n(this, m).addEventListener("reset", n(this, be), {
      signal: e
    }), n(this, m).addEventListener("click", n(this, ve), {
      signal: e
    });
  }
  disconnectedCallback() {
    var e, t;
    (e = n(this, B)) == null || e.abort(), u(this, B, null), (t = n(this, D)) == null || t.clear();
  }
}
m = new WeakMap(), D = new WeakMap(), B = new WeakMap(), C = new WeakMap(), d = new WeakSet(), /**
 * One-time DOM enhancement; listeners are wired per connect.
 * @returns {boolean} whether the markup could be enhanced
 */
lt = function() {
  const e = this.querySelector(':scope > [data-component="form"] form'), t = e == null ? void 0 : e.querySelector(".form-submit-button");
  return !e || !t ? !1 : (u(this, m, e), l(this, d, de).call(this), e.noValidate = !0, l(this, d, ct).call(this), l(this, d, dt).call(this), l(this, d, ht).call(this), l(this, d, ut).call(this), u(this, D, new Gt(this, "form-live-region")), !0);
}, /** Gives the form an accessible name, so focusing it announces something. */
ct = function() {
  const e = n(this, m);
  !!!(document.getElementById(e.getAttribute("aria-labelledby") ?? "") || e.getAttribute("aria-label")) && e.dataset.formName && e.setAttribute("aria-label", e.dataset.formName);
}, /** States the constraint via `aria-label`, not legend text, so {@link fieldLabel} reads it unchanged. */
dt = function() {
  var t;
  const e = x("macro.form.requiredGroup.label");
  for (const o of n(this, m).querySelectorAll(ce)) {
    const r = (t = st(o)) == null ? void 0 : t.textContent.trim();
    r && o.setAttribute("aria-label", `${r} ${e}`);
  }
}, /** Explains the decorative asterisk once, for sighted users; `aria-hidden` since a screen reader hears it on the field. */
ht = function() {
  if (!n(this, m).querySelector(`:required, ${ce}`))
    return;
  const e = document.createElement("p");
  e.classList.add("form-required-key"), e.setAttribute("aria-hidden", "true"), e.textContent = x("macro.form.requiredKey.label"), n(this, m).prepend(e);
}, /** Wraps each select so `.form-field-select` can draw a custom caret; native select can't host one. */
ut = function() {
  for (const e of n(this, m).querySelectorAll("select:not([multiple])")) {
    const t = document.createElement("span");
    t.classList.add("form-field-select"), e.before(t), t.append(e);
  }
}, /** Focuses the form to announce its name; `tabindex` is removed on blur so a stray click can't refocus it. */
mt = function() {
  n(this, m).tabIndex = -1, n(this, m).focus({
    focusVisible: !0
  }), n(this, m).addEventListener("blur", n(this, pe), {
    once: !0
  });
}, pe = new WeakMap(), /**
 * Idempotent, and has to be re-run after any edit or reset that can change a group.
 * @param {{ defaults?: boolean }} [options]
 */
de = function(e) {
  Zt(n(this, m), ke("required"), e);
}, /**
 * `aria-busy` says nothing on its own, so the wait is also spoken through the live region.
 * @param {boolean} busy
 */
X = function(e) {
  n(this, m).setAttribute("aria-busy", String(e)), e ? n(this, D).announce(x("macro.form.pending.label")) : n(this, D).clear();
  for (const t of n(this, m).querySelectorAll(".form-actions button, .form-submit-button"))
    t.ariaDisabled = e ? "true" : null;
}, /** Restates the wait too: `aria-disabled` turning on under a focused button announces nothing. */
De = function() {
  return n(this, m).getAttribute("aria-busy") !== "true" ? !1 : (n(this, D).announce(x("macro.form.pending.label")), !0);
}, /**
 * Reports a failed submit as a *new* alert node, so focusing it announces even a repeated message.
 * @param {FormErrorState} errors
 */
he = function(e) {
  u(this, C, e), Ce(n(this, m), e, !0).focus({
    focusVisible: !0
  });
}, /**
 * @param {FieldError[]} errors
 * @returns {FormErrorState}
 */
Me = function(e) {
  return {
    message: x("macro.form.error.validation.label"),
    fallbackMessage: x("macro.form.error.general.label"),
    fields: new Map(e.map(({
      field: t,
      code: o
    }) => [t, ke(o)]))
  };
}, Re = function() {
  u(this, C, null), Ce(n(this, m), null);
}, /**
 * Re-checks the field rather than clearing on any edit: clearing early would read as corrected
 * while `:user-invalid` still fails it. A service-only code can't be re-checked, so it always
 * clears on first edit — the only feedback that path gets.
 * @param {Element | null} target the edited control
 */
gt = function(e) {
  var o;
  const t = e == null ? void 0 : e.getAttribute("name");
  if (!(!t || !((o = n(this, C)) != null && o.fields.has(t)))) {
    if (e.willValidate && !e.validity.valid) {
      n(this, C).fields.set(t, ke(rt(e.validity)));
      return;
    }
    n(this, C).fields.delete(t), n(this, C).fields.size === 0 && u(this, C, null);
  }
}, pt = function() {
  const e = `${n(this, m).dataset.formId}-success-title`, t = document.createElement("p");
  t.id = e, t.textContent = n(this, m).dataset.successMessage || x("macro.form.success.label");
  const o = document.createElement("div");
  o.classList.add("form-success"), o.setAttribute("role", "group"), o.setAttribute("aria-labelledby", e), o.tabIndex = -1, o.append(t);
  const r = document.createElement("button");
  r.type = "button", r.classList.add("form-restart-button"), r.textContent = x("macro.form.restart.label");
  const a = document.createElement("div");
  a.classList.add("form-actions"), a.append(r), r.addEventListener("click", () => l(this, d, ft).call(this, o, a)), n(this, m).replaceWith(o, a), o.focus({
    focusVisible: !0
  });
}, fe = new WeakMap(), se = new WeakMap(), be = new WeakMap(), ve = new WeakMap(), /**
 * Puts the form back in place of the success message; same node, still bound to this connect's
 * listeners.
 * @param {HTMLElement} success
 * @param {HTMLElement} actions
 */
ft = function(e, t) {
  n(this, m).reset(), n(this, D).clear(), t.remove(), e.replaceWith(n(this, m)), l(this, d, mt).call(this);
};
customElements.define("theme-form", no);
so();
io();
ro();
ao() || lo();
customElements.define("copy-page-tree", class extends HTMLElement {
  connectedCallback() {
    if (!this.target) return;
    const i = document.getElementById(this.target);
    i && this.appendChild(i.cloneNode(!0));
  }
  get target() {
    return this.getAttribute("target");
  }
});
function so() {
  const i = self.matchMedia("(min-width: 768px)"), s = yt();
  e(i), t(), i.addEventListener("change", e);
  function e(o) {
    document.querySelectorAll("image-lightbox").forEach((a) => {
      a.toggleAttribute("disabled", !o.matches || s);
    });
  }
  function t() {
    document.querySelectorAll("table-expand").forEach((o) => {
      o.toggleAttribute("disabled", s);
    });
  }
}
function io() {
  const i = document.querySelectorAll("#content image-lightbox img:not([width])"), s = (e) => {
    const t = () => {
      e.naturalWidth > 0 && e.setAttribute("width", e.naturalWidth), e.naturalHeight > 0 && e.setAttribute("height", e.naturalHeight);
    };
    e.complete ? t() : e.addEventListener("load", t, {
      once: !0
    });
  };
  i.forEach(s);
}
function ro() {
  document.querySelectorAll('.task-item-label > [data-component="task-list"]').forEach((i) => {
    var s;
    return (s = i.closest(".task-item")) == null ? void 0 : s.appendChild(i);
  }), document.querySelectorAll(".task-item-label > p").forEach((i) => {
    i.replaceWith(...i.childNodes);
  });
}
function ao() {
  const i = wt("site");
  return i.visibleToSearchEngines && !i.isProtectionEnabled && i.isPublished;
}
function lo() {
  customElements.whenDefined("ai-actions").then(() => {
    const i = document.querySelector("ai-actions"), s = /* @__PURE__ */ new Set(["open-in-chatgpt", "open-in-claude"]);
    i && (i.filter = (e) => !s.has(e));
  });
}
