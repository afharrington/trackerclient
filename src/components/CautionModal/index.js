import React, { Component } from 'react'
import './cautionModal.scss';

class CautionModal extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  cancel() {
    this.props.closeModal();
  }

  delete() {
    this.props.deleteFunction();
    this.props.closeModal();
  }

  render() {
    return (
      <div className='caution-modal'>
        <div className='caution-modal-container'>
          <p>Are you sure you want to delete this {this.props.itemToDelete}? This action is not recommended!</p>
          <p className='warning'>Once deleted, this {this.props.itemToDelete} cannot be recovered.</p>
          <p>{this.props.additionalMessage}</p>
          <div className='caution-modal-button-container'>
            <button className='delete-button' onClick={this.delete.bind(this)}>I understand, OK to Delete</button>
            <button className='cancel-button'onClick={this.cancel.bind(this)}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}

export default CautionModal;
