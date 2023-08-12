

// import FetchPlaylist from "./pages/spotify"
import Navbar from "./Components/Navbar/Navbar"
import Chatbox from "./pages/chatbox"
import SpotifyPlayer from "./pages/spotify";

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
 uri:"http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});



// console.log(code)
const code = new URLSearchParams(window.location.search).get("code")
function App() {
  
  

  return (
    <ApolloProvider client ={client}>

    <>

    <Navbar/>

      <main style={{
        display:"flex",
        justifyContent:"space-around"
      }}>
        <SpotifyPlayer code = {code}/>
        <Chatbox/>
      </main>


    </>
    </ApolloProvider>
  )
}

export default App
