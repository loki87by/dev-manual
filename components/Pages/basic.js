export const BASIC = [
  {
    title: "Объекты",
    text1: `Объекты состоят из пар «ключ — значение». Значение — это данные, которые мы хотим записать.
Значением может быть строка, число, булево значение, массив, другой объект или функция.
Ключ — это уникальное имя этого значения. Ключ играет ту же роль, что и имя переменной. По нему мы можем обратиться к значению.
Создадим объект myObject с четырьмя ключами:`,
    code1: `let myObject = {
  stringKey: 'значение', // это свойство
  numberKey: 4, // это свойство
  booleanKey: true, // это свойство
  methodKey: function consoleKitten() { // а вот это метод
  console.log('kitten!');
}`,
    text2: `Пары «ключ — значение» делятся на два типа: свойства и методы.
    Если значение представляет собой функцию, такую пару называют методом.
    Если значение — это строка, число, булево значение, массив или объект, такую пару называют свойством.
    Чтобы получить доступ к свойству, его имя записывают через точку после имени объекта:`,
    code2: `myObject.stringKey;`,
    text3: "или",
    code3: `myObject[numberKey];`,
  },
  {
    title: `Примитивные типы данных. Оператор typeof`,
    text1: `В JavaScript данные делятся на:
объекты, имеющие свойства: пары «ключ + значение»;
примитивы (элементарные типы), у которых есть только значение.
Примитивных типов шесть:
строки (тип “string”);
числа (тип “number”);
булевы значения true и false (тип “boolean”);
undefined (тип “undefined”);
null (тип “null”);
символы (тип “symbol”).
Тип данных определяют оператором typeof. Оператор typeof возвращает строку:`,
    code1: `typeof 10; // "number"
typeof 'Hello World!'; // "string"
typeof true; // "boolean"
typeof undefined; // "undefined"`,
    text2: `typeof работает без скобок, но их ставят, когда нужно определить тип целого выражения:`,
    code2: `typeof (10 + 5)  // "number"
typeof 10 + 5 // "number5" /* во втором случае сначала сработал typeof 10,
вернул строку "number", а оператор сложения произвёл конкатенацию, и получилась строка "number5" */`,
    text3: `Работа typeof выглядит простой и понятной, но есть 3 случая, когда результат работы typeof неочевиден:`,
    code3: `typeof NaN; // "number". Да, "Not a Number" имеет тип данных "number".
typeof null; // "object".
/* Это даже было признано официальным багом JavaScript. Его решили не исправлять, чтобы не сломать уже написанный код. */
typeof function () {} // "function". Хоть такого типа и нет.`,
  },
  {
    title: `Два одиноких типа данных. undefined и null`,
    text1: `Значение не определено. undefined
Если в объявленной переменной ничего не хранится, JavaScript записывает в неё специальное значение undefined.
undefined — это отдельный тип данных, состоящий всего из одного значения: Если переменная равна undefined,
значит она объявлена, но в неё ничего не записано. То же значение возвращается при обращении к несуществующему свойству объекта:
Значения нет. null
null — это особое значение и отдельный тип данных. null сигнализирует, что значения нет.
Некоторые встроенные функции и методы возвращают null, когда не могут вернуть что-то осмысленное.
Знакомый вам querySelector возвращает null, если не нашёл на странице элемент с искомым селектором`,
    code1: `const element = document.querySelector('.non-existing-class');
if (element === null) {
console.log('Элемента с таким классом нет на странице');
}`,
    text2: `Оператор typeof работает с null некорректно, говорит что это объект`,
    code2: `cosnole.log(typeof null);`,
  },
  {
    title: `Строки`,
    text1: `Определение длины строки. Свойство length
У любого текста есть длина. Это значение свойства length, равное количеству символов в строке:`,
    code1: `console.log('АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.length);  // 33
const greekAlphabet = 'αβγδεζηθικλμνξοπρστυφχψω';
console.log(greekAlphabet.length); // 24`,
    text2: `Получение символа строки по индексу
Квадратные скобки — простой способ получить символ из строки по его индексу, т. е. обратиться к нему как к элементу массива.
Индекс первого символа в строке — ноль:`,
    code2: `console.log('эспрессо'[0]); // "э"
    /* можно таким же способом запросить символ обращением к переменной, в которой сохранена строка: */
const wrongWord = 'экспрессо';
console.log(wrongWord[1]); // "к"
/* Если запросить слишком большой индекс, получим undefined */
console.log('экспрессо'[20]); // undefined`,
  },
  {
    title: `Неявное преобразование типов`,
    text1: `При сложении любого значения со строкой движок превращает все значения в строки.
JavaScript — язык со слабой типизацией:
данные могут менять свой тип, даже если разработчик об этом не просил;
невозможно сложить строку с числом, а две строки можно.
Поэтому при сложении числа со строкой движок превратит число в строку и только потом выполнит конкатенацию.
Это накладывает дополнительную ответственность на разработчика: нужно следить за поведением переменных.
Иначе можно не заметить незапланированное преобразование типа`,
    code1: `const a = 30; // Количество отжиманий в первом подходе
const b = 10; // Количество отжиманий во втором подходе
console.log('За сегодня вы отжались: ' + a + b + ' раз'); // "За сегодня вы отжались 3010 раз"`,
    text2: `Неявное преобразование типа — то, которое происходит без прямого указания разработчика.
В JavaScript три вида неявного преобразования типов для примитивных значений:
приведение к строке,
приведение к числу,
приведение к логическому типу.`,
  },
  {
    title: `Приведение к строке`,
    text: `Неявное преобразование к строчному типу происходит при сложении со строкой:`,
    code: `1 + ''; // "1"
undefined + ''; // "undefined"`,
  },
  {
    title: `Приведение к числу`,
    text1: `Движок JavaScript приводит данные разных типов к числам, а затем их сравнивает:`,
    code1: `null >= 1; // false
451' < 452; // true`,
    text2: `Оператор «унарный плюс» приводит нечисловые значения после + к численному типу. Так +'33' вернёт число 33, +'-77' вернет число -77.
Стоящие рядом операторы сложения и унарный плюс не мешают друг другу:`,
    code2: `console.log(67 + +'33'); // 100`,
    text3: `Приведение к числу выполнит и любой другой арифметический оператор. Кроме сложения со строкой — оно будет воспринято как конкатенация`,
  },
  {
    title: `Приведение к булевым значениям`,
    text1: `В круглых скобках условия if данные любого типа всегда приводятся к логическому типу:`,
    code: `const usernameElement = document.querySelector('.username');
if (usernameElement) {
  console.log('Привет, ' + usernameElement.textContent);
}`,
    text2: `Если элемента с классом username на странице нет, в переменную usernameElement запишется null.
В круглых скобках условной конструкции null приводится к логическому типу и становится false. Поэтому тело условия if выполнено не будет.`,
  },
  {
    title: `Явное преобразование типов`,
    text: `О неявном преобразовании важно знать, но намеренно использовать его не стóит.
Другие разработчики могут неправильно трактовать такой код или попросту не заметить неявное преобразование типа.
Более того, вы и сами можете о нём забыть.
Это ведёт к ошибкам в программе, которые очень сложно отловить: они не всегда отображаются в консоли. Явно приводите один тип к другому.`,
  },
  {
    title: `Приведение к строке`,
    text: `Метод String превращает переданный ему аргумент в строку:`,
    code: `const numberToString = String(2); // "2"
const nanToString = String(NaN); // "NaN"
const undefinedToString = String(undefined); // "undefined"
const nullToString = String(null); // "null"
const booleanToString = String(true); // "true"`,
  },
  {
    title: `Приведение к числу`,
    text1: `Метод Number приводит переданный ему аргумент к числовому типу`,
    code1: `const stringToNumber = Number('2'); // 2
const nullToNumber = Number(null); // 0`,
    text2: `Если передать произвольную строку или undefined, вернётся NaN`,
    code2: `const anotherStringToNumber = Number('счастье не за горами'); // NaN
const undefinedToNumber = Number(undefined); // NaN`,
  },
  {
    title: `Приведение к булевым значениям`,
    text1: `Метод Boolean преобразует переданный ему аргумент к «булю»:`,
    code1: `Boolean(2) // true
Boolean(0) // false
Boolean('')  // false
Boolean('Непустая строка'); // true`,
    text2: `Разберёмся подробнее, как разные значения приводятся к логическому типу. В JavaScript значения условно делятся на truthy (англ. «правдивые»)
и falsy (англ. «ложные»).
Правдивые значения при приведении типа становятся Истиной, а ложные — Ложью.  Запоминать и заучивать это не нужно. Доверьтесь интуиции.
Всё интуитивно пустое — ноль, NaN, null, undefined, пустая строка — приводится к false. Всё остальное к true.`,
    code2: `Boolean('Непустая строка'); // true
Boolean(''); // false
Boolean(1); // true
Boolean(0); // false
Boolean(NaN); // false
Boolean(null); // false
Boolean(undefined); // false
Boolean({}); // true
Boolean([]); // true`,
  },
  {
    title: `Логические операторы`,
    text1: `Логических операторов всего три:
! — логическое НЕ,
|| — логическое ИЛИ,
&& — логическое И.
Логическое НЕ делает из условия обратное: превращает true в false и наоборот. Для этого перед условием ставят восклицательный знак !`,
    code1: `!(3 > 2) === 3 <= 2; // true. /* Потому что это превращается в проверку false === false */
let password = 'JavaScript';
function checkPassword(pass) {
  if (!(pass === password)) {
    console.log('Неверный пароль');
  return;
  }
  console.log('Пароль правильный');
  }
  login('java script'); // 'Неверный пароль'
  login('JavaScript'); // 'Пароль правильный'
}`,
    text2: `Если поставить ! перед небулевым значением, движок JS сначала приведёт тип к булю, а затем изменит значение на противоположное:`,
    code2: `!'Непустая строка'`,
    text3: `Двойное отрицание сработает как перевод значения в логический тип`,
    code3: `!!true; // true
!!'непустая строка'; // true
!!''; // false
!!1; // true
!!0; // false`,
    text4: `Логическое ИЛИ служит для связи таких условий, из которых хотя бы одно должно быть выполнено.
Для этого между простыми условиями ставят два прямых слеша ||`,
    code4: `true || false || false;
/* Оператору ИЛИ достаточно, чтобы хотя бы одно простое условие было истинным */`,
    text5: `Оператор ИЛИ идёт по простым условиям слева направо и проверяет каждое. Когда он встречает правдивое значение,
то возвращает его как результат всего условия. Проще понять на примере:`,
    code5: `let condition =  0 || NaN || 'строка' || false;`,
    text6: `В переменную condition записывается результат — значение первого истинного условия.
Часто оператором ИЛИ присваивают переменной значение по умолчанию`,
    code6: `function howDoYouDo(answer) {
  const result = answer || 'да ничего';
  return result;
}
howDoYouDo('всё прекрасно'); // "всё прекрасно"
howDoYouDo(); // "да ничего"`,
    text7: `Логическим И объединяют условия, которые должны выполняться одновременно. Для этого между условиями ставят двойной амперсанд &&
Если поставить && между правдивыми условиями, оператор вернёт последнее из них`,
    code7: `2 * 2 === 4 && 5 < 6 && 'Каждый может стать' // 'Каждый может стать'`,
    text8: `Приоритетность операторов
сначала выполняется логическое НЕ, потом И, а затем — ИЛИ:`,
    code8: `const optimism = !'Жить' && !'Быть' || 'Жить и быть';
console.log(optimism); // "Жить и быть"
/* сначала выполняется !, потом &&, затем || */`,
    text9: `Сначала !'Жить' → false, потом !'Быть' → false, затем false && false → false и наконец false || 'Жить и быть' → 'Жить и быть'.
Операции в скобках выполняются первыми:`,
    code9: `const pessimism = !'Жить' && (!'Быть' || 'Жить и быть');
console.log(pessimism); // false`,
  },
  {
    title: `Область видимости функции`,
    text: `Первое правило. Если идентификатор создан внутри функции, обратиться к нему снаружи нельзя.
Второе правило. Если обратиться к идентификатору из функции, движок сначала поищет идентификатор в теле этой функции.
Если не найдёт — начнёт искать снаружи.
Область видимости вне любых функций называется глобальной. Идентификаторы, определённые в ней, видны везде
Переменную называют глобальной, если она объявлена в глобальной области видимости, и локальной — если внутри функции.`,
  },
  {
    title: `Затенение идентификаторов`,
    text: `приготовить яичницу» — функция,
«яйца» — идентификатор,
«холодильник» — область видимости функции,
«магазин» — глобальная область видимости.
Если в теле функции обратиться к идентификатору, движок JavaScript сначала ищет его в теле этой функции, и уже потом снаружи.
Поэтому если и снаружи, и внутри есть одинаковые идентификаторы, движок остановится на внутреннем, а внешний — проигнорирует.`,
    code: `const a = 'Hello';
function callMe() {
  const a = 'world';
  console.log(a);
}
callMe(); // "world"`,
  },
  {
    title: `Функциональные выражения`,
    text: `Отличия функционального выражения от объявления функции
Отличие 1
Функцию без имени называют анонимной. Объявить анонимную функцию нельзя:
Отличие 2
Объявленную функцию можно вызвать до объявления, функциональное выражение — нельзя.`,
  },
  {
    title: `Стрелочные функции`,
    code1: `const consoleCat = function (cat) { // функциональное выражение, Function Expression
  console.log(cat);
};
const consoleWombat = (wombat) => { // стрелочная функция
  console.log(wombat);
};`,
    text: `Отличие 1: короткий return
Если директива return — единственное действие в теле стрелочной функции, можно опустить и директиву return, и фигурные скобки:
Если возвращаемое значение — объект, его нужно заключить в круглые скобки. Иначе то, что в фигурных, движок воспримет как тело функции:
Отличие 2: короткая запись параметров
Если у стрелочной функции один параметр, можно не заключать его в скобки:
Стрелочные функции как колбэки
Стрелочные функции часто передают как колбэки:`,
    code2: `const array = [1, 2, 3, 4];
array.forEach(() => {
  console.log('Кнопка нажата!');
});`,
  },
  {
    title: `Аргументы по умолчанию`,
    text: `Параметр по умолчанию может принимать любое значение: число, строку, объект, функцию.
Это значение будет присвоено параметру, если аргумент не передан или равен undefined`,
    code: `const whacAMole = (startScore = 0, endScore = startScore) => { // Whac-A-Mole — английское название игры «Убей крота»
  for (let i = 0; i <= 10; i += 1) {
    endScore = Math.random() > 0.5 ? endScore + 1 : endScore;
  }
  return endScore;
}`,
  },
  {
    title: `Поднятие переменных и функций`,
    text1: `Компиляция проходит довольно сложно. Для нас важно, что в этом процессе происходят две вещи:
сначала движок найдёт все объявления функций и объявит их;
затем найдёт все переменные, объявленные через var, объявит их и присвоит каждой значение undefined.
Объявление функций и переменных через var произойдёт в первую очередь. Это называется «поднятие» (hoisting в английской литературе):`,
    code: `console.log(a); // undefined — объявление а поднялось, поэтому ошибки нет
var a = 2;
console.log(a); //2`,
    text2: `Переменные, объявленные через const и let, а также функции, созданные через функциональные выражения, не поднимаются.
О поднятии полезно знать, но не стоит злоупотреблять им. Не расставляйте объявление функций в разных частях файла,
хоть движок это и позволяет. А var не пользуйтесь вовсе.`,
  },
  {
    title: `Объекты`,
    text1: `Если при записи нового свойства мы передаём значение ключа, которое не является строкой, оно автоматически преобразуется в строку:`,
    code1: `const obj = {};
obj[1] = 'единица';
obj[true] = 'истина';`,
    text2: `И наоборот — если при доступе к свойству в квадратных скобках указать значение, не являющееся строкой, оно преобразуется в строку:`,
    code2: `const obj = {};
obj[1] = 'единица';
obj[true] = 'истина';`,
    text3: `Хотя такой код и работает, лучше передавать ключ строкой.
По крайней мере, это позволит избежать недопонимания со стороны других разработчиков, читающих ваш код.`,
  },
  {
    title: `Передача по ссылке`,
    code1: `let jackSparrow = 'Джек Воробей';
let captain = jackSparrow;
console.log('Одна переменная: ', jackSparrow, 'вторая переменная: , captain); // Одна переменная: Джек Воробей, вторая переменная: Джек Воробей
captain = 'Капитан , jackSparrow';
console.log('Одна переменная: ', jackSparrow, 'вторая переменная: ', captain'); // Одна переменная: Джек Воробей, вторая переменная: Капитан Джек Воробей`,
    text1: `Логика тут довольно проста: мы присваиваем значение одной переменной, затем — другой. При изменении одной переменной вторая остаётся
нетронутой. Примитивы передаются по значению. То есть если присвоить одной переменной примитивное значение другой, это значение будет
скопировано. В результате мы получим две переменные с одинаковыми, но независимыми значениями.`,
    code2: `let a = 0;
let b = a;
b += 1;
console.log(b); // 1
console.log(a); // 0`,
    text2: `С объектами всё иначе: они передаются по ссылке. Когда вы создаёте объект, происходят два события:
1. объект создаётся в памяти;
2. в переменную записывается ссылка на эту область памяти.
Поэтому если записать в переменную уже готовый объект, он не будет создан заново. Просто ссылка на него будет записана в новую переменную.
примитивы сравниваются по значению, а объекты — по ссылке.`,
    code3: `const user1 = {
  nickname: 'Vasya2000',
  name: 'Вася',
  surname: 'Пупкин'
};
const user2 = {
  nickname: 'Vasya2000',
  name: 'Вася',
  surname: 'Пупкин'
};
const user3 = user1;
console.log(user1 === user2); // false
console.log(user2 === user3); // false
console.log(user1 === user3); // true`,
    text3: `сравнение объектов возвращает true тогда (и только тогда!), когда сравниваются две ссылки на один и тот же объект.
Во всех других случаях мы получим false, независимо от наполнения объекта.`,
  },
  {
    title: `Поверхностное копирование объектов`,
    text1: `Поверхностное копирование работает так:
1. создаётся новый пустой объект;
2. все свойства исходного объекта копируются в новый.
Создать поверхностную копию объекта можно методом Object.assign. Он принимает на вход два и более аргументов.
Чтобы скопировать объект, нужно передать его методу Object.assign вторым аргументом, а пустой объект — первым:`,
    code: `const firstObj = {
one: 1,
two: 2
three: { message: 'I love JS 🖤' }
};
const secondObj = Object.assign({}, firstObj);
console.log(secondObj === firstObj); // false
console.log(secondObj.three === firstObj.three); // true`,
    text2: `Копирование произошло, но внутренние ссылки не скопировались:
В этом и заключается суть поверхностного копирования: внутренние ссылки остаются прежними. Фактически вот алгоритм такого копирования:
1. возьми очередной ключ исходного объекта;
2. создай в новом объекте такой же ключ;
3. выполни присваивание: созданному в новом объекте ключу присвой значение такого же ключа из старого;
4. переходи к следующему ключу.
Обратите внимание на третий пункт, тут важно слово «присваивание».
Как вы помните, объекты передаются по ссылке. Так что если значение свойства — объект, то и присваивание, как и прежде,
приводит к копированию ссылки на этот объект.`,
  },
  {
    title: `Глубокое копирование объектов`,
    text1: `Логика глубокого копирования неоднозначна, но в общем случае её можно описать так:
1. создаётся новый пустой объект;
2. примитивные свойства исходного объекта копируются в этот новый объект;
3. для каждого из непримитивных свойств исходного объекта выполнить этот алгоритм, начиная с шага 1.
примерный алгоритм работы такой программы:
1. циклом начинаем проходить по всем свойствам объекта;
2. если встречаем примитивное свойство — копируем;
3. если встречаем свойство-объект — повторяем для него все шаги, начиная с первого.`,
    code: `const original = {
  one: 1,
  two: 2,
  three: { message: 'I love JS' }
};
const copy = Object.assign({}, original);
copy.three = Object.assign({}, original.three);
console.log(copy); // копия
// { one: 1, two: 2, three: { message: "I love JS" } }
console.log(copy === original); // false // копия имеет общие корни с оригиналом?
console.log(copy.three === original.three); // false
/* свойство three копии имеет общие корни со свойством three оригинала? */`,
    text2: `Мы записали в свойство three объекта copy поверхностную копию объекта original.three.
Вручную скопировав объект на нескольких уровнях, мы чётко определили, что должна содержать копия copy,
сделали код более понятным и предсказуемым.`,
  },
  {
    title: `Массивы — это объекты`,
    text: `Проверка на массив
Если для JS нет разницы, с массивом он работает или с обычным объектом, то для разработчика эта разница может быть важна.
Оператор typeof тут не поможет — для массива он тоже вернёт значение object
Раньше для такой проверки приходилось изрядно исхитриться. Благо в ES2015 появился удобный способ делать это — метод Array.isArray`,
    code: `const arr = [1, 2, 3];
const obj = {};
console.log(Array.isArray(arr)); // true
console.log(Array.isArray(obj)); // false`,
  },
  {
    title: `Передача по ссылке`,
    text: `Поскольку массивы — это объекты, они передаются и сравниваются по ссылке.`,
    code: `const a = [1, 2, 3];
const b = [1, 2, 3];
const c = b;
console.log(a === b); // false
console.log(b === c); // true`,
  },
  {
    title: `Копирование массива`,
    text1: `Как объекты, массивы можно копировать методом Object.assign`,
    code1: `//const boringTale2 = Object.assign([], boringTale);`,
  },
  {
    text2: `Более простой способ скопировать массив — вызвать метод slice, не передавая тому никаких аргументов`,
    code2: `//const boringTale2 = boringTale.slice();`,
  },
];