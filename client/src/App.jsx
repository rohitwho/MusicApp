

// import FetchPlaylist from "./pages/spotify"
import Navbar from "./Components/Navbar/Navbar"
import Chatbox from "./pages/chatbox"
import Footer from "./Components/Footer/footer"
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
        height:"100vh",
        justifyContent:"space-around"
      }}>
        <SpotifyPlayer code = {code}/>
        <Chatbox/>
      </main>

<Footer/>
    </>
    </ApolloProvider>
  )
}

export default App
