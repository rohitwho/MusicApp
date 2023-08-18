const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const path = require("path");
const {authMiddleware}  = require("./utls/auth.js");

const dotenv = require ("dotenv").config();
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
var bodyParser = require("body-parser");



var cors = require("cors");





const SpotifyWebApi = require("spotify-web-api-node");




const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));






app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const client_id = "bdd9da03ae0b4e068945d124833236e3";
  const client_secret = "c8134b1d8304455381ac20e549583a77";

  const spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: "http://localhost:5173",
    refreshToken,
  });
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });

      spotifyApi.setAccessToken(data.body["access_token"]);
    })
    .catch((err) => {
      console.log(err);
      res.status();
    });
});

app.post("/login", (req, res) => {
  const code = req.body.code;
  const client_id = "bdd9da03ae0b4e068945d124833236e3";
  const client_secret = "c8134b1d8304455381ac20e549583a77";

  const spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: "https://musicio-d325003c7109.herokuapp.com/",
  });
  console.log(code);
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status();
    });
});
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});





if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
}
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
})

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
await server.start();
server.applyMiddleware({ app });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  })
})
};

// Call the async function to start the server
startApolloServer();