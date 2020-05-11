import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks'
import App from './src/app'
import apolloClient from "./src/apollo";

ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

