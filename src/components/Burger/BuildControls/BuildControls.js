import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    {controls.map(ctrl => <BuildControl add={props.add} remove={props.remove} key={ctrl.label}  type={ctrl.type} label={ctrl.label} />)}
  </div>
);

export default buildControls;
