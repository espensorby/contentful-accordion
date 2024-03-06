import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloProvider} from '@apollo/client'
import App from './App.tsx'
import { client } from './config/apolloClient.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
