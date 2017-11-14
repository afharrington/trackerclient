import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import './userInfo.css';

class UserInfo extends Component {

  componentDidMount() {
    console.log('user!:', this.props.user);
  }

  render() {
    const { firstName, lastName, email, code, sport, userRegimens } = this.props.user;

    console.log(userRegimens);

    return (
      <div className='user-info'>
        <div className='user-info-details'>
          <div className='user-info-item'>
            <p className='label'>First Name:</p><p className='field'>{firstName}</p>
            <FontAwesome name='pencil'/>
          </div>

          <div className='user-info-item'>
            <p className='label'>Last Name:</p><p className='field'>{lastName}</p>
            <FontAwesome name='pencil'/>
          </div>

          <div className='user-info-item'>
            <p className='label'>Email:</p><p className='field'>{email}</p>
            <FontAwesome name='pencil'/>
          </div>

          <div className='user-info-item'>
            <p className='label'>Reset Code:</p><p className='field'>{code}</p>
            <FontAwesome name='pencil'/>
          </div>

          <div className='user-info-item'>
            <p className='label'>Sport:</p><p className='field'>{sport}</p>
            <FontAwesome name='pencil'/>
          </div>
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return { user: state.adminUsers.user};
}

export default connect(mapStateToProps)(UserInfo);
