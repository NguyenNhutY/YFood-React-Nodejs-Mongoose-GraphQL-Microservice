import { Box, TextField, Button } from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

export const FoodsCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Handle form submission
    console.log(data);
    // Add your form submission logic here (e.g., API call)
  };

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component='form'
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete='off'
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
          helperText={errors.name?.message}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label='Name'
        />

        <TextField
          {...register("image", { required: "Image URL is required" })}
          error={!!errors.image}
          helperText={errors.image?.message}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label='Image URL'
        />

        <TextField
          {...register("price", { required: "Price is required" })}
          error={!!errors.price}
          helperText={errors.price?.message}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='number'
          label='Price'
        />

        <TextField
          {...register("description", { required: "Description is required" })}
          error={!!errors.description}
          helperText={errors.description?.message}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label='Description'
        />

        <TextField
          {...register("category", { required: "Category is required" })}
          error={!!errors.category}
          helperText={errors.category?.message}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label='Category'
        />

        <TextField
          {...register("detail")}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label='Detail'
        />

        <TextField
          {...register("metail_1")}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label='Metail 1'
        />

        <TextField
          {...register("metail_2")}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label='Metail 2'
        />

        <TextField
          {...register("metail_3")}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label='Metail 3'
        />

        <Button
          type='submit'
          variant='contained'
          color='primary'
          sx={{ marginTop: 2 }}
          disabled={formLoading}
        >
          Save
        </Button>
      </Box>
    </Create>
  );
};
