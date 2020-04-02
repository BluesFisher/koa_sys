const mount = require("koa-mount");
const graphqlHTTP = require("koa-graphql");
const GraphQLSchema = require("../../graphql/schema.js");

module.exports = app => {
  return mount(
    "/graphql",
    graphqlHTTP({
      schema: GraphQLSchema,
      graphiql: true
    })
  );
};
