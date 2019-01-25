console.log('Toggler App !!');

class Toggler extends React.Component {
    constructor(props) {
        super(props);
        this.toggler = this.toggler.bind(this);
        this.state = {
            toggle: false
        };
    }
    toggler() {
        this.setState((prevState) => {
            return {
                toggle: !prevState.toggle
            };
        });
    }
    render() {
        return (
            <div>
                <h1>The Toggler</h1>
                <button onClick={this.toggler}>{this.state.toggle ? 'Hide Details' : 'Show Details'}</button>
                {this.state.toggle && <p>Here are your details!</p>}
            </div>
        );
    }
}
ReactDOM.render(<Toggler />, document.getElementById('app'));
