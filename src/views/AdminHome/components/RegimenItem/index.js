import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import './regimenItem.css';

class RegimenItem extends Component {

  render() {
    let regimen = this.props.regimen;

    return (
      <div className='regimen-item'>
        <p>{regimen.regimenName}</p>
        <div className='regimen-item-icons'>
          <Link to={`/admin/regimen/${regimen._id}`}><FontAwesome name='tasks' /></Link>
          <Link to={`/admin/regimen/${regimen._id}/settings`}><FontAwesome name='cog' /></Link>
        </div>
      </div>
      )
    }
  };

  export default RegimenItem;
