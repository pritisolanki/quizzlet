import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import TagManager from 'react-gtm-module'
import ReactGA from 'react-ga';


ReactGA.initialize('G-TKL82ZCZDH')
ReactGA.event({
    category: 'Pageview',
    'pageTitle': 'Quizzlet'
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
