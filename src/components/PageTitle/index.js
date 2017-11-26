import React from 'react';
import './pageTitle.css';

const PageTitle = (props) => {

  let className = `page-title ${props.color}`;
  return (
    <div className={className}>
      <h1>{props.title}</h1>
    </div>
  )
}

export default PageTitle;
