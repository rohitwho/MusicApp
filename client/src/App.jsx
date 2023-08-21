
import Navbar from "./Components/Navbar/Navbar";
import Chatbox from "./pages/chatbox";
import Footer from "./Components/Footer/footer";
import SpotifyPlayer from "./pages/spotify";
import { setContext } from "@apollo/client/link/context";
import { io } from "socket.io-client"; 

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import Auth from "./utils/auth";





const socket = io.connect("ws://localhost:3002")

const httpLink = createHttpLink({
  uri: "https://musicio-d325003c7109.herokuapp.com/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Auth.getToken()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


// console.log(code)
const code = new URLSearchParams(window.location.search).get("code");
function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <Navbar />

        <main
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <SpotifyPlayer code={code} />
          <Chatbox  socket = {socket}/>
        </main>

        <Footer />
      </>
    </ApolloProvider>
  );
}

export default App;
