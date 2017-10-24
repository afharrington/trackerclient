import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { createRegimen } from '../../../../actions/adminRegimenActions';
import './createRegimenForm.css';

const customStyles = {
  underlineStyle: {
    borderColor: '#333'
  }
}

class CreateRegimenForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    if (this.state.value !== '') {
      this.props.createRegimen({ regimenName: this.state.value });
      this.props.exitForm();
    }
    event.preventDefault();
  }

  render() {
    return (
      <div className='create-regimen-form admin-regimens-row'>
        <form onSubmit={this.handleSubmit}>
          <TextField
            className='newRegimenTextField'
            value={this.state.value}
            onChange={this.handleChange}
            hintText='Regimen Name'
            underlineFocusStyle={customStyles.underlineStyle}
          />
          <input className={this.state.value === '' ? 'addRegimenButton' : 'addRegimenButton active'} type="submit" value="Save" />
        </form>
      </div>
    )
  }
};

export default connect(null, { createRegimen })(CreateRegimenForm);
