export const ABOUT_FUNCTIONS = [
  {
    title: `Оценка сложности алгоритма: асимптотический анализ`,
    subtitle1: `Как оценивают алгоритмы`,
    text1: `Алгоритмы оценивают по двум параметрам: времени выполнения и расходу памяти. По-другому это называется временна́я и пространственная сложность алгоритмов. Чем дольше алгоритм работает и больше памяти потребляет, тем он хуже. Но нельзя утверждать, что «алгоритм работает 1 секунду и задействует 1 мегабайт памяти». Параметры алгоритма зависят от устройства, на котором он выполняется, и от количества входных данных. Один и тот же алгоритм работает на старом компьютере 10 секунд, а на современном — 1 секунду.
Поэтому применяют другой метод оценки производительности алгоритма — асимптотический анализ. Он не зависит от устройства, но учитывает размер данных, которые дали программе на вход. Когда говорят «сложность алгоритмов», обычно имеют в виду временнýю сложность. На её примере рассмотрим, как работает асимптотический анализ.`,
    subtitle2: `Временная сложность алгоритма`,
    text2: `Возьмём простую функцию и рассчитаем временную сложность:`,
    code1: {
      lang: "javascript",
      value: `function sum(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i += 1) {
    sum += numbers[i]
  }
  return sum;
}`,
    },
    text3: `Временная сложность оценивает время работы программы. Чем больше операций нужно выполнить — тем дольше программа будет работать.
Выпишем все операции в функции sum и посчитаем их общее число:
let sum = 0 — создание переменной,
let i = 0 — создание переменной,
i < numbers.length — проверка условия,
i += 1 — увеличение переменной на единицу,
numbers[i] — доступ к элементу массива,
sum += numbers[i] — увеличение переменной sum.
Последние четыре операции находятся в цикле и выполняются конкретное число раз — numbers.length. Посчитаем сумму всех операций:
4 операции в цикле нужно умножить на количество итераций цикла (numbers.length) и прибавить 2 первые операции в функции.
Получится: 2 + 4 * numbers.length. При длине массива n получаем выражение 2 + 4n.
А так изменяется выражение при разных значениях n:`,
    backState: "body-wrong_title-true",
    table: {
      title: ["N", "2 + 4N", "Δ"],
      td1: [`1`, `6`, ``],
      td2: [`10`, `42`, `7`],
      td3: [`100`, `402`, `9.5714`],
      td4: [`1000`, `4002`, `9.9552`],
      td5: [`10000`, `40002`, `9.9955`],
      td6: [`100000`, `400002`, `9.9995`],
      td7: [`1000000`, `4000002`, `9.9999`],
    },
    text4: `В первом столбце таблицы записано разное значение n. Во втором –– как меняется количество операций в абсолютном выражении.
А в третьем столбце указано, как меняется количество операций в относительном выражении по отношению к предыдущему значению.
При изменении n в 10 раз, изменение функции 2+4n также стремится к 10. Например, при n=10, 2+4n=42, а при n=100, 2+4n=402.
В относительном выражении –– 402 / 42 = 9.571. Темп роста функции 2+4n очень близок к функции n, особенно на больших значениях.
Это происходит потому, что основной вклад в рост функции вносит самый значимый её член. Здесь это n.
Это и есть асимптотический анализ — мы оцениваем, как сложность алгоритма растёт с ростом входных данных. Важен только характер изменения функции, поэтому мы опускаем все константные коэффициенты и члены, кроме значимого.
Функция 2+4n даёт сложность О(n). Читается как «О большое от n». Записать можно так: 2 + 4n = О(n), или О(2 + 4n)= О(n).
Значит, что эта функция растёт не быстрее, чем функция n, умноженная на константу. Что правда, ведь обе функции линейные.
Здесь мы применили методику асимптотического анализа. Результат записали с помощью О-нотации.`,
    subtitle3: `Пространственная сложность алгоритма`,
    text5: `Ещё раз запишем функцию sum и посчитаем пространственную сложность:`,
    code2: {
      lang: "javascript",
      value: `function sum(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i += 1) {
    sum += numbers[i]
  }
  return sum;
}`,
    },
    text6: `Пространственная сложность оценивает объём памяти, который занимает алгоритм. Считать в мегабайтах не нужно, мы просто оцениваем, как изменяется количество хранимой информации с изменением входных данных.
Посчитаем все переменные, созданные в функции sum:
let sum = 0 –– переменная для хранения суммы,
let i = 0 –– переменная для хранения индекса.
Мы создали всего две переменные. Пространственная сложность этого алгоритма –– О(1). Она не зависит от входных данных –– массив любой длины будет расходовать одинаковый объём памяти.
В этом уроке при анализе сложности мы подсчитывали операции внутри функции sum. Но иногда за одной операцией скрывается много.`,
    subtitle4: `Непростые операции`,
    text7: `Элементарные операции не зависят от структуры и объёма данных, с которыми работают. К ним относят присвоение значений переменным (a = 5), математические операции (2*2), обращение к полям объекта (obj.a), проверка логических условий (a < 5). Все они работают достаточно быстро, поэтому при расчёте сложность таких операций принимают за единицу и просто считают количество таких операций.
Но бывают более сложные операции, например вызов функции. Их сложность не равна единице. К примеру, методы map и join перебирают элементы массива, поэтому имеют сложность О(n). Если мы используем их в своём коде, то должны учитывать это при расчётах.
Оценим сложность функции:`,
    code3: `function printNames(people) {
  const names = people.map(p => p.name); // О(n), считаем как n операций
  return names.join(', '); // О(n), считаем как n операций
}`,
    text8: `Сложность функции printNames равна сумме сложностей двух вызываемых внутри неё функций: map и join.
Сложность операции join зависит только от длины массива, поэтому равна О(n). Сложность операции map зависит от размера массива и от количества операций внутри функции-колбэка. Здесь сложность равна О(n * 1), ведь в теле колбэка метода мы совершаем всего одну операцию.
Итоговая сложность функции printNames равна О(n) + О(n) = О(2n). Опустим константу 2 и получим сложность О(n).
В работе не всегда нужно считать все операции. Достаточно суммировать сложность операций, которые зависят от размера входных данных, а элементарные операции опускать. Проверим. Усложним код из предыдущего примера:`,
    code4: {
      lang: "javascript",
      value: `function printNames(people) {
  const names = people.map(p => {

    if (p.fullName) {
      return p.fullName;
    } else {
      return [p.firstName, p.middleName, p.lastName].join(' ');
    }
  });
  return names.join(', ');
}`,
    },
    text9: `Операций внутри функции-колбэка map стало больше, но они не зависят от размера входных данных. Какой бы длинный массив people мы не передали, количество операций в колбэке метода map не изменится. Поэтому не нужно считать их точное число. Примем их за константу k.
Получим сложность функции map: k * О(n)=О(n). Сложность О(n), как и в алгоритме с меньшим количеством операций. Рассчитайте сложность функции swap.`,
    code5: `function swap(arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}`,
    image: "image83.png",
  },
  {
    title: `Некоторые функции сложности`,
    text1: `В этом уроке рассмотрим несколько основных функций сложности. Бывают и другие, но знакомство с ними выходит за рамки программы.
С каждой функцией дан пример кода, чтобы лучше её понять.`,
    subtitle1: `Константная сложность О(1)`,
    text2: `Сложность алгоритма не зависит от входных данных. Пример –– арифметическое действие:`,
    code1: {
      lang: "javascript",
      value: `function div(a, b) {
  return (a - (a % b)) / b;
}`,
    },
    text2: `Вне зависимости от значений a и b объём работы не меняется.`,
    subtitle2: `Логарифмическая сложность О(log(n))`,
    text3: `Сложность растёт логарифмически –– на каждом шаге мы уменьшаем количество обрабатываемых данных в несколько раз. В информатике часто работают с логарифмами по основанию два. Значит, что уменьшают объём данных вдвое. Но на сложность алгоритма основание не влияет.
Пример –– бинарный поиск индекса элемента по отсортированному массиву. Суть в том, что на каждом шаге мы берём элемент из середины отсортированного массива и проверяем, равен ли он искомому. Если он больше, продолжаем искать в левой части.
Если меньше –– в правой. И так до тех пор, пока не найдём.`,
    code2: `function binarySearch(sortedNumbers, n) {
  // Определяем точки начала и конца поиска
  let start = 0;
  let end = sortedNumbers.length;
  while (start < end) {
    // Находим элемент в середине массива
    const middle = Math.floor((start + end) / 2);
    const value = sortedNumbers[middle];
    // Сравниваем аргумент со значением в середине массива

    if (n == value) {
      return middle;
    }
    // Если аргумент меньше, чем серединное значение, разделяем массив пополам
    // Теперь конец массива — это его бывшая середина

    if (n < value) {
      end = middle;
      // Иначе началом массива становится элемент, идущий сразу за «серединой»
    } else {
      start = middle + 1;
    }
  }
  // если искомое число не найдено, возвращаем -1
  return -1;
}`,
    text4: `При каждой итерации массив делится пополам. Если изначально длина массива, например, 1024, то на второй итерации элементов останется 512,  затем — 256, потом 128 и так далее. Таким образом, для массива размера 1024 понадобится максимум log2(1024) = 10 шагов.
И число шагов будет расти очень медленно по сравнению с ростом размера массива. Например, чтобы найти число в отсортированном массиве размером в 1000 раз больше, понадобится всего в 2 раза больше шагов log2(1024000) = 19.96.`,
    subtitle3: `Линейная сложность О(n)`,
    text5: `Сложность растёт прямо пропорционально росту данных. Получаем эту сложность всегда, когда создаём цикл по массиву элементов или вызываем метод, который перебирает массив. Пример –– нахождение минимума/максимума в несортированном массиве. Здесь мы идём по массиву и сравниваем числа. Если встречаем больше или меньше записанного минимума и максимума, перезаписываем их на новые.`,
    code3: {
      lang: "javascript",
      value: `function minMax(numbers) {
  // Присваиваем переменным min и max первый элемент массива
  let min = numbers[0];
  let max = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    const n = numbers[i];
    // Сравниваем элемент с min

    if (n < min) {
      min = n;
    }
    // Сравниваем элемент с max

    if (n > max) {
      max = n;
    }
  }
  // Возвращаем найденную пару значений
  return { min, max };
}`,
    },
    text6: `Количество операций линейно зависит от длины массива. Если массив увеличится вдвое, то и количество операций увеличится вдвое.
Это и есть линейная зависимость.`,
    subtitle4: `Квадратичная сложность O(n^2)`,
    text7: `Квадратичная сложность растёт быстро, ведь при увеличении данных в 100 раз, объём вычислений вырастет в 10000 раз.
Поэтому алгоритм с такой сложностью на больших данных работает медленно.
Пример –– поиск всех комбинаций элементов из двух массивов. Для каждого элемента из первого массива мы пробегаем по всему второму массиву, складывая все пары в результирующий массив.`,
    code4: `function combinations(arr1, arr2) {
  // Создаём массив для результата
  const result = [];
  // Запускаем вложенные циклы и формируем все возможные пары
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      result.push([arr1[i], arr2[j]]);
    }
  }
  return result;
}`,
    text8: `Квадратичная сложность — частный случай полиномиальной — O(n^k). Если цикл вложен в другой цикл, а тот — в третий, зависимость будет кубической — O(n^3. Если 4 цикла вложены друг в друга — O(n^4). И так далее.`,
    subtitle5: `Заключение`,
    text9: `Оценка сложности алгоритма — это непросто. Многие работодатели не будут требовать того, чтобы вы в ней разбирались. Но если когда-то решите пойти на собеседование в Яндекс, рекомендуем повторить эту тему. А также пройтись по дополнительным материалам:`,
    link: {
      uri: "https://www.youtube.com/watch?v=ijwbVxLMp58&feature=youtu.be",
      text: "лекция по алгоритмам и структурам данных от Яндекса",
    },
    link: {
      uri: "https://hackernoon.com/big-o-for-beginners-622a64760e2",
      text: "статья про оценку сложности в блоге Hackernoon",
    },
    link: {
      uri: "https://www.freecodecamp.org/news/my-first-foray-into-technology-c5b6e83fe8f1/",
      text: "ещё одна статья на ту же тему от Freecodecamp",
    },
    text10: `Надеемся, после знакомства с ними, сложность алгоритмов станет чуть менее сложной.`,
  },
  {
    title: `Области видимости изнутри`,
    text1: `Разберёмся, как работает область видимости изнутри — то есть как движок JavaScript создаёт области видимости.
Представьте такой файл script.js:`,
    code1: `/* script.js */
const message = 'Hello, world, one more time!'; // англ. «Привет, мир, ещё раз!»
console.log(message);`,
    text2: `Пока мы не создали функций, в нём только одна область видимости — глобальная. Переменная message — глобальная переменная.
Если открыть script.js в браузере, движок создаст специальный объект LexicalEnvironment (англ. «лексическая среда»).
Для краткости назовём его global. Все переменные (в нашем случае только message) будут добавлены в этот объект.
Если обратиться к переменной message, движок будет искать её в объекте global.`,
    code2: `const message = 'Hello, world, one more time!';
function viewAlert(statement) {
  const someVariable = 'Какая-то переменная';
  alert(someVariable);
  alert(statement);
  alert(message);
}`,
    text3: `Мы объявили функцию viewAlert. Теперь к ней можно обращаться по имени. Это работает, потому что движок добавил её в объект global.
Разберёмся, где хранятся переменные, объявленные внутри viewAlert. Нигде, потому что код функции не исполняется, пока она не вызвана.`,
    code3: `const message = 'Hello, world, one more time!';
function viewAlert(statement) {
  const someVariable = 'Какая-то переменная';
  alert(someVariable);
  alert(statement);
  alert(message);
}
viewAlert('Hello, world!');`,
    text4: `В момент вызова функции viewAlert движок начнёт исполнять её код. Локальные переменные этой функции нужно где-то хранить, поэтому движок создаст новый объект LexicalEnvironment для неё. Назовём его LexicalEnvironmentViewAlert, сокращённо — LEVA.
Параметр statement и переменная someVariable окажутся в объекте LEVA.
Если обратиться к переменным внутри функции, движок будет искать их в LEVA. Перейдём к вызовам alert:`,
    code4: `const message = 'Hello, world, one more time!';
function viewAlert(statement) { // англ. statement, «высказывание»
  const someVariable = 'Какая-то переменная';
  alert(someVariable); // someVariable найдена в LEVA
  alert(statement); // statement найдена в LEVA
  alert(message); // хм, message в LEVA нет
}
viewAlert('Hello, world!');`,
    text5: `someVariable и statement найдены в объекте LEVA, но message там нет — она находится в global, который был создан раньше.
Если бы движок прекращал поиск переменных в этот момент, мы бы увидели сообщение об ошибке: «переменная message не найдена».
Но у движка на этот случай есть план — если переменная не найдена внутри, он будет искать её снаружи, то есть в объекте global.
Но как движок понял, что продолжить поиск нужно именно в объекте global? Мы подобрались к главному секрету области видимости.
Когда мы объявили функцию viewAlert, ей было присвоено секретное свойство [[Scope]] (англ. «область видимости»):`,
    code5: {
      lang: "javascript",
      value: `/* при объявлении viewAlert движок делает так */
viewAlert.[[Scope]] = global`,
    },
    text6: `Это свойство никогда не меняется и, благодаря ему, функция viewAlert навсегда запоминает область видимости, в которой она была создана.
Если внутри viewAlert объявить функцию insideViewAlert, она тоже навсегда запомнит место, где была создана:`,
    code6: `const message = 'Hello, world, one more time!';
function viewAlert(statement) {
  const someVariable = 'Какая-то переменная';
  alert(someVariable);
  alert(statement);
  alert(message);
  function insideViewAlert() {
    // ...
  }
}
viewAlert('Hello, world!');`,
    text7: `Потому что для функции insideViewAlert движок тоже создаст свойство [[Scope]]:`,
    code7: {
      lang: "javascript",
      value: `/* при объявлении insideViewAlert запомнит место её создания */
insideViewAlert.[[Scope]] = LEVA`,
    },
    text8: `Даже если в файле 1000 вложенных функций, и из самой глубокой функции мы обращаемся к переменной из глобальной области видимости, движок найдёт её. Ведь каждая из функций хранит место, где она была создана, и движок смотрит в каждое из этих мест по очереди.`,
    subtitle1: `Важно`,
    text9: `К объекту LexicalEnvironment и свойству [[Scope]] нельзя обратиться из кода. Движок делает это сам, а от разработчика они скрыты.`,
    subtitle2: `Резюме`,
    text10: `При объявлении функции она навсегда запоминает место, где была создана благодаря секретному свойству [[Scope]].
С момента своего создания функция никогда не расстаётся с этим свойством — она помнит место, где родилась.`,
  },
  {
    title: `Замыкание`,
    text1: `Один из самых распространённых вопросов на собеседовании на должность JavaScript-разработчика: «Что такое замыкание?».`,
    subtitle1: `Вспомним про область видимости`,
    text2: `Если обратиться к идентификатору внутри функции, движок сначала будет искать его внутри этой функции. Если нет, пойдёт искать снаружи.
При этом если одна область видимости вложена в другую, движок будет переходить от самой вложенной до глобальной, как по ступенькам.`,
    code1: `const a = 1;
function callMe() {
  const b = 2;
  function callMeToo() {
    console.log(a); // a найдётся в глобальной области
    console.log(b); // b найдётся в области видимости функции callMe
  }
  callMeToo();
}
callMe();
/* В консоль выведется:
1
2
*/`,
    text3: `Движок руководствуется правилом: «если переменной нет внутри, поищу снаружи».`,
    subtitle2: `Функцию можно вызвать не там, где она была создана`,
    text4: `Раньше вы могли вызвать функцию только в той же области видимости, в какой она объявлена или «более внутренней»:`,
    code2: {
      lang: "javascript",
      value: `function abc() {
  console.log('Hello');
  function xyz() {
    /* Это область видимости функции xyz.
    Отсюда мы можем обратиться к функции abc. */
    abc();
  }
  /* Это область видимости функции abc.
  Отсюда можем обратиться к xyz —
  она в области видимости функции abc. */
  xyz();
}
/* А дальше будет ошибка — в глабальной
области видимости нет функции с именем xyz. */
xyz();`,
    },
    text5: `Но на самом деле функцию можно вызвать и из другой области видимости. Вот как это делается.
Функция может вернуть другую функцию:`,
    code3: `function callMe() {
  const internet = 'Internet';
  function callMeToo() {
    console.log(internet);
  }
  return callMeToo;
}`,
    text6: `Теперь если вызвать callMe и записать её результат в переменную, получим функцию callMeToo во внешней области видимости.`,
    code4: `function callMe() {
  const internet = 'Internet';
  function callMeToo() {
    console.log(internet);
  }
  return callMeToo;
}
const newCallMeToo = callMe();
console.log(newCallMeToo);
/*
ƒ callMeToo() {
  console.log(internet);
}
*/`,
    text7: `Теперь у нас есть функция callMeToo в глобальной области видимости — она записана в переменную newCallMeToo.
Посмотрите на код этой функции: она обращается к переменной internet, объявленной внутри callMe.
Получается такая ситуация: мы получили функцию callMeToo во внешней области видимости. Эта функция обращается к переменной internet, которой в этой области видимости нет. Вызовем эту функцию и посмотрим, что будет:`,
    code5: `function callMe() {
  const internet = 'Internet';
  function callMeToo() {
    console.log(internet);
  }
  return callMeToo;
}
const newCallMeToo = callMe();
newCallMeToo(); // "Internet"`,
    text8: `У функции newCallMeToo всё равно есть доступ к переменной internet. И он у неё будет, даже если удалить функцию callMe вовсе:`,
    code6: `let callMe = function () {
  const internet = 'Internet';
  function callMeToo() {
    console.log(internet);
  }
  return callMeToo;
}
const newCallMeToo = callMe();
callMe = null; // убиваем функцию callMe, её больше нет
newCallMeToo(); // "Internet"`,
    text9: `Дело в том, что функция callMeToo запомнила свою область видимости, когда мы её объявили — то есть момент вызова callMe.
И даже если вызвать её из другого места, она всё равно будет помнить, какие идентификаторы существовали с ней в одной области видимости при объявлении. Это и есть замыкание. Замыкание — это способность функции запоминать область видимости, в которой она была создана и иметь доступ к ней даже при вызове вне этой области видимости.
Можно сравнить замыкание с портфелем, который собирает функция при объявлении, а затем берёт его с собой в любое место, где бы она ни была. Функция кладёт в этот портфель все переменные области видимости, в которой она была объявлена.`,
    image1: "image84.png",
    subtitle3: `Замыкания изнутри`,
    text10: `Что такое замыкание, разобрались. Теперь расскажем, как движок их создаёт.
Вы уже знаете об этом — вспомните прошлый урок этой темы. При создании функции у неё появляется внутреннее свойство [[Scope]].
Оно указывает на внешний LexicalEnvironment — объект переменных области видимости, в которой функция была создана.
Здесь это объект переменных функции callMe.`,
    image2: "image85.png",
    text11: `Когда мы вернули callMeToo наружу, в свойстве [[Scope]] она унесла с собой объект переменных области видимости, где была объявлена.
Теперь откуда ни вызови функцию, при обращении к переменным движок сначала ищет их внутри самой функции, а затем во внешнем
объекте переменных, находя его в свойстве [[Scope]]. Если в этом объекте есть нужная переменная (в нашем случае internet),
говорят, что функция берёт её из замыкания.`,
    image3: "image86.png",
    text12: `Если бы переменной internet не было в свойстве [[Scope]] функции callMeToo, движок стал бы искать её в глобальной области видимости, заглянув в свойство [[Scope]] функции callMe. Если бы нашёл её там, мы всё равно сказали бы, что переменная взята из замыкания.`,
    subtitle4: `Важно`,
    text13: `Замыкание создаётся тогда же, когда и внешний объект LexicalEnvironment. То есть, при вызове функции.`,
    code7: `function callMe() {
  const internet = 'Internet';
  function callMeToo() {
    console.log(internet);
  }
  return callMeToo;
}
const newCallMeToo = callMe(); // здесь создаётся замыкание функции callMeToo
newCallMeToo(); // "Internet"`,
    text14: `Пока функция callMe не вызвана, код внутри неё не выполняется. Соответственно и callMeToo не объявляется, и замыкание не создаётся.`,
  },
  {
    title: `Замыкания на практике`,
    subtitle1: `Функция обратного вызова`,
    text1: `Вы уже использовали замыкания. Этот пример вам раньше встречался:`,
    code1: `const button = document.querySelector('button');
const hint = document.querySelector('#hint');
// сделаем элемент #hint невидимым
hint.style.display = 'none';
function handler(event) {
  hint.style.display = 'block';
}
// делаем hint видимым по двойному клику
button.addEventListener('dblclick', handler);`,
    text2: `Это пример использования замыкания. Методу addEventListener мы передаём функцию обратного вызова, но не вызываем её.
Мы говорим методу addEventListener: «вызови эту функцию, когда произойдёт двойной клик». addEventListener — это тоже функция, просто заранее описанная создателями браузера. Когда произойдёт двойной клик, addEventListener вызовет переданную ему функцию handler в своём коде. То есть handler будет вызвана вне области видимости, в которой была объявлена, но у неё по-прежнему будет доступ к переменной hint. При объявлении функция предусмотрительно собрала портфель с переменными своей области видимости.`,
    image: "image87.png",
    subtitle2: `Не рассчитывайте на глобальные переменные`,
    text3: `Глобальными переменными лучше не пользоваться, потому что у всего кода есть к ним доступ.
Например, на сайте есть счётчик, чьё значение при загрузке равно 0. При клике значение счётчика растёт:`,
    code2: `/* наш код */
const button = document.querySelector('button');
const div = document.querySelector('div');
let counter = 0; // изначально counter равен 0
function increaseCounter(event) {
  counter += 1; // увеличим счётчик на единицу
  div.textContent = counter; // вставим на страницу обновлённое значение
}
// увеличиваем счётчик по клику на кнопку
button.addEventListener('click', increaseCounter);`,
    text4: `Всё работает. Но вы не единственный разработчик в проекте и кто-то другой решил тоже воспользоваться глобальной переменной counter для собственных целей:`,
    code3: `/* код другого разработчика */
const someOtherButton = document.querySelector('.some-other-button');
// функция, удваивающая счётчик
function doubleCounter(event) {
  counter = counter * 2;
}
// сбросил счётчик по клику на какую-то другую кнопку
someOtherButton.addEventListener('click', doubleCounter);`,
    text5: `Оба разработчика обращаются к одной переменной, и потому ни один из них не может быть уверенным в её значении.
В результате не работает ни код одного, ни код другого. Замыкания позволяют не допустить таких поломок:`,
    code4: `/* наш код */
const button = document.querySelector('button');
function createCounter(event) {
  const div = document.querySelector('div');
  let counter = 0; // эта переменная недоступна из окружающего кода
  // но у функции increaseCounter есть доступ к ней
  function increaseCounter() {
    counter += 1;
    div.textContent = counter;
  }
  /* вернём increaseCounter, она сохранит доступ
  к переменной counter через замыкание */
  return increaseCounter;
}
// создадим increaseCounter с замыканием
const increaseCounter = createCounter();
button.addEventListener('click', increaseCounter);`,
    text6: `Теперь counter надёжно защищён. У других частей кода нет доступа к нему, а у функции increaseCounter есть — она берёт его из замыкания.`,
    subtitle3: `Модуль`,
    text7: `В примере со счётчиком мы возвращаем функцию increaseCounter. Только у неё есть доступ к переменной counter, а у внешнего кода этого доступа нет. Мы вернули наружу способ увеличить счётчик на единицу, но другие разработчики теперь не могут сбросить счётчик или записать в него своё значение. Теперь логика нашей программы разделена на приватную (counter нельзя обнулить или переписать из окружающего кода) и публичную (increaseCounter может увеличивать counter на 1). Такой приём проектирования называется модуль.
Теперь нам нужно расширить функционал счётчика: необходимо создать кнопку для его сброса. Чтобы интегрировать эту возможность в код, функция createCounter должна возвращать не функцию, а объект с функциями:`,
    code5: `const increaseButton = document.querySelector('button.increase');
const resetButton = document.querySelector('button.reset');
function createCounter(event) {
  const div = document.querySelector('div');
  let counter = 0;
  function increaseCounter() {
    counter += 1;
    div.textContent = counter;
  }
  // добавим resetCounter, у неё тоже есть доступ к counter
  function resetCounter() {
    counter = 0;
    div.textContent = counter;
  }
  /* вернём объект с двумя функциями,
  это публичные методы нашего модуля */
  return {
    increaseCounter,
    resetCounter
  };
}
// создадим счётчик
const counter = createCounter();
// добавим обработчики
increaseButton.addEventListener('click', counter.increaseCounter);
resetButton.addEventListener('click', counter.resetCounter);`,
    text8: `Теперь createCounter возвращает объект. Мы можем добавлять в него новые методы, например setCounter, который будет устанавливать определённое значение счётчика или randomizeCounter, выбирающий число случайно.
А ещё мы можем создавать новые счётчики, которые будут независимы друг от друга:`,
    code6: {
      lang: "javascript",
      value: `// Это всё будут независимые счётчики
const counter1 = createCounter();
const counter2 = createCounter();
const counter3 = createCounter();`,
    },
    text9: `Код внутри createCounter исполняется движком в момент вызова. И каждый раз создаётся новая переменная counter и объявляются
новые функции increaseCounter и resetCounter. Замыкания — лучшие друзья разработчика. Они позволяют использовать колбэки и
разделять код на публичный и приватный. И не беспокоиться, что одни части программы сломают другие.`,
  },
];
