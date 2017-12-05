import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import CardWrapper from '../../../../../components/CardWrapper';

import './programItem.css';

class ProgramItem extends Component {

  render() {
    let program = this.props.program;

    return (
      <div className='program-item'>
        <CardWrapper color='gray' title={program.programName}>
          <p>Created: <Moment format='L'>{program.created_date}</Moment></p>
          <p>Reports</p>
          <p>Settings</p>
          <Link to={`/admin/program/${program._id}`}>
            <div className='program-item'>
              <p>{program.programName}</p>
            </div>
          </Link>

        </CardWrapper>
      </div>
      )
    }
  };

  export default ProgramItem;
