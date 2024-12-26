import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GET_FOOD_BY_ID = gql`
  query GetFoodById($id: ID!) {
    getFoodById(_id: $id) {
      success
      message
      data {
        _id
        name
        description
        price
        image
        category_id
      }
    }
  }
`;

const UPDATE_FOOD = gql`
  mutation UpdateFood(
    $_id: ID!
    $category_id: ID
    $name: String
    $price: Float
    $description: String
    $image: String
  ) {
    updateFood(
      _id: $_id
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

const FoodEdit = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    _id: "",
    name: "",
    description: "",
    price: "",
    image: "",
    category_id: "",
  });

  const { data, loading, error } = useQuery(GET_FOOD_BY_ID, {
    variables: { id },
  });

  const [updateFood] = useMutation(UPDATE_FOOD);

  useEffect(() => {
    if (data) {
      const { _id, name, description, price, image, category_id } =
        data.getFoodById.data;
      setForm({ _id, name, description, price, image, category_id });
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateFood({ variables: form });
    alert("Food updated successfully!");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: parseFloat(e.target.value) })
        }
      />
      <input
        type="text"
        placeholder="Image URL"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />
      <input
        type="text"
        placeholder="Category ID"
        value={form.category_id}
        onChange={(e) =>
          setForm({ ...form, category_id: e.target.value })
        }
      />
      <button type="submit">Update Food</button>
    </form>
  );
};

export default FoodEdit
