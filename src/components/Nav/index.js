/**
 * @file
 * Navigation component.
 */

import React from 'react';
import { Link } from 'react-router-dom';

export default (state) => (
  <nav className="navbar navbar-expand-lg navbar-inverse">
    <div className="container">
      <div className="collapse navbar-collapse" id="navbar">
        <Link to="/" className="navbar-brand">Recipes</Link>
        <ul className="navbar-nav ml-auto">
        </ul>
      </div>
    </div>
  </nav>
)
