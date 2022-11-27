import { GraphQLScalarType } from "graphql";

export const NumberStringBooleanScalar = new GraphQLScalarType({
  name: "NumberStringBooleanUnion",
  description: "number | string | boolean",
  serialize(value: number | string | boolean): number | string | boolean {
    return value;
  },
  parseValue(value: number | string | boolean): number | string | boolean {
    return value;
  },
  parseLiteral(ast): number | string | boolean {
    if (ast.kind === "IntValue") {
      return parseInt(ast.value);
    }
    if (ast.kind === "FloatValue") {
      return parseFloat(ast.value);
    }
    if (ast.kind === "StringValue" || ast.kind === "BooleanValue") {
      return ast.value;
    }
    throw new Error("Not a number, string or boolean");
  },
});
