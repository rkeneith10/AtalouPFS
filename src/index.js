require("dotenv/config");
const { ApolloServer } = require("apollo-server");
const jwt = require('jsonwebtoken');

const { connectDb } = require("./database");
const models = require("./models");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/schema");
const { getMe } = require('./utils/token');

const PORT = process.env.PORT || process.env.PFS_PORT;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    if (req) {
      const me = await getMe(req);
      return {
        req,
        me,
        models,
        secret: process.env.JWT_SECRET,
        exp_secret: process.env.JWT_EXPIRATION,
      };
    }
  },
});

connectDb().then(async () => {
  console.log("Mongodb running up!");
  server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🚀  Apollo Server on http://localhost:${PORT}/`);
  });
});
