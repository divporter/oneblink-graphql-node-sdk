import { GraphQLScalarType } from "graphql";

function identity(value: unknown) {
  return value;
}

export const JSONScalar = new GraphQLScalarType({
  name: "JSON",
  description: "Raw JSON scalar to bypass GraphQL type definitions",
  serialize: identity,
  parseValue: identity,
});
