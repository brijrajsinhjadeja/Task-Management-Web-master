import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <Auth0Provider
    domain="dev-gq83xn4ckoc2ps1p.us.auth0.com"
    clientId="lyUVVXplPXTwlsN1D8EZlIXo3V9rJHzY"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >

      <App />
      
      </Auth0Provider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
