/**
 * @file
 * List all recipes.
 */

import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from '../RecipeCard';

const RecipeList = ({ recipes, onRecipeClick }) => (
  <div className="row">
    {recipes.map(recipe => (
      <RecipeCard key={recipe.nid} url="http://recipe.steveworley.xyz" {...recipe} onClick={ () => onRecipeClick(recipe.nid) } />
    ))}
  </div>
)

RecipeList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      nid: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    })
  ),
  onRecipeClick: PropTypes.func.isRequired
}

export default RecipeList
