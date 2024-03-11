import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry';

const {
  VITE_SPACE_ID,
  VITE_ACCESS_TOKEN,
  VITE_ENVIRONMENT,
} = import.meta.env;

// Go to {CONTENTFUL_GRAPHQL_ENDPOINT}/explore?access_token={ACCESS_TOKEN} to explore the API
const CONTENTFUL_GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${VITE_SPACE_ID}/environments/${VITE_ENVIRONMENT}?access_token=${VITE_ACCESS_TOKEN}`;

const httpLink = new HttpLink({ uri: CONTENTFUL_GRAPHQL_ENDPOINT });

// Config for retries on failed requests
const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true
  },
  attempts: {
    max: 5,
    retryIf: (error, _operation) => !!error
  }
});

// Create a new Apollo Client instance
export const client = new ApolloClient({
  link: retryLink.concat(httpLink),
  cache: new InMemoryCache(),
});
