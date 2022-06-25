import { createElement, getRandomColor } from "../../consts.js";
const main = document.querySelector("main");

export default class App {
  constructor(container, currentPage) {
    this.container = container;
    this.currentPage = currentPage;
    this.backState = undefined;
    /* this.nav = document.querySelector('nav'); */
    this.route = this.route.bind(this);
  }

  initApp() {
    main.innerHTML = "";
    this.render(this.currentPage);
    /* this.nav.addEventListener('click', this.route); */
  }

  redirect(path) {
    window.location.replace(path);
  }

  render(markupElement) {
    const titles = [];
    markupElement.component.forEach((element) => {
      Object.keys(element).forEach((key, index) => {
        if (key === "button") {
          const button = createElement(
            "button",
            { class: "button_main" },
            this.container,
            element.button
          );
          button.addEventListener("click", () => {
            this.redirect(`#${element.button.replace(" ", "_")}`);
          });
        }
        if (key === "title") {
          const title = createElement("h2", {}, this.container, element.title);
          titles.push({
            text: element.title,
            anchor: title,
          });
        }
        if (key.includes("subtitle")) {
          createElement(
            "h3",
            {},
            this.container,
            Object.values(element)[index]
          );
        }
        if (key.includes("text")) {
          createElement(
            "h4",
            {},
            this.container,
            Object.values(element)[index]
          );
        }
        if (key.includes("link")) {
          const current = Object.values(element)[index];
          createElement(
            "a",
            { href: `${current.uri}` },
            this.container,
            current.text
          );
        }
        if (key.includes("frame")) {
          const current = Object.values(element)[index];
          createElement(
            "iframe",
            {
              src: `${current.uri}`,
              title: `${current.text}`,
              frameborder: "0",
              allowfullscreen: true,
            },
            this.container
          );
        }
        if (key.includes("image")) {
          createElement(
            "img",
            {
              src: `../../assets/${Object.values(element)[index]}`,
              alt: `${Object.values(element)[index]}`,
            },
            this.container
          );
        }
        if (key.includes("backState")) {
          this.backState = `${Object.values(element)[index]}`;
        }
        if (key.includes("table")) {
          const current = Object.values(element)[index];
          const table = createElement(
            "table",
            { class: `table_${this.backState}` },
            this.container
          );
          const keys = Object.keys(current);
          const values = Object.values(current);
          Array.from(keys).forEach((item, num) => {
            const tr = createElement("tr", {}, table);
            if (item === "title") {
              values[num].forEach((th) => {
                createElement("th", {}, tr, th);
              });
            }
            if (item.includes("td")) {
              values[num].forEach((td) => {
                createElement("td", {}, tr, td);
              });
            }
          });
        }

        if (key.includes("code")) {
          const pre = createElement("pre", {}, this.container);
          const current = Object.values(element)[index];
          if (typeof current === "string") {
            createElement("code", {}, pre, current);
          } else {
            createElement(
              "code",
              { class: `language-${current.lang}` },
              pre,
              current.value
            );
          }
        }
      });
      return;
    });
    if (titles.length > 0) {
      const titlesContainer = document.createElement("ul");
      this.container.insertBefore(
        titlesContainer,
        this.container.childNodes[0]
      );
      createElement("h3", {}, titlesContainer, "Содержание");
      titles.forEach((item) => {
        const btn = createElement("li", {}, titlesContainer, item.text);
        btn.addEventListener("click", () => {
          item.anchor.scrollIntoView({ block: "start", behavior: "smooth" });
        });
      });
    }
    const toTop = createElement(
      "button",
      { class: "up-button" },
      this.container,
      "Вверх"
    );
    toTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    if (window.location.hash !== "") {
      const toHead = createElement(
        "h2",
        { style: "text-align: center; cursor: pointer" },
        this.container,
        "К оглавлению"
      );
      toHead.addEventListener("click", () => {
        this.redirect(`/`);
      });
    } else {
      const buttons = document.querySelectorAll('.button_main')
      Array.from(buttons).forEach((btn, index) => {
        btn.setAttribute('style', `color: ${getRandomColor(index)}; border-color: ${getRandomColor(index)}`)
      })
    }
  }

  route(element) {
    /* const old = this.nav?.querySelector('.header__navigation-item_active'); */
    let target;

    if (element.target) {
      target = element.target;
    } else {
      target = element;
    }
    /* old?.classList.remove('header__navigation-item_active');
      target.classList.add('header__navigation-item_active'); */
    const uri = target.id || target.parentNode.id;
    if (window.location.hash === uri) {
      return;
    }
    window.location.hash = uri;
  }
}
