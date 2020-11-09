module.exports = {
  Query: {
    employees: async (parent, args, { models }) => {
      return await models.Employe.find({});
    },
    employe: async (parent, { id }, { models }) => {
      return await models.Employe.findById(id);
    },
  },
  Employe: {
    user: async (employe, args, { models }) => {
      return await models.User.findOne({ employe: employe.id });
    },
    // displays: async (user, args, { models }) => {
    //   return await models.Display.find({ author: user.id });
    // },
  },
};
