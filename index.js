import hljs from "https://unpkg.com/@highlightjs/cdn-assets@11.5.1/es/highlight.min.js";
import App from "./components/App/App.js";
import {
  routes,
  findComponentByPath,
  parseLocation,
  collapseGaps,
} from "./consts.js";

const main = document.querySelector("main");

const router = () => {
  const path = parseLocation();
  const component = findComponentByPath(path, routes);
  main.innerHTML = "";
  const app = new App(main, component);
  app.initApp();
  const pres = document.querySelectorAll("code");
  Array.from(pres).forEach((pre) => {
    hljs.highlightElement(pre);
  });
  collapseGaps();
  /* const old = document.querySelector('.header__navigation-item_active');
    old?.classList.remove('header__navigation-item_active');
    const young = document.getElementById(`${path}`);
    young?.classList.add('header__navigation-item_active'); */
};

function upButtonSwitcher() {
  const button = document.querySelector(".up-button");

  if (
    main.parentElement.parentElement.scrollTop >
    window.document.documentElement.clientHeight / 2
  ) {
    button.setAttribute("style", "visibility: visible");
  } else {
    if (button.hasAttribute(`style`)) {
      button.removeAttribute(`style`);
    }
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
window.addEventListener("scroll", upButtonSwitcher);
