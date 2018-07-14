import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';

import AuthForm from '../components/AuthForm';
import PrivateRoute from '../components/PrivateRoute';
import List from '../components/ListView';
import ConsumerForm from '../components/ConsumerForm';
import ApiForm from '../components/ApiForm';

// import  { clearErrors } from '../actions/miscActions';
import  { authenticateUser, checkUserLoggedIn } from '../actions/userActions';
import  { fetchAllConsumers, 
          setCurrentConsumer, 
          createNewConsumer, 
          updateExistingConsumer, 
          deleteExistingConsumer,
        } from '../actions/consumerActions';
import  { fetchAllApis, 
          setCurrentApi, 
          createNewApi, 
          updateExistingApi, 
          deleteExistingApi,
        } from '../actions/apiActions';

class Main extends Component {
  loadData() {
    const { fetchAllConsumers, fetchAllApis } = this.props;

    fetchAllApis();
    fetchAllConsumers();
  }

  render() {
    const {
      currentUser,
      errorMessage,
      authenticateUser,
      apis,
      consumers,
      createNew,
      setCurrentConsumer,
      setCurrentApi,
      currentConsumer,
      currentApi,
      createNewApi,
      updateExistingApi,
      deleteExistingApi,
      createNewConsumer,
      updateExistingConsumer,
      deleteExistingConsumer,
    } = this.props;

    return (
      <div className="container main">
        <Switch>
          <Route exact path='/' render={(props) => (
            <AuthForm
              onAuth={(obj) => authenticateUser(obj)}
              errorMessage={errorMessage.loginForm}
              {...props}
            />
          )} />
          <PrivateRoute
            exact path='/consumers'
            model="Consumers"
            currentUser={currentUser}
            component={List}
            loadData={() => this.loadData()}
            list={consumers}
            createNew={() => createNew('consumer')}
            gotoView={(consumer) => setCurrentConsumer(consumer, 'view')}
            gotoEdit={(consumer) => setCurrentConsumer(consumer, 'edit')}
          />
          <PrivateRoute
            exact path='/apis'
            model='APIs'
            currentUser={currentUser}
            component={List}
            loadData={() => this.loadData()}
            list={apis}
            createNew={() => createNew('api')}
            gotoView={(api) => setCurrentApi(api, 'view')}
            gotoEdit={(api) => setCurrentApi(api, 'edit')}
          />
          <PrivateRoute
            path='/consumer/:mode'
            currentUser={currentUser}
            component={ConsumerForm}
            consumer={currentConsumer}
            allApiNames={apis.map((api) => api.name)}
            errorMessage={errorMessage.ajaxError}
            createNew={(consumer) => createNewConsumer(consumer)}
            edit={(consumer) => setCurrentConsumer(consumer, 'edit')}
            update={(consumer) => updateExistingConsumer(consumer)}
            delete={(consumer) => deleteExistingConsumer(consumer)}
          />
          <PrivateRoute
            path='/api/:mode'
            currentUser={currentUser}
            component={ApiForm}
            api={currentApi}
            errorMessage={errorMessage.ajaxError}
            createNew={(api) => createNewApi(api)}
            edit={(api) => setCurrentApi(api, 'edit')}
            update={(api) => updateExistingApi(api)}
            delete={(api) => deleteExistingApi(api)}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  errorMessage: state.errors,
  apis: state.apis,
  consumers: state.consumers,
  currentConsumer: state.currentConsumer,
  currentApi: state.currentApi,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserLoggedIn: () => dispatch(checkUserLoggedIn()),
  authenticateUser: (obj) => {
    dispatch(authenticateUser(obj)).then(() => {
      dispatch(push('/consumers'));
    });
  },

  fetchAllConsumers: () => dispatch(fetchAllConsumers()),
  fetchAllApis: () => dispatch(fetchAllApis()),

  createNew: (model) => {
    dispatch(setCurrentConsumer({}));
    dispatch(push(model + '/create'));
  },
  setCurrentConsumer: (obj, mode) => {
    dispatch(setCurrentConsumer(obj));
    dispatch(push('/consumer/' + mode));
  },
  setCurrentApi: (obj, mode) => {
    dispatch(setCurrentApi(obj));
    dispatch(push('/api/' + mode));
  },

  createNewApi: (obj) => {
    dispatch(createNewApi(obj)).then(() => {
      dispatch(push('/api/view'));
    });
  },
  updateExistingApi: (obj) => {
    dispatch(updateExistingApi(obj));
    // dispatch(push('/api/view'));
  },
  deleteExistingApi: (obj) => {
    dispatch(deleteExistingApi(obj));
    dispatch(push('/apis'));
  },

  createNewConsumer: (consumer) => {
    dispatch(createNewConsumer(consumer)).then(() => {
      dispatch(push('/consumer/view'));
    });
  },
  updateExistingConsumer: (consumer) => {
    dispatch(updateExistingConsumer(consumer));
    // dispatch(push('/consumer/view'));
  },
  deleteExistingConsumer: (consumer) => {
    dispatch(deleteExistingConsumer(consumer));
    dispatch(push('/consumers'));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
