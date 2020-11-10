const { AuthenticationError, UserInputError } = require('apollo-server');
const { combineResolvers } = require('graphql-resolvers');
const bcrypt = require("bcrypt");
const { createToken } = require('../../../utils/token');
const { isAdmin, isAuthenticated } = require('../../../utils/autorization');

module.exports = {
  Mutation: {
    createUser: combineResolvers(
      isAuthenticated,
      async (_, { data }, { models, secret, exp_secret }) => {
        const newUser = new models.User(data);
        await newUser.save();
        return { token: createToken( newUser, secret, exp_secret ) };
      }
    ),
    signIn: async (parent, { credentials }, { models, secret, exp_secret }, info) => {
      const { username, password } = credentials;
      // Verify username
      const user = await models.User.findByLogin(username);
      if (!user) {
          throw new UserInputError('No user found with this credentials.');
      }
      // Verify password
      const isValid = await user.validatePassword(password);
      if (!isValid) {
          throw new AuthenticationError('No user found with this credentials.');
      }
      return { token: createToken(user, secret, exp_secret) };
    },
    changePassword: combineResolvers(
        isAuthenticated,
        async (parent, { data }, { models, me }) => {
          const { oldpassword, newpassword, confirmpassword } = data;
          const user = await models.User.findById(me.id);
          // Verify password
          const isValid = await user.validatePassword(oldpassword);

          if (!isValid) throw new AuthenticationError('No user found with this credentials.');
          if (newpassword !== confirmpassword) throw new AuthenticationError('Password not match.');

          user.password = newpassword;
          await user.save();

          return user;
        },
    ),
    deleteUser: combineResolvers(
        isAdmin,
        async (parent, { id }, { models }) => {
            return await models.User.findByIdAndDelete(id)
            .then((doc) => doc ? true : false);
        },
    ),
    changeStatus: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        const user = await models.User.findById(id);

        if(!user) throw new Error('User not found.');
        user.status = user.status === 'Active' ? 'Inactive' : 'Active';

        await user.save();
        return user;
      }
    )
  },
};
