/**
 * @file
 * Tag component.
 */

import React, { Component } from 'react';

class Tag extends Component {

  render () {
    return (
      <span className="btn btn-outlined btn-sm btn-primary" style={{marginRight: '2px'}}>
        { this.props.name }
      </span>
    );
  }

}

export default Tag;
