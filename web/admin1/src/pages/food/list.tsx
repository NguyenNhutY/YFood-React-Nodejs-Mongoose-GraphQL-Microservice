import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const LIST_FOODS = gql`
  query ListFoods {
    listFood {
      success
      message
      data {
        _id
        name
        description
        price
        image
      }
    }
  }
`;

const FoodList = () => {
  const { loading, error, data } = useQuery(LIST_FOODS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.listFood.data.map((food) => (
        <li key={food._id}>
          <h3>{food.name}</h3>
          <p>{food.description}</p>
          <p>Price: ${food.price}</p>
          <img src={food.image} alt={food.name} />
        </li>
      ))}
    </ul>
  );
};

export default FoodList;
