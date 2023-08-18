const express = require("express");
const { ApolloServer } = require('apollo-server-express');
const path = require("path");
const {authMiddleware}  = require("./utls/auth.js");
const routes = require("./routes/index.js")

const dotenv = require ("dotenv").config();
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
var bodyParser = require("body-parser");



var cors = require("cors");









const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(routes)
app.use(express.urlencoded({ extended: false }));






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