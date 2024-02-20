import { useQuery, gql } from '@apollo/client'
import './App.css'

const GET_ACCORDIONDATA = gql`
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

const App = () => {
  const { loading = true, error, data } = useQuery(GET_ACCORDIONDATA);
  
  const renderedList = (data: any) => {
    return data.accordionCollection.items.map((item: any) => {
      return (
        <div key={item.internalName}>
          <h2>{item.title}</h2>
          <ul>
            {item.accordionItemsCollection.items.map((accordionItem: any) => (
                <li key={accordionItem.sys.id}>
                  <h3>{accordionItem.name}</h3>
                  <p>{accordionItem.text}</p>
                </li>
              )
            )}
          </ul>
        </div>
      )
    })
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      {renderedList(data)}
    </div>
  )
}

export default App
