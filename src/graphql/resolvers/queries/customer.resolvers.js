module.exports = {
  Query: {
    customers: async (_, args, { models }) => {
      return await models.Customer.find({});
    },
    customer: async (_, { id }, { models }) => {
      return await models.Customer.findById(id);
    },
  },
};
