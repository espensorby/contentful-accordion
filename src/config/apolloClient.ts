import { ApolloClient, InMemoryCache } from '@apollo/client'

const {
  VITE_SPACE_ID,
  VITE_ACCESS_TOKEN,
  VITE_ENVIRONMENT,
} = import.meta.env;

// Go to {CONTENTFUL_GRAPHQL_ENDPOINT}/explore?access_token={ACCESS_TOKEN} to explore the API
const CONTENTFUL_GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${VITE_SPACE_ID}/environments/${VITE_ENVIRONMENT}?access_token=${VITE_ACCESS_TOKEN}`;

// Create a new Apollo Client instance
export const client = new ApolloClient({
  uri: CONTENTFUL_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});
