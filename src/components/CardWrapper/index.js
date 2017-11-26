import React, { Component } from 'react';
import { connect } from 'react-redux';
import './cardWrapper.css';
import FontAwesome from 'react-fontawesome';

class CardWrapper extends Component {

  render() {
    let titleClassName = `card-title ${this.props.color}`;

    return (
      <div className='card-wrapper'>
        <div className={titleClassName}>
          <h2>{this.props.title}</h2>
          {/* { this.props.add && <button onClick={this.props.add}>Add</button> } */}
        </div>
        { this.props.children }
      </div>
    )
  }
}


export default CardWrapper;
