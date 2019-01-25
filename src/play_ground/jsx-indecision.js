console.log('app is running');

const app = {
    title: 'Welcome to Indecision App',
    subtitle: 'Let us handle your options..',
    options: []
};
const appRoot = document.getElementById('app');

const onFormSubmit = (e) => {
    e.preventDefault();
    const option = e.target.elements.option.value;
    if(option) {
        app.options.push(option);
        e.target.elements.option.value = '';
        renderTemplate();
    }
};

const pickRandomOption = () => {
    const randomIndex = Math.floor(Math.random()*app.options.length);
    const option = app.options[randomIndex];
    alert(option);
};

const removeAll = () => {
    app.options = [];
    renderTemplate();
};

const renderTemplate = () => {
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? "Your options" : "no options"}</p>
            <button disabled={app.options.length == 0} onClick={pickRandomOption}>Pick an option!</button>
            <button disabled={app.options.length == 0} onClick={removeAll}>Remove all</button>
            <ol>{app.options.map((option) => <li key={option}>{option}</li>)}</ol>
            <form onSubmit={onFormSubmit}>
                <input type='text' name='option' />
                <button>Add option</button>
            </form>
        </div>
    );
    ReactDOM.render(template, appRoot);
};

renderTemplate();