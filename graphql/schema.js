const userSchema = require("./users");
const { GraphQLObjectType, GraphQLSchema } = require("graphql");

const Query = new GraphQLObjectType({
  name: "UserQuery",
  description: "用户信息查询",
  fields: () => Object.assign({}, userSchema.query)
});
const Mutation = new GraphQLObjectType({
  name: "UserMutation",
  description: "用户信息维护",
  fields: () => Object.assign({}, userSchema.mutation)
});
const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

module.exports = schema;
