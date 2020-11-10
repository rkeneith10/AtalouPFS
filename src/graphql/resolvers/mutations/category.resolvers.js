module.exports = {
    Mutation: {
        newCategory: async (_, { data }, { models }) => {
            const newCat = new models.Category(data);

            await newCat.save();
            return newCat;
        },
        updateCategory: async (_, { id, data }, { models }) => {
            return await models.Category.findByIdAndUpdate(
                id,
                {$set: {...data }},
                {new: true}
            );
        },
        deleteCategory: async (_, { id }, { models }) => {
            return await models.Category.findByIdAndDelete(id)
            .then(doc => doc ? true : false );
        },
    },
}