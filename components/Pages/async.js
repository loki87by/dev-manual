export const ASYNC = [
  {
    title: `Асинхронные операции`,
text1: `Операции бывают синхронными и асинхронными. По очереди разберёмся с теми и с другими.
Начнём с типичного примера на собеседовании: напишем функцию для подсчёта чисел Фибоначчи:`,
code1: `function computeFibonacciElement(n) {

  if (n <= 2) return 1;
  const f = [0, 1, 1];
  for (let i = 3; i <= n; i++) {
    f[i] = f[i - 1] + f[i - 2];
  }
  return f[f.length - 1];
}`,
text2: `А теперь посчитаем миллионный член последовательности:`,
code2: {
  lang: "javascript",
  value: `console.log(computeFibonacciElement(1000000)); // Infinity`},
text3: `Выглядит, будто код исполняется мгновенно, но это не так. На вычисление миллионного числа Фибоначчи браузеру нужно около 30 мс.
И только после этого результат появится в консоли. Насколько важна эта задержка, зависит от контекста. В нашем примере это некритично:
нет смысла выводить результат в консоль до того, как мы его посчитали. Но если бы в нашем коде были другие инструкции, они бы встали
в очередь. То есть движок принялся бы за выполнение их кода только после 30 миллисекунд.
Таким образом, операции, выполняемые JS, можно представить как прямую:`,
image1: "image3.png",
text4: `Получается очередь: каждый фрагмент кода останавливает выполнение следующего за ним фрагмента, пока сам не будет выполнен. Такой код
называется синхронным. Синхронный код можно сравнить с душем: сначала нужно облиться водой, затем намылиться и снова облиться.
Вы не перейдёте к следующему этапу, пока не закончите предыдущий.
Таким образом, синхронный код — это тот, что выполняется от операции к операции. Закончив одну задачу, движок переходит к следующей.`,
subtitle1: `Что такое асинхронный код?`,
text5: `Не всегда операции выполняются одна за другой. От душа перейдём к приготовлению завтрака: пусть он состоит из яичницы и кофе.
Вы ставите сковородку на огонь, наливаете масло, разбиваете яйца. Дальше вы не будете ждать, пока яйца пожарятся, а начнёте варить кофе
в турке. К следующим действиям — снять с плиты яичницу и кофе — вы перейдёте, только когда завтрак будет готов. Этот процесс похож на
работу методов, принимающих на вход колбэки. Например, addEventListener: когда произойдёт какое-то событие (яичница пожарилась),
соверши такое-то действие (сними сковородку с плиты — сожжёшь!):`,
code3: `// «remove from stove» — значит «убрать с плиты»
function removeFromStove(evt) {
  evt.target.remove();
}
// «pan with eggs» — значит «сковорода с яйцами»
const panWithEggs = document.querySelector('#pan');
// при клике по элементу panWithEggs, он будет убран с плиты
panWithEggs.addEventListener('click', removeFromStove);
// следующий код`,
text6: `Такой процесс уже представляет собой не прямую. Его можно представить так:`,
image2: "image4.png",
subtitle2: `Зачем нужен асинхронный код?`,
text7: `Над веб-страницей работает не только движок JS, в этом задействованы также физические устройства: процессор, клавиатура, сетевая карта.
Обращаться к этим устройствам напрямую движок не умеет — ему нужен интерфейс, прослойка между JavaScript и устройством.
Такой интерфейс называется API. Сетевая карта, клавиатура, экран, микрофон, Bluetooth — все эти устройства работают сложно.
Но нам не нужно знать тонкостей их реализации. У нас есть API — набор команд для взаимодействия с этими устройствами.
Движок JavaScript общается с устройствами по API примерно так:
Видит код, требующий вмешательства со стороны физического устройства, например: слушатель клика.
Стучится в API с запросом: «Я жду клика. Если он произойдёт — отдай мне объект event и дай сигнал выполнить вот этот код».
Когда клик происходит, API собирает всю информацию о нём в объекте event и отдаёт этот объект движку JS.
Движок, получая объект event, выполняет код колбэка. Вместо клика может быть любое другое событие: нажатие кнопки на
Bluetooth-устройстве, сигнал от сетевой карты о том, что пришёл ответ с сервера, или изменение положения курсора мыши.
Логика при этом сохраняется: движок стучится в API и дальше ждёт от этого API данных. Когда получает — выполняет код.
Таким образом, асинхронный код нужен, чтобы сайт мог взаимодействовать с устройством, на котором открыт, и пользователем.
Есть разные способы организовать работу с асинхронным кодом. Один из них — колбэки.`,
subtitle3: `Колбэки: синхронные и асинхронные`,
text8: `Сначала вспомним, что такое колбэк. Колбэк — функция, которую передают как аргумент другой функции, и из кода этой «принимающей»
функции вызывают. Вы уже имели дело с колбэками: передавали их методам массива — forEach, map — и слушателям событий addEventListener.
Использование колбэка само по себе не подразумевает работы с асинхронным кодом. Любой колбэк может быть вызван и синхронно, и асинхронно.
Напишем функциональность для отображения твитов на странице. Делать это будет функция. Она принимает на вход текст твита и селектор контейнера, куда нужно вставить этот текст:`,
code4: `function insertTweet(tweet, containerSelector) {
  const tweetContainer = document.querySelector(containerSelector);
  tweetContainer.textContent = tweet;
}`,
text9: `Но вдруг что-то пошло не так? Например, контейнер по селектору не найден. Допишем проверку:`,
code5: `function insertTweet(tweet, containerSelector) {
  const tweetContainer = document.querySelector(containerSelector);

  // Проверим, что с контейнером твитов всё в порядке
  if (!tweetContainer) {
    console.log('Контейнер для твитов не найден');
    /* прекратим выполнение функции, чтобы дальнейший код не вызвал ошибку */
    return;
  }
  tweetContainer.textContent = tweet;
}`,
text10: `Если произойдёт ошибка, консоль нам об этом скажет. Это хорошо. Но, допустим, в случае ошибки мы хотим не показывать
сообщение об ошибке, а создавать новый контейнер и добавлять в него твит.
Каждый раз менять код неудобно. Вынесем код, срабатывающий при ошибке, в отдельную функцию:`,
code6: `function handleError(tweet) {
  const newTweetContainer = document.createElement('div');
  newTweetContainer.textContent = tweet;
  document.body.append(newTweetContainer);
}
// Добавим третий параметр — колбэк
function insertTweet(tweet, containerSelector, callback) {
  const tweetContainer = document.querySelector(containerSelector);

  if (!tweetContainer) {
    // Вызываем колбэк, если нет контейнера
    callback(tweet);
    return;
  }
  tweetContainer.textContent = tweet;
}
// Вызов будет выглядеть так:
insertTweet('Твит, адресованный Илону Маску', '.tweets', handleError);`,
text11: `У такого подхода сразу два преимущества:
Функциональность обработки ошибки собрана в одном месте — её удобно менять и дополнять.
Теперь можно заставить функцию insertTweet делать разные вещи в разных ситуациях:`,
code7: {
  lang: "javascript",
  value: `// Если контейнер не найден на странице,
insertTweet(
  'Твит, адресованный Илону Маску',
  '.tweets',
  function () {
    const newTweetContainer = document.createElement('div');
    newTweetContainer.textContent = tweet;
    document.body.append(newTweetContainer);
  }
);
/* В этом случае, если контейнер для твитов не найден, в консоли окажется это сообщение, и больше ничего не произойдёт */
insertTweet('Какой-то странный тред', '.tweets', function () {
  console.log('Да ну его! Не буду ничего делать');
});`},
text12: `Тут мы использовали колбэк для организации работы с синхронным кодом — каждый блок кода здесь выполняется за другим,
и последовательность заранее определена. Совсем другая ситуация — когда коду приходится кого-то ждать.
В этом случае код становится уже асинхронным, и колбэки приходятся очень кстати.`},
{
  title: `Асинхронные колбэки`,
  subtitle1: `Колбэк для загрузки изображений`,
text1: `Рассмотрим пример: нужно написать функцию для подгрузки изображений на сайт. Будем делать так: создадим изображение — элемент <img>
— методом document.createElement. Затем назначим картинке атрибут src, чтобы браузер понял, откуда загружать изображение:`,
code1: `function loadImage(imageUrl) {
  const img = document.createElement('img');
  img.src = imageUrl; // указываем путь к картинке
  return img;
}
// Теперь можно вставить картинку в разметку
const img = loadImage('https://yastatic.net/q/logoaas/v1/Практикум.svg');
document.body.append(img);`,
text2: `Этот код будет исполняться так:
Движок объявит функцию;
Объявит переменную img;
Запустит код функции loadImage;
Создаст элемент изображения, запишет в него ссылку на картинку;
Пока картинка загружается, создаст DOM-узел, где расположится изображение;
Как только изображение загрузится, отрисует его. В двух последних шагах кроется проблема. гда движок создаст DOM-узел, вёрстка «дёрнется»,
Коосвободив место для нового элемента. Затем, когда изображение загрузится,
вёрстка дёрнется ещё раз при появлении картинки на экране. Если изображение не загрузится пользователь увидит квадрат
Чтобы этого избежать, нужно создавать DOM-узел уже после того, как изображение загружено. И тут приходят на помощь колбэки.
У объекта изображения есть свойства onload и onerror. В них мы можем записать функции. Первая сработает, когда изображение загружено,
вторая — если произошла ошибка. Запишем функции в соотвествующие свойства:`,
code2: `// колбэк, который нужно выполнить после того как изображение загрузится
function imageLoadCallback(evt) {
  document.body.append(evt.target);
}
// Функция для создания изображения
function loadImage(imageUrl, loadCallback) {
  const img = document.createElement('img');
  img.src = imageUrl;
  // Функция, которая записана в onload будет вызвана после загрузки изображения
  img.onload = loadCallback;
}
loadImage(
  'https://yastatic.net/q/logoaas/v1/Практикум.svg',
  imageLoadCallback
);`,
text3: `Теперь вёрстка не дёрнется дважды — DOM-элемент создастся, только когда изображение подгружено.
Это пример работы с асинхронным кодом. Отрисовка изображений — часть браузерного API. И взаимодействие с этим API асинхронное:
браузер запросил у сервера изображение, и пока оно идёт, занялся исполнением другого кода.
Нашей задачей было организовать работу с асинхронным кодом. Как-то сказать движку: «отрисуй изображение после того, как загрузишь его».
Для этого мы записали функцию отрисовки изображения в свойство onload.
Колбэки — один из подходов организации работы с кодом. У такого подхода есть недостатки.`},
{
  title: `Таймеры`,
text1: `В прошлых уроках мы говорили об асинхронном коде и как с ним работать, используя колбэки. Теперь поговорим о таймерах. Таймеры — это
специальные функции внутри браузера. Они позволяют запускать код с задержкой. То есть таймером мы говорим браузеру:  «Немного подожди,
а затем исполняй этот код». Так можно настроить окно чата на сайте, которое возникает спустя какое-то время после открытия страницы;
или автоматическое обновление окна электронной почты. Есть два метода для установки таймеров: setTimeout и setInterval. Разберём оба.`,
subtitle1: `Установка таймера: setTimeout`,
text2: `Метод setTimeout ждёт определённое время, после чего исполняет какой-то код. На вход этот метод принимает:
первым аргументом колбэк: код, который нужно выполнить;
вторым аргументом — паузу в миллисекундах, которую нужно выждать, прежде чем исполнять код колбэка;
аргументы, которые нужно передать колбэку на вход.`,
code1: `function showMessage(message) {
  console.log(message);
}
setTimeout(showMessage, 10000, 'С загрузки страницы прошло 10 секунд');
/* Через 10 секунд (то есть 10 тысяч миллисекунд) после загрузки страницы в консоли появится сообщение. */`,
text3: `Через 10 секунд после загрузки страницы движок вызовет функцию showMessage, передав ей строку «С загрузки страницы прошло 10 секунд».
Таймер можно удалять методом clearTimeout. Для этого таймер нужно записать в переменную, а затем её передать методу clearTimeout.
Например, в интернет-банке пользователя нужно выкидывать из системы, если он не взаимодействует с сайтом какое-то время.
Это удобно сделать таймером: установить его при загрузке страницы, и при каждом действии пользователя сбрасывать:`,
code2: `function logOut() {
  // здесь логика «выкидывания» пользователя из системы
}
// через 300 секунд выкинем пользователя
let timer = setTimeout(logOut, 300000);
// если пользователь кликнул куда-то, сбросим таймер и будем ждать заново
window.addEventListener('click', function () {
  clearTimeout(timer);
  timer = setTimeout(logOut, 300000);
}`,
subtitle2: `Циклический таймер: setInterval`,
text4: `Метод setInterval устанавливает циклический таймер. Он позволяет вызывать колбэк много раз, через заданные промежутки времени.
Например, сделать автоматическую проверку почты:`,
code3: {
  lang: "javascript",
  value: `function checkEmail() {
  // Тут код для проверки, не появилось ли на почтовом сервере новых писем.
}
// Ящик будет обновляться каждые десять секунд
setInterval(checkEmail, 10000);`},
text5: `Когда таймер не нужен, его следует удалить, чтобы не тратить ресурсы браузера. Для этого нужно передать таймер методу clearInterval:`,
code4: `const interval = setInterval(checkEmail, 10000);
// Если пользователь переключил вкладку,
window.addEventListener('blur', function () {
  clearInterval(interval); // удаляем таймер.
}
// Если пользователь вернулся на вкладку,
window.addEventListener('focus', function() {
  interval = setInterval(checkEmail, 10000); // снова запускаем таймер.
}`,
text6: `Какую бы задержку мы ни передали на вход методам setTimeout и setInterval, реальная пауза всегда чуть больше.
Это связано с загруженностью процессора: когда колбэк поступает на выполнение, ему приходится отстоять в очереди из других задач.`},
{
  title: `Event Loop`,
  text1: `Где асинхронность, там и путаница с порядком выполнения операций. Рассмотрим пример:`,
  code1: `console.log('Это сообщение появится в консоли первым');
setTimeout(function () {
  console.log('А это — третьим');
}, 1);
console.log('Это сообщение появится вторым');`,
text2: `Разберём почему так происходит.
Сначала движок просто выполняет функцию console.log. Для этого он отправляет её в специальную очередь вызовов — колстек.
Дальше он натыкается на задачу по установке таймера. Сам движок отсчитывать время не умеет — этим занимается браузер.
Поэтому движок «стучится» в браузерный API и просит: «Поставь таймер на 1 мс, после чего скажи мне выполнить вот этот колбэк».
Всё, запрос в Web API ушёл, так что движок взялся за свои дела — продолжил выполнять инструкции, то есть отправил в колстек ещё один
вывод в консоль. Дальше происходит событие — 1 миллисекунда прошла. Поэтому движку приходит сообщение от API, что код колбэка можно
исполнять. Эта задача встаёт в специальную очередь колбэков. Если движок чем-то занят, когда ему приходит колбэк, он сначала закончит
со своими делами, а потом займётся выполнением задач из очереди колбэков.`,
subtitle1: `Как устроен колстек`,
text3: `Все инструкции попадают в колстек — очередь на выполнение. Это происходит так:`,
code2: `console.log('Аты-баты, шли солдаты');
console.log('Аты-баты, на базар');`,
text4: `В колстек попадает задача : «Выведи на экран строку „Аты-баты, шли солдаты“».
Задача выполняется — строка выводится.
В колстек приходит следующая задача: «Выведи на экран строку „Аты-баты, на базар“»
Задача выполняется — ещё одна строка выводится.
Но задачи могут быть сложнее — они могут порождать другие задачи:`,
code3: {
  lang: "javascript",
  value: `function businessBeforePleasure() {
  function business() {
    console.log('Сделал дело');
  }
  function pleasure() {
    console.log('Гуляй смело');
  }
  business();
  pleasure();
}
businessBeforePleasure();`},
text5: `Тут колстек заполняется сложнее:
В колстек попадёт задача «Выполни функцию businessBeforePleasure. Дальше движок начнёт выполнять тело функции, и всё это время
businessBeforePleasure будет находиться в колстеке. В колстек попадёт задача выполнить код функции business — вызов этой функции
окажется в колстеке «поверх» функции businessBeforePleasure.
Движок начнёт выполнять код функции business: отправит в колстек задачу «Выведи в консоль строку „Сделал дело“».
Внутри функции business больше нет задач, а значит, её можно исполнить. Это и происходит: в консоль выводится строка «Сделал дело»,
а из колстека уходят вызов console.log и вызов функции business.
Затем в колстек попадает функция pleasure, а поверх неё — вызов console.log с аргументом «Гуляй смело». И снова колстек очищается:
сначала из него уходит вызов console.log, затем — функция pleasure и, наконец, функция businessBeforePleasure. Колстек становится пустым.`,
image1: "image5.png",
text5: `Tаким образом, задачи в колстек поступают как игральные карты из колоды. Если это одна задача (например, вызов console.log) то движок
«сдаёт» в колстек одну карту. Если же вы вызываете одну функцию из другой, в колстек эти функции тоже будут попадать как карты: в самом
низу колстека окажется самая внешняя функция, выше — первой степени вложенности и так далее. Если в колстек попала такая «стопка»
задач, то и выполняться они будут сверху вниз: сначала из колстека уйдёт самая вложенная функция (верхняя карта), затем более внешняя.`,
subtitle2: `Очередь колбэков и цикл событий`,
text6: `Мы рассматривали пример, усложним код:`,
code4: `// если запустить этот код в консоли, вкладка браузера зависнет на несколько минут. Не делайте этого, если не хотите ждать, пока код закончит работу.
console.log('Это сообщение появится в консоли первым');
setTimeout(function () {
  console.log('Непонятно, какое по счёту это сообщение');
}, 1);
for (let i = 0; i <= 1000000; i += 1) {
  console.log('Это сообщение нужно показать в консоли миллион раз');
}`,
text7: `Когда появится сообщение «Непонятно, какое по счёту это сообщение»?
Если ничего не знать об Event Loop, можно рассуждать так: поскольку миллион раз вывести в консоль строку занимает больше 1 мс, вывод строки
«Непонятно, какое по счёту это сообщение» втиснется куда-то между выводами «Это сообщение нужно показать в консоли миллион раз».
Но это не так. Рассмотрим, как с этими вызовами поступит движок JS. Он отправит в колстек такие задачи:
выведи в консоль «Это сообщение появится в консоли первым»;
отправь запрос в Web API на установку таймера в 1 мс;
миллион раз покажи в консоли строку «Это сообщение нужно показать в консоли миллион раз». Дальше от Web API приходит сигнал —
таймер прошёл. А значит, нужно выполнить код колбэка — вывести в консоль строку «Непонятно, какое по счёту это сообщение».
Движок отправляет задание в колстек: выведи в консоль строку «Непонятно, какое по счёту это сообщение». Таким образом, при наступлении
какого-то события, задача поступает в очередь колбэков. Задачи из очереди подхватываются циклом событий (event loop)
и передаются на выполнение — в колстек.`},
{
title: `Promise`,
text1: `Промис — это часть отдельного API, специально сделанного для работы с асинхронным кодом.`,
code1: `// fetch — это функция для запроса на сервер,
fetch('https://socialnetwork.com/users')
  .then(getIvan)
  .then(getAnna)
  .then(getMutualFriends)
  .then((mutualFriends) => {
  alert(\`У Анны и Ивана \${mutualFriends} общих друзей\`)
});`,
text2: `Читать такой код уже приятнее и проще. Чтобы стало совсем хорошо, разберёмся как же работают промисы.`,
subtitle1: `Концепция промисов`,
text3: `В некоторых кафе после заказа дают бипер — специальное устройство, которое начинает вибрировать и сигналить, когда ваш заказ готов.
Так вы понимаете, что нужно встать и сходить за своим заказом. Такой бипер — и есть промис. Когда вы сделали заказ, вы забираете бипер и
садитесь за стол. Дальше вы можете заняться своими делами: полистать ленту Facebook, поговорить по телефону, почитать книгу. Когда бипер
начнёт светиться и вибрировать, вы сможете закончить, например, разговор по телефону, а после отправиться за своим заказом. Промисы —
как раз такие биперы для JavaScript. Они позволяют описывать код, который нужно выполнить не сразу, а когда произойдёт какое-то событие.`,
subtitle2: `Синтаксис`,
text4: `Часто промисы используют для запросов к какому-то устройству, например, к серверу. Запрос может быть исполнен или отклонён.
Поэтому при создании промиса нужно описать, что делать в случае выполнения запроса, а что — в случае отказа. Но прежде чем описывать
эту логику,  нужно дать понять движку: как определить, обработан наш запрос или нет.
Чтобы «научить» движок обрабатывать запрос, функции Promise передают на вход функцию. Она в свою очередь тоже принимает на вход два
колбэка: resolve и reject. Эти колбэки переводят промис в статус «исполнен» или «отклонён».`,
code2: `const newPromise = new Promise(function (resolve, reject) {
// пока будем определять, обработан запрос или нет, случайным образом
  const rand = Math.random() > 0.5 ? true : false;

  if (rand) {
    resolve('Запрос обработан успешно');
  } else {
    reject('Запрос отклонён');
  }
});
// Параметры resolve и reject можно назвать и по-другому, но обычно им дают именно такие имена`,
text5: `Код функции, переданной функции Promise, исполняется немедленно. Как только вы откроете файл, движок запустит код промиса:
создаст переменную rand, присвоит ей true или false. Дальше в зависимости от значения переменной rand движок переведёт наш промис в
статус «исполнен» или «отклонён». Дальше нам нужно прописать логику: что делать, если промис будет обработан, и что — если отклонён.
Для этого у промисов есть три метода:
then — выполнится, если промис исполнен;
catch — если отклонён;
finally — выполнится в любом случае независимо от статуса промиса.
Первые два метода, then и catch, принимают на вход функцию с одним параметром. Этот параметр — то самое значение, с которым мы
вызывали resolve и reject при создании промиса. В нашем случае это одна из двух строк — 'Запрос обработан успешно' или 'Запрос отклонён':`,
code3: `// Создаём промис
const newPromise = new Promise(function (resolve, reject) {
  /* Будем определять, обработан запрос или нет, случайным образом */
  const rand = Math.random() > 0.5 ? true : false;

  if (rand) {
    resolve('Запрос обработан успешно');
  } else {
    reject('Запрос отклонён');
  }
});
newPromise
  .then(function (value) { // Если промис был обработан
    /* Параметр value хранит значение, переданное методу resolve при создании промиса, то есть строку "Запрос обработан успешно" */
    console.log(value);
  })
  .catch(function (value) { // Если промис был отклонён
    /* Здесь параметр value будет хранить то значение, которое было передано методу reject, то есть строку "Запрос отклонён" */
    console.log(value + ', нам жаль :(');
  })
  .finally(function () { // В любом случае
    console.log('Как бы там ни было — запрос мы в глаза видели');
  });`,
text6: `Ещё раз: вы создаёте промис глобальной функцией Promise, которому передаёте на вход колбэк. Этот колбэк принимает на вход 2 функции,
которые можно вызвать в теле колбэка.
Первая функция — resolve. Она переводит промис в статус «исполнен», а значение, переданное этой функции затем передаётся методу then.
Вторая функция — reject. Она переводит промис в статус «отклонён». Переданное этой функции значение затем передаётся методу catch.
Поэтому, чтобы создать промис, нужно сначала вызвать функцию Promise, а затем описать в методах then и catch,
что мы хотим делать в случае успеха, а что — в случае неудачи.`,
subtitle3: `Цепочка обработки запроса`,
text7: `Предположим, вы создали промис, описали его работу в методах then и catch. Но что, если одного запроса к серверу недостаточно?
К примеру, вы запросили через API список постов одного пользователя. Обработали их, отобрали тот, что вам нужен.
А теперь вам нужно получить комментарии к этому посту. Придётся снова идти на сервер и просить на этот раз список комментариев.
Промисы позволяют добавлять задачи в асинхронную очередь. Для этого нужно дописать в коде ещё один then или catch.
Первые then и catch на странице получат те значения, которые мы передавали на вход функциям resolve и reject. Все последующие — то,
что возвращали предыдущие методы then и catch. А вот код функций firstAction, secondAction и thirdAction:`,
code4: `const newPromise = new Promise(function (resolve, reject) {
  resolve('Раз'); // Сразу получим обработанный промис
});
function firstAction(value) {
  /* Значением value станет то, что мы передали функции resolve при создании промиса. То есть строка "Раз". */
  return \`\${value}, два\`;
}
function secondAction(value) {
  /* Тут значение value — это то, что вернёт предыдущий метод then, то есть строка "Раз, два" */
  return \`\${value}, три\`;
}
function thirdAction(value) {
  console.log(value);
}
newPromise.then(firstAction).then(secondAction).then(thirdAction);
/* В консоли окажется: "Раз, два, три" */`,
text8: `Цепочку вызовов then часто записывают в столбец, отбивая табуляцией:`,
code5: {
  lang: "javascript",
  value: `newPromise
  .then(firstAction)
  .then(secondAction)
  .then(thirdAction);`},
text9: `Аналогично для отклонённых промисов:`,
code6: `const newPromise = new Promise(function (resolve, reject) {
  reject('Раз'); // Сразу получим отклонённый промис
});
function firstAction(value) {
  return \`\${value}, два\`;
}
function secondAction(value) {
  return \`\${value}, три\`;
}
function thirdAction(value) {
  console.log(value);
}
newPromise
  .then(firstAction)
  .then(secondAction)
  .catch(thirdAction);
/* В консоли окажется: "Раз", так как newPromise был отклонён и мы сразу попали в блок catch */`,
text10: `Обратите внимание: код функции, которую мы передаём методам catch и then, тоже может приводить к ошибке.
Всегда завершайте цепочки промисов блоком catch. Это позволит обработать ошибку, если она возникнет в любом then из цепочки.`,
subtitle4: `Статические методы`,
text11: `У Promise есть встроенные методы. Они пригождаются при создании промисов. Обратите внимание — сами промисы этими методами
не обладают, они есть только у функции Promise. Promise.resolve и Promise.reject
Если вы сразу хотите создать исполненный или отклонённый промис, вызывать new Promise необязательно.
Можно сразу обратиться к методам Promise.resolve и Promise.reject. Эти методы создают промис, переводят его в статус «исполнен»
или «отклонён» соответственно, и записывают как результат промиса — то, что мы передали этим методам.`,
code7: `Promise.resolve('Этот промис исполнен')
  .then(function (value) {
    console.log(value); // "Этот промис исполнен"
  });
Promise.reject('Этот промис отклонён')
  .catch(function (value) {
    console.log(value); // "Этот промис отклонён"
  });`,
subtitle5: `Promise.all`,
text12: `У вас на странице может быть несколько промисов. Например, вы запрашиваете картинку с одного сервера, а текст — с другого.
И из этих текста с картинкой нужно собрать пост. Очевидно, нет смысла выкладывать ни картинку без текста, ни текст без картинки.
Иными словами — создавать пост мы будем только после того, как оба промиса будут в статусе «исполнен».
Для этого есть статический метод Promise.all. Он принимает на вход массив с промисами и выполняет записанный в then код,
только когда все промисы вернулись со статусом «исполнен»:`,
code8: `// Создаём первый промис
const firstPromise = new Promise((resolve, reject) => {

  if (someCondition) {
    resolve('Первый промис');
  } else {
    reject();
  }
});
// Создаём второй промис
const secondPromise = new Promise((resolve, reject) => {

  if (secondCondition) {
    resolve('Второй промис');
  } else {
    reject();
  }
});
// Создаём массив с промисами
const promises = [firstPromise, secondPromise]
// Передаём массив с промисами методу Promise.all
Promise.all(promises)
  .then((results) => {
    console.log(results); // ["Первый промис", "Второй промис"]
});`,
text13: `Таким образом, промисы — это запросы на асинхронный код. Когда мы создаём промис, мы говорим движку: выполни вот этот код
и по результатам переведи промис в статус «исполнен» или «отклонён».
Все дальнейшие действия с результатом запроса прописывают в цепочке методов then и catch. Они принимают на вход колбэк с одним параметром.
В этот параметр записывается либо то, что вернул предыдущий then или catch, либо то значение, с которым была вызвана функция resolve или reject.
Асинхронный код — тот, что выполняется по наступлению какого-то события: ответа от сервера, срабатывания таймера или клика мышью.
Иными словами — где интерактивность, там и асинхронность. Поэтому с ней нужно уметь работать.
Движок JS справляется с асинхронным кодом так: создаёт задачи и отправляет их в колстек. Когда происходит какое-то событие,
нужный код попадает в очередь задач, откуда их забирает Event Loop и тоже отправляет в колстек.`},
{title: `Дополнительные материалы`,
text1: `Несколько материалов, которые станут хорошим дополнением к пройденному в этой теме.`,
subtitle1: `Асинхронность`,
text2: `«Асинхронность и производительность» — книга из серии «Вы не знаете JS». Рекомендуем прочитать три её первых главы:`,
link1: {uri: 'https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/async%20%26%20performance/ch1.md', text: 'Chapter 1: Asynchrony: Now & Later'},
link2: {uri: 'https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/async%20%26%20performance/ch2.md', text: 'Chapter 2: Callbacks'},
link3: {uri: 'https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/async%20%26%20performance/ch3.md', text: `Chapter 3: Promises`},
text3: `К сожалению, эта часть на русский не переведена.`,
subtitle2: `Event Loop`,
frame1: {uri: 'https://www.youtube.com/embed/8aGhZQkoFbQ', text:`«What the heck is the event loop anyway?» (англ. «Что за чертовщина этот event loop?»).`},
text5: `Если урок про Event Loop оставил вас в недоумении, уделите полчаса этому видео.`,
frame2: {uri: 'https://www.youtube.com/embed/u1kqx6AenYw&feature=youtu.be', text: '«Further Adventures of the Event Loop» (англ. «дальнейшие приключения event loop»)'},
text6: `— ещё одно видео про event loop, которое можно считать продолжением предыдущего. Отдельные моменты рассмотрены в нём глубже.
И последнее видео про event loop:`,
frame3: {uri: 'https://www.youtube.com/embed/cCOL7MC4Pl0&feature=youtu.be', text: '«In The Loop».'},
subtitle3: `Promise`,
text7: `Поначалу у всех проблемы с промисами. Почитай «У нас проблемы с промисами» — отличную статью об использовании промисов на практике.`,
link4: {uri: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise', text: `Неплохой туториал о Promise на MDN`}
}]