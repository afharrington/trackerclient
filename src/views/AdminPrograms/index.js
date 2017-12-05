import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchPrograms } from '../../actions/adminProgramActions';
import { selectMenuItem } from '../../actions/uiActions';
import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import NewButton from '../../components/NewButton';
import PageTitle from '../../components/PageTitle';
import CreateProgramForm from '../../components/CreateProgramForm';
import AdminPageHeader from '../../components/AdminPageHeader';
import ProgramItem from './ProgramItem';
import './adminPrograms.css';

class AdminPrograms extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showProgramForm: false,
      sortProgram: true,
      programReverse: false,
      sortSport: false,
      sportReverse: false,
      sortEntry: false,
      entryReverse: false
    }

    this.toggleProgramForm = this.toggleProgramForm.bind(this);
    this.handleProgramSort = this.handleProgramSort.bind(this);
    this.handleSportSort = this.handleSportSort.bind(this);
    this.handleEntrySort = this.handleEntrySort.bind(this);
  }

  componentDidMount() {
    this.props.fetchPrograms();
    this.props.selectMenuItem('Programs');
  }

  toggleProgramForm() {
    this.setState({ showProgramForm: !this.state.showProgramForm});
  }

  handleProgramSort() {
    if (this.state.sortProgram) {
      this.setState({ programReverse: !(this.state.programReverse) });
    } else {
      this.setState({ sortProgram: true });
      this.setState({ programReverse: false });
    }
  }

  handleSportSort() {
    if (this.state.sortSport) {
      this.setState({ sportReverse: !(this.state.sportReverse) });
    } else {
      this.setState({ sortSport: true });
      this.setState({ sportReverse: false });
    }
  }

  handleEntrySort() {
    if (this.state.sortEntry) {
      this.setState({ entryReverse: !(this.state.entryReverse) });
    } else {
      this.setState({ sortEntry: true });
      this.setState({ entryReverse: false });
    }
  }

  renderPrograms() {
    let programs = this.props.programs;
    if (programs) {

      if (this.state.sortProgram === true) {
        if (this.state.programReverse) {
          programs = _.sortBy(programs, 'programName').reverse();
        } else {
          programs = _.sortBy(programs, 'programName');
        }
      }

      if (this.state.sortSport === true) {
        if (this.state.sportReverse) {
          programs = _.sortBy(programs, 'sport').reverse();
        } else {
          programs = _.sortBy(programs, 'sport');
        }
      }

      if (this.state.sortEntry === true) {
        if (this.state.entryReverse) {
          programs = _.sortBy(programs, 'recentEntry.entryDate').reverse();
        } else {
          programs = _.sortBy(programs, 'recentEntry.entryDate');
        }
      }

      return _.map(programs, program => {
        return (
          <ProgramItem key={program._id} program={program} />
        )
      });
    }
  }

  render() {
    return (
      <div className='admin-programs'>
        <AdminPageHeader/>
        <PageTitle title='Programs' color='green'/>
        { this.state.showProgramForm ? <CreateProgramForm exit={this.toggleProgramForm}/> : null }
        <div className='admin-programs-content'>
          <NewButton onClick={this.toggleProgramForm} text='Add Program'/>
          <div className='admin-programs-programs'>
            <div className='admin-programs-labels'>
              <p className='admin-programs-labels-name'>Program<span className='sort' onClick={this.handleProgramSort}><MdKeyboardArrowDown/></span></p>
              <p className='admin-programs-labels-program'>Sport<span className='sort' onClick={this.handleSportSort}><MdKeyboardArrowDown/></span></p>
              <p className='admin-programs-labels-entry latest'>Latest<span className='sort' onClick={this.handleEntrySort}><MdKeyboardArrowDown/></span></p>
            </div>
            {this.renderPrograms()}
          </div>
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return { programs: state.adminPrograms.programs };
}

export default connect(mapStateToProps, { fetchPrograms, selectMenuItem })(AdminPrograms);
