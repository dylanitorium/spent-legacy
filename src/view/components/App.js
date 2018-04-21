import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from 'state/store';
import { Loader, Dimmer } from 'semantic-ui-react';
import Header from 'view/components/pure/Header';
import Main from 'view/components/connected/Main';
import './App.css';

class App extends Component {
  render() {
    const components = [
      <Header key="header" />,
      <Main key="menu" />,
    ];

    return components;
  }
};

const SpentLoader = () => (
  <Dimmer active inverted>
    <Loader size="large" />
  </Dimmer>
);

persistor.purge();

export default () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<SpentLoader />}>
      <App />
    </PersistGate>
  </Provider>
);
