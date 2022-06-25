export const DESTRUCT = [
  {
    title: `Деструктуризация`,
    text1: `Прежде чем переходить к изучению материалов спринта, нужно познакомиться с новым синтаксисом.
Он появился в ES6 и называется деструктуризацией.
Деструктуризация — это способ записи значений в переменные. Используя её, можно заметно сократить код.
Если вы будете изучать js-фреймворки (React, Vue.js, Angular), в их спецификациях часто используется деструктуризация.`,
    subtitle1: `Деструктуризация объектов`,
    text1: `Прежде свойства объекта записывали в переменную так:`,
    code1: `const user = {
  name: 'Василий',
  age: 28,
  lookingForJob: true
};
const name = user.name; // теперь имя и возраст хранятся в переменных,
const age = user.age; // с ними удобно работать
console.log(name); // "Василий"
console.log(age); // 28`,
    text2: `Деструктуризация позволяет записать значения свойств объекта в одноимённые переменные. Для этого после декларации const или let
записывают имена переменных в фигурных скобках, знак равенства и имя объекта, из которого нужно достать значения:`,
    code2: `const greekGods = { love: 'Афродита', war: 'Арес', trade: 'Гермес' };
/* перечисляем свойства, которые нужно достать, в фигурных скобках */
const { love, war, trade } = greekGods; // имена переменных совпадают с ключами объекта
console.log(love, war, trade); // Афродита Арес Гермес`,
    text3: `Если имена переменных и ключи объекта должны отличаться, можно дописывать имя переменной после имени свойства через двоеточие:`,
    code3: `const greekGods = { love: 'Афродита', war: 'Арес', trade: 'Гермес' };
const {
  love: goddessOfLove,
  war: godOfWar,
  trade: godOfTrade
} = greekGods;
console.log(goddessOfLove, godOfWar, godOfTrade); // Афродита Арес Гермес`,
  },
  {
    title: `Деструктуризация массива`,
    text1: `С массивом тоже работает механизм деструктуризации. До ES6 получать элементы массива можно было только по индексам:`,
    code1: `const precipitation = ['дождь', 'морось', 'роса']; // англ. precipitation, «осадки»
const rain = precipitation[0];
const drizzle = precipitation[1];
const dew = precipitation[2];
console.log(rain, drizzle, dew); // дождь морось роса`,
    text2: `С деструктуризацией код становится короче и изящнее. После декларации const или let можно перечислить имена переменных в квадратных скобках, указать оператор присваивания и имя массива, из которого нужно достать значения:`,
    code2: `const precipitation = ['дождь', 'морось', 'роса'];
const [rain, drizzle, dew] = precipitation;
console.log(rain, drizzle, dew); // дождь морось роса`,
    text3: `Строки 'дождь', 'морось' и 'роса' запишутся в переменные с именами rain, drizzle и dew согласно их порядку.`,
  },
  {
    title: `Параметры функции`,
    text1: `Деструктурировать массив или объект можно при передаче их функции. Без использования деструктуризации код выглядел бы так:`,
    code1: {
      lang: "javascript",
      value: `const userData = {
  name: 'Виктор',
  patronymic: 'Семёнович',
  age: 55
};
const printUserParams = (params) => {
  console.log(params.name); // Виктор
  console.log(params.patronymic); // Семёнович
  console.log(params.age); // 55
};
printUserParams(userData);`,
    },
    text2: `Теперь можно указать параметры функции в фигурных скобках, а при вызове — передать нужный объект. Код будет выглядеть так:`,
    code2: `const userData = {
  name: 'Виктор',
  patronymic: 'Семёнович',
  age: 55
};
const printUserParams = ({ name, patronymic, age }) => {
  console.log(name); // Виктор
  console.log(patronymic); // Семёнович
  console.log(age); // 55
};
printUserParams(userData);`,
    text3: `Если у функции несколько параметров, можно деструктурировать только один из них:`,
    code3: `const userData = {
  name: 'Виктор',
  patronymic: 'Семёнович',
  age: 55
};
const printUserParams = ({ name, patronymic, age }, secondParameter) => {
  console.log(name); // Виктор
  console.log(patronymic); // Семёнович
  console.log(age); // 55
  console.log(secondParameter); // второй параметр
};
printUserParams(userData, 'второй параметр');`,
  },
  {
    title: `Параметры метода или конструктора класса`,
    text: `Методы и конструктор класса — это функции. Поэтому их параметры тоже можно деструктурировать:`,
    code: `// код без использования деструктуризации параметров
class Card {
  constructor(data) {
    this._text = data.text;
    this._image = data.image;
    this._description = data.description;
  }
}
// код c использованием деструктуризации параметров
class Card {
  constructor({ text, image, description }) { // достаём ключи объекта сразу
    this._text = text; // теперь значения ключей объекта data
    this._image = image; // лежат в одноимённых переменных
    this._description = description;
  }
}`,
  },
  {
    title: `Значения по умолчанию`,
    text1: `деструктуризация позволяет задавать значения по умолчанию.
Этим часто пользуются, когда функция принимает объект в качестве параметра, но при вызове функции какие-то из свойств объекта могут отсутствовать.
Тогда им можно присвоить значения по умолчанию через знак равенства после имени переменной:`,
    code1: `// consoleUserInfo выводит данные пользователя в консоль
function consoleUserInfo(user) { // если какого-то из свойств не будет в переданном объекте,
  const { name = 'Дэвид', dateOfBirth = '8 января' } = user; // в переменные запишутся значения после знаков равенства
  console.log(\`\${name}, \${dateOfBirth}\`);
}
// name и dateOfBirth будут взяты из переданного объекта
consoleUserInfo({ name: 'Леонард', dateOfBirth: '21 сентября' }); // "Леонард, 21 сентября"
// name будет взято из переданного объекта, а dateOfBirth примет значение по умолчанию
consoleUserInfo({ name: 'Стивен' }); // "Стивен, 8 января"
// всё как в прошлом вызове, но наборот
consoleUserInfo({ dateOfBirth: '2 мая' }); // "Дэвид, 2 мая"
// и name и dateOfBirth примут значение по умолчанию
consoleUserInfo({}); // "Дэвид, 8 января"`,
    text2: `Код функции consoleUserInfo можно сократить, деструктурировав параметр прямо в круглых скобках функции:`,
    code2: `// можно присвоить значения по умолчанию, деструктурировав параметр функции
function consoleUserInfo({ name = 'Дэвид', dateOfBirth = '8 января' }) {
  console.log(\`\${name}, \${dateOfBirth}\`);
}`,
    text3: `Значения по умолчанию можно присвоить и при деструктуризации массива:`,
    code3: `function getFirstThreeUsers(users) {
  const [first = 'Дэвид', second = 'Леонард', third = 'Стивен'] = users;
  console.log(first, second, third);
}
// если не передать третьего пользователя, им станет Стивен
// тк переменная third в коде функции примет значение по умолчанию
getFirstThreeUsers(['Элвис', 'Ларс']);`,
  },
  {
    title: `Шпаргалка`,
    text1: `Код можно сделать короче и изящнее, используя деструктуризацию. Синтаксис запомнить несложно:
При деструктуризации объекта перечисляем имена переменных в фигурных скобках и после знака равенства пишем объект, из которого нужно
взять соответствующие свойства. Если имена должны различаться, то названия переменных пишут через двоеточие после ключей:`,
    code1: {
      lang: "javascript",
      value: `const { a: type, b: name } = { a: 'кресло', b: 'Василий' };
console.log(type, name); // кресло Василий`,
    },
    text2: `При деструктуризации массива переменные нужно перечислять уже в квадратных скобках.
Дальше после знака равенства также указываем массив, из которого нужно взять значения переменных:`,
    code2: {
      lang: "javascript",
      value: `const [type, name] = ['кресло', 'Василий'];
console.log(type, name); // кресло Василий`,
    },
    text3: `Деструктуризацию можно использовать при передаче объекта функции.
Для этого при объявлении функции параметры пишут в фигурных скобках, а при вызове — передают нужный объект:`,
    code3: {
      lang: "javascript",
      value: `const chair = { type: 'кресло', name: 'Василий' };
const whereToSit = ({ type, name }) => {
  return \`Садитесь в \${type} «\${name}»\`;
};
console.log(whereToSit(chair)); // Садитесь в кресло «Василий»`,
    },
    text4: `И наконец, деструктуризация позволяет задавать значения по умолчанию:`,
    code4: {
      lang: "javascript",
      value: `const { name = 'Василий' } = {};
const [type = 'кресло'] = [];
console.log(type, name); // кресло Василий`,
    },
  },
];
