import React from 'react';
import { Link } from 'react-router-dom';

const SidebarLink = (props) => {

  const selectMenuItem = () => {
    props.selectMenuItem(props.name);
  }

  return (
    <Link to='/admin'><h3 onClick={selectMenuItem} className={props.className}>{props.name}</h3></Link>
  )
}

export default SidebarLink;
