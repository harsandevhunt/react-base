import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/common/semantics/header';
import Container from './components/common/semantics/container';

import * as serviceWorker from './others/serviceWorker';

//LogRocket
// import * as LogRocket from 'logrocket';
// import setupLogRocketReact from 'logrocket-react';

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

// after calling LogRocket.init()
// setupLogRocketReact(LogRocket);
// LogRocket.init('sxgdj7/react-base');
// LogRocket.init('sxgdj7/react-base', {
//   dom: {
//     textSanitizer: 'false',
//     inputSanitizer: 'false',
//   },
// })

// LogRocket.identify('THE_USER_ID_IN_YOUR_APP', {
//   name: 'Hari',
//   email: 'hari@example.com',
//   // Add your own custom user variables here, ie:
//   subscriptionType: 'pro'
// });
