import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchRegimens } from '../../actions/adminRegimenActions';
import { selectMenuItem } from '../../actions/uiActions';
import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import NewButton from '../../components/NewButton';
import PageTitle from '../../components/PageTitle';
import CreateRegimenForm from '../../components/CreateRegimenForm';
import AdminPageHeader from '../../components/AdminPageHeader';
import ProgramItem from './ProgramItem';
import './adminPrograms.css';

class AdminPrograms extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showRegimenForm: false
    }

    this.toggleRegimenForm = this.toggleRegimenForm.bind(this);
  }

  componentDidMount() {
    this.props.fetchRegimens();
    this.props.selectMenuItem('Programs');
  }

  toggleRegimenForm() {
    this.setState({ showRegimenForm: !this.state.showRegimenForm});
  }

  renderPrograms() {
    let programs = this.props.regimens;
    if (programs) {
      return _.map(programs, program => {
        return (
          <ProgramItem program={program} />
        )
      });
    }
  }

  render() {
    return (
      <div className='admin-programs'>
        <AdminPageHeader/>
        <PageTitle title='Programs' color='green'/>
        { this.state.showRegimenForm ? <CreateRegimenForm exit={this.toggleRegimenForm}/> : null }
        <div className='admin-programs-content'>
          <NewButton onClick={this.toggleRegimenForm} text='Add Program'/>
          <div className='admin-programs-programs'>
            <div className='admin-programs-labels'>
              <p className='admin-programs-labels-name'>Program<span className='sort'><MdKeyboardArrowDown/></span></p>
              <p className='admin-programs-labels-program'>Num Players<span className='sort'><MdKeyboardArrowDown/></span></p>
              <p className='admin-programs-labels-entry'>Last Entry<span className='sort'><MdKeyboardArrowDown/></span></p>
            </div>
            {this.renderPrograms()}
          </div>
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return { regimens: state.adminRegimens.regimens };
}

export default connect(mapStateToProps, { fetchRegimens, selectMenuItem })(AdminPrograms);
