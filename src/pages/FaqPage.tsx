import { useQuery, gql } from '@apollo/client'
import Accordion from '../components/Accordion';
import { AccordionData, AccordionFields, AccordionItem } from './types'

const FaqPage = () => {
// Define query for Contentful's Graphql API 
  const GET_FAQDATA = gql`
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

  // Fetch data using Apollo Client's useQuery hook (https://www.apollographql.com/docs/react/api/react/hooks/#usequery)
  const { loading = true, error, data } = useQuery<AccordionData>(GET_FAQDATA);
  
  const renderedData = (data: AccordionData) => {
    return data.accordionCollection.items.map((item: AccordionFields) => {
      // Map the data to fit Accordion component's expected props
      const mappedToAccordion = item.accordionItemsCollection.items.map((accordionItem: AccordionItem) => {
        return {
          label: accordionItem.name,
          content: accordionItem.text,
          key: accordionItem.sys.id,
        }
      });

      return (
        <div key={item.internalName}>
          <h2>{item.title}</h2>
          <Accordion items={mappedToAccordion} />
        </div>
      )
    })
  }

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("Error fetching accordion data:", error);

    if (error.networkError) {
      return <p>Sorry, there seems to be a network issue. Please check your connection and try again.</p>;
    }
    if (error.graphQLErrors.length > 0) {
      return <p>Sorry, there was an error processing your request. Please try again later.</p>;
    }
    return <p>An unknown error occurred. Please try again later.</p>;
  }

  return (
    <div>
      <h1>Contentful Accordion</h1>
      {data && renderedData(data)}
    </div>
  )
}

export default FaqPage
