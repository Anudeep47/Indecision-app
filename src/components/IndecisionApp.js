import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };
    handleClearOption = () => {
        this.setState(() => ({ selectedOption: undefined }));
    };
    handlePickOption = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        this.setState(() => ({ selectedOption: this.state.options[randomNum] }));
    };
    handleRemoveOptions = () => {
        this.setState(() => ({ options: [] }));
    };
    handleRemoveOption = (optionText) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionText !== option)
        }));
    };
    handleAddOption = (option) => {
        if (!option) {
            return 'Enter a valid option!';
        }
        if (this.state.options.indexOf(option) > -1) {
            return 'Option already exists!';
        }
        this.setState((prevState) => ({ options: prevState.options.concat(option) }));
    };
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
    render() {
        const subtitle = 'Let me handle your options..'
        return (
            <div>
                <Header subtitle={subtitle} />
                <div className="container">
                    <Action
                        hasOptions={this.state.options.length > 0}
                        pickOption={this.handlePickOption}
                    />
                    <div className="widget"> 
                        <Options
                            hasOptions={this.state.options.length > 0}
                            removeOptions={this.handleRemoveOptions}
                            options={this.state.options}
                            removeOption={this.handleRemoveOption}
                        />
                        <AddOption handleAddOption={this.handleAddOption} />
                    </div>
                </div>
                <OptionModal
                    clearOption={this.handleClearOption}
                    selectedOption={this.state.selectedOption}
                />
            </div>
        );
    }
}
