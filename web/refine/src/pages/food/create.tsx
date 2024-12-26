import { useCreate } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { TextField, Button } from "@mui/material";

const FoodCreate = () => {
    const { saveButtonProps, register } = useForm({
        resource: "food",
        redirect: "list",
    });

    const { mutate, isLoading } = useCreate();

    const onSubmit = async (data: any) => {
        mutate({
            resource: "food",
            values: data,
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <TextField
                {...register("name")}
                label="Name"
                variant="outlined"
                fullWidth
                required
                margin="normal"
            />
            <TextField
                {...register("description")}
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <TextField
                {...register("price")}
                label="Price"
                type="number"
                variant="outlined"
                fullWidth
                required
                margin="normal"
            />
            <TextField
                {...register("category_id")}
                label="Category ID"
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <TextField
                {...register("image")}
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
                disabled={isLoading}
            >
                Add Food
            </Button>
        </form>
    );
};

export default FoodCreate;
