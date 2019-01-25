console.log('Indecision App !!');

class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemoveOptions = this.handleRemoveOptions.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handlePickOption = this.handlePickOption.bind(this);
        this.handleRemoveOption = this.handleRemoveOption.bind(this);
        this.state = {
            options: []
        };
    }
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if (options) {
                this.setState(() => ({ options }));
            }
        }
        catch (e) {
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length != this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }
    handlePickOption() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        alert(this.state.options[randomNum]);
    }
    handleRemoveOptions() {
        this.setState(() => ({ options: [] }));
    }
    handleRemoveOption(optionText) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionText !== option)
        }));
    }
    handleAddOption(option) {
        if (!option) {
            return 'Enter a valid option!';
        }
        if (this.state.options.indexOf(option) > -1) {
            return 'Option already exists!';
        }
        this.setState((prevState) => ({ options: prevState.options.concat(option) }));
    }
    render() {
        const subtitle = 'Let us handle your options..'
        return (
            <div>
                <Header subtitle={subtitle} />
                <Action
                    hasOptions={this.state.options.length > 0}
                    pickOption={this.handlePickOption}
                />
                <Options
                    hasOptions={this.state.options.length > 0}
                    removeOptions={this.handleRemoveOptions}
                    options={this.state.options}
                    removeOption={this.handleRemoveOption}
                />
                <AddOption handleAddOption={this.handleAddOption} />
            </div>
        );
    }
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    );
};
Header.defaultProps = {
    title: 'Indecision App'
};

const Action = (props) => {
    return (
        <div>
            <button
                disabled={!props.hasOptions}
                onClick={props.pickOption}
            >
                Pick One!
            </button>
        </div>
    );
};

const Options = (props) => {
    return (
        <div>
            <button
                disabled={!props.hasOptions}
                onClick={props.removeOptions}
            >
                Remove All
            </button>
            {props.options.map((option) => (
                <Option
                    key={option}
                    option={option}
                    removeOption={props.removeOption}
                />
            ))}
        </div>
    );
};

const Option = (props) => {
    return (
        <div>
            {props.option}
            <button onClick={() => props.removeOption(props.option)}>
                X
            </button>
        </div>
    );
};

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.addOption = this.addOption.bind(this);
        this.state = {
            error: undefined
        };
    }
    addOption(e) {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
        this.setState(() => ({ error }));
        if (!error) {
            e.target.elements.option.value = '';
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.addOption}>
                    <input type='text' name='option' />
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));