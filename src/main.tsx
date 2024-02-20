import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'
//import './index.css'

const {
  VITE_SPACE_ID,
  VITE_ACCESS_TOKEN,
  VITE_ENVIRONMENT,
} = import.meta.env;

const CONTENTFUL_GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${VITE_SPACE_ID}/environments/${VITE_ENVIRONMENT}?access_token=${VITE_ACCESS_TOKEN}`;

export const client = new ApolloClient({
  uri: CONTENTFUL_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
