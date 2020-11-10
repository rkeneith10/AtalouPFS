require("dotenv/config");
const { ApolloServer } = require("apollo-server");

const { connectDb } = require("./database");
const models = require("./models");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/schema");

const PORT = process.env.PORT || process.env.PFS_PORT;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (req) => {
    return {
      req,
      models,
    };
  },
});

connectDb().then(async () => {
  console.log("Mongodb running up!");
  server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🚀  Apollo Server on http://localhost:${PORT}/`);
  });
});
