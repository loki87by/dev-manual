export const MATH = [
  {
    text1: `Оператор возведения в степень **. Основание (слева) умножается на себя число раз, равное степени (справа):`,
    code1: {
      lang: "javascript",
      value: `console.log(2 ** 4); // 16`,
    },
    text2: `Оператор взятия остатка, или modulo %. Возвращает не проценты и не модуль, а остаток от деления левого числа на правое:`,
    code2: {
      lang: "javascript",
      value: `console.log(5 % 1); // 0
console.log(3 % 2); // 1
console.log(11 % 4); // 3`,
    },
    text3: `шаблонные строки могут содержать вычисляемые выражения внутри фигурных скобок со знаком доллара в начале \${...}:`,
    code3: `console.log(\`\${2 + 5} раз отмерь - \${9 - 8} отрежь\`); // "7 раз отмерь - 1 отрежь"`,
  },
  {
    title: `Числа и специальные числовые значения`,
    subtitle1: `Бесконечность. Метод Number.isFinite`,
    text1: `В JavaScript две бесконечности — Infinity и -Infinity. Это самое большое и самое малое числовые значения в языке:`,
    code1: {
      lang: "javascript",
      value: `// деление на 0 — это бесконечность
25 / 0; // Infinity
// если разделить на 0 отрицательное число, получим минус бесконечность
-25 / 0; // -Infinity
// бесконечность минус что угодно — бесконечность
Infinity - 1000000000; // Infinity`,
    },
    text2: `Работа с бесконечностями непрозрачна, лучше ими не пользоваться:`,
    code2: {
      lang: "javascript",
      value: `Infinity + -Infinity; // NaN
Infinity * 0; // NaN
Infinity * -1; // -Infinity
Infinity * -Infinity; // -Infinity`,
    },
    text3: `Метод Number.isFinite проверяет код на «бесконечность».
Если Number.isFinite передать на вход любую из бесконечностей, он вернёт false, конечное число — true`,
    code3: `Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite(1703); // true`,
    subtitle2: `NaN — Not a Number. Метод Number.isNaN`,
    text4: `Если JavaScript не знает, как посчитать результат арифметического выражения, он сообщает об этом специальным значением — NaN`,
    code4: `console.log(10 * 'десять'); // NaN`,
    text5: `То же самое произойдёт и в других арифметических операциях со строкой или с undefined. Исключением является только сложение со строкой
— оно приводит к конкатенации. NaN относится к числовому типу данных, пусть и называется «не число»`,
    code5: `console.log(typeof NaN); // "number"`,
    text6: `Забавное свойство NaN — оно не равно ничему, даже самому себе`,
    code6: {
      lang: "javascript",
      value: `console.log(NaN === NaN); // false`,
    },
    text7: `Из-за этого нельзя напрямую проверить, оказался ли результат вычисления не числом. Для решения этой проблемы создан метод Number.isNaN
Когда методу Number.isNaN передают как параметр выражение, он отвечает true или false на вопрос: «Правда ли, что этот параметр — NaN?»`,
    code7: `Number.isNaN(NaN); // true
Number.isNaN(0 / 0); // true`,
    subtitle3: `Методы для работы с числами`,
    text8: `Объект Math и его методы`,
    code8: `Math.floor(9.99); 9 округляет переданное число «вниз»
Math.ceil(9.01); // 10	округляет «вверх»
Math.round(9.51); // 10	округляет до ближайшего целого
Math.max(1, 2, 3, 4, 5); // 5 возвращает наибольшее из переданных чисел
Math.min(1, 2, 3, 4, 5); // 1 возвращает наименьшее из переданных чисел
Math.random(); // 0.31764219954126016 возвращает случайное число от 0 включительно до 1 не включительно`,
    text9: `Работа с дробной частью. Функция parseInt`,
    code9: `let age = '37 лет, 8 месяцев и 10 дней';
console.log(parseInt(age)); // 37`,
    text10: `Функция parseInt приводит переданный аргумент к целому числу.
Она читает аргумент слева направо, если встречает не цифру, останавливается и возвращает всё, что прочитала до этого:`,
    code10: `parseInt('38 попугаев'); // 38`,
    text11: `Если первый символ передаваемой строки не цифра, parseInt вернёт NaN`,
    code11: `parseInt('Метро 2033'); // NaN`,
    text12: `Второй аргумент parseInt — система счисления, в которой число передаётся функции. parseInt определяет только то, в какой системе
счисления передан первый аргумент, но на выходе мы всё равно получим десятичное число.`,
    code12: `parseInt('100', 10); // 100
parseInt('100', 2); // 4 (100 в двоичной системе)`,
    text13: `Чаще всего вам нужна десятичная система. Явно указывайте её, чтобы избежать неожиданных результатов.`,
    subtitle4: `Функция parseFloat`,
    text14: `Функция parseFloat работает аналогично parseInt, только выделяет не целое число, а число с плавающей точкой`,
    code14: `parseFloat('8.5'); // 8.5
parseFloat('9.75'); // 9.75`,
    subtitle5: `Проверка на принадлежность к целым числам. Метод Number.isInteger`,
    text15: `Метод Number.isInteger принимает число как аргумент и проверяет, целое оно или дробное:`,
    code15: `const eightAndAHalf = 8.5;
Number.isInteger(eightAndAHalf); // false
Number.isInteger(Math.floor(eightAndAHalf)); // true`,
  },
];
