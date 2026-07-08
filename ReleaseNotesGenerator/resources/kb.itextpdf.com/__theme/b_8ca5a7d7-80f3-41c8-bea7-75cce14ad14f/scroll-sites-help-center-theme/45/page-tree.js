var B = (a) => {
  throw TypeError(a);
};
var k = (a, c, t) => c.has(a) || B("Cannot " + t);
var s = (a, c, t) => (k(a, c, "read from private field"), t ? t.call(a) : c.get(a)), h = (a, c, t) => c.has(a) ? B("Cannot add the same private member more than once") : c instanceof WeakSet ? c.add(a) : c.set(a, t), d = (a, c, t, e) => (k(a, c, "write to private field"), e ? e.call(a, t) : c.set(a, t), t), g = (a, c, t) => (k(a, c, "access private method"), t);
import { c as J } from "./theme-xRX1rfIo.js";
var w, A, N, m, f, b, E, I, H;
const n = class n extends EventTarget {
  /** @param {{ sourceUrl?: string, pathPrefix?: string }} config */
  constructor({
    sourceUrl: t,
    pathPrefix: e = ""
  }) {
    super();
    h(this, I);
    if (s(n, w))
      return s(n, w);
    d(n, A, t), d(n, N, e.replace(/\/+$/, "")), d(n, w, this);
  }
  async load() {
    if (!(s(n, m) === "pending" || s(n, m) === "resolved")) {
      d(n, m, "pending");
      try {
        if (!s(n, A)) {
          d(n, f, /* @__PURE__ */ new Map()), d(n, b, /* @__PURE__ */ new Map()), d(n, E, []), d(n, m, "resolved"), this.dispatchEvent(new CustomEvent("change"));
          return;
        }
        const t = await fetch(s(n, A), {
          signal: AbortSignal.timeout(1e4)
        });
        if (!t.ok)
          throw new Error(`Page tree fetch failed: ${t.status}`);
        if (t.status === 204)
          throw new Error("Page tree response is empty");
        const e = t.headers.get("content-type") ?? "";
        if (!e.toLowerCase().includes("application/json"))
          throw new Error(`Page tree response is not JSON: ${e}`);
        const r = await t.json();
        if (!Array.isArray(r))
          throw new Error("Page tree response is not an array");
        const {
          nodes: i,
          pathIndex: l,
          rootIds: u
        } = g(this, I, H).call(this, r);
        d(n, f, i), d(n, b, l), d(n, E, u), d(n, m, "resolved"), this.dispatchEvent(new CustomEvent("change"));
      } catch (t) {
        if (d(n, m, "rejected"), this.dispatchEvent(new CustomEvent("change")), t instanceof DOMException && t.name === "TimeoutError") {
          console.error("Page tree request timed out", {
            cause: t
          });
          return;
        }
        console.error(t);
      }
    }
  }
  /** @returns {PageTreeStatus} */
  get status() {
    return s(n, m);
  }
  /** @returns {number} */
  get size() {
    var t;
    return ((t = s(n, f)) == null ? void 0 : t.size) ?? 0;
  }
  /**
   * @param {string} id
   * @returns {PageTreeNode | undefined}
   */
  getNode(t) {
    var e;
    return (e = s(n, f)) == null ? void 0 : e.get(t);
  }
  /** @returns {PageTreeNode[]} */
  get rootNodes() {
    var t;
    return ((t = s(n, E)) == null ? void 0 : t.map((e) => this.getNode(e))) ?? [];
  }
  /**
   * @param {string} id
   * @returns {PageTreeNode[]}
   */
  getChildren(t) {
    const e = this.getNode(t);
    return e ? e.children.map((r) => this.getNode(r)) : [];
  }
  /**
   * @param {string | undefined} id
   * @returns {string[]}
   */
  getAncestorIds(t) {
    var i, l;
    if (!t) return [];
    const e = [];
    let r = (i = this.getNode(t)) == null ? void 0 : i.parent;
    for (; r; )
      e.push(r), r = (l = this.getNode(r)) == null ? void 0 : l.parent;
    return e;
  }
  /**
   * @param {string | undefined} id
   * @returns {PageTreeNode[]}
   */
  getAncestors(t) {
    return this.getAncestorIds(t).map((e) => this.getNode(e));
  }
  /** @returns {string | undefined} */
  get activeNodeId() {
    var t;
    return (t = s(n, b)) == null ? void 0 : t.get(location.pathname);
  }
  /** @returns {PageTreeNode | undefined} */
  get activeNode() {
    return this.getNode(this.activeNodeId);
  }
  /**
   * @param {string} path
   * @returns {PageTreeNode | null}
   */
  getNodeByPath(t) {
    var r;
    const e = (r = s(n, b)) == null ? void 0 : r.get(t);
    return e ? this.getNode(e) : null;
  }
};
w = new WeakMap(), A = new WeakMap(), N = new WeakMap(), m = new WeakMap(), f = new WeakMap(), b = new WeakMap(), E = new WeakMap(), I = new WeakSet(), /**
 * @param {RawPageTreeNode[]} nodes
 * @returns {{ nodes: Map<string, PageTreeNode>, pathIndex: Map<string, string>, rootIds: string[] }}
 */
H = function(t) {
  const e = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), i = [], l = [];
  for (const u of t)
    i.push(u.id), l.push([u, void 0]);
  for (; l.length > 0; ) {
    const [{
      id: u,
      title: T,
      path: Y,
      children: x = []
    }, F] = l.pop(), S = s(n, N) + Y, U = new Array(x.length);
    for (let v = 0; v < x.length; v++)
      U[v] = x[v].id, l.push([x[v], u]);
    e.set(u, {
      id: u,
      title: T,
      path: S,
      parent: F,
      children: U
    }), r.set(S, u);
  }
  return {
    nodes: e,
    pathIndex: r,
    rootIds: i
  };
}, /** @type {PageTreeService | null} */
h(n, w, null), /** @type {string | undefined} */
h(n, A), /** @type {string} */
h(n, N, ""), /** @type {PageTreeStatus} */
h(n, m, "idle"), /** @type {Map<string, PageTreeNode> | null} */
h(n, f, null), /** @type {Map<string, string> | null} */
h(n, b, null), /** @type {string[] | null} */
h(n, E, null);
let L = n;
const j = document.getElementById("pageTreeSource"), R = new L({
  sourceUrl: j instanceof HTMLLinkElement ? j.href : void 0,
  pathPrefix: J().pathname
}), V = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" data-component="icon" class="icon icon-pending">
	<style>
		circle {
			animation-iteration-count: infinite;
			animation-duration: 860ms;
			animation-name: bouncy;

			&:nth-of-type(1) {
				animation-delay: -200ms;
			}

			&:nth-of-type(2) {
				animation-delay: -100ms;
			}
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
`;
var p, y, o, $, C, M, q, D, P, z, O;
class G extends HTMLElement {
  constructor() {
    super();
    h(this, o);
    h(this, p);
    h(this, y, new AbortController());
    /** @param {PointerEvent} event */
    h(this, C, (t) => {
      var l;
      const e = (
        /** @type {Element} */
        t.target.closest("button.tree-action")
      );
      if (!e || e.hasAttribute("data-queued"))
        return;
      if (e.matches('[aria-busy="true"]')) {
        e.setAttribute("data-queued", ""), e.innerHTML = /** @type {string} */
        V;
        return;
      }
      if (e.hasAttribute("aria-controls")) {
        g(this, o, D).call(this, e);
        return;
      }
      const r = (l = e.nextElementSibling) == null ? void 0 : l.getAttribute("href"), i = r ? s(this, p).getNodeByPath(r) : null;
      i && g(this, o, P).call(this, e, i);
    });
    d(this, p, R), s(this, p).load();
  }
  connectedCallback() {
    switch (this.addEventListener("click", s(this, C), {
      signal: s(this, y).signal
    }), s(this, p).status) {
      case "pending":
        s(this, p).addEventListener("change", () => g(this, o, $).call(this), {
          once: !0,
          signal: s(this, y).signal
        });
        break;
      case "resolved":
        g(this, o, M).call(this);
        break;
      case "rejected":
        g(this, o, q).call(this);
        break;
    }
  }
  disconnectedCallback() {
    s(this, y).abort(), d(this, y, new AbortController());
  }
}
p = new WeakMap(), y = new WeakMap(), o = new WeakSet(), $ = function() {
  s(this, p).status === "resolved" ? g(this, o, M).call(this) : g(this, o, q).call(this);
}, C = new WeakMap(), M = function() {
  var t;
  for (const e of this.querySelectorAll('button[aria-busy="true"]')) {
    const r = (t = e.nextElementSibling) == null ? void 0 : t.getAttribute("href"), i = r ? s(this, p).getNodeByPath(r) : null;
    if (!i)
      continue;
    const l = e.hasAttribute("data-queued");
    e.removeAttribute("aria-busy"), e.removeAttribute("aria-disabled"), e.removeAttribute("data-queued"), e.replaceChildren(), l && g(this, o, P).call(this, e, i);
  }
}, /**
 * The full tree couldn't be loaded, so the collapsed off-branch nodes can
 * never be expanded. Remove their loading toggles to clear the stuck pending
 * state; the static <a> link is the button's sibling and remains navigable.
 */
q = function() {
  for (const t of this.querySelectorAll('button[aria-busy="true"]'))
    t.remove();
}, /** @param {HTMLButtonElement} button */
D = function(t) {
  const e = t.getAttribute("aria-controls"), r = this.querySelector(`#${CSS.escape(e)}`);
  if (r !== null) {
    const i = r.toggleAttribute("hidden");
    t.setAttribute("aria-expanded", String(!i));
  }
}, /**
 * @param {HTMLButtonElement} button
 * @param {PageTreeNode} node
 */
P = function(t, e) {
  const r = g(this, o, z).call(this, e);
  t.closest(".tree-item").append(r), t.setAttribute("aria-controls", r.id), t.setAttribute("aria-expanded", "true");
}, /**
 * @param {PageTreeNode} node
 * @returns {HTMLUListElement}
 */
z = function(t) {
  const e = document.createElement("ul");
  e.id = crypto.randomUUID();
  for (const r of s(this, p).getChildren(t.id))
    e.append(g(this, o, O).call(this, r));
  return e;
}, /**
 * @param {PageTreeNode} node
 * @returns {HTMLLIElement}
 */
O = function(t) {
  const e = document.createElement("li");
  e.className = "tree-item";
  const r = document.createElement("div");
  r.className = "tree-item-header";
  const i = document.createElement("a");
  if (i.href = t.path, i.textContent = t.title, t.id === s(this, p).activeNodeId && i.setAttribute("aria-current", "page"), s(this, p).getChildren(t.id).length) {
    i.id = crypto.randomUUID();
    const u = document.createElement("button");
    u.className = "tree-action", u.type = "button", u.setAttribute("aria-expanded", "false"), u.setAttribute("aria-labelledby", i.id), r.append(u);
  }
  return r.append(i), e.append(r), e;
};
customElements.define("theme-page-tree", G);
