export const DOM = [
  {
    title: `Атрибуты и их методы`,
    subtitle1: `Получаем значение атрибута: метод getAttribute`,
    text1: `Метод getAttribute принимает на вход имя атрибута и возвращает его значение:`,
    code1: `/* получаем первый элемент в DOM, описанный тегом <img>, */
let imageOnPage = document.querySelector('img');
imageOnPage.getAttribute('src');
/* вернётся ссылка, записанная в атрибуте src первого изображения, которое вернул метод querySelector */`,
    text2: `Если у элемента нет того атрибута, что мы запросили, или подобного атрибута не существует вовсе, вернётся специальное значение null.
Если атрибут задан, но не подразумевает значения, например disabled, мы получим пустую строку:`,
    subtitle2: `Проверяем, есть ли у тега атрибут: метод hasAttribute`,
    text3: `Убедиться в наличии атрибута удобно методом hasAttribute, который возвращает true, если атрибут задан, и false, когда нет.`,
    code2: `const bigAndRed = document.querySelector('div);
bigAndRed.hasAttribute('onclick'); // true
bigAndRed.hasAttribute('несуществующий атрибут') // false;
bigAndRed.hasAttribute('disabled'); // true`,
    subtitle3: `Задаём значение атрибута: метод setAttribute`,
    text4: `Метод setAttribute принимает на вход два аргумента: имя атрибута, значение которого мы хотим задать, и само значение:`,
    code3: `const bigAndRed = document.querySelector('div);
bigAndRed.setAttribute('lang', 'ru');
сonsole.log(bigAndRed.hasAttribute('lang')); //true`,
    text5: `Оба аргумента — строки. Если передать значение другого типа, оно всё равно будет приведено к строке.`,
    subtitle4: `Удаляем атрибут: метод removeAttribute`,
    text6: `Метод removeAttribute удаляет атрибут у элемента:`,
    code4: `const bigAndRed = document.querySelector('div);
bigAndRed.hasAttribute('disabled') // true;
bigAndRed.removeAttribute('disabled'); // удаляем атрибут
bigAndRed.hasAttribute('disabled'); // false`,
    subtitle5: `Важно`,
    text7: `Свойства и атрибуты — не одно и то же.
Если задать тегу атрибут, которого согласно спецификации W3C у него быть не должно, то и соответствующее свойство у объекта не появится.
Но мы всё равно можем получить значение этого атрибута через getAttribute`,
    code5: `<!-- index.html -->
<div id="cat" secondName="Матроскин">Кот</div>`,
    code6: `/* script.js */
let cat = document.querySelector('#cat');
console.log(cat.secondName); // undefined
console.log(cat.getAttribute('secondName')); // Матроскин`,
  },
  {
    title: `Манипуляции с классами CSS`,
    subtitle1: `Получение имени класса. Метод className`,
    text1: `У каждого элемента DOM есть свойство className. Используя его, можно прочитать или записать значение атрибута class`,
    code1: `<div class="princess">Елизавета</div>`,
    code2: `let rank = document.querySelector('.princess'); // выбираем элемент c классом 'princess'
console.log(rank.className); // princess
rank.className = 'queen'; // принцесса стала королевой, перезаписываем класс на 'queen'
console.log(rank.className); // queen`,
    text2: `Если у элемента несколько классов, в свойстве className они будут разделены пробелами:`,
    code3: `<div class="her majesty queen">Елизавета</div>`,
    code4: `let rank = document.querySelector('.queen'); // выбираем элемент c классом 'queen'
console.log(rank.className); // her majesty queen`,
    subtitle2: `Получение списка классов. Метод classList`,
    code5: `<div class="bentley rolls-royce">Королевский гараж</div> <!-- В именах классов записаны марки машин Её Величества -->`,
    code6: `/* получаем список машин королевы в переменной, обратившись к соответствующему элементу с селектором .bentley */
let garage = document.querySelector('.bentley');
console.log('Гараж Её Величества: ', garage.classList); // Гараж Её Величества: bentley rolls-royce`,
    subtitle3: `Проверка наличия класса. Метод contains`,
    text3: `Метод contains проверяет, есть ли у элемента класс, переданный как аргумент:`,
    code7: `let garage = document.querySelector('.bentley');
garage.classList.contains('bentley'); // true — bentley есть
garage.classList.contains('jaguar'); // false — а jaguar нет`,
    subtitle4: `Присвоение класса элементу. Метод add`,
    text4: `Метод add добавляет элементу класс:`,
    code8: `garage.classList.add('jaguar'); // в королевский гараж поступил Ягуар
console.log('Гараж Её Величества: ', garage.classList); // bentley rolls-royce jaguar`,
    subtitle5: `Удаление класса. Метод remove`,
    text5: `Метод remove удаляет у элемента класс, переданный как аргумент:`,
    code9: `garage.classList.remove('jaguar'); // Ягуар надоел
console.log('Гараж Её Величества: ', garage.classList); // bentley rolls-royce`,
    subtitle6: `Переключение класса. Метод toggle`,
    text6: `Метод toggle работает как add, если у элемента класс отсутствует, и как remove — если присутствует. То есть переключает класс у элемента:`,
    code10: `<div class="bentley rolls-royce jaguar">Королевский гараж</div>`,
    code11: `garage.classList.toggle('jaguar');
console.log('Гараж Её Величества: ', garage.classList); // bentley rolls-royce`,
  },
  {
    title: `Управление содержимым: свойства .innerHTML и .textContent`,
    text1: `Свойство innerHTML содержит в себе строку со всем содержимым элемента, включая разметку:`,
    code1: `document.body.innerHTML; // Если в документе нет разметки, вернёт пустую строку.`,
    text2: `innerHTML позволяет не только получить значение свойства, но и перезаписать его:`,
    code2: `document.body.innerHTML = '<div>Добавим разметку</div>'; // Теперь на странице есть только один div.
    /* Если бы перед этим в документе была какая-либо разметка, она была бы заменена этим одним div. */`,
    text3: `Свойством innerHTML можно прочитать, изменить или вовсе удалить содержимое элемента:`,
    code3: `// JS
document.body.innerHTML = ''; // записав пустую строку, можно удалить всё содержимое элемента`,
    subtitle1: `Текстовое содержимое. Свойство textContent`,
    text4: `Позволяет получить или перезаписать текстовое содержимое элемента. Обратите внимание: вёрстка при этом не затрагивается.`,
    code4: `<div>
  <p id="paragraph"> Это текст внутри элемента.</p>
</div>`,
    code5: `let paragraph = document.getElementById('paragraph');
console.log(paragraph.textContent); // "Это текст внутри элемента."
paragraph.textContent = 'А это новый текст.'; // можно перезаписать содержимое`,
    text5: `Если в один элемент вложены другие, текстовое содержимое их всех склеится:`,
    code6: `<p id="paragraph">
  <span>А это текст вложенного элемента.</span> <!--Это текст внутри элемента.-->
</p> <!--А это текст вложенного элемента.-->`,
    code7: `let paragraph = document.getElementById('paragraph');
console.log(paragraph.textContent);`,
    subtitle2: `Другой способ заменить текстовое содержимое. Свойство innerText`,
    text6: `Его основное отличие от textContent в том, что innerText возвращает только видимое текстовое содержимое.
То есть innerText проигнорирует всё, что скрыто свойством display: none, а textContent — нет:`,
    code8: `<p id="paragraph"> <!--Это текст внутри элемента.-->
  <span style="display: none;">Невидимый текст.</span>
</p>`,
    code9: `let paragraph = document.getElementById('paragraph');
console.log(paragraph.innerText); // Это текст внутри элемента.
console.log(paragraph.textContent); /* Это текст внутри элемента. Невидимый текст. */`,
    text7: `Когда нужно прочитать или изменить текстовое содержимое, мы рекомендуем обращаться к textContent. На то есть две причины:`,
    subtitle3: `textContent работает гораздо быстрее, потому что игнорирует правила видимости;
свойство innerText не стандартизировано.`,
    text8: `Оно приобрело популярность, и его стали внедрять в свои браузеры другие производители. Но в стандарте его по-прежнему нет, а значит, поведение innerText в разных браузерах может отличаться.
Более того: нет гарантий, что оно не изменится в будущем.`,
  },
  {
    title: `Гибкая вставка: методы insertAdjacentHTML и insertAdjacentText`,
    text1: `Работа через свойства innerHTML и textContent имеют особенность: каждый раз, когда переопределяют одно из этих свойств, всё DOM-дерево,
вложенное в элемент, удаляется и пересоздаётся заново, даже если изменение было сделано незначительное.
Для того чтобы не терять данные в элементах, существуют методы insertAdjacentHTML и insertAdjacentText,
которые добавляют разметку и текст в документ, не затрагивая существующие элементы.
Добавим тигра в зоопарк свойством insertAdjacentHTML:
zoo.insertAdjacentHTML('beforeend', '<div class="tiger"></div>');
Значение 'beforeend' указывает, что мы вставили HTML-код перед закрывающим тегом элемента. Возможны также значения:
beforebegin' — вставка до открывающего тега;
afterbegin' — вставка после открывающего тега;
afterend' — вставка после закрывающего тега.
Эти точки относительно разметки блока:`,
    code: `<!-- beforebegin -->
<div>
  <!-- afterbegin -->
    <!-- существующая разметка-->
  <!-- beforeend -->
</div>
<!-- afterend -->`,
    text2: `Свойство insertAdjacentText работает аналогичным образом, только вставляет текст, как и свойство textContent.
Инструменты insertAdjacentHTML и insertAdjacentText позволяют не только вставлять текст или HTML-фрагменты, но и:
гибко задавать место вставки (до или после открывающего или закрывающего тега);
не затрагивать при этом уже существующие в DOM-элементы.`,
  },
  {
    title: `Другие полезные свойства элементов`,
    subtitle1: `Значение поля ввода. Свойство value`,
    text1: `Одно из самых популярных свойств — value, оно есть у всех элементов input. Это свойство содержит значение поля ввода.`,
    code1: `/* script.js */
let inputs = document.querySelectorAll('input');
console.log(inputs[0].value); // "Ты опоздала"
console.log(inputs[1].value); // "Игорь Тальков"`,
    subtitle2: `Состояние чекбокса и радиокнопки. Свойство checked`,
    text2: `Это свойство есть только у чекбоксов и радиокнопок. Оно содержит true, если чекбокс отмечен, и false — если нет.
Запомнить все специфичные свойства элементов — непростая задача. У ссылок есть свойство href, у картинок — src.
Подобных свойств у разных элементов ещё много. Но зубрить все эти свойства не нужно:
есть универсальный способ узнать, какие свойства есть у элемента и что в них содержится.`,
    subtitle3: `Свойства и методы элемента. Метод console.dir`,
    text3: `Метод console.log неудобен при работе с DOM-элементами. Если передать ему элемент, в консоль будет выведена разметка`,
    code2: `console.log(document.body); // <body></body>`,
    text4: `Иногда это удобно, но не когда мы хотим просмотреть свойства элемента. Спасение в этом случае — метод console.dir (англ. directory - каталог):`,
    code3: `console.dir(document.body);`,
    text5: `Метод console.dir отобразит список свойств и методов переданного объекта. Используйте его, если не знаете или не помните свойства элемента.`,
  },
  {
    title: `Создание элементов: createElement и createTextNode`,
    text1: `Элементы в DOM бывают двух типов:`,
    subtitle1: `HTML-элементы — содержат текст или другие HTML-элементы.`,
    subtitle2: `Блоки с текстом — содержат текст без вложенных элементов.`,
    text2: `Каждый из этих элементов — узел.
Метод document.createElement принимает на вход имя тега, который нужно создать. Метод createTextNode — текст узла:`,
    code1: `const listItem = document.createElement('li'); // метод createElement принимает строку — имя тега
const divElement = document.createElement('div');
const imageElement = document.createElement('img');
const textItem = document.createTextNode('Hello, world'); // метод createTextNode принимает строку — текст узла`,
    text3: `Если запустить этот код, на странице не появится ничего нового. Для изменений нужно добавить элементы в DOM. Метод append устроен так,
что принимает на вход неограниченное количество аргументов. Если нужно добавить несколько элементов сразу, append это позволяет:`,
    code2: `const list = document.querySelector('.todo-list');
const listItem1 = document.createElement('li');
const listItem2 = document.createElement('li');
const listItem3 = document.createElement('li');
list.append(listItem1, listItem2, listItem3);`,
    subtitle3: `Пять методов добавления`,
    text4: `node.append(...nodes or strings) — добавляет узлы или строки в конец node,
node.prepend(...nodes or strings) — в начало node,
node.before(...nodes or strings) — до node;
node.after(...nodes or strings) — после node;
node.replaceWith(...nodes or strings) –— заменяет node заданными узлами или строками.`,
  },
  {
    title: `Удаление и перемещение элементов`,
    subtitle1: `Удаление элементов. Метод remove`,
    code1: `const listItem = document.querySelector('li'); // выбрали элемент
listItem.remove(); // удалили`,
    subtitle2: `Удаление элементов. Метод closest`,
    text1: `Метод closest возвращает ближайший родительский элемент с переданным селектором.
Вызвав его на элементе кнопки удаления, можно получить искомый элемент списка просто передав его класс`,
    code2: `const deleteButton = document.querySelector('.todo__item-button'); // выберем кнопку удаления
deleteButton.addEventListener('click', function () { // добавим обработчик
  const listItem = deleteButton.closest('.todo__item');
  listItem.remove();
});`,
  },
  {
    title: `Перемещение элементов`,
    text1: `Добавить в DOM можно и элемент, который там уже есть. Тогда элемент удалится с прошлого места и встанет на новое:
Это справедливо для всех пяти методов добавления: append, prepend, before, after и replaceWith`,
    subtitle1: `Клонирование элементов`,
    text2: `Метод cloneNode клонирует элементы. У него один аргумент — true или false.
Если хотите скопировать элемент вместе с содержимым, передайте true, без — false`,
    code1: `const elem = document.querySelector('.original')
const deepCopy = elem.cloneNode(true); // клонировать элемент вместе со всем его содержимым
const shallowCopy = elem.cloneNode(false); // клонирование без дочерних элементов`,
    text3: `Метод cloneNode только копирует элемент, но не добавляет его в DOM. Для этого используют append или другой метод добавления`,
  },
  {
    title: `template-элементы`,
    text1: `Тег template — это заготовка вёрстки. Если добавить template в HTML, содержимое тега не отобразится на сайте:`,
    code1: `<template id="user">
  <div class="user">
    <img class="user__avatar" alt="avatar">
    <p class="user__name"></p>
  </div>
</template>`,
    text2: `Чтобы получить содержимое template, нужно обратиться к его свойству content`,
    code2: `const userTemplate = document.querySelector('#user').content;`,
    text3: `Теперь этот элемент можно клонировать, наполнить содержимым и, где понадобится, вставить в DOM.`,
    code3: `const userTemplate = document.querySelector('#user').content;
const usersOnline = document.querySelector('.user');
const userElement = userTemplate.cloneNode(true); // клонируем содержимое тега template
userElement.querySelector('.user__avatar').src = 'tinyurl.com/v4pfzwy'; // наполняем содержимым
userElement.querySelector('.user__name').textContent = 'Дюк Корморант';
usersOnline.append(userElement); // отображаем на странице`,
    text4: `Если понадобится ещё один такой элемент, содержимое template клонируют ещё раз.
Ещё одно преимущество template перед createElement — браузер проверяет на валидность код внутри этого тега.
Допускается любой корректный HTML-код. Вложенность тегов соблюдать не обязательно: так тег tr внутри template не обязан быть внутри table`,
  },
  {
    title: `Родственные связи в DOM`,
    subtitle: `Ссылка на родителя — parentElement
Псевдомассив детей — children
Первый и последний ребёнок — firstElementChild и lastElementChild
Предыдущий и следующий сосед — previousElementSibling и nextElementSibling`,
    texxt: `Все эти свойства доступны только для чтения. Перезаписать их не получится`,
  },
];
