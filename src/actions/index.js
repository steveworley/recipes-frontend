/**
 * @file
 * Recipe actions.
 */

export const REQUEST_RECIPE = 'REQUEST_RECIPE';
export const RECIEVE_RECIPE = 'RECIEVE_RECIPE';
export const REQUEST_ALL = 'REQUEST_ALL';
export const RECEIVE_ALL = 'RECEIVE_ALL';
export const SELECT_RECIPE = 'SELECT_RECIPE';
export const INVALIDATE_RECIPE = 'INVALIDATE_RECIPE';
export const FETCH_ERROR = 'FETCH_ERROR';

export function selectRecipe(recipe) {
  return {
    type: SELECT_RECIPE,
    recipe
  }
}

export function invalidateRecipe(recipe) {
  return {
    type: INVALIDATE_RECIPE,
    recipe
  }
}

export function requestRecipe(recipe) {
  return {
    type: REQUEST_RECIPE,
    recipe
  }
}

export function receiveRecipe(recipe, json) {
  return {
    type: RECIEVE_RECIPE,
    recipe: Object.assign(json.data.attributes, json.data.relationships, {id: json.data.id}),
    receivedAt: Date.now()
  }
}

export function fetchRecipe(state, recipe) {
  return dispatch => {
    dispatch(requestRecipe())
    return fetch('http://recipe.steveworley.xyz/jsonapi/node/recipe/' + recipe)
      .then(response => response.json())
      .then(json => dispatch(receiveRecipe(json)))
      .catch(error => dispatch(errorHandler(error)))
  }
}

export function requestRecipes() {
  return { type: REQUEST_ALL }
}

/**
 * Return the recipe state.
 *
 * @param {object} json
 *   JSON response from the JSON API endpoint.
 *
 * @return {object}
 *   Updated state object.
 */
export function receiveRecipes(json) {
  return {
    type: RECEIVE_ALL,
    recipes: Array.from(json.data, i => Object.assign(i.attributes, i.relationships, {id: i.id})),
    receivedAt: Date.now()
  }
}

export function errorHandler(error) {
  return {
    type: FETCH_ERROR,
    error: error
  }
}

/**
 * Fetch all recipes action.
 *
 * @param  {object} state
 *   The state object.
 *
 * @return {promise}
 *   The promise that is resolved after the ajax request.
 */
export function fetchRecipes(state) {
  return dispatch => {
    dispatch(requestRecipes())
    return fetch('http://recipe.steveworley.xyz/jsonapi/node/recipe')
      .then(response => response.json())
      .then(json => dispatch(receiveRecipes(json)))
      .catch(error => dispatch(errorHandler(error)))
  }
}
