import { i as s } from "./index-BQkERkoW.js";
s() && a();
function a() {
  const r = [".search-results__go-back-button"].map((e) => document.querySelector(e)), t = document.createElement("span");
  t.classList.add("sr-only"), t.setAttribute("id", crypto.randomUUID()), t.innerHTML = '<i18n-message i18nkey="links.external.label">Opens in new tab</i18n-message>', document.body.insertAdjacentElement("afterbegin", t), document.querySelectorAll("a").forEach((e) => {
    r.some((n) => n === e) || (e.setAttribute("target", "_blank"), e.setAttribute("rel", "noopener noreferrer"), e.setAttribute("aria-describedby", t.getAttribute("id")));
  });
}
