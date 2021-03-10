import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { FLAT_THEME as flatTheme, ThemeContext } from '@skbkontur/react-ui';

import { Main } from 'Views/Main/Main';

import './styles.css';

ReactDOM.render(
  <ThemeContext.Provider value={flatTheme}>
    <Main />
  </ThemeContext.Provider>,
  document.getElementById('root'),
);
