import { Box, TextField, Autocomplete } from "@mui/material";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useParams } from "react-router-dom";
import { Controller } from "react-hook-form";

export const FoodsEdit = () => {
  const {
    saveButtonProps,
    register,
    handleSubmit,
    refineCore: { query },

    control,

    formState: { errors },
  } = useForm();

  const samplesData = query?.data?.data;

  const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
    resource: "foods",
    defaultValue: samplesData?.foods?._id,
  });

  const onSubmit = (data) => {
    // Handle form submission
    console.log("ID:", _id); // Log the ID
    console.log("Form Data:", data);
    // Handle file upload separately if needed
  };

  return (
    <Edit saveButtonProps={saveButtonProps} onSubmit={handleSubmit(onSubmit)}>
      <Box
        component='form'
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete='off'
      >
        <TextField
          {...register("name", { required: "This field is required" })}
          error={!!(errors as any)?.name}
          helperText={(errors as any)?.name?.message}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label='Name'
        />
        <TextField
          {...register("price", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.price}
          helperText={(errors as any)?.name?.price}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='number'
          label='Price'
        />
        <TextField
          {...register("description", { required: "This field is required" })}
          error={!!(errors as any)?.description}
          helperText={(errors as any)?.description?.message}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label='Description'
        />
        <Controller
          control={control}
          name='category'
          rules={{ required: "This field is required" }}
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...categoryAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              getOptionLabel={(item) => {
                return (
                  categoryAutocompleteProps?.options?.find(
                    (p) => p?.id?.toString() === item?.id?.toString()
                  )?.title ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined ||
                option?.id?.toString() === (value?.id ?? value)?.toString()
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Category'
                  margin='normal'
                  variant='outlined'
                  error={!!(errors as any)?.category?._id}
                  helperText={(errors as any)?.category?._id?.message}
                  required
                />
              )}
            />
          )}
        />
        <TextField
          {...register("detail", { required: "This field is required" })}
          error={!!(errors as any)?.detail}
          helperText={(errors as any)?.detail?.message}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label='Detail'
        />
        <TextField
          {...register("metail_1", { required: "This field is required" })}
          error={!!(errors as any)?.metail_1}
          helperText={(errors as any)?.metail_1?.message}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label='Metail 1'
        />
        <TextField
          {...register("metail_2", { required: "This field is required" })}
          error={!!(errors as any)?.metail_2}
          helperText={(errors as any)?.metail_2?.message}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label='Metail 2'
        />
        <TextField
          {...register("metail_3", { required: "This field is required" })}
          error={!!(errors as any)?.metail_3}
          helperText={(errors as any)?.metail_3?.message}
          margin='normal'
          fullWidth
          InputLabelProps={{ shrink: true }}
          type='text'
          label='Metail 3'
        />
        {/* File input handling */}
        <input type='file' {...register("image")} style={{ marginTop: 16 }} />
      </Box>
    </Edit>
  );
};
