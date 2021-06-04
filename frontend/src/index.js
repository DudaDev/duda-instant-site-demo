import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import Amplify from 'aws-amplify';
import cdk from './cdkvarout.json'
const userPoolId = cdk.DudaInstantSiteStack.userPoolId
const userPoolRegion = cdk.DudaInstantSiteStack.userPoolRegion
const userPoolClientId = cdk.DudaInstantSiteStack.userPoolClientId

Amplify.configure({
  Auth: {
    region: userPoolRegion,
    userPoolId: userPoolId,
    userPoolWebClientId: userPoolClientId
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
