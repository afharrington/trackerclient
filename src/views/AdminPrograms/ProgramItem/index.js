import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Moment from 'react-moment';
import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import './programItem.css';

class ProgramItem extends Component {

  renderLastEntry() {

    let program = this.props.program;
    if (_.isEmpty(program.recentEntry) == false) {
      return (
        <p className='program-item-entry'><Moment fromNow>{program.recentEntry.entryDate}</Moment></p>
      )
    } else {
      return <p className='program-item-entry'></p>
    }
  }

  render() {
    let program = this.props.program;
    if (program) {

      return (
        <Link to={`/admin/program/${program._id}`}>
          <div className='program-item'>
            <p className='program-item-name'>{program.programName}</p>
            <p className='program-item-program'>{program.sport}</p>
            {this.renderLastEntry()}
          </div>
        </Link>
        )
    } else {
      return <div></div>
    }
  };
}

export default ProgramItem;
