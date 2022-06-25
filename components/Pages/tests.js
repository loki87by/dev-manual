export const TESTS = [
  {
    title: `Как установить фреймворк`,
    text1: `Чтобы получить доступ к тестовым функциям, подключим фреймворк к проекту. Для этого установите в dev-зависимости пакет jest:`,
    code1: `npm install --save-dev jest`,
    text2: `Пропишем имя пакета в разделе "scripts" файла package.json:`,
    code2: `// package.json
...
"scripts": {
  "test": "jest"
},
...`,
    text3: `Готово! Теперь можно запускать тесты командой npm run test! Но сначала нужно описать тесты.`,
    subtitle1: `Где писать тесты`,
    text4: `Создадим два файла: один для кода проекта, другой — для тестов. Чтобы Jest автоматически запускал тесты, файл с ними следует назвать также, как файл с основным кодом, но приписав к имени .test. Так что наши файлы будут называться function.js и function.test.js.
В файле с основным кодом опишем функцию, которая создаёт приветствие — её мы и будем тестировать:`,
    code3: `// function.js
const sayHello = (firstName, secondName) => {
  return \`Здравствуйте, \${firstName} \${secondName}!\`;
};
module.exports = sayHello;`,
    subtitle2: `Как писать тесты`,
    text5: `Создадим тест для этой функции. В Jest за это отвечает функция it. На вход она принимает два параметра: описание теста и колбэк с кодом.
Всё, что происходит внутри колбэка — и есть тест.`,
    code4: `it ('Что делает тестируемая функция', () => {
  // чего мы ожидаем и в каком случае
});`,
    text6: `Затем опишем сам тест: если функции sayHello передать аргументы "Стас" и "Басов", она должна вернуть "Здравствуйте, Стас Басов!".
Здесь нам поможет функция expect: она принимает на вход значение и возвращает объект с множеством методов для тестирования.
Среди них метод toBe — он сравнивает свой аргумент с тем, что был передан функции expect:`,
    code5: `expect(1).toBe(1); // true
expect(1).toBe(2); // false
expect(1 + 2).toBe(3); // true`,
    text7: `Так мы можем передать функции expect результат работы функции sayHello и сравнить его ожидаемым результатом:`,
    code6: `it ('Создаёт приветствие', () => {
  expect(sayHello("Стас", "Басов")).toBe("Здравствуйте, Стас Басов!");
});`,
    subtitle3: `Как посмотреть результаты тестирования`,
    text8: `Готово! Запустим тесты командой npm run test:`,
    code7: `# Результат из консоли
PASS  ./function.test.js
✓ Создаёт приветствие (3ms)
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.747s
Ran all test suites.`,
    text9: `Слово PASS говорит, что тесты прошли успешно. Стало быть, Jest запущен и работает.
Разберёмся, как читать непройденные тесты. Изменим функцию приветствия:`,
    code8: `const sayHello = (firstName, secondName) => {
  return \`Здравствуйте, дорогой \${firstName} \${secondName}!\`;
};
module.exports = sayHello;`,
    text10: `И допишем для неё тест:`,
    code9: `it ('Создаёт приветствие', () => {
  expect(sayHello("Стася", "Басова")).toBe("Здравствуйте, дорогая Стася Басова!");
});`,
    text11: `Запускаем npm run test и смотрим в консоль:`,
    code10: {
      lang: "yaml",
      value:`> jest
FAIL  ./function.test.js # Сообщает, в каком файле провалился тест
✕ Создаёт приветствие (12ms)
● Создаёт приветствие
expect(received).toBe(expected) // Object.is equality
Expected: "Здравствуйте, дорогая Стася Басова!" # Ожидание
Received: "Здравствуйте, дорогой Стася Басова!" # Реальность
  3 |
  4 | it('Создаёт приветствие', () => {
> 5 |   expect(sayHello("Стася", "Басова")).toBe("Здравствуйте, дорогая Стася Басова!"); # Здесь указывается конкретное место ошибки
    |                                       ^
  6 | });
  7 |
at Object.toBe (function.test.js:5:39)
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total # Сообщает о проваленных тестах из общего числа
Snapshots:   0 total
Time:        1.963s
Ran all test suites.`},
    text12: `По сообщению о результатах тестирования легко определить, какие возникли ошибки и где. А значит, и проще отловить и исправить их.`,
    subtitle4: `Какие есть методы тестирования`,
    text13: `Любой метод тестирования проверяет, совпадают ли наши ожидания с результатами работы юнита.
Бóльшую часть тестов можно выполнить одним из методов:
toBe сопоставляет примитивные значения или ссылки на объекты:`,
    code11: {
      lang: "javascript",
      value:`// Тесты пройдут
expect('Ожидание').toBe('Ожидание');
const a = {};
const b = a;
expect(a).toBe(b);
// Тесты не пройдут
expect('Ожидание').toBe('Реальность');
const a = {};
const b = {};
expect(a).toBe(b);`},
    text14: `toEqual сопоставляет объекты или массивы. При сравнении объектов метод проверяет, что в полученном объекте есть все те же ключи с теми же значениями, что в ожидаемом. В проверяемом объекте при этом могут быть и другие свойства — их метод toEqual просто игнорирует. При сравнении массивов метод проверяет, что в полученном результате все элементы точно совпадают.
При этом просто пропущенные элементы и undefined считаются равными:`,
    code12: {
      lang: "javascript",
      value:`// Тесты пройдут
expect({ a: undefined, b: 10, c: 'text' }).toEqual({ b: 10, c: 'text' });
expect([1, 2, 3]).toEqual([1, 2, 3]);
expect([[undefined, 1]]).toEqual([[,1]]) // в правом массиве первый элемент пропущен
// Тесты не пройдут
expect({ a: undefined, b: 10, c: 'text' }).toEqual({ a: 12, b: 10, c: 'text' });
expect([1, 2, 3, undefined]).toEqual([1, 2, 3]); // массивы не совпадают по длине, в конце правого отсутствует ","`},
    text15: `toStrictEqual тоже сопоставляет объекты или массивы, но более строго: ожидаемый объект или массив должен полностью соответствовать действительному. То есть обладать теми же свойствами или элементами. Тут undefined и пропущенный элемент не равны:`,
    code13: {
      lang: "javascript",
      value:`// Тесты пройдут
expect({ b: 10, c: 'text' }).toStrictEqual({ b: 10, c: 'text' });
expect([3,4,undefined]).toStrictEqual([3,4,undefined]);
// Тесты не пройдут
expect({ a: undefined, b: 10, c: 'text' }).toStrictEqual({ b: 10, c: 'text' });
expect([[undefined, 1]]).toStrictEqual([[,1]])`},
    text16: `toBeTruthy и toBeFalsy сравнивают результат с true и false соответственно:`,
    code14: {
      lang: "javascript",
      value:`// Тесты пройдут
expect(1).toBeTruthy();
expect(true).toBeTruthy();
expect(undefined).toBeFalsy();
expect(1/'string').toBeFalsy();
// Тесты не пройдут
expect(null).toBeTruthy();
expect(0).toBeTruthy();
expect(true).toBeFalsy();`},
    text17: `toBeUndefined и toBeDefined сравнивают результат со значением undefined.
Метод toBeUndefined проходит, если результат не определён, то есть равен undefined.
А метод toBeDefined наоборот — если результат не равен undefined.
Этот тест пройдёт даже со значением null — оно считается определённым.`,
    code15: {
      lang: "javascript",
      value:`// Тесты пройдут
expect(1).toBeDefined();
expect(null).toBeDefined();
expect('string').toBeDefined();
// Тесты не пройдут
let x;
expect(x).toBeDefined();
expect(undefined).toBeDefined();`},
    text18: `toBeNull сравнивает результат с null:`,
    code16: {
      lang: "javascript",
      value:`// Тесты пройдут
const x = null;
expect(null).toBeNull();
expect(x).toBeNull();
// Тесты не пройдут
expect(0).toBeNull();
expect(undefined).toBeNull();
expect('string').toBeNull();`},
    text19: `toMatch проверяет строку на соответствие регулярному выражению:`,
    code17: `// Тесты пройдут
expect('1').toMatch(/^\\d+$/);
expect('1337').toMatch(/^\\d+$/);
expect('1337').toMatch(/^\\d+$/);
// Тесты не пройдут
expect('21as1').toMatch(/^\\d+$/);
expect('string').toMatch(/^\\d+$/);`,
    text20: `toContain проверяет, есть ли в полученном массиве нужное нам значение. Со строками тоже работает:`,
    code18: {
      lang: "javascript",
      value:`// Тесты пройдут
expect('Oh, hi Mark!').toContain('Mark');
expect(['Маша', 'Ира', 'Стас']).toContain('Стас');
// Тесты не пройдут
expect(['Маша', 'Ира', 'Стас']).toContain('Миша');
expect('Oh, hi Mark!').toContain('Lisa');`},
    text21: `toBeGreaterThan, toBeGreaterThanOrEqual, toBeLessThan и toBeLessThanOrEqual — операторы математического сравнения.
Сравнивают результат с переданным числом:`,
    code19: `// Тесты пройдут,
// потому что
expect(2).toBeGreaterThan(1);        // 2 больше 1
expect(2).toBeLessThan(3);           // 2 меньше 3
expect(2).toBeGreaterThanOrEqual(2); // 2 больше или равно 2
expect(2).toBeLessThanOrEqual(2); // 2 меньше или равно 2
// Тесты не пройдут
// потому что:
expect(2).toBeGreaterThan(2);        // 2 не больше 2
expect(2).toBeLessThan(2);           // 2 не меньше 2
expect(2).toBeGreaterThanOrEqual(1); // 2 не больше и не равно 1
expect(2).toBeLessThanOrEqual(3);    // 2 не меньше и не равно 3`,
    text22: `Этих методов хватает для большинства задач.`,
    link: {
      uri: "https://jestjs.io/docs/en/getting-started",
      text: "Полный список описан в документации",
    },
    text23: `Писать тесты к коду очень полезно: так проект проще масштабировать, ведь при обновлении легко отлавливать ошибки и исправлять их.
Кроме того, тесты собой документируют код: по описаниям тестов понятно, что делает приложение, так что в его работе проще разобраться.`,
  },
  {
    title: `Юниты и методы тестирования`,
    text1: `Тестами мы создаём дополнительный уровень защиты: проверяем, что результаты работы функций совпадают с ожидаемыми.
Также мы написали тест для функции, которая создаёт приветствие:`,
    code1: `it ('Создаёт приветствие', () => {
  expect(sayHello("Стас", "Басов")).toBe("Здравствуйте, Стас Басов!");
});`,
    text2: `Здесь всё просто, поскольку проекте только одна функция. Но когда функций много, нужно определить, к каким из них писать тесты.`,
    subtitle1: `Какие функции тестировать`,
    text3: `Желательно — все. Программу следует разбить на юниты — мельчайшие функции для выполнения конкретной задачи.
В сервисе есть функция, которая проверяет, что пароль содержит цифру и спецсимвол. Каждая проверка делается отдельной функцией:`,
    code2: {
      lang: "javascript",
      value:`// проверяем наличие цифры
function checkNumber(pass) {

  if (typeof pass === 'string') {
    let regex = \\d/;
    return regex.test(pass); // метод test вернёт true, если шаблон регулярного выражения найден в строке
  }
}
// проверяем наличие спецсимвола
function checkSymbol(pass) {

  if (typeof pass === 'string') {
    let regex = /[!@#$%^&*(),.?":{}|<>_]/;
    return regex.test(pass);
  }
}
// запускаем обе проверки
function checkPass(pass) {
  return checkNumber(pass) && checkSymbol(pass);
}`},
    text4: `Каждая из этих функций — юнит. Поэтому для каждой функции следует написать тест:`,
    code3: {
      lang: "javascript",
      value:`it('Проверяет наличие цифры', () => {
  expect(checkNumber('some_not_so_strong_pass').toBe(false));
  expect(checkNumber('stronger_pass_123').toBe(true));
});
it('Проверяет наличие спецсимвола', () => {
  expect(checkSymbol('somePass').toBe(false));
  expect(checkSymbol('another_pass').toBe(true));
});
it('Проверяет пароль', () => {
  expect(checkPass('somePas$').toBe(false));
  expect(checkPass('another_pass_123').toBe(true));
});`},
    text5: `Некоторые разработчики совершают грубую ошибку: пишут тесты только для самых «верхнеуровневых» функций.
В нашем случае такой нерадивый разработчик протестировал бы только функцию checkPass.
Не делайте так: если программа сломается, придётся потратить уйму времени, чтобы отыскать ошибку.
А если тесты написаны для каждой функции, ошибку найти легко, просто прочитав сообщение с результатом теста.`,
  },
  {
    title: `Тестовые наборы`,
    text1: `В прошлом уроке мы рассказывали о юнит-тестах. Но уметь писать тесты недостаточно, также нужно уметь их организовать.
К примеру, нужно протестировать обработчик запроса на регистрацию. Такой обработчик проверяет данные на валидность, обсчитывает хеш пароля, записывает данные в базу. Каждое из этих действий выполняет отдельная функция, а обработчик запроса их по очереди вызывает. И все функции необходимо протестировать.
Тесты юнитов, работающих ради одной большой цели — например, регистрации — следует объединять в тестовые наборы.
Так нам будет проще изменять, дописывать и читать тесты. В этом уроке — о том, как создавать тестовые наборы.`,
    subtitle1: `Как создать набор`,
    text2: `Функция describe создаёт набор. Её первый аргумент — описание набора, второй — колбэк с тестами:`,
    code1: `describe('Проверка обработчика запроса', () => {
  it('должен проверять данные на валидность', () => {/* здесь код теста */});
  it('должен считать хеш пароля', () => {/* здесь код теста */});
  it('должен записывать данные в базу', () => {/* здесь код теста */});
});`,
    text3: `Функция Describe дополняет информацию в сообщении о результате тестирования:`,
    code2: {
      lang: "yaml",
      value:`PASS  ./api.test.js
User registration endpoint # вот эта строчка добавилась
✓ should respond on error with correct error message (3ms)
✓ should assess password for validity (5ms)
✓ should save data to database (7ms)
Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.747s
Ran all test suites.`},
    text4: `Также у Describe есть третий параметр: максимальное время исполнения тестового набора.
Это ограничение защищает от зависаний тестов из-за бесконечных циклов и рекурсий.
По умолчанию это время составляет 5 секунд. Но его можно:
      увеличить, если тест может зависеть от «внешних» процессов:
      например, ответа сервера при обработке крупных файлов или обращении к платёжным системам;
      уменьшить: такое бывает нужно, когда мы меняем код не для новой функциональности, а для оптимизации существующей.
Таким образом метод Describe помогает аккуратно оформить тесты и ограничить время их выполнения.
Всё это экономит уйму времени при написании тестов.`,
  },
  {
    title: `Тестирование запросов`,
    text1: `В курсе об асинхронном коде мы пользовались kanye.rest — внешним API.
Может наступить момент, когда разработчики kanye.rest поменяют правила обращения к своему API, и наш проект перестанет работать.
Чтобы такого не произошло, нужно написать тесты для обработчиков запросов.
В этом уроке расскажем о библиотеке supertest, инструментами которой такие тесты удобно создавать.`,
    subtitle1: `Подготовим проект для тестирования`,
    text2: `Для тестирования сервера, структуру проекта нужно немного доработать. Это связано с принципом работы тестов.
Supertest работает так:
начинает тестирование → подключается к серверу → выполняет тесты → отключается от сервера → завершает тесты.
Таким образом заботу по подключению и отключению от сервера берёт на себя supertest.
Когда мы запускаем сервер из index.js, supertest не может отключить сервер, а следовательно — не может завершить тесты.
Поэтому он их даже не запустит, а покажет ошибку:`,
    code1: {
      lang: "bash",
      value:`// Вывод в консоли
Jest did not exit one second after the test run has completed.
This usually means that there are asynchronous operations that were not stopped in your tests.
Consider running Jest with \`--detectOpenHandles\` to troubleshoot this issue.`},
    text3: `Чтобы разделить подключение к серверу для тестирования и подключение к серверу для работы сервиса, файл index.js разбивают на два:
server.js, где описывают подключение к серверу:`,
    code2: `// server.js
const app = require('./app.js');
const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(\`App listening on port \${PORT}\`);
});`,
    text4: `app.js, где описывают всё остальное:`,
    code3: `// app.js
const express = require('express');
const { PORT = 3000 } = process.env;
const app = express();
app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
});
module.exports = app;`,
    text5: `Затем импортируют app.js в тестовые файлы и тестируют. И ничего не конфликтует.`,
    subtitle2: `Устанавливаем supertest`,
    text6: `Вводим команду npm install --save-dev supertest.`,
    code4: `// package.json
"scripts": {
  "start": "node server.js" // было "node app.js"
}`,
    text7: `Создаём файл endpoint.test.js для тестов. К этому файлу нужно подключить библиотеку:`,
    code5: `// endpoint.test.js
const supertest = require('supertest');
const app = require('./app.js');`,
    text8: `В переменную supertest записана функция, которой нужно передать на вход наше приложение:`,
    code6: {
      lang: "javascript",
      value: `const request = supertest(app)`},
    text9: `Готово! Теперь мы можем обращаться к методам библиотеки через объект request.
Все методы этого объекта возвращают промисы, которые нужно обработать асинхронно.`,
    subtitle3: `Проверяем отправку запроса`,
    text10: `Для каждого типа запроса есть одноимённый метод: get, post, delete, put и patch.
Каждый из этих методов принимает на вход URL, запрос на который мы хотим проверить:`,
    code7: `describe('Эндпоинты откликаются на запросы', () => {
  it('Возвращает данные и 200-й ответ по запросу к "/"', () => {
    return request.get('/').then((response) => {
      expect(response.status).toBe(200);
      expect(response.text).toBe('Hello World!');
    });
  });
});`,
    text11: `При тестировании промисов возвращайте их: то есть пишите return перед request.get.
Так Jest автоматически дождётся, пока промис разрешится, или сообщит об ошибке при отклонении.`,
    subtitle4: `Настраиваем запросы`,
    text12: `Кроме URL у запросов есть атрибуты, которые могут содержать файлы. Разберём методы для атрибутов.
set устанавливает атрибуты. На вход он принимает два параметра: имя атрибута и его значение:`,
    code8: {
      lang: "javascript",
      value:`.set('Cookie', ['token=u1a90aw7812689adukqyw61;'])`},
    text13: `send задаёт тело запроса. Имя метода сбивает с толку, но помните: методы get, post, delete, put и patch отправляют запросы.
А send позволяет добавить данные в тело запроса:`,
    code9: {
      lang: "javascript",
      value:`.send({ name: 'Пётр' })`},
    text14: `query позволяет настроить GET-запрос: ведь у него нет тела — есть только URL.
Чтобы добавить в этот URL данные, методу query передают данные внутри объекта:`,
    code10: {
      lang: "javascript",
      value:`.query({ per_page: '50', offset: '20' })`},
    text15: `attach прикрепляет к запросу файл. Первый параметр — имя файла, второй — относительный путь к нему:`,
    code11: {
      lang: "javascript",
      value:`.attach('avatar', 'test/fixtures/avatar.jpg')`},
    text16: `Обратите внимание на имя папки fixtures.
Так принято называть директорию с данными, которые нужны для тестирования: картинками, аудио и видео.`,
    link: {
      uri: "https://jestjs.io/docs/en/getting-started",
      text: "И как всегда: ещё больше методов в документации",
    },
  },
  {
    title: `Тестирование базы данных`,
    text1: `В этом уроке расскажем, как тестировать взаимодействие с базой данных.
Есть ограничение: нельзя использовать в тестах реальные данные. «Сломанная» функция может повредить данные пользователей.
Поэтому при тестировании добавляют случайные бессмысленные данные в базу, а потом их удаляют.
Получается алгоритм: добавляем в базу тестовые данные → тестируем → удаляем тестовые данные.
Такой же алгоритм применим к каждому тесту по отдельности. Поэтому в Jest есть четыре метода:
beforeAll и afterAll запускаются до и после выполнения всех тестов в файле;
beforeEach и afterEach — запускаются до и после каждого теста.
Перед началом всех тестов мы обычно подключаемся к базе данных, а в самом конце — отключаемся.
Для этого подходят методы beforeAll и afterAll.
В начале каждого теста мы добавляем тестовые данные в базу, а в конце — удаляем их. Тут помогают beforeEach и afterEach.
Напишем эти методы кодом:`,
    code1: `beforeAll(() => {
  // Подключаемся к базе данных
});
afterAll(() => {
  // Отменяем подключение к БД
});
describe('Database tests', () => {
  beforeEach(() => {
    // Перед каждым тестом добавляем нужные данные в БД
  });
  afterEach(() => {
    // После каждого теста убираем данные из БД
  });
  it('should do the test work...', () => {/* код для проверки тестов */});
});`,
    text2: `Также методы beforeAll и afterAll можно вызывать внутри describe.
Тогда колбэк beforeAll и afterEach будет вызван в начале и в конце тестового набора:`,
    code2: `beforeAll(() => {
  // Подключаемся к базе данных
});
afterAll(() => {
  // Отменяем подключение к БД
});
describe('Database tests', () => {
  beforeAll(() => { // сработает перед всеми тестами внутри этого describe
    // Перед каждым тестом добавляем нужные данные в БД
  });
  afterAll(() => { // сработает после всех тестов в этом describe
    // После каждого теста убираем данные из БД
  });
  it('should do the db test work...', () => {/* код для проверки тестов для бд */});
  it('should do the other test work...', () => {/* код для проверки других тестов */});
});
describe('Endpoints tests', () => {
  /*
  Здесь beforeAll и afterAll из соседнего блока describe
  срабатывать не будут, но сработают глобальные beforeAll и afterAll
  */
  it('should test endpoint', () => {/* код для проверки тестов */});
})`,
    text3: `Методы beforeAll, afterAll, beforeEach и afterEach позволяют «без шума» протестировать базу данных:
мы добавляем информацию для тестирования, а потом стираем её.
Главное — осознанно расположить методы. И это приходит с практикой.`,
  },
];