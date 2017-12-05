import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { deleteProgram } from '../../../../actions/adminProgramActions';
import './deleteProgramModal.css';

class DeleteProgramModal extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  deleteProgram() {
    this.handleClose();
    this.props.deleteProgram(this.props.programId);
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
        onClick={this.deleteProgram.bind(this)}
      />,
    ];

    return (
      <div className='delete-program-modal'>
        <button className='program-delete-button' onClick={this.handleOpen}>Delete Program</button>
        <Dialog
          title="Are you sure you want to delete this program?"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <p className='dialog-text'>Deleting will permanently remove this program from your dashboard but will <em>not</em> affect players you have assigned it to.</p>
          <p className='dialog-text'>An individual player's programs must be modified on the player's profile page.</p>
        </Dialog>
      </div>
    );
  }
}

export default connect(null, { deleteProgram })(DeleteProgramModal);
