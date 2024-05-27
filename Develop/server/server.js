const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const express = require("express");
const path = require("path");
const db = require("./config/connection");

// WILL BE DELETED
// const routes = require("./routes");

// Require typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");

const app = express();
const PORT = process.env.PORT || 3000;

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// Apollo Server will handle any client-side request that begin with '/graphql'
app.use("graphql", expressMiddleware(server));

// WILL BE DELETED
// app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});

// Starts the Apollo Server
startApolloServer();
