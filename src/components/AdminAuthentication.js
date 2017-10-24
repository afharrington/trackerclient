import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class AdminAuthentication extends Component {
    constructor(props) {
      super(props);
      this.state = { redirect: false }
    }

    static contextTypes = {
      router: PropTypes.object
    }

    componentWillMount() {
      if (!(this.props.authenticated) && (this.props.userType !== 'admin')) {
        this.setState({ redirect: true });
      }
    }

    componentWillUpdate(nextProps) {
      if (!(this.props.authenticated) && (this.props.userType !== 'admin')) {
        this.setState({ redirect: true });
      }
    }

    render() {
      if (this.state.redirect) {
        return ( <Redirect to='/'/> );
      }
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated, userType: state.auth.userType };
  }

  return connect(mapStateToProps)(AdminAuthentication);
}
