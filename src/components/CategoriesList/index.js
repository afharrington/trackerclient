import React, { Component } from 'react';
import _ from 'lodash';
import NewButton from '../../../../components/NewButton';
import CardWrapper from '../../../../components/CardWrapper';
import CautionModal from '../../../../components/CautionModal';
import CreateProgramForm from '../CreateProgramForm';
import CategoryItem from '../ProgramItem';

import './categoriesList.css';

class CategoriesList extends Component {

  renderCategories() {
    let programs = this.props.programs;

    if (programs) {
      return _.map(programs, program => {
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
        <div className='program-list'>
          {this.renderTiles()}
        </div>
      </CardWrapper>
    )
  }
};

function mapStateToProps(state) {
  return { programs: state.adminPrograms };
}

export default connect(mapStateToProps, { fetchPrograms, deleteProgram })(TilesList);
