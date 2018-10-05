import React from 'react';
import { render } from 'react-dom';
const app = document.getElementById('app');
import store from './store';
import { Provider } from 'react-redux';
import Main from './Main';

render(<Provider store= { store }>
  <Main />
</Provider>, app);
