var U = Object.defineProperty;
var y = (s) => {
  throw TypeError(s);
};
var D = (s, i, e) => i in s ? U(s, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[i] = e;
var w = (s, i, e) => D(s, typeof i != "symbol" ? i + "" : i, e), x = (s, i, e) => i.has(s) || y("Cannot " + e);
var t = (s, i, e) => (x(s, i, "read from private field"), e ? e.call(s) : i.get(s)), u = (s, i, e) => i.has(s) ? y("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(s) : i.set(s, e), d = (s, i, e, n) => (x(s, i, "write to private field"), n ? n.call(s, e) : i.set(s, e), e), h = (s, i, e) => (x(s, i, "access private method"), e);
const E = (s) => s !== null && s.trim() !== "" && !Number.isNaN(Number(s));
var f;
class H extends EventTarget {
  /**
   * @param {T} value */
  constructor(e) {
    super();
    /** @type {T} */
    u(this, f);
    d(this, f, e);
  }
  /** @returns {T} */
  get value() {
    return t(this, f);
  }
  /** @param {T} newValue */
  set value(e) {
    d(this, f, e), this.dispatchEvent(new CustomEvent("change", {
      detail: e
    }));
  }
}
f = new WeakMap();
var v, c, o, p, m, r, N, k, A, B, C, q, L, M, T;
class I extends HTMLElement {
  constructor() {
    super();
    u(this, r);
    u(this, v, {
      maxItems: 3,
      itemsBeforeCollapse: 1
    });
    /** @type {Signal<Array<BreadcrumbsNode>>} */
    u(this, c);
    /** @type {HTMLSelectElement | null} */
    u(this, o, null);
    /** @type {MediaQueryList} */
    u(this, p);
    /** @type {AbortController | null} */
    u(this, m, null);
    d(this, c, new H([])), d(this, p, self.matchMedia("(width <= 768px)"));
  }
  connectedCallback() {
    var n;
    const e = Array.from(((n = this.querySelector(":scope :is(ul, ol)")) == null ? void 0 : n.children) ?? []);
    t(this, c).value = h(this, r, C).call(this, h(this, r, B).call(this, e)), t(this, c).value.length > this.maxItems && h(this, r, q).call(this), h(this, r, k).call(this);
  }
  disconnectedCallback() {
    h(this, r, A).call(this);
  }
  attributeChangedCallback(e, n, l) {
    l !== n && E(l) && !t(this, p).matches && (t(this, c).value = h(this, r, C).call(this, t(this, c).value));
  }
  get maxItems() {
    if (t(this, p).matches)
      return 2;
    const e = this.getAttribute("maxitems");
    return E(e) && Number(e) > 0 ? Number(e) : t(this, v).maxItems;
  }
  get itemsBeforeCollapse() {
    if (t(this, p).matches)
      return 1;
    const e = this.getAttribute("itemsbeforecollapse");
    return E(e) && Number(e) >= 0 ? Number(e) : t(this, v).itemsBeforeCollapse;
  }
}
v = new WeakMap(), c = new WeakMap(), o = new WeakMap(), p = new WeakMap(), m = new WeakMap(), r = new WeakSet(), N = function() {
  const e = crypto.randomUUID();
  return `
			<li data-collapsed="">
				<i18n-message class="sr-only" i18nkey="breadcrumbs.more.label" attribute="value" targetelement="${e}"></i18n-message>
				<theme-tooltip id="${e}" value="More options">
					<div class="picker picker--icon-only">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" data-component="icon" class="icon icon-more_horiz picker-icon picker-prefix" role="img" aria-hidden="true">
							<path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/>
						</svg>
						<label for="breadcrumb-more-options" class="sr-only">
							<i18n-message i18nkey="breadcrumbs.more.label"></i18n-message>
						</label>
						<select id="breadcrumb-more-options"></select>
					</div>
				</theme-tooltip>
			</li>
		`;
}, k = function() {
  var e;
  (t(this, m) === null || (e = t(this, m)) != null && e.signal.aborted) && d(this, m, new AbortController()), t(this, p).addEventListener("change", () => {
    t(this, c).value = h(this, r, C).call(this, t(this, c).value);
  }, {
    signal: t(this, m).signal
  }), t(this, c).addEventListener("change", () => {
    h(this, r, q).call(this);
  }, {
    signal: t(this, m).signal
  });
}, A = function() {
  var e;
  (t(this, m) !== null || !((e = t(this, m)) != null && e.signal.aborted)) && t(this, m).abort();
}, /**
 * @param {Array<HTMLElement>} elements
 * @returns {Array<BreadcrumbsNode>}
 */
B = function(e) {
  return e.map((n) => {
    var l;
    return {
      textContent: n.textContent,
      href: (
        /** @type {HTMLAnchorElement} */
        (l = n.querySelector(":scope a")) == null ? void 0 : l.href
      ),
      element: n,
      visible: !0
    };
  });
}, /**
 * @param {Array<BreadcrumbsNode>} items
 * @returns {Array<BreadcrumbsNode>}
 */
C = function(e) {
  const n = (l, a) => a <= this.maxItems || l < this.itemsBeforeCollapse || l === a - 1;
  return e.map((l, a) => (l.visible = n(a, e.length), l));
}, q = function() {
  const e = t(this, c).value;
  h(this, r, L).call(this, e), t(this, o) ? h(this, r, T).call(this, e) : h(this, r, M).call(this, e);
}, /** @param {Array<BreadcrumbsNode>} nodes */
L = function(e) {
  e.forEach(({
    element: n,
    visible: l
  }) => {
    n.toggleAttribute("hidden", !l);
  });
}, /** @param {Array<BreadcrumbsNode>} nodes */
M = function(e) {
  var b;
  const n = document.createElement("template");
  n.innerHTML = t(this, r, N);
  const l = (
    /** @type {DocumentFragment} */
    n.content.cloneNode(!0)
  );
  if (d(this, o, l.querySelector("select")), !t(this, o))
    return;
  const a = document.createElement("option");
  a.textContent = "…", a.disabled = !0, a.selected = !0, t(this, o).appendChild(a), t(this, o).addEventListener("change", (g) => {
    const S = new URL(g.target.value, self.location.origin);
    self.location.assign(S);
  }), l.firstElementChild && ((b = e.at(this.itemsBeforeCollapse)) == null || b.element.insertAdjacentElement("beforebegin", l.firstElementChild)), h(this, r, T).call(this, e);
}, /** @param {Array<BreadcrumbsNode>} nodes */
T = function(e) {
  var l;
  if (!t(this, o))
    return;
  const n = t(this, o).closest("[data-collapsed]");
  if (n) {
    if (e.every(({
      visible: a
    }) => a)) {
      n.remove(), d(this, o, null);
      return;
    }
    for (; t(this, o).children.length > 1; )
      t(this, o).lastChild && t(this, o).removeChild(t(this, o).lastChild);
    e.forEach((a) => {
      var b;
      if (!a.visible) {
        const g = document.createElement("option");
        g.textContent = a.textContent, a.href && (g.value = a.href), (b = t(this, o)) == null || b.appendChild(g);
      }
    }), (l = e.at(this.itemsBeforeCollapse)) == null || l.element.before(n);
  }
}, w(I, "observedAttributes", ["maxitems", "itemsbeforecollapse"]);
customElements.define("theme-breadcrumbs", I);
