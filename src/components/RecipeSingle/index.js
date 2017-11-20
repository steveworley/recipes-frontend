/**
 * @file
 * A single recipe.
 */

import React, { Component } from 'react';
import Tag from '../Tags';

class RecipeSingle extends Component {

  constructor () {
    super();
    this.state = {
      title: null,
      field_steps: [],
      ingredients: [],
      body: { value: null },
      image: null,
      tags: [],
      created: 0
    };
  }

  componentDidMount () {
    fetch('http://recipe.steveworley.xyz/jsonapi/node/recipe/' + this.props.id)
      .then((res) => res.json())
      .then((data) => {
        return new Promise((resolve, reject) => {
          resolve(Object.assign(data.data.attributes, data.data.relationships, {id: data.data.id}));
        });
      })
      .then((recipe) => {
        this.setState(recipe)
        this.fetchImage();
        this.fetchTags();
        this.fetchIngredients();
      })
      .catch((err) => console.log(err));
  }

  fetchImage () {
    if (this.state.field_image) {
      fetch(this.state.field_image.links.related)
        .then((res) => res.json())
        .then((data) => {
          this.setState({image: 'http://recipe.steveworley.xyz' + data.data.attributes.url})
        })
    }
  }

  fetchTags () {
    if (this.state.field_tags) {
      fetch(this.state.field_tags.links.related)
        .then((res) => res.json())
        .then((data) => {
          this.setState({tags: this.state.tags.concat(data.data)})
        })
        .catch((err) => console.log(err))
    }
  }

  fetchIngredients () {
    fetch('http://recipe.steveworley.xyz/api/recipe/' + this.state.nid + '/ingredients')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ingredients: data})
      })
      .catch((err) => console.log(err));
  }

  render () {
    let steps = this.state.field_steps.map((step, idx) => (
      <div className="step-content" key={idx}>
        <p style={{fontWeight: 'bold'}}>Step {idx+1}</p>
        <div className="step-content--step" dangerouslySetInnerHTML={{__html: step.value}}></div>
      </div>
    ));

    let ingredients = this.state.ingredients.map((ingredient, idx) => (
      <li key={idx}>{ingredient.field_amount} {ingredient.field_item}</li>
    ));

    let tags = this.state.tags.map((tag, idx) => (
      <Tag key={idx} {...tag.attributes} />
    ));

    let created = new Date(this.state.created * 1000);

    return (
      <div>
        <div className="row">
          <div className="post col-sm-6">
            <div className="center">
              <div className="gap"></div>
              <h2 className="main-title">{this.state.title}</h2>
              <hr/>
            </div>
            <div className="author">
              <i className="fa fa-clock-o"></i>
              <time dateTime={created.toDateString()}> { created.toDateString() }</time>
            </div>
              <div className="content-body" dangerouslySetInnerHTML={{ __html: this.state.body.value }}></div>
              { tags }
          </div>
          <div className="col-sm-6">
            <img src={ this.state.image } alt={this.state.title} />
          </div>
        </div>
        <div className="gap"></div>
        <div className="row">
          <div className="col-sm-6">
            <h3 className="main-title">Steps</h3>
            <hr/>
            { steps }
          </div>
          <div className="col-sm-6">
            <h3 className="main-title">Ingredients</h3>
            <hr/>
            <ul>{ ingredients }</ul>
          </div>
        </div>
      </div>
    )
  }

}

export default RecipeSingle;
