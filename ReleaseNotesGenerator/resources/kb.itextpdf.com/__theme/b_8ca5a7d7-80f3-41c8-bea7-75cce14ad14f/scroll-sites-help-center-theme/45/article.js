var fe = Object.defineProperty;
var te = (s) => {
  throw TypeError(s);
};
var ve = (s, i, e) => i in s ? fe(s, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[i] = e;
var _ = (s, i, e) => ve(s, typeof i != "symbol" ? i + "" : i, e), $ = (s, i, e) => i.has(s) || te("Cannot " + e);
var n = (s, i, e) => ($(s, i, "read from private field"), e ? e.call(s) : i.get(s)), h = (s, i, e) => i.has(s) ? te("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(s) : i.set(s, e), u = (s, i, e, o) => ($(s, i, "write to private field"), o ? o.call(s, e) : i.set(s, e), e), a = (s, i, e) => ($(s, i, "access private method"), e);
import { i as we } from "./index-BQkERkoW.js";
import { g as ye } from "./placeholder-DMT-j6rL.js";
import { a as Ee, n as xe, N as Ce } from "./navigator-state-C3kdkL-g.js";
import { a as ke } from "./utils-ChjtKy_M.js";
import { t as Se } from "./i18n-DKG4M0Tj.js";
import Ae from "./purify.es-Cm3utOpm.js";
var x, D;
class Le extends HTMLElement {
  constructor() {
    super();
    /** @type NavigatorState | undefined */
    h(this, x);
    /** @type HTMLButtonElement | undefined */
    h(this, D);
    this.toggle = this.toggle.bind(this), this.onStorageEvent = this.onStorageEvent.bind(this), this.update = this.update.bind(this);
  }
  get cacheType() {
    return Ee("navigation_state", "functional") ? "storage" : "memory";
  }
  get expanded() {
    var e;
    return ((e = n(this, x)) == null ? void 0 : e.get({
      cache: this.cacheType
    })) !== "collapsed";
  }
  connectedCallback() {
    var e, o, t;
    u(this, x, xe), u(this, D, this.querySelector("#navigator-toggle")), (e = n(this, D)) == null || e.addEventListener("click", this.toggle), (o = n(this, x)) == null || o.addEventListener("change", this.update), (t = n(this, x)) == null || t.addEventListener("storage", this.onStorageEvent), window.addEventListener("storage", this.onStorageEvent), this.update();
  }
  disconnectedCallback() {
    var e, o, t;
    (e = n(this, D)) == null || e.removeEventListener("click", this.toggle), (o = n(this, x)) == null || o.removeEventListener("change", this.update), (t = n(this, x)) == null || t.removeEventListener("storage", this.onStorageEvent), window.removeEventListener("storage", this.onStorageEvent);
  }
  toggle() {
    var e;
    (e = n(this, x)) == null || e.set(this.expanded ? "collapsed" : "expanded", {
      cache: this.cacheType
    });
  }
  onStorageEvent(e) {
    "key" in e && e.key !== Ce || this.update();
  }
  update() {
    var e, o;
    (e = n(this, D)) == null || e.setAttribute("aria-expanded", String(this.expanded)), this.expanded && ((o = this.querySelector('#navigator-nav a[aria-current="page"]')) == null || o.scrollIntoView({
      block: "nearest"
    }));
  }
}
x = new WeakMap(), D = new WeakMap();
customElements.define("theme-navigator", Le);
const ne = document.createElement("template");
ne.innerHTML = `
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
const G = /* @__PURE__ */ new WeakMap();
var O;
class Te extends HTMLElement {
  constructor() {
    super();
    /** @type {HTMLElement[]} */
    h(this, O);
    const e = this.attachShadow({
      mode: "open"
    });
    e.appendChild(ne.content.cloneNode(!0)), u(this, O, Array.from(this.shadowRoot.querySelectorAll(".edge"))), G.set(this, new IntersectionObserver((o) => {
      o.forEach((t) => {
        const r = t.target.getAttribute("data-position"), l = t.isIntersecting ? 0 : 1;
        e.querySelector(".container").style.setProperty(`--_shadow-visibility-${r}`, l.toString());
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
    n(this, O).forEach((e) => G.get(this).observe(e));
  }
  disconnectedCallback() {
    G.get(this).disconnect();
  }
}
O = new WeakMap();
customElements.define("scroll-shadow", Te);
function De(s, i) {
  let e, o, t;
  return function(...r) {
    o = r, t = this, e || (s.apply(t, o), e = !0, setTimeout(() => {
      e = !1, o && (s.apply(t, o), o = null);
    }, i));
  };
}
var M, F, v, c, j, Y, ie, se, Z, re, q, le, Q, ae, ce;
class Ne {
  /**
   * @param {Config} config
   */
  constructor(i) {
    h(this, c);
    /** @type {HeadingNode[]} */
    h(this, M, []);
    /** @type {string | null} */
    h(this, F, null);
    /** @type {AbortController} */
    h(this, v);
    /** @type {Config} */
    _(this, "config");
    h(this, q, () => {
      const i = a(this, c, re).call(this);
      (i == null ? void 0 : i.id) !== n(this, c, j) && u(this, c, (i == null ? void 0 : i.id) || null, Y);
    });
    var o;
    const e = {
      elements: [],
      tocElement: null,
      scrollOffset: 0
    };
    if (this.config = {
      ...e,
      ...i,
      elements: ((o = i.elements) == null ? void 0 : o.filter(a(this, c, ie))) || []
    }, !(!this.config.elements || !this.config.elements.length)) {
      if (!this.config.tocElement)
        throw new Error("No TOC element provided");
      return this;
    }
  }
  listen() {
    (!n(this, v) || n(this, v).signal.aborted) && u(this, v, new AbortController());
    const i = De(n(this, q).bind(this), 100), e = ke(a(this, c, ce).bind(this), 200);
    addEventListener("scroll", i, {
      signal: n(this, v).signal
    }), addEventListener("scrollend", i, {
      signal: n(this, v).signal
    }), addEventListener("resize", e, {
      signal: n(this, v).signal
    });
  }
  unlisten() {
    !n(this, v) || n(this, v).signal.aborted || (n(this, v).abort(), u(this, c, null, Y));
  }
  destroy() {
    var i;
    (i = this.config.tocElement) == null || i.replaceChildren(), this.unlisten();
  }
  init() {
    u(this, M, a(this, c, le).call(this, this.config.elements)), n(this, M).length && (a(this, c, ae).call(this), n(this, q).call(this), this.listen());
  }
}
M = new WeakMap(), F = new WeakMap(), v = new WeakMap(), c = new WeakSet(), j = function() {
  return n(this, F);
}, Y = function(i) {
  var e, o;
  if (i !== n(this, c, j)) {
    if (n(this, c, j)) {
      const t = (e = this.config.tocElement) == null ? void 0 : e.querySelector("a[href][aria-current]");
      t == null || t.removeAttribute("aria-current");
    }
    if (i !== null) {
      const t = (o = this.config.tocElement) == null ? void 0 : o.querySelector(`a[href="#${i}"]`);
      t && (t.setAttribute("aria-current", "true"), t.scrollIntoView({
        block: "nearest",
        inline: "nearest"
      }));
    }
    u(this, F, i);
  }
}, /**
 * Validates if an element is a valid heading for table of contents
 * @param {HTMLElement} element
 * @returns {boolean}
 */
ie = function(i) {
  var e;
  return i instanceof HTMLHeadingElement && !!i.id && !!((e = i.textContent) != null && e.trim().length);
}, /**
 * Checks if an element is hidden inside a closed <details> or <dialog> element.
 * @param {HTMLElement} element
 * @returns {boolean}
 */
se = function(i) {
  const e = i.closest("details") ?? i.closest("dialog");
  return !(e && !e.open);
}, /**
 * Checks if an element is visible in the current viewport.
 * @param {HTMLElement} element
 * @returns {boolean}
 */
Z = function(i) {
  const e = i.getBoundingClientRect(), o = window.innerHeight || document.documentElement.clientHeight;
  return e.top < o && e.bottom > 0;
}, /** @returns {HTMLElement | null} */
re = function() {
  const i = this.config.elements.filter(a(this, c, se)), e = window.scrollY || document.documentElement.scrollTop;
  if (i.length === 0)
    return null;
  if (e <= this.config.scrollOffset) {
    const t = i[0];
    return a(this, c, Z).call(this, t) ? t : null;
  }
  for (let t = i.length - 1; t >= 0; t--) {
    const r = i[t];
    if (Math.round(r.getBoundingClientRect().top + e) <= Math.round(e + this.config.scrollOffset))
      return r;
  }
  const o = i[0];
  return a(this, c, Z).call(this, o) ? o : null;
}, q = new WeakMap(), /**
 * Parses the elements and converts them into a uniform structure.
 * @param {HTMLElement[]} elements
 * @returns {HeadingNode[]}
 */
le = function(i) {
  const e = [], o = [];
  return i.forEach((t) => {
    const r = parseInt(t.tagName.substring(1)), l = {
      text: (
        /** @type {string} */
        t.textContent.trim()
      ),
      id: t.id,
      level: r,
      element: t,
      children: []
    };
    for (; o.length > 0 && o[o.length - 1].level >= r; )
      o.pop();
    o.length === 0 ? e.push(l) : o[o.length - 1].node.children.push(l), o.push({
      level: r,
      node: l
    });
  }), e;
}, /**
 * @param {HeadingNode[]} items
 * @returns {HTMLOListElement | null}
 */
Q = function(i) {
  if (!i || i.length === 0)
    return null;
  const e = document.createElement("ol");
  return e.classList.add("toc-list"), i.forEach((o) => {
    const t = document.createElement("li");
    t.classList.add("toc-list-item", `node-name--H${o.level}`);
    const r = document.createElement("a");
    if (r.href = `#${o.id}`, r.textContent = o.text, r.classList.add("toc-link"), t.appendChild(r), o.children && o.children.length > 0) {
      const l = a(this, c, Q).call(this, o.children);
      l && t.appendChild(l);
    }
    e.appendChild(t);
  }), e;
}, ae = function() {
  if (!this.config.tocElement)
    return;
  const i = a(this, c, Q).call(this, n(this, M));
  i && this.config.tocElement.replaceChildren(i);
}, ce = function() {
  this.unlisten(), n(this, q).call(this), this.listen();
};
function ze() {
  const s = document.createElement("div");
  s.style.scrollMargin = getComputedStyle(document.documentElement).getPropertyValue("--theme-scroll-offset") || "0px", document.body.append(s);
  const i = getComputedStyle(s).scrollMargin;
  return s.remove(), parseInt(i);
}
var A;
class Me extends HTMLElement {
  constructor() {
    super();
    h(this, A);
    if (!this.targetId)
      throw new Error("No `for` attribute provided");
    u(this, A, new Ne({
      tocElement: this,
      elements: Array.from(document.getElementById(this.targetId).querySelectorAll("h2,h3,h4,h5,h6")),
      scrollOffset: ze()
    }));
  }
  get targetId() {
    return this.getAttribute("for");
  }
  connectedCallback() {
    n(this, A) && n(this, A).init();
  }
  disconnectedCallback() {
    n(this, A) && n(this, A).destroy();
  }
}
A = new WeakMap();
customElements.define("theme-toc", Me);
const de = document.createElement("template");
de.innerHTML = `
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
var R, C, k, y, I, g, J, V, ue, ge, H, X;
class he extends HTMLElement {
  constructor() {
    super();
    h(this, g);
    /** @type {AbortController} */
    h(this, R);
    /** @type {HTMLDialogElement} */
    h(this, C);
    /** @type {HTMLElement | null} */
    h(this, k, null);
    /** @type {HTMLElement | null} */
    h(this, y, null);
    /** @type {ElementInternals} */
    h(this, I);
    this.attachShadow({
      mode: "open",
      slotAssignment: "manual"
    }).appendChild(de.content.cloneNode(!0)), u(this, I, this.attachInternals());
  }
  attributeChangedCallback(e, o, t) {
    e !== "disabled" || o === t || (t === null ? a(this, g, J).call(this) : a(this, g, V).call(this));
  }
  connectedCallback() {
    this.getAttribute("disabled") ? a(this, g, V).call(this) : a(this, g, J).call(this);
  }
  disconnectedCallback() {
    a(this, g, V).call(this);
  }
}
R = new WeakMap(), C = new WeakMap(), k = new WeakMap(), y = new WeakMap(), I = new WeakMap(), g = new WeakSet(), J = function() {
  if (u(this, R, new AbortController()), u(this, C, this.shadowRoot.getElementById("dialog")), u(this, k, this.firstElementChild), !n(this, k))
    return;
  this.shadowRoot.querySelector('slot[name="thumbnail"]').assign(n(this, k));
  const e = {
    signal: n(this, R).signal
  }, o = this.shadowRoot.querySelector(".toggle-open"), t = n(this, k).querySelector("img");
  t && (t.addEventListener("mouseenter", () => {
    var l;
    (l = n(this, I).states) == null || l.add("hover-thumbnail");
  }, e), t.addEventListener("mouseleave", () => {
    var l;
    (l = n(this, I).states) == null || l.delete("hover-thumbnail");
  }, e)), Array.from(this.shadowRoot.querySelectorAll(".toggle")).forEach((l) => {
    l.addEventListener("click", a(this, g, X).bind(this), e);
  }), this.shadowRoot.querySelector(".thumbnail").addEventListener("click", (l) => {
    const d = l.composedPath();
    d.some((m) => m instanceof Element && m.localName === "figcaption") || d.includes(o) || a(this, g, X).call(this, l);
  }, e), n(this, C).addEventListener("keydown", (l) => {
    l.key === "Escape" && (l.preventDefault(), a(this, g, H).call(this));
  }, e), n(this, C).addEventListener("click", a(this, g, ue).bind(this), e);
}, V = function() {
  var e;
  a(this, g, H).call(this), (e = n(this, R)) == null || e.abort();
}, /**
 * @param {PointerEvent} event
 */
ue = function(e) {
  e.target.nodeName === "DIALOG" && a(this, g, H).call(this);
}, ge = function() {
  n(this, y) === null && (u(this, y, n(this, k).cloneNode(!0)), n(this, y).setAttribute("slot", "lightbox")), n(this, y) instanceof HTMLElement && n(this, k).insertAdjacentElement("afterend", n(this, y)), this.shadowRoot.querySelector('slot[name="lightbox"]').assign(n(this, y)), document.documentElement.classList.add("no-scroll"), n(this, C).showModal();
}, // Note: In Safari, the focus jumps back to the article thumbnail instead of the toggle button by design
H = function() {
  n(this, y) instanceof HTMLElement && n(this, y).remove(), document.documentElement.classList.remove("no-scroll"), n(this, C).close();
}, /**
 * @param {PointerEvent} event
 */
X = function(e) {
  e.preventDefault(), n(this, C).open ? a(this, g, H).call(this) : a(this, g, ge).call(this);
}, _(he, "observedAttributes", ["disabled"]);
customElements.define("image-lightbox", he);
const w = {
  NONE: "none",
  ASC: "ascending",
  DESC: "descending"
};
var b, N, K;
class qe extends HTMLElement {
  constructor() {
    super();
    /** @type {HTMLTableElement} */
    h(this, b);
    /**
     *  @type {boolean}
     *
     *  This flag indicates whether the `th` element is located inside the `tbody`.
     *
     *  It helps adapt to two different table structures:
     *  1. When the table structure is `<table><thead><tr><th></th></tr></thead><tbody>...</tbody></table>`
     *  2. When the table structure is `<table><tbody><tr><th></th></tr>...</tbody></table>`,
     */
    h(this, N);
    h(this, K, !1);
    /**
     * @param {HTMLTableElement} tableElement
     * @return {boolean}
     */
    _(this, "containsMergedCells", (e) => [...e.querySelectorAll("[rowspan], [colspan]")].filter((r) => {
      const l = Number(r.getAttribute("rowspan")), d = Number(r.getAttribute("colspan"));
      return l > 1 || d > 1;
    }).length >= 1);
    this.sortTable = this.sortTable.bind(this), this.onButtonClick = this.onButtonClick.bind(this);
  }
  connectedCallback() {
    u(this, b, this.querySelector("table")), n(this, b) && (this.containsMergedCells(n(this, b)) || this.containsValidTh(n(this, b)) && (n(this, K) || (this.transformThStructure(n(this, b)), this.addTableCaption(n(this, b)), this.preserveInitialOrder(n(this, b))), u(this, K, !0), this.addEventListeners(n(this, b))));
  }
  disconnectedCallback() {
    this.removeEventListeners(n(this, b));
  }
  /**
   * @param {HTMLTableElement} tableElement
   * @returns {boolean}
   *
   * Checks if the table contains a <th> element either in <thead> or <tbody>, but not both.
   */
  transformThStructure(e) {
    const t = (n(this, N) ? e.querySelector("tbody tr") : e.querySelector("thead tr")).getElementsByTagName("th");
    Array.from(t).forEach((r) => {
      const l = Array.from(r.childNodes), d = document.createElement("button");
      d.type = "button", l.forEach((S) => d.appendChild(S));
      const m = document.createElement("span");
      m.setAttribute("aria-hidden", "true"), d.appendChild(m), r.appendChild(d);
    });
  }
  /**
   * @param {HTMLTableElement} tableElement
   *
   * Adds a visually hidden caption element to the table
   */
  addTableCaption(e) {
    const o = document.createElement("caption");
    o.className = "sr-only", o.textContent = Se("macro.table.columnSort.label"), e.insertBefore(o, e.firstChild);
  }
  /**
   * @param {HTMLTableElement} tableElement
   * @returns {boolean}
   *
   * Checks if the table contains a <th> element either in <thead> or <tbody>, but not both.
   */
  containsValidTh(e) {
    const o = e.querySelector("thead th"), t = e.querySelector("tbody th");
    return u(this, N, !!t), o && t ? (console.error("Table structure is incorrect !"), !1) : !(!o && !t);
  }
  /**
   * @param {HTMLTableElement} tableElement
   *
   * Preserves the initial order of the rows by setting a `data-initial-index` attribute on each row.
   * This is used to restore the initial row order when `aria-sort` is removed.
   */
  preserveInitialOrder(e) {
    e.querySelectorAll("tbody tr").forEach((t, r) => {
      t.setAttribute("data-initial-index", r);
    });
  }
  /**
   * @param {MouseEvent} event
   */
  onButtonClick(e) {
    const t = e.target.closest("th");
    if (!t || t.dataset.sort === "")
      return;
    const r = Array.from(t.parentElement.children).indexOf(t);
    this.sortTable(n(this, b), r);
  }
  addEventListeners(e) {
    e.querySelectorAll("th button").forEach((t) => {
      t.addEventListener("click", this.onButtonClick);
    });
  }
  removeEventListeners(e) {
    e && e.querySelectorAll("th button").forEach((t) => {
      t.removeEventListener("click", this.onButtonClick);
    });
  }
  /**
   * @param {HTMLTableElement} tableElement
   * @param {number} columnIndex
   */
  sortTable(e, o) {
    const t = Array.from(e.querySelectorAll("tbody tr")), l = e.querySelectorAll("th")[o].getAttribute("aria-sort") || w.NONE, d = this.getNextSortType(l);
    this.updateSortType(e, o, d);
    let m = [];
    d === w.NONE ? m = this.restoreInitialOrder(t) : m = this.sortRows(t, o, d);
    const S = e.querySelector("tbody"), z = document.createDocumentFragment();
    n(this, N) ? m.slice(1).forEach((W) => z.appendChild(W)) : m.forEach((W) => z.appendChild(W)), S.appendChild(z);
  }
  /**
   * @param {SORT_TYPE} currentSortType
   */
  getNextSortType(e) {
    return (/* @__PURE__ */ new Map([[w.NONE, w.ASC], [w.ASC, w.DESC], [w.DESC, w.NONE]])).get(e) || w.NONE;
  }
  /**
   * @param {HTMLTableElement} tableElement
   * @param {number} columnIndex
   * @param {SORT_TYPE} nextSortType
   */
  updateSortType(e, o, t) {
    e.querySelectorAll("th").forEach((l, d) => {
      d !== o || t === w.NONE ? l.removeAttribute("aria-sort") : l.setAttribute("aria-sort", t);
    });
  }
  /**
   * @param {Array} rows
   * @returns {Array} - The sorted rows.
   */
  restoreInitialOrder(e) {
    return [...e].sort((t, r) => {
      const l = Number(t.getAttribute("data-initial-index")), d = Number(r.getAttribute("data-initial-index"));
      return l - d;
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
  sortRows(e, o, t) {
    const r = (d, m) => {
      const S = d.cells[o].textContent.trim(), z = m.cells[o].textContent.trim();
      return t === w.ASC ? S.localeCompare(z) : z.localeCompare(S);
    };
    return n(this, N) ? [e[0], ...e.slice(1).sort(r)] : [...e].sort(r);
  }
}
b = new WeakMap(), N = new WeakMap(), K = new WeakMap();
customElements.define("table-sort", qe);
const Re = `
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
var L, f, E, T, p, ee, P, pe, U, be;
class me extends HTMLElement {
  constructor() {
    super();
    h(this, p);
    /** @type {HTMLDialogElement} */
    h(this, L);
    /** @type {HTMLElement | null} */
    h(this, f, null);
    /** @type {HTMLElement | null} */
    h(this, E, null);
    /** @type {AbortController | null} */
    h(this, T, null);
    const e = document.createElement("template");
    e.innerHTML = Re, this.attachShadow({
      mode: "open",
      slotAssignment: "manual"
    }), this.shadowRoot.append(e.content.cloneNode(!0));
  }
  connectedCallback() {
    this.getAttribute("disabled") ? a(this, p, P).call(this) : a(this, p, ee).call(this);
  }
  disconnectedCallback() {
    a(this, p, P).call(this);
  }
  attributeChangedCallback(e, o, t) {
    e !== "disabled" || o === t || (t === null ? a(this, p, ee).call(this) : a(this, p, P).call(this));
  }
}
L = new WeakMap(), f = new WeakMap(), E = new WeakMap(), T = new WeakMap(), p = new WeakSet(), ee = function() {
  if ((!n(this, T) || n(this, T).signal.aborted) && u(this, T, new AbortController()), u(this, L, this.shadowRoot.getElementById("dialog")), u(this, f, this.firstElementChild), n(this, f) !== null) {
    n(this, f).setAttribute("slot", "table"), this.shadowRoot.querySelector('slot[name="table"]').assign(n(this, f));
    const e = {
      signal: n(this, T).signal
    };
    Array.from(this.shadowRoot.querySelectorAll(".toggle")).forEach((o) => {
      o.addEventListener("click", a(this, p, be).bind(this), e);
    }), n(this, L).addEventListener("keydown", (o) => {
      o.key === "Escape" && (o.preventDefault(), a(this, p, U).call(this));
    });
  }
}, P = function() {
  a(this, p, U).call(this), n(this, T).abort();
}, pe = function() {
  n(this, E) === null && u(this, E, n(this, f).cloneNode(!0)), n(this, E) instanceof HTMLElement && n(this, f).insertAdjacentElement("afterend", n(this, E)), n(this, f).setAttribute("slot", "dialog"), this.shadowRoot.querySelector('slot[name="dialog"]').assign(n(this, f)), n(this, E).setAttribute("slot", "table"), this.shadowRoot.querySelector('slot[name="table"]').assign(n(this, E)), document.documentElement.classList.add("no-scroll"), n(this, L).showModal();
}, // Note: In Safari, the focus jumps back to the article wrapper instead of the toggle button by design
U = function() {
  n(this, f).setAttribute("slot", "table"), this.shadowRoot.querySelector('slot[name="table"]').assign(n(this, f)), n(this, E) instanceof HTMLElement && n(this, E).remove(), document.documentElement.classList.remove("no-scroll"), n(this, L).close();
}, be = function() {
  n(this, L).open ? a(this, p, U).call(this) : a(this, p, pe).call(this);
}, _(me, "observedAttributes", ["disabled"]);
customElements.define("table-expand", me);
const Ie = `
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
`, _e = `
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
`, oe = ["embedded", "enriched"];
var B;
class He extends HTMLElement {
  constructor() {
    super();
    h(this, B);
    this.attachShadow({
      mode: "open"
    });
    const e = document.createElement("template");
    e.innerHTML = Ie, this.shadowRoot.appendChild(e.content.cloneNode(!0));
  }
  async connectedCallback() {
    const [e, o, t] = this.getLinkInfoFromSlot();
    if (!e || !t || !oe.includes(o)) {
      console.error("Error: Link info not found in slot content.");
      return;
    }
    u(this, B, t);
    const r = await this.loadOEmbedData(t);
    if (!r) {
      console.error("Error: no oembed data found");
      return;
    }
    this.classList.add("content-rendered");
    try {
      o === oe[0] ? await this.renderIframe(r) : this.renderEnrichedCard(r), this.dispatchEvent(new Event("load"));
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
    const t = this.shadowRoot.querySelector("slot").assignedElements().find((r) => r.nodeType === Node.ELEMENT_NODE && r.tagName.toLowerCase() === "a");
    return [t, t == null ? void 0 : t.getAttribute("data-display-mode"), t == null ? void 0 : t.href];
  }
  /**
   * This method attempts to parse the provided URL. If the URL is valid, it checks the hostname
   * to determine which oEmbed service URL should be used (for YouTube, Vimeo, Loom, etc.)
   *
   * @param {string} url - The URL of the content to generate the oEmbed URL for.
   * @returns {string|undefined} The oEmbed URL if the service is supported, otherwise undefined.
   */
  getOEmbedUrl(e) {
    let o;
    try {
      o = new URL(e);
    } catch {
      console.error("Invalid URL:", e);
      return;
    }
    const t = o.hostname.replace(/^www\./, "").toLowerCase(), l = (/* @__PURE__ */ new Map([["youtube.com", "https://www.youtube.com/oembed?url={url}&format=json"], ["youtu.be", "https://www.youtube.com/oembed?url={url}&format=json"], ["vimeo.com", "https://vimeo.com/api/oembed.json?url={url}"], ["player.vimeo.com", "https://vimeo.com/api/oembed.json?url={url}"], ["loom.com", "https://www.loom.com/v1/oembed?url={url}"]])).get(t);
    if (!l) {
      console.error("Unsupported service:", t);
      return;
    }
    return l.replace("{url}", encodeURIComponent(e));
  }
  /**
   * Loads oEmbed data from a given URL by fetching the corresponding oEmbed service URL.
   * Note: oEmbed data from YouTube has no field "description", it is available via YouTube API
   *
   * @param {string} url
   * @returns {Promise<Object|undefined>}
   */
  async loadOEmbedData(e) {
    const o = this.getOEmbedUrl(e);
    if (!o) {
      console.error("Error: no oembed service found");
      return;
    }
    try {
      return await (await fetch(o)).json();
    } catch (t) {
      console.error("Error loading oEmbed content:", t);
    }
  }
  /**
   * Renders an iframe based on oEmbed data
   * @param {Object} oEmbedData
   */
  renderIframe(e) {
    return new Promise((o, t) => {
      const r = this.parseIframe(e.html);
      r.onload = o, r.onerror = t;
      const l = Number(r.getAttribute("width")), d = Number(r.getAttribute("height")), m = l && d ? l / d : 16 / 9;
      r.style.aspectRatio = String(m), r.setAttribute("data-component", "iframe"), this.shadowRoot.appendChild(r);
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
    const o = Ae.sanitize(e, {
      ALLOWED_TAGS: ["iframe"],
      ALLOWED_ATTRS: ["src", "width", "height", "allowfullscreen", "title"]
    });
    return new DOMParser().parseFromString(o, "text/html").querySelector("iframe");
  }
  /**
   * Renders a rich card based on the provided data.
   * The card includes a title, description, provider logo, and a background image.
   * @param {Object} oEmbedData
   */
  renderEnrichedCard(e) {
    const o = document.createElement("template");
    o.innerHTML = _e;
    const t = o.content.cloneNode(!0), r = t.querySelector(".rich-card"), l = t.querySelector(".logo"), d = t.querySelector(".title a"), m = t.querySelector(".description"), S = t.querySelector(".image-container");
    d.textContent = e.title ?? "", d.href = n(this, B), m.textContent = e.description ?? "", e.thumbnail_url && (S.style.backgroundImage = `url(${e.thumbnail_url})`), e.provider_name && (r.setAttribute("data-provider", e.provider_name.toLowerCase()), l.textContent = e.provider_name), this.shadowRoot.appendChild(t);
  }
}
B = new WeakMap();
customElements.define("smart-link", He);
"anchorName" in document.documentElement.style || import("./css-anchor-positioning-fn-BWnHWV27.js").then(({
  default: s
}) => {
  s().then(() => {
  });
});
Oe();
Fe();
Ke();
ye("site").visibleToSearchEngines || Be();
customElements.define("copy-page-tree", class extends HTMLElement {
  connectedCallback() {
    if (!this.target) return;
    const s = document.getElementById(this.target);
    s && this.appendChild(s.cloneNode(!0));
  }
  get target() {
    return this.getAttribute("target");
  }
});
function Oe() {
  const s = self.matchMedia("(min-width: 768px)"), i = we();
  e(s), o(), s.addEventListener("change", e);
  function e(t) {
    document.querySelectorAll("image-lightbox").forEach((l) => {
      l.toggleAttribute("disabled", !t.matches || i);
    });
  }
  function o() {
    document.querySelectorAll("table-expand").forEach((t) => {
      t.toggleAttribute("disabled", i);
    });
  }
}
function Fe() {
  const s = document.querySelectorAll("#content image-lightbox img:not([width])"), i = (e) => {
    const o = () => {
      e.naturalWidth > 0 && e.setAttribute("width", e.naturalWidth), e.naturalHeight > 0 && e.setAttribute("height", e.naturalHeight);
    };
    e.complete ? o() : e.addEventListener("load", o, {
      once: !0
    });
  };
  s.forEach(i);
}
function Ke() {
  document.querySelectorAll('.task-item-label > [data-component="task-list"]').forEach((s) => {
    var i;
    return (i = s.closest(".task-item")) == null ? void 0 : i.appendChild(s);
  }), document.querySelectorAll(".task-item-label > p").forEach((s) => {
    s.replaceWith(...s.childNodes);
  });
}
function Be() {
  customElements.whenDefined("ai-actions").then(() => {
    const s = document.querySelector("ai-actions"), i = /* @__PURE__ */ new Set(["open-in-chatgpt", "open-in-claude"]);
    s && (s.filter = (e) => !i.has(e));
  });
}
