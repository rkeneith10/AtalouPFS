module.exports = {
  Query: {
    users: async (parent, args, { models }) => {
      return await models.User.find({});
    },
    user: async (parent, { id }, { models }) => {
      return await models.User.findById(id);
    },
  },
  User: {
    employe: async (user, args, { models }) => {
      return await models.Employe.findById(user.employe);
    },
    // displays: async (user, args, { models }) => {
    //   return await models.Display.find({ author: user.id });
    // },
  },
};
