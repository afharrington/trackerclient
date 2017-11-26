import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import './programItem.css';

class ProgramItem extends Component {

  render() {
    let program = this.props.program;
    if (program) {
      return (
        <Link to={`/admin/user/${program._id}`}>
          <div className='program-item'>
            <p className='program-item-name'>{program.regimenName}</p>
            <p className='program-item-program'>Stuff</p>
            <p className='program-item-entry'>10/10/17</p>
          </div>
        </Link>
        )
    } else {
      return <div></div>
    }
  };
}

export default ProgramItem;
