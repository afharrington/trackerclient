import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import LoginUserForm from './components/LoginUserForm';
import LoginAdminForm from './components/LoginAdminForm';
import RegisterAccountForm from './components/RegisterAccountForm';
import './welcome.css';

class Welcome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      form: 'user'
    }
  }

  componentWillMount() {
    if (this.props.authenticated && this.props.userType === 'admin') {
        this.props.history.push('/admin');
    } else if (this.props.authenticated && this.props.userType === 'user') {
      this.props.history.push('/user');
    }
  }

  showUserForm() {
    if (this.state.form !== 'user') {
      this.setState({ form: 'user' });
    }
  }

  showAdminForm() {
    if (this.state.form !== 'admin') {
      this.setState({ form: 'admin' });
    }
  }

  showRegisterAccountForm() {
    if (this.state.form !== 'register') {
      this.setState({ form: 'register' });
    }
  }

  redirect() {
    const role = localStorage.getItem('role');
    if (this.props.authenticated) {
      if (role === 'admin') {
        this.props.history.push('/admin');
      } else {
        this.props.history.push('/user');
      }
    }
  }

  renderLink() {
    if (this.state.form === 'user') {
      return <div onClick={this.showAdminForm.bind(this)} className='welcome-admin'><p>Login as Admin</p></div>
    } else if (this.state.form === 'admin') {
      return <div onClick={this.showUserForm.bind(this)} className='welcome-admin'><p><FontAwesome className='back-icon' name='chevron-left'/>Login as Athlete</p></div>
    } else {
      return (
        <div className='welcome-admin'>
          <p onClick={this.showAdminForm.bind(this)}>Admin Login</p>
          <p onClick={this.showUserForm.bind(this)}>Athlete Login</p>
        </div>
      )
    }
  }

  renderMessage() {
    if (this.state.form === 'user') {
      return <div className='welcome-header-message'>Welcome, 3up scholar! Log in to track your progress.</div>
    } else if (this.state.form === 'admin') {
      return <div className='welcome-header-message'>Log in to a coach or administrator account.</div>
    } else {
      return <div className='signup-header-message'>Enter your 5-digit registration code.<span>Cant find it? Contact <a href='mailto:accounts@3upscholars.com?Subject=Registration%20Code' target="_top"> accounts@3upscholars.com </a>for assistance.</span></div>
    }
  }


  renderForm() {
    if (this.state.form === 'admin') {
      return (
        <LoginAdminForm
          redirect={this.redirect.bind(this)} />
      )
    } else if (this.state.form === 'user') {
      return (
        <LoginUserForm
          redirect={this.redirect.bind(this)} />
      )
    } else if (this.state.form === 'register') {
      return (
        <RegisterAccountForm
          redirect={this.redirect.bind(this)} />
      )
    }
  }

  renderJustJoined() {
    if (this.state.form === 'user' || this.state.form === 'admin') {
      return (
        <div onClick={this.showRegisterAccountForm.bind(this)} className='welcome-just-joined'>Just joined 3up? Register your account.</div>
      )
    } else {
      return <div></div>
    }
  }

  render() {
    let welcomeClassName = this.state.form === 'admin' ? 'welcome-main welcome-main-admin' : 'welcome-main welcome-main-user';

    return (
      <div className='welcome-container'>
        <div className={welcomeClassName}>
          <div className='welcome-logo'>
            <img src='./img/3up-logo-white.png' alt='3up logo'/>
            <h3 onClick={this.showUserForm.bind(this)}>3up</h3>
          </div>

          { this.renderLink() }
          { this.renderMessage()}

          <div className='login-container'>
            { this.renderForm() }
          </div>

          { this.renderJustJoined() }

        </div>
        <div className='welcome-app-info'>
          App info and instructions here
        </div>
      </div>
    )
  }
};


function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated, userType: state.auth.userType };
}

export default connect(mapStateToProps)(Welcome);
