// scalar.js
import { GraphQLScalarType, Kind } from 'graphql';

const Decimal = new GraphQLScalarType({
  name: 'Decimal',
  description: 'Custom scalar type for Decimal values',
  parseValue(value) {
    return parseFloat(value);  // Convert incoming data to float
  },
  serialize(value) {
    return value.toString();  // Convert outgoing data to string
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.FLOAT) {
      return parseFloat(ast.value);  // Parse the literal to float
    }
    return null;  // Invalid value
  }
});

export { Decimal };
