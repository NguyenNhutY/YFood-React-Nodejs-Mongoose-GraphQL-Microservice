import { useList } from "@refinedev/core";

const FoodList = () => {
    const { data, isLoading, isError } = useList({
        resource: "food",
    });

    if (isLoading) return <span>Loading...</span>;
    if (isError) return <span>Error loading data.</span>;

    return (
        <div>
            {data?.data.map((food) => (
                <div key={food._id}>
                    <h2>{food.name}</h2>
                    <p>{food.description}</p>
                    <p>{food.price}</p>
                </div>
            ))}
        </div>
    );
};

export default FoodList;
