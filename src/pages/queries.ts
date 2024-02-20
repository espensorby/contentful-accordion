import { gql } from '@apollo/client';

// Define query for Contentful's Graphql API 
export const GET_FAQDATA = gql`
  query {
    accordionCollection {
      items {
        internalName
        title
        accordionItemsCollection {
          items {
            name
            text
            sys {
              id
            } 
          }
        }
      }
    }
  }
`;
