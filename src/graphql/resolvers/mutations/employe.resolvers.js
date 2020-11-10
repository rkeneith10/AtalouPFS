// const { AuthenticationError, UserInputError } = require("apollo-server");
// const { combineResolvers } = require("graphql-resolvers");

module.exports = {
  Mutation: {
    addEmploye: async (_, { data }, { models }) => {
      const newEmploye = new models.Employe(data);
      await newEmploye.save();
      return newEmploye;
    },
    updateEmploye: async (_, { id, data }, { models }) => {
      return await models.Employe.findByIdAndUpdate(
        id,
        { $set: { ...data } },
        { new: true }
      );
    },
  },
};
