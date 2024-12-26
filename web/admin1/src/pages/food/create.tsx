import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";

const ADD_FOOD = gql`
  mutation AddFood(
    $category_id: ID!
    $name: String!
    $price: Float!
    $description: String!
    $image: String!
  ) {
    addFoods(
      category_id: $category_id
      name: $name
      price: $price
      description: $description
      image: $image
    ) {
      success
      message
      data {
        _id
        name
      }
    }
  }
`;

const FoodCreate = () => {
  const [addFood] = useMutation(ADD_FOOD);
  const [form, setForm] = useState({
    category_id: "",
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addFood({ variables: form });
    alert("Food added successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />
      <button type="submit">Add Food</button>
    </form>
  );
};

export default FoodCreate;
