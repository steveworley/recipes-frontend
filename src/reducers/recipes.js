/**
 * @file
 * Recipe reducers.
 */

import {
  REQUEST_ALL,
  RECEIVE_ALL 
} from '../actions';

const initialState = {
  type: REQUEST_ALL,
  recipes: []
}

const recipes = (state = initialState, action) => {
  switch (action.type) {

    case REQUEST_ALL:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })

    case RECEIVE_ALL:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        recipes: action.recipes,
        lastUpdated: action.receivedAt
      })

    default:
      return state;
  }
}

export default recipes;
