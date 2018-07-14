import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Main from './Main';
import { checkUserLoggedIn, userLogout } from '../actions/userActions';

class App extends Component {

  componentWillMount() {
    this.props.checkUserLoggedIn();
  }

  render() {
    const { currentUser, userLogout } = this.props;

    return (
      [
        <Navbar
          key="Navbar"
        currentUser={currentUser}
        onLogout={() => userLogout(currentUser)}
        />,
        <Main key="Main"/>,
      ]
    );
  }
};

const mapStateToProps = (state) => ({ currentUser: state.currentUser });
const mapDispatchToProps = (dispatch) => ({
  userLogout: (obj) => dispatch(userLogout(obj)),
  checkUserLoggedIn: () => dispatch(checkUserLoggedIn()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
