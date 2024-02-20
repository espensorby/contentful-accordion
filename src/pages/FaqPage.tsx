import { useQuery } from '@apollo/client'
import Accordion from '../components/Accordion'
import { GET_FAQDATA } from './queries'
import { AccordionData, AccordionFields, AccordionItem } from './types'
import './faqPage.scss'

const FaqPage = () => {
  // Fetch data using Apollo Client's useQuery hook (https://www.apollographql.com/docs/react/api/react/hooks/#usequery)
  const { loading = true, error, data } = useQuery<AccordionData>(GET_FAQDATA)
  
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
        <main key={item.internalName}>
          <h2>{item.title}</h2>
          <Accordion items={mappedToAccordion} />
        </main>
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
    <div className='page-wrapper'>
      <nav className='top-banner-wrapper'>
        <div className='top-banner'>
          <a href="https://www.novacare.no" target='blank' className="logo" >
            <img alt="Novacare logo" src="https://images.ctfassets.net/rag9hb99eki6/B7NOhJhx21UALURxyAqE0/b7bb00e4e9446ec0f0c4ffcedbb5e15c/novacarelogo.svg" width="80" height="80" />
          </a>  
          <h1>NOVACARE FAQ</h1>
        </div>
      </nav>
      {data && renderedData(data)}
    </div>
  )
}

export default FaqPage
