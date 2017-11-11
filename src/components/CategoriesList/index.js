import React, { Component } from 'react';
import _ from 'lodash';
import NewButton from '../../../../components/NewButton';
import CardWrapper from '../../../../components/CardWrapper';
import CautionModal from '../../../../components/CautionModal';
import CreateRegimenForm from '../CreateRegimenForm';
import CategoryItem from '../RegimenItem';

import './categoriesList.css';

class CategoriesList extends Component {

  renderCategories() {
    let regimens = this.props.regimens;

    if (regimens) {
      return _.map(regimens, regimen => {
        return (
          <CategoryItem
          
          />
        );
      })
    }
  }

  render() {
    return (
      <CardWrapper title='Training Categories'>
        <div className='regimen-list'>
          {this.renderTiles()}
        </div>
      </CardWrapper>
    )
  }
};

function mapStateToProps(state) {
  return { regimens: state.adminRegimens };
}

export default connect(mapStateToProps, { fetchRegimens, deleteRegimen })(TilesList);
