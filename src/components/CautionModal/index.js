import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './cautionModal.css';

class CautionModal extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className='caution-modal'>
        <div className='caution-modal-layer'/>
        <div className='caution-modal-box'>
          <div className='caution-modal-header'>
            <h1>{this.props.title}</h1>
            <FontAwesome onClick={this.props.cancel} className='caution-modal-close' name='times' />
          </div>
          <div className='caution-modal-content'>
            <div>{this.props.message}</div>
            <div className='caution-modal-buttons'>
              <button className='caution-modal-submit' onClick={this.props.submit}>Delete</button>
              <button className='caution-modal-cancel' onClick={this.props.cancel}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CautionModal;
