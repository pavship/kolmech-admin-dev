import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

import defaults from './apollo/defaults'
import resolvers from './apollo/resolvers'

const client = new ApolloClient({ 
    uri: 'https://now-advanced.now.sh/',
    clientState: {
        defaults,
        resolvers,
        // typeDefs
    }
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
, document.getElementById('root'));
registerServiceWorker();
