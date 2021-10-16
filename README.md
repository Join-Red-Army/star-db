# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## React Api
### Context api
Специальное хранилище данных, которое позволяет не пробрасывать эти данные через пропсы от вышестоящих в иерархии компонентов к нижестоящим, которые эти данные применяют.

Контекст нужен для того, чтобы решить проблему «глобальных» данных.
Вместо того, чтобы передавать props через все слои приложения, данные можно передавать через контекст.
С помощью контекста можно сделать так, чтобы компоненты не создавали объекты сервиса, а получали этот один объект.

Создаются 2 компонента:
Provider – в котором в свойстве value указываются данные, которые надо протащить. В контейнер Provider оборачиваются компоненты, которым может понадобиться инфа из value. 
Consumer – используется для получения данных. Должен возвращать функцию. Эта функция первым параметром получает объект со всеми данными из Provider.

```js
// Создание файла-компонента для контекста
React.createContext();
// Значение по умолчанию, если consumer не сможет найти никакой контекст.
// Возвращает пару: Provider и Consumer.

const {
  Provider: SwapiServiceProvider, 
  Consumer: SwapiServiceConsumer 
} = React.createContext();

// Использование
//Provider ипортируется в вышестроящий компонент (app.js) и оборачивает нижестоящие компоненты, получает value={}, который надо в них протащить.

<SwapiServiceProvider value = {this.swapiService}>
  <el>
    <el>
    <details>
  <el>
</SwapiServiceProvider>
```


## Некоторые паттерны React

### Использование функций для передачи свойств
Есть есть несколько похожих компонентов, которые отличаются между собой данными внутри (в учебном проекте это были списки персонажей, кораблей и планет), данные в эти компоненты надо передавать через функции, которые инкапсулируют получение данных.
Таким образом, компонент сможет принимать любые данные и будет работать только на их отрисовку.
В этом примере функции делают сетевые запросы и передают в компонент готовые списки с данными.

```js
<ItemList 
  onItemSelected={this.onPersonSelected} 
  getData={this.swapiService.getAllStarships}
/>

<ItemList 
  onItemSelected={this.onPersonSelected} 
  getData={this.swapiService.getAllPeople}
/>
```

### Рендер-функция
В props компонета может передаваться функция, которая занимается рендерингом части или всего этого компонента. Такая функция обычно возвращает строку или React-элемент.
В примере ниже renderItem решает, как именно будет рендерится элемент.

```js
<div className="col-md-6">
  <ItemList 
    onItemSelected={this.onPersonSelected} 
    getData={this.swapiService.getAllPlanets}
    renderItem={(item) => (<span>{item.name} <button>!</button> </span>)} />
</div>

// простой пример
<Card
  renderBody = { () => <p>hello</p> }
/>
```


### Свойства-элементы
Поскольку в качестве свойств можно передавать что угодно, в элемент можно передавать другие react-элементы, чтобы избавиться от большого и запутанного кода. 
Например, создать элемент Row, состоящий из 2-х колонок, и в качестве свойств передавать контент этих двух колонок. 
Это не паттерн, а просто удобная штука. 

```js
<Row left={itemList} right={personDetails} />
```

Таким же образом можно создавать элементы, которые будут выбирать, что рендерить в зависимости от условий: загрузка, ошибка и т.д.



### HOC - компоненты высшего порядка
Это функции-обёртки. Берут на себя обязанности, о котрых не нужно заботиться внутреннему компоненту. 

Можно сказать, что обёртка занимается менеджментом данных. В неё можно передавать любой компонент, для которого она выполняет рутинные операции, а компонент будет только отображать данные. В неё выносится вся логика, котора была в оригинальном компоненте: state, componentDidMount, спиннер.

Раньше оригинальный компонент получал данные из state. Поскольку state теперь находится в компоненте-обёртке, теперь он будет получать данные из props.

```JS 
const hoc = (Wrapper) => {
  return class extends Component {
    state {…}
    componentDidMount() {…}
    getData() {…}

    render() {
      const { data } = this.state;
      if (!data) return <Spinner />
      return <Wrapper {...this.props} />
    }
  }
}

const MyWrappedComponent = hoc(InnerComponent);
```
