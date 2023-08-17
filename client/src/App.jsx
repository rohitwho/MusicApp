

// import FetchPlaylist from "./pages/spotify"
import Navbar from "./Components/Navbar/Navbar"
import Chatbox from "./pages/chatbox"
import Footer from "./Components/Footer/footer"
import SpotifyPlayer from "./pages/spotify";
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';


import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import { ApolloClient, InMemoryCache, ApolloProvider,HttpLink,split } from '@apollo/client';
import Auth from "./utils/auth"




// const httpLink = createHttpLink({
//   uri: 'http://localhost:3001/graphql',
// });

// // Construct request middleware that will attach the JWT token to every request as an `authorization` header
// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = Auth.getToken()
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });
// console.log(authLink.concat(httpLink))

// const client = new ApolloClient({
//   // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });










const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:3001/graphql',
  connectionParams: {
    authToken: Auth.getToken()
  },
}));

const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
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
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: splitLink,
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
    
        justifyContent:"space-evenly"
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
