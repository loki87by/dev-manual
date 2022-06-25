export const FORMS = [
  {
    subtitle: `Все формы на странице хранятся в виде псевдомассива в свойстве document.forms`,
    title: `Отправка формы. Событие submit`,
    text1: `Кнопки бывают трёх типов:
        Отправка формы на сервер — при нажатии на кнопку происходит событие submit.
        Сброс полей ввода — происходит событие reset.
        Прочее — нет события по умолчанию, можно назначить на кнопку что угодно.
        Чаще всего цель формы — отправить данные на сервер для обработки. Прямо перед отправкой происходит submit: оно перезагружает страницу.
        При необходимости в обработчике события submit проверяют данные, которые ввёл пользователь, и отменяют их отправку на сервер:`,
    code: `form.addEventListener('submit', function (evt) {
  // отменим стандартное поведение
  evt.preventDefault();`,
    text2: `Если в обработчике события submit вызвать evt.preventDefault, то перезагрузки страницы и отправки данных не произойдёт.`,
  },
  {
    title: `Получение элементов форм`,
    text: `Элементы формы хранятся внутри коллекции в свойстве формы elements
        обращайтесь к элементам формы через точку по имени`,
    code: `const form1 = document.forms.form1;`,
  },
  {
    title: `Доступ к значениям элементов форм`,
    subtitle1: `Значение текстового поля`,
    text1: `Текстовое поле — самый распространённый тип поля формы. Его значение хранится в свойстве value`,
    subtitle2: `Значение чекбокса и радиокнопки`,
    text2: `Чекбоксы и радиокнопки — вторые по популярности элементы формы. Их значения хранятся в свойстве checked
        Если чекбокс отмечен, в консоль попадёт true, если нет — false`,
    subtitle3: `Значение списка с вариантами ответов`,
    text3: `Список с вариантами ответов — это поле select. Подобно текстовому полю его значение хранится в свойстве value`,
  },
  {
    title: `События change и input`,
    text: `Эти события очень похожи. Для всех полей ввода, кроме текстовых, они работают одинаково — происходят при любом изменении поля ввода
        А для текстовых полей по-разному:
        input — срабатывает при вводе или удалении каждого символа,
        change — только когда поле изменилось и пользователь перешёл к другому элементу формы.`,
  },
  {
    title: `Методы reset и submit`,
    subtitle: `Сброс всех полей формы`,
    text: `После того, как форма обработана, её поля сбрасывают до исходных значений. Чтобы не сбрасывать каждое поле отдельно, есть метод reset`,
    code: `const form = document.forms.myForm;
form.addEventListener('submit', function (evt) {
  evt.preventDefault(); // обрабатываем форму
  form.reset(); // сбрасываем все поля
});`,
  },
  {
    title: `Программный сабмит формы`,
    text1: `Иногда нужно, чтобы событие submit вызвала программа, без нажатия пользователем Enter или кнопки «Отправить».
        Вы могли сталкиваться с таким в интерфейсах c двухфакторной аутентификацией.
        При входе в личный кабинет банка вы получаете смской четырёхзначный код, который вводите в специальное поле на сайте.`,
    code: `const form = document.forms.myForm;
const input = form.elements.myInput;
form.addEventListener('input', function (evt) {

  if (input.length === 4) { // если введено четыре символа
    form.submit(); // сгенерируем событие submit
  }
});
form.addEventListener('submit', function (evt) { // обработка события submit
});`,
    text2: `Как только в текстовое поле введут четвёртый символ, произойдёт событие submit`,
  },
  {
    title: `валидация форм`,
    text1: `У современных браузеров есть встроенные инструменты для проверки форм`,
    subtitle1: `Атрибут type`,
    text2: `Некоторые значения type содержат встроенную инструкцию: как браузеру проверять данные, которые ввёл пользователь.
        Популярные примеры — значения url и email:
        url — значение поля ввода начинается с http:// или https:// и содержит минимум один символ после;
        email — значение поля содержит минимум один символ до @ и один после.`,
    subtitle2: `Атрибуты minlength и maxlength`,
    text3: `HTML-атрибуты minlength и maxlength задают минимальное и максимальное количество символов в поле ввода.
        Если полю «Имя» установить 2 как минимальное количество символов, пользователь не сможет ввести однобуквенные имена
        Аналогично можно указать maxlength для поля с именем. Тогда пользователь не сможет ввести слишком длинное имя.
        Значения атрибутов type, minlength и maxlength можно использовать вместе. Тогда для каждой ошибки будет своё сообщение`,
  },
  {
    title: `Стилизация полей псевдоклассами`,
    text1: `Псевдоклассы дают обратную связь: подсвечивают поле в момент появления ошибки.
        Их назначение:
        :valid — указывает, что введены корректные данные;
        :invalid — указывает, что данные некорректны;
        :checked — применяет стили к отмеченным чекбоксам type="checkbox" или радиокнопкам type="radio";
        :not — показывает элементы, которые не отмечены как :checked
        Эта обратная связь мгновенная. Пользователь до отправки формы понимает, что ввёл неправильные данные в одно из её полей.`,
    subtitle1: `Атрибут required`,
    text2: `Атрибут required делает данное поле необходимым для заполнения. Если оставить поле пустым, форма не будет отправлена.
        По умолчанию пустому полю присваивают псевдокласс :invalid`,
    subtitle2: `Атрибут novalidate`,
    text3: `Сперва сообщите браузеру о том, что стандартные сообщения об ошибке не нужны. Для этого укажите атрибут novalidate у формы`,
    subtitle3: `Объект ValidityState`,
    text4: `В JS есть ValidityState — встроенный объект для сверки данных. Он присутствует в каждом поле ввода и тесно связан с его html-атрибутами.
        Само свойство называется validity
        Свойство validity — это объект из 11 свойств с булевыми значениями
        valueMissing — принимает true, когда обязательное поле пустое;
        typeMismatch — принимает true, когда ввели неправильные значения для атрибута type. Это круто работает в связке с type="email" и type="url";
        tooLong — принимает false, когда количество символов не превышает значение атрибута maxlength. А true не существует в
        современных браузерах. Невозможно ввести больше символов, чем указано в maxlength;
        tooShort — принимает true, когда количество символов не превышает значение атрибута minlength.
        Ещё в объекте validity есть свойство valid. В нём находится итоговое решение проверки данных.
        Если во всех других 10 свойствах значения корректны, поле ввода валидно и свойство valid приобретает значение true`,
  },
  {
    title: `«Живая» валидация`,
    text1: `Когда в поле вводят данные, значения свойств объекта validity меняются. Для этого не нужно отправлять форму.
        Как только поле выполнит все условия атрибутов, свойство valid приобретёт значение true.
        «Живая» проверка данных происходит одновременно с тем, как пользователь вводит в поле данные. Для этой проверки есть слушатель событий input.
        Он срабатывает при любом изменении данных в поле, на котором висит обработчик:`,
    code: `const formElement = document.querySelector('.form'); // Вынесем все необходимые элементы формы в константы
const formInput = formElement.querySelector('.form__input');
formElement.addEventListener('submit', function (evt) {
  evt.preventDefault(); // Отменим стандартное поведение
});
formInput.addEventListener('input', function (evt) { // Слушатель события input
  console.log(evt.target.validity.valid); // Выведем в консоль значение свойства validity.valid поля ввода, на котором слушаем событие input
});`,
    text2: `Данные проверяются на корректность, пока пользователь их вводит.`,
  },
  {
    title: `Связываем JS-методы валидации с DOM`,
    subtitle1: `Изменение стиля поля при ошибке`,
    text1: `Начнём с простой задачи. Нужно изменить стили поля, в которое ввели некорректные данные.
        Для этого невалидному полю input добавим класс со стилем ошибки. Возьмём простую форму
        И опишем стили для класса невалидного input
        Настроим поведение поля ввода. Оно должно быть разным для корректных и некорректных данных.
        Для этого выделим несколько функций:
        showInputError — показывает элемент ошибки;
        hideInputError — скрывает элемент ошибки;
        isValid — проверяет валидность поля, внутри вызывает showInputError или hideInputError.
        Код с этими функциями выглядит так. Комментарии подробные, чтобы не запутаться, где что происходит:`,
    code1: `const formElement = document.querySelector('.form'); // Вынесем все необходимые элементы формы в константы
const formInput = formElement.querySelector('.form__input');
const showInputError = (element) => { // Функция, которая добавляет класс с ошибкой
  element.classList.add('form__input_type_error');
};
const hideInputError = (element) => { // Функция, которая удаляет класс с ошибкой
  element.classList.remove('form__input_type_error');
};
const isValid = () => { // Функция, которая проверяет валидность поля

  if (!formInput.validity.valid) {
    showInputError(formInput); // Если поле не проходит валидацию, покажем ошибку
  } else {
    hideInputError(formInput); // Если проходит, скроем
  }
};
formElement.addEventListener('submit', function (evt) {
  evt.preventDefault(); // Отменим стандартное поведение по сабмиту
});
formInput.addEventListener('input', isValid); // Вызовем функцию isValid на каждый ввод символа`,
    text2: `Мы разделили функции так, чтобы каждая из них выполняла что-то одно. Так проще вызывать их для других действий, если это потребуется`,
    subtitle2: `Добавление span ошибки`,
    text3: `Одной красной рамки недостаточно, чтобы указать на некорректность введённых данных. Поэтому добавим своё сообщение об ошибке.
        Это элемент span с классом form__input-error`,
    code2: `<span class="form__input-error">Необходимо заполнить данное поле</span>`,
    text4: `Теперь нужно связать элемент ошибки с полем, которое ей соответствует. Надёжный способ — добавить атрибут id полю ввода и тегу span.
        И искать по нему. Добавляйте id сразу. Часто в формах много полей ввода: легко запутаться, какую ошибку с чем нужно связать
        Теперь id поля form__input можно получить так`,
    code3: {
      lang: "javascript",
      value: `const formInput = formElement.querySelector('.form__input');`,
    },
    text5: `И с применением шаблонных строк найти эту ошибку:`,
    code4: {
      lang: "javascript",
      value: `const formError = formElement.querySelector(\`#\${formInput.id}-error\`);`,
    },
    text6: `осталось добавить в нужные функции`,
  },
  {
    title: `Изменение сообщения об ошибке`,
    text1: `Свойство validationMessage есть у всех полей ввода. В нём записан текст сообщения об ошибке.
        Браузер показывает его по умолчанию, когда вводят некорректные данные.
        Чтобы добавить это сообщение в свой код, нужно передать функции showInputError свойство validationMessage
        Добавим новые возможности в скрипт:`,
    code: {
      lang: "javascript",
      value: `const formElement = document.querySelector('.form');
const formInput = formElement.querySelector('.form__input');
const formError = formElement.querySelector(\`#\${formInput.id}-error\`);
const showInputError = (element, errorMessage) => { // Передадим текст ошибки вторым параметром
  element.classList.add('form__input_type_error');
  formError.textContent = errorMessage; // Заменим содержимое span с ошибкой на переданный параметр
  formError.classList.add('form__input-error_active');
};
const hideInputError = (element) => {
element.classList.remove('form__input_type_error');
  formError.classList.remove('form__input-error_active');
  formError.textContent = ''; // Очистим ошибку
};
const isValid = () => {

  if (!formInput.validity.valid) {
    showInputError(formInput, formInput.validationMessage); // Передадим сообщение об ошибке вторым аргументом
  } else {
    hideInputError(formInput);
  }
}; // Остальной код такой же`,
    },
  },
  {
    title: `Валидация нескольких полей и форм`,
    text1: `Код больше не подходит. Он находит первую попавшуюся в DOM форму и работает только с одним полем внутри неё.
        Чтобы это исправить, перепишем функцию isValid`,
    code1: `const isValid = (formElement, inputElement) => { // Функция isValid теперь принимает formElement и inputElement,

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage); // showInputError теперь получает параметром форму, в которой
  } else { // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement); // hideInputError теперь получает в параметром форму, в которой
  } // находится проверяемое поле, и само это поле
};`,
    text2: `Теперь функция isValid принимает сразу два параметра:
        formElement — html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме.
        inputElement — проверяемое поле ввода.
        Сразу изменим функции showInputError и hideInputError — научим их принимать и обрабатывать входящие параметры:`,
    code2: `const errorElement = formElement.querySelector(\`#\${inputElement.id}-error\`); // Остальной код такой же`,
    subtitle1: `Добавление обработчиков всем полям формы`,
    text3: `Перепишем этот участок кода. Пусть слушатель событий добавится всем полям ввода внутри формы.
        Для этого создадим функцию setEventListener, которая примет параметром элемент формы и добавит её полям нужные обработчики`,
    code3: `const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input')); // Находим все поля внутри формы, сделаем из них массив методом Array.from
  inputList.forEach((inputElement) => { // Обойдем все элементы полученной коллекции
    inputElement.addEventListener('input', () => { // каждому полю добавим обработчик события input
      isValid(formElement, inputElement) // Внутри колбэка вызовем isValid,
    }); // передав ей форму и проверяемый элемент
  });
};`,
    text4: `Функция setEventListeners готова. Она добавит обработчики сразу всем полям формы. Осталось функцию вызвать.
        Для этого нужно разобраться, как добавить обработчики всем формам.`,
    subtitle2: `Добавление обработчиков всем формам`,
    text5: `Основная часть задачи выполнена. Теперь нужно найти все формы в DOM и вызвать для них функцию setEventListeners. Для единообразия
        поступим с формами аналогично полям внутри них. Объявим функцию enableValidation, которая найдёт и переберёт все формы на странице:`,
    code4: `const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form')); // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  formList.forEach((formElement) => { // Переберём полученную коллекцию
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault(); // У каждой формы отменим стандартное поведение
    });
    setEventListeners(formElement); // Для каждой формы вызовем функцию setEventListeners,
  }); // передав ей элемент формы
};
enableValidation(); // Вызовем функцию`,
    text6: `Функция enableValidation найдёт на странице и обработает все формы с классом form. Теперь валидация работает для всех форм`,
    subtitle3: `Пишем недостающие функции`,
    text6: `Сейчас функция isValid валидирует только один input. Но нужно проверить все поля, чтобы настроить статус кнопки.
        Если все поля валидны — активировать кнопку, если хотя бы одно нет — заблокировать
        Для этого создадим функцию hasInvalidInput. Она принимает массив полей формы и возвращает true, если в нём хотя бы одно поле не валидно`,
    code5: `const hasInvalidInput = (inputList) => { // Функция принимает массив полей
  return inputList.some((inputElement) => { // проходим по этому массиву методом some
    return !inputElement.validity.valid; // Если поле не валидно, колбэк вернёт true
  }) // Обход массива прекратится и вся фунцкция
}; // hasInvalidInput вернёт true`,
    text7: `Функция hasInvalidInput только проверяет наличие невалидного поля и сигнализирует, можно ли разблокировать кнопку сабмита.
        Но она ничего не делает с самой кнопкой «Отправить».
        Для стилизации нужна функция toggleButtonState. Именно она отключает и включает кнопку.
        Для этого функция hasInvalidInput проверяет валидность и возвращает true или false. На их основе toggleButtonState меняет состояние кнопки`,
    code6: {
      lang: "javascript",
      value: `const toggleButtonState = (inputList, buttonElement) => { // Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять

  if (hasInvalidInput(inputList)) { // Если есть хотя бы один невалидный инпут
    buttonElement.classList.add('form__submit_inactive'); // сделай кнопку неактивной
  } else {
    buttonElement.classList.remove('form__submit_inactive'); // иначе сделай кнопку активной
  }
};`,
    },
    text8: `Функция переключения кнопки готова. Осталось понять, где её вызвать.
        Нужно сверять состояние кнопки при каждом изменении полей формы. Поэтому toggleButtonState вызывают внутри обработчика события input.
        Это можно сделать после вызова функции isValid`,
    code7: `const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(\`.form__input\`)); // Найдем все поля формы и сделаем из них массив
  const buttonElement = formElement.querySelector('.form__submit'); // Найдем в текущей форме кнопку отправки
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement); // Вызовем toggleButtonState и передадим ей массив полей и кнопку
    });
  });
};`,
    text9: `Теперь кнопка реагирует на корректность данных в каждом поле
        Кнопка отправки формы доступна до начала ввода данных.
        Осталась одна проблема. Кнопка блокируется при неверных данных, но до начала их ввода она активна.
        Чтобы это исправить, нужно заранее вызвать функцию toggleButtonState внутри функции setEventListeners`,
    code8: `const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(\`.form__input\`));
  const buttonElement = formElement.querySelector('.form__submit');
  toggleButtonState(inputList, buttonElement); // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
}; // ...`,
    text10: `Теперь кнопка заблокирована с самого начала`,
  },
];
