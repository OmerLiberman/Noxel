import React, {useEffect} from 'react';

// Redux
import {Provider} from 'react-redux';
import {store} from './redux/store';

import {AppBase} from './base';
import setAuthToken from './utils/token';
import {loadUser} from './redux/actions/auth';
import {LOGOUT} from './redux/actions/types';

// theme
import theme from './theme';
import { ThemeProvider } from '@material-ui/core';



const App = () => {

  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppBase/>
        </ThemeProvider>
      </Provider>
  );
};

export default App;
