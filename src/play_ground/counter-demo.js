console.log('Counter App !!');

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.addOne = this.addOne.bind(this);
        this.subtractOne = this.subtractOne.bind(this);
        this.resetCount = this.resetCount.bind(this);
        this.state = {
            count: 0
        };
    }
    componentDidMount() {
        const count = parseInt(localStorage.getItem('count'));
        if (count) {
            this.setState(() => ({ count }));
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.count != this.state.count) {
            localStorage.setItem('count', this.state.count);
        }
    }
    addOne() {
        this.setState((prevState) => {
            return {
                count: prevState.count + 1
            };
        });
    }
    subtractOne() {
        this.setState((prevState) => {
            return {
                count: prevState.count - 1
            };
        });
    }
    resetCount() {
        this.setState(() => {
            return {
                count: 0
            };
        });
    }
    render() {
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.addOne}>+1</button>
                <button onClick={this.subtractOne}>-1</button>
                <button onClick={this.resetCount}>reset</button>
            </div>
        );
    }
}
ReactDOM.render(<Counter />, document.getElementById('app'));
