import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import './regimenItem.css';

class RegimenItem extends Component {

  render() {
    let regimen = this.props.regimen;

    return (
      <Link to={`/admin/regimen/${regimen._id}`}>
        <div className='regimen-item'>
          <p>{regimen.regimenName}</p>
        </div>
      </Link>
      )
    }
  };

  export default RegimenItem;
