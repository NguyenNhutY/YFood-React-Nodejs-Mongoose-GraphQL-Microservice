import { GraphQLScalarType } from "graphql";

export const DateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Một chuỗi ngày theo định dạng DD-MM-YYYY",
  parseValue(value) {
    return new Date(value); // Chuyển đổi số nguyên đến từ client thành Date
  },
  serialize(value) {
    return value.getTime(); // Chuyển đổi Date thành số nguyên để xuất ra
  },
  parseLiteral(ast) {
    if (ast.kind === "StringValue") {
      return new Date(ast.value); // Chuyển đổi giá trị AST cứng thành Date
    }
    return null; // Giá trị cứng không hợp lệ (không phải chuỗi)
  },
});
