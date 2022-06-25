export const OOP = [
  {
    title: `Программа — тоже объект. Поэтому песню в плейлисте, который вы делали в теме о DOM, можно описать объектом:`,
    code1: `const song = {
  title: 'На заре',
  artist: 'Альянс',
  isLiked: false,
  like: function () {
    song.isLiked = !song.isLiked;
  }
};`,
    text1: `Объект хранит данные в свойствах title, artist и isLiked. Ещё у него есть метод like — это функциональность объекта.
Данные и функциональность заключены в единую сущность и представлены в удобной форме.
В интернете их часто называют «свойствами» и «поведением», которыми в объектах выступают переменные и функции:
Свойства объекта — это переменные, его атрибуты. Ещё их называют полями объекта. В коде выше — это song.title, song.artist и song.isLiked.
Поведение объекта — это его функции. Их называют методами объекта. В коде выше song.like — метод объекта song.
"В прошлом уроке мы говорили, что объекты позволяют хранить данные и функциональность программы вместе.
Вновь обратимся к примеру с плейлистом"
У объекта song строгая структура атрибутов. Если мы хотим создать ещё одну песню, то её новый объект будет с аналогичной структурой:`,
    code2: `const song = {
  title: 'Diary of Jane',
  artist: 'Breaking Benjamin',
  isLiked: false,
  like: function () {
    song.isLiked = !song.isLiked;
  }
}`,
    text2: `У объекта song есть свойства title, artist и isLiked — данные, которые он хранит. И метод like — функциональность, которая есть у песни.
Объект song — это способ объединить данные песни и её функциональность в одну сущность.
Но в плейлисте обычно несколько песен. Сделаем объект для каждой:`,
    code3: `const song1 = {
  title: 'Футбольный мяч',
  artist: 'Антоха MC',
  isLiked: false,
  like: function () {
    song1.isLiked = !song1.isLiked;
  }
};
const song2 = {
  title: 'На заре',
  artist: 'Альянс',
  isLiked: false,
  like: function () {
    song2.isLiked = !song2.isLiked;
  }
};
const song3 = {
  title: 'Ай',
  artist: 'Хаски',
  isLiked: true,
  like: function () {
    song3.isLiked = !song2.isLiked;
  }
};`,
    text3: `Мы создали три объекта вручную. Но если в плейлисте тысяча песен, придётся вручную объявить тысячу таких переменных.
Вы уже знаете, что функции позволяют избавиться от таких повторений. Напишем функцию createSong, чтобы создавать новые объекты песен:`,
    code4: `/* объявляем функцию createSong,
она будет возвращать новые объекты песен */
function createSong(title, artist) {
  // создаём новый объект песни*
  const newSong = {
    title,
    artist,
    isLiked: false,
    like: function () {
    newSong.isLiked = !newSong.isLiked;
  }
}
return newSong; // возвращаем этот объект
}
// теперь создавать объекты песен гораздо проще
const song1 = createSong('Футбольный мяч', 'Антоха MC');
const song2 = createSong('На заре', 'Альянс');
const song3 = createSong('Ай', 'Хаски');
// тестируем, как данные и функциональность работают вместе
console.log(song1.isLiked); // false
song1.like();
console.log(song1.isLiked); // true`,
    text4: `При каждом вызове createSong возвращается новый объект песни. Все треки независимы друг от друга: это разные объекты.
Так удобнее создавать песни, но у подхода есть проблема: каждый объект содержит свою собственную функцию like.
И если мы добавим функциональность редактирования или удаления песни, она будет жить в отдельных объектах.
И если мы добавим функциональность редактирования или удаления песни, она будет жить в отдельных объектах.
Ещё один важный недостаток — расход памяти. Если у каждого объекта своя функция, их все придётся хранить в оперативной памяти.
И каждый созданный объект потребует отдельные ячейки памяти для своей функции.
Поскольку эти функции выполняют похожие операции и мало чем отличаются друг от друга, создавать их множество нецелесообразно.
Но можно поступить иначе. В следующем уроке мы расскажем, как хранить общую функциональность в одном месте
, а в объектах песен — только то, что принадлежит конкретному треку.`,
  },
  {
    title: `Краткое погружение в this`,
    text1: `В прошлом уроке для каждого объекта создавалась и хранилась в памяти функция like. И каждая из них — самостоятельная:`,
    code1: {
      lang: "javascript",
      value: `song1.like === song2.like // false.`,
    },
    text2: `Это ресурсозатратно. Каждая функция like выполняет похожее действие: заменяет состояние поля isLiked своего объекта на противоположное.
Поэтому логичнее создать одну функцию like и позволить ей изменять свойства любого объекта, который вызывает её как метод.
Для начала объявим like вне контекста функции createSong и передадим её новым объектам по ссылке:`,
    code2: `function like() {
}
function createSong(title, artist) {
  const newSong = {
    title,
    artist,
    isLiked: false,
    like: like
  }
  return newSong;
}`,
    text3: `Теперь у объектов в атрибуте like будет ссылка на единственную функцию, к которой у них есть доступ: song1.like === song2.like //true.
Мы не случайно убрали код из тела like. До этого каждая новая функция like ссылалась на свой объект newSong.
Поэтому возникает вопрос: как сделать её универсальной и позволить like работать со всеми объектами, которые создаёт функция createSong?
Чтобы решить эту проблему, нужно познакомиться с this.
Свойство this — ключевое слово, которое доступно внутри любой функции. Но в зависимости от способа вызова принимает разные значения.
А начнём с нашего примера:`,
    code3: `function like() {
  this.isLiked = !this.isLiked;
}
function createSong(title, artist) {
  const newSong = {
    title,
    artist,
    isLiked: false,
    like: like
  }
  return newSong;
}
const song1 = createSong('Футбольный мяч', 'Антоха MC');
song1.like(); // внутри функции like this — это song1
console.log(song1.isLiked); // true — сработало`,
    text4: `Здесь this — объект, на котором вызвана функция.
Если функцию вызывают как метод объекта, свойство this хранит ссылку на объект, на котором она вызвана:`,
    code4: `const obj = {
  prop: 'Свойство',
  method: function () {
    console.log(this); // выведем значение this
  }
}
// { prop: "Свойство", method: ƒ } — это и есть объект obj, на котором была вызвана функция method.
obj.method();`,
    text5: `В нашем примере функция like вернёт значение свойства isLiked объекта song1, на котором она вызвана как метод:`,
    code5: {
      lang: "javascript",
      value: `/* здесь внутри функции like
значением this будет объект song1,
так как метод вызван именно на нём */
song1.like();`,
    },
    text6: `Значение this зависит только от того, на каком объекте вызвана функция, а не в каком объекте она хранится.
Подумайте, каким будет значение this внутри функции like здесь:`,
    code6: {
      lang: "javascript",
      value: `song2.like();
song3.like();`,
    },
    text7: `Ещё раз: если функция вызвана как метод объекта, то в момент вызова значение this внутри неё — это объект, на котором она вызвана.
Поэтому ответ таков:`,
    code7: {
      lang: "javascript",
      value: `song2.like(); // здесь this будет song2
song3.like(); // а здесь this будет song3`,
    },
  },
  {
    title: `Классы`,
    text1: `В прошлом уроке мы разобрали, как создавать объекты с уникальными данными так,
чтобы их общая функциональность хранилась в одном месте и была доступна всем этим объектам.
Этот способ экономит память во время работы приложения.
Но похожего результата можно добиться классами. Об этом и расскажем.`,
    subtitle1: `Ключевое слово class`,
    text2: `Класс — это описание того, какие данные и функциональность будут у объекта.
Это своего рода чертёж, на основании которого создают объекты — экземпляры данного класса.
Класс устанавливает в свои экземпляры свойства (данные) и методы (функциональность).
До этого мы создавали объект song вызовом функции createSong.
Теперь сделаем это через синтаксис классов, который появился в JS с выходом стандарта ES6.
Чтобы объявить класс, используем ключевое слово class. После него напишем имя класса — переменную, к которой обратимся, если захотим
его использовать. В языках программирования классы принято называть с заглавной буквы. Если поступить иначе,
всё будет работать, но лучше придерживаться общепринятых правил. Это поможет позже выявить переменные, которые содержат класс:`,
    code1: `class Song {
  constructor(title, artist) {
    this.title = title;
    this.artist = artist;
  }
  like() {
    this.isLiked = !this.isLiked;
  }
}
const song = new Song('Start Over', 'Any Given Day');`,
    text3: `На первый взгляд, между функцией createSong и классом Song нет принципиальных отличий. Они вскроются позже,
когда мы разберём наследование — одну из основных парадигм ООП.`,
    subtitle2: `Метод constructor`,
    text4: `Любой класс содержит метод constructor, который вызывается при создании нового объекта этого класса. Метод нужен, чтобы заполнить
будущий объект данными. Запись new Song('Start Over', 'Any Given Day') возвращает новый объект. Ключевое слово new важно в вызове класса.
Оно означает, что результат этого вызова возвращает новый объект — экземпляр класса, который вызывают. Попытка сделать это без new
приведёт к ошибке:  «Конструктор класса нельзя вызвать без ключевого слова new».
Свойство this в методе constructor — ссылка на этот возвращаемый объект.
Переданные параметры title и artist записываются в свойства объекта this.title и this.artist, который мы заботливо сохраняем в переменную song.
Необязательно описывать метод constructor внутри класса. Тогда метод будет создан неявно и с пустым телом: constructor() {}.
После этого никакие данные не будут добавляться в создаваемые объекты.
Но в классе могут быть и другие методы. К ним также имеют доступ все объекты, которые созданы через new Song().`,
    code2: {
      lang: "javascript",
      value: `const song1 = new Song('Start Over', 'Any Given Day');
const song2 = new Song('Bitter End', 'The Veer Union');
song1.like === song2.like // true`,
    },
    text5: `Все объекты, которые созданы через класс Song, делят между собой метод like. И этот метод хранится в памяти в единственном экземпляре.
Поэтому использование классов решает проблему расходования памяти, о которой мы говорили в прошлых уроках.`,
    subtitle3: `Инкапсуляция`,
    text6: `Мы живём в мире гаджетов, но не обязаны в них разбираться. Не важно, какие процессы выполняются в компьютере при запуске —
достаточно нажать кнопку ″Power″, чтобы он заработал. Поэтому с точки зрения программирования кнопка включения — часть интерфейса ПК.
Это и есть инкапсуляция — когда внутренняя реализация устройства скрыта от внешнего мира.
Пользователю просто и удобно управлять таким гаджетом: вся его сложность спрятана «под капотом».`,
    subtitle4: `Пользовательский интерфейс`,
    text7: `Разработчики часто говорят о «пользовательском интерфейсе» — визуальном представлении программы:
меню, кнопках, переключателях, полях ввода и др. Он нужен, чтобы любой желающий мог с ней взаимодействовать.
В итоге получается прослойка между программным кодом и пользователем.
У каждого сложного устройства должен быть пользовательский интерфейс, чтобы сделать его удобнее в использовании.
Завести автомобиль ключом зажигания гораздо проще, чем открыть капот и пытаться разобраться, как запустить двигатель.`,
    subtitle5: `Принцип интерфейсов в ООП`,
    text8: `К объектам в ООП-коде применим тот же принцип. Внешние объекты интерфейса — его публичные методы, которые можно смело вызывать
во внешнем коде. У объектов есть и приватные методы и свойства. Их отличие от публичных в том, что их не используют во внешнем коде —
они только для внутренней реализации объекта. Мы подробно это разберём в примерах ниже.
Только недавно приватные методы и свойства были реализованы в JS на уровне языка.
Раньше их только номинально считали приватными или как-нибудь эмулировали эту функциональность.
Мы расскажем об эмуляции: она более распространена.`,
    subtitle6: `Приватные методы и свойства`,
    text9: `Между разработчиками существует негласное соглашение — именовать приватные свойства и методы знаком нижнего подчёркивания _.
Так все поймут, что свойство внутреннее и использовать его напрямую во внешнем коде нежелательно:`,
    code3: {
      lang: "javascript",
      value: `class Car {
  constructor(maxGasTankValue, fuelConsumption) {
    this._gasTankValue = 0;
    this._maxGasTankValue = maxGasTankValue;
    this._fuelConsumption = fuelConsumption; // литров в час
  }
  _getAvailableGasValue(gasValue) {

    if (gasValue < 0) return 0;
    if (gasValue > this._maxGasTankValue) return this._maxGasTankValue;
    return gasValue;
  }
  refuel(gasValue) {
    this._gasTankValue = this._getAvailableGasValue(gasValue);
  }
  getDistance() {
    return this._gasTankValue / this._fuelConsumption * 100;
  }
}
var car = new Car(70, 9);
car.refuel(45);
console.log(car._gasTankValue); // 45. Свойство на самом деле не приватное. Его можно легко изменить
console.log(car.getDistance());`,
    },
    text10: `В этом примере ничто не мешает установить отрицательное количество бензина выражением car._gasTankValue = -1.
Такое прямое вмешательство во внутреннюю реализацию приведёт к ошибке в работе объекта.
Но таких ошибок можно избежать. Когда работаете с объектом класса, не используйте приватные методы и не обращайтесь,
и ничего не записывайте в приватные свойства извне.`,
    subtitle7: `Действительно приватные свойства и методы`,
    text11: `Можно создавать и действительно приватные методы и свойства. Для этого используется символ решётки # в названии.
И если _ нужно лишь для условного обозначения свойства или метода как приватного, то # действительно делает его таковым:`,
    code4: {
      lang: "javascript",
      value: `class Car {
  constructor(maxGasTankValue, fuelConsumption) {
    this.#gasTankValue = 0;
    this.#maxGasTankValue = maxGasTankValue;
    this.#fuelConsumption = fuelConsumption; // литров в час
  }
  #getAvailableGasValue(gasValue) {

    if (gasValue < 0) return 0;
    if (gasValue > this.#maxGasTankValue) return this.#maxGasTankValue;
    return gasValue;
  }
  refuel(gasValue) {
    this.#gasTankValue = this.#getAvailableGasValue(gasValue);
  }
  getDistance() {
    return this.#gasTankValue / this.#fuelConsumption * 100;
  }
}
var car = new Car(70, 9);
// Эта строка приведёт к ошибке. Доступ к приватным свойствам извне отсутствует
car.#gasTankValue = -10`,
    },
    text12: `Новый синтаксис # не поддерживается многими браузерами. Для полноценной работы нужны специальные программные средства.
Они трансформируют код в новом синтаксисе в код по старому стандарту. Мы расскажем о # позже, а пока будем использовать _.
В примере выше у класса Car два публичных метода. Метод refuel устанавливает количество горючего,
getDistance получает дистанцию, которую проедет автомобиль на заранее установленном количестве бензина.
Создадим объект класса:`,
    code5: {
      lang: "javascript",
      value: `var car = new Car(54, 5.5)`,
    },
    text13: `Можно вызвать метод car.refuel(100) заправки или метод car.getDistance() возврата количества километров, на которые хватит топлива.
Метод refuel использует приватный метод _getAvailableGasValue. Он не позволит поместить в приватное же свойство _gasTankValue:
отрицательное количество литров бензина;
количество, которое превышает объём бака автомобиля. Его объём мы установили первым параметром при вызове new Car(). Когда мы
используем публичные методы объекта, мы вызываем приватные методы и читаем или записываем данные в приватные свойства.
Но это знать необязательно: приватные свойства инкапсулированы внутри класса. Часть данных и функциональности скрыты от окружения.
Так инкапсуляция представила объект из 3 методов и 3 свойств как интерфейс из 2 публичных методов, с которыми просто работать.`,
    subtitle8: `Наследование`,
    text14: `Наследование в ООП — это возможность создать класс на основе других классов.
Каждый из нас сталкивался с наследованием в биологии — передачей генома из поколения в поколение среди биологического вида.
Принципы наследования нашли применение и в программировании.
С наследованием разработчики научились использовать уже написанные классы снова.
Так программы избавились от дублирования кода и их стало гораздо проще поддерживать.
Разберём это на примере:`,
    code6: {
      lang: "javascript",
      value: `class Student {
  constructor(name, cohort) {
    this._name = name;
    this._cohort = cohort;
    this._profession = null;
    this._trainingDuration = null;
  }
  getInfo() {
    return {
      name: this._name,
      cohort: this._cohort,
      profession: this._profession,
      trainingDuration: this._trainingDuration
    }
  }
}`,
    },
    text15: `Класс Student создаёт объект с информацией о студентах. Его параметры — имя студента и номер когорты, а профессия this._profession и
продолжительность обучения this._trainingDuration равны null. В прошлом уроке вы узнали правила чтения и изменения значений приватных
свойств. Если им следовать, то не получится изменить снаружи свойства this._profession и this._trainingDuration.
У объекта класса Student нет публичных интерфейсов, чтобы изменить эти приватные свойства.
Можно добавить классу параметры и установить эти два свойства через них:`,
    code7: {
      lang: "javascript",
      value: `class Student {
  constructor(name, cohort, profession, trainingDuration) {
    this._name = name;
    this._cohort = cohort;
    this._profession = profession;
    this._trainingDuration = trainingDuration;
  }
}`,
    },
    text16: `Но лучше создавать в классе объект с минимумом параметров.
Что мы тогда имеем:
У объекта класса приватные значения свойств.
Эти значения прописаны статически.
Они не устанавливаются параметрами, которые переданы в конструктор класса.
Поэтому логично создать для каждого типа объекта отдельный класс:`,
    code8: {
      lang: "javascript",
      value: `// класс студента веб-разработчика
class WebDeveloperStudent {
  constructor(name, cohort) {
    this._name = name;
    this._cohort = cohort;
    this._profession = 'Web developer';
    this._trainingDuration = 10;
  }
  getInfo() {
    return {
      name: this._name,
      cohort: this._cohort,
      profession: this._profession,
      trainingDuration: this._trainingDuration
    }
  }
}
// класс студента Пайтон-разработчика
class PythonDeveloperStudent {
  constructor(name, cohort) {
    this._name = name;
    this._cohort = cohort;
    this._profession = 'Python developer';
    this._trainingDuration = 9;
  }
  getInfo() {
    return {
      name: this._name,
      cohort: this._cohort,
      profession: this._profession,
      trainingDuration: this._trainingDuration
    }
  }
}
// класс студента аналитика данных
class DataAnalystStudent {
  constructor(name, cohort) {
    this._name = name;
    this._cohort = cohort;
    this._profession = 'Data analyst';
    this._trainingDuration = 6;
  }
  getInfo() {
    return {
      name: this._name,
      cohort: this._cohort,
      profession: this._profession,
      trainingDuration: this._trainingDuration
    }
  }
}`,
    },
    text17: `Но тогда придётся в каждом классе дублировать:
метод getInfo и 4 свойства в нём;
установку значений this._name и this._cohort;
изменения getInfo, если они появятся.
Проблему дублирования кода в классах решает наследование.
С ключевыми словами extends можно создать новый класс, который наследует от исходного все его свойства и методы:`,
    code9: {
      lang: "javascript",
      value: `class WebDeveloperStudent extends Student {
}
class PythonDeveloperStudent extends Student {
}
class DataAnalystStudent extends Student {
}`,
    },
    text18: `Ключевое слово extends позволяет этим 3 дочерним классам наследовать методы родительского класса Student.
Но нам нужно присвоить каждому классу уникальные значения свойств _profession и _trainingDuration.
Поэтому объявим метод constructor в каждом классе и присвоим этим свойствам правильные значения:`,
    code10: {
      lang: "javascript",
      value: `class WebDeveloperStudent extends Student {
  constructor(name, cohort) {
    super(name, cohort);
    this._profession = 'Web developer';
    this._trainingDuration = 10;
  }
}
class PythonDeveloperStudent extends Student {
  constructor(name, cohort) {
    super(name, cohort);
    this._profession = 'Python developer';
    this._trainingDuration = 9;
  }
}
class DataAnalystStudent extends Student {
  constructor(name, cohort) {
    super(name, cohort);
    this._profession = 'Data analyst';
    this._trainingDuration = 6;
  }
}`,
    },
    text19: `В каждом конструкторе дочернего класса мы вызываем ключевое слово super — ссылку на родительский класс.
Поэтому вызов super() вызывает метод constructor класса, на который super и ссылается. В нашем случае это класс Student.
Но если класс наследуется через extends и нужно определить в дочернем классе метод constructor —
вызываем super и передаём ему нужные свойства, как в примере выше. Иначе появится ошибка и скрипт перестанет выполняться.
С ключевыми словами super и extends можно перенести инициализацию свойств this._name и this._cohort в конструктор родителя.
Так мы избавимся от дублирования этих свойств в конструкторах дочерних классов.
Каждый дочерний класс переопределяет свойства this._profession и this._trainingDuration своего родительского класса.
Поэтому вызов getInfo объектов дочерних классов вернёт значения этих свойств в соответствии с их классами:`,
    code11: {
      lang: "javascript",
      value: `const student1 = new WebDeveloperStudent("Петя Васечкин", 1);
const student2 = new DataAnalystStudent("Маша Иванова", 3);
student1.getInfo();
/*
{
  name: "Петя Васечкин",
  cohort: 1,
  profession: "Web developer",
  traningDuration: 10
}
*/
student2.getInfo();
/*
{
  name: "Маша Иванова",
  cohort: 3,
  profession: "Data analyst",
  traningDuration: 6
}
*/`,
    },
  },
  {
    title: `Полиморфизм`,
    code1: {
      lang: "javascript",
      value: `class Student {
  constructor(name, cohort) {
    this._name = name;
    this._cohort = cohort;
    this._profession = null;
    this._trainingDuration = null;
  }
  getInfo() {
    return {
      name: this._name,
      cohort: this._cohort,
      profession: this._profession,
      trainingDuration: this._trainingDuration
    }
}
class WebDeveloperStudent extends Student {
  constructor(name, cohort) {
    super(name, cohort);
    this._profession = 'Web developer';
    this._trainingDuration = 10;
  }
}
class PythonDeveloperStudent extends Student {
  constructor(name, cohort) {
    super(name, cohort);
    this._profession = 'Python developer';
    this._trainingDuration = 9;
  }
}
class DesignerStudent extends Student {
  constructor(name, cohort) {
    super(name, cohort);
    this._profession = 'Designer';
    this._trainingDuration = 6;
  }
}`,
    },
    text1: `Здесь всё те же 3 дочерних класса студентов разных профессий, которые наследуются от родительского Student.
Ключевое слово super избавляет от необходимости описывать в каждом из них метод getInfo со свойствами this._name и this._cohort.
Достаточно вызвать super() в конструкторе дочернего класса, чтобы вернуть объект с унаследованными свойствами и методами родительского:`,
    code2: {
      lang: "javascript",
      value: `const student1 = new WebDeveloperStudent('Петя Васечкин', 1);
const student2 = new PythonDeveloperStudent('Павел Морозов', 2);
const student3 = new DesignerStudent('Маша Иванова', 3);`,
    },
    text2: `Напишем функцию, которая примет массив объектов студентов и вернёт массив с информацией о них:`,
    code3: {
      lang: "javascript",
      value: `function getInfoList(students) {

  if (!Array.isArray(students)) return [];
  return students.map(student => student.getInfo());
}
getInfoList([student1, student2, student3]);`,
    },
    subtitle1: `Переопределение методов`,
    text3: `Теперь добавим поле language в объект информации о студенте.
В language находится название языка программирования, который изучает студент на этом курсе.
Веб-разработчику — Javascript, Python-разработчику — Python (вот это поворот!)
Будущие дизайнеры не изучают программирование, поэтому реализация метода getInfo класса DesignerStudent отличается от классов
WebDeveloperStudent и PythonDeveloperStudent. Для этого нужно переопределить методы.
Переопределение методов — это возможность дочерних классов не наследовать определённый метод, а реализовать свой собственный.
Перепишем класс WebDeveloperStudent:`,
    code4: {
      lang: "javascript",
      value: `class WebDeveloperStudent extends Student {
  constructor(name, cohort) {
    super(name, cohort);
    this._profession = 'Web developer';
    this._trainingDuration = 10;
  }
  getInfo() {
    return {
      name: this._name,
      cohort: this._cohort,
      profession: this._profession,
      trainingDuration: this._trainingDuration,
      language: 'Javascript'
    }
  }
}`,
    },
    text4: `Теперь getInfo объектов дочернего класса WebDeveloperStudent отличается от родительского Student.
Этот метод — функция getInfo, которая объявлена в классе WebDeveloperStudent:`,
    code5: `const studentWithoutProfession = new Student('Павел Чехов', 10);
const student1 = new WebDeveloperStudent('Иван Данко', 11);
const student2 = new WebDeveloperStudent('Наталья Романова', 6);
console.log(student1.getInfo === student2.getInfo) // true; объекты класса WebDeveloperStudent имеют общий метод.
console.log(studentWithoutProfession.getInfo === student1.getInfo) // false; Это разные функции.`,
    text5: `Повторим эту операцию и для класса PythonDeveloperStudent:`,
    code6: {
      lang: "javascript",
      value: `class PythonDeveloperStudent extends Student {
  constructor(name, cohort) {
    super(name, cohort);
    this._profession = 'Python developer';
    this._trainingDuration = 10;
  }
  getInfo() {
    return {
      name: this._name,
      cohort: this._cohort,
      profession: this._profession,
      trainingDuration: this._trainingDuration,
      language: 'Python'
    }
  }
}`,
    },
    text6: `Теперь объекты дочерних классов WebDeveloperStudent и PythonDeveloperStudent используют собственный метод getInfo, а DesignerStudent — метод getInfo родительского Student:`,
    code7: {
      lang: "javascript",
      value: `getInfoList([student1, student2, student3]);`,
    },
    subtitle2: `Полиморфизм`,
    text7: `Возможность объектов с одинаковым интерфейсом иметь разную реализацию — это и есть полиморфизм.
Функция getInfoList поочерёдно вызывает метод getInfo в переданных объектах. Но теперь у каждого объекта своя реализация getInfo, и она
зависит от их класса. В примере выше мы переопределили метод родительского класса. Это привело к избыточному дублированию кода:
его основная часть повторяется в каждом дочернем классе. Но это легко исправить, если расширить метод родительского класса.
Внутри метода дочернего класса применим ключевое слово super из прошлого урока.
Так мы сможем дальше пользоваться функциональностью родительского класса.
Пусть функция this.getInfo() теперь вызывает именно метод getInfo дочернего класса: мы же его переопределили.
Но возможность вызывать getInfo родительского никуда не делась.
Используем конструкцию super.getInfo(), чтобы вызвать метод getInfo класса Student:`,
    code8: `class WebDeveloperStudent extends Student {
  constructor(name, cohort) {
    super(name, cohort);
    this._profession = 'Web developer';
    this._trainingDuration = 10;
  }
  getInfo() {
    return super.getInfo();
  }
}`,
    text8: `Конструкция super.getInfo — это метод родительского класса Student, который возвращает объект с информацией о студенте.
Но в плане функциональности это равносильно тому, если бы мы ничего не переопределяли.
Мы можем удалить из класса WebDeveloperStudent реализацию метода getInfo — ничего не изменится.
Класс WebDeveloperStudent унаследует метод родительского класса Student:`,
    code9: `class WebDeveloperStudent extends Student {
  constructor(name, cohort) {
    super(name, cohort);
    this._profession = 'Web developer';
    this._trainingDuration = 10;
  }
}
const studentWithoutProfession = new Student('Василий Зайцев', 3);
const student1 = new WebDeveloperStudent('Наталья Ченкова', 4);
// student1 использует метод getInfo родительского класса Student
console.log(studentWithoutProfession.getInfo === student1.getInfo) // true`,
    subtitle3: `Расширение методов`,
    text9: `Но это не то, что нам нужно. Мы же хотели в объект информации о студенте добавить язык программирования, который он изучает на курсе.
И вот как это сделать:`,
    code10: `class WebDeveloperStudent extends Student {
  constructor(name, cohort) {
   // ...
  }
  getInfo() {
    const info = super.getInfo();
    info.language = 'Javascript';
    return info;
  }
}`,
    text10: `Теперь метод getInfo класса WebDeveloperStudent свойством language расширяет содержимое объекта с информацией о студенте и возвращает его.`,
    subtitle4: `Шаблон разметки внутри класса`,
    text11: `У многих элементов страницы есть общие оформление, структура и функциональность.
ООП помогает разработчику спроектировать класс, который станет фабрикой по производству таких однотипных элементов.
Элементы страницы бывают двух видов:
Статические — не меняются после загрузки страницы и хранятся в html-файле. Обычно это логотип в углу страницы или подвал сайта.
Динамические — меняются без перезагрузки страницы из-за действий пользователя и создаются скриптами из файла index.js.
Так работают чаты: новые сообщения появляются в ленте, старые сообщения пользователь может удалить без обновления страницы.
Если на странице много похожих динамических элементов, их лучше организовать согласно ООП:
сначала создадим класс с разметкой динамических элементов,
затем этот класс послужит фабрикой по производству однотипных блоков HTML.
Тогда достаточно исправить только один класс, чтобы изменить все однотипные блоки.
Добавим класс в index.js:`,
    code11: `class Card {
  // в конструкторе будут динамические данные,
  // для каждого экземпляра свои
  constructor(text, image) {
    // text и image — приватные поля,
    // они нужны только внутри класса
    this._text = text;
    this._image = image;
  }
}
// создадим экземпляр карточки с уникальным текстом и аватаром пользователя
const card = new Card('Привет! Как дела?', 'userpic.jpg');`,
    text12: `Пока конструктор содержит только данные, которые уникальны для каждого сообщения в чате.
Позже мы сильно усложним конструктор — этого потребует логика работы класса.`,
    subtitle5: `Работа с шаблоном разметки`,
    text12: `Следующая задача — научить класс Card возвращать разметку. Такую же задачу вы решали для карточек в проекте Mesto.
Тогда функция возвращала DOM-элемент. В ООП такая функция станет методом класса. Назовём его _getTemplate:`,
    code12: `class Card {
  constructor(text, image) {
    this._text = text;
    this._image = image;
  }
  _getTemplate() {
    // здесь выполним все необходимые операции, чтобы вернуть разметку
  }
}
const card = new Card('Привет! Как дела?', 'userpic.jpg');`,
    text13: `Метод_getTemplate — приватный. Мы вызовем его внутри класса, чтобы получить готовую разметку перед размещением на страницу.
Так мы отделим логику обработки разметки от логики публикации элемента.
Чем более явно разделены функции, тем проще управлять кодом.
Класс получает разметку из template-элемента — расположим его в index.html:`,
    code13: {
      lang: "html",
      value: `<template class="card-template">
  <div class="card">
    <img src="" alt="Аватар пользователя" class="card__avatar">
    <div class="card__text">
      <p class="card__paragraph"><!-- здесь будет текст сообщения --></p>
    </div>
  </div>
</template>`,
    },
    text14: `Это делает метод _getTemplate.`,
    code14: `_getTemplate() {
  // забираем размеку из HTML и клонируем элемент
  const cardElement = document
  .querySelector('.card-template')
  .content
  .querySelector('.card')
  .cloneNode(true);
  // вернём DOM-элемент карточки
  return cardElement;
}`,
    text15: `Задача метода _getTemplate — вернуть разметку карточки через return.
Для наполнения данными и размещения карточки на страницы мы используем другие методы.`,
  },
  {
    title: `Добавление данных в разметку и размещение в DOM`,
    text1: `Сейчас разметка карточки выглядит так:`,
    code1: {
      lang: "html",
      value: `<template class="card-template">
  <div class="card">
    <img src="" alt="Аватар пользователя" class="card__avatar">
    <div class="card__text">
      <p class="card__paragraph"><!-- здесь будет текст сообщения --></p>
    </div>
  </div>
</template>`,
    },
    text2: `Разместим содержание сообщения в вёрстке. Изображение станет значением атрибута src элемента с классом card__avatar.
Текст сообщения попадёт в блок card__paragraph.  У каждого нового экземпляра класса Card — своё содержимое.
Подготовим в index.js массив объектов с изображением и текстом:`,
    code2: {
      lang: "javascript",
      value: `const messageList = [
  {
    image: 'https://code.s3.yandex.net/web-code/card__image.jpg',
    text: 'Привет, нам срочно требуется доработать чат!'
  },
  {
    image: 'https://code.s3.yandex.net/web-code/card__image-lake.jpg',
    text: 'Теперь мы можем создавать сколько угодно карточек!'
  },
];`,
    },
    subtitle: `Подготовка карточки к публикации`,
    text3: `Новый метод generateCard подготовит карточку к публикации. Он добавит данные в разметку, а после научимся управлять поведением карточек.
Метод публичный, чтобы возвращать готовые карточки внешним функциям:`,
    code3: {
      lang: "javascript",
      value: `_getTemplate() {
  const cardElement = document
  .querySelector('.card-template')
  .content
  .querySelector('.card')
  .cloneNode(true);
  return cardElement;
}
generateCard() {
  // Запишем разметку в приватное поле _element.
  // Так у других элементов появится доступ к ней.
  this._element = this._getTemplate();
  // Добавим данные
  this._element.querySelector('.card__avatar').src = this._image;
  this._element.querySelector('.card__paragraph').textContent = this._text;
  // Вернём элемент наружу
  return this._element;
}`,
    },
    text4: `Теперь цикл обойдёт массив messageList и для каждого его элемента:
создаст новый экземпляр класса Card,
подготовит карточку к публикации,
добавит новую карточку в DOM.`,
    code4: `// в начале файла index.js
const messageList = [{
    image: 'https://code.s3.yandex.net/web-code/card__image.jpg',
    text: 'Привет, нам срочно требуется доработать чат!'
  },
  {
    image: 'https://code.s3.yandex.net/web-code/card__image-lake.jpg',
    text: 'Теперь мы можем создавать сколько угодно карточек!'
  },
];
class Card {
  // код класса
}
messageList.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item.text, item.image);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  // Добавляем в DOM
  document.body.append(cardElement);
});`,
    text5: `Теперь легко создавать карточки: достаточно добавить новые данные в массив.
Отдельный массив для данных, отдельный класс для их обработки — подходящая структура кода.`,
  },
  {
    tetle: `Подготовка класса к масштабированию`,
    text1: `Простые классы со временем станут сложнее: появятся новые функции, придётся обрабатывать больше данных.
Разработчики думают на несколько шагов вперёд и проектируют код так, чтобы его было удобно развивать.
Вот несколько примеров, как выглядит развитие класса из прошлых уроков.`,
    subtitle1: `Объект как параметр конструктора`,
    text2: `Классу может потребоваться больше данных. Тогда увеличится список аргументов:`,
    code1: `// Переберём весь исходный массив
messageList.forEach((item) => {
  // приходится передавать очень много аргументов
  const card = new Card(item.text, item.image, item.user.id, item.user.name, item.date);
  const cardElement = card.generateCard();
  document.body.append(cardElement);
});`,
    text3: `Длинный список аргументов выглядит неуклюже, он запутывает и мешает читать код.
Выход — передать данные в виде объекта, а в самом классе присвоить полям нужные свойства:`,
    code2: `class Card {
  constructor(data) { // теперь конструктор получает объект
    this._text = data.text;
    this._image = data.image;
  }
  //  остальные методы Card
}
// переберём весь исходный массив
messageList.forEach((item) => {
  const card = new Card(item); // передаём объект аргументом
  const cardElement = card.generateCard();
  document.body.append(cardElement);
});`,
    subtitle2: `Работа класса с разными шаблонами`,
    text4: `Однажды вы услышите, что дизайнер готовит макеты в новом стиле: с другими цветами и расположением элементов.
Пользователи смогут выбирать тему оформления. В нашем уроке селектор извлекал шаблон разметки из DOM.
Чтобы выбирать из нескольких шаблонов, сделаем селектор частью конструктора класса. Тогда класс станет универсальным:
он научится создавать карточки в разных стилях в зависимости от модификатора. Например, card_size_large или card_size_small.
Получится такая конструкция:`,
    code3: {
      lang: "javascript",
      value: `class Card {
  constructor(data, cardSelector) { // добавили второй параметр
    this._text = data.text;
    this._image = data.image;
    this._cardSelector = cardSelector; // записали селектор в приватное поле
  }
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector) // используем this._cardSelector
    .content
    .querySelector('.card')
    .cloneNode(true);
    return cardElement;
  }
  // generateCard
}`,
    },
    text5: `Шаблон template-элемент получит новый класс — модификатор:`,
    code4: `<template class="card-template card-template_type_default"> // <!-- добавили модификатор -->
  <div class="card">
    <img src="" alt="Аватар пользователя" class="card__avatar">
    <div class="card__text">
      <p class="card__paragraph"><!-- здесь будет текст сообщения --></p>
    </div>
  </div>
</template>`,
    text6: `Класс вместе с данными получает указание, какой шаблон использовать:`,
    code5: `messageList.forEach((item) => {
  // передаём селектор темплейта при создании
  const card = new Card(item, '.card-template_type_default');
  const cardElement = card.generateCard();
  document.body.append(cardElement);
});`,
    text7: `Теперь такой класс готов к масштабированию проекта.`,
  },
  {
    title: `Обработчики событий`,
    text1: `Чаще всего сообщения выбирают, чтобы их кому-то переслать
Чтобы выполнить задачу, нужно добавить слушатель клика на сообщение и переключать активный класс card__text_is-active:
добавлять и убирать его по клику. Опишем эти действия внутри нашего класса.
Элемент сообщения определён в приватном свойстве this._element. В него и нужно добавить новый класс, чтобы выделить сообщение.
Поэтому создадим метод _handleMessageClick — приватный, ведь не планируем обращаться к нему извне:`,
    code1: `class Card {
  // конструктор и другие методы Card
  // добавили метод _handleMessageClick
  _handleMessageClick() {
    this._element.querySelector('.card__text').classList.toggle('card__text_is-active');
  }
}`,
    text2: `Осталось добавить слушателя событий. Для этого есть два способа:
добавить слушатель внутри метода generateCard;
создать для этого приватный метод _setEventListeners.
Задачи проджект-менеджера всё чаще появляются в нашей жизни. Наверняка скоро придётся добавить ещё слушателей событий.
Поэтому лучше сразу создать отдельный метод _setEventListeners, чтобы не засорять код в generateCard:`,
    code2: `_setEventListeners() {
  this._element.querySelector('.card__text').addEventListener('click', () => {
    this._handleMessageClick();
  });
}
_handleMessageClick() {
  this._element.querySelector('.card__text').classList.toggle('card__text_is-active')
}`,
    text3: `Чтобы установить слушатель события, нужна стрелочная функция. Только она позволит обратиться к _handleMessageClick через this.
В будущих темах вы узнаете больше о функциях, применении this в их теле — и почему здесь используется стрелочная функция.
Добавим обработчики внутри generateCard:`,
    code3: {
      lang: "javascript",
      value: `generateCard() {
  this._element = this._getTemplate();
  this._setEventListeners(); // добавим обработчики
  this._element.querySelector('.card__avatar').src = this._image;
  this._element.querySelector('.card__paragraph').textContent = this._text;
  return this._element;
}`,
    },
    text4: `Таким будет конечный код:`,
    code4: {
      lang: "javascript",
      value: `class Card {
  constructor(data, cardSelector) {
    this._text = data.text;
    this._image = data.image;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__avatar').src = this._image;
    this._element.querySelector('.card__paragraph').textContent = this._text;
    return this._element;
  }
  _setEventListeners() {
    this._element.querySelector('.card__text').addEventListener('click', () => {
      this._handleMessageClick();
    });
  }
  _handleMessageClick() {
    this._element.querySelector('.card__text').classList.toggle('card__text_is-active');
  }
}
messageList.forEach((item) => {
  const card = new Card(item, '.card-template_type_default');
  const cardElement = card.generateCard();
  document.body.append(cardElement);
});`,
    },
    text5: `Класс стал очень гибким к новым требованиям. Теперь легко управлять событиями пользователя в любой карточке.
Для этого достаточно создать новый метод и добавить его в список слушателей.`,
  },
  {
    title: `Наследование`,
    text1: `Мы оставим в родительском классе общие данные и функциональность, а уникальные фичи унаследуем в дочерних.
Получится такая структура:`,
    code1: {
      lang: "javascript",
      value: `class Card {
  // здесь общие данные и функциональность
}
class UserCard extends Card {
  // данные и функциональность карточки пользователя
}
class DefaultCard extends Card {
  // данные и функциональность карточки собеседника
}`,
    },
    text2: `Создадим два html-элемента template с разной вёрсткой под каждый тип карточки.
А родительский класс мы уже на прошлых уроках подготовили к работе с разными селекторами:`,
    code2: `<template class="card-template card-template_type_user">
  <div class="card">
    <!-- вёрстка карточки пользователя, она без картинки-->
  </div>
</template>
<template class="card-template card-template_type_default">
  <div class="card">
    <!-- вёрстка карточки собеседника -->
  </div>
</template>`,
    text3: `Теперь передадим в конструктор селекторы классов user-card-template и default-card-template. Методы для получения разметки и генерации
карточек уже написаны. Но разметка карточек теперь разная, поэтому переопределим эту функциональность в дочерних классах. Массив
messageList тоже должен измениться. Теперь нужно маркировать сообщение пользователя, чтобы отличить его от сообщения собеседника.
Иначе мы не поймём, какую карточку для какого сообщения создавать.
Поэтому добавим в объект сообщений пользователя ключ isOwner со значением true, чтобы писать проверки на основе этого параметра:`,
    code3: {
      lang: "javascript",
      value: `const messageList = [
  {
    image: 'https://code.s3.yandex.net/web-code/card__image.jpg',
    text: 'Привет, нам срочно требуется доработать чат!'
  },
  {
    text: 'Это карточка пользователя',
    isOwner: true // добавили свойство isOwner сообщению пользователя
  },
  {
    image: 'https://code.s3.yandex.net/web-code/card__image.jpg',
    text: 'Ответ!'
  }
];`,
    },
    text4: `Теперь нужно определить, какие свойства и методы останутся в родительском классе, а какие перейдут в дочерние.`,
    subtitle1: `Размещение методов в классах`,
    text5: `Определим, в каких классах будут методы:
_getTemplate — в родительском. Метод только получает разметку шаблона по определённому селектору. Это нужно для каждой карточки.
_setEventListeners и _handleMessageClick — в родительском. Методы назначают функциональность карточек в зависимости от событий.
События нужны всем карточкам. generateCard — в дочерних. Метод наполняет карточки данными и функциональностью. У нас два типа
карточек с разными данными,  поэтому для каждой нужен свой метод. Код получится таким:`,
    code4: `class Card {
  constructor() {
    // с конструктором разберёмся позже
  }
  _getTemplate() {
    // код _getTemplate
  }
  _setEventListeners() {
    // код _setEventListeners
  }
  _handleMessageClick() {
    // код _handleMessageClick
  }
}
class UserCard extends Card {
  constructor() {
    // с конструктором разберёмся позже
  }
  generateCard() {
    // код generateCard
  }
}
class DefaultCard extends Card {
  constructor() {
    // с конструктором разберёмся позже
  }
  generateCard() {
    // код generateCard
  }
}`,
    text6: `Код методов почти прежний. Но когда в дочерних классах мы вызываем методы родительского, нужно вместо this написать super,
ведь теперь мы обращаемся к родителю. Код методов изменится аналогично. Такой он у метода generateCard в классе UserCard:`,
    code5: {
      lang: "javascript",
      value: `class UserCard extends Card {
  constructor() {
    // с конструктором разберёмся позже
  }
  generateCard() {
    this._element = super._getTemplate(); // заменили this на super
    super._setEventListeners(); // заменили this на super
    this._element.querySelector('.card__paragraph').textContent = this._text;
    return this._element;
  }
}`,
    },
    subtitle2: `Изменение конструкторов родителя и наследников`,
    text7: `Сначала разберёмся, какие данные хранить в конструкторах наследников, а какие — в родительском. Сейчас поля объявлены на уровне Card.
Но не все они нужны дочерним классам. Так у карточки пользователя нет аватарки, а у родительской Card — есть. Теперь нужно передать
дочерним классам селектор, с которым работает каждая карточка. Для этого в конструкторе родительского оставляем только
один параметр — этот селектор.  Ключевым словом super с аргументом-селектором его и передают дочерним классам.
Кроме селектора из родителя в конструкторы наследников записывают другие данные:`,
    code6: {
      lang: "javascript",
      value: `class Card {
  constructor(cardSelector) { // теперь здесь один параметр — селектор
    this._cardSelector = cardSelector;
  }
  // далее — все методы класса
}
class UserCard extends Card {
  constructor(data, cardSelector) {
    // ключевым словом super вызываем конструктор родительского
    // класса с единственным аргументом — селектором темплейта
    super(cardSelector);
    // у карточки пользователя есть только текст
    this._text = data.text;
  }
  // далее — метод generateCard
}
class DefaultCard extends Card {
  constructor(data, cardSelector) {
    // аналогично вызываем конструктор родителя
    super(cardSelector);
    // у карточки собеседника есть текст и аватар
    this._text = data.text;
    this._image = data.image;
  }
  // далее — метод generateCard
}`,
    },
    subtitle3: `Создание экземпляров классов`,
    text8: `Осталось добавить условие перебора массива messageList. В зависимости от значения ключа isOwner создаются экземпляры разных классов:`,
    code7: `messageList.forEach((item) => {
  // Если значение isOwner === true,
  // создаётся экземпляр UserCard,
  // иначе DefaultCard
  const card = item.isOwner
    ? new UserCard(item, '.card-template card-template_type_user')
    : new DefaultCard(item, '.card-template card-template_type_default');
  const cardElement = card.generateCard();
  document.body.append(cardElement);
});`,
  },
  {
    title: `Полиморфизм`,
    text1: `При работе с DOM бывает полезно расширить методы некоторых динамических элементов. Общее поведение элементов одного типа
уточняется для их подтипа.  Так происходит, когда пользователь кликает на карточку и по-другому её оформляет.
Усложним работу метода _handleMessageClick в наследнике UserCard. До этого метод только добавлял ещё один класс элементу card__text.
Теперь пусть метод ещё и изменяет сам атрибут class в html-элементе карточки с классом card.
Полиморфизм поможет расширить функциональность _handleMessageClick прямо внутри наследника.дополнительную функциональность:
Для этого вызовем исходный метод ключевым словом super и после этого опишем`,
    code: `class Card {
  // конструктор и другие методы
  _handleMessageClick() {
    this._element.querySelector('.card__text').classList.toggle('card__text_is-active');
  }
}
class UserCard {
  // конструктор и другие методы
  _handleMessageClick() {
    super._handleMessageClick(); // вызываем родительский метод
    // дополним _handleMessageClick новой функциональностью:
    // в this._element хранится элемент карточки,
    // добавим ему класс card_is-active
    this._element.classList.toggle('card_is-active');
  }
}`,
    text2: `Мы сделали перегрузку метода — расширение функциональности родительского класса в наследнике. Этот термин будет часто встречаться.`,
  },
  {
    title: `IIFE`,
    text1: `Перед тем, как знакомиться с модулями, нужно вспомнить кое-что об области видимости функции и познакомиться с одной новой концепцией.
Вы уже знаете, что функциональное выражение (или Function Expression) — это функция в составе какого-то выражения.
И познакомились с самыми распространёнными примерами использования Function Expression:`,
    code1: `// функция, положенная в переменную
const double = function (num) {
  return num * 2;
};
// и функция, определённая в вызове метода
[1, 2, 3].map(function (item) {
  return item * 2;
});`,
    text2: `Но, как мы уже говорили, функциональное выражение — это функция, в составе какого-то выражения.
Если заключить функцию в скобки, это тоже станет функциональным выражением:`,
    code2: `/* это функциональное выражение, потому что функция
объявлена в составе выражения — в скобках */
(function () {
  console.log('Hello world!');
});`,
    text3: `В таком виде эта функция бесполезна: она создаётся, но мы никуда её не передаём. Движок сразу от неё избавится, потому
что она нигде не используется. Изменим этот код, добавив круглые скобки в конце:`,
    code3: `(function () {
  console.log('Hello world!');
})(); // добавим скобки в конце, тем самым вызвав функцию`,
    text4: `Если запустить этот код, в консоли появится сообщение «Hello world!». Функция создаётся и сразу же вызывается.
Такой способ создания и вызова функций называется IIFE.`,
    subtitle1: `IIFE против глобальных переменных`,
    text5: `Поскольку IIFE — это функция, все переменные, объявленные внутри неё, не видны снаружи.
Если обернуть весь код в IIFE, можно полностью избавиться от глобальных переменных в нашем коде.
Код с глобальными переменными:`,
    code4: `const button = document.querySelector('button');
function handleClick(evt) {
  // код обработки клика
}
button.addEventListener('click', handleClick);`,
    text6: `Код без глобальных переменных:`,
    code5: `(function () {
  const button = document.querySelector('button');
    function handleClick(evt) {
    // код обработки клика
  }
  button.addEventListener('click', handleClick);
})();`,
    text7: `Теперь в коде нет глобальных переменных и если другой разработчик тоже решит воспользоваться переменной button,
это никак не повлияет ни на его код, ни на ваш. Так можно на чистом JS скрыть переменные от внешнего кода:
другие инструменты не понадобятся.  С этой возможности в JS и появились модули.`,
    subtitle2: `Инкапсуляция и модули`,
    text8: `Всё это время мы подключали JS-код к HTML тегом script. Если нужна какая-то библиотека — просто дописывали ещё один
<script src="some-script.js"> и готово.  Пока вы работаете над небольшим сайтом, всё хорошо. Но при разработке сложных проектов, над
которыми трудится команда разработчиков, такой подход неприменим. Дело в том, что проект становится очень хрупким. Вам достаточно не
в том порядке подключить JS-файлы и всё вообще перестанет работать, потому что где-то в скрипте есть обращение к функции из ещё не
загруженного файла. К тому же может возникнуть конфликт глобальных переменных. Вы с коллегой писали код в одном проекте и по
неосторожности одинаково назвали переменные.  От этого код одного из вас может сломаться. Поэтому код нужно организовать, чтобы
избежать всех этих проблем. Во-первых, код нужно разграничить — сделать так, чтобы одна функциональность не затрагивала другую.
Во-вторых, нужно как-то решить проблему с хрупкостью проекта, чтобы скрипты работали, в каком бы порядке они не были подключены.`,
    subtitle3: `Инкапсуляция`,
    text9: `Решение первой проблемы — инкапсуляция. Функциональность описывают объектом, всю логику заключают в его внутренние методы.
Так избавляются от глобальных переменных: все нужные содержатся внутри его методов. Поэтому к ним можно спокойно обращаться снаружи.
Такой объект и называют модулем:`,
    code6: `// Chart — модуль
const Chart = (function() {
  // локальные переменные, они не видны снаружи
  const data = [];
  // публичные методы, они будут доступны в объекте Chart
  return {
    render: function (data) { /* ... */ },
    setData: function (data) { /* ... */ }
  };
}()); // IIFE возвращает объект
Chart.render([[0,12], [1,22], [3,18]]);`,
  },
  {
    title: `Что такое модуль и как его использовать`,
    text1: `Модуль — это фрагмент программы, который реализует часть её функциональности.
Обычно это отдельный файл с кодом, в котором эта функциональность реализована.`,
    subtitle1: `Работа с модулями`,
    text2: `Работать с модулями — это логично разделить свой код на файлы, а потом подключить одни файлы к другим. Так можно поступить с
карточкой товара в интернет-магазине. Вы описываете её возможности: открыть карточку, добавить товар в корзину, написать отзыв. Одна
карточка — один модуль. Затем работаете с разделом «Список товаров». Эта секция — новый модуль со своим поведением, у него другая
отрисовка и сортировка товаров. Поэтому здесь не получится сразу использовать модуль карточки товара. Для начала его нужно подключить.`,
    subtitle2: `Подключение и использование модуля`,
    text3: `Чтобы разделить код на отдельные модули и организовать взаимодействие между ними, нужно пройти три этапа.
Подключение модуля. Браузер должен понять, что на сайте используются модули. Для этого при подключении скриптов нужно задать
значение module атрибуту type:`,
    code1: `<script type="module" src="script-01.js"></script>
<script type="module" src="script-02.js"></script>`,
    text4: `Экспорт из модуля. Теперь отдельные переменные и функции этого модуля нужно сделать доступными для подключения в других файлах —
экспортировать их. Для этого перед переменной, функцией или классом, которые нужно экспортировать, добавляют директиву export:`,
    code2: `// script-01.js
export const str = 'Я переменная из модуля script-01.js';
export function myFunc() {
  console.log('Я функция из модуля script-01.js');
}`,
    text5: `Теперь переменную str и функцию myFunc можно импортировать в другие файлы.
Импорт в модуль. Затем переменные, функции или классы модуля нужно получить внутри другого модуля.
Для этого есть директива import, которая позволяет обращаться к переменным в других файлах:`,
    code3: `// script-02.js
// импортируем переменную и функцию по их именам
import { str, myFunc } from './script-01.js';
// теперь их можно использовать
console.log(str); // "Я переменная из модуля script-01.js"
myFunc(); // "Я функция из модуля script-01.js"`,
    text6: `Если вы сейчас попробуете создать несколько js-файлов на компьютере и подключить их в HTML как модули,
то заметите, что файлы не подключатся, а в консоль повалятся ошибки.
Чтобы всё заработало, нужно установить локальный сервер.`,
  },
  {
    title: `Директивы export и import`,
    text1: `Теперь разберёмся с директивами export и import.`,
    subtitle1: `Экспорт в момент создания`,
    text1: `Переменные, функции и классы можно экспортировать в момент создания. Для этого перед их созданием добавляют директиву export:`,
    code1: `// экспорт переменной
export let str = 'Я буду на улице';
export const date = [12, 22, 31];
// экспорт функции
export function giveMeSomeInternet() {
  return 'Internet';
}
// экспорт класса
export class Song {
  constructor() {
}`,
    text2: `При импорте такого значения мы используем имя, которое дали при создании.
Поэтому экспорт в момент объявления называют именованным экспортом.`,
    subtitle2: `Экспорт после создания`,
    text3: `Можно экспортировать несколько переменных и функций сразу.
То, что извлекается из модуля, нужно перечислить через запятую в фигурных скобках:`,
    code2: `const array = [1, 2, 3, 4];
const arrSquared = arr.map(item => item * item);
// экспорт нескольких значений
export { array, arrSquared };`,
    subtitle3: `Экспорт с другим именем: директива export as`,
    text4: `Переменные и функции можно переименовывать при экспорте, чтобы обращаться к методам модуля по новому имени:`,
    code3: `// constants.js
const array = [1, 2, 3, 4];
const arrSquared = arr.map(item => item * item);
// переименовали при экспорте
export { array as arr, arrSquared as sq };
// index.js
// в импорте используем новые имена
import { arr, sq } from './constants.js';`,
  },
  {
    title4: `Директива import`,
    text1: `Импортировать объекты тоже можно пачками.
Переменные, которые добавляются в модуль, нужно перечислить через запятую в фигурных скобках:`,
    code1: `// index.js
// импорт нескольких переменных из файла data.js
import { array, arrSquared } from './data.js'
console.log(array); // [1, 2, 3]
console.log(arrSquared); // [1, 4, 9]`,
    text2: `Если импортировать нужно всё, что экспортирует модуль, имена объектов можно не перечислять, а просто поставить *:`,
    code2: `// index.js
import * as data from './data.js';
// из файла data.js будет импортировано всё, что из него экспортируется
console.log(data.array); // [1, 2, 3]
console.log(data.arrSquared); // [1, 4, 9]`,
    text3: `Но лучше не импортировать через *. Такой код сложнее читать: не видно что конкретно импортируется из файла data.js.`,
    subtitle1: `Имя модуля: директива import as`,
    text4: `Длинные имена модулей можно сокращать и при импорте:`,
    code3: `// index.js
import { array as arr, arrSquared as sq } from './data.js'
console.log(arr); // [1, 2, 3]
console.log(sq); // [1, 4, 9]`,
    subtitle2: `Экспорт и импорт по умолчанию`,
    text5: `Из модуля можно возвращать одно или несколько значений. Если нужно экспортировать один класс или функцию, лучше использовать экспорт по умолчанию.
Тогда после директивы export пишут default, а дальше — значение, которое нужно экспортировать.
Отличие импорта по умолчанию — фигурные скобки не ставятся:`,
    code4: `// render-items.js
export default function renderItems() {
  // код функции
}
// index.js
import renderItems from './render-items.js';
renderItems();`,
    text6: `Здесь не важно, как называется функция в файле экспорта. Она может быть вообще анонимной, что невозможно при обычном экспорте.
При экспорте по умолчанию её имя не играет роли:`,
    code7: `// этот код в разных файлах
// render-items.js
export default function render() {
  // ...
}
// song.js
export default class {
  constructor() { }
}
// data.js
export default [12, 22, 31];`,
    text7: `Имена дают экспортированным данным позже, уже при импорте:`,
    code8: `import renderItems from './render-items.js';
import Song from './song.js';
import someArr from './data.js';`,
  },
  {
    title: `Шпаргалка`,
    text1: `Виды экспорта:
export default — по умолчанию. Такой экспорт может быть только один в файле модуля;
export const array = [1, 2, 3] — именованный экспорт. В файле их может быть несколько;
export { dog, cat } — сразу несколько сущностей можно экспортировать после их объявления.
Виды импорта:
import { array } from './data.js' — с именем сущности;
import { array as arr } from './data.js' — с переименованием сущности;
import default data from './data.js' — по умолчанию. Фигурные скобки не нужны, имя даётся в момент импорта;
import * — всего содержимого сразу. Но так лучше не делать.`,
  },
  {
    title1: `Особенности работы модулей в браузере`,
    text1: `Если тег <script> подключать с атрибутом type="module", стандартное восприятие браузером JS немного изменится.
Тут мы расскажем, что меняется для разработчика при использовании модульного подхода.`,
    subtitle1: `Область видимости`,
    text2: `У модуля своя область видимости. Он содержит локальные переменные и функции, которые не загрязняют глобальную область.
Но если они нужны где-то снаружи, их придётся экспортировать:`,
    code1: {
      lang: "javascript",
      value: `// constants.js
export const numbers = [2, 3, 5];
// index.js
import { numbers } from './constants.js';
const doubledNumbers = numbers.map(number => number * 2);
console.log(doubledNumbers); // [4, 6, 10]
<!-- index.html -->
<script type="module" src="index.js"></script>
<script type="module" src="constants.js"></script>
<script>
  console.log(numbers); // ошибка — такой переменной в глобальной области нет
  console.log(doubledNumbers); // и такой тоже нет
</script>`,
    },
    subtitle2: `Старые браузеры`,
    text3: `В старых браузерах атрибута type="module" не существует. Поэтому если открыть сайт в браузере, который не поддерживает модули,
JavaScript вообще не будет подключён. Это можно обойти так: пишут отдельный код для старых браузеров и подключают отдельно.
То есть дописывают ещё один тег <script>, а в его атрибут type записывают значение "nomodule".`,
    code2: `<!-- этот модуль загрузится, если браузер современный -->
<script type="module"></script>
<!-- этот модуль загрузится, если браузер старый -->
<script type="nomodule"></script>`,
    text4: `Но так поступают редко. В следующем спринте мы расскажем о более продвинутых инструментах работы с модулями.
Они в том числе сделают код понятным и старым браузерам.`,
    subtitle3: `Модули — в конце`,
    text5: `Модули всегда подключаются к странице после отрисовки. Поэтому неважно, где вы их подключаете — в начале или в конце файла:`,
    code3: `<script>
console.log(document.querySelector('input')); // null
/* без модулей такое не сработает, потому что поле ввода
объявлено в коде ниже, а значит, мы пока не можем работать с ним */
</script>
<script type="module">
console.log(document.querySelector('input')); // <input>
/* при модульном подходе таких проблем нет */
</script>
<input type="text">`,
    text6: `Но мы всегда подключаем скрипты в конце body, поэтому вы вряд ли столкнётесь с такой проблемой.`,
  },
];
