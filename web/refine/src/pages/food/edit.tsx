import { useForm } from "@refinedev/react-hook-form";
import { useShow } from "@refinedev/core"; // Đảm bảo import từ @refinedev/core
import { TextField, Button } from "@mui/material";

const FoodEdit = () => {
    const { saveButtonProps, register } = useForm({
        resource: "food",
        redirect: "list",
    });

    const { queryResult } = useShow({
        resource: "food",
    });

    const foodData = queryResult?.data?.data;

    return (
        <form>
            <TextField
                {...register("name")}
                defaultValue={foodData?.name}
                label="Name"
                variant="outlined"
                fullWidth
                required
                margin="normal"
            />
            <TextField
                {...register("description")}
                defaultValue={foodData?.description}
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <TextField
                {...register("price")}
                defaultValue={foodData?.price}
                label="Price"
                type="number"
                variant="outlined"
                fullWidth
                required
                margin="normal"
            />
            <TextField
                {...register("category_id")}
                defaultValue={foodData?.category_id}
                label="Category ID"
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <TextField
                {...register("image")}
                defaultValue={foodData?.image}
                label="Image URL"
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                {...saveButtonProps}
            >
                Save Changes
            </Button>
        </form>
    );
};

export default FoodEdit;
