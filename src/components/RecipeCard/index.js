/**
 * @file
 * Recipe card component.
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Tag from '../Tags';

class RecipeCard extends Component {

  constructor () {
    super();
    this.state = {image: null, tags: []}
  }

  componentDidMount () {
    this.fetchImage();
    this.fetchTags();
  }

  fetchImage () {
    if (this.props.field_image) {
      fetch(this.props.field_image.links.related)
        .then((res) => res.json())
        .then((data) => {
          this.setState({image: this.props.url + data.data.attributes.url})
        })
    }
  }

  fetchTags () {
    if (this.props.field_tags) {
      fetch(this.props.field_tags.links.related)
        .then((res) => res.json())
        .then((data) => {
          this.setState({tags: this.state.tags.concat(data.data)})
        })
        .catch((err) => console.log(err))
    }
  }

  render () {
    let tags = this.state.tags.map((tag, idx) => (
      <Tag key={idx} {...tag.attributes} />
    ));

    return (
      <div className="col-sm-3 col-xs-6">
        <div className="post">
          <div className="post-img-content"><img src={ this.state.image } alt={this.props.title} style={{maxHeight: "300px"}}/></div>
          <div className="content">
            <h2 className="post-title"><Link to={"/recipe/" + this.props.id }>{ this.props.title }</Link></h2>
            <div className="post-tags">{ tags }</div>
          </div>
        </div>
      </div>
    )
  }
}

export default RecipeCard;
