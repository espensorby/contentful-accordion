import { createClient } from "contentful"
import { useEffect } from 'react';
//import './App.css'

const {
  VITE_SPACE_ID,
  VITE_ACCESS_TOKEN,
  VITE_ENVIRONMENT,
} = import.meta.env;

const client = createClient({
  accessToken: VITE_ACCESS_TOKEN,
  space: VITE_SPACE_ID,
  environment: VITE_ENVIRONMENT,
})

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await client.getEntries({
        content_type: "accordion",
        include: 2,
      })

      const data = response.items;
      console.log(data);
      return data;
    }

    fetchData();
  }, []);

  return (
    <div>
      FAQ
    </div>
  )
}

export default App
