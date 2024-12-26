import gql from "graphql-tag";

export const FOOD_CREATE_MUTATION = gql `
  mutation FoodCreate($input: CreateOneFoodInput!) { 
    createOneFood(input: $input) {
      _id
      name
price
description
    }
  }`
;

export const FOOD_EDIT_MUTATION = gql`
  mutation FoodEdit($input: UpdateOneFoodInput!) {
    updateOneFood(input: $input) {
      _id
      name
price
description
    }
  }`
;

export const FOOD_LIST_QUERY = gql`
  query FoodList() {
  foods() {
    nodes {
      _id
      name
      price
      description
    }

  }
}
`
;
export const FOOD_SHOW_QUERY = gql`
  query FoodShow($id: ID!) {
    food(id: $id) {
      _id
      name
price
description
    }
  }`
;

