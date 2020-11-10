const { ForbiddenError } = require('apollo-server');
const { combineResolvers, skip } = require('graphql-resolvers');

const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.');

const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    role === 'ADMINISTRATOR'
    ? skip
    : new ForbiddenError('Access Denied'), // or ('Not authorized as admin.'),
);

module.exports = {
    isAuthenticated,
    isAdmin
}