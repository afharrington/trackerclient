import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Link } from 'react-router-dom';

import './regimenItem.scss';

class RegimenItem extends Component {

  constructor(props) {
    super(props);
    this.showModalWithRegimenId = this.showModalWithRegimenId.bind(this);
  }


  showModalWithRegimenId() {
    this.props.toggleModal(this.props.regimen._id);
  }

  render() {
    let regimen = this.props.regimen;

    return (
      <div className='regimen-item'>
        <p>{regimen.regimenName}</p>
        <div className='icon-container'>
          <IconMenu
            className='menu-icon'
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
          >
            <Link to={`/admin/regimen/${regimen._id}`}>
              <MenuItem primaryText='Regimen Stats' />
            </Link>
            <Link to={`/admin/regimen/${regimen._id}/settings`}>
              <MenuItem primaryText='Regimen Settings' />
            </Link>

            <MenuItem onClick={this.showModalWithRegimenId} primaryText={`Delete Regimen`} />

          </IconMenu>
        </div>
      </div>
      )
    }
  };

  export default RegimenItem;
