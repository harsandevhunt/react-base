import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/common/semantics/header';
import Container from './components/common/semantics/container';

import * as serviceWorker from './others/serviceWorker';

//LogRocket
import * as LogRocket from 'logrocket';

import './assets/css/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <>
      <Header />
      <Container />
    </>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

//LogRocket Init
LogRocket.init('sxgdj7/react-base');