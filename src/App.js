import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
// redux thunk is middleware allows us to return functions instead of objects
// from action creators, to allow for asynchronous behavior
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import { FirebaseConfig } from './configs';

import Router from './Router';


class App extends Component {
  componentWillMount() {
    firebase.initializeApp(FirebaseConfig);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
