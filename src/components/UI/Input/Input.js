import React from 'react';
import cn from 'classnames';
import classes from './Input.module.css';

const inputType = (props) => {
  const inputClasses = cn({
    [classes.InputElement]: true,
    [classes.Invalid]: props.invalid && props.shouldValidate && props.touched
  });

  switch(props.elementType) {
    case('input'):
      return (
        <input
          {...props.elementConfig}
          className={inputClasses}
          value={props.value}
          onChange={props.changed}
        />
      );
    case('textarea'):
      return (
        <textarea
          {...props.elementConfig}
          className={inputClasses}
          value={props.value}
          onChange={props.changed}
        />
      );
    case('select'):
      return (
        <select
          className={inputClasses}
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
          className={inputClasses}
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
