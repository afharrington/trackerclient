import FontAwesome from 'react-fontawesome';
import React from 'react'
import { Link } from 'react-router-dom';
import './breadcrumbHeader.css';

const BreadcrumbHeader = props => {
  return (
    <div className='breadcrumb-header'>
      <p>
        <Link className='breadcrumb' to={props.linkLocation}>{props.link}</Link>
        <FontAwesome name='chevron-right'/>
        {props.pageTitle}
      </p>
      <p className='breadcrumb-subheading'>{props.subheading}</p>
    </div>
  )
}

export default BreadcrumbHeader;
