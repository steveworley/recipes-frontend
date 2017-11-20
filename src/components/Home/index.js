/**
 * @file
 * Home component.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

// Recipe actions.
import { fetchRecipes } from '../../actions';

import RecipeList from '../RecipeList';

class Home extends Component {

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch(fetchRecipes());
  }

  render () {
    const { recipes } = this.props;

    return (
      <div>
        <div className="center gap">
          <div className="gap"></div>
          <h2 className="main-title">What are we doing for dinner?</h2>
          <hr/>
        </div>
        <RecipeList recipes={ recipes } onRecipeClick={ (id) => { console.log(id) }}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { recipes } = state;
  return recipes;
}

export default connect(mapStateToProps)(Home);
