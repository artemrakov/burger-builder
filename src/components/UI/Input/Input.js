import React from 'react';
import classes from './Input.module.css';

const inputType = (props) => {
  switch(props.elementType) {
    case('input'):
      return (
        <input
          {...props.elementConfig}
          className={classes.InputElement}
          value={props.value}
          onChange={props.changed}
        />
      );
    case('textarea'):
      return (
        <textarea
          {...props.elementConfig}
          className={classes.InputElement}
          value={props.value}
          onChange={props.changed}
        />
      );
    case('select'):
      return (
        <select
          className={classes.InputElement}
          value={props.value}
          onChange={props.changed}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
    default:
      return (
        <input
          {...props.elementConfig}
          className={classes.InputElement}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
}

const input = (props) => {
  const inputElement = inputType(props);

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
}

export default input;
