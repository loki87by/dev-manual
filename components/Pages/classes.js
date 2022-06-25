export const CLASSES = [
  {
    title: `Описание связей между классами.`,
    text1: `Мы создали новый класс Section и разобрали его методы. Класс Section — это слой, который добавляет готовые элементы на страницу.
Следующий вопрос: как связать его с другими классами? Между классами может быть два типа связей:
Сильная связь — бензиновый двигатель машины. Такой двигатель использует только бензин для своей работы.
Слабая связь — гибридный двигатель. Гибридный двигатель работает как на электричестве, так и на бензине.
Такая связь более гибкая и зависит от того, что передать двигателю — бензин или электричество.
Сейчас в классе Section используется сильная связь, вот она:`,
    code1: `renderItems() {
  this._initialArray.forEach((item) => {
    const card = item.isOwner
      ? new UserCard(item, '.card-template_type_user')
      : new DefaultCard(item, '.card-template_type_default');
    const cardElement = card.generateCard();
    this.setItem(cardElement);
  });
}`,
    text2: `можно ли взять класс Section, перенести в другой проект и использовать метод renderItems там?
можно ли использовать класс Section для отрисовки других карточек, отличных от карточек чата без изменения renderItems?
В обоих случаях ответ — нет. В первом случае потребуется перенести в другой проект классы DefaultCard и UserCard,
либо переписать метод renderItems. Во втором случае потребуется изменять условие в renderItems.
Класс Section знает, с какими классами он работает — можно сказать, что класс Section зависит одновременно от UserCard и DefaultCard.
Хоть Section и управляет их отрисовкой на странице, без этих классов использовать некоторые методы Section не получится.
Когда экземпляры одного класса создаются внутри методов другого — это сильное связывание.
Сильное связывание обязывает нас использовать метод renderItems исключительно с классами UserCard или DefaultCard.
Класс Section становится не гибким. Теряется возможность использовать его в комбинации с другими классами.
Сильную связь нужно устранить. Сделаем это в точке сборки страницы — файле index.js.
В нём будем давать одному классу инструкции о том, как работать с другими классами.
Рассмотрим участок класса Section:`,
    code2: `const card = item.isOwner
  ? new UserCard(item, '.card-template_type_user')
  : new DefaultCard(item, '.card-template_type_default');
const cardElement = card.generateCard();
this.setItem(cardElement);`,
    text3: `Здесь описано, что происходит с каждым элементом массива в методе renderItems.
Если мы захотим создать связь между Section и другим классом внутри forEach, код будет заметно отличаться.
Для добавления классу Section возможности работать и с другими классами мы перенесём эту часть метода renderItems в index.js.
Создание экземпляров карточек и их вставку в разметку будем передавать в конструктор класса Section, как функцию-колбэк.
Назовём этот параметр renderer и расширим конструктор класса:`,
    code3: `// ./components/Section.js
class Section {
  constructor({ data, renderer }, containerSelector) {
    this._initialArray = data;
    this._renderer = renderer; // renderer — это функция
    this._container = document.querySelector(containerSelector);
  }
}`,
    text4: `Также потребуется изменить создание класса Section в index.js:`,
    code4: `// ./pages/index.js
const cardsList = new Section({
  data: messageList,
  renderer: () => {
    // Тело функции renderer пока оставим пустым
  },
}, cardListSection
);`,
    text5: `Функция renderer — это инструкция. Класс Section получает её в index.js при создании.
Пока что оставим в качестве значения renderer пустую стрелочную функцию и схематично представим выполненное действие.`,
    image1: "image1.png",
    text6: `Можно создавать любое количество инструкций и все их передавать новым экземплярам класса Section.
При этом сам класс Section не придётся модифицировать.
Такой способ связывания одного класса с другим называется слабым связыванием. Мы рекомендуем использовать именно его.
Остаётся перенести код из renderItems в функцию-колбэк renderer в index.js.`,
    code5: `// ./components/Section.js
class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderer = renderer; // записываем renderer в this
  // ...
}
renderItems() {
this._initialArray.forEach(item => {
  this._renderer(item); // вызываем renderer, передав item
  });
  }
}
// ./pages/index.js
const cardsList = new Section({
data: messageList,
renderer: (cardItem) => { // Обратите внимание на параметр cardItem
  const card = cardItem.isOwner
    ? new UserCard(cardItem, '.card-template_type_user')
    : new DefaultCard(cardItem, '.card-template_type_default');
  const cardElement = card.generateCard();
  cardsList.setItem(cardElement);
  }
},
cardListSection
);
cardList.renderItems();`,
    text7: `При создании экземпляра класса Section мы передаём функцию renderer. У этой функции единственный параметр — cardItem.
Позже в методе renderItems класса Section мы вызываем renderer и передаём ей аргумент — текущий элемент массива — item.
Этот элемент массива и попадёт на место параметра cardItem.
Разберём это подробнее:`,
    image1: "image2.png",
    text8: `Теперь цепочка взаимодействия между renderItems класса Section и классами UserCard и DefaultCard вынесена за пределы классов.
Так мы создали слабое связывание между классами. Таким образом вы будете создавать связи в заданиях к этой теме и в проектных работах.`,
  },
  {
    title: `Работа со слушателями событий.`,
    text1: `Закрепим полученные навыки по работе с классами на знакомом и более практическом примере.
В нашем чате нет самого главного — возможности добавлять новые сообщения.
Спроектируем новую функциональность. Требуется:`,
    subtitle1: `создать класс, который хранит разметку формы;
добавить эту разметку на страницу;
при сабмите формы создавать экземпляр UserCard и добавлять его разметку на страницу.`,
    text2: `В конструктор класса формы передадим селектор её template-элемента:`,
    code1: `class SubmitForm {
  constructor({ formSelector }) {
    this._formSelector = formSelector;
  }
}`,
    text3: `Методы для возвращения разметки карточки будут очень похожи на аналоги в UserCard и DefaultCard.
Добавим известный вам метод _getTemplate, который клонирует и возвращает разметку формы:`,
    code2: `_getTemplate() {
  const formElement = document
  .querySelector(this._formSelector)
  .content
  .querySelector('.form')
  .cloneNode(true);
  return formElement;
}`,
    text4: `Этот метод похож на метод класса Card, но это не повод делать класс SubmitForm наследником Card.
Класс SubmitForm решает другую задачу — создание формы. К тому же нам не нужно наследовать содержимое метода _setEventListeners.
В классе SubmitForm он будет другим:`,
    code3: `_setEventListeners() {
  // при сабмите формы
  this._element.addEventListener('submit', (evt) => {
    // отменим стандартное поведение
    evt.preventDefault();
    // и сбросим её поля
    this._element.reset();
  })
}`,
    text5: `Пока что мы только отменяем событие по умолчанию и очищаем форму при отправке. Основную функциональность сабмита напишем позже.
В классе SubmitForm остаётся только завести публичный метод, отдающий разметку наружу. Назовём его generateForm и опишем содержимое:`,
    code4: `generateForm() {
  this._element = this._getTemplate(); // создаём элемент
  this._setEventListeners(); // добавляем обработчики
  return this._element; // возвращаем наружу
}`,
    text6: `В index.js создадим экземпляры классов SubmitForm и Section, передав в них необходимые параметры.
Классу Section не нужен начальный массив, поэтому передаём пустой. Воспользуемся только его методом setItem:`,
    code5: `// ./pages/index.js
// создаём экземпляр формы
const form = new SubmitForm({
  formSelector: '.form-template',
});
// генерируем разметку формы
const formElement = form.generateForm();
// инициализируем класс, ответственный
// за добавление формы на страницу
const formRenderer = new Section({
  data: []
}, '.form-section');
// добавляем форму на страницу
formRenderer.setItem(formElement);`,
    text7: `Осталось сделать две вещи:`,
    subtitle2: `научиться собирать данные из полей формы,
при отправке формы создать экземпляр UserCard и добавить его на страницу.`,
    text8: `Первый шаг можно решить одним методом, который будет возвращать объект с данными полей формы.
Сейчас в форме всего одно поле, но мы сразу заложим возможность собирать данные из нескольких полей.
Ведь в проекте могут появиться другие, более сложные формы.
Для сбора данных из полей создадим приватный метод _getInputValues. Этот метод собирает массив всех полей в форме,
обходит их и добавляет их значения в объект. Ключами этого объекта будут атрибуты name каждого поля:`,
    code6: `_getInputValues() {
  // достаём все элементы полей
  this._inputList = this._element.querySelectorAll('.form__input');
  // создаём пустой объект
  this._formValues = {};
  // добавляем в этот объет значения всех полей
  this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });
  // возвращаем объект значений
  return this._formValues;
}`,
    text9: `После того, как данные полей собраны, их нужно передать классу UserCard, чтобы вернуть готовую разметку.
Мы договорились не использовать сильное связывание при создании зависимостей между классами.
Поэтому действия, происходящие при отправке формы — создание карточки и её добавление на страницу передим в теле функции-колбэка.
Назовём эту функцию handleFormSubmit.
Чтобы класс SubmitForm научился работать с этой функцией, расширим конструктор класса:`,
    code7: `class SubmitForm {
  constructor({ formSelector, handleFormSubmit }) {
    this._formSelector = formSelector;
    this._handleFormSubmit = handleFormSubmit;
  }
}`,
    text10: `Эта запись аналогична той, которая используется в классе Section:`,
    code8: `class Section {
  constructor({ data, renderer }, containerSelector) {
    this._initialArray = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
}`,
    text11: `В методе _setEventListeners при отправке формы вызовем _handleFormSubmit.
В качестве аргумента передим ей объект, который возвращает функция _getInputValues:`,
    code9: `_setEventListeners() {
  this._element.addEventListener('submit', (evt) => {
    evt.preventDefault();
    // добавим вызов функции _handleFormSubmit
    // передадим ей объект — результат работы _getInputValues
    this._handleFormSubmit(this._getInputValues());
    this._element.reset();
  });
}`,
    text12: `Передав в качестве аргумента объект со значениями полей ввода, мы получим доступ к этим данным извне.
А именно — при описании самой функции-колбэка в index.js:`,
    code10: `const form = new SubmitForm({
  formSelector: '.form-template',
  // объект, который мы передадим при вызове handleFormSubmit
  // окажется на месте параметра formData
  handleFormSubmit: (formData) => {
  }
});`,
    text13: `В теле handleFormSubmit создадим экземпляр класса UserCard. При создании передадим в него объект с данными полей ввода.
После этого сгенерируем карточку и добавим её на страницу методом setItem:`,
    code11: `const form = new SubmitForm({
  formSelector: '.form-template',
  handleFormSubmit: (formData) => {
    // при создании экземпляра UserCard передаём
    // ему объект с данными формы
    const card = new UserCard(formData, '.card-template_type_user');
    const cardElement = card.generateCard();
    cardsList.setItem(cardElement);
  }
});`,
    text14: `Параметр formData функции — это значение, которое мы передаём в this._handleFormSubmit при вызове.
То есть это объект, который возвращает метод _getInputValues.
Класс SubmitForm позволяет создать несколько форм с разными полями и функцией-обработчиком сабмита.
Кроме этого, мы связали класс SubmitForm с классом UserCard через функцию-колбэк. Это слабая связь.
В будущем она позволит нам описывать разное поведение для разных форм без вмешательства в класс SubmitForm.
    `,
  },
];
