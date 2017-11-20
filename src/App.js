/**
 * @file
 * Main application entry point.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'

import Home from './components/Home';
import Nav from './components/Nav';
import RecipeSingle from './components/RecipeSingle';

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div className="recipe-application">
        <Nav />
        <div className="container">
          <Route exact path="/" component={Home} />
          <Route path="/recipe/:id" render={props => <RecipeSingle {...props.match.params} {...props} /> } />
        </div>
      </div>
    </Router>
  </Provider>
)

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App;
