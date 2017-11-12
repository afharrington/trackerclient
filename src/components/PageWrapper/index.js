import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageHeader from '../PageHeader';
import './pageWrapper.css';

class PageWrapper extends Component {

  render() {
    return (
      <div className='page-wrapper'>
        <PageHeader/>
        { this.props.children }
      </div>
    )
  }
}


export default PageWrapper;
