import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import CardWrapper from '../../../../../components/CardWrapper';

import './regimenItem.css';

class RegimenItem extends Component {

  render() {
    let regimen = this.props.regimen;

    return (
      <div className='regimen-item'>
        <CardWrapper color='gray' title={regimen.regimenName}>
          <p>Created: <Moment format='L'>{regimen.created_date}</Moment></p>
          <p>Reports</p>
          <p>Settings</p>
          <Link to={`/admin/regimen/${regimen._id}`}>
            <div className='regimen-item'>
              <p>{regimen.regimenName}</p>
            </div>
          </Link>

        </CardWrapper>
      </div>
      )
    }
  };

  export default RegimenItem;
