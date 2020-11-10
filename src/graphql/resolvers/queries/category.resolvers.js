module.exports = {
    Query: {
        categories: async (_, args, { models }) => {
            return await models.Category.find({});
        },
        category: async (_, { id }, { models }) => {
            return await models.Category.findById(id)
        }
    },
    Categories: {
        parent: async (category, args, { models }) => {
            return await models.Category.find({ parent: { $type: 7, $exists: false } });
            // return await models.Category.find({ parent: null });
        },
        child: async (_, args, { models }) => {
            return await models.Category.find({ parent: { $exists: true,  } });
        },
    }
}