import React from 'react';
import Option from './Option';

const Options = (props) => (
    <div>
        <div className="widget-header" >
            <h3 className="widget-header__title">Your Options</h3>
            <button
                className="button button--link"
                disabled={!props.hasOptions}
                onClick={props.removeOptions}
            >
                Remove All
            </button>
        </div>
        {props.options.length == 0 && <p className="widget__message">Please add an option!</p>}
        {props.options.map((option, index) => (
            <Option
                key={option}
                option={option}
                index={index+1}
                removeOption={props.removeOption}
            />
        ))}
    </div>
);

export default Options;