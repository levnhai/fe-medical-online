import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import GlobalStyles from './components/globalStyles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalStyles>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GlobalStyles>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analyticsx endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
