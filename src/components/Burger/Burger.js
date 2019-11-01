import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  const transformIngredients = Object.keys(props.ingredients)
                                     .reduce((acc, key) => [...acc, ...Array(props.ingredients[key]).fill(key)], [])
                                     .map((key, i) => <BurgerIngredient key={key + i} type={key} />)
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformIngredients.length === 0 && <p> Please start adding ingredients </p>}
      {transformIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;
