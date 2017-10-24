import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { deleteRegimen } from '../../../../actions/adminRegimenActions';
import './deleteRegimenModal.scss';

class DeleteRegimenModal extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  deleteRegimen() {
    this.handleClose();
    this.props.deleteRegimen(this.props.regimenId);
    this.props.redirect();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onClick={this.deleteRegimen.bind(this)}
      />,
    ];

    return (
      <div className='delete-regimen-modal'>
        <button className='regimen-delete-button' onClick={this.handleOpen}>Delete Regimen</button>
        <Dialog
          title="Are you sure you want to delete this regimen?"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <p className='dialog-text'>Deleting will permanently remove this regimen from your dashboard but will <em>not</em> affect players you have assigned it to.</p>
          <p className='dialog-text'>An individual player's regimens must be modified on the player's profile page.</p>
        </Dialog>
      </div>
    );
  }
}

export default connect(null, { deleteRegimen })(DeleteRegimenModal);
