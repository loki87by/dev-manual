export const HOOKS = [
  {
    title: `Внутреннее состояние: хук useState`,
    text1: `Вспомним пример, где можно было голосовать за рейтинг пользователей. Сравним предыдущую реализацию и вариант с функциональным компонентом и хуком состояния React.useState.`,
    code1: `// Классовый компонент User
class User extends React.Component {
  constructor(props) {
    super(props);
    // Начальные значения внутреннего состояния
    this.state = {
      rating: 0,
    };
  }
  /*
  * Обработчики событий: изменяют внутреннее состояние
  */
  handleLike = () => {
    this.setState({ rating: 1 });
  };
  handleDislike = () => {
    this.setState({ rating: -1 });
  };
  // JSX-структура компонента
  render() {
    return (
      <p>
        <img src={\`https://code.s3.yandex.net/web-code/react/\${this.props.id}.png\`} width="75" />
        <br /><b>{this.props.name}</b>
        <div className="rating">
          <button onClick={this.handleLike}>👍</button>
            {this.state.rating}
          <button onClick={this.handleDislike}>👎</button>
        </div>
      </p>
    );
  }
}
// Функциональный компонент User
function User(props) {
  // Хук, управляющий внутренним состоянием.
  const [rating, setRating] = React.useState(0);
  /*
  * Обработчики событий: изменяют внутреннее состояние
  */
  function handleLike() {
    setRating(1);
  }
  function handleDislike() {
    setRating(-1);
  }
  return (
    <div className="user">
      <img src={\`img/\${props.id}.png\`} width="75" />
      {props.name}
      <div className="rating">
        <button onClick={handleLike} disabled={rating > 0}>👍</button>
          {rating}
        <button onClick={handleDislike} disabled={rating < 0}>👎</button>
      </div>
    </div>
  );
}`,
    text2: `Код стал короче и лаконичнее (например, this больше не используется), а встроенное поле this.state и метод this.setState заменились одной строкой с вызовом хука.`,
    image1: "image18.png",
    text3: `Хук React.useState принимает единственный аргумент — начальное значение какой-либо переменной состояния и сохраняет его в своём внутреннем хранилище. Взамен он возвращает пару сущностей в виде массива: текущее значение (при первом вызове совпадает с начальным) и функцию, с помощью которой его можно изменять — «сеттер». Эта функция действует аналогично this.setState, однако, в отличие от последней, она управляет не всем набором переменных состояния компонента, а лишь какой-то одной из них — в данном случае rating.
Когда произойдёт вызов функции setRating с новым значением, «Реакт» обновит это значение в своём хранилище и инициирует перерисовку компонента — то есть вызовет саму функцию-компонент (в нашем случае User). При этом повторный вызов хука React.useState вернёт уже другой массив: первый элемент в нём будет содержать новое значение, а вот функция-сеттер останется прежней.`,
    subtitle1: `Деструктуризация`,
    text4: `Важно обратить внимание на то, что хук «не знает», какой именно переменной состояния он управляет. Он лишь принимает на вход некое значение и возвращает пару: то же значение и функцию, которая может его менять. Сами по себе элементы массива не имеют каких-либо имён, однако, с помощью деструктуризации мы создаём на основе них две переменные и присваиваем им удобные нам имена.
Таким образом, хук React.useState можно использовать в компонентах несколько раз для создания любого числа подобных пар, управляющих отдельными переменными внутреннего состояния. При этом значения могут иметь любой тип данных, включая массивы и объекты:`,
    code2: {
      lang: "javascript",
      value: `const [rating, setRating] = React.useState(0); // -1, 0 или 1
const [isBlocked, setIsBlocked] = React.useState(false); // true или false
const [notes, setNotes] = React.useState(['Пока нет заметок']); // Массив строк`,
    },
    subtitle2: `Главное правило хуков`,
    text5: `Так как «Реакт» не знает о том, какой именно переменной состояния управляет каждый из хуков, внутри себя он использует порядковый номер вызова каждого хука для того, чтобы ассоциировать с ним данные в хранилище.
Это указывает на важное правило: порядок хуков не должен меняться между вызовами компонента. Следовательно, хуки не могут находиться внутри условных блоков, циклов и других подобных конструкций:`,
    code3: {
      lang: "javascript",
      value: `const [rating, setRating] = useState(0);
// Это условие может выполниться, а может и не выполниться:
if (isRaining) {
  const [isBlocked, setIsBlocked] = React.useState(false);
}
// Из-за if этот хук может оказаться либо вторым, либо третьим — так нельзя!
const [notes, setNotes] = React.useState(['Пока нет заметок']);`,
    },
    text6: `Из этого правила вытекает и то, что хуки нельзя использовать в других функциях, обработчиках или модулях — вызывайте их только из основной функции компонента. Есть одно исключение: ваши собственные хуки, но о них мы поговорим чуть позже.`,
    subtitle3: `Мутации сложных объектов`,
    text7: `Если для стейта вы используете массивы или объекты с полями, то избегайте их изменений напрямую (мутаций) — всегда передавайте в сеттер новый объект. Для этого удобно использовать оператор spread ..., создающий изменённую копию исходного объекта:`,
    code4: {
      lang: "javascript",
      value: `const [array, setArray] = useState(['Раз', 'Два', 'Три']);
// Так нельзя!
array.push('Четыре');
setArray(array);
// Нужно делать так:
setArray([...array, 'Четыре']);
const [object, setObject] = useState({ name: 'James', surname: 'Wilson' });
// Так нельзя!
object.name = 'Gregory';
setObject(object);
// Нужно делать так:
setObject({
  ...object,
  name: 'Gregory',
});`,
    },
    text8: `Дело в том, что движок «Реакта» сравнивает старое и новое значение с помощью оператора ===, а значит, мы не можем передавать исходный объект, иначе проверка всегда будет возвращать true.
Кстати, это правило применимо и к классовым компонентам.`,
  },
  {
    title: `Эффекты: хук useEffect`,
    text1: `Второе важное преимущество классовых компонентов — методы обратного вызова для создания «побочных эффектов».
Хук useEffect позволяет устанавливать аналогичные колбэки и в функциональных компонентах.
Снова сравним пример из предыдущего урока и его аналог с использованием хуков.`,
    code1: `// Пример из предыдущего урока
class NeonCursor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { top: 0, left: 0 };
  }
  // Метод будет вызван сразу после монтирования: создаём эффекты
  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.documentElement.classList.add('no-cursor');
  }
  // Метод будет вызван непосредственно перед размонтированием: удаляем эффекты
  componentWillUnmount() {
    document.documentElement.classList.remove('no-cursor');
    document.removeEventListener('mousemove', this.handleMouseMove);
  }
  handleMouseMove = (event) => {
    this.setState({
      top: event.pageY,
      left: event.pageX,
    });
  };
  render() {
    return (
      <img
        src="./cursor.png"
        width="30"
        style={{
          position: 'absolute',
          top: this.state.top,
          left: this.state.left,
          pointerEvents: 'none',
        }}
      />
    );
  }
}
// Перепишем код с использованием хуков
function NeonCursor() {
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  React.useEffect(() => {
    function handleMouseMove(event) {
      setPosition({
        top: event.pageY,
        left: event.pageX,
      });
    }
    // Список действий внутри одного хука
    document.addEventListener('mousemove', handleMouseMove);
    document.body.classList.add('no-cursor');
    // Возвращаем функцию, которая удаляет эффекты
    return () => {
      document.body.classList.remove('no-cursor');
      document.removeEventListener('mousemove', handleMouseMove);
    };
  });
  return (
    <img
      src="./cursor.png"
      width={30}
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        pointerEvents: 'none',
      }}
    />
  );
}`,
    text2: `Кроме того, что с помощью React.useState мы заменили this.state на единый объект position, произошло ещё одно изменение: управление эффектами переместилось внутрь колбэка, передаваемого в хук React.useEffect.
«Реакт» вызовет этот колбэк после того, как компонент будет смонтирован или обновлён — то есть этот колбэк является пересечением функциональности componentDidMount и componentDidUpdate. На практике такое объединение оказывается более удобным, однако существует способ и вернуть разделение. Его мы рассмотрим позже.
Чтобы «подчистить» результаты эффекта (когда компонент будет размонтирован), колбэк эффекта может вернуть ещё один колбэк — он будет использован движком «Реакта» по аналогии с componentWillUnmount. Такой колбэк обычно называется “cleanup” (от англ. «очистка»).
Обратите внимание, что сам код эффекта, его очистка и даже обработчик события handleMouseMove описаны рядом: внутри одного вызова React.useEffect — такой подход позволяет лучше организовать код. Кроме того, разработчик может создавать сколько угодно эффектов, если он хочет логически их разделить. Например, в нашем варианте мы могли бы добавить отдельные эффекты для подписки на событие mousemove и для установки класса no-cursor:`,
    code2: `React.useEffect(() => {
  function handleMouseMove(e) {
    setPosition({
      top: e.pageY,
      left: e.pageX,
    });
  }
  document.addEventListener('mousemove', handleMouseMove);
  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
  };
});
React.useEffect(() => {
  document.body.classList.add('no-cursor');
  return () => {
    document.body.classList.remove('no-cursor');
  };
});`,
    text3: `В случае с классовыми компонентами все инструкции должны быть расположены внутри методов жизненного цикла, что зачастую приводит к их плохой читаемости. Код с использованием функциональных компонентов и хуков лишён этого недостатка и в целом выглядит лаконичнее.`,
  },
  {
    title: `Зависимости`,
    text1: `Пожалуй, наиболее распространённый вид эффекта — обращение к API за данными.
Предположим, мы разрабатываем стандартное приложение — электронный магазин волшебных палочек. В центре экрана находится основной компонент, отображающий все тактико-технические характеристики выбранной палочки, а снизу находится список альтернативных вариантов — палочек других производителей, которые могут также заинтересовать покупателя.
При клике на одном из таких вариантов меняется переменная состояния приложения selectedId — ID выбранной в данный момент палочки.
Эта переменная хранится в стейте компонента App и передаётся в виде пропса основному компоненту MagicWand, который при её изменении должен выполнить запрос в API, чтобы загрузить информацию о выбранной палочке.`,
    code1: {
      lang: "javascript",
      value: `// Хук состояния внутри App
const [selectedId, setSelectedId] = React.useState();
// return`,
    },
    text2: `Внутри этого компонента есть знакомые вам кнопки 👍 и 👎, с помощью которых посетитель может выразить своё отношение к предложенному товару. Их нажатие приводит к изменению внутреннего состояния компонента MagicWand, который создаётся с помощью такого хука:`,
    code2: {
      lang: "javascript",
      value: `// Хук состояния внутри WandInfo
const [rating, setRating] = React.useState(0);
// function handleLike
// function handleDislike`,
    },
    text3: `Также внутри компонента MagicWand находится хук эффекта, который как раз выполняет запрос в API за данными после каждой отрисовки:`,
    code3: `React.useEffect(() => {
  fetchMagicWandById(selectedId);
});`,
    text4: `Здесь есть маленькая проблема: компонент MagicWand будет перерисован и при изменении выбранной палочки, и при установке лайка или дизлайка, а значит во втором случае у нас будут лишние обращения к API. Для того, чтобы этот эффект вызывался только в первом случае, для него нужно указать зависимость: переменную, изменение которой должно провоцировать выполнение хука.
Если у хука не указаны зависимости, он будет вызван после каждого рендера. Если зависимости указаны — только если хотя бы одна из них изменилась с момента прошлого вызова. Зависимости передаются вторым аргументов в функцию React.useEffect — в виде массива с переменными. Это могут быть как пропсы, так и переменные внутреннего состояния текущего компонента. В нашем случае нас интересует пропс selectedId, поэтому нужный нам код будет выглядеть так:`,
    code4: `React.useEffect(() => {
  fetchMagicWandById(selectedId);
}, [selectedId]);`,
    text5: `Теперь это эффект с зависимостью, который запоминает последнее значение selectedId и вызывает переданный в него колбэк, только когда это значение поменяется. Теперь пользователь может сколько угодно раз подряд ставить лайки и дизлайки одной и той же волшебной палочке, вызывая перерисовку компонента, — лишних запросов к API не будет.
Бывает, что зависимостей больше одной — тогда в массиве будет несколько элементов.`,
    code5: `React.useEffect(() => {

  if (!isFetched) {
    fetchMagicWandById(selectedId);
  }
}, [isFetched, selectedId]);`,
    text6: `Когда к эффекту добавляется хотя бы одна зависимость, появляется важное правило: теперь все используемые в его колбэке пропсы и стейт-переменные должны быть перечислены в массиве его зависимостей. Объяснение этого правила довольно сложное и основывается на понятии замыкания, поэтому для начала его лучше просто запомнить.`,
    subtitle: `Эффект при монтировании`,
    text7: `Из концепции массива зависимостей вытекает интересное свойство: если передать пустой массив, то такой эффект будет вызван всего один раз.
Это логично: ведь если ни одной зависимости нет, то нечему и измениться, чтобы этот эффект спровоцировался повторно.
Таким образом, мы можем задать колбэк, который будет вызван всего один раз при монтировании компонента — прямой аналог componentDidMount из классовых компонетов. Более того, если из такого эффекта мы вернём колбэк-очистку, она будет также вызвана всего один раз, при размонтировании компонента — аналог componentWillUnmount.
Хук с пустым массивом зависимостей не стоит путать с обычным хуком, которым мы пользовались ранее — совсем без второго аргумента — такой хук всегда будет вызываться после каждого рендера.
Зависимости поначалу могут показаться довольно непростой темой, но к ним быстро привыкаешь, и пользоваться ими становится комфортно.`,
  },
  {
    title: `Установка React Router`,
    text1: `В этом уроке вы научитесь устанавливать и настраивать React Router в проекте. Создадим новый проект с помощью CRA.
Для этого в командной строке введём npm init react-app emoji-critic. Это будет приложение для любителей эмодзи:
После установки внутри src/ создадим папку с именем components/ и переместим в неё App.js со всеми сопутствующими файлами.
Также удалим из проекта всё, что было добавлено по умолчанию. В итоге App.js должен выглядеть так:`,
    code1: `// App.js
import React from 'react';
import Header from './Header';
import './App.css';
function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}
export default App;`,
    text2: `Внутри директории components/ создадим новый компонент с именем Dashboard. Это будет простой функциональный компонент, который возвращает JSX с текстом:`,
    code2: `// Dashboard.js
import React from 'react';
import './Dashboard.css';
function Dashboard () {
  return (
    <div className="dashboard">
      <h2>Emoji Critic — всё об эмодзи</h2>
      <p>
        #1 среди авторов обзоров на эмодзи в этом году!
      </p>
    </div>
  )
}
export default Dashboard;`,
    subtitle1: `Добавление React Router в проект`,
    text3: `Чтобы установить библиотеку React Router в проект на «Реакте», откройте главную директорию проекта и введите npm i --save react-router-dom.
Эта версия React Router предназначена для маршрутизации в браузерных приложениях. Первое, с чем вы столкнётесь при работе с React Router — с компонентом Route. Это главный строительный блок. Чтобы он работал правильно, нужно убедиться, что каждый Route вложен в компонент BrowserRouter. Компонент BrowserRouter отслеживает историю навигации в процессе работы React Router. Когда пользователь переходит назад или вперёд в браузере, BrowserRouter синхронизирует отображаемый контент.
В файле index.js, который расположен внутри каталога src/, обернём основной компонент App в компонент BrowserRouter:`,
    code3: `// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // импортируем BrowserRouter
import App from './components/App';
import './index.css';
// теперь обернём компонент App в BrowserRouter
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);`,
    subtitle2: `Создаём первый компонент Route`,
    text4: `Приложение должно отображать компонент Dashboard, когда URL в адресной строке указывает на localhost:3000/.
Для этого импортируем компоненты Route и Dashboard в файл App.js. Внутрь Route вложим компонент, который будет отрисовываться при каждом обращении к URL-пути, передаваемому пропсу path:`,
    code4: `// App.js
import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Header from './Header';
import './App.css';
function App() {
  return (
    <div className="App">
      <Header />
      <Route path="/">
        <Dashboard />
      </Route>
    </div>
  );
}
export default App;`,
    text5: `В нашем примере Dashboard будет отрисован при каждом обращении к корневому URL /.
Убедимся, что всё работает. Запустите проект командой npm run start и откройте в браузере localhost:3000/. Вы увидите, что заголовок Emoji Critic отображается между тегами <h1> правильно. А Dashboard отрисован именно там, где мы разместили компонент Route в JSX-коде.`,
    subtitle3: `Всё хорошо, что хорошо маршрутизируется`,
    text6: `Чтобы использовать React Router в проекте, нужно импортировать необходимые компоненты. Если хотите добавить Route в приложение, убедитесь, что он обёрнут в компонент BrowserRouter. Компонент Route устанавливает связь между путём, который указан в пропсе path, и URL-адресом, который в данный момент используется браузером. При каждом обращении к этому URL будет отображаться компонент внутри маршрута.`,
  },
  {
    title: `Работа с несколькими маршрутами`,
    text1: `Сейчас приложение содержит три маршрута:`,
    code1: {
      lang: "javascript",
      value: `// маршруты внутри файла App.js
<Route path="/">
  <Dashboard />
</Route>
<Route path="/reviews">
  <Reviews />
</Route>
<Route path="/about-me">
  <AboutMe />
</Route>`,
    },
    text2: `Когда мы переходим по localhost:3000/, отображается компонент Dashboard — так и должно быть. Но есть проблема: если указать адрес localhost:3000/review, помимо компонента Reviews, на странице отобразится Dashboard, который относится к маршруту /. То же самое случится, если перейти по ссылке localhost:3000/about-me.
Это происходит потому, что значение пропса path сравнивается с путём в URL не по принципу равенства, а по принципу «начинается с».
Иными словами маршрут с путём / будет активным для любого пути в URL, так как любой путь всегда начинается с /. Даже если перейти поlocalhost:3000/french-fries, всё равно отобразится Dashboard, ведь в названии маршрута тоже стоит /.
Простое решение — добавить пропс exact к первому маршруту:`,
    code2: {
      lang: "javascript",
      value: `<Route exact path="/">
  <Dashboard />
</Route>`,
    },
    text3: `Теперь компонент Dashboard будет отображаться только при переходе по маршруту /. Пропс exact гарантирует, что значение пропса path будет сравниваться с путём в URL по принципу полного равенства.`,
    subtitle1: `Компонент Switch`,
    text4: `Попробуем решить задачу другим способом — применим компонент Switch. Если разместить несколько компонентов Route внутри Switch, отрисуется только один из них. Импортируем этот компонент и обернём в него маршруты:`,
    code3: `// App.js
import React from 'react';
import { Route, Switch } from 'react-router-dom'; // импортируем Switch
import Dashboard from './Dashboard';
import Header from './Header';
import Reviews from './Reviews';
import AboutMe from './AboutMe';
import './App.css';
function App() {
return (
  <div className="App">
    <Header />
    <Switch>
      <Route path="/">
        <Dashboard />
      </Route>
      <Route path="/reviews">
        <Reviews />
      </Route>
      <Route path="/about-me">
        <AboutMe />
      </Route>
    </Switch>
  </div>
  );
}
export default App;`,
    text5: `Всё на своих местах.
Перейдя по localhost:3000/, увидим только Dashboard. Отлично. А вот если мы перейдём по localhost:3000/reviews или localhost:3000/about-me, компонент Dashboard снова отрисуется на странице. Почему?
Компонент Switch проверяет маршруты сверху вниз и рендерит самый первый из подходящих. Поскольку оба пути /reviews и /about-me всё так же начинаются с /, компонент Switch возвращает Dashboard.
Компонент Switch не решает нашу проблему, но решает свою задачу — за раз отображает один компонент.`,
    subtitle2: `Пропс exact`,
    text6: `Если / — первый маршрут внутри Switch, нужно просто добавить ему пропс exact:`,
    code4: {
      lang: "javascript",
      value: `// изменим компонент Route в файле App.js
<Route exact path="/">
  <Dashboard />
</Route>
Теперь все ссылки отображаются корректно.`,
    },
    subtitle3: `Долгий, странный путь`,
    text7: `В этом уроке вы познакомились с принципом работы компонента Switch. Теперь разберём случай, когда его нужно использовать.
Например, с его помощью можно определить приоритет маршрутов. Даже если несколько маршрутов «подходит» под текущий URL, отрисуется только первый из них:`,
    code5: {
      lang: "javascript",
      value: `// JSX приложения онлайн-магазина
<NavBar />
<MainContent />
<SideBar>
  <Switch>
    <Route path="/sales">
      <RecommendedProducts />
    </Route>
    <Route path="/">
      <ShoppingCart />
    </Route>
  </Switch>
</SideBar>
<Footer />`,
    },
    text8: `Компонент Switch применяют в тех случаях, когда нужно отрисовать только один маршрут.`,
  },
  {
    title: `Навигация и ссылки`,
    text1: `Надо признать, что принуждать пользователей вводить вручную URL-адрес, чтобы перемещаться по приложению, — не самое мудрое решение.
Вы уже знаете о теге <a> и о том, как его можно использовать, чтобы помочь пользователям находить нужную информацию.
React Router предлагает свой набор инструментов навигации, и в этом уроке мы их рассмотрим.`,
    subtitle1: `Недостающая ссылка`,
    text2: `React Router предоставляет компонент Link, который выполняет операцию, аналогичную знакомым тегам <a> из стандартного HTML.
В действительности Link — это тег <a> с дополнительными характеристиками для работы с React Router.
Импортируем компонент Link из react-router-dom. Затем добавим ссылку на компонент Dashboard, чтобы пользователи могли легко просматривать все последние обзоры эмодзи:`,
    code1: `// Dashboard.js
import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
function Dashboard () {
  return (
    <div className="dashboard">
      <h2>Emoji Critic — всё об эмодзи</h2>
      <p>
        #1 среди авторов обзоров на эмодзи в 2020 году!
      </p>
      <Link to="/reviews">
        Нажмите, чтобы увидеть самые свежие ревью!
      </Link>
    </div>
  )
}
export default Dashboard;`,
    text3: `Мы добавили Link внутри JSX под тегом <p>. У компонента Link есть пропс to для описания URL, по которому следует перейти.`,
    subtitle2: `Компонент NavLink`,
    text4: `Ещё один удобный компонент для работы со ссылками в React Router — NavLink. На самом деле этот компонент практически идентичен стандартному компоненту Link, но у него есть дополнительные функции, которые полезны при создании списков и меню. Чтобы понять, как именно работает NavLink, создадим ссылку на Dashboard и рассмотрим синтаксис компонента:`,
    code2: `<NavLink to="/" activeClassName="nav__link_active">Dashboard</NavLink>`,
    text5: `Этот компонент отличается от Link тем, что у него есть пропс activeClassName. Он принимает в качестве значения селектор CSS-класса.
Указанный в activeClassName CSS-класс будет добавлен к тому элементу NavLink, маршрут которого совпадает с текущим URL в браузере.
В приведённом выше примере, если пользователь перейдёт к /, элемент ссылки получит класс nav__link_active. Так вы сможете применять собственные стили к ссылкам для текущей активной страницы. Это полезно в панели навигации, поскольку помогает пользователю проследить своё текущее местоположение в приложении.`,
    subtitle3: `NavLink в деле`,
    text6: `Создадим небольшую панель навигации, чтобы лучше понять принцип работы NavLink. Сделаем это внутри App.js:`,
    code3: `// NavBar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
function NavBar () {
  return (
    <nav className="menu">
      <NavLink exact to="/" className="menu__link">Домой</NavLink>
      <NavLink to="/reviews" className="menu__link">Обзоры эмоджи</NavLink>
      <NavLink to="/about-me" className="menu__link">Обо мне</NavLink>
    </nav>
  )
}
export default NavBar;`,
    text7: `Мы разместили три компонента NavLink в элементе <nav>. Теперь у пользователя появились ссылки в панели навигации, по которым можно быстро переходить от страницы к странице.
Воспользуемся пропсом activeClassName. Мы уже добавили пропс exact в компонент NavLink с маршрутом /. Если не добавить exact, к этой ссылке всегда будет применяться activeClassName:`,
    code4: `// NavBar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
function NavBar () {
  return (
    <nav className="menu">
      <NavLink exact to="/" activeClassName="menu__link_active" className="menu__link">Домой</NavLink>
      <NavLink to="/reviews" activeClassName="menu__link_active" className="menu__link">Обзоры эмоджи</NavLink>
      <NavLink to="/about-me" activeClassName="menu__link_active" className="menu__link">Обо мне</NavLink>
    </nav>
  )
}
export default NavBar;`,
    text8: `Осталось описать CSS-правило для класса, указанного в activeClassName. Сделаем активные ссылки внутри App.css зелёными.`,
    code5: `/* Добавим новый селектор в NavBar.css */
.menu__link_active {
  color: #437DFF;
}`,
    text9: `Теперь в приложении ссылка на текущую страницу будет зелёной.`,
    subtitle4: `Не отклоняйтесь от маршрута`,
    text10: `Вы уже научились реализовывать базовую маршрутизацию и навигацию в одностраничных приложениях. Чтобы настроить маршруты, нужно использовать BrowserRouter и Route. Можно сделать так, чтобы только один соответствующий маршрут отрисовывался с помощью компонента Switch, а с помощью exact указать, что путь должен быть точным. Также в этом уроке вы узнали, как с помощью компонентов Link и NavLink сделать удобную навигацию.`,
  },
  {
    title: `Вложенные маршруты`,
    text1: `Приложение Emoji Critic содержит четыре маршрута в файле App.js:`,
    code1: {
      lang: "javascript",
      value: `// маршруты внутри файла App.js
<Switch>
  <Route path="/">
    <Dashboard />
  </Route>
  <Route path="/reviews">
    <Reviews />
  </Route>
  <Route path="/about-me">
    <AboutMe />
  </Route>
  <Route path="/about-us">
    <AboutUs />
  </Route>
</Switch>`,
    },
    text2: `Усложним компонент AboutMe. Добавим три новых компонента: MyStory с биографией автора, Hobbies с информацией об увлечениях и Contact с контактными данными. Вы уже знаете, что в любом проекте нужно следить за структурой. Поэтому создадим папку about-me/ внутри директории components/. Переместим в неё AboutMe и три новых компонента. Теперь нужно сделать так, что пользователь мог переходить по вкладкам внутри страницы "About Me". Для этого создадим новые маршруты. В идеале, если пользователь добавит localhost:3000/about-me/my-story в закладки, а потом откроет её из закладок, он увидит страницу с отрисованным компонентом MyStory.
То же самое и с остальными добавленными компонентами. Мы можем добавить новые маршруты прямо внутри AboutMe.js:`,
    code2: `import React from 'react';
import { Route, Link } from 'react-router-dom';
import MyStory from './MyStory';
import Hobbies from './Hobbies';
import Contact from './Contact';
import './AboutMe.css';
function AboutMe () {
  return (
    <div>
      <ul className="links">
        <li>
          <Link to="/my-story">Моя история</Link>
        </li>
        <li>
          <Link to="/hobbies">Хобби</Link>
        </li>
        <li>
          <Link to="/contact">Контактная информация</Link>
        </li>
      </ul>
      <Route path="/my-story">
        <MyStory />
      </Route>
      <Route path="/hobbies">
        <Hobbies />
      </Route>
      <Route path="/contact">
        <Contact />
      </Route>
    </div>
  );
}
export default AboutMe;`,
    subtitle1: `Почти, но не совсем`,
    text3: `Дело сделано — код написан. На странице "About Me" появились ссылки. Правда, они пока декоративные и не работают.
Например, если перейти по первой ссылке, браузер откроет страницу с адресом localhost:3000/my-story. А по задумке браузер должен перенаправить нас на localhost:3000/about-me/my-story. Чтобы всё работало правильно, нужно применить хук в компонентах Link и Route.`,
    subtitle2: `Хук useRouteMatch`,
    text4: `Хук useRouteMatch позволяет узнать текущее состояние маршрута. Импортируем его из react-router-dom — так же, как другие компоненты, предоставляемые библиотекой. На следующих строках импортируем новые компоненты: MyStory, Hobbies и Contact:`,
    code3: `import React from 'react';
import './AboutMe.css';
import { Route, Link, useRouteMatch } from 'react-router-dom';
import MyStory from './MyStory';
import Hobbies from './Hobbies';
import Contact from './Contact';
function AboutMe () {
  const { path, url } = useRouteMatch();
  return (
    <div>
      <ul className="links">
        <li>
          <Link to={\`\${url}/my-story\`}>Моя история</Link>
        </li>
        <li>
          <Link to={\`\${url}/hobbies\`}>Хобби</Link>
        </li>
        <li>
          <Link to={\`\${url}/contact\`}>Контактная информация</Link>
        </li>
      </ul>
      <Route path={\`\${path}/my-story\`}>
        <MyStory />
      </Route>
      <Route path={\`\${path}/hobbies\`}>
        <Hobbies />
      </Route>
      <Route path={\`\${path}/contact\`}>
        <Contact />
      </Route>
    </div>
  )
}
export default AboutMe;`,
    text5: `Благодаря useRouteMatch мы можем получить две переменные: url и path. Переменной url мы можем создать относительную ссылку внутри компонента Link. А переменной path — относительный путь для компонентов Route. Внутри компонента AboutMe, наряду с хуком useRouteMatch, используется синтаксис деструктуризации. Хук useRouteMatch позволяет извлекать значения для url и path, которые позже присваиваются константам с такими же именами:`,
    code4: {
      lang: "javascript",
      value: `const { path, url } = useRouteMatch();`,
    },
    text6: `Изменим код компонентов Link и Route, чтобы они могли использовать относительные значения:`,
    code5: {
      lang: "javascript",
      value: `// новый JSX внутри AboutMe.js
<ul className="links">
  <li>
    <Link to={\`\${url}/my-story\`}>Моя история</Link>
  </li>
  <li>
    <Link to={\`\${url}/hobbies\`}>Хобби</Link>
  </li>
  <li>
    <Link to={\`\${url}/contact\`}>Контактная информация</Link>
  </li>
</ul>
<Route path={\`\${path}/myStory\`}>
  <MyStory />
</Route>
<Route path={\`\${path}/hobbies\`}>
  <Hobbies />
</Route>
<Route path={\`\${path}/contact\`}>
  <Contact />
</Route>`,
    },
    text7: `Теперь навигация работает корректно. С помощью хука useRouteMatch можно легко создавать вложенные маршруты. Например, внутри App.js можно переименовать путь /about-me в /information-zone. Для текущего маршрута переменные url и path динамически извлекаются с помощью useRouteMatch, поэтому все маршруты внутри компонента работают правильно. Вложенные маршруты помогают делать навигацию логичной и структурированной. Но важно настраивать маршруты так, чтобы можно было получать новые данные от API и баз данных.`,
  },
  {
    title: `Динамические маршруты`,
    text1: `Вы познакомились с основами навигации и маршрутизации внутри приложений и попрактиковались в применении инструментов React Router.
В этом уроке перейдём на новый уровень и разберём продвинутые возможности этой библиотеки. Представьте, что вам нужно разработать приложение, в котором пользователи могут создавать профили и общаться друг с другом, — такую небольшую социальную сеть.
Вы создали социальную сеть для орнитологов, и у вас уже зарегистрировались несколько пользователей. Один из них выбрал логин parrot_rescuer42 и, похоже, уже нашёл пару друзей. Но новые друзья — явление непостоянное, так и список друзей пользователя parrot_rescuer42 может меняться. Поэтому при создании маршрутов внутри приложения разработчик должен помнить о динамических данных: именах пользователей, фотографиях, идентификаторах друзей и постов.`,
    subtitle1: `Данные приложения`,
    text1: `У вас есть доступ к данным о списке друзей parrot_rescuer42 в формате JSON:`,
    code1: `"friends":[
  {
    "name":"Саша",
    "id":"0",
    "profilePicDark":"/profile-images/bill-dark.png",
    "profilePicLight":"/profile-images/bill-light.png",
    "location":"Санкт-Петербург, Россия",
    "favBirdQuote":"Красна птица пением, а человек – умением.",
    "parrotsOwned":[
      {
        "name":"Кеша",
        "favoriteToys":[
          "бубенчик",
          "бумажный бантик"
        ]
      },
      {
        "name":"Чарли",
        "favoriteToys":[
          "маленькая чашечка",
          "медвежонок"
        ]
      }
    ]
  },
  {
    "name":"Женя",
    "id":"1",
    "profilePicDark":"/profile-images/mary-dark.png",
    "profilePicLight":"/profile-images/mary-light.png",
    "location":"Владивосток, Россия",
    "favBirdQuote":"Лучше синица в руках, чем журавль в небе.",
    "parrotsOwned":[
      {
        "name":"Абрикос",
        "favoriteToys":[
          "карандал",
          "пищалка"
        ]
      }
    ]
  }
]`,
    text2: `Обычно подобные данные получают с сервера, но сейчас мы сохраним эти данные как JavaScript-объект и импортируем его в файл App.js.
Затем внутри App.js настроим новые маршруты:`,
    code2: `<Route path='/friends/0'>
  <Friend serverData={serverData} />
</Route>
<Route path='/friends/1'>
  <Friend serverData={serverData} />
</Route>`,
    text3: `У пользователя parrot_rescuer42 только два друга, поэтому работать с данными несложно. Но если parrot_rescuer42 решит обзавестись ещё друзьями, могут возникнуть сложности. Приложение совсем не масштабируемо, поскольку описанные в нём маршруты не умеют работать с динамическими данными. Поправим это с помощью React Router:`,
    code3: `// файл App.js
import React from "react";
import "./App.css";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
// импортируем нужные компоненты
import Friends from "./Friends";
import Friend from "./Friend";
import Dashboard from "./Dashboard";
import serverData from "../serverData";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="header">
          <NavLink to="/" className="header__logo">
            Parrot Friendship Society
          </NavLink>
          <nav className="menu">
            <ul className="menu__list">
              <li className="menu__list-item">
                <NavLink className="menu__link" to="/friends">
                  Друзья
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/friends">
            <Friends serverData={serverData} />
          </Route>
          <Route path="/friends/:id">
            <Friend serverData={serverData} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;`,
    text4: `Новый компонент Friends отображает набор ссылок на друзей, добавленных пользователем. А компонент Friend отвечает за отображение данных о конкретном друге. Мы передали serverData обоим компонентам как пропс. Внутри пути компонента Route стоит двоеточие : перед id:`,
    code4: `<Route path='/friends/:id'>
  <Friend serverData={serverData} />
</Route>`,
    text5: `Разберём, зачем это нужно.`,
    subtitle2: `Параметры URL`,
    text6: `Значение пропса path компонента Route может содержать переменные элемента, которые начинаются с двоеточия :. Так мы можем получить доступ к любому значению, которое находится на этом же месте в URL. Затем к этому значению можно обратиться как к переменной внутри дочернего компонента Route. Вы уже умеете передавать пропсы из родительского компонента в дочерний. Похожим образом можно передать значение из URL в компонент.`,
    code5: `<Route path='/friends/:id'>
  <Friend serverData={serverData} />
</Route>`,
    text7: `Предположим, пользователь перешёл на URL localhost:3000/friends/123.
Поскольку в маршруте стоит :, можно получить доступ к значению 123 внутри компонента Friend. Например, чтобы вывести его в JSX:`,
    code6: {
      lang: "html",
      value: `<h2>{id}</h2>`,
    },
    text8: `Параметру URL можно дать любое имя, не только :id. Назовём его favoriteParrot:`,
    code7: `<Route path='my-birds/:favoriteParrot'>
  <Friend serverData={serverData} />
</Route>`,
    text9: `Затем можно получить доступ к значению параметра внутри компонента:`,
    code8: `<p>{favoriteParrot}</p>`,
    text10: `Чтобы это работало, нужно использовать «Реакт-хук» useParams:`,
    code8: `// компонент Friend
import React from 'react';
import { useParams } from 'react-router-dom'; // импортируем хук
function Friend() {
  let { id } = useParams(); // получаем значение id
  return (
    <div>
      <h2>{id}</h2>
    </div>
  );
}
export default Friend;`,
    text11: `Мы импортировали хук useParams из react-router-dom и с помощью деструктуризации извлекли переменную id. Эта переменная будет соответствовать любому значению, которое находится на месте :id в URL. Когда страница localhost:3000/friends/i3r7d1w2w открыта, переменная id равна значению i3r7d1w2w. Это значение можно получить внутри компонента Friend.
Так мы сможем использовать значение как ключ и искать дополнительную информацию о пользователе.`,
    subtitle3: `Параметры URL на практике`,
    text12: `В приложении есть экран со списком друзей. Чтобы попасть на него, нужно перейти по маршруту /friends. Внутри этого компонента мы собираем данные о друзьях parrot_rescuer42. Применим метод map, чтобы генерировать компоненты Link для каждого друга. При этом будем использовать идентификатор друга в пропсе to:`,
    code9: `// компонент Friends
import React from 'react';
import { useParams } from 'react-router-dom'; // импортируем хук
function Friend() {
  function Friends(props) {
  let { path } = useRouteMatch();
  let { friends } = props.serverData; // достаём данные
  return (
    <div className="friends">
      <ul className="friends__list">
        {
          friends.map((friend) => {
            return (
              <li className="friend-preview" key={friend.id} >
                <Link to={\`\${path}/\${friend.id}\`}>
                  <img className="friend-preview__image" src={friend.profilePicDark} alt=""/>
                  <span className="friend-preview__name">{friend.name}</span>
                </Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}
export default Friends;`,
    text13: `Разберём эту логику на примере. Для друга с идентификатором 555 метод map создаст ссылку /friends/555. То же будет проделано для всех друзей, указанных в объекте friends. Посмотрим ещё раз на маршруты:`,
    code10: `<Switch>
  <Route exact path='/friends'>
    <Friends serverData={serverData} />
  </Route>
  <Route path='/friends/:id'>
    <Friend serverData={serverData} />
  </Route>
</Switch>`,
    text14: `Когда пользователь нажимает на ссылку с путём "/friends/:id", отрисовывается компонент Friend:`,
    code11: `// компонент Friend
import React from 'react';
import { useParams } from 'react-router-dom'; // импортируем хук
import './Friend.css';
function Friend(props) {
  let { id } = useParams(); // получаем доступ к параметру URL
  let { friends } = props.serverData; // достаём данные, используя деструктуризацию
  const friend = friends.find(f => f.id === id);
  return (
    <div className="friend">
      <div className="friend__card">
        <img className="friend__userpic" src={friend.profilePicLight} alt={friend.name}/>
        <div className="friend__details">
          <h3 className="friend__name">{friend.name}</h3>
          <p className="friend__location">Местоположение: {friend.location}</p>
          <p className="friend__quantity">Количество домашних попугаев: {friend.parrotsOwned.length}</p>
          <p className="friend__fav-quote">Любимое высказывание о птицах: "{friend.favBirdQuote}"</p>
        </div>
      </div>
    </div>
  );
}
export default Friend;`,
    text15: `Если у parrot_rescuer42 есть друг по имени Пётр с идентификатором 55, на странице friends/ автоматически сгенерируется компонент Link с ссылкой на localhost:3000/friends/55. Если пользователь перейдёт по этой ссылке внутри приложения или введёт её вручную в браузере, он увидит страницу Петра с соответствующими динамическими данными: name, location, parrotsOwned.length и favBirdQuote.
В этом примере мы использовали данные из локального файла JavaScript, но процесс почти идентичен, когда данные приходят из API.`,
  },
  {
    title: `Программная навигация`,
    text1: `Когда пользователь перемещается по экранам в приложении, за кулисами создаётся история навигации. Когда пользователь посещает новые страницы, в историю помещаются новые элементы. Через историю навигации пользователь может переходить назад и вперёд по страницам.
Именно эту функцию и выполняют кнопки «Назад» и «Вперёд» в веб-браузере. В этом уроке вы научитесь реализовывать такую функциональность и в приложении. Кроме того, сможете полностью заменить текущую запись в стеке другой записью и перенаправить пользователя на другую страницу.`,
    subtitle1: `Объект history`,
    text2: `Добавим кнопку «Назад», чтобы пользователи могли легко возвращаться на страницу со списком друзей. Для этого воспользуемся хуком useHistory. Он предоставляет несколько методов, которые помогают дополнительно контролировать навигацию пользователя.
Как и с предыдущими хуками React Router, импортируем его в файл Friend.js:`,
    code1: `// импортируем ещё один хук во Friend.js
import { useParams, useHistory } from 'react-router-dom';`,
    text3: `Теперь вызовем хук внутри функционального компонента. Для этого присвоим его константе history:`,
    code2: {
      lang: "javascript",
      value: `// функциональный компонент Friend
const history = useHistory();`,
    },
    text4: `Внутри JSX добавим кнопку <button>. Нажатие на неё вызовет метод history.goBack, который отправит пользователя на предыдущую страницу:`,
    code3: {
      lang: "javascript",
      value: `// JSX-код компонента Friend
<div className="friend__card">
  <img className="friend__userpic" src={friend.profilePicLight} alt={friend.name}/>
  <div className="friend__details">
    <h3 className="friend__name">{friend.name}</h3>
    <p className="friend__location">Местоположение: {friend.location}</p>
    <p className="friend__quantity">Количество домашних попугаев: {friend.parrotsOwned.length}</p>
    <p className="friend__fav-quote">Любимое высказывание о птицах: "{friend.favBirdQuote}"</p>
  </div>
</div>
<button className="button button_type_back" onClick={() => history.goBack()}></button>`,
    },
    text5: `Мы использовали метод history.goBack, чтобы переместить пользователя по истории навигации на предыдущую страницу. Ещё у объекта history бывают такие методы:
history.goForward — перемещает пользователя «вперёд» по навигации истории;
history.push — создаёт запись в навигации истории.
Так же как метод history.goBack похож на нажатие кнопки «Назад» в браузере, а history.goForward соответствует нажатию кнопки «Вперёд», history.push аналогичен открытию новой страницы.`,
    subtitle2: `Переадресация`,
    text6: `Компонент Redirect заменяет текущую запись в навигации истории и перенаправляет пользователя на другую страницу. Его часто используют в веб-приложениях после авторизации: например, чтобы авторизованный пользователь не мог вернуться на страницу входа.
Посмотрим, как это работает на практике: используем тернарный оператор внутри маршрута, чтобы проверить значение loggedIn и определить, вошёл ли пользователь в систему. Если да, пользователь увидит компонент своего профиля UserProfile. В противном случае Redirect отправит пользователя на экран авторизации:`,
    code4: `<Route path="/my-profile">
  {!loggedIn ? <Redirect to="/log-in" /> : <UserProfile />}
</Route>`,
    text7: `Теперь вам под силу такое приложение, в котором пользователь сможет перемещаться вперёд и назад сколько ему вздумается.
А ещё вы сумеете настроить переадресацию в случаях, когда она нужна.`,
  },
  {
    title: `Создание страницы 404`,
    text1: `Если пользователь перейдёт по ссылке, которой нет в приложении, он всё также будет видеть панель навигации, но ничего больше не отрисуется. Хороший тон –– проинформировать пользователя, что он перешёл на неопределённый маршрут.
Для этого с помощью React Router сделаем маршрут «Страница не найдена».
Создадим новый компонент PageNotFound и поместим его в директорию components/:`,
    code1: `import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';
import Bye from '../images/404.svg';
function PageNotFound () {
  return (
    <div className="not-found">
      <h3 className="not-found__title">
        <span>404</span> - Страница не найдена
      </h3>
      <img className="not-found__image" src={Bye} alt=""/>
      <p className="not-found__text">
        Ой, здесь ничего нет
      </p>
      <Link className="button button_type_to-main" to="/">Назад</Link>
    </div>
  )
}
export default PageNotFound;`,
    text2: `Импортируем новый компонент в корневой компонент App приложения Emoji Critic.
Внутри App уже создано несколько компонентов Route в Switch:`,
    code2: {
      lang: "javascript",
      value: `// маршруты внутри файла App.js
<Switch>
  <Route path="/">
    <Dashboard />
  </Route>
  <Route path="/reviews">
    <Reviews />
  </Route>
  <Route path="/about-me">
    <AboutMe />
  </Route>
  <Route path="/about-us">
    <AboutUs />
  </Route>
</Switch>`,
    },
    text3: `Важен порядок компонентов Route внутри Switch: только первый совпадающий маршрут будет отрисован. Когда Switch обнаружит, что URL браузера не совпадает с /, /reviews или /about-me, то отрисует компонент PageNotFound. Для этого в конце Switch добавим ещё один компонент Route со значением path="*". Символ * обозначает «любой».`,
    code3: {
      lang: "javascript",
      value: `// маршруты внутри файла App.js
<Switch>
  <Route path="/">
    <Dashboard />
  </Route>
  <Route path="/reviews">
    <Reviews />
  </Route>
  <Route path="/about-me">
    <AboutMe />
  </Route>
  <Route path="/about-us">
    <AboutUs />
  </Route>
  <Route path="*">
    <PageNotFound />
  </Route>
</Switch>`,
    },
    text4: `Теперь, если запустить проект на локальном сервере и перейти на несуществующий маршрут, например, localhost:3000/zdesnichegonet,
приложение отрисует страницу 404.
`,
    image1: "image19.png",
  },
];
