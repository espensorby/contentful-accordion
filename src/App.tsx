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
  const { data } = useQuery(GET_ACCORDIONDATA);
  
  console.log(data)

  return (
    <div>
      FAQ
    </div>
  )
}

export default App
