module.exports = {
  Mutation: {
    createCustomer: async (parent, { data }, { models }) => {
      const newCustomer = await models.Customer(data);
      await newCustomer.save();
      return newCustomer;
    },
    updateCustomer: async (parent, { id, data }, { models }) => {
      return await models.Customer.findByIdAndUpdate(
        id,
        { $set: { ...data } },
        { new: true }
      );
    },
    deleteCustomer: async (parent, { id, data }, { models }) => {
      return await models.Customer.findByIdAndDelete(id).then((doc) =>
        doc ? true : false
      );
    },
  },
};
