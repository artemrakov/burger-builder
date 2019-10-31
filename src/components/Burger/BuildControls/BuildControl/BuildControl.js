import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button onClick={props.remove(props.type)} className={classes.Less}>Less</button>
    <button onClick={props.add(props.type)} className={classes.More}>More</button>
  </div>
);

export default buildControl;
