module.exports = {
  Mutation: {
    createUser: async (_, { data }, { models }) => {
      const newUser = new models.User(data);
      await newUser.save();
      return newUser;
    },
  },
};
