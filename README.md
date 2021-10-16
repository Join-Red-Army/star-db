# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Некоторые паттерны React

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
