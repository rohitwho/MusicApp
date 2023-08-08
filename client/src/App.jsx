

// import FetchPlaylist from "./pages/spotify"
import Navbar from "./Components/Navbar/Navbar"
import Chatbox from "./pages/chatbox"
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
 uri:"http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});
function App() {
  

  return (
    <ApolloProvider client ={client}>

    <>
   

    <Navbar/>
    <Chatbox/>


    </>
    </ApolloProvider>
  )
}

export default App
