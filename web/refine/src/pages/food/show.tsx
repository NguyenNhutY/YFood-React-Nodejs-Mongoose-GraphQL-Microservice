import React from "react";
import { useShow } from "@refinedev/core"; // Đảm bảo đúng import hook
import { Show } from "@refinedev/mui"; // Sử dụng Show từ refine
import { Typography, Stack, CardMedia } from "@mui/material";

const FoodShow: React.FC = () => {
    // Sử dụng `useShow` để lấy dữ liệu món ăn dựa trên ID
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    // Dữ liệu món ăn
    const food = data?.data;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Show>
            <Stack spacing={2}>
                {/* Hình ảnh của món ăn */}
                {food?.image && (
                    <CardMedia
                        component="img"
                        height="300"
                        image={food.image}
                        alt={food.name}
                    />
                )}
                {/* Tên món ăn */}
                <Typography variant="h5" component="h2">
                    {food?.name}
                </Typography>

                {/* Mô tả món ăn */}
                <Typography variant="body1">Description: {food?.description}</Typography>

                {/* Giá của món ăn */}
                <Typography variant="body1">Price: ${food?.price?.toFixed(2)}</Typography>

                {/* ID của loại món ăn */}
                <Typography variant="body1">Category ID: {food?.category_id}</Typography>

                {/* ID của nguyên liệu */}
                <Typography variant="body1">
                    Material ID: {food?.item_metarial_food_id}
                </Typography>
            </Stack>
        </Show>
    );
};

export default FoodShow;
