import React, { Component } from 'react';
import { connect } from 'react-redux';
import './cardWrapper.css';
import FontAwesome from 'react-fontawesome';

class CardWrapper extends Component {
  render() {
    return (
      <div className='card-wrapper'>
        <div className='card-title'>
          <h2>{this.props.title}</h2>
          { this.props.add && <button onClick={this.props.add}>Add</button> }
        </div>
        { this.props.children }
      </div>
    )
  }
}


export default CardWrapper;