import { MAIN } from "./components/Main/Main.js";
import { BASIC } from "./components/Pages/basic.js";
import { DOM } from "./components/Pages/dom.js";
import { METHODS } from "./components/Pages/methods.js";
import { MATH } from "./components/Pages/math.js";
import { REGEXPS } from "./components/Pages/regexps.js";
import { EVENTS } from "./components/Pages/events.js";
import { FORMS } from "./components/Pages/forms.js";
import { DESTRUCT } from "./components/Pages/destruct.js";
import { CLASSES } from "./components/Pages/classes.js";
import { OOP } from "./components/Pages/oop.js";
import { WEBPACK } from "./components/Pages/webpack.js";
import { ASYNC } from "./components/Pages/async.js";
import { REACT } from "./components/Pages/react.js";
import { HOOKS } from "./components/Pages/hooks.js";
import { STATE } from "./components/Pages/state.js";
import { BACKEND } from "./components/Pages/backend.js";
import { EXPRESS } from "./components/Pages/express.js";
import { MONGO } from "./components/Pages/mongo.js";
import { AUTH } from "./components/Pages/auth.js";
import { SECURITY } from "./components/Pages/security.js";
import { DEPLOY } from "./components/Pages/deploy.js";
import { TESTS } from "./components/Pages/tests.js";
import { ABOUT_FUNCTIONS } from "./components/Pages/aboutFuncs.js";
import { ABOUT_OOP } from "./components/Pages/aboutOop.js";
import { DATA_STRUCTURES } from "./components/Pages/structures.js";
import { SORT_ALGORHITMS } from "./components/Pages/sorts.js";

export const routes = [
  { path: "/", component: MAIN },
  { path: "#basic", component: BASIC },
  { path: "#dom", component: DOM },
  { path: "#methods", component: METHODS },
  { path: "#math", component: MATH },
  { path: "#regexps", component: REGEXPS },
  { path: "#events", component: EVENTS },
  { path: "#forms", component: FORMS },
  { path: "#destruct", component: DESTRUCT },
  { path: "#classes", component: CLASSES },
  { path: "#oop", component: OOP },
  { path: "#webpack", component: WEBPACK },
  { path: "#async", component: ASYNC },
  { path: "#react", component: REACT },
  { path: "#hooks", component: HOOKS },
  { path: "#state", component: STATE },
  { path: "#backend", component: BACKEND },
  { path: "#express&rest", component: EXPRESS },
  { path: "#mongo", component: MONGO },
  { path: "#auth", component: AUTH },
  { path: "#security", component: SECURITY },
  { path: "#deploy", component: DEPLOY },
  { path: "#tests", component: TESTS },
  { path: "#about_functions", component: ABOUT_FUNCTIONS },
  { path: "#about_oop", component: ABOUT_OOP },
  { path: "#data_structures", component: DATA_STRUCTURES },
  { path: "#sort_algorhitms", component: SORT_ALGORHITMS },
];

export const createElement = (tagName, params, container, text) => {
  const element = document.createElement(tagName);

  if (text) {
    element.textContent = text;
  }

  Object.entries(params).forEach((param) => {
    element.setAttribute(String(param[0]), String(param[1]));
  });

  if (container) {
    container.appendChild(element);
  }

  return element;
};

export const findComponentByPath = (path, routes) => {
  return (
    routes.find((i) => i.path.match(new RegExp(`^\\${path}$`, "gm"))) ||
    undefined
  );
};

export const parseLocation = () => window.location.hash.toLowerCase() || "/";

export function collapseGaps() {
  const pres = document.querySelectorAll("pre");
  Array.from(pres).forEach((pre) => {
    if (pre.nextElementSibling && pre.nextElementSibling.nodeName === "PRE") {
      pre.setAttribute("style", "margin-bottom: 0");
    }
    if (
      pre.previousElementSibling &&
      pre.previousElementSibling.nodeName === "PRE"
    ) {
      pre.setAttribute("style", "margin-top: 0");
    }
  });
}

export const getRandomColor = (index) => {
  let firstNumber = index;
  const secondNumber = Math.floor(index + 2.5);
  let string = `#${index}`;
  function addSymbols() {
    if (string.length < 7) {
      const newNumber = firstNumber * secondNumber;
      string += `${newNumber}`;
      firstNumber = newNumber;
      return addSymbols();
    } else {
      const result = string.slice(0, 7);
      return result;
    }
  }
  return addSymbols();
};
